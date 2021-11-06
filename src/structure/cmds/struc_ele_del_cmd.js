import { Command } from '../../common/command'
import { COMP_TYPES, CUR_DATA } from '../../common/common_config'
import { StructConfig } from '../config'

export class StrucEleDelCmd extends Command {
  constructor({ type }) {
    super()
    if (type === '挂板') {
      this.info = StructConfig.SELECTED?.hangingBoard
    } else {
      this.info = StructConfig.SELECTED
    }
    this.type = CUR_DATA.SELECTED_TYPE
  }

  execute() {
    this.info && this.info.delInfo()
  }

  undo() {
    this.info && this.info.addInfo()
  }

  redo() {
    this.info && this.info.delInfo()
  }
}
