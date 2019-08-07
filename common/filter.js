import Vue from 'vue'

/**
 * 根据key获取对应数字匹配的value
 */
Vue.filter('findValFromArray', function(val, key, arr, attr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
      return arr[i][attr]
    }
  }
})
