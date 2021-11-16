import { Command } from '../../common/command'
import { COMP_TYPES } from '../../common/common_config'
import { Core } from '../../common/core'
import { Types } from '../../types/stair_v2'
import { D2Config } from '../config'
import { ChildWidget } from './child_widget'

export class Tread extends ChildWidget {
  /**
   *
   * @param {Types.Tread} vPB
   */
  constructor(vPB, vParent) {
    super(vPB.uuid)
    this.edges = vPB.stepOutline.edges
    this.index = vPB.index
    this.parent = vParent
    this.type = vPB.type
    this.draw()
    this.addEvent()
  }

  draw() {
    // 中心位置计算
    let positionX = 0
    let positionY = 0
    for (let i = 0; i < this.edges.length; i++) {
      let f = this.edges[i]
      positionX += f.p1.x
      positionY += f.p1.y
    }
    positionX = positionX / this.edges.length
    positionY = positionY / this.edges.length

    let treadContainer = new PIXI.Container()
    // 踏板绘制
    let path = []
    let path1 = []
    let path2 = []
    let path1_ = []
    for (let i = 0; i < this.edges.length; i++) {
      let e = this.edges[i]
      if (this.edges.length === 11) {
        path1.push(e.p1.x / D2Config.SCREEN_RATE, e.p1.y / D2Config.SCREEN_RATE)
      } 
      else if (this.edges.length === 22) {
        path1_.push(e.p1.x / D2Config.SCREEN_RATE, e.p1.y / D2Config.SCREEN_RATE)
      } 
      else if (this.edges.length === 7) {
        path2.push(e.p1.x / D2Config.SCREEN_RATE, e.p1.y / D2Config.SCREEN_RATE)
      } 
      else {
        path.push(e.p1.x / D2Config.SCREEN_RATE, e.p1.y / D2Config.SCREEN_RATE)
      }
    }
    let changeTread = new PIXI.Graphics()
    changeTread.visible = false
    changeTread.lineStyle(1, 0x4478f4)
    changeTread.beginFill(0xe9efff)
    changeTread.drawPolygon(path)


    // 单层椭圆踏板绘制
    changeTread.moveTo(path1[0], path1[1])

    changeTread.lineTo(path1[2], path1[3])
    changeTread.quadraticCurveTo(path1[4], path1[5], path1[6], path1[7])
    changeTread.quadraticCurveTo(path1[8], path1[9], path1[10], path1[11])
    changeTread.quadraticCurveTo(path1[12], path1[13], path1[14], path1[15])
    changeTread.quadraticCurveTo(path1[16], path1[17], path1[18], path1[19])
    changeTread.lineTo(path1[20], path1[21])

    // 双层椭圆踏板绘制
    changeTread.moveTo(path1_[0], path1_[1])

    changeTread.lineTo(path1_[2], path1_[3])
    changeTread.quadraticCurveTo(path1_[4], path1_[5], path1_[6], path1_[7])
    changeTread.quadraticCurveTo(path1_[8], path1_[9], path1_[10], path1_[11])
    changeTread.quadraticCurveTo(path1_[12], path1_[13], path1_[14], path1_[15])
    changeTread.quadraticCurveTo(path1_[16], path1_[17], path1_[18], path1_[19])
    changeTread.lineTo(path1_[20], path1_[21])

    changeTread.lineTo(path1_[24], path1_[25])
    changeTread.quadraticCurveTo(path1_[26], path1_[27], path1_[28], path1_[29])
    changeTread.quadraticCurveTo(path1_[30], path1_[31], path1_[32], path1_[33])
    changeTread.quadraticCurveTo(path1_[34], path1_[35], path1_[36], path1_[37])
    changeTread.quadraticCurveTo(path1_[38], path1_[39], path1_[40], path1_[41])
    changeTread.lineTo(path1_[42], path1_[43])


    // 圆角矩形踏板绘制
    changeTread.moveTo(path2[0],path2[1])
    changeTread.lineTo(path2[2],path2[3])
    changeTread.arc(path2[4],path2[5],path2[5] - path2[3],-Math.PI / 2,Math.PI / 2)
    changeTread.lineTo(path2[6],path2[7])
    changeTread.lineTo(path2[8],path2[9])
    changeTread.arc(path2[10],path2[11],path2[9] - path2[11],Math.PI / 2,-Math.PI / 2)
    changeTread.lineTo(path2[12],path2[13])
    changeTread.lineTo(path2[0],path2[1])

    changeTread.endFill()

    // --------------------------------------------------------------------------------------------------------------//

    // 踏板绘制
    let tread = new PIXI.Graphics()
    tread.lineStyle(1, 0x2d3037)
    tread.beginFill(0xffffff)
    tread.visible = true
    tread.drawPolygon(path)

    // 单层椭圆踏板绘制
    tread.moveTo(path1[0], path1[1])

    tread.lineTo(path1[2], path1[3])
    tread.quadraticCurveTo(path1[4], path1[5], path1[6], path1[7])
    tread.quadraticCurveTo(path1[8], path1[9], path1[10], path1[11])
    tread.quadraticCurveTo(path1[12], path1[13], path1[14], path1[15])
    tread.quadraticCurveTo(path1[16], path1[17], path1[18], path1[19])
    tread.lineTo(path1[20], path1[21])

    // 双层椭圆踏板绘制
    tread.moveTo(path1_[0], path1_[1])

    tread.lineTo(path1_[2], path1_[3])
    tread.quadraticCurveTo(path1_[4], path1_[5], path1_[6], path1_[7])
    tread.quadraticCurveTo(path1_[8], path1_[9], path1_[10], path1_[11])
    tread.quadraticCurveTo(path1_[12], path1_[13], path1_[14], path1_[15])
    tread.quadraticCurveTo(path1_[16], path1_[17], path1_[18], path1_[19])
    tread.lineTo(path1_[20], path1_[21])

    tread.lineTo(path1_[24], path1_[25])
    tread.quadraticCurveTo(path1_[26], path1_[27], path1_[28], path1_[29])
    tread.quadraticCurveTo(path1_[30], path1_[31], path1_[32], path1_[33])
    tread.quadraticCurveTo(path1_[34], path1_[35], path1_[36], path1_[37])
    tread.quadraticCurveTo(path1_[38], path1_[39], path1_[40], path1_[41])
    tread.lineTo(path1_[42], path1_[43])
    
    // 圆角矩形踏板绘制
    tread.moveTo(path2[0],path2[1])
    tread.lineTo(path2[2],path2[3])
    tread.arc(path2[4],path2[5],path2[5] - path2[3],-Math.PI / 2,Math.PI / 2)
    tread.lineTo(path2[6],path2[7])
    tread.lineTo(path2[8],path2[9])
    tread.arc(path2[10],path2[11],path2[9] - path2[11],Math.PI / 2,-Math.PI / 2)
    tread.lineTo(path2[12],path2[13])
    tread.lineTo(path2[0],path2[1])


    tread.endFill()

    // 踏板编号
    let stepNum = new PIXI.Text(this.index, { fontSize: 56 })
    stepNum.scale.set(0.25)
    stepNum.position.set(
      positionX / D2Config.SCREEN_RATE,
      positionY / D2Config.SCREEN_RATE
    )
    stepNum.anchor.set(0.5, 0.5)
    treadContainer.addChild(changeTread, tread, stepNum)
    this.sprite = treadContainer
  }

  /**
   *
   * @returns 获取当前组件的精灵图
   */

  /**
   * 踏板只需要添加到父级，不需要添加到画布
   * 所以此处用空函数重写
   */

  // 取消踏板选中效果
  cancelSelected() {
    this.sprite.zIndex = 0
    this.sprite.children[0].visible = false
    this.sprite.children[1].visible = true
    this.isSelected = false
  }

  // 踏板选中效果
  setSelected() {
    this.sprite.zIndex = 100
    this.sprite.children[0].visible = true
    this.sprite.children[1].visible = false
    this.isSelected = true
  }

  // 鼠标进入踏板效果
  setHover() {
    this.sprite.zIndex = 100
    this.sprite.children[0].visible = true
    this.sprite.children[1].visible = false
  }
  // 鼠标离开踏板效果
  cancelHover() {
    if (!this.isSelected) {
      this.sprite.zIndex = 0
      this.sprite.children[0].visible = false
      this.sprite.children[1].visible = true
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
          /**暂时根据踏板类型来判断是否选中的是休台，当前项目中，楼梯段踏板一定是标准矩形 */
          core.execute(
            new Command(core.cmds.SelecteCmd, {
              uuid: this.parent.uuid,
              type:
                this.type === Types.TreadType.trect
                  ? COMP_TYPES.FLIGHT
                  : COMP_TYPES.LANDING,
            })
          )
        }
      })
      .on('mouseout', () => {
        if (D2Config.IS_SINGLE_SELECTED) {
          _this.cancelHover()
        } else {
          _this.parent.cancelHover()
        }
      })
      .on('mouseover', () => {
        if (D2Config.IS_SINGLE_SELECTED) {
          _this.setHover()
        } else {
          _this.parent.setHover()
        }
      })
  }
}
