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
                                <div class="taskList-fk" :class="item.status==1?'color1':item.status==2?'color2':item.status==3?'color2':item.status==4?'colo3':'color4'"></div>
                                <span v-show="item.status==1">待执行</span>
                                <span v-show="item.status==2">进行中</span>
                                <span v-show="item.status==3">待审核</span>
                                <span v-show="item.status==4">已完成</span>
                                <span v-show="item.status==5">已取消</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="resumption-fir-td">执行人</td>
                        <td class="resumption-sec-td">
                            <input type="text" v-model="item.user_name" disabled placeholder="请输入任务描述">
                        </td>
                    </tr>
                    <tr>
                        <td class="resumption-fir-td">任务地址</td>
                        <td class="resumption-sec-td">
                            <input type="text" v-model="item.address" disabled placeholder="请输入任务描述">
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
                            <!-- <input type="text" v-model="item.start_time,item.end_time" disabled placeholder="请输入任务描述"> -->
                            <span>{{item.start_time}}</span>
                            至
                            <span>{{item.end_time}}</span>
                        </td>
                    </tr>
                </table>
                <div class="addTask-button-pai-div">
                    <button @click="notDoing">取消任务</button>
                    <button class="submitAddTask" @click="doing">执行任务</button>
                </div>
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
                // 是否是所有任务/我的任务
                taskListTop: this.$route.query.taskListTop,
                // 选的那个任务ID
                index: this.$route.query.id,
                taskList:[],
                name:"",
                isVisible:false,
                value:""
            }
        },
		mounted(){
            let user =JSON.parse(localStorage.getItem("Pinfo"))
            this.name=user.user_name;
            const that = this
			that.loading = that.$toast.loading();
            this.$api.taskListDetails(that.index).then((res)=>{
                switch (res.data.code){
                    case 200:
                        that.taskList.push(res.data.info);
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
        },
        methods: {
            doing(){
                const that = this
				that.loading = that.$toast.loading();
                this.$api.taskStart(that.taskList[0].id).then((res)=>{
                    switch (res.data.code){
                        case 200:
                            this.$toast.text(res.data.msg)
                            this.$router.push({path:'taskSubmit',query:{"id":that.taskList[0].id}})
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
	@import '../../assets/skin/css/taskDetails.scss';

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
