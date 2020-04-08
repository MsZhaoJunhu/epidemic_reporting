<template>
	<section class="aui-flexView">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:history.back(-1);" class="aui-navBar-item">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title" v-show="hrefType!='update'">完善复工登记</span>
				<span class="aui-center-title" v-show="hrefType=='update'">修改复工登记</span>
			</div>
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-sys"></i>
			</a>
		</header>
		<section class="aui-scrollView">
			<div class="aui-view-box">
				<div class="resumption-table">
					<h6>企业基本信息</h6>
					<label>
						<span class="resumption-fir-td resumption-start">企业名称</span>
						<input type="text" v-model="companyName" />
					</label>
					<label>
						<span class="resumption-fir-td resumption-start">统一社会信用代码</span>
						<input type="text" v-model="code" />
					</label>
					<label class="select">
						<span class="resumption-fir-td resumption-start">辖区管理单位</span>
						<select @change="shenHeType($event)" style="background:none;">
							<option value="1" :selected="shenHeTypeValue=='1'">街道</option>
							<option value="2" :selected="shenHeTypeValue=='2'">镇</option>
							<option value="3" :selected="shenHeTypeValue=='3'">园区</option>
						</select>
					</label>
					<label class="select">
						<span class="resumption-fir-td" style="opacity: 0;">1</span>
						<select @change="selectCompetentType($event)" style="background:none;">
							<option :value="item.ITEM_CODE" :selected="item.ITEM_CODE==list2Value" v-for="item in list1">{{item.DEPT_NAME}}</option>
						</select>
					</label>
					<label class="select">
						<span class="resumption-fir-td">业主单位(园区/写字楼/下级单位)</span>
						<select @change="selectCompetentAdress($event)" style="background:none;">
							<option :value="item.id" :selected="item.id==parkName" v-for="item in list3">{{item.name}}</option>
						</select>
					</label>
					<label>
						<span class="resumption-fir-td resumption-start">办公地址</span>
						<input type="text" v-model="parkAdress" placeholder="请输入办公地址" />
					</label>
					<!-- <label class="select">
						<span class="resumption-fir-td resumption-start">业主单位(园区/写字楼)</span>
						<select v-model="parkName" style="background:none;">
							<option value="" :selected="parkName==''">请选择业主单位</option>
							<option :value="item.id" :selected="parkName==item.id" v-for="item in parkList">{{item.name}}</option>
						</select>
					</label> -->
					<label>
						<span class="resumption-fir-td resumption-start">法定代表人</span>
						<input type="text" v-model="legalRepresentative" placeholder="请输入法定代表人" />
					</label>
					<h6>复工信息</h6>
					<label class="select">
						<span class="resumption-fir-td resumption-start">企业所在行业:</span>
						<select @change="selectCompetentUnit($event)" style="background:none;">
							<option :value="item.dict_item_id" :selected="item.dict_item_id==list1Value" v-for="item in list2">{{item.item_name}}</option>
						</select>
					</label>
					<label>
						<span class="resumption-fir-td resumption-start">复工日期</span>
						<div style="margin-right:1rem;">
							<span @click="clickToChooseTime($event)" style="font-size: 14px;">{{ resumptionTime || "请选择复工日期" }}</span>
							<nut-datepicker :is-visible="isVisible" type="date" title="请选择日期" :is-show-chinese="false" @close="isVisible = false"
							 @choose="setChooseValue" :startDate="resumptionTime" endDate="2023-01-01">
							</nut-datepicker>
						</div>
					</label>
					<label class="resumption-special-par resumption-special-marginTop">
						<div class="resumption-fir-td resumption-start">复工原因</div>
						<textarea rows="4" v-model="resumptionReason" placeholder="请简单描述具体复工原因/复工理由"></textarea>
					</label>
					<label class="resumption-special-marginTop">
						<div class="resumption-fir-td resumption-start">员工总人数</div>
						<div class="resumption-sec-td">
							<input type="number" v-model="allPerson" placeholder="请输入员工总人数" />
							<span>人</span>
						</div>
					</label>
					<label class="resumption-special-marginTop">
						<div class="resumption-fir-td resumption-start">其中来自或去过重点地区人数</div>
						<div class="resumption-sec-td">
							<input type="number" v-model="adress1" placeholder="请输入人数" />
							<span>人</span>
						</div>
					</label>
					<label class="resumption-special-marginTop">
						<div class="resumption-fir-td resumption-start">复工人数</div>
						<div class="resumption-sec-td">
							<input type="number" v-model="resumptionNumber" placeholder="请输入提前复工具体人数" />
							<span>人</span>
						</div>
					</label>
					<label class="resumption-special-marginTop">
						<div class="resumption-fir-td resumption-start">其中来自或去过重点地区人数</div>
						<div class="resumption-sec-td">
							<input type="number" v-model="adress2" placeholder="请输入人数" />
							<span>人</span>
						</div>
					</label>
					<div class="resumption-tr resumption-special-marginTop resumption-special-submitPar">
						<span class="resumption-fir-span">
							<span class="resumption-start">复工员工信息(已添加{{ selectList.length }}人)</span>
							<div class="resumption-tr">
								<span @click="clickSession" style="color:red">+添加复工员工</span>
							</div>
						</span>
					</div>
					<label class="resumption-special-par resumption-special-marginTop">
						<div class="resumption-fir-td" style="display:flex;justify-content: space-between;transform: translateX(0rem);padding:0 1rem;">
							<span class="resumption-start">防护措施</span>
							<span style="color:#0b58e0" @click="toastMsg">查看防护要求</span>
						</div>
						<textarea rows="4" v-model="resumptionReady" placeholder="准备了哪些防护措施？举例说明"></textarea>
					</label>
					<label class="resumption-special-marginTop">
						<div class="resumption-fir-td resumption-start">建筑面积</div>
						<div class="resumption-sec-td">
							<input type="number" v-model="area_covered" placeholder="公司建筑面积" />
							<span>平米</span>
						</div>
					</label>
					<h6>复工物资验证</h6>
					<label class="resumption-special-marginTop">
						<div class="resumption-fir-td resumption-start">准备额温枪数量</div>
						<div class="resumption-sec-td">
							<input type="number" v-model="thermometer_number" placeholder="(建议至少准备2个) " />
							<span>个</span>
						</div>
					</label>
					<label class="resumption-special-marginTop">
						<div class="resumption-fir-td resumption-start">50%浓度的84消毒液14天储备升数</div>
					</label>
					<label class="resumption-special-marginTop">
						<div class="resumption-sec-tds">
							<input type="number" v-model="disinfectant_number" :placeholder=dateinit />
							<span>升</span>
						</div>
					</label>
					<p style="font-size:13px;padding:0.5rem 1rem;color:#888;">说明:1升50%浓度消毒液1:10兑水后可用于1000平米消毒,每个公司每天消毒两次</p>
					<label class="resumption-special-marginTop">
						<div class="resumption-fir-td resumption-start">75%浓度的医用酒精</div>
						<div class="resumption-sec-td">
							<input type="number" v-model="alcohol" placeholder="请输入医用酒精数量 " />
							<span>升</span>
						</div>
					</label>
					<label class="resumption-special-marginTop">
						<div class="resumption-fir-td resumption-start">临时隔离场所</div>
						<div class="resumption-sec-td">
							<input type="number" v-model="disinfection_sites_number" placeholder="(建议至少1个) " />
							<span>个</span>
						</div>
					</label>
					<label class="resumption-special-marginTop">
						<div class="resumption-fir-td resumption-start">封闭式专用丢口罩垃圾桶</div>
						<div class="resumption-sec-td">
							<input type="number" v-model="dustbin_number" placeholder="(建议至少2个) " style="width: 100px;" />
							<span>个</span>
						</div>
					</label>
					<label class="resumption-special-marginTop">
						<div class="resumption-fir-td resumption-start">14天口罩储备量 1人1天至少储备1个</div>
					</label>
					<label class="resumption-special-marginTop">
						<div class="resumption-sec-tds">
							<input type="number" v-model="mask_number" :placeholder='mask' />
							<span>个</span>
						</div>
					</label>
				</div>
				<div class="resumption-tr resumption-special-marginTop resumption-special-submitPar">
					<span class="resumption-fir-span">
						<span class="resumption-start">上传物资照片</span>
					</span>
					<div class="resumption-sec-div img-par-rester">
						<div class="fir-img-par">
							<div v-for="(item,index) in img1List" @click="clickToDelete(index)">
								<img :src="item" alt="">
							</div>
						</div>
						<div class="las-img-par">
							<input type="file" @change="img($event)" accept="image/*" />
							<nut-icon type="plus" color="rgb(240,37,15)">
							</nut-icon>
						</div>
					</div>
				</div>
				<div class="resumption-tr resumption-special-marginTop resumption-special-submitPar">
					<span class="resumption-fir-span">
						<span class="resumption-start">上传企业复产复工疫情防控承诺书</span>
						<div class="resumption-tr">
							<a href="http://fgfcapi.cy-coo.com/down/fgfc3.docx" style="color:rgb(40, 116, 255);">下载承诺书</a>
						</div>
					</span>
					<div class="resumption-sec-div img-par-rester">
						<div class="fir-img-par fir-file-par">
							<div v-for="(item,index) in file1List" @click="clickToDelete2(index)">
								<img src="../assets/skin/images/file.png" alt="">
								<p>{{item}}</p>
							</div>
						</div>
						<div class="las-img-par">
							<input type="file" id="file1" @change="selectFile1" />
							<nut-icon type="plus" color="rgb(240,37,15)">
							</nut-icon>
						</div>
						<p style="margin-bottom: 1rem;">(支持docx,pdf,excel格式)</p>
					</div>
				</div>
				<div class="resumption-tr resumption-special-marginTop resumption-special-submitPar" v-show="this.list1Value=='5'">
					<span class="resumption-fir-span">
						<span class="resumption-start">上传建筑工地开(复)工自查(检查)表</span>
						<div class="resumption-tr">
							<a href="http://fgfcapi.cy-coo.com/down/fgfc2.docx" style="color:rgb(40, 116, 255);">下载资料模板</a>
						</div>
					</span>
					<div class="resumption-sec-div img-par-rester">
						<div class="fir-img-par fir-file-par">
							<div v-for="(item,index) in file2List" @click="clickToDelete3(index)">
								<img src="../assets/skin/images/file.png" alt="">
								<p>{{item}}</p>
							</div>
						</div>
						<div class="las-img-par">
							<input type="file" id="file2" @change="selectFile2" />
							<nut-icon type="plus" color="rgb(240,37,15)">
							</nut-icon>
						</div>
						<p style="margin-bottom: 1rem;">(支持docx,pdf,excel格式)</p>
					</div>
				</div>
				<div class="resumption-tr resumption-special-marginTop resumption-special-submitPar" v-show="this.list1Value=='5'">
					<span class="resumption-fir-span">
						<span class="resumption-start">上传建筑工地,“三制”自查(检查)表</span>
						<div class="resumption-tr">
							<a href="http://fgfcapi.cy-coo.com/down/fgfc1.docx" style="color:rgb(40, 116, 255);">下载资料模板</a>
						</div>
					</span>
					<div class="resumption-sec-div img-par-rester">
						<div class="fir-img-par fir-file-par">
							<div v-for="(item,index) in file3List" @click="clickToDelete4(index)">
								<img src="../assets/skin/images/file.png" alt="">
								<p>{{item}}</p>
							</div>
						</div>
						<div class="las-img-par">
							<input type="file" id="file3" @change="selectFile3" />
							<nut-icon type="plus" color="rgb(240,37,15)">
							</nut-icon>
						</div>
						<p style="margin-bottom: 1rem;">(支持docx,pdf,excel格式)</p>
					</div>
				</div>
				<div class="resumption-tr resumption-special-marginTop resumption-special-submitPar">
					<span class="resumption-fir-span">
						<span class="resumption-start">上传更多材料</span>
						<p>(请根据辖区部门相关规定上传相关资料)</p>
					</span>
					<p></p>
					<div class="resumption-sec-div img-par-rester">
						<div class="fir-img-par fir-file-par">
							<div v-for="(item,index) in file4List" @click="clickToDelete5(index)">
								<img src="../assets/skin/images/file.png" alt="">
								<p>{{item}}</p>
							</div>
						</div>
						<div class="las-img-par">
							<input type="file" id="file4" @change="selectFile4" />
							<nut-icon type="plus" color="rgb(240,37,15)">
							</nut-icon>
						</div>
						<p style="margin-bottom: 1rem;">(支持docx,pdf,excel格式)</p>
					</div>
				</div>
				<div class="radio-par">
					<nut-checkbox v-model="radio1">
						已做好岗前防疫知识培训
					</nut-checkbox>
				</div>
				<div class="check-par">
					<a href="http://fgfcapi.cy-coo.com/down/shouce.html" style="color:rgb(40, 116, 255);">查看《企业职工疫情防控操作手册》</a>
				</div>
				<div class="resumption-btn-par" v-show="hrefType!='update'" style="margin-top:1rem;margin-bottom:1rem;">
					<button @click="preservation">临时保存</button>
				</div>
				<div class="resumption-btn-par" v-show="hrefType!='update'">
					<button @click="resumptionSubmit">提交审核</button>
				</div>
				<div class="resumption-btn-par" v-show="hrefType=='update'">
					<button @click="resumptionSubmitRes">提交修改</button>
				</div>
			</div>
		</section>
		<div class="tanChuang" v-show="show">
			<div>
				<p class="title-top1">企业复工后日常防控管理要求</p>
				<p class="title-top1">厂区必须实行封闭式管理；</p>
				<p>●&nbsp;每天早晚检测上下班人员体温，一旦发现发热、咳嗽等异常情况，立即报告、及时处置；</p>
				<p>●&nbsp;做好来访车辆和人员询问、登记，进入本单位工作区域的车辆须停车接受检查，人员须佩戴口罩并接受体温检测，体温超过37.2℃的不得进入；</p>
				<p>●&nbsp;实行食堂推行分时分餐制；</p>
				<p>●&nbsp;减少会议，不召开聚集性的大会；</p>
				<p>●&nbsp;合理安排工作岗位，保持人员距离，减少人员聚集;</p>
				<p>●&nbsp;对要统一乘车上下班的，要降低乘车人员密度，降低感染风险；</p>
				<p>●&nbsp;集体宿舍居住要尽量降低居住密度；</p>
				<p>●&nbsp;定时做好办公场区、食堂、车辆、宿舍全面消毒、卫生保洁。</p>
				<p class="title-top1">组织专人专班排查</p>
				<p>●&nbsp;防护物资准备是否充足 ;</p>
				<p>●&nbsp;复工复产企业在生产过程中是否佩戴口罩，如发现未佩戴口罩者要求立即停工;</p>
				<p>●&nbsp;企业是否按要求每天至少消毒一次;</p>
				<p>●&nbsp;企业是否对员工上下班测量体温。</p>
				<div class="resumption-btn-par">
					<button @click="closeTanChuang">我已阅读</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import axios from "axios";
	export default {
		name: "resumptions",
		data() {
			return {
				// 企业名称
				companyName: "",
				// 统一社会信用代码
				code: "暂无.",
				// 办公地址
				parkAdress: "",
				// 所在园区
				parkName: "",
				// 法定代表人
				legalRepresentative: "",
				// 复工日期
				resumptionTime: "",
				// 复工原因
				resumptionReason: "",
				// 总员工
				allPerson: "",
				// 疫情地区
				adress1: "",
				// 复工人数
				resumptionNumber: "",
				// 疫情地区2
				adress2: "",
				// 准备措施
				resumptionReady: "",
				// 防控物资
				resumptionReadyMaterial: "",
				imgList1: [],
				img1List: [],
				imgList1Value: [],
				imgList2: [],
				img2List: [],
				imgList2Value: [],
				isVisible: false,
				personNumber: 0,
				selectList: [],
				competentUnit: "",
				competentType: "",
				radio1: false,
				list1: [],
				list1Value: 0,
				list2: [],
				list2Value: 0,
				TheMeasureOfArea: "",
				thermometer_number: "",
				disinfectant_number: "",
				disinfection_sites_number: "",
				mask_number: "",
				shenHeTypeValue: 1,
				alcohol: "",
				show: false,
				area_covered: '',
				dustbin_number: "",
				ownerUnit: "",
				parkList: [],
				hrefType: this.$route.query.type,
				dialogImageUrl: '',
				dialogImageUrl2: '',
				dialogVisible: false,
				dateinit: '请输入消毒液数量（升）',
				mask: '请输入口罩数量（个）',
				file1List:[],
				file2List:[],
				file3List:[],
				file4List:[],
				list3:[{id:"",name:"请选择主业单位"}],
			};
		},
		mounted() {
			this.resumptionTime = this.getCurrentDate();
			let user = JSON.parse(localStorage.getItem("CompenyInfo"));
			this.companyName = user.name;
			this.code = user.code;
			const that = this;
			that.loading = that.$toast.loading();
			that.$api.resumptionSelect().then(function(his) {
				switch (his.data.code) {
					case 200:
						that.loading.hide();
						that.list1 = his.data.audit_department
						if (that.list1) {
							that.list1.unshift({
								DEPT_ID: '0',
								DEPT_NAME: '请选择辖区管理单位'
							})
						}
						that.list2 = his.data.industry
						if (that.list2) {
							that.list2.unshift({
								dict_item_id: '0',
								item_name: '请选择复工企业类别'
							})
						}
						break;
					default:
						that.$toast.text(his.data.msg);
						that.loading.hide();
						break;
				}
			});
			that.$api.parkList().then(function(his) {
				switch (his.data.code) {
					case 200:
						that.loading.hide();
						that.parkList = his.data.list
						break;
					default:
						that.$toast.text(his.data.msg);
						that.loading.hide();
						break;
				}
			});
			let oldSession = JSON.parse(localStorage.getItem("preservationInfo"));
			let id = this.$route.query.types
			if (that.hrefType === "update" && id != 2) {
				that.$api.information_record().then(function(his) {
					switch (his.data.code) {
						case 200:
							that.loading.hide();
							let com = his.data.enterprise_info
							let comInfo = his.data.info
							that.parkAdress = com.business_address;
							that.parkName = comInfo.location;
							that.legalRepresentative = com.leal_person;
							that.resumptionTime = comInfo.date;
							that.resumptionReason = comInfo.reason;
							that.allPerson = com.all_number;
							that.adress1 = com.epidemic_number;
							that.resumptionNumber = comInfo.number;
							that.adress2 = comInfo.epidemics_number;
							that.resumptionReady = comInfo.control_methods;
							that.list1Value = comInfo.industry_id;
							that.list2Value = comInfo.audit_department;
							that.thermometer_number = comInfo.thermometer_number;
							that.disinfectant_number = comInfo.disinfectant_number;
							that.disinfection_sites_number = comInfo.disinfection_sites_number;
							that.mask_number = comInfo.mask_number;
							// for (var i = 0; i < that.list2.length; i++) {
							// 	if (that.list2[i].dict_item_id == that.list1Value) {
							// 		that.competentType = that.list2[i].item_name
							// 	}
							// }
							// for (var i = 0; i < that.list1.length; i++) {
							// 	if (that.list1[i].ITEM_CODE == that.list2Value) {
							// 		that.competentUnit = that.list1[i].DEPT_NAME
							// 	}
							// }
							that.shenHeTypeValue = comInfo.audit_department_type;
							that.alcohol = comInfo.alcohol_number;
							that.area_covered = comInfo.area_covered;
							that.dustbin_number = comInfo.dustbin_number;
							if (comInfo.audit_department_type) {
								setTimeout(() => {
									that.$api.resumptionSelect(that.shenHeTypeValue).then(function(his) {
										switch (his.data.code) {
											case 200:
												that.list1 = his.data.audit_department
												break;
											default:
												that.$toast.text(his.data.msg);
												that.loading.hide();
												break;
										}
									});
								}, 500);
							}
							if(that.list2Value){
								setTimeout(() => {
									that.$api.parkList(that.list2Value).then(function(his) {
										switch (his.data.code) {
											case 200:
												that.loading.hide();
												that.list3=his.data.list;
												break;
											default:
												that.$toast.text(his.data.msg);
												that.loading.hide();
												break;
										}
									});
								}, 500);
							}
							that.img1List = comInfo.material_photo.split(",");
							that.file1List = comInfo.programme.split(",");
							that.file2List = comInfo.commencement_self_checking_form.split(",");
							that.file3List = comInfo.three_self_checking_form.split(",");
							that.file4List = comInfo.other_material.split(",");
							break;
						default:
							that.$toast.text(his.data.msg);
							that.loading.hide();
							break;
					}
				});
			}
			if (localStorage.getItem("selectList")) {
				var select = JSON.parse(localStorage.getItem("selectList"));
				for (var i = 0; i < select.length; i++) {
					this.selectList.push({
						"id": select[i].user_id,
						"status": 3
					});
				}
				setTimeout(() => {
					localStorage.removeItem("selectList");
				}, 1000);
			}
			if (localStorage.getItem("oldInfo") && id == 2) {
				let oldInfo = JSON.parse(localStorage.getItem("oldInfo"));
				this.parkAdress = oldInfo.parkAdress;
				this.parkName = oldInfo.parkName;
				this.legalRepresentative = oldInfo.legalRepresentative;
				this.resumptionTime = oldInfo.resumptionTime;
				this.resumptionReason = oldInfo.resumptionReason;
				this.allPerson = oldInfo.allPerson;
				this.adress1 = oldInfo.adress1;
				this.resumptionNumber = oldInfo.resumptionNumber;
				this.adress2 = oldInfo.adress2;
				this.resumptionReady = oldInfo.resumptionReady;
				this.resumptionReadyMaterial = oldInfo.resumptionReadyMaterial;
				this.list1Value = oldInfo.list1Value;
				this.list2Value = oldInfo.list2Value;
				this.thermometer_number = oldInfo.thermometer_number;
				this.disinfectant_number = oldInfo.disinfectant_number;
				this.disinfection_sites_number = oldInfo.disinfection_sites_number;
				this.mask_number = oldInfo.mask_number;
				this.competentUnit = oldInfo.list1Value;
				this.competentType = oldInfo.list2Value;
				this.shenHeTypeValue = oldInfo.shenHeTypeValue;
				this.alcohol = oldInfo.alcohol;
				this.area_covered = oldInfo.area_covered;
				this.dustbin_number = oldInfo.dustbin_number;
				this.img1List = oldInfo.img1List;
				this.file1List = oldInfo.file1List;
				this.file2List = oldInfo.file2List;
				this.file3List = oldInfo.file3List;
				this.file4List = oldInfo.file4List;
				that.loading = that.$toast.loading();
				if (this.shenHeTypeValue) {
					setTimeout(() => {
						that.$api.resumptionSelect(that.shenHeTypeValue).then(function(his) {
							switch (his.data.code) {
								case 200:
									that.loading.hide();
									that.list1 = his.data.audit_department
									break;
								default:
									that.$toast.text(his.data.msg);
									that.loading.hide();
									break;
							}
						});	
					}, 500);	
				}
				if(that.competentType){
					setTimeout(() => {
						that.$api.parkList(that.competentType).then(function(his) {
							switch (his.data.code) {
								case 200:
									that.loading.hide();
									that.list3=his.data.list;
									break;
								default:
									that.$toast.text(his.data.msg);
									that.loading.hide();
									break;
							}
						});
					}, 500);
				}
				// for (var i = 0; i < this.list2.length; i++) {
				// 	if (this.list2[i] == this.list1Value) {
				// 		this.competentType = this.list2[i].item_name
				// 	}
				// }
				// for (var i = 0; i < this.list1.length; i++) {
				// 	if (this.list1[i] == this.list2Value) {
				// 		this.competentUnit = this.list1[i].DEPT_NAME
				// 		console.log(this.list1[i].DEPT_NAME)
				// 	}
				// }
				// for (var i = 0; i < oldInfo.imgList1.length; i++) {
				// 	this.imgList1.push(oldInfo.imgList1[i]);
				// 	this.imgList11.push(oldInfo.imgList1[i].src);
				// }
				// for (var i = 0; i < oldInfo.imgList2.length; i++) {
				// 	this.imgList2.push(oldInfo.imgList2[i]);
				// 	this.imgList22.push(oldInfo.imgList2[i].src);
				// }
			}
			if (oldSession && id == undefined) {
				this.parkAdress = oldSession.parkAdress;
				this.parkName = oldSession.parkName;
				this.legalRepresentative = oldSession.legalRepresentative;
				this.resumptionTime = oldSession.resumptionTime;
				this.resumptionReason = oldSession.resumptionReason;
				this.allPerson = oldSession.allPerson;
				this.adress1 = oldSession.adress1;
				this.resumptionNumber = oldSession.resumptionNumber;
				this.adress2 = oldSession.adress2;
				this.resumptionReady = oldSession.resumptionReady;
				this.resumptionReadyMaterial = oldSession.resumptionReadyMaterial;
				this.list1Value = oldSession.list1Value;
				this.list2Value = oldSession.list2Value;
				this.thermometer_number = oldSession.thermometer_number;
				this.disinfectant_number = oldSession.disinfectant_number;
				this.disinfection_sites_number = oldSession.disinfection_sites_number;
				this.mask_number = oldSession.mask_number;
				this.competentUnit = oldSession.list1Value;
				this.competentType = oldSession.list2Value;
				this.shenHeTypeValue = oldSession.shenHeTypeValue;
				this.alcohol = oldSession.alcohol;
				this.area_covered = oldSession.area_covered;
				this.dustbin_number = oldSession.dustbin_number;
				if (this.shenHeTypeValue) {
					const that = this;
					that.loading = that.$toast.loading();
					setTimeout(() => {
						that.$api.resumptionSelect(that.shenHeTypeValue).then(function(his) {
							switch (his.data.code) {
								case 200:
									that.loading.hide();
									that.list1 = his.data.audit_department
									if (that.list1) {
										that.list1.unshift({
											DEPT_ID: '0',
											DEPT_NAME: '请选择审核部门'
										})
									}
									break;
								default:
									that.$toast.text(his.data.msg);
									that.loading.hide();
									break;
							}
						});
					}, 500);	
				}
				if(that.competentType){
					setTimeout(() => {
						that.$api.parkList(that.competentType).then(function(his) {
							switch (his.data.code) {
								case 200:
									that.loading.hide();
									that.list3=his.data.list;
									break;
								default:
									that.$toast.text(his.data.msg);
									that.loading.hide();
									break;
							}
						});
					}, 500);
				}

				// for (var i = 0; i < oldSession.imgList1.length; i++) {
				// 	this.img1List.push(oldSession.imgList1[i]);
				// }
				this.img1List=oldSession.imgList1
				this.file1List=oldSession.file1List
				this.file2List=oldSession.file2List
				this.file3List=oldSession.file3List
				this.file4List=oldSession.file4List
				// for (var i = 0; i < oldSession.file1List.length; i++) {
				// 	this.file1List.push(oldSession.file1List[i]);
				// }
				// for (var i = 0; i < oldSession.file2List.length; i++) {
				// 	this.file2List.push(oldSession.file2List[i]);
				// }
				// for (var i = 0; i < oldSession.file3List.length; i++) {
				// 	this.file3List.push(oldSession.file3List[i]);
				// }
				// for (var i = 0; i < oldSession.file4List.length; i++) {
				// 	this.file4List.push(oldSession.file4List[i]);
				// }
			}
		},
		watch: {
			area_covered(value) {
				if (value != '') {
					this.dateinit = this.toFixed(value / 1000 * 28, 2)
				}
			},
			resumptionNumber(value) {
				this.mask = this.resumptionNumber * 14
			}
		},
		methods: {
			clickToDelete(index) {
				this.img1List.splice(index, 1)
			},
			clickToDelete2(index) {
				this.file1List.splice(index, 1)
			},
			clickToDelete3(index) {
				this.file2List.splice(index, 1)
			},
			clickToDelete4(index) {
				this.file3List.splice(index, 1)
			},
			clickToDelete5(index) {
				this.file4List.splice(index, 1)
			},
			getBase64(url) {
				that.$api.getBase64().then(function(his) {
					switch (his.data.code) {
						case 200:
							that.loading.hide();
							break;
						default:
							that.$toast.text(his.data.msg);
							that.loading.hide();
							break;
					}
				});
			},
			img(e) { //file点击事件
				const that = this
				const path = event.path || (event.composedPath && event.composedPath());
				var file = path[0].files[0];
				var ajax_url = "http://fgfcapi.cy-coo.com/"
				//判断是否是图片类型
				if (!/image\/\w+/.test(file.type)) {
					alert("只能选择图片");
					return false;
				}
				var reader = new FileReader();
				reader.onload = function(e) {
					that.imgList1.push(reader.result)
					that.loading = that.$toast.loading('上传图片压缩中..');
					axios.post(ajax_url + `/images/upload`, {
						image: reader.result
					}).then(function(res) {
						if (res.data.code == 200) {
							that.loading.hide();
							that.img1List.push(res.data.url);
						} else {
							that.loading.hide();
							that.$toast.text('网络错误,请稍后再试!')
						}
					})
				}
				reader.readAsDataURL(path[0].files[0])
			},
			selectFile1(e) {
				const that = this
				let fileObj = document.getElementById('file1').files[0]
				let formData = new FormData()
				formData.append('file', fileObj)
				let url = 'http://fgfcapi.cy-coo.com/file/upload'
				let xhr = new XMLHttpRequest()
                xhr.onload = function () {
					let fil = JSON.parse(xhr.responseText)
					that.file1List.push(fil.url)
				}
                xhr.onerror = function () {
                    console.log('fail')
                }
                xhr.open('post', url, true)
                xhr.send(formData)
			},
			selectFile2(e) {
				const that = this
				let fileObj = document.getElementById('file2').files[0]
				let formData = new FormData()
				formData.append('file', fileObj)
				let url = 'http://fgfcapi.cy-coo.com/file/upload'
				let xhr = new XMLHttpRequest()
                xhr.onload = function () {
					let fil = JSON.parse(xhr.responseText)
					that.file2List.push(fil.url)
				}
                xhr.onerror = function () {
                    console.log('fail')
                }
                xhr.open('post', url, true)
                xhr.send(formData)
			},
			selectFile3(e) {
				const that = this
				let fileObj = document.getElementById('file3').files[0]
				let formData = new FormData()
				formData.append('file', fileObj)
				let url = 'http://fgfcapi.cy-coo.com/file/upload'
				let xhr = new XMLHttpRequest()
                xhr.onload = function () {
					let fil = JSON.parse(xhr.responseText)
					that.file3List.push(fil.url)
				}
                xhr.onerror = function () {
                    console.log('fail')
                }
                xhr.open('post', url, true)
                xhr.send(formData)
			},
			selectFile4(e) {
				const that = this
				let fileObj = document.getElementById('file4').files[0]
				let formData = new FormData()
				formData.append('file', fileObj)
				let url = 'http://fgfcapi.cy-coo.com/file/upload'
				let xhr = new XMLHttpRequest()
                xhr.onload = function () {
					let fil = JSON.parse(xhr.responseText)
					that.file4List.push(fil.url)
				}
                xhr.onerror = function () {
                    console.log('fail')
                }
                xhr.open('post', url, true)
                xhr.send(formData)
			},
			getBase64(file) {
				return new Promise(function(resolve, reject) {
					let reader = new FileReader();
					let imgResult = "";
					reader.readAsDataURL(file);
					reader.onload = function() {
						imgResult = reader.result;
					};
					reader.onerror = function(error) {
						reject(error);
					};
					reader.onloadend = function() {
						resolve(imgResult);
					};
				});
			},
			closeTanChuang() {
				this.show = false;
			},
			toastMsg() {
				this.show = true;
			},
			// 获取时间
			getCurrentDate() {
				var timeStr = "-";
				var curDate = new Date();
				var curYear = curDate.getFullYear(); //获取完整的年份(4位,1970-????)
				var curMonth = curDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
				var curDay = curDate.getDate(); //获取当前日(1-31)
				var curWeekDay = curDate.getDay(); //获取当前星期X(0-6,0代表星期天)
				var curHour = curDate.getHours(); //获取当前小时数(0-23)
				var curMinute = curDate.getMinutes(); // 获取当前分钟数(0-59)
				var curSec = curDate.getSeconds(); //获取当前秒数(0-59)
				if (curMonth < 10) {
					if (curDay < 10) {
						var Current =
							curYear + timeStr + "0" + curMonth + timeStr + "0" + curDay;
					} else {
						var Current = curYear + timeStr + "0" + curMonth + timeStr + curDay;
					}
				} else if (curDay < 10) {
					var Current = curYear + timeStr + curMonth + timeStr + "0" + curDay;
				} else {
					var Current = curYear + timeStr + curMonth + timeStr + curDay;
				}
				// var Current= curYear+timeStr+curMonth+timeStr+curDay+' '+curHour+':'+curMinute+':'+curSec;
				// this.datetime=Current;
				return Current;
			},
			setChooseValue(value) {
				this.resumptionTime = value[3];
				this.isVisible = false;
			},
			clickToChooseTime(e) {
				e.stopPropagation();
				this.isVisible = true;
			},
			resumptionSubmit() {
				if (this.radio1 == false) {
					this.$toast.text("您尚未进行岗前防疫知识培训,不能提交复工申请!");
					return;
				}
				if (this.competentUnit == "" || this.competentType == "") {
					this.$toast.text("您尚未选择行业或者部门!");
					return;
				}
				if (this.mask_number < this.resumptionNumber * 14) {
					this.$toast.text("您口罩准备不充分!无法提交复工申请!");
					return;
				}
				const that = this;
				that.loading = that.$toast.loading();
				// 调接口
				that.$api
					.construction_information(
						that.companyName,
						that.code,
						that.parkAdress,
						that.parkName,
						that.legalRepresentative,
						that.resumptionTime,
						that.resumptionReason,
						that.allPerson,
						that.adress1,
						that.resumptionNumber,
						that.adress2,
						that.resumptionReady,
						that.resumptionReadyMaterial,
						that.img1List.toString(),
						that.file1List.toString(),
						that.selectList,
						that.competentUnit,
						that.competentType,
						that.thermometer_number,
						that.disinfectant_number,
						that.disinfection_sites_number,
						that.mask_number,
						that.alcohol,
						that.area_covered,
						that.dustbin_number,
						that.file2List.toString(),
						that.file3List.toString(),
						that.file4List.toString(),
					)
					.then(function(his) {
						switch (his.data.code) {
							case 200:
								that.loading.hide();
								localStorage.removeItem('oldInfo')
								// 成功跳转
								that.$router.push("resumptionSuccess");
								break;
							default:
								that.$toast.text(his.data.msg);
								that.loading.hide();
								break;
						}
					});
			},
			resumptionSubmitRes() {
				const that = this;

				if (this.radio1 == false) {
					this.$toast.text("您尚未进行岗前防疫知识培训,不能提交复工申请!");
					return;
				}
				if (this.competentUnit == "" || this.competentType == "") {
					this.$toast.text("您尚未选择行业或者部门!");
					return;
				}
				if (this.mask_number < this.resumptionNumber * 14) {
					this.$toast.text("您口罩准备不充分!无法提交复工申请!");
					return;
				}
				setTimeout(() => {
					that.loading = that.$toast.loading();
					// 调接口
					that.$api
						.editEnterprise(
							that.companyName,
							that.code,
							that.parkAdress,
							that.parkName,
							that.legalRepresentative,
							that.resumptionTime,
							that.resumptionReason,
							that.allPerson,
							that.adress1,
							that.resumptionNumber,
							that.adress2,
							that.resumptionReady,
							that.resumptionReadyMaterial,
							that.img1List.toString(),
							that.file1List.toString(),
							that.selectList,
							that.competentUnit,
							that.competentType,
							that.thermometer_number,
							that.disinfectant_number,
							that.disinfection_sites_number,
							that.mask_number,
							that.alcohol * 1,
							that.area_covered,
							that.dustbin_number,
							that.file2List.toString(),
							that.file3List.toString(),
							that.file4List.toString(),
						)
						.then(function(his) {
							switch (his.data.code) {
								case 200:
									that.loading.hide();
									// 成功跳转
									localStorage.removeItem('oldInfo')
									that.$router.push("resumptionSuccess");
									break;
								default:
									that.$toast.text(his.data.msg);
									that.loading.hide();
									break;
							}
						});
				}, 300)
			},
			clickShowCursor(e) {
				// e.target.previousElementSibling.firstElementChild.style.display =
				// 	"inline-block";
			},
			clickNotShowCursor(e) {
				// e.target.previousElementSibling.firstElementChild.style.display = "none";
			},
			clickSession() {
				let old = {
					parkName: this.parkName,
					legalRepresentative: this.legalRepresentative,
					resumptionTime: this.resumptionTime,
					resumptionReason: this.resumptionReason,
					allPerson: this.allPerson,
					adress1: this.adress1,
					parkAdress: this.parkAdress,
					resumptionNumber: this.resumptionNumber,
					adress2: this.adress2,
					resumptionReady: this.resumptionReady,
					resumptionReadyMaterial: this.resumptionReadyMaterial,
					img1List: this.img1List,
					file1List: this.file1List,
					shenHeTypeValue: this.shenHeTypeValue,
					list1Value: this.list1Value,
					list2Value: this.list2Value,
					thermometer_number: this.thermometer_number,
					disinfectant_number: this.disinfectant_number,
					disinfection_sites_number: this.disinfection_sites_number,
					mask_number: this.mask_number,
					alcohol: this.alcohol,
					area_covered: this.area_covered,
					dustbin_number: this.dustbin_number,
					competentType: this.competentType,
					competentUnit: this.competentUnit,
					file2List: this.file2List,
					file3List: this.file3List,
					file4List: this.file4List,
				};
				localStorage.setItem("oldInfo", JSON.stringify(old));
				this.$router.push({
					path: "resumptionAddPerson",
					query: {
						'ts': this.hrefType
					}
				});
			},
			selectCompetentUnit(e) {
				this.competentUnit = e.target.value;
				this.list1Value = e.target.value;
			},
			selectCompetentType(e) {
				const that = this;
				this.competentType = e.target.value;
				this.list2Value = e.target.value;
				that.$api.parkList(this.list2Value).then(function(his) {
					switch (his.data.code) {
						case 200:
							that.loading.hide();
							that.list3=his.data.list;
							that.list3.unshift({
								id:"",
								name:"请选择主业单位"
							})
							break;
						default:
							that.$toast.text(his.data.msg);
							that.loading.hide();
							break;
					}
				});
			},
			selectCompetentAdress(e){
				this.competentAdress = e.target.value;
				this.parkName = e.target.value;
			},
			shenHeType(e) {
				this.shenHeTypeValue = e.target.value;
				const that = this;
				that.loading = that.$toast.loading();
				that.$api.resumptionSelect(that.shenHeTypeValue).then(function(his) {
					switch (his.data.code) {
						case 200:
							that.loading.hide();
							that.list1 = his.data.audit_department
							if (that.list1) {
								that.list1.unshift({
									DEPT_ID: '0',
									DEPT_NAME: '请选择审核部门'
								})
							}
							that.list3=[]
							that.parkName=[]
							that.list2Value=[]
							break;
						default:
							that.$toast.text(his.data.msg);
							that.loading.hide();
							break;
					}
				});
			},
			preservation() {
				// 储存信息至localStorage
				const that = this;
				localStorage.setItem("preservationInfo", JSON.stringify({
					"parkAdress": that.parkAdress,
					"parkName": that.parkName,
					"legalRepresentative": that.legalRepresentative,
					"resumptionTime": that.resumptionTime,
					"resumptionReason": that.resumptionReason,
					"allPerson": that.allPerson,
					"adress1": that.adress1,
					"resumptionNumber": that.resumptionNumber,
					"adress2": that.adress2,
					"resumptionReady": that.resumptionReady,
					"resumptionReadyMaterial": that.resumptionReadyMaterial,
					"imgList1": that.img1List,
					"file1List": that.file1List,
					"list1Value": that.list1Value,
					"list2Value": that.list2Value,
					"selectList": that.selectList,
					"competentUnit": that.competentUnit,
					"competentType": that.competentType,
					"thermometer_number": that.thermometer_number,
					"disinfectant_number": that.disinfectant_number,
					"disinfection_sites_number": that.disinfection_sites_number,
					"mask_number": that.mask_number,
					"shenHeTypeValue": that.shenHeTypeValue,
					"list1Value": that.list1Value,
					"list2Value": that.list2Value,
					"alcohol": that.alcohol,
					"area_covered": that.area_covered,
					"dustbin_number": that.dustbin_number,
					"file2List": that.file2List,
					"file3List": that.file3List,
					"file4List": that.file4List,
				}))
				this.$toast.text("临时保存成功!");
			},
			toFixed(num, decimal) {
				if (isNaN(num)) {
					return 0;
				}
				num = num - 0;
				var p1 = Math.pow(10, decimal + 1);
				var p2 = Math.pow(10, decimal);
				return (Math.round(num * p1 / 10) / p2).toFixed(decimal); //思考一下，为什么要除10？
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../assets/skin/css/tijiao.scss";
	@import "../assets/skin/css/jquery-labelauty.scss";
	@import "../assets/skin/css/resumption.scss";

	* {
		font-size: 13px !important;
	}

	select,
	option {
		direction: rtl
	}

	select {
		position: relative;
		padding-right: 10px;
		/*将默认的select选择框样式清除*/
		appearance: none;
		-moz-appearance: none;
		-webkit-appearance: none;
	}

	/*IE浏览器隐藏下拉箭头*/
	select::-ms-expand {
		display: none;
	}

	.select {
		position: relative;
	}

	.select:after {
		content: '';
		position: absolute;
		display: block;
		right: 9px;
		top: 15px;
		height: 5px;
		width: 5px;
		border: 2px solid #007AFF;
		border-right: none;
		border-bottom: none;
		transform: rotateZ(-135deg);
	}

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
<style>
	.nut-imagepicker .img-list .img-item {
		margin: 0 !important;
		width: calc(100% / 3) !important;
	}

	.nut-imagepicker .img-list .img-item a img,
	.nut-imagepicker .img-list .add-icon {
		width: 100px !important;
		height: 100px !important;
	}

	.nut-imagepicker .img-list {
		width: 100%;
	}

	.nut-imagepicker .img-list>span {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.cursor-blink {
		display: inline-block;
		width: 1px;
		height: 1rem;
		transform: translateY(2px);
		animation: blink 1s infinite steps(1, start);
	}

	/*这里设置动画blink*/
	@keyframes blink {

		0%,
		100% {
			background-color: #000;
			color: #aaa;
		}

		50% {
			background-color: #bbb;
			/* not #aaa because it's seem there is Google Chrome bug */
			color: #000;
		}
	}

	.person-par {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.person-par div {
		margin-right: 1rem;
		width: 2rem;
		height: 2rem;
		border-radius: 2rem;
		background: #999;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.person-par img {
		width: 100%;
		height: 100%;
		flex-shrink: 0;
	}

	.person-par>span:nth-child(2) {
		margin-right: 1rem;
	}

	.person-par+.person-par {
		margin-top: 0.5rem;
	}

	.redio-par .nut-checkbox-label {
		color: #0b56e0 !important;
	}

	.tanChuang {
		position: absolute;
		z-index: 99;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.tanChuang div {
		width: 80%;
		height: 80%;
		background: #fff;
		overflow-y: scroll;
		border-radius: 1rem;
		padding: 1rem;
	}

	.tanChuang p {
		font-size: 14px;
		text-indent: 1em;
		line-height: 1.3rem;
	}

	.tanChuang .title-top1 {
		text-align: center;
		text-indent: 0;
		font-weight: bold;
		font-size: 15px;
		line-height: 1.6rem;
	}

	.tanChuang .resumption-btn-par {
		margin: 0;
		padding: 0;
		height: auto;
		margin-top: 1rem;
	}

	.elUpload {
		display: flex;
		flex-direction: column;
	}

	.elUpload ul {
		display: flex !important;
		flex-wrap: wrap;
	}

	.elUpload ul li {
		width: 50% !important;
		height: auto !important;
		margin: 0 !important;
		display: flex !important;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		border: 0 !important;
	}

	.elUpload ul li:nth-child(n+3) {
		margin-top: 0.25rem !important;
	}

	.elUpload ul li .el-upload-list__item-status-label {
		display: none !important;
	}

	.elUpload ul li img {
		width: 10rem !important;
		height: 10rem !important;
	}

	.elUpload .el-upload--picture-card {
		margin: 0.5rem 0 0 0.75rem;
	}

	.img-par-rester {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.las-img-par {
		position: relative;
		width: 100px !important;
		height: 100px;
		border: 1px dashed #999;
		border-radius: 0.5rem;
		padding: 0 !important;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 1rem 0 !important;
	}

	.las-img-par input {
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 0;
	}

	#txt_ide {
		text-align: right;
		border: none;
	}

	label {
		padding-left: 10px;
	}

	.resumption-sec-td {
		display: flex !important;
		transform: none !important;
		padding-right: 10px !important;
	}

	.resumption-start {
		display: flex;
		flex-shrink: 0 !important;
		font-size: ;
		transform: none !important;
	}

	.resumption-start:before {
		content: none !important;
	}
</style>
