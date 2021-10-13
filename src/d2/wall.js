// import { Graphics } from "../../public/pixi/pixi";
// import { initProj } from '../init_temp'
// import { Types } from "../types/stair_v2";
import { BaseWidget } from './base_widget'
import d2_tool from './d2_tool'
import catUrl from '../assets/cat.png'
import Victor from 'victor'

export class Wall extends BaseWidget {
  /**
   *
   * @param {Types.Wall} vPB
   */
  constructor(vPB) {
    super()
    this.iSeleted = false
    this.p1 = d2_tool.translateCoord(vPB.edge.p1)
    this.p2 = d2_tool.translateCoord(vPB.edge.p2)
    // console.log(this.p1,this.p2)
    this.outP1 = d2_tool.translateCoord(vPB.outEdge.p1)
    this.outP2 = d2_tool.translateCoord(vPB.outEdge.p2)
    this.depth = d2_tool.translateValue(vPB.depth)
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
    let wall = new PIXI.Graphics()
    wall.lineStyle(1, 0x000000)
    wall.beginFill(0xffffff, 1)
    wall.alpha = 1
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
    tilingSprite.rotation = this.rotation
    tilingSprite.position.set(this.position.x, this.position.y)
    wall.addChild(tilingSprite)

    this.sprite = wall
  }
  // 绑定事件
  addEvent() {
    this.sprite.interactive = true
    this.sprite
      .on('mouseover', () => {
        if (this.iSeleted) {
          this.sprite.alpha = 1
        } else {
          this.sprite.alpha = 0.5
        }
      })
      .on('mouseout', () => {
        this.sprite.alpha = 1
      })
      .on('mousedown', () => {
        if (!this.iSeleted) {
          this.sprite.tint = 0xff88ff
          this.iSeleted = true
        } else {
          this.sprite.tint = 0xffffff
          this.iSeleted = false
        }
      })
  }
}
