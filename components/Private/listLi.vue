<template>
  <view class="orderList_ul">
    <checkbox-group @change="checkboxChange">
      <view class="orderList_li"
            v-for="(item, index) in dataList"
            :key="index"
            @click="detailClick(item.id)">
        <view class="orderList_li_top">
          <!-- <view>
            <checkbox :value="String(item.id)"
                      :checked="item.checked" />
          </view> -->
          <text class="font14 ellipsis companyName">{{item.companyName?item.companyName:item.deptName}}</text>
          <text class="font20 textColor">{{typeText == 'accountBill'?'￥'+item.estimatedPrice:item.printCode}}</text>
        </view>
        <view class="orderList_li_bottom">
          <view class="orderList_li_bottom_top">
            <image :src="item.bigLogoUrl"
                   mode="widthFix"></image>
            <text class="font16 orderNum">{{item.waybillNo?item.waybillNo:'无订单'}}</text>
            <text class="textColor">{{item.statusName}}</text>
          </view>
          <view class="orderList_li_bottom_center">
            <text class="font14">{{item.receiverName}}</text>
            <text class="font12 orderList_li_bottom_address">{{item.fullReceiverAddress?item.fullReceiverAddress: item.receiverProvinceName + item.receiverCityName + item.receiverCountyName + item.receiverAddress}}</text>
          </view>

          <view class="orderList_li_tip">
            <view class="orderList_li_tip_left">
              <image src="../../static/timeImage.png"
                     mode="widthFix"></image>
              <text class="font12">下单时间：{{item.createTime}}</text>
            </view>
            <view class="orderList_li_tip_right"
                  v-if="item.printCount">
              <image src="../../static/Printing.png"
                     mode="widthFix"></image>
              <text class="font12">打印次数 {{item.printCount}}次</text>
            </view>
          </view>
        </view>
      </view>
    </checkbox-group>
  </view>
</template>

<script>
export default {
  props: {
    dataList: Array,
    typeText: String
  },
  methods: {
    checkboxChange: function (e) {
      this.$emit('checkboxChanges', e.detail.value)
    },
    detailClick(id) {
      if (this.typeText != 'accountBill') {
        uni.navigateTo({
          url: '/pages/order/orderDetail?id=' + id
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.orderList_ul {
  margin: 0 20upx;
  .orderList_li {
    background: #ffffff;
    border-radius: 8upx;
    margin-top: 20upx;
    .orderList_li_tip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      view {
        display: flex;
        align-items: center;
        color: #666666;
      }
      image {
        width: 24upx;
        margin-right: 10upx;
				height: auto;
      }
      .orderList_li_tip_left {
      }
      .orderList_li_tip_right {
      }
    }
    .orderList_li_top {
      border-bottom: 1upx solid #dddddd;
      height: 100upx;
      padding: 0 40upx 0 30upx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #333333;
      .companyName {
        flex: 1;
        margin-right: 20upx;
      }
    }
    .orderList_li_bottom {
      padding: 20upx 40upx 30upx 30upx;
      .orderList_li_bottom_top {
        display: flex;
        justify-content: space-between;
        image {
          width: 112upx;
          margin-right: 28upx;
        }
        .orderNum {
          flex: 1;
        }
      }
      .orderList_li_bottom_center {
        display: flex;
        align-items: center;
        text:last-child {
          color: #666666;
          margin-left: 20upx;
          flex: 1;
        }
        .orderList_li_bottom_address {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
