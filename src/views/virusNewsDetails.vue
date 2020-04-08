<template>
	<section class="aui-flexView">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:history.back(-1);" class="aui-navBar-item">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">文章详情</span>
			</div>
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-sys"></i>
			</a>
		</header>
		<section class="aui-scrollView">
			<div class="aui-view-box">
				<div class="virusNewsDetails-fir-par">
					<div class="virusNewsDetails-fir-imgPar">
						<img :src="info.article_image" alt="">
						<!-- <div class="virusNewsDetails-fir-position">疫情问答</div> -->
					</div>
					<div class="virusNewsDetails-fir-pPar">
						<p>{{info.article_title}}</p>
						<p>作者:&nbsp;{{info.article_author}}</p>
						<p>{{info.created_time}}</p>
					</div>
				</div>
				<div class="virusNewsDetails-sec-par">
					<h6>内容详情</h6>
					<p>{{info.article_content}}</p>
				</div>
			</div>
		</section>
	</section>
</template>

<script>
	export default {
        data() {
            return {
                info:"",
            }
        },
		mounted(){
			console.log(this.$route.params.value)
			const that = this
			this.$api.QADetail(this.$route.params.id,this.$route.params.value).then(function(res){
				console.info(res)
				that.info = res.data.data
			})
        },
        methods: {
        },
	};
</script>

<style lang="scss" scoped>
	@import '../assets/skin/css/tijiao.scss';
	@import '../assets/skin/css/jquery-labelauty.scss';
    @import "../assets/skin/css/virusNewsDetails.scss";
	ul{list-style-type: none;}
	li{display: inline-block;}
	li{margin: 10px 0;}
	input.labelauty + label{font:12px "Microsoft Yahei";}
</style>
<style scoped>
	.aui-navBar{
		width: auto;
		margin: 0 0.5rem;
	}
    .aui-scrollView{
        background: rgb(245, 245, 245)
	}
	.aui-flexView{
        background: rgb(245, 245, 245)
	}
</style>
