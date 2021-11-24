import { Types } from "../types/stair_v2";
import { Edge } from "./edge";


export class Outline {
  /**
   * 
   * @param {Types.Outline} vPB 
   */
  constructor (vPB) {
    this.edges = []
    this.isClose = vPB.isClose
    for (const e of vPB.edges) {
      this.edges.push(new Edge(e))
    }
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
      if (i === this.edges - 1) {
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
      if (lEdge) {
        p1OffsetDir = new THREE.Vector2().addVectors(nor, lEdge.getNormal()).normalize()
        if (p1OffsetDir.length() < 0.01) {
          p1OffsetDir = e.getNormal()
        } else {
          let angle = p1OffsetDir.angle() - nor.angle()
          dis1 = dis1 / Math.abs(Math.cos(angle)) 
        }
      } else {
        p1OffsetDir = e.getNormal()
      }
      if (nEdge) {
        p2OffsetDir = new THREE.Vector2().addVectors(nor, nEdge.getNormal()).normalize()
        if (p2OffsetDir.length() < 0.01) {
          p2OffsetDir = e.getNormal()
        } else {
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
      if (e.type === Types.EdgeType.ebeszer) {
        let conOffsetDir = e.getNormal()
        if (!vPlus) {
          conOffsetDir.negate()
        }
        let conPoi = new Edge().setByVec(e.controlPos, conOffsetDir, vDis).p2
        newEdges.push(new Types.Edge({
          p1: new Types.Vector3({x:newP1.x, y:newP1.y, z:0}),
          p2: new Types.Vector3({x:newP2.x, y:newP2.y, z:0}),
          controlPos: conPoi,
          type: Types.EdgeType.ebeszer
        }))
        
      } else {
        newEdges.push(new Types.Edge({
          p1: new Types.Vector3({x:newP1.x, y:newP1.y, z:0}),
          p2: new Types.Vector3({x:newP2.x, y:newP2.y, z:0}),
          type: Types.EdgeType.estraight
        }))
        
      }
    }
    return new Types.Outline({
      edges: newEdges
    })
  }
}