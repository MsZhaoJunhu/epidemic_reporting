<template>
	<div class="main">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:;" class="aui-navBar-item" @click="backHome">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">我关联的组织</span>
			</div>
		</header>
		<main>
			<template v-for="(item, index) of companyList">
				<div class="company-item" :key="index" @click="showReport(item.enterprise_id)">
					<p>{{ item.name }}</p>
					<p>组织ID：{{ item.enterprise_id }}</p>
				</div>
			</template>
			<div class="company-add" @click="openAddWidow">
				<p>新增关联组织</p>
			</div>
			<template v-if="addWindow">
				// 搜索组织弹窗
				<div class="tips" v-if="Search">
					<div class="Search_organization">
							<span class="iconX" @click="closeTips">×</span>
							<div>
								<p>暂未找到该组织信息，请输入您所在的组织全称</p>
								<input type="text" placeholder="请输入组织全称" class="Search_input">
								<button class="Search_btn">提交反馈</button>
							</div>
						</div>
				</div>
				<div class="company-add-window">
					<p>请搜索组织进行关联</p>
					<span class="iconfontX" @click="closeAddWindow">×</span>
					<div class="mainBox">
						<input type="text" placeholder="组织名称/地址名称(已关联将不会显示)" v-model="find" @keydown.enter="getCompany" />
						<!-- <button @click="addCompany">立即关联</button> -->
						<div v-for="item in AllList">
							<div>
								<h5>{{item.name}}</h5>
								<p>{{item.business_address}}</p>
							</div>
							<button @click="()=>{companyId=item.id;addCompany()}">关联</button>
						</div>
					</div>
					
				</div>
			</template>
			<template v-if="showReportwindow">
				<div class="show-report-window">
					<span class="exit" @click="showReportwindow = false">×</span>
					<div class="report-item" @click="toHealthReport">
						<img src="../assets/skin/images/icon-item-02.png" alt="" />
						<p>健康状况上报</p>
					</div>
					<div class="report-item" @click="toActionReport">
						<img src="../assets/skin/images/icon-item-01.png" alt="" />
						<p>行动轨迹上报</p>
					</div>
					<div class="report-item" @click="toResidentSubmit()">
						<img src="../assets/skin/images/icon-item-01.png" alt="" />
						<p>出入登记上报</p>
					</div>
				</div>
			</template>
		</main>
	</div>
</template>

<script>
	export default {
		name: 'affiliatedEnterprises',
		data() {
			return {
				addWindow: false,
				showReportwindow: false,
				Search:false, // 搜索组织弹窗提示
				find: '',
				companyId: '',
				AllList:'',
				companyList: [
					// {
					//   cpyName: '城银科技股份有限公司',
					//   cpyId: 400900
					// },
					// {
					//   cpyName: '城银科技股份有限公司',
					//   cpyId: 400900
					// }
				],
				id: ""
			}
		},
		mounted() {
			this.getCompanyList()
		},
		methods: {
			getCompany(){
				const that = this
				that.loading = that.$toast.loading();
				this.$api.enterpriseCompenyList('',that.find).then(function(value) {
					console.log(value)
					switch (value.data.code) {
						case 200:
							that.loading.hide();
							that.AllList = value.data.list
							if (value.data.list == '') {
								that.addWindow = true
							}
							break;
						case 500:
							that.loading.hide();
							localStorage.removeItem('token')
							that.$router.push({
								name: 'login'
							})
						default:
							break
					}
				})
			},
			closeTips(){
				this.Search = false;
			},
			getCompanyList() {
				const that = this
				that.loading = that.$toast.loading();
				this.$api.related_company_list().then(function(value) {
					console.log(value)
					switch (value.data.code) {
						case 200:
							that.loading.hide();
							that.companyList = value.data.data
							if (that.companyList == '') {
								that.addWindow = true
								// that.Search = true;
							}
							break;
						case 500:
							that.loading.hide();
							localStorage.removeItem('token')
							that.$router.push({
								name: 'login'
							})
						default:
							break
					}
				})
			},
			backHome() {
				this.$router.push({
					path: '/'
				})
			},
			openAddWidow() {
				this.addWindow = true
			},
			closeAddWindow() {
				this.addWindow = false
				this.companyId = ''
			},
			addCompany() {
				const that = this
				if (this.companyId !== '') {
					that.loading = that.$toast.loading();
					this.$api.related_company(this.companyId).then(function(value) {
						console.log(value)
						switch (value.data.code) {
							case 200:
								that.loading.hide();
								that.getCompanyList()
								that.closeAddWindow()
								that.$toast.text(value.data.msg)
								break;
							case 500:
								that.loading.hide();
								that.$toast.text(value.data.msg)
								break;
							default:
								break
						}
					})

				} else {
					that.$toast.text('请输入关联企业')
				}
			},
			toHealthReport() {
				this.$router.push({
					path: '/healthReport'
				})
			},
			toActionReport() {
				this.$router.push({
					path: '/actionReport'
				})
			},
			toResidentSubmit() {
				this.$router.push({
					path: '/residentSubmit',
					query: {
						'id': this.id
					}
				})
			},
			showReport(id) {
				this.showReportwindow = true
				this.id = id
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/assets/skin/css/index.scss";
	.mainBox{
		top: 50px;
		position: absolute;
		width: 100%;
		input{
			width: 100%;
			background: rgba(0,0,0,.05);
			border-radius: 5px;
		}
		
		div{
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 15px;
			border-bottom: 1px solid rgba(0,0,0,.05);
			div{
				width: 70%;
				padding: 0;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				border: none;
				position: relative;
				p{
					position: relative !important;
					margin: 0;
					top: 0 !important;
				}
			}
			button{
				width: 100px;
				height: 30px;
			}
		}
	}
	.exit {
		opacity: .5;
		font-size: 30px;
		bottom: 40px;
		height: 30px;
		width: 30px;
		line-height: 25px;
		border-radius: 50%;
		border: 1px solid black;
		position: absolute;
	}

	.main {
		display: flex;
		flex-direction: column;
	}

	main {
		overflow-y: scroll;
		background: rgba(0, 0, 0, .1);
	}

	button {
		outline: none;
		border: none;
	}

	.main,
	main {
		height: 100%;
	}

	.company-item {
		width: 93%;
		height: auto;
		background-color: #0881fc;
		color: #fff;
		border-radius: 5px;
		border: 1px solid rgba(0, 0, 0, .11);
		padding: 20px;
		margin: 15px auto;
		font-size: 15px;

		p:last-child {
			margin-top: 10px;
			border-top: 1px solid rgba(255, 255, 255, .3);
			padding-top: 10px;
		}
	}

	.company-add {
		width: 93%;
		height: auto;
		border-radius: 50px;
		padding: 10px;
		color: #007AFF;
		margin: 15px auto;
		text-align: center;
		font-size: 15px;
		border: 1px solid #007AFF;

		p:before {
			content: "+";
		}
	}
	.tips{
	width:100%;
	height:100%;
	background:rgba(0,0,0,.75);
	position:absolute;
	z-index:1000;
	top:0;
	left:0;
	color:#000;
	.Search_organization{
			width: 80%;
			margin: 200px auto;
			z-index: 10000;
			padding: 30px;
			height: 230px;
			background-color: #FFF;
			text-align: center;
			.Search_input{
			text-align: center;
			display: block;
			margin: 20px auto;
			padding: 0 10px;
			border: none;
			border-bottom: 2px solid #007AFF;
			width: 85%;
			height: 40px;
			line-height: 40px;
				}
			.Search_btn{
			color: #fff;
			width: 50%;
			height: 50px;
			background: #007AFF;
			border-radius: 30px;
			}
			.iconX{
				position: absolute;
				top:205px;
				right:60px;
				cursor: pointer;
			}
		}
	}

	.company-add-window {
		position: relative;
		position: fixed;
		height: 100%;
		top: 0;
		z-index: 999;
		right: 0;
		left: 0;
		bottom: 0;
		background: #fff;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		font-size: 15px;
		p {
			margin: 10px 0;
		}

		p:first-of-type {
			position: absolute;
			top: 10px;
		}

		.iconfontX {
			position: absolute;
			right: 15px;
			font-size: 30px;
			top: 10px;
		}

		input {
			text-align: center;
			display: block;
			margin: 20px auto;
			padding: 0 10px;
			border: none;
			border-bottom: 2px solid #007AFF;
			width: 85%;
			height: 40px;
			line-height: 40px;
		}

		p {
			font-size: 12px;
			color: rgba(0, 0, 0, .6);
		}

		button{
			color: #fff;
			width: 80%;
			height: 50px;
			background: #007AFF;
			border-radius: 50px;
		}
	}

	.show-report-window {
		position: relative;
		z-index: 9999;
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		margin: auto;
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background: #fff;
		text-align: center;
		font-size: 15px;
	}
</style>
