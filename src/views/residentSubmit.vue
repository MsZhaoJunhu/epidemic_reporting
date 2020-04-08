<template>
	<section class="aui-flexView">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:history.back(-1);" class="aui-navBar-item">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">居民信息上报</span>
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
                            {{name||''}}
                        </div>
                    </div>
                    <div>
                        <div class="resumption-fir-td">身份证</div>
                        <div class="resumption-sec-td">
                            {{id||''}}
                        </div>
                    </div>
                    <div>
                        <div class="resumption-fir-td">电话</div>
                        <div class="resumption-sec-td">
                            {{phone||''}}
                        </div>
                    </div>
                    <div>
                        <div class="resumption-fir-td">进出</div>
                        <div class="resumption-sec-td">
                            <select @change="changeInOrOut($event)" style="width:6rem;border:0px;">
                                <option value="1" selected>进</option>
                                <option value="2">出</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div class="resumption-fir-td">体温</div>
                        <div class="resumption-sec-td">
                            {{temperature||''}}
                            <span class="cursor-blink" style="display:none;">&nbsp;</span>
                            <span class="colorHuiSe" v-show="!temperature">请输入进入时体温度数</span>
                        </div>
                        <input type="number" v-model="temperature" @focus="clickShowCursor($event)" @blur="clickNotShowCursor($event)">
                    </div>
                    <div class="resumption-special-par resumption-special-marginTop">
                        <div class="resumption-fir-td">进入事项</div>
                        <div class="resumption-sec-td">
                            <textarea rows="3" v-model="getThing" placeholder="请详细说明进入事项"></textarea>
                        </div>
                    </div>
                </div>
                <div class="resumption-btn-par">
                    <button @click="resumptionSubmit">提交</button>
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
                // 提交时间,目的地,体温
                name:"自动获取",
                id:"自动获取",
                phone:"自动获取",
                temperature:"",
                where:"",
                getThing:"",
                qiyeid:"",
                inorout:1
            }
        },
		mounted(){
            // 自动获取 name,id,phone
            let user =JSON.parse(localStorage.getItem("UserInfo"));
            this.name=user.real_name;
            this.id=user.id_card;
            this.phone=user.mobile;
            this.qiyeid=this.$route.query.id
        },
        methods: {
            changeInOrOut(e){
                this.inorout=e.target.value
            },
            resumptionSubmit(){
                const that = this;
                // 调接口
                that.loading = that.$toast.loading();
                that.$api.residentSubmit_add(
                    that.qiyeid,
                    that.temperature,
                    that.getThing,
                    that.inorout
                ).then(function(value) {
                        switch (value.data.code){
                            case 200:
                                that.loading.hide();
                                // 成功跳转
                                    that.$router.push("residentList")
                                break;
                            default:
                                that.$toast.text(value.data.msg)
                                that.loading.hide();
                                break;
                        }
                    }
                )
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
