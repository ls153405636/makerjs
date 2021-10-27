import { Types } from "../types/stair_v2";
import { ChildInfo } from "./child_info";


export class Handrail extends ChildInfo {
  constructor(vParent, vRoute, vWidth) {
    super (vParent)
    this.route = vRoute
    this.width = vWidth
  }

  writePB () {
    let pb = new Types.Handrail({
      uuid: this.uuid,
      route: this.route,
      width: this.width
    })
    return pb
  }
}