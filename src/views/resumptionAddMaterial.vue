<template>
	<section class="aui-flexView">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:history.back(-1);" class="aui-navBar-item">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">追加员工物资</span>
			</div>
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-sys"></i>
			</a>
		</header>
		<section class="aui-scrollView">
			<div class="aui-view-box">
				<div class="resumption-table">
					<h6>复工物资检查</h6>
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
						<div class="resumption-fir-td resumption-start">14天口罩储备量 1人1天至少储备1个</div>
					</label>
					<label class="resumption-special-marginTop">
						<div class="resumption-sec-tds">
							<input type="number" v-model="mask_number" :placeholder='mask' />
							<span>个</span>
						</div>
					</label>
				</div>
				<!--<div class="resumption-tr resumption-special-marginTop resumption-special-submitPar">
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
				</div>-->
				<div class="radio-par">
					<nut-checkbox v-model="radio1">
						已做好岗前防疫知识培训
					</nut-checkbox>
				</div>
				<div class="check-par">
					<a href="http://fgfcapi.cy-coo.com/down/shouce.html" style="color:rgb(40, 116, 255);">查看《企业职工疫情防控操作手册》</a>
				</div>
				<div class="resumption-btn-par">
					<button @click="resumptionSubmit">提交审核</button>
				</div>
			</div>
		</section>
	</section>
</template>

<script>
	import axios from "axios";
	export default {
		name: "resumptions",
		data() {
			return {
				disinfectant_number: "",
				mask_number: "",
                alcohol: "",
                img1List:[],
                radio1:"",
				dateinit: '请输入消毒液数量（升）',
                mask: '请输入口罩数量（个）',
                addPerson:"",
				selectPerson:[]
			};
        },
        created () {
            this.addPerson = JSON.parse(localStorage.getItem("addPerson"));
			for(var i=0;i<this.addPerson.length;i++){
				this.selectPerson.push({
					"id": this.addPerson[i].user_id,
					"status": 3
				})
			}
        },
        watch: {
            addPerson(val){
				const that = this
                if(val.length>0){
                    that.mask=val.length*14
                }
            }
        },
		methods: {
			clickToDelete(index) {
				this.img1List.splice(index, 1)
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
			closeTanChuang() {
				this.show = false;
			},
			resumptionSubmit() {
                const that = this;
				that.loading = that.$toast.loading();
				// 调接口
				that.$api.appendNumber(
						// that.img1List.toString(),
						that.selectPerson,
                        that.disinfectant_number,
                        that.mask_number,
                        that.alcohol,
					)
					.then(function(his) {
						switch (his.data.code) {
							case 200:
								that.loading.hide();
				
								localStorage.removeItem("addPerson");
								// 成功跳转
								that.$router.push("/");
								break;
							default:
								that.$toast.text(his.data.msg);
								that.loading.hide();
								break;
						}
                });
			},
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
