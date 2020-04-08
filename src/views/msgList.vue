<template>
	<section class="aui-flexView">

		<section class="aui-scrollView">

			<div class="aui-palace b-line">
				<a href="javascript:;" class="aui-palace-grid">
					<div class="aui-palace-grid-icon">
						<img src="../assets/skin/images/icon-001.png" alt="">
					</div>
					<div class="aui-palace-grid-text">
						<h2>最新疫情</h2>
					</div>
				</a>
				<a href="javascript:;" class="aui-palace-grid">
					<div class="aui-palace-grid-icon">
						<img src="../assets/skin/images/icon-002.png" alt="">
					</div>
					<div class="aui-palace-grid-text">
						<h2>健康问答</h2>
					</div>
				</a>
				<!-- <a href="javascript:;" class="aui-palace-grid">
					<div class="aui-palace-grid-icon">
						<img src="../assets/skin/images/icon-003.png" alt="">
					</div>
					<div class="aui-palace-grid-text">
						<h2>真假辟谣</h2>
					</div>
				</a> -->
			</div>
			<div class="aui-news-list">
				<router-link to='' class="aui-flex b-line" v-for="item in ">
					<div class="aui-flex-box">
						<h2><em>精</em> <i>热</i>未来五年，金融行业哪个职业最吃香？（附金融行业薪酬表）</h2>
						<p><em>2018-12-09</em> <em>2389阅读</em></p>
					</div>
					<div class="aui-news-img">
						<img src="../assets/skin/images/ad-001.png" alt="">
					</div>
				</router-link>
				
			</div>
			<div style="height:60px;"></div>
		</section>
	</section>
</template>

<script>
	export default {
		data() {

		},
	};
</script>

<style lang="scss" scoped>
	@import '../assets/../assets/skin/css/news.scss';
	.aui-palace{
		width: 100%;
		display: flex;
		justify-content:space-around;
	}
</style>
