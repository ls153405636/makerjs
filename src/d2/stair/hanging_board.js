import Victor from 'victor'
import { Command } from '../../common/command'
import { COMP_TYPES } from '../../common/common_config'
import { Core } from '../../common/core'
import tool from '../../structure/tool'
import { Types } from '../../types/stair_v2'
import { Edge } from '../../utils/edge'
import { D2Config, Z_INDEX } from '../config'
import d2_tool from '../d2_tool'
import { ChildWidget } from './child_widget'

export class HangingBoard extends ChildWidget {
  /**
   *
   * @param {Types.HangingBoard} vPB
   */
  constructor(vPB) {
    super(vPB.uuid)
    this.width = d2_tool.translateValue(vPB.width)
    this.depth = d2_tool.translateValue(vPB.depth)
    this.sprite = new PIXI.Container()
    this.widthVec = vPB.widthVec
    this.depthVec = vPB.depthVec
    this.position = d2_tool.translateCoord(vPB.position)
    this.p1 = new THREE.Vector2(this.position.x, this.position.y)
    this.p2 = this.p1.clone().addScaledVector(this.widthVec, this.width)
    this.p3 = this.p2.clone().addScaledVector(this.depthVec, this.depth)
    this.p4 = this.p1.clone().addScaledVector(this.depthVec, this.depth)
    this.addEvent()
    this.draw()
    this.addDimension()
  }
  
  draw() {
    const hangingBoardContainer = new PIXI.Container()

    const changeHangingBoard = new PIXI.Graphics()
    changeHangingBoard.visible = false
    changeHangingBoard.lineStyle(1, 0x4478f4)
    changeHangingBoard.beginFill(0xe9efff)
    changeHangingBoard.drawPolygon(this.p1, this.p2, this.p3, this.p4)

    const hangingBoard = new PIXI.Graphics()
    hangingBoard.lineStyle(1, 0x000000,1,0.5,true)
    hangingBoard.beginFill(0xffffff)
    hangingBoard.drawPolygon(this.p1, this.p2, this.p3, this.p4)

    hangingBoardContainer.addChild(changeHangingBoard, hangingBoard)
    hangingBoardContainer.zIndex = Z_INDEX.HANGING_BOARD_ZINDEX
    this.sprite.addChild(hangingBoardContainer)
  }

  getSprite() {
    return this.sprite
  }

  // 取消 hangingBoard 选中效果
  cancelSelected() {
    this.sprite.children[0].children[0].visible = false
    this.sprite.children[0].children[1].visible = true
    this.isSelected = false
  }
  //  hangingBoard 选中效果
  setSelected() {
    this.sprite.children[0].children[0].visible = true
    this.sprite.children[0].children[1].visible = false
    this.isSelected = true
  }
  // 鼠标进入 hangingBoard 效果
  setHover() {
    if (!this.isSelected) {
      this.sprite.children[0].children[0].visible = true
      this.sprite.children[0].children[1].visible = false
    }
  }
  // 鼠标离开 hangingBoard 效果
  cancelHover() {
    if (!this.isSelected) {
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
        core.execute(
          new Command(core.cmds.SelecteCmd, {
            uuid: this.uuid,
            type: COMP_TYPES.HANGING_BOARD,
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

  addDimension() {
    const handBLineContainer = new PIXI.Container()
    const offSet = new Victor(30,30)
    let wall
    let stairP
    let stairType
    let isTrue
    let normal
    let newLine
    let offDepth
    let textPosition
    let pT
    let pB
    let handBReac = tool.createRectOutline(this.p1, this.width, this.depth, this.widthVec, this.depthVec)
    let thirdEdge = handBReac.edges[3]
    for(let value of D2Config.WIDGETS.values()) {
      if (value.getWidgetType() === COMP_TYPES.STAIR) {
        stairP = d2_tool.translateCoord(value.position)
        stairType = value.againstWallType
      }
    }
    if (stairType === 3) {
      isTrue = false
    }else {
      isTrue = true
    }
    if (this.p1.x < this.p2.x) {
      normal = new Types.Vector3({ x: -1, y: 0 })
      for(let value of D2Config.WIDGETS.values()) {
        if (value.getWidgetType() === COMP_TYPES.WALL) {
          if (tool.isVec2Equal(value.normal, normal)) {
            wall = value
          }
        }
      }
      let wallOutP1 = new Victor( stairP.x - wall.outP1.x, stairP.y - wall.outP1.x)
      thirdEdge = new Edge(thirdEdge).offset(Math.abs(wallOutP1.x) + offSet.x, isTrue)
      pT = new Edge(thirdEdge).offset(5, true)
      pB = new Edge(thirdEdge).offset(5, false)
      textPosition = new Edge(thirdEdge).offset(5, isTrue)
      textPosition = new Edge(textPosition).extendP2(5)
      console.log(thirdEdge)
    }
    if (this.p1.x > this.p2.x) {
      normal = new Types.Vector3({ x: 1, y: 0 })
      for(let value of D2Config.WIDGETS.values()) {
        if (value.getWidgetType() === COMP_TYPES.WALL) {
          if (tool.isVec2Equal(value.normal, normal)) {
            wall = value
          }
        }
      }
      let wallOutP1 = new Victor(wall.outP1.x - stairP.x - this.p1.x, wall.outP1.y - stairP.y - this.p1.y)
      thirdEdge = new Edge(thirdEdge).offset(Math.abs(wallOutP1.x) + offSet.x, isTrue)
      pT = new Edge(thirdEdge).offset(5, true)
      pB = new Edge(thirdEdge).offset(5, false)
      textPosition = new Edge(thirdEdge).offset(5, isTrue)
      textPosition = new Edge(textPosition).extendP2(5)
    }
    if (this.p1.y < this.p2.y) {
      normal = new Types.Vector3({ x: 0, y: -1 })
      for(let value of D2Config.WIDGETS.values()) {
        if (value.getWidgetType() === COMP_TYPES.WALL) {
          if (tool.isVec2Equal(value.normal, normal)) {
            wall = value
          }
        }
      }
      let wallOutP1 = new Victor(wall.outP1.x - stairP.x - this.p1.x, wall.outP1.y - stairP.y - this.p1.y)
      thirdEdge = new Edge(thirdEdge).offset(Math.abs(wallOutP1.y) + offSet.x, isTrue)
      pT = new Edge(thirdEdge).offset(5, true)
      pB = new Edge(thirdEdge).offset(5, false)
      textPosition = new Edge(thirdEdge).offset(5, isTrue)
      textPosition = new Edge(textPosition).extendP2(5)
    }
    if (this.p1.y > this.p2.y) {
      normal = new Types.Vector3({ x: -0, y: 1 })
      for(let value of D2Config.WIDGETS.values()) {
        if (value.getWidgetType() === COMP_TYPES.WALL) {
          if (tool.isVec2Equal(value.normal, normal)) {
            wall = value
          }
        }
      }
      let wallOutP1 = new Victor(wall.outP1.x - stairP.x - this.p1.x, wall.outP1.y - stairP.y - this.p1.y)
      thirdEdge = new Edge(thirdEdge).offset(Math.abs(wallOutP1.y) + offSet.x, isTrue)
      pT = new Edge(thirdEdge).offset(5, true)
      pB = new Edge(thirdEdge).offset(5, false)
      textPosition = new Edge(thirdEdge).offset(5, isTrue)
      textPosition = new Edge(textPosition).extendP2(5)
    }


     // 旋转计算
     let newTextRotation = ''
     const textRotation = new Victor(thirdEdge.p1.x - thirdEdge.p2.x, thirdEdge.p1.y - thirdEdge.p2.y)
     const textAngle = textRotation.angle()
     if (textAngle == Math.PI || textAngle == 0 || textAngle == -Math.PI) {
       newTextRotation = 0
     } else if (0 < textAngle < Math.PI) {
       newTextRotation = textRotation.invert().angle()
     } else if (0 > textAngle > -Math.PI) {
       newTextRotation = textRotation.angle()
     }

    const handBText = new PIXI.Text(this.depth * 10,  {
      fontSize: 32,
      fill: 0x000000,
    })

    handBText.scale.set(0.25)
    handBText.position.set(textPosition.p2.x,textPosition.p2.y)
    handBText.anchor.set(0.5, 0.5)
    if (stairType === 3) {
      handBText.rotation = -newTextRotation
    }else {
      handBText.rotation = newTextRotation
    }

    const handBLine = new PIXI.Graphics()
    handBLine.lineStyle(1, 0x000000,1,0.5,true)
    handBLine.moveTo(thirdEdge.p1.x, thirdEdge.p1.y)
    handBLine.lineTo(thirdEdge.p2.x, thirdEdge.p2.y)

    handBLine.moveTo(pT.p2.x, pT.p2.y)
    handBLine.lineTo(pB.p2.x, pB.p2.y)

    handBLineContainer.addChild(handBLine, handBText)
    this.sprite.addChild(handBLineContainer)


  }
}
