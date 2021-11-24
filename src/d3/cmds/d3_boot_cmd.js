import { Command } from '../../common/command'
import { D3Event } from '../d3_event'
import { D3Scene } from '../d3_scene'

export class D3BootCmd extends Command {
  constructor() {
    super()
  }

  // TODO
  execute() {
    new D3Scene().addToPage()
    new D3Event().dispatch()
  }
}
