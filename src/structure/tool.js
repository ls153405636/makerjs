import { Types } from '../types/stair_v2'
import { Edge } from '../utils/edge'
import { Edge3 } from '../utils/edge3'

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
  pois[0] = new Types.Vector3({x:vOri.x, y:vOri.y})
  pois[1] = new Edge().setByVec(pois[0], lVec, vLength).p2
  pois[2] = new Edge().setByVec(pois[1], wVec, vWdith).p2
  pois[3] = new Edge().setByVec(pois[2], lVec, -vLength).p2
  return createOutlineByPois(pois)
}

export function createOutlineByPois(vPois, vIsClose = true) {
  let outline = new Types.Outline({isClose:vIsClose})
  let length = vIsClose ? vPois.length : vPois.length - 1
    for (let i = 0; i < length; i++) {
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

export function writeItemArrayPB(vInfoArr) {
  let pbArr = []
  for (const info of vInfoArr) {
    pbArr.push(info.writePB())
  }
  return pbArr
}

/**
 * 
 * @param {Types.Vector3} vP1 
 * @param {Types.Vector3} vP2 
 */
export function isVec3Equal(vP1, vP2) {
  let p1 = new THREE.Vector3(vP1.x, vP1.z, vP1.y)
  let p2 = new THREE.Vector3(vP2.x, vP2.z, vP2.y)
  if (p1.distanceTo(p2) < 1) {
    return true
  } else {
    return false
  }
}

/**
 * 
 * @param {Types.Vector3} vP1 
 * @param {Types.Vector3} vP2 
 */
export function isVec2Equal(vP1, vP2) {
  let p1 = new THREE.Vector2(vP1.x, vP1.y)
  let p2 = new THREE.Vector2(vP2.x, vP2.y)
  if (p1.distanceTo(p2) < 1) {
    return true
  } else {
    return false
  }
}

/**
   * 
   * @param {Array<Types.Edge>} vPriEdges 
   * @param {Array<Types.Edge>} vAddEdges 
   */
export function  concatEdges (vPriEdges, vAddEdges) {
  let lastE = vPriEdges[vPriEdges.length - 1]
  let firstE = vAddEdges[0]
  if (lastE && firstE) {
    if (!isVec3Equal(lastE.p2, firstE.p1)) {
      vPriEdges.push(new Types.Edge({p1:lastE.p2, p2:firstE.p1,type:Types.EdgeType.estraight}))
    }
  }
  return vPriEdges.concat(vAddEdges)
}

export default {
  parseSpecification,
  createRectOutline,
  getItemFromOptions,
  createOutlineByPois,
  writeItemArrayPB,
  isVec3Equal,
  concatEdges,
  isVec2Equal
}
