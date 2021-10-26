import { createApp } from 'vue'
import { allCmds } from '../../common/all_cmds'
import { Core } from '../../common/core'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './index.css'

const app = createApp(App)

app.use(ElementPlus)

/**
 * 依赖注入
 */
;(() => {
  new Core().setCmds(allCmds)
})()

app.mount('#app')
