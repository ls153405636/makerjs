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
  let lVec = vLengthVec
  let wVec = vWidthVec
  let pois = []
  pois[0] = new THREE.Vector2(vOri.x, vOri.y)
  pois[1] = pois[0].clone().addScaledVector(lVec, vLength)
  pois[2] = pois[1].clone().addScaledVector(wVec, vWdith)
  pois[3] = pois[2].clone().addScaledVector(lVec, -vLength)
  return createOutlineByPois(pois)
}

export function createOutlineByPois(vPois) {
  let outline = new Types.Outline()
    for (let i = 0; i < vPois.length; i++) {
      let p = vPois[i]
      let nextP = i === vPois.length - 1 ? vPois[0] : vPois[i+1]
      outline.edges.push(new Types.Edge({
        p1:p,
        p2:nextP,
        type: Types.EdgeType.estraight
      }))
    }
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
  createOutlineByPois
}
