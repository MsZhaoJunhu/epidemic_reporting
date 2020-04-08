<template>
	<div class="residentClockin">
		<!-- <section class='aui-flexView'>
            <div class='er'></div>
    </section>-->
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
		<TopHeader title="打卡登记二维码" isShow="true" class='topHeader'>
			<template v-slot:rightBtn>
				<span style="color: #007AFF;" @click="toImage()">
					保存二维码
				</span>
			</template>
		</TopHeader>

		<div class="erweima-container" ref="imageWrapper">
			<div class="character">

				<div class="character-info">
					<p style="color:#000;margin-bottom:.5rem">{{ companyInfo.name }}</p>
					<span>(打卡登记二维码)</span>
				</div>
			</div>
			<div class="erweima-preInfo">
				<p style="padding:1rem 2rem;margin:0 auto;text-align: center;">
					<img src="../assets/skin/images/clockin-title.png" alt="clockin-title.png" />
				</p>
				<p style="display:flex;flex-direction:column;text-align: center;margin-top:0">
					<span style="color:#ccc">提升防疫意识，确保自己和家人的健康</span>
					<span style="color:#ccc">扫码二维码查进行个人信息登记，和我一起“集体防疫”</span>
				</p>
			</div>
			<div class="erweima-info">
				<div id="qrCode" ref="QRcode"></div>
				<div class="erweima-save-share">
					长按此处保存图片，可打印或分享朋友圈
				</div>
			</div>
		</div>
		<router-link to="/residentClockinRecord">
			<div class="residentClockin-record resident-button-blue">
				<span>上班打卡记录</span>
			</div>
		</router-link>

		<!--   <router-link to="/visitorRegisterRecord">
      <div class="residentClockin-comeToVisit resident-button-white">
        <span>来访登记记录</span>
      </div>
    </router-link> -->
	</div>
</template>
<script>
	import QRCode from "qrcodejs2";
	import html2canvas from "html2canvas";
	import TopHeader from '@/components/TopHeader.vue'
	export default {
		name: "residentClockin",
		data() {
			return {
				companyName: "重庆市城银科技股份有限公司",
				companyInfo: JSON.parse(localStorage.getItem("CompenyInfo")),
				imageUrl: null,
				timer: null,
				queryId: null,
				fenxiang: "",
				showQR: false
				//    companyInfo:''
			};
		},
		mounted() {
			this.queryId = this.$route.query;
			this.bindQRCode();
		},
		components: {
			TopHeader
		},
		beforeDestroy() {
			clearTimeout(this.timer);
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
			bindQRCode() {
				let target =
					this.queryId.id == 1 ? "employeePassSuccess" : "visitorRegister";
				new QRCode(this.$refs.QRcode, {
					text: `http://fgfcwx.cy-coo.com/#/${target}?companyId=${this.companyInfo.id}`, //测试
					// text: `http://192.168.3.36:8081/#/${target}?companyId=${this.companyInfo.id}`, //测试
					width: 200,
					height: 200,
					colorDark: "#333333", //二维码颜色
					colorLight: "#ffffff", //二维码背景色
					correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
				});
			},
			handleTouchStart(e) {
				this.timer = setTimeout(() => {
					this.saveQRCode();
				}, 500);
			},
			handleTouchEnd(e) {
				this.endTime = +new Date();
				clearTimeout(this.timer);
			},
			saveQRCode() {
				let that = this;
				html2canvas(this.$refs.imageWrapper).then(canvas => {
					let dataURL = canvas.toDataURL("image/png");
					this.imgUrl = dataURL;
					that.fenxiang = this.imgUrl;
					if (this.imgUrl !== "") {
						this.dialogTableVisible = true;
					}
				});
			}
		}
	};
</script>
<style lang="scss" scoped>
	.topHeader {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		background: #fff;
		box-sizing: border-box;
	}

	a {
		text-decoration: none;
	}

	.residentClockin {
		display: flex;
		flex-direction: column;
		justify-content: center;
		box-sizing: border-box;
		height: 100%;
		background: rgb(236, 235, 235);
		padding: 1rem;

		.character {
			width: 100%;
			height: 60px;
			margin-bottom: 1rem;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.character-image {
				flex-shrink: 0;
				width: 50px;
				height: 50px;
				border-radius: 50%;
				background: #ccc;
			}

			.character-info {
				margin-left: 10px;
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;

				p {
					font-size: 18px;
				}
				span{
					font-size:14px;
					color: #999999;
				}
			}
		}

		.erweima-container {
			margin: 0.5rem;
			margin-bottom: 2rem;
			background: #fff;
			border-radius: 0.5rem;

			.erweima-preInfo {
				p {
					span {
						font-size: 10px;
					}
				}
			}

			.erweima-info {
				display: flex;
				flex-direction: column;
				align-items: center;

				#qrCode {}

				.erweima-save-share {
					padding: 2rem 0;
				}
			}
		}

		.residentClockin-record {
			width: 90%;
			height: 40px;
			margin: 0 auto;
			border-radius: 1rem;
			background: linear-gradient(to right, #2971ff, #06baff);
			box-shadow: 0px 3px 6px rgb(111, 159, 247);
			display: flex;
			justify-content: center;
			align-items: center;

			span {
				color: #fff;
			}
		}

		.residentClockin-comeToVisit {
			width: 90%;
			height: 40px;
			margin: 1rem auto;
			border-radius: 1rem;
			background: #fff;
			border: 1px solid #f8f8f8;
			box-shadow: 0px 3px 6px rgb(180, 180, 180);
			display: flex;
			justify-content: center;
			align-items: center;

			span {
				color: #000;
			}
		}
	}

	.saveImg {
		position: fixed;
		width: 100vw;
		height: 100vh;
		z-index: 999999;
		top: 0;
		left: 0;
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
</style>
