<template>
	<section class="aui-flexView">
		<TopHeader title="任务列表" isShow='true'>
			<template v-slot:rightBtn>
				<!-- <span class="over">新增任务</span> -->
			</template>
		</TopHeader>
		<section class="aui-scrollView">
			<div class="aui-view-box">
                <div class="taskList-top-divBtn">
                    <div @click="taskListTopChange(0)" :class="taskListTop==0?'taskList-active-top':''">所有任务</div>
                    <div @click="taskListTopChange(1)" :class="taskListTop==1?'taskList-active-top':''">我的任务</div>
                </div>
                <div class="taskList-content-par">
                    <div class="taskList-content-par-div" v-for="(item,i) in taskList" :key="i" @click="clickToView(item.status,item.id)">
                        <div class="taskList-fir-div">
                            <div>
                                执行人: <span>{{item.user_name}}</span>
                            </div>
                            <div>
                                <div class="taskList-fk" :class="item.status=='1'?'color1':item.status=='2'?'color2':item.status=='3'?'color2':item.status=='4'?'colo3':'color4'"></div>
                                <span v-show="item.status=='1'">待执行</span>
                                <span v-show="item.status=='2'">进行中</span>
                                <span v-show="item.status=='3'">待审核</span>
                                <span v-show="item.status=='4'">已完成</span>
                                <span v-show="item.status=='5'">已取消</span>
                                <nut-icon 
                                    type="right"
                                    size="16px"
                                    color="#999"
                                >
                                </nut-icon>
                            </div>
                        </div>
                        <div class="taskList-sec-div">
                            {{item.t_explain}}
                        </div>
                        <div class="taskList-last-div">
                            {{item.start_time}}
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
                // 控制显示
                taskListTop:0,
                // 控制显示状态
                colorStatus:0,
                // 列表数组
                taskList:[],
                name:""
            }
        },
		mounted(){
            let user =JSON.parse(localStorage.getItem("Pinfo"))
            this.name=user.user_name;
            const that = this
			that.loading = that.$toast.loading();
            this.$api.taskAllList().then((res)=>{
                switch (res.data.code){
                    case 200:
					    that.loading.hide();
                        that.taskList=res.data.list
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
            clickToView(status,index){
                switch (status) {
                    case 1:
                        this.$router.push({path:'taskDetails',query:{"taskListTop":this.taskListTop,"id":index}})
                        break;
                    case 2:
                        this.$router.push({path:'taskSubmit',query:{"taskListTop":this.taskListTop,"id":index}})
                        break;
                
                    default:
                        this.$router.push({path:'taskSubmitDetails',query:{"taskListTop":this.taskListTop,"id":index}})
                        break;
                }
                
            },
            taskListTopChange(index){
                const that = this
                this.taskListTop=index
                switch (index) {
                    case 1:
					that.loading = that.$toast.loading();
                        this.$api.taskList().then((res)=>{
                            switch (res.data.code){
                                case 200:
								that.loading.hide();
                                    that.taskList=res.data.list
                                    console.log(that.taskList)
                                    break;
                                case 500:
								that.loading.hide();
                                    this.$toast.text(res.data.msg)
                                    break;
                                default:
                                    break;
                            }
                        })
                        break;
                
                    default:
					that.loading = that.$toast.loading();
                        this.$api.taskAllList().then((res)=>{
                            switch (res.data.code){
                                case 200:
								that.loading.hide();
                                    that.taskList=res.data.list
                                    break;
                                case 500:
								that.loading.hide();
                                    this.$toast.text(res.data.msg)
                                    break;
                                default:
                                    break;
                            }
                        })
                        break;
                }
            }
		},
	};
</script>

<style lang="scss" scoped>
	@import '../../assets/skin/css/tasklist.scss';

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
