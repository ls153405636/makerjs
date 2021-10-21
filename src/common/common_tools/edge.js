import { Types } from "../../types/stair_v2";


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

  getVec () {
    if (!this.vec) {
      this.vec = new THREE.Vector2().subVectors(this.p2, this.p1).normalize()
    }
    return this.vec.clone()
  }

  getP1 () {
    return this.p1.clone()
  }

  getP2 () {
    return this.p2.clone()
  }

  getNormal () {
    if (!this.normal) {
      //轮廓方向永远为2d平面（即y轴竖直向下的平面）的顺时针
      //转换到threejs的2d平面后，则变为逆时针
      //因此法线方向需顺时针旋转
      this.normal = this.getVec().rotateAround(Edge.center, -Math.PI / 2).normalize()
    }
    return this.normal.clone()
  }

  offSet () {
    
  }
}