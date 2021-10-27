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

    this.draw()
    this.addEvent()
  }

  /**
   * 建议方法，根据宽深属性绘制矩形，然后设置位置和角度
   */

  draw() {
    const inlayContainer = new PIXI.Container()

    let changeInlayOut = new PIXI.Graphics()
    changeInlayOut.visible = false
    changeInlayOut.lineStyle(1, 0x4478f4)
    changeInlayOut.beginFill(0xffffff, 1)
    changeInlayOut.drawRect(
      -this.width / 2,
      -this.depth / 2,
      this.width,
      this.depth
    )
    changeInlayOut.endFill()
    changeInlayOut.position.set(this.positionX, this.positionY)
    changeInlayOut.pivot.set(0, 0)
    changeInlayOut.rotation = this.rotationY

    let inlayOut = new PIXI.Graphics()
    inlayOut.lineStyle(1, 0x000000)
    inlayOut.beginFill(0xffffff, 1)
    inlayOut.drawRect(-this.width / 2, -this.depth / 2, this.width, this.depth)
    inlayOut.endFill()
    inlayOut.position.set(this.positionX, this.positionY)
    inlayOut.pivot.set(0, 0)
    inlayOut.rotation = this.rotationY

    // const path = []
    // switch (this.type) {
    //   case 1: // 门
    //     path.push( 0, 0, this.width / 2, 0, this.width / 2, this.depth / 4, this.width, this.depth / 4, this.width, this.depth / 2, this.width / 2, this.depth / 2, this.width / 2, this.depth / 4, 0, this.depth / 4, 0, 0)
    //     break
    //   case 2: // 窗
    //     path.push( 0, 0, this.width / 2, 0, this.width / 2, this.depth / 4, this.width, this.depth / 4, this.width, this.depth / 2, this.width / 2, this.depth / 2, this.width / 2, this.depth / 4, 0, this.depth / 4, 0, 0)
    //     break
    //   case 3: // 洞
    //     path.push(0, 0)
    //     break
    // }
    // let inlayIn = new PIXI.Graphics()
    // inlayIn.beginFill(0x000000, 1)
    // inlayIn.drawPolygon(path)
    // inlayIn.endFill()
    // inlayIn.position.set(this.positionX, this.positionY)
    // inlayIn.pivot.set(inlayIn.width / 2, inlayIn.height / 2)
    // inlayIn.rotation = this.rotationY

    inlayContainer.addChild(changeInlayOut, inlayOut)

    this.sprite = inlayContainer
  }

  // 取消 inlay 选中效果
  cancelSelected() {
    this.sprite.children[0].visible = false
    this.sprite.children[1].visible = true
    this.isSelected = false
  }
  //  inlay 选中效果
  setSelected() {
    this.sprite.children[0].visible = true
    this.sprite.children[1].visible = false
    this.isSelected = true
  }
  // 鼠标进入 inlay 效果
  setHover() {
    if (!this.isSelected) {
      this.sprite.children[0].visible = true
      this.sprite.children[1].visible = false
    }
  }
  // 鼠标离开 inlay 效果
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