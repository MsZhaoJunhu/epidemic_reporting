<template>
	<section class="aui-flexView">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:history.back(-1);" class="aui-navBar-item">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">选择复工人员</span>
			</div>
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-sys"></i>
			</a>
		</header>
		<section class="aui-scrollView">
			<div class="aui-view-box">
                <div class="person-all-par">
                    <div class="person-par" style="justify-content: space-between;background:none;">
                        <div class="thisIsMyDiv">
                            <div class="person-check-box personCheck-Allbox" @click="clickToCheckAllBox($event)" alt="false">
                                <!-- <svg class="icon" style="display:none;width: 0.8rem; height: 0.8rem;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1733">
                                    <path d="M416.832 798.08C400.64 798.08 384.512 791.872 372.16 779.52L119.424 525.76C94.784 500.992 94.784 460.8 119.424 436.032 144.128 411.264 184.128 411.264 208.768 436.032L416.832 644.928 814.4 245.76C839.04 220.928 879.04 220.928 903.744 245.76 928.384 270.528 928.384 310.656 903.744 335.424L461.504 779.52C449.152 791.872 432.96 798.08 416.832 798.08Z" p-id="1734"></path>
                                </svg> -->
								<img src="../assets/skin/icon/dui.png" alt="" width="100%" style="display: none;;">
                            </div>
                            <span>全选</span>
                        </div>
                    </div>
                    <div class="tips-par">
                        提示:红色
                        <span style="display:inline-block;width:12px;height:12px;background:red;border-radius:50%;"></span>
                        表示14天出过重庆市,黄色
                        <span style="display:inline-block;width:12px;height:12px;background:#999;border-radius:50%;"></span>
                        表示14天出过区域没出重庆市,绿色
                        <span style="display:inline-block;width:12px;height:12px;background:rgb(35, 223, 98);border-radius:50%;"></span>
                        表示未出过区域.
                    </div>
                    <div v-for="(item,index) in list" :key="index" class="person-par">
                        <div>
                            <div class="person-check-box personCheck-box" @click="clickToCheckBox($event,item)" alt="false">
                               <!-- <svg class="icon" style="display:none;width: 0.8rem; height: 0.8rem;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1733">
                                    <path d="M416.832 798.08C400.64 798.08 384.512 791.872 372.16 779.52L119.424 525.76C94.784 500.992 94.784 460.8 119.424 436.032 144.128 411.264 184.128 411.264 208.768 436.032L416.832 644.928 814.4 245.76C839.04 220.928 879.04 220.928 903.744 245.76 928.384 270.528 928.384 310.656 903.744 335.424L461.504 779.52C449.152 791.872 432.96 798.08 416.832 798.08Z" p-id="1734"></path>
                                </svg> -->
								<img src="../assets/skin/icon/dui.png" alt="" width="100%" style="display: none;">
                            </div>
                            <!-- <div>
                                <img src="" alt="头像">
                            </div> -->
                            <span style="width:4rem;">{{item.real_name}}</span>
                            <span>{{item.id_card}}</span>
                        </div>
                        <div class="status-of-three" :class="item.status=='1'?'colorRed':item.status=='2'?'colorGreen':'colorYellow'"></div>
                    </div>
                </div>
                <button class="resumptionSuccess-btn" @click="confirm">确定,下一步</button>
			</div>
		</section>
	</section>
</template>

<script>
	export default {
        name: "resumptions",
        data() {
            return {
                selectList:[],
				list: [],
                isShow:false,
            }
        },
		mounted(){
            const that = this
            that.loading = that.$toast.loading();
            this.$api.notResumeWork().then(function(res) {
                if (res.data.code == 200) {
                    that.loading.hide();
                    that.list=res.data.list
                }
            })
        },
        methods: {
            confirm(){
                if(this.selectList.length>0){
                    localStorage.setItem("addPerson",JSON.stringify(this.selectList))
                    this.$router.push("resumptionAddMaterial");
                }else{
                    this.$toast.text('请选择新增复工员工！')
                }
                
            },
            routerT(){
                // this.$router.push({path:"resumption",query:{type:2}});
            },
            clickToCheckBox(e,index){
                let boolOfCheck = e.currentTarget.getAttribute('alt')
                if(boolOfCheck=='false'){
                    var allCheckDiv=document.getElementsByClassName('personCheck-box')
                    for(var i=0;i<allCheckDiv.length;i++){
                        var aallCheckDiv=document.getElementsByClassName('personCheck-Allbox')
                        if(allCheckDiv[i].getAttribute('alt')=='false'){
                            aallCheckDiv[0].firstElementChild.style="display:none;"
                        }else{
                            aallCheckDiv[0].firstElementChild.style="display:block;"
                        }
                    }
                    e.currentTarget.firstElementChild.style="display:block;"
                    e.currentTarget.setAttribute('alt','true')
                    this.selectList.push(index)
                }else{
                    var aallCheckDiv=document.getElementsByClassName('personCheck-Allbox')
                    aallCheckDiv[0].firstElementChild.style="display:none;"
                    aallCheckDiv[0].setAttribute('alt','false')
                    e.currentTarget.firstElementChild.style="display:none;"
                    e.currentTarget.setAttribute('alt','false')
                    for(var i=0;i<this.list.length;i++){
                        if(this.selectList[i]==index){
                            this.selectList.splice(i,1)
                        }
                    }
                }
            },
            clickToCheckAllBox(e){
                let boolOfCheck = e.currentTarget.getAttribute('alt')
                var personList=document.getElementsByClassName('personCheck-box')
                if(boolOfCheck=='false'){
                    for(var i=0;i<personList.length;i++){
                        personList[i].firstElementChild.style="display:block;"
                        personList[i].setAttribute('alt','true')
                    }
                    e.currentTarget.firstElementChild.style="display:block;"
                    e.currentTarget.setAttribute('alt','true')
                    for(var i=0;i<this.list.length;i++){
                        this.selectList.push(this.list[i])
                    }
                }else{
                    for(var i=0;i<personList.length;i++){
                        personList[i].firstElementChild.style="display:none;"
                        personList[i].setAttribute('alt','false')
                    }
                    e.currentTarget.firstElementChild.style="display:none;"
                    e.currentTarget.setAttribute('alt','false')
                    this.selectList=[];
                }
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
	img{
		margin: 0 !important;
	}
</style>
<style scoped>
	.personCheck-box{
		flex-shrink: 0;
	}
	.personCheck-box>i{
		display: none;
		height: 5px;
		width: 8px;
		border: 1px solid #000000;
		border-top: 0;
		border-right: 0;
		transform: rotateZ(-45deg) translateY(2px) translateX(0px);
	}
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
		font-size: 10px;
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
.person-par>div .personCheck-box{
    margin-right: 1rem;
}
.person-par>div>span:nth-child(2){
    width: 4rem;
}
.person-par img{
    width: 100%;
    height: 100%;
    flex-shrink: 0;
}
.person-par>span:nth-child(3){
    margin-right: 1rem;
}
.person-par:nth-child(n+2){
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
    background: #999 !important;
}
.colorGreen{
    background: rgb(35, 223, 98) !important;
}
.person-par span+span{
    margin-left: 1rem;
}
.aui-view-box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>