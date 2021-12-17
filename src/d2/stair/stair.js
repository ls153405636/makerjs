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
    this.addDimension()
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

  addDimension() {
    let stairInfo = StructConfig.INFOS.get(this.uuid)
    const flightContainer = new PIXI.Container()
    let depth = stairInfo.depth ? stairInfo.depth : stairInfo.depth1
    let width = stairInfo.width
    let landingWidth = new Victor(width,width)
    let firstDepth = new Victor(depth,depth)
    const offSet = new Victor(400,400)
    const arrow = new Victor(50,50)
    // console.log(stairInfo)
    
    // 获取第一级踏步
    let wallLength
    for (let i = 0; i < stairInfo.flights.length; i++) {
      let tread = stairInfo.flights[0].treads
      let e = stairInfo.flights[0].treads[0].border.stepOutline
      let isClock = e.isClock
      let stairtE = stairInfo.flights[stairInfo.flights.length - 1].treads[0].border.stepOutline
      let type = stairInfo.flights[0].treads[0].type
      let stairtType = stairInfo.flights[stairInfo.flights.length - 1].treads[0].type
      let p
      let nextP

      if (type === 1) {
        p = new Victor((e.edges[2].p1.x + e.edges[2].p2.x) / 2, (e.edges[2].p1.y + e.edges[2].p2.y) / 2)
        nextP = p.clone().subtractY(firstDepth)
        // console.log(p)
        // console.log(nextP)
      }
      if (stairtType === Types.TreadType.tStart && stairtE.edges.length === 5) {
        p = new Victor((stairtE.edges[0].p1.x + stairtE.edges[0].p2.x) / 2, stairtE.edges[3].p1.y)
        nextP = p.clone().subtractY(firstDepth).subtractY(new Victor(0, stairtE.edges[3].p1.y - stairtE.edges[0].p1.y))
        // console.log(p)
        // console.log(nextP)
      }
      if (stairtType === Types.TreadType.tStart && stairtE.edges.length === 4) {
        p = new Victor((stairtE.edges[2].p1.x + stairtE.edges[2].p2.x) / 2, (stairtE.edges[2].p1.y + stairtE.edges[2].p2.y) / 2)
        nextP = p.clone().subtractY(firstDepth).subtractY(new Victor(0, stairtE.edges[2].p1.y - stairtE.edges[0].p1.y))
        // console.log(p)
        // console.log(nextP)
      }

      let wall = null
      let stairP = null
      let stepLength = stairInfo.width
      let newP1
      let newP2
      let newP1T
      let newP1B
      let newP2T
      let newP2B

      let flightPosition

      
      
      if (isClock) {
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
        // console.log(stairP)
        // console.log(wall.outP1)
        // console.log(wall.outP2)
        wallLength =  Math.round(Math.hypot(wall.p1.x - wall.p2.x, wall.p1.y - wall.p2.y))

        let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)
        // console.log(wallOutP1)
        newP1 = new Victor(wallOutP1.x * 10, p.y)
        newP2 = new Victor(wallOutP1.x * 10, nextP.y)

        newP1 = newP1.subtractX(offSet)
        newP2 = newP2.subtractX(offSet)
        newP1T = newP1.clone().subtractX(arrow)
        newP1B = newP1.clone().addX(arrow)
        newP2T = newP2.clone().subtractX(arrow)
        newP2B = newP2.clone().addX(arrow)
        // console.log(newP1)
        // console.log(newP2)

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
        wallLength =  Math.round(Math.hypot(wall.p1.x - wall.p2.x, wall.p1.y - wall.p2.y))
        // console.log(stairP)
        // console.log(wall.outP1)
        // console.log(wall.p1)

        let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)
        // console.log(wallOutP1)
        newP1 = new Victor(wallOutP1.x * 10, p.y)
        newP2 = new Victor(wallOutP1.x * 10, nextP.y)

        newP1 = newP1.addX(offSet)
        newP2 = newP2.addX(offSet)
        newP1T = newP1.clone().subtractX(arrow)
        newP1B = newP1.clone().addX(arrow)
        newP2T = newP2.clone().subtractX(arrow)
        newP2B = newP2.clone().addX(arrow)
        // console.log(newP1)
        // console.log(newP2)

        // 中心位置计算
        flightPosition = {
        x: (newP1B.x + newP2B.x) / 2 / 10,
        y: (newP1B.y + newP2B.y) / 2 / 10
      }
      }

      // 标注长度计算
      const flightTextLength =
      Math.round(Math.hypot(p.x - nextP.x, p.y - nextP.y) )

      // 旋转计算
      let newTextRotation = ''
      const textRotation = new Victor(p.x - nextP.x, p.y - nextP.y)
      const textAngle = textRotation.angle()
      if (isClock) {
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
      

      const flightLine = new PIXI.Graphics()
      const flightText = new PIXI.Text(flightTextLength, {
        fontSize: 36,
        fill: 0x000000
      })

      flightText.scale.set(0.25)
      flightText.position.set(flightPosition.x, flightPosition.y)
      flightText.anchor.set(0.5, 0.5)
      flightText.rotation = newTextRotation

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
      let lTread = stairInfo.landings[0].treads
      let e = stairInfo.landings[0].treads[0].border.stepOutline
      // console.log(e)
      let fLangdingLength = new Victor((e.edges[0].p2.x + e.edges[0].p1.x) / 2, 0)
      let isClock = e.isClock
      let lP = new Victor((e.edges[0].p1.x + e.edges[0].p2.x) / 2, e.edges[0].p1.y).subtractX(fLangdingLength)
      let lNextP = lP.clone().addX(landingWidth)
      // console.log(lP)
      // console.log(lNextP)

      let wall = null
      let stairP = null
      let stepLength = stairInfo.width
      let newLP1
      let newLP2
      let newLP1T
      let newLP1B
      let newLP2T
      let newLP2B
      let landingPosition

      if (isClock) {
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
        wallLength =  Math.round(Math.hypot(wall.p1.x - wall.p2.x, wall.p1.y - wall.p2.y))

        let wallOutP1 = new Victor(wall.outP1.x - stairP.x,wall.outP1.y - stairP.y)
        // console.log(wallOutP1)

        // 左侧
        newLP1 = new Victor(lP.x, wallOutP1.y * 10)
        newLP2 = new Victor(lNextP.x, wallOutP1.y * 10)
        // console.log(newLP1)
        // console.log(newLP2)

        newLP1 = newLP1.subtractY(offSet)
        newLP2 = newLP2.subtractY(offSet)
        newLP1T = newLP1.clone().subtractY(arrow)
        newLP1B = newLP1.clone().addY(arrow)
        newLP2T = newLP2.clone().subtractY(arrow)
        newLP2B = newLP2.clone().addY(arrow)



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
        wallLength =  Math.round(Math.hypot(wall.p1.x - wall.p2.x, wall.p1.y - wall.p2.y))
      }

      // 标注长度计算
      const landingTextLength =
      Math.round(Math.hypot(lP.x - lNextP.x, lP.y - lNextP.y) )

      // 旋转计算
      let newTextRotation = ''
      const textRotation = new Victor(lP.x - lNextP.x, lP.y - lNextP.y)
      const textAngle = textRotation.angle()
      if (isClock) {
        if (textAngle == Math.PI || textAngle == 0 || textAngle == -Math.PI) {
          newTextRotation = 0
        } else if (0 < textAngle < Math.PI) {
          newTextRotation = textRotation.invert().angle()
        } else if (0 > textAngle > -Math.PI) {
          newTextRotation = textRotation.angle()
        }
        // 中心位置计算
        landingPosition = {
          x: (newLP1T.x + newLP2T.x) / 2 / 10,
          y: (newLP1T.y + newLP2T.y) / 2 / 10
        }

      } else {
        if (textAngle == Math.PI || textAngle == 0 || textAngle == -Math.PI) {
          newTextRotation = 0
        } else if (0 < textAngle < Math.PI) {
          newTextRotation = textRotation.angle()
        } else if (0 > textAngle > -Math.PI) {
          newTextRotation = textRotation.invert().angle()
        }

        // 中心位置计算
        landingPosition = {
          x: (newLP1T.x + newLP2T.x) / 2 / 10,
          y: (newLP1T.y + newLP2T.y) / 2 / 10
        }
      }

      const landingLine = new PIXI.Graphics()
      const flightText = new PIXI.Text(landingTextLength, {
        fontSize: 36,
        fill: 0x000000
      })
      flightText.scale.set(0.25)
      flightText.position.set(landingPosition.x, landingPosition.y)
      flightText.anchor.set(0.5, 0.5)
      flightText.rotation = newTextRotation
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




    this.sprite.addChild(flightContainer)
  }
}
