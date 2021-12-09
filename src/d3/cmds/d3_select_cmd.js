import { Action } from "../../common/action";
import { CUR_DATA } from "../../common/common_config";
import { D3Config } from "../d3_config";
import { D3Scene } from "../d3_scene";


export class D3SelectCmd extends Action {
  constructor({ uuid, type }) {
    super()
    this.model = D3Config.MODELS.get(uuid)
    this.type = type
  }

  execute() {
    if (CUR_DATA.MODE === '2d') {
      return
    }
    if (D3Config.SELECTED) {
      D3Config.SELECTED.setSelected(false)
      D3Config.SELECTED = null
    }
    if (this.model) {
      this.model.setSelected(true)
      D3Config.SELECTED = this.model
    }
    new D3Scene().render()
  }
}