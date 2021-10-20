import { Types } from '../../types/stair_v2'
import d2_tool from '../d2_tool'
import { ChildWidget } from './child_widget'
import { Tread } from './tread'

export class Flight extends ChildWidget {
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
    this.tread = vPB.treads
    this.stepLength = d2_tool.translateValue(vPB.stepLength)
    this.stepWidth = d2_tool.translateValue(vPB.stepWidth)
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
      let stepNum = new PIXI.Text(i + 1, { fontSize: 14 })
      stepNum.position.set(
        this.stepLength / 2,
        this.stepWidth * (this.tread.length - 1) - i * this.stepWidth
      )
      stepNum.pivot.set(stepNum.width / 2, -stepNum.height / 3)
      this.sprite.addChild(stepNum)
    }
  }
}
