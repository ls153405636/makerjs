import { Types } from "../types/stair_v2";
import { ChildInfo } from "./child_info";
import tool from "./tool";

export class Flight extends ChildInfo {
  static NUM_RULE_OPTIONS = [
    { value: Types.StepNumRule.snr_n, label: 'n步' },
    { value: Types.StepNumRule.snr_n_add_1, label: 'n+1步' },
  ]
  constructor (vParent) {
    super (vParent)
    this.rebuild()
  }

  rebuild () {
    this.stepLength = this.parent.stepLength
    this.stepWidth = this.parent.stepWidth
    this.stepNumRule = this.parent.stepNumRule
    this.stepNum = this.parent.stepNum
  }

  update (vArgItems) {
    this.parent.update(vArgItems)
  }

  getArgs () {
    let f = tool.getItemFromOptions
    return {
      stepLength:{name:'步长', value:this.stepLength, type:'input'},
      stepWidth:{name:'步宽', value:this.stepWidth, type:'input'},
      stepNumRule: {
        name: '步数规则',
        value: f(this.stepNumRule, Flight.NUM_RULE_OPTIONS),
        type: 'select',
        options: Flight.NUM_RULE_OPTIONS,
      },
      stepNum: { name: '步数', value: this.stepNum, type: 'input' },
    }
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
    for (let i = 0; i < step_num; i++) {
      let tread = new Types.Tread({
        index: step_num - i,
      })
      tread.stepOutline = tool.createRectOutline(
        new Types.Vector3({ x: xOffset, y: yOffset + this.stepWidth * i }),
        this.stepLength - 2 * xOffset,
        this.stepWidth
      )
      pb.treads.push(tread)
    }
    pb.treads.reverse()
    if (this.stepNumRule === Types.StepNumRule.snr_n_add_1) {
      pb.treads.push(
        new Types.Tread({
          index: this.stepNum,
          isLast: true,
          stepOutline: tool.createRectOutline(
            new Types.Vector3({ x: xOffset, y: -this.stepWidth }),
            this.stepLength - 2 * xOffset,
            this.stepWidth
          ),
        })
      )
    }
    return pb
  }
}