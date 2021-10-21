import { Types } from '../../types/stair_v2'
import { ChildWidget } from './child_widget'
import d2_tool from '../d2_tool'
import { D2Config } from '../config'

/**大柱 */
export class BigColumn extends ChildWidget {
  /**
   *
   * @param {Types.BigColumn} vPB
   */
  constructor(vPB) {
    super()
    this.sizeX = d2_tool.translateValue(vPB.size.x)
    this.sizeY = d2_tool.translateValue(vPB.size.x)
    this.positionX = d2_tool.translateValue(vPB.position.x)
    this.positionY = d2_tool.translateValue(vPB.position.y)
    this.draw()
    this.addEvent()
  }

  draw() {
    // 大柱
    const bigColContainer = new PIXI.Container()

    const bigColumnOut = new PIXI.Graphics()
    bigColumnOut.lineStyle(1, 0x2d3037)
    bigColumnOut.beginFill(0xc8d3f2)
    bigColumnOut.drawRoundedRect(0, 0, this.sizeX, this.sizeY, 0.5)
    bigColumnOut.position.set(
      this.positionX - bigColumnOut.width / 2 + 0.5,
      this.positionY - bigColumnOut.height / 2
    )
    bigColumnOut.endFill()

    const bigColumnIn = new PIXI.Graphics()

    bigColumnIn.lineStyle(1, 0x2d3037)
    bigColumnIn.beginFill(0x4478f4)
    bigColumnIn.drawRoundedRect(0, 0, this.sizeX / 2, this.sizeY / 2, 0.5)
    bigColumnIn.position.set(
      this.positionX - bigColumnIn.width / 2 + 0.5,
      this.positionY - bigColumnIn.height / 2
    )
    bigColumnIn.endFill()
    bigColContainer.addChild(bigColumnOut, bigColumnIn)

    this.sprite = bigColContainer
  }

  // 取消墙体选中效果
  cancelSelected() {
    this.sprite.children[0].tint = 0xffffff
    this.isSelected = false
  }
  // 墙体选中效果
  setSelected() {
    this.sprite.tint = 0x4478f4
    this.isSelected = true
  }
  // 鼠标进入墙体效果
  setHover() {
    if (!this.isSelected) {
      this.sprite.children[0].tint = 0x4478f4
    }
  }
  // 鼠标离开墙体效果
  cancelHover() {
    if (!this.isSelected) {
      this.sprite.children[0].tint = 0xffffff
    }
  }

  addEvent() {
    this.sprite.interactive = true
    this.sprite
      .on('mousedown', (event) => {
        event.stopPropagation()
        if (this.isSelected) {
          return
        }
        if (D2Config.SELECTED) {
          D2Config.SELECTED.cancelSelected()
        }
        this.setSelected()
        D2Config.SELECTED = this
      })
      .on('mouseout', () => {
        this.cancelHover()
      })
      .on('mouseover', () => {
        this.setHover()
      })
  }
}
