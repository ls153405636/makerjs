import { createApp } from 'vue'
import store from '../../store'
import { allCmds } from '../../common/all_cmds'
import { Core } from '../../common/core'
import App from './App.vue'
import router from '../../router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './index.css'

const app = createApp(App)

// app.use(router)
// app.use(store)
// app.use(ElementPlus)
// app.mount('#app')


/**
 * 依赖注入
 */
;(() => {
  new Core().setCmds(allCmds)
})()

app.use(router).use(store).use(ElementPlus).mount('#app')
