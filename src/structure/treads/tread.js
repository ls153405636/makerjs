import { Types } from "../../types/stair_v2";
import { Edge } from "../../utils/edge";
import { ChildInfo } from "../child_info";
import tool from "../tool";


export class Tread extends ChildInfo {
  constructor({vParent, vIsLast}) {
    super(vParent)
    this.inheritH = true
    this.isLast = vIsLast
    this.parent = vParent
    this.type = Types.TreadType.tph
    this.stepLength = 0
    this.stepWidth = 0
    this.inheritW = false
    this.inheritL = false
    this.position = new Types.Vector3()
    this.clock = true
    /**@type {Types.TreadBorder} */
    this.border = null
  }

  rebuildByParent({vIndex}) {
    if (this.inheritH) {
      this.stepHeight = this.parent.stepHeight
    }
    this.index = vIndex
  }

  getArgs() {
    return {
      stepHeight : {
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
    }
  }

  getColPos() {}

  getDirection() {
    return new Types.Vector3({x:this.wVec.x, y:this.wVec.y})
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
   getGirBorder (vSide, vArgs, vIsFirst, vInLast, vOutLast) {
    let utilE = this.getGirUtilE(vSide, vArgs)
    let depth = this.parent.parent.treadParameters.depth
    if (vArgs.type === Types.GirderType.gsaw) {
      utilE.setZCoord(this.position.z - depth)
    }
    let inUtilE = utilE.clone(), outUtilE = utilE.clone()
    inUtilE.offset(vArgs.depth/2, vSide !== 'in')
    outUtilE.offset(vArgs.depth/2, vSide === 'in')
    let inRst, outRst
    if (vArgs.type === Types.GirderType.gsaw) {
      inRst = this.createSideSawBorder(inUtilE, vIsFirst, vArgs, vInLast)
      outRst = this.createSideSawBorder(outUtilE, vIsFirst, vArgs, vOutLast)
    } else {
      inRst = this.createSideSlabBorder(inUtilE, vIsFirst, vArgs, vInLast)
      outRst = this.createSideSlabBorder(outUtilE, vIsFirst, vArgs, vOutLast)
    }
    return new Types.TreadGirBorder({
      inEdges: inRst.edges,
      inTopEdges: inRst.topEdges,
      outEdges: outRst.edges,
      outTopEdges: outRst.topEdges,
      dir:this.getDirection()
    })
  }

  getGirUtilE(vSide, vArgs) {
    let edge = this.border.stepOutline.edges[this.border[vSide+'Index'][0]]
    let utilE = new Edge(edge)
    let sideOffset = vArgs.type === Types.GirderType.gslab ? -this.parent.parent.sideOffset : this.parent.parent.sideOffset
    if (this.type === Types.TreadType.tSpec) {
      utilE.offset(sideOffset, false)
      if (!this.clock) {
        utilE.reserve()
      }
    } else {
      utilE.offset(sideOffset, !this.clock)
      if (vSide === 'out') {
        utilE.reserve()
      }
    }
    let backOffset = this.parent.parent.getTreadBackOffset()
    if (vArgs.type === Types.GirderType.gsaw) {
      utilE.extendP1(-backOffset)
      utilE.extendP2(backOffset)
    }
    return utilE
  }

  createSideSawBorder (utilE, vIsFirst, vArgs, vLast) {
    let botPois = [], topPois = []
    topPois[0] = utilE.getP1PB()
    topPois[1] = utilE.getP1PB()
    topPois[2] = utilE.getP2PB()
    botPois[0] = utilE.getP1PB()
    botPois[1] = utilE.getP2PB()
    let verHeight = this.getGirVerHeight(vArgs)
    if (vIsFirst && this.parent.index === 0 && this.parent.startHeight >= verHeight) {
      botPois[0].z = 0
      botPois[1].z = 0
    } else {
      botPois[0].z = Math.max(botPois[0].z - this.stepHeight - verHeight, 0)
      botPois[1].z = Math.max(botPois[1].z -verHeight, 0)
      if (botPois[0].z === 0 && botPois[1].z > 0) {
        let angle = Math.atan(this.stepHeight / this.stepWidth)
        let p = utilE.clone().extendP2(-botPois[1].z / Math.tan(angle)).p2
        p.z = botPois[0].z
        if (!tool.isVec3Equal(botPois[0], p)) {
          botPois.splice(1, 0, p)
        }
      }
    }
    if (this.type === Types.TreadType.tCor) {
      if (this.curOrder === 'last') {
        let lastT = this.getLastTread()
        let heightDiff = lastT.getGirVerHeight(vArgs) + this.stepHeight - verHeight
        botPois[0] = utilE.clone().extendP1(- heightDiff / (Math.atan(lastT.stepHeight / lastT.stepWidth))).p1
      }
      botPois[0].z = botPois[1].z
    }
    if (vIsFirst) {
      topPois[0].z = botPois[0].z
    } else {
      topPois[0].z -= this.stepHeight
    }
    if (vLast?.poi && (!tool.isVec3Equal(vLast.poi, botPois[0]))) {
      botPois.splice(0, 0, vLast.poi)
    } 
    if (vLast?.topPoi && (!tool.isVec3Equal(vLast.topPoi, topPois[0]))) {
      topPois.splice(0, 0, vLast.topPoi)
    }
    let edges = tool.createOutlineByPois(botPois, false).edges
    let topEdges = tool.createOutlineByPois(topPois, false).edges
    return {edges, topEdges}
  }

  /**
   * 
   * @param {Edge} utilE 
   * @param {*} vIsFirst 
   * @param {Types.GirderParameters} vArgs 
   * @param {*} vLast 
   */
  createSideSlabBorder (utilE, vIsFirst, vArgs, vLast) {
    let botPois = [], topPois = []
    topPois[0] = utilE.getP1PB()
    topPois[1] = utilE.getP2PB()
    botPois[0] = utilE.getP1PB()
    botPois[1] = utilE.getP2PB()
    let verHeight = this.getGirVerHeight(vArgs)
    let stepHeight = this.getNextTread()?.stepHeight || this.stepHeight
    let angle = Math.atan(stepHeight / this.stepWidth)
    let upVerHeight = this.getUpGirVerHeight(vArgs)
    botPois[0].z -= verHeight
    botPois[1].z -= (verHeight - stepHeight)
    topPois[0].z += upVerHeight
    topPois[1].z += (upVerHeight + stepHeight)
    if (vIsFirst && this.parent.index === 0 && this.parent.startHeight >= (verHeight - this.stepHeight)) {
      botPois[0].z = 0
      botPois[1].z = 0
    } else {
      botPois[0].z = botPois[0].z - (this.parent.index === 0 ? vArgs.bSuppotHeight : 0) > 0 ? botPois[0].z : 0
      botPois[1].z = botPois[1].z - (this.parent.index === 0 ? vArgs.bSuppotHeight : 0) > 0 ? botPois[1].z : 0
      if (botPois[0].z === 0 && botPois[1].z > 0) {
        let p2Dis = botPois[1].z  / Math.tan(angle)
        let supportDis = vArgs.bSuppotHeight / Math.tan(angle)
        let p = utilE.clone().extendP2(-p2Dis + supportDis).p2
        p.z = 0
        if (!tool.isVec3Equal(p, botPois[0])) {
          botPois.splice(1, 0, p)
        }
        if (vArgs.bSuppotHeight) {
          let p1 = new Types.Vector3({x:p.x, y:p.y, z:vArgs.bSuppotHeight})
          botPois.splice(botPois.length - 1, 0, p1)
        }
      }
      if (this.index === 1) {
        let tP = utilE.clone().extendP1(vArgs.fOffsetStep).p1
        tP.z += (upVerHeight - vArgs.fOffsetStep * Math.tan(angle))
        topPois[0] = tP
        let bP = utilE.clone().extendP1(vArgs.fOffsetStep).p1
        bP.z = botPois[0].z
        botPois[0] = bP
      }
    }
    if (vLast?.poi && (!tool.isVec3Equal(vLast.poi, botPois[0]))) {
      botPois.splice(0, 0, vLast.poi)
    } 
    if (vLast?.topPoi && (!tool.isVec3Equal(vLast.topPoi, topPois[0]))) {
      topPois.splice(0, 0, vLast.topPoi)
    }
    let edges = tool.createOutlineByPois(botPois, false).edges
    let topEdges = tool.createOutlineByPois(topPois, false).edges
    return {edges, topEdges}
  }

  getUpGirVerHeight (vArgs) {
    let stepHeight = this.getNextTread()?.stepHeight || this.stepHeight
    let angle = Math.atan(stepHeight / this.stepWidth)
    let upVerHeight = (50 + vArgs.aboveHeight) / Math.cos(angle)
    return upVerHeight
  }

  getGirVerHeight (vArgs) {
    let stepHeight = this.stepHeight
    if (vArgs.type === Types.GirderType.gslab) {
      stepHeight = this.getNextTread()?.stepHeight || this.stepHeight
    }
    let angle = Math.atan(stepHeight / this.stepWidth)
    return vArgs.height / Math.cos(angle)
  }

  getLastTread() {
    let lastT = this.parent.treads[this.index - this.parent.treadIndex - 2]
    if (!lastT) {
      let lastF = this.parent.parent.segments[this.parent.index - 1]
      lastT = lastF?.treads[lastF.treads.length - 1]
    }
    return lastT
  }

  getNextTread() {
    let nextT = this.parent.treads[this.index - this.parent.treadIndex - 2]
    if (!nextT) {
      let nextF = this.parent.parent.segments[this.parent.index + 1]
      nextT = nextF?.treads[nextF.treads.length - 1]
    }
    return nextT
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