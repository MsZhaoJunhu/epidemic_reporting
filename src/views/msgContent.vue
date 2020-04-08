<template>
	<section class="aui-flexView">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">文章详情</span>
			</div>

		</header>
		<section class="aui-scrollView">
			<div class="aui-flex">
				<div class="aui-live-img">
					<img :src="info.article_image" alt="">
					<span class="aui-live-tag">{{info.article_label}}</span>
				</div>
				<div class="aui-flex-box">
					<h2>{{info.article_title}}</h2>
					<p>作者：{{info.article_author}}</p>
					<span>{{info.publish_time}}</span>
				</div>
			</div>

			<div class="divHeight"></div>




			<div class="divHeight"></div>
			<div class="aui-live-header">
				<h2>内容详情</h2>
				<p>{{info.article_content}}</p>
			</div>

		</section>

	</section>
</template>

<script>
	export default {
		data() {
			return{
				info:''
			}
		},
		created(){
			const that = this
			this.$api.QADetail(this.$route.params.id).then(function(res){
				console.info(res)
				that.info = res.data.data
			})
		}
	};
</script>

<style lang="scss" scoped>
	@import '../assets/../assets/skin/css/content.scss';
</style>
