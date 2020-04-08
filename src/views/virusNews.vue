<template>
	<section class="aui-flexView">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:history.back(-1);" class="aui-navBar-item">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">疫情资讯</span>
			</div>
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-sys"></i>
			</a>
		</header>
		<section class="aui-scrollView">
			<div class="aui-view-box">
                <div class="virusNews-fir-par">
                    <div class="virusNews-fir-firDiv" @click="clickToView(0)">
                        <img src="../assets/skin/icon/new1.png" alt="">
                        <span>最新疫情</span>
                    </div>
                    <div class="virusNews-fir-secDiv" @click="clickToView(1)">
                        <img src="../assets/skin/icon/new2.png" alt="">
                        <span>疫情问答</span>
                    </div>
                    <div class="virusNews-fir-thrDiv" @click="clickToView(2)">
                        <img src="../assets/skin/icon/new3.png" alt="">
                        <span>真假辟谣</span>
                    </div>
                </div>
                <div class="virusNews-sec-par">
                    <div class="virusNews-sec-content" @click="clickToRouter(item.article_id)" v-for="(item,index) in list" :key="index">
                        <div class="virusNews-sec-content-left">
                            <p>
                                <!-- <span class="jing">精</span>
                                <span class="re">热</span> -->
                                {{item.article_title}}
                            </p>
                            <p>
                                <span class="time">{{item.created_time}}</span>
                                &nbsp;
                                <!-- <span>2389阅读</span> -->
                            </p>
                        </div>
                        <div class="virusNews-sec-content-right">
                            <img :src="item.article_image" alt="">
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
        data() {
            return {
                page:1,
                list:[],
                isShow:false,
                value:1,
            }
        },
		mounted(){
            this.getPage(this.page,this.value);
            let goBottom= document.querySelector('.aui-scrollView')
            if(goBottom){
				let that = this
                goBottom.onscroll = function() {
                    if(goBottom.scrollTop>200*that.page){
                        that.page++;
                        that.getPage(that.page,that.value);
                    }
                }
            }
        },
        methods: {
            // 点击请求别的新闻
            clickToView(index){
                switch (index) {
                    case 1:
                        this.value=2;
                        this.page=1;
                        this.list=[];
                        this.isShow=false;
                        this.getPage(this.page,this.value);

                        break;
                    case 2:
                        this.value=3;
                        this.page=1;
                        this.list=[];
                        this.isShow=false;
                        this.getPage(this.page,this.value);
                        
                        break;
                
                    default:
                        this.value=1;
                        this.page=1;
                        this.list=[];
                        this.isShow=false;
                        this.getPage(this.page,this.value);

                        break;
                }
            },
            clickToRouter(id){
                this.$router.push({path:`virusNewsDetails/${id}/${this.value}`})
            },
			getPage(page,value) {
				const that = this
				that.loading = that.$toast.loading();
				this.$api.indexQA(page,value).then(function(res) {
					if (res.data.code == 200) {
                        that.loading.hide();
                        let listLength=that.list.length;
                        for(var i =0;i<res.data.data.length;i++){
                            that.list.push(res.data.data[i])
                        }
                        if(that.list.length==listLength){
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
    @import "../assets/skin/css/virusNews.scss";
	ul{list-style-type: none;}
	li{display: inline-block;}
	li{margin: 10px 0;}
	input.labelauty + label{font:12px "Microsoft Yahei";}
</style>
<style scoped>
    .aui-scrollView{
        background: rgb(245, 245, 245)
    }
</style>
