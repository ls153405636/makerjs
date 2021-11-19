import { Types } from "../types/stair_v2";
import { Edge } from "../utils/edge";
import { ChildInfo } from "./child_info";
import tool from "./tool";

export class Tread extends ChildInfo {
  constructor ({vParent, vIndex, vPois, vPos, vIsLast}) {
    super(vParent)
    this.inheritL = true
    this.inheritW = true
    this.inheritH = true
    this.isLast = vIsLast
    this.rebuildByParent({vIndex, vPois, vPos})
  }

  getArgs() {
    let args = {}
    if (this.type === Types.TreadType.trect) {
      args.stepLength = {name:'步长', 
                        value:{
                          inheritL:{name:'继承楼梯段', value:this.inheritL, type:'switch'},
                          stepLength:{name:'数值', value:this.stepLength, type:'input', disabled:this.inheritL}
                        }, 
                        type:'group'}
      args.stepWidth = {name:'步宽', 
                        value:{
                          inheritW:{name:'继承楼梯段', value:this.inheritW, type:'switch'},
                          stepWidth:{name:'数值', value:this.stepWidth, type:'input', disabled:this.inheritW}
                        },  
                        type:'group'}
    }
    args.stepHeight = {name:'步高', 
                      value:{
                        inheritH:{name:'继承楼梯段', value:this.inheritH, type:'switch'},
                        stepHeight:{name:'数值', value:this.stepHeight, type:'input',disabled:this.inheritH}
                      }, 
                      type:'group'}
    return args
  }

  createOutline () {
    let gArgs = this.parent.parent.girderParameters
    let xOffset = gArgs.type === Types.GirderType.gslab? gArgs.depth : 0
    this.outline = tool.createRectOutline(this.position, this.stepLength - 2 * xOffset, this.stepWidth, this.lVec, this.wVec)
  }

  rebuildByParent ({vIndex, vPois, vPos}) {
    this.position = vPos || new Types.Vector3()
    this.lVec = this.parent.lVec || new Types.Vector3()
    this.wVec = this.parent.wVec || new Types.Vector3()
    this.index = vIndex
    if (this.inheritL) {
      this.stepLength = this.parent.stepLength || 0
    }
    if (this.inheritW) {
      this.stepWidth = this.parent.stepWidth || 0
    } 
    if (this.inheritH) {
      this.stepHeight = this.parent.stepHeight
    }
    if (vPois?.length) {
      this.outline = tool.createOutlineByPois(vPois)
      this.type = Types.TreadType.tph
    } else {
      this.createOutline()
      this.type = Types.TreadType.trect
      this.border = {
        inEdgeIndex:[3],
        outEdgeIndex:[1]
      }
    }
    
  }

  getColPos (vRateArr, vSide, vSideOffset) {
    let posArr = []
    for(const i of this.border[vSide+'EdgeIndex']) {
      let e = this.outline.edges[i]
      let utilE = new Edge(e)
      utilE.offset(vSideOffset, false)
      for(const r of vRateArr) {
        let pos = new Edge(utilE.writePB()).extendP1(-utilE.getLength() * r).p1
        posArr.push(pos)
      }
    }
    return posArr
  }

  updateItem (vValue, vKey, vSecondKey) {
    if (['stepHeight', 'stepLength', 'stepWidth'].includes(vKey)) {
      this[vSecondKey] = vValue
    } else {
      super.updateItem(vValue, vKey, vSecondKey)
    }
  }

  writePB () {
    return new Types.Tread({
      uuid:this.uuid,
      index:this.index,
      isLast:this.isLast,
      stepOutline:this.outline,
      stepHeight:this.stepHeight,
      stepWidth:this.stepWidth,
      stepLength:this.stepLength,
      inheritH:this.inheritH,
      inheritW:this.inheritW,
      inheritL:this.inheritL,
      type:this.type
    })
  }
} 