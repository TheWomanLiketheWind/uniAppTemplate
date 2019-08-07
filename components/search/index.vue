<template>
	<view class="searchAll">
		<image src="../../static/datatime.png" mode="widthFix" class="datatime"></image>
		<view class="searchContent">
			<image src="../../static/search.png" mode="widthFix"></image>
			<input type="text" value="" placeholder="搜索姓名、电话、地址等" v-model="searchVal"/>
			<view class="publicButton_small searchButton" @click="searchClick">搜索</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchVal: ''
			}
		},
		onLoad() {

		},
		onShow: function() {
		
		},
		onReady: function() {
		
		},
		methods: {
			searchClick(e) {
				this.$emit('searchEmit', this.searchVal)
			}
		}
	}
</script>

<style lang="scss" scoped>
.searchAll{
	background: #FFFFFF;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 20upx 20upx 0 20upx;
	position: relative;
	padding: 0 36upx;
	height: 88upx;
	border-radius: 8upx;
	
	.datatime{
		width: 30upx;
		height: 30upx;
		margin-right: 20upx;
	}
	.searchContent{
		background: #F1F1F1;
		border-radius: 40upx;
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20upx;
		height: 60upx;
		image{
			width: 26upx;
			margin-right: 24upx;
		}
		input{
			flex: 1;
		}
		.searchButton{
			width: 120upx;
			height: 60upx;
			line-height: 60upx;
			border-radius: 44upx;
			padding: 0;
			font-size: 28upx;
		}
	}
}
</style>
