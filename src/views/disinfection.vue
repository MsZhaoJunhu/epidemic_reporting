<template>
	<section class="aui-flexView">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:history.back(-1);" class="aui-navBar-item">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">{{toDay}} 组织消毒防护执行上报</span>
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
                    <div class="disinfection-special-par">
                        <div class="disinfection-fir-td disinfection-start">消毒任务描述</div>
                        <div class="disinfection-sec-td">
                            <textarea rows="3" v-model="task_description" placeholder="请输入任务描述"></textarea>
                        </div>
                    </div>
				</div>
                <div class="disinfection-special-par" style="margin-top:0.5rem;">
                    <div class="disinfection-fir-td disinfection-start">消毒场所</div>
                    <div class="disinfection-sec-td" style="line-height:3rem;">
                        <textarea rows="3" v-model="position" placeholder="请输入消毒场所名称"></textarea>
                    </div>
                </div>
                    <!-- <div>
                        <div class="disinfection-fir-td disinfection-start">消毒场所</div>
                        <div class="disinfection-sec-td">
                            {{position||''}}
                            <span class="cursor-blink" style="display:none;">&nbsp;</span>
                            <span class="colorHuiSe" v-show="!position">请输入消毒场所名称</span>
                        </div>
                        <input type="text" v-model="position" @focus="clickShowCursor($event)" @blur="clickNotShowCursor($event)">
                    </div> -->
                    
				<div class="disinfection-table">
                    <div>
                        <div class="disinfection-fir-td disinfection-start">执行人员</div>
                        <div class="disinfection-sec-td">
                            {{name||''}}
                            <span class="cursor-blink" style="display:none;">&nbsp;</span>
                            <span class="colorHuiSe" v-show="!name">请输入消毒执行人员姓名</span>
                        </div>
                        <input type="text" v-model="name" @focus="clickShowCursor($event)" @blur="clickNotShowCursor($event)">
                    </div>
				</div>
                <div class="disinfection-tr disinfection-special-marginTop disinfection-special-submitPar">
                    <span class="disinfection-fir-span">
                        <span class="disinfection-start">上传消毒执行照片</span>
                    </span>
                    <div class="disinfection-sec-div">
                        <nut-imagepicker @imgMsg="imgMsg1" :width="120" :height="120" :margin="10" :imgList.sync="imgList1" ></nut-imagepicker>
                    </div>
                </div>
                <div class="disinfection-special-par" style="margin-top:0.5rem;">
                    <div class="disinfection-fir-td disinfection-start">防护情况描述</div>
                    <div class="disinfection-sec-td" style="line-height:3rem;">
                        <textarea rows="3" v-model="explain" placeholder="请输入防护情况描述"></textarea>
                    </div>
                </div>
                <div class="disinfection-tr disinfection-special-marginTop disinfection-special-submitPar">
                    <span class="disinfection-fir-span">
                        <span class="disinfection-start">上传防护执行照片</span>
                    </span>
                    <div class="disinfection-sec-div">
                        <nut-imagepicker @imgMsg="imgMsg2" :width="120" :height="120" :margin="10" :imgList.sync="imgList2" ></nut-imagepicker>
                    </div>
                </div>
                <div class="disinfection-btn-par">
                    <button @click="disinfectionSubmit()">提交消毒防护记录</button>
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
                // 今天的时间
                toDay:"2020年2月6日",
                // 任务描述
                task_description:"",
                // 消毒场所
                position:"",
                // 执行人员
                name:"",
                // 防护情况描述
                explain:"",
                // 图片相关
                imgList1:[],
                imgList1value:[],
                imgList11:[],
                imgList2:[],
                imgList22:[],
                imgList2value:[],
            }
        },
		mounted(){
			this.toDay=this.getCurrentDate();
        },
        methods: {
            // 获取时间
            getCurrentDate(){
                var timeStr = '-';
                var curDate = new Date();
                var curYear =curDate.getFullYear();  //获取完整的年份(4位,1970-????)
                var curMonth = curDate.getMonth()+1;  //获取当前月份(0-11,0代表1月)
                var curDay = curDate.getDate();       //获取当前日(1-31)
                var curWeekDay = curDate.getDay();    //获取当前星期X(0-6,0代表星期天)
                var curHour = curDate.getHours();      //获取当前小时数(0-23)
                var curMinute = curDate.getMinutes();   // 获取当前分钟数(0-59)
                var curSec =curDate.getSeconds();      //获取当前秒数(0-59)
                var Current= curYear+timeStr+curMonth+timeStr+curDay+' '+curHour+':'+curMinute+':'+curSec;
                var Current= curYear+timeStr+curMonth+timeStr+curDay;
                // this.datetime=Current;
                return Current;
            },
            uploadImage1(){
                const that = this;
                this.$api.uploadImage(that.imgList11).then(function (value) {
                    that.imgList1value=value.data.url
                })
            },
            uploadImage2(){
                const that = this;
                this.$api.uploadImage(that.imgList22).then(function (value) {
                    that.imgList2value=value.data.url
                })
            },
            imgMsg1(data) {
				const that = this;
				if (data.code == 1) {
					alert("upload");
				}
				this.imgList11 = [];
				for (let i in that.imgList1) {
					that.imgList11.push(that.imgList1[i].src);
				}
			},
            imgMsg2(data) {
				const that = this;
				if (data.code == 1) {
					alert("upload");
				}
				this.imgList22 = [];
				for (let i in that.imgList2) {
					that.imgList22.push(that.imgList2[i].src);
				}
			},
            disinfectionSubmit(){
                const that = this;
                this.uploadImage1();
                this.uploadImage2();
                setTimeout(() => {
                    // if(
                    //     this.task_description==""||
                    //     this.position==""||
                    //     this.name==""||
                    //     this.imgList11==""||
                    //     this.explain==""||
                    //     this.imgList22==""
                    // ){
                    //     that.$toast.text("您有重要信息尚未填写")
                    //     return ;
                    // }
                    that.loading = that.$toast.loading();
                    this.$api.disinfection(
                        // 参数列表
                        that.task_description,
                        that.position,
                        that.name,
                        that.imgList1value,
                        that.explain,
                        that.imgList2value,
                        ).then(function(value) {
                            switch (value.data.code){
                                case 200:
                                    that.loading.hide();
                                    // 成功跳转
                                    that.$router.push("disinfectionSuccess")
                                    break;
                                case 500:
                                    that.$toast.text(value.data.msg)
                                    that.loading.hide();
                                    break;
                                default:
                                    that.$toast.text(value.data.msg)
                                    that.loading.hide();
                                    break;
                            }
                        }
                    )
                }, 2000);
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
    @import "../assets/skin/css/disinfection.scss";
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