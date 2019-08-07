import Vue from 'vue'
import App from './App'
import store from './store'

import request from './common/request.js'
import api from './api/api.js'
import url from './common/config.js'
import '@/common/filter.js'

Vue.config.productionTip = false
Vue.prototype.$request = request
Vue.prototype.$api = api
Vue.prototype.$url = url
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
  ...App
})

app.$mount()
