import { Types } from '../types/stair_v2'

export const StructConfig = {
  INIT_WALL_DEPTH: 240,
  INIT_HOLE_LENGTH: 3000,
  INIT_HOLE_WIDTH: 3000,
  CUR_PROJ: null,
  CENTER: new THREE.Vector2(),
  ROTATE_CENTER: new THREE.Vector2(),
  INFOS: new Map(),
  SELECTED: null,
}

export const Default = {
  FLOOR_HEIGHT: 3000,
  WALL_DEPTH: 240,
  HOLE_LENGTH: 2800,
  HOLE_WIDTH: 2500,
  L_HOLE_T_LENGTH: 2000,
  L_HOLE_T_WIDTH: 2000,
  L_HOLE_B_LENGTH: 4000,
  L_HOLE_B_WIDTH: 2000,
  INLAY_WIDTH: 600,
  INLAY_HEIGHT: 2000,
  CEMENT_SIZE: 300,
  DISTOSTART: 0,
  DISTOEND: 2200,
  STEP_NUM_RULE: Types.StepNumRule.snr_n_add_1,
  STEP_NUM: 18,
  STEP_LENGTH: 900,
  STEP_WIDTH: 240,
  STEP_WIDTH_MIN: 50,
  STEP_HEIGHT_MIN: 50,
  TREAD_DEPTH: 30,
  RISER_DEPTH: 20,
  TREAD_NOSSING_TYPE: Types.NossingType.ncommon,
  TREAD_NOSSING: 20,
  TREAD_SIDE_NOSSING: 20,
  SMALL_COL_ARR_RULE: Types.ArrangeRule.arrThree,
  SMALL_COL_SPEC: '58*58',
  BIG_COL_POS_TYPE: Types.BigColumnPosType.bcp_first,
  BIG_COL_SPEC: '110*110',
  BIG_COL_GAP: 20,
  BIG_COL_UP_HEIGHT: 150,
  GIRDER_TYPE: Types.GirderType.gsaw,
  GIRDER_HEIGHT: 180,
  GIRDER_DEPTH: 50,
  GIRDER_F_OFFSET: 20,
  GIRDER_B_HEIGHT: 55,
  GIRDER_ABOVE_HEIGHT: 20,
  HAND_HEIGHT: 870,
  HAND_SPEC: '60*80',
  HANG_BOARD_DEPTH: 40,
  LANDING_TYPE: Types.LandingCutType.lct_first,
  START_TREAD_PRO_ID: 1,
  U_TYPE_GAP: 80,
  EXIT_TYPE: Types.StairExitType.se_riser,
  SMALL_COL_SRC: new Types.ObjData({modelPath:'https://stair-dev-next-1305224273.cos.ap-shanghai.myqcloud.com/meta/8f852df7-3f29-402e-b2f8-c4c3784c1e1f/alpha.gltf',
                                   imgPath:'https://stair-dev-next-1305224273.cos.ap-shanghai.myqcloud.com/meta/8f852df7-3f29-402e-b2f8-c4c3784c1e1f/front.png'}),
  BIG_COL_SRC: new Types.ObjData({modelPath:'https://stair-dev-next-1305224273.cos.ap-shanghai.myqcloud.com/default/alpha.gltf',
                                  imgPath:'https://stair-dev-next-1305224273.cos.ap-shanghai.myqcloud.com/default/front.png'}),
  MATERIAL: new Types.Material({path:'https://stair-dev-next-1305224273.cos.ap-shanghai.myqcloud.com/default/hxbs.jpg'}),
  TREAD_MATERIAL: new Types.Material({path:'http://stair-dev-next-1305224273.cos.ap-shanghai.myqcloud.com/default/dls.jpg'})
}
