import { Types } from '../../types/stair_v2'
import { Edge } from '../../utils/edge'
import { Edge3 } from '../../utils/edge3'
import { Default } from '../config'
import tool from '../tool'
import { RectTread } from '../treads/rect_tread'
import { Flight } from './flight'
import { StraightFlight } from './straight_flight'

export class RectFlight extends StraightFlight {
  constructor({vParent, vStepNum, vStepNumRule, vLength, vClock = true, vStepLength}) {
    super({vParent, vClock})
    this.stepLength = vStepLength || Default.STEP_LENGTH
    this.length = Math.round(vLength)
    /**@type {Array<RectTread>} */
    this.treads = []
    this.stepNum = vStepNum
    this.stepNumRule = vStepNumRule
    this.realStepNum = this.stepNum - this.stepNumRule + 1
    this.fixedStepWidthNum = this.realStepNum
    this.type = Types.FlightType.frect
    //this.rebuildByParent({ vTreadIndex, vPos, vLVec, vWVec, vStartHeight })
  }

  /**
   * 根据父级数据更新楼梯段
   * @param {Object} param0
   * 所有index均为在程序数组中从0开始的index
   */
  rebuildByParent({vIndex, vTreadIndex, vIsLast, vPos, vLVec, vWVec}) {
    super.rebuildByParent({vIndex, vTreadIndex, vIsLast, vPos, vLVec, vWVec})
    if (this.parent.type === Types.StairType.s_arc_type) {
      this.stepLength = this.parent.stepLength
    }
    this.computeStepWidth()
    //this.computeEndHeight(this.startHeight)
    this.updateTreads()
  }

  updateItem(vValue, vKey, vSecondKey) {
    if (vKey === 'stepLength' && this.parent.type === Types.StairType.s_arc_type) {
      this.parent.updateItem(vValue, vKey, vSecondKey)
    } else {
      super.updateItem(vValue, vKey, vSecondKey)
    }
  }

  getArgs() {
    let f = tool.getItemFromOptions
    let args = {
      length: { name: '总长', value: this.length, type: 'input' },
      stepLength: { name: '步长', value: this.stepLength, type: 'input' },
      stepWidthD: {
        name: '步宽',
        value: '',
        type: 'input',
        disabled: true,
      },
    }
    if (this.isLast) {
      args.stepNumRule = {
        name: '步数规则',
        value: f(this.stepNumRule, Flight.NUM_RULE_OPTIONS),
        type: 'select',
        options: Flight.NUM_RULE_OPTIONS,
      }
    }
    args.stepNum = { name: '步数', value: this.stepNum, type: 'input' }
    args.name = '楼梯段参数'
    let stepWithArr = []
    for (const t of this.treads) {
      if (!stepWithArr.includes(t.stepWidth) && !t.isLast) {
        args.stepWidthD.value = args.stepWidthD.value + (args.stepWidthD.value? '/':'') + t.stepWidth
        stepWithArr.push(t.stepWidth)
      }
    }
    return args
  }

  updateTreads() {
    let step_num = this.realStepNum
    let widthSum = 0
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
      let pos = new Edge().setByVec(this.pos, this.wVec, widthSum).p2
      pos.z = heightSum
      let paras = { ...commonParas, vIndex: index, vPos: pos, vIsLast: false }
      if (this.treads[step_num - i - 1]) {
        this.treads[step_num - i - 1].rebuildByParent(paras)
        widthSum = widthSum + this.treads[step_num - i - 1].stepWidth
        heightSum = heightSum - this.treads[step_num - i - 1].stepHeight
      } else {
        this.treads[step_num - i - 1] = new RectTread(paras)
        widthSum = widthSum + this.stepWidth
        heightSum = heightSum - this.stepHeight
      }
    }
    if (this.stepNumRule === Types.StepNumRule.snr_n_add_1) {
      let pos = new Edge().setByVec(this.pos, this.wVec, -this.stepWidth - this.parent.hangOffset).p2
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
        this.treads[step_num] = new RectTread(paras)
      }
    }
  }

  computeStepWidth() {
    if (this.treads.length) {
      this.fixedLength = this.length
      this.fixedNum = this.realStepNum
      for (const t of this.treads) {
        if (t.isLast) {
          continue
        }
        if (!t.inheritW) {
          this.fixedNum--
          this.fixedLength -= t.stepWidth
        }
      }
      if (this.fixedNum) {
        this.stepWidth = this.fixedLength / this.fixedNum
      } else {
        this.stepWidth = this.length / this.realStepNum
      }
    } else {
      this.stepWidth = this.length / this.realStepNum
    }
    this.stepWidth = Number(this.stepWidth.toFixed(2))
  }

  getStepWidthRange() {
    let range = this.fixedLength - this.fixedNum * Default.STEP_WIDTH_MIN
    return Math.max(range, 0)
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

  /**
   *
   *创建某一侧的扶手路径边集
   * @param {Object} arguments[0]
   * @returns
   * @memberof Flight
   */
  createHandEdges({vSide, vArgs}) {
    let edges = []
    let lastUtilE = null
    for (let i = 0; i < this.treads.length; i++) {
      if (this.treads[i].isLast) {
        continue
      }
      let edge = this.treads[i].getHandEdge(vSide, vArgs)
      if (!edge) {
        continue
      }
      //edges.push(edge)
      if (lastUtilE && lastUtilE.isD3ParallelTo(edge)) {
        edges[edges.length - 1] = lastUtilE.combineEdge(edge)
      } else {
        edges.push(edge)
        lastUtilE = new Edge3(edge)
      }
    }
    return edges
  }

  createSmallCols({vSide, vArgs, vLastNum}) {
    let sCols = []
    let lastNum = vLastNum
    for (let i = 0; i < this.treads.length; i++) {
      if (this.treads[i].isLast) {
        continue
      }
      let tSCols = this.treads[i].getSmallCols(vSide, vArgs, i === 0, lastNum)
      lastNum = tSCols.length
      sCols = sCols.concat(tSCols)
    }
    return {sCols, lastNum}
  }

  writePB() {
    return new Types.Flight({
      uuid: this.uuid,
      stepParameters: new Types.StepParameters({
        stepLength: this.stepLength,
        stepWidth: this.stepWidth,
        stepNumRule: this.stepNumRule,
        stepNum: this.stepNum,
      }),
      treads: tool.writeItemArrayPB(this.treads),
    })
  }
}
