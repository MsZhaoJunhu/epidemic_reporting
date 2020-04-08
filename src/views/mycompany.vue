<template>
	<div class="wrap">
		<div class="erweima" ref="imageWrapper" v-show="showQR">
			<p style="padding:1rem 2rem;margin:0 auto">
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
				<img :src="fenxiang" />
			</div>
			<p>长按图片进行保存，之后就可以分享了哦</p>
		</div>
		<section class="container">
			<div class="container_contetnt">
				<div class="top">
					<div class="top_left" style="width:100%">
						<span>组织ID:</span>
						<span style="margin: 0 5px;">{{companyInfo.id}}</span>
						<button class="copy" @click="
          () => {
            showQR = true;
          }
        ">邀请注册</button>
					</div>
					<span class="top_right"></span>
				</div>
				<div class="center">
					<div class="center_top">
						<div class="center_top_top">
							<div class="center_top_top_left">
								<span class="logo"></span>
								<div class="logo_content">
									<div style="display: flex;margin-bottom: 3px;">
										<h1 class="h1">{{companyInfo.name}}</h1>
										<div class="qy" v-if="companyInfo.type == 1">企业</div>
										<div class="zf" v-else-if="companyInfo.type == 2">政府事业单位</div>
										<div class="yy" v-else-if="companyInfo.type == 3">医院</div>
										<div class="yy" v-else-if="companyInfo.type == 4">社区</div>
										<div class="sq" v-else>园区</div>
									</div>
									<p class="weirz">您的组织未认证<button class="renzheng" @click="()=>{$toast.text('功能暂未开放')}">立即认证</button></p>
								</div>
							</div>
							<router-link to="/residentClockin?id=1" class="center_top_top_right" tag="div" style="display: flex;flex-direction: column;align-items: center;">
								<span class="person">{{info.number}}人</span>
								<svg class="icon" style="width: 23px; height: 23px;vertical-align: middle;fill: currentColor;overflow: hidden;"
								 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1390">
									<path d="M409 98H171c-40.317 0-73 32.683-73 73v238c0 40.317 32.683 73 73 73h238c40.317 0 73-32.683 73-73V171c0-40.317-32.683-73-73-73z m7 298c0 11.046-8.954 20-20 20H180c-11.046 0-20-8.954-20-20V180c0-11.046 8.954-20 20-20h216c11.046 0 20 8.954 20 20v216zM409 576H171c-40.317 0-73 32.684-73 73v238c0 40.316 32.683 73 73 73h238c40.317 0 73-32.684 73-73V649c0-40.316-32.683-73-73-73z m7 298c0 11.046-8.954 20-20 20H180c-11.046 0-20-8.954-20-20V658c0-11.046 8.954-20 20-20h216c11.046 0 20 8.954 20 20v216zM855 98H617c-40.316 0-73 32.683-73 73v238c0 40.317 32.684 73 73 73h238c40.316 0 73-32.683 73-73V171c0-40.317-32.684-73-73-73z m7 298c0 11.046-8.954 20-20 20H626c-11.046 0-20-8.954-20-20V180c0-11.046 8.954-20 20-20h216c11.046 0 20 8.954 20 20v216zM864 576c-17.673 0-32 14.327-32 32v320c0 17.673 14.327 32 32 32s32-14.327 32-32V608c0-17.673-14.327-32-32-32zM608 640c-17.673 0-32 14.327-32 32v256c0 17.673 14.327 32 32 32s32-14.327 32-32V672c0-17.673-14.327-32-32-32zM736 704c-17.673 0-32 14.327-32 32v192c0 17.673 14.327 32 32 32s32-14.327 32-32V736c0-17.673-14.327-32-32-32z"
									 p-id="1391"></path>
								</svg>
								<span class="card_content" style="font-size: 10px;">登记打卡码</span>
							</router-link>
						</div>
						<div class="center_top_bottom">
							<ul class="center_top_bottom_ul">
								<li>
									<p class="title">发热人员总数</p>
									<p class="title"><span class="blue_number">{{info.hot_number}}</span>人</p>
									<!-- <p class="gengxin">更新于今天</p> -->
								</li>
								<router-link to='/reportList?recordType=health' tag="li">
									<p class="title green_number">健康问卷</p>
									<p class="title" style="font-size: 10px;">已更新<span class="red_number">{{info.health_report}}</span>人</p>
									<p class="title" style="font-size: 10px;">未更新<span class="red_number">{{info.not_health_report}}</span>人</p>
								</router-link>
								<router-link to='/reportList' tag="li">
									<p class="title green_number">出行轨迹</p>
									<p class="title" style="font-size: 10px;">已更新<span class="red_number">{{info.trajectory_report}}</span>人</p>
									<p class="title" style="font-size: 10px;">未更新<span class="red_number">{{info.not_trajectory_report}}</span>人</p>
									<!-- <p><span class="green_number">未完成</span></p>
									<p><span class="green_number_small">1位成员已更新</span></p> -->
								</router-link>
							</ul>
						</div>
					</div>
					<div class="center_center">
						<div class="center_center_top">
							<div class="center_center_top_left">
								<span class="fangkong"></span>组织防控
							</div>
							<span class="tongji">防控统计></span>
						</div>
						<div class="center_center_bottom">
							<ul class="center_center_bottom_ul">
								<router-link :to="'/regHospital?id='+this.companyInfo.id" tag="li" v-if="companyInfo.type == 3">
									<p class="kaigong"></p>
									<span>来院登记</span>
								</router-link>
								<li @click='isKaigong()' v-else>
									<p class="kaigong"></p>
									<span>开工上报</span>
								</li>
								<router-link to="/staffHealthy" tag="li">
									<p class="jiankang"></p>
									<span>健康上报</span>
								</router-link>
								<router-link to="/disinfection" tag="li">
									<p class="xiaodu"></p>
									<span>消毒防控</span>
								</router-link>
							</ul>
						</div>
					</div>
					<div class="center_bottom">
						<div class="center_bottom_top">
							<span class="qiyegl"></span>组织管理
						</div>
						<div class="center_bottom_bottom">
							<ul class="center_bottom_bottom_ul">
								<router-link to="/regHospitalCode" tag="li" v-if="companyInfo.type == 3">
									<div><img src="../assets/skin/images/V2_03.png" alt="" /></div>
									<span>来院登记二维码</span>
								</router-link>

								<router-link to="/regHospitalList" tag="li" v-if="companyInfo.type == 3">
									<div><img src="../assets/skin/images/V2_05.png" alt="" /></div>
									<span>来院登记记录</span>
								</router-link>
								<router-link to="/employeeList" tag="li" v-if="companyInfo.type != 3">
									<div><img src="../assets/skin/images/V2_03.png" alt="" /></div>
									<span>人员管理</span>
								</router-link>
								<router-link to="/resumptionList" tag="li" v-if="companyInfo.type != 3">
									<div><img src="../assets/skin/images/V2_05.png" alt="" /></div>
									<span>开工上报记录</span>
								</router-link>
								<router-link to="/reportList?recordType=health" tag="li">
									<div><img src="../assets/skin/images/V2_09.png" alt="" /></div>
									<span>健康上报记录</span>
								</router-link>
								<router-link to="/reportList" tag="li">
									<div><img src="../assets/skin/images/V2_07.png" alt="" /></div>
									<span>轨迹上报记录</span>
								</router-link>
								<router-link to="/disinfectionList" tag="li">
									<div><img src="../assets/skin/images/V2_15.png" alt="" /></div>
									<span>消毒上报记录</span>
								</router-link>
								<router-link to="/residentListCompeny" tag="li" v-if="companyInfo.type != 3">
									<div><img src="../assets/skin/images/V2_16.png" alt="" /></div>
									<span>出入登记记录</span>
								</router-link>
								<router-link to="/residentClockinRecord" tag="li">
									<div><img src="../assets/skin/images/V2_17.png" alt="" /></div>
									<span>上班打卡记录</span>
								</router-link>
								<router-link to="/visitorRegisterRecord" tag="li">
									<div><img src="../assets/skin/images/V2_18.png" alt="" /></div>
									<span>组织来访记录</span>
								</router-link>
								<!-- <router-link to="" tag="li">
									<p class="bumen"></p>
									<span>部门管理</span>
								</router-link>
								<router-link to="" tag="li">
									<p class="zhanghao"></p>
									<span>账号管理</span>
								</router-link> -->
							</ul>
						</div>
					</div>
				</div>
				<div class="bottom" style="position: relative;">
					<button class="bottom_btn" style="margin-bottom:3rem;" @click="exit()">退出登录</button><br>
					<!-- 联系客服<span class="fenge">丨</span>关于我们 -->
				</div>
			</div>
		</section>
		<tabbar active="3"></tabbar>
	</div>
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
				info: ''
			};
		},
		created() {
			const that = this
			this.$api.getCompanyMore().then(function(res) {
				console.info(res)
				switch (res.data.code) {
					case 200:
						that.info = res.data.info
						break;
					default:
						break;
				}
			})
		},
		mounted() {
			this.bindQRCode();
		},
		methods: {
			isKaigong(){
				const that = this;
				that.loading = that.$toast.loading();
				this.$api.information_record(
				    // 参数token
				).then(function(value) {
				        that.loading.hide();
				       console.info(value)
					   if(value.data.info == ''){
								that.$router.push("resumption")
					   }else{
						   that.$dialog({
						     title: "系统提示",
						     content: "您已上报，请点击上报记录进行查看",
							 onOkBtn:function(){
								that.$router.push("resumptionList")
								this.close()
							 }
						   });
					   }
				    }
				)
			},
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
			}
		}
	};
</script>
<style>
	.nut-dialog-ok{
		color: #fff;
		background: #007AFF;
	}
	.nut-dialog-ok:active{
		background: #007AFF;
	}
</style>
<style lang="scss" scoped>
	@import "@/assets/skin/css/qiyegrzx.scss";

	.qy,
	.zf,
	.yy,
	.sq {
		white-space:nowrap;
		padding: 0 10px;
		display: inline-flex;
		font-size: 12px !important;
		border-radius: 5px;
		color: #fff;
		background: #0DDFAC;
		margin-left: 10px;
		line-height: 22px;
		height: 22px;
	}

	.wrap {
		width: 100%;
		height: 100%;

		.header {
			width: 100%;
			height: 3rem;
			background-color: rgb(238, 238, 238);
			color: #333;
			font-weight: bold;

			.header_content {
				width: 100%;
				height: 100%;
				padding: 0.5rem 1rem;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.header_btn {
					cursor: pointer;
				}
			}
		}

		.container {
			width: 100%;
			// height: 100%;
			background-image: url("../assets/skin/images/grzx_bg_blue.png");
			background-size: 100% 22%;
			background-repeat: no-repeat;
			background-color: rgb(245, 245, 245);

			.container_contetnt {
				width: 100%;
				height: 100%;
				padding: 1rem;

				.top {
					width: 100%;
					height: 3rem;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 1rem;

					.top_left {
						color: #fff;
						width: 50%;
						display: flex;
						justify-content: flex-start;
						align-items: center;

						.copy {
							padding: 0 0.4rem;
							color: #fff;
							font-size: 12px;
							border: 1px solid #fff;
							outline: none;
							border-radius: 10px;
							background-color: rgb(82, 161, 253);
						}
					}

					.top_right {
						display: inline-block;
						width: 1.5rem;
						height: 1.5rem;
						background-image: url("../assets/skin/images/grzx_shezhi.png");
						background-repeat: no-repeat;
						background-size: 100% 100%;
						border-radius: 50%;
					}
				}

				.center {
					width: 100%;

					.center_top {
						width: 100%;
						background-color: #fff;
						border-radius: 10px;
						padding: 0.5rem;
						font-size: 12px;

						.center_top_top {
							width: 100%;
							display: flex;
							justify-content: space-between;
							align-items: center;

							.center_top_top_left {
								width: 80%;
								display: flex;
								align-items: center;

								.logo {
									flex-shrink: 0;
									display: inline-block;
									width: 3rem;
									height: 3rem;
									border-radius: 50%;
									background-image: url("../assets/skin/images/ad-003 (2).png");
									background-size: 100% 100%;
								}

								.logo_content {
									margin-left: 0.4rem;

									.h1 {
										color: rgb(53, 53, 53);
										font-size: 15px;
										letter-spacing: 1px;
										margin-bottom: 0.2rem;
									}

									.weirz {
										color: rgb(132, 132, 132);
										font-size: 13px;
									}

									.renzheng {
										background-color: rgb(0, 136, 255);
										font-size: 12px;
										color: #fff;
										border: 0;
										outline: none;
										border-radius: 10px;
										padding: 0.1rem 0.5rem;
										margin-left: 0.5rem;
									}
								}
							}

							.center_top_top_right {
								width: 20%;
								text-align: center;

								.card {
									width: 1.8rem;
									height: 1.2rem;
									background-image: url("../assets/skin/images/grzx_daka.png");
									background-size: 100% 100%;
									margin: 0.3rem auto;
								}

								.person {
									padding: 0 0.4rem;
									background-color: rgb(124, 189, 255);
									color: #fff;
									border-radius: 4px;
								}
							}
						}

						.center_top_bottom {
							width: 100%;
							margin-top: 1rem;

							.center_top_bottom_ul {
								width: 100%;
								display: flex;
								justify-content: space-between;
								align-items: center;
								color: rgb(118, 118, 118);

								// padding:0 1rem;
								.title {
									font-size: 14px;
								}
							}

							.blue_number {
								color: rgb(15, 135, 248);
								font-size: 16px;
								margin-right: 0.1rem;
							}

							.gengxin {
								color: rgb(203, 203, 203);
							}

							.red_number {
								color: rgb(247, 77, 60);
								margin: 0 0.1rem;
							}

							.green_number {
								color: rgb(65, 201, 151);
								font-size: 16px;
							}

							.green_number_small {
								color: rgb(67, 199, 152);

							}

							.center_top_bottom_ul li {
								width: 33%;
								padding: 0 0.5rem;
								text-align: center;
							}

							.center_top_bottom_ul li:nth-child(2) {
								border-left: 1px solid #ccc;
								border-right: 1px solid #ccc;
							}
						}

					}

					.center_center {
						width: 100%;
						height: 10rem;
						background-color: #fff;
						border-radius: 10px;
						margin: 1rem 0;
						padding: 0.5rem;

						.center_center_top {
							width: 100%;
							display: flex;
							justify-content: space-between;
							align-items: center;

							.center_center_top_left {
								display: flex;
								align-items: center;
							}

							.tongji {
								color: rgb(140, 140, 140);
								font-size: 12px;
							}

							.fangkong {
								display: inline-block;
								width: 1.5rem;
								height: 1.5rem;
								background-image: url("../assets/skin/images/grzx_fangkongjl.png");
								background-size: 100% 100%;
								margin-right: 0.5rem;
							}
						}

						.center_center_bottom {
							width: 100%;
							margin-top: 1rem;

							.center_center_bottom_ul {
								width: 100%;
								display: flex;
								justify-content: space-around;
								align-items: center;
								padding: 0 1rem;

								.kaigong,
								.jiankang,
								.xiaodu {
									width: 4rem;
									height: 4rem;
									background-image: url("../assets/skin/images/grzx_kaigong.png");
									background-size: 100% 100%;
									margin: 0.2rem auto;
								}

								.jiankang {
									background-image: url("../assets/skin/images/grzx_jiankang.png");
								}

								.xiaodu {
									background-image: url("../assets/skin/images/grzx_xiaodu.png");
								}
							}

							.center_center_bottom_ul li {
								text-align: center;
							}

							.center_center_bottom_ul li>span {
								font-size: 13px;
								font-weight: bold;
							}
						}
					}

					.center_bottom {
						width: 100%;
						background-color: #fff;
						border-radius: 10px;
						padding: 0.5rem;

						.center_bottom_top {
							width: 100%;
							display: flex;
							align-items: center;

							.qiyegl {
								display: inline-block;
								width: 1.5rem;
								height: 1.5rem;
								background-image: url("../assets/skin/images/grzx_qiyeguianli.png");
								background-size: 100% 100%;
								margin-right: 0.5rem;
							}
						}

						.center_bottom_bottom {
							width: 100%;

							.center_bottom_bottom_ul {
								width: 100%;
								padding: 1rem;
								display: flex;
								flex-wrap: wrap;
								justify-content: flex-start;
								align-items: center;

								.qiye,
								.renyuan,
								.bumen,
								.zhanghao {
									width: 3rem;
									height: 3rem;
									background-image: url("../assets/skin/images/grzx_qiyerz.png");
									background-size: 100% 100%;
									margin: 0.5rem auto;
								}

								.renyuan {
									background-image: url("../assets/skin/images/grzx_renyuangl.png");
								}

								.bumen {
									background-image: url("../assets/skin/images/grzx_bumengl.png");
								}

								.zhanghao {
									background-image: url("../assets/skin/images/grzx_zhanghaogl.png");
								}

								li {
									width: 25%;
									margin-top: 10px;
								}
							}

							.center_bottom_bottom_ul li {
								text-align: center;
								display: flex;
								align-content: center;
								flex-direction: column;

								div {
									img {
										margin: 0 auto;
										margin-bottom: 10px;
										width: 60%;
									}
								}
							}

							.center_bottom_bottom_ul li>span {
								font-size: 10px;
							}
						}
					}
				}

				.bottom {
					width: 100%;
					margin-top: 2rem;
					text-align: center;
					color: rgb(128, 128, 128);
					z-index: 9;
					.bottom_btn {
						width: 100%;
						background-color: #fff;
						color: #443d3d;
						padding: 1rem;
						border-radius: 4px;
						border: 0;
						outline: none;
						margin-bottom: 1.2rem;
					}

					.fenge {
						margin: 0 0.1rem;
					}
				}
			}
		}
	}

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
		position: fixed;
		width: 100vw;
		height: 100vh;
		background: #fff;
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.aui-list-item:last-of-type {
		border-top: 10px solid rgba(0, 0, 0, 0.05);
		padding-bottom: 50px;
	}
	.aui-footer-fixed {
		z-index: 999;
	}
</style>
