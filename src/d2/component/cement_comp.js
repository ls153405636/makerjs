import { Types } from '../../types/stair_v2'
import { BaseWidget } from '../base_widget'
import d2_tool from '../d2_tool'
import { D2Config } from '../config'

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

    this.draw()
    this.addEvent()
  }

  /**
   * 建议方法，根据宽深属性绘制矩形，然后设置位置和角度
   */
  draw() {
    const compContainer = new PIXI.Container()

    let changeComp = new PIXI.Graphics()
    changeComp.visible = false
    changeComp.lineStyle(1, 0x4478f4)
    changeComp.beginFill(0xffffff, 1)
    changeComp.drawRect(
      -this.width / 2,
      -this.depth / 2,
      this.width,
      this.depth
    )
    changeComp.endFill()
    changeComp.position.set(this.positionX, this.positionY)
    changeComp.pivot.set(0, 0)
    changeComp.rotation = this.rotationY

    let comp = new PIXI.Graphics()
    comp.lineStyle(1, 0x000000)
    comp.beginFill(0xffffff, 1)
    comp.drawRect(-this.width / 2, -this.depth / 2, this.width, this.depth)
    comp.endFill()
    comp.position.set(this.positionX, this.positionY)
    comp.pivot.set(0, 0)
    comp.rotation = this.rotationY

    compContainer.addChild(changeComp, comp)
    this.sprite = compContainer

    // // 根据 type 获取名称
    // var textWord = ''
    // switch (this.type) {
    //   case 4:
    //     textWord = '梁'
    //     break
    //   case 5:
    //     textWord = '柱'
    //     break
    // }
    // const text = new PIXI.Text(textWord, { fontSize: 12, fill: 0xffffff })
    // text.position.set(this.positionX, this.positionY)
    // text.pivot.set(text.width / 2, text.height / 2)
    // text.rotation = this.rotationY

    // compContainer.addChild(comp,text)
    // this.sprite = compContainer
  }

  // 取消 cement 选中效果
  cancelSelected() {
    this.sprite.children[0].visible = false
    this.sprite.children[1].visible = true
    this.isSelected = false
  }
  //  cement 选中效果
  setSelected() {
    this.sprite.children[0].visible = true
    this.sprite.children[1].visible = false
    this.isSelected = true
  }
  // 鼠标进入 cement 效果
  setHover() {
    if (!this.isSelected) {
      this.sprite.children[0].visible = true
      this.sprite.children[1].visible = false
    }
  }
  // 鼠标离开 cement 效果
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
