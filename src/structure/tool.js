import { Types } from '../types/stair_v2'

export function parseSpecification(vSpecStr, order = 'xyz') {
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

/**
 * 创建矩形轮廓
 * @param {Types.Vector3} vOri 
 * @param {Number} vLength 
 * @param {Number} vWdith 
 */
export function createRectOutline (vOri, vLength, vWdith) {
  let outline = new Types.Outline()
  let edges = []
  edges.push(
    new Types.Edge({
      p1: new Types.Vector3(vOri),
      p2: new Types.Vector3({x: vOri.x + vLength, y: vOri.y}),
      type: Types.EdgeType.estraight,
    })
  )
  edges.push(
    new Types.Edge({
      p1: new Types.Vector3({x: vOri.x + vLength, y: vOri.y}),
      p2: new Types.Vector3({x: vOri.x + vLength, y: vOri.y + vWdith}),
      type: Types.EdgeType.estraight,
    })
  )
  edges.push(
    new Types.Edge({
      p1: new Types.Vector3({x: vOri.x + vLength, y: vOri.y + vWdith}),
      p2: new Types.Vector3({x: vOri.x, y: vOri.y + vWdith}),
      type: Types.EdgeType.estraight,
    })
  )
  edges.push(
    new Types.Edge({
      p1: new Types.Vector3({x: vOri.x, y: vOri.y + vWdith}),
      p2: new Types.Vector3(vOri),
      type: Types.EdgeType.estraight,
    })
  )
  outline.edges = edges
  return outline
}

export default {
  parseSpecification,
  createRectOutline
}
