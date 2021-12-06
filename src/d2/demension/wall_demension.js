import { BaseWidget } from "../base_widget";

export class WallDemension extends BaseWidget {
  /**
   *
   * @param {Types.Wall} vPB
   */
  constructor(vPB) {
    super(vPB.uuid)
    this.init(vPB)
  }
  init() {
    console.log(2222)
  }
}