import { Types } from '../../types/stair_v2'
import { BaseWidget } from '../base_widget'
import d2_tool from '../d2_tool'

/**
 * 梁、柱，房间中的水泥结构部件
 */
export class CementComp extends BaseWidget {
  /**
   *
   * @param {Types.Component} vPB
   */
  constructor(vPB) {
    super()
    this.type = vPB.type
    this.width = d2_tool.translateValue(vPB.width)
    this.depth = d2_tool.translateValue(vPB.depth)
    this.positionX = d2_tool.translateValue(vPB.position.x)
    this.positionY = d2_tool.translateValue(vPB.position.y)
    this.rotationY = vPB.rotation.y
    // console.log(this.rotationY)

    this.draw()
  }

  /**
   * 建议方法，根据宽深属性绘制矩形，然后设置位置和角度
   */
  draw() {
    const compContainer = new PIXI.Container()

    let comp = new PIXI.Graphics()
    comp.beginFill(0x888888, 1)
    comp.drawRect(-this.width / 2, -this.depth / 2, this.width, this.depth)
    comp.endFill()
    comp.position.set(this.positionX, this.positionY)
    comp.pivot.set(0, 0)
    comp.rotation = this.rotationY
    this.sprite = comp

    // 添加名称

    // 根据 type 获取名称
    var textWord = ''
    switch (this.type) {
      case 4:
        textWord = '梁'
        break
      case 5:
        textWord = '柱'
        break
    }
    const text = new PIXI.Text(textWord, { fontSize: 12, fill: 0xffffff })
    text.position.set(this.positionX, this.positionY)
    text.pivot.set(text.width / 2, text.height / 2)
    text.rotation = this.rotationY

    compContainer.addChild(comp, text)
    this.sprite = compContainer
  }

  addEvent() {}
}
