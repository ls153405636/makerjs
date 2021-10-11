import { D2 } from '..'
import { Command } from '../../common/command'

/**
 * 2D 初始化
 */
export class D2BootCmd extends Command {
  constructor() {
    super()
  }

  execute() {
    new D2().bootstrap()
  }
}
