import { Command } from '../../common/command'
import { CUR_DATA } from '../../common/common_config'
import { Core } from '../../common/core'
import { StructConfig } from '../config'

export class StrucUpdateCmd extends Command {
  /**
   * 
   * @param {Map} vArgs 
   */
  constructor(vArgs) {
    super()
    this.newArgs = vArgs
    this.info = StructConfig.SELECTED
    if (this.info) {
      this.oldArgs = this.info.getArgItems(vArgs)
    }
  }

  execute() {
    this.info.update(this.newArgs)
    if (StructConfig.SELECTED && StructConfig.SELECTED.uuid === this.info.uuid) {
    }
  }

  undo() {}

  redo() {}

  setSelecte () {
    if (StructConfig.SELECTED && this.info && StructConfig.SELECTED.uuid === this.info.uuid) {
      let core = new Core()
      core.execute(new Command(core.cmds.SelecteCmd, {uuid:this.info.uuid, type:CUR_DATA.SELECTED_TYPE}))
    }
  }
}
