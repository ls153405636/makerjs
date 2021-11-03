import { History } from './history'

export class Core {
  constructor() {
    if (!Core.instance) {
      this.history = new History()

      /** @type { typeof import('./all_cmds').allCmds } */
      this.cmds = {}

      Core.instance = this
    }
    return Core.instance
  }

  setCmds(vCmds) {
    this.cmds = vCmds
  }

  execute(cmd) {
    this.history.execute(cmd)
  }

  undo() {
    this.history.undo()
  }

  redo() {
    this.history.redo()
  }
}
