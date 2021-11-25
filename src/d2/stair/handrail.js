import { Outline } from '../../utils/outline'
import { Types } from '../../types/stair_v2'
import d2_tool from '../d2_tool'
import { ChildWidget } from './child_widget'
import { D2Config } from '../config'
import { Core } from '../../common/core'
import { COMP_TYPES } from '../../common/common_config'
import { Command } from '../../common/command'

/**需继承自childWidget */
export class Handrail extends ChildWidget {
  /**
   *
   * @param {Types.Handrail} vPB
   */
  constructor(vPB) {
    super(vPB.uuid)
    this.width = vPB.width
    this.route = vPB.route
    /**pb里只保存了中线路径，通过中线路径向两侧分别偏移宽度的1/2
     * 可得到两侧的路径，用这两条路径可以绘制扶手
     * 偏移方法和调用模式如下
     */
    let inRoute = new Outline(this.route).offset(this.width / 2, true)
    let outRoute = new Outline(this.route).offset(-this.width / 2, true)

    this.inEdges = inRoute.edges
    this.outEdges = outRoute.edges

    this.draw()
    this.addEvent()
  }


  draw() {
    const handrailContainer = new PIXI.Container()

    const changeHandrail1 = new PIXI.Graphics()
    changeHandrail1.visible = true
    changeHandrail1.alpha = 0.01
    changeHandrail1.lineStyle(1, 0x4478f4)
    changeHandrail1.beginFill(0xffffff)
    for (let i = 0; i < this.outEdges.length; i++) {
      let e = this.outEdges[i]
      if (i === 0) {
        changeHandrail1.moveTo(e.p1.x / D2Config.SCREEN_RATE, e.p1.y / D2Config.SCREEN_RATE)
      }
    }
    for (let i = 0; i < this.inEdges.length; i++) {
      let e = this.inEdges[i]
      if (i === 0) {
        changeHandrail1.lineTo(e.p1.x / D2Config.SCREEN_RATE, e.p1.y / D2Config.SCREEN_RATE)
        changeHandrail1.lineTo(e.p2.x / D2Config.SCREEN_RATE,e.p2.y / D2Config.SCREEN_RATE)
      }
      if (i > 0 && e.type === 3) {
        changeHandrail1.quadraticCurveTo(e.controlPos.x / D2Config.SCREEN_RATE,e.controlPos.y / D2Config.SCREEN_RATE,e.p2.x / D2Config.SCREEN_RATE,e.p2.y /D2Config.SCREEN_RATE)
      }
      else if (i > 0 && e.type === 1) {
        changeHandrail1.lineTo(e.p2.x / D2Config.SCREEN_RATE,e.p2.y / D2Config.SCREEN_RATE)
      }
    }
    for (let i = this.outEdges.length - 1; i >= 0; i--) {
      let e = this.outEdges[i]
      if (i === this.outEdges.length - 1) {
        changeHandrail1.lineTo(e.p2.x / D2Config.SCREEN_RATE,e.p2.y / D2Config.SCREEN_RATE)
      }
      if (e.type === 1) {
        changeHandrail1.lineTo(e.p1.x / D2Config.SCREEN_RATE,e.p1.y / D2Config.SCREEN_RATE)
      }
      else if(e.type === 3) {
        changeHandrail1.quadraticCurveTo(e.controlPos.x / D2Config.SCREEN_RATE,e.controlPos.y / D2Config.SCREEN_RATE,e.p1.x / D2Config.SCREEN_RATE,e.p1.y /D2Config.SCREEN_RATE)
      }
    }

    const changeHandrail = new PIXI.Graphics()
    changeHandrail.visible = false
    changeHandrail.lineStyle(1, 0x4478f4)
    for (let i = 0; i < this.outEdges.length; i++) {
      let e = this.outEdges[i]
      if (i === 0) {
        changeHandrail.moveTo(e.p1.x / D2Config.SCREEN_RATE, e.p1.y / D2Config.SCREEN_RATE)
      }
    }
    for (let i = 0; i < this.inEdges.length; i++) {
      let e = this.inEdges[i]
      if (i === 0) {
        changeHandrail.lineTo(e.p1.x / D2Config.SCREEN_RATE, e.p1.y / D2Config.SCREEN_RATE)
        changeHandrail.lineTo(e.p2.x / D2Config.SCREEN_RATE,e.p2.y / D2Config.SCREEN_RATE)
      }
      if (i > 0 && e.type === 3) {
        changeHandrail.quadraticCurveTo(e.controlPos.x / D2Config.SCREEN_RATE,e.controlPos.y / D2Config.SCREEN_RATE,e.p2.x / D2Config.SCREEN_RATE,e.p2.y /D2Config.SCREEN_RATE)
      }
      else if (i > 0 && e.type === 1) {
        changeHandrail.lineTo(e.p2.x / D2Config.SCREEN_RATE,e.p2.y / D2Config.SCREEN_RATE)
      }
    }
    for (let i = this.outEdges.length - 1; i >= 0; i--) {
      let e = this.outEdges[i]
      if (i === this.outEdges.length - 1) {
        changeHandrail.lineTo(e.p2.x / D2Config.SCREEN_RATE,e.p2.y / D2Config.SCREEN_RATE)
      }
      if (e.type === 1) {
        changeHandrail.lineTo(e.p1.x / D2Config.SCREEN_RATE,e.p1.y / D2Config.SCREEN_RATE)
      }
      else if(e.type === 3) {
        changeHandrail.quadraticCurveTo(e.controlPos.x / D2Config.SCREEN_RATE,e.controlPos.y / D2Config.SCREEN_RATE,e.p1.x / D2Config.SCREEN_RATE,e.p1.y /D2Config.SCREEN_RATE)
      }
    }


    const handrail = new PIXI.Graphics()
    handrail.lineStyle(1, 0x2d3037)
    for (let i = 0; i < this.outEdges.length; i++) {
      let e = this.outEdges[i]
      if (i === 0) {
        handrail.moveTo(e.p1.x / 10, e.p1.y / 10)
      }
    }
    for (let i = 0; i < this.inEdges.length; i++) {
      let e = this.inEdges[i]
      if (i === 0) {
        handrail.lineTo(e.p1.x / 10, e.p1.y / 10)
        handrail.lineTo(e.p2.x / 10,e.p2.y / 10)
      }
      if (i > 0 && e.type === 3) {
        handrail.quadraticCurveTo(e.controlPos.x / 10,e.controlPos.y / 10,e.p2.x / 10,e.p2.y /10)
      }
      else if (i > 0 && e.type === 1) {
        handrail.lineTo(e.p2.x / 10,e.p2.y / 10)
      }
    }
    for (let i = this.outEdges.length - 1; i >= 0; i--) {
      let e = this.outEdges[i]
      if (i === this.outEdges.length - 1) {
        handrail.lineTo(e.p2.x / 10,e.p2.y / 10)
      }
      if (e.type === 1) {
        handrail.lineTo(e.p1.x / 10,e.p1.y / 10)
      }
      else if(e.type === 3) {
        handrail.quadraticCurveTo(e.controlPos.x / 10,e.controlPos.y / 10,e.p1.x / 10,e.p1.y /10)
      }
    }



    handrailContainer.addChild(changeHandrail1, changeHandrail, handrail)
    this.sprite = handrailContainer
  }

  // 取消扶手选中效果
  cancelSelected() {
    this.sprite.children[1].visible = false
    this.sprite.children[2].visible = true
    this.isSelected = false
  }

  // 扶手选中效果
  setSelected() {
    this.sprite.children[1].visible = true
    this.sprite.children[2].visible = false
    this.isSelected = true
  }

  // 鼠标进入扶手效果
  setHover() {
    this.sprite.children[1].visible = true
    this.sprite.children[2].visible = false
  }
  // 鼠标离开扶手效果
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
            type: COMP_TYPES.HANDRAIL,
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
