<template>
	<div class="main">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:history.back(-1);" class="aui-navBar-item">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">招工管理</span>
			</div>
		</header>
		<section class="aui-scrollView">
			<div class="aui-view-box">
                <div class="newly-added" @click="eventAdd"><span>+</span>新增</div>
                <div class="newly-content" v-for="(item,i) in list1" :key="i">
                    <div>
                        <span style="font-size: 16px;">{{compenyInfo.name}}</span>
                        <span class="已提交">已提交</span>
                    </div>
                    <div class="newly-content-decr" style="align-items: flex-start;">
                        <span style="white-space: nowrap;">本次招工总人数：</span>
                        <span v-if="item.post.length>0">{{item.total_number||"暂无"}}人</span>
                    </div>
                    <div class="newly-content-lastPar">
                        <span>提交时间：{{item.create_time}}</span>
                        <div class="btn-par">
                            <button class="newly-button 编辑" @click="clickDetails(item.id)">详情</button>
                        </div>
                    </div>
                </div>
                <div class="newly-content" v-for="(con,k) in list2" :key="k">
                    <div>
                        <span style="font-size: 16px;">{{compenyInfo.name}}</span>
                        <span class="未提交">未提交</span>
                    </div>
                    <div class="newly-content-decr">
                        <span style="white-space: nowrap;">本次招工总人数：</span>
                        <span v-if="con.post.length>0">{{con.total_number||"暂无"}}人</span>
                    </div>
                    <div class="newly-content-lastPar newly-content-3btn">
                        <div class="btn-par">
                            <button class="newly-button 编辑" @click="edit(con.id)">编辑</button>
                            <button class="newly-button 提交" @click="submitAll(con)">提交</button>
                            <button class="newly-button 删除" @click="deleteContent(con.id)">删除</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
		<tabbar activeNumber='1'></tabbar>
	</div>
</template>

<script>
	import tabbar from "@/components/tabbar.vue";
	export default {
        data () {
            return {
                status:"0",
                list1:[],
                list2:[],
                compenyInfo:""
            }
        },
		components: {
			tabbar
		},
        created () {
            this.createdEvent();
        },
        methods: {
            createdEvent(){
                this.compenyInfo = JSON.parse(localStorage.getItem("CompenyInfo"));
                const that = this;
                that.list1=[];
                that.list2=[];
                that.loading = that.$toast.loading();
                that.$api.recruitList().then(function(his) {
                    switch (his.data.code) {
                        case 200:
                            that.loading.hide();
                            console.log(his.data.list)
                            for(var i=0;i<his.data.list.length;i++){
                                if(his.data.list[i].status=='2'){
                                    that.list1.push(his.data.list[i])
                                }else if(his.data.list[i].status=='1'){
                                    that.list2.push(his.data.list[i])
                                }
                            }
                            break;
                        default:
                            that.$toast.text(his.data.msg);
                            that.loading.hide();
                            break;
                    }
                });
            },
            eventAdd(){
                this.$router.push('recruitmentSubmit')
            },
            clickDetails(i){
                this.$router.push({path:'recruitmentDetails',query:{index:i}})
            },
            submitAll(item){
                const that = this;
                that.loading = that.$toast.loading();
                that.$api.recruitSubmit(item.welfare,item.requirement,item.post,item.id).then(function(his) {
                    switch (his.data.code) {
                        case 200:
                            that.loading.hide();
                            that.createdEvent();
                            break;
                        default:
                            that.$toast.text(his.data.msg);
                            that.loading.hide();
                            break;
                    }
                });
            },
            edit(i){
                this.$router.push({path:'recruitmentSubmit',query:{index:i}})
            },
            deleteContent(id){
                const that = this;
                that.loading = that.$toast.loading();
                that.$api.recruitDelete(id).then(function(his) {
                    switch (his.data.code) {
                        case 200:
                            that.loading.hide();
                            that.createdEvent();
                            break;
                        default:
                            that.$toast.text(his.data.msg);
                            that.loading.hide();
                            break;
                    }
                });
            },
        },
    }
</script>

<style lang="scss" scoped>
	@import "@/assets/skin/css/index.scss";
	.aui-view-box{
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 4rem;
    }
    .newly-added{
        width: 70%;
        height: 2rem;
        border-radius: 1rem;
        background: linear-gradient(to right, rgb(40, 116, 255) 0%,rgb(6, 186, 255) 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        margin: 1rem 0;
    }
    .未提交{
        color: red;
    }
    .已提交{
        color: rgb(49, 250, 65);
    }
    .newly-content{
        background-color: #fff;
        box-sizing: border-box;
        width: 90%;
    }
    .newly-content+.newly-content{
        margin-top: 1rem;
    }
    .newly-content div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 1rem 0;
        padding: 0 1rem;
    }
    .newly-content>div:last-child{
        border-top: 1px solid #e7e5e5;
    }
    .newly-content>div *{
        font-size: 14px;
    }
    .newly-button{
        width: 4rem;
        height: 1.5rem;
        border: 0;
        border-radius: 1.5rem;
        line-height: 1.5rem;
        color: #fff;
    }
    .编辑{
        background-color: rgb(40, 116, 255);
    }
    .提交{
        background-color: rgb(23, 197, 172);
    }
    .删除{
        background-color: rgba(255, 125, 125);
    }
    .newly-content-lastPar *{
        margin-top: 1rem;
    }
    .newly-content-decr{
        justify-content: flex-start !important;
    }
    .newly-content .btn-par{
        width: auto;
        padding: 0;
        margin: 0;
    }
    .newly-content .btn-par button{
        margin-left: 1rem;
    }
    .btn-flex{
        justify-content: flex-end !important;
    }
    .newly-content-3btn{
        justify-content: flex-end !important;
    }
</style>
<style>
    #app{
        background-color: #eeeeee;
        height: auto !important;
    }
</style>
