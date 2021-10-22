import { Types } from '../../types/stair_v2'
import { D2Config } from '../config'
import { ChildWidget } from './child_widget'

export class Tread extends ChildWidget {
  /**
   *
   * @param {Types.Tread} vPB
   */
  constructor(vPB, vParent) {
    super()
    this.edges = vPB.stepOutline.edges
    this.index = vPB.index
    this.parent = vParent
    this.draw()
    this.addEvent()
  }

  draw() {
    // 中心位置计算
    let positionX
    let positionY
    for (let i = 0; i < this.edges.length; i++) {
      let f = this.edges[i]
      positionX = f.p1.x
      positionY = f.p1.y
    }
    let treadContainer = new PIXI.Container()

    // 踏板绘制
    let tread = new PIXI.Graphics()
    let path = []
    tread.lineStyle(1, 0x2d3037)
    tread.beginFill(0xffffff)
    for (let i = 0; i < this.edges.length; i++) {
      let e = this.edges[i]
      path.push(e.p1.x / D2Config.SCREEN_RATE, e.p1.y / D2Config.SCREEN_RATE)
    }
    tread.drawPolygon(path)
    tread.endFill()

    // 踏板编号
    let stepNum = new PIXI.Text(this.index, { fontSize: 56 })
    stepNum.scale.set(0.25)
    stepNum.position.set(
      positionX / D2Config.SCREEN_RATE + tread.width / 2,
      positionY / D2Config.SCREEN_RATE - tread.height / 2
    )
    stepNum.anchor.set(0.5, 0.5)
    treadContainer.addChild(tread, stepNum)
    this.sprite = treadContainer
  }

  /**
   *
   * @returns 获取当前组件的精灵图
   */

  /**
   * 踏板只需要添加到父级，不需要添加到画布
   * 所以此处用空函数重写
   */

  // 取消踏板选中效果
  cancelSelected() {
    this.sprite.children[0].tint = 0xffffff
    this.isSelected = false
  }

  // 踏板选中效果
  setSelected() {
    // this.sprite.clear()
    // console.log(this.sprite)
    // this.sprite.lineStyle(2, 0x2d3037)
    // this.sprite.beginFill(0xffffff)
    this.sprite.children[0].tint = 0xe9efff
    this.isSelected = true
    D2Config.SELECTED = this
  }

  // 鼠标进入踏板效果
  setHover() {
    this.sprite.children[0].tint = 0xe9efff
  }
  // 鼠标离开踏板效果
  cancelHover() {
    if (!this.isSelected) {
      this.sprite.children[0].tint = 0xffffff
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
        if (D2Config.IS_SINGLE_SELECTED) {
          _this.setSelected()
        } else {
          _this.parent.setSelected()
        }
      })
      .on('mouseout', () => {
        if (D2Config.IS_SINGLE_SELECTED) {
          _this.cancelHover()
        } else {
          _this.parent.cancelHover()
        }
      })
      .on('mouseover', () => {
        if (D2Config.IS_SINGLE_SELECTED) {
          _this.setHover()
        } else {
          _this.parent.setHover()
        }
      })
  }
}
