<template>
	<section class="aui-flexView">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:history.back(-1);" class="aui-navBar-item">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">我的开工信息上报记录</span>
			</div>
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-sys"></i>
			</a>
		</header>
		<section class="aui-scrollView">
			<div class="aui-view-box">
				<div class="resumptionList-list-par">
                    <div class="resumptionList-par">
                        <div class="resumptionList-fir">
                            <span>{{resumptionList.date}}</span>
                        </div>
                        <div class="resumptionList-fir" style="align-items:center;">
                            <span style="background:none;color:#000;font-size:1.1rem;">{{compenyInfo.name}}</span>
                            <span class="resumptionList-pass" style="font-size:1rem;" v-show="resumptionList.status==3 && resumptionList.feedback_status!=2">已通过审核</span>
							<span class="resumptionList-pass" style="font-size:1rem;" v-show="resumptionList.feedback_status==2">已通过审核(<em style="font-style: normal;color:orange">追加待审核</em>)</span>
                            <span class="resumptionList-notPass" style="font-size:1rem;" v-show="resumptionList.status==4">未通过</span>
                            <span class="resumptionList-notPass" style="font-size:1rem;" v-show="resumptionList.status==2">审核中</span>
                            <span class="resumptionList-notPass" style="font-size:1rem;" v-show="resumptionList.status==1">待审核</span>
                        </div>
                        <div class="resumptionList-fir" style="justify-content: space-around;align-items:center;">
                            <span style="background:none;color:#000;margin-right:1rem;">
                                已复工:<span style="background:none;color:#000;font-size:1.2rem;">{{resumptionList.resume_work_number}}</span>人
                            </span>
                            <span style="background:none;color:#000;">
                                待审核:<span style="background:none;color:#000;font-size:1.2rem;">{{resumptionList.check_pending_number}}</span>人
                            </span>
                        </div>
                        <div class="resumptionList-sec" style="justify-content: space-around;">
                            <button @click="checkDetails(i)" class="resumptionList-my-btn">查看复工申请</button>
                            <button @click="clickToAddAlign(i)" class="resumptionList-my-btn" style="background: rgb(49, 226, 49);">追加复工人员</button>
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
                resumptionList:"",
                compenyInfo:""
            }
        },
		mounted(){
            const that = this;
            let token=localStorage.getItem('token')
            this.compenyInfo = JSON.parse(localStorage.getItem("CompenyInfo"));
            that.loading = that.$toast.loading();
			this.$api.information_record(
                // 参数token
            ).then(function(value) {
                    that.loading.hide();
                    that.resumptionList=value.data.info
                    if(that.resumptionList==""){
                        that.$router.push("resumption")
                    }
                }
            )
        },
        methods: {
            checkDetails(status){
                this.$router.push({path:"resumptionDetails",query:{"status":status}})
            },
            clickToAddAlign(){
                this.$router.push('addPersonAlign')
            }
        },
	};
</script>

<style lang="scss" scoped>
	@import '../assets/skin/css/tijiao.scss';
	@import '../assets/skin/css/jquery-labelauty.scss';
    @import "../assets/skin/css/resumptionList.scss";
	ul{list-style-type: none;}
	li{display: inline-block;}
	li{margin: 10px 0;}
    input.labelauty + label{font:12px "Microsoft Yahei";}
</style>
<style>
    .resumptionList-my-btn{
        padding: 0.5rem 1.3rem !important;
        background: rgb(18, 31, 214);
        color: #fff !important;
        border: 1px solid #fff;
        border-radius: 0.5rem;
    }
</style>
