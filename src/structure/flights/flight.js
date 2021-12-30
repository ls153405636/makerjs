import { Types } from "../../types/stair_v2";
import { ChildInfo } from "../child_info";


export class Flight extends ChildInfo{
  static NUM_RULE_OPTIONS = [
    { value: Types.StepNumRule.snr_n, label: 'n步' },
    { value: Types.StepNumRule.snr_n_add_1, label: 'n+1步' },
  ]
  constructor({vParent, vClock}) {
    super(vParent)
    this.stepNum = 0
    this.stepNumRule = Types.StepNumRule.snr_n
    this.realStepNum = 0
    /**@type {Array<import('../treads/tread').Tread>} */
    this.treads = []
    this.startHeight = 0
    this.endHeight = 0
    this.endHeight = 0
    this.stepWidth = 0
    this.stepLength = 0
    this.stepHeight = 0
    this.index = 0
    this.treadIndex = 0
    this.clock = vClock
    this.isLast = false
    this.stepHeight = this.parent.stepHeight
  }

  rebuildByParent({vIndex, vTreadIndex, vIsLast}) {
    this.index = vIndex
    this.treadIndex = vTreadIndex
    this.isLast = vIsLast
    this.stepHeight = this.parent.stepHeight
  }

  updateItem(vValue, vKey, vSecondKey) {
    if (['stepNum', 'stepNumRule'].includes(vKey)) {
      super.updateItem(vValue, vKey, vSecondKey)
      this.realStepNum = this.stepNum - this.stepNumRule + 1
      this.parent.clearTreads()
    } else {
      super.updateItem(vValue, vKey, vSecondKey)
    }
  }

  clearTreads() {
    this.treads = []
    this.endHeight = 0
  }

  getStartPosVec() {
    return {lVec:new Types.Vector3(), wVec:new Types.Vector3(), pos:new Types.Vector3()}
  }

  getEndPosVec() {
    return {lVec:new Types.Vector3(), wVec:new Types.Vector3(), pos:new Types.Vector3()}
  }

  setStartHeight(vStartHeight) {
    this.startHeight = vStartHeight
    return this
  }

  computeEndHeight() {
    this.endHeight = this.startHeight
    for (const t of this.treads) {
      if (t.inheritH) {
        this.endHeight += this.parent.stepHeight
      } else {
        this.endHeight = this.endHeight + t.stepHeight
      }
    }
    if (this.endHeight === this.startHeight) {
      this.endHeight += this.stepNum * this.parent.stepHeight
    }
  }

  getEndHeight() {
    if (!this.endHeight) {
      this.computeEndHeight()
    }
    return this.endHeight
  }

  createGirderRoute() {}

  updateTreads() {}

  createHandEdges() {}

  createSmallCols() {}
}