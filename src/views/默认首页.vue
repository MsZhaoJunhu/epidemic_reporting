<template>
	<div class="text-reg">
		<div class="main-container">
			<div class="reg-button">
					<img src="../assets/登录/登录注册.png" alt="" />
			</div>
			<main>
				<div class="button-list">
					<div class="company-button text-button">
						<router-link to="/login?type=1">
							<img src="../assets/登录/我是企业.png" alt="" />
						</router-link>
					</div>
					<div class="staff-button text-button">
						<router-link to="/login">
							<img src="../assets/登录/我是员工.png" alt="" />
						</router-link>
					</div>
				</div>
				<div class="scene">
					<h3>渝北区复工复产平台应用场景</h3>
					<p>
						<img src="../assets/登录/我是园区.png" alt="" />
					</p>
					<p>
						<img src="../assets/登录/我是个人.png" alt="" />
					</p>
				</div>
			</main>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {};
		},
	};
</script>

<style lang="scss" scoped>
	.text-reg {
		background: #f6f5f5;

		.main-container {
			.reg-button {
				position: absolute;
				width: 100%;
				text-align: center;
				z-index: 9;
				img {
					// width: 76%;
					height: 100px;
				}
			}
			main {
				padding: 1rem;
				position: relative;
				.button-list {
					margin-top: 20px;
					padding: 5.5rem 0 2rem;
					width: 100%;
					background: #fff;
					border-radius: 1rem;
					display: flex;
					justify-content: space-between;
					align-items: center;
					text-align: center;

					img {
						width: 80%;
					}
				}


				.scene {
					background: #fff;
					padding-bottom: 2rem;
					border-radius: 1rem;

					h3 {
						padding: 2rem 4rem 1.5rem 1rem;
					}

					p {
						text-align: center;
						padding-bottom: 1rem;

						img {
							width: 90%;
						}
					}
				}
			}
		}
	}
</style>
