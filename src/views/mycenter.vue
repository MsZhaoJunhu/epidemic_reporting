<template>
	<section class="aui-flexView">
		<div class="erweima" ref="imageWrapper" v-show="showQR">
			<div>
				<div class="c_title">
					<!-- <p>扫一扫加入我们的企业/组织吧</p> -->
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
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon "></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">我的</span>
			</div>
		</header>
		<section class="aui-scrollView">
			<div class="aui-head-bg">
				<div class="aui-flex">
					<div class="aui-mine-user">
						<img src="../assets/skin/images/user.png" alt="" />
					</div>
					<div class="aui-flex-box">
						<h2>{{ user.real_name }}</h2>
						<p style="color: rgba(255,255,255,.5);">{{ user.mobile }}</p>
					</div>
					<div class="aui-arrow"></div>
				</div>
			</div>
			<div class="aui-mon-list">
				<!-- <a href="javascript:;" class="aui-flex b-line">
					<div class="aui-cou-img">
						<img src="../assets/skin/images/nav-fl-001.png" alt="">
					</div>
					<div class="aui-flex-box">
						<p>我的申报</p>
					</div>
					<div class="aui-arrow">
	
					</div>
				</a> -->
				<a class="aui-flex b-line" @click="
            () => {
              showQR = true;
            }
          ">
					<div class="aui-flex-box aui-flex" style="padding:0;">
						<div class="aui-cou-img">
							<img src="../assets/skin/images/nav-fl-005.png" alt="" />
						</div>
						<div class="aui-flex-box">
							<p>通行证二维码</p>
						</div>
					</div>
					<div class="aui-arrow">
						<svg class="icon" style="width: 22px; height: 22px;vertical-align: middle;fill: currentColor;overflow: hidden;"
						 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="637">
							<path d="M91.666 63.942h358.908c36.5 3.567 27.703 66.963 27.703 108.152v196.1c0 42.618 8.134 94.857-20.474 106.964-18.631 7.883-68.633 2.375-92.739 2.375H174.771c-43.989 0-104.054 10.362-110.805-27.335V91.275c4.92-13.368 13.571-23.053 27.7-27.333z m49.38 80.817v255.523h258.946v-259.09h-257.74c-1.403 0.2-1.307 1.879-1.206 3.567z m432.377-80.817h358.908c14.64 5.359 24.701 15.243 27.703 32.088v349.415c-3.286 14.521-10.966 26.923-25.292 30.902-23.413 6.5-62.312 1.186-90.331 1.186H660.14c-27.789 0-68.973 5.777-91.535-1.186-31.849-9.834-22.882-71.184-22.882-114.097V179.225c0-49.548-11.022-108.359 27.7-115.283z m49.381 80.817v255.523h258.943v-259.09h-257.74c-1.401 0.2-1.308 1.879-1.203 3.567z m-363.727 74.873c36.064-6.715 64.424 17.331 65.039 49.918 0.807 42.973-43.672 66.577-78.287 48.729-39.6-20.426-36.995-89.289 13.248-98.647z m481.757 0c84.945-15.659 83.317 117.093 0 103.4-53.024-8.714-54.733-93.307 0-103.4zM448.166 960.058H92.872c-14.751-4.46-24.716-13.642-28.907-28.521V573.803c3.51-10.47 11.608-22.681 24.088-26.149 23.578-6.546 62.085-1.186 90.328-1.186h184.274c27.234 0 66.867-5.999 91.532 1.186 33.369 9.723 24.088 70.075 24.088 112.908v188.967c0.002 46.231 10.089 106.404-30.109 110.529z m-307.12-332.773v255.523h258.946v-259.09h-257.74c-1.403 0.2-1.307 1.879-1.206 3.567z m818.988-48.73v99.833c-2.811 33.674-0.403 72.495-1.207 108.152H702.294v-58.234c-24.091-2.775-53.395-0.4-79.491-1.192-2.811 75.273-0.4 155.693-1.204 232.943h-46.973c-40.386-7.988-28.904-67.787-28.904-115.28V660.56c0-27.7-5.682-69.224 1.204-91.514 8.215-26.591 43.842-22.58 79.491-22.58h174.634v158.068h80.695c0.801-52.293-1.607-107.755 1.204-158.068 38.834-2.269 74.802-1.71 77.084 32.089zM265.099 700.968c38.507-4.206 70.341 32.315 55.403 72.498-20.707 55.701-119.71 34.764-101.169-35.655 5.123-19.463 19.928-34.02 45.766-36.843z m523.912 259.09h-86.717c0.801-30.505-1.607-64.176 1.204-92.703h85.513v92.703z m171.023-92.703v60.615c-3.352 16.901-13.364 27.222-28.907 32.088h-61.425c0.804-30.505-1.604-64.176 1.207-92.703h89.125z"
							 p-id="638"></path>
						</svg>
					</div>
				</a>
				<router-link to="/affiliatedEnterprises" class="aui-flex b-line">
					<div class="aui-cou-img">
						<img src="../assets/skin/images/nav-fl-003.png" alt="" />
					</div>
					<div class="aui-flex-box">
						<p>出入登记</p>
					</div>
					<div class="aui-arrow"></div>
				</router-link>
				<router-link to="/affiliatedEnterprises" class="aui-flex b-line">
					<div class="aui-cou-img">
						<img src="../assets/skin/images/nav-fl-002.png" alt="" />
					</div>
					<div class="aui-flex-box">
						<p>我关联的组织</p>
					</div>
					<div class="aui-arrow"></div>
				</router-link>
				<router-link to="/jubaojilu" class="aui-flex b-line">
					<div class="aui-cou-img">
						<img src="../assets/skin/images/nav-fl-003.png" alt="" />
					</div>
					<div class="aui-flex-box">
						<p>我的举报记录</p>
					</div>
					<div class="aui-arrow"></div>
				</router-link>

				<div class="divHeight"></div>
				<router-link to="/ReportRecord?recordType=health" class="aui-flex b-line">
					<div class="aui-cou-img">
						<img src="../assets/skin/images/nav-fl-004.png" alt="" />
					</div>
					<div class="aui-flex-box">
						<p>健康上报记录</p>
					</div>
					<div class="aui-arrow"></div>
				</router-link>
				<router-link to="/ReportRecord?recordType=active" class="aui-flex b-line">
					<div class="aui-cou-img">
						<img src="../assets/skin/images/nav-fl-005.png" alt="" />
					</div>
					<div class="aui-flex-box">
						<p>轨迹上报记录</p>
					</div>
					<div class="aui-arrow"></div>
				</router-link>
				<router-link to="/residentList" class="aui-flex b-line">
					<div class="aui-cou-img">
						<img src="../assets/skin/images/nav-fl-003.png" alt="" />
					</div>
					<div class="aui-flex-box">
						<p>出入登记记录</p>
					</div>
					<div class="aui-arrow"></div>
				</router-link>
				<div class="aui-flex b-line" @click="exit()">
					<div class="aui-flex-box">
						<p style="text-align:center;">退出登录</p>
					</div>
				</div>
				<!--
				<a href="javascript:;" class="aui-flex b-line">
					<div class="aui-cou-img">
						<img src="../assets/skin/images/nav-fl-006.png" alt="">
					</div>
					<div class="aui-flex-box">
						<p>提交反馈</p>
					</div>
					<div class="aui-arrow">
	
					</div>
				</a>
				<a href="javascript:;" class="aui-flex b-line">
					<div class="aui-cou-img">
						<img src="../assets/skin/images/nav-fl-007.png" alt="">
					</div>
					<div class="aui-flex-box">
						<p>我要分享</p>
					</div>
					<div class="aui-arrow">
	
					</div>
				</a>
				<a href="javascript:;" class="aui-flex b-line">
					<div class="aui-cou-img">
						<img src="../assets/skin/images/nav-fl-008.png" alt="">
					</div>
					<div class="aui-flex-box">
						<p>关于我们</p>
					</div>
					<div class="aui-arrow">
	
					</div>
				</a> -->
				<!-- <div class="divHeight"></div>
				<a href="javascript:;" class="aui-flex b-line">
					<div class="aui-cou-img">
						<img src="../assets/skin/images/nav-fl-009.png" alt="">
					</div>
					<div class="aui-flex-box">
						<p>备用菜单</p>
					</div>
					<div class="aui-arrow">
	
					</div>
				</a> -->
			</div>
			<div style="height:55px;"></div>
		</section>
		<tabbar active="3"></tabbar>
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
				fenxiang: "",
				showQR: false,
				user: JSON.parse(localStorage.getItem("UserInfo"))
			};
		},
		mounted() {
			this.bindQRCode();
		},
		methods: {
			toImage() {
				const that = this;
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
					text: 'http://fgfcwx.cy-coo.com/#/employeePassSuccess?userId=' + this.user.id,
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
				localStorage.removeItem("UserInfo");
				this.$router.push({
					name: "login"
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../assets/skin/css/mycenter.scss";

	#qrCode {
		// transform: translateX(3%);
		transform: rotateZ(90deg);
	}

	.operation {
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
		border: 2px solid rgba(0, 0, 0, 0.3);
		border-radius: 20px;
	}

	.erweima {
		position: fixed;
		width: 100vw;
		height: 100vh;
		background: #fff;
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
