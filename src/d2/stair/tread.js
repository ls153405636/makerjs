import { Types } from '../../types/stair_v2'
import { D2Config } from '../config'
import { ChildWidget } from './child_widget'

export class Tread extends ChildWidget {
  /**
   *
   * @param {Types.Tread} vPB
   */
  constructor(vPB) {
    super()
    this.iSelected = false
    this.stepNumWord = 0
    this.outline = vPB.outline
    this.edges = vPB.stepOutline.edges
    this.draw()
    this.addEvent()
  }

  get position() {
    const { p1, outP1, p2, outP2 } = this
    const innerCenter = {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    }
    const outterCenter = {
      x: (outP1.x + outP2.x) / 2,
      y: (outP1.y + outP2.y) / 2,
    }
    const wallPos = {
      x: (innerCenter.x + outterCenter.x) / 2,
      y: (innerCenter.y + outterCenter.y) / 2,
    }
    return wallPos
  }
  draw() {
    // 踏板绘制
    let tread = new PIXI.Graphics()
    let path = []
    tread.lineStyle(2, 0x2d3037)
    tread.beginFill(0xffffff)
    for (let i = 0; i < this.edges.length; i++) {
      let e = this.edges[i]
      path.push(e.p1.x / D2Config.SCREEN_RATE, e.p1.y / D2Config.SCREEN_RATE)
    }
    tread.drawPolygon(path)
    tread.endFill()

    this.sprite = tread
  }

  // 取消墙体选中效果
  cancelSelected() {
    for (let i = 0; i < this.sprite.parent.children.length; i++) {
      this.sprite.parent.children[i].tint = 0xffffff
    }
    this.iSelected = false
  }
  // 墙体选中效果
  setSelected() {
    for (let i = 0; i < this.sprite.parent.children.length; i++) {
      // console.log(this.sprite.parent.children[i])
      this.sprite.parent.children[i].tint = 0xe9efff
    }
    this.sprite.parent.children.tint = 0xff88ff
    this.sprite.alpha = 1
    this.iSelected = true
  }
  // 鼠标进入墙体效果
  setHover() {
    if (!this.iSelected) {
      this.sprite.tint = 0xe9efff
      this.sprite.alpha = 1
    }
  }
  // 鼠标离开墙体效果
  cancelHover() {
    if (!this.iSelected) {
      this.sprite.tint = 0xffffff
      this.sprite.alpha = 1
    }
  }

  addEvent() {
    this.sprite.interactive = true
    let _this = this
    this.sprite
      .on('mousedown', (event) => {
        event.stopPropagation()
        if (this.iSelected) {
          return
        }
        if (D2Config.SELECTED) {
          D2Config.SELECTED.cancelSelected()
        }
        _this.setSelected()
        D2Config.SELECTED = this
      })
      .on('mouseout', () => {
        _this.cancelHover()
      })
      .on('mouseover', () => {
        _this.setHover()
      })
  }
}
