<template>
	<section class="aui-flexView">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:history.back(-1);" class="aui-navBar-item">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">我的组织健康状况上报记录</span>
			</div>
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-sys"></i>
			</a>
		</header>
		<section class="aui-scrollView">
			<div class="aui-view-box">
				<div class="staffHealthyList-list-par">
                    <div class="staffHealthyList-par" v-for="(item,i) in staffHealthyList" :key="i" @click="checkDetails(i)">
                        <div class="staffHealthyList-fir">
                            <span>{{item.update_time}}</span>
                        </div>
                        <div class="staffHealthyList-sec" :class="item.abnormal_number>5?'staffHealthyList-color-sRed':item.abnormal_number>1?'staffHealthyList-color-red':'staffHealthyList-color-green'">
                            <span>
                                复工:<span>{{item.work_number}}</span>;
                                异常:<span>{{item.abnormal_number}}</span>;
                                密切接触:<span>{{item.close_contact}}</span>;
                            </span>
                            <span>></span>
                        </div>
                        <div class="staffHealthyList-thr">
                            <span>
                                统计人员:<span>{{item.statisticians}}</span>.
                                审核人员:<span>{{item.auditor}}</span>
                            </span>
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
                staffHealthyList:[]
            }
        },
		mounted(){
			const that = this;
            let token=localStorage.getItem('token')
            that.loading = that.$toast.loading();
			this.$api.health_report_record_enterprise().then(function(value) {
					that.loading.hide();
                    that.staffHealthyList=value.data.data
                }
            )
        },
        methods: {
            checkDetails(status){
                this.$router.push({path:"staffHealthyDetails",query:{"status":status}})
            }
        },
	};
</script>

<style lang="scss" scoped>
	@import '../assets/skin/css/tijiao.scss';
	@import '../assets/skin/css/jquery-labelauty.scss';
    @import "../assets/skin/css/staffHealthyList.scss";
	ul{list-style-type: none;}
	li{display: inline-block;}
	li{margin: 10px 0;}
	input.labelauty + label{font:12px "Microsoft Yahei";}
</style>
