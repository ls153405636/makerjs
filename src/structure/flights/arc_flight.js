import { Types } from '../../types/stair_v2'
import { Edge } from '../../utils/edge'
import { Default } from '../config'
import { ArcTread } from '../treads/arc_tread'
import { UtilVec2 } from '../../utils/util_vec_2'
import tool from '../tool'
import { Flight } from './flight'
import { SmallColumn } from '../small_column'

export class ArcFlight extends Flight{
  constructor({vParent, vStepNum, vStepNumRule, vRadius, vClock, vEndLVec}) {
    super({vParent, vClock})
    this.radius = vRadius
    this.clock = vClock
    this.endLVec = vEndLVec
    this.stepNum = vStepNum
    this.stepNumRule = vStepNumRule
    this.realStepNum = this.stepNum - this.stepNumRule + 1
    /**@type {Array<ArcTread>} */
    this.treads = []
    this.arcWidth = Default.ARC_WIDTH
    this.inSColArrRule = Types.ArrangeRule.arrFour
    let inArc = this.arcWidth * (this.radius - this.parent.stepLength) / this.radius
    if (inArc > 100) {
      this.outSColArrRule = Types.ArrangeRule.arrTwo
    } else {
      this.outSColArrRule = Types.ArrangeRule.arrHalf
    }
  }

  rebuildByParent({vPos, vIndex, vTreadIndex, vIsLast}) {
    super.rebuildByParent({vIndex, vTreadIndex, vIsLast})
    this.pos = vPos
    this.stepHeight = this.parent.stepHeight
    this.stepLength = this.parent.stepLength
    this.center = new Edge().setByVec(this.pos, this.endLVec, this.radius - this.parent.girOffset).p2
    this.stepAngle = 2* Math.sinh(this.arcWidth/2/this.radius)
    this.updateTreads()
  }

  getArgs() {
    let f = tool.getItemFromOptions
    let args = {
      stepLength: { name: '步长', value: this.stepLength, type: 'input' },
      radius: {name:'外弧半径', value:this.radius, type:'input'},
      arcWidth: {name:'外弧弧宽', value:this.arcWidth, type:'input'}
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
    args.inSColArrRule = {name:'外弧小柱规则', 
                          value:f(this.inSColArrRule, SmallColumn.IN_ARRANGR_RULE_OPTIONS),
                          type:'select',
                          options:SmallColumn.IN_ARRANGR_RULE_OPTIONS}
    args.outSColArrRule = {name:'内弧小柱规则',
                            value:f(this.outSColArrRule, SmallColumn.OUT_ARRANGR_RULE_OPTIONS),
                            type:'select',
                            options:SmallColumn.OUT_ARRANGR_RULE_OPTIONS}
    return args
  }

  updateTreads() {
    let step_num = this.realStepNum
    let treadPos = this.pos
    let endLVec = this.endLVec
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
      let vIndex = step_num - i + this.treadIndex
      let vPos = new Types.Vector3(treadPos) 
      vPos.z = heightSum
      let vEndLVec = new UtilVec2(endLVec).writePB()
      let paras = { ...commonParas, vIndex, vPos, vEndLVec}
      if (this.treads[step_num - i - 1]) {
        this.treads[step_num - i - 1].rebuildByParent(paras)
        heightSum = heightSum - this.treads[step_num - i - 1].stepHeight
      } else {
        this.treads[step_num - i - 1] = new ArcTread(paras)
        heightSum = heightSum - this.stepHeight
      }
      let lastT = this.treads[step_num - i - 1]
      treadPos = lastT.border.stepOutline.edges[3].p1
      endLVec = lastT.startLVec
    }
    if (this.stepNumRule === Types.StepNumRule.snr_n_add_1) {
      let angle = this.clock ? this.stepAngle : -this.stepAngle
      let vEndLVec = new UtilVec2(this.endLVec).round(angle).normalize().writePB()
      let vPos = new Edge().setByVec(this.center, vEndLVec, -this.radius).p2
      vPos.z = this.endHeight
      let paras = {
        ...commonParas, vPos, vEndLVec,
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

  updateItem(vValue, vKey, vSecondKey) {
    if (['stepNum', 'stepNumRule'].includes(vKey)) {
      super.updateItem(vValue, vKey, vSecondKey)
      this.realStepNum = this.stepNum - this.stepNumRule + 1
      this.parent.clearTreads()
    } else if (vKey === 'stepLength') {
      this.parent.updateItem(vValue, vKey, vSecondKey)
    } else {
      super.updateItem(vValue, vKey, vSecondKey)
    }
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

  getEndPosVec() {
    let lVec = this.endLVec
    let angle = this.clock ? Math.PI/2 : -Math.PI/2
    let wVec = new UtilVec2(this.endLVec).round(angle).normalize().writePB()
    let pos = new Types.Vector3(this.pos)
    return {lVec, wVec, pos}
  }

  getStartPosVec() {
    let lVec, wVec, pos
    let firstT = this.treads[0]
    if (firstT) {
      pos = firstT.getStartPos()
      lVec = firstT.startLVec
      wVec = firstT.getStartWVec()
    } else {
      let angle1 = this.clock ? -this.stepAngle * this.realStepNum : this.stepAngle * this.realStepNum
      lVec = new UtilVec2(this.endLVec).round(angle1).normalize().writePB()
      let angle2 = this.clock ? Math.PI/2 : -Math.PI/2
      wVec = new UtilVec2(lVec).round(angle2).normalize().writePB()
      pos = new Edge().setByVec(this.center, lVec, -this.radius).p2
    }
    return {lVec, wVec, pos}
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
    // let lastUtilE = null
    for (let i = 0; i < this.treads.length; i++) {
      if (this.treads[i].isLast) {
        continue
      }
      let edge = this.treads[i].getHandEdge(vSide, vArgs)
      if (!edge) {
        continue
      }
      edges.push(edge)
    }
    return edges
  }

  createSmallCols ({vSide, vArgs, vLastNum}) {
    vArgs = {
      ...vArgs,
      arrangeRule:this[vSide+'SColArrRule']
    } 
    return super.createSmallCols({vSide, vArgs, vLastNum})
  }
}