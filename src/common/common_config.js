export const COMP_TYPES = {
  HOLE: 1,
  WALL: 2,
  STAIR: 3,
  FLIGHT: 4,
  SMALL_COLUMN: 5,
  BIG_COLUMN: 6,
  GIRDER: 7,
  TREAD: 8,
  HANDRAIL: 9,
  INLAY: 10,
  CEMENT_COMP: 11,
  HANGING_BOARD: 12,
  LANDING: 13,
  RISER: 14,
}

export const CUR_DATA = {
  SELECTED_TYPE: COMP_TYPES.HOLE,
  SELECTED_ID: '',
  MODE: '2d',
}

export default {
  COMP_TYPES,
  CUR_DATA,
}
