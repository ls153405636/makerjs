import { Types } from "../../types/stair_v2";
import { ChildModel } from "../d3_child_model";
import { Loft } from "../obj_tool/loft";
import { LoftOutline } from "../obj_tool/loft_outline";


export class Handrail extends ChildModel {
  constructor(vParent, vPB, vParas) {
    super(vParent, vPB.uuid)
    this.init(vPB, vParas)
  }

  /**
   *
   * @param {Types.Handrail} vPB
   * @memberof Handrail
   */
  init(vPB, vParas) {
    this.paras = vParas
    this.loft = new Loft(new LoftOutline().createDefaultData(), vPB.route)
    this.createObj()
  }

  createObj() {
    this.obj = this.loft.getObj()
    this.obj.userData.uuid = this.uuid
    this.obj.userData.d3Type = 'obj'
  }

  setHover(vIsHover) {

  }

  setSelected(vIsSelected) {
    
  }
}