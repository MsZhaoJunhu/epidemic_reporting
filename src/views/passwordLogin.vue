<template>
	<section class="aui-flexView">
		<section class="aui-scrollView">
			<div class="aui-reg-body">
				<!-- <div class="aui-cell-item">
          <h2>登录类型</h2>
          <div class="aui-palace aui-palace-one">
            <a href="javascript:;" class="aui-palace-grid" >
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
					<h2>组织登录</h2>
					<div class="aui-reg-item-for">
						<i class="icon icon-phone"></i>
						<input id="phone1" type="text" placeholder="请输入手机号码/用户名" v-model="phone" />
					</div>
					<div class="aui-reg-item-for">
						<i class="icon icon-phone"></i>
						<input id="password" type="password" placeholder="请输入密码" v-model="password" />
					</div>
					<div class="aui-reg-item-go">
						<button @click="login()">立即登录</button>
					</div>
				</div>
				<router-link to="/reg_enterprise">
					<p style="text-align: center;color: #fff;">
						我还没有账号,去注册!
					</p>
				</router-link>
				<div class="aui-cell-item">
					
					


					<div class="aui-reg-sit">
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
				changeLogin: 1,
				password: ""
			};
		},
		methods: {
			login() {
				const that = this;
				if (that.phone == "" || that.password == "") {
					that.$toast.text("请填写完成之后进行提交");
					return;
				}
				that.loading = that.$toast.loading();
				that.$api.passwordLogin(that.phone, that.password).then(function(value) {
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
										name: "fugong"
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
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../assets/skin/css/style.scss";
input{
	width: 100%;
}
	.aui-flexView {
		background: #1060d3;
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
