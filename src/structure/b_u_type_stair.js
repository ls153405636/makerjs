import { UTypeStair } from "./u_type_stair";
import { Types } from "../types/stair_v2"
import { Edge } from "../utils/edge"
import { Default } from "./config"
import { Flight } from "./flights/flight"
import { Landing } from "./flights/landing"
import tool from "./tool"


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
    this.depth2 = f3.length + f2.stepLength + this.hangOffset
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
    let pos1, pos2, pos3, wVec2, lVec1, lVec3
    if (this.floadSide === Types.Side.si_right) {
      pos1 = new Types.Vector3({x:this.girOffset, y:Default.STEP_LENGTH})
      pos2 = new Types.Vector3({x:width - Default.STEP_LENGTH, y:this.girOffset})
      pos3 = new Types.Vector3({x:width - this.girOffset, y:depth2 - this.hangOffset})
      wVec2 = new Types.Vector3({x:-1}),
      lVec1 = new Types.Vector3({x:1})
      lVec3 = new Types.Vector3({x:-1})
    } else {
      pos1 = new Types.Vector3({x:width - this.girOffset, y:Default.STEP_LENGTH})
      pos2 = new Types.Vector3({x:Default.STEP_LENGTH, y:this.girOffset})
      pos3 = new Types.Vector3({x:this.girOffset, y:depth2 - this.hangOffset})
      wVec2 = new Types.Vector3({x:1})
      lVec1 = new Types.Vector3({x:-1})
      lVec3 = new Types.Vector3({x:1})
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
                                  vLength:depth1 - Default.STEP_LENGTH,
                                  vClock:this.floadSide === Types.Side.si_right,
                                  vStartHeight:this.startFlight?.getEndHeight() || 0})
    this.flights[1] = new Flight({vParent:this, 
                                  vStepNum:num2, 
                                  vStepNumRule:Types.StepNumRule.snr_n, 
                                  vIndex:2, 
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
                                  vIndex:4, 
                                  vTreadIndex:num1+num2+Landing.STEP_NUM_MAP.get(Default.LANDING_TYPE)*2, 
                                  isLast:true, 
                                  vPos:pos3, 
                                  vLVec:lVec3, 
                                  vWVec:new Types.Vector3({y:-1}), 
                                  vLength:depth2 - Default.STEP_LENGTH,
                                  vClock:this.floadSide === Types.Side.si_right,
                                  vStartHeight:(num1+num2+Landing.STEP_NUM_MAP.get(Default.LANDING_TYPE)*2)*this.stepHeight})
  }

  updateFlights() {
    let f1 = this.flights[0]
    let f2 = this.flights[1]
    let f3 = this.flights[2]
    let pos1, pos2, pos3, wVec2, lVec1, lVec3
    let width = f1.stepLength+f3.stepLength+f2.length
    let depth2 = f2.stepLength+f3.length+this.hangOffset
    if (this.floadSide === Types.Side.si_right) {
      pos1 = new Types.Vector3({x:this.girOffset, y:f2.stepLength})
      pos2 = new Types.Vector3({x:width - f3.stepLength, y:this.girOffset})
      pos3 = new Types.Vector3({x:width - this.girOffset, y:depth2 - this.hangOffset})
      wVec2 = new Types.Vector3({x:-1})
      lVec1 = new Types.Vector3({x:1})
      lVec3 = new Types.Vector3({x:-1})
    } else {
      pos1 = new Types.Vector3({x:width - this.girOffset, y:f2.stepLength})
      pos2 = new Types.Vector3({x:f3.stepLength, y:this.girOffset})
      pos3 = new Types.Vector3({x:this.girOffset, y:depth2 - this.hangOffset})
      wVec2 = new Types.Vector3({x:1})
      lVec1 = new Types.Vector3({x:-1})
      lVec3 = new Types.Vector3({x:1})
    }
    f1.rebuildByParent({vTreadIndex:this.startStepNum, 
                        vPos:pos1, 
                        vLVec:lVec1, 
                        vWVec:new Types.Vector3({y:1}),
                        vStartHeight:this.startFlight?.getEndHeight() || 0})
    f2.rebuildByParent({vTreadIndex:this.startStepNum + f1.stepNum + this.landings[0].stepNum, 
                        vPos:pos2, 
                        vLVec:new Types.Vector3({y:1}), 
                        vWVec:wVec2,
                        vStartHeight:this.landings[0].getEndHeight(f1.getEndHeight())})
    f3.rebuildByParent({vTreadIndex:this.startStepNum + f1.stepNum + this.landings[0].stepNum + f2.stepNum + this.landings[1].stepNum, 
                        vPos:pos3, 
                        vLVec:lVec3, 
                        vWVec:new Types.Vector3({y:-1}),
                        vStartHeight:this.landings[1].getEndHeight(f2.getEndHeight()),
                        vClock:this.floadSide === Types.Side.si_right})
  }

  updateLandings () {
    let f1 = this.flights[0]
    let f2 = this.flights[1]
    let f3 = this.flights[2]
    let paras1 = {vParent:this, 
                  vTreadIndex:this.startStepNum + f1.stepNum,
                  vLastStepWidth:f1.stepWidth,
                  vNextStepWidth:f2.stepWidth,
                  vStartHeight:f1.getEndHeight(),
                  vIndex: 1}
    let paras2 = {vParent:this,
                  vLastStepWidth:f2.stepWidth,
                  vNextStepWidth:f3.stepWidth,
                  vStartHeight:f2.getEndHeight(),
                  vIndex: 3}
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

  updateSegments() {
    this.segments[0] = this.flights[0]
    this.segments[1] = this.landings[0]
    this.segments[2] = this.flights[1]
    this.segments[3] = this.landings[1]
    this.segments[4] = this.flights[2]
  }
}