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
    this.parent.addHangingBoard(this)
    StructConfig.INFOS.set(this.uuid, this)
  }

  delInfo() {
    this.parent.addHangingBoard(null)
    StructConfig.INFOS.delete(this.uuid)
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
