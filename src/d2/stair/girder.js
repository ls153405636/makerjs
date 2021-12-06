import { Command } from '../../common/command'
import { COMP_TYPES } from '../../common/common_config'
import { Core } from '../../common/core'
import { isVec2Equal } from '../../structure/tool'
import { Types } from '../../types/stair_v2'
import { D2Config, Z_INDEX } from '../config'
import d2_tool from '../d2_tool'
import { ChildWidget } from './child_widget'

export class Girder extends ChildWidget {
  /**
   *
   * @param {Types.Girder} vPB
   */
  constructor(vPB) {
    super(vPB.uuid)
    this.borders = vPB.borders 
    this.draw()
    this.addEvent()
  }

  draw() {
    const girderContainer = new PIXI.Container()

    const path = []

    for (let i = 0; i < this.borders.length; i++) {
      let e = this.borders[i]
      path.push(e.inTopEdges[0].p1.x / D2Config.SCREEN_RATE, e.inTopEdges[0].p1.y / D2Config.SCREEN_RATE)
      if (i === this.borders.length - 1) {
        path.push(e.inTopEdges[0].p2.x / D2Config.SCREEN_RATE, e.inTopEdges[0].p2.y / D2Config.SCREEN_RATE)
      }
    }
    for (let i = this.borders.length - 1; i >= 0; i--) {
      let f = this.borders[i]
      // console.log(f.outTopEdges[0])
      if (i === this.borders.length - 1) {
        path.push(f.outTopEdges[0].p2.x / D2Config.SCREEN_RATE, f.outTopEdges[0].p2.y / D2Config.SCREEN_RATE)
      }
      path.push(f.outTopEdges[0].p1.x / D2Config.SCREEN_RATE, f.outTopEdges[0].p1.y / D2Config.SCREEN_RATE)
    }
    const changeGirder1 = new PIXI.Graphics()
    changeGirder1.lineStyle(1, 0x4478f4)
    changeGirder1.beginFill(0xffffff)
    changeGirder1.drawPolygon(path)

    const changeGirder = new PIXI.Graphics()
    changeGirder.visible = false
    changeGirder.lineStyle(1, 0x4478f4)
    changeGirder1.beginFill(0xffffff)
    changeGirder.drawPolygon(path)

    const girder = new PIXI.Graphics()
    girder.lineStyle(1, 0x2d3037)
    girder.beginFill(0xffffff)
    girder.drawPolygon(path)

    girderContainer.addChild(changeGirder1, changeGirder, girder)
    girderContainer.zIndex = Z_INDEX.GIRDER_ZINDEX

    this.sprite = girderContainer
  }

  // 取消 girder 选中效果
  cancelSelected() {
    this.sprite.children[1].visible = false
    this.sprite.children[2].visible = true
    this.isSelected = false
  }
  //  girder 选中效果
  setSelected() {
    this.sprite.children[1].visible = true
    this.sprite.children[2].visible = false
    this.isSelected = true
  }
  // 鼠标进入 girder 效果
  setHover() {
    if (!this.isSelected) {
      this.sprite.children[1].visible = true
      this.sprite.children[2].visible = false
    }
  }
  // 鼠标离开 girder 效果
  cancelHover() {
    if (!this.isSelected) {
      this.sprite.children[1].visible = false
      this.sprite.children[2].visible = true
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
        let core = new Core()
        core.execute(
          new Command(core.cmds.SelecteCmd, {
            uuid: this.uuid,
            type: COMP_TYPES.GIRDER,
          })
        )
      })
      .on('mouseout', () => {
        _this.cancelHover()
      })
      .on('mouseover', () => {
        _this.setHover()
      })
  }
}
