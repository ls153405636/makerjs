import { Types } from "../types/stair_v2"
import { Edge } from "../utils/edge"
import { Stair } from "./stair"


export class UTypeStair extends Stair {
  constructor(vParnet, vAgainstWall, vFloadSide ) {
    super(vParnet, vAgainstWall)
    if (this.againstWallType === Types.AgainstWallType.aw_left) {
      this.floadSide = Types.Side.si_right
    } else if (this.againstWallType === Types.AgainstWallType.aw_right) {
      this.floadSide = Types.Side.si_left
    } else {
      this.floadSide = vFloadSide || Types.Side.si_right
    }
  }

  computePosition() {
    let topEdge = this.parent.hole.getEdgeByPos('top')
    let botEdge = this.parent.hole.getEdgeByPos('bot')
    this.position = new Types.Vector3()
    this.position.y = botEdge.p1.y - this.depth2
    if (this.againstWallType === Types.AgainstWallType.aw_right) {
      this.position.x = topEdge.p2.x - this.width
    } else if (this.againstWallType === Types.AgainstWallType.aw_left) {
      this.position.x = topEdge.p1.x
    } else {
      this.position.x = new Edge(topEdge).getCenter().x - this.width / 2
    }
  }

  updateItem(vValue, vKey1, vKey2) {
    if (vKey2 && ['model', 'material'].includes(vKey2)) {
      console.log(1)
    } else if (vKey1 === 'stepNum') {
      let lengthArr = []
      this.flights.forEach(f => {
        lengthArr.push(f.length)
      })
      let stepNumArr = this.computeFlightStepNum(vValue, lengthArr)
      this.flights.forEach((f,i) => {
        f.updateItem(stepNumArr[i], vKey1, vKey2)
      })
    } else if (vKey1 === 'stepNumRule') {
      this.stepNumRule = vValue
      let lastIndex = this.startFlight ? this.flights.length - 2 : this.flights.length - 1
      this.flights[lastIndex].updateItem(vValue, vKey1, vKey2)
    } else {
      super.updateItem(vValue, vKey1, vKey2)
    }
  }

  computeFlightStepNum (vStepNum, vLengthArr) {
    let fStepNum = vStepNum + 1 - this.stepNumRule
    this.landings.forEach(l=>{
      fStepNum = fStepNum - l.stepNum
    })
    fStepNum = fStepNum - (this.startFlight?.stepNum || 0)
    let stepNumArr = []
    let stepNumSum = 0
    let i = 0
    let lengthSum = 0
    vLengthArr.forEach(l => {
      lengthSum += l
    })
    for (; i < vLengthArr.length - 1; i++) {
      let num = Number((vLengthArr[i] / lengthSum * fStepNum).toFixed(0))
      num = Math.max(num, 1)
      stepNumArr.push(num)
      stepNumSum += num
    }
    stepNumArr[i] = Math.max(fStepNum - stepNumSum, 1)
    stepNumArr[i] = stepNumArr[i] + this.stepNumRule - 1
    return stepNumArr
  }

  computeStepNum () {
    this.stepNum = 0
    for (const f of this.flights) {
      this.stepNum = this.stepNum + f.stepNum
    }
    for (const l of this.landings) {
      this.stepNum = this.stepNum + l.stepNum
    }
    let lastIndex = this.startFlight ? this.flights.length - 2 : this.flights.length - 1
    this.stepNumRule = this.flights[lastIndex].stepNumRule
    this.realStepNum = this.stepNum - this.stepNumRule + 1
  }

}