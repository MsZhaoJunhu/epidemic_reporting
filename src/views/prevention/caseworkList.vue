<template>
	<div class="caseworkList">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:;" class="aui-navBar-item" @click="backTo">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">我的上报</span>
			</div>
		</header>
		<main>
			<router-link to="/caseformAdd" class="addcase">
				<span class="addicon">+</span>
				<span>添加病例</span>
			</router-link>
			<div class="caselist">
				
				<router-link :to="{path:`/caseinternalPage/${item.infect_id}`}" tag="div" class="case-item" v-for="(item,index) in list" :key=index>
					<div class="item-left">
						<p class="item-name">
							{{item.name}}
						</p>
						<p class="item-details">
							{{item.is_patient=='1'?'接触过患者':'未接触过患者'}}
						</p>
					</div>
					<div class="item-right" v-if="item.patient_type == 0"><span class="red" />确诊病例</div>
					<div class="item-right" v-else-if="item.patient_type == 1"><span class="red" />疑似病例</div>
					<div class="item-right" v-else-if="item.patient_type == 2"><span class="red" />潜在病例</div>
					<div class="item-right" v-else><span class="red" />常规病例</div>
				</router-link>
				
			</div>
		</main>
	</div>
</template>

<script>
	export default {
		name: 'caseworkList',
		data() {
			return {
				list:''
			}
		},
		created(){
			const that = this
			that.loading = that.$toast.loading();
			this.$api.caseList().then(function(res){
				console.info(res)
				if(res.data.code == 200){
					that.loading.hide();
					that.list = res.data.list
				}
			})
		},
		methods: {
			backTo() {
				this.$router.go(-1)
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/assets/skin/css/index.scss";

	.caseworkList {
		.addcase {
			margin: 10px 0;
			padding: 5px 20px;
			border-top: 1px solid #e4e4e4;
			border-bottom: 1px solid #e4e4e4;

			.addicon {
				padding: 0 4px;
				display: inline-block;
				margin-right: 5px;
				border: 1px solid #e4e4e4;
				border-radius: 50%;
			}
		}

		.caselist {
			.case-item {
				border-bottom: 1px solid #e4e4e4;
				padding: 5px 20px;

				.item-left {
					width: 50%;
					display: inline-block;

					.item-name {}

					.item-details {}
				}

				.item-right {
					float: right;
					margin-top: 10px;

					span {
						display: inline-block;
						margin-right: 8px;
						width: 8px;
						height: 8px;
						border-radius: 50%;
					}

					.red {
						background: #ff0000;
					}
				}

				.item-right:after {
					content: "  >";
				}
			}

			.case-item:first-child {
				border-top: 1px solid #e4e4e4;
			}
		}
	}
</style>
