import { BaseWidget } from "./base";
import { Movie } from "./movie";
import * as from 'pixi.js'

export class Wall extends BaseWidget{
  constructor() {
    super()
    this.draw()

  }

  draw () {
    this.sprite = new PIXI.Container()
  }
}