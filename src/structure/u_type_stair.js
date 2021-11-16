import { Types } from "../types/stair_v2"
import { Edge } from "../utils/edge"
import { Outline } from "../utils/outline"
import { BigColumn } from "./big_column"
import { Default } from "./config"
import { Flight } from "./flight"
import { Girder } from "./girder"
import { Handrail } from "./handrail"
import { Landing } from "./landing"
import { SmallColumn } from "./small_column"
import { Stair } from "./stair"
import tool from "./tool"
import { StairBorder } from "./toolComp/stair_border"
import { StairEdge } from "./toolComp/stair_edge"


export class UTypeStair extends Stair {
  constructor(vParnet, vAgainstWall, vFloadSide) {
    super(vParnet, vAgainstWall)
    if (this.againstWallType === Types.AgainstWallType.aw_left) {
      this.floadSide = Types.Side.si_right
    } else if (this.againstWallType === Types.AgainstWallType.aw_right) {
      this.floadSide = Types.Side.si_left
    } else {
      this.floadSide = vFloadSide || Types.Side.si_right
    }
    this.gap = Default.U_TYPE_GAP
    this.landingWidth = Default.STEP_LENGTH
    this.rebuild()
  }

  rebuild() {
    this.hangOffset = this.hangingBoard?.depth || 0
    let gArgs = this.girderParameters
    this.girOffset = gArgs.type === Types.GirderType.gslab? gArgs.depth : 0
    this.computeSize()
    this.computePosition()
    this.computeStepHeight()
    this.computeSideOffset()
    this.updateBorder()
    this.updateFlights()
    // this.updateLandings()
    // this.stepNumRule = this.flights[1].stepNumRule
    // this.stepNum =
    //   this.flights[0].stepNum +
    //   this.flights[1].stepNum +
    //   this.landings[0].stepNum
    // this.updateGirders()
    // this.updateHandrails()
    // this.updateSmallColumns()
    // this.updateBigColumns()
    this.updateCanvas('Stair')
  }

  computeSize() {
    let hole = this.parent.hole
    this.height = hole.floorHeight
    if (this.flights.length === 0) {
      let topEdge = hole.getEdgeByPos('top')
      let rightEdge = hole.getEdgeByPos('right')
      this.width = new Edge(topEdge).getLength()
      this.depth2 = new Edge(rightEdge).getLength()
      this.initNum2 = Math.floor((this.depth2 - this.hangOffset) / Default.STEP_WIDTH)
      this.initNum1 = this.realStepNum - num2 - Landing.STEP_NUM_MAP.get(Default.LANDING_TYPE) * 2
      this.depth1 = Default.STEP_WIDTH * num1 + this.landingWidth
    } else {
      let f1 = this.flights[0]
      let f2 = this.flights[1]
      this.width = f1.stepLength + f2.stepLength + this.gap
      this.depth1 = f1.length + this.landingWidth
      this.depth2 = f2.length + this.landingWidth + this.hangOffset
    }
  }

  computePosition() {
    let topEdge = this.parent.hole.getEdgeByPos('top')
    let botEdge = this.parent.hole.getEdgeByPos('bot')
    this.position = new Types.Vector3()
    if (this.flights.length === 0) {
      this.position.y = topEdge.p1.y
    } else {
      let f2 = this.flights[1]
      this.position.y = botEdge.p1.y - f2.length - this.landingWidth
    }
    if (this.againstWallType === Types.AgainstWallType.aw_right) {
      this.position.x = topEdge.p1.x
    } else if (this.floadSide === Types.AgainstWallType.aw_left) {
      this.position.x = topEdge.p2.x - this.width
    } else {
      this.position.x = new Edge(topEdge).getCenter().x - this.width / 2
    }
  }

  updateBorder() {
    let f1SL = this.flights[0]?.stepLength || Default.STEP_LENGTH
    let f2SL = this.flights[1]?.stepLength || Default.STEP_LENGTH
    let inEdges, outEdges
    if (this.floadSide === Types.Side.si_left) {
      inEdges = [
        new StairEdge(this.width, this.depth1, this.width, this.landingWidth),
        new StairEdge(this.width, this.landingWidth, this.width, 0),
        new StairEdge(this.width, 0, f2SL+this.gap, 0),
        new StairEdge(f2SL+this.gap, 0, 0, 0),
        new StairEdge(0, 0, this.landingWidth, 0),
        new StairEdge(this.landingWidth, 0, this.depth2, 0)
      ]
      outEdges = [
        new StairEdge(f2SL+this.gap, this.depth1, f2SL+this.gap, this.landingWidth),
        new StairEdge(f2SL, this.landingWidth, f2SL, this.depth2)
      ]
    } else {
      inEdges = [
        new StairEdge(0, this.depth1, 0, this.landingWidth),
        new StairEdge(0, this.landingWidth, 0, 0),
        new StairEdge(0, 0, f1SL, 0),
        new StairEdge(f1SL, 0, this.width, 0),
        new StairEdge(this.width, 0, this.width, this.landingWidth),
        new StairEdge(this.width, this.landingWidth, this.width, this.depth2)
      ]
      outEdges = [
        new StairEdge(f1SL, this.depth1, f1SL, this.landingWidth),
        new StairEdge(f1SL+this.gap, this.landingWidth, f1SL+this.gap, this.depth2)
      ]
    }
    if (this.border) {
      this.border.rebuild(inEdges, outEdges)
    } else {
      this.border = new StairBorder(inEdges, outEdges)
    }
  }

  updateFlights() {
    let pos1, pos2
    if (this.floadSide === Types.Side.si_right) {
      let e1 = this.border.in.edges[0]
      let e2 = this.border.in.edges[5]
      pos1 = e1.offset(this.girOffset, false).p2
      pos2 = new Edge(e2.offset(this.girOffset, false)).extendP2(-this.hangOffset).p2
    } else {
      let e1 = this.border.out.edges[0]
      let e2 = this.border.out.edges[1]
      pos1 = e1.offSet(this.girOffset, true).p2
      pos2 = new Edge(e2.offset(this.girOffset, true)).extendP2(-this.hangOffset).p2
    }
    let wVec1 = new Types.Vector3({x:1})
    let wVec2 = new Types.Vector3({x:-1})

    if (this.flights.length === 2) {
      f1.rebuildByParent({vTreadIndex:0, 
                          vPos:pos1, 
                          vLVec:new Types.Vector3({y:1}), 
                          vWVec:wVec1})
      f2.rebuildByParent({vTreadIndex:f1.stepNum + this.landings[0].stepNum, 
                          vPos:pos2, 
                          vLVec:new Types.Vector3({y:-1}), 
                          vWVec:wVec2})
    } else {
      this.flights[0] = new Flight({vParent:this, 
                                    vStepNum:this.initNum1, 
                                    vStepNumRule:Types.StepNumRule.snr_n, 
                                    vIndex:0, 
                                    vTreadIndex:0, 
                                    isLast:false, 
                                    vPos:pos1, 
                                    vLVec:new Types.Vector3({y:1}), 
                                    vWVec:wVec1, 
                                    vLength:this.depth1 - this.landingWidth})
      this.flights[1] = new Flight({vParent:this, 
                                    vStepNum:this.initNum2, 
                                    vStepNumRule:this.stepNumRule, 
                                    vIndex:1, 
                                    vTreadIndex:num1 + Landing.STEP_NUM_MAP.get(Default.LANDING_TYPE), 
                                    isLast:true, 
                                    vPos:pos2, 
                                    vLVec:new Types.Vector3({y:-1}), 
                                    vWVec:wVec2, 
                                    vLength:this.depth2 - this.landingWidth})
    }
  }

  computeStepNum (vStepNum, vLength1, vLength2) {
    let step_num = vStepNum + 1 - this.stepNumRule
    let fStepNum
    if (this.landings.length) {
      fStepNum = step_num - this.landings[0].stepNum - this.landings[1].stepNum
    } else {
      fStepNum = step_num - Landing.STEP_NUM_MAP.get(Default.LANDING_TYPE) * 2
    }
    let firstNum = Math.ceil(vLength1 / (vLength1+vLength2) * fStepNum)
    let secondNum = fStepNum - firstNum + this.stepNumRule - 1
    return {
      firstNum: firstNum,
      secondNum: secondNum
    }
  }

  updateLandings () {
    let f1 = this.flights[0]
    let f2 = this.flights[1]
    let f1SL = this.flights[0].stepLength
    let f2SL = this.flights[1].stepLength
    let paras1 = {vParent:this, 
                  vTreadIndex:f1.stepNum,
                  vLastStepWidth:f1.stepWidth,
                  vNextStepWidth:f2.stepWidth}
    let paras2 = {vParent:this,
                  vLastStepWidth:f1.stepWidth,
                  vNextStepWidth:f2.stepWidth}
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
    paras1.border = tool.createRectOutline(ori1, f1SL - this.girOffset, this.landingWidth - this.girOffset)
    paras2.border = tool.createRectOutline(ori2, f2SL + this.gap - this.girOffset, this.landingWidth - this.girOffset)
  }
}