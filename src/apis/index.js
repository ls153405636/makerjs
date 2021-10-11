import { message } from 'antd'
import axios from 'axios'
import { changePath, USER_TOKEN } from '../utils/dom'
import { DefaultApi } from './typescript-axios'

const defaultAxios = axios.create({
  timeout: 5000,
})

const refreshUserToken = async () => {
  const res = await ApiInstance.userRefreshToken()
  return res.data
}

const getStorageToken = () => JSON.parse(localStorage.getItem(USER_TOKEN))
const setStorageToken = (data) =>
  localStorage.setItem(USER_TOKEN, JSON.stringify(data))

let isRefreshing = false
let requests = []

const oneHour = 60 * 60 * 1000

const tokenExpiration = oneHour
defaultAxios.interceptors.request.use((config) => {
  if (config.url.includes('login') || config.url.includes('send_sms') || config.url.includes('register')) {
    // 忽略login
    return config
  }
  let token = undefined
  // refresh时把原token带上
  if (config.url.includes('refresh_token')) {
    const tokenInfo = getStorageToken()
    token = tokenInfo?.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }
  try {
    const tokenInfo = getStorageToken()
    if (new Date(tokenInfo.expire) - Date.now() > tokenExpiration) {
      // 上面数据为空时或不可生成时间时会自然报错
      token = tokenInfo.token
    } else {
      throw new Error('refresh')
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  } catch (_) {
    if (!isRefreshing) {
      // 用 isRefreshing 防止 刷新时再走到这里
      isRefreshing = true
      refreshUserToken()
        .then((data) => {
          setStorageToken(data)
          return data.token
        })
        .then((token) => {
          // 用 requests 队列把要刷新前的请求记录下来，得到新token后才执行，当前队列只有一个
          requests.forEach((cb) => cb(token))
          requests = []
        })
        .finally(() => {
          isRefreshing = false
        })
    }
    const retryOriginalRequest = new Promise((resolve) => {
      requests.push((token) => {
        // 因为config中的token是旧的，所以刷新token后要将新token传进来
        config.headers.Authorization = `Bearer ${token}`
        resolve(config)
      })
    })
    return retryOriginalRequest
  }
})

defaultAxios.interceptors.response.use(
  (res) => {
    if (res?.data) {
      const { error, code } = res.data
      if (code != undefined) {
        if (code != 200) {
          message.warning(res?.data?.message || '出错了~')
          return Promise.reject(code);
        }
      } else {
        if (error.error_code != 0) {
          // message.warning(error.error_msg) // 错误信息不做提示，避免用户误会
          return Promise.reject(code)
        }
      }
      return res
    }
  },
  (err) => {
    if (err?.response?.status === 401) {
      if (err?.response?.data?.code === 401) {
        message.warning(err?.response?.data?.message || '出错了：401');
      }
      // 提示信息没有汉字，则退回登录页面
      if (!((String(err?.response?.data?.message || '')).match(/[\u4e00-\u9fa5]/))) {
        setTimeout(() => {
          changePath('login');
        }, 1000)
      }
    } else {
      message.warning(err?.response?.data?.message || `出错了：${err?.response?.status || '...'}`);
    }
    return Promise.reject(err)
  }
)

const ApiInstance = new DefaultApi(undefined, undefined, defaultAxios)

export default ApiInstance
