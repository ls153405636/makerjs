import { Action } from '../../common/action'
import { COMP_TYPES } from '../../common/common_config'
import d2_action from '../../d2/d2_action'
import d3_action from '../../d3/d3_action'
import store from '../../store'
import { StructConfig } from '../config'
import { Structure } from '../structure'

export class StrucStairInitCmd extends Action {
  constructor(args) {
    super()
    this.args = args
  }

  execute() {
    if (new Structure().stair) {
      new Structure().stair = null
      d2_action.clear()
      d3_action.clear()
    }
    new Structure().initStair(this.args)
    StructConfig.SELECTED = new Structure().stair
    store.commit('right_attribute/setCurType', COMP_TYPES.STAIR)
    store.commit('right_attribute/setCurArgs', StructConfig.SELECTED.getArgs())
  }
}
