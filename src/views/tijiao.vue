<template>
	<section class="aui-flexView">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">健康信息上报</span>
			</div>
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-sys"></i>
			</a>
		</header>
		<section class="aui-scrollView">
			<div class="aui-view-box">
				<div class="aui-view-box-item">
					<h2>您的基本信息:</h2>
					<input type="text" placeholder="输入姓名">
					<input type="text" placeholder="输入电话号码">
					<input type="text" placeholder="身份证">
					<input type="text" placeholder="所在小区">
					<input type="text" placeholder="楼栋及房号">
				</div>


				<div class="aui-view-box-item">
					<h2>是否接触过武汉人员:</h2>
					<ul class="dowebok">
						<li><input type="radio" name="radio" data-labelauty="是"></li>
						<li><input type="radio" name="radio" data-labelauty="否"></li>
						<li><input type="radio" name="radio" data-labelauty="不清楚"></li>
					</ul>
				</div>

				<div class="aui-view-box-item">
					<h2>最近两周是否乘坐以下交通工具:</h2>
					<ul class="dowebok">
						<li><input type="checkbox" name="checkbox" disabled checked data-labelauty="公交"></li>
						<li><input type="checkbox" name="checkbox" data-labelauty="飞机"></li>
						<li><input type="checkbox" name="checkbox" data-labelauty="火车"></li>
						<li><input type="checkbox" name="checkbox" data-labelauty="汽车"></li>

					</ul>
				</div>
				<div class="aui-view-box-item">
					<h2>是否有以下症状:</h2>
					<ul class="dowebok">
						<li><input type="checkbox" name="checkbox" disabled checked data-labelauty="发烧"></li>
						<li><input type="checkbox" name="checkbox" data-labelauty="咳嗽"></li>
						<li><input type="checkbox" name="checkbox" data-labelauty="乏力"></li>
						<li><input type="checkbox" name="checkbox" data-labelauty="全身酸痛"></li>
						<li><input type="checkbox" name="checkbox" data-labelauty="头疼"></li>
						<li><input type="checkbox" name="checkbox" data-labelauty="其它"></li>
						<li><input type="checkbox" name="checkbox" data-labelauty="无症状"></li>
					</ul>
				</div>


				<div class="aui-view-box-item">
					<h2>您的问题或建议:</h2>
					<textarea>输入个人意见反馈,字数在200字以内</textarea>
				</div>

				<div class="aui-btn-submit">
					<button>提交建议</button>
				</div>
			</div>
		</section>
	</section>
</template>

<script>
	export default {
		name: "tijiao",
		mounted(){
			
		}
	};
</script>

<style lang="scss" scoped>
	@import '../assets/skin/css/tijiao.scss';
	@import '../assets/skin/css/jquery-labelauty.scss';
	ul{list-style-type: none;}
	li{display: inline-block;}
	li{margin: 10px 0;}
	input.labelauty + label{font:12px "Microsoft Yahei";}
</style>
