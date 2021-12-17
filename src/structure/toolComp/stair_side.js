
export class StairSide {
  constructor(vSideName) {
    this.sideName = vSideName
    this.handrailExit = true
    this.startBigColExit = true
    this.girders = []
    this.handrails = []
    this.startBigCol = null
  }

  getArgs() {
    return {
      handrailExit:{name:'扶手小柱有无', value: this.handrailExit, type: 'switch' },
      startBigColExit:{name:'起步大柱有无', value: this.startBigColExit, type: 'switch'},
    }
  }
}