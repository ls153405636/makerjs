import { Types } from "../types/stair_v2"

export const StructConfig = {
  INIT_WALL_DEPTH: 240,
  INIT_HOLE_LENGTH: 4000,
  INIT_HOLE_WIDTH: 3000,
  CUR_PROJ: null,
  CENTER: new THREE.Vector2()
}

export const Default = {
  WALL_DEPTH: 240,
  HOLE_LENGTH: 4000,
  HOLE_WIDTH: 3000,
  STEP_NUM_RULE: Types.StepNumRule.snr_n_add_1,
  STEP_NUM: 15,
  STEP_LENGTH: 900,
  STEP_WIDTH: 259,
}