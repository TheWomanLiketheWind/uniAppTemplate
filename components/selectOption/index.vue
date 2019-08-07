<template>
	<view class="selectOption">
		<view class="checkboxList groupList" v-if="multi">
			 <checkbox-group @change="checkboxChange">
                <label class="uni-list-cell uni-list-cell-pd group-label" v-for="item in list" :key="item.value">
                    <view>
                        <checkbox :value="item.value" :checked="item.checked" />
                    </view>
                    <view>{{item.name}}</view>
                </label>
            </checkbox-group>
		</view>
		
		<view class="radioList groupList" v-else>
			<radio-group @change="radioChange" class="group-radio">
                <label class="uni-list-cell uni-list-cell-pd group-label" :class="item.checked?'group-label_check': ''" v-for="item in list" :key="item.value">
                    <view class="group-label_left">
                        <radio :value="item.value" :checked="item.checked" />
                    </view>
                    <view class="group-label_text">{{item.name}}</view>
                </label>
            </radio-group>

			<input type="number" placeholder="请输入重量，不超过1000KG" value="" class="otherSelect" v-if="type == 6 && list[list.length-1].checked" v-model="weightVal" @change="weightChange"/>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			list: Array,
			multi: {
				type: Boolean,
				default: false
			},
			type: Number
		},
		data() {
			return {
				current: 0,			
				weightVal: '',
			}
		},
		onLoad() {

		},
		onShow: function() {
			console.log(this.type)
		},
		onReady: function() {
		
		},
		methods: {
			checkboxChange: function (e) {
                var items = this.list,
                    values = e.detail.value;
                for (var i = 0, lenI = items.length; i < lenI; ++i) {
                    const item = items[i]
                    if(values.includes(item.serviceInfoId)){
                        this.$set(item,'checked',true)
                    }else{
                        this.$set(item,'checked',false)
                    }
                }
				
				this.$emit('changeVal', e)
            },
			radioChange: function(evt) {
				for (let i = 0; i < this.list.length; i++) {
					if (this.list[i].value == evt.target.value) {
						this.$set(this.list[i],'checked',true)
					} else {
						this.$set(this.list[i],'checked',false)
					}
				}
				if (this.type == 6 && this.list[this.list.length-1].checked) {
					
				}
				this.$emit('changeVal', evt.detail.value)
			},
			weightChange:function (e) {
				this.$emit('weightChangeVal', this.weightVal)
			}
		}
	}
</script>

<style lang="scss" scoped>
.selectOption{
	.groupList{
		.otherSelect{
			border-bottom: 2upx solid #DDDDDD;
			margin: 0 22upx;
			padding: 0 0 24upx 0;
			color: #9B9B9B;
		}
		.group-radio{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 40upx 20upx;
			.group-label_check{
				background: #EF7E00;
				color: #FFFFFF!important;
				border: 1upx solid #EF7E00!important;
			}
			.group-label{
				border: 1upx solid #AAAAAA;
				font-size: 28upx;
				border-radius: 8upx;
				color: #333333;
				margin-bottom: 10px;
				width:144upx;
				height: 72upx;
				text-align: center;
				position: relative;
				.group-label_left{
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					opacity: 0;
				}
				.group-label_text{
					margin: 0 auto;
				}
			}								
		}
	}
	uni-radio-group, uni-checkbox-group{
		width: auto;
	}
	.uni-list-cell::after{
		contant: '';
		display: none;
	}
	.uni-list-cell-pd{
		padding: 0!important;
	}

}
</style>
