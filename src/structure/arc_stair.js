import { Types } from "../types/stair_v2";
import { Edge } from "../utils/edge";
import { Default } from "./config";
import { ArcFlight } from "./flights/arc_flight";
import { Stair } from "./stair";
import {UtilVec2} from '../utils/util_vec_2'
import { RectFlight } from "./flights/rect_flight";
import { Girder } from "./girder";


export class ArcStair extends Stair {
  constructor(vParent, vAgainstWall, vFloadSide) {
    super(vParent, vAgainstWall)
    this.type = Types.StairType.s_arc_type
    if (this.againstWallType === Types.AgainstWallType.aw_left) {
      this.floadSide = Types.Side.si_right
    } else if (this.againstWallType === Types.AgainstWallType.aw_right) {
      this.floadSide = Types.Side.si_left
    } else {
      this.floadSide = vFloadSide || Types.Side.si_right
    }
    this.type = Types.StairType.s_arc_type
    this.stepLength = 1000
    /**@type {RectFlight} */
    this.enterFlight = null
    /**@type {RectFlight} */
    this.exitFlight = null
    /**@type {ArcFlight} */
    this.arcFlight = null
    this.rebuild()
  }

  getArgs() {
    let args = super.getArgs()
    args.enterFlight = {
      name: this.enterFlight ?'移除入口楼梯段' : '添加入口楼梯段',
      state: this.enterFlight? 'delete' : 'add'
    }
    args.exitFlight = {
      name: this.exitFlight ?'移除出口楼梯段' : '添加出口楼梯段',
      state: this.exitFlight? 'delete' : 'add'
    }
    if ( (!this.enterFlight) && (!this.exitFlight)) {
      if (args.smallColParameters?.value?.arrangeRule?.type) {
        args.smallColParameters.value.arrangeRule.type = ''
      } 
    }
    // if (args.girderParameters?.value?.type?.type) {
    //   args.girderParameters.value.type.type = ''
    // } 
    return args 
  }

  initSegments() {
    let botEdge = this.parent.hole.getEdgeByPos('bot')
    let utilEndE = new Edge(botEdge)
    let vParent = this
    let vClock = this.floadSide === Types.Side.si_right ? true : false
    if (!vClock) {
      utilEndE.reserve()
    }
    let vRadius = Math.max(utilEndE.getLength() / 2, this.stepLength)
    let vStepNum = Math.floor(this.parent.hole.floorHeight / Default.STEP_HEIGHT)
    let vStepNumRule = this.stepNumRule
    let vEndLVec = new UtilVec2(utilEndE.getVec()).writePB()

    this.arcFlight = new ArcFlight({vParent, vStepNum, vStepNumRule, vRadius, vClock, vEndLVec})

    this.flights.push(this.arcFlight)
    this.segments.push(this.arcFlight)
  }

  updateSegments() {
    let vArcPos = new Types.Vector3({x:this.parent.hole.length - this.girOffset, y:this.parent.hole.width - this.hangOffset})
    if (this.floadSide === Types.Side.si_left) {
      vArcPos.x = this.girOffset
    }
    if (this.exitFlight) {
      let angle = this.arcFlight.clock ? Math.PI/2 : -Math.PI/2
      let vWVec = new UtilVec2(this.arcFlight.endLVec).round(angle).normalize().writePB()
      this.exitFlight.rebuildByParent({vIndex:this.arcFlight.index + 1, 
                                       vTreadIndex:this.startStepNum + (this.enterFlight?.stepNum || 0) + this.arcFlight.stepNum, 
                                       vIsLast:true, 
                                       vPos:vArcPos, 
                                       vLVec:this.arcFlight.endLVec, vWVec})
      vArcPos = new Edge().setByVec(vArcPos, this.exitFlight.wVec, this.exitFlight.length).p2
    }
    this.arcFlight.rebuildByParent({vPos: vArcPos, 
                                    vIndex:this.enterFlight ? 1 : 0, 
                                    vTreadIndex:this.startStepNum + (this.enterFlight?.stepNum || 0), 
                                    vIsLast:this.exitFlight ? false : true})
    if (this.enterFlight) {
      let {lVec:vLVec, wVec:vWVec, pos:vPos} = this.arcFlight.getStartPosVec()
      this.enterFlight.rebuildByParent({vIndex:0, 
                                        vTreadIndex:this.startStepNum, 
                                        vIsLast:false, 
                                        vPos, vLVec, vWVec})
    }
  }

  computePosition() {
    let topEdge = this.parent.hole.getEdgeByPos('top')
    this.position = new Types.Vector3(topEdge.p1)
  }

  computeSize() {
    this.width = this.parent.hole.length
    this.depth = this.parent.hole.width
    this.height = this.parent.hole.floorHeight
  }

  addEnterFlight() {
    let vParent = this
    let vStepNum = 3
    let vStepNumRule = Types.StepNumRule.snr_n
    let vLength = vStepNum * Default.STEP_WIDTH
    let vClock = this.arcFlight.clock
    let vStepLength = this.stepLength
    this.enterFlight = new RectFlight({vParent, vStepNum, vStepNumRule, vLength, vClock, vStepLength})
    this.flights.splice(0, 0, this.enterFlight)
    this.segments.splice(0, 0, this.enterFlight)
    this.rebuild()
  }

  removeEnterFlight() {
    this.flights.splice(0, 1)
    this.segments.splice(0, 1)
    this.enterFlight = null
    this.rebuild()
  }

  addExitFlight() {
    let vParent = this
    let vStepNum = 4
    let vStepNumRule = this.stepNumRule
    let vLength = 3 * Default.STEP_WIDTH
    let vClock = this.arcFlight.clock
    let vStepLength = this.stepLength
    this.exitFlight = new RectFlight({vParent, vStepNum, vStepNumRule, vLength, vClock, vStepLength})
    if (this.arcFlight.stepNumRule === Types.StepNumRule.snr_n_add_1) {
      this.arcFlight.updateItem(Types.StepNumRule.snr_n, 'stepNumRule')
      this.arcFlight.updateItem(this.arcFlight.stepNum - 1, 'stepNum')
    }
    this.updateFlights()
    this.segments.push(this.exitFlight)
    this.rebuild()
  }

  removeExitFlight() {
    if (this.exitFlight.stepNumRule === Types.StepNumRule.snr_n_add_1) {
      this.arcFlight.updateItem(Types.StepNumRule.snr_n_add_1, 'stepNumRule')
      this.arcFlight.updateItem(this.arcFlight.stepNum + 1, 'stepNum')
    }
    this.exitFlight = null
    this.updateFlights()
    this.segments.pop()
    this.rebuild()
  }

  updateFlights() {
    this.flights = []
    this.enterFlight && this.flights.push(this.enterFlight)
    this.arcFlight && this.flights.push(this.arcFlight)
    this.exitFlight && this.flights.push(this.exitFlight)
    this.startFlight && this.flights.push(this.startFlight)
  }

  updateSideGirder (vSide) {
    let borders = [], inLast = null, outLast = null
    for (let i = 0; i < this.segments.length; i++) {
      let f = this.segments[i]
      let rst = f.createGirderRoute({vSide:vSide.sideName, 
                                    vArgs:this.girderParameters, 
                                    vInLast:inLast,
                                    vOutLast:outLast})
      let border = rst[rst.length - 1]
      inLast = border ? {poi:border.inEdges[border.inEdges.length - 1].p2,
                        topPoi:border.inTopEdges[border.inTopEdges.length - 1].p2} : null
      outLast = border ? {poi:border.outEdges[border.outEdges.length - 1].p2,
                          topPoi:border.outTopEdges[border.outTopEdges.length - 1].p2} : null
      borders = borders.concat(rst)
    }
    if (vSide.girders[0]) {
      vSide.girders[0].rebuildByParent(borders)
    } else {
      vSide.girders[0] = new Girder(this, borders)
    }
    this.girders.push(vSide.girders[0])
  }
}