import { Types } from "../../types/stair_v2";
import { ChildObj } from "../d3_child_obj";


export class Tread extends ChildObj {
  /**
   * 
   * @param {*} vParent 
   * @param {Types.Tread} vPB 
   */
  constructor(vParent, vPB) {
    super(vParent, vPB.uuid)
  }
}