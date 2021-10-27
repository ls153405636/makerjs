import { createApp } from 'vue'
import store from '../../store'
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

createApp(App).use(store).mount('#app')
