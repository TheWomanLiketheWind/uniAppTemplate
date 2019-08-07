<template>
  <view class="address-change">
    <picker-view v-if="visible"
                 :indicator-style="indicatorStyle"
                 :value="value"
                 @change="bindChange">
      <picker-view-column>
        <view class="item"
              v-for="(item,index) in provinces"
              :key="index">{{item.name}}</view>
      </picker-view-column>
      <picker-view-column>
        <view class="item"
              v-for="(item,index) in citys"
              :key="index">{{item.name}}</view>
      </picker-view-column>
      <picker-view-column>
        <view class="item"
              v-for="(item,index) in areas"
              :key="index">{{item.name}}</view>
      </picker-view-column>
    </picker-view>
  </view>
</template>

<script>
export default {
  props: {
    defaultVal: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      provinces: [],
      citys: [],
      areas: [],
      indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth / (750 / 100))}px;`,
      visible: true,
      value: []
    }
  },
  watch: {
    defaultVal() {
      this.value = this.defaultVal
    }
  },
  mounted() {
    this.proviceChange()
  },
  methods: {
    proviceChange() {
      this.$api.getAddressList({ id: this.value[0] }).then(res => {
        this.provinces = res.data.data
        this.cityChange(res.data.data[0].id)
      })
    },
    cityChange(id) {
      this.$api.getAddressList({ id: id }).then(res => {
        this.citys = res.data.data
        this.$set(this.data, 'citys', res.data.data)
        this.areaChange(res.data.data[0].id)
      })
    },
    areaChange(id) {
      this.$api.getAddressList({ id: id }).then(res => {
        this.areas = res.data.data
      })
    },
    bindChange(e) {
      console.log(e)
    }
  }
}
</script>

<style>
</style>
