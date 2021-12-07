import { Action } from "../../common/action";
import d3_action from "../d3_action";
import { D3Event } from "../d3_event";


export class D3SwitchCmd extends Action {
  constructor(vMode) {
    super()
    this.mode = vMode
  }

  execute() {
    if(this.mode === '2d') {
      d3_action.clear()
      //new D3Event().dispose()
    } else {
      //new D3Event().dispatch()
    }
  }
}