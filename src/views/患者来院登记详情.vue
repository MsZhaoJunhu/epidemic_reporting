<template>
	<div class="actionReport">
		<div class="saveImg" v-show="fenxiang!=''">
			<span @click="()=>{fenxiang = ''}">×</span>
			<div>
				<img :src="fenxiang" width="100%">
			</div>
			<p>长按图片进行保存，之后就可以分享了哦</p>
		</div>
		<div class="fixed">
			<TopHeader title="入院登记详情" isShow="true" class="header">
				<template v-slot:rightBtn>
					<span class="save" @click="toImage()">保存为图片</span>
				</template>
			</TopHeader>
		</div>
		<ul ref='imageWrapper'>
			<p class="tips">请您自己截图保存,作为就医时的凭证</p>
			<p class="Hname">{{info.infoName}}</p>
			<li>
				<span>姓名</span>
				<span>{{info.name}}</span>
			</li>
			<li>
				<span>身份证号</span>
				<span>{{info.idCode}}</span>
			</li>
			<li>
				<span>电话</span>
				<span>{{info.phone}}</span>
			</li>
			<li>
				<span>体温</span>
				<span>{{info.tiwen}}</span>
			</li>
			<li>
				<span>症状</span>
				<span>{{info.symptom}}</span>
			</li>
			<li>
				<span>来院事由</span>
				<span v-if="info.reason==1">门诊/急诊就诊</span>
				<span v-else-if="info.reason==2">住院</span>
				<span v-else-if="info.reason==3">探视</span>
				<span v-else-if="info.reason==4">办公</span>
				<span v-else-if="info.reason==5">其他</span>
			</li>
			<li class="col">
				<span>14天内是否有武汉及周边或其他有病例报告社区的旅行史或居住史</span>
				<span>{{info.lvyou==1?"有":"无"}}</span>
			</li>
			<li class="col">
				<span>14天内是否曾接触过来自武汉及周边或来自有病例报告社区的发热或有呼吸道症状的患者</span>
				<span>{{info.huanzhe==1?"有":"无"}}</span>
			</li>
			<li class="col">
				<span>有无新型冠状病毒肺炎确诊或疑似病例接触史</span>
				<span>{{info.jiechushi==1?"有":"无"}}</span>
			</li>
			<li class="col">
				<span>有无密切接触持续发热（三天以上）病人</span>
				<span>{{info.bingren==1?"有":"无"}}</span>
			</li>
			<li class="col">
				<span>所在社区、楼栋、单位等有无聚集性发病</span>
				<span>{{info.shequ==1?"有":"无"}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
	import html2canvas from "html2canvas"
	import TopHeader from '../components/TopHeader.vue'
	export default {
		name: '',
		components: {
			TopHeader
		},
		data() {
			return {
				fenxiang:'',
				info:JSON.parse(localStorage.getItem('form'))
			}
		},
		created() {
			
		},
		methods:{
			toImage() {
				const that = this
				html2canvas(this.$refs.imageWrapper).then(canvas => {
					let dataURL = canvas.toDataURL("image/png");
					this.imgUrl = dataURL;
					that.fenxiang = this.imgUrl
					if (this.imgUrl !== "") {
						this.dialogTableVisible = true;
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.saveImg {
		position: fixed;
		width: 100vw;
		height: 100vh;
		z-index: 999999;
		top: 0;
		background: rgba(0, 0, 0, .5);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	
		span {
			font-size: 40px;
			color: rgba(255, 255, 255, .7);
			margin-bottom: 30px;
		}
	
		div {
			width: 70%;
			height: 50%;
			display: flex;
			align-items: center;
			overflow: hidden;
			border-radius: 5px;
		}
	
		p {
			padding-top: 20px;
			color: rgba(255, 255, 255, .5);
			font-size: 12px;
		}
	}
	.save{
		color: #007AFF;
		font-size: 12px !important;
	}	
	.tips{
		background: #f8e71c;
		color: rgba(0,0,0,.8);
		padding:5px 15px;
		font-size: 12px;
	}
	.Hname{
		font-size: 25px;
		color: #353535;
		opacity: .8;
		text-align: center;
		box-sizing: border-box;
		padding: 10px 0;
		span{
			font-size: 18px !important;
		};
	}
	.col{
		display: flex;
		flex-direction: column;
		span:last-of-type{
			margin-top: 10px;
		}
	}
	.check {
		color: #007AFF;
		box-sizing: border-box;
		border-bottom: 2px solid #007AFF;
	}

	.tabbar {
		display: flex;
		background: #FFFFFF;
		justify-content: space-around;

		span {
			font-size: 13px;
			padding: 10px;
		}
	}

	.header {
		background: #fff;
	}

	.actionReport {
		height: 100%;
		display: flex;
		flex-direction: column;
		background: rgba(0, 0, 0, .05);
	}

	ul,
	li {
		padding: 0;
		margin: 0;
	}
	ul{
		height: 100%;
		overflow-y:scroll;
	}

	li {
		display: flex;
		margin: 10px;
		border-radius: 5px;
		background: rgba(255, 255, 255, .8);
		padding: 10px 15px;
		font-size: 12px;
		justify-content: space-between;
		span:last-of-type{
			opacity: .5;
		}
	}

	p {
		margin: 0;
		font-size: 13px;
		opacity: .6;
	}

	h4 {
		font-weight: normal;
		margin: 0;
	}

	.operate {
		font-size: 12px;
		display: flex;
		width: 100%;
		justify-content: space-around;
		align-items: center;
		span{
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 10px;
			svg{
				margin-bottom: 10px;
			}
		}
	}

	.isTijiao {
		display: flex;
		align-items: center;
		font-size: 12px;

	}

	.tijiao {
		border-radius: 50%;
		height: 20px;
		width: 20px;
		background: #007AFF;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 5px;
	}

	.tijiao:after {
		content: '';
		display: block;
		height: 5px;
		width: 10px;
		border: 3px solid #fff;
		border-top: 0;
		border-right: 0;
		transform: rotateZ(-45deg) translateY(-2px) translateX(1px);
	}

</style>
