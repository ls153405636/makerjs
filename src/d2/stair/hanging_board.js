import Victor from 'victor'
import { Command } from '../../common/command'
import { COMP_TYPES } from '../../common/common_config'
import { Core } from '../../common/core'
import { Types } from '../../types/stair_v2'
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
    this.height = d2_tool.translateValue(vPB.depth)
    this.depth = vPB.depth
    this.sprite = new PIXI.Container()
    this.addEvent()
    // this.flights = vPB.parent.flights[vPB.parent.flights.length - 1]
    // this.tread = this.flights.treads[this.flights.treads.length - 2]
    // this.positionX = this.tread.position.x
    // this.positionY = this.tread.position.y
    // console.log(this.positionX)
    // console.log(this.positionY)
    this.draw()
  }
  
  draw() {
    const hangingBoardContainer = new PIXI.Container()

    const changeHangingBoard = new PIXI.Graphics()
    changeHangingBoard.visible = false
    changeHangingBoard.lineStyle(1, 0x4478f4)
    changeHangingBoard.beginFill(0xe9efff)
    changeHangingBoard.drawRect(0, 0, this.width, this.height)

    const hangingBoard = new PIXI.Graphics()
    hangingBoard.lineStyle(1, 0x2d3037)
    hangingBoard.beginFill(0xffffff)
    hangingBoard.drawRect(0, 0, this.width, this.height)

    // const p1 = new Victor(this.positionX, this.positionY).subtractX(new Victor(500,500))
    // const p2 = new Victor(this.positionX, this.positionY - this.depth).subtractX(new Victor(500,500))
    
    // console.log(p1)
    // console.log(p2)

    // const hangingBoardLine = new PIXI.Graphics()
    // hangingBoardLine.lineStyle(1,0x000000)
    // hangingBoardLine.moveTo(p1.x / 10, p1.y / 10)
    // hangingBoardLine.lineTo(p2.x / 10, p2.y / 10)

    
    // // 文字中心位置计算
    // const position = {
    //   x: (p1.x - 50 + p2.x - 50) / 2 / 10,
    //   y: (p1.y + p2.y) / 2 / 10
    // }

    // // 旋转计算
    // let newTextRotation = ''
    // const textRotation = new Victor(p1.x - p2.x, p1.y - p2.y)
    // const textAngle = textRotation.angle()
    // if (textAngle == Math.PI || textAngle == 0) {
    //   newTextRotation = 0
    // } else if (textAngle < Math.PI) {
    //   newTextRotation = textRotation.invert().angle()
    // } else if (textAngle > Math.PI) {
    //   newTextRotation = textRotation.angle()
    // }
    
    // const hangingBoardLineText = new PIXI.Text(this.depth,{
    //   fontSize:36,
    //   fill: 0x000000
    // })
    // hangingBoardLineText.scale.set(0.25)
    // hangingBoardLineText.position.set(position.x, position.y)
    // hangingBoardLineText.anchor.set(0.5, 0.5)
    // hangingBoardLineText.rotation = newTextRotation
    

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
}
