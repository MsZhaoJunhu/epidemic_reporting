<template>
	<section class="aui-flexView">
		<TopHeader title="" class="header">
			<template v-slot:leftBtn>
				<router-link to="/index">返回主页</router-link>
			</template>
		</TopHeader>
		<section class="aui-scrollView">
			<div class="aui-jop-chang">
				<p>联防联控端登录</p>
			</div>
			<div class="aui-jop-top">
				<div class="aui-jop-top-box">
					<form action="">
						<div class="aui-flex b-line">
							<div class="aui-form-item">
								<img src="../../assets/skin/images/iphone.png" alt="">
							</div>
							<div class="aui-flex-box">
								<input type="text" placeholder="请输入手机号码" v-model="mobile">
							</div>
						</div>
						<div class="aui-flex b-line">
							<div class="aui-form-item">
								<img src="../../assets/skin/images/psd.png" alt="">
							</div>
							<div class="aui-flex-box">
								<input type="password" placeholder="密码" v-model="pwd">
							</div>
							<div class="aui-psd">
								<!--  <a href="javascript:;">忘记密码</a> -->
							</div>
						</div>
						<div class="aui-form-button">
							<div @click="login()">登录</div>
						</div>
						<div class="aui-register aui-register-a">
							<a href="javascript:;">请联系管理员获取账号</a>
						</div>
					</form>
				</div>
			</div>
			<!-- <div class="aui-register">
				<a href="javascript:;">注册账号</a>
			</div> -->

		</section>
		<footer class="aui-footer-link">
			<a href="javascript:;" class="aui-tabBar-item aui-tabBar-item-active">登录即代表阅读并同意 <em>用户协议</em></a>
		</footer>
	</section>
</template>

<script>
	import TopHeader from '../../components/TopHeader.vue'
	export default {
		name: "index",
		data(){
			return {
				mobile:'',
				pwd:'',
			}
		},
		components:{
			TopHeader
		},
		methods:{
			login(){
				const that = this
				if(this.mobile == ''){
					this.$toast.text('请输入账号')
					return
				}
				if(this.pwd == ''){
					this.$toast.text('请输入密码')
					return
				}
				that.loading = that.$toast.loading();
				that.$api.Plogin(that.mobile,that.pwd).then((res)=>{
					console.info(res)
					switch (res.data.code){
						case 200:
							localStorage.setItem('Ptoken',res.data.token)
							setTimeout(()=>{
									clearInterval(that.dsq)
									that.dsq = null
									that.$api.fangkongInfo().then((res)=>{
										console.info(res)
										switch (res.data.code){
											case 200:
												that.loading.hide();
													localStorage.setItem('Pinfo',JSON.stringify(res.data.info))
													that.$router.push({name:'fangkong'})
												break;
											case 500:
												that.loading.hide();
												that.$toast.text(res.data.msg)
												break;
											default:
												break;
										}
									})
							},100)
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
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../assets/skin/css/fklogin.scss";
	.header{
		position: fixed;
		z-index: 99;
		width: 100%;
		margin-top: 10px;
	}
	.header *{
		color: #fff;
	}
	.aui-form-button>div{
		font-size:14px;
		text-align: center;
		color: #fff;
		padding: 13px;
		border-radius: 50px;
		background: orangered;
	}
</style>
