// 绘制洞口
// import { initProj } from '../init_temp'
// import { Types } from '../types/stair_v2'
import { BaseWidget } from './base_widget'
import { D2Config } from './config'
// import { Wall } from './wall'

export class Hole extends BaseWidget {
  /**
   *
   * @param {Types.Hole} vPB
   */
  constructor(vPB) {
    super()
    this.edges = vPB.edges
    this.draw()
    this.addEvent()
  }

  draw() {
    let hole = new PIXI.Graphics()
    // 绘制多边形
    let path = []
    for (let i = 0; i < this.edges.length; i++) {
      let e = this.edges[i]
      path.push(e.p1.x / D2Config.SCREEN_RATE, e.p1.y / D2Config.SCREEN_RATE)
    }
    // hole.beginFill(0xffff55, 1)
    hole.drawPolygon(path)
    hole.endFill()

    this.sprite = hole
  }

  addEvent() {
    this.sprite.interactive = true
    this.sprite.on('click', () => {
      console.log('hole')
    })
  }
}
