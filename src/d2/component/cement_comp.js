import { Types } from '../../types/stair_v2'
import { BaseWidget } from '../base_widget'
import d2_tool from '../d2_tool'
import { D2Config, Z_INDEX } from '../config'
import { Core } from '../../common/core'
import { Command } from '../../common/command'
import { COMP_TYPES } from '../../common/common_config'
import Victor from 'victor'
import wBeam from '../../assets/wbeam.png'
import wPillar from '../../assets/wpillar.png'
import { StructConfig } from '../../structure/config'

/**
 * 梁、柱，房间中的水泥结构部件
 */
export class CementComp extends BaseWidget {
  /**
   *
   * @param {Types.Component} vPB
   */
  constructor(vPB, vParent) {
    super(vPB.uuid)
    this.init(vPB)
  }

  getWidgetType() {
    return COMP_TYPES.CEMENT_COMP
  }

  init(vPB) {
    this.sprite = new PIXI.Container()
    this.type = vPB.type
    this.width = d2_tool.translateValue(vPB.width)
    this.depth = d2_tool.translateValue(vPB.depth)
    this.positionX = d2_tool.translateValue(vPB.position.x)
    this.positionY = d2_tool.translateValue(vPB.position.y)
    this.rotationY = vPB.rotation.y
    this.disToStart = vPB.disToStart
    this.disToEnd = vPB.wallLength - this.disToStart - vPB.width
    this.wallDepth = vPB.wallDepth
    this.wallLength = vPB.wallLength
    this.draw()
    this.addDimension()
    this.addEvent()
    console.log(vPB)
  }

  /**
   * 建议方法，根据宽深属性绘制矩形，然后设置位置和角度
   */


   creatComp(vName) {
    vName.drawRect(
      -this.width / 2,
      -this.depth / 2,
      this.width,
      this.depth
    )
    vName.endFill()
    vName.position.set(this.positionX, this.positionY)
    vName.rotation = this.rotationY
    return vName
  }

  draw() {
    const compContainer = new PIXI.Container()

    // 根据 type 获取名称
    var texture = ''
    var textWord = ''
    switch (this.type) {
      case Types.ComponentType.cbeam:
        textWord = '梁'
        texture = PIXI.Texture.from(wBeam)
        break
      case Types.ComponentType.cpillar:
        textWord = '柱'
        texture = PIXI.Texture.from(wPillar)
        break
    }

    var tilingSprite = new PIXI.TilingSprite(texture, this.width, this.depth)
    tilingSprite.anchor.set(0.5, 0.5)
    tilingSprite.tileScale.set(0.1) // 纹理缩放

    var tilingSprite1 = new PIXI.TilingSprite(texture, this.width, this.depth)
    tilingSprite1.anchor.set(0.5, 0.5)
    tilingSprite1.tileScale.set(0.1) // 纹理缩放

    let changeComp = new PIXI.Graphics()
    changeComp.visible = false
    changeComp.lineStyle(1, 0x4478f4,1)
    this.creatComp(changeComp)
    changeComp.addChild(tilingSprite1)

    let comp = new PIXI.Graphics()
    if (this.type === Types.ComponentType.cbeam) {
      comp.lineStyle(1, 0x000000,0.3,0.5,true)
    }else {
      comp.lineStyle(1, 0x000000,1)
    }
    this.creatComp(comp)
    comp.addChild(tilingSprite)


    let text = new PIXI.Text(textWord, { fontSize: 32, fill: 0x000000 })
    text.scale.set(0.25)
    text.position.set(this.positionX, this.positionY)
    text.anchor.set(0.5, 0.5)

    compContainer.addChild(changeComp, comp, text)
    compContainer.zIndex = Z_INDEX.COMPONENT_ZINDEX
    this.sprite.addChild(compContainer)
    this.sprite.zIndex = 100
  }

  // 取消 cement 选中效果
  cancelSelected() {
    this.sprite.children[0].children[0].visible = false
    this.sprite.children[0].children[1].visible = true
    this.isSelected = false
  }
  //  cement 选中效果
  setSelected() {
    this.sprite.children[0].children[0].visible = true
    this.sprite.children[0].children[1].visible = false
    this.isSelected = true
  }
  // 鼠标进入 cement 效果
  setHover() {
    if (!this.isSelected) {
      this.sprite.children[0].children[0].visible = true
      this.sprite.children[0].children[1].visible = false
    }
  }
  // 鼠标离开 cement 效果
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
            type: COMP_TYPES.CEMENT_COMP,
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
    let comp = StructConfig.INFOS.get(this.uuid)
    let wallWidth = comp.width
    // 标注线点计算
    const { positionX, positionY, rotationY, disToStart, disToEnd } = this
    const offSet = new Victor(7, 7) // 偏移距离
    const arrow = new Victor(2, 2)
    const p1 = new Victor(-this.width / 2, -this.depth / 2 - this.wallDepth / D2Config.SCREEN_RATE)
    const p2 = new Victor(this.width / 2, -this.depth / 2 -this.wallDepth / D2Config.SCREEN_RATE)
    const p3 = new Victor(this.width / 2, -this.depth / 2)
    const p4 = new Victor(this.width / 2, this.depth / 2)

    const p5 = new Victor(-this.width / 2, -this.depth / 2 - this.wallDepth / D2Config.SCREEN_RATE)
    const p6 = new Victor(-this.width / 2, -this.depth / 2 - this.wallDepth / D2Config.SCREEN_RATE).subtractX(
      new Victor(disToStart / D2Config.SCREEN_RATE, 0)
    )
    const p7 = new Victor(this.width / 2, -this.depth / 2 - this.wallDepth / D2Config.SCREEN_RATE)
    const p8 = new Victor(-this.width / 2, -this.depth / 2 - this.wallDepth / D2Config.SCREEN_RATE).addX(
      new Victor((this.wallLength - disToStart) / D2Config.SCREEN_RATE, 0)
    )

    const newP1 = p1.clone().subtractY(offSet)
    const newP2 = p2.clone().subtractY(offSet)

    let newP3
    let newP4
    // 如果是梁，深度标注在梁内部
    if (this.type === 4) {
      newP3 = p3.clone().subtractX(offSet)
      newP4 = p4.clone().subtractX(offSet)
    }else {
      newP3 = p3.clone().addX(offSet)
      newP4 = p4.clone().addX(offSet)
    }

    const newP5 = p5.clone().subtractY(offSet)
    const newP6 = p6.clone().subtractY(offSet)
    const newP7 = p7.clone().subtractY(offSet)
    const newP8 = p8.clone().subtractY(offSet)

    const newP1T = new Victor(newP1.x, newP1.y).subtractY(arrow)
    const newP1B = new Victor(newP1.x, newP1.y).addY(arrow)
    const newP2T = new Victor(newP2.x, newP2.y).subtractY(arrow)
    const newP2B = new Victor(newP2.x, newP2.y).addY(arrow)

    const newP5T = new Victor(newP5.x, newP5.y).subtractY(arrow)
    const newP5B = new Victor(newP5.x, newP5.y).addY(arrow)
    const newP6T = new Victor(newP6.x, newP6.y).subtractY(arrow)
    const newP6B = new Victor(newP6.x, newP6.y).addY(arrow)
    const newP7T = new Victor(newP7.x, newP7.y).subtractY(arrow)
    const newP7B = new Victor(newP7.x, newP7.y).addY(arrow)
    const newP8T = new Victor(newP8.x, newP8.y).subtractY(arrow)
    const newP8B = new Victor(newP8.x, newP8.y).addY(arrow)

    const newP3T = new Victor(newP3.x, newP3.y).subtractX(arrow)
    const newP3B = new Victor(newP3.x, newP3.y).addX(arrow)
    const newP4T = new Victor(newP4.x, newP4.y).subtractX(arrow)
    const newP4B = new Victor(newP4.x, newP4.y).addX(arrow)


    // 文字旋转角度
    let newRoationY = rotationY
    if (rotationY > 0 && rotationY <= Math.PI / 2) {
      newRoationY = rotationY - Math.PI / 2
    }
    if (rotationY > Math.PI && rotationY <= (Math.PI / 2) * 3) {
      newRoationY = rotationY + Math.PI / 2
    }

    const compLineContainer = new PIXI.Container()

    // 标注文字
    // 宽度标注文字
    const compLineText1 = new PIXI.Text(this.width * D2Config.SCREEN_RATE, {
      fontSize: 32,
      fill: 0x000000,
    })
    
    compLineText1.scale.set(0.25)
    compLineText1.anchor.set(0.5, 0.5)
    compLineText1.position.set(0, newP1.y - 4)
    compLineText1.rotation = newRoationY
    // 标注线
    let compLine = new PIXI.Graphics()
    compLine.lineStyle(1, 0x000000, 1, 0.5, true)

    if (this.wallLength === wallWidth) {
      compLineText1.visible = false
      // return
    } else {
      // 宽度标注线
      compLine.moveTo(newP1.x, newP1.y)
      compLine.lineTo(newP2.x, newP2.y)
      compLine.moveTo(newP1T.x, newP1T.y)
      compLine.lineTo(newP1B.x, newP1B.y)
      compLine.moveTo(newP2T.x, newP2T.y)
      compLine.lineTo(newP2B.x, newP2B.y)
    }

    // 深度标注线
    compLine.moveTo(newP3.x, newP3.y)
    compLine.lineTo(newP4.x, newP4.y)
    compLine.moveTo(newP3T.x, newP3T.y)
    compLine.lineTo(newP3B.x, newP3B.y)
    compLine.moveTo(newP4T.x, newP4T.y)
    compLine.lineTo(newP4B.x, newP4B.y)

    // 距离标注线
    compLine.moveTo(newP5.x, newP5.y)
    compLine.lineTo(newP6.x, newP6.y)
    compLine.moveTo(newP7.x, newP7.y)
    compLine.lineTo(newP8.x, newP8.y)

    if (disToEnd === 0) {
      // 
    } else {
      compLine.moveTo(newP7T.x, newP7T.y)
      compLine.lineTo(newP7B.x, newP7B.y)
      compLine.moveTo(newP8T.x, newP8T.y)
      compLine.lineTo(newP8B.x, newP8B.y)
    }
    if (disToStart === 0) {
      // 
    }else {
      compLine.moveTo(newP5T.x, newP5T.y)
      compLine.lineTo(newP5B.x, newP5B.y)
      compLine.moveTo(newP6T.x, newP6T.y)
      compLine.lineTo(newP6B.x, newP6B.y)
    }

    

    // 深度标注文字
    const compLineText2 = new PIXI.Text(this.depth * D2Config.SCREEN_RATE, {
      fontSize: 32,
      fill: 0x000000,
    })
    compLineText2.scale.set(0.25)
    compLineText2.anchor.set(0.5, 0.5)
    compLineText2.position.set(newP3.x - 4, 0)
    compLineText2.rotation = newRoationY - Math.PI / 2

    // 距离标注文字
    let disText = Math.round(Math.hypot(newP5.x - newP6.x, newP5.y - newP6.y) * 10 * 100) / 100
    let disText1 = Math.round(Math.hypot(newP7.x - newP8.x, newP7.y - newP8.y) * 10 * 100) / 100
    const compLineText3 = new PIXI.Text(disText, {
      fontSize: 32,
      fill: 0x000000,
    })
    const compLineText4 = new PIXI.Text(disText1, {
      fontSize: 32,
      fill: 0x000000,
    })
    if (disToStart === 0) {
      compLineText3.visible = false
    } else {
      compLineText3.visible = true
    }
    if (disToEnd === 0) {
      compLineText4.visible = false
    } else {
      compLineText4.visible = true
    }
    compLineText3.scale.set(0.25)
    compLineText3.anchor.set(0.5, 0.5)
    compLineText3.position.set(
      (newP5.x + newP6.x) / 2,
      (newP5.y + newP6.y) / 2 - 4
    )
    compLineText3.rotation = newRoationY

    compLineText4.scale.set(0.25)
    compLineText4.anchor.set(0.5, 0.5)
    compLineText4.position.set(
      (newP7.x + newP8.x) / 2,
      (newP7.y + newP8.y) / 2 - 4
    )
    compLineText4.rotation = newRoationY


    // 离地高度标线
    
    const compOffGround = comp.offGround
    const offGroundContainer = new PIXI.Container()
    const offGround = new PIXI.Graphics()
    const offGroundText = new PIXI.Text('离地' + compOffGround,{
      fontSize: 32,
      fill: 0x000000,
    })
    if (compOffGround === 0) {
      offGroundContainer.visible = 0
    }
    offGroundText.scale.set(0.25)
    offGroundText.anchor.set(0.5, 0.5)
    
    offGroundText.rotation = newRoationY
    offGround.lineStyle(1,0x000000,1,0.5,true)
    offGround.moveTo(newP3.x, newP3.y)
    if (this.type === 5) {
      offGroundText.position.set(newP8.x + 20 , newP8.y - 4)
      offGround.moveTo(newP8.x, newP8.y)
      offGround.lineTo(newP8.x + 40, newP8.y)
    }else {
      offGroundText.position.set(newP3.x + 30 , newP3.y - 12)
      offGround.lineTo(newP3.x + 7, newP3.y - 7)
      offGround.lineTo(newP3.x + 47, newP3.y - 7)
    }


    offGroundContainer.addChild(
      offGround,
      offGroundText,
    )

    compLineContainer.addChild(
      offGroundContainer,
      compLine,
      compLineText1,
      compLineText2,
      compLineText3,
      compLineText4
    )
    compLineContainer.position.set(positionX, positionY)
    compLineContainer.rotation = this.rotationY

    this.sprite.addChild(compLineContainer)
  }
}
