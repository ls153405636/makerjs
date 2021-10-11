import { Command } from './command'

export class Action extends Command {
  constructor(...rest) {
    super(...rest)
    this.addHistory = false
  }
}
