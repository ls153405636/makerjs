export class LoftOutline {
  constructor() {
    this.points = []
  }
  
  createDefaultData() {
    this.points.push(
      new THREE.Vector2(0, 0),
      new THREE.Vector2(15, 0),
      new THREE.Vector2(15, 10),
      new THREE.Vector2(65, 10),
      new THREE.Vector2(65, 0),
      new THREE.Vector2(80, 0),
      new THREE.Vector2(80, 60),
      new THREE.Vector2(0, 60)
    )
    //this.innerHeight = 10
    return this
  }

  getPoints() {
    return this.points
  }

  getWidth() {
    return 80
  }
}