import { Action } from "../../common/action";
import { Structure } from "../structure";

export class StrucHoleInitCmd extends Action {
  constructor ({type = 'rect'}) {
    super()
    this.type = type
  }

  execute () {
    new Structure().initHole(this.type)
  }
}