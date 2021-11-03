import { Types } from '../../types/stair_v2'
import { ChildWidget } from './child_widget'
import { D2Config, Z_INDEX } from '../config'
import d2_tool from '../d2_tool'
import { Core } from '../../common/core'
import { Command } from '../../common/command'
import { COMP_TYPES } from '../../common/common_config'

export class SmallColumn extends ChildWidget {
  /**
   *
   * @param {Types.SmallColumn} vPB
   */
  constructor(vPB, vParent) {
    super(vPB.uuid)
    this.parent = vParent
    this.sizeX = d2_tool.translateValue(vPB.size.x)
    this.sizeY = d2_tool.translateValue(vPB.size.x)
    this.positionX = d2_tool.translateValue(vPB.position.x)
    this.positionY = d2_tool.translateValue(vPB.position.y)
    this.draw()
    this.addEvent()
  }

  draw() {
    const smallColumnContainer = new PIXI.Container()

    // 小柱-变
    const changeSmallColumn = new PIXI.Graphics()
    changeSmallColumn.visible = false
    changeSmallColumn.lineStyle(0.5, 0xffffff)
    changeSmallColumn.beginFill(0x4478f4)
    changeSmallColumn.drawRoundedRect(0, 0, this.sizeX, this.sizeY, 0.5)
    changeSmallColumn.drawPolygon(0, 0, this.sizeX, this.sizeY)
    changeSmallColumn.drawPolygon(this.sizeX, 0, 0, this.sizeY)
    changeSmallColumn.position.set(
      this.positionX - changeSmallColumn.width / 2 + 0.25,
      this.positionY - changeSmallColumn.height / 2
    )
    changeSmallColumn.endFill()

    const SmallColumnBg = new PIXI.Graphics()
    SmallColumnBg.visible = false
    SmallColumnBg.lineStyle(2, 0x4478f4)
    SmallColumnBg.beginFill(0x4478f4)
    SmallColumnBg.drawRoundedRect(0, 0, this.sizeX, this.sizeY, 0.5)
    SmallColumnBg.drawPolygon(0, 0, this.sizeX, this.sizeY)
    SmallColumnBg.drawPolygon(this.sizeX, 0, 0, this.sizeY)
    SmallColumnBg.position.set(
      this.positionX - SmallColumnBg.width / 2 + 1,
      this.positionY - SmallColumnBg.height / 2 + 1
    )
    SmallColumnBg.endFill()

    // 小柱
    const smallColumn = new PIXI.Graphics()
    smallColumn.lineStyle(0.5, 0x2d3037)
    smallColumn.beginFill(0xc8d3f2)
    smallColumn.drawRoundedRect(0, 0, this.sizeX, this.sizeY, 0.5)
    smallColumn.drawPolygon(0, 0, this.sizeX, this.sizeY)
    smallColumn.drawPolygon(this.sizeX, 0, 0, this.sizeY)
    smallColumn.position.set(
      this.positionX - smallColumn.width / 2 + 0.25,
      this.positionY - smallColumn.height / 2
    )
    smallColumn.endFill()

    smallColumnContainer.addChild(SmallColumnBg, changeSmallColumn, smallColumn)
    smallColumnContainer.zIndex = Z_INDEX.SMALL_COLUMN_ZINDEX
    this.sprite = smallColumnContainer
  }

  /**
   * 获取当前组件的精灵图
   * 注意，类里的所有属性，如果外界需要调用，全部使用get函数来实现
   * 外界不能直接访问类里的属性
   * @returns
   */
  getSprite() {
    return this.sprite
  }

  // 取消小柱选中效果
  cancelSelected() {
    this.sprite.children[0].visible = false
    this.sprite.children[1].visible = false
    this.sprite.children[2].visible = true
    this.sprite.tint = 0xffffff
    this.isSelected = false
  }

  // 小柱选中效果
  setSelected() {
    this.sprite.children[0].visible = true
    this.sprite.children[1].visible = true
    this.sprite.children[2].visible = false
    this.isSelected = true
  }

  // 鼠标进入小柱效果
  setHover() {
    this.sprite.children[0].visible = true
    this.sprite.children[1].visible = true
    this.sprite.children[2].visible = false
    this.sprite.tint = 0x4478f4
  }
  // 鼠标离开小柱效果
  cancelHover() {
    if (!this.isSelected) {
      this.sprite.children[0].visible = false
      this.sprite.children[1].visible = false
      this.sprite.children[2].visible = true
      this.sprite.tint = 0xffffff
    }
  }

  addEvent() {
    /**需实现的效果，点击任意一个小柱，均为选中整套楼梯的所有小柱
     * 可通过如下方式实现
     */
    this.sprite.interactive = true
    let _this = this
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
            type: COMP_TYPES.SMALL_COLUMN,
          })
        )
      })
      .on('mouseout', () => {
        _this.parent.cancelSmallColHover()
      })
      .on('mouseover', () => {
        _this.parent.setSmallColHover()
      })
  }
}
