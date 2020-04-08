<template>
	<div class="main-container" v-if="checkDetail === false">
		<header class="aui-navBar aui-navBar-fixed">
			<span class="aui-navBar-item" @click="()=>{$router.back()}">
				<i class="icon icon-return"></i>
			</span>
			<div class="aui-center">
				<span class="aui-center-title">外来人员管理</span>
			</div>
			<span href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-sys"></i>
			</span>
		</header>
		<main>
			<div class="filter-search">
				<select class="select-option" v-model="selectedValue">
					<option value="0" selected>全部</option>
					<option value="1">待公司审核</option>
					<option value="2">待辖区审核</option>
					<option value="3">已拒绝</option>
					<option value="4">已发放</option>
					<!-- <option value="4">已失效</option> -->

				</select>
				<div class="search" @click="handleSearch">
					<span class="">
						<nut-icon type="search"> </nut-icon>
					</span>
				</div>
			</div>

			<div class="item-detail" v-for="(item, index) in companyList" :key="index" v-show="item.status == selectedValue || selectedValue == 0"
			 @click="handleDetail(index)">
				<div class="item-info">
					<p style="font-weight:normal;font-size:16px;display:flex;justify-content:space-between;align-items:center">
						<span>{{ item.real_name }}</span>
						<span style="" :class="{
                blue: item.status == 1,
                green: item.status == 4,
                'dark-blue': item.status == 2,
                red: item.status == 3,
                grey: item.statusName === '已失效'
              }">
							{{ item.statusName }}
						</span>
					</p>
					<p style="font-size:13px;color:#929292;font-weight:normal;border-bottom:1px solid #eeeeee;padding-bottom:1rem ">
						访问有效期：<span style="color:#0881fc">{{ item.start_date }}</span>
						至
						<span style="color:#0881fc">{{ item.end_date }}</span>
					</p>
					<p style="font-size:13px;color:#ccc;font-weight:normal">
						<img src="../assets/fugong/clock.png" alt="" />
						<span>{{ item.create_time }}</span>
						<nut-icon type="right" color="#bbbbbb" @click.native="handleDetail(index)">
						</nut-icon>
					</p>
				</div>
				<!-- <div
          class="delete-item"
          @click="handleDelete(index)"
          v-if="item.status == 3 || item.status == 4 || item.status == 5"
        >
          <span>删除记录</span> -->
				<!-- </div> -->
			</div>
		</main>
	</div>
	<div v-else class="detail-container">
		<header class="aui-navBar aui-navBar-fixed">
			<span class="aui-navBar-item" @click="checkDetail = false">
				<i class="icon icon-return"></i>
			</span>
			<div class="aui-center">
				<span class="aui-center-title">外来人员管理</span>
			</div>
			<span href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-sys"></i>
			</span>
		</header>
		<main>
			<div class="top-container">
				<div class="part">
					<span style="font-size:20px;font-weight:normal">
						{{ detailInfo.real_name }}
					</span>
					<span style="" :class="{
              blue: detailInfo.status == 1,
              green: detailInfo.status == 4,
              'dark-blue': detailInfo.status == 2,
              red: detailInfo.status == 3,
              grey: detailInfo.statusName == '已失效'
            }">
						{{ detailInfo.statusName }}
					</span>
				</div>
				<div class="part grey-text" style="font-size:15px">
					<p>
						身份证号：<span>{{ detailInfo.id_card }}</span>
					</p>
					<p>
						联系方式：<span>{{ detailInfo.mobile }}</span>
					</p>
					<p>
						通行时间：<span>{{ detailInfo.start_date }}至{{ detailInfo.end_date }}</span>
					</p>
					<p>
						来访事由：<span>{{ detailInfo.visit_reason }}</span>
					</p>
				</div>
			</div>
			<div class="middle-container">
				<div class="part grey-text">
					<p>
						临时访问企业：<span>{{ companyName }}</span>
					</p>
					<p>
						申请通行时间段：<span>{{ detailInfo.start_date }}至{{ detailInfo.end_date }}</span>
					</p>
				</div>
			</div>
			<div class="bottom-container">
				<h4>访问事由</h4>
				<div class="buttom-part-reason">
					{{ detailInfo.visit_reason }}
				</div>
			</div>
			<div class="buttom">
				<div class="evidentiary-material">
					<h4>证明材料</h4>
					<div class="img-list">
						<img :src="src1" alt="证明材料1" />
						<img :src="src2" alt="证明材料2" />
					</div>
				</div>
			</div>
			<div class="审核备注">
				<h4>审核备注</h4>
				<div>
					{{ detailInfo.audit_remarks ? detailInfo.audit_remarks : "暂无" }}
				</div>
			</div>
			<div class="申请时间">
				<div>
					<img src="../assets/fugong/clock.png" alt="" />
					<span>{{ detailInfo.create_time }}</span>
				</div>
			</div>
			<div class="aduit" @click="handleAduit" v-if="detailInfo.status == 1">
				<span>审核</span>
			</div>
			<div class="弹窗">
				<nut-popup v-model="showPop" :style="{ width: '80%' }" class="pop">
					<h4 style="text-align:center;margin-bottom:0;padding-bottom:1rem;border-bottom:1px solid #e7e7e7;">
						临时审核通行证
					</h4>
					<nut-icon type="cross" @click.native="showPop = false"></nut-icon>
					<div class="aduit-radio">
						<!-- <nut-radio v-model="radioVal1" :label="1">同意发放 </nut-radio>
            <nut-radio v-model="radioVal1" :label="2">拒绝申请 </nut-radio> -->
						<div class="button" @click="changeStatus" :class="{ actived: isActived === true }">
							<span>同意发放</span>
						</div>
						<div class="button" @click="changeStatus2" :class="{ actived: isActived === false }">
							<span>拒绝申请</span>
						</div>
					</div>
					<div class="aduit-text">
						<textarea name="" id="" cols="37" rows="5" placeholder="请输入审核备注" v-model="audit_remarks"></textarea>
					</div>
					<div class="submit" @click="handleSummit">
						<span>确认提交</span>
					</div>
				</nut-popup>
			</div>
		</main>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				companyName: JSON.parse(localStorage.getItem("CompenyInfo")).name,
				checkDetail: false,
				detailInfo: {},
				src1: "",
				src2: "",
				isActived: true,
				radioVal1: 1,
				showPop: false,
				audit_remarks: "",
				selectedValue: 0, //筛选框的值
				statusObj: {
					"1": "待公司审核",
					"2": "待辖区审核",
					"3": "已拒绝",
					"4": "已发放",
					"5": "已失效"
					//  "3":''
				},
				companyList: [],
				copyCompanyList: [] //备份
			};
		},
		mounted() {
			this.initDate();
		},
		methods: {
			initDate() {
				this.$api
					.getOutSideList()
					.then(res => {
						switch (res.data.code) {
							case 200:
								if (res.data.list) {
									this.companyList = res.data.list;
									this.copyCompanyList = res.data.list;
									this.companyList.forEach(item => {
										item.statusName = this.getStatusName(
											item.status,
											item.end_date
										);
									});
								} else {
									this.companyList = [];
								}
								break;
							case 500:
								break;
						}
					})
					.catch(err => {});
			},
			getStatusName(key, end_date) {
				let today = new Date()
					.toLocaleDateString()
					.split("/")
					.join("-");
				let nowDate = new Date(today.replace(/-/g, "\/"));
				let endDate = new Date(end_date.replace(/-/g, "\/"));
				if (+endDate < +nowDate) {
					return this.statusObj["5"];
				}
				return this.statusObj[`${key}`];
			},

			handleSearch() {
				let key = this.selectedValue;
				this.companyList = this.copyCompanyList.filter(item => {
					if (key == 5) return item.statusName === "已失效";
					if (key == 0) return true;

					return item.status == key;
				});
			},
			handleDetail(i) {
				if (!this.checkDetail) this.checkDetail = true;
				else {
					return;
				}
				this.detailInfo = this.companyList.find((item, index) => index === i);
				this.src1 = `${this.detailInfo.letter_of_commitment}`;
				this.src2 = `${this.detailInfo.trajectory}`;
				this.audit_remarks = this.detailInfo.audit_remarks;
			},
			handleAduit() {
				this.showPop = true;
			},
			changeStatus() {
				if (!this.isActived) this.isActived = true;
			},
			changeStatus2() {
				if (this.isActived) this.isActived = false;
			},
			handleSummit() {
				let is_pass = this.isActived ? 1 : 0; //是否通过
				let id = this.detailInfo.id; // 信息id
				// let audit_remarks = this.isActived ? "" : this.audit_remarks;
				if (this.audit_remarks == '') {
					this.$toast.text("请填写审核备注！");
					return;
				}
				this.$api.setAuditTemporaryCard(is_pass, id, this.audit_remarks).then(res => {
					if (res.data.code == 200) {
						this.showPop = false;
						this.$toast.text("提交成功！");
						setTimeout(() => {
							this.$router.push({
								name: "index"
							});
						}, 100);
					} else {
						this.showPop = false;
						this.$toast.text("提交失败");
						return;
					}
				});
			},

			handleDelete() {
				this.$dialog({
					id: "my-dialog",
					title: "确定删除此记录？",
					content: "删除后将从你的记录里消失，无法找回"
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	// @import "../assets/skin/css/tijiao.scss";
	// @import "../assets/skin/css/jquery-labelauty.scss";
	// @import "../assets/skin/css/materialSolicitationRegister.scss";
	.main-container {
		background: #f8f8f8;

		main {
			.filter-search {
				padding: 1rem;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.select-option {
					outline: none;
					border: none;
					width: 8rem;
					// border: 1px solid #ccc;
					padding: 0.5rem 1rem;
				}

				.search {
					padding: 0.5rem 1rem;
					// color: #fff;
					// background: rgb(17, 152, 214);
					// border-radius: 0.5rem;
				}
			}

			.item-detail {
				position: relative;
				background: #fdfdfd;
				padding: 1rem 2rem;
				border-bottom: 1rem solid #f6f5f5;

				.item-info {
					p {
						&:nth-last-of-type(1) {
							span {
								vertical-align: middle;
								padding-left: 0.5rem;
							}

							img {
								width: 1rem;
								height: 1rem;
								vertical-align: middle;
							}

							i {
								width: 1rem;
								height: 1rem;
								float: right;
							}
						}
					}
				}

				// .detail-info {
				//   position: absolute;
				//   top: 40%;
				//   left: 80%;
				//   background-color: rgb(17, 152, 214);
				//   color: #fff;
				//   padding: 0.8rem;
				//   border-radius: 0.5rem;
				// }
				// .delete-item {
				//   position: absolute;
				//   top: 75%;
				//   left: 80%;
				//   color: rgb(155, 154, 154);
				// }
			}
		}
	}

	.blue {
		color: #fff;
		background: #0881fc;
		padding: 2px 10px;
		border-radius: 1rem;
		font-size: 12px;
	}

	.dark-blue {
		color: #fff;
		background: #0881fc;
		padding: 2px 10px;
		border-radius: 1rem;
		font-size: 12px;
	}

	.green {
		color: #fff;
		background: #29d9a5;
		padding: 2px 10px;
		border-radius: 1rem;
		font-size: 12px;
	}

	.grey {
		color: #fff;
		background: #999999;
		padding: 2px 10px;
		border-radius: 1rem;
		font-size: 12px;
	}

	.red {
		color: #fff;
		background: #f54331;
		padding: 2px 10px;
		border-radius: 1rem;
		font-size: 12px;
	}

	.grey-text {
		span {
			color: #888888;
		}
	}

	.aui-navBar {
		height: 44px;
		background: #eeeeed;
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		z-index: 1002;
		// padding-bottom: 20px;
	}

	.aui-navBar-item {
		height: 44px;
		min-width: 25%;
		-webkit-box-flex: 0;
		-webkit-flex: 0 0 25%;
		-ms-flex: 0 0 25%;
		flex: 0 0 25%;
		padding: 0 0.9rem;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		font-size: 0.7rem;
		white-space: nowrap;
		overflow: hidden;
		color: #a0a0a0;
		position: relative;
	}

	.aui-navBar-item:first-child {
		-webkit-box-ordinal-group: 2;
		-webkit-order: 1;
		-ms-flex-order: 1;
		order: 1;
		margin-right: -25%;
		font-size: 0.9rem;
		font-weight: bold;
	}

	.aui-navBar-item:last-child {
		-webkit-box-ordinal-group: 4;
		-webkit-order: 3;
		-ms-flex-order: 3;
		order: 3;
		-webkit-box-pack: end;
		-webkit-justify-content: flex-end;
		-ms-flex-pack: end;
		justify-content: flex-end;
	}

	.aui-center {
		-webkit-box-ordinal-group: 3;
		-webkit-order: 2;
		-ms-flex-order: 2;
		order: 2;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		-ms-flex-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		height: 44px;
		width: 50%;
		margin-left: 25%;
	}

	.icon {
		width: 20px;
		height: 20px;
		display: block;
		border: none;
		float: left;
		background-size: 20px;
		background-repeat: no-repeat;
	}

	.icon-return {
		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAACh0lEQVRoQ+3ZMW8TMRQH8PcOsTBQISExVCIRCwgWFvZ+hZYBpIrEcTYkBsTGlI2VDamL3YEBpWJoR1BJaOlXYEzyDYp0bMRGRjnJoDuWs/1e3EbKeHf55b33vzsb4YJ98IJ54RKce8XZV1gIcQ8AviDiD2vtC631pzZFYQ2WUt611p4CwM0VcqqU2soSXIN1ztdKqTfZgRuw75RSz9tg3bHsWjomlh04NpYVOAWWDbjf7z8oimLipbH7bUopJdvO7L/Hk8+wwyLiCSLe8H6cww4BwGYFTo0lbWkKLBmYCksCrsNaa99rrZ/FmFnS0GrCdrvd3mg0MqEDqu58yVKaAzZZSwshHgLAsX/rcW2csrJVtaNXeIWdIuL16qJU2OgVrsMCwEGn03mSamaThVYTtizLp+PxeJkioJKFFldslJbmjA0O5o4NCm7AHpZluUM5s1FCSwjxCAA++7ceADiczWaPJ5PJL6qAihJaUspdY8w+Il7xLsASG6SlhRA/EfGa91BxNJ/Pd7hVNtiT1mAwOAeADXdCa637Hi0Wi3zBUsptY8wHRLzqwIh/nlbzbWmna0roLEOrmo11QQd9W1oHdFDwOrR3cLCH/uuFn0uQRQE7dMPKJHl6RwNzRUcF/w9N9VIRHVyhazbLDihWP5KAHbphOzQ5OhmYCzopmAM6OZgaTQL20FMAuOUtHESfaTLwCn3HWnuWEk0KpkCTg1OjWYArtDHmKyJu+jMdeh+KDdghh8NhZ7lcfvPRoXcaWYFToNmBY6NZgj20m+nb3pr3W631yzY7GWzBDtXr9TaLojjz0N+VUvezBXvoPQBw0Fda649Zg9vg6o5l3dKhse58l+AY/yqnc/4GvNDoTFOq8FwAAAAASUVORK5CYII=");
	}

	.detail-container {
		background: #ffffff;

		main {
			.top-container {
				position: relative;
				padding-top: 2rem;
				border-bottom: 2px solid rgb(238, 238, 238);

				.part {
					padding: 0 1rem;

					&:nth-of-type(1) {
						display: flex;
						justify-content: space-between;
						align-items: center;
					}

					span {
						// color: #ccc;
					}
				}
			}

			.middle-container {
				border-bottom: 2px solid rgb(238, 238, 238);
				font-size: 15px;

				.part {
					padding: 1rem;
				}
			}

			.bottom-container {
				border-bottom: 2px solid rgb(238, 238, 238);

				h4 {
					padding: 0 1rem;
				}

				.buttom-part-reason {
					color: #888888;
					padding: 0rem 1rem;
					padding-bottom: 1rem;
					word-break: break-all;
				}
			}

			h3 {
				text-align: center;
			}

			.buttom {
				border-bottom: 2px solid rgb(238, 238, 238);

				.evidentiary-material {
					padding: 0rem 1rem;
					padding-bottom: 1rem;

					.img-list {
						display: flex;
						justify-content: space-between;
						align-items: center;

						img {
							width: 48%;
						}
					}
				}
			}

			.审核备注 {
				border-bottom: 2px solid rgb(238, 238, 238);

				h4 {
					padding: 0 1rem;
				}

				div {
					padding: 0rem 1rem;
					padding-bottom: 1rem;
				}
			}

			.申请时间 {
				border-bottom: 2px solid rgb(238, 238, 238);

				div {
					padding: 0.5rem 1rem;

					img {
						height: 1rem;
						width: 1rem;
						vertical-align: middle;
					}

					span {
						color: #ccc;
						padding-left: 0.5rem;
						vertical-align: middle;
					}
				}
			}

			.aduit {
				width: 90%;
				margin: 1rem auto;
				border-radius: 1rem;
				background: #0881fc;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0.5rem;
			}

			.pop {
				padding: 0.5rem;

				i {
					position: absolute;
					top: 8%;
					left: 90%;
				}
			}

			.aduit-radio {
				padding: 1rem;
				border-bottom: 1px solid #e7e7e7;

				.button {
					display: inline-block;
					padding: 0.5rem 0.8rem;
					margin-right: 1rem;
					border: 1px solid #0881fc;
					color: #0881fc;
					background: #fff;
					border-radius: 0.5rem;

					span {
						text-align: center;
					}
				}

				.actived {
					background: #0881fc;
					color: #fff;
				}
			}

			.aduit-text {
				padding-top: 1rem;
				border-bottom: 1px solid #e7e7e7;

				textarea {
					margin-left: 1rem;
					outline: none;
					border: none;
				}
			}

			.submit {
				width: 90%;
				margin: 1rem auto;
				padding: 1rem 0;
				// background: #0881fc;
				background: linear-gradient(to right, #0881fc, #06baff);
				color: #fff;
				border-radius: 2rem;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>
