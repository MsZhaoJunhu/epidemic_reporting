<template>
	<div class="包裹">
		<TopHeader title="证明材料上报" isShow="true" class="header">
			<template v-slot:rightBtn>
				<span style="color: #007AFF;" @click="go_Update()">修改</span>
			</template>
		</TopHeader>
		<div class="txz">
			<h4>身份证（正反面）
			</h4>

			<div>
				<label for="" class="label">
					<img :src="info.id_card_front" alt="网络错误,加载失败" width="100%">
				</label>
				<label for="" class="label">
					<img :src="info.id_card_back" alt="网络错误,加载失败" width="100%">
				</label>
			</div>
			<h4>轨迹证明
			</h4>
			<div>
				<label for="" class="label">
					<img :src="info.trajectory_proof_picture" alt="网络错误,加载失败" width="100%">
				</label>
			</div>
			<h4>14天隔离文件证明
			</h4>
			<div>
				<label for="" class="label">
					<img :src="info.quarantine_picture || ''" alt="您并未上传此项" width="100%">
				</label>
			</div>
			<h4>新冠病毒核酸检测证明文件
			</h4>
			<div>
				<label for="" class="label">
					<img :src="info.detection_result || ''" alt="您并未上传此项" width="100%">
				</label>
			</div>
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
				info: ''
			}
		},
		created() {
			const that = this
			that.loading = that.$toast.loading();
			this.$api.CommencementDataInfo().then(function(res) {
				console.info(res)
				switch (res.data.code) {
					case 200:
						if (res.data.info == null) {
							that.$router.replace('/applyMaterials')
						} else {
							that.info = res.data.info
						}
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
		},
		methods: {
			go_Update() {
				sessionStorage.setItem('UpdateInfo', JSON.stringify(this.info))
				this.$router.replace('/applyMaterials')
			}
		}
	}
</script>
<style>
	.nut-imagepicker .img-list .add-icon {
		border: 1px dashed #5A5A5A;
	}

	.nut-imagepicker .img-list .add-icon i {
		color: #5A5A5A;
	}

	.nut-list-h {
		display: none;
	}

	.nut-people-list {
		padding-bottom: 20px;
	}
</style>
<style lang="scss" scoped>
	h4 {
		margin-bottom: 0;
	}

	h4>p {
		font-size: 8px;
		font-weight: normal;
	}

	.label {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	p {
		padding: 0 20px;

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
