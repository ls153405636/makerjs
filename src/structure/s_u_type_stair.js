import { UTypeStair } from "./u_type_stair";
import { Types } from "../types/stair_v2"
import { Edge } from "../utils/edge"
import { Default } from "./config"
import { RectFlight } from "./flights/rect_flight"
import { Landing } from "./flights/landing"
import tool from "./tool"
import { Girder } from "./girder";

export class SmallUTypeStair extends UTypeStair {
  constructor(vParent, vAgainstWall, vFloadSide) {
    super(vParent, vAgainstWall, vFloadSide)
    this.gap = Default.U_TYPE_GAP
    this.landingWidth = Default.STEP_LENGTH
    this.type = Types.StairType.s_small_u_type
    let edgeLength = new Edge(this.parent.hole.getEdgeByPos('top')).getLength()
    if (edgeLength < 1800) {
      this.gap = 0
      this.landingWidth = edgeLength/2
    }
    this.f1 = null
    this.f2 = null
    this.l1 = null
    this.l2 = null
    this.rebuild()
  }

  computeSize() {
    let f1 = this.flights[0]
    let f2 = this.flights[1]
    this.width = f1.stepLength + f2.stepLength + this.gap
    this.depth1 = f1.length + this.landingWidth
    this.depth2 = f2.length + this.landingWidth + this.hangOffset
    let hole = this.parent.hole
    this.height = hole.floorHeight
  }

  getArgs() {
    let args = super.getArgs()
    let groups = {}
    let newArgs = {}
    for (const key in args) {
      if (args[key].type === 'group') {
        groups[key] = args[key]
      } else {
        newArgs[key] = args[key]
      }
    }
    newArgs.landingWidth = {value:this.landingWidth, name:'休息平台宽', type:'input'}
    newArgs.gap = {value:this.gap, name:'两段楼梯间隙', type:'input'}
    return {
      ...newArgs,
      ...groups
    }
  }

  initSegments() {
    let hole = this.parent.hole
    let rightEdge = hole.getEdgeByPos('right')
    let edgeLength = new Edge(this.parent.hole.getEdgeByPos('top')).getLength()
    let vStepLength = Default.STEP_LENGTH
    if (edgeLength < 1800) {
      vStepLength = edgeLength / 2
    }
    let depth2 = new Edge(rightEdge).getLength()
    let fStepNum = this.realStepNum - Landing.STEP_NUM_MAP.get(Default.LANDING_TYPE) * 2
    let num2 = Number(((depth2 - this.landingWidth) / Default.STEP_WIDTH).toFixed(0))
    let num1 = fStepNum - num2
    num1 = Math.max(num1, 3)
    let depth1 = this.landingWidth + num1 * ((depth2 - this.landingWidth)/num2)
    depth1 = Number(depth1.toFixed(2))
    num2 = num2 + this.stepNumRule - 1

    let vParent = this, vClock = this.floadSide === Types.Side.si_right
    this.f1 = new RectFlight({vParent, vClock, vStepLength, 
                              vStepNum: num1, 
                              vStepNumRule: Types.StepNumRule.snr_n, 
                              vLength: depth1 - this.landingWidth})
    this.f2 = new RectFlight({vParent, vClock, vStepLength,
                              vStepNum: num2,
                              vStepNumRule: this.stepNumRule,
                              vLength:depth2 - this.landingWidth - this.hangOffset})

    let lastEdgeIndex1, lastEdgeIndex2, nextEdgeIndex1, nextEdgeIndex2
    if (this.floadSide === Types.Side.si_right) {
      lastEdgeIndex1 = 2
      lastEdgeIndex2 = 3
      nextEdgeIndex1 = 1
      nextEdgeIndex2 = 2
    } else {
      lastEdgeIndex1 = 2
      lastEdgeIndex2 = 1
      nextEdgeIndex1 = 3
      nextEdgeIndex2 = 2
    }
    this.l1 = new Landing({vParent, vLastEdgeIndex:lastEdgeIndex1, vNextEdgeIndex:nextEdgeIndex1})
    this.l2 = new Landing({vParent, vLastEdgeIndex:lastEdgeIndex2, vNextEdgeIndex:nextEdgeIndex2})

    this.flights.push(this.f1, this.f2)
    this.landings.push(this.l1, this.l2)
    this.segments.push(this.f1, this.l1, this.l2, this.f2)
  }

  updateSegments() {
    let depth2 = this.f2.length + this.landingWidth + this.hangOffset
    let width = this.f1.stepLength + this.f2.stepLength + this.gap
    let pos1, pos2, lVec1, lVec2
    if (this.floadSide === Types.Side.si_right) {
      pos1 = new Types.Vector3({x:this.girOffset, y:this.landingWidth})
      pos2 = new Types.Vector3({x:width - this.girOffset, y:depth2 - this.hangOffset})
      lVec1 = new Types.Vector3({x:1})
      lVec2 = new Types.Vector3({x:-1})
    } else {
      pos1 = new Types.Vector3({x:width - this.girOffset, y:this.landingWidth})
      pos2 = new Types.Vector3({x:this.girOffset, y:depth2 - this.hangOffset})
      lVec1 = new Types.Vector3({x:-1})
      lVec2 = new Types.Vector3({x:1})
    }

    this.f1.rebuildByParent({vIndex:0, 
                             vTreadIndex:this.startStepNum, 
                             vIsLast:false, 
                             vPos:pos1, 
                             vLVec:lVec1, 
                             vWVec:new Types.Vector3({y:1})})
    this.f2.rebuildByParent({vIndex:3,
                             vTreadIndex:this.startStepNum + this.f1.stepNum + this.landings[0].stepNum + this.landings[1].stepNum,
                             vIsLast:true,
                             vPos:pos2,
                             vLVec:lVec2,
                             vWVec:new Types.Vector3({y:-1})})

    let ori1, ori2
    if (this.floadSide === Types.Side.si_right) {
      ori1 = new Types.Vector3({x:this.girOffset, y:this.girOffset})
      ori2 = new Types.Vector3({x:this.f1.stepLength, y:this.girOffset})
    } else {
      ori1 = new Types.Vector3({x:this.f2.stepLength + this.gap, y:this.girOffset})
      ori2 = new Types.Vector3({x:this.girOffset, y:this.girOffset})
    }
    let border1 = tool.createRectOutline(ori1, this.f1.stepLength - this.girOffset, this.landingWidth - this.girOffset)
    let border2 = tool.createRectOutline(ori2, this.f2.stepLength + this.gap - this.girOffset, this.landingWidth - this.girOffset)
    let vLastStepWidth = this.f1.stepWidth
    let vNextStepWidth = this.f2.stepWidth
    this.l1.rebuildByParent({vIndex:1, vLastStepWidth, vNextStepWidth,
                             vTreadIndex:this.startStepNum + this.f1.stepNum, 
                             vBorder:border1,})
    this.l2.rebuildByParent({vIndex:2, vLastStepWidth, vNextStepWidth,
                            vTreadIndex:this.startStepNum + this.f1.stepNum + this.l1.stepNum, 
                            vBorder:border2,})
    //this.l1.updateCorBigCol()
  }
  
  /**
   * 
   * @param {StairSide} vSide 
   */
   updateSideGirder (vSide) {
    for (let i = 0; i < 3; i++) {
      if (i === 1 && vSide.sideName === 'out' && this.girderParameters.type === Types.GirderType.gslab) {
        continue
      }
      let borders = [], inLast = null, outLast = null, flights = []
      if (i === 0) {
        flights = [null, this.flights[0], this.landings[0]]
      } else if (i === 1) {
        flights = [this.landings[0], null, this.landings[1]]
      } else if (i === 2) {
        flights = [this.landings[1], this.flights[1], null]
      }
      for (let k = 0; k < 3; k++) {
        let f = flights[k]
        if (f) {
          let rst = f.createGirderRoute({vSide:vSide.sideName, 
                                        vArgs:this.girderParameters, 
                                        vOrder:k === 0 ? 'next':'last',
                                        vInLast:inLast,
                                        vOutLast:outLast})
          let border = rst[rst.length - 1]
          inLast = border ? {
            poi:border.inEdges[border.inEdges.length - 1].p2,
            topPoi:border.inTopEdges[border.inTopEdges.length - 1].p2
          } : null
          outLast = border ? {
            poi:border.outEdges[border.outEdges.length - 1].p2,
            topPoi:border.outTopEdges[border.outTopEdges.length - 1].p2
          } : null
          borders = borders.concat(rst)
        }
      }
      if (vSide.girders[i]) {
        vSide.girders[i].rebuildByParent(borders)
      } else {
        vSide.girders[i] = new Girder(this, borders)
      }
      this.girders.push(vSide.girders[i])
    }
  }
}