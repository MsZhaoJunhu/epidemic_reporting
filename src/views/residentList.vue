<template>
	<section class="aui-flexView">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:history.back(-1);" class="aui-navBar-item">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">登记信息记录</span>
			</div>
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-sys"></i>
			</a>
		</header>
		<section class="aui-scrollView">
			<div class="aui-view-box">
				<div class="resumptionList-list-par">
                    <div class="resumptionList-par" v-for="(item,i) in resumptionList" :key="i" @click="checkDetails(item.id)">
                        <div class="resumptionList-fir">
                            <span>进入时间:{{item.update_time}}</span>
                        </div>
                        <div class="resumptionList-sec">
                            <span>目的地:{{item.matter}}</span>
                            <span>></span>
                        </div>
                        <div class="resumptionList-thr">
                            <span>体温:{{item.temperature}}℃</span>
                        </div>
                    </div>
                    <div class="virusNews-toBottom" v-show="isShow">哎呀,这已经是最底部啦!</div>
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
                resumptionList:[],
                page:1,
                isShow:false,
            }
        },
		mounted(){
            this.getPage(this.page);
            let goBottom= document.querySelector('.aui-scrollView')
            if(goBottom){
				let that = this
                goBottom.onscroll = function() {
                    if(goBottom.scrollTop>200*that.page){
                        that.page++;
                        that.getPage(that.page);
                    }
                }
            }
        },
        methods: {
            checkDetails(status){
                this.$router.push({path:`residentDetails/${status}`})
            },
			getPage(page) {
				const that = this
				that.loading = that.$toast.loading();
				this.$api.resident_list(page).then(function(res) {
					if (res.data.code == 200) {
                        that.loading.hide();
                        let listLength=that.resumptionList.length;
                        for(var i =0;i<res.data.list.length;i++){
                            that.resumptionList.push(res.data.list[i])
                        }
                        if(that.resumptionList.length==listLength){
                            that.isShow=true;
                        }
                    }
                    
                })
			},
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
    .virusNews-toBottom{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 1rem;
        color: rgb(197, 196, 196);
    }
</style>
