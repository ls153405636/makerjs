import { Command } from '../../common/command'
import { COMP_TYPES } from '../../common/common_config'
import { Core } from '../../common/core'
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
    let changeTread = new PIXI.Graphics()
    let path1 = []
    changeTread.visible = false
    changeTread.lineStyle(1, 0x4478f4)
    changeTread.beginFill(0xe9efff)
    for (let i = 0; i < this.edges.length; i++) {
      let e = this.edges[i]
      path1.push(e.p1.x / D2Config.SCREEN_RATE, e.p1.y / D2Config.SCREEN_RATE)
    }
    changeTread.drawPolygon(path1)
    changeTread.endFill()

    // 踏板绘制
    let tread = new PIXI.Graphics()
    let path = []
    tread.lineStyle(1, 0x2d3037)
    tread.beginFill(0xffffff)
    tread.visible = true
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
    treadContainer.addChild(changeTread, tread, stepNum)
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
    this.sprite.zIndex = 0
    this.sprite.children[0].visible = false
    this.sprite.children[1].visible = true
    this.isSelected = false
  }

  // 踏板选中效果
  setSelected() {
    this.sprite.zIndex = 100
    this.sprite.children[0].visible = true
    this.sprite.children[1].visible = false
    this.isSelected = true
    D2Config.SELECTED = this
    if (D2Config.IS_SINGLE_SELECTED) {
      let core = new Core()
      core.execute(new Command(core.cmds.SelectedCmd, {uuid:this.uuid, type:COMP_TYPES.TREAD}))
    }
  }

  // 鼠标进入踏板效果
  setHover() {
    this.sprite.zIndex = 100
    this.sprite.children[0].visible = true
    this.sprite.children[1].visible = false
  }
  // 鼠标离开踏板效果
  cancelHover() {
    if (!this.isSelected) {
      this.sprite.zIndex = 0
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