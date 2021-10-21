import { Types } from "../types/stair_v2";


export class Edge {
  /**
   * @param {Types.Edge} vPB 
   */
  constructor (vPB) {
    this.p1 = new THREE.Vector2(vPB.p1.x, vPB.p1.y)
    this.p2 = new THREE.Vector2(vPB.p2.x, vPB.p2.y)
  }

  getNormal () {

  }

  offSet () {
    
  }
}