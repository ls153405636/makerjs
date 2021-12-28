import { Command } from "../../common/command";
import { Structure } from "../structure";


export class StrucChangeCmd extends Command {
  constructor({key, state}) {
    super()
    this.key = key
    this.state = state
  }

  execute() {
    let info = new Structure().stair
    if (this.key === 'enterFlight') {
      if (this.state === 'add') {
        info.addEnterFlight()
      } else {
        info.removeEnterFlight()
      }
    } else if (this.key === 'exitFlight') {
      if (this.state === 'add') {
        info.addExitFlight()
      } else {
        info.removeExitFlight()
      }
    }
  }
}