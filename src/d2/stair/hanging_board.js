import { Types } from '../../types/stair_v2'
import { D2Config } from '../config'
import d2_tool from '../d2_tool'
import { ChildWidget } from './child_widget'

export class HangingBoard extends ChildWidget {
  /**
   *
   * @param {Types.HangingBoard} vPB
   */
  constructor(vPB) {
    super()
    console.log(vPB)
    this.width = d2_tool.translateValue(vPB.width)
    this.height = d2_tool.translateValue(vPB.depth)
    this.draw()
    this.addEvent()
  }

  draw() {
    const hangingBoard = new PIXI.Graphics()
    hangingBoard.lineStyle(1, 0x2d3037)
    hangingBoard.beginFill(0xf5f5f5)
    hangingBoard.drawRect(0, 0, this.width, this.height)
    this.sprite = hangingBoard
  }

  // 取消 inlay 选中效果
  cancelSelected() {
    this.sprite.tint = 0xffffff
    this.sprite.alpha = 1
    this.isSelected = false
  }
  //  inlay 选中效果
  setSelected() {
    this.sprite.tint = 0x888888
    this.sprite.alpha = 1
    this.isSelected = true
  }
  // 鼠标进入 inlay 效果
  setHover() {
    if (!this.isSelected) {
      this.sprite.tint = 0x888888
      this.sprite.alpha = 1
    }
  }
  // 鼠标离开 inlay 效果
  cancelHover() {
    if (!this.isSelected) {
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
        if (this.isSelected) {
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
