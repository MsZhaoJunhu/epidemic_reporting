<template>
	<div class="actionReport">
		<div class="fixed">
			<TopHeader title="组织员工列表" isShow="true" class="header"></TopHeader>
			<!-- <div class="tabbar">
				<span :class="change==0?'check':''" @click="change = 0">健康上报</span>
				<span :class="change==1?'check':''" @click="change = 1">行动轨迹</span>
				<span :class="change==1?'check':''" @click="change = 1">行动轨迹</span>
				<span>今日全部未提交</span>
			</div> -->
			<div class="tabbar">
				<router-link to="/reportList?recordType=health" tag="span">健康上报记录</router-link>
				<router-link to="/reportList" tag="span">行动轨迹记录</router-link>
			</div>
		</div>
		<div style="padding-top: 80px;">
			<ul v-if="change == 0">
				<li v-for="item in list" :key>
					<div class="info">
						<div class="head">

						</div>
						<div>
							<h4>{{item.real_name}}</h4>
							<p>{{item.mobile}}</p>
						</div>
						<!-- <div class="isTijiao" v-if="item.isHealthReport == 1">
							<font color="#007AFF">已提交</font>
							<i class="tijiao"></i>
						</div>
						<div class="isTijiao" v-else>
							<font color="orangered">未提交</font>
						</div> -->
					</div>
					<div class="operate">
						<!-- <router-link to="" tag="span">
							<svg class="icon" style="width: 2em; height: 2em;vertical-align: middle;fill: currentColor;overflow: hidden;"
							 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2773">
								<path d="M731.788 0.007H330.084C168.975 0.007 37.9 131.081 37.9 292.191v99.579c0 15.77 12.782 28.554 28.554 28.554s28.554-12.785 28.554-28.554v-99.58c0-129.62 105.455-235.075 235.076-235.075h401.704c129.62 0 235.075 105.455 235.075 235.076v401.707c0 129.62-105.455 235.07-235.075 235.07H330.084c-129.62 0-235.076-105.45-235.076-235.07V574.517h116.124a28.552 28.552 0 0 0 26.017-16.786l26.016-57.516L370.51 761.636a28.55 28.55 0 0 0 27.4 17.691 28.561 28.561 0 0 0 26.116-19.547l138.99-419.023 58.463 206.88c3.474 12.297 14.7 20.791 27.478 20.791h224.63c15.771 0 28.553-12.782 28.553-28.554s-12.782-28.554-28.554-28.554H670.564l-77.882-275.606c-3.413-12.069-14.3-20.5-26.837-20.78-12.364-0.363-23.796 7.649-27.745 19.555l-144.027 434.19-103.229-251.397a28.542 28.542 0 0 0-25.91-17.701c-11.266-0.404-21.824 6.397-26.52 16.781l-45.703 101.047H28.576C12.804 517.409 0.02 530.19 0.02 545.963s12.783 28.554 28.555 28.554H37.9v119.381c0 161.108 131.075 292.178 292.184 292.178h401.704c161.113 0 292.183-131.07 292.183-292.178V292.191c0-161.11-131.07-292.184-292.183-292.184z"
								 p-id="2774"></path>
							</svg>
							健康状况
						</router-link>
						<router-link to="" tag="span">
							<svg class="icon" style="width: 2em; height: 2em;vertical-align: middle;fill: currentColor;overflow: hidden;"
							 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4486">
								<path d="M629.876364 346.833455c0 28.602182-14.312727 58.088727-27.042909 75.170909L512 524.8l-89.995636-101.515636c-12.986182-20.293818-27.880727-47.313455-27.880728-76.450909A117.992727 117.992727 0 0 1 512 228.957091a118.016 118.016 0 0 1 117.899636 117.876364m-299.752727 0c0 45.730909 20.270545 83.316364 38.772364 112.174545l106.705454 125.160727a44.497455 44.497455 0 0 0 72.704 0.116364l106.356364-124.695273c18.944-25.530182 39.214545-68.561455 39.214545-112.756363 0-100.305455-81.594182-181.876364-181.899636-181.876364-100.282182 0-181.876364 81.594182-181.876364 181.876364m135.354182 10.798545a46.545455 46.545455 0 1 0 93.090909 0 46.545455 46.545455 0 0 0-93.090909 0M174.545455 139.636364h530.199272c55.784727 0 105.495273 41.402182 109.521455 97.024a104.331636 104.331636 0 0 1-49.245091 96.395636c-10.542545 6.562909-17.384727 17.664-17.384727 30.091636 0 27.298909 30.021818 44.218182 53.294545 29.952a174.429091 174.429091 0 0 0 82.292364-168.843636C873.216 135.098182 793.762909 69.818182 704.023273 69.818182H174.568727a34.909091 34.909091 0 1 0 0 69.818182m651.636364 488.727272H202.472727c-54.690909 0-103.563636-39.866182-108.893091-94.277818a104.820364 104.820364 0 0 1 104.215273-115.2h43.636364a34.909091 34.909091 0 1 0 0-69.818182H205.288727c-89.506909 0-170.007273 64.116364-180.712727 152.971637C11.799273 607.883636 94.487273 698.181818 197.818182 698.181818h623.709091c54.644364 0 103.563636 39.866182 108.869818 94.254546A104.843636 104.843636 0 0 1 826.181818 907.636364h-744.727273a34.909091 34.909091 0 1 0 0 69.818181h738.676364c88.669091 0 167.819636-63.604364 179.106909-151.575272A174.754909 174.754909 0 0 0 826.181818 628.363636"
								 p-id="4487"></path>
							</svg>
							行动轨迹
						</router-link> -->
						<router-link :to="{name:'employeeInfo',params:{id:item.user_id}}" tag="span">
							<svg class="icon" style="width: 2em; height: 2em;vertical-align: middle;fill: currentColor;overflow: hidden;"
							 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4646">
								<path d="M669.4 896.3c-61.7 0-119.7-24-163.3-67.6-43.6-43.7-67.6-101.7-67.6-163.4s24-119.7 67.6-163.3 101.6-67.6 163.3-67.6 119.7 24 163.3 67.6 67.6 101.6 67.6 163.3c0 61.7-24 119.7-67.6 163.3-43.6 43.7-101.6 67.7-163.3 67.7z m0-391.9c-88.7 0-160.9 72.2-160.9 160.9s72.2 160.9 160.9 160.9S830.3 754 830.3 665.3c0.1-88.7-72.1-160.9-160.9-160.9zM919.9 950.1c-8.4 0-16.8-3-23.5-9.1l-109-99.1c-14.3-13-15.4-35.1-2.4-49.4 13-14.3 35.1-15.4 49.4-2.4l109 99.1c14.3 13 15.4 35.1 2.4 49.4-6.9 7.7-16.4 11.5-25.9 11.5zM388.5 954.2H104.1c-19.3 0-35-15.7-35-35V104.8c0-19.3 15.7-35 35-35h780c19.3 0 35 15.7 35 35v254.5c0 19.3-15.7 35-35 35s-35-15.7-35-35V139.8h-710v744.4h249.4c19.3 0 35 15.7 35 35s-15.6 35-35 35zM775.1 279.2h-568c-19.3 0-35-15.7-35-35s15.7-35 35-35h568c19.3 0 35 15.7 35 35s-15.6 35-35 35zM459.7 467H210.9c-19.3 0-35-15.7-35-35s15.7-35 35-35h248.7c19.3 0 35 15.7 35 35s-15.6 35-34.9 35z"
								 p-id="4647"></path>
							</svg>
							个人信息
						</router-link>
					</div>
				</li>
			</ul>
			<ul v-else>
				<li v-for="item in list" :key>
					<div class="info">
						<div class="head">

						</div>
						<div>
							<h4>{{item.real_name}}</h4>
							<p>{{item.mobile}}</p>
						</div>
						<div class="isTijiao" v-if="item.isTrajectoryReport == 1">
							<font color="#007AFF">已提交</font>
							<i class="tijiao"></i>
						</div>
						<div class="isTijiao" v-else>
							<font color="orangered">未提交</font>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import TopHeader from '../components/TopHeader.vue'
	export default {
		name: '',
		components: {
			TopHeader
		},
		data() {
			return {
				change: 0,
				list: [],
				page: 1
			}
		},
		created() {
			this.getList();
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll, true)
		},
		methods: {
			handleScroll() {
				//变量scrollTop是滚动条滚动时，距离顶部的距离
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				//变量windowHeight是可视区的高度
				var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
				//变量scrollHeight是滚动条的总高度
				var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
				//滚动条到底部的条件
				if (parseInt(scrollTop + windowHeight) == scrollHeight) {
					//写后台加载数据的函数
					this.getList()
				}
			},
			getList() {
				const that = this
				that.loading = that.$toast.loading();
				this.$api.enterpriseUserList(that.page).then(function(res) {
					console.info(res)
					switch (res.data.code) {
						case 200:
							for (let i in res.data.list) {
								that.list.push(res.data.list[i])
							}
							if (res.data.list != '') {
								that.page++
							}
							that.loading.hide()
							break;
						case 500:
							that.loading.hide()
							break;
						default:
							break;
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
		background: rgba(0, 0, 0, .05);
	}

	ul,
	li {
		padding: 0;
		margin: 0;
	}

	li {
		display: flex;
		margin: 10px;
		border-radius: 5px;
		background: rgba(255, 255, 255, .8);
		padding: 10px 30px;
	}

	p {
		margin: 0;
		margin-top: 5px;
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
		justify-content: flex-end;
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

	.fixed {
		position: fixed;
		z-index: 99;
		width: 100%;
		top: 0;
	}
</style>
