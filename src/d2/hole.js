// 绘制洞口
// import { initProj } from '../init_temp'
// import { Types } from '../types/stair_v2'
import Victor from 'victor'
import { COMP_TYPES } from '../common/common_config'
import { Types } from '../types/stair_v2'
import { BaseWidget } from './base_widget'
import { D2Config, Z_INDEX } from './config'
// import { Wall } from './wall'

export class Hole extends BaseWidget {
  /**
   *
   * @param {Types.Hole} vPB
   */
  constructor(vPB) {
    super(vPB.uuid)
    this.init(vPB)
  }

  /**重写父类销毁函数，洞口销毁时，所有墙体需要跟着销毁 */
  destroy() {
    D2Config.WIDGETS.forEach((w) => {
      if (w.getWidgetType() === COMP_TYPES.WALL) {
        w.destroy()
      }
    })
    super.destroy()
  }

  init(vPB) {
    this.sprite = new PIXI.Container()
    this.edges = vPB.edges
    this.draw()
    this.addEvent()
  }

  draw() {
    let path = []
    for (let i = 0; i < this.edges.length; i++) {
      let e = this.edges[i]
      path.push(e.p1.x / D2Config.SCREEN_RATE, e.p1.y / D2Config.SCREEN_RATE)
    }
    // 绘制多边形
    let hole = new PIXI.Graphics()
    hole.beginFill(0x4478f4, 0.1)
    hole.drawPolygon(path)
    hole.endFill()
    this.sprite.addChild(hole)
  }

  addEvent() {
  }
}
