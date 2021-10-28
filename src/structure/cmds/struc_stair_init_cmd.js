import { Action } from "../../common/action";
import { Structure } from "../structure";


export class StrucStairInitCmd extends Action {
  constructor (args) {
    super()
    this.type = args
  }

  execute () {
    new Structure().initStair(this.args)
  }
}