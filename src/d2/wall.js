// import { Graphics } from "../../public/pixi/pixi";
// import { initProj } from '../init_temp'
import { Types } from '../types/stair_v2'
import { BaseWidget } from './base_widget'
import d2_tool from './d2_tool'
import catUrl from '../assets/cat.png'
import Victor from 'victor'
import { Movie } from './movie'
import { D2Config } from './config'
import { Inlay } from './component/inlay'
import { CementComp } from './component/cement_comp'

export class Wall extends BaseWidget {
  /**
   *
   * @param {Types.Wall} vPB
   */
  constructor(vPB) {
    super()
    this.iSelected = false
    this.p1 = d2_tool.translateCoord(vPB.edge.p1)
    this.p2 = d2_tool.translateCoord(vPB.edge.p2)

    this.outP1 = d2_tool.translateCoord(vPB.outEdge.p1)
    this.outP2 = d2_tool.translateCoord(vPB.outEdge.p2)
    this.depth = d2_tool.translateValue(vPB.depth)
    this.normal = vPB.normal
    this.components = []
    this.createComponents(vPB.components)
    this.draw()
    this.addEvent()
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

  // 墙体绘制
  draw() {
    const wall = new PIXI.Graphics()
    wall.lineStyle(1, 0x000000)
    wall.beginFill(0xffffff, 1)
    wall.alpha = 1

    // 标注线偏移计算
    const { p1, p2, outP1, outP2, depth, normal } = this
    const newNormal = new Victor(normal.x, normal.y)
    const offset = new Victor(depth * 2, depth * 2)
    newNormal.multiply(offset)
    const newP1 = new Victor(p1.x, p1.y)
    const newP2 = new Victor(p2.x, p2.y)
    const newOutP1 = new Victor(outP1.x, outP1.y)
    const newOouP2 = new Victor(outP2.x, outP2.y)

    if (p1.x - p2.x < 0) {
      newP1.addY(newNormal)
      newP2.addY(newNormal)
      newOutP1.addY(newNormal)
      newOouP2.addY(newNormal)
      if (p1.y - p2.y < 0) {
        newP1.addX(newNormal)
        newP2.addX(newNormal)
        newOutP1.addX(newNormal)
        newOouP2.addX(newNormal)
      }
    } else if (p1.y - p2.y < 0) {
      newP1.addX(newNormal)
      newP2.addX(newNormal)
      newOutP1.addX(newNormal)
      newOouP2.addX(newNormal)
    } else if (p1.x - p2.x > 0) {
      newP1.addY(newNormal)
      newP2.addY(newNormal)
      newOutP1.addY(newNormal)
      newOouP2.addY(newNormal)
      if (p1.y - p2.y > 0) {
        newP1.subtractX(newNormal)
        newP2.subtractX(newNormal)
        newOutP1.subtractX(newNormal)
        newOouP2.subtractX(newNormal)
      }
    } else if (p1.y - p2.y > 0) {
      newP1.addX(newNormal)
      newP2.addX(newNormal)
      newOutP1.addX(newNormal)
      newOouP2.addX(newNormal)
    }

    // 获取标注线长度
    const linelength = Math.hypot(newP1.x - newP2.x, newP1.y - newP2.y) * 10

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

    // 标注线绘制
    const line = new PIXI.Graphics()
    const lPath = [newP1.x, newP1.y, newP2.x, newP2.y]
    line.lineStyle(1, 0x333333, 1)
    line.position.set()
    line.drawPolygon(lPath)
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
    wall.endFill()

    //创建纹理
    var texture = PIXI.Texture.from(catUrl)
    var tilingSprite = new PIXI.TilingSprite(texture, this.width, this.depth)

    tilingSprite.anchor.set(0.5, 0.5)
    tilingSprite.tileScale.set(0.55) // 纹理缩放
    tilingSprite.rotation = this.rotation
    tilingSprite.position.set(this.position.x, this.position.y)
    wall.addChild(tilingSprite)

    // 标注文字添加
    const lineText = new PIXI.Text(linelength, { fontSize: 12, fill: 0x333333 })
    lineText.position.set(
      linePos.x - lineText.width / 2,
      linePos.y - lineText.height / 2
    )

    this.sprite = wall
    this.lineSprite = line
    this.textSprite = lineText

    // // 绘制圆形
  }

  // 取消墙体选中效果
  cancelSelected() {
    this.sprite.tint = 0xffffff
    this.iSelected = false
  }

  setSelected() {
    this.sprite.tint = 0x6e9aff
    this.sprite.alpha = 1
    this.iSelected = true
  }

  setHover() {
    if (!this.iSelected) {
      this.sprite.tint = 0x6e8aff
      this.sprite.alpha = 0.5
    }
  }

  cancelHover() {
    if (!this.iSelected) {
      this.sprite.tint = 0xffffff
      this.sprite.alpha = 1
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
          Types.ComponentType.cdoor,
          Types.ComponentType.cwindow,
          Types.ComponentType.cdoor_hole,
        ].includes(c.type)
      ) {
        _this.components.push(new Inlay(c))
      } else if (
        [Types.ComponentType.cpillar, Types.ComponentType.cbeam].includes(c)
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
        if (this.iSelected) {
          return
        }
        if (D2Config.SELECTED) {
          D2Config.SELECTED.cancelSelected()
        }
        _this.setSelected()
        D2Config.SELECTED = this
      })
      .on('mouseout', () => {
        _this.cancelHover()
      })
      .on('mouseover', () => {
        _this.setHover()
      })
  }
}
