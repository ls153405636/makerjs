import { UTypeStair } from "./u_type_stair";
import { Types } from "../types/stair_v2"
import { Edge } from "../utils/edge"
import { Default } from "./config"
import { Flight } from "./flights/flight"
import { Landing } from "./flights/landing"
import tool from "./tool"
import { StairBorder } from "./toolComp/stair_border"
import { StairEdge } from "./toolComp/stair_edge"
import { Girder } from "./girder";

export class SmallUTypeStair extends UTypeStair {
  constructor(vParnet, vAgainstWall, vFloadSide) {
    super(vParnet, vAgainstWall, vFloadSide)
    this.gap = Default.U_TYPE_GAP
    this.landingWidth = Default.STEP_LENGTH
    this.type = Types.StairType.s_small_u_type
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

  updateBorder() {
    let f1SL = this.flights[0].stepLength
    let f2SL = this.flights[1].stepLength
    let inEdges, outEdges
    if (this.floadSide === Types.Side.si_left) {
      inEdges = [
        new StairEdge(this.width, this.depth1, this.width, this.landingWidth, this.flights[0]),
        new StairEdge(this.width, this.landingWidth, this.width, 0, this.landings[0]),
        new StairEdge(this.width, 0, f2SL+this.gap, 0, this.landings[0]),
        new StairEdge(f2SL+this.gap, 0, 0, 0, this.landings[1]),
        new StairEdge(0, 0, 0, this.landingWidth, this.landings[1]),
        new StairEdge(0, this.landingWidth, 0, this.depth2, this.flights[1])
      ]
      outEdges = [
        new StairEdge(f2SL+this.gap, this.depth1, f2SL+this.gap, this.landingWidth, this.flights[0]),
        new StairEdge(f2SL, this.landingWidth, f2SL, this.depth2, this.flights[1])
      ]
      if (this.gap > 0) {
        outEdges.splice(1, 0, new StairEdge(f2SL+this.gap, this.landingWidth, f2SL, this.landingWidth))
      }
    } else {
      inEdges = [
        new StairEdge(0, this.depth1, 0, this.landingWidth, this.flights[0]),
        new StairEdge(0, this.landingWidth, 0, 0, this.landings[0]),
        new StairEdge(0, 0, f1SL, 0, this.landings[0]),
        new StairEdge(f1SL, 0, this.width, 0, this.landings[1]),
        new StairEdge(this.width, 0, this.width, this.landingWidth, this.landings[1]),
        new StairEdge(this.width, this.landingWidth, this.width, this.depth2, this.flights[1])
      ]
      outEdges = [
        new StairEdge(f1SL, this.depth1, f1SL, this.landingWidth, this.flights[0]),
        new StairEdge(f1SL+this.gap, this.landingWidth, f1SL+this.gap, this.depth2, this.flights[1])
      ]
      if (this.gap > 0) {
        outEdges.splice(1, 0, new StairEdge(f1SL, this.landingWidth, f1SL+this.gap, this.landingWidth))
      }
    }
    if (this.landings[0].corBigCol) {
      outEdges[0].endCol = this.landings[0].corBigCol
      outEdges[1].startCol = this.landings[0].corBigCol
    }
    if (this.border) {
      this.border.rebuild(inEdges, outEdges)
    } else {
      this.border = new StairBorder(inEdges, outEdges)
    }
  }

  initFlights() {
    let hole = this.parent.hole
    let rightEdge = hole.getEdgeByPos('right')
    let depth2 = new Edge(rightEdge).getLength()
    let width = Default.STEP_LENGTH * 2 + this.gap
    let fStepNum = this.realStepNum - Landing.STEP_NUM_MAP.get(Default.LANDING_TYPE) * 2
    let num2 = Number(((depth2 - this.landingWidth) / Default.STEP_WIDTH).toFixed(0))
    let num1 = fStepNum - num2
    num1 = Math.max(num1, 3)
    let depth1 = this.landingWidth + num1 * ((depth2 - this.landingWidth)/num2)
    depth1 = Number(depth1.toFixed(2))
    num2 = num2 + this.stepNumRule - 1
    this.stepNum = num1 + num2 + Landing.STEP_NUM_MAP.get(Default.LANDING_TYPE) * 2
    this.realStepNum = this.stepNum - this.stepNumRule + 1
    this.stepHeight = hole.floorHeight / this.stepNum
    this.stepHeight = Number(this.stepHeight.toFixed(2))
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
    this.flights[0] = new Flight({vParent:this, 
                                  vStepNum:num1, 
                                  vStepNumRule:Types.StepNumRule.snr_n, 
                                  vIndex:0, 
                                  vTreadIndex:0, 
                                  isLast:false, 
                                  vPos:pos1, 
                                  vLVec:lVec1, 
                                  vWVec:new Types.Vector3({y:1}), 
                                  vLength:depth1 - this.landingWidth,
                                  vStartHeight: 0,
                                  vClock:this.floadSide === Types.Side.si_right})
    this.flights[1] = new Flight({vParent:this, 
                                  vStepNum:num2, 
                                  vStepNumRule:this.stepNumRule, 
                                  vIndex:3, 
                                  vTreadIndex:num1 + Landing.STEP_NUM_MAP.get(Default.LANDING_TYPE) * 2, 
                                  isLast:true, 
                                  vPos:pos2, 
                                  vLVec:lVec2, 
                                  vWVec:new Types.Vector3({y:-1}), 
                                  vLength:depth2 - this.landingWidth - this.hangOffset,
                                  vStartHeight:(num1 + Landing.STEP_NUM_MAP.get(Default.LANDING_TYPE) * 2)*this.stepHeight,
                                  vClock:this.floadSide === Types.Side.si_right})
  }

  updateFlights() {
    let f1 = this.flights[0]
    let f2 = this.flights[1]
    let depth2 = f2.length + this.landingWidth
    let width = f1.stepLength + f2.stepLength + this.gap
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
    let startHeight2 = this.landings[1].getEndHeight(this.landings[0].getEndHeight(f1.getEndHeight()))
    f1.rebuildByParent({vTreadIndex:this.startStepNum, 
                        vPos:pos1, 
                        vLVec:lVec1, 
                        vWVec:new Types.Vector3({y:1}),
                        vStartHeight:this.startFlight?.getEndHeight() || 0,
                        vClock:this.floadSide === Types.Side.si_right})
    f2.rebuildByParent({vTreadIndex:this.startStepNum + f1.stepNum + this.landings[0].stepNum + this.landings[1].stepNum, 
                        vPos:pos2, 
                        vLVec:lVec2, 
                        vWVec:new Types.Vector3({y:-1}), 
                        vStartHeight:startHeight2,
                        vClock:this.floadSide === Types.Side.si_right})
  }

  updateLandings () {
    let f1 = this.flights[0]
    let f2 = this.flights[1]
    let f1SL = this.flights[0].stepLength
    let f2SL = this.flights[1].stepLength
    let paras1 = {vParent:this, 
                  vTreadIndex:this.startStepNum + f1.stepNum,
                  vLastStepWidth:f1.stepWidth,
                  vNextStepWidth:f2.stepWidth,
                  vStartHeight:f1.getEndHeight(),
                  vIndex: 1}
    let paras2 = {vParent:this,
                  vLastStepWidth:f1.stepWidth,
                  vNextStepWidth:f2.stepWidth,
                  vIndex: 2}
    let ori1, ori2
    if (this.floadSide === Types.Side.si_right) {
      ori1 = new Types.Vector3({x:this.girOffset, y:this.girOffset})
      ori2 = new Types.Vector3({x:f1SL, y:this.girOffset})
      paras1.vLastEdgeIndex = 2
      paras2.vLastEdgeIndex = 3
      paras1.vNextEdgeIndex = 1
      paras2.vNextEdgeIndex = 2
    } else {
      ori1 = new Types.Vector3({x:f2SL+this.gap, y:this.girOffset})
      ori2 = new Types.Vector3({x:this.girOffset, y:this.girOffset})
      paras1.vLastEdgeIndex = 2
      paras2.vLastEdgeIndex = 1
      paras1.vNextEdgeIndex = 3
      paras2.vNextEdgeIndex = 2
    }
    paras1.vBorder = tool.createRectOutline(ori1, f1SL - this.girOffset, this.landingWidth - this.girOffset)
    paras2.vBorder = tool.createRectOutline(ori2, f2SL + this.gap - this.girOffset, this.landingWidth - this.girOffset)
    if (this.landings.length) {
      this.landings[0].rebuildByParent(paras1)
      this.landings[1].rebuildByParent({...paras2, 
                                        vTreadIndex:this.startStepNum + f1.stepNum+this.landings[0].stepNum,
                                        vStartHeight:this.landings[0].getEndHeight()})
    } else {
      this.landings[0] = new Landing(paras1)
      this.landings[1] = new Landing({...paras2, 
                                      vTreadIndex:f1.stepNum+this.landings[0].stepNum,
                                      vStartHeight:this.landings[0].getEndHeight()})
    }
    this.landings[0].updateCorBigCol()
  }

  getGirderInEdges () {
    let edges = this.border.in.edges
    return [
      new Edge(edges[0]).combineEdge(edges[1]),
      new Edge(edges[2]).combineEdge(edges[3]),
      new Edge(edges[4]).combineEdge(edges[5])
    ]
  }

  updateSegments() {
    this.segments[0] = this.flights[0]
    this.segments[1] = this.landings[0]
    this.segments[2] = this.landings[1]
    this.segments[3] = this.flights[1]
  }

  /**
   * 
   * @param {StairSide} vSide 
   */
   updateSideGirder (vSide) {
    for (let i = 0; i < 3; i++) {
      let borders = [], inLast = null, outLast = null, flights = []
      if (i === 0) {
        flights = [null, this.flights[0], this.landings[0]]
      } else if (i === 1) {
        flights = [this.landings[0], null, this.landings[1]]
      } else if (i === 2) {
        flights = [this.landings[1], this.flights[1], null]
      }
      for (let i = 0; i < 3; i++) {
        let f = flights[i]
        if (f) {
          let rst = f.createGirderRoute({vSide:vSide.sideName, 
                                        vArgs:this.girderParameters, 
                                        vOrder:i === 0 ? 'next':'last',
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