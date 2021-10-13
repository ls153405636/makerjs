/**
 * @param {String} prefix
 * @param {import('xstate').StateNodeConfig} config
 */
export const with_log = (prefix, config) => {
  if (!config.entry) {
    config.entry = () => {
      console.warn(`==>${prefix}`, 'entry')
    }
  }

  if (!config.exit) {
    config.exit = () => {
      console.warn(`==>${prefix}`, 'exit')
    }
  }

  if (config.states) {
    Object.keys(config.states).forEach((key) => {
      with_log(`${prefix}.${key}`, config.states[key])
    })
  }

  return config
}
