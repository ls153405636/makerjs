import { BaseWidget } from '../base_widget'

/**楼梯中所有附属结构的基类
 * 此类对应的精灵图不需要添加到画布
 * 而需要添加到父级
 */
export class ChildWidget extends BaseWidget {
  constructor() {
    super()
  }

  /**
   * 作为附属部件，不需要添加到画布
   * 故用空函数重写添加函数
   */
  addToStage() {}

  /**
   * 附属部件需提供获取精灵图方法
   * @returns
   */
  getSprite() {
    return this.sprite
  }
}
