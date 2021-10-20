import { Types } from "../types/stair_v2"

export function parseSpecification (vSpecStr, order='xyz') {
  let size = new Types.Vector3()
  if (!vSpecStr || !vSpecStr instanceof String) {
    return size
  }
  let segs = vSpecStr.split('*')
  segs.forEach((s, i) => {
    size[order[i]] = parseFloat(s)
  })
  return size
}

export default {
  parseSpecification
}