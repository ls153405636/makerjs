import { Types } from "../types/stair_v2";
import { ChildInfo } from "./child_info";

export class SmallColumn extends ChildInfo {
  constructor (vParent, vPosition, vSize) {
    super(vParent)
    this.position = vPosition
    this.size = vSize
  }

  writePB () {
    return new Types.SmallColumn({
      uuid: this.uuid,
      position: this.position,
      size: this.size
    })
  }
}