// import * as PIXI from 'pixi.js'

import { initProj } from '../init_temp'
import { BaseWidget } from './base'
import { Movie } from './movie'
import * as from 'pixi.js'

export class Hole extends BaseWidget {
  constructor(vPB) {
    this.draw()
  }

  draw () {
    this.sprite = new PIXI.Sprite()
    // // 简化
    // const Application = PIXI.Application,
    // Container = PIXI.Container,
    // loader = PIXI.Loader.shared,
    // resources = PIXI.Loader.shared.resources,
    // Graphics = PIXI.Graphics,
    // TextureCache = PIXI.utils.TextureCache,
    // Sprite = PIXI.Sprite,
    // Text = PIXI.Text,
    // TextStyle = PIXI.TextStyle;

    // // 舞台
    // const app = new Application({
    //   width: 800,
    //   height: 800,
    //   antialias: true,
    //   transparent: false,
    //   resolution: 1,
    //   backgroundColor: 0x1099bb,
    // });
    // document.body.appendChild(app.view);
  }
}