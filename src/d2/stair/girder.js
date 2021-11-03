import { Command } from '../../common/command'
import { COMP_TYPES } from '../../common/common_config'
import { Core } from '../../common/core'
import { Types } from '../../types/stair_v2'
import { D2Config, Z_INDEX } from '../config'
import d2_tool from '../d2_tool'
import { ChildWidget } from './child_widget'

export class Girder extends ChildWidget {
  /**
   *
   * @param {Types.HanginGirdergBoard} vPB
   */
  constructor(vPB) {
    super(vPB.uuid)
    this.inEdges = vPB.inRoute.edges
    this.outEdges = vPB.outRoute.edges
    this.draw()
    this.addEvent()
  }

  draw() {
    const girderContainer = new PIXI.Container()

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
    const changeGirder1 = new PIXI.Graphics()
    changeGirder1.lineStyle(1, 0xff88ff)
    changeGirder1.beginFill(0xffffff)
    changeGirder1.alpha = 0
    changeGirder1.drawPolygon(path)

    const changeGirder = new PIXI.Graphics()
    changeGirder.visible = false
    changeGirder.lineStyle(1, 0xff88ff)
    changeGirder.drawPolygon(path)

    const girder = new PIXI.Graphics()
    girder.lineStyle(1, 0x2d3037)
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
