import { Action } from '../../common/action'
import { COMP_TYPES } from '../../common/common_config'
import { Structure } from '../structure'

export class StrucStairInitCmd extends Action {
  constructor(args) {
    super()
    this.args = args
  }

  execute() {
    new Structure().initStair(this.args)
    StructConfig.stair = new Structure().stair
    store.commit('right_attribute/setCurType', COMP_TYPES.STAIR)
    store.commit('right_attribute/setCurArgs', StructConfig.SELECTED.getArgs())
  }
}
