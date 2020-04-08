<template>
	<section class="aui-flexView">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:history.back(-1);" class="aui-navBar-item">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">开工信息上报详情</span>
			</div>
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-sys"></i>
			</a>
		</header>
		<section class="aui-scrollView">
			<div class="aui-view-box">
				<div class="resumptionDetails-table">
					<div>
						<div class="resumption-fir-td">申请时间:</div>
						<div class="resumption-firsec-td">{{obj.date}}</div>
					</div>
					<div class="resumptionDetails-tr-tdColor">
						<div class="resumption-fir-td">申请状态:</div>
						<div class="resumption-firsec-td" v-show="obj.status==3" :class="obj.status==3?'':'resumptionDetails-colorRed'">已通过审核</div>
						<div class="resumption-firsec-td" v-show="obj.status==4" :class="obj.status==4?'resumptionDetails-colorRed':''">未通过</div>
						<div class="resumption-firsec-td" v-show="obj.status==2" :class="obj.status==2?'resumptionDetails-colorRed':''">审核中</div>
						<div class="resumption-firsec-td" v-show="obj.status==1" :class="obj.status==1?'resumptionDetails-colorRed':''">待审核</div>
					</div>
					<div class="resumptionDetails-tr-tdColor">
						<div v-show="obj.status==1"  class="resumption-fir-td" :class="obj.status==1?'resumptionDetails-colorRed':''">未处理:</div>
						<div v-show="obj.status==1" class="resumption-firsec-td" :class="obj.status==1?'resumptionDetails-colorRed':''">尚未处理,请耐心等待!</div>
						<div v-show="obj.status==2"  class="resumption-fir-td" :class="obj.status==2?'resumptionDetails-colorRed':''">正在处理:</div>
						<div v-show="obj.status==2" class="resumption-firsec-td" :class="obj.status==2?'resumptionDetails-colorRed':''">正在处理,请耐心等待!</div>
						<div v-show="obj.status==3"  class="resumption-fir-td" :class="obj.status==3?'':'resumptionDetails-colorRed'">开工建议:</div>
						<div v-show="obj.status==3" class="resumption-firsec-td" :class="obj.status==3?'':'resumptionDetails-colorRed'">{{obj.audit_explain||'暂无'}}</div>
						<div v-show="obj.status=='4'"  class="resumption-fir-td" :class="obj.status=='4'?'resumptionDetails-colorRed':''">未通过原因:</div>
						<div v-show="obj.status=='4'" class="resumption-firsec-td" :class="obj.status=='4'?'resumptionDetails-colorRed':''">{{obj.audit_explain||'暂无'}}</div>
					</div>
				</div>
				<div class="resumptionDetails-table">
          			<h6>企业基本信息</h6>
					<div class="resumptionDetails-tr-tdColor">
						<div class="resumption-fir-td">企业名称</div>
						<div class="resumption-firsec-td">{{coompenyInfo.name}}</div>
					</div>
					<div class="resumptionDetails-tr-tdColor">
						<div class="resumption-fir-td">信用代码</div>
						<div class="resumption-firsec-td">{{coompenyInfo.code}}</div>
					</div>
					<div class="resumptionDetails-tr-tdColor">
						<div class="resumption-fir-td" >办公地址</div>
						<div class="resumption-firsec-td">{{user.business_address}}</div>
					</div>
					<div class="resumptionDetails-tr-tdColor">
						<div class="resumption-fir-td" >业主单位</div>
						<div class="resumption-firsec-td">{{locationName}}</div>
					</div>
					<div class="resumptionDetails-tr-tdColor">
						<div class="resumption-fir-td" >法定代表人</div>
						<div class="resumption-firsec-td">{{user.leal_person}}</div>
					</div>
					<div class="resumptionDetails-tr-tdColor">
						<div class="resumption-fir-td" >企业所在行业</div>
						<div class="resumption-firsec-td">{{list2Value}}</div>
					</div>
					<div class="resumptionDetails-tr-tdColor">
						<div class="resumption-fir-td" >辖区管理单位</div>
						<div class="resumption-firsec-td">{{list1Value}}</div>
					</div>
				</div>
				<div class="resumptionDetails-table">
          			<h6>复工信息</h6>
					<div class="resumptionDetails-tr-tdColor">
						<div class="resumption-fir-td" >复工日期</div>
						<div class="resumption-firsec-td">{{obj.date}}</div>
					</div>
				</div>
				<div class="resumption-tr resumption-special-marginTop resumption-special-submitPar" style="margin-bottom:0.5rem;">
				    <span class="resumption-fir-span">
				        <span>复工员工信息</span>
				        <div class="resumption-tr">
				            <span @click="chheckPerson" style="color:red;">查看复工员工</span>
				        </div>
				    </span>
				</div>
				<div class="resumption-special-par resumption-special-marginTop">
					<div class="resumption-fir-td">复工原因</div>
					<div class="resumption-sec-td">
						<textarea rows="3" disabled v-model="obj.reason"></textarea>
					</div>
				</div>
				<div class="resumptionDetails-table">
					<div class="resumptionDetails-tr-tdColor resumption-special-marginTop">
						<div class="resumption-fir-td" >员工总人数</div>
						<div class="resumption-firsec-td">{{user.all_number}}人</div>
					</div>
					<div class="resumptionDetails-tr-tdColor resumption-special-marginTop">
						<div class="resumption-fir-td" >其中来自或去过重点地区的人数</div>
						<div class="resumption-firsec-td">{{user.epidemic_number}}人</div>
					</div>
					<div class="resumptionDetails-tr-tdColor resumption-special-marginTop">
						<div class="resumption-fir-td" >复工人数</div>
						<div class="resumption-firsec-td">{{obj.number}}人</div>
					</div>
					<div class="resumptionDetails-tr-tdColor resumption-special-marginTop">
						<div class="resumption-fir-td" >来自或去过重点地区的人数</div>
						<div class="resumption-firsec-td">{{obj.epidemics_number}}人</div>
					</div>
				</div>
				
				<div class="resumption-special-par resumption-special-marginTop">
					<div class="resumption-fir-td">防护措施</div>
					<div class="resumption-sec-td">
						<textarea rows="3" disabled v-model="obj.control_methods"></textarea>
					</div>
				</div>
				<!-- <div class="resumption-special-par resumption-special-marginTop">
					<div class="resumption-fir-td">防护物资</div>
					<div class="resumption-sec-td">
						<textarea rows="3" disabled v-model="obj.control_material"></textarea>
					</div>
				</div> -->
				
				<div class="resumptionDetails-table">
					<div class="resumptionDetails-tr-tdColor resumption-special-marginTop">
						<div class="resumption-fir-td" >占地面积</div>
						<div class="resumption-firsec-td">{{obj.area_covered}}平米</div>
					</div>
				</div>
				
				<div class="resumptionDetails-table">
          			<h6>复工物资检查</h6>
					<div class="resumptionDetails-tr-tdColor">
						<div class="resumption-fir-td">额温枪:</div>
						<div class="resumption-firsec-td">{{obj.thermometer_number}}个</div>
					</div>
					<div class="resumptionDetails-tr-tdColor">
						<div class="resumption-fir-td">消毒液:</div>
						<div class="resumption-firsec-td">{{obj.disinfectant_number}}升</div>
					</div>
					<div class="resumptionDetails-tr-tdColor">
						<div class="resumption-fir-td">医用酒精:</div>
						<div class="resumption-firsec-td">{{obj.alcohol_number}}升</div>
					</div>
					<div class="resumptionDetails-tr-tdColor">
						<div class="resumption-fir-td" >临时隔离场所:</div>
						<div class="resumption-firsec-td">{{obj.disinfection_sites_number}}个</div>
					</div>
					<div class="resumptionDetails-tr-tdColor">
						<div class="resumption-fir-td" >封闭式垃圾桶:</div>
						<div class="resumption-firsec-td">{{obj.dustbin_number}}个</div>
					</div>
					<div class="resumptionDetails-tr-tdColor">
						<div class="resumption-fir-td" >口罩:</div>
						<div class="resumption-firsec-td">{{obj.mask_number}}个</div>
					</div>
				</div>
				<div class="resumptionDetails-imgDiv-par">
					<span class="start">物资照片</span>
					<div class="resumptionDetails-img-par">
						<img :src="item" alt="" v-for="item in imgList1">
					</div>
				</div>
				<div class="resumptionDetails-imgDiv-par">
					<span class="start">防控承诺书</span>
					<div class="resumptionDetails-img-par ts-flex">
						<div v-for="(item,index) in imgList2">
							<img src="../assets/skin/images/file.png" alt="">
							<p>{{item}}</p>
						</div>
					</div>
				</div>
				<div class="resumptionDetails-imgDiv-par" v-show="obj.industry_id=='5'">
					<span class="start">建筑工地开(复)工自查(检查)表</span>
					<div class="resumptionDetails-img-par ts-flex">
						<div v-for="(item,index) in imgList3">
							<img src="../assets/skin/images/file.png" alt="">
							<p>{{item}}</p>
						</div>
					</div>
				</div>
				<div class="resumptionDetails-imgDiv-par" v-show="obj.industry_id=='5'">
					<span class="start">建筑工地,“三制”自查(检查)表</span>
					<div class="resumptionDetails-img-par ts-flex">
						<div v-for="(item,index) in imgList4">
							<img src="../assets/skin/images/file.png" alt="">
							<p>{{item}}</p>
						</div>
					</div>
				</div>
				<div class="resumptionDetails-imgDiv-par">
					<span class="start">更多材料</span>
					<div class="resumptionDetails-img-par ts-flex">
						<div v-for="(item,index) in imgList5">
							<img src="../assets/skin/images/file.png" alt="">
							<p>{{item}}</p>
						</div>
					</div>
				</div>
               
          		<!-- <h6>审核情况</h6>
				<div class="resumptionDetails-imgDiv-par">
					<nut-steps :current="current" >
						<nut-step title="已完成" content="2020.10.06 已通过复工审批部门审核"></nut-step>
						<nut-step title="进行中" content="2020.10.06 人员已通过公安部门审核"></nut-step>
					</nut-steps>
				</div> -->
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
				obj:{},
				imgList1:[],
				imgList2:[],
				imgList3:[],
				imgList4:[],
				imgList5:[],
				list:[],
				user:"",
				current:2,
				coompenyInfo:"",
				parkList:[],
				locationName:"",
				list1:"",
				list2:"",
				list1Value:"",
				list2Value:"",
            }
        },
		mounted(){
			const that = this;
			let token=localStorage.getItem('token')
    		this.coompenyInfo = JSON.parse(localStorage.getItem("CompenyInfo"));
			that.loading = that.$toast.loading();
			this.$api.information_record(
                // 参数token
            ).then(function(value) {
					that.obj=value.data.info
					that.user=value.data.enterprise_info
					that.imgList1=that.obj.material_photo.split(",")
					that.imgList2=that.obj.programme.split(",")
					if(that.obj.commencement_self_checking_form!=null){
						that.imgList3=that.obj.commencement_self_checking_form.split(",")
					}
					if(that.imgList4=that.obj.three_self_checking_form!=null){
						that.imgList4=that.obj.three_self_checking_form.split(",")
					}
					if(that.imgList5=that.obj.other_material!=null){
						that.imgList5=that.obj.other_material.split(",")
					}
					that.$api.resumptionSelect(that.obj.audit_department_type).then(function(his) {
						switch (his.data.code) {
							case 200:
								that.loading.hide();
								that.list1 = his.data.audit_department
								that.list2 = his.data.industry
								for(var i=0;i<that.list1.length;i++){
									if(that.list1[i].ITEM_CODE==that.obj.audit_department){
										that.list1Value=that.list1[i].DEPT_NAME
									}
								}
								for(var i=0;i<that.list2.length;i++){
									if(that.list2[i].dict_item_id==that.obj.industry_id){
										that.list2Value=that.list2[i].item_name
									}
								}
								break;
							default:
								that.$toast.text(his.data.msg);
								that.loading.hide();
								break;
						}
					});
					that.$api.parkList().then(function(his) {
						switch (his.data.code) {
							case 200:
								that.loading.hide();
								that.parkList = his.data.list
								for(var i=0;i<that.parkList.length;i++){
									if(that.parkList[i].id==that.obj.location){
										that.locationName=that.parkList[i].name
									}
								}
								break;
							default:
								that.$toast.text(his.data.msg);
								that.loading.hide();
								break;
						}
					});
                }
			)
			
			
        },
        methods: {
            chheckPerson(){
				this.$router.push({path:'resumptionPersonList',query:{'status':this.status}})
			}
        },
	};
</script>

<style lang="scss" scoped>
	@import '../assets/skin/css/tijiao.scss';
	@import '../assets/skin/css/jquery-labelauty.scss';
    @import "../assets/skin/css/resumptionDetails.scss";
	ul{list-style-type: none;}
	li{display: inline-block;}
	li{margin: 10px 0;}
	input.labelauty + label{font:12px "Microsoft Yahei";}
</style>
<style>
	
.person-par{
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.person-par div{
    margin-right: 1rem;
    width: 2rem;
    height: 2rem;
    border-radius: 2rem;
    background: #999;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
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
.aui-view-box h6{
    /* // line-height: 3rem; */
    font-size: 1rem;
    transform: translateX(1rem);
    color: rgb(82, 81, 81);
    margin-bottom: 1rem;
}
.aui-view-box h6::before{
    content: '|';
    color: #5a80d1;
}
</style>
