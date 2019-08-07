<template>
  <mescroll-uni :down="downOption"
                @down="downCallback"
                :up="upOption"
                @up="upCallback"
                @init="mescrollInit">
    <view class="orderList"
          v-if="listShow">
      <search @searchEmit="searchEmit"></search>

      <listLi :dataList="dataList"
              @checkboxChanges="checkboxChanges"></listLi>

      <!-- <view class="publicButton_big printButton"
            v-if="!printShow"
            @click="printShow = true">批量打印</view> -->

      <view class="printBottom"
            v-if="printShow">
        <view class="allCheck font12">
          <checkbox-group @change="checkAllChange">
            <checkbox value="all"
                      :checked="checkedAll" />
          </checkbox-group>
          全选
        </view>
        <view class="grayButton"
              @click="printShow = false">撤销</view>
        <view class="publicButton_big submitButton"
              @click="printSubmit">确定</view>
      </view>

      <view class="printAll"
            v-if="printAllShow">
        <view class="printContent">
          <image src="../../static/print.png"
                 mode="widthFix"
                 class="printImages"></image>
          <view class="radioList">
            <radio-group>
              <view v-for="(item, index) in printList"
                    :key="index"
                    class="radioList_top">
                <radio :value="String(item.id)"
                       :checked="index === current" />
                <text>{{item.printerName}}</text>
              </view>
            </radio-group>
          </view>
          <view class="printAll_button">
            <view @click="printAllShow = false">取消</view>
            <view @click="printAllSubmit">确定</view>
          </view>
        </view>
      </view>
    </view>
  </mescroll-uni>
</template>

<script>
import search from '@/components/search/index.vue'
import mescrollObj from '@/mixins/mescroll.js'
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
import listLi from '@/components/Private/listLi.vue'

export default {
  data() {
    return {
      listShow: false,
      printShow: false,
      checkedAll: false,
      checkArr: [],
      printList: [],
      current: 0,
      printAllShow: false
    }
  },
  mixins: [mescrollObj],
  components: {
    search,
    MescrollUni,
    listLi
  },
  onLoad() {

  },
  onShow: function () {
    this.getPrint()
  },
  onReady: function () {

  },
  methods: {
    printAllSubmit() {
      let that = this
      uni.showModal({
        title: '提示',
        content: '确定要打印吗?',
        success: function (res) {
          if (res.confirm) {
            that.$api.printOrder({ id: that.printList[that.current].id, ids: that.checkArr }).then(ret => {
              uni.showToast({
                title: ret.data.message,
                icon: 'none',
                duration: 2000
              });
              that.printAllShow = false
            })
          }
        }
      });

    },
    getPrint() {
      this.$api.getPrintList(this.$store.getters.userInfo.tenant_id).then(res => {
        this.printList = res.data.data
      })
    },
    printSubmit() {
      this.printAllShow = true
    },
    checkAllChange(e) {
      this.dataList.forEach(element => {
        this.$set(element, 'checked', e.detail.value.length > 0 ? true : false)
        this.checkArr = []
        if (e.detail.value.length > 0) this.checkArr.push(String(element.id))
      });
    },
    checkboxChanges: function (e) {
      this.checkArr = e
    },
    searchEmit(e) {
      this.pageParm.search = e
      this.getList('getOrderList')
    },
    internDefult() {
      this.getList('getOrderList')
    }
  }
}
</script>

<style lang="scss" scoped>
.orderList {
  .printAll {
    position: fixed;
    top: 90upx;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .printContent {
      background: #ffffff;
      border-radius: 16upx;
      margin: 0 auto;
      width: 80%;
      height: 750upx;
      position: relative;
      .radioList {
        margin: 0 42upx;
        height: 246upx;
        overflow: scroll;
        .radioList_top {
          display: flex;
          align-items: center;
          text {
            margin-left: 10upx;
          }
        }
      }
      .printAll_button {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid #ddd;
        height: 100upx;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        view {
          line-height: 100upx;
          text-align: center;
          font-size: 28upx;
          flex: 1;
        }
        view:first-child {
          border-right: 1px solid #ddd;
        }
      }
    }
    .printImages {
      width: 100%;
    }
  }
  .printBottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 98upx;
    display: flex;
    justify-content: space-between;
    background: #ffffff;
    text-align: center;
    .allCheck {
      display: flex;
      align-items: center;
      flex: 2;
      justify-content: center;
    }
    .grayButton {
      flex: 2.5;
      background: #dddddd;
      color: #ffffff;
      line-height: 98upx;
      color: #666666;
    }
    .submitButton {
      flex: 4;
      line-height: 98upx;
    }
  }
  .printButton {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 98upx;
    line-height: 98upx;
  }
}
</style>
