<template>
	<div>
		<TopHeader title="系统公告" isShow='true'>
			<template v-slot:rightBtn>
				<span class="over">完成</span>
			</template>
		</TopHeader>
		<ul>
			<li>
				<div class="top">
					<span>消息标题</span>
					<span>2020-2-2</span>
				</div>
				<p class="content">通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知</p>
			</li>
		</ul>
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
ul,li{
	margin: 0;
	padding: 0;
	font-size: 14px;
}
li{
	padding: 15px ;
	padding-bottom: 0;
	border-bottom: 1px solid rgba(0,0,0,.1);
}
.top{
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.content{
	font-size: 12px;
}
</style>
