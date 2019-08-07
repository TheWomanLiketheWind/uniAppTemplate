<template>
	<view class="register-content">
		<view class="register-head">
			<image src="../../../static/logo.png" mode="widthFix" class="register-head-img"></image>
		</view>
		<view class="register-head-input">
			<input type="text" maxlength="20" placeholder="请输入公司名称" @blur="blurChange" data-valType="name" v-model="user.name"/>
			<view class="input-warn" :class="!showTipe.name?'input-warn-show':''">请输入公司名称</view>
			
			<input type="text" maxlength="20" placeholder="请输入公司简称" @blur="blurChange" data-valType="shortName" v-model="user.shortName"/>
			<view class="input-warn" :class="!showTipe.shortName?'input-warn-show':''">请输入公司简称</view>
			
			<input type="text" maxlength="30" placeholder="请输入公司地址" @blur="blurChange" data-valType="address" v-model="user.address"/>
			<view class="input-warn" :class="!showTipe.address?'input-warn-show':''">请输入公司地址</view>
			
			<input type="number" maxlength="11" placeholder="请输入手机号" @blur="blurChange" data-valType="phone" v-model="user.phone"/>
			<view class="input-warn" :class="!showTipe.phone || user.phone.length == 11?'input-warn-show':''">手机号不正确</view>
			
			<view class="code_right">
				<input type="number" maxlength="6" placeholder="请输入验证码" @blur="blurChange" data-valType="code" v-model="user.validCode"/>
				<codeButton :name="nameCode" :mobile="user.phone"></codeButton>
			</view>
			<view class="input-warn" :class="!showTipe.code?'input-warn-show':''">请输入验证码</view>
			
			<input type="text" password maxlength="25" placeholder="请输入英文和数字组成的6-25位密码" @blur="blurChange" data-valType="password" v-model="user.password"/>
			<view class="input-warn" :class="!showTipe.password?'input-warn-show':''">请输入密码</view>
			
		</view>

		<button type="default-ZJS" :loading="button_loading" :disabled="user.name.length == 0 || user.shortName.length == 0 || user.address.length == 0 || user.phone.length != 11 || user.validCode.length != 6 || user.password.length < 6" class="register-botton" @click="register_botton">马上注册</button>
		
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
				nameCode: '注册',
				user: {
					name: '',
					shortName: '',
					address: '',
					phone: '',
					validCode: '',
					password: ''
				},
				showTipe: {
					name: false,
					shortName: false,
					address: false,
					phone: false,
					code: false,
					password: false
				}
			}
		},
		onShow: function() {
		},
		onReady: function() {
		},
		methods: {
			blurChange(e) {
				if (e.detail.value) {
					this.showTipe[e.currentTarget.dataset.valtype] = false
				} else {
					this.showTipe[e.currentTarget.dataset.valtype] = true
				}
			},
			register_botton() {
				this.button_loading = true
				this.$api.register(this.user).then(res => {
					this.button_loading = false
					uni.reLaunch({
						url: '/pages/user/login/index'
					})
				}).catch(() => {
					this.button_loading = false
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.register-content {
		padding: 60upx;
		position: relative;
		.register-top-absolute{
			position: absolute;
			top: 0upx;
			right: 20upx;
		}
		// .bottom-register{
		// 	display: flex;
		// 	justify-content: space-between;
		// 	margin-top: 20upx;
		// }
		.register-head {
			text-align: center;
			.register-head-img {
				width: 130upx;
				margin: 0 auto;
			}
		}
		.register-head-input{
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
