import { Outline } from '../../common/common_tools/outline'
import { Types } from '../../types/stair_v2'
import d2_tool from '../d2_tool'
import { ChildWidget } from './child_widget'
import { D2Config } from '../config'

/**需继承自childWidget */
export class Handrail extends ChildWidget {
  /**
   *
   * @param {Types.Handrail} vPB
   */
  constructor(vPB) {
    super()
    this.width = vPB.width
    let route = vPB.route
    /**pb里只保存了中线路径，通过中线路径向两侧分别偏移宽度的1/2
     * 可得到两侧的路径，用这两条路径可以绘制扶手
     * 偏移方法和调用模式如下
     */
    let inRoute = new Outline(route).offset(this.width / 2, true)
    let outRoute = new Outline(route).offset(this.width / 2, false)

    this.inEdges = inRoute.edges
    this.outEdges = outRoute.edges

    this.draw()
    this.addEvent()
  }

  draw() {
    const handrail = new PIXI.Graphics()
    handrail.lineStyle(0.5, 0x2d3037)
    handrail.beginFill(0xffffff)

    // 多边形方法绘制
    let path = []
    for (let i = 0; i < this.inEdges.length; i++) {
      let e = this.inEdges[i]
      path.push(e.p1.x / D2Config.SCREEN_RATE, e.p1.y / D2Config.SCREEN_RATE)
      path.push(
        this.inEdges[this.inEdges.length - 1].p2.x / D2Config.SCREEN_RATE,
        this.inEdges[this.inEdges.length - 1].p2.y / D2Config.SCREEN_RATE
      )
    }
    for (let i = this.outEdges.length - 1; i >= 0; i--) {
      let f = this.outEdges[i]
      path.push(f.p2.x / D2Config.SCREEN_RATE, f.p2.y / D2Config.SCREEN_RATE)
      path.push(
        this.outEdges[0].p1.x / D2Config.SCREEN_RATE,
        this.outEdges[0].p1.y / D2Config.SCREEN_RATE
      )
    }
    handrail.drawPolygon(path)

    this.sprite = handrail
  }

  // 取消扶手选中效果
  cancelSelected() {
    this.sprite.tint = 0xffffff
    this.isSelected = false
  }

  // 扶手选中效果
  setSelected() {
    this.sprite.tint = 0x4478f4
    this.isSelected = true
    D2Config.SELECTED = this
  }

  // 鼠标进入扶手效果
  setHover() {
    this.sprite.tint = 0x4478f4
  }
  // 鼠标离开扶手效果
  cancelHover() {
    if (!this.isSelected) {
      this.sprite.tint = 0xffffff
    }
  }

  addEvent() {
    this.sprite.interactive = true
    let _this = this
    this.sprite
      .on('mousedown', (event) => {
        event.stopPropagation()
        if (this.isSelected) {
          return
        }
        if (D2Config.SELECTED) {
          D2Config.SELECTED.cancelSelected()
        }
        _this.setSelected()
      })
      .on('mouseout', () => {
        _this.cancelHover()
      })
      .on('mouseover', () => {
        _this.setHover()
      })
  }
}
