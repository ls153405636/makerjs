export class Movie {
  constructor() {
    if (!Movie.instance) {
      let app = new PIXI.Application({
        width                : 860,
        height               : 480,
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
      app.renderer.resize(window.screen.availWidth, window.screen.availHeight)

      this.app = app

      this.scale = 1

      RunContext.context = this
      Movie.instance = this
    }
    return Movie.instance
  }

  bootstrap() {
    document.querySelector("#canvas").appendChild(this.app.view);
  }
}