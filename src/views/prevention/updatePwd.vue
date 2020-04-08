<template>
	<div>
		<TopHeader title="修改密码" isShow='true'>
			<template v-slot:rightBtn>
				<span class="over">完成</span>
			</template>
		</TopHeader>
		<label for="">
			<span>原密码</span>
			<input type="text">
		</label>
		<label for="">
			<span>新密码</span>
			<input type="text">
		</label>
		<label for="">
			<span>确认新密码</span>
			<input type="text">
		</label>
	</div>
</template>

<script>
	import TopHeader from '@/components/TopHeader.vue'
	export default {
		name: "my",
		components:{
			TopHeader
		}
	}
</script>

<style lang="scss" scoped>
.over{
	color: #08ACEE !important;
	text-align: right;
}
label{
	display: flex;
	align-items: center;
	padding: 15px;
	border-bottom: 1px solid rgba(0,0,0,.1);
}
span{
	width: 90px;
	flex-shrink: 0;
}
input{
	outline: none;
	width: 100%;
	border: none;
	box-sizing: border-box;
}
</style>
