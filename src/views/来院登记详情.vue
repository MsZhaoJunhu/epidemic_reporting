<template>
	<div class="actionReport">
		<div class="fixed">
			<TopHeader title="入院登记详情" isShow="true" class="header"></TopHeader>
		</div>
		<ul>
			<li>
				<span>姓名</span>
				<span>{{info.user_name}}</span>
			</li>
			<li>
				<span>身份证号</span>
				<span>{{info.id_card}}</span>
			</li>
			<li>
				<span>电话</span>
				<span>{{info.mobile}}</span>
			</li>
			<li>
				<span>体温</span>
				<span>{{info.temperature}}</span>
			</li>
			<li>
				<span>症状</span>
				<span>{{info.symptom}}</span>
			</li>
			<li>
				<span>来院事由</span>
				<span v-if="info.type==1">门诊/急诊就诊</span>
				<span v-else-if="info.type==2">住院</span>
				<span v-else-if="info.type==3">探视</span>
				<span v-else-if="info.type==4">办公</span>
				<span v-else-if="info.type==5">其他</span>
			</li>
			<li class="col">
				<span>14天内是否有武汉及周边或其他有病例报告社区的旅行史或居住史</span>
				<span>{{info.is_live?"有":"无"}}</span>
			</li>
			<li class="col">
				<span>14天内是否曾接触过来自武汉及周边或来自有病例报告社区的发热或有呼吸道症状的患者</span>
				<span>{{info.is_contact?"有":"无"}}</span>
			</li>
			<li class="col">
				<span>有无新型冠状病毒肺炎确诊或疑似病例接触史</span>
				<span>{{info.is_contact_patient?"有":"无"}}</span>
			</li>
			<li class="col">
				<span>有无密切接触持续发热（三天以上）病人</span>
				<span>{{info.is_contact_hot?"有":"无"}}</span>
			</li>
			<li class="col">
				<span>所在社区、楼栋、单位等有无聚集性发病</span>
				<span>{{info.is_collective_disease?"有":"无"}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
	import TopHeader from '../components/TopHeader.vue'
	export default {
		name: '',
		components: {
			TopHeader
		},
		data() {
			return {
				info:''
			}
		},
		created() {
			this.getInfo();
		},
		methods: {
			getInfo() {
				const that = this
				that.loading = that.$toast.loading();
				this.$api.hospitalRegistrationDetails(that.$route.params.id).then(function(res) {
					console.info(res)
					switch (res.data.code) {
						case 200:
						that.info = res.data.info
							that.loading.hide()
							break;
						case 500:
							that.loading.hide()
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
	.col{
		display: flex;
		flex-direction: column;
		span:last-of-type{
			margin-top: 10px;
		}
	}
	.check {
		color: #007AFF;
		box-sizing: border-box;
		border-bottom: 2px solid #007AFF;
	}

	.tabbar {
		display: flex;
		background: #FFFFFF;
		justify-content: space-around;

		span {
			font-size: 13px;
			padding: 10px;
		}
	}

	.header {
		background: #fff;
	}

	.actionReport {
		height: 100%;
		display: flex;
		flex-direction: column;
		background: rgba(0, 0, 0, .05);
	}

	ul,
	li {
		padding: 0;
		margin: 0;
	}
	ul{
		height: 100%;
	}

	li {
		display: flex;
		margin: 10px;
		border-radius: 5px;
		background: rgba(255, 255, 255, .8);
		padding: 10px 15px;
		font-size: 13px;
		justify-content: space-between;
		span:last-of-type{
			opacity: .5;
		}
	}

	p {
		margin: 0;
		font-size: 13px;
		opacity: .6;
	}

	h4 {
		font-weight: normal;
		margin: 0;
	}

	.operate {
		font-size: 12px;
		display: flex;
		width: 100%;
		justify-content: space-around;
		align-items: center;
		span{
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 10px;
			svg{
				margin-bottom: 10px;
			}
		}
	}

	.isTijiao {
		display: flex;
		align-items: center;
		font-size: 12px;

	}

	.tijiao {
		border-radius: 50%;
		height: 20px;
		width: 20px;
		background: #007AFF;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 5px;
	}

	.tijiao:after {
		content: '';
		display: block;
		height: 5px;
		width: 10px;
		border: 3px solid #fff;
		border-top: 0;
		border-right: 0;
		transform: rotateZ(-45deg) translateY(-2px) translateX(1px);
	}

</style>
