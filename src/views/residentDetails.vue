<template>
	<section class="aui-flexView">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:history.back(-1);" class="aui-navBar-item">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">居民信息上报详情</span>
			</div>
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-sys"></i>
			</a>
		</header>
		<section class="aui-scrollView">
			<div class="aui-view-box">
				<div class="resumption-table">
                    <div>
                        <div class="resumption-fir-td">姓名</div>
                        <div class="resumption-sec-td">
                            {{obj.user_name}}
                        </div>
                    </div>
                    <div>
                        <div class="resumption-fir-td">身份证</div>
                        <div class="resumption-sec-td">
                            {{obj.id_card}}
                        </div>
                    </div>
                    <div>
                        <div class="resumption-fir-td">电话</div>
                        <div class="resumption-sec-td">
                            {{obj.mobile}}
                        </div>
                    </div>
                    <div>
                        <div class="resumption-fir-td">体温</div>
                        <div class="resumption-sec-td">
                            {{obj.temperature}}℃
                        </div>
                    </div>
                    <div>
                        <div class="resumption-fir-td">公司</div>
                        <div class="resumption-sec-td">
                            {{obj.enterprise_name}}
                        </div>
                    </div>
                    <div>
                        <div class="resumption-fir-td">进出</div>
                        <div class="resumption-sec-td">
                            {{obj.in_or_out=='1'?'进':'出'}}
                        </div>
                    </div>
                    <div class="resumption-special-par resumption-special-marginTop">
                        <div class="resumption-fir-td">进入事项</div>
                        <div class="resumption-sec-td" style="text-align:left;">
                            {{obj.matter}}
                        </div>
                    </div>
                </div>
			</div>
		</section>
	</section>
</template>

<script>
	export default {
        name: "resumptions",
        data() {
            return {
                obj:""
            }
        },
		mounted(){
            const that = this;
            // 调接口
            that.loading = that.$toast.loading();
            that.$api.resident_detail(this.$route.params.id).then(function(value) {
                    switch (value.data.code){
                        case 200:
                            that.loading.hide();
                            that.obj=value.data.info
                            // obj
                            break;
                        default:
                            that.$toast.text(value.data.msg)
                            that.loading.hide();
                            break;
                    }
                }
            )
        },
        methods: {
            
            resumptionSubmit(){
                
            },
            clickShowCursor(e){
                e.target.previousElementSibling.firstElementChild.style.display="inline-block";
            },
            clickNotShowCursor(e){
                e.target.previousElementSibling.firstElementChild.style.display="none";
            }
        },
	};
</script>

<style lang="scss" scoped>
	@import '../assets/skin/css/tijiao.scss';
	@import '../assets/skin/css/jquery-labelauty.scss';
    @import "../assets/skin/css/resumption.scss";
	ul{list-style-type: none;}
	li{display: inline-block;}
	li{margin: 10px 0;}
	input.labelauty + label{font:12px "Microsoft Yahei";}
</style>
<style>
.nut-imagepicker .img-list .img-item{
    margin: 0 !important;
    width: calc(100%/3) !important;
}
.nut-imagepicker .img-list .img-item a img,.nut-imagepicker .img-list .add-icon{
    width: 100px !important;
    height: 100px !important;
}
.nut-imagepicker .img-list{
    width: 100%
}
.nut-imagepicker .img-list>span{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}
.cursor-blink {
    display: inline-block;
    width: 1px;
    height: 1rem;
    transform: translateY(2px);
    animation: blink 1s infinite steps(1, start);
}
/*这里设置动画blink*/
@keyframes blink {
    0%, 100% {
        background-color: #000;
        color: #aaa;
    }
    50% {
        background-color: #bbb; /* not #aaa because it's seem there is Google Chrome bug */
        color: #000;
    }
}
</style>
