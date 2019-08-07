import request from '@/common/request.js'
import { formatGetUri } from '@/common/util.js'

const api = {}
const PORT1 = 'baseinfo'
const PORT2 = 'order'

// 登录按钮
api.login = params =>
  request.globalRequest(
    `auth/oauth/token${formatGetUri(params)}`,
    'post',
    '',
    2
  )

// 注册获取验证码
api.register = params =>
  request.globalRequest(`${PORT1}/mobile/signUp`, 'get', params, 1)

// 忘记密码获取验证码
api.changePassword = params =>
  request.globalRequest(`${PORT1}/mobile/changePassword`, 'get', params, 1)

// 重置公司密码
api.updatePwd = params =>
  request.globalRequest(`${PORT1}/user/updatePassword`, 'put', params, 1)

//公司部门下的人员
api.userPerson = params => request.globalRequest(`${PORT1}/user`, 'get', params)

//省市区接口
api.getAddressList = params =>
  request.globalRequest(`${PORT2}/areas/${params.id}/child`, 'get', '')

export default api
