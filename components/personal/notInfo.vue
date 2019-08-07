<template>
	<view class="notInfo">
		<image src="../../static/noInfo.png" mode="widthFix"></image>
		<view>{{textTipe}}</view>
	</view>
</template>

<script>
	export default {
		props: {
			textTipe: String
		},
		data() {
			return {

			}
		},
		onLoad() {

		},
		onShow: function() {
		
		},
		onReady: function() {
		
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.notInfo{
	text-align: center;
	color: #999999 ;
	image{
		width: 200upx;
		height: 200upx;
		margin: 60upx 0 40upx;
	}
}
</style>
