<template>
	<div class="quzheng">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-return" @click="back"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">{{this.$route.query.title}}</span>
			</div>
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-sys"></i>
			</a>
		</header>

		<div class="content">
			<div class="aui-view-box-item">
				<h2>输入信息:</h2>
				<!-- <input v-model="phone" type="text" placeholder="输您的手机号码" /> -->
				<select v-model="type">
					<option :value="0" :selected="index == type">请选择举报对象类型</option>
					<option :value="index+1" v-for="(item,index) in shuju" :key="index" :selected="index == type">{{item}}</option>
				</select>
				<select v-model="Rtype" v-show="false">
					<option :value="index+1" v-for="(item,index) in shuju2" :key="index" :selected="index == Rtype">{{item}}</option>
				</select>
				<input v-model="whistleblower" type="text" placeholder="对象地址/对象姓名" />
				<!-- <input v-model="address_code" type="text" placeholder="地区邮编" /> -->
				<input v-model="detail_addres" type="text" placeholder="请说明举报对象具体位置" />
				<textarea v-model="explain" rows="20" cols="20" placeholder="举报描述"></textarea>
				<h2>添加举证:</h2>
				<div class="tupian"></div>
				<nut-imagepicker @imgMsg="imgMsg" :width="120" :height="120" :margin="10" :imgList.sync="imgList" ></nut-imagepicker>
				<div class="aui-btn-submit">
					<button @click="go">提交建议</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				
				shuju: [
					"真实姓名",
					"地理位置或经营性场所",
					"手机号",
					"微信号",
					"QQ号",
					"微博账号"
				],
				shuju2: [
					"人群聚集",
					"传谣/造谣",
					"贩卖/宰杀野生动物",
					"恶意哄抬医用物资/物价",
					"诈骗募捐",
					"其他"
				],
				type: "0",
				Rtype: this.$route.query.report_type,
				phone: "",
				address_code: "",
				detail_addres: "",
				explain: "",
				whistleblower: "",
				evidence: [],
				report_type: this.$route.query.report_type,
				imgList: [],
				imgArr: []
			};
		},
		computed: {
			oneF() {
				return this.one.charAt(0);
			},
			oneL() {
				return this.one.slice(1, 3);
			}
		},
		methods: {
			imgMsg(data) {
				const that = this;
				if (data.code == 1) {
					alert("upload");
				}
				this.imgArr = [];

				for (let i in that.imgList) {
					that.imgArr.push(that.imgList[i].src);
					console.info(that.imgArr);
				}

				// console.log(data); //code 1 自动上传  2 不上传只展示图片  3 删除图片  4 预览图片
			},
			go() {
				const that = this;
				if (
					this.type == "" ||
					// this.phone == "" ||
					this.detail_addres == "" ||
					this.whistleblower == "" ||
					this.explain == "" ||
					// this.evidence == "" ||
					this.Rtype == ''
				) {
					this.$toast.text("请填写完成之后进行提交");
					return;
				}
				if(this.type =='0'){
					this.$toast.text("请选择举报类型");
					return
				}
				that.$api.uploadImage(that.imgArr).then(function(res) {
					if(res.data.code){
						that.$api.informSubmit(
								// this.phone,
								that.type,
								that.whistleblower,
								//暂时隐去邮箱
								// this.address_code,
								'默认地区',
								that.detail_addres,
								that.explain,
								res.data.url,
								that.Rtype
							)
							.then(function(value) {
								console.info(value);
								switch (value.data.code) {
									case 200:
										that.$toast.text(value.data.msg);
										that.$router.push("/jubaochenggong");
										break;
									case 500:
										that.$toast.text(value.data.msg);
										break;
									default:
										break;
								}
							});
					}
				})
			},
			back() {
				this.$router.go(-1);
			}
		}
	};
</script>
<style lang="scss" scoped>
	@import "../assets/skin/css/tijiao.scss";
	@import "../assets/skin/css/jquery-labelauty.scss";

	select {
		margin-bottom: 10px;
		width: 100%;
		background-color: #f4f4f4;
		border: 1px solid white;
		height: 40px;
	}

	.aui-view-box-item {
		textarea {
			height: 100px;
		}
	}

	.content {
		padding: 15px;
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
