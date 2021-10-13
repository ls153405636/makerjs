export const states = {
  // DRAW_LINE nested state
  END: 'END',
  IDLE: 'IDLE',
  PAUSED: 'PAUSED',
  CONTINUE: 'CONTINUE',
}

export const events = {
  KEY_DOWN: 'keydown',
  WHEEL: 'wheel',
  MOUSE_LEAVE: 'mouseleave',

  // PIXI.interaction.InteractionEvent
  // https://pixijs.download/dev/docs/PIXI.InteractionManager.html
  CLICK: 'click',
  MOUSE_DOWN: 'mousedown',
  MOUSE_UP: 'mouseup',
  RIGHT_CLICK: 'rightclick',
  RIGHT_DOWN: 'rightdown',
  RIGHT_UP: 'rightup',
  MOUSE_MOVE: 'mousemove',

  // custom event
  USER_SWITCH: 'switch',
  USER_RESET_CANVAS_POSITION: 'reset_canvas_position',
}

export const guards = {
  key_code_esc(context, event, state) {
    return event?.data?.code === 'Escape'
  },

  mouse_down_right() {},
}
