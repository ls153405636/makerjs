import { BaseModel } from "./d3_base_model"


export class ChildModel extends BaseModel{
  constructor(vParent, vUuid) {
    super(vUuid)
    this.parent = vParent
  }
}