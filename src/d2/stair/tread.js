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
    this.edges = vPB.border.stepOutline.edges
    // console.log(vPB.border.stepOutline.isClock)
    this.isClock = vPB.border.stepOutline.isClock
    this.inIndex = vPB.border.inIndex
    this.frontIndex = vPB.border.frontIndex
    this.index = vPB.index
    this.parent = vParent
    this.type = vPB.type
    this.sprite = new PIXI.Container()
    this.isLast = vPB.isLast
    this.index = vPB.index
    this.parent = vParent
    this.depth = Default.WALL_DEPTH
    this.draw()
    //this.addDimension()
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

    this.sprite = new PIXI.Container()
    const treadContainer = new PIXI.Container()


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
          changeTread.arc(pos.x, pos.y, radius, e.startAngle, e.endAngle, !e.isClockwise)
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
          tread.arc(pos.x, pos.y, radius, e.startAngle, e.endAngle, !e.isClockwise)
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
    treadContainer.addChild(changeTread, tread, stepNum)
    // this.sprite = treadContainer
    this.sprite.addChild(treadContainer)
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
    this.sprite.children[0].children[0].visible = false
    this.sprite.children[0].children[1].visible = true
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
    this.sprite.children[0].children[0].visible = true
    this.sprite.children[0].children[1].visible = false
    this.isSelected = true
  }

  // 鼠标进入踏板效果
  setHover() {
    if (this.index === 1) {
      this.sprite.zIndex = 0
    }else {
      this.sprite.zIndex = Z_INDEX.TREAD_ZINDEX
    }
    this.sprite.children[0].children[0].visible = true
    this.sprite.children[0].children[1].visible = false
  }
  // 鼠标离开踏板效果
  cancelHover() {
    if (!this.isSelected) {
      this.sprite.zIndex = 0
      this.sprite.children[0].children[0].visible = false
      this.sprite.children[0].children[1].visible = true
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
    // 踏板标注线绘制
    const treadLineContainer = new PIXI.Container()
    const treadLine = new PIXI.Graphics()
    console.log(this.inIndex)
    // console.log(this.edges[this.inIndex[1]])
    const offSet = new Victor(500,500) //偏移出墙的偏移值
    const arrow = new Victor(50,50) //偏移出墙的偏移值
    let p1
    let p2
    
    let newP1
    let newP2
    
    let newP1T
    let newP1B
    let newP2T
    let newP2B
    
    for (let i = 0; i < this.inIndex.length; i++) {
      p1 = new Victor(this.edges[this.inIndex[i]].p1.x, this.edges[this.inIndex[i]].p1.y)
      p2 = new Victor(this.edges[this.inIndex[i]].p2.x, this.edges[this.inIndex[i]].p2.y)
      

      if (p1.x === p2.x && p1.y > p2.y && this.isClock === true) {
        // 左侧
        newP1 = p1.clone().subtractX(offSet)
        newP2 = p2.clone().subtractX(offSet)
        newP1T = p1.clone().subtractX(offSet).subtractX(arrow)
        newP1B = p1.clone().subtractX(offSet).addX(arrow)
        newP2T = p2.clone().subtractX(offSet).subtractX(arrow)
        newP2B = p2.clone().subtractX(offSet).addX(arrow)
      }
      if (p1.x === p2.x && p1.y > p2.y && this.isClock === false) {
        // 左侧
        newP1 = p1.clone().addX(offSet)
        newP2 = p2.clone().addX(offSet)
        newP1T = p1.clone().addX(offSet).subtractX(arrow)
        newP1B = p1.clone().addX(offSet).addX(arrow)
        newP2T = p2.clone().addX(offSet).subtractX(arrow)
        newP2B = p2.clone().addX(offSet).addX(arrow)
      }
      if (p1.x === p2.x && p1.y < p2.y  && this.isClock === true) {
        // 右侧
        newP1 = p1.clone().addX(offSet)
        newP2 = p2.clone().addX(offSet)
        newP1T = p1.clone().addX(offSet).addX(arrow)
        newP1B = p1.clone().addX(offSet).subtractX(arrow)
        newP2T = p2.clone().addX(offSet).addX(arrow)
        newP2B = p2.clone().addX(offSet).subtractX(arrow)
      }
      if (p1.x === p2.x && p1.y < p2.y  && this.isClock === false) {
        // 右侧
        newP1 = p1.clone().subtractX(offSet)
        newP2 = p2.clone().subtractX(offSet)
        newP1T = p1.clone().subtractX(offSet).addX(arrow)
        newP1B = p1.clone().subtractX(offSet).subtractX(arrow)
        newP2T = p2.clone().subtractX(offSet).addX(arrow)
        newP2B = p2.clone().subtractX(offSet).subtractX(arrow)
      }
      if (p1.x < p2.x && p1.y === p2.y && this.isClock === true) {
        // 顶侧
        newP1 = p1.clone().subtractY(offSet)
        newP2 = p2.clone().subtractY(offSet)
        newP1T = p1.clone().subtractY(offSet).subtractY(arrow)
        newP1B = p1.clone().subtractY(offSet).addY(arrow)
        newP2T = p2.clone().subtractY(offSet).subtractY(arrow)
        newP2B = p2.clone().subtractY(offSet).addY(arrow)
      }
      if (p1.x < p2.x && p1.y === p2.y && this.isClock === false) {
        // 顶侧
        newP1 = p1.clone().addY(offSet)
        newP2 = p2.clone().addY(offSet)
        newP1T = p1.clone().addY(offSet).subtractY(arrow)
        newP1B = p1.clone().addY(offSet).addY(arrow)
        newP2T = p2.clone().addY(offSet).subtractY(arrow)
        newP2B = p2.clone().addY(offSet).addY(arrow)
      }
      if (p1.x > p2.x && p1.y === p2.y && this.isClock === true) {
        // 顶侧
        newP1 = p1.clone().subtractY(offSet)
        newP2 = p2.clone().subtractY(offSet)
        newP1T = p1.clone().subtractY(offSet).subtractY(arrow)
        newP1B = p1.clone().subtractY(offSet).addY(arrow)
        newP2T = p2.clone().subtractY(offSet).subtractY(arrow)
        newP2B = p2.clone().subtractY(offSet).addY(arrow)
      }
      if (p1.x > p2.x && p1.y === p2.y && this.isClock === false) {
        // 顶侧
        newP1 = p1.clone().addY(offSet)
        newP2 = p2.clone().addY(offSet)
        newP1T = p1.clone().addY(offSet).subtractY(arrow)
        newP1B = p1.clone().addY(offSet).addY(arrow)
        newP2T = p2.clone().addY(offSet).subtractY(arrow)
        newP2B = p2.clone().addY(offSet).addY(arrow)
      }
      console.log(newP1)
      console.log(newP2)

      // 文字中心位置计算
      const position = {
        x: (newP1T.x + newP2T.x) / 2 / 10,
        y: (newP1T.y + newP2T.y) / 2 / 10
      }

      // 长度计算
      const treadLinelength =
      Math.floor(Math.hypot(p1.x - p2.x, p1.y - p2.y) * 10 ) / 10
      const treadLineNum = new PIXI.Text(treadLinelength, {
        fontSize: 32,
        fill: 0x000000,
      })

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

      treadLineNum.scale.set(0.25)
      treadLineNum.position.set(position.x, position.y)
      treadLineNum.anchor.set(0.5, 0.5)
      treadLineNum.rotation = newTextRotation
      treadLine
      .lineStyle(1,0x000000)
      .moveTo(newP1.x / 10,newP1.y / 10)
      .lineTo(newP2.x / 10,newP2.y / 10)
      .moveTo(newP1T.x / 10,newP1T.y / 10)
      .lineTo(newP1B.x / 10,newP1B.y / 10)
      .moveTo(newP2T.x / 10,newP2T.y / 10)
      .lineTo(newP2B.x / 10,newP2B.y / 10)
      treadLineContainer.addChild(treadLine,treadLineNum)
    }


    
    this.sprite.addChild(treadLineContainer)

  }
}
