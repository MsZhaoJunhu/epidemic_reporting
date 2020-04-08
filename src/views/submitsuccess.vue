<template>
	<div class="submitsuccess">
		<header class="aui-navBar aui-navBar-fixed">
			<!-- <a href="javascript:;" class="aui-navBar-item" @click="backTo">
        <i class="icon icon-return"></i>
      </a> -->
			<div class="aui-center">
				<span class="aui-center-title">上报成功</span>
			</div>
		</header>
		<main>
			<div>
				<div class="logo">
					<i></i>
					<!-- <img src="../assets/skin/images/icon-item-02.png" alt="" /> -->
					<!-- <p>上报成功</p> -->
				</div>
				<p class="title">上报成功!</p>
				<p class="title">感谢您对防控工作的支持!</p>
			</div>
			<div>
				<div style="transform: translateY(20px);" class="btnimg" @click="backHome" >
					<span>返回首页</span>
					<img src="../assets/skin/icon/button.png" alt="" width="80%">
				</div>
				<button class="button" @click="toRecord" v-if="recordType == 'health'">
					查看我的健康状况上报记录
				</button>
				<button class="button" @click="toRecord" v-else>
					查看我的行为轨迹上报记录
				</button>
			</div>
		</main>
	</div>
</template>

<script>
	export default {
		name: '',
		data() {
			return{
				recordType: this.$route.query.record
			}
		},
		methods: {
			backHome() {
				this.$router.push({
					path: '/index'
				})
			},
			toRecord() {
				this.$router.push({
					path: '/reportRecord',
					query: {
						recordType: this.recordType
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/skin/css/index.scss';
	.submitsuccess{
		height: 100%;
		display: flex;
		flex-direction: column;
		main{
			padding: 50px 0;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			text-align: center;
			.logo{
				box-shadow:0 0 0 5px rgba(0,122,255,.2);
				width: 80px;
				height: 80px;
				margin: 20px auto;
				padding: 30px 0;
				background: #1133FF;
				border-radius: 50%;
				border: 1px solid #2f528f;
				display: flex;
				justify-content: center;
				align-items: center;
				i {
					display: block;
					height: 20px;
					width: 40px;
					border: 4px solid #FFFFFF;
					border-right: none;
					border-top: none;
					transform: rotateZ(-45deg);
				}
				p {
					color: #fff;
				}
			}
			.title {
				font-size:16px;
			}
			.button {
				display: block;
				width: 78%;
				padding: 12px;
				margin: 15px auto;
				background: transparent;
				border: 1px solid rgb(26,123,220,.5);
				border-radius: 50px;
				color: #1a7bdc;
			}
			.button-blue {
				background: #4472c4;
				border: 1px solid #2f528f;
			}
		}
	}
	.btnimg{
		display: flex;
		justify-content: center;
		span{
			top: 13px;
			position: absolute;
			color: #fff;
		};
	}
</style>
