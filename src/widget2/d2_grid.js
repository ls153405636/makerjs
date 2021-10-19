const mvcfg = {
  gridTheme: {
    background: 0xe5e5e5, // 背景色
    thickLine: 0x333333, // 粗线框
    slenderLine: 0x333333, // 细线
    backAlpha: 0.5, // 背景透明度
    thickAlpha: 0.1 * 3, // 粗线透明度
    slenderAlpha: 0.1 * 3, // 细线透明度
  },
}

export class D2Grid extends PIXI.Container {
  constructor(zoom, gridWidth, gridHeight, interval, gridNum) {
    super()

    this.zoom = zoom //缩放比例
    this.gridWidth = gridWidth //网格总宽度
    this.gridHeight = gridHeight //网格总高度
    this.interval = interval //每隔多少个格子加深网格线
    this.gridNum = gridNum //网格的数量，一个格子大概宽高为28.5像素，横向和纵向均为240个格子

    this.initialize()
  }

  initialize() {
    const endX = this.zoom * this.gridWidth
    const endY = this.zoom * this.gridHeight
    const lineHeight = endX / this.gridNum
    const gridTheme = mvcfg.gridTheme

    const tstyle = {
      width: 2,
      color: gridTheme.thickLine,
      alpha: gridTheme.thickAlpha,
    }
    const sstyle = {
      width: 1,
      color: gridTheme.slenderLine,
      alpha: gridTheme.slenderAlpha,
    }
    let style = (i) => {
      if (i % this.interval == 0) {
        return tstyle
      }
      return sstyle
    }

    let background = new PIXI.Graphics()
    background.beginFill(gridTheme.background, gridTheme.alpha)
    background.drawRect(0, 0, endX, endY)
    background.endFill()
    this.addChild(background)

    let horizontal = new PIXI.Sprite()
    let line = new PIXI.Graphics()
    for (let i = 0; i <= this.gridNum; i++) {
      line.lineStyle(style(i).width, style(i).color, style(i).alpha, 0.5, false)
      line.moveTo(0, lineHeight * i)
      line.lineTo(endX, lineHeight * i)
      horizontal.addChild(line)
    }
    this.addChild(horizontal)

    let vertical = new PIXI.Sprite()
    for (let i = 0; i <= this.gridNum; i++) {
      line.lineStyle(style(i).width, style(i).color, style(i).alpha, 0.5, false)
      line.moveTo(lineHeight * i, 0)
      line.lineTo(lineHeight * i, endY)
      vertical.addChild(line)
    }
    this.addChild(vertical)

    this.hitArea = new PIXI.Rectangle(0, 0, endX, endY)
    this.sortableChildren = true
    this.zIndex = 0
    this.interactive = true
  }
}
