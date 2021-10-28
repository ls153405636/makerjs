import { Action } from "../../common/action";
import { COMP_TYPES } from "../../common/common_config";
import store from "../../store";
import { StructConfig } from "../config";
import { Structure } from "../structure";


export class StrucSelectedCmd extends Action {
  constructor ({uuid, type}) {
    super()
    this.uuid = uuid
    this.type = type
  }

  execute () {
    if (!this.uuid) {
      this.info = new Structure().stair || new Structure().hole
      this.type = new Structure().stair ? COMP_TYPES.STAIR : COMP_TYPES.HOLE
    } else {
      this.info = StructConfig.INFOS.get(this.uuid)
    }
    if (this.info && StructConfig?.uuid !== this.uuid) {
      StructConfig.SELECTED = this.info
      store.commit('right_attribute/setCurType', this.type)
      store.commit('right_attribute/setCurArgs', this.info.getArgs())
    }
  }
}