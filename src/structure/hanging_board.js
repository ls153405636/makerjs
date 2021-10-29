import { Types } from "../types/stair_v2";
import { ChildInfo } from "./child_info";
import { Default, StructConfig } from "./config";

export class HangingBoard extends ChildInfo {
  constructor(vParent) {
    super(vParent)
    this.depth = Default.HANG_BOARD_DEPTH
    this.width = this.parent.stepLength
  }

  addInfo() {
    this.parent.addHangingBoard(this)
    StructConfig.INFOS.set(this.uuid, this)
  }

  delInfo() {
    this.parent.addHangingBoard(null)
    StructConfig.INFOS.delete(this.uuid)
  }

  writePB() {
    return new Types.HangingBoard({
      depth: this.depth,
      width: this.width,
    })
  }
}
