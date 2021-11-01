import { Action } from '../../common/action'
import { COMP_TYPES, CUR_DATA } from '../../common/common_config'
import store from '../../store'
import { StructConfig } from '../config'
import { Structure } from '../structure'

export class StrucSelecteCmd extends Action {
  constructor({ uuid, type }) {
    super()
    this.uuid = uuid
    this.type = type
  }

  execute() {
    if (this.type === COMP_TYPES.TREAD) {
      StructConfig.SELECTED = null
      store.commit('right_attribute/setCurType', this.type)
      return
    }
    this.info = StructConfig.INFOS.get(this.uuid)
    if (!this.info) {
      this.info = new Structure().stair || new Structure().hole
      this.type = new Structure().stair ? COMP_TYPES.STAIR : COMP_TYPES.HOLE
    }
    if (this.info && StructConfig?.uuid !== this.uuid) {
      StructConfig.SELECTED = this.info
      CUR_DATA.SELECTED_TYPE = this.type
      store.commit('right_attribute/setCurType', this.type)
      store.commit('right_attribute/setCurArgs', this.info.getArgs())
    }
  }
}
