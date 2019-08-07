<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			if (Object.keys(this.$store.getters.userInfo).length == 0) {
			  uni.reLaunch({
			    url: '/pages/user/login/index'
			  })
			}
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "./common/uni.css";
	/*每个页面公共css */
	.font12 {
	  font-size: 24upx;
	}
	.font14 {
	  font-size: 28upx;
	}
	.font16 {
	  font-size: 32upx;
	}
	.font18 {
	  font-size: 36upx;
	}
	.font20 {
	  font-size: 40upx;
	}
	.font22 {
	  font-size: 44upx;
	}
	.font24 {
	  font-size: 48upx;
	}
	.font26 {
	  font-size: 52upx;
	}
	.font28 {
	  font-size: 56upx;
	}
	.font30 {
	  font-size: 60upx;
	}
	.font32 {
	  font-size: 64upx;
	}
	.fontWeight {
	  font-weight: 600;
	}
</style>
