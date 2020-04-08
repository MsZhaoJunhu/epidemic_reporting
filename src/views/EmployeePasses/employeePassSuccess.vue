<template>
	<div class="employeePassSuccess">
		<div class="background_box" :class="{'pass':PassStatus == '1','yepass':PassStatus == '2','nopass':PassStatus == '3'}">

		</div>
		<main>
			<div class="logo">
				<!-- <h1>人员通行证</h1> -->
				<img v-if="PassStatus == 1 && dataInfo.info.is_temporary_card == 0" src="../../assets/skin/images/人员通行证.png" alt="" />
				<img v-else-if="PassStatus == 1 || PassStatus == 2 && dataInfo.info.is_temporary_card == 1" src="../../assets/skin/images/临时通行证.png"
				 alt="" width="70%">
				<img v-else src="../../assets/skin/images/通行验证结果.png" alt="" />
			</div>
			<p style="font-size: 13px;color: #fff;text-align: center;" v-if="type=='company'">当前登记组织:{{dataInfo.enterprise_info.name}}</p>
			<p style="font-size: 13px;color: #fff;text-align: center;" v-else>当前登记组织: {{CompanyInfo.name}}</p>
			<div class="main-container">
				<div class="e-pass-title">
					<!-- <h6>个人信息</h6> -->
					<div class="e-pass-info personInfo">
						<div style="" class="real-name">
							<span>{{dataInfo.info.real_name}}</span>
						</div>
						<div class="logo-pass">
							<img src="../../assets/skin/images/can-pass.png" alt="" v-if="dataInfo.info.is_go_in == 1" />
							<img src="../../assets/skin/images/no-pass.png" alt="" v-else />
						</div>
						<div class="bottom-part">
							<p v-if="dataInfo.from_enterprise_info != null && type=='company'">
								<span>所属公司：</span>
								<span>{{ dataInfo.from_enterprise_info.name}}</span>
							</p>
							<p>
								<span>是否属于当前打卡组织：</span>
								<span>{{dataInfo.info.is_belong_enterprise?'是':'否' }}</span>
							</p>
							<p>
								<span>身份证：</span>
								<span>{{ dataInfo.info.id_card }}</span>
							</p>
							<p>
								<span>联系电话：</span>
								<span>{{(dataInfo.info.mobile).slice(0,3)}}****{{(dataInfo.info.mobile).slice(7,11)}}</span>
							</p>
							<p>
								<span>是否在当前企业复工：</span>
								<span>{{ dataInfo.info.is_commencement?'该员工已复工':'该员工未复工' }}</span>
							</p>
							<p>
								<span>人员轨迹：</span>
								<span v-if="isOutChongQing==0">14天内不存在跨区域轨迹</span>
								<span v-else-if="isOutChongQing==1">14天内存在跨区域轨迹</span>
								<span v-else>未查询到该人员信息</span>
							</p>
							<p v-if="dataInfo.info.is_temporary_card == 1">
								<span>允许通行时间：</span>
								<span v-if="dataInfo.info.is_temporary_card==1">
									{{dataInfo.temporary_card.start_date}} 至
									{{dataInfo.temporary_card.end_date}}
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div v-if="$route.query.hasOwnProperty('userId')" class="check-temperature">
				<nut-checkbox v-model="checkbox1" size="small" style="color:#fff;font-weight:700;">温度正常</nut-checkbox>
				<nut-checkbox v-model="checkbox2" size="small" style="color:#fff;font-weight:700">确认放行</nut-checkbox>
				<div class="check-affirm" @click="handleAffirm1">
					<span>提交登记</span>
				</div>
			</div>
			<div class="check-temperature" v-else>
				<nut-radiogroup v-model="radioGroupVal1">
					<nut-radio :label="1" style="color:#fff;font-weight:700;">温度正常</nut-radio>
					<nut-radio :label="0" style="color:#fff;font-weight:700;">温度异常</nut-radio>
				</nut-radiogroup>
				<div class="check-affirm" @click="handleAffirm2">
					<span>提交登记</span>
				</div>
			</div>
			<div class="tips">
				<span> 本次验证结果仅供参考，请按照主管部门要求现场管理</span>
			</div>
		</main>

	</div>
</template>

<script>
	import $ from "jquery";
	import axios from "axios";
	export default {
		name: "employeePassSuccess",
		data() {
			return {
				type: '',
				PassStatus: '1', //1绿 ，2黄 ，3红色
				dataInfo: '',
				radioGroupVal1: 1,
				CompanyInfo: JSON.parse(localStorage.getItem('CompenyInfo')),
				isOutChongQing: -1,
				checkbox1: 0,
				checkbox2: 0
			};
		},
		async mounted() {
			let that = this;
			that.checkStatus();

		},
		methods: {
			handleAffirm1() {
				let that = this;
				let is_normal = this.checkbox2 ? 1 : 0;
				let is_pass = this.checkbox2 ? 1 : 0;
				this.$api
					.postCompanyAdd(this.dataInfo.clock_id, is_normal, is_pass)
					.then(res => {
						if (res.data.code == 200) {
							that.$toast.success("操作成功！");
							that.$router.push({
								name: "visitorRegisterSuccess"
							});
						} else if (res.data.code == 500) {
							that.$toast.fail("提交失败！");
						}
					});
			},
			handleAffirm2() {
				// let isNormal
				let that = this;
				this.$api
					.postEmployeeCard(this.dataInfo.clock_id, this.radioGroupVal1)
					.then(res => {
						if (res.data.code == 200) {
							// that.$toast.success("操作成功！");
							that.$router.push({
								name: "visitorRegisterSuccess"
							});
						} else if (res.data.code == 500) {
							that.$toast.fail("提交失败！");
						}
					});
			},
			checkStatus() {
				const that = this;
				if (that.$route.query.hasOwnProperty("companyId")) {
					that.type = 'company'
					if (localStorage.getItem('link') == 'mycompany') {
						this.$dialog({
							title: "系统提示",
							content: "所扫二维码是企业二维码，请使用个人账号进行扫码",
							noCancelBtn: true,
							closeOnClickModal: false,
							okBtnTxt: '我知道了',
							onOkBtn: function() {
								this.close()
								that.$router.push('/index')
							}
						});
						return
					}
					that.loading = that.$toast.loading();
					this.$api
						.getEmployeePassResult(that.$route.query.companyId)
						.then(function(res) {
							switch (res.data.code) {
								case 200:
									that.dataInfo = res.data
									that.loading.hide();
									if (res.data.info.is_go_in == 1) {
										if (res.data.info.is_recent_clock == 1) {
											that.PassStatus = 2
										} else {
											that.PassStatus = 1
										}
									} else {
										that.PassStatus = 3
									}
									that.$api.getUserStatus(res.data.info.mobile).then(function(res) {
										switch (res.data.code) {
											case 200:
												that.isOutChongQing = res.data.data[0].isMeetCondition
												break;
											case 500:
												that.$toast.text(res.data.msg)
												break;
											default:
												break;
										}
									})
									break;
								case 500:
									let status = res.data.status;
									that.PassStatus = 3;
									if (status == 500) {
										that.$toast.fail("身份失效");
										setTimeout(() => {
											that.$router.push({
												name: "login"
											});
										}, 500);
									} else if (status == 0) {
										//如果返回status = 0，表示没有关联企业，则 自动关联企业
										that.$api.getLinkCompany(that.$route.query.companyId).then(res => {
											if (res.data.code == 200) {
												that.checkStatus();
											} else if (res.data.code == 500) {
												console.info(res.data.code)
												that.$toast.fail("关联企业失败！");
											}
										});
									}
									that.loading.hide();
									break;
								default:
									break;
							}
						});
				} else if (that.$route.query.hasOwnProperty("userId")) {
					if (localStorage.getItem('link') == 'mycenter') {
						this.$dialog({
							title: "系统提示",
							content: "所扫二维码是个人二维码，请使用企业账号进行扫码",
							noCancelBtn: true,
							closeOnClickModal: false,
							okBtnTxt: '我知道了',
							onOkBtn: function() {
								this.close()
								that.$router.push('/index')
							}
						});
						return
					}
					that.loading = that.$toast.loading();
					that.$api
						.getUserInfoPassResult(that.$route.query.userId)
						.then(function(res) {
							that.type = 'user'
							that.loading.hide();
							switch (res.data.code) {
								case 200:
									that.dataInfo = res.data
									if (res.data.info.is_go_in == 1) {
										if (res.data.info.is_recent_clock == 1) {
											that.PassStatus = 2
										} else {
											that.PassStatus = 1
										}
									} else {
										that.PassStatus = 3
									}

									that.$api.getUserStatus(res.data.info.mobile).then(function(res) {
										switch (res.data.code) {
											case 200:
												that.isOutChongQing = res.data.data[0].isMeetCondition
												break;
											case 500:
												that.$toast.text(res.data.msg)
												break;
											default:
												break;
										}
									})
									break;
								case 500:
									let status = res.data.status;
									that.PassStatus = 3;
									if (status == 500) {
										that.$toast.fail("身份失效");
										setTimeout(() => {
											that.$router.push({
												name: "login"
											});
										}, 500);
									}
									if (status == 0) {
										that.$toast.fail("员工未关联企业");
										setTimeout(() => {
											that.$router.push({
												name: "index"
											});
										}, 500);
									}
									break;
							}
						})
						.catch(err => {
							that.loading.hide();
						});
				} else {
					that.loading.hide();
				}
			},
			formatTime() {
				return `${new Date()
        .toLocaleDateString()
        .split("/")
        .join(".")}   ${new Date().toLocaleTimeString()}`;
			}
		}
	};
</script>
<style>
	.nut-dialog-btn.nut-dialog-ok {
		color: #007AFF !important;
		background: #fff;
	}
</style>
<style lang="scss" scoped>
	.background_box {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
	}

	.pass {
		background-image: url(../../assets/skin/images/pass-background.png);
	}

	.yepass {
		background-image: url(../../assets/skin/images/yepass-background.png)
	}

	.nopass {
		background-image: url(../../assets/skin/images/nopass-background.png)
	}

	.employeePassSuccess {
		height: 100%;

		main {
			position:relative;
			z-index:99;
			padding: 1rem;
			// background: #f57373;
			background-repeat: no-repeat;
			background-size: 100% 100%;
		}

		.logo {
			width: 100%;
			margin: 0 auto;
			display: flex;
			justify-content: center;
			align-items: center;

			img {
				width: 50%;
				height: 40px;
				padding-top: 2rem;
			}
		}

		.e-pass-header {
			padding: 0.5rem 1rem;
			background: rgb(111, 180, 7);
			color: #fff;

			div {
				padding-bottom: 0.4rem;
			}

			.e-status {
				font-size: 14px;

				span {
					display: inline-block;

					&:nth-last-of-type(1) {
						text-align: right;
						width: 60%;
					}
				}
			}

			.e-pass-address {
				font-size: 12px;
			}
		}

		.e-fail-header {
			background: rgb(204, 204, 2);
			padding: 0.5rem 1rem;

			.e-pass-address {
				font-size: 12px;
			}
		}

		.main-container {

			// padding: 0 1rem;
			.e-pass-title {
				box-shadow: 2px 2px 20px rgb(0, 0, 0, .2);
				border-radius: 0.5rem;

				.e-pass-info {
					border-radius: 0.5rem;
					margin-top: 2rem;
					color: #fff;

					.real-name {
						position: relative;
						top: 1.5rem;
						left: 1rem;
						// padding-top:1rem;
						width: 170px;
						height: 50px;
						// padding-left:2rem;
						font-size: 1.5rem;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 1.5rem;
						background: #fff;
						font-weight: 500;
						color: rgba(0, 0, 0, .5);
					}

					.real-name-red {
						color: #f64f46;
					}

					.logo-pass {
						display: inline-block;
						position: relative;
						top: -40px;
						left: 65%;

						img {
							width: 6.25rem;
							height: 6.25rem;
						}
					}

					.real-name-green {
						color: #7be0ba;
					}

					.bottom-part {
						padding: 2rem 0rem; //1px 占位

						margin-top: -5rem;

						p {
							padding: .5rem;
							border-bottom: 1px solid rgba(0, 0, 0, .1);
						}
					}

					.bottom-part-red {
						p {
							border-bottom: 1px solid #f89b8e;
						}
					}
				}
			}

			.failed {
				background: linear-gradient(#f78b5a, #f57373);
			}
		}

		.check-temperature {
			width: 100%;
			box-sizing: border-box;
			margin: 2rem auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-radius: 0.5rem;
			box-shadow: 1px 1px 20px rgb(0, 0, 0, .2);
			padding: 1rem;

			.check-affirm {
				// background: linear-gradient(to right, #2971ff, #06baff);
				background: #fff;
				height: 40px;
				width: 6rem;
				display: flex;
				justify-content: center;
				align-items: center;
				color: rgba(0, 0, 0, .5);
				border-radius: 1rem 0rem 0rem 1rem;
			}

			.affirm-red {
				color: #ee4a42;
			}
		}

		.check-temperature-red {
			background: linear-gradient(#f47573, #f89a86);
		}
	}

	.employeePassFail {
		height: 100%;
		background: #ee4340;
	}

	.affirm-submit {
		width: 90%;
		height: 40px;
		margin: 1.5rem auto;
		display: flex;
		// background:rgb(39, 107, 235);
		background: linear-gradient(to right, #2971ff, #06baff);
		color: #fff;
		border-radius: 1rem;
		justify-content: center;
		align-items: center;
	}

	.tips {
		font-size: 13px;
		color: #fff;
		text-align: center;
	}
</style>
