<template>
	<section class="aui-flexView">
		<section class="aui-scrollView">
			<div class="aui-reg-body" style="padding-top:15px;">
				<!-- <div class="aui-reg-banner">
					<img src="skin/images/banner.png" alt="">
				</div> -->
				<div class="aui-flex aui-flex-color">
					<div class="aui-news-img">
						<img src="../assets/skin/images/news.png" alt="">
					</div>
					<div class="aui-flex-box">
						<div class="box">
							<div class="t_news">
								<ul class="news_li">
									<li>
										<a href="javascript:return false;">疫情应急上报系统开始试运行！</a>
									</li>
								</ul>
								<ul class="swap"></ul>
							</div>
						</div>
					</div>
				</div>
				
				<div class="aui-cell-item" v-show="UserType == 'mycenter' || UserType == null">
					<h2>个人信息上报</h2>
					<div class="aui-palace aui-palace-one">
						<router-link to='/jubao' class="aui-palace-grid">
							<div class="aui-palace-grid-icon">
								<img src="../assets/skin/images/icon-item-01.png" alt="">
							</div>
							<div class="aui-palace-grid-text">
								<h3>违规举报</h3>
							</div>
						</router-link>
						<router-link to='/affiliatedEnterprises' class="aui-palace-grid">
							<div class="aui-palace-grid-icon">
								<img src="../assets/skin/images/icon-item-02.png" alt="">
							</div>
							<div class="aui-palace-grid-text">
								<h3>健康上报</h3>
							</div>
						</router-link>
						<router-link to='/affiliatedEnterprises' class="aui-palace-grid">
							<div class="aui-palace-grid-icon">
								<img src="../assets/skin/images/icon-item-03.png" alt="">
							</div>
							<div class="aui-palace-grid-text">
								<h3>轨迹上报</h3>
							</div>
						</router-link>
					</div>
				</div>
				
				<div class="aui-cell-item" v-show="UserType == 'mycompany' || UserType == null">
					<h2>组织信息上报</h2>
					<div class="aui-palace aui-palace-one">
						<router-link to='/resumption' class="aui-palace-grid">
							<div class="aui-palace-grid-icon">
								<img src="../assets/skin/images/icon-item-04.png" alt="">
							</div>
							<div class="aui-palace-grid-text">
								<h3>组织复工上报</h3>
							</div>
						</router-link>
						<router-link to='/staffHealthy' class="aui-palace-grid">
							<div class="aui-palace-grid-icon">
								<img src="../assets/skin/images/icon-item-05.png" alt="">
							</div>
							<div class="aui-palace-grid-text">
								<h3>员工健康上报</h3>
							</div>
						</router-link>
						<router-link to='/disinfection' class="aui-palace-grid">
							<div class="aui-palace-grid-icon">
								<img src="../assets/skin/images/icon-item-06.png" alt="">
							</div>
							<div class="aui-palace-grid-text">
								<h3>组织消毒上报</h3>
							</div>
						</router-link>
					</div>
				</div>
				
				<div class="aui-cell-item" v-show="UserType == 'mycompany' || UserType == null">
					<h2>物资发布</h2>
					<div class="aui-palace aui-palace-one">
						<!-- <router-link to='' class="aui-palace-grid">
							<div class="aui-palace-grid-icon">
								<img src="../assets/skin/images/icon-item-04.png" alt="">
							</div>
							<div class="aui-palace-grid-text">
								<h3>物资征集</h3>
							</div>
						</router-link> -->
						<router-link to='/materialDemandRelease' class="aui-palace-grid">
							<div class="aui-palace-grid-icon">
								<img src="../assets/skin/images/icon-item-05.png" alt="">
							</div>
							<div class="aui-palace-grid-text">
								<h3>物资需求发布</h3>
							</div>
						</router-link>
						<!-- <router-link to='' class="aui-palace-grid">
							<div class="aui-palace-grid-icon">
								<img src="../assets/skin/images/icon-item-06.png" alt="">
							</div>
							<div class="aui-palace-grid-text">
								<h3>物资申请</h3>
							</div>
						</router-link> -->
					</div>
				</div>


				<div class="aui-cell-item">
					<div class="aui-reg-sit">
						<router-link to='' class="aui-flex">
							<div class="aui-tag-img">
								<img src="../assets/skin/images/fo-001.png" alt="">
							</div>
							<div class="aui-flex-box">
								<h3>疫情上报</h3>
								<p>确诊病例，疑似病例上报</p>
							</div>
						</router-link>
						<router-link to='' class="aui-flex">
							<div class="aui-tag-img">
								<img src="../assets/skin/images/fo-002.png" alt="">
							</div>
							<div class="aui-flex-box">
								<h3>物资采购</h3>
								<p>医疗物资需求发布</p>
							</div>
						</router-link>
						<router-link to='' class="aui-flex">
							<div class="aui-tag-img">
								<img src="../assets/skin/images/fo-003.png" alt="">
							</div>
							<div class="aui-flex-box">
								<h3>大数据支持</h3>
								<p>通过大数据分析,提前排除疫情</p>
							</div>
						</router-link>
					</div>
				</div>
				<div class="aui-footer-bg">
					<img src="../assets/skin/images/footer-bg.png" alt="">
					<div class="aui-footer-text">
						<p>重庆城银科技股份有限公司</p>
						<!-- <h2>联系我们 <em>023-67742189</em></h2> -->
					</div>
				</div>

			</div>

		</section>
		<tabbar active='1'></tabbar>
	</section>
</template>

<script>
	import tabbar from '@/components/tabbar.vue';
	export default {
		name: "member",
		components:{
			tabbar
		},
		data(){
			return{
				showType:'',
				type:this.$route.params,
				UserType:localStorage.getItem('link')
			}
		},
		created(){
			if(this.type == this.UserType){
				
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '../assets/skin/css/style.scss';
	.aui-flexView {
		background: #1060d3;
	}
	.aui-palace{
		display: flex;
		justify-content: center;
	}
</style>
