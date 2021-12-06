import Victor from 'victor'
import { Command } from '../../common/command'
import { COMP_TYPES } from '../../common/common_config'
import { Core } from '../../common/core'
import { Default } from '../../structure/config'
import { Types } from '../../types/stair_v2'
import { D2Config, Z_INDEX } from '../config'
import d2_tool from '../d2_tool'
import { ChildWidget } from './child_widget'

export class Tread extends ChildWidget {
  /**
   *
   * @param {Types.Tread} vPB
   */
  constructor(vPB, vParent) {
    super(vPB.uuid)
    this.sprite = new PIXI.Container()
    this.p1 = d2_tool.translateCoord(vPB.stepOutline.edges[3].p1)
    this.p2 = d2_tool.translateCoord(vPB.stepOutline.edges[3].p2)
    this.edges = vPB.stepOutline.edges
    this.isLast = vPB.isLast
    this.index = vPB.index
    this.parent = vParent
    this.depth = Default.WALL_DEPTH
    this.addDimension()
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

    // let treadContainer = new PIXI.Container()


    let changeTread = new PIXI.Graphics()
    if (this.isLast === true) {

      changeTread.visible = false
    } else{

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
    }


    // --------------------------------------------------------------------------------------------------------------//

    // 踏板绘制
    let tread = new PIXI.Graphics()
    if (this.isLast === true) {
      tread.visible = false
    } else {
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
    }

    // 踏板编号
    let stepNum = new PIXI.Text(this.index, { fontSize: 56 })
    stepNum.scale.set(0.25)
    stepNum.position.set(
      positionX / D2Config.SCREEN_RATE,
      positionY / D2Config.SCREEN_RATE
    )
    stepNum.anchor.set(0.5, 0.5)


    // 踏板标注线计算
    const { p1, p2 } = this
    const linelength = Math.round(Math.hypot(p1.x - p2.x, p1.y - p2.y) * 10)
    const offSet1 = new Victor((this.depth * 2) / 10, (this.depth * 2) / 10)
    const offSet2 = new Victor(this.depth / 10 / 2, this.depth / 10 / 2)
    const newP1 = new Victor(p1.x, p1.y).subtractX(offSet1)
    const newP1T = new Victor(p1.x, p1.y)
      .subtractX(offSet1)
      .addX(new Victor(10, 10))
    const newP1B = new Victor(p1.x, p1.y)
      .subtractX(offSet1)
      .subtractX(new Victor(5, 5))

    const newP2 = new Victor(p2.x, p2.y).subtractX(offSet1)
    const newp2T = new Victor(p2.x, p2.y)
      .subtractX(offSet1)
      .addX(new Victor(10, 10))
    const newp2B = new Victor(p2.x, p2.y)
      .subtractX(offSet1)
      .subtractX(new Victor(5, 5))
    const centerP = new Victor(
      (newP1.x + newP2.x) / 2,
      (newP1.y + newP2.y) / 2
    ).subtractX(offSet2)

    // 旋转计算
    let newTextRotation = ''
    const textRotation = new Victor(p1.x - p2.x, p1.y - p2.y)
    const textAngle = textRotation.angle()
    if (textAngle == Math.PI || textAngle == 0) {
      newTextRotation = 0
    } else if (textAngle < Math.PI) {
      newTextRotation = textRotation.invert().angle()
    } else if (textAngle > Math.PI) {
      newTextRotation = textRotation.angle()
    }

    // 标注线绘制
    const dimensionContainer = new PIXI.Graphics()
    let treadLine = new PIXI.Graphics()
    treadLine.lineStyle(1, 0xff88ff)
    treadLine.moveTo(newP1.x, newP1.y)
    treadLine.lineTo(newP2.x, newP2.y)

    const treadLineLeft = new PIXI.Graphics()
    treadLineLeft.lineStyle(0.5, 0xff88ff)
    treadLineLeft.moveTo(newP1B.x, newP1B.y)
    treadLineLeft.lineTo(newP1T.x, newP1T.y)

    const treadLineRight = new PIXI.Graphics()
    treadLineRight.lineStyle(0.5, 0xff88ff)
    treadLineRight.moveTo(newp2B.x, newp2B.y)
    treadLineRight.lineTo(newp2T.x, newp2T.y)

    // 标注尺寸绘制
    let treadLineNum = new PIXI.Text(linelength, { fontSize: 40 })
    treadLineNum.scale.set(0.25)
    treadLineNum.anchor.set(0.5, 0.5)
    treadLineNum.position.set(centerP.x, centerP.y)
    treadLineNum.rotation = newTextRotation

    dimensionContainer.addChild(
      treadLine,
      treadLineNum,
      treadLineLeft,
      treadLineRight
    )
    this.sprite.addChild(changeTread, tread, stepNum)
    // this.sprite = treadContainer
    // treadContainer.addChild(changeTread, tread, stepNum)
    // this.sprite = treadContainer
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
    console.log(this.sprite)
    if (this.index === 1) {
      this.sprite.zIndex = 0
    }else {
      this.sprite.zIndex = Z_INDEX.TREAD_ZINDEX
    }
    this.sprite.children[0].visible = true
    this.sprite.children[1].visible = false
    this.isSelected = true
  }

  // 鼠标进入踏板效果
  setHover() {
    if (this.index === 1) {
      this.sprite.zIndex = 0
    }else {
      this.sprite.zIndex = Z_INDEX.TREAD_ZINDEX
    }
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
          // document.addEventListener('keydown', (e) => {
          //   if (e.keyCode == 17) {

          //   }
          // })
          // document.addEventListener('keyup', (e) => {
          //   if (e.keyCode == 17) {
          //   }
          // })
        }

      })
      .on('mouseover', () => {
        if (D2Config.IS_SINGLE_SELECTED) {
          _this.setHover()
        } else {
          let eventC = null
          if (eventC === null) {
            _this.parent.setHover()
          }
          while(D2Config.IS_SINGLE_SELECTED) {

            eventC = document.addEventListener('keydown', (e) => {
              // if (e.keyCode == 17) {
                console.log(eventC)
                // _this.parent.setHover()
                // _this.cancelHover()
              // }
            })
          }
          // if (D2Config.IS_SINGLE_SELECTED) {
          // }
          // console.log(eventC)
          // if (eventC !== null) {
          //   _this.parent.cancelHover()
          //   _this.setHover()
          // }
          // document.addEventListener('keyup', (e) => {
          //   if (e.keyCode == 17) {
          //     _this.parent.setHover()
          //     // _this.cancelHover()
          //   }
          // })
        }
      })
  }
  addDimension() {

  }
}
