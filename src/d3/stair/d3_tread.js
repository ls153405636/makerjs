import { Types } from "../../types/stair_v2";
import { Outline } from "../../utils/outline";
import { ChildModel } from "../d3_child_model";
import { Face } from "../obj_tool/face";
import { VerFace } from "../obj_tool/ver_face";
import { XZOutline } from "../obj_tool/XZOutline";
import { Riser } from "./d3_riser";


export class Tread extends ChildModel {
  /**
   * 
   * @param {*} vParent 
   * @param {Types.Tread} vPB 
   * @param {Types.TreadParameters} vParas
   * @param {Types.RiserParameters} vRiserParas
   */
  constructor(vParent, vPB, vParas, vRiserParas) {
    super(vParent, vPB.uuid)
    this.depth = vParas.depth
    this.stepHeight = vPB.stepHeight
    this.sideNossing = vParas.sideNossing
    this.nossing = vParas.nossingType!==Types.NossingType.nno ? vParas.nossing : 0
    this.isLast = vPB.isLast
    let border = vPB.border
    let topOutline = new XZOutline(border.treadOutline)
    let botOutline = new XZOutline(border.treadOutline)
    botOutline.setZCoord(topOutline.zCoord - vParas.depth)
    this.botFace = new Face(botOutline)
    this.topFace = new Face(topOutline)
    this.sideFace = new VerFace(botOutline, vParas.depth)
    this.riser = null
    if (vRiserParas.riserExist) {
      this.createRiser(vPB.border, vRiserParas)
    }
    if (!this.isLast) {
      this.createObj()
    }
  }

  createObj () {
    this.obj = new THREE.Group()
    this.obj.add(this.botFace.getObj())
    this.obj.add(this.topFace.getObj())
    this.obj.add(this.sideFace.getObj())
    this.riser && this.obj.add(this.riser.getObj())
  }

  /**
   * 
   * @param {Types.TreadBorder} vBorder 
   * @param {Types.RiserParameters} vRiserParas
   */
  createRiser (vBorder, vRiserParas) {
    let tOutline = vBorder.stepOutline
    let rOutRoute = new Types.Outline({isClose:false, isClock:tOutline.isClock})
    for (const i of vBorder.frontIndex) {
      rOutRoute.edges.push(tOutline.edges[i])
    }
    let utilRoute = new Outline(rOutRoute)
    utilRoute.setZCoord(utilRoute.zCoord - this.stepHeight)
    rOutRoute = utilRoute.offset(this.nossing, !tOutline.isClock)
    this.riser = new Riser(this, rOutRoute, vRiserParas, this.stepHeight - this.depth)
  }
}