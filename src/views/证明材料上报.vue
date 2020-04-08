<template>
	<div class="包裹">
		<TopHeader title="证明材料上报" isShow="true" class="header"></TopHeader>
		<div class="txz">
			<h4>上传身份证（正反面）<p>图片长按可删除</p>
			</h4>
			<div style="display: flex;flex-direction: row;flex-wrap: wrap;">
				<label for="" class="label" v-if="UpdateInfo != null">

					<img v-if="UpdateInfo.id_card_front" :src="UpdateInfo.id_card_front" alt="您之前并未上传" width="100%">
					<img v-else src="../assets/skin/icon/nopic.png" alt="您之前并未上传" width="60%">
					(原)身份证正面
				</label>
				<label for="" class="label" v-if="UpdateInfo != null">
					
					<img v-if="UpdateInfo.id_card_back" :src="UpdateInfo.id_card_back" alt="您之前并未上传" width="100%">
					<img v-else src="../assets/skin/icon/nopic.png" alt="您之前并未上传" width="60%">
					(原)身份证反面
				</label>
				<label for="" class="label">
					<nut-imagepicker max="1" @imgMsg="uploadImg1" delMode="longtap" :imgList.sync="materialsImg1">
					</nut-imagepicker>
					身份证正面
				</label>
				<label for="" class="label">
					<nut-imagepicker max="1" @imgMsg="uploadImg2" delMode="longtap" :imgList.sync="materialsImg2">
					</nut-imagepicker>
					身份证反面
				</label>
			</div>
			<h4>上传轨迹证明(如何查看自己的轨迹？)<p>图片长按可删除</p>
			</h4>
			<p class="tips">一、电信手机用户证明方法<br />
				编辑短信CXMYD#身份证号码后四位到10001，授权回复Y后，实现“漫游地查询”，可查询手机号近15日内的途径地信息。</p>
			<p class="tips">二、联通手机用户证明方法<br />
				手机发送：“CXMYD#身份证号码后四位”至10010，查询近30天的全国漫游地信息。便于返工辅助排查。</p>
			<p class="tips">三、移动手机用户证明方法<br />
				编写CXMYD,发送到10086，在依据回复短信输入身份证后四位，可查询过去一个月内去过的省和直辖市（无地市）。每人免费一天查询10次。</p>
			<div style="display: flex;flex-direction: row;">
				<label for="" class="label" v-if="UpdateInfo != null">
					<img v-if="UpdateInfo.trajectory_proof_picture" :src="UpdateInfo.trajectory_proof_picture" alt="您之前并未上传" width="100%">
					<img v-else src="../assets/skin/icon/nopic.png" alt="您之前并未上传" width="60%">
					(原)运营商轨迹查询截图证明<br />（全屏截图）
				</label>
				<label for="" class="label">
					<nut-imagepicker max="1" @imgMsg="uploadImg3" delMode="longtap" :imgList.sync="materialsImg3">
					</nut-imagepicker>
					运营商轨迹查询截图证明<br />（全屏截图）
				</label>
			</div>
			<h4>上传14天隔离文件证明<p>图片长按可删除</p>
			</h4>
			<p class="tips">
				是否必须上传14天隔离文件？请向上级审批单位咨询确认后添加，如不需要添加，请留空（注意：根据政策文件跨省/市以及重点地区返渝人员需要隔离）
			</p>
			<div style="display: flex;flex-direction: row;">
				<label for="" class="label" v-if="UpdateInfo != null">
					<img v-if="UpdateInfo.quarantine_picture" :src="UpdateInfo.quarantine_picture" alt="您之前并未上传" width="100%">
					<img v-else src="../assets/skin/icon/nopic.png" alt="您之前并未上传" width="60%">
					(原)14天隔离文件证明材料<br />（全屏截图）
				</label>
				<label for="" class="label">
					<nut-imagepicker max="1" @imgMsg="uploadImg4" delMode="longtap" :imgList.sync="materialsImg4">
					</nut-imagepicker>
					14天隔离文件证明材料<br />（全屏截图）
				</label>
			</div>
			<h4>上传新冠病毒核酸检测证明文件<p>图片长按可删除</p>
			</h4>
			<p class="tips">
				是否必须上传新型冠状病毒核酸检测证明文件？请向上级审批单位咨询确认后添加，如不需要添加，请留空（注意：根据政策文件重点地区回渝/密切接触者/有疑似症状者必须上传）
			</p>
			<div style="display: flex;flex-direction: row;">
				<label for="" class="label" v-if="UpdateInfo != null">
					<img v-if="UpdateInfo.detection_result" :src="UpdateInfo.detection_result" alt="您之前并未上传" width="100%">
					<img v-else src="../assets/skin/icon/nopic.png" alt="您之前并未上传" width="60%">
					(原)新型冠状病毒核酸检测证明文件
				</label>
				<label for="" class="label">
					<nut-imagepicker max="1" @imgMsg="uploadImg5" delMode="longtap" :imgList.sync="materialsImg5">
					</nut-imagepicker>
					新型冠状病毒核酸检测证明文件
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
		data() {
			return {
				UpdateInfo:JSON.parse(sessionStorage.getItem('UpdateInfo')),
				materialsImg1: [],
				materialsImg2: [],
				materialsImg3: [],
				materialsImg4: [],
				materialsImg5: [],
				nopic: '../assets/skin/icon/nopic.png',
			}
		},
		beforeDestroy() {
			sessionStorage.removeItem('UpdateInfo')
		},
		methods: {
			uploadImg1(e) {
				const that = this
				var file = e.msg[0];
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onloadend = function() {
					var dataURL = reader.result;
					that.loading = that.$toast.loading();
					that.$api.uploadImage([dataURL]).then(function(res) {
						switch (res.data.code) {
							case 200:
								that.materialsImg1 = []
								that.materialsImg1.push(res.data.url)
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
			},
			uploadImg2(e) {
				const that = this
				var file = e.msg[0];
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onloadend = function() {
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
				}
			},
			uploadImg3(e) {
				const that = this
				var file = e.msg[0];
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onloadend = function() {
					var dataURL = reader.result;
					that.loading = that.$toast.loading();
					that.$api.uploadImage([dataURL]).then(function(res) {
						switch (res.data.code) {
							case 200:
								that.materialsImg3 = []
								that.materialsImg3.push(res.data.url)
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
			},
			uploadImg4(e) {
				const that = this
				var file = e.msg[0];
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onloadend = function() {
					var dataURL = reader.result;
					that.loading = that.$toast.loading();
					that.$api.uploadImage([dataURL]).then(function(res) {
						switch (res.data.code) {
							case 200:
								that.materialsImg4 = []
								that.materialsImg4.push(res.data.url)
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
			},
			uploadImg5(e) {
				const that = this
				var file = e.msg[0];
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onloadend = function() {
					var dataURL = reader.result;
					that.loading = that.$toast.loading();
					that.$api.uploadImage([dataURL]).then(function(res) {
						switch (res.data.code) {
							case 200:
								that.materialsImg5 = []
								that.materialsImg5.push(res.data.url)
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
			},
			submit() {
				const that = this
				that.loading = that.$toast.loading();
				if(JSON.parse(sessionStorage.getItem('UpdateInfo')) != null){
					this.$api.CommencementDataUpload(
						String(that.materialsImg1) || JSON.parse(sessionStorage.getItem('UpdateInfo')).id_card_front,
						String(that.materialsImg2) || JSON.parse(sessionStorage.getItem('UpdateInfo')).id_card_back,
						String(that.materialsImg3) || JSON.parse(sessionStorage.getItem('UpdateInfo')).trajectory_proof_picture,
						String(that.materialsImg4) || JSON.parse(sessionStorage.getItem('UpdateInfo')).quarantine_picture,
						String(that.materialsImg5) || JSON.parse(sessionStorage.getItem('UpdateInfo')).detection_result
					).then(function(res) {
						console.info(res)
						switch (res.data.code) {
							case 200:
								that.$router.push('/MaterialsDetails')
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
				}else{
					this.$api.CommencementDataUpload(
						String(that.materialsImg1),
						String(that.materialsImg2),
						String(that.materialsImg3),
						String(that.materialsImg4),
						String(that.materialsImg5)
					).then(function(res) {
						console.info(res)
						switch (res.data.code) {
							case 200:
								that.$router.replace('/MaterialsDetails')
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
			},
		},

	}
</script>
<style>
	.nut-imagepicker .img-list .add-icon {
		border: 1px dashed #5A5A5A;
	}

	.nut-imagepicker .img-list .add-icon i {
		color: #5A5A5A;
	}

	.nut-people-list {
		padding-bottom: 20px;
	}
</style>
<style lang="scss" scoped>
	h4 {
		margin: 5px 0;
	}

	h4>p {
		font-size: 12px;
		font-weight: normal;
	}

	.label {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		flex-shrink: 0;
	}

	p {
		padding: 0 20px;
		flex-shrink: 0;
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

	.tips {
		font-size: 10px;
		margin: 0;
		margin-top: 10px;
		opacity: .6;
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
				width: 40%;
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
