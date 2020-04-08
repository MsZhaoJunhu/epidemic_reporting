<template>
	<section class="aui-flexView">
		<section class="aui-scrollView">
			<div class="aui-reg-body">
				<!-- <div class="aui-cell-item">
					<h2>请选择登录类型</h2>
					<div class="aui-palace aui-palace-one">
						<a v-if="changeLogin==0" href="javascript:;" class="aui-palace-grid">
							<div class="aui-palace-grid-icon">
								<img src="../assets/skin/images/icon-item-01.png" alt="" />
							</div>
							<div class="aui-palace-grid-text">
								<h3>个人用户</h3>
							</div>
						</a>
						<a v-else href="javascript:;" class="aui-palace-grid">
							<div class="aui-palace-grid-icon">
								<img src="../assets/skin/images/icon-item-02.png" alt="" />
							</div>
							<div class="aui-palace-grid-text">
								<h3>组织用户</h3>
							</div>
						</a>
					</div>
				</div> -->

				<div class="aui-cell-item">
					<h2 v-if="changeLogin == 0">个人用户登录</h2>
					<h2 v-else>企业用户登录</h2>
					<div class="aui-reg-item-for">
						<i class="icon icon-phone"></i>
						<input id="phone1" type="text" placeholder="请输入手机号码" v-model="phone" />
					</div>
					<div class="aui-reg-item-for">
						<i class="icon icon-code"></i>
						<input id="code1" type="text" autocomplete="off" placeholder="请输入验证码" v-model="code" />
						<input id="btnSendCode1" type="button" class="aui-code-btn" @click="sendM()" value="获取验证码" v-if="isSend == false" />
						<button id="btnSendCode1" type="button" class="aui-code-btn" v-else>
							请等待{{ timer }}秒
						</button>
					</div>
					<div class="routerLinkToPassword-par">
						<router-link to="passwordLogin" v-if="changeLogin == 1" class="routerLinkToPassword">密码登录</router-link>
					</div>
					<div class="aui-reg-item-go">
						<button @click="login()">立即登录</button>
					</div>
					<div class="changeBtn btn_0DDFAC" @click="changeLogin = 0" v-show="changeLogin==1">
						<button>我是个人用户</button>
					</div>
					<div class="changeBtn btn_FE994E" @click="changeLogin = 1" v-show="changeLogin==0">
						<button>我是企业用户</button>
					</div>
					
					<!-- <div class="aui-reg-cell-right changeLogin">
						<span @click="changeLogin = 0" v-if="changeLogin == 1">个人登录</span>
						<span @click="changeLogin = 1" v-else>企业登录</span>
					</div> -->
				</div>
				<router-link to="/reg" v-if="changeLogin == 0">
					<p style="text-align: center;color: #fff;">
						我还没有账号,去注册!
					</p>
				</router-link>
				<router-link to="/reg_enterprise" v-else>
					<p style="text-align: center;color: #fff;">
						我还没有账号,去注册!
					</p>
				</router-link>
				<div class="aui-cell-item">
					
					<div class="aui-reg-sit" v-if="changeLogin == 0">
						<a href="javascript:;" class="aui-flex">
							<div class="aui-tag-img">
								<img src="../assets/登录/com_icon1.png" alt="" />
							</div>
							<div class="aui-flex-box">
								<h3>关联企业</h3>
								<p>搜索企业,关联所属企业</p>
							</div>
						</a>
						<a href="javascript:;" class="aui-flex">
							<div class="aui-tag-img">
								<img src="../assets/登录/com_icon2.png" alt="" />
							</div>
							<div class="aui-flex-box">
								<h3>上班打卡</h3>
								<p>无接触登记、人员轨迹轨迹提醒</p>
							</div>
						</a>
						<a href="javascript:;" class="aui-flex">
							<div class="aui-tag-img">
								<img src="../assets/登录/com_icon3.png" alt="" />
							</div>
							<div class="aui-flex-box">
								<h3>疫情资讯</h3>
								<p>查看疫情和防控讯息</p>
							</div>
						</a>
					</div>
					
					
					<div class="aui-reg-sit" v-else>
						<a href="javascript:;" class="aui-flex">
							<div class="aui-tag-img">
								<img src="../assets/登录/user_icon1.png" alt="" />
							</div>
							<div class="aui-flex-box">
								<h3>员工管理</h3>
								<p>收集查看企业员工健康信息</p>
							</div>
						</a>
						<a href="javascript:;" class="aui-flex">
							<div class="aui-tag-img">
								<img src="../assets/登录/user_icon2.png" alt="" />
							</div>
							<div class="aui-flex-box">
								<h3>复工上报</h3>
								<p>在线提交企业复工申请</p>
							</div>
						</a>
						<a href="javascript:;" class="aui-flex">
							<div class="aui-tag-img">
								<img src="../assets/登录/user_icon3.png" alt="" />
							</div>
							<div class="aui-flex-box">
								<h3>复工追加</h3>
								<p>在线追加复工员工</p>
							</div>
						</a>
					</div>
					
					
				</div>

				<div class="aui-footer-bg">
					<img src="../assets/skin/images/footer-bg.png" alt="" />
					<div class="aui-footer-text">
						<p>技术支持：重庆城银科技股份有限公司</p>
						<!-- <h2>联系我们 <em>15213281690</em></h2> -->
					</div>
				</div>
			</div>
		</section>
	</section>
</template>

<script>
	export default {
		name: "login",
		data() {
			return {
				phone: "",
				code: "",
				isSend: false,
				timer: 60,
				dsq: null,
				changeLogin:this.$route.query.type || 0,
			};
		},
		methods: {
			login() {
				const that = this;
				if (that.phone == "" || that.code == "") {
					that.$toast.text("请填写完成之后进行提交");
					return;
				}
				if (that.changeLogin === 0) {
					that.loading = that.$toast.loading();
					that.$api.login(that.phone, that.code).then(function(value) {
						console.info(value.data.code);
						switch (value.data.code) {
							case 200:
								localStorage.setItem("token", value.data.token);
								localStorage.setItem("link", "mycenter");
								that.$api.getUserInfo().then(function(res) {
									if (res.data.code == 200) {
										that.loading.hide();
										that.$router.push({
											path: "/index/userfugong"
										});
										localStorage.setItem(
											"UserInfo",
											JSON.stringify(res.data.info)
										);
									}
								});
								break;
							case 500:
								that.$toast.text(value.data.msg);
								that.loading.hide();
								break;
							default:
								break;
						}
					});
				} else {
					that.loading = that.$toast.loading();
					that.$api
						.loginForenterprise(that.phone, that.code)
						.then(function(value) {
							console.info(value.data.code);
							switch (value.data.code) {
								case 200:
									localStorage.setItem("token", value.data.token);
									localStorage.setItem("link", "mycompany");
									that.$api.getEnterpriseInfo().then(function(res) {
										if (res.data.code == 200) {
											that.loading.hide();
											localStorage.setItem(
												"CompenyInfo",
												JSON.stringify(res.data.info)
											);
											that.$router.push({
												path: "/index/fugong"
											});
										}
									});
									break;
								case 500:
									that.$toast.text(value.data.msg);
									that.loading.hide();
									break;
								default:
									break;
							}
						});
				}
			},
			sendM() {
				const that = this;
				if (this.phone != "") {
					that.loading = that.$toast.loading();
					this.$api.sendMessage(this.phone).then(function(value) {
						console.info(value);
						switch (value.data.code) {
							case 200:
								that.isSend = true;
								that.$toast.text("已发送,请注意查收");
								that.loading.hide();
								that.dsq = setInterval(() => {
									that.timer--;
									if (that.timer == 0) {
										that.isSend = false;
										that.timer = 60;
										clearInterval(that.dsq);
										that.dsq = null;
									}
								}, 1000);

								break;
							case 500:
								that.$toast.text(value.data.msg);
								that.loading.hide();
								break;
							default:
								break;
						}
					});
				} else {
					this.$toast.text("请填写手机号");
				}
			},
		}
	};
</script>

<style lang="scss" scoped>
	@import "../assets/skin/css/style.scss";

input{
	width: 100%;
}
	.aui-flexView {
		background: #1060d3 !important;
	}

	.aui-code-btn {
		border: none;
	}

	.changeLogin {
		text-align: right;
	}

	.aui-palace-one {
		display: flex;
		justify-content: space-around;
	}

	.active {
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		border-radius: 10px;
	}
	.changeBtn{
		button{
			width:100%;
			padding:10px;
			background: transparent;
			border: 1px solid;
			border-radius: 50px;
			font-size: 14px;
		}
		padding: 5px 0;
	}
	.btn_FE994E{
		color: #FE994E;
	}
	.btn_0DDFAC{
		color: #0DDFAC;
	}
	.aui-reg-item-go{
		margin-bottom:5px;
	}
	.aui-tag-img {
		height: 30px;
		width: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 10px;
	
		img {
			height: 26px;
			width: auto;
		}
	}
</style>
<style>
	.routerLinkToPassword-par {
		width: auto;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin-bottom: 1rem !important;
	}

	.routerLinkToPassword {
		margin-right: 0.5rem;
	}

	.routerLinkToPassword::after {
		content: ">"
	}
</style>
