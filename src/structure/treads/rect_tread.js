import { Types } from "../../types/stair_v2"
import { Edge } from "../../utils/edge"
import { Outline } from "../../utils/outline"
import { Default } from "../config"
import tool from "../tool"
import { Tread } from "./tread"



export class RectTread extends Tread {
  constructor({ vParent, vIndex, vPos, vIsLast}) {
    super({vParent, vIsLast})
    this.inheritL = true
    this.inheritW = true
    this.type = Types.TreadType.trect
    this.rebuildByParent({ vIndex, vPos })
  }

  rebuildByParent({ vIndex, vPos }) {
    super.rebuildByParent({vIndex})
    this.position = vPos || new Types.Vector3()
    this.lVec = this.parent.lVec || new Types.Vector3()
    this.wVec = this.parent.wVec || new Types.Vector3()
    this.clock = this.parent.clock
    this.index = vIndex
    if (this.inheritL) {
      this.stepLength = this.parent.stepLength || 0
    }
    if (this.inheritW) {
      this.stepWidth = this.parent.stepWidth || 0
    }
    this.createRectBorder()
  }

  /**
   * 标准矩形踏板，根据位置及长宽构建出踏板边界
   */
   createRectBorder() {
    let sideOffset = this.parent.parent.girOffset
    let backOffset = this.parent.parent.getTreadBackOffset()
    let outline = tool.createRectOutline(this.position,this.stepLength-2*sideOffset,this.stepWidth,this.lVec,this.wVec)
    let t_ori = new Edge().setByVec(this.position, this.wVec, -backOffset).p2
    let treadOutline
    if (this.index === this.parent.parent.realStepNum) {
      treadOutline = outline
    } else {
      treadOutline = tool.createRectOutline(t_ori, this.stepLength-2*sideOffset, this.stepWidth+backOffset, this.lVec, this.wVec)
    }
    outline = new Outline(outline).setZCoord(this.position.z)
    treadOutline = new Outline(treadOutline).setZCoord(this.position.z)
    outline.isClock = this.clock
    treadOutline.isClock = this.clock
    this.border = new Types.TreadBorder({
      stepOutline:outline,
      treadOutline:treadOutline,
      inIndex:[3],
      outIndex:[1],
      frontIndex:[2],
      backIndex:[0]
    })
  }

  getArgs() {
    let args = {
      stepLength : {
        name: '步长',
        value: {
          inheritL: {name: '继承楼梯段', value: this.inheritL, type: 'switch',},
          stepLength: {name: '数值', value: this.stepLength, type: 'input', disabled: this.inheritL},
        },
        type: 'group',
      },
      stepWidth : {
        name: '步宽',
        value: {
          inheritW: {name: '继承楼梯段', value: this.inheritW, type: 'switch'},
          stepWidth: {name: '数值', value: this.stepWidth, type: 'input', disabled: this.inheritW,},
        },
        type: 'group',
      }
    }
    args = {
      ...args,
      ...super.getArgs()
    }
    return args
  }

  updateItem(vValue, vKey, vSecondKey) {
    if (vSecondKey === 'stepWidth') {
      let range = this.parent.getStepWidthRange()
      let value = Math.max(vValue, Default.STEP_WIDTH_MIN)
      value = Math.min(value, this.stepWidth+range)
      if (this.parent.fixedNum === 0) {
        this.parent.updateItem(this.parent.length + value - this.stepWidth, 'length')
      }
      this.stepWidth = value
    }
    else {
      super.updateItem(vValue, vKey, vSecondKey)
    }
  }

  getColPos (vRateArr, vSide, vSideOffset) {
    let posArr = []
    for(const i of this.border[vSide+'Index']) {
      let e = this.border.stepOutline.edges[i]
      let utilE = new Edge(e)
      utilE.offset(vSideOffset, !this.clock)
      for(const r of vRateArr) {
        let pos = new Edge(utilE.writePB()).extendP1(-utilE.getLength() * r).p1
        posArr.push(pos)
      }
    }
    return posArr
  }
}