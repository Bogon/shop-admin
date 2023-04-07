<template>
	<div class="login_container">
		<div class="login_box">
			<div class="avatar_box">
				<img src="@/assets/logo.png" alt="">
			</div>
			<!-- 登录表单区域 -->

			<el-form ref="loginFromRef" label-width="0px" class="login_form" :model="loginForm" :rules="loginFormRules">
				<!--	用户名 -->
 				<el-form-item  prop="username">
    			<el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
  			</el-form-item>

				<!--密码-->
				<el-form-item prop="password">
					<el-input prefix-icon="iconfont icon-3702mima" v-model="loginForm.password" type="password"></el-input>
				</el-form-item>

				<!--按钮区域-->
				<el-form-item class="btns">
					<el-button type="primary" @click="validateLoginForm">登录</el-button>
					<el-button type="info" @click="resetLoginForm">重置</el-button>
				</el-form-item>
			</el-form>

		</div>
	</div>
</template>
<script>
import {login} from '@/api'
export default {
	data(){
		return {
			// 	登录表单的登录数据
			loginForm: {
				username: 'admin',
				password: '123456',
			},
			 // 表单的验证规则
			loginFormRules: {
				// 用户名的验证规则
				username: [
					{required: true, message:'请输入登录名称', trigger: "blur"},
					{min: 3, max: 20, message: '至少3个字符，至多20个字符', trigger: "blur"}
				],
				// 密码的验证规则
				password: [
					{required: true, message:'请输入登录密码', trigger: "blur"},
					{min: 6, max: 20, message: '至少6个字符，至多20个字符', trigger: "blur"}
				]
			}
		}
	},
	methods: {
		// 点击按钮重置登录表单
		resetLoginForm() {
			this.$refs.loginFromRef.resetFields()
		},
		// 验证登录数据
		validateLoginForm() {
			this.$refs.loginFromRef.validate(async valid => {
				if (!valid) return;
				const result = await login(this.loginForm)
				if (result.meta.status !==200) return this.$message.error(result.meta.msg)
				this.$message.success("登录成功")
				// 1、将token 保存在 sessionstorage中
				window.sessionStorage.setItem("token", result.data.token)
				// 将界面中重定向到 /home 中
				this.$router.push('/home')
			})
		}
	}
}
</script>
<style lang="less" scoped>
.login_container {
	background-color: #2b4b6b;
	height: 100%;
}
.login_box{
	width: 450px;
	height: 300px;
	background-color: #fff;
	border-radius: 5px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}

.avatar_box {
	width: 130px;
	height: 130px;
	border: 1px solid #eee;
	border-radius: 50%;
	padding: 10px;
	box-shadow: 0 0 10px #ddd;
	position: absolute;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #fff;
	img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background-color: #eee;
		
	}
}

.btns {
	display: flex;
	justify-content: flex-end;
}

.login_form {
	position: absolute;
	bottom: 0;
	width: 100%;
	padding: 0 10px;
	box-sizing: border-box;
}
</style>
