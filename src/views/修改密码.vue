<template>
	<div class="包裹">
		<TopHeader title="修改密码" isShow="true" id="header"></TopHeader>
		<p class="p">
			当前手机号：{{mobile}}
		</p>
		<label>
			<div>
				<svg class="icon" style="width: 22px; height: 22px;vertical-align: middle;fill: currentColor;overflow: hidden;"
				 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2815">
					<path d="M768 352h-10.666667V298.666667c0-135.253333-110.08-245.333333-245.333333-245.333334S266.666667 163.413333 266.666667 298.666667v53.333333H256A117.546667 117.546667 0 0 0 138.666667 469.333333v384c0 64.64 52.693333 117.333333 117.333333 117.333334h512c64.64 0 117.333333-52.693333 117.333333-117.333334V469.333333c0-64.64-52.693333-117.333333-117.333333-117.333333zM330.666667 298.666667c0-100.053333 81.28-181.333333 181.333333-181.333334s181.333333 81.28 181.333333 181.333334v53.333333h-362.666666V298.666667z m490.666666 554.666666a53.333333 53.333333 0 0 1-53.333333 53.333334H256A53.333333 53.333333 0 0 1 202.666667 853.333333V469.333333a53.333333 53.333333 0 0 1 53.333333-53.333333h512a53.333333 53.333333 0 0 1 53.333333 53.333333v384zM512 544a32 32 0 0 0-32 32v170.666667a32 32 0 1 0 64 0v-170.666667a32 32 0 0 0-32-32z"
					 p-id="2816"></path>
				</svg>
				<input type="password" placeholder="请输入密码" v-model="pwd">
			</div>
		</label>
		<label>
			<div>
				<svg class="icon" style="width: 22px; height: 22px;vertical-align: middle;fill: currentColor;overflow: hidden;"
				 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2815">
					<path d="M768 352h-10.666667V298.666667c0-135.253333-110.08-245.333333-245.333333-245.333334S266.666667 163.413333 266.666667 298.666667v53.333333H256A117.546667 117.546667 0 0 0 138.666667 469.333333v384c0 64.64 52.693333 117.333333 117.333333 117.333334h512c64.64 0 117.333333-52.693333 117.333333-117.333334V469.333333c0-64.64-52.693333-117.333333-117.333333-117.333333zM330.666667 298.666667c0-100.053333 81.28-181.333333 181.333333-181.333334s181.333333 81.28 181.333333 181.333334v53.333333h-362.666666V298.666667z m490.666666 554.666666a53.333333 53.333333 0 0 1-53.333333 53.333334H256A53.333333 53.333333 0 0 1 202.666667 853.333333V469.333333a53.333333 53.333333 0 0 1 53.333333-53.333333h512a53.333333 53.333333 0 0 1 53.333333 53.333333v384zM512 544a32 32 0 0 0-32 32v170.666667a32 32 0 1 0 64 0v-170.666667a32 32 0 0 0-32-32z"
					 p-id="2816"></path>
				</svg>
				<input type="password" placeholder="请输入确认密码" v-model="rpwd">
			</div>
		</label>
		<label>
			<div>
				<svg class="icon" style="width: 22px; height: 22px;vertical-align: middle;fill: currentColor;overflow: hidden;"
				 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3601">
					<path d="M888.49 222.686v-31.54l-65.672-0.955h-0.205a465.715 465.715 0 0 1-144.315-31.334c-77.005-31.198-126.294-66.765-126.703-67.107l-39.8-28.672-39.185 28.468c-2.048 1.501-49.903 36.044-126.908 67.31a447.42 447.42 0 0 1-144.52 31.335l-65.877 0.956v378.88c0 87.04 49.834 184.661 137.01 267.81 37.547 35.84 79.258 66.355 120.833 88.2 43.28 22.733 84.24 34.612 118.852 34.612 34.406 0 75.776-12.152 119.603-35.158a547.977 547.977 0 0 0 120.013-87.654 515.209 515.209 0 0 0 96.188-122.88c27.102-49.562 40.823-98.304 40.823-144.999l-0.136-347.204zM510.09 143.428l1.706-1.365 1.775 1.365c5.803 4.165 59.529 41.848 140.356 74.752 79.19 32.086 153.6 35.635 167.663 36.045l2.594 0.068 0.205 315.734c0.137 69.495-42.598 150.186-117.077 221.457C641.57 854.289 563.13 896.478 512 896.478c-23.689 0-55.57-9.899-89.702-27.785a478.822 478.822 0 0 1-105.609-77.278C242.21 720.213 199.475 639.522 199.475 569.89V254.225l2.73-0.136c3.278 0 82.604-1.502 167.664-35.977a739.942 739.942 0 0 0 140.22-74.615v-0.069zM713.318 368.64a32.222 32.222 0 0 0-45.329 0L449.195 587.435l-93.184-93.116a32.222 32.222 0 0 0-45.33 0 32.222 32.222 0 0 0 0 45.26l115.85 115.85a32.29 32.29 0 0 0 45.328 0L713.32 413.9a32.222 32.222 0 0 0 0-45.33z"
					 p-id="3602"></path>
				</svg>
				<input type="text" placeholder="请输入验证码" v-model="yzm">
			</div>
			<button :disabled="isSend" @click="sendM()">{{isSend==true?'请等待'+timer+'秒':'验证码'}}</button>
		</label>
		<p class="btnbox">
			<button @click="tijiao()">
				确<i style="width: 15px;display: inline-block;"></i>认
			</button>
		</p>
	</div>
</template>

<script>
	import TopHeader from '@/components/TopHeader.vue';
	export default {
		data() {
			return {
				pwd:'',
				rpwd:'',
				yzm:'',
				mobile: JSON.parse(localStorage.getItem('CompenyInfo') || localStorage.getItem('UserInfo')).mobile,
				isSend: false,
				timer: 60,
				dsq: null
			}
		},
		components: {
			TopHeader
		},
		methods: {
			sendM() {
				const that = this;
				if (this.mobile != "") {
					that.loading = that.$toast.loading();
					this.$api.sendMessage(this.mobile).then(function(value) {
						console.info(value);
						switch (value.data.code) {
							case 200:
								that.isSend = true;
								that.$toast.text("已发送,请注意查收");
								that.loading.hide();
								that.dsq = setInterval(() => {
									that.timer--;
									if (that.timer == 0) {
										that.isSend = false;
										that.timer = 60;
										clearInterval(that.dsq);
										that.dsq = null;
									}
								}, 1000);
								break;
							case 500:
								that.$toast.text(value.data.msg);
								that.loading.hide();
								break;
							default:
								break;
						}
					});
				} else {
					this.$toast.text("请填写手机号");
				}
			},
			tijiao(){
				const that = this
				if(this.pwd=='' || this.rpwd=='' || this.yzm==''){
					this.$toast.text('请填写完成之后再提交')
					return
				}
				if(this.pwd !=this.rpwd){
					this.$toast.text('新密码与确认密码不同')
					return
				}
				that.loading = that.$toast.loading();
				this.$api.updateUserPwd(this.pwd,this.rpwd,this.yzm).then(function(res){
					console.info(res)
					switch (res.data.code){
						case 200:
							that.$toast.text('修改成功')
							localStorage.setItem('token',res.data.token)
							that.loading.hide();
							history.go(-1)
							break;
						case 500:
						that.$toast.text(res.data.msg)
							that.loading.hide();
							break;
						default:
							break;
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped="scoped">
	.btnbox {
		padding: 20px 40px;

		button {
			color: #fff;
			padding: 10px;
			font-size: 16px;
			text-align: center;
			width: 100%;
			border: none;
			background-image: linear-gradient(to right, #0881fc, #20b2ff);
			border-radius: 50px;
		}
	}

	.p {
		padding: 0 25px;
		font-size: 15px;
		opacity: .7;
		padding-bottom: 10px;
	}

	input,
	button {
		outline: none;
	}

	#header {
		background: #fff;
	}

	.包裹 {
		background: rgba(0, 0, 0, .05);
		height: 100%;
	}

	label {
		display: flex;
		margin: 15px;

		div {
			width: 100%;
			display: flex;
			padding: 15px;
			background: #fff;
			border-radius: 7px;

			svg {
				color: rgba(0, 0, 0, .4);
			}

			input {
				width: 100%;
				border: none;
				padding-left: 10px;
				font-size: 15px;
			}
		}

		button {
			flex-shrink: 0;
			background: #fff;
			border: 1px solid #007AFF;
			color: #007AFF;
			margin-left: 10px;
			border-radius: 7px;
			padding: 0 20px;
		}
	}
</style>
