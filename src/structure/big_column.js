import { Types } from "../types/stair_v2";
import { ChildInfo } from "./child_info";
import tool from "./tool";


export class BigColumn extends ChildInfo {
  constructor (vParent, vPosition, vSize) {
    super(vParent)
    this.position = vPosition
    this.size = vSize
  }

  writePB () {
    return new Types.BigColumn({
      uuid: this.uuid,
      position: this.position,
      size: this.size
    })
  }
}