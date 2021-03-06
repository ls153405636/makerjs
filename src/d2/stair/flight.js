import Victor from 'victor'
import { COMP_TYPES } from '../../common/common_config'
import { StructConfig } from '../../structure/config'
import { Types } from '../../types/stair_v2'
import { Edge } from '../../utils/edge'
import { BaseWidget } from '../base_widget'
import { D2Config } from '../config'
import d2_tool from '../d2_tool'
import { Tread } from './tread'

export class Flight extends BaseWidget {
  /**
   *
   * @param {Types.Flight} vPB
   */
  constructor(vPB,vParent) {
    super(vPB.uuid)
    this.sprite = new PIXI.Container()
    this.treads = []
    for (const t of vPB.treads) {
      this.treads.push(new Tread(t, this))
    }
    this.tread = vPB.treads
    this.draw()
  }

  draw() {
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
