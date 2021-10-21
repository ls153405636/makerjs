import { Types } from '../../types/stair_v2'
import { ChildWidget } from './child_widget'
import { D2Config } from '../config'
import d2_tool from '../d2_tool'

export class SmallColumn extends ChildWidget {
  /**
   *
   * @param {Types.SmallColumn} vPB
   */
  constructor(vPB, vParent) {
    super()
    this.parent = vParent
    this.sizeX = d2_tool.translateValue(vPB.size.x)
    this.sizeY = d2_tool.translateValue(vPB.size.x)
    this.positionX = d2_tool.translateValue(vPB.position.x)
    this.positionY = d2_tool.translateValue(vPB.position.y)
    this.draw()
    this.addEvent()
  }

  draw() {
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

    this.sprite = smallColumn
  }

  // addToStage() {}

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
    this.sprite.tint = 0xffffff
    this.isSelected = false
  }

  // 小柱选中效果
  setSelected() {
    this.sprite.tint = 0x4478f4
    this.isSelected = true
    // D2Config.CUR_STAIR = this
  }

  // 鼠标进入小柱效果
  setHover() {
    this.sprite.tint = 0x4478f4
  }
  // 鼠标离开小柱效果
  cancelHover() {
    if (!this.isSelected) {
      this.sprite.tint = 0xffffff
    }
  }

  addEvent() {
    /**需实现的效果，点击任意一个小柱，均为选中整套楼梯的所有小柱
     * 可通过如下方式实现
     */
    //D2Config.CUR_STAIR.setSmallColSelected()
    //D2Config.CUR_STAIR.setSmallColHover()
    this.sprite.interactive = true
    let _this = this
    this.sprite
      .on('mousedown', (event) => {
        event.stopPropagation()
        if (this.isSelected) {
          return
        }
        if (D2Config.CUR_STAIR) {
          D2Config.CUR_STAIR.cancelSelected()
        }
        _this.parent.setSmallColSelected()
        D2Config.CUR_STAIR = this.parent
      })
      .on('mouseout', () => {
        _this.parent.cancelSmallColHover()
      })
      .on('mouseover', () => {
        _this.parent.setSmallColHover()
      })
  }
}
