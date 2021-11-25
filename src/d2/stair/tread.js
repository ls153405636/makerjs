import { Command } from '../../common/command'
import { COMP_TYPES } from '../../common/common_config'
import { Core } from '../../common/core'
import { Types } from '../../types/stair_v2'
import { D2Config } from '../config'
import d2_tool from '../d2_tool'
import { ChildWidget } from './child_widget'

export class Tread extends ChildWidget {
  /**
   *
   * @param {Types.Tread} vPB
   */
  constructor(vPB, vParent) {
    super(vPB.uuid)
    this.edges = vPB.stepOutline.edges
    this.index = vPB.index
    this.parent = vParent
    this.type = vPB.type
    this.draw()
    this.addEvent()
  }

  draw() {
    // 中心位置计算
    let positionX = 0
    let positionY = 0
    for (let i = 0; i < this.edges.length; i++) {
      let f = this.edges[i]
      positionX += f.p1.x
      positionY += f.p1.y
    }
    positionX = positionX / this.edges.length
    positionY = positionY / this.edges.length

    let treadContainer = new PIXI.Container()


    let changeTread = new PIXI.Graphics()
    changeTread.visible = true
    changeTread.lineStyle(1, 0x4478f4)
    changeTread.beginFill(0xe9efff)

    for (let i = 0; i < this.edges.length; i++) {
      let e = this.edges[i]
      let p1 = d2_tool.translateCoord(this.edges[i].p1)
      let p2 = d2_tool.translateCoord(this.edges[i].p2)
      if (i === 0) {
        changeTread.moveTo(p1.x, p1.y)
      }
      if (e.type === Types.EdgeType.estraight) {
        changeTread.lineTo(p2.x, p2.y)
      } else if (e.type === Types.EdgeType.earc) {
        let pos = d2_tool.translateCoord(e.position)
        let radius = d2_tool.translateValue(e.radius)
        changeTread.arc(pos.x, pos.y, radius, e.start_angle, e.end_angle, e.is_clockwise)
      } else if (e.type === Types.EdgeType.ebeszer) {
        let conPoi = d2_tool.translateCoord(e.controlPos)
        changeTread.quadraticCurveTo(conPoi.x, conPoi.y, p2.x, p2.y)
      }
    }


    // --------------------------------------------------------------------------------------------------------------//

    // 踏板绘制
    let tread = new PIXI.Graphics()
    tread.lineStyle(1, 0x2d3037, 1, 0.5, true)
    tread.beginFill(0xffffff)
    tread.visible = true

    for (let i = 0; i < this.edges.length; i++) {
      let e = this.edges[i]
      let p1 = d2_tool.translateCoord(this.edges[i].p1)
      let p2 = d2_tool.translateCoord(this.edges[i].p2)
      if (i === 0) {
        tread.moveTo(p1.x, p1.y)
      }
      if (e.type === Types.EdgeType.estraight) {
        tread.lineTo(p2.x, p2.y)
      }
      else if (e.type === Types.EdgeType.earc) {
        let pos = d2_tool.translateCoord(e.position)
        let radius = d2_tool.translateValue(e.radius)
        tread.arc(pos.x, pos.y, radius, e.start_angle, e.end_angle, e.is_clockwise)
      }
      else if (e.type === Types.EdgeType.ebeszer) {
        let conPoi = d2_tool.translateCoord(e.controlPos)
        tread.quadraticCurveTo(conPoi.x, conPoi.y, p2.x, p2.y)
      }
    }



    // 踏板编号
    let stepNum = new PIXI.Text(this.index, { fontSize: 56 })
    stepNum.scale.set(0.25)
    stepNum.position.set(
      positionX / D2Config.SCREEN_RATE,
      positionY / D2Config.SCREEN_RATE
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
        let core = new Core()
        if (D2Config.IS_SINGLE_SELECTED) {
          core.execute(
            new Command(core.cmds.SelecteCmd, {
              uuid: this.uuid,
              type: COMP_TYPES.TREAD,
            })
          )
        } else {
          /**暂时根据踏板类型来判断是否选中的是休台，当前项目中，楼梯段踏板一定是标准矩形 */
          core.execute(
            new Command(core.cmds.SelecteCmd, {
              uuid: this.parent.uuid,
              type: COMP_TYPES.FLIGHT
            })
          )
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
