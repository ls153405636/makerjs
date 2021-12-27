import { Types } from "../types/stair_v2";
import { Edge } from "../utils/edge";
import { Default } from "./config";
import { ArcFlight } from "./flights/arc_flight";
import { Stair } from "./stair";
import {UtilVec2} from '../utils/util_vec_2'


export class ArcStair extends Stair {
  constructor(vParent, vFloadSide) {
    super(vParent)
    this.floadSide = vFloadSide
    this.stepLength = Default.STEP_LENGTH
    this.rebuild()
  }

  rebuild() {
    if (this.exitType === Types.StairExitType.se_hangingBoard) {
      this.hangOffset = this.hangingBoard?.depth || Default.HANG_BOARD_DEPTH
    } else {
      this.hangingBoard = null
      this.hangOffset = 0
    }
    let gArgs = this.girderParameters
    this.girOffset = gArgs.type === Types.GirderType.gslab? gArgs.depth : 0
    this.startStepNum = this.startFlight?.stepNum || 0
    this.computeSideOffset()
    if (this.flights.length) {
      this.computeStepNum()
      this.computeStepHeight()
      this.updateFlights()
    } else {
      this.initFlights()
    }
    this.updateStartFlight()
    this.updateLandings()
    this.updateSegments()
    this.computeSize()
    this.computePosition()
    // this.updateStairPositon()
    // this.updatehangingBoard()
    // this.updateGirders()
    // this.updateHandrails()
    // this.updateSmallColumns()
    // this.updateBigColumns()
    this.updateCanvas('Stair')
  }

  initFlights() {
    let botEdge = this.parent.hole.getEdgeByPos('bot')
    let utilEndE = new Edge(botEdge)
    let vClock = this.floadSide === Types.Side.si_right ? true : false
    (!vClock) && utilEndE.reserve()
    let vRadius = Math.max(utilEndE.getLength() / 2, this.stepLength)
    let vStepNum = Math.floor(this.parent.hole.floorHeight / Default.STEP_HEIGHT)
    this.stepNum = vStepNum
    this.stepHeight = this.parent.hole.floorHeight / this.stepNum
    this.stepHeight = Number(this.stepHeight.toFixed(2))
    let vStepNumRule = this.stepNumRule
    let vEndLVec = new UtilVec2(utilEndE.getVec()).writePB()
    let vPos = new Types.Vector3({x:this.parent.hole.length - this.girOffset / 2, y:this.parent.hole.width - this.hangOffset})
    this.flights[0] = new ArcFlight({vParent:this, vStepNum, vStepNumRule, 
                                     vTreadIndex:0, 
                                     vIndex:0,
                                     isLast:true, vRadius, vClock, vEndLVec, vPos,
                                     vStartHeight:0})
  }

  updateFlights() {
    let vPos = new Types.Vector3({x:this.parent.hole.length - this.girOffset / 2, y:this.parent.hole.width - this.hangOffset})
    this.flights[0].rebuildByParent({vPos, vIndex:0, vTreadIndex:0, isLast:true, vStartHeight:0})
  }

  computePosition() {
    let topEdge = this.parent.hole.getEdgeByPos('top')
    this.position = topEdge.p1
  }

  computeSize() {
    this.width = 0
    this.depth = 0
    this.height = this.parent.hole.floorHeight
  }

  updateItem(vValue, vKey1, vKey2) {
    if (vKey2 && ['model', 'material'].includes(vKey2)) {
      console.log(1)
    } else if (['stepNum','stepNumRule'].includes(vKey1)) {
      this.flights[0].updateItem(vValue, vKey1, vKey2)
    } else {
      super.updateItem(vValue, vKey1, vKey2)
    }
  }

  updateSegments() {
    this.segments[0] = this.flights[0]
  }
}