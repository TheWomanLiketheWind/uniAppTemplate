import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistense from 'vuex-persistedstate'

import user from './modules/user.js'
import common from './modules/common.js'
import getters from './getters.js'
import { localStorage, sessionStorage } from 'mp-storage'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		user,
		common
	},
	getters,
	plugins: [
		VuexPersistense({
		  storage: localStorage
		})
	]
})

export default store