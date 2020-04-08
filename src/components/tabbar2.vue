<template>
	<footer class="aui-footer aui-footer-fixed">
		<a @click="$router.replace({name:'fangkong'})" class="aui-tabBar-item " :class="{'aui-tabBar-item-active':active=='0'}">
			<span class="aui-tabBar-item-icon">
				<img src="../assets/skin/icon/index.png" alt="" height="25px">
			</span>
			<span class="aui-tabBar-item-text">首页</span>
		</a>

		<a @click="$router.replace({name:'my'})" class="aui-tabBar-item " :class="{'aui-tabBar-item-active':active=='1'}">
			<span class="aui-tabBar-item-icon">
				<img src="../assets/skin/icon/my.png" alt="" height="25px">
			</span>
			<span class="aui-tabBar-item-text">我的</span>
		</a>
	</footer>
</template>

<script>
	export default {
		name: "tabbar",
		props: {
			active: {
				default: '0',
				type: String
			}
				
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import '@/assets/skin/css/mycenter.scss';
	.aui-footer{
		height: 50px;
		background: #fff !important;
	}
	.aui-tabBar-item-active *{
		color: #FFA645 !important;
	}
	.aui-tabBar-item-active img{
		filter:drop-shadow(0 -100px 0 #FFA645);
		transform: translateY(100px);
	}
</style>
