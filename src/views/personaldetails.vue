<template>
	<div class="personaldetails">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:;" class="aui-navBar-item" @click="backTo">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">详情页</span>
			</div>
		</header>
		<main>
			<template v-if="recordType=='health'">
				<div class="form-box">
					<form action="">
						<div class="item">
							<span class="item-title">被上报人信息</span>
							<span>
							</span>
							<template>
								<p>{{this.list.reporter_name || '无'}}</p>
								<p>{{this.list.mobile || '无'}}</p>
							</template>
						</div>
						<div class="item">
							<span class="item-title point">Q1:今日体温:</span><span>{{this.list.temperature || '无'}}℃</span>
						</div>
						<div class="item">
							<span class="item-title point">Q2:今日身体是否有不适症状？</span>
							<p v-if="this.list.symptom.length">{{this.list.symptom || '无'}}</p>
							<p v-else>无不适症状</p>
						</div>
						<div class="item">
							<span class="item-title point">Q3:是否还存在其他症状？</span>
							<p v-if="this.list.other_symptom.length">{{this.list.other_symptom || '无'}}</p>
							<p v-else>无不适症状</p>
						</div>
						<div class="item">
							<span class="item-title point">Q4:是否就诊住院？</span>
							<p v-if="this.list.is_hospitalization">{{this.list.isiting_process || '无'}}</p>
							<p v-else>无就诊住院</p>
							<img :src="i" alt="" v-for="i in img" width="100%">
						</div>
						<div class="item">
							<span class="item-title point">Q5:今日是否与湖北（尤其是武汉）或已确诊人员有过较为密切的接触？</span>
							<p v-if="this.list.contact_explain.length">{{this.list.contact_explain || '无'}}</p>
							<p v-else>无接触</p>
						</div>
						<div class="item">
							<span class="item-title point">Q7:今日接触人群</span>
							<p v-if="this.list.contact_crowd.length">{{this.list.contact_crowd || '无'}}</p>
							<p v-else>无接触</p>
						</div>
						
					</form>
				</div>
			</template>
			<template v-else>
				<div class="form-box">
					<div class="item">
						<span class="item-title point">是否有外出</span>
						<span class="item-title ">外出时间及交通工具</span>
						<p v-if="this.list.outside.length">{{this.list.outside}}</p>
						<p v-else>无外出</p>
						<span class="item-title ">返回时间及交通工具</span>
						<p v-if="this.list.inside.length">{{this.list.inside}}</p>
						<p v-else>无返回</p>
						<span class="item-title ">外出目的地</span>
						<p v-if="this.list.target.length">{{this.list.target}}</p>
						<p v-else>无</p>
						<span class="item-title ">接触人员名单</span>
						<p v-if="this.list.contact_person.length">{{this.list.contact_person}}</p>
						<p v-else>无接触</p>
						<span class="item-title ">详细备注（非必填）</span>
						<p v-if="this.list.remarks.length">{{this.list.remarks}}</p>
						<p v-else>无</p>
					</div>
					<div class="item">
						<span class="item-title point">被上报人信息</span>
						<span class="item-title ">被上报人姓名</span>
						<p>{{this.list.reporter_name}}</p>
						<span class="item-title ">被上报人联系方式</span>
						<p>{{this.list.mobile}}</p>
						<span class="item-title ">被上报人现居住地</span>
						<p>{{this.list.reporter_address}}</p>
					</div>
				</div>
			</template>
		</main>
	</div>
</template>

<script>
	export default {
		name: '',
		data() {
			return {
				list: JSON.parse(this.$route.query.list),
				recordType: this.$route.query.recordType,
				img:[]
			}
		},
		created(){
			this.img = this.list.medical_materials.split(",")
		},
		methods: {
			backTo() {
				this.$router.push({
					path: '/reportRecord',
					query: {
						recordType: this.recordType
					}
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	@import "@/assets/skin/css/index.scss";

	.personaldetails {
		.form-box {
			padding-bottom: 50px;

			.item {
				position: relative;
				margin: 20px;

				.point:before {
					position: absolute;
					content: "*";
					color: red;
					left: -10px;
					top: 5px;
				}

				.item-title {
					margin-right: 10px;
					color: #4472c4;
				}

				input {
					padding: 0 10px;
					border: 2px solid #2f528f;
					border-radius: 10px;
					line-height: 40px;
					background: #e7e6e6;
				}

				.inputlong {
					width: 100%;
					margin: 5px 0;
				}

				p {
					margin: 10px 0;
				}

				.selection {
					.selection-item {
						display: inline-block;
						background: #a5a5a5;
						border: 1px solid #787878;
						border-radius: 5px;
						margin-right: 5px;
						margin-bottom: 5px;
						padding: 0 10px;
						color: #fff;
						height: 35px;
						font-size: 13px;
						line-height: 30px;
					}

					.selection-item-active {
						background: #4472c4;
						border: 1px solid #2f528f;
					}
				}

				.imgbutton {
					background: #4472c4;
					border: 1px solid #2f528f;
					border-radius: 5px;
					color: #fff;
					padding: 5px 20px;
					margin-left: 30px;
				}
			}
		}
	}
</style>
