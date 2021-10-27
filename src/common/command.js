export class Command {
  constructor(cmd, args) {
    if (this.constructor.name === Command.name) {
      this.addHistory = true
      if (cmd == undefined) {
        throw 'No Such Command, Check Your Spelling.'
      }
      if (cmd?.d3) {
        this.d3cmd = new cmd.d3(args)
      }
      if (cmd?.d2) {
        this.d2cmd = new cmd.d2(args)
      }
      if (cmd?.struc) {
        this.strucCmd = new cmd.struc(args)
      }
    }
  }

  execute() {
    //
    this.d3cmd && this.d3cmd.execute()
    this.d2cmd && this.d2cmd.execute()
    this.strucCmd && this.strucCmd.execute()
  }

  undo() {
    this.d3cmd && this.d3cmd.undo()
    this.d2cmd && this.d2cmd.undo()
    this.strucCmd && this.strucCmd.execute()
  }

  redo() {
    this.d2cmd && this.d2cmd.redo()
    this.d3cmd && this.d3cmd.redo()
    this.strucCmd && this.strucCmd.execute()
  }
}
