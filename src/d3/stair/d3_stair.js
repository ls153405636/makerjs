import { Types } from "../../types/stair_v2";
import { BaseModel } from "../d3_base_model";
import { Flight } from "./d3_flight";
import { Girder } from "./d3_girder";


export class Stair extends BaseModel {
  /**
   * 整套楼梯
   * @param {Types.Stair} vPB 
   */
  constructor(vPB) {
    super()
    this.init(vPB)
  }

  /**
   * 
   * @param {Types.Stair} vPB 
   */
  init(vPB) {
    /**@type {Flight} */
    this.flights = []
    this.girders = []
    for (const f of vPB.flights) {
      this.flights.push(new Flight(this, f, vPB.treadParameters, vPB.riserParameters))
    }
    for (const l of vPB.landings) {
      this.flights.push(new Flight(this, l, vPB.treadParameters, vPB.riserParameters))
    }
    for (let i = 0; i < vPB.girders.length; i++) {
      let g = vPB.girders[i]
      this.girders.push(new Girder(this, g, vPB.girderParameters))
    }
    this.createObj()
  }

  createObj() {
    this.obj = new THREE.Group()
    for (const f of this.flights) {
      this.obj.add(f.getObj())
    }
    for (const g of this.girders) {
      this.obj.add(g.getObj())
    }
  }

  update(vPB) {

  }
}