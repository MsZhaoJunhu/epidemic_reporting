<template>
	<section>
		<!-- <img src="http://www.zjcoo.cn:8085/" id="imageWithGps"> -->
		<div class="hd"></div>
		<div id="paper_title" class="weui_text_area weui-run-head" style="margin-bottom:25px;padding: 20px !important;background-color: #fff;">
			<h2 style="text-align: center;margin-bottom:16px;word-break:break-all;">{{form.infoName || '无'}}<br/>（出入登记表）</h2>
		</div>
		<div class="bd" style="margin-top:-20px !important">

			<input type="hidden" name="form_id" id="form_id" value="46">
			<div class="weui_cells weui_cells_form question-top">
				<p style="color:#666;font-size:14px;padding:10px;background: #fff;">您好！根据《中华人民共和国传染病防治法》、《国家卫生健康委办公厅关于加强重点地区重点医院发热门诊管理及医疗机构内感染防控工作的通知》及重庆市《关于进一步提升可疑病例早期识别诊断能力和春节后诊疗管理工作的通知》等法律、通知要求，结合疫情防控工作需要，请您配合我们如实填写：
				</p>
			</div>

			<div class="weui_cells weui_cells_form question-top">
				<div class="weui_panel weui_panel_access">
					<div for="textfield_0" class="weui_cells_title">
						<div class="title-and-num">
							<span class="text-grey question-num"></span>您的手机号(必填)
						</div>
						<div class="desc"></div>
					</div>
					<div class="weui_cells weui_cells_form">
						<div class="weui_cell">
							<div class="weui_cell_bd weui_cell_primary">
								<input name="shouji" required="" class="weui_input" id="shouji" type="text" placeholder="请输入您的手机号" maxlength="32"
								 v-model="form.phone">
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="weui_cells weui_cells_form question-top">
				<div class="weui_panel weui_panel_access">
					<div for="textfield_0" class="weui_cells_title">
						<div class="title-and-num">
							<span class="text-grey question-num"></span>您的姓名(必填)
						</div>
						<div class="desc"></div>
					</div>
					<div class="weui_cells weui_cells_form">
						<div class="weui_cell">
							<div class="weui_cell_bd weui_cell_primary">
								<input name="pname" id="name" required="" class="weui_input" type="text" placeholder="请输入您的姓名" maxlength="32"
								 v-model="form.name">
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="weui_cells weui_cells_form question-top">
				<div class="weui_panel weui_panel_access">
					<div for="textfield_0" class="weui_cells_title">
						<div class="title-and-num">
							<span class="text-grey question-num"></span>您的身份证号(必填)
						</div>
						<div class="desc"></div>
					</div>
					<div class="weui_cells weui_cells_form">
						<div class="weui_cell">
							<div class="weui_cell_bd weui_cell_primary">
								<input name="id_card" id="id_card" class="weui_input" type="text" placeholder="请输入您的身份证号" maxlength="32"
								 v-model="form.idCode">
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div class="weui_cells weui_cells_form question-top">
				<div class="weui_panel weui_panel_access">
					<div for="textfield_0" class="weui_cells_title">
						<div class="title-and-num">
							<span class="text-grey question-num"></span>您的体温(必填，请工作人员测试之后填写)
						</div>
						<div class="desc"></div>
					</div>
					<div class="weui_cells weui_cells_form">
						<div class="weui_cell">
							<div class="weui_cell_bd weui_cell_primary">
								<input name="id_card" id="id_card" class="weui_input" type="text" placeholder="请输入您的体温" maxlength="32"
								 v-model="form.tiwen">
							</div>
						</div>
					</div>
				</div>
			</div>



			<!-- <div  class="weui_cells weui_cells_form question-top" >
	 <div class="weui_panel weui_panel_access">
	  <div for="textfield_0" class="weui_cells_title">
	   <div class="title-and-num">
	    <span class="text-grey question-num"></span>您的居住地
	   </div>
	   <div class="desc"></div>
	  </div>
	  <div class="weui_cells weui_cells_form"> 
	   <div class="weui_cell"> 
	    <div class="weui_cell_bd weui_cell_primary"> 
	     <input  name="address"  class="weui_input" type="text" placeholder="请输入您的居住地" maxlength="32" /> 
	    </div> 
	   </div>
	  </div>
	 </div>
	</div> -->
			<div class="weui_cells weui_cells_form question-top">
				<div for="combobox_0" class="weui_cells_title ">
					<div class="title-and-num">
						<span class="text-grey question-num"></span>来院事由(必填)
					</div>
					<div class="desc"></div>
				</div>
				<div class="weui_cell weui_cell_select">
					<div class="weui_cell_bd weui_cell_primary">
						<select class="weui_select neu_input" required="" name="mudi" type="list" v-model="form.reason">
							<option value="1">门/急诊就诊</option>
							<option value="2">住院</option>
							<option value="3">探视</option>
							<option value="4">办公</option>
							<option value="5">其他</option>
						</select>
					</div>
				</div>
			</div>
			<div class="weui_cells weui_cells_form question-top">
				<div for="combobox_0" class="weui_cells_title ">
					<div class="title-and-num">
						<span class="text-grey question-num"></span>1、一周内有无发热（体温＞37.2℃）(必填)
					</div>
					<div class="desc"></div>
				</div>
				<div class="weui_cell weui_cell_select">
					<div class="weui_cell_bd weui_cell_primary">
						<select class="weui_select neu_input" required="" name="is_tiwen" type="list" v-model="form.isHeat">
							<option value="0">否</option>
							<option value="1">是</option>

						</select>
					</div>
				</div>
			</div>
			
			<div class="weui_cells weui_cells_form question-top">
				<div for="combobox_0" class="weui_cells_title ">
					<div class="title-and-num">
						<span class="text-grey question-num"></span>2、有无以下症状（多选）
					</div>
					<div class="desc"></div>
				</div>
				<div class="weui_cell weui_cell_select">
					<div class="weui_cell_bd weui_cell_primary" id="symptom" style="padding:10px;">
						<label v-for="(item,index) in form.bingzheng" @click="select(index,$event)">
							<div class="duoxuan" :class="item.value==true?'checked':''"></div>
							{{item.name}}
						</label>
					</div>
				</div>
			</div>
			

			<div class="weui_cells weui_cells_form question-top">
				<div for="combobox_0" class="weui_cells_title ">
					<div class="title-and-num">
						<span class="text-grey question-num"></span>3、发病前14天内是否有武汉及周边或其他有病例报告社区的旅行史或居住史
					</div>
					<div class="desc"></div>
				</div>
				<div class="weui_cell weui_cell_select">
					<div class="weui_cell_bd weui_cell_primary">
						<select class="weui_select neu_input" required="" name="is_travel" type="list" v-model="form.lvyou">
							<option value="0">否</option>
							<option value="1">是</option>
						</select>
					</div>
				</div>
			</div>

			<div class="weui_cells weui_cells_form question-top">
				<div for="combobox_0" class="weui_cells_title ">
					<div class="title-and-num">
						<span class="text-grey question-num"></span>4、发病前14天内是否曾接触过来自武汉及周边或来自有病例报告社区的发热或有呼吸道症状的患者
					</div>
					<div class="desc"></div>
				</div>
				<div class="weui_cell weui_cell_select">
					<div class="weui_cell_bd weui_cell_primary">
						<select class="weui_select neu_input" required="" name="is_jiechu" type="list" v-model="form.huanzhe">
							<option value="0">否</option>
							<option value="1">是</option>
						</select>
					</div>
				</div>
			</div>
			<div class="weui_cells weui_cells_form question-top">
				<div for="combobox_0" class="weui_cells_title ">
					<div class="title-and-num">
						<span class="text-grey question-num"></span>5、有无新型冠状病毒肺炎确诊或疑似病例接触史
					</div>
					<div class="desc"></div>
				</div>
				<div class="weui_cell weui_cell_select">
					<div class="weui_cell_bd weui_cell_primary">
						<select class="weui_select neu_input" required="" name="is_touch" type="list" v-model="form.jiechushi">
							<option value="0">否</option>
							<option value="1">是</option>
						</select>
					</div>
				</div>
			</div>
			<div class="weui_cells weui_cells_form question-top">
				<div for="combobox_0" class="weui_cells_title ">
					<div class="title-and-num">
						<span class="text-grey question-num"></span>6、有无密切接触持续发热（三天以上）病人
					</div>
					<div class="desc"></div>
				</div>
				<div class="weui_cell weui_cell_select">
					<div class="weui_cell_bd weui_cell_primary">
						<select class="weui_select neu_input" required="" name="is_fare" type="list" v-model="form.bingren">
							<option value="0">否</option>
							<option value="1">是</option>
						</select>
					</div>
				</div>
			</div>
			<div class="weui_cells weui_cells_form question-top">
				<div for="combobox_0" class="weui_cells_title ">
					<div class="title-and-num">
						<span class="text-grey question-num"></span>7、所在社区、楼栋、单位等有无聚集性发病
					</div>
					<div class="desc"></div>
				</div>
				<div class="weui_cell weui_cell_select">
					<div class="weui_cell_bd weui_cell_primary">
						<select class="weui_select neu_input" required="" name="is_fujin" type="list" v-model="form.shequ">
							<option value="0">否</option>
							<option value="1">是</option>
						</select>
					</div>
				</div>
			</div>
			<div class="weui_cells weui_cells_form question-top">
				<p style="color:#f00;padding:10px;">我承诺以上信息准确无误。
					请您务必如实填报，若故意隐瞒相关情况，造成后果，您及陪同人员将要承担相应法律责任。</p>
			</div>
		</div>

		<button type="submit" class="f_submit" @click="submit()">确认无误,立即提交</button>

		<div style="font-size:12px;padding-bottom: 20px;">
			<div style="text-align:center;padding-top:25px;">
				重庆城银科技提供技术支持
				<div></div>
			</div>
		</div>




	</section>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					infoName:'',
					tiwen:'',
					phone: '',
					name: '',
					idCode: '',
					reason: '1',
					isHeat: '0',
					symptom: [],
					lvyou: '0',
					huanzhe: '0',
					jiechushi: '0',
					bingren: '0',
					shequ: '0',
					bingzheng: [{
						name: '无症状',
						value: false,
					}, {
						name: '咳嗽',
						value: false,
					}, {
						name: '咳痰',
						value: false,
					}, {
						name: '咽痛',
						value: false,
					}, {
						name: '鼻塞',
						value: false,
					}, {
						name: '流涕',
						value: false,
					}, {
						name: '呼吸困难',
						value: false,
					}, {
						name: '结膜充血',
						value: false,
					}, {
						name: '头痛',
						value: false,
					}, {
						name: '乏力',
						value: false,
					}, {
						name: '肌肉酸痛',
						value: false,
					}, {
						name: '腹泻',
						value: false,
					}, {
						name: '流涕',
						value: false,
					}, {
						name: '其他',
						value: false,
					}]
				},
			}
		},
		created() {
			const that = this
			if(localStorage.getItem('form')!=null){
				that.$dialog({
					title: "系统消息",
					content: "本地有您上次提交时的信息 是否继续使用",
					closeOnClickModal: false,
					onOkBtn(event) { //确定按钮点击事件
						that.form = JSON.parse(localStorage.getItem('form'))
						that.getInfo()
						this.close(); //关闭对话框
					},
				});
			}
			this.getInfo()
		},
		mounted() {
			
		},
		methods: {
			getInfo() {
				const that = this
				this.$api.hospitalInfo(this.$route.query.id).then(function(res) {
					console.info(res)
					switch (res.data.code) {
						case 200:
							that.form.infoName = res.data.info.name
							break;
						case 500:
							that.$toast.text(res.data.msg)
							break;
						default:
							break;
					}
				})
			},
			submit() {
				
				const that = this
				that.loading = that.$toast.loading();
				this.$api.hospitalRegistration(
					this.form.tiwen,
					this.form.phone,
					this.form.name,
					this.form.idCode,
					this.form.reason,
					this.form.isHeat,
					String(this.form.symptom),
					this.form.lvyou,
					this.form.huanzhe,
					this.form.jiechushi,
					this.form.bingren,
					this.form.shequ,
					this.$route.query.id,
				).then(function(res) {
					console.info(res)
					switch (res.data.code) {
						case 200:
							that.loading.hide(); 
							localStorage.setItem('form',JSON.stringify(that.form))
							that.$dialog({
								title: "系统消息",
								content: "非常感谢您的耐心填写，请勿重复提交（可以离开当前页面了）",
								closeOnClickModal: false,
								noCancelBtn: true,
								onOkBtn(event) { //确定按钮点击事件
									that.$router.push('/regHospitalDetail');
									// WeixinJSBridge.invoke('closeWindow', {}, function (res) { });
									this.close(); //关闭对话框
								},
							});
							break;
						case 500:
							that.loading.hide();
							that.$toast.text(res.data.msg)
							break;
						default:
							break;
					}
				})
			},
			select(index, e) {
				if (index == 0) {
					this.form.bingzheng = [{
						name: '无症状',
						value: false,
					}, {
						name: '咳嗽',
						value: false,
					}, {
						name: '咳痰',
						value: false,
					}, {
						name: '咽痛',
						value: false,
					}, {
						name: '鼻塞',
						value: false,
					}, {
						name: '流涕',
						value: false,
					}, {
						name: '呼吸困难',
						value: false,
					}, {
						name: '结膜充血',
						value: false,
					}, {
						name: '头痛',
						value: false,
					}, {
						name: '乏力',
						value: false,
					}, {
						name: '肌肉酸痛',
						value: false,
					}, {
						name: '腹泻',
						value: false,
					}, {
						name: '流涕',
						value: false,
					}, {
						name: '其他',
						value: false,
					}]
					this.form.bingzheng[index].value = !this.form.bingzheng[index].value
				} else {
					this.form.bingzheng[0].value = false
					this.form.bingzheng[index].value = !this.form.bingzheng[index].value
				}
				let arr = []
				for (let i in this.form.bingzheng) {
					if (this.form.bingzheng[i].value == true) {
						arr.push(this.form.bingzheng[i].name)
					}
				}
				this.form.symptom = arr
			}
		}
	};
</script>

<style>
.nut-dialog-ok{
	background: rgba(0,122,255,.5) !important;
	background-color: rgba(0,122,255,.5) !important;
	color: #fff !important;
}
</style>
<style lang="scss" scoped>
	select,
	option {
		color: #353535 !important;
	}

	.weui_cells {
		background: #fff;
		margin-bottom: 15px;

		.title-and-num {
			padding: 10px;
			font-size: 16px;
			border-bottom: 1px solid rgba(217, 217, 217, .5);
		}

		.weui_input,
		select {
			width: 100%;
			border: none;
			padding: 10px;
			box-sizing: border-box;
			border-bottom: 1px solid rgba(217, 217, 217, .5);
		}
	}

	#symptom {
		display: flex;
		flex-wrap: wrap;

		label {
			margin-bottom: 10px;
			margin-right: 10px;
			display: flex;

			div {
				margin-right: 5px;
			}
		}
	}

	section {
		background-color: #eee !important
	}
	ol {
		list-style-type: decimal;
		list-style-position: inside;
		padding: 0px;
	}

	ul {
		list-style-type: disc;
		list-style-position: inside;
		padding: 0px;
	}

	.f_submit {
		width: 96%;
		height: 45px;
		line-height: 45px;
		color: #fff;
		font-size: 18px;
		text-align: center;
		display: block;
		border: none;
		background: #007AFF;
		margin: 10px auto;
		border-radius: 50px;
	}

	.title-and-num {
		color: #007AFF;
		;
	}

	.duoxuan {
		width: 16px;
		height: 18px;
		border: 1px solid #ddd;
		color: #666;
		margin-left: 5px;
	}

	.weui_input {
		color: #2196F3;
	}

	.weui_select {
		color: #2196F3;
	}

	.duoxuan {
		width: 15px;
		height: 15px;
		display: inline-block;
		text-align: center;
		vertical-align: middle;
		line-height: 15px;
		position: relative;
		margin: 0px;
	}

	.duoxuan::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		background: #fff;
		width: 100%;
		height: 100%;
		border: 1px solid #BBBBBB;
		box-sizing: border-box;
	}

	.duoxuan.checked::before {
		content: "\2713";
		background-color: #2196F3;
		color: #fff;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		font-size: 12px;
		font-weight: bold;
		border: none;
	}

	h2 {
		font-size: 1.5em !important;
		margin-top: 0 !important;
		font-weight: 700 !important;
		line-height: 1.6 !important;
	}
</style>
