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
      this.zCoord = vPB.p1.z || 0
      if (vPB.controlPos) {
        this.controlPos = new THREE.Vector2(vPB.controlPos.x, vPB.controlPos.y)
      }
      this.type = vPB.type
      this.position = vPB.position
      this.radius = vPB.radius
      this.startAngle = vPB.startAngle
      this.endAngle = vPB.endAngle
      this.isClockwise = vPB.isClockwise
    } else {
      this.zCoord = 0
      this.type === Types.EdgeType.estraight
    }
    this.vec = null
    this.normal = null
  }

  getPois() {
    let pois = []
    if (this.type === Types.EdgeType.estraight) {
      return [this.getP1PB(), this.getP2PB()]
    } else {
      let path = new THREE.Path()
      if (this.type === Types.EdgeType.ebeszer) {
        path.moveTo(this.p1.x, this.p1.y)
        path.quadraticCurveTo(this.controlPos.x, this.controlPos.y, this.p2.x, this.p2.y)
      } else if (this.type === Types.EdgeType.earc){
        path.moveTo(0, 0)
        path.arc(this.position.x, this.position.y, this.radius, this.startAngle, this.endAngle, !this.isClockwise)
      }
      let points_2d = path.getPoints()
      let gap = 4
      let i = 0
      for (; i < points_2d.length; i = i + gap) {
        let p = points_2d[i]
        pois.push(new Types.Vector3({x:p.x, y:p.y, z: this.zCoord}))
      }
      if ( i < points_2d.length - 1 + gap) {
        pois.push(new Types.Vector3({x:points_2d[points_2d.length - 1].x, y:points_2d[points_2d.length - 1].y, z: this.zCoord}))
      }
      // for(const p of points_2d) {
      //   pois.push(new Types.Vector3({x:p.x, y:p.y, z: this.zCoord}))
      // }
    }
    return pois
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
    this.zCoord = vP1.z || 0
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
      if (this.getLength() < 0.01) {
        this.vec = new THREE.Vector2()
      } else {
        this.vec = new THREE.Vector2().subVectors(this.p2, this.p1)
        // this.vec.x = this.fixed(this.vec.x)
        // this.vec.y = this.fixed(this.vec.y)
        this.vec.normalize()
      }
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
      if (this.getLength() < 0.01) {
        this.normal = new THREE.Vector2
      } else {
        this.normal = this.getVec()
        .rotateAround(Edge.center, -Math.PI / 2)
        .normalize()
        this.normal.x = Number(this.normal.x.toFixed(2))
        this.normal.y = Number(this.normal.y.toFixed(2))
      }
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
    this.p2 = new THREE.Vector2(vEdge.p2.x, vEdge.p2.y)
    return this.writePB()
  }

  /**
   * 是否与vEdge平行
   * @param {Types.Edge} vEdge 
   */
  isParallelTo(vEdge) {
    let vec = this.getVec()
    let vec2 = new Edge(vEdge).getVec()
    if (vec.distanceTo(vec2) < 0.001) {
      return true
    } else {
      return false
    }
  }

  /**
   * 反转线段
   * @returns {Types.Edge}
   */
  reserve() {
    let temp = this.p1
    this.p1 = this.p2
    this.p2 = temp
    this.vec = null
    this.normal = null
    if (this.type === Types.EdgeType.earc) {
      let tempAngle = this.startAngle
      this.startAngle = this.endAngle
      this.endAngle = tempAngle
      this.isClockwise = !this.isClockwise
    }
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

  fixed (vNumber) {
    return Number(vNumber.toFixed(2))
  }

  writePB () {
    let pb = new Types.Edge({
      p1: new Types.Vector3({ x: this.fixed(this.p1.x), y: this.fixed(this.p1.y), z: this.fixed(this.zCoord)}),
      p2: new Types.Vector3({ x: this.fixed(this.p2.x), y: this.fixed(this.p2.y), z: this.fixed(this.zCoord)}),
      type: this.type
    })
    if (this.controlPos) {
      pb.controlPos = new Types.Vector3({x:this.fixed(this.controlPos.x), y:this.fixed(this.controlPos.y), z:this.fixed(this.zCoord)})
    }
    if (this.type === Types.EdgeType.earc) {
      pb.position = new Types.Vector3({x:this.fixed(this.position.x), y:this.fixed(this.position.y), z:this.fixed(this.zCoord)})
      pb.radius = this.radius
      pb.startAngle = this.startAngle
      pb.endAngle = this.endAngle
      pb.isClockwise = this.isClockwise
    }
    return pb
  }

  getP1PB() {
    return new Types.Vector3({
      x:this.fixed(this.p1.x),
      y:this.fixed(this.p1.y),
      z:this.fixed(this.zCoord)
    })
  }

  getP2PB() {
    return new Types.Vector3({
      x:this.fixed(this.p2.x),
      y:this.fixed(this.p2.y),
      z:this.fixed(this.zCoord)
    })
  }

  clone() {
    return new Edge(this.writePB())
  }

  /**
   * 是否垂直于threejs中的二维向量
   * @param {THREE.Vec2} vec2 
   */
  isVerticalToVec2(vec2) {
    let vec = this.getVec()
    if (Math.abs(vec.dot(vec2)) < 0.001 ) {
      return true
    } else {
      return false
    }
  }
}
