import { Types } from "../types/stair_v2";
import { Edge } from "../utils/edge";
import { Default } from "./config";
import { ArcFlight } from "./flights/arc_flight";
import { Stair } from "./stair";
import {UtilVec2} from '../utils/util_vec_2'
import { Flight } from "./flights/flight";


export class ArcStair extends Stair {
  constructor(vParent, vAgainstWall, vFloadSide) {
    super(vParent, vAgainstWall)
    if (this.againstWallType === Types.AgainstWallType.aw_left) {
      this.floadSide = Types.Side.si_right
    } else if (this.againstWallType === Types.AgainstWallType.aw_right) {
      this.floadSide = Types.Side.si_left
    } else {
      this.floadSide = vFloadSide || Types.Side.si_right
    }
    this.stepLength = Default.STEP_LENGTH
    /**@type {Flight} */
    this.enterFlight = null
    /**@type {Flight} */
    this.exitFlight = null
    /**@type {ArcFlight} */
    this.arcFlight = null
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
    this.updateStairPositon()
    // this.updatehangingBoard()
    // this.updateGirders()
    // this.updateHandrails()
    // this.updateSmallColumns()
    // this.updateBigColumns()
    this.updateCanvas('Stair')
  }

  getArgs() {
    let args = super.getArgs()
    args.enterFlight = {
      name: this.enterFlight ?'移除入口楼梯段' : '添加入口楼梯段',
      state: this.enterFlight? 'add' : 'delete'
    }
    args.exitFlight = {
      name: this.exitFlight ?'移除出口楼梯段' : '添加出口楼梯段',
      state: this.exitFlight? 'delete' : 'add'
    }
  }

  initFlights() {
    let botEdge = this.parent.hole.getEdgeByPos('bot')
    let utilEndE = new Edge(botEdge)
    let vClock = this.floadSide === Types.Side.si_right ? true : false
    let vPos = new Types.Vector3({x:this.parent.hole.length - this.girOffset / 2, y:this.parent.hole.width - this.hangOffset})
    if (!vClock) {
      utilEndE.reserve()
      vPos.x = 0
    }
    let vRadius = Math.max(utilEndE.getLength() / 2, this.stepLength)
    let vStepNum = Math.floor(this.parent.hole.floorHeight / Default.STEP_HEIGHT)
    this.stepNum = vStepNum
    this.stepHeight = this.parent.hole.floorHeight / this.stepNum
    this.stepHeight = Number(this.stepHeight.toFixed(2))
    let vStepNumRule = this.stepNumRule
    let vEndLVec = new UtilVec2(utilEndE.getVec()).writePB()
    this.arcFlight = new ArcFlight({vParent:this, vStepNum, vStepNumRule, 
                                     vTreadIndex:0, 
                                     vIndex:0,
                                     isLast:true, vRadius, vClock, vEndLVec, vPos,
                                     vStartHeight:0})
    this.flights[0] = this.arcFlight      
    this.segments[0] = this.arcFlight                             
  }

  updateFlights() {
    let startHeight = this.startFlight?.getEndHeight() || 0
    if (this.enterFlight) {
      let enterParas = this.getEnterFRebuildParas()
      this.enterFlight.rebuildByParent(enterParas)
      startHeight = this.enterFlight.getEndHeight()
    }
    let arcParas = this.getArcFRebuildParas()
    arcParas.startHeight = startHeight
    this.arcFlight.rebuildByParent(arcParas)
    startHeight = this.arcFlight.getEndHeight()
    if (this.exitFlight) {
      let exitParas = this.getExitFRebuildParas()
      exitParas.startHeight = startHeight
      this.exitFlight.rebuildByParent(exitParas)
    }
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
    } else if (vKey1 === 'stepNumRule') {
      this.segments[this.segments.length - 1].updateItem(vValue, vKey1, vKey2)
    } else if (vKey1 === 'stepNum') {
      this.arcFlight.updateItem(vValue, vKey1, vKey2)
    } else {
      super.updateItem(vValue, vKey1, vKey2)
    }
  }

  getArcFRebuildParas() {
    let vPos = new Types.Vector3({x:this.parent.hole.length - this.girOffset / 2, y:this.parent.hole.width - this.hangOffset})
    if (this.floadSide === Types.Side.si_left) {
      vPos.x = 0
    }
    let vIndex = this.enterFlight ? 1 : 0
    let vTreadIndex = this.enterFlight?.treads.length || 0
    let isLast = this.exitFlight === null
    return {vPos, vIndex, vTreadIndex, isLast}
  }

  getExitFRebuildParas() {
    let lastT = this.arcFlight.treads[this.arcFlight.realStepNum.length - 1]
    let vTreadIndex = lastT.index + 1
    let vLVec = lastT.endLVec
    let vWVec = lastT.getEndWVec()
    let vPos = new Edge().setByVec(lastT.position, vLVec, -vLength).p2
    return {vTreadIndex, vPos, vLVec, vWVec}
  }

  getEnterFRebuildParas() {
    let vTreadIndex = 0
    let nextT = this.arcFlight.treads[0]
    let vPos = nextT.getStartPos()
    let vLVec = nextT.startLVec
    let vWVec = nextT.getStartWVec()
    let vStartHeight = 0
    return {vTreadIndex, vPos, vLVec, vWVec, vStartHeight}
  }

  addEnterFlight() {
    let vParent = this
    let vStepNum = 3
    let vStepNumRule = Types.StepNumRule.snr_n
    let vIndex = 0
    let isLast = false
    let vLength = vStepNum * Default.STEP_WIDTH
    let vClock = this.arcFlight.clock
    let vStepLength = this.stepLength
    let paras = this.getEnterFRebuildParas()
    let flight = new Flight({vParent, vStepNum, vStepNumRule, vIndex, isLast, vLength, vClock, vStepLength, ...paras})
    this.enterFlight = flight
    this.flights.splice(0, 0, flight)
    this.segments.splice(0, 0, flight)
    this.rebuild()
  }

  removeEnterFlight() {
    this.flights.splice(0, 1)
    this.segments.splice(0, 1)
    this.arcFlight.index = 0
    this.enterFlight = null
    this.rebuild()
  }

  addExitFlight() {
    let vParent = this
    let vLength = this.stairMoveT || Default.STEP_WIDTH * 3
    let realNum = Math.max(Math.floor(vLength / Default.STEP_WIDTH), 1) 
    let vStepNum = realNum + this.stepNumRule - 1
    let vStepNumRule = this.stepNumRule
    let isLast = true
    let vIndex = this.segments.length
    let vClock = this.arcFlight.clock
    let stepHeight = this.parent.hole.floorHeight / (this.stepNum + realNum)
    let vStartHeight = this.parent.hole.floorHeight - vStepNum * stepHeight
    let vStepLength = this.stepLength
    let paras = this.getExitFRebuildParas()
    let flight = new Flight({vParent, vStepNum, vStepNumRule, vIndex, isLast, vLength, vClock, vStepLength, vStartHeight, ...paras})
    this.stairMoveT = vLength
    this.arcFlight.treads = []
    if (this.arcFlight.stepNumRule === Types.StepNumRule.snr_n_add_1) {
      this.arcFlight.updateItem(Types.StepNumRule.snr_n, 'stepNumRule')
      this.arcFlight.updateItem(this.arcFlight.stepNum - 1, 'stepNum')
    }
    this.exitFlight = flight
    this.flights.push(this.exitFlight)
    this.segments.push(this.exitFlight)
    this.rebuild()
  }

  removeExitFlight() {
    if (this.exitFlight.stepNumRule === Types.StepNumRule.snr_n_add_1) {
      this.arcFlight.updateItem(Types.StepNumRule.snr_n_add_1, 'stepNumRule')
      this.arcFlight.updateItem(this.arcFlight.stepNum + 1, 'stepNum')
    }
    this.arcFlight.treads = []
    this.exitFlight = null
    this.flights.pop()
    this.segments.pop()
    this.stairMoveT = 0
    this.rebuild()
  }
}