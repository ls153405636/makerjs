import { Action } from "../../common/action";
import { COMP_TYPES } from "../../common/common_config";
import store from "../../store";
import { StructConfig } from "../config";
import { Structure } from "../structure";

export class StrucHoleInitCmd extends Action {
  constructor ({type = 'rect'}) {
    super()
    this.type = type
  }

  execute () {
    new Structure().initHole(this.type)
    StructConfig.SELECTED = new Structure().hole
    store.commit('right_attribute/setCurType', COMP_TYPES.HOLE)
    store.commit('right_attribute/setCurArgs', StructConfig.SELECTED.getArgs())
  }
}