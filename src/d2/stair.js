import { Types } from "../types/stair_v2";
import { BaseWidget } from "./base_widget";
import { Flight } from "./flight";


export class Stair extends BaseWidget{
  /**
   * 
   * @param {Types.Stair} vPB 
   */
  constructor (vPB) {
    this.flights = []
    for (const f of vPB.flights) {
      this.flights.push(new Flight(f))
    }

  }

  draw () {
  }
}