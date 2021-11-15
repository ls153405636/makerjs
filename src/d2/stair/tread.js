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
    //  // 单层起步踏板参数
    const elTreadLength1 = 120 // 踏板长度
    const elTreadDepth1 = 30 // 踏板深度
    const lRadius1 = 22 // 两侧椭圆长轴
    const wRadius1 = 12 // 两侧椭圆短轴

    //  // 双层起步踏板参数
    //  const elTreadLength2 = elTreadLength1
    //  const elTreadDepth2 = 30
    //  const lRadius2 = 32
    //  const wRadius2 = 27

    //  const tabanlength = elTreadLength1
    //  const radius = 14

    //  const tContainer = new PIXI.Container()
    //  const elTread = new PIXI.Graphics()

    //  elTread.lineStyle(1, 0x000000)
    //  elTread.moveTo(0, 0)

    // //  // 单层
    //  elTread.quadraticCurveTo(0, 0, 120, 0)
    //  elTread.quadraticCurveTo(120 + 22,0,120 + 22,12)
    //  elTread.quadraticCurveTo(120 + 22,12 * 2 + 30 - 12 * 2,120 / 2,12 * 2 + 30 - 12 * 2)
    //  elTread.quadraticCurveTo(0 - 22,12 * 2 + 30 - 12 * 2,0 - 22,12)
    //  elTread.quadraticCurveTo(0 - 22, 0, 0, 0)
    //  // console.log(elTread.width, elTread.height)
    //  // 双层
    //  elTread.quadraticCurveTo(0, 0, elTreadLength2, 0)
    //  elTread.quadraticCurveTo(
    //    elTreadLength2 + lRadius2,
    //    0,
    //    elTreadLength2 + lRadius2,
    //    wRadius2
    //  )
    //  elTread.quadraticCurveTo(
    //    elTreadLength2 + lRadius2,
    //    wRadius2 * 2 + elTreadDepth2 + elTreadDepth1 - wRadius2 * 2,
    //    elTreadLength2 / 2,
    //    wRadius2 * 2 + elTreadDepth2 + elTreadDepth1 - wRadius2 * 2
    //  )
    //  elTread.quadraticCurveTo(
    //    0 - lRadius2,
    //    wRadius2 * 2 + elTreadDepth2 + elTreadDepth1 - wRadius2 * 2,
    //    0 - lRadius2,
    //    wRadius2
    //  )
    //  elTread.quadraticCurveTo(0 - lRadius2, 0, 0, 0)
    //  elTread.position.set(600,0)

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
    for (let i = 0; i < this.edges.length; i++) {
      let e = this.edges[i]
      if (this.index === 1 && e.type === 2) {
        path1.push(e.p1.x / D2Config.SCREEN_RATE, e.p1.y / D2Config.SCREEN_RATE)
      } else {
        path.push(e.p1.x / D2Config.SCREEN_RATE, e.p1.y / D2Config.SCREEN_RATE)
      }
    }

    let changeTread = new PIXI.Graphics()
    changeTread.visible = false
    changeTread.lineStyle(1, 0x4478f4)
    changeTread.beginFill(0xe9efff)
    changeTread.drawPolygon(path)

    changeTread.moveTo(path1[0], path1[1])
    changeTread.quadraticCurveTo(path1[0], path1[1], path1[2], path1[3])
    changeTread.quadraticCurveTo(path1[4], path1[5], path1[6], path1[7])
    changeTread.quadraticCurveTo(path1[8], path1[9], path1[10], path1[11])
    changeTread.quadraticCurveTo(path1[12], path1[13], path1[14], path1[15])
    changeTread.quadraticCurveTo(path1[16], path1[17], path1[0], path1[1])

    changeTread.endFill()

    // 踏板绘制
    let tread = new PIXI.Graphics()
    tread.lineStyle(1, 0x2d3037)
    tread.beginFill(0xffffff)
    tread.visible = true
    tread.drawPolygon(path)

    tread.moveTo(path1[0], path1[1])
    tread.quadraticCurveTo(path1[0], path1[1], path1[2], path1[3])
    tread.quadraticCurveTo(path1[4], path1[5], path1[6], path1[7])
    tread.quadraticCurveTo(path1[8], path1[9], path1[10], path1[11])
    tread.quadraticCurveTo(path1[12], path1[13], path1[14], path1[15])
    tread.quadraticCurveTo(path1[16], path1[17], path1[0], path1[1])

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
