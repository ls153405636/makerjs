export const D2Config = {
  CANVAS_WIDTH: 1920,
  CANVAS_HEIGHT: 937,
  SCREEN_RATE: 10,
  SELECTED: null,
  CUR_STAIR: null,
  IS_SINGLE_SELECTED: false,
  IS_SHOW: false,
  IS_CHANGE: false,
  /**@type {Map<string, import('./base_widget').BaseWidget>}  */
  WIDGETS: new Map(),
}

export const Z_INDEX = {
  WALL_ZINDEX: 1,
  COMPONENT_ZINDEX: 2,
  STAIR_ZINDEX: 3,
  FLIGHT_ZINDEX: 4,
  TREAD_ZINDEX: 5,
  HANGING_BOARD_ZINDEX: 6,
  HANDRAIL_ZINDEX: 7,
  GIRDER_ZINDEX: 8,
  SMALL_COLUMN_ZINDEX: 9,
  BIG_COLUMN_ZINDEX: 10,
  HOLE_LINE_ZINDEX: 11,
}

window.D2Config = {
  D2Config,
  Z_INDEX
}
// window.D2Config = Z_INDEX
