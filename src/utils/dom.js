export const USER_INFO = 'user-info'
export const USER_TOKEN = 'user-token'
export const REMEMBERED_ACCOUNT_FORM = 'remembered-account'

/**
 * 在多页面间进行切换
 * @param {string} path
 */
export function changePath(path) {
  if (path === '') {
    location.hash = ''
  } else {
    if (!path.startsWith('/')) {
      path = '/' + path
    }
    if (!path.endsWith('/')) {
      path += '/'
    }
  }
  location.pathname = path
}

export function clearUser() {
  const emptyObjStr = JSON.stringify(Object.create(null))
  localStorage.setItem(USER_INFO, emptyObjStr)
  localStorage.setItem(USER_TOKEN, emptyObjStr)
}

/**
 * 元转换为分，通常是由前端输入发给后端
 * @param {number} yuan 元
 */
export function yuanToCent(yuan) {
  if (Number.isNaN(yuan)) {
    return 0
  }
  return Math.round(yuan * 100)
}
/**
 * 分转换成元，是由后端传给前端，通常是数字，不用校验
 * @param {number} cent 分
 */
export function centToYuan(cent) {
  return (cent / 100).toFixed(2)
}

/**
 * 获取一定范围的随机整数，前后都包含
 * @param {number} min 小值
 * @param {number} max 大值
 */
export function randomInt(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

/**
 *
 * @param {Array<*>} input 被均分的初始数组
 * @param {number} size 单位数组的新size
 * @returns {Array<Array<*>>}
 */
export function chunk(input, size) {
  return input.reduce((arr, item, idx) => {
    return idx % size === 0
      ? [...arr, [item]]
      : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]]
  }, [])
}
/**
 * 将文件名和后缀分开
 * @param {string} extensionName
 */
export function divideSuffix(extensionName) {
  const suffixIndex = extensionName.lastIndexOf('.')
  if (suffixIndex == -1) {
    return [extensionName]
  } else {
    const filename = extensionName.slice(0, suffixIndex)
    const suffix = extensionName.slice(suffixIndex)
    return [filename, suffix]
  }
}

export const getImg = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        resolve(img)
      }
      img.src = e.target.result
    }
  })
export const getImgWH = async (file, cb) => {
  const img = await getImg(file.originalFile)
  console.log('img width height', img.width, img.height)
  file.Height = img.height
  file.Width = img.width
  file.Path = file.cosPath
  file.Tags = {}
  const [name] = divideSuffix(file.originalFile.name)
  file.Name = name
  cb && cb()
}

/**
 * 从标签输入里拿到的id转换成对象
 * @param {Array<number>} arr
 * @param {Array<*>} tagNames
 * @returns
 */
export function tagArr2Obj(arr, tagNames = null) {
  const [key, value] = arr
  if (key || value) {
    return {
      [key]: [value],
    }
  } else {
    return {}
  }
}

/**
 * 从标签对象转换到cascader需要的数组
 * @param {{[key: string]: any}} obj
 * @param {Array<*>} tagNames
 * @returns
 */
export function tagObj2Arr(obj, tagNames) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const ele = obj[key][0]
      const tag = tagNames?.find((val) => {
        // 存在字符串和数字相比较的情况，暂不使用全等
        return val.value == key
      })
      const eleValue = tag?.children?.find((val) => {
        return val.value == ele
      })?.label
      return [tag?.label, eleValue]
    }
  }
  return []
}

/**
 * await-to-js
 * @param {Promise} promise 待转换的 promise
 * @param {*} errorExt
 * @returns
 */
export function to(promise, errorExt = null) {
  return promise
    .then((data) => [null, data])
    .catch((err) => {
      if (errorExt) {
        Object.assign(err, errorExt)
      }
      return [err, undefined]
    })
}
/**
 *
 * @param {string} l
 * @returns {string}
 */
export function timeLetterToHan(l) {
  const obj = {
    D: '天',
    W: '周',
    M: '月',
    Y: '年',
  }
  return obj[l]
}
