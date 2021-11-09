import { Types } from '../types/stair_v2'
import { ChildInfo } from './child_info'
import { Default, StructConfig } from './config'

export class HangingBoard extends ChildInfo {
  constructor(vParent) {
    super(vParent)
    this.depth = Default.HANG_BOARD_DEPTH
    this.width = this.parent.width
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

  rebuildByParent() {
    this.width = this.parent.width
  }

  writePB() {
    return new Types.HangingBoard({
      uuid: this.uuid,
      depth: this.depth,
      width: this.width,
    })
  }
}
