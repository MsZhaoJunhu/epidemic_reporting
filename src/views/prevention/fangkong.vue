<template>
	<section class="aui-flexView">
		<section class="aui-scrollView">
			<div class="aui-ass-box">
				<h2>联防联控中心</h2>
				<h3></h3>
				<h4>{{info.mobile}}</h4>
				<div class="aui-palace aui-palace-one">
					<div class="aui-palace-grid">
						<h2>职位：{{info.role}}</h2>
					</div>
					<div class="aui-palace-grid">
						<h2>姓名：{{info.user_name}}</h2>
					</div>
				</div>
			</div>
			<div class="aui-palace aui-palace-two mainMenu">
				<router-link to="/addTask" class="aui-palace-grid">
					<div class="aui-palace-grid-icon">
						<img src="../../assets/skin/images/nav-001.png" alt="">
					</div>
					<div class="aui-palace-grid-text">
						<h1>新增任务</h1>

					</div>
				</router-link>
				<router-link to="/taskList" class="aui-palace-grid">
					<div class="aui-palace-grid-icon">
						<img src="../../assets/skin/images/nav-002.png" alt="">
					</div>
					<div class="aui-palace-grid-text">
						<h1>任务列表</h1>

					</div>
				</router-link>
				<router-link to="/caseworkList" class="aui-palace-grid">
					<div class="aui-palace-grid-icon">
						<img src="../../assets/skin/images/nav-003.png" alt="">
					</div>
					<div class="aui-palace-grid-text">
						<h1>病例上报</h1>
				
					</div>
				</router-link>
			</div>
			<!-- <div class="aui-palace aui-palace-two">
				
				<a href="javascript:;" class="aui-palace-grid b-in">
					<div class="aui-palace-grid-icon">
						<img src="../../assets/skin/images/nav-004.png" alt="">
					</div>
					<div class="aui-palace-grid-text">
						<h1>排查列表</h1>

					</div>
				</a>
				<a href="javascript:;" class="aui-palace-grid r-line b-in">
					<div class="aui-palace-grid-icon">
						<img src="../../assets/skin/images/nav-005.png" alt="">
					</div>
					<div class="aui-palace-grid-text">
						<h1>新增登记人</h1>

					</div>
				</a>
				<a href="javascript:;" class="aui-palace-grid r-line b-in">
					<div class="aui-palace-grid-icon">
						<img src="../../assets/skin/images/nav-006.png" alt="">
					</div>
					<div class="aui-palace-grid-text">
						<h1>登记人列表</h1>

					</div>
				</a>
				<a href="javascript:;" class="aui-palace-grid r-line">
					<div class="aui-palace-grid-icon">
						<img src="../../assets/skin/images/nav-007.png" alt="">
					</div>
					<div class="aui-palace-grid-text">
						<h1>新增病例</h1>

					</div>
				</a>
				<a href="javascript:;" class="aui-palace-grid">
					<div class="aui-palace-grid-icon">
						<img src="../../assets/skin/images/nav-008.png" alt="">
					</div>
					<div class="aui-palace-grid-text">
						<h1>病例列表</h1>

					</div>
				</a>
			</div> -->

		</section>
		<tabbar></tabbar>
	</section>
</template>

<script>
	import tabbar from '@/components/tabbar2.vue'
	export default {
		name: "fangkong",
		components:{
			tabbar
		},
		data(){
			return{
				info:JSON.parse(localStorage.getItem('Pinfo'))
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../assets/skin/css/fangkong.scss";
	.mainMenu{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.mainMenu >*{
		width: 90% !important;
		padding: 10px !important;
		margin-bottom: 20px !important;
		box-shadow: 0 0 5px rgba(0,0,0,.2);
		border-radius: 5px;
		
	}
</style>
