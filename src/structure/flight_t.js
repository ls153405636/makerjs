import { Types } from "../types/stair_v2";
import { Edge } from "../utils/edge";
import { ChildInfo } from "./child_info";
import { Default } from "./config";
import tool from "./tool";

export class Flight extends ChildInfo {
  static NUM_RULE_OPTIONS = [
    { value: Types.StepNumRule.snr_n, label: 'n步' },
    { value: Types.StepNumRule.snr_n_add_1, label: 'n+1步' },
  ]
  constructor ({vParent, vStepNum, vStepNumRule, vIndex, vStartEdge, vTreadIndex, isLast}) {
    super (vParent)
    this.stepLength = Default.STEP_LENGTH
    this.stepWidth = Default.STEP_WIDTH
    this.stepNumRule = vStepNumRule
    this.stepNum = vStepNum
    this.index = vIndex
    this.startEdge = vStartEdge
    this.treadIndex = vTreadIndex
    this.isLast = isLast
  }

  rebuild ({vStartEdge, vTreadIndex}) {
    this.startEdge = vStartEdge
    this.treadIndex = vTreadIndex
  }

  getTotalLength () {
    let step_num = this.stepNum - this.stepNumRule + 1
    return this.stepWidth * step_num
  }

  update (vArgItems) {
    super.update(vArgItems)
    this.parent.rebuild()
  }

  getArgs () {
    let f = tool.getItemFromOptions
    let args = {
      stepLength:{name:'步长', value:this.stepLength, type:'input'},
      stepWidth:{name:'步宽', value:this.stepWidth, type:'input'},
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
    return args
  }


  writePB () {
    let step_num = this.stepNum + 1 - this.stepNumRule
    let gArgs = this.parent.girderParameters
    let yOffset = this.parent.hangYOffset
    let xOffset = gArgs.type === Types.GirderType.gslab? gArgs.depth : 0
    let pb = new Types.Flight({
      uuid: this.uuid,
      stepParameters: new Types.StepParameters({
        stepLength: this.stepLength,
        stepWidth: this.stepWidth,
        stepNumRule: this.stepNumRule,
        stepNum: this.stepNum,
      }),
    })
    let utilEdge = new Edge(this.startEdge)
    let lengthVec = utilEdge.getVec()
    let widthVec = lengthVec.clone().rotateAround(new THREE.Vector2(0, 0), Math.PI / 2)
    let p1 = utilEdge.extendP1(-xOffset).p1
    let widthSum = 0
    for (let i = 0; i < step_num; i++) {
      let tread = new Types.Tread({
        index: step_num - i + this.treadIndex,
      })
      let ori = new THREE.Vector2(p1.x, p1.y).addScaledVector(widthVec, yOffset + widthSum)
      tread.stepOutline = tool.createRectOutline(
        new Types.Vector3({ x: ori.x, y: ori.y }),
        this.stepLength - 2 * xOffset,
        this.stepWidth,
        lengthVec,
        widthVec
      )
      pb.treads.push(tread)
      widthSum = widthSum + this.stepWidth
    }
    pb.treads.reverse()
    if (this.stepNumRule === Types.StepNumRule.snr_n_add_1) {
      let ori = new THREE.Vector2(p1.x, p1.y).addScaledVector(widthVec, -this.stepWidth)
      pb.treads.push(
        new Types.Tread({
          index: this.stepNum + this.treadIndex,
          isLast: true,
          stepOutline: tool.createRectOutline(
            new Types.Vector3({ x: ori.x, y: ori.y }),
            this.stepLength - 2 * xOffset,
            this.stepWidth,
            lengthVec,
            widthVec
          ),
        })
      )
    }
    return pb
  }
}