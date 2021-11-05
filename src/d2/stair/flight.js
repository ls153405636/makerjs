import { Types } from '../../types/stair_v2'
import { BaseWidget } from '../base_widget'
import d2_tool from '../d2_tool'
import { Tread } from './tread'

export class Flight extends BaseWidget {
  /**
   *
   * @param {Types.Flight} vPB
   */
  constructor(vPB) {
    super(vPB.uuid)
    this.treads = []
    for (const t of vPB.treads) {
      this.treads.push(new Tread(t, this))
    }
    this.tread = vPB.treads
    // this.stepLength = d2_tool.translateValue(vPB.stepParameters.stepLength)
    // this.stepWidth = d2_tool.translateValue(vPB.stepParameters.stepWidth)
    this.draw()
  }

  draw() {
    this.sprite = new PIXI.Graphics()
    this.sprite.sortableChildren = true

    for (const t of this.treads) {
      let treadSprite = t.getSprite()
      if (treadSprite) {
        this.sprite.addChild(treadSprite)
      }
    }
  }

  destroy () {
    for (const t of this.treads) {
      t.destroy()
    }
    super.destroy()
  }

  /**
   * 获取当前对象精灵图
   */
  getSprite() {
    return this.sprite
  }

  setHover() {
    this.treads.forEach((t) => {
      t.setHover()
    })
  }

  cancelHover() {
    if (!this.isSelected) {
      this.treads.forEach((t) => {
        t.cancelHover()
      })
    }
  }

  setSelected() {
    this.treads.forEach((t) => {
      t.setSelected()
    })
  }

  cancelSelected() {
    this.treads.forEach((t) => {
      t.cancelSelected()
    })
  }

  /**
   * 楼梯段只需要添加到父级，不需要添加到画布
   * 所以此处用空函数重写
   */
  addToStage() {}
}
