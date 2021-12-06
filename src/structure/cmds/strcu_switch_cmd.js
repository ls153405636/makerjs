import { Action } from "../../common/action";
import { CUR_DATA } from "../../common/common_config";
import d2_action from "../../d2/d2_action";
import d3_action from "../../d3/d3_action";
import store from "../../store";
import { Structure } from "../structure";


export class StrucSwitchCmd extends Action {
  constructor(vMode) {
    super()
    this.mode = vMode
  }

  execute() {
    CUR_DATA.MODE = this.mode
    store.commit('canvas/setCurMode', this.mode)
    let proj = new Structure().createProject()
    if (this.mode === '2d') {
      d2_action.importProject(proj)
    } else {
      d3_action.importProject(proj)
    }
  }
}