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
    D2Config.CUR_STAIR = this
    this.flights = []
    this.smallColumns = []
    this.bigColumns = []
    this.handrails = []
    this.hangingBoard = []
    this.girders = []
    this.landings = []
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

  draw() {
    this.sprite = new PIXI.Container()

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
    console.log(this.sprite.zIndex)
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
}
