import CryptoJS from 'crypto-js'

function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return [hour, minute, second]
    .map(function(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    })
    .join(':')
}

function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}
var dateUtils = {
  UNITS: {
    年: 31557600000,
    月: 2629800000,
    天: 86400000,
    小时: 3600000,
    分钟: 60000,
    秒: 1000
  },
  humanize: function(milliseconds) {
    var humanize = ''
    for (var key in this.UNITS) {
      if (milliseconds >= this.UNITS[key]) {
        humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前'
        break
      }
    }
    return humanize || '刚刚'
  },
  format: function(dateStr) {
    var date = this.parse(dateStr)
    var diff = Date.now() - date.getTime()
    if (diff < this.UNITS['天']) {
      return this.humanize(diff)
    }
    var _format = function(number) {
      return number < 10 ? '0' + number : number
    }
    return (
      date.getFullYear() +
      '/' +
      _format(date.getMonth() + 1) +
      '/' +
      _format(date.getDay()) +
      '-' +
      _format(date.getHours()) +
      ':' +
      _format(date.getMinutes())
    )
  },
  parse: function(str) {
    //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
    var a = str.split(/[^0-9]/)
    return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5])
  }
}

/**
 * 生成随机len位数字
 */
function randomLenNum(len, date) {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000)
    .toString()
    .substr(0, len || 4)
  if (date) random = random + Date.now()
  return random
}

/**
 * 登录请求加密处理
 */
function encryption(params) {
  const key = CryptoJS.enc.Latin1.parse('ksudiksudiksudix')
  const encrypted = CryptoJS.AES.encrypt(params, key, {
    iv: key,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  })
  return encrypted.toString()
}

/**
 * 拼接对象为请求字符串
 * @param {Object} obj - 待拼接的对象
 * @returns {string} - 拼接成的请求字符串
 */
function formatGetUri(obj) {
  const params = []

  Object.keys(obj).forEach(key => {
    let value = obj[key]
    // 如果值为undefined我们将其置空
    if (typeof value === 'undefined' || value === null) {
    } else {
      params.push([key, encodeURIComponent(value)].join('='))
    }
    // 对于需要编码的文本（比如说中文）我们要进行编码
  })
  return '?' + params.join('&')
}

function findValFromArray(val, key, arr, ident) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][val] == key) {
      return arr[i][ident]
    }
  }
}

module.exports = {
  formatTime: formatTime,
  formatLocation: formatLocation,
  dateUtils: dateUtils,
  randomLenNum: randomLenNum,
  encryption: encryption,
  formatGetUri: formatGetUri,
  findValFromArray: findValFromArray
}
