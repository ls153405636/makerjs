import { Types } from "../types/stair_v2"
import { Default, StructConfig } from "./config"


export class Stair {
  constructor (/*{uuid, againstWallType, type, startBeamDepth, exitBeamDepth}*/) {
    this.uuid = ''
    this.flights = []
    this.stepNum = Default.STEP_NUM
    this.stepNumRule = Default.STEP_NUM_RULE
    this.againstWallType = Types.AgainstWallType.aw_no
    this.type = Types.StairType.sstright
    this.startBeamDepth = 0
    this.exitBeamDepth = 0
    this.treadParameters = new Types.TreadParameters({
      depth: 40,
      nossing: 0
    })
    this.riserParameters = new Types.RiserParameters({
      depth: 20
    })
    this.computeSize()
    this.computePosition()
    this.createFlights()
  }

  computeSize () {
    this.width = Default.STEP_LENGTH
    this.depth = Default.STEP_WIDTH * (this.stepNum - this.stepNumRule + 1)
    this.height = StructConfig.CUR_PROJ.hole.floorHeight
  }

  computePosition () {
    let hole = StructConfig.CUR_PROJ.hole
    let edges = hole.edges
    let botEdge = edges[0]
    let botCenter = {x: (edges[0].p1.x + edges[0].p2.x) / 2, y: (edges[0].p1.y + edges[0].p2.y) / 2}
    let topCenter = botCenter
    for (const e of edges) {
      let center = {x: (e.p1.x + e.p2.x) / 2, y: (e.p1.y + e.p2.y) / 2}
      if (center.y > botCenter.y && e.p1.x !== e.p2.x) {
        botCenter = center
        botEdge = e
      }
      if (center.y < topCenter.y && e.p1.x !== e.p2.x) {
        topCenter = center
      }
    }
    this.position = new Types.Vector3({y: topCenter.y})
    if (this.againstWallType === Types.AgainstWallType.aw_no) {
      this.position.x = botCenter.x - this.width / 2
    } else if (this.againstWallType === Types.AgainstWallType.aw_right) {
      this.position.x = botEdge.p1.x < botEdge.p2.x ? botEdge.p2.x - this.width : botEdge.p1.x - this.width 
    } else {
      this.position.x = botEdge.p1.x < botEdge.p2.x ? botEdge.p1.x : botEdge.p2.x
    }
  }

  createFlights () {
    let flight = new Types.Flight({
      stepLength: Default.STEP_LENGTH,
      stepWidth: Default.STEP_WIDTH,
      stepNumRule: this.stepNumRule,
      stepNum: this.stepNum,
    })
    let step_num = flight.stepNum + 1 - flight.stepNumRule
    flight.step_height = Math.ceil(this.height / step_num)
    for (let i = 0; i < step_num; i++) {
      let tread = new Types.Tread({})
      let edges = []
      edges.push(
        new Types.Edge({
          p1: new Types.Vector3({ x: 0, y: flight.stepWidth * i }),
          p2: new Types.Vector3({
            x: flight.stepLength,
            y: flight.stepWidth * i,
          }),
          type: Types.EdgeType.estraight,
        })
      )
      edges.push(
        new Types.Edge({
          p1: new Types.Vector3({
            x: flight.stepLength,
            y: flight.stepWidth * i,
          }),
          p2: new Types.Vector3({
            x: flight.stepLength,
            y: flight.stepWidth * (i + 1),
          }),
          type: Types.EdgeType.estraight,
        })
      )
      edges.push(
        new Types.Edge({
          p1: new Types.Vector3({
            x: flight.stepLength,
            y: flight.stepWidth * (i + 1),
          }),
          p2: new Types.Vector3({
            x: 0,
            y: flight.stepWidth * (i + 1),
          }),
          type: Types.EdgeType.estraight,
        })
      )
      edges.push(
        new Types.Edge({
          p1: new Types.Vector3({
            x: 0,
            y: flight.stepWidth * (i + 1),
          }),
          p2: new Types.Vector3({ x: 0, y: flight.stepWidth * i }),
          type: Types.EdgeType.estraight,
        })
      )
      tread.stepOutline = new Types.Outline({
        edges: edges,
      })
      flight.treads.push(tread)
    }
    flight.treads.reverse()
    this.flights = [flight]
  }



  writePB () {
    return new Types.Stair ({
      uuid: this.uuid,
      startBeamDepth: this.startBeamDepth,
      exitBeamDepth: this.exitBeamDepth,
      type: this.type,
      againstWallType: this.againstWallType,
      treadParameters: this.treadParameters,
      riserParameters: this.riserParameters,
      stepParameters: new Types.StepParameters({
        stepLength: this.width,
        stepWidth: this.flights[0].stepWidth,
        stepNumRule: this.stepNumRule,
        stepNum: this.stepNum
      }),
      flights: this.flights,
      position: this.position
    })
  }
}