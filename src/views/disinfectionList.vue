<template>
	<section class="aui-flexView">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:history.back(-1);" class="aui-navBar-item">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">我的组织消毒防护上报记录</span>
			</div>
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-sys"></i>
			</a>
		</header>
		<section class="aui-scrollView">
			<div class="aui-view-box">
				<div class="staffHealthyList-list-par">
                    <div v-show="staffHealthyList" class="staffHealthyList-par" v-for="(item,i) in staffHealthyList" :key="i" @click="checkDetails(i)">
                        <div class="staffHealthyList-fir">
                            <span>{{item.update_time}}</span>
                        </div>
                        <div class="staffHealthyList-sec">
                            <span>消毒防护记录</span>
                            <span>></span>
                        </div>
                        <div class="staffHealthyList-thr">
                            <span>
                                <span>{{item.explain}}</span>
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
                staffHealthyList:[],
                disinfection:0
            }
        },
		mounted(){
            const that = this;
            let token=localStorage.getItem('token')
            that.loading = that.$toast.loading();
			this.$api.disinfection_record().then(function(value) {
                    that.loading.hide();
                    that.staffHealthyList=value.data.data
                    console.log(that.staffHealthyList)
                }
            )
        },
        methods: {
            checkDetails(status){
                this.$router.push({path:"disinfectionDeatils",query:{"disinfection":status}})
            }
        },
	};
</script>

<style lang="scss" scoped>
	@import '../assets/skin/css/tijiao.scss';
	@import '../assets/skin/css/jquery-labelauty.scss';
    @import "../assets/skin/css/disinfectionList.scss";
	ul{list-style-type: none;}
	li{display: inline-block;}
	li{margin: 10px 0;}
	input.labelauty + label{font:12px "Microsoft Yahei";}
</style>
