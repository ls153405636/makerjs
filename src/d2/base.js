import { Movie } from "./movie";

export class BaseWidget {
  constructor() {
    this.sprint = null
  }

  addToStage() {
    if (this.sprite) {
      new Movie().addEle(this.sprite)
    }
    
}