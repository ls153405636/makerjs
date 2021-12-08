import { Types } from '../../types/stair_v2'
import { Tread } from './tread'

export class StartTread extends Tread {

  constructor({ vParent, vIndex, vBorder}) {
    super({vParent, vIsLast:false})
    this.type = Types.TreadType.tStart
    this.rebuildByParent({ vIndex, vBorder })
  }
  
  rebuildByParent({vIndex, vBorder}) {
    super.rebuildByParent({vIndex})
    this.border = vBorder
    this.stepLength = this.parent.stepLength
    this.stepWidth = this.parent.stepWidth
    this.lVec = this.parent.lVec
    this.wVec = this.parent.wVec
  }
}
