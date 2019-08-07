import urlConfig from './config.js'
import store from '@/store/index'

const request = {}
const headers = {}
const PORT1 = '/baseinfo'

request.globalRequest = (url, method, data, power) => {
  /* 	权限判断 
	个人信息不存在时
	去登录*/

  /* 	权限判断 
	1 == 不通过access_token校验的接口
	2 == 文件下载接口列表
	3 == 验证码登录 */
  switch (power) {
    case 1:
      headers['Authorization'] = 'Basic a3N1ZGk6a3N1ZGk='
      break
    case 2:
      headers['Authorization'] = 'Basic a3N1ZGlfcGM6a3N1ZGlfcGM='
      break
    case 3:
      responseType = 'blob'
      break
    default:
      headers['Authorization'] = 'Bearer' + store.getters.userInfo.access_token
      headers['TENANT-ID'] = store.getters.userInfo.tenant_id
      break
  }
  return uni
    .request({
      url: urlConfig + url,
      method,
      data: data,
      dataType: 'json',
      header: headers
    })
    .then(res => {
      if (res[1].data.status || res[1].data.code == 200) {
        return res[1]
      } else {
        throw res[1].data
      }
    })
    .catch(parmas => {
      /* 	权限判断 
			401 == 清除缓存
		*/

      switch (parmas.code) {
        case 401:
          uni.clearStorageSync()
          break
        default:
          uni.showToast({
            title: parmas.message,
            icon: 'none'
          })
          return Promise.reject()
          break
      }
    })
}

export default request
