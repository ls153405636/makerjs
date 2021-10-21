import { Types } from '../../types/stair_v2'
import { BaseWidget } from '../base_widget'
import d2_tool from '../d2_tool'
import { D2Config } from '../config'
// import Victor from 'victor'

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
    this.positionX = d2_tool.translateValue(vPB.position.x)
    this.positionY = d2_tool.translateValue(vPB.position.y)
    this.rotationY = vPB.rotation.y
    // console.log(this.rotationY)

    this.draw()
    this.addEvent()
  }

  /**
   * 建议方法，根据宽深属性绘制矩形，然后设置位置和角度
   */

  draw() {
    const inlayContainer = new PIXI.Container()

    let inlay = new PIXI.Graphics()
    inlay.lineStyle(1, 0x000000)
    inlay.beginFill(0xffffff, 1)
    inlay.drawRect(-this.width / 2, -this.depth / 2, this.width, this.depth)
    inlay.endFill()
    inlay.position.set(this.positionX, this.positionY)
    inlay.pivot.set(0, 0)
    inlay.rotation = this.rotationY
    this.sprite = inlay

    // // 添加名称

    // // 根据 type 获取名称
    // var textWord = ''
    // switch (this.type) {
    //   case 1:
    //     textWord = '门'
    //     break
    //   case 2:
    //     textWord = '窗'
    //     break
    //   case 3:
    //     textWord = '洞'
    //     break
    // }
    // const text = new PIXI.Text(textWord, { fontSize: 12, fill: 0xffffff })
    // text.position.set(this.positionX, this.positionY)
    // text.pivot.set(text.width / 2, text.height / 2)
    // // text.rotation = this.rotationY

    // inlayContainer.addChild(inlay)
    // this.sprite = inlayContainer
  }

  // 取消 inlay 选中效果
  cancelSelected() {
    this.sprite.tint = 0xffffff
    this.sprite.alpha = 1
    this.isSelected = false
  }
  //  inlay 选中效果
  setSelected() {
    this.sprite.tint = 0xe9efff
    this.sprite.alpha = 1
    this.isSelected = true
  }
  // 鼠标进入 inlay 效果
  setHover() {
    if (!this.isSelected) {
      this.sprite.tint = 0xe9efff
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
