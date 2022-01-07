import { Types } from "../../types/stair_v2";
import { Edge } from "../../utils/edge";
import { Outline } from "../../utils/outline";
import { UtilVec2 } from "../../utils/util_vec_2";
import tool from "../tool";
import { Tread } from "./tread";


export class ArcTread extends Tread {
  constructor({ vParent, vIndex, vPos, vIsLast, vEndLVec}) {
    super({vParent, vIsLast})
    this.type = Types.TreadType.tArc
    this.inheritL = true
    this.rebuildByParent({vPos, vIndex, vEndLVec})
  }

  rebuildByParent({vPos, vIndex, vEndLVec}) {
    super.rebuildByParent({vIndex})
    this.stepLength = this.parent.stepLength
    this.stepAngle = this.parent.stepAngle
    this.outRadius = this.parent.radius
    this.center = this.parent.center
    this.inRadius = this.parent.radius - this.stepLength
    this.clock = this.parent.clock
    this.endLVec = vEndLVec
    this.position = vPos
    if (this.inheritH) {
      this.stepHeight = this.parent.stepHeight
    }
    //若楼梯为顺时针，梯板倒着画，则需end向量逆时针旋转得到start向量
    let angle = this.clock ? -this.stepAngle : this.stepAngle
    this.startLVec = new UtilVec2(this.endLVec).round(angle).normalize().writePB()
    this.startAngle = new UtilVec2(this.startLVec).negate().getAngle()
    this.endAngle = new UtilVec2(this.endLVec).negate().getAngle()
    this.computeStepWidth()
    this.createArcBorder()
  }

  computeStepWidth() {
    let outArcWidth = this.parent.arcWidth
    let inArcWidth = outArcWidth * this.inRadius / this.outRadius
    this.stepWidth = (inArcWidth + outArcWidth) / 2
  }

  createArcBorder() {
    let stepOutline = this.createArcOutline(this.endLVec, this.endLVec, this.endAngle, this.endAngle)

    let treadOutline = stepOutline
    
    if (this.index !== this.parent.parent.realStepNum) {
      let backOffset = this.parent.parent.getTreadBackOffset()
      let treadInEndVec = this.getVecByOffset(this.outRadius, backOffset, this.endLVec)
      let treadOutEndVec = this.getVecByOffset(this.inRadius, backOffset, this.endLVec)
      let treadInEndAngle = new UtilVec2(treadInEndVec).negate().getAngle()
      let treadOutEndAngle = new UtilVec2(treadOutEndVec).negate().getAngle()
      treadOutline = this.createArcOutline(treadOutEndVec, treadInEndVec, treadOutEndAngle, treadInEndAngle)
    }

    this.border = new Types.TreadBorder({
      stepOutline: stepOutline,
      treadOutline: treadOutline,
      inIndex:[3],
      outIndex:[1],
      frontIndex:[2],
      backIndex:[0]
    })
  }

  /**
   *
   *获取沿弧线方向偏移后的点至圆心向量
   * @param {*} vRaius
   * @param {*} vOffset
   * @param {*} vStartVec 当前的点至圆心向量
   * @returns
   * @memberof ArcTread
   */
  getVecByOffset (vRaius, vOffset, vStartVec) {
    let angleOffset = Math.sinh(vOffset/vRaius)
    if (!this.clock) {
      angleOffset = -angleOffset
    }
    let vec = new UtilVec2(vStartVec).round(angleOffset).writePB()
    return vec
  }

  createArcOutline (vOutEndLVec, vInEndLVec, vOutEndAngle, vInEndAngle) {
    let outRadius = this.outRadius - this.parent.parent.girOffset
    let inRadius = this.inRadius + this.parent.parent.girOffset
    let p1 = new Edge().setByVec(this.center, vInEndLVec, -outRadius).p2
    let p2 = new Edge().setByVec(this.center, vOutEndLVec, -inRadius).p2
    let p3 = new Edge().setByVec(this.center, this.startLVec, -inRadius).p2
    let p4 = new Edge().setByVec(this.center, this.startLVec, -outRadius).p2
    let edge1 = new Types.Edge({p1:p1, p2:p2, type:Types.EdgeType.estraight})
    let edge2 = new Types.Edge({p1:p2, 
                                p2:p3, 
                                type:Types.EdgeType.earc, 
                                position:this.center, 
                                startAngle:vOutEndAngle,
                                endAngle:this.startAngle,
                                radius:inRadius,
                                isClockwise:!this.clock})
    //let edge2 = new Types.Edge({p1:p2, p2:p3, type:Types.EdgeType.estraight})
    let edge3 = new Types.Edge({p1:p3, p2:p4, type:Types.EdgeType.estraight})
    //let edge4 = new Types.Edge({p1:p4, p2:p1, type:Types.EdgeType.estraight})
    let edge4 = new Types.Edge({p1:p4,
                                p2:p1,
                                type:Types.EdgeType.earc,
                                position:this.center,
                                startAngle:this.startAngle,
                                endAngle:vInEndAngle,
                                radius:outRadius,
                                isClockwise:this.clock})
    let outline = new Types.Outline({edges:[edge1, edge2, edge3, edge4], isClose:true, isClock:this.clock})
    outline = new Outline(outline).setZCoord(this.position.z)
    return outline
  }

  getEndWVec () {
    let angle = this.clock ? Math.PI/2 : -Math.PI/2
    let endWVec = new UtilVec2(this.endLVec).round(angle).normalize().writePB()
    return endWVec
  }

  getStartWVec () {
    let angle = this.clock ? Math.PI/2 : -Math.PI/2
    let startWVec = new UtilVec2(this.startLVec).round(angle).normalize().writePB()
    return startWVec
  }

  getStartPos() {
    return this.border.stepOutline.edges[2].p2
  }

  getGirBorder(vSide, vArgs, vIsFirst, vInLast, vOutLast) {
    if (vArgs.type === Types.GirderType.gslab) {
      return super.getGirBorder(vSide, vArgs, vIsFirst, vInLast, vOutLast)
    }
    let utilE = this.getSideUtilE(vSide)
    let depth = this.parent.parent.treadParameters.depth
    utilE.setZCoord(this.position.z - depth)
    let inUtilE = utilE.clone(), outUtilE = utilE.clone()
    inUtilE.offset(vArgs.depth/2, vSide !== 'in')
    outUtilE.offset(vArgs.depth/2, vSide === 'in')
    inUtilE = this.extendGirUtilE(inUtilE)
    outUtilE = this.extendGirUtilE(outUtilE)
    let inRst, outRst
    if (vArgs.type === Types.GirderType.gsaw) {
      inRst = this.createSideSawBorder({utilE:inUtilE, vIsFirst, vArgs, vLast:vInLast})
      outRst = this.createSideSawBorder({utilE:outUtilE, vIsFirst, vArgs, vLast:vOutLast})
    } else {
      inRst = this.createSideSlabBorder({utilE:inUtilE, vIsFirst, vArgs, vLast:vInLast})
      outRst = this.createSideSlabBorder({utilE:outUtilE, vIsFirst, vArgs, vLast:vOutLast})
    }
    return new Types.TreadGirBorder({
      inEdges: inRst.edges,
      inTopEdges: inRst.topEdges,
      outEdges: outRst.edges,
      outTopEdges: outRst.topEdges,
      dir:this.getDirection()
    })
  }

  /**
   *
   *
   * @param {Edge} utilE
   * @returns
   * @memberof ArcTread
   */
  extendGirUtilE(utilE) {
    let backOffset = this.parent.parent.getTreadBackOffset()
    let girSLVec = this.getVecByOffset(utilE.radius, backOffset, this.startLVec)
    let girSAngle = new UtilVec2(girSLVec).negate().getAngle()
    let girP1 = new Edge().setByVec(this.center, girSLVec, -utilE.radius).p2
    let girELVec = this.endLVec, girEAngle = this.endAngle, girP2 = utilE.p2
    if (this.index !== this.parent.parent.realStepNum) {
      girELVec = this.getVecByOffset(utilE.radius, backOffset, this.endLVec)
      girEAngle = new UtilVec2(girELVec).negate().getAngle()
      girP2 = new Edge().setByVec(this.center, girELVec, -utilE.radius).p2
    }
    girP1.z = utilE.zCoord, girP2.z = utilE.zCoord
    let edge = new Types.Edge({p1:girP1, 
                              p2:girP2,
                              position:this.center,
                              radius:utilE.radius,
                              startAngle:girSAngle,
                              endAngle:girEAngle,
                              isClockwise:utilE.isClockwise,
                              type:Types.EdgeType.earc})
    return new Edge(edge)
  }

  createSideSawBorder ({utilE, vIsFirst, vArgs, vLast}) {
    let e1 = utilE.writePB(), e2 = null
    let tE1 = new Types.Edge({p1:utilE.getP1PB(), p2:utilE.getP1PB(), type:Types.EdgeType.estraight})
    let tE2 = utilE.writePB()
    let verHeight = this.getGirVerHeight(vArgs)
    if (vIsFirst && this.parent.index === 0 && this.parent.startHeight >= verHeight) {
      e1.p1.z = 0
      e1.p2.z = 0
    } else {
      let angle = Math.atan(this.stepHeight / this.stepWidth)
      e1.p1.z = Math.max(e1.p1.z - this.stepHeight - verHeight, 0)
      if (this.index === this.parent.parent.realStepNum) {
        e1.p2.z = e1.p2.z - verHeight - this.parent.parent.getTreadBackOffset() * Math.tan(angle)
      } else {
        e1.p2.z = Math.max(e1.p2.z - verHeight, 0)
      }
      if (e1.p1.z === 0 && e1.p2.z > 0 && (this.stepHeight - e1.p2.z) > 1) {
        let rate = e1.p2.z / this.stepHeight
        let angle = this.stepAngle * rate
        let utilE1 = utilE.clone()
        let breakPoi = utilE1.rotateP2(-angle).p2
        breakPoi.z = e1.p1.z
        e2 = new Types.Edge({p1:breakPoi, 
                            p2:e1.p2, 
                            startAngle:utilE1.endAngle, 
                            endAngle:e1.endAngle, 
                            position:e1.position, 
                            radius:e1.radius, 
                            isClockwise:e1.isClockwise,
                            type:Types.EdgeType.earc})
        e1.endAngle = utilE1.endAngle
        e1.p2 = breakPoi
      }
    }
    if (vIsFirst) {
      tE1.p1.z = e1.p1.z
    } else {
      tE1.p1.z -= this.stepHeight
    }
    let edges = [e1], topEdges = [tE1, tE2]
    e2 && edges.push(e2)
    this.adaptGirLastPois(topEdges, edges, vLast)
    return {edges, topEdges}
  }

  /**
   * 生成平板型大梁轮廓
   * @param {Edge} utilE 
   * @param {*} vIsFirst 
   * @param {Types.GirderParameters} vArgs 
   * @param {*} vLast 
   */
  createSideSlabBorder ({utilE, vIsFirst, vArgs, vLast}) {
    let e1 = utilE.writePB(), tE1 = utilE.writePB(), e2 = null, e3 = null
    let verHeight = this.getGirVerHeight(vArgs)
    let stepHeight = this.getNextTread()?.stepHeight || this.stepHeight
    let upVerHeight = this.getUpGirVerHeight(vArgs)
    e1.p1.z -= verHeight
    e1.p2.z -= (verHeight - stepHeight)
    tE1.p1.z += upVerHeight
    tE1.p2.z += (upVerHeight + stepHeight)
    if (vIsFirst && this.parent.index === 0 && this.parent.startHeight >= (verHeight - this.stepHeight)) {
      e1.p1.z = 0
      e1.p2.z = 0
    } else {
      e1.p1.z = e1.p1.z - (this.parent.index === 0 ? vArgs.bSuppotHeight : 0) > 0 ? e1.p1.z : 0
      e1.p2.z = e1.p2.z - (this.parent.index === 0 ? vArgs.bSuppotHeight : 0) > 0 ? e1.p2.z : 0
      if (e1.p1.z === 0 && e1.p2.z > 0) {
        let rate = (e1.p2.z - vArgs.bSuppotHeight)  / this.stepHeight
        let angle = this.stepAngle * rate
        let utilE1 = utilE.clone()
        let breakPoi = utilE1.rotateP2(-angle).p2
        breakPoi.z = e1.p1.z
        let upBreakPoi = new Types.Vector3(breakPoi)
        upBreakPoi.z = vArgs.bSuppotHeight
        e3 = new Types.Edge({p1:upBreakPoi, 
                            p2:e1.p2, 
                            startAngle:utilE1.endAngle, 
                            endAngle:e1.endAngle, 
                            position:e1.position, 
                            radius:e1.radius, 
                            isClockwise:e1.isClockwise,
                            type:Types.EdgeType.earc})
        e1.endAngle = utilE1.endAngle
        e1.p2 = breakPoi
        if (vArgs.bSuppotHeight) {
          e2 = new Types.Edge({p1:breakPoi, p2:upBreakPoi, type:Types.EdgeType.estraight})
        }
      }
      if (this.index === 1 && vArgs.fOffsetStep) {
        let rate = vArgs.fOffsetStep / this.stepWidth
        let angle = this.stepAngle * rate
        let newTE = utilE.clone().rotateP1(angle)
        newTE.p1.z += (upVerHeight - vArgs.fOffsetStep * Math.tan(angle))
        newTE.p2.z = tE1.p2.z
        let newE = utilE.clone().rotateP1(angle)
        newE.p1.z = e1.p1.z
        newE.p2.z = e1.p2.z
        tE1 = newTE
        e1 = newE
      }
    }
    let edges = [e1], topEdges = [tE1]
    e2 && edges.push(e2)
    e3 && edges.push(e3)
    this.adaptGirLastPois(topEdges, edges, vLast)
    return {edges, topEdges}
  }

  adaptGirLastPois(topEdges, botEdges, vLast) {
    if (vLast?.poi && (!tool.isVec3Equal(vLast.poi, botEdges[0].p1))) {
      //botPois.splice(0, 0, vLast.poi)
      if (vLast.poi.z === 0) {
        let e = new Types.Edge({p1:vLast.poi, p2:botEdges[0].p1, type:Types.EdgeType.estraight})
        botEdges.splice(0,0,e)
      } else {
        botEdges[0].p1 = vLast.poi
      }
    } 
    if (vLast?.topPoi && (!tool.isVec3Equal(vLast.topPoi, topEdges[0].p1))) {
      //topPois.splice(0, 0, vLast.topPoi)
      topEdges[0].p1 = vLast.topPoi
    }
  }
}