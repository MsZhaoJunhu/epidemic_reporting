<template>
	<div class="jubao">
		<div id="xieyi" v-show="xieyi">
			<div>
				<img src="../assets/skin/images/xieyi.png" alt="">
				<div class="button" @click="xieyi = false">
					我同意
				</div>
			</div>
		</div>
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-return" @click="back"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">选择举报类型</span>
			</div>
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-sys"></i>
			</a>
		</header>
		<div class="content">
			<div @click="go" class="content1">人群聚集</div>
			<div @click="go1" class="content1">传谣/造谣</div>
			<div @click="go2" class="content1">贩卖/宰杀野生动物</div>
			<div @click="go3" class="content1">恶意哄抬物资/物价</div>
			<div @click="go4" class="content1">诈骗募捐</div>
			<div @click="go5" class="content1">其他</div>
		</div>
		<p style="margin-bottom: 30px;">
			举报之前我已认真阅读
			<span>《举报须知》</span>
			<i @click="show=!show" class="kuang">
				<span v-show="show" class="gou"></span>
			</i>
		</p>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				show: true,
				title: "",
				xieyi: true,
			};
		},
		methods: {
			back() {
				this.$router.go(-1);
			},
			go() {
				if (this.show == true) {
					this.$router.push({
						path: "/quzheng",
						query: {
							title: "人群聚集",
							report_type: "1"
						}
					});
				} else {
					this.xieyi = true;
				}
			},
			go1() {
				if (this.show == true) {
					this.$router.push({
						path: "/quzheng",
						query: {
							title: "传谣/造谣",
							report_type: "2"
						}
					});
				} else {
					this.xieyi = true;
				}
			},
			go2() {
				if (this.show == true) {
					this.$router.push({
						path: "/quzheng",
						query: {
							title: "贩卖/宰杀野生动物",
							report_type: "3"
						}
					});
				} else {
					this.xieyi = true;
				}
			},
			go3() {
				if (this.show == true) {
					this.$router.push({
						path: "/quzheng",
						query: {
							title: "恶意哄抬物资/物价",
							report_type: "4"
						}
					});
				} else {
					this.xieyi = true;
				}
			},
			go4() {
				if (this.show == true) {
					this.$router.push({
						path: "/quzheng",
						query: {
							title: "诈骗募捐",
							report_type: "5"
						}
					});
				} else {
					this.xieyi = true;
				}
			},
			go5() {
				if (this.show == true) {
					this.$router.push({
						path: "/quzheng",
						query: {
							title: "其他",
							report_type: "6"
						}
					});
				} else {
					this.xieyi = true;
				}
			}
		}
	};
</script>
<style lang="scss" scoped>
	@import "../assets/skin/css/tijiao.scss";
	@import "../assets/skin/css/jquery-labelauty.scss";

	#xieyi {
		position: fixed;
		height: calc(100vh - 44px);
		top: 44px;
		width: 100vw;
		z-index: 999;
		background: #FFFFFF;

		div {
			height: 100%;
			overflow-y: scroll;

			img {
				width: 100%;
			}

			.button {
				margin: 0 20px;
				height: 40px;
				background: #007AFF;
				color: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 50px;
				margin-bottom: 30px;
			}
		}
	}

	.kuang {
		display: inline-block;
		height: 10px;
		width: 10px;
		border: 1px solid black;
	}

	.gou {
		background-color: rgb(137, 137, 243);
		display: block;
		height: 7px;
		width: 7px;
		margin: auto;
	}

	.jubao {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	p {
		margin-left: 20%;
		font-size: 12px;

		span {
			color: rgb(128, 140, 241);
		}
	}

	.content {
		height: 70%;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		justify-content: space-around;
	}

	.content1 {
		width: 70%;
		background-color: #1177DD;
		height: 40px;
		border-radius: 50px;
		line-height: 40px;
		color: white;
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
