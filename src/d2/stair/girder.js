import { Types } from '../../types/stair_v2'
import { D2Config } from '../config'
import d2_tool from '../d2_tool'
import { ChildWidget } from './child_widget'

export class Girder extends ChildWidget {
  /**
   *
   * @param {Types.HanginGirdergBoard} vPB
   */
  constructor(vPB) {
    super()
    this.inEdges = vPB.inRoute.edges
    this.outEdges = vPB.outRoute.edges
    this.draw()
    this.addEvent()
  }

  draw() {
    const girderContainer = new PIXI.Container()

    const changeGirder = new PIXI.Graphics()
    changeGirder.visible = false
    changeGirder.lineStyle(1, 0x4478f4)
    changeGirder.beginFill(0xffffff)
    const path1 = []
    for (let i = 0; i < this.inEdges.length; i++) {
      let e = this.inEdges[i]
      path1.push(e.p1.x / D2Config.SCREEN_RATE, e.p1.y / D2Config.SCREEN_RATE)
      path1.push(
        this.inEdges[this.inEdges.length - 1].p2.x / D2Config.SCREEN_RATE,
        this.inEdges[this.inEdges.length - 1].p2.y / D2Config.SCREEN_RATE
      )
    }
    for (let i = this.outEdges.length - 1; i >= 0; i--) {
      let f = this.outEdges[i]
      path1.push(f.p2.x / D2Config.SCREEN_RATE, f.p2.y / D2Config.SCREEN_RATE)
      path1.push(
        this.outEdges[0].p1.x / D2Config.SCREEN_RATE,
        this.outEdges[0].p1.y / D2Config.SCREEN_RATE
      )
    }
    changeGirder.drawPolygon(path1)

    const girder = new PIXI.Graphics()
    girder.lineStyle(1, 0x2d3037)
    girder.beginFill(0xffffff)
    const path = []
    for (let i = 0; i < this.inEdges.length; i++) {
      let e = this.inEdges[i]
      path.push(e.p1.x / D2Config.SCREEN_RATE, e.p1.y / D2Config.SCREEN_RATE)
      path.push(
        this.inEdges[this.inEdges.length - 1].p2.x / D2Config.SCREEN_RATE,
        this.inEdges[this.inEdges.length - 1].p2.y / D2Config.SCREEN_RATE
      )
    }
    for (let i = this.outEdges.length - 1; i >= 0; i--) {
      let f = this.outEdges[i]
      path.push(f.p2.x / D2Config.SCREEN_RATE, f.p2.y / D2Config.SCREEN_RATE)
      path.push(
        this.outEdges[0].p1.x / D2Config.SCREEN_RATE,
        this.outEdges[0].p1.y / D2Config.SCREEN_RATE
      )
    }
    girder.drawPolygon(path)

    girderContainer.addChild(changeGirder, girder)

    this.sprite = girderContainer
  }

  // 取消 girder 选中效果
  cancelSelected() {
    this.sprite.children[0].visible = false
    this.sprite.children[1].visible = true
    this.isSelected = false
  }
  //  girder 选中效果
  setSelected() {
    this.sprite.children[0].visible = true
    this.sprite.children[1].visible = false
    this.isSelected = true
  }
  // 鼠标进入 girder 效果
  setHover() {
    if (!this.isSelected) {
      this.sprite.children[0].visible = true
      this.sprite.children[1].visible = false
    }
  }
  // 鼠标离开 girder 效果
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
