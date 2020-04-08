<template>
	<section class="aui-flexView">
		<!-- <header class="aui-navBar aui-navBar-fixed">
			<div class="aui-center">
				<img src="../assets/skin/images/logo.jpg" alt="">
				<span class="aui-center-title">{{title}}</span>
			</div>
		</header> -->
		<div class="erweima" ref="imageWrapper" v-show="showQR">
			<p style="padding:0;margin:0 auto">
				<img src="../assets/skin/images/clockin-title.png" alt="clockin-title.png" />
			</p>
			<div>
				<div class="c_title">
					<h1>{{ companyInfo.name }}</h1>
					<p>扫一扫加入我们的组织吧</p>
				</div>
				<div id="qrCode" ref="qrCodeDiv"></div>
			</div>
		</div>
		<div class="operation" v-show="showQR">
			<span class="exit" @click="
          () => {
            showQR = false;
          }
        ">×</span>
			<span class="save" @click="toImage()">保存为图片</span>
		</div>
		<div class="saveImg" v-show="fenxiang != ''">
			<span @click="
          () => {
            fenxiang = '';
          }
        ">×</span>
			<div>
				<img :src="fenxiang" width="100%" />
			</div>
			<p>长按图片进行保存，之后就可以分享了哦</p>
		</div>

		<section class="aui-scrollView">
			<div class="个人信息">
				<div class="广告">
					<a href="http://www.zjcoo.cn/m/saoyisao_yq.htm">
						<img src="../assets/个人首页/广告.png" alt="" />
					</a>
				</div>
				<div class="个人头像">
					<div class="left">
						<div class="left_content"></div>
						<div class="right_content">
							<h1 class="h1">{{ companyInfo.name }}</h1>
							<router-link to="/checkList" tag="p"><span class="number">{{ info.number }}</span>人</router-link>
						</div>
					</div>
					<router-link tag="div" class="right" to="/residentClockin?id=1">
						<a href="javascript:;" style="display: block;height: 100%;width: 100%;"></a>
					</router-link>

				</div>
				<div class="状态">
					<ul class="ulcontent">
						<router-link to="/residentClockinRecord?type=1" tag="li">
							<p>复工打卡人数</p>
							<p>
								<span class="blue_zero">{{ info.clock_number }}</span>人
							</p>
						</router-link>
						<router-link to="/residentClockinRecord?type=2" tag="li">
							<p>异常复工人数</p>
							<p>
								<span class="red_zero">{{
                  info.abnormal_commencement_clock_number
                }}</span>人
							</p>
						</router-link>
						<router-link to="/residentClockinRecord?type=3" tag="li">
							<p>异常体温人数</p>
							<p>
								<span class="red_t">{{
                  info.abnormal_temperature_clock_number
                }}</span>人
							</p>
						</router-link>
					</ul>
				</div>
			</div>
			<div class="功能按钮">
				<router-link to="/checkList">
					<img src="../assets/skin/images/fgzm.png" alt="">
				</router-link>
				<a @click="goToOuterList">
					<img src="../assets/skin/images/wlrygl.png" alt="">
				</a>
			</div>
			<!-- <div class="management-Outsiders" @click="goToOuterList">
				<span>
					外来人员管理
				</span>
			</div> -->
			<div class="我的组织1" v-if="resumptionList != ''">
				<div class="head">
					<div class="iconfont"></div>
					<span class="city">复工上报</span>
				</div>
				<div class="time_contnet">
					<span class="time">{{ resumptionList.date }}</span>
					<!-- 					<span class="pass">通过审核</span> -->
					<span class="resumptionList-pass" style="font-size:1rem;" v-show="resumptionList.status == 3 && resumptionList.is_ready == 1">已通过审核</span>
					<span class="resumptionList-pass" style="font-size:1rem;" v-show="resumptionList.status == 3 && resumptionList.is_ready == 0">已通过审核(<em
						 style="font-style: normal;color:orange">追加待审核</em>)</span>
					<span class="resumptionList-notPass" style="font-size:1rem;" v-show="resumptionList.status == 4">未通过</span>
					<span class="resumptionList-notPass" style="font-size:1rem;" v-show="resumptionList.status == 2">审核中</span>
					<span class="resumptionList-notPass" style="font-size:1rem;" v-show="resumptionList.status == 1">待审核</span>
				</div>
				<div class="fugong_content">
					<div class="fu_left">
						<h2 class="h2">{{ companyInfo.name }}</h2>
						<p>
							已批准复工：{{ resumptionList.resume_work_number }}人 待审批：{{
                resumptionList.check_pending_number
              }}人
						</p>
					</div>
					<div class="fu_right">
						<button class="btn" @click="checkDetails(i)">查看详情</button>
					</div>
				</div>

				<div class="contro">
					<router-link href="javascript:;" class="contro_a" to="/checkList"><span class="c_left"></span>查看员工信息</router-link>
					<a href="javascript:;" class="contro_a" @click="clickToAddAlign(i)" v-if="resumptionList.status != 4"><span class="c_right"></span>追加复工人员</a>
					<router-link href="javascript:;" class="contro_a" to="/resumption?type=update" v-else>修改复工信息</router-link>
				</div>
			</div>
			<div class="我的组织3" v-else>
				<div class="head">
					<div class="iconfont"></div>
					<span class="city">复工上报</span>
				</div>
				<div class="my_content">
					<span class="search_bg"></span>
					<p class="pasue">暂未提交企业复工申请</p>
					<router-link to="/resumption" href="javascript:;" class="fu_btn">提交复工申请</router-link>
				</div>
			</div>
			<div class="我的组织2">
				<a href="javascript:;" class="my_a" @click="exit()">退出登录</a>
				<a href="javascript:;" class="my_a" @click="
            () => {
              showQR = true;
            }
          ">邀请注册</a>
			</div>
		</section>
		<tabbar activeNumber='0'></tabbar>
	</section>
</template>

<script>
	import QRCode from "qrcodejs2";
	import html2canvas from "html2canvas";
	import tabbar from "@/components/tabbar.vue";
	export default {
		name: "mycenter",
		components: {
			tabbar
		},
		data() {
			return {
				companyInfo: JSON.parse(localStorage.getItem("CompenyInfo")),
				fenxiang: "",
				showQR: false,
				info: "",
				resumptionList: "",

				fenxiang: "",
				showQR: false,
				info: ""
			};
		},
		created() {
			const that = this;
			let token = localStorage.getItem("token");
			this.$api.getCompanyMore().then(function(res) {
				console.info(res);
				switch (res.data.code) {
					case 200:
						that.info = res.data.info;
						break;
					default:
						break;
				}
			});
			this.compenyInfo = JSON.parse(localStorage.getItem("CompenyInfo"));
			that.loading = that.$toast.loading();
			this.$api.information_record().then(function(value) {
				that.loading.hide();
				that.resumptionList = value.data.info;
			});
		},
		mounted() {
			this.bindQRCode();
			const that = this;
		},
		methods: {
			exit() {
				localStorage.removeItem("link");
				localStorage.removeItem("token");
				localStorage.removeItem("CompanyInfo");
				this.$router.push({
					name: "login"
				});
			},

			checkDetails(status) {
				this.$router.push({
					path: "/resumptionDetails",
					query: {
						status: status
					}
				});
			},
			clickToAddAlign() {
				this.$router.push("/resumptionAdd");
			},
			isKaigong() {
				const that = this;
				that.loading = that.$toast.loading();
				this.$api
					.information_record
				// 参数token
				()
				.then(function(value) {
					that.loading.hide();
					console.info(value);
					if (value.data.info == "") {
						that.$router.push("resumption");
					} else {
						that.$dialog({
							title: "系统提示",
							content: "您已上报，请点击上报记录进行查看",
							onOkBtn: function() {
								that.$router.push("resumptionList");
								this.close();
							}
						});
					}
				});
			},
			toImage() {
				const that = this;
				window.scrollTo(0, 0);
				html2canvas(this.$refs.imageWrapper).then(canvas => {
					let dataURL = canvas.toDataURL("image/png");
					this.imgUrl = dataURL;
					that.fenxiang = this.imgUrl;
					if (this.imgUrl !== "") {
						this.dialogTableVisible = true;
					}
				});
			},
			bindQRCode: function() {
				new QRCode(this.$refs.qrCodeDiv, {
					text: "http://fgfcwx.cy-coo.com/#/reg?id=" + this.companyInfo.id,
					width: 200,
					height: 200,
					colorDark: "#333333", //二维码颜色
					colorLight: "#ffffff", //二维码背景色
					correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
				});
			},
			exit() {
				localStorage.removeItem("link");
				localStorage.removeItem("token");
				localStorage.removeItem("CompanyInfo");
				this.$router.push({
					name: "login"
				});
			},
			goToOuterList() {
				this.$router.push({
					name: "outsiders",
					query: {
						id: this.companyInfo.id
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../assets/skin/css/swiper.min.css";
	@import "../assets/skin/css/index.scss";
	@import "../assets/skin/css/myinfo.scss";
.功能按钮{
		display: flex;
		margin: 0 auto;
		width: 90%;
		justify-content: space-between;
		a{
			width: 48%;
			img{
				width: 100%;
			}
		}
	}
	.aui-flexView {
		padding-bottom: 50px;
	}

	.我的组织3 {
		width: 90%;
		margin: 0 auto;
		background-color: #fff;
		border-radius: 10px;
	}

	.my_content {
		width: 100%;
		padding: 1rem;
		text-align: center;
	}

	.search_bg {
		display: block;
		width: 7rem;
		height: 5rem;
		background-image: url("../assets/fugong/search.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin: 0 auto;
	}

	.pasue {
		color: rgb(188, 188, 188);
		font-size: 16px;
		margin: 1rem 0 !important;
	}

	.fu_btn {
		display: inline-block;
		padding: 0.8rem 6rem;
		color: rgb(0, 130, 243) !important;
		border: 1px solid rgb(0, 130, 243);
		border-radius: 40px;
		margin-bottom: 1rem !important;
	}

	.今日打卡 {
		margin: 15px auto !important;
		background-color: #fff;
		border-radius: 10px;
	}

	.企业1 {
		border-bottom: 1px solid #f0f0f0;
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

	.iconfont {
		width: 5px;
		box-shadow: 0 0 3px #007aff;
		height: 18px;
		border-radius: 20%;
		margin-left: 15px !important;
		background-color: #0881fc;
		margin-top: 15px !important;
	}

	.正常与否,
	.是否复工 {
		font-size: 16px;
		font-weight: 600;
	}

	.打卡日期 {
		display: inline-block;
		margin-right: 15px !important;
		color: #5a5a5a;
	}

	.city {
		font-size: 18px;
		margin-left: 12px !important;
		margin-top: 12px !important;
	}

	.关联组织>img {
		width: 90px;
		height: 85px;
		margin-left: 38%;
		margin-top: 13px;
	}

	.我的组织1 {
		width: 90%;
		margin: 15px auto !important;
		background-color: #fff;
		border-radius: 10px;
	}

	.今日打卡 {
		width: 90%;
		margin: 15px auto !important;
		background-color: #fff;
		border-radius: 10px;
	}

	.企业1 {
		border-bottom: 1px solid #f0f0f0;
	}

	.我的组织2 {
		width: 90%;
		margin: 15px auto !important;
		background-color: #fff;
		border-radius: 10px;
		padding: 1rem !important;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.my_a {
		display: inline-block;
		width: 47%;
		text-align: center;
		padding: 0.5rem 2rem !important;
		border: 1px solid #ccc;
		border-radius: 40px;
		color: rgb(166, 166, 166);
	}

	.我的组织2>a:last-child {
		color: rgb(139, 179, 215);
		border: 1px solid rgb(139, 179, 215);
	}

	.head {
		display: flex;
	}

	.head>img {
		width: 17px;
		height: 20px;
		margin-top: 14px !important;
		margin-left: 235px !important;
	}

	.time_contnet {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1rem !important;
		margin-top: 1rem !important;
		border-bottom: 1px solid #ddd;
		padding-bottom: 1rem !important;
	}

	.time {
		color: rgba(215, 215, 215);
	}

	.pass {
		color: rgba(125, 203, 153);
	}

	.fugong_content {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem !important;
		border-bottom: 1px solid #ddd;
	}

	.h2 {
		font-size: 14px;
		color: #333;
		margin-bottom: 0.5rem !important;
	}

	.fu_left {
		width: 70%;
	}

	.fu_left p {
		color: rgb(157, 157, 157);
		font-size: 12px;
	}

	.btn {
		padding: 0.5rem 1rem !important;
		color: #fff !important;
		font-size: 12px;
		background-color: rgb(4, 153, 255);
		border: 0;
		outline: none;
		border-radius: 30px;
	}

	.fu_right {
		width: 30;
	}

	.contro {
		width: 100%;
	}

	.contro_a {
		display: inline-block;
		width: 50%;
		text-align: center;
		padding: 1rem !important;
		color: rgb(249, 128, 13) !important;
	}

	.contro>a:first-child {
		border-right: 1px solid #ddd;
		color: rgb(0, 131, 255) !important;
	}

	.c_left,
	.c_right {
		display: inline-block;
		width: 1rem;
		height: 1rem;
		background-image: url("../assets/fugong/s2.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin-right: 0.5rem !important;
	}

	.c_right {
		background-image: url("../assets/fugong/s1.png");
	}

	.是否复工 {
		color: #ff6262;
	}

	.正常与否 {
		color: #5b99fc;
	}

	.体温打卡 {
		display: flex;
		margin-left: 10px !important;
		line-height: 77px;
		font-size: 15px;
		border-bottom: 1px solid #f0f0f0;
	}

	.状态 {
		width: 100%;
		height: 90px;
		border-top: 1px solid #f0f0f0;
		border-bottom: 1px solid #f0f0f0;
	}

	.ulcontent {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1rem !important;
	}

	.ulcontent>li {
		text-align: center;
		width: 30%;
		font-size: 12px;
		color: #333;
		padding: 0 0.5rem;
	}

	.ulcontent>li:nth-child(2) {
		border-left: 1px solid #ccc;
		border-right: 1px solid #ccc;
	}

	.blue_zero,
	.red_zero,
	.red_t {
		font-size: 20px;
		color: rgba(53, 130, 246);
	}

	.red_zero,
	.red_t {
		color: rgba(255, 97, 94);
	}

	.个人信息 {
		width: 90%;
		margin: 19px auto !important;
		background-color: #fff;
		border-radius: 10px;
	}

	.状态1 {
		border-right: 1px solid #f0f0f0;
	}

	.体温状态 {
		width: 50%;
		height: 55px;
		text-align: center;
		margin-top: 20px !important;
		margin-bottom: 20px !important;
	}

	.信息 {
		margin: 20px auto !important;
		margin-bottom: 0 !important;
		border-bottom: 1px solid #f0f0f0;
		height: 45px;
	}

	.信息 img {
		width: 91px;
		height: 29px;
		margin: -4px !important;
		margin-left: 210px !important;
	}

	.信息 span,
	.地址 {
		line-height: 34px;
		margin-left: 11px !important;
	}

	.地址 {
		font-size: 13px;
		height: 60px;
		line-height: 60px;
	}

	.信息 span {
		color: #5a5a5a;
		font-size: 15px;
	}

	.company-add {
		height: 37px;
		width: 270px;
		border-radius: 50px;
		padding: 10px;
		color: #007aff;
		margin: 20px auto !important;
		text-align: center;
		font-size: 15px;
		border: 1px solid #007aff;
		line-height: 37px;
	}

	.公司名称 {
		height: 37px;
		width: 120px;
		border-radius: 50px;
		padding: 10px;
		color: #007aff;
		margin-left: 30px !important;
		margin-top: 18px !important;
		text-align: center;
		font-size: 15px;
		border: 1px solid #007aff;
		line-height: 37px;
	}

	.company-add::before {
		content: "";
		display: table;
		clear: both;
	}

	.个人头像 {
		width: 100%;
		height: 95px;
		display: flex;
		padding: 0 1rem !important;
		justify-content: space-between;
		align-items: center;
		/* border-bottom: 1px solid #f0f0f0; */
	}

	.left {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.left_content {
		margin-right: 10px;
		width: 3.5rem;
		height: 3.5rem;
		background-image: url("../assets/fugong/person.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.h1 {
		color: #333;
		font-size: 14px;
	}

	.number {
		color: #fff;
		font-size: 12px;
		display: inline-block;
		padding: 0.1rem 1rem;
		background-color: rgba(7, 129, 252);
		border-radius: 28px;
		margin-right: 0.5rem;
	}

	.right {
		width: 10%;
		height: 44%;
		background-image: url("../assets/fugong/erweima.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.今日体温 {
		font-size: 15px;
		margin-bottom: 6px !important;
	}

	.二维码 {
		width: 35px;
		height: 48px;
	}

	.广告 img {
		width: 100%;
	}

	.name,
	.phone {
		position: absolute;
		font-size: 14px;
	}

	.name {
		top: 290px;
		left: 105px;
	}

	.phone {
		top: 310px;
		left: 102px;
	}

	.头像 {
		width: 57px;
		height: 60px;
		margin-top: 20px;
		margin-left: 12px;
		margin-bottom: 20px;
		position: relative;
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

	.aui-scrollView {
		background: rgba(0, 0, 0, 0.05);
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

	#qrCode {
		// transform: translateX(3%);
		transform: rotateZ(90deg);
	}

	.operation {
		background: #fff;
		position: fixed;
		top: 0;
		z-index: 9999;
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 5px 15px;
		align-items: center;

		.exit {
			font-size: 35px;
		}

		// .save{

		// }
	}

	.saveImg {
		position: fixed;
		width: 100vw;
		height: 100vh;
		z-index: 999999;
		top: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		span {
			font-size: 40px;
			color: rgba(255, 255, 255, 0.7);
			margin-bottom: 30px;
		}

		div {
			width: 70%;
			height: 50%;
			display: flex;
			align-items: center;
			overflow: hidden;
			border-radius: 5px;
		}

		p {
			padding-top: 20px;
			color: rgba(255, 255, 255, 0.5);
			font-size: 12px;
		}
	}

	.erweima {
		display: flex;
		flex-direction: column;
	}

	.erweima>div {
		padding: 30px 40px;
		margin: 0 30px;
		// border: 2px solid rgba(0, 0, 0, 0.3);
		border-radius: 20px;
	}

	.c_title {
		text-align: center;

		h1 {
			font-weight: normal;
			font-size: 30px;
			margin-bottom: 10px;
			padding: 0 20px;
		}

		p {
			padding-top: 10px;
			opacity: 0.6;
			margin-bottom: 50px;
			border-top: 1px dashed #aaaaaa;
		}
	}

	.aui-palace-one {
		display: flex;
		justify-content: space-around;
		width: 100%;
	}

	.aui-user-text span {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.erweima {
		top: 0;
		position: fixed;
		width: 100vw;
		height: 100vh;
		background: #fff;
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.aui-footer-fixed {
		z-index: 999;
	}

	.management-Outsiders {
		width: 90%;
		margin: 0 auto;
		border-radius: 1rem;
		padding: 1rem;
		border: 1px solid #0881fc;
		color: #0881fc;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 1rem;
	}

</style>
