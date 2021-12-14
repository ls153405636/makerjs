import { Types } from "../../types/stair_v2";
import { Edge } from "../../utils/edge";
import { SmallColumn } from "../small_column";
import tool from "../tool";
import { Tread } from "./tread";


export class CorTread extends Tread {
  constructor({vParent, vIsLast, vIndex, vBorder, vLastEdgeIndex, vNextEdgeIndex, vClock}) {
    super({vParent, vIsLast})
    this.lastEdgeIndex = vLastEdgeIndex
    this.nextEdgeIndex = vNextEdgeIndex
    this.type = Types.TreadType.tCor
    /**休台踏步所有轮廓一律为顺时针，clock用于判断转角对角点和前后楼梯边的关系 */
    /**此处设计不够科学合理，为临时方法，后续有时间需重新设计调整 */
    this.clock = vClock
    this.curOrder = 'last'
    this.rebuildByParent({vIndex, vBorder})
  }

  rebuildByParent({vIndex, vBorder}) {
    super.rebuildByParent({vIndex})
    this.border = vBorder
    this.position = this.border.stepOutline.edges[0].p1
  }

  setCurOrder(vOrder) {
    this.curOrder = vOrder
  }

  getDirection() {
    let index = this[this.curOrder+'EdgeIndex']
    let edge = this.border.stepOutline.edges[index]
    let vec
    if (this.clock) {
      vec = new Edge(edge).getVec()
    } else {
      vec = new Edge(edge).getVec().negate()
    }
    return new Types.Vector3({x:vec.x, y:vec.y, z:vec.z})
  }

  getSideUtilE(vSide) {
    let edge = this.border.stepOutline.edges[this[this.curOrder+'EdgeIndex']]
    let utilE = new Edge(edge)
    let gArgs = this.parent.parent.getGirderParas(vSide)
    let sideOffset = gArgs.type === Types.GirderType.gslab ? -this.parent.parent.sideOffset : this.parent.parent.sideOffset
    utilE.offset(sideOffset, false)
    if (!this.clock) {
      utilE.reserve()
    }
    return utilE
  }

  getHandEdge(vSide, vArgs, vOrder) {
    this.setCurOrder(vOrder)
    let utilE = this.getSideUtilE()
    let gArgs = this.parent.parent.getGirderParas(vSide)
    if (gArgs.type === Types.GirderType.gslab) {
      if (vOrder === 'last') {
        utilE.extendP2(gArgs.depth/2)
      } else {
        utilE.extendP1(gArgs.depth/2)
      }
    } else {
      if (vOrder === 'last') {
        utilE.extendP2(-this.parent.parent.sideOffset)
      } else {
        utilE.extendP1(-this.parent.parent.sideOffset)
      }
    }
    let edge = utilE.writePB()
    edge.p1.z = this.position.z + vArgs.height
    edge.p2.z = this.position.z + vArgs.height
    return edge
  }

  getSmallCols(vSide, vArgs, vLastNum, vOrder) {
    this.setCurOrder(vOrder)
    let utilE = this.getSideUtilE()
    let gArgs = this.parent.parent.getGirderParas(vSide)
    let hArgs = this.parent.parent.getHandParas(vSide)
    let extendDis = gArgs.type === Types.GirderType.gslab ? this.parent.parent.sideOffset : -this.parent.parent.sideOffset
    let height = gArgs.type === Types.GirderType.gslab ? hArgs.height - this.getUpGirVerHeight(gArgs) : hArgs.height
    let size = tool.parseSpecification(vArgs.specification)
    size.z = height
    let {lastDis,interval} = this.getSmallColInterval(vArgs, vLastNum)
    let sCols = []
    if (vOrder === 'last') {
      utilE.extendP2(extendDis)
      utilE.extendP1(-lastDis)
      //sCols.push(new SmallColumn(this.parent.parent, utilE.getP1PB(), size))
    } else {
      utilE.extendP1(extendDis)
      utilE.extendP2(-lastDis)
    }
    let seg = Math.ceil(utilE.getLength()/interval)
    interval = utilE.getLength()/ seg
    let pos = utilE.getP1PB()
    for (let i = 0; i <= seg; i++) {
      if (vOrder === 'last' && this.parent.oppoBigCol && i === seg) {
        continue
      }
      pos.z =  gArgs.type === Types.GirderType.gslab ? this.position.z + this.getUpGirVerHeight(gArgs) : this.position.z
      if (i !== 0 || vOrder !== 'next') {
        sCols.push(new SmallColumn(this.parent.parent, pos, size))
      }
      pos = new Edge().setByVec(pos, utilE.getVec(), interval).p2
    }
    return sCols
  }

  /**
   *
   * @param {Types.SmallColParameters} vArgs
   * @param {Number} vLastNum
   * @returns
   * @memberof CorTread
   */
  getSmallColInterval(vArgs, vLastNum) {
    let lastT = this.getLastTread()
    if (lastT.type === Types.TreadType.tCor) {
      lastT = lastT.getLastTread()
    }
    let lastDis, interval
    if (vArgs.arrangeRule === Types.ArrangeRule.arrThree) {
      interval = lastT.stepWidth * 2 / 3
      lastDis = vLastNum === 1 ? lastT.stepWidth / 2 : lastT.stepWidth / 6
    } else if (vArgs.arrangeRule === Types.ArrangeRule.arrFour) {
      interval = lastT.stepWidth / 2
      lastDis = lastT.stepWidth / 4
    } else {
      interval = lastT.stepWidth / 2
      lastDis = lastT.stepWidth / 2
    }
    return {lastDis, interval}
  }

  getGirUtilE (vSide, vArgs) {
    if (vSide === 'out') {
      return null
    }
    let utilE = this.getSideUtilE()
    let backOffset = this.parent.parent.getTreadBackOffset()
    if (vArgs.type === Types.GirderType.gsaw) {
      if (this.curOrder === 'last') {
        utilE.extendP1(-backOffset)
      } else {
        utilE.extendP1(-(this.parent.parent.sideOffset + vArgs.depth / 2))
        utilE.extendP2(backOffset)
      }
    } else {
      if(this.curOrder === 'last') {
        utilE.extendP2(vArgs.depth)
      }
    }
    return utilE
  }

  getGirVerHeight(vArgs) {
    let refT = this.getNextTread()
    if (vArgs.type === Types.GirderType.gsaw || refT.type === Types.TreadType.tCor) {
      return refT.getGirVerHeight(vArgs)
    } else {
      return refT.getGirVerHeight(vArgs) - refT.stepHeight
    }
  }

  getUpGirVerHeight (vArgs) {
    let refT = this.getLastTread()
    return refT.getUpGirVerHeight(vArgs)
  }

  createSideSlabBorder(utilE, vIsFirst, vArgs, vLast) {
    let botPois = [], topPois = []
    topPois[0] = utilE.getP1PB()
    topPois[1] = utilE.getP2PB()
    botPois[0] = utilE.getP1PB()
    botPois[1] = utilE.getP2PB()
    let verHeight = this.getGirVerHeight(vArgs)
    let upVerHeight = this.getUpGirVerHeight(vArgs)
    topPois[0].z += upVerHeight
    topPois[1].z += upVerHeight
    botPois[0].z -= verHeight
    botPois[1].z -= verHeight
    if (this.curOrder === 'last') {
      let lastT = this.getLastTread(), heightDiff
      if (lastT.type === Types.TreadType.tCor) {
        heightDiff = this.stepHeight
      } else {
        heightDiff = lastT.getGirVerHeight(vArgs) - verHeight
      }
      botPois[0] = utilE.clone().extendP1(- heightDiff / (Math.atan(this.stepHeight / lastT.stepWidth))).p1
      botPois[0].z -= verHeight
      let p = utilE.getP1PB()
      p.z = botPois[0].z - heightDiff
      botPois.splice(0, 0, p)
    }
    if (this.curOrder === 'next') {
      let nextT = this.getNextTread(), heightDiff
      if (nextT.type === Types.TreadType.tCor) {
        heightDiff = nextT.stepHeight
      } else {
        heightDiff = nextT.getUpGirVerHeight(vArgs) + nextT.stepHeight - upVerHeight
      }
      topPois[1] = utilE.clone().extendP2(-heightDiff / (Math.atan(nextT.stepHeight / nextT.stepWidth))).p2
      topPois[1].z += upVerHeight
      let p = utilE.getP2PB()
      p.z = topPois[1].z + heightDiff
      topPois.push(p)
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
}