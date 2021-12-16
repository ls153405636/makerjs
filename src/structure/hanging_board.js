import { Types } from '../types/stair_v2'
import { ChildInfo } from './child_info'
import { Default, StructConfig } from './config'

export class HangingBoard extends ChildInfo {
  constructor({vParent, vWidth, vPosition, vHeight, vWidthVec, vDepthVec}) {
    super(vParent)
    this.depth = Default.HANG_BOARD_DEPTH
    this.height = vHeight
    this.position = vPosition
    this.widthVec = vWidthVec
    this.depthVec = vDepthVec
    this.rebuildByParent({vWidth, vPosition})
  }

  getArgs() {
    return {
      depth: { name: '厚度', value: this.depth, type: 'input' },
      height: { name: '高度', value: this.height, type: 'input' },
    }
  }

  updateItem(vValue, vKey, vSecondKey) {
    if (vKey === 'depth') {
      let lastF = this.parent.segments[this.segments.length - 1]
      let lengthDiff = vValue - this.depth
      lastF.updateItem(lastF.length - lengthDiff, 'length')
    } else {
      super.updateItem(vValue, vKey, vSecondKey)
    }
  }

  rebuildByParent({vWidth, vPosition}) {
    this.width = vWidth
    this.position = vPosition
  }

  writePB() {
    return new Types.HangingBoard({
      uuid: this.uuid,
      depth: this.depth,
      width: this.width,
      widthVec: this.widthVec,
      depthVec: this.depthVec,
      position: this.position
    })
  }
}
