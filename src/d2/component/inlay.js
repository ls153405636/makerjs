import { Types } from '../../types/stair_v2'
import { BaseWidget } from '../base_widget'
import d2_tool from '../d2_tool'
import { D2Config, Z_INDEX } from '../config'
import { Core } from '../../common/core'
import { Command } from '../../common/command'
import { COMP_TYPES } from '../../common/common_config'
import Victor from 'victor'
// import Victor from 'victor'

/**
 * 门窗门洞，内嵌入墙体的结构部件
 */
export class Inlay extends BaseWidget {
  /**
   *
   * @param {Types.Component} vPB
   */
  constructor(vPB) {
    super(vPB.uuid)
    this.init(vPB)
  }

  getWidgetType() {
    return COMP_TYPES.INLAY
  }

  init(vPB) {
    this.sprite = new PIXI.Container()
    this.type = vPB.type
    this.width = d2_tool.translateValue(vPB.width)
    this.depth = d2_tool.translateValue(vPB.depth)
    this.positionX = d2_tool.translateValue(vPB.position.x)
    this.positionY = d2_tool.translateValue(vPB.position.y)
    this.rotationY = vPB.rotation.y
    this.draw()
    this.addDimension()
    this.addEvent()
  }

  /**
   * 建议方法，根据宽深属性绘制矩形，然后设置位置和角度
   */

  draw() {
    const inlayContainer = new PIXI.Container()

    let changeInlayOut = new PIXI.Graphics()
    changeInlayOut.visible = false
    changeInlayOut.lineStyle(1, 0x4478f4,1,0,false)
    changeInlayOut.beginFill(0xffffff, 1)
    changeInlayOut.drawRect(
      -this.width / 2,
      -this.depth / 2,
      this.width,
      this.depth
    )
    changeInlayOut.endFill()
    changeInlayOut.position.set(this.positionX, this.positionY)
    changeInlayOut.pivot.set(0, 0)
    changeInlayOut.rotation = this.rotationY

    let inlayOut = new PIXI.Graphics()
    inlayOut.lineStyle(1, 0x000000,1,0,true)
    inlayOut.beginFill(0xffffff, 1)
    inlayOut.drawRect(-this.width / 2, -this.depth / 2, this.width, this.depth)
    inlayOut.endFill()
    inlayOut.position.set(this.positionX, this.positionY)
    inlayOut.pivot.set(0, 0)
    inlayOut.rotation = this.rotationY

    // 根据 type 获取名称
    var textWord = ''
    switch (this.type) {
      case 1: // 门
        textWord = '门'
        break
      case 2: // 窗
        textWord = '窗'
        break
      case 3: // 洞
        textWord = '洞'
        break
    }
    let text = new PIXI.Text(textWord, { fontSize: 48, fill: 0x000000 })
    text.scale.set(0.25)
    text.position.set(
      this.positionX - text.width / 2,
      this.positionY - text.height / 2
    )
    text.pivot.set(0, 0)

    inlayContainer.addChild(changeInlayOut, inlayOut, text)
    inlayContainer.zIndex = Z_INDEX.COMPONENT_ZINDEX
    // this.sprite = inlayContainer
    this.sprite.addChild(inlayContainer)
  }

  getSprite() {
    return this.sprite
  }

  // 取消 inlay 选中效果
  cancelSelected() {
    this.sprite.children[0].children[0].visible = false
    this.sprite.children[0].children[1].visible = true
    this.isSelected = false
  }
  //  inlay 选中效果
  setSelected() {
    this.sprite.children[0].children[0].visible = true
    this.sprite.children[0].children[1].visible = false
    this.isSelected = true
  }
  // 鼠标进入 inlay 效果
  setHover() {
    if (!this.isSelected) {
      this.sprite.children[0].children[0].visible = true
      this.sprite.children[0].children[1].visible = false
    }
  }
  // 鼠标离开 inlay 效果
  cancelHover() {
    if (!this.isSelected) {
      this.sprite.children[0].children[0].visible = false
      this.sprite.children[0].children[1].visible = true
    }
  }

  addEvent() {
    this.sprite.children[0].interactive = true
    let _this = this
    this.sprite.children[0]
      .on('mousedown', (event) => {
        event.stopPropagation()
        if (this.isSelected) {
          return
        }
        let core = new Core()
        core.execute(
          new Command(core.cmds.SelecteCmd, {
            uuid: this.uuid,
            type: COMP_TYPES.INLAY,
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
    // 标注线绘制

    // 标注线点计算
    const { positionX, positionY, rotationY, disToStart } = this
    const offSet = new Victor(10, 10) // 偏移距离

    const p1 = new Victor(-this.width / 2, this.depth / 2)
    const p2 = new Victor(this.width / 2, this.depth / 2)
    const p3 = new Victor(this.width / 2, -this.depth / 2)
    const p4 = new Victor(this.width / 2, this.depth / 2)

    const p5 = new Victor(-this.width / 2, -this.depth / 2)
    const p6 = new Victor(-this.width / 2, -this.depth / 2).subtractX(
      new Victor(disToStart / D2Config.SCREEN_RATE, 0)
    )

    const newP1 = p1.addY(offSet)
    const newP2 = p2.addY(offSet)

    const newP3 = p3.addX(offSet)
    const newP4 = p4.addX(offSet)

    const newP5 = p5.addY(offSet)
    const newP6 = p6.addY(offSet)

    const newP1T = new Victor(newP1.x, newP1.y).subtractY(new Victor(2, 2))
    const newP1B = new Victor(newP1.x, newP1.y).addY(new Victor(2, 2))
    const newP2T = new Victor(newP2.x, newP2.y).subtractY(new Victor(2, 2))
    const newP2B = new Victor(newP2.x, newP2.y).addY(new Victor(2, 2))

    const newP3T = new Victor(newP3.x, newP3.y).subtractX(new Victor(2, 2))
    const newP3B = new Victor(newP3.x, newP3.y).addX(new Victor(2, 2))
    const newP4T = new Victor(newP4.x, newP4.y).subtractX(new Victor(2, 2))
    const newP4B = new Victor(newP4.x, newP4.y).addX(new Victor(2, 2))

    let newP5T = 0
    let newP5B = 0
    let newP6T = 0
    let newP6B = 0
    if (disToStart !== 0) {
      newP5T = new Victor(newP5.x, newP5.y).subtract(new Victor(2, 2))
      newP5B = new Victor(newP5.x, newP5.y)
        .subtractX(new Victor(2, 2))
        .addY(new Victor(2, 2))
      newP6T = new Victor(newP6.x, newP6.y)
        .subtractY(new Victor(2, 2))
        .addX(new Victor(2, 2))
      newP6B = new Victor(newP6.x, newP6.y).add(new Victor(2, 2))
    }

    // 文字旋转角度
    let newRoationY = rotationY
    if (rotationY > 0 && rotationY <= Math.PI / 2) {
      newRoationY = rotationY - Math.PI / 2
    }
    if (rotationY > Math.PI && rotationY <= (Math.PI / 2) * 3) {
      newRoationY = rotationY + Math.PI / 2
    }

    const compLineContainer = new PIXI.Container()
    // 标注线
    let compLine = new PIXI.Graphics()
    compLine.lineStyle(1, 0x000000, 1, 0.5, true)
    // 宽度标注线
    compLine.moveTo(newP1.x, newP1.y)
    compLine.lineTo(newP2.x, newP2.y)
    compLine.moveTo(newP1T.x, newP1T.y)
    compLine.lineTo(newP1B.x, newP1B.y)
    compLine.moveTo(newP2T.x, newP2T.y)
    compLine.lineTo(newP2B.x, newP2B.y)

    // 深度标注线
    compLine.moveTo(newP3.x, newP3.y)
    compLine.lineTo(newP4.x, newP4.y)
    compLine.moveTo(newP3T.x, newP3T.y)
    compLine.lineTo(newP3B.x, newP3B.y)
    compLine.moveTo(newP4T.x, newP4T.y)
    compLine.lineTo(newP4B.x, newP4B.y)

    // 距离标注线
    // compLine.moveTo(newP5.x, newP5.y)
    // compLine.lineTo(newP6.x, newP6.y)

    // compLine.moveTo(newP5T.x, newP5T.y)
    // compLine.lineTo(newP5.x, newP5.y)
    // compLine.lineTo(newP5B.x, newP5B.y)

    // compLine.moveTo(newP6T.x, newP6T.y)
    // compLine.lineTo(newP6.x, newP6.y)
    // compLine.lineTo(newP6B.x, newP6B.y)

    // 标注文字
    // 宽度标注文字
    const compLineText1 = new PIXI.Text(this.width * D2Config.SCREEN_RATE, {
      fontSize: 40,
      fill: 0x000000,
    })
    compLineText1.scale.set(0.25)
    compLineText1.anchor.set(0.5, 0.5)
    compLineText1.position.set(0, newP1.y - 5)
    compLineText1.rotation = newRoationY

    // 深度标注文字
    const compLineText2 = new PIXI.Text(this.depth * D2Config.SCREEN_RATE, {
      fontSize: 40,
      fill: 0x000000,
    })
    compLineText2.scale.set(0.25)
    compLineText2.anchor.set(0.5, 0.5)
    compLineText2.position.set(newP3.x - 5, 0)
    compLineText2.rotation = newRoationY - Math.PI / 2

    // 距离标注文字
    let disText
    if (disToStart === 0) {
      disText = ''
    } else {
      disText = disToStart
    }
    const compLineText3 = new PIXI.Text(disText, {
      fontSize: 40,
      fill: 0x000000,
    })
    compLineText3.scale.set(0.25)
    compLineText3.anchor.set(0.5, 0.5)
    compLineText3.position.set(
      -this.width / 2 - disToStart / 2 / D2Config.SCREEN_RATE,
      newP5.y - 5
    )
    compLineText3.rotation = newRoationY

    compLineContainer.addChild(
      compLine,
      compLineText1,
      compLineText2,
      compLineText3
    )
    compLineContainer.position.set(positionX, positionY)
    compLineContainer.rotation = this.rotationY

    this.sprite.addChild(compLineContainer)
  }
}
