import { Action } from "../../common/action";
import { Structure } from "../structure";

export class StrucHoleInitCmd extends Action {
  constructor (vType) {
    super()
    this.type = vType
  }

  execute () {
    new Structure().initHole(this.type)
  }
}