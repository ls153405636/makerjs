import { BaseWidget } from './base_widget'

export class Circle extends BaseWidget {
  // prettier-ignore
  constructor(x, y, radius) {
    super()
    this.x      = x
    this.y      = y
    this.radius = radius

    this.draw()
  }

  draw() {
    let g = new PIXI.Graphics()
    g.beginFill(0xffffff, 1)
    g.lineStyle(1, 0x3e82f7, 1)
    g.drawCircle(this.x, this.y, this.radius)
    g.endFill()

    this.sprite = g
    return this
  }
}
