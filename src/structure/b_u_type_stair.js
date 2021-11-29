import { UTypeStair } from "./u_type_stair";
import { Types } from "../types/stair_v2"
import { Edge } from "../utils/edge"
import { Default } from "./config"
import { Flight } from "./flight"
import { Landing } from "./landing"
import tool from "./tool"
import { StairBorder } from "./toolComp/stair_border"
import { StairEdge } from "./toolComp/stair_edge"


export class BigUTypeStair extends UTypeStair {
  constructor(vParnet, vAgainstWall, vFloadSide) {
    super(vParnet, vAgainstWall, vFloadSide)
    this.rebuild()
  }

  computeSize() {
    let f1 = this.flights[0]
    let f2 = this.flights[1]
    let f3 = this.flights[2]
    this.width = f1.stepLength + f2.length + f3.stepLength
    this.depth1 = f1.length + f2.stepLength
    this.depth2 = f3.length + f2.stepLength
    let hole = this.parent.hole
    this.height = hole.floorHeight
  }

  initFlights() {
    let hole = this.parent.hole
    let rightEdge = hole.getEdgeByPos('right')
    let topEdge = hole.getEdgeByPos('top')
    let width = new Edge(topEdge).getLength()
    let depth2 = new Edge(rightEdge).getLength()
    let fStepNum = this.realStepNum - Landing.STEP_NUM_MAP.get(Default.LANDING_TYPE) * 2
    let num3 = Math.floor((depth2 - Default.STEP_LENGTH) / Default.STEP_WIDTH)
    if (num3 < 1) {
      num3 = 1
      depth2 = Default.STEP_LENGTH + Default.STEP_WIDTH
    } 
    let num2 = Math.floor((width - Default.STEP_LENGTH * 2) / Default.STEP_WIDTH)
    if (num2 < 1) {
      num2 = 1
      width = Default.STEP_LENGTH * 2 + num2 * ((depth2 - Default.STEP_LENGTH)/num3)
    } 
    let num1 = fStepNum - num2 - num3
    num1 = Math.max(num1, 3)
    let depth1 = Default.STEP_LENGTH + num1 * ((depth2 - Default.STEP_LENGTH)/num3)
    depth1 = Number(depth1.toFixed(2))
    num3 = num3 + this.stepNumRule - 1
    this.stepNum = num1 + num2 + num3 + Landing.STEP_NUM_MAP.get(Default.LANDING_TYPE) * 2
    this.realStepNum = this.stepNum - this.stepNumRule + 1
    this.stepHeight = hole.floorHeight / this.stepNum
    this.stepHeight = Number(this.stepHeight.toFixed(2))
    let pos1, pos2, pos3, wVec2
    if (this.floadSide === Types.Side.si_right) {
      pos1 = new Types.Vector3({x:this.girOffset, y:Default.STEP_LENGTH})
      pos2 = new Types.Vector3({x:width - Default.STEP_LENGTH, y:this.girOffset})
      pos3 = new Types.Vector3({x:width - this.girOffset, y:depth2 - this.hangOffset})
      wVec2 = new Types.Vector3({x:-1})
    } else {
      pos1 = new Types.Vector3({x:width - Default.STEP_LENGTH + this.girOffset, y:Default.STEP_LENGTH})
      pos2 = new Types.Vector3({x:Default.STEP_LENGTH, y:this.girOffset})
      pos3 = new Types.Vector3({x:Default.STEP_LENGTH - this.girOffset, y:depth2 - this.hangOffset})
      wVec2 = new Types.Vector3({x:1})
    }
    this.flights[0] = new Flight({vParent:this, 
                                  vStepNum:num1, 
                                  vStepNumRule:Types.StepNumRule.snr_n, 
                                  vIndex:0, 
                                  vTreadIndex:0, 
                                  isLast:false, 
                                  vPos:pos1, 
                                  vLVec:new Types.Vector3({x:1}), 
                                  vWVec:new Types.Vector3({y:1}), 
                                  vLength:depth1 - Default.STEP_LENGTH,
                                  vStartHeight:this.startFlight?.getEndHeight() || 0})
    this.flights[1] = new Flight({vParent:this, 
                                  vStepNum:num2, 
                                  vStepNumRule:Types.StepNumRule.snr_n, 
                                  vIndex:1, 
                                  vTreadIndex:num1 + Landing.STEP_NUM_MAP.get(Default.LANDING_TYPE), 
                                  isLast:false, 
                                  vPos:pos2, 
                                  vLVec:new Types.Vector3({y:1}), 
                                  vWVec:wVec2, 
                                  vLength:width - Default.STEP_LENGTH * 2,
                                  vClock:this.floadSide === Types.Side.si_right, 
                                  vStartHeight:(num1 + Landing.STEP_NUM_MAP.get(Default.LANDING_TYPE))*this.stepHeight})
    this.flights[2] = new Flight({vParent:this, 
                                  vStepNum:num3, 
                                  vStepNumRule:this.stepNumRule, 
                                  vIndex:2, 
                                  vTreadIndex:num1+num2+Landing.STEP_NUM_MAP.get(Default.LANDING_TYPE)*2, 
                                  isLast:true, 
                                  vPos:pos3, 
                                  vLVec:new Types.Vector3({x:-1}), 
                                  vWVec:new Types.Vector3({y:-1}), 
                                  vLength:depth2 - Default.STEP_LENGTH,
                                  vStartHeight:(num1+num2+Landing.STEP_NUM_MAP.get(Default.LANDING_TYPE)*2)*this.stepHeight})
  }

  updateFlights() {
    let f1 = this.flights[0]
    let f2 = this.flights[1]
    let f3 = this.flights[2]
    let pos1, pos2, pos3, wVec2
    let width = f1.stepLength+f3.stepLength+f2.length
    let depth2 = f2.stepLength+f3.length
    if (this.floadSide === Types.Side.si_right) {
      pos1 = new Types.Vector3({x:this.girOffset, y:f2.stepLength})
      pos2 = new Types.Vector3({x:width - f3.stepLength, y:this.girOffset})
      pos3 = new Types.Vector3({x:width - this.girOffset, y:depth2 - this.hangOffset})
      wVec2 = new Types.Vector3({x:-1})
    } else {
      pos1 = new Types.Vector3({x:width - f1.stepLength + this.girOffset, y:f2.stepLength})
      pos2 = new Types.Vector3({x:f3.stepLength, y:this.girOffset})
      pos3 = new Types.Vector3({x:f2.stepLength - this.girOffset, y:depth2 - this.hangOffset})
      wVec2 = new Types.Vector3({x:1})
    }
    f1.rebuildByParent({vTreadIndex:this.startStepNum, 
                        vPos:pos1, 
                        vLVec:new Types.Vector3({x:1}), 
                        vWVec:new Types.Vector3({y:1}),
                        vStartHeight:this.startFlight?.getEndHeight() || 0})
    f2.rebuildByParent({vTreadIndex:this.startStepNum + f1.stepNum + this.landings[0].stepNum, 
                        vPos:pos2, 
                        vLVec:new Types.Vector3({y:1}), 
                        vWVec:wVec2,
                        vStartHeight:this.landings[0].getEndHeight(f1.getEndHeight())})
    f3.rebuildByParent({vTreadIndex:this.startStepNum + f1.stepNum + this.landings[0].stepNum + f2.stepNum + this.landings[1].stepNum, 
                        vPos:pos3, 
                        vLVec:new Types.Vector3({x:-1}), 
                        vWVec:new Types.Vector3({y:-1}),
                        vStartHeight:this.landings[1].getEndHeight(f2.getEndHeight())})
  }

  updateLandings () {
    let f1 = this.flights[0]
    let f2 = this.flights[1]
    let f3 = this.flights[2]
    let paras1 = {vParent:this, 
                  vTreadIndex:this.startStepNum + f1.stepNum,
                  vLastStepWidth:f1.stepWidth,
                  vNextStepWidth:f2.stepWidth,
                  vStartHeight:f1.getEndHeight()}
    let paras2 = {vParent:this,
                  vLastStepWidth:f2.stepWidth,
                  vNextStepWidth:f3.stepWidth,
                  vStartHeight:f2.getEndHeight()}
    let ori1, ori2
    if (this.floadSide === Types.Side.si_right) {
      ori1 = new Types.Vector3({x:this.girOffset, y:this.girOffset})
      ori2 = new Types.Vector3({x:f1.stepLength+f2.length, y:this.girOffset})
      paras1.vLastEdgeIndex = 2
      paras2.vLastEdgeIndex = 3
      paras1.vNextEdgeIndex = 1
      paras2.vNextEdgeIndex = 2
    } else {
      ori1 = new Types.Vector3({x:f1.stepLength+f2.length, y:this.girOffset})
      ori2 = new Types.Vector3({x:this.girOffset, y:this.girOffset})
      paras1.vLastEdgeIndex = 2
      paras2.vLastEdgeIndex = 1
      paras1.vNextEdgeIndex = 3
      paras2.vNextEdgeIndex = 2
    }
    paras1.vBorder = tool.createRectOutline(ori1, f1.stepLength - this.girOffset, f2.stepLength - this.girOffset)
    paras2.vBorder = tool.createRectOutline(ori2, f3.stepLength - this.girOffset, f2.stepLength - this.girOffset)
    if (this.landings.length) {
      this.landings[0].rebuildByParent(paras1)
      this.landings[1].rebuildByParent({...paras2, vTreadIndex:this.startStepNum+f1.stepNum+this.landings[0].stepNum+f2.stepNum})
    } else {
      this.landings[0] = new Landing(paras1)
      this.landings[1] = new Landing({...paras2, vTreadIndex:this.startStepNum+f1.stepNum+this.landings[0].stepNum+f2.stepNum})
    }
    this.landings[0].updateCorBigCol()
    this.landings[1].updateCorBigCol()
  }

  updateBorder() {
    let lSL = this.floadSide === Types.Side.si_right ? this.flights[0].stepLength : this.flights[2].stepLength
    let f2SL = this.flights[1].stepLength
    let rSL = this.floadSide === Types.Side.si_right ? this.flights[2].stepLength : this.flights[0].stepLength
    let lDepth = this.floadSide === Types.Side.si_right ? this.depth1 : this.depth2
    let rDepth = this.floadSide === Types.Side.si_right ? this.depth2 : this.depth1
    let lFlight = this.floadSide === Types.Side.si_right ? this.flights[0] : this.flights[2]
    let rFlight = this.floadSide === Types.Side.si_right ? this.flights[2] : this.flights[0]
    let lLand = this.floadSide === Types.Side.si_right ? this.landings[0] : this.landings[1]
    let rLand = this.floadSide === Types.Side.si_right ? this.landings[1] : this.landings[0]
    let inPois = []
    inPois[0] = {x:0, y:lDepth}
    inPois[1] = {x:0, y:f2SL}
    inPois[2] = {x:0, y:0}
    inPois[3] = {x:lSL, y:0}
    inPois[4] = {x:this.width - rSL, y:0}
    inPois[5] = {x:this.width, y:0}
    inPois[6] = {x:this.width, y:f2SL}
    inPois[7] = {x:this.width, y:rDepth}
    let inFlights = [lFlight, lLand, lLand, this.flights[1], rLand, rLand, rFlight]
    let outPois = []
    outPois[0] = {x:lSL, y:lDepth}
    outPois[1] = {x:lSL, y:f2SL}
    outPois[2] = {x:this.width - rSL, y:f2SL}
    outPois[3] = {x:this.width - rSL, y:rDepth}
    let outFlights = [lFlight, this.flights[1], rFlight]
    if (this.floadSide === Types.Side.si_left) {
      inPois.reverse()
      outPois.reverse()
      inFlights.reverse()
      outFlights.reverse()
    }
    let inEdges = []
    let outEdges = []
    for (let i = 0; i < inPois.length - 1; i++) {
      let p1 = inPois[i], p2 = inPois[i+1], f = inFlights[i]
      inEdges.push(new StairEdge(p1.x, p1.y, p2.x, p2.y, f)) 
    }
    for (let i = 0; i < outPois.length - 1; i++) {
      let p1 = outPois[i], p2 = outPois[i+1], f = outFlights[i]
      outEdges.push(new StairEdge(p1.x, p1.y, p2.x, p2.y,f))
    }
    outEdges[0].endCol = this.landings[0].corBigCol
    outEdges[1].startCol = this.landings[0].corBigCol
    outEdges[1].endCol = this.landings[1].corBigCol
    outEdges[2].startCol = this.landings[1].corBigCol
    if (this.border) {
      this.border.rebuild(inEdges, outEdges)
    } else {
      this.border = new StairBorder(inEdges, outEdges)
    }
  }

  getGirderInEdges () {
    let edges = this.border.in.edges
    return [
      new Edge(edges[0]).combineEdge(edges[1]),
      new Edge(new Edge(edges[2]).combineEdge(edges[3])).combineEdge(edges[4]),
      new Edge(edges[5]).combineEdge(edges[6])
    ]
  }
}