import { Action } from "../../common/action";
import { COMP_TYPES, CUR_DATA } from "../../common/common_config";
import { D2Config } from "../config";

export class D2SelectCmd extends Action {
  constructor ({uuid, type}) {
    super()
    this.widget = D2Config.WIDGETS.get(uuid)
    this.type = type
  }

  execute () {
    if (D2Config.SELECTED) {
      if (CUR_DATA.SELECTED_TYPE === COMP_TYPES.SMALL_COLUMN) {
        D2Config.SELECTED.cancelSmallColSelected()
      } else {
        D2Config.SELECTED.cancelSelected()
      }
    }
    if (this.widget) {
      if (this.type === COMP_TYPES.SMALL_COLUMN) {
        this.widget = this.widget.parent
        this.widget.setSmallColSelected()
      } else {
        this.widget.setSelected()
      }
      D2Config.SELECTED = this.widget 
    }
  }
}