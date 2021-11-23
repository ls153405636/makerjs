import { Command } from '../../common/command'
import { Beam, Cloumn, Inlay } from '../component'
import { Core } from '../../common/core'
import { StructConfig } from '../config'
import { HangingBoard } from '../hanging_board'
import { COMP_TYPES, CUR_DATA } from '../../common/common_config'

export class StrucEleAddCmd extends Command {
  constructor({ type }) {
    super()
    this.info = null
    this.type = null
    if (type === 'hangingBoard') {
      this.info = new HangingBoard(StructConfig.SELECTED)
      this.type = COMP_TYPES.HANGING_BOARD
    } else if ([1, 2, 3].includes(type)) {
      this.info = new Inlay(StructConfig.SELECTED, type)
      this.type = COMP_TYPES.INLAY
    } else if (type === 4) {
      this.info = new Beam(StructConfig.SELECTED, type)
      this.type = COMP_TYPES.CEMENT_COMP
    } else if (type === 5) {
      this.info = new Cloumn(StructConfig.SELECTED, type)
      this.type = COMP_TYPES.CEMENT_COMP
    } else if (type === 'startFlight') {
      this.info = StructConfig.SELECTED.createStartFlight()
      this.type = COMP_TYPES.FLIGHT
    }
  }

  execute() {
    this.info && this.info.addInfo()
    this.setSelecte()
  }

  undo() {
    this.info && this.info.delInfo()
  }

  redo() {
    this.info && this.info.addInfo()
  }

  setSelecte() {
    if (this.info) {
      let core = new Core()
      core.execute(
        new Command(core.cmds.SelecteCmd, {
          uuid: this.info.uuid,
          type: this.type,
        })
      )
    }
  }
}
