<template>
	<section class="aui-flexView">
		<TopHeader title="任务内页" isShow='true'>
			<template v-slot:rightBtn>
				<!-- <span class="over">新增任务</span> -->
			</template>
		</TopHeader>
		<section class="aui-scrollView">
			<div class="aui-view-box">
                <table class="resumption-table" style="border:0;" v-for="item in taskList">
                    <tr>
                        <td class="resumption-fir-td">发起者</td>
                        <td class="resumption-sec-td task-details-td-flex">
                            <input type="text" v-model="item.create_by">
                            <div>
                                <div class="taskList-fk" :class="item.status=='1'?'color1':item.status=='2'?'color2':item.status=='3'?'color2':item.status=='4'?'colo3':'color4'"></div>
                                <span v-show="item.status=='1'">待执行</span>
                                <span v-show="item.status=='2'">进行中</span>
                                <span v-show="item.status=='3'">待审核</span>
                                <span v-show="item.status=='4'">已完成</span>
                                <span v-show="item.status=='5'">已取消</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="resumption-fir-td">执行人</td>
                        <td class="resumption-sec-td">
                            <input type="text" v-model="item.user_name" disabled>
                        </td>
                    </tr>
                    <tr>
                        <td class="resumption-fir-td">联系方式</td>
                        <td class="resumption-sec-td">
                            <input type="text" v-model="mobile" disabled>
                        </td>
                    </tr>
                    <tr>
                        <td class="resumption-fir-td">任务地址</td>
                        <td class="resumption-sec-td">
                            <input type="text" v-model="item.address" disabled>
                        </td>
                    </tr>
                    <tr>
                        <td class="resumption-fir-td">任务描述</td>
                        <td class="resumption-sec-td">
                            <input type="text" v-model="item.t_explain" disabled>
                        </td>
                    </tr>
                    <tr>
                        <td class="resumption-fir-td">任务起止时间</td>
                        <td class="resumption-sec-td">
                            <span>{{item.start_time}}</span>
                            至
                            <span>{{item.end_time}}</span>
                        </td>
                    </tr>
                </table>
                <table class="resumption-table" style="border:0;">
                    <tr>
                        <td class="resumption-fir-td">是否有异常情况</td>
                        <td class="resumption-sec-td">
                            <nut-radio 
                                v-model="radioVal1"
                                :label="0"
                                disabled
                            >否
                            </nut-radio>

                            <nut-radio 
                                v-model="radioVal1"
                                :label="1"
                                disabled
                            >是
                            </nut-radio>
                        </td>
                    </tr>
                </table>
                <table class="resumption-table" style="border:0;" v-for="item in taskList">
                    <tr>
                        <td class="resumption-fir-td">异常描述</td>
                        <td class="resumption-sec-td">
                            <input type="text" disabled v-model="item.abnormal_explain">
                        </td>
                    </tr>
                    <tr>
                        <td class="resumption-fir-td">执行结果</td>
                        <td class="resumption-sec-td">
                            <input type="text" disabled v-model="item.result">
                        </td>
                    </tr>
                </table>
                <div class="resumption-tr table-border" style="padding-bottom:0.5rem;border:0;">
                    <span class="resumption-fir-span">取证上传</span>
                    <div class="resumption-sec-div">
                        <div class="resumption-file-box resumption-file-img-box" v-show="imgList2!=''">
                            <img :src="item" alt="" v-for="(item,i) in imgList2" :key="i" v-show="item">
                        </div>
                    </div>
                </div>
			</div>
		</section>
	</section>
</template>

<script>
	import TopHeader from '@/components/TopHeader.vue'
	export default {
        name: "",
		components:{
			TopHeader
		},
        data() {
            return {
                radioVal1:0,
                imgList2:[],
                name:"",
                index: this.$route.query.id,
                taskList:[],
                mobile:""
            }
        },
		mounted(){
            let user =JSON.parse(localStorage.getItem("Pinfo"))
            this.name=user.user_name;
            this.mobile=user.mobile;
            const that = this
            that.loading = that.$toast.loading();
            this.$api.taskListDetails(that.index).then((res)=>{
                switch (res.data.code){
                    case 200:
                        that.loading.hide();
                        that.taskList.push(res.data.info);
                        that.radioVal1=that.taskList[0].is_abnormal
                        if(that.taskList[0].obtain_evidence){
                            that.imgList2=that.taskList[0].obtain_evidence.split(',')
                        }
						that.loading.hide();
                        break;
                    case 500:
                        that.loading.hide();
                        this.$toast.text(res.data.msg)
						that.loading.hide();
                        break;
                    default:
                        that.loading.hide();
                        this.$toast.text(res.data.msg)
                        break;
                }
            })
        },
        methods: {
            clickTochoseTime(){
                // 跳转
            },
		},
	};
</script>

<style lang="scss" scoped>
	@import '../../assets/skin/css/taskSubmit.scss';

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
</style>
