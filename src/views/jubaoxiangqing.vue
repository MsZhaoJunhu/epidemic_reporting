<template>
	<div class="jubaoxiangqing">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:;" class="aui-navBar-item">
				<i @click="back" class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">举报详情</span>
			</div>
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-sys"></i>
			</a>
		</header>
		<div class="content">
			<p>
				举报状态:
				<span v-show="list.status==1" class="ycl">待受理</span>
				<span v-show="list.status==2" class="ycl">受理中</span>
				<span v-show="list.status==3" class="ycl">已受理</span>
				<span v-show="list.status==4" class="ycl">受理失败</span>
			</p>
			<!-- <p>
        举报人手机号:
        <span>{{}}</span>
      </p>-->
			<p>
				举报类型:
				<span v-show="list.report_type==1">人群聚集</span>
				<span v-show="list.report_type==2">传谣/造谣</span>
				<span v-show="list.report_type==3">贩卖/宰杀野生动物</span>
				<span v-show="list.report_type==4">恶意哄抬医用物资/物价</span>
				<span v-show="list.report_type==5">诈骗募捐</span>
				<span v-show="list.report_type==6">其他</span>
			</p>
			<p>
				举报对象:
				<span>{{list.whistleblower}}</span>
			</p>
			<p>
				举报对象所在地:
				<span>{{list.detail_address}}</span>
			</p>
			<div class="jbms">
				<span>举报描述:</span>
				<div>{{list.report_explain}}</div>
			</div>
			<p>图片举证:</p>
			<div class="tpjz">
				<img :src="item" v-for="item in imglist"/>
			</div>处理结果:
			<span class="cljg" v-show="list.status==1">请耐心等待工作人员受理</span>
			<span class="cljg" v-show="list.status==2">暂无处理结果</span>
			<span class="cljg" v-show="list.status==3">已核实并对相关人员进行说服教育</span>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				list: [],
				imglist: []
			};
		},
		created() {
			const that = this;
			this.$api.informdetail(this.$route.query.id).then(function(value) {
				switch (value.data.code) {
					case 200:
						that.list = value.data.info;
						console.info(value);
						let str = value.data.info.evidence;
						let arr = str.split(',')
						that.imglist = arr
						that.$toast.text(value.data.msg);
						break;
					case 500:
						that.$toast.text(value.data.msg);
						break;
					default:
						break;
				}
			});
		},
		methods: {
			back() {
				this.$router.go(-1);
			}
		}
	};
</script>
<style lang="scss" scoped>
	@import "../assets/skin/css/tijiao.scss";
	@import "../assets/skin/css/jquery-labelauty.scss";

	.ycl {
		color: rgb(81, 123, 240);
	}

	.cljg {
		font-size: 14px;
		margin-top: 10%;
		position: relative;
		top: -2px;
		display: inline-block;
		height: 30px;
		width: 75%;
		border: 1px solid black;
		line-height: 30px;
		padding-left: 5px;
		color: red;
	}

	.tpjz {
		margin-top: 8%;

		img {
			width: 45%;
			margin-left: 10px;
		}
	}

	.jbms {
		margin-top: 6%;

		div {
			font-size: 14px;
			margin-left: 30%;
			border: 1px solid black;
			padding: 5%;
		}
	}

	.content {
		border-top: 0.5px solid rgb(216, 215, 215);
		padding: 3% 10% 0 10%;

		p {
			font-size: 14px;
			margin-top: 6%;

			span {
				padding-left: 20px;
			}
		}
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
