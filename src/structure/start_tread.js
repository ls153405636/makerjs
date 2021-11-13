import { ChildInfo } from "./child_info";
import { Default } from "./config";



export class StartTread extends ChildInfo {
  constructor ({vParent, vPos}) {
    super (vParent)
    this.inheritL = true
    this.inheritW = true
    this.inheritH = true
    this.projId = Default.START_TREAD_PRO_ID
    this.rebuildByParent({vPos})
  }

  rebuildByParent(vPos) {
    this.position = vPos || new Types.Vector3()
    this.lVec = this.parent.lVec || new Types.Vector3()
    this.wVec = this.parent.wVec || new Types.Vector3()
    if (this.inheritL) {
      this.stepLength = this.parent.stepLength || 0
    }
    if (this.inheritW) {
      this.stepWidth = this.parent.stepWidth || 0
    } 
    if (this.inheritH) {
      this.stepHeight = this.parent.stepHeight
    }
  }

  createOutline() {
  }

  getArgs () {
    let args = {}
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
    args.stepHeight = {name:'步高', 
                      value:{
                        inheritH:{name:'继承楼梯段', value:this.inheritH, type:'switch'},
                        stepHeight:{name:'数值', value:this.stepHeight, type:'input',disabled:this.inheritH}
                      }, 
                      type:'group'}
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
      inheritL:this.inheritL
    })
  }
}