<template>
	<div class="actionReport">
		<TopHeader title="行动轨迹上报" isShow="true"></TopHeader>
		<main>
			<div class="form-box">
				<div class="item">
					<div class="label">
						<span class="item-title point">是否有外出</span>
						<span>
							<div class="input-radio">
								<input id="z1" type="radio" value="true" v-model="is_outside" />
								<label for="z1">是</label>
							</div>
							<div class="input-radio">
								<input id="z2" type="radio" value="false" v-model="is_outside" />
								<label for="z2">否</label>
							</div>
						</span>
					</div>
					<template v-if="is_outside == 'true'">
						<label>
							<span>外出时间及交通工具</span>
							<input type="text" class="inputlong" v-model="outside" placeholder="请详细填写" />
						</label>
						<label>
							<span>返回时间及交通工具</span>
							<input type="text" class="inputlong" v-model="inside" placeholder="请详细填写" />
						</label>
						<label>
							<span>外出目的地</span>
							<input type="text" class="inputlong" v-model="target" placeholder="请简要写出目的地" />
						</label>
						<label style="flex-direction: column;align-items: flex-start;">
							<span>接触人员名单</span>
							<textarea type="text" class="inputlong" v-model="contact_person" placeholder="请输入接触人员名单" />
						</label>
						<label style="flex-direction: column;align-items: flex-start;">
							<span>详细备注（非必填）</span>
							<textarea type="text" class="inputlong" v-model="remarks" placeholder="请详细备注" />
						</label>
					</template>
				</div>
				<div class="item">
					<div class="label">
						<span class="item-title point">是否是本人(被上报人信息)</span>
						<span>
							<div class="input-radio">
								<input id="z3" type="radio" value="true" v-model="type" />
								<label for="z3">是</label>
							</div>
							<div class="input-radio">
								<input id="z4" type="radio" value="false" v-model="type" />
								<label for="z4">否</label>
							</div>
						</span>
					</div>
					<template>
						<label>
							<span>被上报人姓名</span>
							<input type="text" class="inputlong" v-model="reporter_name" placeholder="被上报人姓名" :readonly="type == 'true'"/>
						</label>	
						<label>
							<span>被上报人联系方式</span>
							<input type="text" class="inputlong" v-model="mobile" placeholder="被上报人联系方式" :readonly="type == 'true'"/>
						</label>
						<label>
							<span>被上报人身份证</span>
							<input type="text" class="inputlong" v-model="reporter_id_card" placeholder="被上报人身份证" :readonly="type == 'true'"/>
						</label>	
						<label>
							<span>被上报人现居住地</span>
							<input type="text" class="inputlong" v-model="reporter_address" placeholder="被上报人现居住地" />
						</label>	
					</template>
				</div>
			</div>
			<div class="submitReport">
				<button @click="submit">上报行为轨迹</button>
			</div>
		</main>
	</div>
</template>

<script>
	import TopHeader from '../components/TopHeader.vue'
	export default {
		name: '',
		components:{
			TopHeader
		},
		data() {
			return {
				reporter_name: '',
				reporter_address: '',
				type: "false",
				mobile: '',
				is_outside: "false",
				outside: '',
				inside: '',
				target: '',
				contact_person: '',
				remarks: '',
			}
		},
		watch:{
			type(){
				if(this.type=='true'){
					const user = JSON.parse(localStorage.getItem('UserInfo'))
					this.reporter_name = user.real_name
					this.reporter_id_card = user.id_card
					this.mobile = user.mobile
				}else{
					this.reporter_name = ''
					this.reporter_id_card = ''
					this.mobile = ''
				}
			}
		},
		methods: {
			backTo() {
				this.$router.push({
					path: '/affiliatedEnterprises'
				})
			},
			submit() {
				const that = this
				if (
					this.reporter_name == null ||
					this.reporter_address == null ||
					this.type == null ||
					this.mobile == null ||
					this.is_outside == null
					// this.outside == '' ||
					// this.inside == '' ||
					// this.target == '' ||
					// this.contact_person == '' ||
					// this.remarks == ''
				) {
					this.$toast.text('请填写完成之后进行提交');
					return
				}
				const is_outside = this.type == 'true' ? 1 : 0
				const type = this.type == 'true' ? 1 : 2
				that.loading = that.$toast.loading();
				this.$api.action_track(
					this.reporter_name,
					this.reporter_address,
					type,
					this.mobile,
					is_outside,
					this.outside,
					this.inside,
					this.target,
					this.contact_person,
					this.remarks,
					this.reporter_id_card
				).then(function(value) {
					console.info(value)
					switch (value.data.code) {
						case 200:
						that.loading.hide();
							that.$router.push({
								path: '/submitsuccess',
								query: {
									record: 'active'
								}
							})
							break;
						case 500:
						that.loading.hide();
							that.$toast.text(value.data.msg)
							break;
						default:
							break;
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/assets/skin/css/index.scss";
	*{
		color: rgba(0,0,0,.8);
	}
	.actionReport {
		.aui-navBar {
			background: #4472c4;

			.aui-center-title {
				color: #fff;
			}
		}

		.form-box {
			padding:0 15px;
			padding-bottom: 50px;

			.item {
				position: relative;
				.point:before {
					position: absolute;
					content: "*";
					color: red;
					left: -10px;
					top: 5px;
				}

				.item-title {
					margin-right: 10px;
				}

				.selection {
					.selection-item {
						display: inline-block;
						background: #a5a5a5;
						border: 1px solid #787878;
						border-radius: 5px;
						margin-right: 5px;
						margin-bottom: 5px;
						padding: 0 10px;
						color: #fff;
						height: 35px;
						font-size: 13px;
						line-height: 30px;
					}

					.selection-item:active {
						background: #4472c4;
						border: 1px solid #2f528f;
					}
				}
			}
		}

		.submitReport {
			z-index: 9;
			background: #fff;
			position: fixed;
			height: 50px;
			bottom: 0;
			right: 0;
			left: 0;
			text-align: center;

			button {
				width: 93%;
				border: 1px solid #2f528f;
				border-radius: 10px;
				background: #4472c4;
				color: #fff;
				height: 40px;
				margin: 5px 0;
			}
		}
	}
	.input-radio {
	  // 单选框
	  margin-left: 20px;
	  input[type="radio"] {
	    
	    // 将原生单选框透明
	    opacity: 0;
		position: absolute;
	
	    // 紧接在单选框后面的标签，用于显示文字并作为伪元素的载体
	    + label {
			padding:0 10px;
			border:none;
	      position: relative;
	      cursor: pointer;
	      
	      // 下面使用伪元素模拟单选框
	
	      // 圆形外边线
	      &::before {
	        content: '';
	        position: absolute;
	        border-radius: 50%;
	        width: 18px;
	        height: 18px;
	        border: 1px solid #007AFF;
			left: -20px;
	      }
	      
	      // 实心圆，用于选中状态的显示
	      &::after {
	        content: '';
			left: -16px;
			// top: 4px;
	        position: absolute;
	        border-radius: 50%;
	        width: 12px;
	        height: 12px;
	        // 缩放动效，不显示
	        transform: scale(0);
	      }
	    }
	    
	    // 单选框的选中状态，为其添加 checked 属性
	    &:checked {
	      + label {
	        &::before {
	          border-color: #007AFF;
	        }
	        &::after {
	          background-color: #007AFF;
	          // 缩放动效，放大到正常大小
	          transform: scale(1);
	          transition: all .3s;
	        }
	      }
	    }
	
	    // hover 状态
	    &:hover {
	      + label::before {
	        border-color: #007AFF;
	      }
	    }
	    
	    // focus 状态
	    &:focus {
	      + label::before {
	        box-shadow: 0 0 6px #007AFF;
	      }
	    }
	  }
	}
	.label,label{
		padding: 15px 0;
		border-bottom: 1px solid rgba(0,0,0,.1);
		display: flex;
		justify-content: space-between;
		align-items: center;
		span{
			display: flex;
			flex-shrink: 0;
			
		}
		input{
			text-align: right;
			margin: 0;
			border: none;
		};
	}
	textarea{
		border: none;
		margin-top: 10px;
	}
</style>
