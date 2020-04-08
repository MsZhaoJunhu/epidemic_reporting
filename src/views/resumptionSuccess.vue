<template>
	<section class="aui-flexView">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:history.back(-1);" class="aui-navBar-item">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">提交成功</span>
			</div>
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-sys"></i>
			</a>
		</header>
		<section class="aui-scrollView">
			<div class="aui-view-box">
                <div class="resumptionSuccess-par">
                    <div class="resumptionSuccess-img-par">
						<nut-icon 
							type="tick"
							size="40px"
							color="#fff"
						>
						</nut-icon>
                        <p>提交成功!</p>
                    </div>
                </div>
                <p class="resumptionSuccess-p">请前往机构中心查看申报进度</p>
                <div class="resumptionSuccess-btn-par">
                    <button class="resumptionSuccess-btn" @click="confirm">前往首页</button>
                </div>
                <div class="resumptionSuccess-btn-par">
                    <button class="resumptionSuccess-btn" @click="checkRecord">查看复工登记记录</button>
                </div>
			</div>
		</section>
	</section>
</template>

<script>
	export default {
        name: "resumptions",
		mounted(){
			
        },
        methods: {
            confirm(){
                this.$router.push("index")
			},
			checkRecord(){
                this.$router.push("resumptionList")
			}
        },
	};
</script>

<style lang="scss" scoped>
	@import '../assets/skin/css/tijiao.scss';
	@import '../assets/skin/css/jquery-labelauty.scss';
    @import "../assets/skin/css/resumptionSuccess.scss";
	ul{list-style-type: none;}
	li{display: inline-block;}
	li{margin: 10px 0;}
	input.labelauty + label{font:12px "Microsoft Yahei";}
</style>
<style>
	.resumptionSuccess-btn-par+.resumptionSuccess-btn-par{
		margin: 1rem 0 !important;
	}
</style>
