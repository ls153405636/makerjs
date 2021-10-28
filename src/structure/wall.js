import { Types } from "../types/stair_v2"
import { Edge } from "../utils/edge"
import { Component } from "./component"
import { Default, StructConfig } from "./config"
import { Info } from "./info"


export class Wall extends Info {
  static TYPE_OPTIONS = [
    {value:Types.WallType.wboth, lable:'一二楼均有墙'},
    {value:Types.WallType.wfirst, lable:'一楼有墙二楼空'},
    {value:Types.WallType.wsecond, lable:'一楼空二楼有墙'},
    {value:Types.WallType.wnone, lable:'一二楼均空'}
  ]
  /**
   * 
   * @param {Info} vParent 
   * @param {Types.Edge} vEdge 
   */
  constructor (vParent, vEdge) {
    super (vParent)
    this.edge = vEdge
    this.holeEdge = vEdge
    this.type = Types.WallType.wboth
    this.startExtend = 0;
    this.endExtend = 0
    this.depth = Default.WALL_DEPTH
    this.height = this.parent.floorHeight
    this.components = []
    this.rebuild()
    StructConfig.INFOS.set(this.uuid, this)
  }

  rebuild () {
    let utilEdge = new Edge(this.holeEdge)
    if (this.startExtend) {
      this.edge = utilEdge.extendP1(this.startExtend)
    }
    if (this.endExtend) {
      this.edge = utilEdge.extendP2(this.endExtend)
    }
    let nor = utilEdge.getNormal()
    this.normal = new Types.Vector3({x:nor.x, y:nor.y})
    this.outEdge = utilEdge.offSet(this.depth)
    this.components = new Map()
    this.updateCanvas()
  }

  update (vArgs) {
  }

  addComponent (vInfo) {
    
  }

  delComponent (vInfo) {

  } 

  getArgs () {
    return {
      type: {name:'墙体类型', value:this.type, type:'select', options:Wall.TYPE_OPTIONS},
      depth: {name:'墙体厚度', value:this.depth, type:'input'},
      startExtend: {name:'起点延伸', value:this.startExtend, type:'input'},
      endExtend: {name:'终点延伸', value:this.endExtend, type:'input'}
    }
  }

  writePB () {
    let pb = new Types.Wall({
      uuid: this.uuid,
      edge: this.edge,
      outEdge: this.outEdge,
      type: this.type,
      startExtend: this.startExtend,
      endExtend: this.endExtend,
      depth: this.depth,
      height: this.height,
      holeEdge: this.holeEdge,
      normal: this.normal
    })
    for (const c of this.components.values()) {
      pb.components.push(c.writePB())
    }
    return pb
  }
}