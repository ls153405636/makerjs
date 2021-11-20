import { Types } from "../types/stair_v2";
import { ChildInfo } from "./child_info";

export class StartFlight extends ChildInfo{
  static START_TYPE_OPTION = [
    { value: Types.StartTreadType.sel, label: '椭圆型'},
    { value: Types.StartTreadType.srr, label: '双层椭圆型'},
    { value: Types.StartTreadType.sel_w, label: '圆角矩形'},
    { value: Types.StartTreadType.srr_w, label: '双层圆角矩形'},
  ]
  constructor ({vParent, vPos, vLVec, vWVec, vStepLength, vStepWidth}) {
    super(vParent)
    this.stepLength = vStepLength
    this.stepWidth = vStepWidth
  }

  rebuildByParent ({vPos, vLVec, vWVec}) {

  }
}