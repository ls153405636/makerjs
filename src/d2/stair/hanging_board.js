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
    super(vPB.uuid)
    this.width = d2_tool.translateValue(vPB.width)
    this.height = d2_tool.translateValue(vPB.depth)
    this.draw()
    this.addEvent()
  }

  draw() {
    const hangingBoardContainer = new PIXI.Container()

    const changeHangingBoard = new PIXI.Graphics()
    changeHangingBoard.visible = false
    changeHangingBoard.lineStyle(1, 0x4478f4)
    changeHangingBoard.beginFill(0xffffff)
    changeHangingBoard.drawRect(0, 0, this.width, this.height)

    const hangingBoard = new PIXI.Graphics()
    hangingBoard.lineStyle(1, 0x2d3037)
    hangingBoard.beginFill(0xffffff)
    hangingBoard.drawRect(0, 0, this.width, this.height)

    hangingBoardContainer.addChild(changeHangingBoard, hangingBoard)
    this.sprite = hangingBoardContainer
  }

  // 取消 hangingBoard 选中效果
  cancelSelected() {
    this.sprite.children[0].visible = false
    this.sprite.children[1].visible = true
    this.isSelected = false
  }
  //  hangingBoard 选中效果
  setSelected() {
    this.sprite.children[0].visible = true
    this.sprite.children[1].visible = false
    this.isSelected = true
  }
  // 鼠标进入 hangingBoard 效果
  setHover() {
    if (!this.isSelected) {
      this.sprite.children[0].visible = true
      this.sprite.children[1].visible = false
    }
  }
  // 鼠标离开 hangingBoard 效果
  cancelHover() {
    if (!this.isSelected) {
      this.sprite.children[0].visible = false
      this.sprite.children[1].visible = true
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
