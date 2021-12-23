import { Types } from "../types/stair_v2";
import { Edge } from "../utils/edge";
import { Default } from "./config";
import { ArcFlight } from "./flights/arc_flight";
import { Stair } from "./stair";


export class ArcStair extends Stair {
  constructor(vParent, vFloadSide) {
    super(vParent)
    this.floadSide = vFloadSide
  }

  initFlights() {
    let botEdge = this.parent.hole.getEdge('bot')
    let utilEndE = new Edge(botEdge)
    let vClock = this.floadSide === Types.Side.si_left ? true : false
    (!vClock) && utilEndE.reserve()
    let vRadius = Math.max(utilEndE.getLength() / 2, Default.STEP_WIDTH)
    let vStepNum = Math.floor(this.parent.hole.floorHeight / Default.STEP_HEIGHT)
    this.stepNum = vStepNum
    let vEndLVec = utilEndE.getVec()
    let vPos = new Types.Vector3({x:this.parent.hole.length - this.girOffset / 2, y:this.parent.hole.width - this.hangOffset})
    this.flights[0] = new ArcFlight({vParent:this, vRadius, vClock, vCenter, vEndLVec, vPos})
  }

  updateFlights() {

  }
}