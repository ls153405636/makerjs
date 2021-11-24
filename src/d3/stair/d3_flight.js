import { Types } from "../../types/stair_v2";
import { ChildObj } from "../d3_child_obj";


export class Flight extends ChildObj {
  /**
   * 
   * @param {} vParent 
   * @param {Types.Flight} vPB 
   */
  constructor(vParent, vPB) {
    super(vParent,vPB.uuid)
  }
}