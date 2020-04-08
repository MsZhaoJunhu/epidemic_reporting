<template>
	<div class="login">
		<header>
			我的
		</header>
		<ul>
			<router-link to="/updateName" tag='li'>
				<div>
					<span>姓名</span>
				</div>
				<div>
					{{info.user_name}}
					<i>></i>
				</div>
			</router-link>
			<router-link to="" tag='li'>
				<div>
					<span>账号</span>
				</div>
				<div>
					{{info.mobile}}
				</div>
			</router-link>
			<router-link to="/updatePwd" tag='li'>
				<div>
					<span>修改密码</span>
				</div>
				<div>
					<i>></i>
				</div>
			</router-link>
			<router-link to="fangkongMsg" tag='li'>
				<div>
					<span>系统公告</span>
				</div>
				<div>
					<i>></i>
				</div>
			</router-link>
		</ul>
		<p class="exit">
			<button @click="exit()">退出登录</button>
		</p>
		<tabbar active="1"></tabbar>
	</div>
</template>

<script>
	import tabbar from '@/components/tabbar2.vue'
	export default {
		name: "my",
		components:{
			tabbar
		},
		data(){
			return{
				info:JSON.parse(localStorage.getItem('Pinfo'))
			}
		},
		methods:{
			exit(){
				const that = this
				this.$dialog({
				        title: "系统提示",
				        content: "你确定要退出吗",
						closeOnClickModal:'false',
				        closeBtn:false,  //显式右上角关闭按钮
				        onOkBtn(event) {  //确定按钮点击事件'
						this.close(); //关闭对话框
							localStorage.removeItem('Ptoken')
							localStorage.removeItem('Pinfo')
							that.$router.push({name:'fangkong'})
				        },
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
header{
	height: 45px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 1px solid rgba(0,0,0,.05);
}
ul,li{
	margin: 0;
	list-style: none;
	padding: 0;
}
li{
display: flex;
	justify-content: space-between;
	padding:15px;
	font-size: 14px;
	border-bottom: 1px solid rgba(0,0,0,.1);
}
i{
	font-style: normal;
	font-family:'黑体' !important;
	font-size: 20px;
	opacity: .3;
	margin-left: 5px;
}
.exit{
	display: flex;
	justify-content:center;
}
.exit button{
	width: 90%;
	padding: 13px 0;
	border: none;
	border-radius: 5px;
}
li>div{
	display: flex;
	align-items: center;
}
</style>
