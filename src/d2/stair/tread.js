import { Types } from '../../types/stair_v2'
import { BaseWidget } from '../base_widget'

export class Tread extends BaseWidget {
  /**
   *
   * @param {Types.Tread} vPB
   */
  constructor (vPB) {
    super()
    this.outline = vPB.outline
    this.draw()
  }

  draw () {
  }

  /**
   * 
   * @returns 获取当前组件的精灵图
   */
  getSprite () {
    return this.sprite
  }

  /**
   * 踏板只需要添加到父级，不需要添加到画布
   * 所以此处用空函数重写
   */
  addToStage () {}
}
