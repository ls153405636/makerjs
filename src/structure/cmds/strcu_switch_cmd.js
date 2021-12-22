import { Action } from "../../common/action";
import { Command } from "../../common/command";
import { CUR_DATA } from "../../common/common_config";
import { Core } from "../../common/core";
import d2_action from "../../d2/d2_action";
import d3_action from "../../d3/d3_action";
import { D3Scene } from "../../d3/d3_scene";
import store from "../../store";
import { StructConfig } from "../config";
import { Structure } from "../structure";


export class StrucSwitchCmd extends Action {
  constructor(vMode) {
    super()
    this.mode = vMode
  }

  execute() {
    CUR_DATA.MODE = this.mode
    store.commit('canvas/setCurMode', this.mode)
    if (StructConfig.SELECTED) {
      let core = new Core()
      core.execute(new Command(core.cmds.SelecteCmd, {uuid:null}))
    }
    let proj = new Structure().createProject()
    if (this.mode === '2d') {
      d2_action.importProject(proj)
    } else {
      d3_action.importProject(proj)
      let {size, center} = new Structure().stair?.getBoxInfo() || new Structure().hole.getBoxInfo()
      new D3Scene().resetCamera(size, center)
      new D3Scene().render()
    }
  }
}