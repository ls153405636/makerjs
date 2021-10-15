import { Types } from '../../types/stair_v2'
import { BaseWidget } from '../base_widget'
import d2_tool from '../d2_tool'
import Victor from 'victor'

/**
 * 门窗门洞，内嵌入墙体的结构部件
 */
export class Inlay extends BaseWidget {
  /**
   *
   * @param {Types.Component} vPB
   */
  constructor(vPB) {
    super()
    this.type = vPB.type
    this.width = d2_tool.translateValue(vPB.width)
    this.depth = d2_tool.translateValue(vPB.depth)
    this.disToStart = d2_tool.translateValue(vPB.disToStart)
    this.positionX = d2_tool.translateValue(vPB.position.x)
    this.positionY = d2_tool.translateValue(vPB.position.y)
    this.rotationY = d2_tool.translateValue(vPB.rotation.y)
    console.log(vPB)

    this.draw()
  }

  /**
   * 建议方法，根据宽深属性绘制矩形，然后设置位置和角度
   */

  draw() {
    const wallPos = {
      x: this.width / 2,
      y: this.depth / 2,
    }

    let door = new PIXI.Graphics()
    door.beginFill(0xffff55, 1)
    door.drawRect(
      this.positionX - this.width / 2,
      this.positionY - this.depth / 2,
      this.width,
      this.depth
    )
    door.endFill()
    this.sprite = door
  }

  addEvent() {}
}
