<template>
	<section class="aui-flexView">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-return"></i>
			</a>
			<div class="aui-center">
				<span class="aui-center-title">添加员工</span>
			</div>
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-sys"></i>
			</a>
		</header>
		<section class="aui-scrollView">
			<ul>
				<li><span>姓名</span><input type="text" readonly="readonly" v-model="name">
					<span v-if="is_commencement==0">未登记复工</span>
					<span v-else>已登记复工</span>
				</li>
				<li><span>身份证</span><input type="text" readonly="readonly" v-model="idCard"></li>
				<li><span>电话</span><input type="text" readonly="readonly" v-model="phone"></li>
			</ul>
			<ul>
				<li><span>体温(℃)</span><input type="text" placeholder="请输入体温值" v-model="tiwen"></li>
			</ul>
			<ul>
				<li style="display: flex;flex-direction: column;">
					<span>事项说明</span>
					<textarea placeholder="请输入出入的具体事项" style="margin-top: 10px;border: none;" v-model="shixiang"></textarea>
				</li>
			</ul>
			<ul>
				<li>
					<span>是否放行</span>
					<div style="display: flex;align-items:center;">
						<label for="">
							<input type="radio" value="1"v-model="isfangxing">是
						</label>
						<label for="" style="margin-left: 20px;">
							<input type="radio" value="0"v-model="isfangxing">否
						</label>
					</div>
				</li>
			</ul>
		</section>
		<button @click="submit()">
			提交登记
		</button>
	</section>
</template>

<script>
	export default {
		name: "tijiao",
		data(){
			return{
				is_commencement:'',
				name:'',
				idCard:'',
				phone:'',
				tiwen:'',
				shixiang:'',
				isfangxing:''
			}
		},
		mounted() {
			this.getinfo()
		},
		methods:{
			getinfo(){
				const that = this
				this.$api.qiyedakaInfo(this.$route.query.id).then(function(res){
					console.info(res)
					switch (res.data.code){
						case 200:
							that.name = res.data.info.real_name
							that.idCard = res.data.info.id_card
							that.phone = res.data.info.mobile
							that.is_commencement = res.data.info.is_commencement
							break;
						case 500:
							this.$toast.text(res.data.msg)
							break;
							
						default:
							break;
					}
				})
			},
			submit(){
				const that=this
				this.$api.qiyedakaAdd(this.$route.query.id,this.tiwen,this.shixiang,this.isfangxing).then(function(res){
					switch (res.data.code){
						case 200:
							that.$dialog({
							  title: "系统提示",
							  content: "登记成功",
							  closeOnClickModal:false,
							  noCancelBtn:true
							});
							break;
						case 500:
							this.$toast.text(res.data.msg)
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
	@import '../assets/skin/css/tijiao.scss';
	@import '../assets/skin/css/jquery-labelauty.scss';

	ul {
		list-style-type: none;
		background: #FFFFFF;
		margin-bottom: 10px;
		display: flex;
		flex-direction: column;
	}

	li {
		display: flex;
		padding: 5px 10px;
		span{
			display: flex;
			width: 20%;
		}
		input{
			border: none;
			color: #AAAAAA;
		}
		
	}
	label{
		display: flex;
		align-items: center;
	}
	li {
		margin: 10px 0;
	}

	input.labelauty+label {
		font: 12px "Microsoft Yahei";
	}

	section {
		background: rgba(0, 0, 0, .05);
	}
	button{
		position: fixed;
		bottom: 0;
		width: 100%;
		box-sizing: border-box;
		background: #007AFF;
		padding: 10px;
		border: none;
		color: #fff;
	}
</style>
