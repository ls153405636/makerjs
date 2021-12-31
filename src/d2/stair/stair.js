import { start } from 'xstate/lib/actions'
import { Types } from '../../types/stair_v2'
import { BaseWidget } from '../base_widget'
import { ChildWidget } from './child_widget'
import { D2Config, Z_INDEX } from '../config'
import d2_tool from '../d2_tool'
import { BigColumn } from './big_column'
import { SmallColumn } from './small_column'
import { Flight } from './flight'
import { Handrail } from './handrail'
import { HangingBoard } from './hanging_board'
import { Girder } from './girder'
import { COMP_TYPES } from '../../common/common_config'
import { StructConfig } from '../../structure/config'
import Victor from 'victor'
import tool from '../../structure/tool'
import { Edge } from '../../utils/edge'

export class Stair extends BaseWidget {
  /**
   *
   * @param {Types.Stair} vPB
   */
  constructor(vPB) {
    super(vPB.uuid)
    this.init(vPB)
  }
  
  /**
   * 
   * @param {Types.Stair} vPB 
   */
  init(vPB) {
    this.type = vPB.type
    this.sprite = new PIXI.Container()
    D2Config.CUR_STAIR = this
    this.flights = []
    this.smallColumns = []
    this.bigColumns = []
    this.handrails = []
    this.hangingBoard = []
    this.girders = []
    this.landings = []
    this.position = vPB.position
    this.againstWallType = vPB.againstWallType
    for (const f of vPB.flights) {
      this.flights.push(new Flight(f, this))
    }
    /**目前休息平台架构与楼梯段完全一样
     * 所以暂时使用flight类，若后续有新需求，再用新类
     */
    for (const l of vPB.landings) {
      this.landings.push(new Flight(l, this))
    }
    for (const hdl of vPB.handrails) {
      this.handrails.push(new Handrail(hdl,this))
    }
    for (const col of vPB.smallColumns) {
      this.smallColumns.push(new SmallColumn(col, this))
    }
    for (const col of vPB.bigColumns) {
      this.bigColumns.push(new BigColumn(col))
    }
    if (vPB.girderParameters.type === Types.GirderType.gslab) {
      for (const gd of vPB.girders) {
        this.girders.push(new Girder(gd))
      }
    }
    if (vPB.hangingBoard) {
      this.hangingBoard.push(new HangingBoard(vPB.hangingBoard))
    }

    this.position = d2_tool.translateCoord(vPB.position)
    this.draw()
    if (this.type !== Types.StairType.s_arc_type) {
      this.addDimension()
    }
  }

  destroy() {
    for (const f of this.flights) {
      f.destroy()
    }
    for (const hdl of this.handrails) {
      hdl.destroy()
    }
    for (const col of this.smallColumns) {
      col.destroy()
    }
    for (const col of this.bigColumns) {
      col.destroy()
    }
    for (const gd of this.girders) {
      gd.destroy()
    }
    for (const hb of this.hangingBoard) {
      hb.destroy()
    }
    for (const l of this.landings) {
      l.destroy()
    }
    super.destroy()
  }

  /**获取当前组件的类型 */
  getWidgetType() {
    return COMP_TYPES.STAIR
  }

  draw() {
    

    // sortableChildren = true 子级根据zIndex排序
    // 跟元素添加顺序有冲突
    this.sprite.sortableChildren = true

    this.addSprites(this.flights)
    this.addSprites(this.hangingBoard)
    this.addSprites(this.landings)
    // 判断大梁与扶手层级
    if (
      this.girders[0] &&
      this.handrails[0] &&
      this.girders[0].sprite.width >this.handrails[0].width / D2Config.SCREEN_RATE) {
        this.addSprites(this.girders)
        this.addSprites(this.handrails)
        this.sprite.sortableChildren = false
    } else {
      this.addSprites(this.handrails)
      this.addSprites(this.girders)
      this.sprite.sortableChildren = true
    }
    this.addSprites(this.smallColumns)
    this.addSprites(this.bigColumns)

    /** 需设置整体精灵图的位置*/
    this.sprite.position.set(this.position.x, this.position.y)
    this.sprite.zIndex = Z_INDEX.STAIR_ZINDEX
  }

  /**
   * 将附属组件的精灵图添加到容器中
   * @param {Array<ChildWidget>} vItems
   */
  addSprites(vItems) {
    for (const item of vItems) {
      let itemSprite = item.getSprite()
      if (itemSprite) {
        this.sprite.addChild(itemSprite)
      }
    }
  }



  cancelSmallColSelected() {
    this.smallColumns.forEach((col) => {
      col.cancelSelected()
    })
  }

  setSmallColSelected() {
    this.smallColumns.forEach((col) => {
      col.setSelected()
    })
  }

  setSmallColHover() {
    this.smallColumns.forEach((col) => {
      col.setHover()
    })
  }
  cancelSmallColHover() {
    this.smallColumns.forEach((col) => {
      col.cancelHover()
    })
  }

  getRotation(vP1, vP2) {
    // 旋转计算
    let newTextRotation = ''
    const textRotation = new Victor(vP1.x - vP2.x, vP1.y - vP2.y)
    const textAngle = textRotation.angle()
    if (this.isClock) {
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
    return newTextRotation
  }

  addDimension() {
    let stairInfo = StructConfig.INFOS.get(this.uuid)
    const flightContainer = new PIXI.Container()
    let stepNumRule = stairInfo.stepNumRule // 是否n+1
    let girderType = stairInfo.girderParameters.type
    let girderDepth = stairInfo.girderParameters.depth
    let depth = stairInfo.depth ? stairInfo.depth : stairInfo.depth1
    let width = stairInfo.width
    let landingWidth = new Victor(width,width)
    let firstDepth = new Victor(depth,depth)
    const offSet = new Victor(580,580)
    const arrow = new Victor(50,50)

    // 文字样式
    const textStyle =  {
      fontSize: 32,
      fill: 0x000000,
    }
    
    // 获取第一级踏步
    let wallLength
    let wall = null
    let stairP = null
    let stepLength = stairInfo.width
    for (let i = 0; i < stairInfo.flights.length; i++) {
      let e = stairInfo.flights[0].treads[0].border.stepOutline
      this.isClock = e.isClock
      let stairtE = stairInfo.flights[stairInfo.flights.length - 1].treads[0].border.stepOutline
      let type = stairInfo.flights[0].treads[0].type
      let stairtType = stairInfo.flights[stairInfo.flights.length - 1].treads[0].type
      let p
      let nextP

      if (type === 1) {
        p = new Victor((e.edges[2].p1.x + e.edges[2].p2.x) / 2, (e.edges[2].p1.y + e.edges[2].p2.y) / 2)
        nextP = p.clone().subtractY(firstDepth)
      }
      if (stairtType === Types.TreadType.tStart && stairtE.edges.length === 5) {
        p = new Victor((stairtE.edges[0].p1.x + stairtE.edges[0].p2.x) / 2, stairtE.edges[3].p1.y)
        nextP = p.clone().subtractY(firstDepth).subtractY(new Victor(0, stairtE.edges[3].p1.y - stairtE.edges[0].p1.y))
      }
      if (stairtType === Types.TreadType.tStart && stairtE.edges.length === 4) {
        p = new Victor((stairtE.edges[2].p1.x + stairtE.edges[2].p2.x) / 2, (stairtE.edges[2].p1.y + stairtE.edges[2].p2.y) / 2)
        nextP = p.clone().subtractY(firstDepth).subtractY(new Victor(0, stairtE.edges[2].p1.y - stairtE.edges[0].p1.y))
      }
      
      let newP1
      let newP2
      let newP1T
      let newP1B
      let newP2T
      let newP2B
      let flightPosition
      
      if (this.isClock) {
        let normal = new Types.Vector3({ x: -1, y: -0 })
        for(let value of D2Config.WIDGETS.values()) {
          if (value.getWidgetType() === COMP_TYPES.WALL) {
            if (tool.isVec2Equal(value.normal, normal)) {
              wall = value
            }
          }
          if (value.getWidgetType() === COMP_TYPES.STAIR) {
            stairP = value.position
          }
        }
        let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)
        newP1 = new Victor(wallOutP1.x * 10, p.y)
        newP2 = new Victor(wallOutP1.x * 10, nextP.y)

        newP1 = newP1.subtractX(offSet)
        newP2 = newP2.subtractX(offSet)
        newP1T = newP1.clone().subtractX(arrow)
        newP1B = newP1.clone().addX(arrow)
        newP2T = newP2.clone().subtractX(arrow)
        newP2B = newP2.clone().addX(arrow)

        // 中心位置计算
        flightPosition = {
        x: (newP1T.x + newP2T.x) / 2 / 10,
        y: (newP1T.y + newP2T.y) / 2 / 10
      }
      } else {
        let normal = new Types.Vector3({ x: 1, y: 0 })
        for(let value of D2Config.WIDGETS.values()) {
          if (value.getWidgetType() === COMP_TYPES.WALL) {
            if (tool.isVec2Equal(value.normal, normal)) {
              wall = value
            }
          }
          if (value.getWidgetType() === COMP_TYPES.STAIR) {
            stairP = value.position
          }
        }

        let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)
        newP1 = new Victor(wallOutP1.x * 10, p.y)
        newP2 = new Victor(wallOutP1.x * 10, nextP.y)

        newP1 = newP1.addX(offSet)
        newP2 = newP2.addX(offSet)
        newP1T = newP1.clone().subtractX(arrow)
        newP1B = newP1.clone().addX(arrow)
        newP2T = newP2.clone().subtractX(arrow)
        newP2B = newP2.clone().addX(arrow)

        // 中心位置计算
        flightPosition = {
        x: (newP1B.x + newP2B.x) / 2 / 10,
        y: (newP1B.y + newP2B.y) / 2 / 10
      }
      }
      var wallEndExtend1 = wall.endExtend
      if (wallEndExtend1 === 240) {
        wallLength =  Math.round(Math.hypot(wall.p1.x - wall.p2.x, wall.p1.y - wall.p2.y)) - 24
      }else {
        wallLength =  Math.round(Math.hypot(wall.p1.x - wall.p2.x, wall.p1.y - wall.p2.y))
      }
      // 标注长度计算
      const flightTextLength =
      Math.round(Math.hypot(p.x - nextP.x, p.y - nextP.y) )

      const flightLine = new PIXI.Graphics()
      const flightText = new PIXI.Text(flightTextLength, textStyle)

      flightText.scale.set(0.25)
      flightText.position.set(flightPosition.x, flightPosition.y)
      flightText.anchor.set(0.5, 0.5)
      flightText.rotation = this.getRotation(p, nextP)

      flightLine
      .lineStyle(1,0x000000, 1, 0.5, true)
      .moveTo(newP1.x / 10, newP1.y / 10)
      .lineTo(newP2.x / 10, newP2.y / 10)
      .moveTo(newP1T.x / 10, newP1T.y / 10)
      .lineTo(newP1B.x / 10, newP1B.y / 10)
      .moveTo(newP2T.x / 10, newP2T.y / 10)
      .lineTo(newP2B.x / 10, newP2B.y / 10)

      if (wallLength === flightTextLength / 10) {
        continue
      }else {
        flightContainer.addChild(flightLine,flightText)
      }

      flightContainer.zIndex = 100
    }

    for (let i = 0; i < stairInfo.landings.length; i++) {
      let e = stairInfo.landings[0].treads[0].border.stepOutline
      this.isClock = e.isClock
      let fLangdingLength = new Victor((e.edges[0].p2.x + e.edges[0].p1.x) / 2, 0)
      let lP = new Victor((e.edges[0].p1.x + e.edges[0].p2.x) / 2, e.edges[0].p1.y).subtractX(fLangdingLength)
      let lNextP = lP.clone().addX(landingWidth)

      let newLP1
      let newLP2
      let newLP1T
      let newLP1B
      let newLP2T
      let newLP2B
      let landingPosition

      if (this.isClock) {
        let normal = new Types.Vector3({ x: 0, y: -1 })
        for(let value of D2Config.WIDGETS.values()) {
          if (value.getWidgetType() === COMP_TYPES.WALL) {
            if (tool.isVec2Equal(value.normal, normal)) {
              wall = value
            }
          }
          if (value.getWidgetType() === COMP_TYPES.STAIR) {
            stairP = value.position
          }
        }

        let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)
        
        // 左侧
        newLP1 = new Victor(lP.x, wallOutP1.y * 10)
        newLP2 = new Victor(lNextP.x, wallOutP1.y * 10)
        
        newLP1 = newLP1.subtractY(offSet)
        newLP2 = newLP2.subtractY(offSet)
        newLP1T = newLP1.clone().subtractY(arrow)
        newLP1B = newLP1.clone().addY(arrow)
        newLP2T = newLP2.clone().subtractY(arrow)
        newLP2B = newLP2.clone().addY(arrow)
        // 中心位置计算
        landingPosition = {
          x: (newLP1T.x + newLP2T.x) / 2 / 10,
          y: (newLP1T.y + newLP2T.y) / 2 / 10
        }
      }else {
        let normal = new Types.Vector3({ x: -0, y: 1 })
        for(let value of D2Config.WIDGETS.values()) {
          if (value.getWidgetType() === COMP_TYPES.WALL) {
            if (tool.isVec2Equal(value.normal, normal)) {
              wall = value
            }
          }
          if (value.getWidgetType() === COMP_TYPES.STAIR) {
            stairP = value.position
          }
        }

        // 中心位置计算
        landingPosition = {
          x: (newLP1T.x + newLP2T.x) / 2 / 10,
          y: (newLP1T.y + newLP2T.y) / 2 / 10
        }
      }
      var wallEndExtend = wall.endExtend
      if (wallEndExtend === 240) {
        wallLength =  Math.round(Math.hypot(wall.p1.x - wall.p2.x, wall.p1.y - wall.p2.y)) - 24
      }else {
        wallLength =  Math.round(Math.hypot(wall.p1.x - wall.p2.x, wall.p1.y - wall.p2.y))
      }
      // 标注长度计算
      const landingTextLength =
      Math.round(Math.hypot(lP.x - lNextP.x, lP.y - lNextP.y) )

      const landingLine = new PIXI.Graphics()
      const flightText = new PIXI.Text(landingTextLength, textStyle)
      flightText.scale.set(0.25)
      flightText.position.set(landingPosition.x, landingPosition.y)
      flightText.anchor.set(0.5, 0.5)
      flightText.rotation = this.getRotation(lP, lNextP)
      landingLine
      .lineStyle(1,0x000000, 1, 0.5, true)
      .moveTo(newLP1.x / 10, newLP1.y / 10)
      .lineTo(newLP2.x / 10, newLP2.y / 10)
      .moveTo(newLP1T.x / 10, newLP1T.y / 10)
      .lineTo(newLP1B.x / 10, newLP1B.y / 10)
      .moveTo(newLP2T.x / 10, newLP2T.y / 10)
      .lineTo(newLP2B.x / 10, newLP2B.y / 10)

      if (wallLength === landingTextLength / 10) {
        continue
      }else {
        flightContainer.addChild(landingLine,flightText)
      }
      flightContainer.zIndex = 100
    }


    // 起步止步距离标注
    // 1.获取第一级台阶
    // 2.获取最后一级台阶
    // 3.获取这两级台阶之间的距离
    let isTrue
    if (this.againstWallType === Types.AgainstWallType.aw_no || this.againstWallType === Types.AgainstWallType.aw_left) {
      isTrue = true
    } else {
      isTrue = false
    }
    let firstF = this.flights[0]
    let firstTread = firstF.tread[firstF.tread.length - 1]
    let lastF
    if (this.flights[this.flights.length - 1].treads[0].type === Types.TreadType.tStart) {
      lastF = this.flights[this.flights.length - 2]
    }else {
      lastF = this.flights[this.flights.length - 1]
    }

    let lastTread
    if (stepNumRule === Types.StepNumRule.snr_n_add_1) {
      lastTread = lastF.tread[lastF.tread.length - 2]
    }else if (stepNumRule === Types.StepNumRule.snr_n) {
      lastTread = lastF.tread[lastF.tread.length - 1]
    }
    let firstEdge = d2_tool.translateEdges(firstTread.border.stepOutline.edges[1])
    let lastEdge = d2_tool.translateEdges(lastTread.border.stepOutline.edges[1])
    if (girderType === Types.GirderType.gslab) {
      firstEdge = d2_tool.translateEdges(new Edge(firstTread.border.stepOutline.edges[1]).offset(girderDepth, isTrue))
      lastEdge = d2_tool.translateEdges(new Edge(lastTread.border.stepOutline.edges[1]).offset(girderDepth, isTrue))
    }

    // 中心位置计算
    let firstToEndPosition = {
      x: (firstEdge.p2.x + lastEdge.p1.x) / 2,
      y: (firstEdge.p2.y + firstEdge.p2.y) / 2
    }
    // 标注长度计算
    let firstToEndTextLength =
    Math.round(Math.hypot(firstEdge.p2.x - lastEdge.p1.x) * 10 )
    if (firstToEndTextLength === 0) {
      firstToEndTextLength = ''
    }

    const firstToEndLine = new PIXI.Graphics()
    firstToEndLine.lineStyle(1, 0x000000, 1, 0.5, true)
    firstToEndLine.moveTo(firstEdge.p2.x, firstEdge.p2.y)
    firstToEndLine.lineTo(lastEdge.p1.x, firstEdge.p2.y)

    const firstToEndText = new PIXI.Text(firstToEndTextLength, textStyle)
    firstToEndText.scale.set(0.25)
    firstToEndText.position.set(firstToEndPosition.x,firstToEndPosition.y - arrow.x / 10)
    firstToEndText.anchor.set(0.5, 0.5)
    firstToEndText.rotation = this.getRotation(firstTread.border.stepOutline.edges[0].p1, firstTread.border.stepOutline.edges[0].p2)

    flightContainer.addChild(firstToEndLine, firstToEndText)
    

    this.sprite.addChild(flightContainer)
  }
}
