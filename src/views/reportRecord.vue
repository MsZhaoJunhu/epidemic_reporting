<template>
	<div class="reportRecord">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:;" class="aui-navBar-item" @click="backHome">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title" v-if="recordType == 'health'">我的健康状况上报记录</span>
				<span class="aui-center-title" v-else>我的行为轨迹上报记录</span>
			</div>
		</header>
		<main>
			<template v-if="recordType == 'health'">
				<div class="item item-error" @click="toDetalis(index)" v-for="(item,index) of reportList" :key="index">
					<span class="data">{{item.create_time.split(' ')[0]}}</span>
					<span class="temperature temperature-error">{{item.temperature}}℃</span>
					<div class="situation">
						<span>{{item.symptom || '无任何不适'}}</span>
						<!-- <span>{{item.isiting_process}}</span>
						<span v-if="item.contact_explain.length"></span>
						<span>{{item.contact_explain}}</span><span v-if="item.contact_crowd"></span>
						<span>{{item.contact_crowd}}</span> -->
					</div>
					<p class="address">姓名：{{item.reporter_name}}</p>
				</div>
			</template>
			<template v-else>
				<div class="item item-error" @click="toDetalis(index)" v-for="(item,index) of reportList" :key="index">
					<span class="data">{{item.create_time.split(' ')[0]}}</span>
					<div class="situation">
						<span v-if="item.outside.length">{{item.outside}},有外出记录</span>
						<span v-else>无外出记录</span>
					</div>
					<p class="address">现居住地：{{item.reporter_address}}</p>
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
				recordType: this.$route.query.recordType,
				reportList: [],
			}
		},
		mounted() {
			this.getReportList()
		},
		methods: {
			getReportList() {
				const that = this
				if (this.recordType == 'health') {
					this.$api.health_report_record().then(function(value) {
						that.reportList = value.data.data
					})
				} else {
					this.$api.action_track_record().then(function(value) {
						that.reportList = value.data.data
					})
				}
			},
			backHome() {
				this.$router.push({
					path: '/'
				})
			},
			toDetalis(index) {
				this.$router.push({
					path: '/personaldetails',
					query: {
						recordType: this.recordType,
						list: JSON.stringify(this.reportList[index])
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/assets/skin/css/index.scss";

	.reportRecord {
		main {
			background: #fafafa;
			padding: 10px 0;

			.item>* {
				padding-left: 25px;
			}

			.item {
				background: #fff;
				margin: 0 10px 20px 10px;
				padding: 5px 10px;
				font-size: 13px;
				border-radius: 5px;

				.data {
					display: flex;
					align-items: center;
					// background: #4a75c2;
					// padding: 0 10px;
					// color: #fff;
					border-radius: 5px;
					padding: 0;
					color: #007AFF;
					font-size: 15px;
				}

				.data:before {
					content: '';
					display: block;
					height: 16px;
					width: 16px;
					background: #1177DD;
					margin-right: 10px;
					border-radius: 50%;
				}

				.temperature {
					float: right;
					color: #70ad47;
				}

				.temperature-error {
					color: #bf0a0a;
				}

				.situation {
					margin: 10px 0;
				}

				.address {
					color: #808080;
					font-size: 12px;
				}
			}

			.item-error {
				background: none;
			}
		}
	}
</style>
