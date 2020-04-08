<template>
	<div class="包裹">
		<TopHeader title="通行证申请详情" isShow="true" class="header"></TopHeader>
		<div>
			<div class="box">
				<h2>
					<span>
						{{userInfo.real_name}}
					</span>
					<button v-if="info.status == 1">待公司审核</button>
					<button v-else-if="info.status == 2">待辖区审核</button>
					<button v-else-if="info.status == 3" class="red">已拒绝</button>
					<button v-else-if="info.status == 4 && info.date != info.end_date" class="green" >已发放</button>
					<button v-else-if="info.status == 4 && info.date == info.end_date" class="gray">已过期</button>
				</h2>
			</div>
			<div class="box">
				<p>
					身份证号：
					<span>{{userInfo.id_card}}</span>
				</p>
				<p>
					联系方式：
					<span>{{userInfo.mobile}}</span>
				</p>
			</div>
			<div class="box">
				<p>
					临时访问企业：
					<span>{{info.enterprise_name}}</span>
				</p>
				<p>
					通行时间：
					<span>{{info.start_date}} 至 {{info.end_date}}</span>
				</p>
			</div>
			<div class="box">
				<h3>访问事由</h3>
				<p class="all">
					{{info.visit_reason}}
				</p>
			</div>
			<div class="box" v-if="info.audit_remarks != null">
				<h3>公司审核备注</h3>
				<p class="all">
					{{info.audit_remarks}}
				</p>
			</div>
			<div class="box" v-if="info.bailiwick_remarks != null">
				<h3>辖区审核备注</h3>
				<p class="all">
					{{info.bailiwick_remarks}}
				</p>
			</div>
			<div class="box">
				<h3>证明材料</h3>
				<p class="img_box">
					<span :class="{select:1}">
						<img :src="info.letter_of_commitment" alt="" width="100%">
					</span>
					<span>
						<img :src="info.trajectory" alt="" width="100%">
					</span>
				</p>
			</div>
			
		</div>
	</div>
</template>

<script>
	import TopHeader from '@/components/TopHeader.vue'
	export default {
		components: {
			TopHeader
		},
		data() {
			return {
				info:'',
				userInfo:JSON.parse(localStorage.getItem('UserInfo'))
			}
		},
		created() {
			const that = this
			that.info = JSON.parse(that.$route.query.info)
		}
	}
</script>
<style lang="scss" scoped>
	.img_box{
		display: flex;
		flex-direction: column;
		span{
			border: 1px solid rgba(0,0,0,.2);
			margin-bottom: 10px;
		}
	}
	.green {
		background: #29D9A6 !important;
	}
	.red {
		background: #F44331 !important;
	}
	
	.gray {
		background: gray !important;
	}
	.box{
		padding:0 15px;
		border-top: 1px solid rgba(0,0,0,.05);
	}
	.box:first-child{
		padding: 15px;
		border-top: 1px solid rgba(0,0,0,.05);
	}
	h2 {
		display: flex;
		font-size: 16px;
		font-weight: normal;
		margin: 0;
		justify-content: space-between;
		span {
			display: inline-block;
		}

		button {
			flex-shrink: 0;
			background: #007AFF;
			font-size: 9px;
			border: none;
			height: 16px;
			padding: 0 7px;
			margin-top: 3px;
			color: #fff;
			border-radius: 50px;
			margin-left: 5px;
		}
	}
	h3{
		font-size: 13px;
		font-weight: normal;
	}
	p{
		font-weight: 500;
		font-size: 11px;
		opacity: .8;
		span{
			opacity: .6;
		}
	}
	.all{
		margin: 0 !important;
		padding-bottom: 10px;
		font-size: 10px;
		opacity: .6;
	}
</style>
