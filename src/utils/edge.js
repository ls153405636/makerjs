import { Types } from '../types/stair_v2'

export class Edge {
  static center = new THREE.Vector2(0, 0)
  /**
   * 根据PB中的Edge而设置的处理工具类
   * 此边默认处于x轴水平向右，y轴竖直向下的2d平面
   * 顺时针方向为正x至正y
   * 角度正x方向为0，正y方向为pai/2
   * 后续如果3d2d放样的坐标轴方向或顺逆时针等等有差异
   * 需另行派生处理，不可在此类中添加其余方法
   * @param {Types.Edge} vPB
   */
  constructor(vPB) {
    if (vPB) {
      this.p1 = new THREE.Vector2(vPB.p1.x, vPB.p1.y)
      this.p2 = new THREE.Vector2(vPB.p2.x, vPB.p2.y)
      this.zCoord = vPB.p1.z
      if (vPB.controlPos) {
        this.controlPos = new THREE.Vector2(vPB.controlPos.x, vPB.controlPos.y)
      }
      this.type = vPB.type
    } else {
      this.type === Types.EdgeType.estraight
    }
    this.vec = null
    this.normal = null
  }

  /**
   * 通过起点和方向来初始化边
   * @param {Types.Vector3} vP1 
   * @param {Types.Vector3} vVec
   * @param {Number} vLength 
   */
  setByVec (vP1, vVec, vLength) {
    this.p1 = new THREE.Vector2(vP1.x, vP1.y)
    this.vec = new THREE.Vector2(vVec.x, vVec.y)
    this.p2 = this.p1.clone().addScaledVector(this.vec, vLength)
    this.zCoord = vP1.z
    return this.writePB()
  }

  /**
   * 为边设置一个统一的z坐标
   * @param {Number} vZCoord z坐标 
   */
  setZCoord (vZCoord) {
    this.zCoord = vZCoord
    return this.writePB()
  }

  /**
   *获取线段的方向向量
   * @returns THREE.Vector2
   */
  getVec() {
    if (!this.vec) {
      this.vec = new THREE.Vector2().subVectors(this.p2, this.p1).normalize()
    }
    return this.vec.clone()
  }

  /**
   *获取P1
   * @returns THREE.Vector2
   */
  getP1() {
    return this.p1.clone()
  }

  /**
   *获取P2
   * @returns THREE.Vector2
   */
  getP2() {
    return this.p2.clone()
  }

  /**
   * 获取长度
   * @returns
   */
  getLength() {
    if (!this.length) {
      this.length = new THREE.Vector2().subVectors(this.p2, this.p1).length()
    }
    return this.length
  }

  /**
   * 获取向量角度
   * @returns
   */
  getAngle() {
    return this.getVec().angle()
  }

  /**
   *获取线段法线，默认线段所处轮廓为顺时针
   * @returns THREE.Vector2
   */
  getNormal() {
    if (!this.normal) {
      //轮廓方向永远为2d平面（即y轴竖直向下的平面）的顺时针
      //转换到threejs的2d平面后，则变为逆时针
      //因此法线方向需顺时针旋转
      this.normal = this.getVec()
        .rotateAround(Edge.center, -Math.PI / 2)
        .normalize()
      this.normal.x = Number(this.normal.x.toFixed(2))
      this.normal.y = Number(this.normal.y.toFixed(2))
    }
    return this.normal.clone()
  }

  /**
   * 通过偏移获得新Edge
   * @param {Number} vDis 偏移的距离
   * @param {boolean} vPlus 是否为法线方向偏移，true为法线方向，false为法线反方向
   * @returns {Types.Edge}
   */
  offset(vDis, vPlus = true) {
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
    this.p1 = newP1
    this.p2 = newP2
    return this.writePB()
  }

  /**
   * 从p1方向将边延长
   * @param {Number} vDis 
   * @returns {Types.Edge}
   */
  extendP1(vDis) {
    let vec = this.getVec()
    vec.negate()
    let length = this.getLength()
    this.p1 = this.p2.clone().addScaledVector(vec, length + vDis)
    this.length = new THREE.Vector2().subVectors(this.p2, this.p1).length()
    return this.writePB()
  }

  /**
   *从p2方向将边延长 
   * @param {Number} vDis 
   * @returns {Types.Edge}
   */
  extendP2(vDis) {
    let vec = this.getVec()
    let length = this.getLength()
    this.p2 = this.p1.clone().addScaledVector(vec, length + vDis)
    this.length = new THREE.Vector2().subVectors(this.p2, this.p1).length()
    return this.writePB()
  }

  /**
   * 合并在同一条直线上的边
   * @param {Types.Edge} vEdge 
   * @returns {Types.Edge}
   */
  combineEdge(vEdge) {
    let pb = this.writePB()
    pb.p2 = vEdge.p2
    return pb
  }

  /**
   * 反转线段
   * @returns {Types.Edge}
   */
  reserve() {
    let temp = this.p1
    this.p1 = this.p2
    this.p2 = temp
    return this.writePB()
  }



  /**
   * 获取线段中心点
   * @return {Types.Vector3}
   */
  getCenter () {
    return new Types.Vector3({
      x:(this.p1.x + this.p2.x) / 2,
      y:(this.p1.y + this.p2.y) / 2
    })
  }

  writePB () {
    let pb = new Types.Edge({
      p1: new Types.Vector3({ x: this.p1.x, y: this.p1.y, z: this.zCoord}),
      p2: new Types.Vector3({ x: this.p2.x, y: this.p2.y, z: this.zCoord }),
      type: this.type
    })
    if (this.controlPos) {
      pb.controlPos = new Types.Vector3({x:this.controlPos.x, y:this.controlPos.y, z:this.zCoord})
    }
    return pb
  }
}
