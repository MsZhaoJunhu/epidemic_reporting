<template>
	<section class="aui-flexView">
		<section class="aui-scrollView">
			<div class="aui-reg-body">
				<!-- <div class="aui-cell-item">
					<h2>{{isScanCode?'请选择注册类型':'注册类型'}}</h2>
					<div class="aui-palace aui-palace-one">
						<a href="javascript:;" class="aui-palace-grid" :class="change == 0?'active':''">
							<div class="aui-palace-grid-icon">
								<img src="../assets/skin/images/icon-item-01.png" alt="">
							</div>
							<div class="aui-palace-grid-text">
								<h3>个人用户</h3>
							</div>
						</a>
						<a href="javascript:;" class="aui-palace-grid" @click="clickToRouter" :class="change == 1?'active':''" v-show="isScanCode">
							<div class="aui-palace-grid-icon">
								<img src="../assets/skin/images/icon-item-02.png" alt="">
							</div>
							<div class="aui-palace-grid-text">
								<h3>组织用户</h3>
							</div>
						</a>
					</div>
				</div> -->

				<div class="aui-cell-item" v-if="change==0">
					<h2>用户注册</h2>
					<div class="aui-reg-item-for">
						<i class="icon icon-phone"></i>
						<input name="name" type="text" placeholder="请输入真实姓名" v-model="name">
					</div>
					<div class="aui-reg-item-for">
						<i class="icon icon-phone"></i>
						<input id="idcode" type="text" placeholder="请输入身份证号码" v-model="user.idCode">
					</div>
					<div class="aui-reg-item-for select-par-special">
						<i class="icon icon-phone"></i>
                        <select class="select-style-special" @change="changeArea1($event)" :class="area1!='0'?'selected-colorHuiSe':''">
                            <!-- <option selected value="0" style="display:none;">选择地区</option> -->
                            <option :value="item.item_code" v-for="item in area1List">{{item.item_name}}</option>
                        </select>
                        <select class="select-style-special" @change="changeArea2($event)" :class="area2!='0'?'selected-colorHuiSe':''">
                            <!-- <option selected value="0" style="display:none;">选择地区</option> -->
                            <option :value="item.item_code" v-for="item in area2List">{{item.item_name}}</option>
                        </select>
                        <select class="select-style-special" @change="changeArea3($event)" :class="area3!='0'?'selected-colorHuiSe':''">
                            <!-- <option selected value="0" style="display:none;">选择地区</option> -->
                            <option :value="item.item_code" v-for="item in area3List">{{item.item_name}}</option>
                        </select>
					</div>
					<div class="aui-reg-item-for">
						<i class="icon icon-phone"></i>
                        <select class="select-style" @change="changeArea4($event)" v-model="area4">
                            <option selected value="0" style="display:none;">选择地区</option>
                            <option :value="item.item_code" v-for="item in area4List">{{item.item_name}}</option>
                        </select>
					</div>
					<div class="aui-reg-item-for">
						<i class="icon icon-phone"></i>
						<input id="detail_address" type="text" placeholder="请输入现居住地址" v-model="detail_address">
					</div>
					<div class="aui-reg-item-for">
						<i class="icon icon-phone"></i>
						<input id="phone1" type="number" placeholder="请输入手机号码" v-model="phone">
					</div>
					<div class="aui-reg-item-for">
						<i class="icon icon-code"></i>
						<input id="code1" type="text" autocomplete="off" placeholder="请输入验证码" v-model="code">
						<input id="btnSendCode1" type="button" class="aui-code-btn" value="获取验证码" @click="sendM()" v-if="isSend == false">
						<button id="btnSendCode1" type="button" class="aui-code-btn" v-else>请等待{{timer}}秒</button>
					</div>
					<div class="aui-reg-cell-right">
						<label class="cell-right">
							<input type="checkbox" value="1" name="checkbox" :checked="isCheck?'checked':''" @click="isCheck = !isCheck">
							<i class="cell-checkbox-icon"></i>
							<p>我同意 <em>《用户协议书》</em></p>
						</label>
					</div>
					<div class="aui-reg-item-go">
						<button @click="submitUser()">立即注册</button>
					</div>
					<div class="aui-reg-cell-right">
						<label class="cell-right">
							<router-link to="/login">已有帐号,去登录</router-link>
						</label>
					</div>
				</div>

				<div class="aui-cell-item" v-else-if="change==1">
					<h2>企业注册</h2>
					<div class="aui-reg-item-for">
						<i class="icon icon-phone"></i>
						<input id="account" type="text" placeholder="请输入注册账号" v-model="enterprise.account">
					</div>
					<div class="aui-reg-item-for">
						<i class="icon icon-phone"></i>
						<input name="name" type="text" placeholder="请输入企业/机构全称" v-model="name">
					</div>
					<div class="aui-reg-item-for">
						<i class="icon icon-phone"></i>
						<input id="phone1" type="text" placeholder="请输入统一信用代码" v-model="enterprise.institutionCode">
					</div>
					<div class="aui-reg-item-for">
						<i class="icon icon-phone"></i>
						<input id="phone1" type="number" placeholder="请输入手机号码" v-model="phone">
					</div>
					<div class="aui-reg-item-for">
						<i class="icon icon-code"></i>
						<input id="code1" type="text" autocomplete="off" placeholder="请输入验证码" v-model="code">
						<input id="btnSendCode1" type="button" class="aui-code-btn" @click="sendM()" value="获取验证码" v-if="isSend == false">
						<button id="btnSendCode1" type="button" class="aui-code-btn" v-else>请等待{{timer}}秒</button>
					</div>
					<div class="aui-reg-cell-right">
						<label class="cell-right">
							<input type="checkbox" value="1" name="checkbox" :checked="isCheck?'checked':''" @click="isCheck = !isCheck">
							<i class="cell-checkbox-icon"></i>
							<p>我同意 <em>《用户协议书》</em></p>
						</label>
					</div>
					<div class="aui-reg-item-go">
						<button @click="submitEnterprise()">立即注册</button>
					</div>
					<div class="aui-reg-cell-right">
						<label class="cell-right">
							<router-link to="/login">已有帐号,去登录</router-link>
						</label>
					</div>
				</div>

				<div class="aui-cell-item">
					<div class="aui-reg-sit">
						<a href="javascript:;" class="aui-flex">
							<div class="aui-tag-img">
								<img src="../assets/登录/com_icon1.png" alt="" />
							</div>
							<div class="aui-flex-box">
								<h3>关联企业</h3>
								<p>搜索企业,关联所属企业</p>
							</div>
						</a>
						<a href="javascript:;" class="aui-flex">
							<div class="aui-tag-img">
								<img src="../assets/登录/com_icon2.png" alt="" />
							</div>
							<div class="aui-flex-box">
								<h3>上班打卡</h3>
								<p>无接触登记、人员轨迹轨迹提醒</p>
							</div>
						</a>
						<a href="javascript:;" class="aui-flex">
							<div class="aui-tag-img">
								<img src="../assets/登录/com_icon3.png" alt="" />
							</div>
							<div class="aui-flex-box">
								<h3>疫情资讯</h3>
								<p>查看疫情和防控讯息</p>
							</div>
						</a>
					</div>
					
					
				</div>
				<div class="aui-footer-bg">
					<img src="../assets/skin/images/footer-bg.png" alt="">
					<div class="aui-footer-text">
						<p>技术支持：重庆城银科技股份有限公司</p>
						<!-- <h2>联系我们 <em>15213281690</em></h2> -->
					</div>
				</div>
			</div>
		</section>
	</section>
</template>
	
<script>
	export default {
		name: "reg",
		data() {
			return {
				change: 0,
				name:'',
				phone:'',
				code:'',
				user: {
					idCode: '',
				},
				enterprise: {
					account:'',
					institutionCode: '',
				},
				isCheck:false,
				isSend:false,
				timer:60,
				dsq:null,
				isScanCode:false,
                area1: "50",
                area2: "5001",
                area3: "500112",
                area4: "0",
                area1List: [{
                	"item_code": "500112002",
                	"item_name": "重庆市"
                },],
                area2List: [{
                	"item_code": "500112002",
                	"item_name": "市辖区"
                },],
                area3List: [{
                	"item_code": "500112002",
                	"item_name": "渝北区"
                },],
                area4List: [{
                	"item_code": "500112002",
                	"item_name": "双龙湖街道"
                }, {
                	"item_code": "500112004",
                	"item_name": "回兴街道"
                }, {
                	"item_code": "500112007",
                	"item_name": "鸳鸯街道"
                }, {
                	"item_code": "500112008",
                	"item_name": "翠云街道"
                }, {
                	"item_code": "500112009",
                	"item_name": "人和街道"
                }, {
                	"item_code": "500112010",
                	"item_name": "天宫殿街道"
                }, {
                	"item_code": "500112011",
                	"item_name": "龙溪街道"
                }, {
                	"item_code": "500112012",
                	"item_name": "龙山街道"
                }, {
                	"item_code": "500112013",
                	"item_name": "龙塔街道"
                }, {
                	"item_code": "500112014",
                	"item_name": "大竹林街道"
                }, {
                	"item_code": "500112015",
                	"item_name": "悦来街道"
                }, {
                	"item_code": "500112016",
                	"item_name": "两路街道"
                }, {
                	"item_code": "500112017",
                	"item_name": "双凤桥街道"
                }, {
                	"item_code": "500112018",
                	"item_name": "王家街道"
                }, {
                	"item_code": "500112019",
                	"item_name": "礼嘉街道"
                }, {
                	"item_code": "500112020",
                	"item_name": "宝圣湖街道"
                }, {
                	"item_code": "500112021",
                	"item_name": "金山街道"
                }, {
                	"item_code": "500112022",
                	"item_name": "康美街道"
                }, {
                	"item_code": "500112023",
                	"item_name": "仙桃街道"
                }, {
                	"item_code": "500112129",
                	"item_name": "玉峰山镇"
                }, {
                	"item_code": "500112131",
                	"item_name": "龙兴镇"
                }, {
                	"item_code": "500112133",
                	"item_name": "统景镇"
                }, {
                	"item_code": "500112135",
                	"item_name": "大湾镇"
                }, {
                	"item_code": "500112138",
                	"item_name": "兴隆镇"
                }, {
                	"item_code": "500112139",
                	"item_name": "木耳镇"
                }, {
                	"item_code": "500112140",
                	"item_name": "茨竹镇"
                }, {
                	"item_code": "500112141",
                	"item_name": "古路镇"
                }, {
                	"item_code": "500112142",
                	"item_name": "石船镇"
                }, {
                	"item_code": "500112143",
                	"item_name": "大盛镇"
                }, {
                	"item_code": "500112144",
                	"item_name": "洛碛镇"
                }],
				detail_address:"",
			}
		},
		// watch:{
		// 	change(){
		// 		this.name= ''
		// 		this.phone = ''
		// 		this.code = ''
		// 		this.isCheck = false
		// 	}
		// },
		created(){
			if(this.$route.query.id == undefined){
				this.isScanCode = true
			}else{
				this.isScanCode = false
			}
			if(localStorage.getItem('token') != null){
				this.$router.push({name:'index'})
			}
            // // 请求接口获取this.area1List
            // const that=this;
            // that.loading = that.$toast.loading();
            // this.$api.selectArea().then(function(value) {
            //     switch (value.data.code){
            //         case 200:
            //             that.loading.hide();
            //             that.area1List=value.data.data;
            //             break;
            //         case 500:
            //             that.$toast.text(value.data.msg)
            //             that.loading.hide();
            //             break;
            //         default:
            //             break;
            //     }
            // })
		},
		methods: {
			submitUser() {
				const that = this;
				if (this.name == '' ||
					this.user.idCode == '' ||
					this.phone == '' ||
					this.code == '' ||
                    this.area1=='0' ||
                    this.area2=='0' ||
                    this.area3=='0' ||
					this.area4=='0' ||
					this.detail_address==""
				) {
					this.$toast.text('请填写完成之后进行提交');
					return
				}
				if(!this.isCheck){
					this.$toast.text('请同意用户协议之后在提交');
					return
				}
				that.loading = that.$toast.loading();
				this.$api.regForuser(
					this.name,
					this.user.idCode,
					this.phone,
					this.code,
                    this.area1,
                    this.area2,
                    this.area3,
					this.area4,
					this.detail_address,
				).then(function(value) {
					console.info(value)
					switch (value.data.code){
						case 200:
							that.loading.hide();
							localStorage.setItem("token", value.data.token);
							localStorage.setItem("link", "mycenter");
							that.$api.getUserInfo().then(function(res) {
							if (res.data.code == 200) {
							    that.loading.hide();
							    localStorage.setItem(
							      "UserInfo",
							      JSON.stringify(res.data.info)
							    );
							  }
							});
							if(that.$route.query.id != undefined){
								that.$api.related_company(that.$route.query.id).then(function(res){
									console.info(res)
									if(res.data.code == 200){
										that.$toast.text('关联成功')
									}
								})
							}
							setTimeout(()=>{
								that.$router.push({ name: "userfugong" });
							},500)
							break;
						case 500:
							that.$toast.text(value.data.msg)
							that.loading.hide();
							break;
						default:
							break;
					}
				})
			},
			submitEnterprise() {
				const that = this
				if (
					this.name == '' ||
					this.enterprise.account == '' ||
					this.enterprise.institutionCode == '' ||
					this.phone == '' ||
					this.code == ''
				) {
					this.$toast.text('请填写完成之后进行提交');
					return
				}
				if(!this.isCheck){
					this.$toast.text('请同意用户协议之后在提交');
					return
				}
				that.loading = that.$toast.loading();
				this.$api.regForenterprise(
					this.name,
					this.enterprise.institutionCode,
					this.phone,
					this.code,
					this.enterprise.account,
				).then(function(value) {
					console.info(value)
					switch (value.data.code){
						case 200:
						that.loading.hide();
							that.$toast.text('注册成功')
							localStorage.setItem("token", value.data.token);
							localStorage.setItem("link", "mycompany");
							setTimeout(()=>{
								that.$api.getEnterpriseInfo().then(function(res) {
								  if (res.data.code == 200) {
								    that.loading.hide();
								    that.$router.push({ name: "fugong" });
								    localStorage.setItem(
								      "CompenyInfo",
								      JSON.stringify(res.data.info)
								    );
								  }
								});
							},200)
							break;
						case 500:
							that.$toast.text(value.data.msg)
							that.loading.hide();
							break;
						default:
							break;
					}
				})
			},
			sendM() {
				const that = this
				if (this.phone != '') {
					that.loading = that.$toast.loading();
					this.$api.sendMessage(this.phone).then(function(value) {
						console.info(value)
						switch (value.data.code){
							case 200:
								that.isSend = true;
								that.loading.hide();
								that.dsq = setInterval(()=>{
									that.timer--
									if(that.timer == 0){
										that.isSend = false;
										that.timer = 60
										clearInterval(that.dsq)
										that.dsq = null
									}
								},1000)
								break;
							case 500:
								that.$toast.text(value.data.msg)
								that.loading.hide();
								break;
							default:
								break;
						}
					})
				} else {
					this.$toast.text('请填写手机号');
				}
			},
			clickToRouter(){
               this.$router.push('reg_enterprise') 
			},
            changeArea1(e){
                // this.area1=e.target.value;
                // this.area2List=[];
                // // 请求接口获取this.area2List
                // const that=this;
                // that.loading = that.$toast.loading();
                // this.$api.selectArea(
                //     2,
                //     that.area1
                // ).then(function(value) {
                //     switch (value.data.code){
                //         case 200:
                //             that.loading.hide();
                //             that.area2List=value.data.data;
                //             break;
                //         case 500:
                //             that.$toast.text(value.data.msg)
                //             that.loading.hide();
                //             break;
                //         default:
                //             break;
                //     }
                // })
                // this.area3List=[];
                // this.area4List=[];
            },
            changeArea2(e){
                // this.area2=e.target.value;
                // this.area3List=[];
                // // 请求接口获取this.area3List
                // const that=this;
                // that.loading = that.$toast.loading();
                // this.$api.selectArea(
                //     3,
                //     that.area2
                // ).then(function(value) {
                //     switch (value.data.code){
                //         case 200:
                //             that.loading.hide();
                //             that.area3List=value.data.data;
                //             break;
                //         case 500:
                //             that.$toast.text(value.data.msg)
                //             that.loading.hide();
                //             break;
                //         default:
                //             break;
                //     }
                // })
                // this.area4List=[];
            },
            changeArea3(e){
    //             this.area3=e.target.value;
				// this.area4List=[];
    //             // 请求接口获取this.area4List
    //             const that=this;
				// this.$api.selectArea(
    //                 4,
    //                 that.area3
    //             ).then(function(value) {
    //                 switch (value.data.code){
    //                     case 200:
    //                         that.loading.hide();
    //                         that.area4List=value.data.data;
    //                         break;
    //                     case 500:
    //                         that.$toast.text(value.data.msg)
    //                         that.loading.hide();
    //                         break;
    //                     default:
    //                         break;
    //                 }
    //             })
            },
            changeArea4(e){
                // this.area4=e.target.value;
            },
		},
	
		// created() {
		// 	console.info(this.$api.sendMessage(17388285225).then(function(value){
		// 		console.info(value)
		// 	}))
		// }
	};
</script>

<style lang="scss" scoped>
	@import '../assets/skin/css/style.scss';
	input{
		width: 100%;
	}
.aui-reg-item-go{
	margin-top: 20px;
}
	.aui-flexView {
		background: #1060d3;
	}
	.aui-palace-one {
		display: flex;
		justify-content: space-around;
	}
	.active{
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
		border-radius: 10px;
	}
    .select-style{
        height: 2.2rem;
        width: 100%;
        border: 0px;
        padding-left: 1.3rem;
        font-size: 0.92rem;
        color: #888;
    }
    .selected-colorHuiSe{
        color: #000;
    }
    .select-style-special{
        height: 2.2rem;
        width: calc(100%/3);
        border: 0px;
        font-size: 0.92rem;
        color: #888;
    }
    .select-par-special{
        padding-left: 1.3rem;
    }
	.aui-tag-img {
		height: 30px;
		width: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 10px;
	
		img {
			height: 26px;
			width: auto;
		}
	}
</style>
