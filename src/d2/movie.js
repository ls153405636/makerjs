import { D2Config } from "./config";

export class Movie {
  constructor() {
    if (!Movie.instance) {
      let app = new PIXI.Application({
        width                : D2Config.CANVAS_WIDTH,
        height               : D2Config.CANVAS_HEIGHT,
        transparent          : false,
        resolution           : 1,
        antialias            : true,
        preserveDrawingBuffer: true,
      });
      
      globalThis.mv = this

      app.stage.cursor             = 'pointer'
      app.stage.interactive        = true
      app.stage.buttonMode         = true
      app.stage.sortableChildren   = true
      app.renderer.backgroundColor = 0xDFDFDF
      
      app.ticker.maxFPS = 60
      
      app.renderer.autoResize = true
      // app.renderer.resize(window.screen.availWidth, window.screen.availHeight)
      
      this.app = app
      
      this.scale = 1
      
      Movie.instance = this
      
    }
    return Movie.instance
  }
  
  bootstrap() {
    
    document.querySelector("#canvas").appendChild(this.app.view);
    
  }

  addEle (vEle) {
    this.app.stage.addChild(vEle)
  }
}

let movie = new Movie()

export default movie