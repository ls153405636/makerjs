import { Types } from "../types/stair_v2";
import { Edge } from "../utils/edge";
import { ChildInfo } from "./child_info";
import tool from "./tool";

export class Tread extends ChildInfo {
  /**
   *
   * @param {Object} param0
   * @param {Number} param0.vIndex 踏板的索引
   * @param {Types.Outline} param0.vOutline 踏板的轮廓，目前只针对休台异形踏板和起步踏
   * @param {boolean} param0.vIsLast 踏板是否为二楼平面上的最后一级
   * @param {Types.Vector3} param0.vPos 踏板的位置，即矩形绘制时起始点的坐标
   */
  constructor({ vParent, vIndex, vOutline, vPos, vIsLast, vType = Types.TreadType.trect }) {
    super(vParent)
    this.inheritL = true
    this.inheritW = true
    this.inheritH = true
    this.isLast = vIsLast
    this.type = vType
    this.rebuildByParent({ vIndex, vOutline, vPos })
  }

  getArgs() {
    let args = {}
    if (this.type === Types.TreadType.trect) {
      args.stepLength = {
        name: '步长',
        value: {
          inheritL: {
            name: '继承楼梯段',
            value: this.inheritL,
            type: 'switch',
          },
          stepLength: {
            name: '数值',
            value: this.stepLength,
            type: 'input',
            disabled: this.inheritL,
          },
        },
        type: 'group',
      }
      args.stepWidth = {
        name: '步宽',
        value: {
          inheritW: {
            name: '继承楼梯段',
            value: this.inheritW,
            type: 'switch',
          },
          stepWidth: {
            name: '数值',
            value: this.stepWidth,
            type: 'input',
            disabled: this.inheritW,
          },
        },
        type: 'group',
      }
    }
    args.stepHeight = {
      name: '步高',
      value: {
        inheritH: { name: '继承楼梯段', value: this.inheritH, type: 'switch' },
        stepHeight: {
          name: '数值',
          value: this.stepHeight,
          type: 'input',
          disabled: this.inheritH,
        },
      },
      type: 'group',
    }
    return args
  }

  /**
   * 标准矩形踏板，根据位置及长宽构建出踏板轮廓
   */
  createRectOutline() {
    let gArgs = this.parent.parent.girderParameters
    let xOffset = gArgs.type === Types.GirderType.gslab ? gArgs.depth : 0
    this.outline = tool.createRectOutline(
      this.position,
      this.stepLength - 2 * xOffset,
      this.stepWidth,
      this.lVec,
      this.wVec
    )
  }

  rebuildByParent({ vIndex, vOutline, vPos }) {
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
    if (this.inheritH) {
      this.stepHeight = this.parent.stepHeight
    }
    if (vOutline) {
      this.outline = vOutline
    }
    else {
      this.createRectOutline()
      this.border = {
        inEdgeIndex:[3],
        outEdgeIndex:[1]
      }
    }
  }

  getColPos (vRateArr, vSide, vSideOffset) {
    let posArr = []
    for(const i of this.border[vSide+'EdgeIndex']) {
      let e = this.outline.edges[i]
      let utilE = new Edge(e)
      utilE.offset(vSideOffset, !this.clock)
      for(const r of vRateArr) {
        let pos = new Edge(utilE.writePB()).extendP1(-utilE.getLength() * r).p1
        posArr.push(pos)
      }
    }
    return posArr
  }

  updateItem (vValue, vKey, vSecondKey) {
    if (['stepHeight', 'stepLength', 'stepWidth'].includes(vKey)) {
      this[vSecondKey] = vValue
    }
    else {
      super.updateItem(vValue, vKey, vSecondKey)
    }
  }

  writePB() {
    return new Types.Tread({
      uuid:this.uuid,
      index:this.index,
      isLast:this.isLast,
      stepOutline:this.outline,
      stepHeight:this.stepHeight,
      stepWidth:this.stepWidth,
      stepLength:this.stepLength,
      inheritH:this.inheritH,
      inheritW:this.inheritW,
      inheritL:this.inheritL,
      type:this.type
    })
  }
}
