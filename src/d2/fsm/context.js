export class RunContext {
  /** @type {import('./declare').RunContext} */
  static __ctx = null

  static get context() {
    if (this.__ctx == null) {
      throw 'RunContext not initialize'
    }
    return this.__ctx
  }

  static set context(value) {
    this.__ctx = value
  }
}
