const common = {
	state: {
		companySelect: {}
	},
	mutations: {
		SET_COMPANY: (state, obj) => {
			state.companySelect = obj
		}
	},
	actions: {
		setCompany: ({ commit }, obj) => {
			commit('SET_COMPANY', obj)
		}
	}
}

export default common