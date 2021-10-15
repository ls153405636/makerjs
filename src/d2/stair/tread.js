import { Types } from '../../types/stair_v2'
import { BaseWidget } from '../base_widget'

export class Tread extends BaseWidget {
  /**
   *
   * @param {Types.Tread} vPB
   */
  constructor(vPB, vParent) {
    super()
    this.outline = vPB.outline
    this.parent = vParent
  }

  draw() {}
}
