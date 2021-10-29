import { Types } from '../types/stair_v2'
import { BaseWidget } from './base_widget'
import d2_tool from './d2_tool'
import wBoth from '../assets/wboth.png'
import wFirst from '../assets/wfirst.png'
import wSecond from '../assets/wsecond.png'
import wNone from '../assets/wboth11.png'
import Victor from 'victor'
import { D2Config } from './config'
import { Inlay } from './component/inlay'
import { CementComp } from './component/cement_comp'
import { Core } from '../common/core'
import { Command } from '../common/command'
import { COMP_TYPES } from '../common/common_config'

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

  destroy () {
    this.components.forEach(c => {
      c.destroy()
    })
    super.destroy()
  }

  init (vPB) {
    this.p1 = d2_tool.translateCoord(vPB.edge.p1)
    this.p2 = d2_tool.translateCoord(vPB.edge.p2)
    this.outP1 = d2_tool.translateCoord(vPB.outEdge.p1)
    this.outP2 = d2_tool.translateCoord(vPB.outEdge.p2)
    this.depth = d2_tool.translateValue(vPB.depth)
    this.normal = vPB.normal
    this.type = vPB.type
    this.alpha = 0
    this.components = []
    this.createComponents(vPB.components)
    this.draw()
    this.addEvent()
  }

  // 墙体绘制
  draw() {
    // 标注线偏移计算
    const { p1, p2, outP1, outP2, depth, normal } = this
    const newNormal = new Victor(normal.x, normal.y)
    const offset = new Victor(depth * 3, depth * 3)
    newNormal.multiply(offset)
    const newP1 = new Victor(p1.x, p1.y)
    const newP2 = new Victor(p2.x, p2.y)
    const newOutP1 = new Victor(outP1.x, outP1.y)
    const newOouP2 = new Victor(outP2.x, outP2.y)

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

    if (p1.x - p2.x < 0 && p1.y - p2.y == 0) {
      newP1.addY(newNormal)
      newP2.addY(newNormal)
      newOutP1.addY(newNormal)
      newOouP2.addY(newNormal)
    }
    if (p1.x - p2.x < 0 && p1.y - p2.y < 0) {
      newP1.add(newNormal)
      newP2.add(newNormal)
      newOutP1.add(newNormal)
      newOouP2.add(newNormal)
    }
    if (p1.x - p2.x > 0 && p1.y - p2.y > 0) {
      newP1.add(newNormal)
      newP2.add(newNormal)
      newOutP1.add(newNormal)
      newOouP2.add(newNormal)
    }
    if (p1.x - p2.x > 0 && p1.y - p2.y == 0) {
      newP1.addY(newNormal)
      newP2.addY(newNormal)
      newOutP1.addY(newNormal)
      newOouP2.addY(newNormal)
    }
    if (p1.x - p2.x == 0 && p1.y - p2.y > 0) {
      newP1.addX(newNormal)
      newP2.addX(newNormal)
      newOutP1.addX(newNormal)
      newOouP2.addX(newNormal)
    }
    if (p1.x - p2.x < 0 && p1.y - p2.y > 0) {
      newP1.add(newNormal)
      newP2.add(newNormal)
      newOutP1.add(newNormal)
      newOouP2.add(newNormal)
    }
    if (p1.x - p2.x == 0 && p1.y - p2.y < 0) {
      newP1.addX(newNormal)
      newP2.addX(newNormal)
      newOutP1.addX(newNormal)
      newOouP2.addX(newNormal)
    }

    // 获取标注线长度
    const linelength =
      Math.floor(Math.hypot(newP1.x - newP2.x, newP1.y - newP2.y) * 10 * 100) /
      100

    // 计算标注线中心位置
    const innerlineCenter = {
      x: (newP1.x + newP2.x) / 2,
      y: (newP1.y + newP2.y) / 2,
    }
    const outterlineCenter = {
      x: (newOutP1.x + newOouP2.x) / 2,
      y: (newOutP1.y + newOouP2.y) / 2,
    }
    const linePos = {
      x: (innerlineCenter.x + outterlineCenter.x) / 2,
      y: (innerlineCenter.y + outterlineCenter.y) / 2,
    }

    //创建墙体纹理
    var texture = null
    switch (this.type) {
      case 1:
        texture = PIXI.Texture.from(wFirst)
        break
      case 2:
        texture = PIXI.Texture.from(wSecond)
        break
      case 3:
        texture = PIXI.Texture.from(wBoth)
        break
      case 4:
        texture = PIXI.Texture.from(wNone)
        break
    }
    var tilingSprite = new PIXI.TilingSprite(texture, this.width, this.depth)
    tilingSprite.anchor.set(0.5, 0.5)
    tilingSprite.tileScale.set(0.1) // 纹理缩放
    tilingSprite.rotation = this.rotation
    tilingSprite.position.set(this.position.x, this.position.y)

    // 墙体绘制
    const wall = new PIXI.Graphics()
    wall.lineStyle(1, 0x929292)
    wall.beginFill(0xe5e5e5, 1)
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
    wall.drawPolygon(path)
    if (this.type === 4) {
      wall.alpha = this.alpha
    }
    wall.endFill()
    wall.addChild(tilingSprite)

    // 标注线绘制
    const lineContainer = new PIXI.Container()
    // 标注线左右端线绘制
    const dobuleLineLeft = new PIXI.Graphics()
    dobuleLineLeft
      .lineStyle(2, 0x2d3037, 1)
      .moveTo(this.p1.x, this.p1.y)
      .lineTo(newOutP1.x, newOutP1.y)

    const dobuleLineRight = new PIXI.Graphics()
    dobuleLineRight
      .lineStyle(2, 0x2d3037, 1)
      .moveTo(this.p2.x, this.p2.y)
      .lineTo(newOouP2.x, newOouP2.y)

    const line = new PIXI.Graphics()
    const lPath = [newP1.x, newP1.y, newP2.x, newP2.y]
    line.position.set()
    line.lineStyle(1, 0x2d3037, 1)
    line.drawPolygon(lPath)

    // 标注文字添加
    const lineText = new PIXI.Text(linelength, {
      fontSize: 72,
      fill: 0x2d3037,
    })
    lineText.scale.set(0.25)
    lineText.anchor.set(0.375, 0.5)
    lineText.position.set(linePos.x, linePos.y)
    lineText.pivot.set(lineText.width / 2, lineText.height / 2)
    lineText.rotation = newTextRotation

    lineContainer.addChild(dobuleLineLeft, dobuleLineRight, line)
    this.sprite = wall
    this.lineSprite = lineContainer
    this.textSprite = lineText
  }

  // 取消墙体选中效果
  cancelSelected() {
    this.sprite.tint = 0xffffff
    this.isSelected = false
    if (this.type === 4) {
      this.sprite.alpha = this.alpha
    } else {
      this.sprite.alpha = 1
    }
  }
  // 墙体选中效果
  setSelected() {
    this.sprite.tint = 0x818796
    this.isSelected = true
    this.sprite.alpha = 1
  }
  // 鼠标进入墙体效果
  setHover() {
    if (!this.isSelected) {
      this.sprite.tint = 0x818796
      this.sprite.alpha = 1
    }
  }
  // 鼠标离开墙体效果
  cancelHover() {
    if (!this.isSelected) {
      this.sprite.tint = 0xffffff
      if (this.type === 4) {
        this.sprite.alpha = this.alpha
      } else {
        this.sprite.alpha = 1
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
}
