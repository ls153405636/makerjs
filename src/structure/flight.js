import { Types } from "../types/stair_v2";
import { ChildInfo } from "./child_info";
import tool from "./tool";

export class Flight extends ChildInfo {
  constructor (vParent) {
    super (vParent)
    this.stepLength = this.parent.stepLength
    this.stepWidth = this.parent.stepWidth
    this.stepNumRule = this.parent.stepNumRule
    this.stepNum = this.parent.stepNum
  }

  update (vArgs) {

    this.isUpdateParent = true
    super.update(vArgs)
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