import {ChildInfo} from '../child_info'
import { Default } from '../config'

export class ArcFlight extends ChildInfo{
  constructor({vParent, vStepNum, vStepNumRule, vIndex, vTreadIndex, isLast, vRadius, vClock, vEndLVec, vPos}) {
    super(vParent)
    this.radius = vRadius
    this.clock = vClock
    this.endLVec = vEndLVec
    this.stepLength = Default.STEP_LENGTH
    this.stepNum = vStepNum
    this.stepNumRule = vStepNumRule
    this.rebuildByParent({vPos, vIndex, vTreadIndex, isLast})
  }

  rebuildByParent({vPos, vIndex, vTreadIndex}) {
    this.pos = vPos
    this.isLast = isLast
    this.index = vIndex
    this.treadIndex = vTreadIndex
  }

  updateTreads() {
    
  }


}