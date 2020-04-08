<template>
	<div class="caseformAdd">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:;" class="aui-navBar-item" @click="backTo">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">新增潜在感染者</span>
			</div>
		</header>
		<main>
			<div class="case-box">
				<div class="case-item">
					<span class="item-title">姓名
					</span>
					<input type="text" placeholder="请输入" v-model="name">
				</div>
				<div class="case-item">
					<span class="item-title">身份证号
					</span>
					<input type="text" placeholder="请输入" v-model="id_card">
				</div>
				<div class="case-item">
					<span class="item-title">监护人姓名
					</span>
					<input type="text" placeholder="请输入" v-model="guardian">
				</div>
				<div class="case-item">
					<span class="item-title">联系方式
					</span>
					<input type="text" placeholder="请输入" v-model="mobile">
				</div>
				<div class="case-item">
					<span class="item-title">现居地址
					</span>
					<input type="text" placeholder="请输入" v-model="habitation">
				</div>
				<!-- <div class="case-item">
					<span class="item-title">病例分类
					</span>
					<select v-model="case_type">
						<option :value="item.value" v-for="(item,index) in case_type_list">{{item.name}}</option>
					</select>
				</div> -->
				<div class="case-item tiwen">
					<span class="item-title">体温
					</span>
					<input type="number" placeholder="请输入" v-model="temperature">°
				</div>
				<div class="case-item">
					<span class="item-title">主要症状
					</span>
					<div class="item-radio">
						<nut-checkbox v-model="item.isCheck" v-for="item in symptom_list">{{item.name}}</nut-checkbox>
					</div>
				</div>

				<!-- <div class="case-item">
					<span class="item-title">是否接受治疗
					</span>
					<div class="item-radio">
						<nut-radio v-model="is_treat" label="1">是</nut-radio>
						<nut-radio v-model="is_treat" label="0">否</nut-radio>
					</div>
				</div> -->
				<!-- <nut-imagepicker
				  @imgMsg="imgMsg" 
				  :imgList.sync="imgList1"
				>
				</nut-imagepicker> -->
				<div class="case-item">
					<span class="item-title">是否接受接触疫区人员
					</span>
					<div class="item-radio">
						<nut-radio v-model="is_contact" label="1">是</nut-radio>
						<nut-radio v-model="is_contact" label="0">否</nut-radio>
					</div>
				</div>
				<div class="case-item" v-show="is_contact == 1">
					<span class="item-title">接触描述
					</span>
					<textarea placeholder="请进行简单得描述" v-model="contact_explain"></textarea>
				</div>
				<div class="case-item">
					<span class="item-title">是否去过湖北
					</span>
					<div class="item-radio">
						<nut-radio v-model="is_go_hubei" label="1">是</nut-radio>
						<nut-radio v-model="is_go_hubei" label="0">否</nut-radio>
					</div>
				</div>
				<div class="case-item" v-show="is_go_hubei == 1">
					<span class="item-title">停留湖北的描述
					</span>
					<textarea placeholder="请进行简单得描述"></textarea>
				</div>
				<div class="case-item">
					<span class="item-title">是否见过病患
					</span>
					<div class="item-radio">
						<nut-radio v-model="is_see_patient" label="1">是</nut-radio>
						<nut-radio v-model="is_see_patient" label="0">否</nut-radio>
					</div>
				</div>
				<div class="case-item" v-show="is_see_patient == 1">
					<span class="item-title">与病患关系
					</span>
					<input type="text" placeholder="请输入" v-model="patient_relation">
				</div>
				<div class="case-item" v-show="is_see_patient == 1">
					<span class="item-title">接触时间
					</span>
					<input type="text" placeholder="请输入" v-model="contact_time">
				</div>
				<div class="case-item" v-show="is_see_patient == 1">
					<span class="item-title">接触地址
					</span>
					<input type="text" placeholder="请输入" v-model="contact_address">
				</div>
				<div class="case-item">
					<span class="item-title">是否出现疫情
					</span>
					<div class="item-radio">
						<nut-radio v-model="is_situation" label="1">是</nut-radio>
						<nut-radio v-model="is_situation" label="0">否</nut-radio>
					</div>
				</div>
				<div class="case-item" v-show="is_situation == 1">
					<span class="item-title">问题描述
					</span>
					<textarea placeholder="请进行简单得描述" v-model="situation_explain"></textarea>
				</div>
				<div class="case-item">
					<span class="item-title">备注
					</span>
					<textarea placeholder="请进行简单得描述" v-model="remarks"></textarea>
				</div>
			</div>
			<div class="button"><button @click="submit()">提交</button></div>
		</main>
	</div>
</template>

<script>
	export default {
		name: 'caseformAdd',
		data() {
			return {
				name: '',
				id_card: '',
				guardian: '',
				mobile: '',
				habitation: '',
				case_type_list: [
					// {
					// 	name:'疑似病例',
					// 	value:1
					// },
					{
						name:'潜在感染者',
						value:2
					}
				],
				case_type: '2',
				temperature: '',
				symptom_list: [{
						name: '无症状',
						isCheck: false
					},
					{
						name: '发热',
						isCheck: false
					},
					{
						name: '咳嗽',
						isCheck: false
					},
					{
						name: '乏力',
						isCheck: false
					},
					{
						name: '头疼',
						isCheck: false
					},
					{
						name: '全身酸痛',
						isCheck: false
					},
					{
						name: '呼吸困难',
						isCheck: false
					},
					{
						name: '咳痰',
						isCheck: false
					},
					{
						name: '鼻塞',
						isCheck: false
					},
					{
						name: '流涕',
						isCheck: false
					},
					{
						name: '胸闷',
						isCheck: false
					},
					{
						name: '呕吐',
						isCheck: false
					},
					{
						name: '腹泻',
						isCheck: false
					},
					{
						name: '其他',
						isCheck: false
					}
				],
				is_treat: '0',
				treat_image: '',
				is_contact: '',
				contact_explain: '',
				is_go_hubei: '',
				go_hubei_explain: '',
				is_see_patient: '',
				patient_relation: '',
				contact_time: '',
				contact_address: '',
				is_situation: '',
				situation_explain: '',
				remarks: ''
			}
		},
		methods: {
			backTo() {
				this.$router.go(-1)
			},
			submit(){
				const that = this
				let symptom = []
				for (let i in this.symptom_list) {
					if(this.symptom_list[i].isCheck){
						symptom.push(this.symptom_list[i].name)
					}
				}
				that.loading = that.$toast.loading();
				this.$api.caseAdd(
					this.name,
					this.id_card,
					this.guardian,
					this.mobile,
					this.habitation,
					this.case_type,
					this.temperature,
					String(symptom),
					this.is_treat,
					this.treat_image,
					this.is_contact,
					this.contact_explain,
					this.is_go_hubei,
					this.go_hubei_explain,
					this.is_see_patient,
					this.patient_relation,
					this.contact_time,
					this.contact_address,
					this.is_situation,
					this.situation_explain,
					this.remarks
				).then(function(res){
					console.info(res)
					switch (res.data.code){
						case 200:
							history.go(-1)
							that.$toast.text('添加成功')
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/assets/skin/css/index.scss";

	.caseformAdd {
		.case-box {
			.case-item {
				display: flex;
				justify-content: space-between;
				padding: 20px;
				border-bottom: 1px solid #e4e4e4;
				
				.item-title {
					min-width: 100px;
				}

				input {
					flex: 1;
					text-align: right;
					border: none;
				}
			}

			.case-item:first-child {
				border-top: 1px solid #e4e4e4;
			}

			// .item-radio {
			// 	margin-left: 20px;
			// }
		}

		.button {
			margin: 50px 0;
			text-align: center;

			button {
				padding: 10px 50px;
				background: #464c5b;
				color: #fff;
				border-radius: 5px;
				border: none;
			}
		}
	}
	.tiwen input{
		max-width: 50px;
		width: 50px !important;
	}
</style>
