<template>
	<div id="header">
		<div class="left">
			<slot name='leftBtn'>
				<span class="goBack" @click="goBack()" v-if="isShow"></span>
			</slot>
		</div>
		<h1>{{title}}</h1>
		<div class="right">
			<slot name='rightBtn'>
			</slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: "TopHeader",
		props: {
			isShow:{
				default:false
			},
			title:'',
		},
		methods:{
			goBack(){
				history.go(-1)
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	#header{
		display: flex;
		justify-content: space-between !important;
		align-items: center;
		// padding: 0 15px;
		height: 45px;
		position:relative;
	}
	#header>*{
		text-align: center;
	}
	#header *{
		font-size: 16px !important;
		font-weight: normal !important;
	}
	h1{
		flex-shrink: 0;
		width: 100% !important;
	}
	.left{
		position: absolute;
		left: 15px;
	}
	.right{
		position: absolute;
		right: 15px;
	}
	.goBack{
		transform: rotateZ(-45deg);
		display: block;
		height: 10px;
		width: 10px;
		border: 2px solid #353535;
		border-bottom: none;
		border-right: none;
	}
</style>
