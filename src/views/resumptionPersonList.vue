<template>
	<section class="aui-flexView">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:history.back(-1);" class="aui-navBar-item">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">查看员工</span>
			</div>
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-sys"></i>
			</a>
		</header>
		<section class="aui-scrollView">
			<div class="aui-view-box">
                <h6>审批中</h6>
                <div class="person-all-par">
                    <div v-for="(item,index) in list1" :key="index" class="person-par">
                        <div>
                            <!-- <div>
                                <img src="" alt="头像">
                            </div> -->
                            <span>{{item.name}}</span>
                            <span>{{item.id_card}}</span>
                        </div>
                        
                    </div>
                </div>
                <h6>未通过审批</h6>
                <div class="person-all-par">
                    <div v-for="(item,index) in list2" :key="index" class="person-par">
                        <div style="margin:0;">
                            <!-- <div>
                                <img src="" alt="头像">
                            </div> -->
                            <span>{{item.name}}</span>
                            <span>{{item.id_card}}</span>
                        </div>
                        <div style="width:6rem;height:2rem;display:block;text-align:center;padding:0.1rem 0;white-space: nowrap;margin:0;border-radius:4px;background:#0b56e0;color:#fff;" @click="checkReason(item.d_desc)">
                            查看原因
                        </div>
                    </div>
                </div>
                <h6>已通过审批</h6>
                <div class="person-all-par">
                    <div v-for="(item,index) in list3" :key="index" class="person-par">
                        <div>
                            <!-- <div>
                                <img src="" alt="头像">
                            </div> -->
                            <span>{{item.name}}</span>
                            <span>{{item.id_card}}</span>
                        </div>
                        <div class="status-of-three" :class="item.status=='1'?'colorRed':item.status=='2'?'colorYellow':'colorGreen'"></div>
                    </div>
                </div>
                <div class="resumptionSuccess-btn-par" style="margin-top:1rem;">
                    <button class="resumptionSuccess-btn" @click="confirm">返回上一页</button>
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
                status:this.$route.query.status,
                obj:"",
                list1:"",
                list2:"",
                list3:"",
            }
        },
		mounted(){
			const that = this;
			let token=localStorage.getItem('token')
            that.loading = that.$toast.loading();
            // 未开工员工列表
			this.$api.resumeWork(
                // 参数token
            ).then(function(value) {
                    that.loading.hide();
                    console.log(value)
					// that.obj=value.data.data[that.status]
                    // that.list=that.obj.user;
                    that.list1=value.data.check_pending;
                    that.list2=value.data.not_resume_work;
                    that.list3=value.data.resume_work;
                }
            )
        },
        methods: {
            confirm(){
                history.back(-1);
            },
            checkReason(reason){
                this.$dialog({
                    title: "未通过原因",
                    content: reason||"暂无",
                });
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
.person-all-par{
    padding:1rem !important;
    display: flex;
    flex-direction: column;
}

.person-par{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: #fff;
}
.person-par>div{
    margin-right: 1rem;
    width: 100%;
    height: 2rem;
    border-radius: 2rem;
    padding-left: 1rem;
    background: #fff;
    overflow: hidden;
    display: flex;
    justify-content: flex-start !important;
    align-items: center;
}
.person-par>div *{
    margin-right: 1rem;
}
.person-par>div>span:nth-child(1){
    width: 4rem;
}
.person-par img{
    width: 100%;
    height: 100%;
    flex-shrink: 0;
}
.person-par>span:nth-child(2){
    margin-right: 1rem;
}
.person-par+.person-par{
    margin-top: 0.5rem;
}
.person-par .person-check-box{
    width:1rem;
    height: 1rem;
    border-radius: 0;
    background: #fff;
    border: 1px solid #000;
}

.person-par .person-check-box .icon{
    width: 0.9rem !important;
    height: 0.9rem !important;
}
.virusNews-toBottom{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    color: rgb(197, 196, 196);
}
.resumptionSuccess-btn-par{
    width: auto;
}
.thisIsMyDiv{
    width: auto !important;
    border:0;
    background: none !important;
    border-radius: 0 !important;
}
.status-of-three{
    width: 1rem !important;
    height: 1rem !important;
}
.colorRed{
    background: red !important;
}
.colorYellow{
    background: yellow !important;
}
.colorGreen{
    background: green !important;
}
.person-par span+span{
    margin-left: 1rem;
}
.resumptionSuccess-btn-par+.resumptionSuccess-btn-par{
    margin: 1rem 0 !important;
}
.aui-view-box h6{
    line-height: 3rem;
    font-size: 1rem;
    transform: translateX(1rem);
    color: rgb(82, 81, 81);
}
.aui-view-box h6::before{
    content: '|';
    color: #5a80d1;
}
</style>