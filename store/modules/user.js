const user = {
  state: {
    userInfo: {},
    cityInfo: {},
    addressInfo: {
      send: {},
      receiver: {}
    }
  },
  mutations: {
    GET_USER_INFO: (state, info) => {
      state.userInfo = info
    },
    GET_CITY_INFO: (state, info) => {
      state.cityInfo = info
    },
    GET_ADRESS_SEND: (state, send) => {
      state.addressInfo.send = send
    },
    GET_ADRESS_RECEIVER: (state, receiver) => {
      state.addressInfo.receiver = receiver
    }
  },
  actions: {
    getUserInfo: ({ commit }, info) => {
      commit('GET_USER_INFO', info)
    },
    getCityInfo: ({ commit }, info) => {
      commit('GET_CITY_INFO', info)
    },
    getAddressSend: ({ commit }, send) => {
      commit('GET_ADRESS_SEND', send)
    },
    getAddressReceiver: ({ commit }, receiver) => {
      commit('GET_ADRESS_RECEIVER', receiver)
    }
  }
}

export default user
