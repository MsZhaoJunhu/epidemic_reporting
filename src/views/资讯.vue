<template>
	<section class="aui-flexView">
		<header class="aui-navBar aui-navBar-fixed">
			<div class="aui-center">
				<img src="../assets/skin/images/logo.jpg" alt="" />
				<span class="aui-center-title">渝北区复工复产管理平台</span>
			</div>
		</header>
		<section class="aui-scrollView">
			<div class="dynamic">
				<div class="top">
					<div class="iconfont"></div>
					<span class="city">重庆</span>
					<span class="report">疫情速报</span>
				</div>
				<div class="body1">
					<div class="number1">
						<h2>{{ newslist.confirmedCount }}</h2>

						<h4>累计确诊</h4>
					</div>
					<div class="number3">
						<h2>{{ newslist.curedCount }}</h2>

						<h4>治愈人数</h4>
					</div>
					<div class="number4">
						<h2>{{ newslist.deadCount }}</h2>

						<h4>死亡人数</h4>
					</div>
				</div>
			</div>
			<div class="nav-list">
				<p class="top-list">
					<a href="http://fgfcapi.cy-coo.com/down/shouce.html">
						<img src="../../src/assets/skin/images/疫情上报-01.png" alt="" />
					</a>
					<a href="http://fgfcapi.cy-coo.com/down/index.html">
						<img src="../../src/assets/skin/images/疫情上报-02.png" alt="" />
					</a>
				</p>
				<p class="bottom-list" style="padding-top:.8rem;">
					<a href="http://fgfcapi.cy-coo.com/down/peixun.html">
						<img src="../../src/assets/skin/images/疫情上报-03.png" alt="" />
					</a>
				</p>
			</div>
			<!-- <div class="divHeight"></div> -->
			<!-- <div class="aui-flex b-line">
				<div class="aui-flex-box">
					<h2>疫情问答</h2>
				</div>
			</div> -->
			<div class="Special_column">
				<div class="column column1">
					<!-- <span
            ><a href="https://ncov.dxy.cn/ncovh5/view/pneumonia"
              >疫情动态</a
            ></span
          > -->
					<router-link to="/virusNews">
						<div class="column">
							<span style="color:#0881fc">健康问答</span>
						</div>
					</router-link>
				</div>
				<router-link to="/virusNews">
					<div class="column">
						<span>疫情专栏</span>
					</div>
				</router-link>
				<!-- <router-link to="/virusNews">
          <div class="column">
            <span>健康问答</span>
          </div>
        </router-link> -->
				<div class="column">
					<span><a href="http://www.zjcoo.cn:8081/pneumonia/index.html">疫情地图</a></span>
				</div>
			</div>
			<div class="tab-panel-item tab-active answer">
				<div class="top">
					<div class="iconfont"></div>
					<span class="city">最新进展</span>
				</div>
				<router-link :to="{ path: `/virusNewsDetails/${item.article_id}/2` }" v-for="(item, index) in QAlist" :key="index">
					<div class="aui-flex-box" style="padding: 10px 0;">
						<p>{{ item.publish_time }}</p>
						<h1 style="padding-left:0;">
							<!-- <em>问题</em> -->
							{{ item.article_title }}
						</h1>
						<div class="aui-flex" style="padding:0">
							<!-- <div class="aui-sml-user">
								<img src="../assets/skin/images/user1.png" alt="" />
							</div> -->
							<div class="aui-flex-box">
								<h3>
									<img src="../assets/skin/images/user1.png" alt="" height="20px" style="border-radius: 50%;margin-right: 5px;" />{{ item.article_content }}
								</h3>
							</div>
						</div>
					</div>
					<!-- <div class="aui-right-seep">
						<img :src="item.article_image" width="100%"/>
						<div class="aui-seep-text">进度：<em>处理中</em></div>
					</div> -->
				</router-link>
			</div>
			<!-- <p class="banben">
        <span>{{ banben }}</span>
        <span>
          <img :src="logo" alt="" height="30px" />
        </span>
      </p> -->
		</section>
		<tabbar activeNumber='2'></tabbar>
	</section>
</template>

<script>
	import tabbar from "@/components/tabbar.vue";
	import Swiper from "swiper";
	export default {
		name: "index",
		components: {
			tabbar
		},
		data() {
			return {
				QAlist: [],
				//数据更新时间
				time: "",
				newslist: [],
				yesterdayData: "",
				title: "",
				banben: "",
				logo: ""
			};
		},
		created() {
			this.getPage(1, 2);
			const that = this;
			that.$api.getPneumoniaIinfo().then(function(response) {
				if (response.data.code == 200) {
					that.yesterdayData = response.data.yesterdayData;
					that.time = response.data.date;
					// that.newslist = response.data.newslist
					that.newslist = response.data.newslist.find(
						item => item.provinceName === "重庆市"
					);
				}
			});
			if (localStorage.getItem("token") != null) {
				if (localStorage.getItem("link") == "mycenter") {
					that.$api.getUserInfo().then(function(res) {
						if (res.data.code == 500 && res.data.status == 500) {
							that.$dialog({
								title: "系统通知",
								content: "您的身份标识已生效（可能在其他设备登录），请重新登录",
								closeBtn: false, //显式右上角关闭按钮
								noCancelBtn: true,
								closeOnClickModal: false,
								onOkBtn(event) {
									//确定按钮点击事件
									localStorage.removeItem("token");
									localStorage.removeItem("link");
									this.close(); //关闭对话框
									setTimeout(() => {
										that.$router.push({
											name: "login"
										});
									}, 100);
								}
							});
						}
					});
				} else if (localStorage.getItem("link") == "mycompany") {
					that.$api.getEnterpriseInfo().then(function(res) {
						if (res.data.code == 500 && res.data.status == 500) {
							that.$dialog({
								title: "系统通知",
								content: "您的身份标识已生效（可能在其他设备登录），请重新登录",
								closeBtn: false, //显式右上角关闭按钮
								noCancelBtn: true,
								closeOnClickModal: false,
								onOkBtn(event) {
									//确定按钮点击事件
									localStorage.removeItem("token");
									localStorage.removeItem("link");
									this.close(); //关闭对话框
									setTimeout(() => {
										that.$router.push({
											name: "login"
										});
									}, 100);
								}
							});
						}
					});
				}
			}
		},
		computed: {},
		mounted() {
			const that = this;
			new Swiper(".swiper-container", {
				autoplay: true, //可选选项，自动滑动
				loop: true
			});
			// this.$api.getConfig().then(function(res) {
			//   console.info(res.data);
			//   if ((res.data.code = 200)) {
			//     document.title = res.data.data.web_title;
			//     that.title = res.data.data.web_title;
			//     // 插入 meta 标签
			//     var oMeta = document.createElement("meta");
			//     oMeta.content = res.data.data.web_keywords;
			//     oMeta.name = "keywords";
			//     document.getElementsByTagName("head")[0].appendChild(oMeta);

			//     var oMeta1 = document.createElement("meta");
			//     oMeta1.content = res.data.data.web_description;
			//     oMeta1.name = "keywords";
			//     document.getElementsByTagName("head")[0].appendChild(oMeta1);

			//     that.banben = res.data.data.web_version;
			//     that.logo = res.data.data.web_powerby_logo;
			//   }
			// });
		},
		methods: {
			router_to(url, type) {
				if (
					type != localStorage.getItem("link") &&
					localStorage.getItem("link") != null
				) {
					if (localStorage.getItem("link") == "mycenter") {
						this.$toast.text("您不是企业用户,请使用企业账号登录");
					} else if (localStorage.getItem("link") == "mycompany") {
						this.$toast.text("您不是个人用户，请使用个人账号登录");
					}
				} else {
					this.$router.push({
						name: url
					});
				}
			},
			getPage(page, type_id) {
				const that = this;
				that.loading = that.$toast.loading();
				this.$api.indexQA(page, type_id).then(function(res) {
					if (res.data.code == 200) {
						that.loading.hide();
						that.QAlist = res.data.data;
						console.log(that.QAlist);
					}
				});
			},
			zwkf() {
				this.$toast.text("暂未开放页面");
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../assets/skin/css/swiper.min.css";
	@import "../assets/skin/css/index.scss";
	@import "../assets/skin/css/myinfo.scss";

	.aui-flexView {
		padding-bottom: 50px;
	}

	.aui-center {
		display: flex;
	}

	.aui-center img {
		width: 1.2rem;
		height: 1.2rem;
	}

	.aui-center span {
		font-size: 1.1rem !important;
	}

	.Special_column {
		width: 90%;
		height: 45px;
		display: flex;
		/* padding: 30px !important; */
		/* margin-bottom: 1.5rem !important; */
		margin: 0 auto !important;
		line-height: 45px;
		justify-content: space-around;
		color: #353535;
		font-size: 1rem;
		box-sizing: border-box;
		position: relative;
		top: -25px;
	}


	.border {
		width: 100%;
		border: 1px dotted #e4e4e4;
		position: relative;
		top: 85px;
	}

	.img {
		width: 90%;
		height: 85px;
		margin-left: 20px;
		border-radius: 10px;
		position: relative;
		top: -25px;
	}

	.column1 {
		font-size: 1.1rem;
		color: #0881fc;
		border-bottom: 2px solid #0881fc;
	}

	.column:hover {
		font-size: 1.1rem;
		color: #0881fc;
		border-bottom: 2px solid #0881fc;
	}

	.dynamic {
		border-radius: 5px;
		background-color: #fff;
		position: relative;
		top: -25px;
		padding: 15px !important;
		margin: 0px 15px !important;
	}

	.top {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.top::before {
		content: "";
		display: table;
	}

	.city {
		font-size: 18px;
		margin-right: 15px;
	}

	.report {
		font-size: 12px;
		color: #666;
	}

	.iconfont {
		width: 5px;
		box-shadow: 0 0 3px #007aff;
		height: 18px;
		border-radius: 20%;
		margin-right: 15px !important;
		background-color: #0881fc;
	}

	.body1 {
		display: flex;
		justify-content: space-around;
		margin-top: 15px !important;
		text-align: center;
	}

	.yesterday {
		margin: 0 0 7px 0 !important;
		font-size: 11px;
		color: #9a9999;
	}

	h4 {
		color: #666;
		font-size: 0.9rem;
		font-weight: normal;
	}

	h5 {
		color: rgb(170, 168, 168);
	}

	.number1 h2 {
		color: #ff4442;
		font-size: 30px;
		font-weight: 500;
	}

	.number2 h2 {
		color: #fe994e;
		font-size: 30px;
		font-weight: 500;
	}

	.number3 h2 {
		color: #0ddfac;
		font-size: 30px;
		font-weight: 500;
	}

	.number4 h2 {
		color: #a0a0a0;
		font-size: 30px;
		font-weight: 500;
	}

	.add1 {
		color: #ff4442 !important;
		font-size: 11px;
	}

	.add2 {
		color: #fe994e !important;
		font-size: 11px;
	}

	.add3 {
		color: #0ddfac !important;
		font-size: 11px;
	}

	.add4 {
		color: #a0a0a0 !important;
		font-size: 11px;
	}

	.a-pre-title {
		font-size: 1.1rem;
		width: 100%;
		text-align: center;
		line-height: 4rem;
		color: #333;
	}

	.aui-palace-grid {
		float: none !important;
	}

	.thisIsMy {
		margin: 0 1rem !important;
		background: #fff;
		border-radius: 10px;
		position: relative;
		top: -40px;
		z-index: 9;
	}

	.aui-scrollView {
		padding-top: 3rem;
		background: rgba(0, 0, 0, 0.05);
	}

	.answer {
		background-color: #fff;
		border-radius: 10px;
		margin: 0 15px !important;
		padding: 15px !important;
		position: relative;
		top: -15px;
	}

	.banben {
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
	}

	.banben span {
		display: inline-flex;
		margin-bottom: 10px;
		font-size: 12px;
	}

	.nav-list {
		position: relative;
		top: -10px;
		margin: 0 auto !important;
		width: 95%;
		padding-bottom: 0.5rem !important;
	}

	.top-list {
		display: flex;
		justify-content: space-between;
		align-items: center;

		a {
			margin: 0 5px;
		}
	}

	.top-list img {
		width: 100%;
		/* padding-right: 0.5rem; */
	}

	.bottom-list {
		a{
			padding:0 5px;
		}
		/* width: 90%;
  margin: 0 auto; */
	}

	.bottom-list img {
		width: calc(100% - 10px);
	}
</style>
