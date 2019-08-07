const mescrollObj = {
  data() {
    return {
      mescroll: null, //mescroll实例对象
      // 下拉刷新的配置
      downOption: {
        use: true, // 是否启用下拉刷新; 默认true
        auto: true // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
      },
      // 上拉加载的配置
      upOption: {
        use: true, // 是否启用上拉加载; 默认true
        auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
        isLock: false, // 是否锁定上拉加载 (可用于不触发upCallback,只保留回到顶部按钮的场景)
        page: {
          num: 1, // 当前页码,默认1,回调之前会加1,即callback(page)会从1开始
          size: 10 // 每页数据的数量,默认10
        },
        noMoreSize: 3, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
        empty: {
          tip: '暂无相关数据'
        }
      },
      dataList: [],
      pageParm: {
        page: 1,
        size: 10,
        search: ''
      }
    }
  },
  // 必须注册滚动到底部的事件,使上拉加载生效
  onReachBottom() {
    this.mescroll && this.mescroll.onReachBottom()
  },
  // 必须注册列表滚动事件,使下拉刷新生效
  onPageScroll(e) {
    this.mescroll && this.mescroll.onPageScroll(e)
  },
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll
    },
    /*下拉刷新的回调, 有三种处理方式: */
    downCallback(mescroll) {
      // 第2种: 下拉刷新和上拉加载调同样的接口, 那以上请求可删, 直接用mescroll.resetUpScroll()代替
      mescroll.resetUpScroll() // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
    },
    /*上拉加载的回调*/
    upCallback(mescroll) {
      this.mescroll = mescroll
      this.pageParm.page = mescroll.num
      this.pageParm.size = mescroll.size
      this.internDefult()
    },
    // 获取默认列表/上拉下拉调用其接口
    getList(api) {
      return new Promise(resolve => {
        this.$api[api](this.pageParm)
          .then(res => {
            if (api == 'getAccountBill') {
              this.mescroll.endByPage(
                res.data.data.billH5List.length,
                res.data.data.orderTotal
              )
              if (this.mescroll.num == 1) this.dataList = []
              this.dataList = this.dataList.concat(res.data.data.billH5List)
            } else {
              this.mescroll.endByPage(res.data.data.length, res.data.pages)
              if (this.mescroll.num == 1) this.dataList = []
              this.dataList = this.dataList.concat(res.data.data)
            }
            this.listShow = true
            resolve(this.dataList)
          })
          .catch(res => {
            this.listShow = true
            this.mescroll.endErr()
          })
      })
    },
    // 刪除列表
    delectList(api, parm, index) {
      let that = this
      uni.showModal({
        title: '提示',
        content: '确定要删除吗?',
        success: function(res) {
          if (res.confirm) {
            that.delectFun(api, parm, index)
          }
        }
      })
    },
    // 删除接口
    delectFun(api, parm, index) {
      let that = this
      that.$api[api](parm)
        .then(res => {
          uni.showToast({
            title: '刪除成功',
            icon: 'none',
            success: function() {
              that.dataList.splice(index, res.data.data)
            }
          })
        })
        .catch(res => {
          console.log(res)
        })
    }
  }
}

export default mescrollObj
