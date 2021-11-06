import { Types } from '../types/stair_v2'
import { ChildInfo } from './child_info'
import { Default, StructConfig } from './config'
import { Info } from './info'

export class HangingBoard extends Info {
  constructor(vParent) {
    super(vParent)
    this.depth = Default.HANG_BOARD_DEPTH
    this.width = this.parent.stepLength
    this.height = this.parent.stepHeight + 30
  }

  addInfo() {
    StructConfig.INFOS.set(this.uuid, this)
    this.parent.addHangingBoard(this)
  }

  delInfo() {
    StructConfig.INFOS.delete(this.uuid)
    this.parent.addHangingBoard(null)
  }

  getArgs() {
    return {
      depth: { name: '深度', value: this.depth, type: 'input' },
      height: { name: '高度', value: this.height, type: 'input' },
    }
  }

  rebuild() {
    this.width = this.parent.stepLength
  }

  update(vArgItems) {
    super.update(vArgItems)
    this.parent.rebuild()
  }

  writePB() {
    return new Types.HangingBoard({
      uuid: this.uuid,
      depth: this.depth,
      width: this.width,
    })
  }
}
