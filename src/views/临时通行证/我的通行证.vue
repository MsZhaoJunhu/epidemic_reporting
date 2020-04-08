<template>
	<div class="包裹">
		<TopHeader title="我的临时通行证" isShow="true" class="header"></TopHeader>
		<div class="txz" v-if="list == null">
			<p>
				<img src="../../assets/skin/images/zwtxz.png" alt="" width="70%">
				
			</p>
			<div class="btnBox">
				<router-link to="/applyTemporary" tag="button">
					申请临时通行证
				</router-link>
			</div>
		</div>
		<div class="list" v-else>
			<div class="btnBox">
				<router-link to="/applyTemporary" tag="button">
					<svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
					 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1675">
						<path d="M916.115386 467.228307 557.971519 467.228307 557.971519 109.085464c0-24.714891-20.056801-44.771693-44.770669-44.771693-24.715915 0-44.772716 20.056801-44.772716 44.771693l0 358.142843L110.285291 467.228307c-24.715915 0-44.771693 20.056801-44.771693 44.771693s20.056801 44.772716 44.771693 44.772716l358.142843 0 0 358.143866c0 24.761963 20.056801 44.770669 44.772716 44.770669 24.713868 0 44.770669-20.008706 44.770669-44.770669L557.971519 556.772716l358.143866 0c24.762987 0 44.771693-20.057825 44.771693-44.772716S940.878372 467.228307 916.115386 467.228307L916.115386 467.228307zM916.115386 467.228307"
						 p-id="1676"></path>
					</svg>
					新增通行证
				</router-link>
			</div>
			<router-link :to="'temporaryDetails?info='+JSON.stringify(item)" class="item_box" v-for="(item,index) in list" :key="index">
				<div style="display: flex; justify-content: space-between;padding-bottom: 10px;">
					<div>
						<h2>
							<span>
								{{item.enterprise_name}}
							</span>
							<button v-if="item.status == 1 && date < item.end_date">待公司审核</button>
							<button v-else-if="item.status == 2 && date < item.end_date">待辖区审核</button>
							<button v-else-if="item.status == 3 && date < item.end_date" class="red">已拒绝</button>
							<button v-else-if="item.status == 4 && date < item.end_date" class="green" >已发放</button>
							<button v-else-if="date > item.end_date" class="gray">已过期</button>
						</h2>
						<div class="info">
							访问有效期：<a>{{item.start_date}}</a> 至 <a>{{item.end_date}}</a>
						</div>
					</div>
					<div class="erweima" v-if="item.status == 4 && item.update_time != item.end_date" @click="selectImg($event)">
						<svg class="icon" style="width: 35px; height: 35px;vertical-align: middle;fill: currentColor;overflow: hidden;"
						 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5689">
							<path d="M112 195.84A83.84 83.84 0 0 1 195.84 112h202.992a83.84 83.84 0 0 1 83.84 83.84v202.992a83.84 83.84 0 0 1-83.84 83.84H195.84A83.84 83.84 0 0 1 112 398.832V195.84zM195.84 176A19.84 19.84 0 0 0 176 195.84v202.992c0 10.96 8.88 19.84 19.84 19.84h202.992a19.84 19.84 0 0 0 19.84-19.84V195.84A19.84 19.84 0 0 0 398.832 176H195.84z m345.488 19.84A83.84 83.84 0 0 1 625.168 112H828.16A83.84 83.84 0 0 1 912 195.84v202.992a83.84 83.84 0 0 1-83.84 83.84H625.184a83.84 83.84 0 0 1-83.84-83.84V195.84z m83.84-19.84a19.84 19.84 0 0 0-19.84 19.84v202.992c0 10.96 8.88 19.84 19.84 19.84H828.16A19.84 19.84 0 0 0 848 398.832V195.84A19.84 19.84 0 0 0 828.16 176H625.184zM112 625.168a83.84 83.84 0 0 1 83.84-83.84h202.992a83.84 83.84 0 0 1 83.84 83.84V828.16A83.84 83.84 0 0 1 398.832 912H195.84A83.84 83.84 0 0 1 112 828.16V625.184z m83.84-19.84a19.84 19.84 0 0 0-19.84 19.84V828.16c0 10.944 8.88 19.824 19.84 19.824h202.992a19.84 19.84 0 0 0 19.84-19.84V625.184a19.84 19.84 0 0 0-19.84-19.84H195.84z m345.488-32a32 32 0 0 1 32-32h88.16a32 32 0 0 1 32 32v86.832h49.088v-86.832a32 32 0 0 1 32-32h95.84a32 32 0 0 1 0 64h-63.84v86.832a32 32 0 0 1-32 32h-113.072a32 32 0 0 1-32-32v-86.832h-24.16v92.592a32 32 0 1 1-64 0v-124.592z m329.088 54.256a32 32 0 0 1 32 32v53.184a32 32 0 0 1-64 0v-53.184a32 32 0 0 1 32-32z m-240.912 150.832a32 32 0 0 1 32-32h134.16a32 32 0 0 1 0 64h-102.16v29.92H838.4v-21.184a32 32 0 0 1 64 0v53.184a32 32 0 0 1-32 32H661.504a32 32 0 0 1-32-32v-93.92z m-56.16-12.832a32 32 0 0 1 32 32v74.752a32 32 0 1 1-64 0v-74.752a32 32 0 0 1 32-32z"
							 p-id="5690"></path>
						</svg>
						我的通行证
					</div>
				</div>
				<div class="time">
					<div>
						<svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
						 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3876">
							<path d="M512 54.288c-252.823 0-457.712 204.847-457.712 457.67 0 252.781 204.93 457.753 457.712 457.753s457.712-204.972 457.712-457.753c0-252.823-204.972-457.67-457.712-457.67zM638.786 703.989l-168.397-150.379v-374.492h83.22v332.881l143.763 122.375-58.588 69.614z"
							 p-id="3877"></path>
						</svg>
						{{item.create_time}}
					</div>
					<svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
					 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4456">
						<path d="M730.564 550.46c-0.36 0.359-0.856 0.449-1.214 0.788l-359.113 394.661c-21.692 21.242-56.657 21.489-78.054 0.518-21.398-20.972-21.173-55.193 0.54-76.459l325.045-357.221-325.698-357.92c-21.69-21.263-21.713-55.689-0.045-76.929 21.691-21.218 56.837-21.196 78.55 0.045l359.966 395.608c21.691 21.241 21.713 55.689 0.022 76.908z"
						 fill="#272536" p-id="4457"></path>
					</svg>
				</div>
			</router-link>
			
		
		</div>
	</div>
</template>

<script>
	import TopHeader from '@/components/TopHeader.vue'
	export default {
		components: {
			TopHeader
		},
		data() {
			return {
				list:[],
				date:''
			}
		},
		created() {
			const that = this
			that.loading = this.$toast.loading();
			this.$api.TemporaryCardList().then(function(res) {
				console.info(res)
				switch (res.data.code) {
					case 200:
						that.loading.hide();
						that.list = res.data.list
						that.date = res.data.date
						break;
					case 500:
						that.loading.hide();
						that.$toast.text(res.data.msg)
						break;
					default:
						break;
				}
			})
		},
		methods: {
			selectImg(e) {
				e.preventDefault();
				this.$router.push('/index/userfugong?type=temporary')
			}
		}
	}
</script>
<style lang="scss" scoped>
	.erweima {
		display: flex;
		flex-direction: column;
		font-size: 10px;
		align-items: center;
		flex-shrink: 0;
		justify-content: center;
		padding-right: 10px;
	}

	.green {
		background: #29D9A6 !important;
	}

	.red {
		background: #F44331 !important;
	}

	.gray {
		background: gray !important;
	}

	.包裹 {
		height: 100%;
		display: flex;
		flex-direction: column;
		background: #f5f4f5;

		.header {
			position: fixed !important;
			background: #fff;
			flex-shrink: 0;
			width: 100%;
			z-index: 99;
		}
	}

	.txz {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	p {
		text-align: center;
		margin-bottom: 40px;
	}

	.btnBox {
		background: red;
		background: #0781FC;
		border: none;
		padding: 10px;
		box-sizing: border-box;
		color: #fff;
		text-align: center;
		width: 90%;
		border-radius: 50px;
		margin: 0 5%;

		button {
			font-size: 15px;
			border: none;
			background: transparent;
			color: #fff;

			svg {
				transform: translateY(-2px);
			}
		}

	}
	.list{
		padding-top: 45px;
	}
	.list .btnBox {
		margin: 15px auto;
	}

	.item_box {
		display: block;
		padding: 15px;
		background: #fff;
		margin-bottom: 10px;

		h2 {
			display: flex;
			font-size: 16px;
			font-weight: normal;
			margin: 0;
			margin-bottom: 7px;

			span {
				display: inline-block;
			}

			button {
				flex-shrink: 0;
				background: #007AFF;
				font-size: 9px;
				border: none;
				height: 16px;
				padding: 0 7px;
				margin-top: 3px;
				color: #fff;
				border-radius: 50px;
				margin-left: 5px;
			}
		}

		div {
			font-size: 12px;
			color: #5A5A5A;

			a {
				color: #007AFF;
			}
		}
	}


	.time {
		font-size: 11px;
		opacity: .5;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: 1px solid rgba(0, 0, 0, .1);
		padding-top: 8px;

		div {
			display: flex;
			align-items: center;

			svg {
				margin-right: 3px;
			}
		}

		svg {
			opacity: .7;
		}
	}
</style>
