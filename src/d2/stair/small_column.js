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
    this.rotation = vPB.rotation.z
    this.draw()
    this.addEvent()
  }


  creatSmallColum(vName) {
    vName.drawRoundedRect(-this.sizeX/2, -this.sizeY/2, this.sizeX, this.sizeY, 0.5)
    vName.drawPolygon(-this.sizeX/2, -this.sizeY/2, this.sizeX/2, this.sizeY/2)
    vName.drawPolygon(this.sizeX/2, -this.sizeY/2, -this.sizeX/2, this.sizeY/2)
    vName.position.set(
      this.positionX,
      this.positionY
    )
    vName.rotation = this.rotation
     
    vName.endFill()
  }

  draw() {
    const smallColumnContainer = new PIXI.Container()

    // 小柱-变
    const changeSmallColumn = new PIXI.Graphics()
    changeSmallColumn.visible = false
    changeSmallColumn.lineStyle(0.5, 0xffffff)
    changeSmallColumn.beginFill(0x4478f4)
    this.creatSmallColum(changeSmallColumn)
     
    const SmallColumnBg = new PIXI.Graphics()
    SmallColumnBg.visible = false
    SmallColumnBg.lineStyle(2, 0x4478f4)
    SmallColumnBg.beginFill(0x4478f4)
    this.creatSmallColum(SmallColumnBg)

    // 小柱
    const smallColumn = new PIXI.Graphics()
    smallColumn.lineStyle(0.5, 0x2d3037)
    smallColumn.beginFill(0xc8d3f2)
    this.creatSmallColum(smallColumn)
    

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
  }
  // 鼠标离开小柱效果
  cancelHover() {
    if (!this.isSelected) {
      this.sprite.children[0].visible = false
      this.sprite.children[1].visible = false
      this.sprite.children[2].visible = true
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
