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
    // if (!this.endHeight) {
    //   this.computeEndHeight()
    // }
    this.computeEndHeight()
    return this.endHeight
  }

  /**
   * 根据某一侧创建出大梁的踏板单位轮廓集合
   * @param {string} vSide 
   * @param {Types.GirderParameters} vArgs 
   */
   createGirderRoute({vSide, vArgs, vInLast, vOutLast}) {
    let borders = []
    let inLast = vInLast, outLast = vOutLast
    for (let i = 0; i < this.treads.length; i++) {
      if (this.treads[i].isLast) {
        continue
      }
      let border = this.treads[i].getGirBorder(vSide, vArgs, i === 0 && (!inLast), inLast, outLast)
      if (border) {
        inLast = {
          poi:border.inEdges[border.inEdges.length - 1].p2,
          topPoi:border.inTopEdges[border.inTopEdges.length - 1].p2
        }
        outLast = {
          poi:border.outEdges[border.outEdges.length - 1].p2,
          topPoi:border.outTopEdges[border.outTopEdges.length - 1].p2
        }
        borders.push(border)
      }
    } 
    return borders
  }

  updateTreads() {}

  createHandEdges() {}

  createSmallCols() {}

  createSmallCols({vSide, vArgs, vLastNum}) {
    let sCols = []
    let lastNum = vLastNum
    for (let i = 0; i < this.treads.length; i++) {
      if (this.treads[i].isLast) {
        continue
      }
      let tSCols = this.treads[i].getSmallCols(vSide, vArgs, i === 0 && lastNum === 0, lastNum)
      lastNum = tSCols.length
      sCols = sCols.concat(tSCols)
    }
    return {sCols, lastNum}
  }
}