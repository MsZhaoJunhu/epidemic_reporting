<template>
	<div class="包裹">
		<TopHeader title="申请临时通行证" isShow="true" class="header"></TopHeader>
		<div class="find_box" v-if="showFind">
			<TopHeader title="选择企业" class="header">
				<template v-slot:leftBtn>
					<div @click="showFind = false">
						<svg class="icon" style="width: 16px; height: 16px;vertical-align: middle;fill: currentColor;overflow: hidden;"
						 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1675">
							<path d="M959.824 908.231l-394.991-394.991 394.979-394.985-53.782-53.782-394.979 394.985-394.979-394.985-53.782 53.782 394.979 394.985-394.979 394.985 53.782 53.776 394.979-394.979 394.991 394.985z"
							 fill="#231815" p-id="1676"></path>
						</svg>
					</div>
				</template>
			</TopHeader>
			<div class="find_input">
				<input type="text"v-model="find" placeholder="请输入你想查找的组织名称">
			</div>
			<nut-elevator :dataArray="dataList" :showIndicator="true" :navHeight="75" :otherHeight="60" :initIndex="0"
			 :hiddenTime='500' @clickList="clickNav">
			</nut-elevator>
		</div>
		<nut-datepicker :is-visible="isTime1" title="请选择日期" type="date" :startDate="sTime" :endDate="eTime" @close="switchPicker('isTime1')"
		 @choose="setStartTime">
		</nut-datepicker>
		<nut-datepicker :is-visible="isTime2" title="请选择日期" type="date" :startDate="EsTime" :endDate="EeTime" @close="switchPicker('isTime2')"
		 @choose="setEndTime">
		</nut-datepicker>
		<div class="txz">
			<h4>来访人员信息</h4>
			<div>
				<label>
					<span>姓名</span>
					<input type="text" placeholder="请输入姓名" v-model="name" readonly="readonly">
				</label>
				<label>
					<span>身份证</span>
					<input type="text" placeholder="请输入身份证号码" v-model="idCard" readonly="readonly">
				</label>
				<label>
					<span>联系方式</span>
					<input type="number" placeholder="请输入联系方式" v-model="mobile" readonly="readonly">
				</label>
			</div>
			<h4>临时访问当问</h4>
			<div>
				<label @click="()=>{showFind=true}">
					<span>临时访问企业</span>
					<input type="text" readonly="readonly" placeholder="选择要访问的企业" v-model="qiye">
				</label>
				<label @click="()=>{isTime1=true}">
					<span>选择开始时间</span>
					<input type="text" readonly="readonly" placeholder="通行证开始使用时间" v-model="startTime">
				</label>
				<label @click="selectDate()">
					<span>选择结束时间</span>
					<input type="text" readonly="readonly" placeholder="通行证结束使用时间" v-model="endTime">
				</label>
			</div>
			<h4>临时访问事由</h4>
			<div>
				<textarea placeholder="请输入临时访问事由" v-model="particulars"></textarea>
			</div>
			<h4>上传证明材料<p>长按可删除</p>
			</h4>
			<p style="font-size: 12px;">一、电信手机用户证明方法</p>
			<p style="font-size: 12px;">	编辑短信CXMYD#身份证号码后四位到10001，授权回复Y后，实现“漫游地查询”，可查询手机号近15日内的途径地信息。</p>
			<p style="font-size: 12px;">	二、联通手机用户证明方法</p>
			<p style="font-size: 12px;">	手机发送：“CXMYD#身份证号码后四位”至10010，查询近30天的全国漫游地信息。便于返工辅助排查。</p>
			<p style="font-size: 12px;">	三、移动手机用户证明方法</p>
			<p style="font-size: 12px;">	编写CXMYD,发送到10086，在依据回复短信输入身份证后四位，可查询过去一个月内去过的省和直辖市（无地市）。每人免费一天查询10次。</p>
			<div style="display: flex;flex-direction: row;">
				<label for="" class="label">
					<nut-imagepicker max="1" @imgMsg="uploadImg" delMode="longtap" :imgList.sync="materialsImg">
					</nut-imagepicker>
					个人承诺书
				</label>
				<label for="" class="label">
					<nut-imagepicker max="1" @imgMsg="uploadImg2" delMode="longtap" :imgList.sync="materialsImg2">
					</nut-imagepicker>
					个人轨迹证明
				</label>

			</div>
			<p>
				<button @click="submit()">
					提<i style="display:inline-block;width:15px;"></i>交
				</button>
			</p>
		</div>

	</div>
</template>

<script>
	import TopHeader from '@/components/TopHeader.vue'
	export default {
		components: {
			TopHeader
		},
		computed: {
			sTime() {
				return this.timeFormat((new Date()).getTime())
			},
			eTime() {
				return this.timeFormat((new Date()).getTime() + 1000 * 60 * 60 * 24 * 10000)
			},
			EsTime() {
				return this.timeFormat((new Date(this.startTime)).getTime())
			},
			EeTime() {
				return this.timeFormat((new Date(this.startTime)).getTime() + 1000 * 60 * 60 * 24 * 10000)
			},
			dataList() {
				let arr = []
				for (let i in this.allList) {
					if (this.allList[i].name.includes(this.find)) {
						arr.push({
							name: this.allList[i].name,
							id: this.allList[i].id
						})
					}
				}
				return [{
					list: arr
				}]
			},
		},
		data() {
			return {
				showFind:false,
				isTime1: false,
				isTime2: false,
				allList: [],
				qiyeList: [
					[]
				],
				find: '',

				name: '',
				idCard: '',
				mobile: '',

				qiye: '', //仅作展示使用
				qiyeIndex: '',
				startTime: '',
				endTime: '',
				particulars: '',
				materialsImg: [],
				materialsImg2: [],
			}
		},
		created() {
			const that = this
			this.$api.cardEnterpriseList().then(function(res) {
				console.info(res)
				switch (res.data.code) {
					case 200:
						that.allList = res.data.list
						break;
					case 500:
						break;
					default:
						break;
				}
			})
		},
		mounted() {
			console.info(this.timeFormat(new Date()))
			this.name = JSON.parse(localStorage.getItem('UserInfo')).real_name
			this.mobile = JSON.parse(localStorage.getItem('UserInfo')).mobile
			this.idCard = JSON.parse(localStorage.getItem('UserInfo')).id_card
		},
		methods: {
			clickNav(e){
				this.qiye = e.name
				this.qiyeIndex = e.id
				this.showFind = false
			},
			uploadImg(e) {
				const that = this
				var file = e.msg[0];
				var reader = new FileReader();
				reader.readAsDataURL(file); // 读出 base64
				reader.onloadend = function() {
					// 图片的 base64 格式, 可以直接当成 img 的 src 属性值        
					var dataURL = reader.result;
					that.loading = that.$toast.loading();
					that.$api.uploadImage([dataURL]).then(function(res) {
						switch (res.data.code) {
							case 200:
								that.materialsImg = []
								that.materialsImg.push(res.data.url)
								that.loading.hide();
								break;
							case 500:
								that.$toast.text(res.data.msg)
								that.loading.hide();
								break;
							default:
								break;
						}
					})
					// 下面逻辑处理
				};
			},
			uploadImg2(e) {
				const that = this
				var file = e.msg[0];
				var reader = new FileReader();
				reader.readAsDataURL(file); // 读出 base64
				reader.onloadend = function() {
					// 图片的 base64 格式, 可以直接当成 img 的 src 属性值        
					var dataURL = reader.result;
					that.loading = that.$toast.loading();
					that.$api.uploadImage([dataURL]).then(function(res) {
						switch (res.data.code) {
							case 200:
								that.materialsImg2 = []
								that.materialsImg2.push(res.data.url)
								that.loading.hide();
								break;
							case 500:
								that.$toast.text(res.data.msg)
								that.loading.hide();
								break;
							default:
								break;
						}
					})
					// 下面逻辑处理
				};
			},
			submit() {
				const that = this
				if (
					that.qiyeIndex == '' ||
					that.startTime == '' ||
					that.endTime == '' ||
					that.particulars == '' ||
					that.materialsImg == '' ||
					that.materialsImg2 == ''
				) {
					that.$toast.text('请检查是否还有空')
					return
				}
				that.loading = that.$toast.loading();
				this.$api.TemporaryCardAdd(
					that.qiyeIndex,
					that.startTime,
					that.endTime,
					that.particulars,
					String(that.materialsImg),
					String(that.materialsImg2)
				).then(function(res) {
					switch (res.data.code) {
						case 200:
							// that.$toast.text('提交成功')
							that.loading.hide();
							that.$router.push('/applySuccee')
							break;
						case 500:
							that.$toast.text(res.data.msg)
							that.loading.hide();
							break;
						default:
							break;
					}
				})
			},
			selectDate() {
				if (this.startTime == '') {
					this.$toast.text('请先选择开始时间')
				} else {
					this.isTime2 = true
				}
			},
			switchPicker(param) {
				this[`${param}`] = !this[`${param}`];
			},
			setQiye(param) {
				const that = this
				this.qiye = param[0];
				for (let i in that.allList) {
					if (param[0] == that.allList[i].name) {
						console.info(that.allList[i].id)
						that.qiyeIndex = that.allList[i].id
					}
				}
			},
			setStartTime(param) {
				this.startTime = param[3];
			},
			setEndTime(param) {
				this.endTime = param[3];
			},
			//时间戳转化成时间格式
			timeFormat(timestamp) {
				//timestamp是整数，否则要parseInt转换,不会出现少个0的情况
				var time = new Date(timestamp);
				var year = time.getFullYear();
				var month = time.getMonth() + 1;
				var date = time.getDate();
				return year + '-' + month + '-' + date
			}
		}
	}
</script>
<style>
	.nut-imagepicker .img-list .add-icon {
		border: 1px dashed #5A5A5A;
	}

	.nut-imagepicker .img-list .add-icon i {
		color: #5A5A5A;
	}

	.nut-list-h {
		display: none;
	}
	.nut-people-list{
		padding-bottom: 20px;
	}
</style>
<style lang="scss" scoped>
	.find_box {
		height: 100vh;
		width: 100%;
		background: #fff;
		position: fixed;
		z-index: 999;

		.find_input {
			padding: 0 10px;
			display: flex;

			input {
				padding: 0 15px;
				outline: none;
				width: 100%;
				height: 30px;
				border-radius: 50px;
				border: none;
				background: rgba(0, 0, 0, .05);
			}

			.btnBox {
				display: flex;
				flex-shrink: 0;

				button {
					margin-left: 5px;
					border: none;
					padding: 0 10px;
					border-radius: 50px;
					color: #fff;
				}

				button:first-of-type {
					background: #007AFF;
				}
			}
		}
	}

	h4>p {
		font-size: 8px;
		font-weight: normal;
	}

	.label {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	p {
		padding: 0 20px;

		button {
			border: none;
			border-radius: 50px;
			width: 100%;
			color: #fff;
			font-size: 15px;
			padding: 12px 20px;
			background-image: linear-gradient(to right, #2a71ff, #07b9ff);
		}
	}

	textarea {
		height: 200px;
		outline: none;
		resize: none;
		padding: 15px;
		font-size: 14px;
		color: #5A5A5A;
		border: none;
	}

	.包裹 {
		display: flex;
		flex-direction: column;
		background: #f5f4f5;

		.header {
			background: #fff;
		}

		.txz {
			h4:before {
				content: '';
				display: inline-block;
				width: 4px;
				border-radius: 4px;
				height: 15px;
				background: #007AFF;
				margin-right: 5px;
			}

			h4 {
				color: #353535;
				padding: 0px 15px;
				display: flex;
				align-items: center;
				font-size: 15px;
			}

			div {
				display: flex;
				flex-direction: column;
				background: #FFF;
			}

			label {
				display: flex;
				justify-content: space-between;
				padding: 15px;
				border-bottom: 1px solid rgba(0, 0, 0, .05);

				span {
					flex-direction: 0;
					font-size: 14px;
					width: 120px;
				}

				input {
					width: 100%;
					outline: none;
					border: none;
					text-align: right;
					font-size: 14px;
					color: #5A5A5A;
				}
			}
		}
	}
</style>
