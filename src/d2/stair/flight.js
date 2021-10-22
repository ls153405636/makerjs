import { Types } from '../../types/stair_v2'
import { D2Config } from '../config'
import d2_tool from '../d2_tool'
import { Tread } from './tread'
import { ChildWidget } from './child_widget'

export class Flight extends ChildWidget {
  /**
   *
   * @param {Types.Flight} vPB
   */
  constructor(vPB) {
    super()
    this.treads = []
    for (const t of vPB.treads) {
      this.treads.push(new Tread(t, this))
    }
    this.tread = vPB.treads
    this.stepLength = d2_tool.translateValue(vPB.stepParameters.stepLength)
    this.stepWidth = d2_tool.translateValue(vPB.stepParameters.stepWidth)
    this.draw()
  }

  draw() {
    this.sprite = new PIXI.Graphics()
    for (const t of this.treads) {
      let treadSprite = t.getSprite()
      if (treadSprite) {
        this.sprite.addChild(treadSprite)
      }
    }
    for (let i = 0; i < this.tread.length; i++) {
      let stepNum = new PIXI.Text(i + 1, { fontSize: 56 })
      stepNum.scale.set(0.25)
      stepNum.anchor.set(0.5, 0)
      stepNum.position.set(
        this.stepLength / 2,
        this.stepWidth * (this.tread.length - 1) - i * this.stepWidth
      )
      stepNum.pivot.set(stepNum.width / 2, -stepNum.height)
      this.sprite.addChild(stepNum)
    }
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
    D2Config.SELECTED = this
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
  // addToStage() {}
}
