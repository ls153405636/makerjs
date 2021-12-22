import { Types } from '../types/stair_v2'
import { BaseWidget } from './base_widget'
import d2_tool from './d2_tool'
import wBoth from '../assets/wboth.png'
import wFirst from '../assets/wfirst.png'
import wSecond from '../assets/wsecond.png'
import wNone from '../assets/wboth11.png'
import Victor from 'victor'
import { D2Config, Z_INDEX } from './config'
import { Inlay } from './component/inlay'
import { CementComp } from './component/cement_comp'
import { Core } from '../common/core'
import { Command } from '../common/command'
import { COMP_TYPES } from '../common/common_config'
import { Edge } from '../utils/edge'

export class Wall extends BaseWidget {
  /**
   *
   * @param {Types.Wall} vPB
   */
  constructor(vPB) {
    super(vPB.uuid)
    this.init(vPB)
  }

  // 求旋转
  get rotation() {
    const { p1, p2 } = this
    const orientation = new Victor(p1.x - p2.x, p1.y - p2.y)
    return orientation.angle()
  }

  // 求墙体中心位置
  get position() {
    const { p1, outP1, p2, outP2 } = this
    const innerCenter = {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    }
    const outterCenter = {
      x: (outP1.x + outP2.x) / 2,
      y: (outP1.y + outP2.y) / 2,
    }
    const wallPos = {
      x: (innerCenter.x + outterCenter.x) / 2,
      y: (innerCenter.y + outterCenter.y) / 2,
    }
    return wallPos
  }

  // 求墙体宽度
  get width() {
    const { p1, p2 } = this
    return Math.hypot(p1.x - p2.x, p1.y - p2.y)
  }

  /**重写父类销毁函数 */
  destroy() {
    this.components.forEach((c) => {
      c.destroy()
    })
    this.lineSprite.destroy()
    this.textSprite.destroy()
    this.holeLineSprite.destroy()
    super.destroy()
  }

  /**获取当前组件的类型 */
  getWidgetType() {
    return COMP_TYPES.WALL
  }

  /**
   * 重写父类初始化函数
   * @param {Types.Wall} vPB
   */
  init(vPB) {
    this.sprite = new PIXI.Container()
    this.lineContainer = new PIXI.Container()
    this.holeP1 = d2_tool.translateCoord(vPB.holeEdge.p1)
    this.holeP2 = d2_tool.translateCoord(vPB.holeEdge.p2)
    this.p1 = d2_tool.translateCoord(vPB.edge.p1)
    this.p2 = d2_tool.translateCoord(vPB.edge.p2)
    this.outP1 = d2_tool.translateCoord(vPB.outEdge.p1)
    this.outP2 = d2_tool.translateCoord(vPB.outEdge.p2)
    this.depth = d2_tool.translateValue(vPB.depth)
    this.normal = vPB.normal
    this.type = vPB.type
    this.alpha = 0
    this.holeEdge = vPB.holeEdge
    this.components = []
    this.createComponents(vPB.components)
    this.draw()
    this.addDimension()
    this.addEvent()
  }

  // 墙体绘制
  draw() {
    // 补齐墙缺口
    let wallEdge= new Types.Edge({
      p1: new Types.Vector3({x: this.outP1.x, y: this.outP1.y}),
      p2: new Types.Vector3({x: this.outP2.x, y: this.outP2.y}),
      type: Types.EdgeType.estraight,
    })
    let lVec = new Edge(wallEdge).getVec()
    let wVec = this.normal
    let smallWall = []
    smallWall[0] = wallEdge.p2
    smallWall[1] = new Edge().setByVec(smallWall[0], lVec, this.depth).p2
    smallWall[2] = new Edge().setByVec(smallWall[1], wVec, -this.depth).p2
    smallWall[3] = new Edge().setByVec(smallWall[2], lVec, -this.depth).p2
    smallWall[4] = new Edge().setByVec(smallWall[3], wVec, this.depth).p2
    console.log(smallWall)

    //创建墙体纹理
    var texture = null
    switch (this.type) {
      case Types.WallType.wfirst:
        texture = PIXI.Texture.from(wFirst)
        break
      case Types.WallType.wsecond:
        texture = PIXI.Texture.from(wSecond)
        break
      case Types.WallType.wboth:
        texture = PIXI.Texture.from(wBoth)
        break
      case Types.WallType.wnone:
        texture = PIXI.Texture.from(wNone)
        break
    }
    var tilingSprite = new PIXI.TilingSprite(texture, this.width, this.depth)
    tilingSprite.anchor.set(0.5, 0.5)
    tilingSprite.tileScale.set(0.1) // 纹理缩放
    tilingSprite.rotation = this.rotation
    tilingSprite.position.set(this.position.x, this.position.y)

    // 墙体绘制
    const path = [
      this.p1.x,
      this.p1.y,
      this.p2.x,
      this.p2.y,
      this.outP2.x,
      this.outP2.y,
      this.outP1.x,
      this.outP1.y,
    ]

    let newHoleEdge = new Edge(this.holeEdge).offset(10,true)
    newHoleEdge = new Edge(newHoleEdge).extendP2(20)
    let newHoleEdge1 = d2_tool.translateEdges(newHoleEdge)

    const wallContainer = new PIXI.Container()

    const holeBlackLine = new PIXI.Graphics()
      holeBlackLine
      .lineStyle(2,0x000000, 1)
      .drawPolygon(newHoleEdge1.p1.x, newHoleEdge1.p1.y, newHoleEdge1.p2.x, newHoleEdge1.p2.y)
      this.holeLineSprite = holeBlackLine
      this.holeLineSprite.zIndex = Z_INDEX.HOLE_LINE_ZINDEX

    const wall = new PIXI.Graphics()
    wall.lineStyle(1, 0x929292,1,0,true)
    
    if (this.type === Types.WallType.wfirst) {
      wall.beginFill(0xffffff, 1)
    } else {
      wall.beginFill(0xe5e5e5, 1)
    }
    wall.drawPolygon(path)
    if (Math.hypot(this.holeEdge.p1.x - this.holeEdge.p2.x, this.holeEdge.p1.y - this.holeEdge.p2.y) === Math.hypot(this.p1.x - this.p2.x, this.p1.y - this.p2.y) * 10) {
      let path1 = []
      for (let i = 0; i < smallWall.length; i++) {
        path1.push(smallWall[i].x, smallWall[i].y)
      }
      wall.drawPolygon(path1)
    }else {
      // 
    }
    wall.endFill()

    wall.addChild(tilingSprite)
    wallContainer.addChild(wall)
    wallContainer.zIndex = Z_INDEX.WALL_ZINDEX
    this.sprite.addChild(wallContainer)

  }

  // 取消墙体选中效果
  cancelSelected() {
    this.sprite.children[0].children[0].tint = 0xffffff
    this.isSelected = false
    if (this.type === Types.WallType.wnone) {
      this.sprite.children[0].children[0].alpha = this.alpha
    } else {
      this.sprite.children[0].children[0].alpha = 1
    }
  }
  // 墙体选中效果
  setSelected() {
    this.sprite.children[0].children[0].tint = 0x818796
    this.isSelected = true
    // this.sprite.children[0].children[0].alpha = 1
  }
  // 鼠标进入墙体效果
  setHover() {
    if (!this.isSelected) {
      this.sprite.children[0].children[0].tint = 0x818796
      // this.sprite.children[0].children[0].tint = 0xffffff
      this.sprite.children[0].children[0].alpha = 1
    }
  }
  // 鼠标离开墙体效果
  cancelHover() {
    if (!this.isSelected) {
      this.sprite.children[0].children[0].tint = 0xffffff
      if (this.type === Types.WallType.wnone) {
        this.sprite.children[0].children[0].alpha = this.alpha
      } else {
        this.sprite.children[0].children[0].alpha = 1
      }
    }
  }

  /**
   * 重写父类的添加函数
   * 将墙体添加到画布上时，同时需将墙体附属的结构部件添加到画布上
   */
  addToStage() {
    super.addToStage()
    this.components.forEach((c) => {
      c.addToStage()
    })
  }

  /**
   * 创建隶属于本墙的结构部件
   * @param {Array<Types.Component>} vCompArr
   */
  createComponents(vCompArr) {
    let _this = this
    vCompArr.forEach((c) => {
      if (
        [
          Types.ComponentType.cdoor, // 门
          Types.ComponentType.cwindow, // 窗
          Types.ComponentType.cdoor_hole, // 门洞
        ].includes(c.type)
      ) {
        _this.components.push(new Inlay(c))
      } else if (
        [
          Types.ComponentType.cpillar, // 柱
          Types.ComponentType.cbeam, // 梁
        ].includes(c.type)
      ) {
        _this.components.push(new CementComp(c))
      }
    })
  }

  // 绑定事件
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
            type: COMP_TYPES.WALL,
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
    // 标注线偏移计算
    const { p1, p2, outP1, outP2, depth, normal, holeP1, holeP2 } = this
    const newNormal = new Victor(normal.x, normal.y)
    const offSet = new Victor(69, 69) // 墙体标线偏移距离
    const arrow = new Victor(5, 5)
    const holeLineOffSet = new Victor(83 + this.depth, 83 + this.depth) // 洞口标线偏移距离
    const LineTextoffSet = new Victor(8, 8) // 文字标线偏移距离
    
    newNormal.multiply(offSet)
    const newNormalText = new Victor(normal.x, normal.y).multiply(LineTextoffSet)
    const newNormalHole = new Victor(normal.x, normal.y).multiply(holeLineOffSet)
    const P1 = new Victor(p1.x, p1.y)
    const P2 = new Victor(p2.x, p2.y)
    const OutP1 = new Victor(outP1.x, outP1.y)
    const OutP2 = new Victor(outP2.x, outP2.y)
    const newOutP1 = new Victor(outP1.x, outP1.y)
    const newOutP2 = new Victor(outP2.x, outP2.y)
    let newOutP1T
    let newOutP1B
    let newOutP2T
    let newOutP2B
    const newHoleP1 = new Victor(holeP1.x, holeP1.y)
    const newHoleP2 = new Victor(holeP2.x, holeP2.y)
    
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
    
    let lineCP1
    let lineCP2
    let holeLineCP1
    let holeLineCP2
    let holeLineCP1T
    let holeLineCP1B
    let holeLineCP2T
    let holeLineCP2B
    if (p1.x - p2.x < 0 && p1.y - p2.y == 0 || p1.x - p2.x > 0 && p1.y - p2.y == 0) {
      P1.addY(newNormal)
      P2.addY(newNormal)
      newOutP1.addY(newNormal)
      newOutP2.addY(newNormal)
      newHoleP1.addY(newNormalHole)
      newHoleP2.addY(newNormalHole)

      newOutP1T = newOutP1.clone().subtractY(arrow)
      newOutP1B = newOutP1.clone().addY(arrow)
      newOutP2T = newOutP2.clone().subtractY(arrow)
      newOutP2B = newOutP2.clone().addY(arrow)

      lineCP1 = newOutP1.clone().addY(newNormalText)
      lineCP2 = newOutP2.clone().addY(newNormalText)
      holeLineCP1 = newHoleP1.clone().addY(newNormalText)
      holeLineCP2 = newHoleP2.clone().addY(newNormalText)

      holeLineCP1T = newHoleP1.clone().subtractY(arrow)
      holeLineCP1B = newHoleP1.clone().addY(arrow)
      holeLineCP2T = newHoleP2.clone().subtractY(arrow)
      holeLineCP2B = newHoleP2.clone().addY(arrow)
    }
    if (p1.x - p2.x < 0 && p1.y - p2.y < 0 || p1.x - p2.x > 0 && p1.y - p2.y > 0 ||p1.x - p2.x < 0 && p1.y - p2.y > 0) {
      P1.add(newNormal)
      P2.add(newNormal)
      newOutP1.add(newNormal)
      newOutP2.add(newNormal)
      newHoleP1.add(newNormalHole)
      newHoleP2.add(newNormalHole)

      newOutP1T = newOutP1.clone().subtract(arrow)
      newOutP1B = newOutP1.clone().add(arrow)
      newOutP2T = newOutP2.clone().subtract(arrow)
      newOutP2B = newOutP2.clone().add(arrow)

      lineCP1 = newOutP1.clone().add(newNormalText)
      lineCP2 = newOutP2.clone().add(newNormalText)
      holeLineCP1 = newHoleP1.clone().add(newNormalText)
      holeLineCP2 = newHoleP2.clone().add(newNormalText)

      holeLineCP1T = newHoleP1.clone().subtract(arrow)
      holeLineCP1B = newHoleP1.clone().add(arrow)
      holeLineCP2T = newHoleP2.clone().subtract(arrow)
      holeLineCP2B = newHoleP2.clone().add(arrow)
    }
    if (p1.x - p2.x == 0 && p1.y - p2.y > 0 || p1.x - p2.x == 0 && p1.y - p2.y < 0) {
      P1.addX(newNormal)
      P2.addX(newNormal)
      newOutP1.addX(newNormal)
      newOutP2.addX(newNormal)
      newHoleP1.addX(newNormalHole)
      newHoleP2.addX(newNormalHole)

      newOutP1T = newOutP1.clone().subtractX(arrow)
      newOutP1B = newOutP1.clone().addX(arrow)
      newOutP2T = newOutP2.clone().subtractX(arrow)
      newOutP2B = newOutP2.clone().addX(arrow)

      lineCP1 = newOutP1.clone().addX(newNormalText)
      lineCP2 = newOutP2.clone().addX(newNormalText)
      holeLineCP1 = newHoleP1.clone().addX(newNormalText)
      holeLineCP2 = newHoleP2.clone().addX(newNormalText)

      holeLineCP1T = newHoleP1.clone().subtractX(arrow)
      holeLineCP1B = newHoleP1.clone().addX(arrow)
      holeLineCP2T = newHoleP2.clone().subtractX(arrow)
      holeLineCP2B = newHoleP2.clone().addX(arrow)
    }
    
    // 获取标注线长度
    const linelength =
      Math.round(Math.hypot(P1.x - P2.x, P1.y - P2.y) * 10 * 100) / 100

    const holeLinelength =
      Math.round(Math.hypot(holeP1.x - holeP2.x, holeP1.y - holeP2.y) * 10 * 100) / 100
    
    // 计算标注线中心位置
    const linePos = new Victor((lineCP1.x + lineCP2.x) / 2,(lineCP1.y + lineCP2.y) / 2)
    const holeLinePos = new Victor((holeLineCP1.x + holeLineCP2.x) / 2,(holeLineCP1.y + holeLineCP2.y) / 2)

    // 标注线绘制
    

    // 判断洞口边长是否等于墙体边长（不相等或墙消失，让洞口标线显示）
    if (this.type === Types.WallType.wnone || Math.hypot(newHoleP1.x - newHoleP2.x, newHoleP1.y - newHoleP2.y) !== Math.hypot(P1.x - P2.x, P1.y - P2.y)) {
      // 洞口标注文字
      const holeLineText = new PIXI.Text('洞口' + holeLinelength, {
        fontSize: 48,
        fill: 0x2d3037,
      })
      holeLineText.scale.set(0.25)
      holeLineText.anchor.set(0.5, 0.5)
      holeLineText.position.set(holeLinePos.x, holeLinePos.y)
      holeLineText.rotation = newTextRotation

      const holeLine = new PIXI.Graphics()
      // 洞口标线
      holeLine
      .lineStyle(1, 0x000000, 1, 0.5, true)

      .moveTo(newHoleP1.x, newHoleP1.y)
      .lineTo(newHoleP2.x, newHoleP2.y)

      .moveTo(holeLineCP1T.x, holeLineCP1T.y)
      .lineTo(holeLineCP1B.x, holeLineCP1B.y)
      .moveTo(holeLineCP2T.x, holeLineCP2T.y)
      .lineTo(holeLineCP2B.x, holeLineCP2B.y)
      this.lineContainer.addChild(holeLineText, holeLine)
    }else {
      newHoleP1.multiply(new Victor(0,0)) // 洞口标注点清零
      newHoleP2.multiply(new Victor(0,0))
      const holeLineText = new PIXI.Text('', {
        fontSize: 48,
        fill: 0x2d3037,
      })
      this.lineContainer.addChild(holeLineText)
    }
    // 当墙体两层皆无时，无标注
    if (this.type === Types.WallType.wnone) {
      // 墙体标注线消失
      OutP1.multiply(new Victor(0,0))
      OutP2.multiply(new Victor(0,0))
      lineCP1.multiply(new Victor(0,0))
      lineCP2.multiply(new Victor(0,0))
      newOutP1.multiply(new Victor(0,0))
      newOutP2.multiply(new Victor(0,0))

      newOutP1T.multiply(new Victor(0,0))
      newOutP1B.multiply(new Victor(0,0))
      newOutP2T.multiply(new Victor(0,0))
      newOutP2B.multiply(new Victor(0,0))
      // 标注文字添加
      // 墙体标注文字
      const lineText = new PIXI.Text('', {
        fontSize: 48,
        fill: 0x000000,
      })
      this.textSprite = lineText
    }else {
      // 标注文字添加
      // 墙体标注文字
      const lineText = new PIXI.Text(linelength, {
        fontSize: 48,
        fill: 0x2d3037,
      })
      lineText.scale.set(0.25)
      lineText.anchor.set(0.5, 0.5)
      lineText.position.set(linePos.x, linePos.y)
      lineText.rotation = newTextRotation
      this.textSprite = lineText
    }
    // 墙体标注线绘制
    const wallLine = new PIXI.Graphics()
    wallLine
      .lineStyle(1, 0x000000, 1, 0.5, true)

      .moveTo(newOutP1T.x, newOutP1T.y)
      .lineTo(newOutP1B.x, newOutP1B.y)
      .moveTo(newOutP2T.x, newOutP2T.y)
      .lineTo(newOutP2B.x, newOutP2B.y)
      .moveTo(newOutP1.x,newOutP1.y)
      .lineTo(newOutP2.x, newOutP2.y)
    
    this.lineContainer.addChild(wallLine)
    
    this.lineSprite = this.lineContainer
    this.lineSprite.zIndex = 100
    
  }
}
