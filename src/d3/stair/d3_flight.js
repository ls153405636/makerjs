import { COMP_TYPES } from "../../common/common_config";
import { Types } from "../../types/stair_v2";
import { ChildModel } from "../d3_child_model";
import { Tread } from "./d3_tread";


export class Flight extends ChildModel {
  /**
   * 
   * @param {} vParent 
   * @param {Types.Flight} vPB 
   */
  constructor(vParent, vPB, vTreParas, vRiserParas) {
    super(vParent,vPB.uuid)
    /**@type {Array<Tread>} */
    this.treads = []
    for (const t of vPB.treads) {
      this.treads.push(new Tread(this, t, vTreParas, vRiserParas))
    }
    this.createObj()
  }

  dispose() {
    for (const t of this.treads) {
      t.dispose()
    }
  }

  setHover(vIsHover) {
    this.treads.forEach(t => {
      t.setHover(vIsHover)
    })
  }

  setSelected(vIsSelected) {
    this.treads.forEach(t => {
      t.setSelected(vIsSelected)
    })
  }

  getCompType() {
    return COMP_TYPES.FLIGHT
  }

  createObj() {
    this.obj = new THREE.Group()
    for (const t of this.treads) {
      t.getObj() && this.obj.add(t.getObj())
    }
  }
}