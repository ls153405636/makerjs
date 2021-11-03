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
export function createRectOutline(vOri, vLength, vWdith, vLengthVec = new THREE.Vector2(1, 0), vWidthVec = new THREE.Vector2(0, 1)) {
  let outline = new Types.Outline()
  let edges = []
  let lVec = vLengthVec
  let wVec = vWdith
  let pois = []
  pois[0] = new THREE.Vector2(vOri.x, vOri.y)
  pois[1] = p1.clone().addScaledVector(lVec, vLength)
  pois[2] = p2.clone().addScaledVector(wVec, vWdith)
  pois[3] = p3.clone().addScaledVector(lVec, -vLength)
  for (let i = 0; i < pois.length; i++) {
    let p = pois[i]
    let n_p = i === pois.length - 1 ? pois[0] : pois[i+1]
    edges.push(new Types.Edge({
      p1: new Types.Vector3({x:p.x, y:n_p.y}),
      p2: new Types.Vector3({x:n_p.x, y:n_p.y}),
      type: Types.EdgeType.estraight
    }))
  }
  outline.edges = edges
  return outline
}

export function getItemFromOptions(vValue, vOptions) {
  let item = { value: vValue }
  for (const i of vOptions) {
    if (i.value === vValue) {
      item.label = i.label
      break
    }
  }
  return item
}

export default {
  parseSpecification,
  createRectOutline,
  getItemFromOptions,
}
