import { Command } from "../../common/command";
import { Component } from "../component";
import { StructConfig } from "../config";
import { HangingBoard } from "../hanging_board";

export class StrucEleAddCmd extends Command {
  constructor ({type}) {
    super()
    this.info = null
    if (type === '挂板') {
      this.info = new HangingBoard(StructConfig.SELECTED)
    } else if ([1,2,3,4,5].includes(type)) {
      this.info = new Component.TYPE_MAP.get(type)(StructConfig.SELECTED, type)
    }
  }

  execute () {
    this.info.addInfo()
  }

  undo () {
    this.info.delInfo()
  }

  redo () {
    this.info.addInfo()
  }
}