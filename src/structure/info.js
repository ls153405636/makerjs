import { v4 } from 'uuid'
import { CUR_DATA } from '../common/common_config'
import { D2Config } from '../d2/config'
import d2_action from '../d2/d2_action'

export class Info {
  /**
   *
   * @param {Info} vParent
   */
  constructor(vParent) {
    this.uuid = v4()
    this.parent = vParent
    this.isUpdate2D = true
    this.isUpdate3D = true
  }

  addInfo() {}

  delInfo() {}

  rebuild() {}

  update() {}

  getArgs() {
    return {}
  }

  updateCanvas() {
    if (CUR_DATA.MODE === '2D' && this.isUpdate2D) {
      let widget = D2Config.WIDGETS.get(this.uuid)
      if (!widget) {
        d2_action.createWidget(this.writePB(), this.constructor.name)
      } else {
        widget.update(this.writePB())
      }
    }
  }

  setSelected() {}

  writePB() {}
}
