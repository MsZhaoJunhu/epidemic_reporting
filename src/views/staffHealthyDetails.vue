<template>
	<section class="aui-flexView">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:history.back(-1);" class="aui-navBar-item">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">健康信息详情</span>
			</div>
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-sys"></i>
			</a>
		</header>
		<section class="aui-scrollView">
			<div class="aui-view-box">
                <div class="staffHealthyDetails-fir-div">
                    <p>企业员工健康状况上报</p>
                    <span>为了做好新型冠状病毒感染肺炎的防控，请各企业相关负责人每日下班前如实提交企业员工身体健康情况，谢谢配合。</span>
                </div>
				<div class="staffHealthyDetails-table">
                    <div>
                        <div class="staffHealthyDetails-fir-td staffHealthyDetails-start">复工人数</div>
                        <div class="staffHealthyDetails-sec-td">
                            {{obj.work_number}}
                        </div>
                    </div>
                    <div>
                        <div class="staffHealthyDetails-fir-td staffHealthyDetails-start">异常人数</div>
                        <div class="staffHealthyDetails-sec-td">
                            {{obj.abnormal_number}}
                        </div>
                    </div>
                    <div>
                        <div class="staffHealthyDetails-fir-td staffHealthyDetails-start">异常名单</div>
                        <div class="staffHealthyDetails-sec-td">
                            {{obj.abnormal_list}}
                        </div>
                    </div>
                    <div>
                        <div class="staffHealthyDetails-fir-td staffHealthyDetails-start">异常描述</div>
                        <div class="staffHealthyDetails-sec-td">
                            {{obj.anomaly}}
                        </div>
                    </div>
                    <div>
                        <div class="staffHealthyDetails-fir-td staffHealthyDetails-start">密切接触</div>
                        <div class="staffHealthyDetails-sec-td">
                            {{obj.close_contact}}
                        </div>
                    </div>
                    <div>
                        <div class="staffHealthyDetails-fir-td staffHealthyDetails-start">接触名单</div>
                        <div class="staffHealthyDetails-sec-td">
                            {{obj.close_list}}
                        </div>
                    </div>
                    <div>
                        <div class="staffHealthyDetails-fir-td staffHealthyDetails-start">接触描述</div>
                        <div class="staffHealthyDetails-sec-td">
                            {{obj.contact_describe}}
                        </div>
                    </div>
                    <div>
                        <div class="staffHealthyDetails-fir-td staffHealthyDetails-start">统计人员</div>
                        <div class="staffHealthyDetails-sec-td">
                            {{obj.statisticians}}
                        </div>
                    </div>
                    <div>
                        <div class="staffHealthyDetails-fir-td staffHealthyDetails-start">联系手机</div>
                        <div class="staffHealthyDetails-sec-td">
                            {{obj.mobile}}
                        </div>
                    </div>
                    <div>
                        <div class="staffHealthyDetails-fir-td staffHealthyDetails-start">审核领导</div>
                        <div class="staffHealthyDetails-sec-td">
                            {{obj.auditor}}
                        </div>
                    </div>
                </div>
                <!-- <div class="staffHealthyDetails-tr">
                    <span class="staffHealthyDetails-fir-span staffHealthyDetails-start">上传排查详情表</span>
                    <div class="staffHealthyDetails-sec-div">
                        <div class="staffHealthyDetails-file-box">
                            <img :src="item" alt="企业员工身体状况排查图片" v-for="item in imgList1">
                        </div>
                    </div>
                </div> -->
				<div class="staffHealthyDetails-imgDiv-par">
					<span class="start">上传排查详情表</span>
					<div class="staffHealthyDetails-img-par">
						<img :src="item" alt="缩略图点击看大图" v-for="item in imgList1">
					</div>
				</div>
                <div class="staffHealthyDetails-table">
                    <div>
                        <div class="staffHealthyDetails-fir-td staffHealthyDetails-start">更多备注</div>
                        <div class="staffHealthyDetails-sec-td">
                            {{obj.more_remark}}
                        </div>
                    </div>
                </div>
			</div>
		</section>
	</section>
</template>

<script>
	export default {
        name: "staffHealthyDetails",
        data() {
            return {
				status:this.$route.query.status,
                obj:"",
				imgList1:[],
            }
        },
		mounted(){
			const that = this;
            let token=localStorage.getItem('token')
            that.loading = that.$toast.loading();
			this.$api.health_report_record_enterprise().then(function(value) {
					that.loading.hide();
                    that.obj=value.data.data[that.status]
					that.imgList1=that.obj.troubleshooting.split(",")
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
    @import "../assets/skin/css/staffHealthyDetails.scss";
	ul{list-style-type: none;}
	li{display: inline-block;}
	li{margin: 10px 0;}
	input.labelauty + label{font:12px "Microsoft Yahei";}
</style>
