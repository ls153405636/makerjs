import d3_tool from "../d3/d3_tool";
import { Types } from "../types/stair_v2";
import { Edge } from "./edge";


export class Edge3 extends Edge {
  /**
   * 
   * @param {Types.Edge} vPB 
   */
  constructor(vPB) {
    super(vPB)
    this.zCoord1 = vPB.p1.z
    this.zCoord2 = vPB.p2.z
    this.p1d3 = new THREE.Vector3(vPB.p1.x, vPB.p1.z, vPB.p1.y)
    this.p2d3 = new THREE.Vector3(vPB.p2.x, vPB.p2.z, vPB.p2.y)
    this.children = []
  }

  getD3Vec() {
    let vec = new THREE.Vector3().subVectors(this.p2d3, this.p1d3).normalize()
    // vec.x = this.fixed(vec.x)
    // vec.y = this.fixed(vec.y)
    // vec.z = this.fixed(vec.z)
    return vec
  }

  getPois() {
    let pois = super.getPois()
    let zStep = (this.zCoord2 - this.zCoord1) / (pois.length-1)
    for (let i = 0; i < pois.length; i++) {
      pois[i].z = this.zCoord1 + zStep * i
    }
    return pois
  }

  split() {
    let pois = this.getPois()
    for (let i = 0; i < pois.length - 1; i++) {
      let p1 = pois[i]
      let p2 = pois[i+1] 
      let edge = new Types.Edge({
        p1: p1, 
        p2: p2,
        type: Types.EdgeType.estraight
      })
      this.children.push(new Edge3(edge))
    }
  }

  /**
   * 
   * @param {Types.Edge} vEdge 
   */
  isD3ParallelTo(vEdge) {
    let vec = this.getD3Vec()
    let vec2 = new Edge3(vEdge).getD3Vec()
    if (vec.distanceTo(vec2) < 0.001) {
      return true
    } else {
      return false
    } 
  }

  combineEdge(vEdge) {
    super.combineEdge(vEdge)
    this.zCoord2 = vEdge.p2.z
    this.p2d3 = new THREE.Vector3(vEdge.p2.x, vEdge.p2.z, vEdge.p2.y)
    return this.writePB()
  }

  writePB() {
    let pb = super.writePB()
    pb.p2.z = this.zCoord2
    return pb
  }
}