import axios from "axios";
const apiUrl = "http://fgfcapi.cy-coo.com";
// const apiUrl = "http://www.zjcoo.cn:90";
// const apiUrl = "http://192.168.3.169:100";
const apiUrl1 = "http://122.112.206.233:8081";
const fun = {
	//登录
	login(phone, code) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/user/code/login", {
					mobile: phone,
					code: code
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//企业登录
	loginForenterprise(phone, code) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/code/login", {
					mobile: phone,
					mobile_code: code
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//获取用户信息
	getUserInfo() {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/user/info", {
					token: localStorage.getItem("token")
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//获取企业信息
	getEnterpriseInfo() {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/info", {
					token: localStorage.getItem("token")
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//个人注册
	regForuser(
		name,
		id_card,
		phone,
		code,
		area1,
		area2,
		area3,
		area4,
		detail_address
	) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/user/register", {
					real_name: name,
					id_card: id_card,
					mobile: phone,
					code: code,
					area_leval1: area1,
					area_leval2: area2,
					area_leval3: area3,
					area_leval4: area4,
					detail_address: detail_address,
					//目前暂时传输死数据
					password: "password",
					repeat_password: "password"
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//企业注册
	regForenterprise(
		name,
		institutionCode,
		phone,
		code,
		submitEnterprise,
		area1,
		area2,
		area3,
		area4,
		password,
		repassword,
		parkId
	) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/register", {
					name: name,
					code: institutionCode,
					mobile: phone,
					mobile_code: code,
					type: submitEnterprise,
					area_leval1: area1,
					area_leval2: area2,
					area_leval3: area3,
					area_leval4: area4,
					//目前暂时传输死数据
					password: password,
					repassword: repassword,
					affiliated_park: parkId
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//发送验证码
	sendMessage(phone) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/message/send", {
					phone: phone
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//地区查询
	selectArea(level, area_code) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/area/select", {
					level: level,
					area_code: area_code
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//图片上传(单图/多图)
	uploadImage(arr) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/images/upload", {
					image: arr
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//图片上传(单图/多图)
	uploadFile(formData) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/file/upload", {
					file: formData
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},

	//线索举报提交
	informSubmit(
		type,
		whistleblower,
		address_code,
		detail_address,
		explain,
		evidence,
		report_type
	) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/clue/report/add", {
					token: localStorage.getItem("token"),
					type: type,
					whistleblower: whistleblower,
					address_code: address_code,
					detail_address: detail_address,
					explain: explain,
					evidence: evidence,
					report_type: report_type
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//我的线索举报
	myinform() {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/clue/report/list", {
					token: localStorage.getItem("token")
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//举报详情
	informdetail(id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/clue/report/detail", {
					token: localStorage.getItem("token"),
					id: id
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//健康状况上报
	health_report(
		type,
		temperature,
		reporter_name,
		mobile,
		reporter_id_card,
		is_discomfort,
		symptom_days,
		symptom,
		is_other_symptom,
		is_hospitalization,
		other_symptom,
		isiting_process,
		medical_materials,
		is_contact,
		contact_explain,
		is_outbreak,
		explain,
		contact_crowd
	) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/personal/health_report", {
					// 'token': localStorage.getItem('token'),
					token: localStorage.getItem("token"),
					type: type,
					temperature: temperature,
					reporter_name: reporter_name,
					mobile: mobile,
					reporter_id_card: reporter_id_card,
					is_discomfort: is_discomfort,
					symptom_days: symptom_days,
					symptom: symptom,
					is_other_symptom: is_other_symptom,
					is_hospitalization: is_hospitalization,
					other_symptom: other_symptom,
					isiting_process: isiting_process,
					medical_materials: medical_materials,
					is_contact: is_contact,
					contact_explain: contact_explain,
					is_outbreak: is_outbreak,
					explain: explain,
					contact_crowd: contact_crowd
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//健康状况记录
	health_report_record() {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/personal/health_report_record", {
					token: localStorage.getItem("token")
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//个人行为轨迹上传
	action_track(
		reporter_name,
		reporter_address,
		type,
		mobile,
		is_outside,
		outside,
		inside,
		target,
		contact_person,
		remarks,
		reporter_id_card
	) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/personal/action_track", {
					token: localStorage.getItem("token"),
					reporter_name: reporter_name,
					reporter_address: reporter_address,
					type: type,
					mobile: mobile,
					is_outside: is_outside,
					outside: outside,
					inside: inside,
					target: target,
					contact_person: contact_person,
					remarks: remarks,
					reporter_id_card: reporter_id_card
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//个人行为轨迹记录
	action_track_record() {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/personal/action_track_record", {
					token: localStorage.getItem("token")
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//关联企业
	related_company(enterprise_id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/personal/related_company", {
					enterprise_id: enterprise_id,
					token: localStorage.getItem("token")
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//个人中心关联列表
	related_company_list() {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/personal/related_company_list", {
					token: localStorage.getItem("token")
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	// 企业开工信息上报
	construction_information(
		name,
		code,
		business_address,
		location,
		leal_person,
		date,
		reason,
		all_number,
		epidemic_number,
		number,
		epidemics_number,
		control_methods,
		control_material,
		material_photo,
		programme,
		list,
		competentUnit,
		competentType,
		thermometer_number,
		disinfectant_number,
		disinfection_sites_number,
		mask_number,
		alcohol_number,
		area_covered,
		dustbin_number,
		commencement_self_checking_form,
		three_self_checking_form,
		other_material,
	) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/construction_information", {
					token: localStorage.getItem("token"),
					name: name,
					code: code,
					business_address: business_address,
					location: location,
					leal_person: leal_person,
					date: date,
					reason: reason,
					all_number: all_number,
					epidemic_number: epidemic_number,
					number: number,
					epidemics_number: epidemics_number,
					control_methods: control_methods,
					control_material: control_material,
					material_photo: material_photo,
					programme: programme,
					user_list: list,
					status: 1,
					industry_id: competentUnit,
					audit_department: competentType,
					thermometer_number: thermometer_number,
					disinfectant_number: disinfectant_number,
					disinfection_sites_number: disinfection_sites_number,
					mask_number: mask_number,
					alcohol_number: alcohol_number,
					area_covered: area_covered,
					dustbin_number: dustbin_number,
					commencement_self_checking_form:commencement_self_checking_form,
					three_self_checking_form:three_self_checking_form,
					other_material:other_material,
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	// 企业开工信息记录
	information_record(enterprise_id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/information_record", {
					token: localStorage.getItem("token"),
					enterprise_id: enterprise_id
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	// 企业健康上报
	health_report_enterprise(
		work_number,
		abnormal_number,
		abnormal_list,
		close_contact,
		close_list,
		statisticians,
		mobile,
		auditor,
		troubleshooting,
		enterprise_id,
		anomaly,
		contact_describe,
		more_remark
	) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/health_report", {
					token: localStorage.getItem("token"),
					work_number: work_number,
					abnormal_number: abnormal_number,
					abnormal_list: abnormal_list,
					close_contact: close_contact,
					close_list: close_list,
					statisticians: statisticians,
					mobile: mobile,
					auditor: auditor,
					troubleshooting: troubleshooting,
					enterprise_id: enterprise_id,
					anomaly: anomaly,
					contact_describe: contact_describe,
					more_remark: more_remark
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	// 企业健康记录
	health_report_record_enterprise(enterprise_id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/health_report_record", {
					enterprise_id: enterprise_id,
					token: localStorage.getItem("token")
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//企业消毒防护执行上报
	disinfection(task_description, position, name, imgMsg1, explain, imgMsg2) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/disinfection", {
					token: localStorage.getItem("token"),
					name: name,
					position: position,
					explain: explain,
					task_description: task_description,
					protective_picture: imgMsg2,
					site_photo: imgMsg1
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//企业消毒防护执行列表
	disinfection_record(protect_id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/disinfection_record", {
					token: localStorage.getItem("token"),
					protect_id: protect_id
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//首页问答列表
	indexQA(page, type_id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/msg/msg_list", {
					token: localStorage.getItem("token"),
					page: page,
					type_id: type_id
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//首页问答列表
	QADetail(id, type_id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/msg/msg_detail", {
					id: id,
					type_id: type_id
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//联防联控登录
	Plogin(mobile, pwd) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/prevention/login", {
					mobile: mobile,
					password: pwd
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//联防联控任务创建
	taskAdd(address, explain, start_time, end_time) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/prevention/task/add", {
					token: localStorage.getItem("Ptoken"),
					address: address,
					t_explain: explain,
					start_time: start_time,
					end_time: end_time
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//联防联控任务开始按钮
	taskStart(id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/prevention/task/conduct", {
					token: localStorage.getItem("Ptoken"),
					id: id
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//联防联控任务取消按钮
	taskEnd(id, cancel_explain) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/prevention/task/cancel", {
					token: localStorage.getItem("Ptoken"),
					id: id,
					cancel_explain: cancel_explain
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//联防联控完成任务
	taskReport(id, is_abnormal, abnormal_explain, result, obtain_evidence) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/prevention/task/report", {
					token: localStorage.getItem("Ptoken"),

					id: id,
					is_abnormal: is_abnormal,
					abnormal_explain: abnormal_explain,
					result: result,
					obtain_evidence: obtain_evidence
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//联防联控并请上报
	caseAdd(
		name,
		id_card,
		guardian,
		mobile,
		habitation,
		case_type,
		temperature,
		symptom,
		is_treat,
		treat_image,
		is_contact,
		contact_explain,
		is_go_hubei,
		go_hubei_explain,
		is_see_patient,
		patient_relation,
		contact_time,
		contact_address,
		is_situation,
		situation_explain,
		remarks
	) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/prevention/case/add", {
					token: localStorage.getItem("Ptoken"),
					name: name,
					certificate_no: id_card,
					guardian_name: guardian,
					phone: mobile,
					address: habitation,
					patient_type: case_type,
					today_temperature: temperature,
					main_symptom: symptom,
					is_hospitalized: is_treat,
					photo: treat_image,
					is_contact: is_contact,
					contact_desc: contact_explain,
					is_retention: is_go_hubei,
					retention_desc: go_hubei_explain,
					is_patient: is_see_patient,
					patient_relation: patient_relation,
					patient_time: contact_time,
					patient_address: contact_address,
					is_appear_plague: is_situation,
					plague_desc: situation_explain,
					report_desc: remarks
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//病例上报列表
	caseList() {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/prevention/case/list", {
					token: localStorage.getItem("Ptoken")
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//病例上报详情
	caseDetail(id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/prevention/case/detail", {
					token: localStorage.getItem("Ptoken"),
					id: id
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//病例上报详情
	caseDel(id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/prevention/case/del", {
					token: localStorage.getItem("Ptoken"),
					id: id
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//联防联保详情
	taskListDetails(id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/prevention/task/detail", {
					token: localStorage.getItem("Ptoken"),
					id: id
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//联防联保详情
	taskAllList() {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/prevention/task/all", {
					token: localStorage.getItem("Ptoken")
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//联防联保我的任务列表
	taskList() {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/prevention/task/list", {
					token: localStorage.getItem("Ptoken")
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//联防联控并请上报
	caseAdd(
		name,
		id_card,
		guardian,
		mobile,
		habitation,
		case_type,
		temperature,
		symptom,
		is_treat,
		treat_image,
		is_contact,
		contact_explain,
		is_go_hubei,
		go_hubei_explain,
		is_see_patient,
		patient_relation,
		contact_time,
		contact_address,
		is_situation,
		situation_explain,
		remarks
	) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/prevention/case/add", {
					token: localStorage.getItem("Ptoken"),
					name: name,
					certificate_no: id_card,
					guardian_name: guardian,
					phone: mobile,
					address: habitation,
					patient_type: case_type,
					today_temperature: temperature,
					main_symptom: symptom,
					is_hospitalized: is_treat,
					photo: treat_image,
					is_contact: is_contact,
					contact_desc: contact_explain,
					is_retention: is_go_hubei,
					retention_desc: go_hubei_explain,
					is_patient: is_see_patient,
					patient_relation: patient_relation,
					patient_time: contact_time,
					patient_address: contact_address,
					is_appear_plague: is_situation,
					plague_desc: situation_explain,
					report_desc: remarks
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//病例上报列表
	caseList() {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/prevention/case/list", {
					token: localStorage.getItem("Ptoken")
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//病例上报详情
	caseDetail(id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/prevention/case/detail", {
					token: localStorage.getItem("Ptoken"),
					id: id
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//病例上报详情
	caseDel(id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/prevention/case/del", {
					token: localStorage.getItem("Ptoken"),
					id: id
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//病例上报详情
	fangkongInfo() {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/prevention/user/info", {
					token: localStorage.getItem("Ptoken")
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//物资征集
	UGsolicitation(
		goods_name,
		goods_ext,
		goods_specifications,
		unit,
		number,
		pattern,
		price,
		explain,
		address,
		send_way,
		begin_date
	) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/user/goods/solicitation", {
					token: localStorage.getItem("token"),
					goods_name: goods_name,
					goods_ext: goods_ext,
					goods_specifications: goods_specifications,
					unit: unit,
					number: number,
					pattern: pattern,
					price: price,
					explain: explain,
					address: address,
					send_way: send_way,
					begin_date: begin_date
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//物资发放
	UGsend(number, address, date, reason, explain, goods_id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/user/goods/send", {
					token: localStorage.getItem("token"),
					number: number,
					address: address,
					date: date,
					reason: reason,
					explain: explain,
					goods_id: goods_id
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//需求发布
	UGdemand(
		send_way,
		address,
		deadline,
		// goods_name,
		// goods_specifications,
		// unit,
		// number,
		is_donation,
		// price,
		// explain
		goods_list
	) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/user/goods/demand", {
					token: localStorage.getItem("token"),
					send_way: send_way,
					address: address,
					deadline: deadline,
					is_donation: is_donation,
					goods_list
					// goods_name: goods_name,
					// goods_specifications: goods_specifications,
					// unit: unit,
					// number: number,
					// price: price,
					// explain: explain
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//个人征集列表
	USlist() {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/user/solicitation/list", {
					token: localStorage.getItem("token")
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//申请发放列表
	U_Sendlist() {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/user/send/list", {
					token: localStorage.getItem("token")
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//申请发放详情
	U_Senddetail(id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/user/send/detail", {
					token: localStorage.getItem("token"),
					id: id
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//物资征集详情
	USdetail(id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/user/send/detail", {
					token: localStorage.getItem("token"),
					id: id
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//征集
	EGsolicitation(
		goods_name,
		goods_ext,
		goods_specifications,
		unit,
		number,
		pattern,
		price,
		explain,
		address,
		send_way,
		begin_date,
		enterprise_type,
		enterprise_address,
		contacts,
		contact_mobile
	) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/goods/solicitation", {
					token: localStorage.getItem("token"),
					goods_name: goods_name,
					goods_ext: goods_ext,
					goods_specifications: goods_specifications,
					unit: unit,
					number: number,
					pattern: pattern,
					price: price,
					explain: explain,
					address: address,
					send_way: send_way,
					begin_date: begin_date,
					enterprise_type: enterprise_type,
					enterprise_address: enterprise_address,
					contacts: contacts,
					contact_mobile: contact_mobile
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//发放
	EGsend(
		enterprise_type,
		enterprise_address,
		contacts,
		contact_mobile,
		number,
		address,
		date,
		reason,
		explain,
		goods_id
	) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/goods/send", {
					enterprise_type: enterprise_type,
					token: localStorage.getItem("token"),
					enterprise_address: enterprise_address,
					contacts: contacts,
					contact_mobile: contact_mobile,
					number: number,
					address: address,
					date: date,
					reason: reason,
					explain: explain,
					goods_id: goods_id
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//需求发布
	EGdemand(
		enterprise_type,
		enterprise_address,
		contacts,
		contact_mobile,
		send_way,
		address,
		deadline,
		goods_list
	) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/goods/demand", {
					enterprise_type: enterprise_type,
					enterprise_address: enterprise_address,
					contacts: contacts,
					contact_mobile: contact_mobile,
					send_way: send_way,
					address: address,
					deadline: deadline,
					goods_list,
					token: localStorage.getItem("token")
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//企业的征集列表
	ES_list() {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/solicitation/list", {
					token: localStorage.getItem("token")
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//征集详情
	ES_detail(id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/solicitation/list", {
					token: localStorage.getItem("token"),
					id: id
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//申请列表
	E_send_list() {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/send/list", {
					token: localStorage.getItem("token")
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//申请详情
	E_send_detail(id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/send/list", {
					token: localStorage.getItem("token"),
					id: id
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//物资列表
	G_list(page) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/send/list", {
					page: page
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//需求列表
	G_demand(page) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/goods/demand", {
					token: localStorage.getItem("token"),
					page: page
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	// 居民上报
	residentSubmit_add(enterprise_id, temperature, matter, in_or_out) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/registration/add", {
					token: localStorage.getItem("token"),
					enterprise_id: enterprise_id,
					temperature: temperature,
					matter: matter,
					in_or_out: in_or_out
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	// 个人获取企业信息
	person_company_list() {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/personal/company_list", {
					token: localStorage.getItem("token")
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	// 居民上报列表
	resident_list(page) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/registration/list", {
					token: localStorage.getItem("token"),
					page: page
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	resident_listCompeny(page) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/registration/list", {
					token: localStorage.getItem("token"),
					page: page
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	// 居民上报详情
	resident_detail(id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/registration/detail", {
					token: localStorage.getItem("token"),
					id: id
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	// 居民上报详情
	resident_detailCompeny(id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/registration/detail", {
					token: localStorage.getItem("token"),
					id: id
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	// 企业健康列表
	health_report_list(time) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/health_report_list", {
					token: localStorage.getItem("token"),
					date: time
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	// 企业健康详情
	health_report_detal(id, time) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/health_report_detal", {
					token: localStorage.getItem("token"),
					id: id,
					date: time
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	// 企业轨迹列表
	action_track_list(time) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/action_track_list", {
					token: localStorage.getItem("token"),
					date: time
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	// 企业轨迹列表
	action_track_detal(id, time) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/action_track_detal", {
					token: localStorage.getItem("token"),
					user_id: id,
					date: time
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//员工列表
	enterpriseUserList(page) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/user/list", {
					token: localStorage.getItem("token"),
					page: page
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//员工个人信息
	enterpriseUserInfo(id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/user/detail", {
					token: localStorage.getItem("token"),
					user_id: id
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//企业所有员工信息
	enterpriseList() {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/all/user/list", {
					token: localStorage.getItem("token")
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//
	hospitalRegistration(
		tiwen,
		phone,
		name,
		idCode,
		reason,
		isHeat,
		symptom,
		lvyou,
		huanzhe,
		jiechushi,
		bingren,
		shequ,
		id
	) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/hospital/registration", {
					temperature: tiwen,
					mobile: phone,
					user_name: name,
					id_card: idCode,
					type: reason,
					is_hot: isHeat,
					symptom: symptom,
					is_live: lvyou,
					is_contact: huanzhe,
					is_contact_patient: jiechushi,
					is_contact_hot: bingren,
					is_collective_disease: shequ,
					enterprise_id: id
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	hospitalInfo(id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/hospital/info", {
					enterprise_id: id
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	hospitalRegistrationList(find, page) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/hospital/registration/list", {
					token: localStorage.getItem("token"),
					find: find,
					page: page
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	hospitalRegistrationDetails(id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/hospital/registration/detail", {
					token: localStorage.getItem("token"),
					id: id
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	hospitalRegistrationEdit(wendu, id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/hospital/registration/edit", {
					token: localStorage.getItem("token"),
					id: id,
					temperature: wendu
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	getEmployeePassResult(companyId) {
		//获取上班打卡结果 个人扫企业
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/clock/info", {
					token: localStorage.getItem("token"),
					enterprise_id: companyId
				})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	//公司扫个人，获取信息
	getUserInfoPassResult(user_id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/user/info", {
					token: localStorage.getItem("token"),
					user_id
				})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	getEmployeePassRecord() {
		//公司获取上班打卡记录
		return new Promise((resolve, reject) => {
			axios
				.post(
					apiUrl +
					"/enterprise/clock/list"
					 // + `?/token=${localStorage.getItem("token")}`
					 , {
						token: localStorage.getItem("token")
					}
				)
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	getFilterPassRecord(date) {
		return new Promise((resolve, reject) => {
			axios
				.post(
					apiUrl +
					"/enterprise/clock/list" +
					`?/token=${localStorage.getItem("token")}`, {
						token: localStorage.getItem("token"),
						date
					}
				)
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	getVisitorRecord() {
		//公司获取来访登录记录
	},
	getLinkCompany(enterprise_id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/personal/related_company", {
					token: localStorage.getItem("token"),
					enterprise_id
				})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	// 获取地址
	// getLocation(lat,lng){
	//   return new Promise((resolve,reject)=>{
	//     axios.get('/api/?location='+lat+','+ lng+'&key='+'V52BZ-VJI63-LE53M-3BIFU-N5LW5-LMBYD ').then(res=>{
	//       resolve(res)
	//     }).catch(err=>{
	//       reject(err)
	//     })
	//   })
	// },
	postEmployeeCard(
		id,
		is_normal
	) {
		//提交打卡登记
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/clock/add", {
					token: localStorage.getItem("token"),
					id:id,
					is_normal:is_normal,
				})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	qiyedakaInfo(id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/user/info", {
					token: localStorage.getItem("token"),
					user_id: id
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	postCompanyAdd(id,is_normal,is_pass) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/clock/add", {
					token: localStorage.getItem("token"),
					id:id,
					is_normal:is_pass,
					is_pass:is_pass,
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	qiyedakaAdd(id, temperature, action_explain, is_pass) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/clock/add", {
					token: localStorage.getItem("token"),
					user_id: id,
					temperature: temperature,
					action_explain: action_explain,
					is_pass: is_pass
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	passwordLogin(mobile, password) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/Login", {
					token: localStorage.getItem("token"),
					mobile: mobile,
					password: password
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	enterpriseCompenyList(page, find) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/list", {
					token: localStorage.getItem("token"),
					page: page,
					find: find
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//调用疫情数据
	getPneumoniaIinfo() {
		return new Promise((resolve, reject) => {
			axios
				.get(apiUrl1 + "/pneumonia/info")
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//调用企业的更多数据
	getCompanyMore() {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/base/info", {
					token: localStorage.getItem("token")
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
		
	},
	resumptionSelect(type) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/resumption/select", {
					token: localStorage.getItem("token"),
					type: type
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	getConfig() {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/web_config/list")
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	resumptionSelect(type) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/resumption/select", {
					token: localStorage.getItem("token"),
					type: type
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//   追加列表
	notResumeWork() {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/not/resume/work", {
					token: localStorage.getItem("token")
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//   追加人员
	appendNumber(list,disinfectant_number,mask_number,alcohol_number) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/append/number", {
					token: localStorage.getItem("token"),
					user_list: list,
					disinfectant_number:disinfectant_number,
					mask_number:mask_number,
					alcohol_number:alcohol_number,
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//   开工和审核失败
	resumeWork() {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/resume/work", {
					token: localStorage.getItem("token")
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//   开工和审核失败
	parkList(code) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/park/list", {
					code:code
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//   开工和审核失败
	userDaka(time) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/clock/list", {
					token: localStorage.getItem("token"),
					date: time
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	cancel_follow(enterprise_id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/cancel/follow", {
					token: localStorage.getItem("token"),
					enterprise_id: enterprise_id
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	userBaseInfo() {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/user/base/info", {
					token: localStorage.getItem("token")
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//    全部员工列表
	allStaffList(page) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/commencement/user/list", {
					token: localStorage.getItem("token"),
					page: page
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//    修改复工上报
	editEnterprise(
		name,
		code,
		business_address,
		location,
		leal_person,
		date,
		reason,
		all_number,
		epidemic_number,
		number,
		epidemics_number,
		control_methods,
		control_material,
		material_photo,
		programme,
		list,
		competentUnit,
		competentType,
		thermometer_number,
		disinfectant_number,
		disinfection_sites_number,
		mask_number,
		alcohol_number,
		area_covered,
		dustbin_number
	) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/commencement/edit", {
					token: localStorage.getItem("token"),
					name: name,
					code: code,
					business_address: business_address,
					location: location,
					leal_person: leal_person,
					date: date,
					reason: reason,
					all_number: all_number,
					epidemic_number: epidemic_number,
					number: number,
					epidemics_number: epidemics_number,
					control_methods: control_methods,
					control_material: control_material,
					material_photo: material_photo,
					programme: programme,
					user_list: list,
					status: 1,
					industry_id: competentUnit,
					audit_department: competentType,
					thermometer_number: thermometer_number,
					disinfectant_number: disinfectant_number,
					disinfection_sites_number: disinfection_sites_number,
					mask_number: mask_number,
					alcohol_number: alcohol_number,
					area_covered: area_covered,
					dustbin_number: dustbin_number
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	// 网络图片转base64
	getBase64(img) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/images/to/base64", {
					token: localStorage.getItem("token"),
					image: img
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	// 是否出重庆
	getUserStatus(phone) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/get/user/status", {
					phoneNum: phone
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	//修改密码
	updateUserPwd(password, repassword, mobile_code) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/edit/password", {
					token: localStorage.getItem("token"),
					password: password,
					repassword: repassword,
					mobile_code: mobile_code
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},
	// 调用实时播报
	// axios.get('http://api.tianapi.com/txapi/ncov/index?key=bae059380a874dde49a104154627446a').then(function(response) {
	// 	that.RealNews = response.data.newslist[0].news
	// })
	// .catch(function(error) {
	// 	console.log(error);
	// });

	//查看外来人员名单
	getOutSideList() {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/temporary/card/list", {
					token: localStorage.getItem("token")
				})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	//审核临时通行证
	setAuditTemporaryCard(is_pass, id, audit_remarks) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/temporary/card/audit", {
					token: localStorage.getItem("token"),
					is_pass,
					id,
					audit_remarks
				})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	// 临时卡申请可以申请的公司列表
	cardEnterpriseList() {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/temporary/card/enterprise/list", {
					token: localStorage.getItem("token"),
				})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	//申请临时卡
	TemporaryCardAdd(
		enterprise_id,
		start_date,
		end_date,
		visit_reason,
		letter_of_commitment,
		trajectory
	) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/temporary/card/add", {
					token: localStorage.getItem("token"),
					enterprise_id:enterprise_id,
					start_date:start_date,
					end_date:end_date,
					visit_reason:visit_reason,
					letter_of_commitment:letter_of_commitment,
					trajectory:trajectory
				})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	// 临时卡申请可以申请的公司列表
	TemporaryCardList() {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/temporary/card/list", {
					token: localStorage.getItem("token"),
				})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	// 材料证明上传接口
	CommencementDataUpload(
		id_card_front,
		id_card_back,
		trajectory_proof_picture,
		quarantine_picture,
		detection_result
	) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/commencement/data/upload", {
					token: localStorage.getItem("token"),
					id_card_front:id_card_front,
					id_card_back:id_card_back,
					trajectory_proof_picture:trajectory_proof_picture,
					quarantine_picture:quarantine_picture,
					detection_result:detection_result
				})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	// 材料证明详情
	CommencementDataInfo() {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/commencement/data/info", {
					token: localStorage.getItem("token"),
				})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	// 材料证明详情
	ECommencementDataInfo(id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/user/commencement/data/info", {
					token: localStorage.getItem("token"),
					user_id:id
				})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	cancelFollow(id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/cancel/follow", {
					token: localStorage.getItem("token"),
					user_id:id
				})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	recruitSubmit(welfare,requirement,jobInformation,id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/recruit/submit", {
					token: localStorage.getItem("token"),
					welfare:welfare,
					requirement:requirement,
					post_list:jobInformation,
					id:id
				})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	recruitPreserve(welfare,requirement,jobInformation,id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/recruit/preserve", {
					token: localStorage.getItem("token"),
					welfare:welfare,
					requirement:requirement,
					post_list:jobInformation,
					id:id
				})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	recruitList() {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/recruit/list", {
					token: localStorage.getItem("token"),
				})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	recruitDelete(id) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/enterprise/recruit/delete", {
					token: localStorage.getItem("token"),
					id:id
				})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	updateUserinfo(real_name,sex,id_card,detail_address) {
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl + "/edit/user/info", {
					token: localStorage.getItem("token"),
					real_name: real_name,
					sex: sex,
					id_card: id_card,
					detail_address: detail_address,
				})
				.then(function(res) {
					resolve(res);
				})
				.catch(function(error) {
					reject(error);
				});
		});
	},

};
export default fun;
