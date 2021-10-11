import { createApp } from 'vue'
import { allCmds } from '../../common/all_cmds'
import { Core } from '../../common/core'
import App from './App.vue'
import './index.css'

/**
 * 依赖注入
 */
;(() => {
  new Core().setCmds(allCmds)
})()

createApp(App).mount('#app')
