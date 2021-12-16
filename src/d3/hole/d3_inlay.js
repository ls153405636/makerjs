import { Types } from "../../types/stair_v2";
import { ChildModel } from "../d3_child_model";


export class Inlay extends ChildModel {
  constructor (vParent, vPB) {
    super(vParent, vPB.uuid)
    this.init(vPB)
  }

  /**
   *
   *
   * @param {Types.Component} vPB
   * @memberof Inlay
   */
  init(vPB) {
    this.width = vPB.width
    this.disToStart = vPB.disToStart
    this.height = vPB.height
    this.offGround = vPB.offGround
  }
}