import { Types } from "../types/stair_v2";
import { ChildInfo } from "./child_info";

export class Girder extends ChildInfo {
  constructor (vParent, vInEdges, vOutEdges) {
    super(vParent)
    this.inRoute = new Types.Outline({ edges: vInEdges })
    this.outRoute = new Types.Outline({ edges: vOutEdges })
  }

  writePB () {
    return new Types.Girder({
      uuid: this.uuid,
      inRoute: this.inRoute,
      outRoute: this.outRoute,
    })
  }
}