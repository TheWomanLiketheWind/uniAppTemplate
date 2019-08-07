let url_config = ''

if (process.env.NODE_ENV === 'development') {
  // 开发环境
  // url_config = 'https://sstest1.ksudi.com/'
  // url_config = 'http://192.168.1.13:9999/'
  url_config = 'https://somsgateway.ksudi.com/'
} else {
  // 生产环境
  url_config = 'https://somsgateway.ksudi.com/'
}

export default url_config
