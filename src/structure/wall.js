import { COMP_TYPES } from '../common/common_config'
import { D2Config } from '../d2/config'
import { Types } from '../types/stair_v2'
import { Edge } from '../utils/edge'
import { Default, StructConfig } from './config'
import { Info } from './info'
import tool from './tool'

export class Wall extends Info {
  static TYPE_OPTIONS = [
    { value: Types.WallType.wboth, label: '一二楼均有墙' },
    { value: Types.WallType.wfirst, label: '一楼有墙二楼空' },
    { value: Types.WallType.wsecond, label: '一楼空二楼有墙' },
    { value: Types.WallType.wnone, label: '一二楼均空' },
  ]
  /**
   *
   * @param {Info} vParent
   * @param {Types.Edge} vEdge
   */
  constructor(vParent, vEdge) {
    super(vParent)
    // console.log(vParent.floorHeight)
    this.holeHeight = vParent.floorHeight
    this.holeEdge = vEdge
    this.type = Types.WallType.wboth
    this.startExtend = 0
    this.endExtend = 240
    this.wallOffset = 0
    this.depth = Default.WALL_DEPTH
    this.height = this.parent.floorHeight
    this.rebuild()
  }
  
  rebuild() {
    // console.log(this.parent.floorHeight)
    this.holeH = this.parent.floorHeight
    
    if (this.holeH === 0 || this.holeH === '') {
      this.isTrue = true
    }else {
      this.isTrue = false
    }
    let utilEdge = new Edge(this.holeEdge)
    this.length = utilEdge.getLength() + this.startExtend + this.endExtend
    this.edge = utilEdge.extendP1(this.startExtend)
    this.edge = utilEdge.extendP2(this.endExtend)
    this.edge = utilEdge.offset(this.wallOffset, true)
    let nor = utilEdge.getNormal()
    this.normal = new Types.Vector3({ x: nor.x, y: nor.y })
    this.outEdge = new Edge(this.edge).offset(this.depth)
    this.components = new Map()
    this.updateCanvas('Wall')
    let stairId
    let inlayId
    let compId
    for(let value of D2Config.WIDGETS.values()) {
      if (value.getWidgetType() === COMP_TYPES.STAIR) {
        stairId = value.uuid
      }
      if (value.getWidgetType() === COMP_TYPES.INLAY) {
        inlayId = value.uuid
      }
      if (value.getWidgetType() === COMP_TYPES.CEMENT_COMP) {
        compId = value.uuid
      }
    }
    let stairInfo = StructConfig.INFOS.get(stairId)
    if (stairInfo !== undefined) {
      stairInfo.updateCanvas()
    }
    let inlayInfo = StructConfig.INFOS.get(inlayId)
    if (inlayInfo !== undefined && inlayInfo.parent.uuid === this.uuid) {
      inlayInfo.wallEndExtend = this.endExtend
      inlayInfo.wallLength = this.length
      inlayInfo.depth = this.depth
      inlayInfo.rebuild()
    }
    let compInfo = StructConfig.INFOS.get(compId)
    if (compInfo !== undefined && compInfo.parent.uuid === this.uuid) {
      if (compInfo.type === Types.ComponentType.cbeam) {
        if (this.parent.endExtend === 240) {
          compInfo.width = this.length - 240
        }else {
          compInfo.width = this.length
        }
      }
      if (compInfo.type === Types.ComponentType.cpillar) {
        compInfo.wallEndExtend = compInfo.parent.endExtend
        compInfo.wallLength = this.length
      }
      compInfo.rebuild()
    }
  }

  addComponent(vInfo) {
    this.components.set(vInfo.uuid, vInfo)
    this.updateCanvas()
  }

  delComponent(vInfo) {
    this.components.delete(vInfo.uuid, vInfo)
    this.updateCanvas()
  }

  getArgs() {
    let f = tool.getItemFromOptions
    return {
      type: {
        name: '墙体类型',
        value: f(this.type, Wall.TYPE_OPTIONS),
        type: 'select',
        options: Wall.TYPE_OPTIONS,
        disabled: this.isTrue
      },
      depth: { name: '墙体厚度', value: this.depth, type: 'input', disabled: this.isTrue },
      startExtend: { name: '起点延伸', value: this.startExtend, type: 'input', disabled: this.isTrue },
      endExtend: { name: '终点延伸', value: this.endExtend, type: 'input', disabled: this.isTrue },
      wallOffset: { name: '墙体偏移', value: this.wallOffset, type: 'input', disabled: this.isTrue },
    }
  }

  writePB() {
    let pb = new Types.Wall({
      uuid: this.uuid,
      edge: this.edge,
      outEdge: this.outEdge,
      type: this.type,
      startExtend: this.startExtend,
      endExtend: this.endExtend,
      wallOffset: this.wallOffset,
      depth: this.depth,
      height: this.height,
      holeEdge: this.holeEdge,
      normal: this.normal,
    })
    for (const c of this.components.values()) {
      pb.components.push(c.writePB())
    }
    return pb
  }
}
