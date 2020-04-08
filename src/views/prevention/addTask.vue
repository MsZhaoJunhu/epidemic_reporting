<template>
	<section class="aui-flexView">
		<TopHeader title="新增任务" isShow='true'>
			<template v-slot:rightBtn>
				<!-- <span class="over">新增任务</span> -->
			</template>
		</TopHeader>
		<section class="aui-scrollView">
			<div class="aui-view-box">
                <table class="resumption-table">
                    <tr>
                        <td class="resumption-fir-td">执行人</td>
                        <td class="resumption-sec-td">
                            <input type="text" v-model="name" disabled placeholder="请输入执行人名称">
                        </td>
                    </tr>
                    <tr>
                        <td class="resumption-fir-td">任务地址</td>
                        <td class="resumption-sec-td">
                            <input type="text" v-model="address" placeholder="请输入任务描述">
                        </td>
                    </tr>
                    <tr>
                        <td class="resumption-fir-td">任务描述</td>
                        <td class="resumption-sec-td">
                            <input type="text" v-model="explain" placeholder="请输入任务描述">
                        </td>
                    </tr>
                    <tr>
                        <td class="resumption-fir-td">任务开始时间</td>
                        <td class="resumption-sec-td addTask-button-td">
                            <span>{{start_time}}</span>
                            <button @click="clickTochoseTime">
                                <nut-icon type="right"></nut-icon>
                            </button>
                            <nut-datepicker 
                                :is-visible="isVisible"
                                type="date"
                                title="请选择日期" 
                                :is-show-chinese="false"
                                :startDate="startTime"
                                @close="switchPicker"
                                @choose="setChooseValue"
                            >
                            </nut-datepicker>
                        </td>
                    </tr>
                    <tr>
                        <td class="resumption-fir-td">任务截止时间</td>
                        <td class="resumption-sec-td addTask-button-td">
                            <span>{{end_time}}</span>
                            <button @click="clickTochoseTime2">
                                <nut-icon type="right"></nut-icon>
                            </button>
                            <nut-datepicker 
                                :is-visible="isVisible2"
                                type="date"
                                title="请选择日期" 
                                :is-show-chinese="false"
                                :startDate="start_time"
                                @close="switchPicker2"
                                @choose="setChooseValue2"
                            >
                            </nut-datepicker>
                        </td>
                    </tr>
                </table>
                <div class="addTask-button-pai-div">
                    <!-- <button class="submitAddTaskStartusAdd">立即执行</button> -->
                    <button @click="submitAddTask">确认提交</button>
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
                isVisible:false,
                isVisible2:false,
                name:"",
                address:"",
                explain:"",
                start_time:"",
                end_time:"",
                startTime:"2020/02/09"
            }
        },
		mounted(){
            let user =JSON.parse(localStorage.getItem("Pinfo"))
            this.name=user.user_name;
            this.getCurrentDate();
        },
        methods: {
            // 获取时间
            getCurrentDate(){
                var timeStr = '-';
                var curDate = new Date();
                var curYear =curDate.getFullYear();  //获取完整的年份(4位,1970-????)
                var curMonth = curDate.getMonth()+1;  //获取当前月份(0-11,0代表1月)
                var curDay = curDate.getDate();       //获取当前日(1-31)
                var curWeekDay = curDate.getDay();    //获取当前星期X(0-6,0代表星期天)
                var curHour = curDate.getHours();      //获取当前小时数(0-23)
                var curMinute = curDate.getMinutes();   // 获取当前分钟数(0-59)
                var curSec =curDate.getSeconds();      //获取当前秒数(0-59)
                // var Current= curYear+timeStr+curMonth+timeStr+curDay+' '+curHour+':'+curMinute+':'+curSec;
                var Current= curYear+timeStr+curMonth+timeStr+curDay;
                this.startTime=Current;
            },
            switchPicker(){
                this.isVisible=false;
            },
            setChooseValue(value){
                this.isVisible=false;
                this.start_time=value[3];
            },
            clickTochoseTime(){
                this.isVisible=true;
            },
            switchPicker2(){
                this.isVisible2=false;
            },
            setChooseValue2(value){
                this.isVisible2=false;
                this.end_time=value[3];
            },
            clickTochoseTime2(){
                this.isVisible2=true;
            },
            submitAddTask(){
                const that=this
                that.loading = that.$toast.loading();
                this.$api.taskAdd(
                    that.address,
                    that.explain,
                    that.start_time,
                    that.end_time
                ).then((res)=>{
					switch (res.data.code){
						case 200:
                            that.loading.hide();
                            this.$toast.text("新增任务成功!")
							this.$router.push({name:'fangkong'})
							break;
						case 500:
							this.$toast.text(res.data.msg)
                            that.loading.hide();
							break;
						default:
							this.$toast.text(res.data.msg)
                            that.loading.hide();
							break;
					}
				})
            },
		},
	};
</script>

<style lang="scss" scoped>
	@import '../../assets/skin/css/addTask.scss';
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
