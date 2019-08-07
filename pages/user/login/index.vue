<template>
	<view class="login-content background-gray">
		<view class="login-head">
			<image src="../../../static/logo.png" mode="widthFix" class="login-head-img"></image>
		</view>
		<view class="login-head-input">
			<input type="text" maxlength="20" placeholder="请输入手机号码/账号名" @blur="blurChange" data-valType="username" v-model="name_login"/>
			<view class="input-warn" :class="!showTipe.username?'input-warn-show':''">请输入姓名</view>
			
			<input type="text" password maxlength="25" placeholder="请输入英文和数字组成的6-25位密码" @blur="blurChange" data-valType="password" v-model="password_login"/>
			<view class="input-warn" :class="!showTipe.password?'input-warn-show':''">请输入密码</view>
			
<!-- 			<view class="code_right">
				<input type="text" placeholder="请输入验证码" maxlength="4" @blur="blurChange" data-valType="code" v-model="code_login"/>
				<image :src="codeSrc" mode="widthFix" @click="codeDefined"></image>
			</view> -->
			<view class="input-warn" :class="!showTipe.code?'input-warn-show':''">请输入验证码</view>
		</view>

		<button type="default-ZJS" :loading="button_loading" :disabled="name_login.length == 0 || password_login.length < 6 || code_login.length < 4" class="login-botton" @click="login_botton">登录</button>
		
		<!-- 更多选择(注册，忘记密码) -->
		<view class="login-top-absolute" @click="testAs2">更多></view>
		<min-action-sheet ref="as1"></min-action-sheet>

	</view>
</template>

<script>
	import minActionSheet from '@/components/min-action-sheet/min-action-sheet'
	import { randomLenNum, encryption } from '../../../common/util.js'
	export default {
		components: {
		  minActionSheet
		},
		data() {
			return {
				button_loading: false,
				name_login: '',
				password_login: '',
				code_login: 'xysi',
				codeSrc: '',
				name_change: false,
				password_change: false,
				code_change: false,
				showTipe: {
					username: '',
					password: '',
					code: ''
				}
			}
		},
		onShow: function() {
		},
		onReady: function() {
			this.codeDefined()
		},
		methods: {
			testAs2 () {
				this.$refs.as1.handleShow({
					actions: [{name: '注册',},{name: '忘记密码'}],
					success: (res) => {
					switch (res.id) {
						// -1代表取消按钮
						case -1:
							console.log(res)
							break
							// 代表异步按钮
						case 0:
							uni.navigateTo({
								url: '../register/index'
							})
							break
						case 1:
							uni.navigateTo({
								url: '../passwordForget/index'
							})
							break
					}
				}
			  })
			},
			codeDefined() {
			  this.codeSrc = this.$url + 'code?randomStr=' + randomLenNum(8, true)
			},
			blurChange(e) {
				if (e.detail.value) {
					this.showTipe[e.currentTarget.dataset.valtype] = false
				} else {
					this.showTipe[e.currentTarget.dataset.valtype] = true
				}
			},
			login_botton() {
				const param = {
					username: this.name_login,
					password: encryption(this.password_login),
					code: this.code_login,
					randomStr: this.codeSrc.substring((this.codeSrc.indexOf('=') + 1), this.codeSrc.length),
					grant_type: 'password',
					scope: 'server'
				}
				this.button_loading = true
				console.log('param', param)
				this.$api.login(param).then(res => {
					this.$store.dispatch('getUserInfo', res.data)	
					this.button_loading = false
					uni.switchTab({
						url: '/pages/order/index'
					})
				}).catch(() => {
					this.codeDefined()
					this.button_loading = false
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-content {
		padding: 60upx;
		.login-top-absolute{
			margin-top: 20px;
			text-align: center;
			font-size: 14px;
			color: #74a5d0;
		}
		.login-head {
			text-align: center;
			.login-head-img {
				width: 130upx;
				margin: 0 auto;
			}
		}
		.login-head-input{
			margin: 100upx 0 50upx;
			.code_right{
				display: flex;
				justify-content: space-between;
				input{
					flex: 1;
				}
				image{
					margin-left: 30upx;
					width: 160upx!important;
					height: 80upx!important;
					border-radius: 8upx;
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
				margin-bottom: 20upx;
				text-align: right;
				color: #ef1c1c;
			}
			.input-warn-show{
				visibility: hidden;
			}
		}
	}
</style>
