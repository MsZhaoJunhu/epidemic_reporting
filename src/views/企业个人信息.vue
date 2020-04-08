<template>
	<div class="actionReport">
		<div class="fixed">
			<TopHeader title="组织员工列表" isShow="true" class="header"></TopHeader>
		</div>
		<ul>
			<li>
				<span>姓名</span>
				<span>{{info.real_name}}</span>
			</li>
			<li>
				<span>年龄</span>
				<span>{{info.age}}</span>
			</li>
			<li>
				<span>生日</span>
				<span>{{info.birthday}}</span>
			</li>
			<li>
				<span>身份证号</span>
				<span>{{info.id_card}}</span>
			</li>
			<li>
				<span>地址</span>
				<span>{{info.birth_address}}</span>
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
				this.$api.enterpriseUserInfo(that.$route.params.id).then(function(res) {
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
