import { Action } from "../../common/action";
import d2_action from "../d2_action";


export class D2SwitchCmd extends Action {
  constructor(vMode) {
    super()
    this.mode = vMode
  }

  execute() {
    if (this.mode === '3d') {
      d2_action.clear()
      d2_action.dispose()
    } else {
      d2_action.dispatch()
    }
  }
}