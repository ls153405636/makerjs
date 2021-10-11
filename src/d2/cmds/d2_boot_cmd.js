import { Command } from '../../common/command'
import d2_action from '../d2_action'

/**
 * 2D 初始化
 */
export class D2BootCmd extends Command {
  constructor() {
    super()
  }

  execute() {
    d2_action.initD2()
  }
}
