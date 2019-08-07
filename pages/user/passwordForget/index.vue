<template>
	<view class="passwordForget-content">
		<view class="passwordForget-head">
			<image src="../../../static/logo.png" mode="widthFix" class="passwordForget-head-img"></image>
		</view>
		<view class="passwordForget-head-input">			
			<input type="number" maxlength="11" placeholder="请输入手机号" @blur="blurChange" data-valType="mobile" v-model="user.mobile"/>
			<view class="input-warn" :class="!showTipe.mobile || user.mobile.length == 11?'input-warn-show':''">手机号不正确</view>
			
			<view class="code_right">
				<input type="number" maxlength="6" placeholder="请输入验证码" @blur="blurChange" data-valType="code" v-model="user.validCode"/>
				<codeButton :name="nameCode" :mobile="user.mobile"></codeButton>
			</view>
			<view class="input-warn" :class="!showTipe.code?'input-warn-show':''">请输入验证码</view>
			
			<input type="text" password maxlength="25" placeholder="请输入英文和数字组成的6-25位密码" @blur="blurChange" data-valType="password" v-model="user.password"/>
			<view class="input-warn" :class="!showTipe.password && passVer? 'input-warn-show':''">请输入英文和数字组成的6-25位密码</view>
			
			<input type="text" password maxlength="25" placeholder="请输入英文和数字组成的6-25位密码" @blur="blurChange" data-valType="passwordRepeat" v-model="user.passwordRepeat"/>
			<view class="input-warn" :class="(!showTipe.passwordRepeat && (user.password == user.passwordRepeat))?'input-warn-show':''">密码不一致</view>
		</view>

		<button type="default-ZJS" :loading="button_loading" :disabled="user.mobile.length != 11 || user.validCode.length != 6 || user.password.length < 6 || user.passwordRepeat.length < 6" class="passwordForget-botton" @click="passwordForget_botton">确定</button>
		
	</view>
</template>

<script>
	import codeButton from '@/components/getCode/index.vue'
	
	export default {
		components: {
		  codeButton
		},
		data() {
			return {
				button_loading: false,
				nameCode: 'passwordForget',
				user: {
					mobile: '',
					validCode: '',
					password: '',
					passwordRepeat: ''
				},
				showTipe: {
					mobile: false,
					code: false,
					password: false,
					passwordRepeat: false
				},
				passVer: true
			}
		},
		onShow: function() {

		},
		onReady: function() {
		},
		methods: {
			blurChange(e) {
				if (e.currentTarget.dataset.valtype == 'password') {
					this.passVer = (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,25}$/).test(this.user.password)
				}
				if (e.detail.value) {
					this.showTipe[e.currentTarget.dataset.valtype] = false
				} else {
					this.showTipe[e.currentTarget.dataset.valtype] = true
				}
			},
			passwordForget_botton() {
				this.button_loading = true
				this.$api.changePassword(this.user).then(res => {
					this.button_loading = false
					uni.showModal({
						title: '提示',
						content: '修改成功, 去登录',
						confirmText: '去登录',
						confirmColor: 'rgb(54, 133, 204)',
						success: function (res) {
							if (res.confirm) {
								uni.reLaunch({
									url: '/pages/user/login/index'
								})
							}
						}
					});
				}).catch(() => {
					this.button_loading = false
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.passwordForget-content {
		padding: 60upx;
		position: relative;
		.passwordForget-top-absolute{
			position: absolute;
			top: 0upx;
			right: 20upx;
		}
		// .bottom-passwordForget{
		// 	display: flex;
		// 	justify-content: space-between;
		// 	margin-top: 20upx;
		// }
		.passwordForget-head {
			text-align: center;
			.passwordForget-head-img {
				width: 130upx;
				margin: 0 auto;
			}
		}
		.passwordForget-head-input{
			margin: 30px 0 10px;
			.code_right{
				display: flex;
				justify-content: space-between;
				input{
					flex: 1;
				}
			}
			input{
				background: #f2f2f2;
				border-radius: 10upx;
				height: 80upx!important;
				line-height: 80upx!important;
				padding-left: 20upx
			}
			.input-warn{
				text-align: right;
				color: #ef1c1c;
			}
			.input-warn-show{
				visibility: hidden;
			}
		}
	}
</style>
