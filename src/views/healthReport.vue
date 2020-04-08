<template>
	<div class="healthReport">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:;" class="aui-navBar-item" @click="back()">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">健康情况上报</span>
			</div>
		</header>
		<main>
			<div class="form-box">
				<form action="">
					<div class="item">
						<label>
							<span class="item-title">被上报人信息</span>
							<span>
								<div class="input-radio">
									<input type="radio" id="benren" value="1" v-model="type">
									<label for="benren">本人</label>
								</div>
								<div class="input-radio">
									<input type="radio" id="feibenren" value="2" v-model="type">
									<label for="feibenren">非本人</label>
								</div>
							</span>
						</label>
						<div>
							<label>
								<span>被上报人姓名</span>
								<input type="text" class="inputlong" v-model="reporter_name" placeholder="被上报人姓名" :readonly="type=='1'" />
							</label>
							<label>
								<span>被上报人身份证</span>
								<input type="text" class="inputlong" v-model="reporter_id_card" placeholder="被上报人身份证" :readonly="type=='1'" />
							</label>
							<label>
								<span>被上报人联系方式</span>
								<input type="text" class="inputlong" v-model="mobile" placeholder="被上报人联系方式" :readonly="type=='1'" />
							</label>
						</div>
					</div>
					<div class="item label">
						<span class="item-title point">Q1:今日体温</span>
						<input type="number" placeholder="输入体温数字" v-model="temperature" />
					</div>
					<div class="item label TB">
						<div>
							<span class="item-title point">Q2:今日身体是否有以下不适症状？</span>
							<span>
								<div class="input-radio">
									<input id="zz" type="radio" value="1" v-model="is_discomfort" />
									<label for="zz">是</label>
								</div>
								<div class="input-radio">
									<input id="zz1" type="radio" value="0" v-model="is_discomfort" />
									<label for="zz1">否</label>
								</div>
							</span>
						</div>
						<div v-show="is_discomfort=='1'">
							<ul class="selection" style="padding-top:20px;">
								<li @click="addSelection(item, index)" class="selection-item" :class="item.isCheck == 1 ? 'selection-item-active' : ''"
								 v-for="(item, index) of selection" :key="index">
									{{ item.name }}
								</li>
							</ul>
						</div>
					</div>
					<div class="item label TB">
						<div>
							<span class="item-title point">Q3:是否还存在其他症状？</span>
							<span>

								<span>
									<div class="input-radio">
										<input id="zz2" type="radio" value="1" v-model="is_other_symptom" />
										<label for="zz2">是</label>
									</div>
									<div class="input-radio">
										<input id="zz3" type="radio" value="0" v-model="is_other_symptom" />
										<label for="zz3">否</label>
									</div>
								</span>

							</span>
						</div>
						<div v-show="is_other_symptom=='1'">
							<textarea class="inputlong" v-model="other_symptom" placeholder="请描述症状情况" />
							</div>
					</div>
					<div class="item label">
						<span class="item-title point">Q4:累计不舒服天数</span>
						<input type="number" style="width: 50%;" placeholder="0表示无症状" v-model="symptom_days" />天
					</div>
					<div class="item label TB">
						<div>
							<span class="item-title point">Q5:是否就诊住院？</span>
							<span>
								<div class="input-radio">
									<input id="zz4" type="radio" value="1" v-model="is_hospitalization" />
									<label for="zz4">是</label>
								</div>
								<div class="input-radio">
									<input id="zz5" type="radio" value="0" v-model="is_hospitalization" />
									<label for="zz5">否</label>
								</div>
							</span>
						</div>
						<div v-show="is_hospitalization=='1'" style="display: flex;flex-direction: column;">
							<span style="width: 100%;padding: 10px 0;display: flex;justify-content: space-between;align-items: center;">
								<span>
									上传就诊照片
								</span>
								<div class="uploadImg">
									<input type="button" class="imgbutton" @click="Open_dialog(0)" value="+ 上传就医照片"/>
									<input type="file" style="width:150px" @change="img($event)">
								</div>
							</span>
							<textarea class="inputlong" v-model="isiting_process" placeholder="请描述就诊情况" />
							<div class="resumption-sec-div" v-show="medical_materialsList!=''">
								<div>
									<img width="60%" :src="item" alt="" v-for="(item,i) in medical_materialsList" :key="i" @click="checkImg1(item,i)" v-show="item">
								</div>
							</div>
						</div>
					</div>
					<div class="item label TB">
						<div>
							<span class="item-title point">Q6:今日是否与湖北（尤其是武汉）或已确诊人员有过较为密切的接触？</span>
							<span>
								<div class="input-radio">
									<input id="zz6" type="radio" value="1" v-model="is_contact" />
									<label for="zz6">是</label>
								</div>
								<div class="input-radio">
									<input id="zz7" type="radio" value="0" v-model="is_contact" />
									<label for="zz7">否</label>
								</div>
							</span>
						</div>
						<div v-show="is_contact=='1'">
							<textarea class="inputlong" v-model="contact_explain" placeholder="请描述接触过程" />
						</div>
					</div>
					<div class="item label TB">
						<div>
							<span class="item-title point">Q7:所在地（工作、生活场所）是否出现任何与疫情相关的情况？</span>
							<span>
								<div class="input-radio">
									<input id="zz8" type="radio" value="1" v-model="is_outbreak" />
									<label for="zz8">是</label>
								</div>
								<div class="input-radio">
									<input id="zz9" type="radio" value="0" v-model="is_outbreak" />
									<label for="zz9">否</label>
								</div>
							</span>
						</div>
						<div v-show="is_outbreak=='1'">
							<textarea class="inputlong" v-model="explain" placeholder="请输入疫情相关情况" />
						</div>
					</div>
					<div class="item label TB">
						<div>
							<span class="item-title point">Q8:今日接触人群</span>
							<span style="opacity:0;">
								<div class="input-radio">
									<input id="zz8" type="radio" value="1" v-model="is_outbreak" />
									<label for="zz8">是</label>
								</div>
								<div class="input-radio">
									<input id="zz9" type="radio" value="0" v-model="is_outbreak" />
									<label for="zz9">否</label>
								</div>
							</span>
						</div>
						<div class="is_facepeople=='1'">
							<textarea class="inputlong" v-model="contact_crowd" placeholder="请列出今日接触人员名称" />
						</div>
					</div>

				</form>
			</div>
			<div class="submitReport">
				<button @click="submit()">提交上报</button>
			</div>
		</main>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				type:'2',
				temperature:'',
				reporter_name:'',
				mobile:'',
				reporter_id_card:'',
				is_discomfort:'',
				symptom_days:'',
				symptom:'',
				is_other_symptom:'',
				is_hospitalization:'',
				other_symptom:'',
				isiting_process:'',
				medical_materials:'',
				medical_materialsList:[],
				is_contact:'',
				contact_explain:'',
				is_outbreak:'',
				explain:'',
				contact_crowd:'',
				selection: [
					{
						name: '发热',
						isCheck: false
					},
					{
						name: '干咳',
						isCheck: false
					},
					{
						name: '乏力',
						isCheck: false
					},
					{
						name: '呼吸困难',
						isCheck: false
					},
					{
						name: '腹泻',
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
						name: '头疼',
						isCheck: false
					},
					{
						name: '胸闷',
						isCheck: false
					},
					{
						name: '呕吐',
						isCheck: false
					}
					
				]
			}
		},
		watch:{
			type(){
				if(this.type=='1'){
					const user = JSON.parse(localStorage.getItem('UserInfo'))
					this.reporter_name = user.real_name
					this.reporter_id_card = user.id_card
					this.mobile = user.mobile
				}else{
					this.reporter_name = ''
					this.reporter_id_card = ''
					this.mobile = ''
				}
			}
		},
		methods: {
			back(){
				history.go(-1)
			},
			checkImg1(item,index){
				console.info(index)
				this.medical_materialsList.splice(index,index+1)
			},
			img(e) { //file点击事件
				const that = this
				var file_ = e.path[0].files[0];
				//判断是否是图片类型
				if (!/image\/\w+/.test(file_.type)) {
					alert("只能选择图片");
					return false;
				}
				var reader = new FileReader();
				reader.onload = function(e) {
					that.medical_materialsList.push(reader.result)
				}
				reader.readAsDataURL(e.path[0].files[0])
			},
			addSelection(item,index){
				const that = this
				this.selection[index].isCheck = !this.selection[index].isCheck
				let arr = []
				for(let i in that.selection){
					if(that.selection[i].isCheck){
						arr.push(that.selection[i].name)
					}
				}
				that.symptom = arr
			},
			submit(){
				const that = this
				
				if(this.is_discomfort == '1' && that.symptom.length<=0){
					that.$toast.text('请选择症状')
					return
				}
				if(this.is_other_symptom == '1' && that.other_symptom.length<=0){
					that.$toast.text('请详细描述您的症状')
					return
				}
				if(this.is_hospitalization == '1' && that.medical_materialsList.length<=0){
					that.$toast.text('请上传就医图片')
					return
				}
				if(this.is_contact == '1' && that.contact_explain.length<=0){
					that.$toast.text('详细描述如何接触')
					return
				}
				if(this.is_outbreak == '1' && that.explain.length<=0){
					that.$toast.text('请写明接触过的相关人员')
					return
				}
				if(35>that.temperature>=45){
					that.$toast.text('请输入正确的温度')
					return
				}
				if(0>that.symptom_days){
					that.$toast.text('请输入正确的天数')
					return
				}
				
				if(this.is_discomfort == '0'){
					that.symptom = ''
				}
				if(this.is_other_symptom == '0'){
					that.other_symptom = ''
				}
				if(this.is_hospitalization == '0'){
					that.medical_materialsList = ''
				}
				if(this.is_contact == '0'){
					that.contact_explain = ''
				}
				if(this.is_outbreak == '0'){
					that.explain = ''
				}
				
				
				that.loading = that.$toast.loading();
				if(that.is_hospitalization != '1' ){
					that.$api.health_report(
						that.type,
						that.temperature,
						that.reporter_name,
						that.mobile,
						that.reporter_id_card,
						that.is_discomfort,
						that.symptom_days,
						String(that.symptom),
						that.is_other_symptom,
						that.is_hospitalization,
						that.other_symptom,
						that.isiting_process,
						that.medical_materials,
						that.is_contact,
						that.contact_explain,
						that.is_outbreak,
						that.explain,
						that.contact_crowd
					).then(function(res){
						switch (res.data.code){
							case 200:
								that.loading.hide();
								that.$router.push({
									path: '/submitsuccess',
									query: {
										record: 'health'
									}
								})
								break;
							case 500:
								that.$toast.text(res.data.msg)
								that.loading.hide();
								break;
							default:
								break;
						}
					})
				}else{
					that.$api.uploadImage(that.medical_materialsList).then(function(value){
						that.$api.health_report(
							that.type,
							that.temperature,
							that.reporter_name,
							that.mobile,
							that.reporter_id_card,
							that.is_discomfort,
							that.symptom_days,
							String(that.symptom),
							that.is_other_symptom,
							that.is_hospitalization,
							that.other_symptom,
							that.isiting_process,
							value.data.url,
							that.is_contact,
							that.contact_explain,
							that.is_outbreak,
							that.explain,
							that.contact_crowd
						).then(function(res){
							switch (res.data.code){
								case 200:
									that.loading.hide();
									that.$router.push({
										path: '/submitsuccess',
										query: {
											record: 'health'
										}
									})
									break;
								case 500:
									that.$toast.text(res.data.msg)
									that.loading.hide();
									break;
								default:
									break;
							}
						})
					})
				}
				
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/assets/skin/css/index.scss";
	@import "../assets/skin/css/tijiao.scss";
	@import "../assets/skin/css/jquery-labelauty.scss";
	@import "../assets/skin/css/resumption.scss";
	*{
		color:rgba(0,0,0,.8);
	}
	.resumption-sec-div{
		div{
			display: block !important;
		}
	}
	.uploadImg{
		position:relative;
		margin-top: 10px;
		input:last-of-type{
			position:absolute;
			opacity: 0;
		}
	}
	.healthReport {
		.resumption-file-img-box img {
			width: 50%;
			height: auto;
		}
		.form-box {
			padding-bottom: 50px;
			.item {
				position: relative;
				
				.point:before {
					position: absolute;
					content: "*";
					color: red;
					left: -10px;
					top: 5px;
				}

				.item-title {
					margin-right: 10px;
					display: flex;
					align-items: center;
				}

				.inputlong {
					margin: 5px 0;

					.item-button {
						width: 100px;
						padding: 10px;
						box-sizing: border-box;
						background: #fff;
						border: 1px solid #2f528f;
						border-radius: 5px;
					}
				}

				.selection {
					.selection-item {
						display: inline-block;
						background: #a5a5a5;
						// border: 1px solid #787878;
						border-radius: 5px;
						margin-right: 5px;
						margin-bottom: 5px;
						padding: 0 15px;
						color: #fff;
						height: 35px;
						font-size: 13px;
						line-height: 30px;
					}

					.selection-item-active {
						background: #007AFF;
						// border: 1px solid #2f528f;
					}
				}

				.imgbutton {
					background: #007AFF;
					border: 1px solid #007AFF;
					border-radius: 5px;
					color: #fff;
					padding: 5px 20px;
				}
			}
		}

		.submitReport {
			z-index: 9;
			background: #fff;
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 50px;
			bottom: 0;
			right: 0;
			left: 0;
			text-align: center;

			button {
				width: 93%;
				border: 1px solid #2f528f;
				border-radius: 50px;
				background: #007AFF;
				color: #fff;
				height: 40px;
				margin: 10px 0;
			}
		}
	}
	label,.label{
		box-sizing: border-box;
		border-bottom:1px solid rgba(0,0,0,.1);
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		padding: 15px 10px;
		box-sizing: border-box;
		span:first-child{
			width: 50%;
			flex-shrink: 0;
		}
		span:last-child{
			display: flex;
			justify-content: flex-end;
			input{
				margin-left: 20px;
			}
		}
		input{
			text-align: right;
			border: none;
			transform: translateX(-30px);
		}
	}
	.TB{
		div{
			display: flex;
			width: 100%;
			justify-content: space-between;
		}
		flex-direction: column;
	}
	textarea{
		width: 100%;
		padding: 10px;
		box-sizing: border-box;
		border: none;
	}
	.input-radio {
	  // 单选框
	  margin-left: 20px;
	  input[type="radio"] {
	    
	    // 将原生单选框透明
	    opacity: 0;
		position: absolute;
	
	    // 紧接在单选框后面的标签，用于显示文字并作为伪元素的载体
	    + label {
			padding:0 10px;
			border:none;
	      position: relative;
	      cursor: pointer;
	      
	      // 下面使用伪元素模拟单选框
	
	      // 圆形外边线
	      &::before {
	        content: '';
	        position: absolute;
	        border-radius: 50%;
	        width: 18px;
	        height: 18px;
	        border: 1px solid #007AFF;
			left: -20px;
	      }
	      
	      // 实心圆，用于选中状态的显示
	      &::after {
	        content: '';
			left: -16px;
	        position: absolute;
	        border-radius: 50%;
	        width: 12px;
	        height: 12px;
	        // 缩放动效，不显示
	        transform: scale(0);
	      }
	    }
	    
	    // 单选框的选中状态，为其添加 checked 属性
	    &:checked {
	      + label {
	        &::before {
	          border-color: #007AFF;
	        }
	        &::after {
	          background-color: #007AFF;
	          // 缩放动效，放大到正常大小
	          transform: scale(1);
	          transition: all .3s;
	        }
	      }
	    }
	
	    // hover 状态
	    &:hover {
	      + label::before {
	        border-color: #007AFF;
	      }
	    }
	    
	    // focus 状态
	    &:focus {
	      + label::before {
	        box-shadow: 0 0 6px #007AFF;
	      }
	    }
	
	  }
	
	}
</style>
