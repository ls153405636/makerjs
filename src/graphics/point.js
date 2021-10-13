import Victor from 'victor'

export class Point {
  /**
   * @param {Number} x
   * @param {Number} y
   */
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  static from(p) {
    return new Point(p.x, p.y)
  }

  static add(p1, p2) {
    return new Point(p1.x + p2.x, p1.y + p2.y)
  }

  static check_round_off(p1, p2) {
    if (Point.from(p1).close(p2) && !Point.from(p1).equal(p2)) {
      debugger
    }
  }

  /**
   * 近似相等
   * @param {Point} point1
   * @param {Point} point2
   * @param {Number} epsilon
   * @returns {Boolean}
   */
  static approx_equal(point1, point2, epsilon = 2) {
    let x = Math.abs(point1.x - point2.x)
    let y = Math.abs(point1.y - point2.y)
    let w = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
    return w < epsilon
  }

  // 用于 PIXI.Graphics moveTo 等方法时用展开语法传递参数
  get flat() {
    return [this.x, this.y]
  }

  String() {
    return `(${this.x}, ${this.y})`
  }

  delta(start, end) {
    return new Point(this.x + (end.x - start.x), this.y + (end.y - start.y))
  }

  equal(other) {
    // console.warn("equal not safe")
    return this.x == other.x && this.y == other.y
  }

  close(other, precision = 1e-7) {
    return (
      Math.abs(this.x - other.x) < precision &&
      Math.abs(this.y - other.y) < precision
    )
  }

  close_than(pa, pb) {
    let la = new Victor(this.x - pa.x, this.y - pa.y).length()
    let lb = new Victor(this.x - pb.x, this.y - pb.y).length()
    return la < lb
  }

  close_which(pa, ...others) {
    for (const item of others) {
      if (!this.close_than(pa, item)) {
        pa = item
      }
    }
    return pa
  }

  close_any(...points) {
    for (let i = 0; i < points.length; i++) {
      const p = points[i]
      if (this.close(p)) {
        return true
      }
    }
    return false
  }

  closes(other, precision = 1e-7) {
    return (
      Math.abs(this.x.toFixed() - other.x.toFixed()) < precision &&
      Math.abs(this.y.toFixed() - other.y.toFixed()) < precision
    )
  }
}
