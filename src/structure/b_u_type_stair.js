import { UTypeStair } from "./u_type_stair";
import { Types } from "../types/stair_v2"
import { Edge } from "../utils/edge"
import { Default } from "./config"
import { RectFlight } from "./flights/rect_flight"
import { Landing } from "./flights/landing"
import tool from "./tool"


export class BigUTypeStair extends UTypeStair {
  constructor(vParent, vAgainstWall, vFloadSide) {
    super(vParent, vAgainstWall, vFloadSide)
    this.f1 = null
    this.f2 = null
    this.f3 = null
    this.l1 = null
    this.l2 = null
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

  initSegments() {
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
    let vParent = this, vClock = this.floadSide === Types.Side.si_right
    this.f1 = new RectFlight({vParent, vClock, 
                              vStepNum:num1, 
                              vStepNumRule:Types.StepNumRule.snr_n, 
                              vLength:depth1 - Default.STEP_LENGTH})
    this.f2 = new RectFlight({vParent, vClock, 
                              vStepNum:num2, 
                              vStepNumRule:Types.StepNumRule.snr_n, 
                              vLength:width - Default.STEP_LENGTH * 2}) 
    this.f3 = new RectFlight({vParent, vClock, 
                              vStepNum:num3, 
                              vStepNumRule:this.stepNumRule, 
                              vLength:depth2 - Default.STEP_LENGTH})

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

    this.flights.push(this.f1, this.f2, this.f3)
    this.landings.push(this.l1, this.l2)
    this.segments.push(this.f1, this.l1, this.f2, this.l2, this.f3)
  }

  updateSegments() {
    let pos1, pos2, pos3, wVec2, lVec1, lVec3
    let width = this.f1.stepLength + this.f3.stepLength + this.f2.length
    let depth2 = this.f2.stepLength + this.f3.length + this.hangOffset
    if (this.floadSide === Types.Side.si_right) {
      pos1 = new Types.Vector3({x:this.girOffset, y:this.f2.stepLength})
      pos2 = new Types.Vector3({x:width - this.f3.stepLength, y:this.girOffset})
      pos3 = new Types.Vector3({x:width - this.girOffset, y:depth2 - this.hangOffset})
      wVec2 = new Types.Vector3({x:-1})
      lVec1 = new Types.Vector3({x:1})
      lVec3 = new Types.Vector3({x:-1})
    } else {
      pos1 = new Types.Vector3({x:width - this.girOffset, y:this.f2.stepLength})
      pos2 = new Types.Vector3({x:this.f3.stepLength, y:this.girOffset})
      pos3 = new Types.Vector3({x:this.girOffset, y:depth2 - this.hangOffset})
      wVec2 = new Types.Vector3({x:1})
      lVec1 = new Types.Vector3({x:-1})
      lVec3 = new Types.Vector3({x:1})
    }
    this.f1.rebuildByParent({vIndex:0, 
                             vTreadIndex:this.startStepNum, 
                             vIsLast:false, 
                             vPos:pos1, 
                             vLVec:lVec1, 
                             vWVec:new Types.Vector3({y:1})})
    this.f2.rebuildByParent({vIndex:2, 
                             vTreadIndex:this.startStepNum + this.f1.stepNum + this.l1.stepNum, 
                             vIsLast:false, 
                             vPos:pos2, 
                             vLVec:new Types.Vector3({y:1}), 
                             vWVec:wVec2})
    this.f3.rebuildByParent({vIndex:4, 
                             vTreadIndex:this.startStepNum + this.f1.stepNum + this.l1.stepNum + this.f2.stepNum + this.l2.stepNum, 
                             vIsLast:true, 
                             vPos:pos3, 
                             vLVec:lVec3, 
                             vWVec:new Types.Vector3({y:-1})})


    let ori1, ori2
    if (this.floadSide === Types.Side.si_right) {
      ori1 = new Types.Vector3({x:this.girOffset, y:this.girOffset})
      ori2 = new Types.Vector3({x:this.f1.stepLength+this.f2.length, y:this.girOffset})
    } else {
      ori1 = new Types.Vector3({x:this.f1.stepLength+this.f2.length, y:this.girOffset})
      ori2 = new Types.Vector3({x:this.girOffset, y:this.girOffset})
    }
    let border1 = tool.createRectOutline(ori1, this.f1.stepLength - this.girOffset, this.f2.stepLength - this.girOffset)
    let border2 = tool.createRectOutline(ori2, this.f3.stepLength - this.girOffset, this.f2.stepLength - this.girOffset)
    this.l1.rebuildByParent({vIndex:1, 
                             vTreadIndex:this.startStepNum + this.f1.stepNum, 
                             vBorder:border1, 
                             vLastStepWidth:this.f1.stepWidth, 
                             vNextStepWidth:this.f2.stepWidth})
    this.l2.rebuildByParent({vIndex:3, 
                             vTreadIndex:this.startStepNum + this.f1.stepNum + this.l1.stepNum + this.f2.stepNum, 
                             vBorder:border2, 
                             vLastStepWidth:this.f2.stepWidth, 
                             vNextStepWidth:this.f3.stepWidth})

    this.l1.updateCorBigCol()
    this.l2.updateCorBigCol()
  }
}