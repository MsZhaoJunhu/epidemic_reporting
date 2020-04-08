<template>
	<section class="aui-flexView">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:history.back(-1);" class="aui-navBar-item">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">员工信息</span>
			</div>
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-sys"></i>
			</a>
		</header>
		
		<section class="aui-scrollView" id="gundong">
			<div class="个人信息">
				<div class="个人头像">
					<div class="left">
						<div class="left_content"></div>
						<div class="right_content">
							<h1 class="h1">{{compenyInfo.name}}</h1>
							<p><span class="number">{{allNumber}}人</span></p>
						</div>
					</div>
					<router-link tag="div" class="right"  to="/residentClockin?id=1">
						<a href="javascript:;" style="display: block;height: 100%;width: 100%;"></a>
					</router-link>
				</div>
				<div class="广告">
                    <p>企业员工概况</p>
				</div>
				<div class="状态">
					<ul class="ulcontent">
						<li>
							<p>总人数</p>
							<p><span class="blue_zero">{{allNumber}}</span>人</p>
						</li>
						<li>
							<p>报批人数</p>
							<p><span class="blue_zero">{{baopiNumber}}</span>人</p>
						</li>
						<li>
							<p>已复工</p>
							<p><span class="red_zero">{{resumptionNumber}}</span>人</p>
						</li>
						<li>
							<p>审批中</p>
							<p><span class="red_zero">{{shenpizhongNumber}}</span>人</p>
						</li>
						<li>
							<p>未报批</p>
							<p><span class="red_t" style="color:rgb(80,184,118);">{{weibaopi}}</span>人</p>
						</li>
					</ul>
				</div>
			</div>
            
            <div class="search-all-apr">
                <div class="search">
                    <input type="text" v-model="userName" placeholder="姓名">
                   <!-- <select v-model="searchType">
                        <option value="0" :selected='searchType == 0'>全部员工</option>
                        <option value="1" :selected='searchType == 1'>复工员工</option>
                        <option value="2" :selected='searchType == 2'>未复工员工</option>
                    </select> -->
                    <div @click="startSearch">
                        <svg class="icon" style="width: 2em; height: 2em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1546">
                            <path d="M857.6 822.4l-192-192c-9.6-9.6-24-9.6-33.6 0 0 0 0 1.6-1.6 1.6-46.4 46.4-108.8 72-174.4 72C320 704 208 592 208 456S320 208 456 208 704 320 704 456c0 20.8-3.2 40-8 59.2-3.2 12.8 4.8 25.6 17.6 28.8 12.8 3.2 25.6-4.8 28.8-17.6 6.4-22.4 8-46.4 8-72C752 292.8 619.2 160 456 160S160 292.8 160 456 292.8 752 456 752c70.4 0 137.6-25.6 192-70.4l176 176c4.8 4.8 11.2 6.4 17.6 6.4s12.8-1.6 17.6-6.4c6.4-9.6 6.4-25.6-1.6-35.2z"
                            p-id="1547"></path>
						</svg>
                    </div>
                </div>
            </div>

            <div class="staff-all-list">
                <div @click="clickPerson(item.user_id)" class="staff-par" v-for="item in list" tags="div">
                    <div class="staff-head-portrait"></div>
                    <span>{{item.real_name}}</span>
                    <span>{{item.id_card}}</span>
					<!-- noResumption -->
					<!-- resumption -->
                    <span v-show="item.commencement_status==1 || (item.enterprise_status==1 && item.commencement_status==3) || (item.enterprise_status==1 && item.commencement_status==2)">审核中</span>
					<span v-show="item.commencement_status==2 && item.enterprise_status==3">已退回</span>
					<span v-show="item.commencement_status==3 && item.enterprise_status==3">已复工</span>
					<span v-show="item.commencement_status==null">未报批</span>
					<span style="color:red;" @click.stop="deletePerson($event,item.user_id)">删除</span>
				</div>
				<div class="virusNews-toBottom" v-if="isShow">哎呀,这已经是最底部啦!</div>
				<div class="virusNews-toBottom" v-else @click="showMore()" style="padding-top: 20px;">点击加载更多</div>
            </div>

            <div v-show="list.length=='0'" v-cloak class="no-staff">{{listValue}}</div>

		</section>
		<tabbar></tabbar>
	</section>
</template>

<script>
	import tabbar from "@/components/tabbar.vue";
	export default {
		name: "checkList",
		components: {
			tabbar
		},
		data() {
			return {
                userName:"",
                searchType:"0",
                list:[],
                preList:[],
                listValue:"",
                resumptionNumber:0,
				noResumptionNumber:0,
				baopiNumber:0,
				shenpizhongNumber:0,
				compenyInfo:"",
				allNumber:0,
				page:1,
				isShow:false,
				listLength:"",
				weibaopi:""
			};
		},
		created() {
            const that = this
			this.$api.information_record().then(function(res) {
				switch (res.data.code) {
					case 200:
						that.allNumber=res.data.info.total_number;
						that.shenpizhongNumber=res.data.info.check_pending_number;
						that.baopiNumber=res.data.info.report_number;
						that.weibaopi=res.data.info.not_report_number;
						that.resumptionNumber=res.data.info.resume_work_number;
						break;
					default:
						break;
				}
			})
            
		},
		mounted() {
			const that = this;
			this.compenyInfo = JSON.parse(localStorage.getItem("CompenyInfo"));
			this.getPage(this.page);
			// const goBottom = document.getElementById('gundong')
			// window.addEventListener('scroll',function() {
			// 	console.info(window.scrollTop)
			// 	if(goBottom.scrollTop>500*that.page){
			// 		that.page++;
			// 		that.getPage(that.page);
			// 	}
			// },true);
        },
        watch: {
            list(){
                if(this.list.length=='0'){
                    this.listValue="暂无该员工信息哦!"
                }else{
                    this.listValue=""
                }
            }
        },
		methods: {
			showMore(){
				this.page++;
				this.getPage(this.page);
			},
            // 点击搜索按钮
			startSearch(){
                const that = this;
                if(that.searchType=="0"){
                    if(that.userName==""){
                        that.list=[]
                        for(var i=0;i<that.preList.length;i++){
                            if(that.preList[i].real_name.indexOf(that.userName)=='0'){
                                that.list.push(that.preList[i])
                            }
                        }
                    }else{
                        that.list=[]
                        for(var i=0;i<that.preList.length;i++){
                            if(that.preList[i].real_name.indexOf(that.userName)=='0'){
                                that.list.push(that.preList[i])
                            }
                        }
                    }
                }else if(that.searchType=="1"){
                    if(that.userName==""){
                        that.list=[]
                        for(var i=0;i<that.preList.length;i++){
                            if(that.preList[i].real_name.indexOf(that.userName)=='0'&&that.preList[i].commencement_status==3){
                                that.list.push(that.preList[i])
                            }
                        }
                    }else{
                        that.list=[]
                        for(var i=0;i<that.preList.length;i++){
                            if(that.preList[i].real_name.indexOf(that.userName)=='0'&&that.preList[i].commencement_status==3){
                                that.list.push(that.preList[i])
                            }
                        }
                    }
                }else{
                    if(that.userName==""){
                        that.list=[]
                        for(var i=0;i<that.preList.length;i++){
                            if(that.preList[i].real_name.indexOf(that.userName)=='0'&&that.preList[i].commencement_status!=3){
                                that.list.push(that.preList[i])
                            }
                        }
                    }else{
                        that.list=[]
                        for(var i=0;i<that.preList.length;i++){
                            if(that.preList[i].real_name.indexOf(that.userName)=='0'&&that.preList[i].commencement_status!=3){
                                that.list.push(that.preList[i])
                            }
                        }
                    }
                }
                
			},
			deletePerson(e,id){
				e.stopPropagation();
				const that = this
				this.$api.cancelFollow(id).then(function(res) {
					switch (res.data.code) {
						case 200:
							that.$toast.text('删除成功!');
							that.$api.allStaffList().then(function(res) {
								switch (res.data.code) {
									case 200:
										that.resumptionNumber=0;
										that.noResumptionNumber=0;
										that.preList=that.list=res.data.list;
										for(var i=0;i<that.preList.length;i++){
											if(that.preList[i].commencement_status==3){
												that.resumptionNumber++
											}else if(that.preList[i].commencement_status!=3){
												that.noResumptionNumber++
											}
										}
										break;
									default:
										break;
								}
							})
							break;
						default:
							break;
					}
				})
			},
			clickPerson(id){
				this.$router.push({path:"EMaterialsDetails",query:{id:id}})
			},
			getPage(page) {
				const that = this
				this.$api.allStaffList(that.page).then(function(res) {
				switch (res.data.code) {
					case 200:
						for(var i=0;i<res.data.list.length;i++){
							that.preList.push(res.data.list[i])
							that.list.push(res.data.list[i])
							that.listLength=that.preList.length
						}
						if(res.data.list.length<=0){
						    that.isShow=true;
						}
                        // if(that.preList.length==that.listLength){
                        //     that.isShow=true;
                        // }
						break;
					default:
						break;
				}
			})
			},
		}
	};
</script>

<style lang="scss" scoped>
	@import "../assets/skin/css/swiper.min.css";
	@import "../assets/skin/css/index.scss";
	@import "../assets/skin/css/myinfo.scss";

	.aui-flexView {
		padding-bottom: 50px;
	}

	.我的组织3 {
		margin: auto 15px;
		background-color: #fff;
		border-radius: 10px;

	}

	.my_content {
		width: 100%;
		padding: 1rem;
		text-align: center;
	}

	.search_bg {
		display: block;
		width: 7rem;
		height: 5rem;
		background-image: url("../assets/fugong/search.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin: 0 auto;
	}

	.pasue {
		color: rgb(188, 188, 188);
		font-size: 16px;
		margin: 1rem 0 !important;
	}

	.fu_btn {
		display: inline-block;
		padding: 0.8rem 6rem;
		color: rgb(0, 130, 243) !important;
		border: 1px solid rgb(0, 130, 243);
		border-radius: 40px;
		margin-bottom: 1rem !important;
	}

	.今日打卡 {
		margin: 15px auto !important;
		background-color: #fff;
		border-radius: 10px;
	}

	.企业1 {
		border-bottom: 1px solid #f0f0f0;
	}

	.aui-center {
		display: flex;
	}

	.aui-center img {
		width: 1.2rem;
		height: 1.2rem;
	}

	.aui-center span {
		font-size: 1.1rem !important;
	}

	.iconfont {
		width: 5px;
		box-shadow: 0 0 3px #007AFF;
		height: 18px;
		border-radius: 20%;
		margin-left: 15px !important;
		background-color: #0881fc;
		margin-top: 15px !important;
	}

	.正常与否,
	.是否复工 {
		font-size: 16px;
		font-weight: 600;
	}

	.打卡日期 {
		display: inline-block;
		margin-right: 15px !important;
		color: #5a5a5a;
	}

	.city {
		font-size: 18px;
		margin-left: 12px !important;
		margin-top: 12px !important;
	}

	.关联组织>img {
		width: 90px;
		height: 85px;
		margin-left: 38%;
		margin-top: 13px;
	}

	.我的组织1 {
		width: 90%;
		margin: 15px auto !important;
		background-color: #fff;
		border-radius: 10px;

	}

	.今日打卡 {
		width: 90%;
		margin: 15px auto !important;
		background-color: #fff;
		border-radius: 10px;
	}

	.企业1 {
		border-bottom: 1px solid #f0f0f0;
	}

	.我的组织2 {
		width: 90%;
		margin: 15px auto !important;
		background-color: #fff;
		border-radius: 10px;
		padding: 1rem !important;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.my_a {
		display: inline-block;
		width: 47%;
		text-align: center;
		padding: 0.5rem 2rem !important;
		border: 1px solid #ccc;
		border-radius: 40px;
		color: rgb(166, 166, 166);
	}

	.我的组织2>a:last-child {
		color: rgb(139, 179, 215);
		border: 1px solid rgb(139, 179, 215);
	}

	.head {
		display: flex;
	}

	.head>img {
		width: 17px;
		height: 20px;
		margin-top: 14px !important;
		margin-left: 235px !important;
	}

	.time_contnet {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1rem !important;
		margin-top: 1rem !important;
		border-bottom: 1px solid #ddd;
		padding-bottom: 1rem !important;
	}

	.time {
		color: rgba(215, 215, 215);
	}

	.pass {
		color: rgba(125, 203, 153);
	}

	.fugong_content {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem !important;
		border-bottom: 1px solid #ddd;
	}

	.h2 {
		font-size: 14px;
		color: #333;
		margin-bottom: 0.5rem !important;
	}

	.fu_left {
		width: 70%;

	}

	.fu_left p {
		color: rgb(157, 157, 157);
		font-size: 12px;
	}

	.btn {
		padding: 0.5rem 1rem !important;
		color: #fff !important;
		font-size: 12px;
		background-color: rgb(4, 153, 255);
		border: 0;
		outline: none;
		border-radius: 30px;
	}

	.fu_right {
		width: 30;
	}

	.contro {
		width: 100%;
	}

	.contro_a {
		display: inline-block;
		width: 50%;
		text-align: center;
		padding: 1rem !important;
		color: rgb(249, 128, 13) !important;
	}

	.contro>a:first-child {
		border-right: 1px solid #ddd;
		color: rgb(0, 131, 255) !important;
	}

	.c_left,
	.c_right {
		display: inline-block;
		width: 1rem;
		height: 1rem;
		background-image: url("../assets/fugong/s2.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin-right: 0.5rem !important;
	}

	.c_right {
		background-image: url("../assets/fugong/s1.png");
	}

	.是否复工 {
		color: #ff6262;
	}

	.正常与否 {
		color: #5b99fc;
	}

	.体温打卡 {
		display: flex;
		margin-left: 10px !important;
		line-height: 77px;
		font-size: 15px;
		border-bottom: 1px solid #f0f0f0;
	}

	.状态 {
		width: 100%;
		height: 90px;
		border-top: 1px solid #f0f0f0;
		border-bottom: 1px solid #f0f0f0;
	}

	.ulcontent {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1rem !important;
		white-space: nowrap;
	}

	.ulcontent>li {
		text-align: center;
		width: 30%;
		font-size: 10px;
		color: #333;
		padding: 0 0.5rem;
	}

	.ulcontent>li:nth-child(n+2) {
		border-left: 1px solid #ccc;
		border-right: 1px solid #ccc;
	}
	.ulcontent>li:last-child {
		border-right: 0;
	}
	.blue_zero,
	.red_zero,
	.red_t {
		font-size: 20px;
		color: rgba(53, 130, 246)
	}

	.red_zero,
	.red_t {
		color: rgba(255, 97, 94)
	}

	.个人信息 {
		width: 90%;
		margin: 19px auto !important;
		background-color: #fff;
		border-radius: 10px;
	}

	.状态1 {
		border-right: 1px solid #f0f0f0;
	}

	.体温状态 {
		width: 50%;
		height: 55px;
		text-align: center;
		margin-top: 20px !important;
		margin-bottom: 20px !important;
	}

	.信息 {
		margin: 20px auto !important;
		margin-bottom: 0 !important;
		border-bottom: 1px solid #f0f0f0;
		height: 45px;
	}

	.信息 img {
		width: 91px;
		height: 29px;
		margin: -4px !important;
		margin-left: 210px !important;
	}

	.信息 span,
	.地址 {
		line-height: 34px;
		margin-left: 11px !important;

	}

	.地址 {
		font-size: 13px;
		height: 60px;
		line-height: 60px;
	}

	.信息 span {
		color: #5a5a5a;
		font-size: 15px;
	}


	.company-add {
		height: 37px;
		width: 270px;
		border-radius: 50px;
		padding: 10px;
		color: #007AFF;
		margin: 20px auto !important;
		text-align: center;
		font-size: 15px;
		border: 1px solid #007AFF;
		line-height: 37px;

	}

	.公司名称 {
		height: 37px;
		width: 120px;
		border-radius: 50px;
		padding: 10px;
		color: #007AFF;
		margin-left: 30px !important;
		margin-top: 18px !important;
		text-align: center;
		font-size: 15px;
		border: 1px solid #007AFF;
		line-height: 37px;
	}

	.company-add::before {
		content: '';
		display: table;
		clear: both;
	}

	.个人头像 {
		width: 100%;
		height: 95px;
		display: flex;
		padding: 0 1rem !important;
		justify-content: space-between;
		align-items: center;
		/* border-bottom: 1px solid #f0f0f0; */
	}

	.left {
		width: 80%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.left_content {
		width: 3.5rem;
		height: 3rem;
		background-image: url("../assets/fugong/person.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.h1 {
		color: #333;
		font-size: 14px;
        white-space: nowrap;
	}

	.number {
		color: #fff;
		font-size: 12px;
		display: inline-block;
		padding: 0.1rem 1rem;
		background-color: rgba(7, 129, 252);
		border-radius: 28px;
		margin-right: 0.5rem;
	}

	.right {
		width: 10%;
		height: 44%;
		background-image: url("../assets/fugong/erweima.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.今日体温 {
		font-size: 15px;
		margin-bottom: 6px !important;
	}

	.二维码 {
		width: 35px;
		height: 48px;
	}

	// .广告 img {
	// 	width: 100%;
	// }
    
    .广告 p{
        text-align: center;
        line-height: 3rem;
        background: rgb(241, 246, 250);
        color: rgb(61, 96, 130);
    }

	.name,
	.phone {
		position: absolute;
		font-size: 14px;
	}

	.name {
		top: 290px;
		left: 105px;
	}

	.phone {
		top: 310px;
		left: 102px;
	}

	.头像 {
		width: 57px;
		height: 60px;
		margin-top: 20px;
		margin-left: 12px;
		margin-bottom: 20px;
		position: relative;
	}

	.a-pre-title {
		font-size: 1.1rem;
		width: 100%;
		text-align: center;
		line-height: 4rem;
		color: #333;
	}

	.aui-palace-grid {
		float: none !important;
	}


	.aui-scrollView {
		background: rgba(0, 0, 0, .05);
		height: auto !important;
	}

	.banben {
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
	}

	.banben span {
		display: inline-flex;
		margin-bottom: 10px;
		font-size: 12px;
	}
	
	
	
	
	
	
	
	#qrCode {
		// transform: translateX(3%);
		transform: rotateZ(90deg);
	}
	
	.operation {
		position: fixed;
		top: 0;
		z-index: 9999;
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 5px 15px;
		align-items: center;
	
		.exit {
			font-size: 35px;
		}
	
		// .save{
	
		// }
	}
	
	.saveImg {
		position: fixed;
		width: 100vw;
		height: 100vh;
		z-index: 999999;
		top: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	
		span {
			font-size: 40px;
			color: rgba(255, 255, 255, 0.7);
			margin-bottom: 30px;
		}
	
		div {
			width: 70%;
			height: 50%;
			display: flex;
			align-items: center;
			overflow: hidden;
			border-radius: 5px;
		}
	
		p {
			padding-top: 20px;
			color: rgba(255, 255, 255, 0.5);
			font-size: 12px;
		}
	}
	.erweima {
		display: flex;
		flex-direction: column;
	}
	
	.erweima>div {
		padding: 30px 40px;
		margin: 0 30px;
		// border: 2px solid rgba(0, 0, 0, 0.3);
		border-radius: 20px;
	}
	
	.c_title {
		text-align: center;
	
		h1 {
			font-weight: normal;
			font-size: 30px;
			margin-bottom: 10px;
			padding: 0 20px;
		}
	
		p {
			padding-top: 10px;
			opacity: 0.6;
			margin-bottom: 50px;
			border-top: 1px dashed #aaaaaa;
		}
	}
	
	.aui-palace-one {
		display: flex;
		justify-content: space-around;
		width: 100%;
	}
	
	.aui-user-text span {
		width: 100%;
		display: flex;
		justify-content: center;
	}
	
	.erweima {
		position: fixed;
		width: 100vw;
		height: 100vh;
		background: #fff;
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	
	.aui-footer-fixed {
		z-index: 999;
	}

    .staff-all-list{
        margin: 19px !important;
        background: rgb(246, 244, 245);
        border-radius: 0.5rem;
    }

    .staff-all-list>.staff-par:first-child{
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
    }

    .staff-all-list>.staff-par:last-child{
        border-bottom-left-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
    }

    .staff-par{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        padding: 0.5rem;
    }

    .staff-par+.staff-par{
        border-top: 2px solid rgb(246, 244, 245)
    }

    .staff-head-portrait{
        width: 2rem;
        height: 2rem;
        background-image: url("../assets/fugong/person.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }

    .noResumption{
        display: inline-block;
        padding: 0.25rem 0.5rem;
        background: rgb(253, 97, 100);
        color: #fff;
        border-radius: 1rem;
        font-size: 0.8rem;
    }

    .resumption{
        display: inline-block;
        padding: 0.25rem 0.5rem;
        background: rgb(75, 201, 120);
        color: #fff;
        border-radius: 1rem;
        font-size: 0.8rem;
    }

    .search-all-apr{
        margin: 19px !important;
    }

    .search {
		display: flex;
		align-items: center;
        justify-content: space-around;
		width: 100%;
		background: #fff;

		input {
			height: 30px;
			border: none;
			width: 100%;
			background: rgba(0, 0, 0, .1);
			margin-left: 10px;
			border-radius: 5px;
			padding: 0 10px;
			outline: none;
		}

        select{
			height: 30px;
			border: none;
			width: 10rem;
			background: rgba(0, 0, 0, .1);
			margin-left: 10px;
			border-radius: 5px;
			padding: 0 10px;
			outline: none;
            color: #666;
        }

		div {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 40px;
			width: 40px;
			flex-shrink: 0;

			svg {
				color: #007AFF;
			}
		}
	}
    [v-cloak]{
        visibility: hidden !important; /*防止被覆盖*/
    }
    .no-staff{
        color: #666;
        text-align: center;
    }
</style>

<style>
    .virusNews-toBottom{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 1rem;
        color: rgb(197, 196, 196);
		background-color: rgba(0, 0, 0, 0.01);
    }
</style>
