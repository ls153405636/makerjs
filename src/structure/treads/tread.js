import { Types } from "../../types/stair_v2";
import { Edge } from "../../utils/edge";
import { ChildInfo } from "../child_info";


export class Tread extends ChildInfo {
  constructor({vParent, vIsLast}) {
    this.inheritH = true
    this.isLast = vIsLast
    this.parent = vParent
    this.type = Types.TreadType.tph
    this.stepLength = 0
    this.stepWidth = 0
    this.inheritW = false
    this.inheritH = false
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
   getSawGirBorder (vSide, vArgs, vIsFirst, vLastP, vLastUpP) {
    let utilE = this.getGirUtilE(vSide)
    let depth = this.parent.parent.treadParameters.depth
    let verHeight = this.getGirVerHeight()
    utilE.setZCoord(this.position.z - depth)
    let inUtilE = utilE.clone(), outUtilE = utilE.clone()
    inUtilE.offset(vArgs.depth/2)
    outUtilE.offset(vArgs.depth/2, false)
    let inRoute = this.createSideSawBorder(inUtilE, vIsFirst, verHeight)
    let outRoute = this.createSideSawBorder(outUtilE, vIsFirst, verHeight)
    return {
      inEdges:inRoute.edges,
      inUpEdges:inRoute.upEdges,
      outEdges:outRoute.edges,
      outUpEdges:outRoute.upEdges
    }
  }

  getGirUtilE(vSide) {
    let edge = this.border.stepOutline.edges[this.border[vSide+'Index'][0]]
    let utilE = new Edge(edge)
    if (this.type === Types.TreadType.tSpec) {
      utilE.offset(this.parent.parent.sideOffset, false)
    } else {
      utilE.offset(this.parent.parent.sideOffset, !this.clock)
    }
    if ((this.clock && vSide === 'out') || (!this.clock && vSide === 'in')) {
      utilE.reserve()
    } 
    let backOffset = this.parent.parent.getTreadBackOffset()
    utilE.extendP1(-backOffset)
    utilE.extendP2(backOffset)
    return utilE
  }

  createSideSawBorder (utilE, vIsFirst, verHeight, vLastP, vLastUpP) {
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
        let angle = Math.atan(this.stepHeight / this.stepWidth)
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

  getGirVerHeight (vArgs) {
    let angle = Math.atan(this.stepHeight / this.stepWidth)
    return vArgs.height / Math.cos(angle)
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