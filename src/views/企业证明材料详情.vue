<template>
	<div class="包裹">
		<TopHeader title="证明材料上报" isShow="true" class="header">
		</TopHeader>

		<div class="kong" v-if="info==null">
			<svg class="icon" style="width: 150px; height: 150px;vertical-align: middle;fill: currentColor;overflow: hidden;"
			 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2399">
				<path d="M409.073 900.723l-263.213 0.137c-11.371 0-23.996-1.375-32.172-11.783-4.158-5.273-6.94-22.192-6.94-33.838V101.1c0.276-2.644 2.37-20.25 12.625-30.506 14.565-14.565 25.524-16.92 27.45-17.194h406.894v108.85c-0.153 5.685 0.275 42.717 21.489 66.987 19.563 22.314 50.482 33.976 53.951 35.23l4.432 1.65 144.094 0.153v129.94l45.484 35.076c2.644 2.644 5.273 5.41 7.764 8.055V205.243L598.238 0H145.844c-5.257 0-32.997 1.528-64.19 32.86C56.13 58.383 53.637 94.88 53.485 98.885v755.65c-0.153 7.642 0.55 44.522 18.156 67.126a80.667 80.667 0 0 0 43.406 28.58c13.45 3.73 25.11 3.73 30.796 3.73l359.042-0.138a315.606 315.606 0 0 1-63.518-28.275l-32.325-24.835zM606.965 78.772L758.823 212.87l-115.513-0.138c-7.642-3.316-20.817-10.255-28.168-18.585-5.808-6.648-8.314-22.467-8.314-31.193l0.153-84.182z m351.156 871.882a42.55 42.55 0 0 1 0.153 59.912 42.672 42.672 0 0 1-29.956 12.334 42.443 42.443 0 0 1-29.956-12.35L767.305 879.51a277.596 277.596 0 0 1-165.17 54.226c-153.936 0-279.17-125.234-279.17-279.17 0-153.936 125.234-279.307 279.17-279.307 153.937 0 279.155 125.233 279.155 279.17 0 61.715-20.113 118.845-54.226 165.17l131.057 131.04z m-355.985-85.71c116.078 0 210.516-94.453 210.516-210.516 0-116.08-94.453-210.516-210.516-210.516-116.08 0-210.516 94.452-210.516 210.516 0 116.079 94.437 210.516 210.516 210.516z"
				 p-id="2400"></path>
			</svg>
			并未提交
		</div>
		<div class="txz" v-else>
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
			this.$api.ECommencementDataInfo(this.$route.query.id).then(function(res) {
				console.info(res)
				switch (res.data.code) {
					case 200:
						that.info = res.data.info
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
				this.$router.push('/applyMaterials')
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
	.包裹{
		height: 100%;
	}
	.kong{
		svg{
			margin-bottom: 30px;
		}
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 25px;
		color: #AAAAAA;
	}
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
