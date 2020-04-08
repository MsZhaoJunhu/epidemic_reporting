<template>
	<section class="aui-flexView">
		<div class="erweima" ref="imageWrapper" v-show="showQR">
			<img v-if="temporary == true" src="../assets/skin/images/临时通行证2.png" alt="" height="30px" style="transform: translateY(20px);">
			<div>
				<div class="c_title">
					<img v-if="temporary == true" src="../assets/skin/images/临时通行证.png" alt="" height="30px">
					<p style="text-align: center;">
						<span style="padding: 5px 35px;display: inline-block;background-color: #E4E4E4;margin: 20px 0;">{{user.real_name}}</span>
					</p>
				</div>
				<div id="qrCode" ref="qrCodeDiv"></div>
				<p style="font-size: 20px;padding: 20px 0;">扫码查看我的通行证</p>
			</div>
		</div>
		<div class="operation" v-show="showQR">
			<span class="exit" @click="
		      () => {
		        showQR = false;
				$router.push('/index/userfugong')
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
				<div class="个人头像">
					<div>
						<!-- <img src="../assets/个人首页/头像.png" alt="" class="头像"> -->
						<div class="left_content"></div>
						<div>
							<p class="name" style="font-size: 14px;">{{ user.real_name }}</p>
							<p class="phone" style="opacity: .6;font-size: 12px;padding: 3px 0;">{{ user.mobile }}</p>
							<router-link tag="div" style="background: #007AFF;color: #fff;font-size: 12px;padding: 2px 10px;margin: 0;border-radius: 50px;text-align: center;" to="/findCompany">
								<p>关联组织</p>
							</router-link>
						</div>
					</div>
					<div class="right-user">
						<!-- <router-link to="/Mytemporary" class="临时通行证" style="margin-right:10px;background: #007AFF;color: #fff;padding: 0 5px;display: flex;justify-content:center;align-items: center;text-align: center;">
												临时<br/>通行证
											</router-link> -->
											
							<router-link to="/checkUserinfo" class="right-userinfo">
								<span>个人资料</span>
							</router-link>
											<img @click="
						  () => {
						    showQR = true;
						  }
						" src="../assets/个人首页/二维码.png"
											 alt="" class="二维码">
					</div>
				</div>
				<div class="状态">
					<div class="体温状态 状态1">
						<p class="今日体温">今日体温</p>
						<p class="正常与否" v-if="info.temperature_state==='' || info.temperature_state===null">今日未打卡</p>
						<p class="正常与否" v-else-if="info.temperature_state===0" style="color: red;">异常</p>
						<p class="正常与否" v-else-if="info.temperature_state===1">正常</p>
						<p class="正常与否" v-else>未知</p>
					</div>
					<div class="体温状态">
						<p class="今日体温">复工状态</p>
						<p class="是否复工" v-if="info.is_commencement==1" style="color: #007AFF;">已复工</p>
						<p class="是否复工" v-else>未批准复工</p>
					</div>
				</div>
				<div class="广告">
					<a href="http://www.zjcoo.cn/m/saoyisao_yq.htm">
						<img src="../assets/个人首页/广告.png" alt="">
					</a>
				</div>
			</div>
			<div class="功能按钮">
				<router-link to="/MaterialsDetails">
					<img src="../assets/skin/images/fgzm.png" alt="">
				</router-link>
				<router-link to="/Mytemporary">
					<img src="../assets/skin/images/lstxz.png" alt="">
				</router-link>
			</div>
			<div class="今日打卡" v-show="list != ''">
				<div class="head">
					<div class="iconfont"></div>
					<span class="city">今日打卡记录</span>
				</div>
				<div class="体温打卡" v-for="item in list">
					<div>
						<span class="打卡日期">{{item.create_time}}</span>
						<span>{{item.is_normal?'体温正常':'体温异常'}}</span>
					</div>
					<div class="公司名称">
						<p>{{item.enterprise_name}}</p>
					</div>
				</div>
			</div>
			<div class="我的组织1" v-if="info.enterprise==''">
				<div class="head">
					<div class="iconfont"></div>
					<span class="city">我的组织</span>
				</div>
				<div class="关联组织">
					<img src="../assets/个人首页/关联组织.png" alt="">
				</div>
				<router-link tag="div" class="company-add" to="/findCompany">
					<p>关联组织</p>
				</router-link>
			</div>
			<div class="我的组织2" v-else>
				<div class="head">
					<div>
						<div class="iconfont"></div>
						<span class="city">我的组织</span>
					</div>
					<router-link tag="span" to="/findCompany" style="display: flex;white-space: nowrap;font-size: 13px;color:#007AFF;">
						<!-- <img src="../assets/个人首页/加号.png" alt="" height="20px"> -->
						<span>关联组织</span>
					</router-link>
				</div>
				<div class="企业" v-for="item in info.enterprise">
					<div class="信息">
						<span>{{item.name}}</span>
						<img src="../assets/个人首页/批准复工.png" alt="" v-if="item.commencement_status!=null" style="flex-shrink: 0;">
						<img src="../assets/个人首页/未批准复工.png" alt="" v-else style="flex-shrink: 0;">

					</div>
					<div class="地址" style="display: flex;justify-content: space-between;">
						<span>{{item.business_address || '暂无地址'}}</span>
						<span @click="cancel_follow(item.enterprise_id,item.name)" class="cancel_btn">取消关联</span>
					</div>
				</div>

			</div>
			<div class="我的组织3">
				<a href="javascript:;" class="my_a" @click="exit()">退出登录</a>
			</div>
		</section>
		<tabbar></tabbar>
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
				user: JSON.parse(localStorage.getItem("UserInfo")),
				info: '',
				list: '',
				temporary:false
			};
		},
		mounted() {
			this.bindQRCode();
		},
		created() {
			const that = this
			// this.getCompanyList()
			console.info(that.$route.query.type)
			if(that.$route.query.type != undefined){
				if(that.$route.query.type == 'temporary'){
					that.showQR = true
					that.temporary = true
				}
			}
			this.userBaseInfo()
			this.$api.userDaka(this.timeFormat((new Date()).getTime())).then(function(res) {
				switch (res.data.code) {
					case 200:
						that.list = res.data.list
						break;
					case 500:
						that.$toast.text(res.data.msg)
						break;
					default:
						break;
				}
			})
		},
		methods: {
			userBaseInfo() {
				const that = this
				this.$api.userBaseInfo().then(function(res) {
					console.info(res)
					switch (res.data.code) {
						case 200:

							that.info = res.data.info
							break;
						case 500:
							that.$toast.text(res.data.msg)
							break;
						default:
							break;
					}
				})
			},
			add0(m) {
				return m < 10 ? '0' + m : m
			},
			//时间戳转化成时间格式
			timeFormat(timestamp) {
				//timestamp是整数，否则要parseInt转换,不会出现少个0的情况
				var time = new Date(timestamp);
				var year = time.getFullYear();
				var month = time.getMonth() + 1;
				var date = time.getDate();

				return year + '-' + this.add0(month) + '-' + this.add0(date)
			},
			cancel_follow(id, name) {
				const that = this
				this.$api.cancel_follow(id).then(function(res) {
					console.info(res)
					switch (res.data.code) {
						case 200:
							that.userBaseInfo()
							that.$toast.text('已取消关联')
							break;
						case 500:
							that.$toast.text(res.data.msg)
							break;
						default:
							break;
					}
				})
			},
			//取消调用公司列表 改为全部使用user/base/info
			// getCompanyList() {
			// 	const that = this
			// 	that.loading = that.$toast.loading();
			// 	this.$api.related_company_list().then(function(value) {
			// 		switch (value.data.code) {
			// 			case 200:
			// 				that.loading.hide();
			// 				that.companyList = value.data.data
			// 				// if (that.companyList == '') {
			// 				// 	that.addWindow = true
			// 				// 	// that.Search = true;
			// 				// }
			// 				break;
			// 			case 500:
			// 				that.loading.hide();
			// 				localStorage.removeItem('token')
			// 				that.$router.push({
			// 					name: 'login'
			// 				})
			// 			default:
			// 				break
			// 		}
			// 	})
			// },
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
					width: 150,
					height: 150,
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
	.c_title {
		p {
			font-size: 15px;
		}
	}

	.临时通行证 {}

	.left_content {
		margin-right: 5px;
		width: 3.5rem;
		height: 3.5rem;
		background-image: url("../assets/fugong/person.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.cancel_btn {
		flex-shrink: 0;
		font-size: 12px;
		border: 1px solid red;
		color: red;
		height: 25px;
		border-radius: 50px;
		padding: 0 15px;
		line-height: 25px !important;
	}

	.我的组织3 {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 15px;
		background: #fff;
		border-radius: 10px;
		margin: 0 auto;
		margin-bottom: 10px;
		width: 90%;
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

	.iconfont {
		margin-right: 5px;
		width: 5px !important;
		box-shadow: 0 0 3px #007AFF;
		height: 18px;
		border-radius: 20%;
		background-color: #0881fc;
	}

	.正常与否,
	.是否复工 {
		font-size: 16px;
		font-weight: normal;
	}

	.打卡日期 {
		display: inline-block;
		margin-right: 15px !important;
		color: #5a5a5a;
	}

	.city {
		font-size: 17px;
	}

	.关联组织>img {
		width: 90px;
		height: 85px;
		margin-left: 38%;
		margin-top: 13px;
	}

	.我的组织1 {
		width: 90%;
		height: 225px;
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
		border-bottom: none !important;
	}

	.企业 {
		border-bottom: 1px solid #f0f0f0;
	}

	.我的组织2 {
		width: 90%;
		margin: 15px auto !important;
		background-color: #fff;
		border-radius: 10px;
	}

	.head {
		width: 100%;
		display: flex;
		padding: 14px;
		align-items: center;
	}

	.head>div {
		display: flex;
		width: 100%;
		align-items: center;
	}

	.head>img {
		width: 17px;
		height: 20px;
	}

	.是否复工 {
		color: #ff6262;
	}

	.正常与否 {
		color: #5b99fc;
	}

	.体温打卡 {
		flex-direction: column-reverse;
		align-items: center;
		padding: 14px;
		display: flex;
		font-size: 13px;
		border-bottom: 1px solid #f0f0f0;
		justify-content: space-between;

		div {
			width: 100%;
			display: flex;
			justify-content: space-between;
		}

		span:last-of-type {
			font-size: 12px;
		}
	}

	.状态 {
		width: 100%;
		height: 90px;
		border-top: 1px solid #f0f0f0;
		border-bottom: 1px solid #f0f0f0;
		display: flex;
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
		margin-bottom: 0 !important;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 15px;
	}

	.信息 img {
		width: 91px;
		height: 29px;
	}

	.信息 span,
	.地址 {
		line-height: 34px;
	}

	.地址 {
		font-size: 13px;
		padding: 10px 15px;
		opacity: .8;
	}

	.信息 span {
		color: #5a5a5a;
		font-size: 15px;
	}

	.company-add {
		width: 270px;
		border-radius: 50px;
		padding: 10px;
		color: #007AFF;
		margin: 20px auto !important;
		text-align: center;
		font-size: 15px;
		border: 1px solid #007AFF;
	}

	.公司名称 {
		color: #007AFF;
		font-size: 14px;
		margin-bottom: 10px;
	}

	.个人头像 {
		width: 100%;
		display: flex;
		justify-content: space-between;
		/* border-bottom: 1px solid #f0f0f0; */
		padding: 15px;
		align-items: center;

		img {
			flex-shrink: 0;
		}

		div {
			display: flex;
			justify-content: center;

			div {
				margin-left: 10px;
				display: flex;
				flex-direction: column;
			}
		}
	}

	.今日体温 {
		font-size: 15px;
		margin-bottom: 6px !important;
	}

	.二维码 {
		width: 35px;
		height: 48px;
	}

	.广告 {
		padding: 0 10px;

		img {
			width: 100%;
		}

	}

	.头像 {
		width: 57px;
		height: 60px;
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
		background: rgba(0, 0, 0, .05);
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
		// transform: rotateZ(90deg);
	}

	.operation {
		position: fixed;
		background: #fff;
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
		background: #007AFF !important;
	}

	.erweima>div {
		background: #fff;
		padding: 30px 40px;
		margin: 0 30px;
		width: 90%;
		// border: 2px solid rgba(0, 0, 0, 0.3);
		border-radius: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
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
	
	.right-user{
		display: flex;
		align-items: center;
	}

	.right-userinfo{
		width: 2rem;
		height: 2rem;
		font-size: 10px;
		background: #fafafa;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
