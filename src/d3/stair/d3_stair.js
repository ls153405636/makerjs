import { Types } from "../../types/stair_v2";
import { BaseModel } from "../d3_base_model";
import { D3Config } from "../d3_config";
import { Flight } from "./d3_flight";
import { Girder } from "./d3_girder";
import { Handrail } from "./d3_handrail";


export class Stair extends BaseModel {
  /**
   * 整套楼梯
   * @param {Types.Stair} vPB 
   */
  constructor(vPB) {
    super(vPB.uuid)
    this.init(vPB)
  }

  dispose() {
    for (const f of this.flights) {
      f.dispose()
    }
    for (const g of this.girders) {
      g.dispose()
    }
    for (const h of this.handrails) {
      h.dispose()
    }
    super.dispose()
  }

  /**
   * 
   * @param {Types.Stair} vPB 
   */
  init(vPB) {
    /**@type {Flight} */
    this.flights = []
    this.girders = []
    this.handrails = []
    for (let i = 0; i < vPB.flights.length; i++) {
      let f = vPB.flights[i]
      this.flights.push(new Flight(this, f, vPB.treadParameters, vPB.riserParameters))
    }
    for (const l of vPB.landings) {
      this.flights.push(new Flight(this, l, vPB.treadParameters, vPB.riserParameters))
    }
    for (let i = 0; i < vPB.girders.length; i++) {
      let g = vPB.girders[i]
      this.girders.push(new Girder(this, g, vPB.girderParameters))
    }
    // for (let i = 0; i < vPB.handrails.length; i++) {
    //   let g = vPB.handrails[i]
    //   this.handrails.push(new Handrail(this, g, vPB.handrailParameters))
    // }
    this.createObj()
  }

  createObj() {
    this.obj = new THREE.Group()
    for (const f of this.flights) {
      f.getObj() && this.obj.add(f.getObj())
    }
    for (const g of this.girders) {
      g.getObj() && this.obj.add(g.getObj())
    }
    for (const h of this.handrails) {
      h.getObj() && this.obj.add(h.getObj())
    }
    D3Config.OBJS.push(this.obj)
  }
}