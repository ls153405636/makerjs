import { Movie } from './movie.js'

export class BaseWidget {
  constructor() {
    this.sprite = null
  }

  addToStage() {
    if (this.sprite) {
      debugger
      new Movie().addEle(this.sprite)
    }
    
}