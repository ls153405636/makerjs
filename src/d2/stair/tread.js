import Victor from 'victor'
import { Command } from '../../common/command'
import { COMP_TYPES } from '../../common/common_config'
import { Core } from '../../common/core'
import { Default, StructConfig } from '../../structure/config'
import tool from '../../structure/tool'
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
    this.isClock = vPB.border.stepOutline.isClock
    this.inIndex = vPB.border.inIndex
    this.frontIndex = vPB.border.frontIndex
    this.backIndex = vPB.border.backIndex
    this.index = vPB.index
    this.type = vPB.type
    this.stepWidth = vPB.stepWidth
    this.stepLength = vPB.stepLength
    this.sprite = new PIXI.Container()
    this.isLast = vPB.isLast
    this.parent = vParent
    this.depth = Default.WALL_DEPTH
    this.draw()
    this.addDimension()
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
    // this.wallNormal = []
    // this.wallDepth = 0
// console.log(this.inIndex)
    
    

    // 踏板标注线绘制
    const treadLineContainer = new PIXI.Container()
    const treadLine = new PIXI.Graphics()
    const arrow = new Victor(50,50) //偏移出墙的偏移值
    let p1
    let p2
    
    let newP1
    let newP2
    
    let newP1T
    let newP1B
    let newP2T
    let newP2B
    let normal // 法线
    // const offSet = new Victor(p1.x + 350,p1.y + 350) //偏移出墙的偏移值
    const offSet = new Victor(100,100) //偏移出墙的偏移值Y
    const fOffSet = new Victor(100,100) //偏移出墙的偏移值Y
    
    
    // 普通踏板标注
    if (this.type === Types.TreadType.trect || this.type === Types.TreadType.tSpec || this.type === Types.TreadType.tCor) {
      for (let i = 0; i < this.inIndex.length; i++) {
        p1 = new Victor(this.edges[this.inIndex[i]].p1.x, this.edges[this.inIndex[i]].p1.y)
        p2 = new Victor(this.edges[this.inIndex[i]].p2.x, this.edges[this.inIndex[i]].p2.y)
  
  
        // 踏板长度点计算
        const firstP = new Victor((this.edges[this.frontIndex[0]].p1.x + this.edges[this.frontIndex[0]].p2.x) / 2, (this.edges[this.frontIndex[0]].p1.y + this.edges[this.frontIndex[0]].p2.y) / 2)
        // const firstP1 = new Victor(this.edges[this.frontIndex[0]].p1.x, this.edges[this.frontIndex[0]].p1.y)
        // const firstP2 = new Victor(this.edges[this.frontIndex[0]].p2.x, this.edges[this.frontIndex[0]].p2.y)

        let lastP = new Victor((this.edges[this.backIndex[0]].p1.x + this.edges[this.backIndex[0]].p2.x) / 2, (this.edges[this.backIndex[0]].p1.y + this.edges[this.backIndex[0]].p2.y) / 2)
        // console.log(lastP2)
        
        const newFirstP1 = firstP.clone().addY(fOffSet).subtractX(new Victor(this.stepLength / 2, this.stepLength / 2))
        const newFirstP2 = firstP.clone().addY(fOffSet).addX(new Victor(this.stepLength / 2, this.stepLength / 2))

        const newFirstP1T = newFirstP1.clone().subtractY(arrow)
        const newFirstP1B = newFirstP1.clone().addY(arrow)
        const newFirstP2T = newFirstP2.clone().subtractY(arrow)
        const newFirstP2B = newFirstP2.clone().addY(arrow)

  
        let newLastP1
        let newLastP2
        let newLastP1T
        let newLastP1B
        let newLastP2T
        let newLastP2B
        // 文字中心位置计算
        let position 
        let lastPosition
        
        // 顺-左
        if (p1.x === p2.x && p1.y > p2.y && this.isClock === true) {
          normal = new Types.Vector3({ x: -1, y: -0 })

          let wall = null
          let stairP = null
          for(let value of D2Config.WIDGETS.values()) {
            if (value.getWidgetType() === COMP_TYPES.WALL) {
              if (tool.isVec2Equal(value.normal, normal)) {
                wall = value
              }
            }
            if (value.getWidgetType() === COMP_TYPES.STAIR) {
              stairP = d2_tool.translateCoord(value.position)
            }
          }
          // console.log(stairP)
          // console.log(wall.outP1)
          // console.log(wall.p1)
          // console.log(p1)
          // console.log(p2)
          let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)
          // console.log(wallOutP1)

          // 左侧
          newP1 = new Victor(wallOutP1.x * 10, p1.y)
          newP2 = new Victor(wallOutP1.x * 10, p2.y)
          
          newP1 = newP1.subtractX(offSet)
          newP2 = newP2.subtractX(offSet)
          newP1T = newP1.clone().subtractX(arrow)
          newP1B = newP1.clone().addX(arrow)
          newP2T = newP2.clone().subtractX(arrow)
          newP2B = newP2.clone().addX(arrow)
  
          newLastP1 = lastP.clone().subtractY(fOffSet).subtractX(new Victor(this.stepLength / 2,this.stepLength / 2))
          newLastP2 = lastP.clone().subtractY(fOffSet).addX(new Victor(this.stepLength / 2,this.stepLength / 2))

          newLastP1T = newLastP1.clone().subtractY(arrow)
          newLastP1B = newLastP1.clone().addY(arrow)
          newLastP2T = newLastP2.clone().subtractY(arrow)
          newLastP2B = newLastP2.clone().addY(arrow)

          // 文字中心位置计算
          position = {
            x: (newP1T.x + newP2T.x) / 2 / 10,
            y: (newP1T.y + newP2T.y) / 2 / 10
          }
          lastPosition = {
            x: (newLastP1T.x + newLastP2T.x) / 2 / 10,
            y: (newLastP1T.y + newLastP2T.y) / 2 / 10
          }
        }
        // 顺-顶
        if (p1.x < p2.x && p1.y === p2.y && this.isClock === true) {
          normal = new Types.Vector3({ x: 0, y: -1 })

          let wall = null
          let stairP = null
          for(let value of D2Config.WIDGETS.values()) {
            if (value.getWidgetType() === COMP_TYPES.WALL) {
              if (tool.isVec2Equal(value.normal, normal)) {
                wall = value
              }
            }
            if (value.getWidgetType() === COMP_TYPES.STAIR) {
              stairP = d2_tool.translateCoord(value.position)
            }
          }
          // console.log(stairP)
          // console.log(wall.outP1)
          // console.log(wall.p1)
          // console.log(p1)
          // console.log(p2)
          let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)
          // console.log(wallOutP1)

          // 左侧
          newP1 = new Victor(p1.x, wallOutP1.y * 10)
          newP2 = new Victor(p2.x, wallOutP1.y * 10)

          // 顶侧
          newP1 = new Victor(p1.x, wallOutP1.y * 10)
          newP2 = new Victor(p2.x, wallOutP1.y * 10)
          // console.log(newP1)
          // console.log(newP2)

          newP1 = newP1.subtractY(offSet)
          newP2 = newP2.subtractY(offSet)
          newP1T = newP1.clone().subtractY(arrow)
          newP1B = newP1.clone().addY(arrow)
          newP2T = newP2.clone().subtractY(arrow)
          newP2B = newP2.clone().addY(arrow)
  
          // newLastP1 = lastP1.clone().addX(fOffSet)
          // newLastP2 = lastP2.clone().addX(fOffSet)
          newLastP1 = lastP.clone().addX(fOffSet).subtractY(new Victor(this.stepLength / 2,this.stepLength / 2))
          newLastP2 = lastP.clone().addX(fOffSet).addY(new Victor(this.stepLength / 2,this.stepLength / 2))

          newLastP1T = newLastP1.clone().subtractX(arrow)
          newLastP1B = newLastP1.clone().addX(arrow)
          newLastP2T = newLastP2.clone().subtractX(arrow)
          newLastP2B = newLastP2.clone().addX(arrow)

          // 文字中心位置计算
          position = {
            x: (newP1T.x + newP2T.x) / 2 / 10,
            y: (newP1T.y + newP2T.y) / 2 / 10
          }
          lastPosition = {
            x: (newLastP1B.x + newLastP2B.x) / 2 / 10,
            y: (newLastP1B.y + newLastP2B.y) / 2 / 10
          }
        }
        // 顺-右
        if (p1.x === p2.x && p1.y < p2.y  && this.isClock === true) {
          normal = new Types.Vector3({ x: 1, y: 0 })

          let wall = null
          let stairP = null
          for(let value of D2Config.WIDGETS.values()) {
            if (value.getWidgetType() === COMP_TYPES.WALL) {
              if (tool.isVec2Equal(value.normal, normal)) {
                wall = value
              }
            }
            if (value.getWidgetType() === COMP_TYPES.STAIR) {
              stairP = d2_tool.translateCoord(value.position)
            }
          }
          // console.log(stairP)
          // console.log(wall.outP1)
          // console.log(wall.p1)
          // console.log(p1)
          // console.log(p2)
          let wallOutP1 = new Victor(wall.outP1.x - stairP.x,stairP.y - wall.p1.y)
          // console.log(wallOutP1)
          
          // 顶侧
          newP1 = new Victor(wallOutP1.x * 10, p1.y)
          newP2 = new Victor(wallOutP1.x * 10, p2.y)
          // console.log(newP1)
          // console.log(newP2)


          // 右侧
          newP1 = newP1.addX(offSet)
          newP2 = newP2.addX(offSet)
          newP1T = newP1.clone().subtractX(arrow)
          newP1B = newP1.clone().addX(arrow)
          newP2T = newP2.clone().subtractX(arrow)
          newP2B = newP2.clone().addX(arrow)
  
          // newLastP1 = lastP1.clone().addY(fOffSet)
          // newLastP2 = lastP2.clone().addY(fOffSet)
          newLastP1 = lastP.clone().addY(fOffSet).subtractX(new Victor(this.stepLength / 2,this.stepLength / 2))
          newLastP2 = lastP.clone().addY(fOffSet).addX(new Victor(this.stepLength / 2,this.stepLength / 2))

          newLastP1T = newLastP1.clone().subtractY(arrow)
          newLastP1B = newLastP1.clone().addY(arrow)
          newLastP2T = newLastP2.clone().subtractY(arrow)
          newLastP2B = newLastP2.clone().addY(arrow)

          // 文字中心位置计算
          position = {
            x: (newP1B.x + newP2B.x) / 2 / 10,
            y: (newP1B.y + newP2B.y) / 2 / 10
          }
          lastPosition = {
            x: (newLastP1T.x + newLastP2T.x) / 2 / 10,
            y: (newLastP1T.y + newLastP2T.y) / 2 / 10
          }
        }
        // 顺-底
        if (p1.x > p2.x && p1.y === p2.y && this.isClock === true) {// 无
          normal = new Types.Vector3({ x: -0, y: -1 })

          // let wall = null
          // let stairP = null
          // for(let value of D2Config.WIDGETS.values()) {
          //   if (value.getWidgetType() === COMP_TYPES.WALL) {
          //     if (tool.isVec2Equal(value.normal, normal)) {
          //       wall = value
          //     }
          //   }
          //   if (value.getWidgetType() === COMP_TYPES.STAIR) {
          //     stairP = d2_tool.translateCoord(value.position)
          //   }
          // }
          // // console.log(stairP)
          // // console.log(wall.outP1)
          // // console.log(wall.p1)
          // // console.log(p1)
          // // console.log(p2)
          // let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)
          // // console.log(wallOutP1)
          
          // // 顶侧
          // newP1 = new Victor(p1.x, wallOutP1.y * 10)
          // newP2 = new Victor(p2.x, wallOutP1.y * 10)
          // // console.log(newP1)
          // // console.log(newP2)

          // 顶侧
          newP1 = p1.clone().addY(offSet)
          newP2 = p2.clone().addY(offSet)
          newP1T = p1.clone().addY(offSet).subtractY(arrow)
          newP1B = p1.clone().addY(offSet).addY(arrow)
          newP2T = p2.clone().addY(offSet).subtractY(arrow)
          newP2B = p2.clone().addY(offSet).addY(arrow)
  
          // newLastP1 = lastP1.clone().addY(fOffSet)
          // newLastP2 = lastP2.clone().addY(fOffSet)
          newLastP1 = lastP.clone().addY(fOffSet).subtractX(new Victor(this.stepLength / 2,this.stepLength / 2))
          newLastP2 = lastP.clone().addY(fOffSet).addX(new Victor(this.stepLength / 2,this.stepLength / 2))

          newLastP1T = newLastP1.clone().subtractX(arrow)
          newLastP1B = newLastP1.clone().addX(arrow)
          newLastP2T = newLastP2.clone().subtractX(arrow)
          newLastP2B = newLastP2.clone().addX(arrow)
        }
        // 逆-右
        if (p1.x === p2.x && p1.y > p2.y && this.isClock === false) {
          normal = new Types.Vector3({ x: 1, y: 0 })

          let wall = null
          let stairP = null
          for(let value of D2Config.WIDGETS.values()) {
            if (value.getWidgetType() === COMP_TYPES.WALL) {
              if (tool.isVec2Equal(value.normal, normal)) {
                wall = value
              }
            }
            if (value.getWidgetType() === COMP_TYPES.STAIR) {
              stairP = d2_tool.translateCoord(value.position)
            }
          }
          // console.log(stairP)
          // console.log(wall.outP1)
          // console.log(wall.p1)
          // console.log(p1)
          // console.log(p2)
          let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)
          // console.log(wallOutP1)
          
          // 顶侧
          newP1 = new Victor(wallOutP1.x * 10, p1.y)
          newP2 = new Victor(wallOutP1.x * 10, p2.y)
          // console.log(newP1)
          // console.log(newP2)
          
          newP1 = newP1.addX(offSet)
          newP2 = newP2.addX(offSet)
          newP1T = newP1.clone().subtractX(arrow)
          newP1B = newP1.clone().addX(arrow)
          newP2T = newP2.clone().subtractX(arrow)
          newP2B = newP2.clone().addX(arrow)
  
          newLastP1 = lastP.clone().subtractY(fOffSet).subtractX(new Victor(this.stepLength / 2,this.stepLength / 2))
          newLastP2 = lastP.clone().subtractY(fOffSet).addX(new Victor(this.stepLength / 2,this.stepLength / 2))
          // newLastP1 = lastP1.clone().subtractY(fOffSet)
          // newLastP2 = lastP2.clone().subtractY(fOffSet)

          newLastP1T = newLastP1.clone().subtractY(arrow)
          newLastP1B = newLastP1.clone().addY(arrow)
          newLastP2T = newLastP2.clone().subtractY(arrow)
          newLastP2B = newLastP2.clone().addY(arrow)

          // 文字中心位置计算
          position = {
            x: (newP1B.x + newP2B.x) / 2 / 10,
            y: (newP1B.y + newP2B.y) / 2 / 10
          }
          lastPosition = {
            x: (newLastP1T.x + newLastP2T.x) / 2 / 10,
            y: (newLastP1T.y + newLastP2T.y) / 2 / 10
          }
        }
        // 逆-顶
        if (p1.x > p2.x && p1.y === p2.y && this.isClock === false) {
          normal = new Types.Vector3({ x: 0, y: -1 })

          let wall = null
          let stairP = null
          for(let value of D2Config.WIDGETS.values()) {
            if (value.getWidgetType() === COMP_TYPES.WALL) {
              if (tool.isVec2Equal(value.normal, normal)) {
                wall = value
              }
            }
            if (value.getWidgetType() === COMP_TYPES.STAIR) {
              stairP = d2_tool.translateCoord(value.position)
            }
          }
          // console.log(stairP)
          // console.log(wall.outP1)
          // console.log(wall.p1)
          // console.log(p1)
          // console.log(p2)
          let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)
          // console.log(wallOutP1)
          
          // 顶侧
          newP1 = new Victor(p1.x, wallOutP1.y * 10)
          newP2 = new Victor(p2.x, wallOutP1.y * 10)
          // console.log(newP1)
          // console.log(newP2)
          
          // 顶侧
          newP1 = newP1.subtractY(offSet)
          newP2 = newP2.subtractY(offSet)
          newP1T = newP1.clone().subtractY(arrow)
          newP1B = newP1.clone().addY(arrow)
          newP2T = newP2.clone().subtractY(arrow)
          newP2B = newP2.clone().addY(arrow)
  
          // newLastP1 = lastP1.clone().subtractX(fOffSet)
          // newLastP2 = lastP2.clone().subtractX(fOffSet)
          newLastP1 = lastP.clone().subtractX(fOffSet).subtractY(new Victor(this.stepLength / 2,this.stepLength / 2))
          newLastP2 = lastP.clone().subtractX(fOffSet).addY(new Victor(this.stepLength / 2,this.stepLength / 2))

          newLastP1T = newLastP1.clone().subtractX(arrow)
          newLastP1B = newLastP1.clone().addX(arrow)
          newLastP2T = newLastP2.clone().subtractX(arrow)
          newLastP2B = newLastP2.clone().addX(arrow)

          // 文字中心位置计算
          position = {
            x: (newP1T.x + newP2T.x) / 2 / 10,
            y: (newP1T.y + newP2T.y) / 2 / 10
          }
          lastPosition = {
            x: (newLastP1T.x + newLastP2T.x) / 2 / 10,
            y: (newLastP1T.y + newLastP2T.y) / 2 / 10
          }
        }
        // 逆-左
        if (p1.x === p2.x && p1.y < p2.y  && this.isClock === false) {
          normal = new Types.Vector3({ x: -1, y: -0 })

          let wall = null
          let stairP = null
          for(let value of D2Config.WIDGETS.values()) {
            if (value.getWidgetType() === COMP_TYPES.WALL) {
              if (tool.isVec2Equal(value.normal, normal)) {
                wall = value
              }
            }
            if (value.getWidgetType() === COMP_TYPES.STAIR) {
              stairP = d2_tool.translateCoord(value.position)
            }
          }
          // console.log(stairP)
          // console.log(wall.outP1)
          // console.log(wall.p1)
          // console.log(p1)
          // console.log(p2)
          let wallOutP1 = new Victor( wall.outP1.x - stairP.x,0)
          // console.log(wallOutP1)
          
          // 顶侧
          newP1 = new Victor(wallOutP1.x * 10, p1.y)
          newP2 = new Victor(wallOutP1.x * 10, p2.y)
          // console.log(newP1)
          // console.log(newP2)


          // 左侧
          newP1 = newP1.subtractX(offSet)
          newP2 = newP2.subtractX(offSet)
          newP1T = newP1.clone().subtractX(arrow)
          newP1B = newP1.clone().addX(arrow)
          newP2T = newP2.clone().subtractX(arrow)
          newP2B = newP2.clone().addX(arrow)
  
          // newLastP1 = lastP1.clone().addY(fOffSet)
          // newLastP2 = lastP2.clone().addY(fOffSet)
          newLastP1 = lastP.clone().addY(fOffSet).subtractX(new Victor(this.stepLength / 2,this.stepLength / 2))
          newLastP2 = lastP.clone().addY(fOffSet).addX(new Victor(this.stepLength / 2,this.stepLength / 2))

          newLastP1T = newLastP1.clone().subtractY(arrow)
          newLastP1B = newLastP1.clone().addY(arrow)
          newLastP2T = newLastP2.clone().subtractY(arrow)
          newLastP2B = newLastP2.clone().addY(arrow)

          // 文字中心位置计算
          position = {
            x: (newP1T.x + newP2T.x) / 2 / 10,
            y: (newP1T.y + newP2T.y) / 2 / 10
          }
          lastPosition = {
            x: (newLastP1T.x + newLastP2T.x) / 2 / 10,
            y: (newLastP1T.y + newLastP2T.y) / 2 / 10
          }
        }
        // 逆-底
        if (p1.x < p2.x && p1.y === p2.y && this.isClock === false) {// 无
          normal = new Types.Vector3({ x: -0, y: -1 })
          
          // let wall = null
          // for(let value of D2Config.WIDGETS.values()) {
          //   if (value.getWidgetType() === COMP_TYPES.WALL) {
          //     if (tool.isVec2Equal(value.normal, normal)) {
          //       wall = value
          //     }
          //   }
          // }
          // console.log(wall.outP1)
          // console.log(wall.p1)
          // console.log(p1)
          // console.log(p2)
          // let wallOutP1 = new Victor(wall.outP1.x - wall.p1.x, wall.outP1.y - wall.p1.y)
          // console.log(wallOutP1)
          
          // // 顶侧
          // newP1 = new Victor(p1.x, wallOutP1.y * 10)
          // newP2 = new Victor(p2.x, wallOutP1.y * 10)
          // // console.log(newP1)
          // // console.log(newP2)

          newP1 = p1.clone().addY(offSet)
          newP2 = p2.clone().addY(offSet)
          newP1T = p1.clone().addY(offSet).subtractY(arrow)
          newP1B = p1.clone().addY(offSet).addY(arrow)
          newP2T = p2.clone().addY(offSet).subtractY(arrow)
          newP2B = p2.clone().addY(offSet).addY(arrow)
  
          // newLastP1 = lastP1.clone().addY(fOffSet)
          // newLastP2 = lastP2.clone().addY(fOffSet)
          newLastP1 = lastP.clone().addY(fOffSet).subtractY(new Victor(this.stepLength / 2,this.stepLength / 2))
          newLastP2 = lastP.clone().addY(fOffSet).addY(new Victor(this.stepLength / 2,this.stepLength / 2))

          newLastP1T = newLastP1.clone().subtractX(arrow)
          newLastP1B = newLastP1.clone().addX(arrow)
          newLastP2T = newLastP2.clone().subtractX(arrow)
          newLastP2B = newLastP2.clone().addX(arrow)

          // // 文字中心位置计算
          // lastPosition = {
          //   x: (newLastP1B.x + newLastP2B.x) / 2 / 10,
          //   y: (newLastP1B.y + newLastP2B.y) / 2 / 10
          // }
        }
  
        // 文字中心位置计算
        const firstPosition = {
          x: (newFirstP1B.x + newFirstP2B.x) / 2 / 10,
          y: (newFirstP1B.y + newFirstP2B.y) / 2 / 10
        }
  
        // 长度计算
        const treadLinelength =
        Math.floor(Math.hypot(p1.x - p2.x, p1.y - p2.y) )

        const firstTextLength =
        Math.floor(Math.hypot(newFirstP1.x - newFirstP2.x, newFirstP1.y - newFirstP2.y) )
        const lastTextLength =
        Math.floor(Math.hypot(newLastP1.x - newLastP2.x, newLastP1.y - newLastP2.y) )
        
        const treadLineNum = new PIXI.Text(treadLinelength, {
          fontSize: 32,
          fill: 0x000000,
        })
        if (this.isLast) {
          treadLineNum.visible = false
        }
  
        // 旋转计算
        let newTextRotation = ''
        const textRotation = new Victor(p1.x - p2.x, p1.y - p2.y)
        const textAngle = textRotation.angle()
        let firstR = ''
        if (this.isClock === true) {
          if (textAngle == Math.PI || textAngle == 0 || textAngle == -Math.PI) {
            newTextRotation = 0
          } else if (0 < textAngle < Math.PI) {
            newTextRotation = textRotation.invert().angle()
          } else if (0 > textAngle > -Math.PI) {
            newTextRotation = textRotation.angle()
          }
          if (newTextRotation === Math.PI / 2) {
            firstR = 0
          } else {
            firstR = newTextRotation + Math.PI / 2
          }
        } else {
          if (textAngle == Math.PI || textAngle == 0 || textAngle == -Math.PI) {
            newTextRotation = 0
          } else if (0 < textAngle < Math.PI) {
            newTextRotation = textRotation.angle()
          } else if (0 > textAngle > -Math.PI) {
            newTextRotation = textRotation.invert().angle()
          }
          if (newTextRotation === -Math.PI / 2) {
            firstR = 0
          } else {
            firstR = newTextRotation - Math.PI / 2
          }
        }
        
        
        treadLineNum.scale.set(0.25)
        treadLineNum.position.set(position.x, position.y)
        treadLineNum.anchor.set(0.5, 0.5)
        treadLineNum.rotation = newTextRotation
        if (this.isLast === false) {

          treadLine
          .lineStyle(1,0x000000)
          .moveTo(newP1.x / 10,newP1.y / 10)
          .lineTo(newP2.x / 10,newP2.y / 10)
          .moveTo(newP1T.x / 10,newP1T.y / 10)
          .lineTo(newP1B.x / 10,newP1B.y / 10)
          .moveTo(newP2T.x / 10,newP2T.y / 10)
          .lineTo(newP2B.x / 10,newP2B.y / 10)
        }
  
        if (this.index === 1) {
          treadLine
           .moveTo(newFirstP1.x / 10, newFirstP1.y / 10)
           .lineTo(newFirstP2.x / 10, newFirstP2.y / 10)

           .moveTo(newFirstP1T.x / 10, newFirstP1T.y / 10, )
           .lineTo(newFirstP1B.x / 10, newFirstP1B.y / 10, )
           .moveTo(newFirstP2T.x / 10, newFirstP2T.y / 10, )
           .lineTo(newFirstP2B.x / 10, newFirstP2B.y / 10, )

          const firstText = new PIXI.Text(firstTextLength, {
            fontSize: 36,
            fill: 0x000000
          })
          firstText.scale.set(0.25)
          firstText.position.set(firstPosition.x, firstPosition.y)
          firstText.anchor.set(0.5, 0.5)
          firstText.rotation = firstR
          treadLineContainer.addChild(firstText)
        }
        
        if (this.isLast === true) {

          const lastText = new PIXI.Text(lastTextLength, {
            fontSize: 36,
            fill: 0x000000
          })
          lastText.scale.set(0.25)
          lastText.position.set(lastPosition.x, lastPosition.y)
          lastText.anchor.set(0.5, 0.5)
          lastText.rotation = firstR

          const lastLine = new PIXI.Graphics
          lastLine.lineStyle(1, 0x000000)
          lastLine
          .moveTo(newLastP1.x / 10, newLastP1.y / 10)
           .lineTo(newLastP2.x / 10, newLastP2.y / 10)

           .moveTo(newLastP1T.x / 10, newLastP1T.y / 10, )
           .lineTo(newLastP1B.x / 10, newLastP1B.y / 10, )
           .moveTo(newLastP2T.x / 10, newLastP2T.y / 10, )
           .lineTo(newLastP2B.x / 10, newLastP2B.y / 10, )
          treadLineContainer.addChild(lastText, lastLine)
          
          
    
        }
  
        treadLineContainer.addChild(treadLine, treadLineNum)
      }
    }
    // 起步踏板标注
    if (this.type === 0 && this.edges.length === 5) {
      if (this.index === 1) {
        let startTP1L = new Victor(this.edges[0].p1.x, this.edges[0].p1.y)
        let startTP2L = new Victor(this.edges[0].p1.x, startTP1L.y + this.stepWidth + this.stepWidth / 6)
        let startTP1R = new Victor(this.edges[1].p1.x, this.edges[1].p1.y)
        let startTP2R = new Victor(this.edges[1].p1.x, startTP1R.y + this.stepWidth + this.stepWidth / 6)
        
        // 起步踏板宽度计算
        const startTreadLinelength =
        Math.floor(Math.hypot(startTP1L.x - startTP2L.x, startTP1L.y - startTP2L.y) )
  
        const startTreadLinelength1 =
        Math.floor(Math.hypot(startTP1L.x - startTP1R.x, startTP1L.y - startTP1R.y) )
  
        let newStartP1
        let newStartP2
        
        let newStartP1T
        let newStartP1B
        let newStartP2T
        let newStartP2B

        let startTP2L_T
        let startTP2L_B
        let startTP2R_T
        let startTP2R_B
        if (startTP1L.x === startTP2L.x && startTP1L.y < startTP2L.y && this.isClock === true) {
          normal = new Types.Vector3({ x: -1, y: -0 })
  
          let wall = null
          let stairP = null
          for(let value of D2Config.WIDGETS.values()) {
            if (value.getWidgetType() === COMP_TYPES.WALL) {
              if (tool.isVec2Equal(value.normal, normal)) {
                wall = value
              }
            }
            if (value.getWidgetType() === COMP_TYPES.STAIR) {
              stairP = d2_tool.translateCoord(value.position)
            }
          }
          // console.log(stairP)
          // console.log(wall.outP1)
          // console.log(wall.p1)
          let wallOutP1 = new Victor(wall.outP1.x - stairP.x, 0)
          // console.log(wallOutP1)
  
          newStartP1 = new Victor(wallOutP1.x * 10, startTP1L.y)
          newStartP2 = new Victor(wallOutP1.x * 10, startTP2L.y)
          newStartP1 = newStartP1.subtractX(offSet)
          newStartP2 = newStartP2.subtractX(offSet)
  
          newStartP1T = newStartP1.clone().subtractX(arrow)
          newStartP1B = newStartP1.clone().addX(arrow)
          newStartP2T = newStartP2.clone().subtractX(arrow)
          newStartP2B = newStartP2.clone().addX(arrow)

          startTP2L_T = startTP2L.clone().addY(arrow)
          startTP2L_B = startTP2L.clone().subtractY(arrow)
          startTP2R_T = startTP2R.clone().addY(arrow)
          startTP2R_B = startTP2R.clone().subtractY(arrow)
        }
        if (startTP1R.x === startTP2R.x && startTP1R.y < startTP2R.y && this.isClock === false) {
          normal = new Types.Vector3({ x: 1, y: 0 })
  
          let wall = null
          let stairP = null
          for(let value of D2Config.WIDGETS.values()) {
            if (value.getWidgetType() === COMP_TYPES.WALL) {
              if (tool.isVec2Equal(value.normal, normal)) {
                wall = value
              }
            }
            if (value.getWidgetType() === COMP_TYPES.STAIR) {
              stairP = d2_tool.translateCoord(value.position)
            }
          }
          console.log(stairP)
          console.log(wall.outP1)
          console.log(wall.p1)
          let wallOutP1 = new Victor(wall.outP1.x - stairP.x, 0)
          // console.log(wallOutP1)
  
          newStartP1 = new Victor(wallOutP1.x * 10, startTP1R.y)
          newStartP2 = new Victor(wallOutP1.x * 10, startTP2R.y)
          newStartP1 = newStartP1.addX(offSet)
          newStartP2 = newStartP2.addX(offSet)
  
          newStartP1T = newStartP1.clone().subtractX(arrow)
          newStartP1B = newStartP1.clone().addX(arrow)
          newStartP2T = newStartP2.clone().subtractX(arrow)
          newStartP2B = newStartP2.clone().addX(arrow)

          startTP2L_T = startTP2L.clone().addY(arrow)
          startTP2L_B = startTP2L.clone().subtractY(arrow)
          startTP2R_T = startTP2R.clone().addY(arrow)
          startTP2R_B = startTP2R.clone().subtractY(arrow)
        }

  
        // 文字中心位置计算
        const position = {
          x: (newStartP1T.x + newStartP2T.x) / 2 / 10,
          y: (newStartP1T.y + newStartP2T.y) / 2 / 10
        }
        const position1 = {
          x: (startTP2L.x + startTP2R.x) / 2 / 10,
          y: (startTP2L.y + startTP2R.y) / 2 / 10
        }
  
        // 旋转计算
        let newStartTextRotation = ''
        const startTextRotation = new Victor(newStartP1.x - newStartP2.x, newStartP1.y - newStartP2.y)
        const startTextAngle = startTextRotation.angle()
        if (startTextAngle == Math.PI || startTextAngle == 0) {
          newStartTextRotation = 0
        } else if (startTextAngle > Math.PI) {
          newStartTextRotation = startTextRotation.invert().angle()
        } else if (startTextAngle < Math.PI) {
          newStartTextRotation = startTextRotation.angle()
        }
  
        const startTreadLine = new PIXI.Graphics()

        startTreadLine
        .lineStyle(1,0x000000)
        .moveTo(newStartP1.x / 10, newStartP1.y / 10)
        .lineTo(newStartP2.x / 10, newStartP2.y / 10)

        .moveTo(startTP2L.x / 10, startTP2L.y / 10 + 10)
        .lineTo(startTP2R.x / 10, startTP2R.y / 10 + 10)
        
  
        .moveTo(startTP2L_T.x / 10, startTP2L_T.y / 10 + 10)
        .lineTo(startTP2L_B.x / 10, startTP2L_B.y / 10 + 10)
        .moveTo(startTP2R_T.x / 10, startTP2R_T.y / 10 + 10)
        .lineTo(startTP2R_B.x / 10, startTP2R_B.y / 10 + 10)

        .moveTo(newStartP1T.x / 10, newStartP1T.y / 10)
        .lineTo(newStartP1B.x / 10, newStartP1B.y / 10)
        .moveTo(newStartP2T.x / 10, newStartP2T.y / 10)
        .lineTo(newStartP2B.x / 10, newStartP2B.y / 10)
  
        const startTreadLineNum = new PIXI.Text(startTreadLinelength, {
          fontSize: 32,
          fill: 0x000000,
        })
  
        startTreadLineNum.scale.set(0.25)
        startTreadLineNum.position.set(position.x, position.y)
        startTreadLineNum.anchor.set(0.5, 0.5)
        startTreadLineNum.rotation = newStartTextRotation

        const startTreadLineNum1 = new PIXI.Text(startTreadLinelength1, {
          fontSize: 32,
          fill: 0x000000,
        })
  
        startTreadLineNum1.scale.set(0.25)
        startTreadLineNum1.position.set(position1.x, position1.y + 5)
        startTreadLineNum1.anchor.set(0.5, 0.5)
        startTreadLineNum1.rotation = 0
  
  
        treadLineContainer.addChild(startTreadLine,startTreadLineNum, startTreadLineNum1)
      }
    }
    if (this.type === 0 && this.edges.length === 4) {
      if (this.index === 1) {
        let startTP1L = new Victor(this.edges[0].p1.x, this.edges[0].p1.y)
        let startTP2L = new Victor(this.edges[0].p1.x, startTP1L.y + this.stepWidth)
        let startTP1R = new Victor(this.edges[1].p1.x, this.edges[1].p1.y)
        let startTP2R = new Victor(this.edges[1].p1.x, startTP1R.y + this.stepWidth)
        
        // 起步踏板宽度计算
        const startTreadLinelength =
        Math.floor(Math.hypot(startTP1L.x - startTP2L.x, startTP1L.y - startTP2L.y) )

        const startTreadLinelength1 =
        Math.floor(Math.hypot(startTP1L.x - startTP1R.x, startTP1L.y - startTP1R.y) )
  
        let newStartP1
        let newStartP2
        
        let newStartP1T
        let newStartP1B
        let newStartP2T
        let newStartP2B

        let startTP2L_T
        let startTP2L_B
        let startTP2R_T
        let startTP2R_B

        if (startTP1L.x === startTP2L.x && startTP1L.y < startTP2L.y && this.isClock === true) {
          normal = new Types.Vector3({ x: -1, y: -0 })
  
          let wall = null
          let stairP = null
          for(let value of D2Config.WIDGETS.values()) {
            if (value.getWidgetType() === COMP_TYPES.WALL) {
              if (tool.isVec2Equal(value.normal, normal)) {
                wall = value
              }
            }
            if (value.getWidgetType() === COMP_TYPES.STAIR) {
              stairP = d2_tool.translateCoord(value.position)
            }
          }
          // console.log(stairP)
          // console.log(wall.outP1)
          // console.log(wall.p1)
          let wallOutP1 = new Victor(wall.outP1.x - stairP.x, 0)
          // console.log(wallOutP1)
  
          newStartP1 = new Victor(wallOutP1.x * 10, startTP1L.y)
          newStartP2 = new Victor(wallOutP1.x * 10, startTP2L.y)
          newStartP1 = newStartP1.subtractX(offSet)
          newStartP2 = newStartP2.subtractX(offSet)
  
          newStartP1T = newStartP1.clone().subtractX(arrow)
          newStartP1B = newStartP1.clone().addX(arrow)
          newStartP2T = newStartP2.clone().subtractX(arrow)
          newStartP2B = newStartP2.clone().addX(arrow)

          startTP2L_T = startTP2L.clone().addY(arrow)
          startTP2L_B = startTP2L.clone().subtractY(arrow)
          startTP2R_T = startTP2R.clone().addY(arrow)
          startTP2R_B = startTP2R.clone().subtractY(arrow)
        }
        if (startTP1R.x === startTP2R.x && startTP1R.y < startTP2R.y && this.isClock === false) {
          normal = new Types.Vector3({ x: 1, y: 0 })
  
          let wall = null
          let stairP = null
          for(let value of D2Config.WIDGETS.values()) {
            if (value.getWidgetType() === COMP_TYPES.WALL) {
              if (tool.isVec2Equal(value.normal, normal)) {
                wall = value
              }
            }
            if (value.getWidgetType() === COMP_TYPES.STAIR) {
              stairP = d2_tool.translateCoord(value.position)
            }
          }
          console.log(stairP)
          console.log(wall.outP1)
          console.log(wall.p1)
          let wallOutP1 = new Victor(wall.outP1.x - stairP.x, 0)
          // console.log(wallOutP1)
  
          newStartP1 = new Victor(wallOutP1.x * 10, startTP1R.y)
          newStartP2 = new Victor(wallOutP1.x * 10, startTP2R.y)
          newStartP1 = newStartP1.addX(offSet)
          newStartP2 = newStartP2.addX(offSet)
  
          newStartP1T = newStartP1.clone().subtractX(arrow)
          newStartP1B = newStartP1.clone().addX(arrow)
          newStartP2T = newStartP2.clone().subtractX(arrow)
          newStartP2B = newStartP2.clone().addX(arrow)

          startTP2L_T = startTP2L.clone().addY(arrow)
          startTP2L_B = startTP2L.clone().subtractY(arrow)
          startTP2R_T = startTP2R.clone().addY(arrow)
          startTP2R_B = startTP2R.clone().subtractY(arrow)
        }

  
        // 文字中心位置计算
        const position = {
          x: (newStartP1T.x + newStartP2T.x) / 2 / 10,
          y: (newStartP1T.y + newStartP2T.y) / 2 / 10
        }
        const position1 = {
          x: (startTP2L.x + startTP2R.x) / 2 / 10,
          y: (startTP2L.y + startTP2R.y) / 2 / 10
        }
  
        // 旋转计算
        let newStartTextRotation = ''
        const startTextRotation = new Victor(newStartP1.x - newStartP2.x, newStartP1.y - newStartP2.y)
        const startTextAngle = startTextRotation.angle()
        if (startTextAngle == Math.PI || startTextAngle == 0) {
          newStartTextRotation = 0
        } else if (startTextAngle > Math.PI) {
          newStartTextRotation = startTextRotation.invert().angle()
        } else if (startTextAngle < Math.PI) {
          newStartTextRotation = startTextRotation.angle()
        }
  
        const startTreadLine = new PIXI.Graphics()

        startTreadLine
        .lineStyle(1,0x000000)
        .moveTo(newStartP1.x / 10, newStartP1.y / 10)
        .lineTo(newStartP2.x / 10, newStartP2.y / 10)

        .moveTo(startTP2L.x / 10, startTP2L.y / 10 + 10)
        .lineTo(startTP2R.x / 10, startTP2R.y / 10 + 10)
        
  
        .moveTo(startTP2L_T.x / 10, startTP2L_T.y / 10 + 10)
        .lineTo(startTP2L_B.x / 10, startTP2L_B.y / 10 + 10)
        .moveTo(startTP2R_T.x / 10, startTP2R_T.y / 10 + 10)
        .lineTo(startTP2R_B.x / 10, startTP2R_B.y / 10 + 10)
  
        .moveTo(newStartP1T.x / 10, newStartP1T.y / 10)
        .lineTo(newStartP1B.x / 10, newStartP1B.y / 10)
        .moveTo(newStartP2T.x / 10, newStartP2T.y / 10)
        .lineTo(newStartP2B.x / 10, newStartP2B.y / 10)
  
        const startTreadLineNum = new PIXI.Text(startTreadLinelength, {
          fontSize: 32,
          fill: 0x000000,
        })
  
        startTreadLineNum.scale.set(0.25)
        startTreadLineNum.position.set(position.x, position.y)
        startTreadLineNum.anchor.set(0.5, 0.5)
        startTreadLineNum.rotation = newStartTextRotation
  

        const startTreadLineNum1 = new PIXI.Text(startTreadLinelength1, {
          fontSize: 32,
          fill: 0x000000,
        })
  
        startTreadLineNum1.scale.set(0.25)
        startTreadLineNum1.position.set(position1.x, position1.y + 5)
        startTreadLineNum1.anchor.set(0.5, 0.5)
        startTreadLineNum1.rotation = 0
  
        treadLineContainer.addChild(startTreadLine,startTreadLineNum, startTreadLineNum1)
      }
    }
    


    this.sprite.addChild(treadLineContainer)
  }
}
