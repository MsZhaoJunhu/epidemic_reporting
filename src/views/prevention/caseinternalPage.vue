<template>
	<div class="caseinternalPage">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:;" class="aui-navBar-item" @click="backTo">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">病例信息</span>
			</div>
		</header>
		<main>
			<div class="case-box">
				<!-- <div class="case-right"><span class="bule"></span>待审核</div> -->
				<div class="case-right" v-if="info.report_status == 0"><span class="red" />待审核</div>
				<div class="case-right" v-else-if="info.report_status == 1"><span class="red" />已通过</div>
				<div class="case-right" v-else-if="info.report_status == 2"><span class="red" />已退回</div>
				<div class="case-right" v-else><span class="red" />已排除</div>
				<div class="case-item">
					<span class="item-titele">姓名：
					</span>
					<span>{{info.name}}</span>
				</div>
				<div class="case-item">
					<span class="item-titele">性别：
					</span>
					<span>{{info.gender?'男':'女'}}</span>
				</div>
				<div class="case-item">
					<span class="item-titele">年龄：
					</span>
					<span>{{info.age}}岁</span>
				</div>
				<div class="case-item">
					<span class="item-titele">病例类型：
					</span>
					<span v-if="info.patient_type == 0">确诊病例</span>
					<span v-else-if="info.patient_type == 1">疑似病例</span>
					<span v-else-if="info.patient_type == 2">潜在病例</span>
					<span v-else>常规病例</span>
				</div>
				<div class="case-item">
					<span class="item-titele">监护人姓名：
					</span>
					<span>{{info.guardian_name}}</span>
				</div>
				<div class="case-item">
					<span class="item-titele">联系方式：
					</span>
					<span>{{info.phone}}</span>
				</div>
				<div class="case-item">
					<span class="item-titele">身份证号：
					</span>
					<span>{{info.certificate_no}}</span>
				</div>
				<div class="case-item">
					<span class="item-titele">现居地址：
					</span>
					<span>{{info.address}}</span>
				</div>
				<div class="case-item">
					<span class="item-titele">主要症状：
					</span>
					<span>{{info.main_symptom}}</span>
				</div>
			</div>
			<div class="case-detials" v-if="info.report_status == 2">>
				<p class="detials-title">退回原因</p>
				<p class="detials-desc">退回原因退回原因退回原因退回原因退回原因退回原因退回原因退回原因退回原因退回原因退回原因</p>
			</div>
			<div class="case-button">
				<button class="button1" @click="del()">删除</button>
				<!-- <button class="button2"> 修改</button> -->
			</div>
		</main>
	</div>
</template>

<script>
	export default {
		name: 'caseinternalPage',
		data() {
			return {
				info: ''
			}
		},
		created() {
			const that = this
			that.loading = that.$toast.loading();
			this.$api.caseDetail(this.$route.params.id).then(function(res) {
				console.info(res)
				if (res.data.code == 200) {
					that.loading.hide();
					that.info = res.data.info
				}
			})
		},
		methods: {
			backTo() {
				this.$router.go(-1)
			},
			del() {
				const that = this
				that.loading = that.$toast.loading();
				this.$api.caseDel(this.$route.params.id).then(function(res) {
					console.info(res)
					switch (res.data.code) {
						case 200:
						that.loading.hide();
							that.$dialog({
								title: "系统提示",
								content: "此条记录已删除",
								noCancelBtn: 'true',
								closeOnClickModal: 'false',
								onOkBtn(event) { //确定按钮点击事件
									this.close(); //关闭对话框
									history.go(-1)
								},
							});
							break;
						case 500:
						that.loading.hide();
							that.$toast.text(res.data.msg)
							break;
						default:
							break;
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/assets/skin/css/index.scss";

	.caseinternalPage {
		.case-box {
			position: relative;
			border-bottom: 1px solid #e4e4e4;
			padding: 0 10px;

			.case-right {
				position: absolute;
				right: 40px;

				span {
					display: inline-block;
					margin-right: 8px;
					width: 8px;
					height: 8px;
					border-radius: 50%;
				}

				.bule {
					background: #0e77d1;
				}

				.yellow {
					background: #ffcc00;
				}
			}

			.case-item {
				margin: 10px 0;
			}
		}

		.case-detials {
			margin: 10px 0;
			padding: 5px 20px;
			border-top: 1px solid #e4e4e4;
			border-bottom: 1px solid #e4e4e4;
			display: flex;

			p {
				display: inline-block;
			}

			.detials-title {
				min-width: 70px;
			}

			.detials-desc {
				flex: 1;
			}
		}

		.case-button {
			display: flex;
			justify-content: center;
			margin-top: 20px;

			button {
				padding: 10px 60px;
				border: 1px solid #464c5b;
				border-radius: 5px;
			}

			.button1 {
				background: #fff;
				color: #000;
				margin-right: 10px;
			}

			.button2 {
				background: #464c5b;
				color: #fff;
			}
		}
	}
</style>
