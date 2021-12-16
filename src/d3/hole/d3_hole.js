import { COMP_TYPES } from "../../common/common_config";
import { StructConfig } from "../../structure/config";
import { Types } from "../../types/stair_v2";
import { Edge } from "../../utils/edge";
import { Outline } from "../../utils/outline";
import { BaseModel } from "../d3_base_model";
import { D3Config, D3Default } from "../d3_config";
import d3_tool from "../d3_tool";


export class Hole extends BaseModel {
  /**
   * 
   * @param {Types.Hole} vPB 
   */
  constructor(vPB) {
    super(vPB.uuid)
    this.init(vPB)
  }

  dispose() {
    D3Config.MODELS.forEach((w) => {
      if (w.getCompType() === COMP_TYPES.WALL) {
        w.dispose()
      }
    })
    super.dispose()
  }

  /**
   * 
   * @param {Types.Hole} vPB 
   */
  init(vPB) {
    let holeInfo = StructConfig.INFOS.get(vPB.uuid)
    let holeEdges = [...vPB.edges]
    let floorEdgesSet = [], lastEdgeNum = -2, firstEdgeNum = -2
    let offsetDis = Math.max(holeInfo.length, holeInfo.width) / 2
    this.obj = new THREE.Group()
    this.lineFrame = new THREE.Group()
    for (let i = 0; i < holeInfo.walls.length; i++) {
      let w = holeInfo.walls[i]
      if ([Types.WallType.wnone, Types.WallType.wfirst].includes(w.type)) {
        if (i === 0) {
          firstEdgeNum = 0
        }
        if (i === lastEdgeNum + 1) {
          floorEdgesSet[floorEdgesSet.length - 1].push(holeEdges[i])
        } else {
          floorEdgesSet.push([holeEdges[i]])
        }
        lastEdgeNum = i
      }
      let pois = new Edge(holeEdges[i]).getPois()
      let d3Pois = []
      for (const p of pois) {
        d3Pois.push(new THREE.Vector3(p.x, p.y, 0))
      }
      let lineFrame = d3_tool.createFrameByPois(pois)
      this.lineFrame.add(lineFrame)
    }
    if (firstEdgeNum === 0 && lastEdgeNum === 3 && floorEdgesSet.length > 1) {
      let lastEdges = floorEdgesSet[floorEdgesSet.length - 1]
      let firstEdges = floorEdgesSet[0]
      firstEdges = lastEdges.concat(firstEdges)
      floorEdgesSet[0] = firstEdges
      floorEdgesSet.pop()
    }
    for (const edges of floorEdgesSet) {
      if (edges.length === 1) {
        let utilE = new Edge(edges[0])
        utilE.extendP1(offsetDis/2)
        utilE.extendP2(offsetDis/2)
        edges[0] = utilE.writePB()
      }
      let inRoute = new Types.Outline({edges:edges, isClock:true})
      inRoute.isClose = edges.length === holeEdges.length
      let outRoute = new Outline(inRoute).offset(offsetDis, true)
      let path = new THREE.Shape()
      for (let k = 0; k < outRoute.edges.length; k++) {
        let e = outRoute.edges[k]
        if (k === 0) {
          path.moveTo(e.p1.x, e.p1.y)
        } else {
          path.lineTo(e.p1.x, e.p1.y)
        }
        if (k === outRoute.edges.length - 1) {
          path.lineTo(e.p2.x, e.p2.y)
        }
      }
      if (outRoute.isClose) {
        let holePath = new THREE.Path()
        holePath.moveTo(inRoute.edges[0].p1.x, inRoute.edges[0].p1.y)
        for (let h = 1; h < inRoute.edges.length; h++) {
          holePath.lineTo(inRoute.edges[h].p1.x, inRoute.edges[h].p1.y)
        }
        holePath.lineTo(inRoute.edges[0].p1.x, inRoute.edges[0].p1.y)
        path.holes.push(holePath)
      } else {
        for (let h = inRoute.edges.length - 1; h >= 0; h--) {
          let e = inRoute.edges[h]
          e = new Edge(e).reserve()
          if (h === inRoute.edges.length - 1) {
            path.lineTo(e.p1.x, e.p1.y)
          }
          path.lineTo(e.p2.x, e.p2.y)
        }
        path.lineTo(outRoute.edges[0].p1.x, outRoute.edges[0].p1.y)
      }

      let geo = new THREE.ShapeGeometry(path)
      let floor = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({color:D3Default.FLOOR_COLOR, side:THREE.DoubleSide}))
      //let lineFrame = d3_tool.createFrameByPois(linePois)
      let lineFrame = d3_tool.createFrameByGeo(geo)
      this.lineFrame.add(lineFrame)
      this.obj.add(floor)
    }
    this.obj.add(this.lineFrame)
    this.obj.rotateX(Math.PI/2)
    this.obj.position.y = vPB.floorHeight
  }
}