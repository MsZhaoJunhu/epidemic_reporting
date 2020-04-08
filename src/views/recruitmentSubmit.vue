<template>
	<section class="aui-flexView">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:history.back(-1);" class="aui-navBar-item">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">招工登记</span>
			</div>
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-sys"></i>
			</a>
		</header>
		<section class="aui-scrollView">
			<div class="aui-view-box">
                <h6><i></i>企业基本信息</h6>
                <label>
                    <span>企业名称</span>
                    <span>{{companyInfo.name}}</span>
                </label>
                <label>
                    <span>统一社会信用代码</span>
                    <span>{{companyInfo.code}}</span>
                </label>
                <label>
                    <span>法定代表人</span>
                    <span>{{companyInfo.leal_person}}</span>
                </label>
                <label>
                    <span>联系电话</span>
                    <span>{{companyInfo.mobile}}</span>
                </label>
                <label>
                    <span>公司地址</span>
                    <span>{{companyInfo.business_address}}</span>
                </label>
                <label>
                    <span>所属行业</span>
                    <span>{{industry_name}}</span>
                </label>
                <label>
                    <span>业主单位</span>
                    <span>{{location}}</span>
                </label>
                <label>
                    <span>辖区管理单位</span>
                    <span>{{audit_department_name}}</span>
                </label>
                <h6>招工基本信息</h6>
                <label class="textarea-label">
                    <p>福利待遇</p>
                    <textarea rows="5" v-model="welfare" placeholder="请输入福利待遇"></textarea>
                </label>
                <label class="textarea-label">
                    <p>相关要求</p>
                    <textarea rows="5" v-model="requirement" placeholder="请输入相关要求"></textarea>
                </label>
                <h6>招工岗位信息</h6>
                <div class="user-content-fullIn" v-for="(item,index) in jobInformation" :key="index">
                    <div class="delete-user-content" @click="deleteJob(index)">
                        <nut-icon type="cross" size="0.7rem" color="#fff"></nut-icon>
                    </div>
                    <label style="padding-top: 1.5rem;">
                        <span>工作地点</span>
                        <input type="text" v-model="item.working_place" placeholder="请输入工作地点">
                    </label>
                    <label>
                        <span>岗位类型</span>
                        <input type="text" v-model="item.post_type" placeholder="请输入岗位类型">
                    </label>
                    <label>
                        <span>招聘人数</span>
                        <input type="number" v-model="item.recruit_number" placeholder="请输入招聘人数">
                    </label>
                    <label>
                        <span>薪资</span>
                        <div>
                            <input type="number" v-model="item.salary" placeholder="请输入薪资">元
                        </div>
                    </label>
                    <label>
                        <span>是否为疫情防控居民生活必需等重点企业岗位</span>
                        <select v-model="item.is_key_enterprise">
                            <option value="-1" :select="item.is_key_enterprise==-1">请选择</option>
                            <option value="1" :select="item.is_key_enterprise==1">是</option>
                            <option value="0" :select="item.is_key_enterprise==0">否</option>
                        </select>
                    </label>
                    <label class="textarea-label">
                        <p>备注</p>
                        <textarea rows="5" v-model="item.remarks" placeholder="请输入备注"></textarea>
                    </label>
                </div>
                <div class="add-btn">
                    <button @click="addJobInformation">+&nbsp;新增岗位</button>
                </div>
                <div class="submit-btns">
                    <button @click="preserve">保存</button>
                    <button @click="submitAll">提交</button>
                </div>
			</div>
		</section>
	</section>
</template>

<script>
	import axios from "axios";
	export default {
		name: "resumptions",
		data() {
			return {
                companyInfo:"",
                parkList:"",
                // 福利
                welfare:"",
                // 要求
                requirement:"",
                // 岗位信息
                jobInformation:[
                    {working_place:"",post_type:"",recruit_number:"",salary:"",is_key_enterprise:"-1",remarks:""}
                ],
                industry_name:"",
                location:"",
                audit_department_name:"",
                id:"",
			};
		},
		created () {
            const that = this;
            that.loading = that.$toast.loading();
            that.$api.information_record().then(function(res) {
                that.companyInfo = res.data.enterprise_info;
                that.loading.hide();
                that.$api.resumptionSelect(res.data.info.audit_department_type).then(function(his) {
                    switch (his.data.code) {
                        case 200:
                            for(var i=0;i<his.data.audit_department.length;i++){
                                if(res.data.info.audit_department==his.data.audit_department[i].ITEM_CODE){
                                    that.audit_department_name=his.data.audit_department[i].DEPT_NAME
                                }
                            }
                            for(var i=0;i<his.data.industry.length;i++){
                                if(res.data.info.industry_id==his.data.industry[i].dict_item_id){
                                    that.industry_name=his.data.industry[i].item_name
                                }
                            }
                            break;
                        default:
                            that.$toast.text(his.data.msg);
                            break;
                    }
                });
                that.$api.parkList().then(function(his) {
                    switch (his.data.code) {
                        case 200:
                            for(var i=0;i<his.data.list.length;i++){
                                if(his.data.list[i].id==res.data.info.location){
                                    that.location=his.data.list[i].name
                                }
                            }
                            break;
                        default:
                            that.$toast.text(his.data.msg);
                            break;
                    }
                });
            });
            if(that.$route.query.index){
                that.loading = that.$toast.loading();
                this.compenyInfo = JSON.parse(localStorage.getItem("CompenyInfo"));
                that.$api.recruitList().then(function(his) {
                    switch (his.data.code) {
                        case 200:
                            that.loading.hide();
                            console.log(his)
                            for(var i=0;i<his.data.list.length;i++){
                                if(his.data.list[i].id==that.$route.query.index){
                                    that.welfare=his.data.list[i].welfare
                                    that.requirement=his.data.list[i].requirement
                                    that.jobInformation=his.data.list[i].post
                                    that.id=his.data.list[i].id
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
        },
		methods: {
			addJobInformation(){
                this.jobInformation.push({working_place:"",post_type:"",recruit_number:"",salary:"",is_key_enterprise:"-1",remarks:""})
            },
            deleteJob(i){
                this.jobInformation.splice(i,1)
            },
            submitAll(){
                const that = this;
                for(var i=0;i<that.jobInformation.length;i++){
                    if(that.jobInformation[i].is_key_enterprise=='-1'||that.jobInformation[i].working_place==""||that.jobInformation[i].post_type==""||that.jobInformation[i].recruit_number==""||that.jobInformation[i].salary==""){
                        that.$toast.text('招工岗位信息填写不全！请填写');
                        return ;
                    }
                }
                if(that.welfare==''){
                    that.$toast.text('您尚未输入福利待遇！');
                    return ;
                }else if(that.requirement==''){
                    that.$toast.text('您尚未输入相关要求！');
                    return ;
                }else if(!that.jobInformation.length>0){
                    that.$toast.text('请添加招工岗位信息');
                    return ;
                }else{
                    that.loading = that.$toast.loading();
                    that.$api.recruitSubmit(that.welfare,that.requirement,that.jobInformation,that.id).then(function(his) {
                        switch (his.data.code) {
                            case 200:
                                that.loading.hide();
                                that.$router.push('recruitment')
                                break;
                            default:
                                that.$toast.text(his.data.msg);
                                that.loading.hide();
                                break;
                        }
                    });
                }
                
            },
            preserve(){
                const that = this;
                that.loading = that.$toast.loading();
                that.$api.recruitPreserve(that.welfare,that.requirement,that.jobInformation,that.id).then(function(his) {
                    switch (his.data.code) {
                        case 200:
                            that.loading.hide();
                            that.$router.push('recruitment')
                            break;
                        default:
                            that.$toast.text(his.data.msg);
                            that.loading.hide();
                            break;
                    }
                });
            },
		}
	};
</script>

<style lang="scss" scoped>
	@import "../assets/skin/css/tijiao.scss";
	@import "../assets/skin/css/jquery-labelauty.scss";
	@import "../assets/skin/css/resumption.scss";

	* {
		font-size: 13px !important;
	}

	select,
	option {
		direction: rtl
	}

	select {
		position: relative;
		padding-right: 10px;
		/*将默认的select选择框样式清除*/
		appearance: none;
		-moz-appearance: none;
		-webkit-appearance: none;
	}

	/*IE浏览器隐藏下拉箭头*/
	select::-ms-expand {
		display: none;
	}

	.select {
		position: relative;
	}

	.select:after {
		content: '';
		position: absolute;
		display: block;
		right: 9px;
		top: 15px;
		height: 5px;
		width: 5px;
		border: 2px solid #007AFF;
		border-right: none;
		border-bottom: none;
		transform: rotateZ(-135deg);
	}

	ul {
		list-style-type: none;
	}

	li {
		display: inline-block;
	}

	li {
		margin: 10px 0;
	}

	input.labelauty+label {
		font: 12px "Microsoft Yahei";
    }
    .aui-center-title{
        font-size: 16px !important;
    }
    .aui-view-box{
        display: flex;
        flex-direction: column;
    }
    .aui-view-box>*{
        box-sizing: border-box;
        padding: 0 1rem;
    }
    .aui-view-box h6{
        line-height: 3rem;
        font-size: 16px !important;
        font-weight: normal;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .aui-view-box h6>i{
        display: inline-block;
        width: 3px;
        height: 1rem;
        border-radius: 3px;
        background-color: #007AFF;
    }
    .aui-view-box label{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        padding: 0.75rem 1rem;
    }
    .aui-view-box label+label{
        border-top: 1px solid #eee;
    }
    .aui-view-box .textarea-label{
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }
    .aui-view-box .textarea-label textarea{
        width: 100%;
        margin-top: 0.5rem;
        border: 0;
        resize: none;
    }
    .aui-view-box .user-content-fullIn{
        padding: 0;
        position: relative;
    }
    .aui-view-box .user-content-fullIn input{
        border: 0;
        text-align: right;
    }
    .aui-view-box .user-content-fullIn select{
        background: #fff;
        border: 0;
    }
    .add-btn{
        width: 100%;
        height: 4rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .add-btn button{
        width: 70%;
        height: 50%;
        background: #fff;
        border: 1px solid #007AFF;
        border-radius: 2rem;
        color: #007AFF;
    }
    .submit-btns{
        width: 70%;
        height: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
        padding: 0 0.5rem;
        margin-bottom: 1rem;
    }
    .submit-btns button{
        height: 100%;
        width: 40%;
        border-radius: 1rem;
        background: #007AFF;
        color: #fff;
        border: 0;
    }
    .delete-user-content{
        width: 1.25rem;
        height: 1.25rem;
        position: absolute;
        top: -0.5rem;
        left: 1rem;
        border-radius: 1rem;
        background: #999;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .user-content-fullIn{
        margin-top: 1rem;
    }
</style>
