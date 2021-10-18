import { Types } from '../types/stair_v2'
import { BaseWidget } from "../base_widget";
import { Tread } from './tread'

export class Flight extends BaseWidget {
  /**
   *
   * @param {Types.Flight} vPB
   */
  constructor(vPB) {
    super()
    this.treads = []
    for (const t of vPB.treads) {
      this.treads.push(new Tread(t))
    }
    this.draw()
  }

  draw () {
    this.sprite = new PIXI.Container()
    for (const t of this.treads) {
      let treadSprite = t.getSprite()
      if (treadSprite) {
        this.sprite.addChild(treadSprite)
      }
    }
  }

  /**
   * 获取当前对象精灵图
   */
  getSprite () {
    return this.sprite
  }

  /**
   * 楼梯段只需要添加到父级，不需要添加到画布
   * 所以此处用空函数重写
   */
   addToStage () {}
}
