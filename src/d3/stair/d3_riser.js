import { Types } from "../../types/stair_v2";
import { Edge } from "../../utils/edge";
import { Outline } from "../../utils/outline";
import { ChildModel } from "../d3_child_model";
import { Face } from "../obj_tool/face";
import { VerFace } from "../obj_tool/ver_face";
import { XZOutline } from "../obj_tool/XZOutline";


export class Riser extends ChildModel {
  /**
   * 
   * @param {*} vParent 
   * @param {Types.Outline} vFrontRoute 
   * @param {Types.RiserParameters} vParas
   */
  constructor (vParent, vFrontRoute, vParas, vHeight) {
    super(vParent, '')
    let outRoute = vFrontRoute
    let inRoute = new Outline(outRoute).offset(vParas.depth, !vFrontRoute.isClock)
    let edges = [...outRoute.edges]

    for (let i = inRoute.edges.length - 1; i>=0; i--) {
      let e = new Edge(inRoute.edges[i]).reserve()
      if (i === 0 ) {
        edges.push(new Types.Edge({
          p1: edges[edges.length-1].p2,
          p2: e.p1,
          type: Types.EdgeType.estraight
        }))
      }
      edges.push(e)
      if (i === inRoute.edges.length - 1) {
        edges.push(new Types.Edge({
          p1:e.p2,
          p2:edges[0].p1,
          type: Types.EdgeType.estraight
        }))
      }
    }
    let outline = new Types.Outline({edges: edges,
                                    isClock: vFrontRoute.isClock,
                                    isClose: true
                                    })
    let botOutline = new XZOutline(outline)
    let topOutline = new XZOutline(outline)
    topOutline.setZCoord(botOutline.zCoord + vHeight)
    this.botFace = new Face(botOutline)
    this.topFace = new Face(topOutline)
    this.sideFace = new VerFace(botOutline, vHeight)
    this.createObj()
  }

  createObj() {
    this.obj = new THREE.Group()
    this.obj.add(this.botFace.getObj())
    this.obj.add(this.topFace.getObj())
    this.obj.add(this.sideFace.getObj())
  }
}