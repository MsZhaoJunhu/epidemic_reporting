<template>
	<!-- <footer class="aui-footer aui-footer-fixed">
		<a @click="$router.replace({name:'index'})" class="aui-tabBar-item " :class="{'aui-tabBar-item-active':active=='0'}">
			<span class="aui-tabBar-item-icon">
				<img src="../assets/skin/icon/index.png" alt="" height="25px">
			</span>
			<span class="aui-tabBar-item-text">首页</span>
		</a>
		<a @click="$router.replace({name:'member'})" class="aui-tabBar-item " :class="{'aui-tabBar-item-active':active=='1'}">
			<span class="aui-tabBar-item-icon">
				<img src="../assets/skin/icon/fabu.png" alt="" height="20px">
			</span>
			<span class="aui-tabBar-item-text">发布</span>
		</a>
		<a @click="$router.replace({name:'materialSumbitRecord'})" class="aui-tabBar-item " :class="{'aui-tabBar-item-active':active=='2'}">
			<span class="aui-tabBar-item-icon">
				<img src="../assets/skin/icon/wuzi.png" alt="" height="20px">
			</span>
			<span class="aui-tabBar-item-text">物资</span>
		</a>
		<a @click="route_to()" class="aui-tabBar-item " :class="{'aui-tabBar-item-active':active=='3'}">
			<span class="aui-tabBar-item-icon">
				<img src="../assets/skin/icon/my.png" alt="" height="25px">
			</span>
			<span class="aui-tabBar-item-text">我的</span>
		</a>
	</footer> -->
	<footer class="aui-footer aui-footer-fixed">
		<a @click="$router.replace({name:'index'})" class="aui-tabBar-item" :class="activeNumber=='0'?'aui-tabBar-item-active':''">
			<span class="aui-tabBar-item-icon">
				<img src="../assets/skin/icon/index.png" alt="" height="25px">
			</span>
			<span class="aui-tabBar-item-text">首页</span>
		</a>
		<a v-if="link=='mycompany'" @click="$router.replace({name:'recruitment'})" class="aui-tabBar-item" :class="activeNumber=='1'?'aui-tabBar-item-active':''">
			<span class="aui-tabBar-item-icon">
				<img src="../assets/skin/icon/index.png" alt="" height="25px">
			</span>
			<span class="aui-tabBar-item-text">招工</span>
		</a>
		<a @click="$router.replace({name:'zixun'})" class="aui-tabBar-item" :class="activeNumber=='2'?'aui-tabBar-item-active':''">
			<span class="aui-tabBar-item-icon">
				<img src="../assets/skin/icon/fabu.png" alt="" height="25px">
			</span>
			<span class="aui-tabBar-item-text">资讯</span>
		</a>
	</footer>
</template>

<script>
	export default {
		name: "tabbar",
		props: {
			activeNumber:{
				default: '0',
				type: String
			},
		},
		created () {
			console.log(this.activeNumber)
		},
		data(){
			return {
				link:localStorage.getItem('link'),
			}
		},
		methods:{
			route_to(){
				if(this.link != null){
					this.$router.replace({name:this.link})
				}else{
					this.$router.push({name:this.link || 'login'})
				}
			},
			//  @click="$router.replace({name:'index'})"
			//  @click="$router.replace({name:'recruitment'})"
			//  @click="$router.replace({name:'zixun'})"
			// clickRoute(i){
			// 	this.activeNumber=i;
			// 	console.log(this.activeNumber)
			// 	switch (i) {
			// 		case 1:
			// 			this.$router.replace({name:'recruitment'})
			// 			break;
			// 		case 2:
			// 			this.$router.replace({name:'zixun'})
			// 			break;
				
			// 		default:
			// 			this.$router.replace({name:'index'})
			// 			break;
			// 	}
			// }
		}
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
		color: #3D73E7 !important;
	}
	.aui-tabBar-item-active img{
		filter:drop-shadow(0 -100px 0 #3D73E7);
		transform: translateY(100px);
	}
</style>
