import { Types } from '../../types/stair_v2'
import { Tread } from './tread'

export class StartTread extends Tread {

  constructor({ vParent, vIndex, vBorder, vStepWidth}) {
    super({vParent, vIsLast:false})
    this.startTreadType = Types.TreadType.tStart
    this.rebuildByParent({ vIndex, vBorder, vStepWidth })
  }
  
  rebuildByParent({vIndex, vBorder, vStepWidth}) {
    super.rebuildByParent({vIndex})
    this.border = vBorder
    this.stepLength = this.parent.stepLength
    this.stepWidth = vStepWidth
    this.lVec = this.parent.lVec
    this.wVec = this.parent.wVec
  }
}
