import { Types } from "../../types/stair_v2";
import { BaseWidget } from "../base_widget";
import { Flight } from "./flight";

export class Stair extends BaseWidget {
  /**
   *
   * @param {Types.Stair} vPB
   */
  constructor(vPB) {
    super()
    this.flights = []
    for (const f of vPB.flights) {
      this.flights.push(new Flight(f))
    }
    this.draw()
  }

  draw () {
    this.flights.forEach(f => {
      f.draw()
    })
  }

  addToStage () {
    this.flights.forEach(f => {
      f.addToStage()
    })
  }
}
