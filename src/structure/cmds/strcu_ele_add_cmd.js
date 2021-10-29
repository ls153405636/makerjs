import { Command } from '../../common/command'
import { Inlay } from '../../d2/component/inlay'
import { Beam, Cloumn } from '../component'
import { StructConfig } from '../config'
import { HangingBoard } from '../hanging_board'

export class StrucEleAddCmd extends Command {
  constructor({ type }) {
    super()
    this.info = null
    if (type === '挂板') {
      this.info = new HangingBoard(StructConfig.SELECTED)
    } else if ([1, 2, 3].includes(type)) {
      this.info = new Inlay(StructConfig.SELECTED, type)
    } else if (type === 4) {
      this.info = new Cloumn(StructConfig.SELECTED, type)
    } else if (type === 5) {
      this.info = new Beam(StructConfig.SELECTED, type)
    }
  }

  execute() {
    this.info && this.info.addInfo()
  }

  undo() {
    this.info && this.info.delInfo()
  }

  redo() {
    this.info && this.info.addInfo()
  }
}
