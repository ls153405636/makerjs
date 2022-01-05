import { Types } from '../types/stair_v2'

export class UtilVec2 {
  static center = new THREE.Vector2(0, 0)
  /**
   *Creates an instance of Vector2.
   * @param {Types.Vector3} vVector3
   * @memberof Vector2
   */
  constructor(vVector3) {
    if (vVector3) {
      this.vec = new THREE.Vector2(vVector3.x, vVector3.y)
    } else {
      this.vec = new THREE.Vector2()
    }
    this.zCoord = vVector3?.z || 0
  }

  setByAngle(vAngle) {
    this.vec = new THREE.Vector2(1, 0).rotateAround(UtilVec2.center, vAngle).normalize()
    this.zCoord = 0
    return this
  }

  getDir() {
    return this.vec.clone().normalize()
  }

  getAngle() {
    let angle = this.vec.angle()
    return angle % (Math.PI*2)
  }

  /**
   *threejs中xy轴旋转，默认方向为逆时针，但xy到xz平面发生翻转，因此此旋转默认正的方向为xz平面的顺时针
   *
   * @param {*} vAngle
   * @returns
   * @memberof UtilVec2
   */
  round(vAngle) {
    this.vec.rotateAround(UtilVec2.center, vAngle)
    return this
  }

  normalize() {
    this.vec.normalize()
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