<template>
	<div class='resident-success'>
		<div class='main-container'>
			<!-- <div class='logo part'>
           <img src="../../assets/skin/images/logo-10.png" alt=""> 
        </div>
        <div class='result part'>
               <h5>登记成功</h5>
        </div> -->
			<img src="../../assets/skin/images/gzh.jpg" width="160px" />
			<p style="margin-top:0">长按关注公众号，登记打卡更方便</p>
			<router-link to="/index" class="router part" tag="div">
				<span>前往防控首页</span>
			</router-link>
		</div>
	</div>
	</div>
</template>

<script>
	export default {
		name: 'redisdentSuccess',
		data() {
			return {

			}
		},
	}
</script>

<style lang="scss" scoped>
	a {
		outline: none;
		border: none;
		text-decoration: none;
	}

	.resident-success {
		background-image: url(../../assets/skin/images/djcg.jpg);
		background-size: contain;
		background-repeat: no-repeat;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: flex-start;

		.main-container {
			width: 80%;
			margin-top: 2rem;
			text-align: center;
			position: fixed;
			bottom: 10%;

			.router {
				width: 90%;
				height: 40px;
				margin: 0 auto;
				border-radius: 50px;
				background-image: linear-gradient(to right, #0881fc, #20b2ff);
				box-shadow: 0px 3px 6px rgb(111, 159, 247);
				display: flex;
				justify-content: center;
				align-items: center;

				span {
					color: #fff;
				}
			}
		}
	}
</style>
