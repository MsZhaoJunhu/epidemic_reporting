<template>
	<section class="aui-flexView">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:history.back(-1);" class="aui-navBar-item">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">{{obj.update_time}} 组织消毒防护记录</span>
			</div>
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-sys"></i>
			</a>
		</header>
		<section class="aui-scrollView">
			<div class="aui-view-box">
				<div class="disinfection-fir-div">
					<p>组织消毒防护执行上报</p>
					<span>为了做好新型冠状病毒感染肺炎的防控，请各企业相关负责人执行消毒工作后如实提交消毒情况及视频，谢谢配合。</span>
				</div>
                <div class="disinfection-table">
                    <div>
                        <div class="disinfection-fir-td disinfection-start">任务描述</div>
                        <div class="disinfection-sec-td">
                            {{obj.task_description}}
                        </div>
                    </div>
                    <div>
                        <div class="disinfection-fir-td disinfection-start">消毒场所</div>
                        <div class="disinfection-sec-td">
                            {{obj.position}}
                        </div>
                    </div>
                    <div>
                        <div class="disinfection-fir-td disinfection-start">执行人员</div>
                        <div class="disinfection-sec-td">
                            {{obj.name}}
                        </div>
                    </div>
                </div>
				<div class="disinfection-imgDiv-par">
					<span class="start" style="margin-left:0.5rem;">消毒照片</span>
					<div class="disinfection-img-par">
						<img :src="item" alt="缩略图点击看大图" v-for="item in imgList1">
					</div>
				</div>
				<div class="disinfection-special-par disinfection-special-marginTop">
					<div class="disinfection-fir-td">防控物资</div>
					<div class="disinfection-sec-td">
						<textarea rows="3" disabled v-model="obj.explain"></textarea>
					</div>
				</div>
				<div class="disinfection-imgDiv-par">
					<span class="start" style="margin-left:0.5rem;">防护照片</span>
					<div class="disinfection-img-par">
						<img :src="item" alt="缩略图点击看大图" v-for="item in imgList2">
					</div>
				</div>
			</div>
		</section>
	</section>
</template>

<script>
	export default {
        name: "disinfections",
        data() {
            return {
                disinfection:this.$route.query.disinfection,
                obj:"",
                imgList1:[],
                imgList2:[],
            }
        },
		mounted(){
			const that = this;
            let token=localStorage.getItem('token')
            that.loading = that.$toast.loading();
			this.$api.disinfection_record().then(function(value) {
                    that.loading.hide();
                    that.obj=value.data.data[that.disinfection]
                    that.imgList1=that.obj.site_photo.split(",")
                    that.imgList2=that.obj.protective_picture.split(",")
                }
            )
        },
        methods: {
			
		},
	};
</script>

<style lang="scss" scoped>
	@import '../assets/skin/css/tijiao.scss';
	@import '../assets/skin/css/jquery-labelauty.scss';
	@import "../assets/skin/css/disinfection.scss";

	ul {
		list-style-type: none;
	}

	li {
		display: inline-block;
	}

	li {
		margin: 10px 0;
	}

	input.labelauty+label {
		font: 12px "Microsoft Yahei";
	}
</style>