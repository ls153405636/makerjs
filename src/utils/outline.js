import tool from "../structure/tool";
import { Types } from "../types/stair_v2";
import { Edge } from "./edge";


export class Outline {
  /**
   * 根据PB中的outline而设置的处理工具类
   * 此轮廓默认处于x轴水平向右，y轴竖直向下的2d平面
   * 顺时针方向为正x至正y
   * 角度正x方向为0，正y方向为pai/2
   * 后续如果3d2d放样的坐标轴方向或顺逆时针等等有差异
   * 需另行派生处理，不可在此类中添加其余方法
   * @param {Types.Outline} vPB 
   */
  constructor (vPB) {
    this.edges = []
    this.isClose = vPB.isClose
    this.isClock = vPB.isClock
    this.zCoord = vPB.edges[0].p1.z
    for (const e of vPB.edges) {
      this.edges.push(new Edge(e))
    }
  }

  getPois() {
    let pois = []
    for(let i = 0; i < this.edges.length; i++) {
      let e = this.edges[i]
      if (e.type === Types.EdgeType.estraight) {
        pois.push(e.writePB().p1)
        if (i === this.edges.length - 1 && (!this.isClose)) {
          pois.push(e.writePB().p2)
        }
      } else {
        let path = new THREE.Path()
        let div
        if (e.type === Types.EdgeType.ebeszer) {
          path.moveTo(e.p1.x, e.p1.y)
          path.quadraticCurveTo(e.controlPos.x, e.controlPos.y, e.p2.x, e.p2.y)
        } else if (e.type === Types.EdgeType.earc){
          path.moveTo(0, 0)
          path.arc(e.position.x, e.position.y, e.radius, e.startAngle, e.endAngle, !e.isClockwise)
          let angleDiff = Math.abs(e.endAngle - e.startAngle)
          angleDiff = angleDiff > Math.PI ? Math.PI * 2 - angleDiff : angleDiff
          div = angleDiff / Math.PI * 12
          div = Math.max(Number(div.toFixed(0)), 2)
        }
        let points_2d = path.getPoints(div)
        //console.log(points_2d.length)
        for(const p of points_2d) {
          pois.push(new Types.Vector3({x:p.x, y:p.y, z: this.zCoord}))
        }
      }
    }
    return pois
  }

  /**
   * 为轮廓统一设置z坐标
   */
  setZCoord(vZCoord) {
    this.zCoord = vZCoord
    this.edges.forEach(e => {
      e.setZCoord(vZCoord)
    })
    return this.writePB()
  }

  /**
   * 通过偏移获得新outline
   * @param {Number} vDis 偏移的距离 
   * @param {boolean} vPlus 是否为法线方向偏移，true为法线方向，false为法线反方向
   * @returns {Types.Outline}
   */
  offset (vDis, vPlus) {
    let newEdges = []
    for (let i = 0; i < this.edges.length; i++) {
      let dis1 = vDis, dis2 = vDis
      let e = this.edges[i]
      let lEdge = null, nEdge = null, p1OffsetDir, p2OffsetDir
      let nor = e.getNormal(), vec = e.getVec()
      if (i === this.edges.length - 1) {
        if (this.isClose) {
          nEdge = this.edges[0]
        }
      } else {
        nEdge = this.edges[i + 1]
      }
      if (i === 0) {
        if (this.isClose) {
          lEdge = this.edges[this.edges.length - 1]
        }
      } else {
        lEdge = this.edges[i-1]
      }
      if (lEdge && lEdge.type !== Types.EdgeType.earc) {
        p1OffsetDir = new THREE.Vector2().addVectors(nor, lEdge.getNormal()).normalize()
        if (p1OffsetDir.length() < 0.05) {
          p1OffsetDir = e.getNormal()
        } else if (e.getLength() > 0.05) {
          let angle = p1OffsetDir.angle() - nor.angle()
          dis1 = dis1 / Math.abs(Math.cos(angle)) 
        }
      } else {
        p1OffsetDir = e.getNormal()
      }
      if (nEdge && nEdge.type !== Types.EdgeType.earc) {
        p2OffsetDir = new THREE.Vector2().addVectors(nor, nEdge.getNormal()).normalize()
        if (p2OffsetDir.length() < 0.05) {
          p2OffsetDir = e.getNormal()
        } else if (e.getLength() > 0.05) {
          let angle = p2OffsetDir.angle() - nor.angle()
          dis2 = dis2 / Math.abs(Math.cos(angle)) 
        }
      } else {
        p2OffsetDir = e.getNormal()
      }
      if (!vPlus) {
        p1OffsetDir.negate()
        p2OffsetDir.negate()
      }
      let newP1 = e.getP1().addScaledVector(p1OffsetDir, dis1)
      let newP2 = e.getP2().addScaledVector(p2OffsetDir, dis2)
      let newE = e.writePB()
      newE.p1 = new Types.Vector3({x:newP1.x, y:newP1.y, z:e.zCoord})
      newE.p2 = new Types.Vector3({x:newP2.x, y:newP2.y, z:e.zCoord})
      if (e.type === Types.EdgeType.ebeszer) {
        let conOffsetDir = e.getNormal()
        if (!vPlus) {
          conOffsetDir.negate()
        }
        newE.controlPos = new Edge().setByVec(e.controlPos, conOffsetDir, vDis).p2
      } else if (e.type === Types.EdgeType.earc) {
        // let posOffsetDir = e.getNormal()
        // if (!vPlus) {
        //   posOffsetDir.negate()
        // }
        // newE.position = new Edge().setByVec(e.position, posOffsetDir, vDis).p2
        if (e.isClockwise) {
          newE.radius = vPlus ? e.radius + vDis : e.radius - vDis
        } else {
          newE.radius = vPlus ? e.radius - vDis : e.radius + vDis
        }

      } 
      newEdges.push(newE)
    }
    return new Types.Outline({
      edges: newEdges,
      isClose: this.isClose,
      isClock: this.isClock
    })
  }

  writePB () {
    return new Types.Outline({
      edges:tool.writeItemArrayPB(this.edges),
      isClock:this.isClock,
      isClose:this.isClose
    })
  }

  /**
   * 反转轮廓
   */
  reserve() {
    this.edges.forEach(e => {
      e.reserve()
    })
    this.edges.reverse()
    this.isClock = !this.isClock
    return this.writePB()
  }
}