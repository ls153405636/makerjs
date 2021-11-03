import { Types } from "../types/stair_v2";


export class Edge {
  static center = new THREE.Vector2(0, 0)
  /**
   * @param {Types.Edge} vPB 
   */
  constructor (vPB) {
    this.p1 = new THREE.Vector2(vPB.p1.x, vPB.p1.y)
    this.p2 = new THREE.Vector2(vPB.p2.x, vPB.p2.y)
    this.vec = null
    this.normal = null
  }

  /**
   * 
   * @returns THREE.Vector2
   */
  getVec () {
    if (!this.vec) {
      this.vec = new THREE.Vector2().subVectors(this.p2, this.p1).normalize()
    }
    return this.vec.clone()
  }

  /**
   * 
   * @returns THREE.Vector2
   */
  getP1 () {
    return this.p1.clone()
  }

  /**
   * 
   * @returns THREE.Vector2
   */
  getP2 () {
    return this.p2.clone()
  }

  /**
   * 获取长度
   * @returns 
   */
  getLength () {
    if (!this.length) {
      this.length = new THREE.Vector2().subVectors(this.p2, this.p1).length()
    }
    return this.length
  }

  /**
   * 获取向量角度
   * @returns 
   */
  getAngle () {
    return this.getVec().angle()
  }

  /**
   * 
   * @returns THREE.Vector2
   */
  getNormal () {
    if (!this.normal) {
      //轮廓方向永远为2d平面（即y轴竖直向下的平面）的顺时针
      //转换到threejs的2d平面后，则变为逆时针
      //因此法线方向需顺时针旋转
      this.normal = this.getVec().rotateAround(Edge.center, -Math.PI / 2).normalize()
    }
    return this.normal.clone()
  }


  /**
   * 通过偏移获得新Edge
   * @param {Number} vDis 偏移的距离 
   * @param {boolean} vPlus 是否为法线方向偏移，true为法线方向，false为法线反方向
   * @returns {Types.Edge}
   */
  offSet (vDis, vPlus = true) {
    let nor = this.getNormal()
    if (!vPlus) {
      nor.negate()
    }
    let newP1 = new THREE.Vector2().addVectors(
      this.p1,
      nor.clone().multiplyScalar(vDis)
    )
    let newP2 = new THREE.Vector2().addVectors(
      this.p2,
      nor.clone().multiplyScalar(vDis)
    )
    return new Types.Edge({
      p1: new Types.Vector3({x:newP1.x, y:newP1.y}),
      p2: new Types.Vector3({x:newP2.x, y:newP2.y})
    })
  }

  extendP1 (vDis) {
    let vec = this.getVec()
    vec.negate()
    let length = this.getLength()
    this.p1 = this.p2.clone().addScaledVector(vec, (length+vDis))
    return this.writePB()
  }

  extendP2 (vDis) {
    let vec = this.getVec()
    let length = this.getLength()
    this.p2 = this.p1.clone().addScaledVector(vec, (length+vDis))
    return this.writePB()
  }

  /**
   * @return {Types.Outline}
   */
  getCenter () {

  }

  writePB () {
    return new Types.Edge({
      p1:new Types.Vector3({x:this.p1.x, y:this.p1.y}),
      p2:new Types.Vector3({x:this.p2.x, y:this.p2.y})
    })
  }
}