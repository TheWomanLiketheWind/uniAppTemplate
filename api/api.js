import userApi from './User/index.js'
import orderApi from './Order/index.js'

export default {
  ...userApi,
  ...orderApi,
}
