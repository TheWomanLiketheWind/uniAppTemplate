<template>
	<button class="getCode" :loading="button_loading" @click="codeFun" :disabled="codeStatus">{{!codeStatus? '获取验证码': codeNum + 's'}}</button>
</template>

<script>
	export default {
		props: {
			name: String,
			mobile: String
		},
		data() {
			return {
				button_loading: false,
				codeNum: 60,
				codeStatus: false,
				codeShow: false
			}
		},
		onLoad() {

		},
		onShow: function() {

		},
		onReady: function() {
		
		},
		methods: {
			codeFun() {				
				if (!this.mobile || !(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.mobile))) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					});
					return
				}
				this.button_loading = true
				if (this.name == '注册') {
					this.$api.register({mobile: this.mobile}).then(res => {			
						this.button_loading = false
						this.codeClick()
					}).catch(res => {
						this.button_loading = false
					})
				} else if (this.name == 'passwordForget') {
					this.$api.changePassword({mobile: this.mobile}).then(res => {	
						this.button_loading = false
						this.codeClick()
					}).catch(res => {
						this.button_loading = false
					})
				}
			},
			codeClick() {
				let that = this

				if (this.codeNum <= 0) {
					this.codeStatus = false
				} else {
					this.codeNum --
					this.codeStatus = true
					setTimeout(function() {
						that.codeClick()
					}, 1000)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.getCode{
    background: #f07d1b;
    color: #fff;
    border-radius: 8upx;
    padding: 0 10upx;
    line-height: 40px;
    margin-left: 20upx;
	font-size: 28upx;
	width: 210upx;
}
</style>
