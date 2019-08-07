const getters = {
  userInfo: state => state.user.userInfo,
  companySelect: state => state.common.companySelect,
  cityInfo: state => state.user.cityInfo,
  addressInfo: state => state.user.addressInfo
}

export default getters
