<template>
	<section>
		<div v-show="guanzhu" class="guanzhu">
			<span class="guanbi" @click="guanzhu=false">关闭</span>
			<span><img src="../assets/skin/images/gzh.jpg" width="70%"/></span>
			<p>长按二维码关注公众号使用更方便</p>
		</div>
		<header class="aui-navBar aui-navBar-fixed">
			<div class="aui-center">
				<img src="../assets/skin/images/logo.jpg" alt="">
				<span class="aui-center-title">渝北区复工复产管理平台</span>
			</div>
			<router-link to="/updatePass" class="icon" v-if="link=='mycompany'">
				<svg style="width: 16px; height: 16px;vertical-align: middle;fill: currentColor;overflow: hidden;color: #007AFF;"
				 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2125">
					<path d="M881 512c0-52.4 32.9-96.8 79-114.5-11-43.2-28-83.9-50.2-121.3C864.6 296.3 810 288.1 773 251c-37-37-45.2-91.7-25.1-136.8C710.4 92 669.7 75 626.5 64c-17.8 46.1-62.2 79-114.5 79-52.4 0-96.8-32.9-114.5-79-43.2 11-83.9 28-121.3 50.2 20.1 45.2 11.9 99.8-25.1 136.8-37 37-91.7 45.2-136.8 25.2C92 313.6 75 354.3 64 397.5c46.1 17.8 79 62.2 79 114.5 0 52.4-32.9 96.8-79 114.5 11 43.2 28 83.9 50.2 121.3C159.4 727.7 214 735.9 251 773c37 37 45.2 91.7 25.1 136.8C313.6 932 354.3 949 397.5 960c17.8-46.1 62.2-79 114.5-79 52.4 0 96.8 32.9 114.5 79 43.2-11 83.9-28 121.3-50.2-20.1-45.2-11.9-99.8 25.1-136.8 37-37 91.7-45.2 136.8-25.2C932 710.4 949 669.7 960 626.5c-46.1-17.7-79-62.1-79-114.5zM512 635c-67.9 0-123-55.1-123-123s55.1-123 123-123 123 55.1 123 123-55.1 123-123 123z"
					 p-id="2126" data-spm-anchor-id="a313x.7781069.1998910419.i1"></path>
				</svg>
			</router-link>
		</header>
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide">
					<img src="../assets/skin/images/banner1.png" alt="" width="100%" />
				</div>
				<div class="swiper-slide">
					<img src="../assets/skin/images/banner2.png" alt="" width="100%" />
				</div>
				<div class="swiper-slide">
					<img src="../assets/skin/images/banner3.png" alt="" width="100%" />
				</div>
			</div>
		</div>
		<nut-noticebar
		  :closeMode="true"
		  @click="guanzhu=true"
		>
		关注公众号,快速进行上班打卡
		</nut-noticebar>
		<!-- <section class="aui-scrollView">

			<div class="divHeight"></div>
			<div class="aui-palace aui-palace-one thisIsMy">
				<div>
					<p style="padding: 15px 0;text-align: center;font-size: 16px;color: rgba(0,0,0,.6);">我是个人</p>
					<div style="display: flex;">
						<a @click="router_to('jubao','mycenter')" class="aui-palace-grid">
							<div class="aui-palace-grid-icon">
								<img src="../assets/skin/images/V2_03.png" alt="" />
							</div>
							<div class="aui-palace-grid-text">
								<h2>线索举报</h2>
							</div>
						</a>
						<a @click="router_to('affiliatedEnterprises','mycenter')" class="aui-palace-grid">
							<div class="aui-palace-grid-icon">
								<img src="../assets/skin/images/V2_05.png" alt="" />
							</div>
							<div class="aui-palace-grid-text">
								<h2>健康上报</h2>
							</div>
						</a>
						<a @click="router_to('affiliatedEnterprises','mycenter')" class="aui-palace-grid">
							<div class="aui-palace-grid-icon">
								<img src="../assets/skin/images/V2_07.png" alt="" />
							</div>
							<div class="aui-palace-grid-text">
								<h2>轨迹上报</h2>
							</div>
						</a>
						<a @click="router_to('affiliatedEnterprises','mycenter')" class="aui-palace-grid">
							<div class="aui-palace-grid-icon">
								<img src="../assets/skin/images/V2_09.png" alt="" />
							</div>
							<div class="aui-palace-grid-text">
								<h2>来访登记</h2>
							</div>
						</a>
					</div>
					<p style="padding: 15px 0;text-align: center;font-size: 16px;color: rgba(0,0,0,.6);border-top:1px dashed #ddd;margin-top:1rem;">我是组织</p>
					<div style="display: flex;">
						<a @click="router_to('resumption','mycompany')" class="aui-palace-grid">
							<div class="aui-palace-grid-icon">
								<img src="../assets/skin/images/V2_15.png" alt="" />
							</div>
							<div class="aui-palace-grid-text">
								<h2>复工申请</h2>
							</div>
						</a>
						<a @click="router_to('staffHealthy','mycompany')" class="aui-palace-grid">
							<div class="aui-palace-grid-icon">
								<img src="../assets/skin/images/V2_16.png" alt="" />
							</div>
							<div class="aui-palace-grid-text">
								<h2>健康上报</h2>
							</div>
						</a>
						<a @click="router_to('disinfection','mycompany')" class="aui-palace-grid">
							<div class="aui-palace-grid-icon">
								<img src="../assets/skin/images/V2_17.png" alt="" />
							</div>
							<div class="aui-palace-grid-text">
								<h2>防护上报</h2>
							</div>
						</a>
						<router-link to="/fangkong" class="aui-palace-grid">
							<div class="aui-palace-grid-icon">
								<img src="../assets/skin/images/V2_18.png" alt="" />
							</div>
							<div class="aui-palace-grid-text">
								<h2>联防联控</h2>
							</div>
						</router-link>
					</div>
				</div>
			</div>
			<div>
				<img src="../assets/疫情防控.png" alt="" class="img">
			</div>
			<div class="Special_column">
				<div class="column column1">
					<span><a href="https://ncov.dxy.cn/ncovh5/view/pneumonia">疫情动态</a></span>
				</div>
				<router-link to="/virusNews">
					<div class="column">
						<span>健康问答</span>
					</div>
				</router-link>
				<router-link to="/virusNews">
					<div class="column">
						<span>疫情专栏</span>
					</div>
				</router-link>

				<div class="column">
					<span><a href="http://www.zjcoo.cn:8081/pneumonia/index.html">疫情地图</a></span>
				</div>

			</div>
			<div class="dynamic">
				<div class="top">
					<div class="iconfont"></div>
					<span class="city">重庆</span>
					<span class="report">疫情速报</span>
				</div>
				<div class="body1">
					<div class="number1">
						<h2>{{newslist.confirmedCount}}</h2>
						<h4>累计确诊</h4>
					</div>
					<div class="number3">
						<h2>{{newslist.curedCount}}</h2>
						<h4>治愈人数</h4>
					</div>
					<div class="number4">
						<h2>{{newslist.deadCount}}</h2>
						<h4>死亡人数</h4>
					</div>
				</div>
			</div>
			<div class="divHeight"></div>
			<div class="tab-panel-item tab-active answer">
				<div class="top">
					<div class="iconfont"></div>
					<span class="city">最新进展</span>
				</div>
				<router-link :to="{path:`/virusNewsDetails/${item.article_id}/2`}" v-for="(item,index) in QAlist" :key="index">
					<div class="aui-flex-box" style="padding: 10px 0;">
						<p>{{item.publish_time}}</p>
						<h1 style="padding-left:0;">
							{{item.article_title}}
						</h1>
						<div class="aui-flex" style="padding:0">
							<div class="aui-flex-box">
								<h3><img src="../assets/skin/images/user1.png" alt="" height="20px" style="border-radius: 50%;margin-right: 5px;" />{{item.article_content}}</h3>
							</div>
						</div>
					</div>
				</router-link>
			</div>
			<p class="banben">
				<span>{{banben}}</span>
				<span>
					<img :src="logo" alt="" height='30px'>
				</span>
			</p>
		</section> -->
		<router-view></router-view>
		<tabbar></tabbar>
	</section>
</template>

<script>
	import tabbar from "@/components/tabbar.vue";
	import Swiper from 'swiper';
	export default {
		name: "index",
		components: {
			tabbar
		},
		data() {
			return {
				guanzhu:false,
				QAlist: [],
				//数据更新时间
				'time': '',
				'newslist': [],
				'yesterdayData': '',
				title: '',
				banben: '',
				logo: '',
				link:localStorage.getItem('link')
			}
		},
		created() {
			// this.getPage(1, 2);
			const that = this
			// that.$api.getPneumoniaIinfo().then(function(response) {
			// 	if(response.data.code==200){
			// 		that.yesterdayData = response.data.yesterdayData
			// 		that.time = response.data.date
			// 		// that.newslist = response.data.newslist
			// 		that.newslist = response.data.newslist.find(item=>item.provinceName === '重庆市')
			// 	}
			// })
			if (localStorage.getItem('token') != null) {
				if (localStorage.getItem('link') == 'mycenter') {
					that.$api.getUserInfo().then(function(res) {
						if (res.data.code == 500 && res.data.status == 500) {
							that.$dialog({
								title: "系统通知",
								content: "您的身份标识已生效（可能在其他设备登录），请重新登录",
								closeBtn: false, //显式右上角关闭按钮
								noCancelBtn: true,
								closeOnClickModal: false,
								onOkBtn(event) { //确定按钮点击事件
									localStorage.removeItem('token')
									localStorage.removeItem('link')
									this.close(); //关闭对话框
									setTimeout(() => {
										that.$router.push({
											name: 'login'
										})
									}, 100)
								},
							});
						}
					})
				} else if (localStorage.getItem('link') == 'mycompany') {
					that.$api.getEnterpriseInfo().then(function(res) {
						if (res.data.code == 500 && res.data.status == 500) {
							that.$dialog({
								title: "系统通知",
								content: "您的身份标识已生效（可能在其他设备登录），请重新登录",
								closeBtn: false, //显式右上角关闭按钮
								noCancelBtn: true,
								closeOnClickModal: false,
								onOkBtn(event) { //确定按钮点击事件
									localStorage.removeItem('token')
									localStorage.removeItem('link')
									this.close(); //关闭对话框
									setTimeout(() => {
										that.$router.push({
											name: 'login'
										})
									}, 100)
								},
							});
						}
					})
				}
			}
		},
		mounted() {
			const that = this
			new Swiper(".swiper-container", {
				autoplay: true, //可选选项，自动滑动
				loop: true
			});
			// this.$api.getConfig().then(function(res){
			// 	console.info(res.data)
			// 	if(res.data.code = 200){
			// 		document.title = res.data.data.web_title
			// 		that.title = res.data.data.web_title
			// 		// 插入 meta 标签
			// 		var oMeta = document.createElement('meta');
			// 		oMeta.content = res.data.data.web_keywords;
			// 		oMeta.name = 'keywords';
			// 		document.getElementsByTagName('head')[0].appendChild(oMeta);

			// 		var oMeta1 = document.createElement('meta');
			// 		oMeta1.content = res.data.data.web_description;
			// 		oMeta1.name = 'keywords';
			// 		document.getElementsByTagName('head')[0].appendChild(oMeta1);

			// 		that.banben = res.data.data.web_version
			// 		that.logo = res.data.data.web_powerby_logo
			// 	}
			// })
		},
		methods: {
			router_to(url, type) {
				if (type != localStorage.getItem('link') && localStorage.getItem('link') != null) {
					if (localStorage.getItem('link') == 'mycenter') {
						this.$toast.text('您不是企业用户,请使用企业账号登录')
					} else if (localStorage.getItem('link') == 'mycompany') {
						this.$toast.text('您不是个人用户，请使用个人账号登录')
					}
				} else {
					this.$router.push({
						name: url
					})
				}

			},
			getPage(page, type_id) {
				const that = this
				that.loading = that.$toast.loading();
				this.$api.indexQA(page, type_id).then(function(res) {
					if (res.data.code == 200) {
						that.loading.hide();
						that.QAlist = res.data.data
						console.log(that.QAlist)
					}
				})
			},
			zwkf() {
				this.$toast.text('暂未开放页面')
			}
		}
	};
</script>

<style>
	.nut-noticebar.close{
		border-radius: 0;
		align-items: center;
		height:30px;
	}
</style>
<style lang="scss" scoped>
	@import "../assets/skin/css/swiper.min.css";
	@import "../assets/skin/css/index.scss";
	@import "../assets/skin/css/myinfo.scss";
	.guanzhu{
			top:0;
			position:fixed;
			height:100vh;
			width:100vw;
			background:#fff;
			z-index:9999;
			flex-direction:column;
			display:flex;
			text-align:center;
			justify-content:center;
			.guanbi{
				font-size:15px;
				position:absolute;
				top:20px;
				left:20px;
			}
		}
	.van-swipe-item {
		line-height: none !important;
		background: transparent !important;
	}

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
		padding: 20px;
		margin: 0 auto !important;
		line-height: 45px;
		justify-content: space-around;
		color: #353535;
		font-size: 1rem;
		box-sizing: border-box;
		position: relative;
		top: -25px;
	}

	.column {
		width: 71px;
		padding: 5px;
		text-align: center;
		height: 39px;
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
		content: '';
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
	
	.icon{
		position: absolute;
		right: 12px;
		top: 12px;
	}
	.iconfont {
		width: 5px;
		box-shadow: 0 0 3px #007AFF;
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
		background: rgba(0, 0, 0, .05);
	}

	.answer {
		background-color: #fff;
		border-radius: 10px;
		margin: 0 15px !important;
		padding: 15px !important;
		position: relative;
		top: -25px;
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
</style>
