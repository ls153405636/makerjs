export class History {
  constructor() {
    if (!History.instance) {
      this.undos = []
      this.redos = []

      History.instance = this
    }
    return History.instance
  }

  /**
   *
   * @param {import('./command').Command} cmd
   */
  execute(cmd) {
    if (cmd.addHistory) {
      this.undos.push(cmd)
      this.redos = []
    }
    cmd.execute()
  }

  undo() {
    let cmd = null
    if (this.undos.length > 0) {
      cmd = this.undos.pop()
    }
    if (cmd) {
      cmd.undo()
      this.redos.push(cmd)
    }
  }

  redo() {
    let cmd = this.redos.pop()
    if (cmd) {
      cmd.execute()
      this.undos.push(cmd)
    }
  }

  clear() {
    this.undos = []
    this.redos = []
  }
}
