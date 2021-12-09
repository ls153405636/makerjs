import { createApp } from 'vue'
import store from '../../store'
import { allCmds } from '../../common/all_cmds'
import { Core } from '../../common/core'
import App from './App.vue'
import router from '../../router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './index.css'
import ApiInstance from '../../apis'
import { USER_TOKEN } from '../../utils/dom'

ApiInstance.userLogin({
  login_type: '密码',
  password: 'next',
  phone:'18381668888'
}).then(resp => {
  console.error('-->resp', resp)

  localStorage.setItem(USER_TOKEN, JSON.stringify({
    expire: resp.data.expire,
    token: resp.data.token,
  }))

}).catch(e => {
  console.error('-->e', e)
})

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
