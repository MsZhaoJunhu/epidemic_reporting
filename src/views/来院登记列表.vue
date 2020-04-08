<template>
	<div class="actionReport">
		<div class="alert1" v-show="show==true">
			<input type="text" v-model="edit">
			<button @click="editForm()">确定修改</button>
		</div>
		<div class="alert" v-show="show==true" @click="show=false">
		</div>

		<div class="fixed">
			<TopHeader title="登记列表" isShow="true" class="header">
				<template v-slot:rightBtn>
					<a @click="down()">
						<font style="font-size: 12px !important;padding-right: 5px;color: #007AFF;">导出</font>
						<svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;color: #007AFF;"
						 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2675">
							<path d="M896 1024H128c-70.656 0-128-57.344-128-128v-281.6c0-14.336 11.264-25.6 25.6-25.6s25.6 11.264 25.6 25.6v281.6c0 42.496 34.304 76.8 76.8 76.8h768c42.496 0 76.8-34.304 76.8-76.8v-281.6c0-14.336 11.264-25.6 25.6-25.6s25.6 11.264 25.6 25.6v281.6c0 70.656-57.344 128-128 128z"
							 fill="" p-id="2676"></path>
							<path d="M512 768c-6.656 0-13.312-2.56-17.92-7.68-10.24-10.24-10.24-26.112 0-36.352l256-256c10.24-10.24 26.112-10.24 36.352 0s10.24 26.112 0 36.352l-256 256c-5.12 5.12-11.776 7.68-18.432 7.68z"
							 fill="" p-id="2677"></path>
							<path d="M512 768c-6.656 0-13.312-2.56-17.92-7.68l-256-256c-10.24-10.24-10.24-26.112 0-36.352s26.112-10.24 36.352 0l256 256c10.24 10.24 10.24 26.112 0 36.352-5.12 5.12-11.776 7.68-18.432 7.68z"
							 fill="" p-id="2678"></path>
							<path d="M512 768c-14.336 0-25.6-11.264-25.6-25.6V25.6c0-14.336 11.264-25.6 25.6-25.6s25.6 11.264 25.6 25.6v716.8c0 14.336-11.264 25.6-25.6 25.6z"
							 fill="" p-id="2679"></path>
						</svg>
					</a>
				</template>
			</TopHeader>
			<!-- <div class="tabbar">
				<span :class="change==0?'check':''" @click="change = 0">健康上报</span>
				<span :class="change==1?'check':''" @click="change = 1">行动轨迹</span>
				<span :class="change==1?'check':''" @click="change = 1">行动轨迹</span>
				<span>今日全部未提交</span>
			</div> -->
			<!-- <div class="tabbar">
				<router-link to="/reportList?recordType=health" tag="span">健康上报记录</router-link>
				<router-link to="/reportList" tag="span">行动轨迹记录</router-link>
			</div> -->
		</div>

		<div style="padding-top: 43px;">
			<div class="search">
				<input type="text" v-model="find" @keydown.enter="getList()" placeholder="请输入姓名/手机号码进行筛查">
				<input type="date" style="width:120px" v-model="date">
				<div @click="getList()">
					<svg class="icon" style="width: 2em; height: 2em;vertical-align: middle;fill: currentColor;overflow: hidden;"
					 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1546">
						<path d="M857.6 822.4l-192-192c-9.6-9.6-24-9.6-33.6 0 0 0 0 1.6-1.6 1.6-46.4 46.4-108.8 72-174.4 72C320 704 208 592 208 456S320 208 456 208 704 320 704 456c0 20.8-3.2 40-8 59.2-3.2 12.8 4.8 25.6 17.6 28.8 12.8 3.2 25.6-4.8 28.8-17.6 6.4-22.4 8-46.4 8-72C752 292.8 619.2 160 456 160S160 292.8 160 456 292.8 752 456 752c70.4 0 137.6-25.6 192-70.4l176 176c4.8 4.8 11.2 6.4 17.6 6.4s12.8-1.6 17.6-6.4c6.4-9.6 6.4-25.6-1.6-35.2z"
						 p-id="1547"></path>
					</svg>
				</div>
			</div>
			<ul v-if="change == 0">
				<li v-for="(item,index) in list" :key>
					<div class="info">
						<div class="head" @click="update(item.temperature,item.id)">
							<span class="zhengchang" v-if="item.temperature<=37">
								{{item.temperature}}°
							</span>
							<span class="dishao" v-else-if="item.temperature>37 && item.temperature<=38">
								{{item.temperature}}°
							</span>
							<span class="gaoshao" v-else-if="item.temperature>38 && item.temperature<=40">
								{{item.temperature}}°
							</span>
							<span class="chaogao" v-else-if="item.temperature>40">
								{{item.temperature}}°
							</span>
						</div>

						<div>
							<h4>{{item.user_name}}</h4>
							<p>{{item.mobile}}</p>
							<p class="time">{{item.create_time}}</p>
						</div>
						<!-- <div class="isTijiao" v-if="item.isHealthReport == 1">
							<font color="#007AFF">已提交</font>
							<i class="tijiao"></i>
						</div>
						<div class="isTijiao" v-else>
							<font color="orangered">未提交</font>
						</div> -->
					</div>
					<div class="operate">
						<router-link tag="span" :to="{name:'regHospitalDetail',params:{id:item.id}}">
							<svg class="icon" style="width: 1.5em; height: 1.5em;vertical-align: middle;fill: currentColor;overflow: hidden;"
							 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4646">
								<path d="M669.4 896.3c-61.7 0-119.7-24-163.3-67.6-43.6-43.7-67.6-101.7-67.6-163.4s24-119.7 67.6-163.3 101.6-67.6 163.3-67.6 119.7 24 163.3 67.6 67.6 101.6 67.6 163.3c0 61.7-24 119.7-67.6 163.3-43.6 43.7-101.6 67.7-163.3 67.7z m0-391.9c-88.7 0-160.9 72.2-160.9 160.9s72.2 160.9 160.9 160.9S830.3 754 830.3 665.3c0.1-88.7-72.1-160.9-160.9-160.9zM919.9 950.1c-8.4 0-16.8-3-23.5-9.1l-109-99.1c-14.3-13-15.4-35.1-2.4-49.4 13-14.3 35.1-15.4 49.4-2.4l109 99.1c14.3 13 15.4 35.1 2.4 49.4-6.9 7.7-16.4 11.5-25.9 11.5zM388.5 954.2H104.1c-19.3 0-35-15.7-35-35V104.8c0-19.3 15.7-35 35-35h780c19.3 0 35 15.7 35 35v254.5c0 19.3-15.7 35-35 35s-35-15.7-35-35V139.8h-710v744.4h249.4c19.3 0 35 15.7 35 35s-15.6 35-35 35zM775.1 279.2h-568c-19.3 0-35-15.7-35-35s15.7-35 35-35h568c19.3 0 35 15.7 35 35s-15.6 35-35 35zM459.7 467H210.9c-19.3 0-35-15.7-35-35s15.7-35 35-35h248.7c19.3 0 35 15.7 35 35s-15.6 35-34.9 35z"
								 p-id="4647"></path>
							</svg>
							登记详情
						</router-link>
					</div>
				</li>
			</ul>
			<!-- <ul v-else>
				<li v-for="item in list" :key>
					<div class="info">
						<div class="head">
							
						</div>
						<div>
							<h4>{{item.real_name}}</h4>
							<p>{{item.mobile}}</p>
						</div>
						<div class="isTijiao" v-if="item.isTrajectoryReport == 1">
							<font color="#007AFF">已提交</font>
							<i class="tijiao"></i>
						</div>
						<div class="isTijiao" v-else>
							<font color="orangered">未提交</font>
						</div>
					</div>
				</li>
			</ul> -->

		</div>
	</div>
</template>

<script>
	import TopHeader from '../components/TopHeader.vue'
	export default {
		name: '',
		components: {
			TopHeader
		},
		data() {
			return {
				show: false,
				edit: '',
				editID: '',
				change: 0,
				list: [],
				page: 1,
				find: '',
				date:''
			}
		},
		created() {
			this.getList();
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll, true)
		},
		methods: {
			down(){
				location.href = 'http://www.zjcoo.cn:1000/enterprise/export/hospital/registration?token='+localStorage.getItem('token')
			},
			editForm() {
				const that = this
				this.$api.hospitalRegistrationEdit(this.edit, this.editID).then(function(res) {
					console.info(res)
					switch (res.data.code) {
						case 200:
							that.page = 1
							that.list = []
							that.getList();
							that.show = false
							break;
						case 200:
							that.$toast.text(res.data.msg)
							break
						default:
							break;
					}
				})
			},
			update(edit, editID) {
				this.show = true
				this.edit = edit
				this.editID = editID
			},
			handleScroll() {
				//变量scrollTop是滚动条滚动时，距离顶部的距离
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				//变量windowHeight是可视区的高度
				var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
				//变量scrollHeight是滚动条的总高度
				var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
				//滚动条到底部的条件
				if (parseInt(scrollTop + windowHeight) == scrollHeight) {
					//写后台加载数据的函数
					this.getList()
				}
			},
			getList() {
				const that = this
				if (that.find != '' || that.date != '') {
					that.page = 1
					that.list = []
				}
				that.loading = that.$toast.loading();
				this.$api.hospitalRegistrationList(that.find, that.page,that.date).then(function(res) {
					console.info(res)
					switch (res.data.code) {
						case 200:
							for (let i in res.data.list) {
								that.list.push(res.data.list[i])
							}
							if (res.data.list != '') {
								that.page++
							}
							that.loading.hide()
							break;
						case 500:
							that.loading.hide()
							break;
						default:
							break;
					}
				})
			}
		}
	}
</script>


<style lang="scss" scoped>
		.download *{
			font-size: 12px !important;
		}
	.time {
		font-size: 10px;
	}

	.alert1 {
		z-index: 9999;
		overflow: hidden;
		background: #FFFFFF;
		width: 220px;
		height: 180px;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;

		input {
			width: 60%;
			height: 40px;
			background: rgba(0, 0, 0, .1);
			border-radius: 5px;
			border: none;
			transform: translateY(-20px);
			font-size: 30px;
			color: #000000;
			text-align: center;
		}

		button {
			width: 100%;
			height: 40px;
			position: absolute;
			bottom: 0;
			background: #007AFF;
			color: #FFFFFF;
			border: none;
		}
	}

	.alert {
		z-index: 999;
		top: 0;
		position: fixed;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, .5);
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.search {
		display: flex;
		align-items: center;
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

	.check {
		color: #007AFF;
		box-sizing: border-box;
		border-bottom: 2px solid #007AFF;
	}

	.tabbar {
		display: flex;
		background: #FFFFFF;
		justify-content: space-around;

		span {
			font-size: 13px;
			padding: 10px;
		}
	}

	.header {
		background: #fff;
	}

	.actionReport {
		height: 100%;
		background: rgba(0, 0, 0, .05);
	}

	ul,
	li {
		padding: 0;
		margin: 0;
	}

	li {
		display: flex;
		margin: 10px;
		border-radius: 5px;
		background: rgba(255, 255, 255, .8);
		padding: 10px 15px;
	}

	p {
		margin: 0;
		margin-top: 5px;
		font-size: 13px;
		opacity: .6;
	}

	h4 {
		font-weight: normal;
		margin: 0;
		font-size: 15px;
	}

	.operate {
		font-size: 12px;
		display: flex;
		width: 30%;
		justify-content: flex-end;
		align-items: center;

		span {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 10px;

			svg {
				margin-bottom: 10px;
			}
		}
	}

	.isTijiao {
		display: flex;
		align-items: center;
		font-size: 12px;

	}

	.tijiao {
		border-radius: 50%;
		height: 20px;
		width: 20px;
		background: #007AFF;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 5px;
	}

	.tijiao:after {
		content: '';
		display: block;
		height: 5px;
		width: 10px;
		border: 3px solid #fff;
		border-top: 0;
		border-right: 0;
		transform: rotateZ(-45deg) translateY(-2px) translateX(1px);
	}

	.fixed {
		position: fixed;
		z-index: 99;
		width: 100%;
		top: 0;
	}

	.info {
		display: flex;
		align-items: center;

		.head {
			font-size: 30px;
			opacity: .5;
			margin-right: 10px;
			padding-right: 10px;
			border-right: 1px solid rgba(0, 0, 0, .2);
		}

		.zhengchang {
			color: green;
		}

		.dishao {
			color: orange;
		}

		.gaoshao {
			color: orangered;
		}

		.chaogao {
			color: red
		}
	}
</style>
