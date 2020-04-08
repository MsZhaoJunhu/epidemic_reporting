<template>
	<section class="aui-flexView">
		<TopHeader title="任务内页" isShow='true'>
			<template v-slot:rightBtn>
				<!-- <span class="over">新增任务</span> -->
			</template>
		</TopHeader>
		<section class="aui-scrollView">
			<div class="aui-view-box">
                <table class="resumption-table" v-for="item in taskList">
                    <tr>
                        <td class="resumption-fir-td">发起者</td>
                        <td class="resumption-sec-td task-details-td-flex">
                            <input type="text" v-model="item.create_by" disabled placeholder="请输入执行人名称">
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
                            <input type="text" v-model="item.user_name" disabled placeholder="请输入执行人名称">
                        </td>
                    </tr>
                    <tr>
                        <td class="resumption-fir-td">任务地址</td>
                        <td class="resumption-sec-td">
                            <input type="text" v-model="item.address" disabled placeholder="请输入mobile">
                        </td>
                    </tr>
                    <tr>
                        <td class="resumption-fir-td">任务描述</td>
                        <td class="resumption-sec-td">
                            <input type="text" v-model="item.t_explain" disabled placeholder="请输入任务描述">
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
                <table class="resumption-table table-border">
                    <tr>
                        <td class="resumption-fir-td">是否有异常情况</td>
                        <td class="resumption-sec-td">
                            <nut-radio 
                                v-model="radioVal1"
                                :label="0"
                            >否
                            </nut-radio>

                            <nut-radio 
                                v-model="radioVal1"
                                :label="1"
                            >是
                            </nut-radio>
                        </td>
                    </tr>
                </table>
                <table class="resumption-table table-border" v-show="radioVal1==1">
                    <tr>
                        <td class="resumption-fir-td">异常描述</td>
                        <td class="resumption-sec-td">
                            <input type="text" v-model="abnormal_explain" placeholder="若发现潜在感染者或密切接触者,请及时上报!">
                        </td>
                    </tr>
                </table>
                <!-- <table class="resumption-table table-border">
                    <tr>
                        <td class="resumption-fir-td">病例上报</td>
                        <td class="resumption-sec-td addTask-button-td">
                            <span>潜在感染者或密切接触者</span>
                            <button @click="clickTochoseTime">
                                <nut-icon type="right"></nut-icon>
                            </button>
                        </td>
                    </tr>
                </table> -->
                <table class="resumption-table table-border">
                    <tr>
                        <td class="resumption-fir-td">执行结果</td>
                        <td class="resumption-sec-td">
                            <input type="text" v-model="resout" placeholder="请输入">
                        </td>
                    </tr>
                </table>
                <div class="resumption-tr table-border" style="padding-bottom:0.5rem">
                    <span class="resumption-fir-span">取证上传</span>
                    <div class="resumption-sec-div">
                        <nut-imagepicker @imgMsg="imgMsg1" :width="120" :height="120" :margin="10" :imgList.sync="imgList1" ></nut-imagepicker>
                    </div>
                </div>
                <div class="addTask-button-pai-div">
                    <button @click="notDoing">取消任务</button>
                    <button class="submitAddTask" @click="doing">提交任务</button>
                    <nut-actionsheet :is-visible="isVisible" 
                        @close="switchActionSheet('isVisible')"
                    >
                        <div slot="custom" class="custom-wrap">
                            <span>取消的原因:</span>
                            <textarea v-model="value" placeholder="请输请输入取消的原因入"></textarea>
                            <div>
                                <button @click="isVisible=false">取消</button>
                                <button @click="notDoingSJ">确认</button>
                            </div>
                        </div>
                    </nut-actionsheet>
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
                radioVal1:"",
                imgList1:[],
                imgList11:[],
                name:"",
                // 选的那个任务ID
                index: this.$route.query.id,
                taskList:[],
                abnormal_explain:"",
                resout:"",
                isVisible:false,
                value:""
            }
        },
		mounted(){
            let user =JSON.parse(localStorage.getItem("Pinfo"))
            this.name=user.user_name;
            const that = this
            that.loading = that.$toast.loading();
            this.$api.taskListDetails(this.index).then((res)=>{
                switch (res.data.code){
                    case 200:
					    that.loading.hide();
                        that.taskList.push(res.data.info);
                        console.log(that.taskList)
                        break;
                    case 500:
					    that.loading.hide();
                        this.$toast.text(res.data.msg)
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
                this.$router.push({path:'caseworkList'})
            },
            imgMsg1(data) {
				const that = this;
				if (data.code == 1) {
					alert("upload");
				}
				this.imgList11 = [];
				for (let i in that.imgList1) {
					that.imgList11.push(that.imgList1[i].src);
				}
			},
            uploadImage1(){
                const that = this;
                this.$api.uploadImage(that.imgList11).then(function (value) {
                    that.imgList11=value.data.url
                })
            },
            doing(){
                this.uploadImage1();
                const that = this
                setTimeout(() => {
					that.loading = that.$toast.loading();
                    this.$api.taskReport(
                        that.taskList[0].id,
                        that.radioVal1,
                        that.abnormal_explain,
                        that.resout,
                        that.imgList11,
                    ).then((res)=>{
                        switch (res.data.code){
                            case 200:
							that.loading.hide();
                                this.$toast.text(res.data.msg)
                                this.$router.push({path:'taskList'})
                                break;
                            case 500:
							that.loading.hide();
                                this.$toast.text(res.data.msg)
                                break;
                            default:
                                break;
                        }
                    })
                }, 2000);
            },
            notDoing(){
                this.isVisible = true
            },
            switchActionSheet(){
                this.isVisible=false
            },
            notDoingSJ(){
                const that = this
				that.loading = that.$toast.loading();
                this.$api.taskEnd(that.taskList[0].id,this.value).then((res)=>{
                    switch (res.data.code){
                        case 200:
                            this.$toast.text(res.data.msg)
                            this.$router.push({path:'taskList'})
                            that.loading.hide();
							break;
                        case 500:
                            this.$toast.text(res.data.msg)
                            that.loading.hide();
							break;
                        default:
                            break;
                    }
                })
            }
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
<style>
    .nut-actionsheet-panel{ 
        height: 50%;
    }
    .nut-actionsheet-custom{
        width: 100%;
        height: 100%
    }
    .custom-wrap{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 1rem 1rem;
        box-sizing: border-box;
    }
    .custom-wrap textarea{
        margin-top: 1rem;
        height:4rem;
        text-indent: 1em;
        padding: 0.5rem;
    }
    .custom-wrap div{
        margin-top: 2rem;
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
</style>
