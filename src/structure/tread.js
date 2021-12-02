import { Types } from "../types/stair_v2";
import { Edge } from "../utils/edge";
import { Outline } from "../utils/outline";
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
  constructor({ vParent, vIndex, vBorder, vPos, vIsLast, vType = Types.TreadType.trect }) {
    super(vParent)
    this.inheritL = true
    this.inheritW = true
    this.inheritH = true
    this.isLast = vIsLast
    this.type = vType
    /**@type {Types.TreadBorder} */
    this.border = null
    this.rebuildByParent({ vIndex, vBorder, vPos })
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
   * 标准矩形踏板，根据位置及长宽构建出踏板边界
   */
  createRectBorder() {
    let sideOffset = this.parent.parent.girOffset
    let backOffset = this.parent.parent.getTreadBackOffset()
    let outline = tool.createRectOutline(this.position,this.stepLength-2*sideOffset,this.stepWidth,this.lVec,this.wVec)
    let t_ori = new Edge().setByVec(this.position, this.wVec, -backOffset).p2
    let treadOutline = tool.createRectOutline(t_ori, this.stepLength-2*sideOffset, this.stepWidth+backOffset, this.lVec, this.wVec)
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

  rebuildByParent ({vIndex, vBorder, vPos}) {
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
    if (vBorder) {
      this.border = vBorder
    } else {
      this.createRectBorder()
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

  updateItem (vValue, vKey, vSecondKey) {
    if (['stepHeight', 'stepLength', 'stepWidth'].includes(vKey)) {
      this[vSecondKey] = vValue
    }
    else {
      super.updateItem(vValue, vKey, vSecondKey)
    }
  }

  /**
   * 
   * @param {string} vSide 
   * @param {Types.GirderParameters} vArgs 
   */
  getSawGirEdges (vSide, vArgs, vIsFirst, vIsExtend) {
    let sEdges = []
    for (const i of this.border[vSide+'Index']) {
      sEdges.push(this.border.stepOutline.edges[i])
    }
    let edge = sEdges[0]
    let utilE = new Edge(edge)
    utilE.offset(this.parent.parent.sideOffset)
    if ((this.clock && vSide === 'out') || (!this.clock && vSide === 'in')) {
      utilE.reserve()
    } 
    let backOffset = this.parent.parent.getTreadBackOffset()
    utilE.extendP1(-backOffset)
    utilE.extendP2(backOffset)
    let depth = this.parent.parent.treadParameters.depth
    let angle = Math.atan(this.stepHeight / this.stepWidth)
    let verHeight = vArgs.height / Math.cos(angle)
    utilE.setZCoord(this.position.z - depth)
    if (vIsExtend) {
      let horDis = vArgs.height * Math.sin(angle)
      verHeight = vArgs.height * Math.cos(angle)
      utilE.extendP2(horDis)
    }
    let inUtilE = utilE.clone(), outUtilE = utilE.clone()
    inUtilE.offset(vArgs.depth/2)
    outUtilE.offset(vArgs.depth/2, false)
    let inRoute = this.createSideSawEdges(inUtilE, vIsFirst, verHeight, angle)
    let outRoute = this.createSideSawEdges(outUtilE, vIsFirst, verHeight, angle)
    return {
      inEdges:inRoute.edges,
      inUpEdges:inRoute.upEdges,
      outEdges:outRoute.edges,
      outUpEdges:outRoute.upEdges
    }
  }

  createSideSawEdges (utilE, vIsFirst, verHeight, angle) {
    let botPois = [], topPois = []
    topPois[0] = utilE.getP1PB()
    topPois[1] = utilE.getP1PB()
    topPois[2] = utilE.getP2PB()
    botPois[0] = utilE.getP1PB()
    botPois[1] = utilE.getP2PB()
    if (this.parent.index === 0 && this.parent.startHeight >= verHeight) {
      botPois[0].z = 0
      botPois[1].z = 0
    } else {
      botPois[0].z = Math.max(botPois[0].z - this.stepHeight - verHeight, 0)
      botPois[1].z = Math.max(botPois[1].z -verHeight, 0)
      if (botPois[0].z === 0 && botPois[1].z > 0) {
        let p = utilE.clone().extendP2(-botPois[1].z / Math.tan(angle)).p2
        botPois.splice(1, 0, p)
      }
    }
    if (vIsFirst) {
      topPois[0].z = botPois[0].z
    } else {
      topPois[0].z -= this.stepHeight
    }
    let edges = tool.createOutlineByPois(botPois, false).edges
    let upEdges = tool.createOutlineByPois(topPois, false).edges
    return {edges, upEdges}
  }

  getSlabGirEdges (vSide) {

  }

  writePB() {
    return new Types.Tread({
      uuid:this.uuid,
      index:this.index,
      isLast:this.isLast,
      border:this.border,
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
