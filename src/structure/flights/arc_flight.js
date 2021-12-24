import { Types } from '../../types/stair_v2'
import { Edge } from '../../utils/edge'
import {ChildInfo} from '../child_info'
import { Default } from '../config'
import { ArcTread } from '../treads/arc_tread'

export class ArcFlight extends ChildInfo{
  constructor({vParent, vStepNum, vStepNumRule, vIndex, vTreadIndex, isLast, vRadius, vClock, vEndLVec, vPos, vStartHeight}) {
    super(vParent)
    this.radius = vRadius
    this.clock = vClock
    this.endLVec = vEndLVec
    this.stepNum = vStepNum
    this.stepNumRule = vStepNumRule
    this.arcWidth = Default.ARC_WIDTH
    this.rebuildByParent({vPos, vIndex, vTreadIndex, isLast, vStartHeight})
  }

  rebuildByParent({vPos, vIndex, vTreadIndex, isLast, vStartHeight}) {
    this.pos = vPos
    this.isLast = isLast
    this.index = vIndex
    this.treadIndex = vTreadIndex
    this.stepHeight = this.parent.stepHeight
    this.stepLength = this.parent.stepLength
    this.startHeight = vStartHeight
    this.realStepNum = this.stepNum - this.stepNumRule + 1
    this.center = new Edge().setByVec(this.pos, this.endLVec, this.radius).p2
    this.stepAngle = 2* Math.sinh(this.arcWidth/2/this.radius)
    this.inRaius = this.radius - this.stepLength
    this.computeEndHeight()
  }

  updateTreads() {
    let step_num = this.realStepNum
    let lastPos = this.pos
    let heightSum = this.endHeight
    if (this.stepNumRule === Types.StepNumRule.snr_n_add_1) {
      if (this.treads[this.stepNum - 1] && (!this.treads[this.stepNum - 1].inheritH)) {
        heightSum = heightSum - this.treads[this.stepNum - 1].stepHeight
      } else {
        heightSum = heightSum - this.stepHeight
      }
    }
    let commonParas = { vParent: this, vIsLast: false }
    for (let i = 0; i < step_num; i++) {
      let index = step_num - i + this.treadIndex
      let pos = new Types.Vector3(lastPos) 
      pos.z = heightSum
      let paras = { ...commonParas, vIndex: index, vPos: pos, vIsLast: false }
      if (this.treads[step_num - i - 1]) {
        this.treads[step_num - i - 1].rebuildByParent(paras)
        heightSum = heightSum - this.treads[step_num - i - 1].stepHeight
      } else {
        this.treads[step_num - i - 1] = new ArcTread(paras)
        heightSum = heightSum - this.stepHeight
      }
    }
    if (this.stepNumRule === Types.StepNumRule.snr_n_add_1) {
      pos = new Types.Vector3(lastPos) 
      pos.z = this.endHeight
      let paras = {
        ...commonParas,
        vPos: pos,
        vIndex: this.stepNum + this.treadIndex,
        vIsLast: true,
      }
      if (this.treads[step_num]) {
        this.treads[step_num].rebuildByParent(paras)
      } else {
        this.treads[step_num] = new ArcTread(paras)
      }
    }
  }

  computeEndHeight() {
    this.endHeight = this.startHeight
    for (const t of this.treads) {
      if (t.inheritH) {
        this.endHeight += this.stepHeight
      } else {
        this.endHeight = this.endHeight + t.stepHeight
      }
    }
    if (this.endHeight === this.startHeight) {
      this.endHeight += this.stepNum * this.stepHeight
    }
  }


}