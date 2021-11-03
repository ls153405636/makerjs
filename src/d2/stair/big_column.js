import { Types } from '../../types/stair_v2'
import { ChildWidget } from './child_widget'
import d2_tool from '../d2_tool'
import { D2Config, Z_INDEX } from '../config'
import { Core } from '../../common/core'
import { Command } from '../../common/command'
import { COMP_TYPES } from '../../common/common_config'

/**大柱 */
export class BigColumn extends ChildWidget {
  /**
   *
   * @param {Types.BigColumn} vPB
   */
  constructor(vPB) {
    super(vPB.uuid)
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

    const changeBigColumnOut = new PIXI.Graphics()
    changeBigColumnOut.visible = false
    changeBigColumnOut.lineStyle(1, 0x4478f4)
    changeBigColumnOut.beginFill(0xc8d3f2)
    changeBigColumnOut.drawRoundedRect(0, 0, this.sizeX, this.sizeY, 0.5)
    changeBigColumnOut.position.set(
      this.positionX - changeBigColumnOut.width / 2 + 0.5,
      this.positionY - changeBigColumnOut.height / 2
    )
    changeBigColumnOut.endFill()

    const bigColumnOut = new PIXI.Graphics()
    bigColumnOut.lineStyle(1, 0x2d3037)
    bigColumnOut.beginFill(0xc8d3f2)
    bigColumnOut.drawRoundedRect(0, 0, this.sizeX, this.sizeY, 0.5)
    bigColumnOut.position.set(
      this.positionX - bigColumnOut.width / 2 + 0.5,
      this.positionY - bigColumnOut.height / 2
    )
    bigColumnOut.endFill()

    const changeBigColumnIn = new PIXI.Graphics()
    changeBigColumnIn.visible = false
    changeBigColumnIn.lineStyle(1, 0x4478f4)
    changeBigColumnIn.beginFill(0xffffff)
    changeBigColumnIn.drawRoundedRect(0, 0, this.sizeX / 2, this.sizeY / 2, 0.5)
    changeBigColumnIn.position.set(
      this.positionX - changeBigColumnIn.width / 2 + 0.5,
      this.positionY - changeBigColumnIn.height / 2
    )
    changeBigColumnIn.endFill()

    const bigColumnIn = new PIXI.Graphics()

    bigColumnIn.lineStyle(1, 0x2d3037)
    bigColumnIn.beginFill(0x4478f4)
    bigColumnIn.drawRoundedRect(0, 0, this.sizeX / 2, this.sizeY / 2, 0.5)
    bigColumnIn.position.set(
      this.positionX - bigColumnIn.width / 2 + 0.5,
      this.positionY - bigColumnIn.height / 2
    )
    bigColumnIn.endFill()

    bigColContainer.addChild(
      changeBigColumnOut,
      bigColumnOut,
      changeBigColumnIn,
      bigColumnIn
    )
    bigColContainer.zIndex = Z_INDEX.BIG_COLUMN_ZINDEX
    this.sprite = bigColContainer
  }

  getSprite() {
    return this.sprite
  }

  // 取消大柱选中效果
  cancelSelected() {
    this.sprite.children[0].visible = false
    this.sprite.children[2].visible = false
    this.sprite.children[1].visible = true
    this.sprite.children[3].visible = true
    this.isSelected = false
  }
  // 大柱选中效果
  setSelected() {
    this.sprite.children[0].visible = true
    this.sprite.children[2].visible = true
    this.sprite.children[1].visible = false
    this.sprite.children[3].visible = false
    this.isSelected = true
  }
  // 鼠标进入大柱效果
  setHover() {
    if (!this.isSelected) {
      this.sprite.children[0].visible = true
      this.sprite.children[2].visible = true
      this.sprite.children[1].visible = false
      this.sprite.children[3].visible = false
    }
  }
  // 鼠标离开大柱效果
  cancelHover() {
    if (!this.isSelected) {
      this.sprite.children[0].visible = false
      this.sprite.children[2].visible = false
      this.sprite.children[1].visible = true
      this.sprite.children[3].visible = true
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
        let core = new Core()
        core.execute(
          new Command(core.cmds.SelecteCmd, {
            uuid: this.uuid,
            type: COMP_TYPES.BIG_COLUMN,
          })
        )
      })
      .on('mouseout', () => {
        this.cancelHover()
      })
      .on('mouseover', () => {
        this.setHover()
      })
  }
}
