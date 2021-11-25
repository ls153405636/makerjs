import { Types } from '../types/stair_v2'
import { Edge } from '../utils/edge'
import { ChildInfo } from './child_info'
import { Default } from './config'
import { StartTread } from './start_tread'
import tool from './tool'
import { Tread } from './tread'

export class Flight extends ChildInfo {
  static NUM_RULE_OPTIONS = [
    { value: Types.StepNumRule.snr_n, label: 'n步' },
    { value: Types.StepNumRule.snr_n_add_1, label: 'n+1步' },
  ]
  constructor({vParent, vStepNum, vStepNumRule, vIndex, vTreadIndex, isLast, vPos, vLVec, vWVec, vLength, vClock = true}) {
    super(vParent)
    this.stepLength = Default.STEP_LENGTH
    this.length = vLength
    this.isLast = isLast
    this.index = vIndex
    /**@type {Array<Tread>} */
    this.treads = []
    this.startTread = false
    this.stepNum = vStepNum
    this.stepNumRule = vStepNumRule
    this.clock = vClock
    this.rebuildByParent({ vTreadIndex, vPos, vLVec, vWVec })
  }

  /**
   * 根据父级数据更新楼梯段
   * @param {Object} param0
   * 所有index均为在程序数组中从0开始的index
   */
  rebuildByParent({ vTreadIndex, vPos, vLVec, vWVec }) {
    this.treadIndex = vTreadIndex
    this.pos = vPos
    this.lVec = vLVec
    this.wVec = vWVec
    this.stepHeight = this.parent.stepHeight
    this.computeStepWidth()
    this.updateTreads()
  }

  updateItem(vValue, vKey, vSecondKey) {
    if (['stepNum', 'stepNumRule'].includes(vKey)) {
      this.treads = []
    }
    super.updateItem(vValue, vKey, vSecondKey)
  }

  getArgs() {
    let f = tool.getItemFromOptions
    let args = {
      length: { name: '总长', value: this.length, type: 'input' },
      stepLength: { name: '步长', value: this.stepLength, type: 'input' },
      stepWidthD: {
        name: '步宽',
        value: this.stepWidth,
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
      if (
        t.stepWidth !== this.stepWidth &&
        !stepWithArr.includes(t.stepWidth)
      ) {
        args.stepWidthD.value = args.stepWidthD.value + '/' + t.stepWidth
        stepWithArr.push(t.stepWidth)
      }
    }
    return args
  }

  updateTreads() {
    let step_num = this.stepNum + 1 - this.stepNumRule
    let widthSum = 0
    let commonParas = { vParent: this, vIsLast: false }
    for (let i = 0; i < step_num; i++) {
      let index = step_num - i + this.treadIndex
      let pos = new THREE.Vector2(this.pos.x, this.pos.y).addScaledVector(this.wVec,widthSum)
      let paras = { ...commonParas, vIndex: index, vPos: pos, vIsLast: false }
      if (this.treads[step_num - i - 1]) {
        if (i === step_num - 1 && this.startTread) {
          let gArgs = this.parent.girderParameters
          if (gArgs.type === Types.GirderType.gslab) {
            paras.pos = new Edge().setByVec(pos, this.lVec, -gArgs.depth).p2
          }
        }
        this.treads[step_num - i - 1].rebuildByParent(paras)
        widthSum = widthSum + this.treads[step_num - i - 1].stepWidth
      } else {
        if (i === step_num - 1 && this.startTread) {
          let gArgs = this.parent.girderParameters
          if (gArgs.type === Types.GirderType.gslab) {
            paras.pos = new Edge().setByVec(pos, this.lVec, -gArgs.depth).p2
          }
          
          this.treads[step_num - i - 1] = new StartTread(paras)
        }
        else {
          this.treads[step_num - i - 1] = new Tread(paras)
        }
        widthSum = widthSum + this.stepWidth
      }
    }
    if (this.stepNumRule === Types.StepNumRule.snr_n_add_1) {
      let pos = new THREE.Vector2(this.pos.x, this.pos.y).addScaledVector(
        this.wVec,
        -this.stepWidth - this.parent.hangOffset
      )
      let paras = {
        ...commonParas,
        vPos: pos,
        vIndex: this.stepNum + this.treadIndex,
        vIsLast: true,
      }
      if (this.treads[step_num]) {
        this.treads[step_num].rebuildByParent(paras)
      } else {
        this.treads[step_num] = new Tread(paras)
      }
    }
  }

  computeStepWidth() {
    if (this.treads.length) {
      let step_num = 0
      let widthSum = this.length
      for (const t of this.treads) {
        if (t.isLast) {
          continue
        }
        if (t.inheritW) {
          step_num++
        } else {
          widthSum = widthSum - t.stepWidth
        }
      }
      this.stepWidth = widthSum / step_num
    } else {
      let step_num = this.stepNum + 1 - this.stepNumRule
      this.stepWidth = this.length / step_num
    }
    this.stepWidth = Number(this.stepWidth.toFixed(2))
  }

  /**
   * 根据所引获取楼梯段戒指到此级的长度
   * @param {Number} vNum 为踏板在楼梯段的treads数组中的索引
   * @returns
   */
  getLengthByNum(vNum) {
    let step_num = this.stepNum + 1 - this.stepNumRule
    let i = step_num - 1
    let length = 0
    for (; i >= vNum; i--) {
      length = length + this.treads[i].stepWidth
    }
    return length
  }

  getTreadByNum(vNum) {
    return this.treads[vNum]
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
