import { Types } from '../types/stair_v2'

export const StructConfig = {
  INIT_WALL_DEPTH: 240,
  INIT_HOLE_LENGTH: 3000,
  INIT_HOLE_WIDTH: 3000,
  CUR_PROJ: null,
  CENTER: new THREE.Vector2(),
  ROTATE_CENTER: new THREE.Vector2(),
  INFOS: new Map(),
  SELECTED: null
}

export const Default = {
  FLOOR_HEIGHT: 2840,
  WALL_DEPTH: 240,
  HOLE_LENGTH: 4000,
  HOLE_WIDTH: 3000,
  INLAY_WIDTH: 600,
  INLAY_HEIGHT: 2000,
  CEMENT_SIZE: 300,
  STEP_NUM_RULE: Types.StepNumRule.snr_n_add_1,
  STEP_NUM: 15,
  STEP_LENGTH: 900,
  STEP_WIDTH: 259,
  TREAD_DEPTH: 30,
  RISER_DEPTH: 20,
  TREAD_NOSSING: 0,
  TREAD_SIDE_NOSSING: 20,
  SMALL_COL_ARR_RULE: Types.ArrangeRule.arrThree,
  SMALL_COL_SPEC: '58*58*950',
  BIG_COL_POS_TYPE: Types.BigColumnPosType.bcp_floor,
  BIG_COL_SPEC: '110*110*1200',
  BIG_COL_GAP: 20,
  GIRDER_TYPE: Types.GirderType.gslab,
  GIRDER_HEIGHT: 180,
  GIRDER_DEPTH: 50,
  HAND_HEIGHT: 870,
  HAND_SPEC: '60*80',
  HANG_BOARD_DEPTH: 40,
}
