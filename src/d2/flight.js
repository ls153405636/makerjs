import { Types } from "../types/stair_v2";
import { BaseWidget } from "./base_widget";
import { Tread } from "./tread";


export class Flight extends BaseWidget{
  /**
   * 
   * @param {Types.Flight} vPB 
   */
  constructor (vPB) {
    this.treads = []
    for (const t of vPB.treads) {
      this.treads.push(new Tread(t))
    }
  }
  
}