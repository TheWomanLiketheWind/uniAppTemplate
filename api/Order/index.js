import request from '@/common/request.js'

const api = {}
const PORT2 = 'order'

// 选择快递公司获得其他服务信息
api.service_infos_select = params =>
  request.globalRequest(
    `${PORT2}/express_companies/${params}/service_infos`,
    'GET',
    ''
  )

// 通讯录列表
api.express_addresses_list = params =>
  request.globalRequest(`${PORT2}/express_addresses`, 'GET', params)

// 删除通讯录
api.deleteAddressBook = params =>
  request.globalRequest(`${PORT2}/express_addresses/${params}`, 'DELECT', '')

// 获取省市区接口
api.getAllProvince = params =>
  request.globalRequest(`${PORT2}/areas/${params}/child`, 'GET', '')

// 获取订单列表
api.getOrderList = params =>
  request.globalRequest(`${PORT2}/orders/v1/wechat`, 'GET', params)

// 获取打印机列表
api.getPrintList = params =>
  request.globalRequest(`${PORT2}/company_printers/${params}`, 'GET', '')

// 打印面单
api.printOrder = params =>
  request.globalRequest(
    `${PORT2}/orders/${params.id}/prints/async`,
    'POST',
    params
  )

// 根据订单id查询详情
api.getOrderDetail = params =>
  request.globalRequest(`${PORT2}/orders/${params}`, 'GET', '')

// 根据id获取通讯录信息
api.getAddressBook = params =>
  request.globalRequest(`${PORT2}/express_addresses/${params}`, 'GET', '')

// 新增通讯录
api.addAddressBook = params =>
  request.globalRequest(`${PORT2}/express_addresses`, 'POST', params, '')

// 修改通讯录
api.updateAddressBook = params =>
  request.globalRequest(
    `${PORT2}/express_addresses/${params.id}`,
    'PUT',
    params
  )

// 新增订单
api.createOrder = params =>
  request.globalRequest(`${PORT2}/orders`, 'POST', params, '')

export default api
