import { Types } from '../types/stair_v2'

export class UtilVec2 {
  static center = new THREE.Vector2(0, 0)
  /**
   *Creates an instance of Vector2.
   * @param {Types.Vector3} vVector3
   * @memberof Vector2
   */
  constructor(vVector3) {
    this.vec = new THREE.Vector2(vVector3.x, vVector3.y)
    this.zCoord = vVector3.z || 0
  }

  getDir() {
    return this.vec.clone().normalize()
  }

  getAngle() {
    return this.vec.angle()
  }

  round(vAngle) {
    this.vec.rotateAround(center, vAngle)
    return this
  }

  clone() {
    return new UtilVec2(this.writePB())
  }

  negate() {
    this.vec.negate()
    return this
  }

  writePB() {
    return new Types.Vector3({
      x: this.vec.x,
      y: this.vec.y,
      z: this.zCoord
    })
  }
}