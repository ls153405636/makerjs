import Victor from 'victor'
import { Command } from '../../common/command'
import { COMP_TYPES } from '../../common/common_config'
import { Core } from '../../common/core'
import { Default, StructConfig } from '../../structure/config'
import tool from '../../structure/tool'
import { Types } from '../../types/stair_v2'
import { Edge } from '../../utils/edge'
import { Outline } from '../../utils/outline'
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
    this.outIndex = vPB.border.outIndex
    this.frontIndex = vPB.border.frontIndex
    this.backIndex = vPB.border.backIndex
    this.index = vPB.index
    this.type = vPB.type
    this.stairInfo = StructConfig.INFOS.get(this.uuid)
    this.stepWidth = vPB.stepWidth
    this.stepLength = vPB.stepLength
    this.sprite = new PIXI.Container()
    this.isLast = vPB.isLast
    this.parent = vParent
    this.depth = Default.WALL_DEPTH
    this.draw()
    let stairId
    for(let value of D2Config.WIDGETS.values()) {
      if (value.getWidgetType() === COMP_TYPES.STAIR) {
        stairId = value.uuid
      }
    }
    let stairInfo = StructConfig.INFOS.get(stairId)
    this.stepNumRule = stairInfo.stepNumRule
    this.girderDepth = this.stairInfo.parent.parent.girderParameters.depth
    this.girderType = this.stairInfo.parent.parent.girderParameters.type
    this.stepNum = stairInfo.stepNum
    if (stairInfo.type !== Types.StairType.s_arc_type) {
      this.addDimension()
    }
    if (stairInfo.type === Types.StairType.s_arc_type) {
      this.ArcStairDemension()
    }
    this.addEvent()
  }

  creatTextRotaitionP(vName, vEdge) {
    let newTextRotation = ''
    let textRotation = new Victor(vEdge.p1.x - vEdge.p2.x, vEdge.p1.y - vEdge.p2.y)
    const textAngle = textRotation.angle()
    if (this.isClock === true) {
      if (textAngle == Math.PI || textAngle == 0 || textAngle == -Math.PI) {
        newTextRotation = 0
      } else if (0 < textAngle < Math.PI) {
        newTextRotation = textRotation.invert().angle()
      } else if (0 > textAngle > -Math.PI) {
        newTextRotation = textRotation.angle()
      }
    } else {
      if (textAngle == Math.PI || textAngle == 0 || textAngle == -Math.PI) {
        newTextRotation = 0
      } else if (0 < textAngle < Math.PI) {
        newTextRotation = textRotation.angle()
      } else if (0 > textAngle > -Math.PI) {
        newTextRotation = textRotation.invert().angle()
      }
    }
    vName.rotation = newTextRotation
  }
  creatTextRotaitionR(vName,vEdge) {
    let newTextRotation = ''
    let textRotation = new Victor(vEdge.p2.x - vEdge.p1.x, vEdge.p2.y - vEdge.p1.y)
    const textAngle = textRotation.angle()
    if (this.isClock === true) {
      if (textAngle == Math.PI || textAngle == 0 || textAngle == -Math.PI) {
        newTextRotation = 0
      } else if (0 < textAngle < Math.PI) {
        newTextRotation = textRotation.invert().angle()
      } else if (0 > textAngle > -Math.PI) {
        newTextRotation = textRotation.angle()
      }
    } else {
      if (textAngle == Math.PI || textAngle == 0 || textAngle == -Math.PI) {
        newTextRotation = 0
      } else if (0 < textAngle < Math.PI) {
        newTextRotation = textRotation.angle()
      } else if (0 > textAngle > -Math.PI) {
        newTextRotation = textRotation.invert().angle()
      }
    }
    vName.rotation = newTextRotation
  }
  creatText(vName, vEdge) {
    vName.scale.set(0.25)
    vName.position.set((vEdge.p1.x + vEdge.p2.x) / 2, (vEdge.p1.y + vEdge.p2.y) / 2)
    vName.anchor.set(0.5, 0.5)
  }

  draw() {
    // ??????????????????
    let positionX = 0
    let positionY = 0
    for (let i = 0; i < this.edges.length; i++) {
      let f = this.edges[i]
      positionX += f.p1.x
      positionY += f.p1.y
    }
    positionX = positionX / this.edges.length
    positionY = positionY / this.edges.length

    // ?????????????????????????????????
    if (this.type === Types.TreadType.tStart && this.stairInfo.parent.treads.length === 2 && this.index === 1) {
      if (this.stairInfo.parent.modelType === Types.StartTreadType.st_el_2) {
        positionY += this.stairInfo.parent.offset2 + this.stepWidth / 4
      }else {
        positionY += this.stepWidth / 4
      }
    }

    this.sprite = new PIXI.Container()
    const treadContainer = new PIXI.Container()


    let changeTread = new PIXI.Graphics()
    if (this.isLast === true) {

      changeTread.visible = false
    } else{

      changeTread.visible = true
      changeTread.lineStyle(1, 0x4478f4, 1, 0.5, true)
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

    // ????????????
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

    // ????????????
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
   * @returns ??????????????????????????????
   */

  /**
   * ?????????????????????????????????????????????????????????
   * ??????????????????????????????
   */

  // ????????????????????????
  cancelSelected() {
    this.sprite.zIndex = 0
    this.sprite.children[0].children[0].visible = false
    this.sprite.children[0].children[1].visible = true
    this.isSelected = false
  }

  // ??????????????????
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

  // ????????????????????????
  setHover() {
    if (this.index === 1) {
      this.sprite.zIndex = 0
    }else {
      this.sprite.zIndex = Z_INDEX.TREAD_ZINDEX
    }
    this.sprite.children[0].children[0].visible = true
    this.sprite.children[0].children[1].visible = false
  }
  // ????????????????????????
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
          /**?????????????????????????????????????????????????????????????????????????????????????????????????????????????????? */
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
          _this.parent.cancelHover()
        } else {
          _this.parent.cancelHover()
        }
      })
      .on('mouseover', () => {
        if (D2Config.IS_SINGLE_SELECTED) {
          _this.cancelHover()
          _this.parent.cancelHover()
          _this.setHover()
        } else {
          _this.parent.setHover()
        }
      })
  }
  addDimension() {
    const againstWallType = this.stairInfo.parent.parent.againstWallType
    const lastEdgeIndex = this.stairInfo.lastEdgeIndex
    const nextEdgeIndex = this.stairInfo.nextEdgeIndex
    
    
    // ?????????????????????
    const treadLineContainer = new PIXI.Container()
    const treadLine = new PIXI.Graphics()
    const arrow = new Victor(50,50) //????????????????????????
    const stepLengthV = new Victor(this.stepLength / 2,this.stepLength / 2) //????????????????????????

    // ????????????
    const textStyle =  {
      fontSize: 32,
      fill: 0x000000,
    }
    
    let p1
    let p2
    
    let newP1
    let newP2
    
    let newP1T
    let newP1B
    let newP2T
    let newP2B
    let normal // ??????


    // ?????????????????????
    let lNewP1
    let lNewP2
    let lNewP1T
    let lNewP1B
    let lNewP2T
    let lNewP2B
    
    let nNewP1
    let nNewP2
    let nNewP1T
    let nNewP1B
    let nNewP2T
    let nNewP2B
    let lPosition
    let nPosition
    let lNewTextRotation = ''
    let nNewTextRotation = ''

    let lTreadLineLength
    let nTreadLineLength
    let treadLinelength

    let sideEdgeL = this.stairInfo.parent.sideEdgeL
    let sideEdgeLT
    let sideEdgeLB
    let sideEdgeN = this.stairInfo.parent.sideEdgeN
    let sideEdgeNT
    let sideEdgeNB
    let lNormal
    let nNormal
    const offSet = new Victor(300,300) //????????????????????????Y
    let fOffSet
    if (this.index === this.stairInfo.parent.parent.stepNum - 1) {
      fOffSet = new Victor(540,540) //????????????????????????Y
    }else {
      fOffSet = new Victor(180,180) //????????????????????????Y
    }
    
    let wall
    let lWall
    let nWall
    let stairP
    let lastEdge
    let nextEdge
    // ??????????????????
    let position 

    // ??????????????????
    for(let value of D2Config.WIDGETS.values()) {
      if (value.getWidgetType() === COMP_TYPES.STAIR) {
        stairP = d2_tool.translateCoord(value.position)
      }
    }
    
    // ????????????
    if (this.type === Types.TreadType.tCor) {
      if (this.girderType === Types.GirderType.gsaw) {
        for (let i = 0; i < this.inIndex.length; i++) {
          p1 = new Victor(this.edges[this.inIndex[i]].p1.x, this.edges[this.inIndex[i]].p1.y)
          p2 = new Victor(this.edges[this.inIndex[i]].p2.x, this.edges[this.inIndex[i]].p2.y)
          // ???-???
          if (p1.x === p2.x && p1.y > p2.y && this.isClock === true) {
            normal = new Types.Vector3({ x: -1, y: -0 })
            for(let value of D2Config.WIDGETS.values()) {
              if (value.getWidgetType() === COMP_TYPES.WALL) {
                if (tool.isVec2Equal(value.normal, normal)) {
                  wall = value
                }
              }
            }
            let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)
    
            // ??????
            newP1 = new Victor(wallOutP1.x * 10, p1.y)
            newP2 = new Victor(wallOutP1.x * 10, p2.y)
            
            newP1 = newP1.subtractX(offSet)
            newP2 = newP2.subtractX(offSet)
            newP1T = newP1.clone().subtractX(arrow)
            newP1B = newP1.clone().addX(arrow)
            newP2T = newP2.clone().subtractX(arrow)
            newP2B = newP2.clone().addX(arrow)
    
            // ????????????????????????
            position = {
              x: (newP1T.x + newP2T.x) / 2 / 10,
              y: (newP1T.y + newP2T.y) / 2 / 10
            }
          }
          // ???-???
          if (p1.x < p2.x && p1.y === p2.y && this.isClock === true) {
            normal = new Types.Vector3({ x: 0, y: -1 })
            for(let value of D2Config.WIDGETS.values()) {
              if (value.getWidgetType() === COMP_TYPES.WALL) {
                if (tool.isVec2Equal(value.normal, normal)) {
                  wall = value
                }
              }
            }
            let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)
    
            newP1 = new Victor(p1.x, wallOutP1.y * 10)
            newP2 = new Victor(p2.x, wallOutP1.y * 10)
    
            newP1 = newP1.subtractY(offSet)
            newP2 = newP2.subtractY(offSet)
            newP1T = newP1.clone().subtractY(arrow)
            newP1B = newP1.clone().addY(arrow)
            newP2T = newP2.clone().subtractY(arrow)
            newP2B = newP2.clone().addY(arrow)
    
            // ????????????????????????
            position = {
              x: (newP1T.x + newP2T.x) / 2 / 10,
              y: (newP1T.y + newP2T.y) / 2 / 10
            }
          }
          // ???-???
          if (p1.x === p2.x && p1.y < p2.y  && this.isClock === true) {
            normal = new Types.Vector3({ x: 1, y: 0 })
            for(let value of D2Config.WIDGETS.values()) {
              if (value.getWidgetType() === COMP_TYPES.WALL) {
                if (tool.isVec2Equal(value.normal, normal)) {
                  wall = value
                }
              }
            }
            let wallOutP1 = new Victor(wall.outP1.x - stairP.x,stairP.y - wall.p1.y)
            
            // ??????
            newP1 = new Victor(wallOutP1.x * 10, p1.y)
            newP2 = new Victor(wallOutP1.x * 10, p2.y)
    
            // ??????
            newP1 = newP1.addX(offSet)
            newP2 = newP2.addX(offSet)
            newP1T = newP1.clone().subtractX(arrow)
            newP1B = newP1.clone().addX(arrow)
            newP2T = newP2.clone().subtractX(arrow)
            newP2B = newP2.clone().addX(arrow)
    
            // ????????????????????????
            position = {
              x: (newP1B.x + newP2B.x) / 2 / 10,
              y: (newP1B.y + newP2B.y) / 2 / 10
            }
          }
          // ???-???
          if (p1.x > p2.x && p1.y === p2.y && this.isClock === true) {// ???
            normal = new Types.Vector3({ x: -0, y: -1 })
            // for(let value of D2Config.WIDGETS.values()) {
            //   if (value.getWidgetType() === COMP_TYPES.WALL) {
            //     if (tool.isVec2Equal(value.normal, normal)) {
            //       wall = value
            //     }
            //   }
            // }
            // let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)
            // newP1 = new Victor(p1.x, wallOutP1.y * 10)
            // newP2 = new Victor(p2.x, wallOutP1.y * 10)
    
            // ??????
            newP1 = p1.clone().addY(offSet)
            newP2 = p2.clone().addY(offSet)
            newP1T = p1.clone().addY(offSet).subtractY(arrow)
            newP1B = p1.clone().addY(offSet).addY(arrow)
            newP2T = p2.clone().addY(offSet).subtractY(arrow)
            newP2B = p2.clone().addY(offSet).addY(arrow)
    
          }
          // ???-???
          if (p1.x === p2.x && p1.y > p2.y && this.isClock === false) {
            normal = new Types.Vector3({ x: 1, y: 0 })
            for(let value of D2Config.WIDGETS.values()) {
              if (value.getWidgetType() === COMP_TYPES.WALL) {
                if (tool.isVec2Equal(value.normal, normal)) {
                  wall = value
                }
              }
            }
            let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)
            
            // ??????
            newP1 = new Victor(wallOutP1.x * 10, p1.y)
            newP2 = new Victor(wallOutP1.x * 10, p2.y)
            
            newP1 = newP1.addX(offSet)
            newP2 = newP2.addX(offSet)
            newP1T = newP1.clone().subtractX(arrow)
            newP1B = newP1.clone().addX(arrow)
            newP2T = newP2.clone().subtractX(arrow)
            newP2B = newP2.clone().addX(arrow)
    
            // ????????????????????????
            position = {
              x: (newP1B.x + newP2B.x) / 2 / 10,
              y: (newP1B.y + newP2B.y) / 2 / 10
            }
          }
          // ???-???
          if (p1.x > p2.x && p1.y === p2.y && this.isClock === false) {
            normal = new Types.Vector3({ x: 0, y: -1 })
            for(let value of D2Config.WIDGETS.values()) {
              if (value.getWidgetType() === COMP_TYPES.WALL) {
                if (tool.isVec2Equal(value.normal, normal)) {
                  wall = value
                }
              }
            }
            let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)
            
            // ??????
            newP1 = new Victor(p1.x, wallOutP1.y * 10)
            newP2 = new Victor(p2.x, wallOutP1.y * 10)
            
            // ??????
            newP1 = newP1.subtractY(offSet)
            newP2 = newP2.subtractY(offSet)
            newP1T = newP1.clone().subtractY(arrow)
            newP1B = newP1.clone().addY(arrow)
            newP2T = newP2.clone().subtractY(arrow)
            newP2B = newP2.clone().addY(arrow)
    
    
            // ????????????????????????
            position = {
              x: (newP1T.x + newP2T.x) / 2 / 10,
              y: (newP1T.y + newP2T.y) / 2 / 10
            }
          }
          // ???-???
          if (p1.x === p2.x && p1.y < p2.y  && this.isClock === false) {
            normal = new Types.Vector3({ x: -1, y: -0 })
            for(let value of D2Config.WIDGETS.values()) {
              if (value.getWidgetType() === COMP_TYPES.WALL) {
                if (tool.isVec2Equal(value.normal, normal)) {
                  wall = value
                }
              }
            }
            let wallOutP1 = new Victor( wall.outP1.x - stairP.x,0)
            
            // ??????
            newP1 = new Victor(wallOutP1.x * 10, p1.y)
            newP2 = new Victor(wallOutP1.x * 10, p2.y)
    
            // ??????
            newP1 = newP1.subtractX(offSet)
            newP2 = newP2.subtractX(offSet)
            newP1T = newP1.clone().subtractX(arrow)
            newP1B = newP1.clone().addX(arrow)
            newP2T = newP2.clone().subtractX(arrow)
            newP2B = newP2.clone().addX(arrow)
    
    
            // ????????????????????????
            position = {
              x: (newP1T.x + newP2T.x) / 2 / 10,
              y: (newP1T.y + newP2T.y) / 2 / 10
            }
          }
          // ???-???
          if (p1.x < p2.x && p1.y === p2.y && this.isClock === false) {// ???
            normal = new Types.Vector3({ x: -0, y: -1 })
            // for(let value of D2Config.WIDGETS.values()) {
            //   if (value.getWidgetType() === COMP_TYPES.WALL) {
            //     if (tool.isVec2Equal(value.normal, normal)) {
            //       wall = value
            //     }
            //   }
            // }
            // let wallOutP1 = new Victor(wall.outP1.x - wall.p1.x, wall.outP1.y - wall.p1.y)
            
            // newP1 = new Victor(p1.x, wallOutP1.y * 10)
            // newP2 = new Victor(p2.x, wallOutP1.y * 10)
    
            newP1 = p1.clone().addY(offSet)
            newP2 = p2.clone().addY(offSet)
            newP1T = p1.clone().addY(offSet).subtractY(arrow)
            newP1B = p1.clone().addY(offSet).addY(arrow)
            newP2T = p2.clone().addY(offSet).subtractY(arrow)
            newP2B = p2.clone().addY(offSet).addY(arrow)
          }
    
          // ????????????
          treadLinelength =
          Math.round(Math.hypot(p1.x - p2.x, p1.y - p2.y) )
          
    
          const treadLineNum = new PIXI.Text(treadLinelength, textStyle)
          if (this.isLast) {
            treadLineNum.visible = false
          }
          // ????????????
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
            .lineStyle(1,0x000000, 1, 0.5, true)
            .moveTo(newP1.x / 10,newP1.y / 10)
            .lineTo(newP2.x / 10,newP2.y / 10)
            .moveTo(newP1T.x / 10,newP1T.y / 10)
            .lineTo(newP1B.x / 10,newP1B.y / 10)
            .moveTo(newP2T.x / 10,newP2T.y / 10)
            .lineTo(newP2B.x / 10,newP2B.y / 10)
          }
          treadLineContainer.addChild(treadLine, treadLineNum)
        }
      }
      else {
        lastEdge = new Edge(this.edges[lastEdgeIndex]).offset(this.girderDepth,true)
        nextEdge = new Edge(this.edges[nextEdgeIndex]).offset(this.girderDepth,true)
        if (againstWallType === Types.AgainstWallType.aw_no || againstWallType === Types.AgainstWallType.aw_left) {
          lastEdge = new Edge(lastEdge).extendP2(this.girderDepth)
          nextEdge = new Edge(nextEdge).extendP1(this.girderDepth)

          if (lastEdge.p1.x === lastEdge.p2.x && lastEdge.p1.y > lastEdge.p2.y) {
            normal = new Types.Vector3({ x: -1, y: 0 })
            for(let value of D2Config.WIDGETS.values()) {
              if (value.getWidgetType() === COMP_TYPES.WALL) {
                if (tool.isVec2Equal(value.normal, normal)) {
                  wall = value
                }
              }
            }
            let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)
            lNewP1 = new Victor(wallOutP1.x * 10, lastEdge.p1.y)
            lNewP2 = new Victor(wallOutP1.x * 10, lastEdge.p2.y)
  
            lNewP1 = lNewP1.subtractX(offSet)
            lNewP2 = lNewP2.subtractX(offSet)
  
            lNewP1T = lNewP1.clone().addX(arrow)
            lNewP1B = lNewP1.clone().subtractX(arrow)
            lNewP2T = lNewP2.clone().addX(arrow)
            lNewP2B = lNewP2.clone().subtractX(arrow)

            // ????????????????????????
            lPosition = {
              x: (lNewP1B.x + lNewP2B.x) / 2 / 10,
              y: (lNewP1B.y + lNewP2B.y) / 2 / 10
            }
  
          }
          if (nextEdge.p1.x === nextEdge.p2.x && nextEdge.p1.y < nextEdge.p2.y) {
            normal = new Types.Vector3({ x: 1, y: 0 })
            for(let value of D2Config.WIDGETS.values()) {
              if (value.getWidgetType() === COMP_TYPES.WALL) {
                if (tool.isVec2Equal(value.normal, normal)) {
                  wall = value
                }
              }
            }
            let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)
            nNewP1 = new Victor(wallOutP1.x * 10, nextEdge.p1.y)
            nNewP2 = new Victor(wallOutP1.x * 10, nextEdge.p2.y)
  
            nNewP1 = nNewP1.addX(offSet)
            nNewP2 = nNewP2.addX(offSet)
  
            nNewP1T = nNewP1.clone().addX(arrow)
            nNewP1B = nNewP1.clone().subtractX(arrow)
            nNewP2T = nNewP2.clone().addX(arrow)
            nNewP2B = nNewP2.clone().subtractX(arrow)

            // ????????????????????????
            nPosition = {
              x: (nNewP1T.x + nNewP2T.x) / 2 / 10,
              y: (nNewP1T.y + nNewP2T.y) / 2 / 10
            }
          }
          if (lastEdge.p1.x < lastEdge.p2.x && lastEdge.p1.y === lastEdge.p2.y) {
            normal = new Types.Vector3({ x: 0, y: -1 })
            for(let value of D2Config.WIDGETS.values()) {
              if (value.getWidgetType() === COMP_TYPES.WALL) {
                if (tool.isVec2Equal(value.normal, normal)) {
                  wall = value
                }
              }
            }
            let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)
            lNewP1 = new Victor(lastEdge.p1.x, wallOutP1.y * 10)
            lNewP2 = new Victor(lastEdge.p2.x, wallOutP1.y * 10)
  
            lNewP1 = lNewP1.subtractY(offSet)
            lNewP2 = lNewP2.subtractY(offSet)
  
            lNewP1T = lNewP1.clone().addY(arrow)
            lNewP1B = lNewP1.clone().subtractY(arrow)
            lNewP2T = lNewP2.clone().addY(arrow)
            lNewP2B = lNewP2.clone().subtractY(arrow)

            // ????????????????????????
            lPosition = {
              x: (lNewP1B.x + lNewP2B.x) / 2 / 10,
              y: (lNewP1B.y + lNewP2B.y) / 2 / 10
            }
  
          }
          if (nextEdge.p1.x < nextEdge.p2.x && nextEdge.p1.y === nextEdge.p2.y) {
            normal = new Types.Vector3({ x: 0, y: -1 })
            for(let value of D2Config.WIDGETS.values()) {
              if (value.getWidgetType() === COMP_TYPES.WALL) {
                if (tool.isVec2Equal(value.normal, normal)) {
                  wall = value
                }
              }
            }
            let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)
            nNewP1 = new Victor(nextEdge.p1.x, wallOutP1.y * 10)
            nNewP2 = new Victor(nextEdge.p2.x, wallOutP1.y * 10)
  
            nNewP1 = nNewP1.subtractY(offSet)
            nNewP2 = nNewP2.subtractY(offSet)
  
            nNewP1T = nNewP1.clone().addY(arrow)
            nNewP1B = nNewP1.clone().subtractY(arrow)
            nNewP2T = nNewP2.clone().addY(arrow)
            nNewP2B = nNewP2.clone().subtractY(arrow)

            // ????????????????????????
            nPosition = {
              x: (nNewP1B.x + nNewP2B.x) / 2 / 10,
              y: (nNewP1B.y + nNewP2B.y) / 2 / 10
            }
  
          }
          
        }
        else if (againstWallType === 3) {
          lastEdge = new Edge(lastEdge).extendP1(this.girderDepth)
          nextEdge = new Edge(nextEdge).extendP2(this.girderDepth)

          if (lastEdge.p1.x === lastEdge.p2.x && lastEdge.p1.y < lastEdge.p2.y) {
            normal = new Types.Vector3({ x: 1, y: 0 })
            for(let value of D2Config.WIDGETS.values()) {
              if (value.getWidgetType() === COMP_TYPES.WALL) {
                if (tool.isVec2Equal(value.normal, normal)) {
                  wall = value
                }
              }
            }
            let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)
            lNewP1 = new Victor(wallOutP1.x * 10, lastEdge.p1.y)
            lNewP2 = new Victor(wallOutP1.x * 10, lastEdge.p2.y)
  
            lNewP1 = lNewP1.addX(offSet)
            lNewP2 = lNewP2.addX(offSet)
  
            lNewP1T = lNewP1.clone().addX(arrow)
            lNewP1B = lNewP1.clone().subtractX(arrow)
            lNewP2T = lNewP2.clone().addX(arrow)
            lNewP2B = lNewP2.clone().subtractX(arrow)

            // ????????????????????????
            lPosition = {
              x: (lNewP1T.x + lNewP2T.x) / 2 / 10,
              y: (lNewP1T.y + lNewP2T.y) / 2 / 10
            }
  
          }
          if (nextEdge.p1.x === nextEdge.p2.x && nextEdge.p1.y > nextEdge.p2.y) {
            normal = new Types.Vector3({ x: -1, y: 0 })
            for(let value of D2Config.WIDGETS.values()) {
              if (value.getWidgetType() === COMP_TYPES.WALL) {
                if (tool.isVec2Equal(value.normal, normal)) {
                  wall = value
                }
              }
            }
            let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)
            nNewP1 = new Victor(wallOutP1.x * 10, nextEdge.p1.y)
            nNewP2 = new Victor(wallOutP1.x * 10, nextEdge.p2.y)
  
            nNewP1 = nNewP1.subtractX(offSet)
            nNewP2 = nNewP2.subtractX(offSet)
  
            nNewP1T = nNewP1.clone().addX(arrow)
            nNewP1B = nNewP1.clone().subtractX(arrow)
            nNewP2T = nNewP2.clone().addX(arrow)
            nNewP2B = nNewP2.clone().subtractX(arrow)

            // ????????????????????????
            nPosition = {
              x: (nNewP1B.x + nNewP2B.x) / 2 / 10,
              y: (nNewP1B.y + nNewP2B.y) / 2 / 10
            }
          }
          if (lastEdge.p1.x < lastEdge.p2.x && lastEdge.p1.y === lastEdge.p2.y) {
            normal = new Types.Vector3({ x: 0, y: -1 })
            for(let value of D2Config.WIDGETS.values()) {
              if (value.getWidgetType() === COMP_TYPES.WALL) {
                if (tool.isVec2Equal(value.normal, normal)) {
                  wall = value
                }
              }
            }
            let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)
            lNewP1 = new Victor(lastEdge.p1.x, wallOutP1.y * 10)
            lNewP2 = new Victor(lastEdge.p2.x, wallOutP1.y * 10)
  
            lNewP1 = lNewP1.subtractY(offSet)
            lNewP2 = lNewP2.subtractY(offSet)
  
            lNewP1T = lNewP1.clone().addY(arrow)
            lNewP1B = lNewP1.clone().subtractY(arrow)
            lNewP2T = lNewP2.clone().addY(arrow)
            lNewP2B = lNewP2.clone().subtractY(arrow)

            // ????????????????????????
            lPosition = {
              x: (lNewP1B.x + lNewP2B.x) / 2 / 10,
              y: (lNewP1B.y + lNewP2B.y) / 2 / 10
            }
  
          }
          if (nextEdge.p1.x < nextEdge.p2.x && nextEdge.p1.y === nextEdge.p2.y) {
            normal = new Types.Vector3({ x: 0, y: -1 })
            for(let value of D2Config.WIDGETS.values()) {
              if (value.getWidgetType() === COMP_TYPES.WALL) {
                if (tool.isVec2Equal(value.normal, normal)) {
                  wall = value
                }
              }
            }
            let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)
            nNewP1 = new Victor(nextEdge.p1.x, wallOutP1.y * 10)
            nNewP2 = new Victor(nextEdge.p2.x, wallOutP1.y * 10)
  
            nNewP1 = nNewP1.subtractY(offSet)
            nNewP2 = nNewP2.subtractY(offSet)
  
            nNewP1T = nNewP1.clone().addY(arrow)
            nNewP1B = nNewP1.clone().subtractY(arrow)
            nNewP2T = nNewP2.clone().addY(arrow)
            nNewP2B = nNewP2.clone().subtractY(arrow)

            // ????????????????????????
            nPosition = {
              x: (nNewP1B.x + nNewP2B.x) / 2 / 10,
              y: (nNewP1B.y + nNewP2B.y) / 2 / 10
            }
  
          }
        }

        // ????????????
        const lTextRotation = new Victor(lNewP1.x - lNewP2.x, lNewP1.y - lNewP2.y)
        const lTextAngle = lTextRotation.angle()
        if (lTextAngle == Math.PI || lTextAngle == 0 || lTextAngle == -Math.PI) {
          lNewTextRotation = 0
        } else if (0 < lTextAngle < Math.PI) {
          lNewTextRotation = lTextRotation.invert().angle()
        } else if (0 > lTextAngle > -Math.PI) {
          lNewTextRotation = lTextRotation.angle()
        }
        const nTextRotation = new Victor(nNewP1.x - nNewP2.x, nNewP1.y - nNewP2.y)
        const nTextAngle = nTextRotation.angle()
        if (nTextAngle == Math.PI || nTextAngle == 0 || nTextAngle == -Math.PI) {
          nNewTextRotation = 0
        } else if (0 < nTextAngle < Math.PI) {
          nNewTextRotation = nTextRotation.invert().angle()
        } else if (0 > nTextAngle > -Math.PI) {
          nNewTextRotation = nTextRotation.angle()
        }

        lTreadLineLength = Math.round(Math.hypot(lNewP1.x - lNewP2.x, lNewP1.y - lNewP2.y))
        nTreadLineLength = Math.round(Math.hypot(nNewP1.x - nNewP2.x, nNewP1.y - nNewP2.y))
        const lTreadLineNum = new PIXI.Text(lTreadLineLength, textStyle)

        lTreadLineNum.scale.set(0.25)
        lTreadLineNum.position.set(lPosition.x, lPosition.y)
        lTreadLineNum.anchor.set(0.5, 0.5)
        lTreadLineNum.rotation = lNewTextRotation

        const nTreadLineNum = new PIXI.Text(nTreadLineLength, textStyle)

        nTreadLineNum.scale.set(0.25)
        nTreadLineNum.position.set(nPosition.x, nPosition.y)
        nTreadLineNum.anchor.set(0.5, 0.5)
        nTreadLineNum.rotation = nNewTextRotation
        
        treadLine
        .lineStyle(1,0x000000, 1, 0.5, true)
        .moveTo(lNewP1.x / 10, lNewP1.y / 10)
        .lineTo(lNewP2.x / 10, lNewP2.y / 10)
        .moveTo(nNewP1.x / 10, nNewP1.y / 10)
        .lineTo(nNewP2.x / 10, nNewP2.y / 10)

        // ????????????
        .moveTo(lNewP1T.x / 10, lNewP1T.y / 10)
        .lineTo(lNewP1B.x / 10, lNewP1B.y / 10)
        .moveTo(lNewP2T.x / 10, lNewP2T.y / 10)
        .lineTo(lNewP2B.x / 10, lNewP2B.y / 10)
        // ????????????
        .moveTo(nNewP1T.x / 10, nNewP1T.y / 10)
        .lineTo(nNewP1B.x / 10, nNewP1B.y / 10)
        .moveTo(nNewP2T.x / 10, nNewP2T.y / 10)
        .lineTo(nNewP2B.x / 10, nNewP2B.y / 10)

        treadLineContainer.addChild(treadLine, lTreadLineNum, nTreadLineNum)
      }

      // ?????????????????????
      lNormal = new Edge(sideEdgeL).getNormal()
      nNormal = new Edge(sideEdgeN).getNormal()
      let wallOutP1
      if (this.girderType === Types.GirderType.gsaw) {
        // 
      }else {
        if (againstWallType === Types.AgainstWallType.aw_no || againstWallType === Types.AgainstWallType.aw_left) {
          sideEdgeL = new Edge(sideEdgeL).extendP2(this.girderDepth)
          sideEdgeN = new Edge(sideEdgeN).extendP1(this.girderDepth)
        }else{
          sideEdgeL = new Edge(sideEdgeL).extendP1(this.girderDepth)
          sideEdgeN = new Edge(sideEdgeN).extendP2(this.girderDepth)
        }
      }

      for(let value of D2Config.WIDGETS.values()) {
        if (value.getWidgetType() === COMP_TYPES.WALL) {
          if (tool.isVec2Equal(value.normal, lNormal)) {
            lWall = value
            if (value.getWidgetType() === COMP_TYPES.STAIR) {
              stairP = d2_tool.translateCoord(value.position)
            }
          }
        }
      }
      for(let value of D2Config.WIDGETS.values()) {
        if (value.getWidgetType() === COMP_TYPES.WALL) {
          if (tool.isVec2Equal(value.normal, nNormal)) {
            nWall = value
            if (value.getWidgetType() === COMP_TYPES.STAIR) {
              stairP = d2_tool.translateCoord(value.position)
            }
          }
        }
      }
      if (sideEdgeL.p1.x < sideEdgeL.p2.x || sideEdgeL.p1.x > sideEdgeL.p2.x) {
        wallOutP1 = new Victor((lWall.outP1.x - stairP.x) * 10 - sideEdgeL.p1.x, (lWall.outP1.y - stairP.y) * 10 - sideEdgeL.p1.y)
        sideEdgeL = d2_tool.translateEdges(new Edge(sideEdgeL).offset(Math.abs(wallOutP1.y) + offSet.x + 140, true))
      }
      if (sideEdgeL.p1.y > sideEdgeL.p2.y || sideEdgeL.p1.y < sideEdgeL.p2.y) {
        wallOutP1 = new Victor((lWall.outP1.x - stairP.x) * 10 - sideEdgeL.p1.x, (lWall.outP1.y - stairP.y) * 10 - sideEdgeL.p1.y)
        sideEdgeL = d2_tool.translateEdges(new Edge(sideEdgeL).offset(Math.abs(wallOutP1.x) + offSet.x + 140, true))
      }

      if (sideEdgeN.p1.y < sideEdgeN.p2.y || sideEdgeN.p1.y > sideEdgeN.p2.y) {
        wallOutP1 = new Victor((nWall.outP1.x - stairP.x) * 10 - sideEdgeN.p1.x, (nWall.outP1.y - stairP.y) * 10 - sideEdgeN.p1.y)
        sideEdgeN = d2_tool.translateEdges(new Edge(sideEdgeN).offset(Math.abs(wallOutP1.x) + offSet.x + 140, true))
      }
      if (sideEdgeN.p1.x < sideEdgeN.p2.x || sideEdgeN.p1.x > sideEdgeN.p2.x) {
        wallOutP1 = new Victor((nWall.outP1.x - stairP.x) * 10 - sideEdgeN.p1.x, (nWall.outP1.y - stairP.y) * 10 - sideEdgeN.p1.y)
        sideEdgeN = d2_tool.translateEdges(new Edge(sideEdgeN).offset(Math.abs(wallOutP1.y) + offSet.x + 140, true))
      }
      sideEdgeLT = new Edge(sideEdgeL).offset(arrow.x / 10, true)
      sideEdgeLB = new Edge(sideEdgeL).offset(arrow.x / 10, false)
      sideEdgeNT = new Edge(sideEdgeN).offset(arrow.x / 10, true)
      sideEdgeNB = new Edge(sideEdgeN).offset(arrow.x / 10, false)



      const langdingLine = new PIXI.Graphics()
      langdingLine.lineStyle(1, 0x000000, 1, 0.5, true)
      langdingLine.moveTo(sideEdgeL.p1.x, sideEdgeL.p1.y)
      langdingLine.lineTo(sideEdgeL.p2.x, sideEdgeL.p2.y)

      langdingLine.moveTo(sideEdgeN.p1.x, sideEdgeN.p1.y)
      langdingLine.lineTo(sideEdgeN.p2.x, sideEdgeN.p2.y)

      langdingLine.moveTo(sideEdgeLT.p1.x, sideEdgeLT.p1.y)
      langdingLine.lineTo(sideEdgeLB.p1.x, sideEdgeLB.p1.y)
      langdingLine.moveTo(sideEdgeLT.p2.x, sideEdgeLT.p2.y)
      langdingLine.lineTo(sideEdgeLB.p2.x, sideEdgeLB.p2.y)

      langdingLine.moveTo(sideEdgeNT.p1.x, sideEdgeNT.p1.y)
      langdingLine.lineTo(sideEdgeNB.p1.x, sideEdgeNB.p1.y)
      langdingLine.moveTo(sideEdgeNT.p2.x, sideEdgeNT.p2.y)
      langdingLine.lineTo(sideEdgeNB.p2.x, sideEdgeNB.p2.y)

      const landingTextLengthL =
        Math.round(Math.hypot(sideEdgeL.p1.x - sideEdgeL.p2.x, sideEdgeL.p1.y - sideEdgeL.p2.y) * 10 )
      const landingTextLengthN =
        Math.round(Math.hypot(sideEdgeN.p1.x - sideEdgeN.p2.x, sideEdgeN.p1.y - sideEdgeN.p2.y) * 10 )

      
      const landingLineTextL = new PIXI.Text(landingTextLengthL,textStyle)
      this.creatText(landingLineTextL, sideEdgeLT)
      this.creatTextRotaitionP(landingLineTextL, sideEdgeLT)
      
      const landingLineTextN = new PIXI.Text(landingTextLengthN,textStyle)
      this.creatText(landingLineTextN, sideEdgeNT)
      this.creatTextRotaitionP(landingLineTextN, sideEdgeNT)
      if (this.stairInfo.parent.cutType === Types.LandingCutType.lct_first) {
        // continue
      }else {
        treadLineContainer.addChild(langdingLine, landingLineTextL, landingLineTextN)
      }
    }

    // ??????????????????
    if (this.type === Types.TreadType.trect || this.type === Types.TreadType.tSpec) {
      for (let i = 0; i < this.inIndex.length; i++) {
        p1 = new Victor(this.edges[this.inIndex[i]].p1.x, this.edges[this.inIndex[i]].p1.y)
        p2 = new Victor(this.edges[this.inIndex[i]].p2.x, this.edges[this.inIndex[i]].p2.y)
  
        // ?????????????????????
        const firstP = new Victor((this.edges[this.frontIndex[0]].p1.x + this.edges[this.frontIndex[0]].p2.x) / 2, (this.edges[this.frontIndex[0]].p1.y + this.edges[this.frontIndex[0]].p2.y) / 2)

        let lastP = new Victor((this.edges[this.backIndex[0]].p1.x + this.edges[this.backIndex[0]].p2.x) / 2, (this.edges[this.backIndex[0]].p1.y + this.edges[this.backIndex[0]].p2.y) / 2)
        
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
        // ????????????????????????
        let position 
        let lastPosition

        

        // ???-???
        if (p1.x === p2.x && p1.y > p2.y && this.isClock === true) {
          normal = new Types.Vector3({ x: -1, y: -0 })
          for(let value of D2Config.WIDGETS.values()) {
            if (value.getWidgetType() === COMP_TYPES.WALL) {
              if (tool.isVec2Equal(value.normal, normal)) {
                wall = value
              }
            }
          }
          let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)

          // ??????
          newP1 = new Victor(wallOutP1.x * 10, p1.y)
          newP2 = new Victor(wallOutP1.x * 10, p2.y)
          
          newP1 = newP1.subtractX(offSet)
          newP2 = newP2.subtractX(offSet)
          newP1T = newP1.clone().subtractX(arrow)
          newP1B = newP1.clone().addX(arrow)
          newP2T = newP2.clone().subtractX(arrow)
          newP2B = newP2.clone().addX(arrow)
  
          newLastP1 = lastP.clone().subtractY(fOffSet).subtractX(stepLengthV)
          newLastP2 = lastP.clone().subtractY(fOffSet).addX(stepLengthV)

          newLastP1T = newLastP1.clone().subtractY(arrow)
          newLastP1B = newLastP1.clone().addY(arrow)
          newLastP2T = newLastP2.clone().subtractY(arrow)
          newLastP2B = newLastP2.clone().addY(arrow)

          // ????????????????????????
          position = {
            x: (newP1T.x + newP2T.x) / 2 / 10,
            y: (newP1T.y + newP2T.y) / 2 / 10
          }
          lastPosition = {
            x: (newLastP1T.x + newLastP2T.x) / 2 / 10,
            y: (newLastP1T.y + newLastP2T.y) / 2 / 10
          }
        }
        // ???-???
        if (p1.x < p2.x && p1.y === p2.y && this.isClock === true) {
          normal = new Types.Vector3({ x: 0, y: -1 })
          for(let value of D2Config.WIDGETS.values()) {
            if (value.getWidgetType() === COMP_TYPES.WALL) {
              if (tool.isVec2Equal(value.normal, normal)) {
                wall = value
              }
            }
          }
          let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)

          // ??????
          newP1 = new Victor(p1.x, wallOutP1.y * 10)
          newP2 = new Victor(p2.x, wallOutP1.y * 10)

          newP1 = newP1.subtractY(offSet)
          newP2 = newP2.subtractY(offSet)
          newP1T = newP1.clone().subtractY(arrow)
          newP1B = newP1.clone().addY(arrow)
          newP2T = newP2.clone().subtractY(arrow)
          newP2B = newP2.clone().addY(arrow)
  
          newLastP1 = lastP.clone().addX(fOffSet).subtractY(stepLengthV)
          newLastP2 = lastP.clone().addX(fOffSet).addY(stepLengthV)

          newLastP1T = newLastP1.clone().subtractX(arrow)
          newLastP1B = newLastP1.clone().addX(arrow)
          newLastP2T = newLastP2.clone().subtractX(arrow)
          newLastP2B = newLastP2.clone().addX(arrow)

          // ????????????????????????
          position = {
            x: (newP1T.x + newP2T.x) / 2 / 10,
            y: (newP1T.y + newP2T.y) / 2 / 10
          }
          lastPosition = {
            x: (newLastP1B.x + newLastP2B.x) / 2 / 10,
            y: (newLastP1B.y + newLastP2B.y) / 2 / 10
          }
        }
        // ???-???
        if (p1.x === p2.x && p1.y < p2.y  && this.isClock === true) {
          normal = new Types.Vector3({ x: 1, y: 0 })
          for(let value of D2Config.WIDGETS.values()) {
            if (value.getWidgetType() === COMP_TYPES.WALL) {
              if (tool.isVec2Equal(value.normal, normal)) {
                wall = value
              }
            }
          }
          let wallOutP1 = new Victor(wall.outP1.x - stairP.x,stairP.y - wall.p1.y)
          
          // ??????
          newP1 = new Victor(wallOutP1.x * 10, p1.y)
          newP2 = new Victor(wallOutP1.x * 10, p2.y)

          // ??????
          newP1 = newP1.addX(offSet)
          newP2 = newP2.addX(offSet)
          newP1T = newP1.clone().subtractX(arrow)
          newP1B = newP1.clone().addX(arrow)
          newP2T = newP2.clone().subtractX(arrow)
          newP2B = newP2.clone().addX(arrow)
  
          newLastP1 = lastP.clone().addY(fOffSet).subtractX(stepLengthV)
          newLastP2 = lastP.clone().addY(fOffSet).addX(stepLengthV)

          newLastP1T = newLastP1.clone().subtractY(arrow)
          newLastP1B = newLastP1.clone().addY(arrow)
          newLastP2T = newLastP2.clone().subtractY(arrow)
          newLastP2B = newLastP2.clone().addY(arrow)

          // ????????????????????????
          position = {
            x: (newP1B.x + newP2B.x) / 2 / 10,
            y: (newP1B.y + newP2B.y) / 2 / 10
          }
          lastPosition = {
            x: (newLastP1T.x + newLastP2T.x) / 2 / 10,
            y: (newLastP1T.y + newLastP2T.y) / 2 / 10
          }
        }
        // ???-???
        if (p1.x > p2.x && p1.y === p2.y && this.isClock === true) {// ???
          normal = new Types.Vector3({ x: -0, y: -1 })
          // for(let value of D2Config.WIDGETS.values()) {
          //   if (value.getWidgetType() === COMP_TYPES.WALL) {
          //     if (tool.isVec2Equal(value.normal, normal)) {
          //       wall = value
          //     }
          //   }
          // }
          // let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)
          
          // // ??????
          // newP1 = new Victor(p1.x, wallOutP1.y * 10)
          // newP2 = new Victor(p2.x, wallOutP1.y * 10)

          // ??????
          newP1 = p1.clone().addY(offSet)
          newP2 = p2.clone().addY(offSet)
          newP1T = p1.clone().addY(offSet).subtractY(arrow)
          newP1B = p1.clone().addY(offSet).addY(arrow)
          newP2T = p2.clone().addY(offSet).subtractY(arrow)
          newP2B = p2.clone().addY(offSet).addY(arrow)
  
          newLastP1 = lastP.clone().addY(fOffSet).subtractX(stepLengthV)
          newLastP2 = lastP.clone().addY(fOffSet).addX(stepLengthV)

          newLastP1T = newLastP1.clone().subtractX(arrow)
          newLastP1B = newLastP1.clone().addX(arrow)
          newLastP2T = newLastP2.clone().subtractX(arrow)
          newLastP2B = newLastP2.clone().addX(arrow)

        }
        // ???-???
        if (p1.x === p2.x && p1.y > p2.y && this.isClock === false) {
          normal = new Types.Vector3({ x: 1, y: 0 })
          for(let value of D2Config.WIDGETS.values()) {
            if (value.getWidgetType() === COMP_TYPES.WALL) {
              if (tool.isVec2Equal(value.normal, normal)) {
                wall = value
              }
            }
          }
          let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)
          
          // ??????
          newP1 = new Victor(wallOutP1.x * 10, p1.y)
          newP2 = new Victor(wallOutP1.x * 10, p2.y)
          
          newP1 = newP1.addX(offSet)
          newP2 = newP2.addX(offSet)
          newP1T = newP1.clone().subtractX(arrow)
          newP1B = newP1.clone().addX(arrow)
          newP2T = newP2.clone().subtractX(arrow)
          newP2B = newP2.clone().addX(arrow)
  
          newLastP1 = lastP.clone().subtractY(fOffSet).subtractX(stepLengthV)
          newLastP2 = lastP.clone().subtractY(fOffSet).addX(stepLengthV)

          newLastP1T = newLastP1.clone().subtractY(arrow)
          newLastP1B = newLastP1.clone().addY(arrow)
          newLastP2T = newLastP2.clone().subtractY(arrow)
          newLastP2B = newLastP2.clone().addY(arrow)

          // ????????????????????????
          position = {
            x: (newP1B.x + newP2B.x) / 2 / 10,
            y: (newP1B.y + newP2B.y) / 2 / 10
          }
          lastPosition = {
            x: (newLastP1T.x + newLastP2T.x) / 2 / 10,
            y: (newLastP1T.y + newLastP2T.y) / 2 / 10
          }
        }
        // ???-???
        if (p1.x > p2.x && p1.y === p2.y && this.isClock === false) {
          normal = new Types.Vector3({ x: 0, y: -1 })
          for(let value of D2Config.WIDGETS.values()) {
            if (value.getWidgetType() === COMP_TYPES.WALL) {
              if (tool.isVec2Equal(value.normal, normal)) {
                wall = value
              }
            }
          }
          let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)
          
          // ??????
          newP1 = new Victor(p1.x, wallOutP1.y * 10)
          newP2 = new Victor(p2.x, wallOutP1.y * 10)
          // ??????
          newP1 = newP1.subtractY(offSet)
          newP2 = newP2.subtractY(offSet)
          newP1T = newP1.clone().subtractY(arrow)
          newP1B = newP1.clone().addY(arrow)
          newP2T = newP2.clone().subtractY(arrow)
          newP2B = newP2.clone().addY(arrow)
  
          newLastP1 = lastP.clone().subtractX(fOffSet).subtractY(stepLengthV)
          newLastP2 = lastP.clone().subtractX(fOffSet).addY(stepLengthV)

          newLastP1T = newLastP1.clone().subtractX(arrow)
          newLastP1B = newLastP1.clone().addX(arrow)
          newLastP2T = newLastP2.clone().subtractX(arrow)
          newLastP2B = newLastP2.clone().addX(arrow)

          // ????????????????????????
          position = {
            x: (newP1T.x + newP2T.x) / 2 / 10,
            y: (newP1T.y + newP2T.y) / 2 / 10
          }
          lastPosition = {
            x: (newLastP1T.x + newLastP2T.x) / 2 / 10,
            y: (newLastP1T.y + newLastP2T.y) / 2 / 10
          }
        }
        // ???-???
        if (p1.x === p2.x && p1.y < p2.y  && this.isClock === false) {
          normal = new Types.Vector3({ x: -1, y: -0 })
          for(let value of D2Config.WIDGETS.values()) {
            if (value.getWidgetType() === COMP_TYPES.WALL) {
              if (tool.isVec2Equal(value.normal, normal)) {
                wall = value
              }
            }
          }
          let wallOutP1 = new Victor( wall.outP1.x - stairP.x,0)
          
          // ??????
          newP1 = new Victor(wallOutP1.x * 10, p1.y)
          newP2 = new Victor(wallOutP1.x * 10, p2.y)

          // ??????
          newP1 = newP1.subtractX(offSet)
          newP2 = newP2.subtractX(offSet)
          newP1T = newP1.clone().subtractX(arrow)
          newP1B = newP1.clone().addX(arrow)
          newP2T = newP2.clone().subtractX(arrow)
          newP2B = newP2.clone().addX(arrow)
  
          newLastP1 = lastP.clone().addY(fOffSet).subtractX(stepLengthV)
          newLastP2 = lastP.clone().addY(fOffSet).addX(stepLengthV)

          newLastP1T = newLastP1.clone().subtractY(arrow)
          newLastP1B = newLastP1.clone().addY(arrow)
          newLastP2T = newLastP2.clone().subtractY(arrow)
          newLastP2B = newLastP2.clone().addY(arrow)

          // ????????????????????????
          position = {
            x: (newP1T.x + newP2T.x) / 2 / 10,
            y: (newP1T.y + newP2T.y) / 2 / 10
          }
          lastPosition = {
            x: (newLastP1T.x + newLastP2T.x) / 2 / 10,
            y: (newLastP1T.y + newLastP2T.y) / 2 / 10
          }
        }
        // ???-???
        if (p1.x < p2.x && p1.y === p2.y && this.isClock === false) {// ???
          normal = new Types.Vector3({ x: -0, y: -1 })
          // for(let value of D2Config.WIDGETS.values()) {
          //   if (value.getWidgetType() === COMP_TYPES.WALL) {
          //     if (tool.isVec2Equal(value.normal, normal)) {
          //       wall = value
          //     }
          //   }
          // }
          // let wallOutP1 = new Victor(wall.outP1.x - wall.p1.x, wall.outP1.y - wall.p1.y)
          
          // // ??????
          // newP1 = new Victor(p1.x, wallOutP1.y * 10)
          // newP2 = new Victor(p2.x, wallOutP1.y * 10)

          newP1 = p1.clone().addY(offSet)
          newP2 = p2.clone().addY(offSet)
          newP1T = p1.clone().addY(offSet).subtractY(arrow)
          newP1B = p1.clone().addY(offSet).addY(arrow)
          newP2T = p2.clone().addY(offSet).subtractY(arrow)
          newP2B = p2.clone().addY(offSet).addY(arrow)
  
          newLastP1 = lastP.clone().addY(fOffSet).subtractY(stepLengthV)
          newLastP2 = lastP.clone().addY(fOffSet).addY(stepLengthV)

          newLastP1T = newLastP1.clone().subtractX(arrow)
          newLastP1B = newLastP1.clone().addX(arrow)
          newLastP2T = newLastP2.clone().subtractX(arrow)
          newLastP2B = newLastP2.clone().addX(arrow)

        }
  
        // ????????????????????????
        const firstPosition = {
          x: (newFirstP1B.x + newFirstP2B.x) / 2 / 10,
          y: (newFirstP1B.y + newFirstP2B.y) / 2 / 10
        }
  
        // ????????????
        const treadLinelength =
        Math.round(Math.hypot(p1.x - p2.x, p1.y - p2.y))

        const firstTextLength =
        Math.round(Math.hypot(newFirstP1.x - newFirstP2.x, newFirstP1.y - newFirstP2.y) )
        const lastTextLength =
        Math.round(Math.hypot(newLastP1.x - newLastP2.x, newLastP1.y - newLastP2.y) )
        
        const treadLineNum = new PIXI.Text(treadLinelength, {
          fontSize: 32,
          fill: 0x000000,
        })
        if (this.isLast) {
          treadLineNum.visible = false
        }
  
        // ????????????
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
          .lineStyle(1,0x000000, 1, 0.5, true)
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

          const firstText = new PIXI.Text(firstTextLength, textStyle)
          firstText.scale.set(0.25)
          firstText.position.set(firstPosition.x, firstPosition.y)
          firstText.anchor.set(0.5, 0.5)
          firstText.rotation = firstR
          treadLineContainer.addChild(firstText)
        }
        if (this.index === this.stairInfo.parent.parent.stepNum - 1) {
          const lastText = new PIXI.Text(lastTextLength, textStyle)
          lastText.scale.set(0.25)
          lastText.position.set(lastPosition.x, lastPosition.y)
          lastText.anchor.set(0.5, 0.5)
          lastText.rotation = firstR

          const lastLine = new PIXI.Graphics
          lastLine.lineStyle(1, 0x000000, 1, 0.5, true)
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

    // ??????????????????
    let newStartP1, newStartP2, newStartP1T, newStartP1B, newStartP2T, newStartP2B, startTP2L_T, startTP2L_B, startTP2R_T, startTP2R_B
    let startTP1L
    let startTP2L
    let startTP1R
    let startTP2R
    if (this.type === Types.TreadType.tStart) {
      if (this.edges.length === 5) {
        if (this.index === 1) {
          startTP1L = new Victor(this.edges[0].p1.x, this.edges[0].p1.y)
          startTP2L = new Victor(this.edges[0].p1.x, startTP1L.y + this.stepWidth + this.stepWidth / 6)
          startTP1R = new Victor(this.edges[1].p1.x, this.edges[1].p1.y)
          startTP2R = new Victor(this.edges[1].p1.x, startTP1R.y + this.stepWidth + this.stepWidth / 6)
          
          if (startTP1L.x === startTP2L.x && startTP1L.y < startTP2L.y && this.isClock === true) {
            normal = new Types.Vector3({ x: -1, y: -0 })
            for(let value of D2Config.WIDGETS.values()) {
              if (value.getWidgetType() === COMP_TYPES.WALL) {
                if (tool.isVec2Equal(value.normal, normal)) {
                  wall = value
                }
              }
            }
            let wallOutP1 = new Victor(wall.outP1.x - stairP.x, 0)
    
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
            for(let value of D2Config.WIDGETS.values()) {
              if (value.getWidgetType() === COMP_TYPES.WALL) {
                if (tool.isVec2Equal(value.normal, normal)) {
                  wall = value
                }
              }
            }
            let wallOutP1 = new Victor(wall.outP1.x - stairP.x, 0)
    
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
        }
      }
      else {
        if (this.index === 1) {
          startTP1L = new Victor(this.edges[0].p1.x, this.edges[0].p1.y)
          startTP2L = new Victor(this.edges[0].p1.x, startTP1L.y + this.stepWidth)
          startTP1R = new Victor(this.edges[1].p1.x, this.edges[1].p1.y)
          startTP2R = new Victor(this.edges[1].p1.x, startTP1R.y + this.stepWidth)
    
          if (startTP1L.x === startTP2L.x && startTP1L.y < startTP2L.y && this.isClock === true) {
            normal = new Types.Vector3({ x: -1, y: -0 })
            for(let value of D2Config.WIDGETS.values()) {
              if (value.getWidgetType() === COMP_TYPES.WALL) {
                if (tool.isVec2Equal(value.normal, normal)) {
                  wall = value
                }
              }
            }
            let wallOutP1 = new Victor(wall.outP1.x - stairP.x, 0)
    
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
            for(let value of D2Config.WIDGETS.values()) {
              if (value.getWidgetType() === COMP_TYPES.WALL) {
                if (tool.isVec2Equal(value.normal, normal)) {
                  wall = value
                }
              }
            }
            let wallOutP1 = new Victor(wall.outP1.x - stairP.x, 0)
    
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
        }
      }
      if (this.index === 1) {
        // ????????????????????????
        const startTreadLinelength =
        Math.round(Math.hypot(startTP1L.x - startTP2L.x, startTP1L.y - startTP2L.y) )
  
        const startTreadLinelength1 =
        Math.round(Math.hypot(startTP1L.x - startTP1R.x, startTP1L.y - startTP1R.y) )
  
        // ????????????????????????
        let position
        if (this.isClock === true) {
          position = {
            x: (newStartP1T.x + newStartP2T.x) / 2 / 10,
            y: (newStartP1T.y + newStartP2T.y) / 2 / 10
          }
        } else {
          position = {
            x: (newStartP1B.x + newStartP2B.x) / 2 / 10,
            y: (newStartP1B.y + newStartP2B.y) / 2 / 10
          }
        }
        const position1 = {
          x: (startTP2L.x + startTP2R.x) / 2 / 10,
          y: (startTP2L.y + startTP2R.y) / 2 / 10
        }
  
        // ????????????
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
        if (this.isClock === false) {
          newStartTextRotation = -newStartTextRotation
        }
  
        const startTreadLine = new PIXI.Graphics()
  
        startTreadLine
        .lineStyle(1,0x000000, 1, 0.5, true)
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
  
        const startTreadLineNum = new PIXI.Text(startTreadLinelength, textStyle)
  
        startTreadLineNum.scale.set(0.25)
        startTreadLineNum.position.set(position.x, position.y)
        startTreadLineNum.anchor.set(0.5, 0.5)
        startTreadLineNum.rotation = newStartTextRotation
  
        const startTreadLineNum1 = new PIXI.Text(startTreadLinelength1, textStyle)
  
        startTreadLineNum1.scale.set(0.25)
        startTreadLineNum1.position.set(position1.x, position1.y + 5)
        startTreadLineNum1.anchor.set(0.5, 0.5)
        startTreadLineNum1.rotation = 0
  
        treadLineContainer.addChild(startTreadLine,startTreadLineNum, startTreadLineNum1)
      }
      
    }

    this.sprite.addChild(treadLineContainer)
  }

  // ???????????????????????????
  getStraightEdge(vEdges) {
    let newEdges = new Types.Edge({
      p1: new Types.Vector3({ x: vEdges.p1.x / D2Config.SCREEN_RATE, y: vEdges.p1.y / D2Config.SCREEN_RATE, z: vEdges.p1.z / D2Config.SCREEN_RATE}),
      p2: new Types.Vector3({ x: vEdges.p2.x / D2Config.SCREEN_RATE, y: vEdges.p2.y / D2Config.SCREEN_RATE, z: vEdges.p2.z / D2Config.SCREEN_RATE }),
      type: Types.EdgeType.estraight,
    })
    return newEdges
  }

  // ??????????????????????????????????????????????????????
  creatStraightEdge(vEdge1, vEdge2) {
    let newEdges = new Types.Edge({
      p1: new Types.Vector3({ x: (vEdge1.p1.x + vEdge1.p2.x) / 2, y: (vEdge1.p1.y + vEdge1.p2.y) / 2, z: (vEdge1.p1.z + vEdge1.p2.z) / 2}),
      p2: new Types.Vector3({ x: (vEdge2.p1.x + vEdge2.p2.x) / 2, y: (vEdge2.p1.y + vEdge2.p2.y) / 2, z: (vEdge2.p1.z + vEdge2.p2.z) / 2}),
      type: Types.EdgeType.estraight,
    })
    return newEdges
  }

  // ?????????????????????
  creatNewEdge(vP1, vP2) {
    let newEdges = new Types.Edge({
      p1: new Types.Vector3({ x: vP1.x, y: vP1.y, z: vP1.z}),
      p2: new Types.Vector3({ x: vP2.x, y: vP2.y, z: vP2.z}),
      type: Types.EdgeType.estraight,
    })
    return newEdges
  }

  ArcStairDemension() {
    this.arcContainer = new PIXI.Container()
    // ????????????
    this.textStyle =  {
      fontSize: 32,
      fill: 0x000000,
    }
    this.arcOffset = 15 // ????????????????????????
    this.arcArrow = 4  // ????????????
    this.treadOffset = 54
    this.radiusOffset = 20
    this.startTreadOffset = 15
    // ??????edge???????????????
    this.isTrue = true
    if (this.isClock) {
      this.isTrue = true
    }else {
      this.isTrue = false
    }
    
    // ????????????
    this.creatArcWide()
    // ??????????????????
    this.creatNormalTread()
    // ?????????????????? 
    this.creatStartTread()
    // ??????????????????
    this.creatRadius()
    
    this.sprite.addChild(this.arcContainer)
  }
  
  creatArcWide() {
    const arcContainer = this.arcContainer
    // ????????????
    let textStyle = this.textStyle
    let arcOffset = this.arcOffset // ????????????????????????
    let arcArrow = this.arcArrow  // ????????????
    let treadOffset = this.treadOffset
    // ??????edge???????????????
    let isTrue = this.isTrue
    // ??????????????????
    let outArcEdge
    let inArcEdge
    if (this.girderType === Types.GirderType.gsaw) {
      outArcEdge = this.edges[this.inIndex]
      inArcEdge = this.edges[this.outIndex]
    }else {
      outArcEdge = new Edge(this.edges[this.inIndex]).offset(this.girderDepth, isTrue)
      inArcEdge = new Edge(this.edges[this.outIndex]).offset(this.girderDepth, isTrue)
    }
    let newOutArcEdge = this.getStraightEdge(outArcEdge)
    newOutArcEdge = new Edge(newOutArcEdge).offset(arcOffset,isTrue)
    let outArcEdgeT = new Edge(newOutArcEdge).offset(arcArrow, isTrue)
    let outArcEdgeB = new Edge(newOutArcEdge).offset(-arcArrow, isTrue)
    let outArcEdgeLength = Math.round(new Edge(outArcEdge).getLength())
    
    let newInArcEdge = this.getStraightEdge(inArcEdge)
    newInArcEdge = new Edge(newInArcEdge).offset(arcOffset,isTrue)
    
    let inArcEdgeT = new Edge(newInArcEdge).offset(arcArrow, isTrue)
    let inArcEdgeB = new Edge(newInArcEdge).offset(-arcArrow, isTrue)
    let inArcEdgeLength = Math.round(new Edge(inArcEdge).getLength())

    const outArcLine = new PIXI.Graphics()
    outArcLine.lineStyle(1, 0x000000, 1, 0.5, true)
    
    const inArcLine = new PIXI.Graphics()
    inArcLine.lineStyle(1, 0x000000, 1, 0.5, true)

    const outArcText = new PIXI.Text(outArcEdgeLength, textStyle)
    const inArcText = new PIXI.Text(inArcEdgeLength, textStyle)
    outArcText.visible = false
    inArcText.visible = false
    if (this.index == Math.floor(this.stepNum / 2) && this.type === Types.TreadType.tArc) {
      outArcText.visible = true
      inArcText.visible = true
      outArcLine.moveTo(newOutArcEdge.p1.x, newOutArcEdge.p1.y)
      outArcLine.lineTo(newOutArcEdge.p2.x, newOutArcEdge.p2.y)
      outArcLine.moveTo(outArcEdgeT.p1.x, outArcEdgeT.p1.y)
      outArcLine.lineTo(outArcEdgeB.p1.x, outArcEdgeB.p1.y)
      outArcLine.moveTo(outArcEdgeT.p2.x, outArcEdgeT.p2.y)
      outArcLine.lineTo(outArcEdgeB.p2.x, outArcEdgeB.p2.y)
      
      inArcLine.moveTo(newInArcEdge.p1.x, newInArcEdge.p1.y)
      inArcLine.lineTo(newInArcEdge.p2.x, newInArcEdge.p2.y)
      inArcLine.moveTo(inArcEdgeT.p1.x, inArcEdgeT.p1.y)
      inArcLine.lineTo(inArcEdgeB.p1.x, inArcEdgeB.p1.y)
      inArcLine.moveTo(inArcEdgeT.p2.x, inArcEdgeT.p2.y)
      inArcLine.lineTo(inArcEdgeB.p2.x, inArcEdgeB.p2.y)
    }
    if (inArcEdgeLength === 0) {
      inArcText.visible = false
    }

    this.creatText(outArcText, outArcEdgeT)
    this.creatText(inArcText, inArcEdgeB)
    this.creatTextRotaitionP(outArcText, outArcEdgeT)
    this.creatTextRotaitionR(inArcText, inArcEdgeB)

    arcContainer.addChild(
      outArcLine,inArcLine, inArcText, outArcText,
      )
  }
  creatNormalTread() {
    const arcContainer = this.arcContainer
    // ????????????
    let textStyle = this.textStyle
    let arcOffset = this.arcOffset // ????????????????????????
    let arcArrow = this.arcArrow  // ????????????
    let treadOffset = this.treadOffset
    // ??????edge???????????????
    let isTrue = this.isTrue

    if (this.type !== Types.TreadType.tStart) { 
      // ?????????????????????????????????
      let inEdge = d2_tool.translateEdges(new Edge(this.creatStraightEdge(this.edges[this.frontIndex], this.edges[this.backIndex])).offset(this.stepLength / 2, isTrue))
      let newInEdge = new Edge(inEdge).offset(treadOffset, isTrue)
      let newInEdgeT = new Edge(newInEdge).offset(arcArrow, isTrue)
      let newInEdgeB = new Edge(newInEdge).offset(-arcArrow, isTrue)
      
      let treadTextLength = Math.round(new Edge(inEdge).getLength() * D2Config.SCREEN_RATE)
      const treadText = new PIXI.Text(treadTextLength, textStyle)
      treadText.visible = false
      this.creatText(treadText, newInEdgeT)
      this.creatTextRotaitionP(treadText, newInEdgeT)
      const inTreadLine = new PIXI.Graphics()
      if (this.type !== Types.TreadType.tArc && !this.isLast) {
        treadText.visible = true
        inTreadLine.lineStyle(1, 0x000000, 1, 0.5, true)
        inTreadLine.moveTo(newInEdge.p1.x, newInEdge.p1.y)
        inTreadLine.lineTo(newInEdge.p2.x, newInEdge.p2.y)
        inTreadLine.moveTo(newInEdgeT.p1.x, newInEdgeT.p1.y)
        inTreadLine.lineTo(newInEdgeB.p1.x, newInEdgeB.p1.y)
        inTreadLine.moveTo(newInEdgeT.p2.x, newInEdgeT.p2.y)
        inTreadLine.lineTo(newInEdgeB.p2.x, newInEdgeB.p2.y)
      }

      // ?????????????????????
      let firstEdge = new Edge(d2_tool.translateEdges(this.edges[this.frontIndex])).offset(treadOffset, isTrue)
      let newFirstEdge
      // ????????????????????????
      let lastEdge
      lastEdge = new Edge(d2_tool.translateEdges(this.edges[this.backIndex])).offset(treadOffset, isTrue)
      let newLastEdge
      if (this.girderType === Types.GirderType.gslab) {
        newFirstEdge = new Edge(firstEdge).extendP1(this.girderDepth / D2Config.SCREEN_RATE)
        newFirstEdge = new Edge(newFirstEdge).extendP2(this.girderDepth / D2Config.SCREEN_RATE)
        newLastEdge = new Edge(lastEdge).extendP1(this.girderDepth / D2Config.SCREEN_RATE)
        newLastEdge = new Edge(newLastEdge).extendP2(this.girderDepth / D2Config.SCREEN_RATE)
      }else {
        newFirstEdge = firstEdge
        newLastEdge = lastEdge
      }
      let newFirstEdgeT = new Edge(newFirstEdge).offset(arcArrow, isTrue)
      let newFirstEdgeB = new Edge(newFirstEdge).offset(-arcArrow, isTrue)
      let newLastEdgeT = new Edge(newLastEdge).offset(arcArrow, isTrue)
      let newLastEdgeB = new Edge(newLastEdge).offset(-arcArrow, isTrue)

      const firstTextLength = Math.round(new Edge(firstEdge).getLength()* D2Config.SCREEN_RATE) 
      const lastTextLength = this.stepLength
      const firstTreadText = new PIXI.Text(firstTextLength, textStyle)
      const lastTreadText = new PIXI.Text(lastTextLength, textStyle)
      firstTreadText.visible = false
      lastTreadText.visible = false
      this.creatText(firstTreadText, newFirstEdgeT)
      this.creatTextRotaitionR(firstTreadText, newFirstEdgeT)
      this.creatText(lastTreadText, newLastEdgeT)
      this.creatTextRotaitionR(lastTreadText, newLastEdgeT)
      
      const firstTreadLine = new PIXI.Graphics()
      firstTreadLine.lineStyle(1, 0x000000, 1, 0.5, true)
      if (this.index === 1) {
        firstTreadText.visible = true
        firstTreadLine.moveTo(newFirstEdge.p1.x, newFirstEdge.p1.y)
        firstTreadLine.lineTo(newFirstEdge.p2.x, newFirstEdge.p2.y)
        firstTreadLine.moveTo(newFirstEdgeT.p1.x, newFirstEdgeT.p1.y)
        firstTreadLine.lineTo(newFirstEdgeB.p1.x, newFirstEdgeB.p1.y)
        firstTreadLine.moveTo(newFirstEdgeT.p2.x, newFirstEdgeT.p2.y)
        firstTreadLine.lineTo(newFirstEdgeB.p2.x, newFirstEdgeB.p2.y)
      }
      const lastTreadLine = new PIXI.Graphics()
      lastTreadLine.lineStyle(1, 0x000000, 1, 0.5, true)

      if ((this.index === this.stepNum - 1 && this.stepNumRule === Types.StepNumRule.snr_n_add_1) || (this.isLast === false && this.index === this.stepNum && this.stepNumRule === Types.StepNumRule.snr_n)) {
        lastTreadText.visible = true
        lastTreadLine.moveTo(newLastEdge.p1.x, newLastEdge.p1.y)
        lastTreadLine.lineTo(newLastEdge.p2.x, newLastEdge.p2.y)
        lastTreadLine.moveTo(newLastEdgeT.p1.x, newLastEdgeT.p1.y)
        lastTreadLine.lineTo(newLastEdgeB.p1.x, newLastEdgeB.p1.y)
        lastTreadLine.moveTo(newLastEdgeT.p2.x, newLastEdgeT.p2.y)
        lastTreadLine.lineTo(newLastEdgeB.p2.x, newLastEdgeB.p2.y)
      }
      arcContainer.addChild(
      treadText, inTreadLine,
      firstTreadLine, firstTreadText,
      lastTreadLine, lastTreadText,
      )
    }
  }
  creatStartTread() {
    const arcContainer = this.arcContainer
    // ????????????
    let textStyle = this.textStyle
    let arcOffset = this.arcOffset // ????????????????????????
    let arcArrow = this.arcArrow  // ????????????
    let treadOffset = this.treadOffset
    let startTreadOffset = this.startTreadOffset
    // ??????edge???????????????
    let isTrue = this.isTrue

    if (this.type === Types.TreadType.tStart) {
      // ?????????
      let markEdge = d2_tool.translateEdges(this.edges[this.backIndex])
      let frontStartEdge
      let newFrontStartEdge
      let sideStartEdge
      let newSideStartEdge
      if (this.stairInfo.parent.modelType === Types.StartTreadType.st_el) {
        frontStartEdge = new Edge(markEdge).offset((this.stepWidth + this.stairInfo.parent.offset2) / D2Config.SCREEN_RATE, !isTrue)
      }else if (this.stairInfo.parent.modelType === Types.StartTreadType.st_el_2) {
        frontStartEdge = new Edge(markEdge).offset((this.stepWidth + this.stairInfo.parent.offset2 * 2) / D2Config.SCREEN_RATE, !isTrue)
      }else if (this.stairInfo.parent.modelType === Types.StartTreadType.st_rr) {
        frontStartEdge = new Edge(markEdge).offset(this.stepWidth / D2Config.SCREEN_RATE, !isTrue)
        sideStartEdge = d2_tool.translateEdges(this.edges[this.outIndex])
      }else if (this.stairInfo.parent.modelType === Types.StartTreadType.st_rr_2) {
        frontStartEdge = new Edge(markEdge).offset(this.stepWidth / D2Config.SCREEN_RATE, !isTrue)
        sideStartEdge = d2_tool.translateEdges(this.edges[this.outIndex])
      }
      newFrontStartEdge = new Edge(frontStartEdge).offset(startTreadOffset, !isTrue)
      
      sideStartEdge = new Edge(this.creatStraightEdge(markEdge, frontStartEdge)).offset(this.stepLength / 2 / D2Config.SCREEN_RATE, !isTrue)
      newSideStartEdge = new Edge(sideStartEdge).offset(treadOffset, !isTrue)

      let newFrontStartEdgeT = new Edge(newFrontStartEdge).offset(arcArrow, !isTrue)
      let newFrontStartEdgeB = new Edge(newFrontStartEdge).offset(arcArrow, isTrue)
      let newSideStartEdgeT = new Edge(newSideStartEdge).offset(arcArrow, !isTrue)
      let newSideStartEdgeB = new Edge(newSideStartEdge).offset(arcArrow, isTrue)

      const frontStartText = new PIXI.Text(this.stepLength, textStyle)
      frontStartText.visible = false
      this.creatText(frontStartText, newFrontStartEdgeT)
      this.creatTextRotaitionP(frontStartText,newFrontStartEdge)
      let sideStartText
      if (this.stairInfo.parent.modelType === Types.StartTreadType.st_el || this.stairInfo.parent.modelType === Types.StartTreadType.st_el_2) {
        sideStartText = new PIXI.Text(this.stepWidth + Math.round(this.stairInfo.parent.offset2), textStyle)
      }else {
        sideStartText = new PIXI.Text(this.stepWidth, textStyle)
      }
      sideStartText.visible = false
      this.creatText(sideStartText, newSideStartEdgeT)
      this.creatTextRotaitionR(sideStartText,newSideStartEdge)
      
      const frontStartLine = new PIXI.Graphics()
      frontStartLine.lineStyle(1, 0x000000, 1, 0.5, true)
      if (this.index === 1) {
        frontStartText.visible = true
        frontStartLine.moveTo(newFrontStartEdge.p1.x, newFrontStartEdge.p1.y)
        frontStartLine.lineTo(newFrontStartEdge.p2.x, newFrontStartEdge.p2.y)
        frontStartLine.moveTo(newFrontStartEdgeT.p1.x, newFrontStartEdgeT.p1.y)
        frontStartLine.lineTo(newFrontStartEdgeB.p1.x, newFrontStartEdgeB.p1.y)
        frontStartLine.moveTo(newFrontStartEdgeT.p2.x, newFrontStartEdgeT.p2.y)
        frontStartLine.lineTo(newFrontStartEdgeB.p2.x, newFrontStartEdgeB.p2.y)
      }
      const sideStartLine = new PIXI.Graphics()
      sideStartLine.lineStyle(1, 0x000000, 1, 0.5, true)
      if (this.index === 1) {
        sideStartText.visible = true
        sideStartLine.moveTo(newSideStartEdge.p1.x, newSideStartEdge.p1.y)
        sideStartLine.lineTo(newSideStartEdge.p2.x, newSideStartEdge.p2.y)
        sideStartLine.moveTo(newSideStartEdgeT.p1.x, newSideStartEdgeT.p1.y)
        sideStartLine.lineTo(newSideStartEdgeB.p1.x, newSideStartEdgeB.p1.y)
        sideStartLine.moveTo(newSideStartEdgeT.p2.x, newSideStartEdgeT.p2.y)
        sideStartLine.lineTo(newSideStartEdgeB.p2.x, newSideStartEdgeB.p2.y)
      }
      arcContainer.addChild(
        frontStartLine, frontStartText,
        sideStartLine, sideStartText,
        )
    }
  }
  creatRadius() {
    const arcContainer = this.arcContainer
    // ????????????
    let textStyle = this.textStyle
    let arcOffset = this.arcOffset // ????????????????????????
    let arcArrow = this.arcArrow  // ????????????
    let treadOffset = this.treadOffset
    let radiusOffset = this.radiusOffset
    let startTreadOffset = this.startTreadOffset
    // ??????edge???????????????
    let isTrue = this.isTrue
    let outRadius = this.stairInfo.outRadius
    let inRadius = this.stairInfo.inRadius

    let outArcEdge = this.edges[this.inIndex]
    let newOutArcEdge = this.getStraightEdge(outArcEdge)
    
    let inArcEdge = this.edges[this.outIndex]
    let newInArcEdge = this.getStraightEdge(inArcEdge)
    let radiusEdge = this.creatStraightEdge(newOutArcEdge, newInArcEdge)
    let newRadiusEdge = new Edge(radiusEdge).extendP1(-radiusOffset)
    newRadiusEdge = new Edge(newRadiusEdge).extendP2(-radiusOffset)

    let outRadiusEdge = this.creatNewEdge(radiusEdge.p1, newRadiusEdge.p1)
    let inRadiusEdge = this.creatNewEdge(radiusEdge.p2, newRadiusEdge.p2)

    const outRadiusText = new PIXI.Text('R' + outRadius, {
      fill: 0x000000,
      fontSize: 24
    })
    outRadiusText.visible = false
    outRadiusText.scale.set(0.25)
    outRadiusText.position.set(outRadiusEdge.p2.x, outRadiusEdge.p2.y)
    this.creatTextRotaitionP(outRadiusText, outRadiusEdge)
    
    const inRadiusText = new PIXI.Text('R' + inRadius, {
      fill: 0x000000,
      fontSize: 24
    })
    inRadiusText.visible = false
    inRadiusText.scale.set(0.25)
    inRadiusText.position.set(inRadiusEdge.p2.x, inRadiusEdge.p2.y)
    this.creatTextRotaitionR(inRadiusText, inRadiusEdge)
    if (this.isClock) {
      outRadiusText.anchor.set(0, 0.5)
      inRadiusText.anchor.set(1, 0.5)
    }else {
      outRadiusText.anchor.set(1, 0.5)
      inRadiusText.anchor.set(0, 0.5)
    }
    
    const outRadiusLine = new PIXI.Graphics()
    outRadiusLine.lineStyle(1, 0x000000, 1, 0.5, true)
    if(this.index == Math.floor(this.stepNum / 2) && this.type === Types.TreadType.tArc) {
      outRadiusText.visible = true
      outRadiusLine.moveTo(outRadiusEdge.p1.x, outRadiusEdge.p1.y)
      outRadiusLine.lineTo(outRadiusEdge.p2.x, outRadiusEdge.p2.y)
    }
    const inRadiusLine = new PIXI.Graphics()
    inRadiusLine.lineStyle(1, 0x000000, 1, 0.5, true)
    if(this.index == Math.floor(this.stepNum / 2) && this.type === Types.TreadType.tArc) {
      inRadiusText.visible = true
      inRadiusLine.moveTo(inRadiusEdge.p1.x, inRadiusEdge.p1.y)
      inRadiusLine.lineTo(inRadiusEdge.p2.x, inRadiusEdge.p2.y)
    }
    if (inRadius === 0) {
      arcContainer.addChild(outRadiusLine,  outRadiusText)
    }else {
      arcContainer.addChild(outRadiusLine, inRadiusLine, outRadiusText, inRadiusText)
    }

    this.sprite.addChild(arcContainer)

  }
}
