<template>
	<section class="aui-flexView">
		<header class="aui-navBar aui-navBar-fixed">
            <router-link to="/" class="aui-navBar-item">
				<i class="icon icon-return"></i>
            </router-link>
			<div class="aui-center">
				<span class="aui-center-title">个人资料</span>
			</div>
			<a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-sys"></i>
			</a>
		</header>
		<section class="aui-scrollView">
			<div class="aui-view-box">
                <!-- user-info -->
				<div class="user-info-content">
                    <label>
                        <span>姓名：</span>
                        <span>{{user.real_name}}</span>
                    </label>
                    <label>
                        <span>手机号码：</span>
                        <span>{{user.mobile}}</span>
                    </label>
                    <label>
                        <span>身份证号：</span>
                        <span>{{user.id_card}}</span>
                    </label>
                    <label>
                        <span>性别：</span>
                        <span>{{user.sex=='1'?'男':'女'}}</span>
                    </label>
                    <label>
                        <span>现居住地址：</span>
                        <span>{{user.detail_address}}</span>
                    </label>
                </div>
                <div class="update-button-content">
                    <router-link to="/updateUserinfo">修改个人信息</router-link>
                </div>
			</div>
		</section>
	</section>
</template>

<script>
	export default {
        name: "resumptions",
        data() {
            return {
                user:"",
            }
        },
		mounted(){
			const that = this;
            that.loading = that.$toast.loading();
            that.$api.getUserInfo().then(function(res) {
                if(res.data.code===200){
                    that.loading.hide();
                    that.user=res.data.info;
                }else{
                    that.loading.hide();
                    that.$toast.text(res.data.msg);
                }
            });
        },
        methods: {
            
        },
	};
</script>

<style lang="scss" scoped>
	@import '../assets/skin/css/tijiao.scss';
	@import '../assets/skin/css/jquery-labelauty.scss';
    
	ul{list-style-type: none;}
	li{display: inline-block;}
	li{margin: 10px 0;}
	input.labelauty + label{font:12px "Microsoft Yahei";}

    .aui-view-box{
        min-height: 100%;
        padding-top: 1rem;
    }

    .user-info-content,.update-button-content{
        padding: 0rem 1rem;
        border-radius: 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        background: #ffffff;
        margin: 0.5rem;
        margin-top: 0rem;
    }

    .user-info-content{
        box-shadow: 0px 0px 0.8rem #c0c0c0;
    }
    
    .user-info-content label{
        width: 100%;
        padding: 1rem 0.3rem;
        font-size: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .user-info-content label+label{
        border-top: 1px solid #f2f2f2;
    }

    .update-button-content{
        background: none;
        align-items: center;
        padding: 1rem 0;
    }

    .update-button-content a{
        width: 8rem;
        height: 2rem;
        text-align: center;
        line-height: 2rem;
        white-space: nowrap;
        background: linear-gradient(to right, #0881fc, #06baff);
        color: #fff;
        border-radius: 0.25rem;
        font-size: 10px;
    }

</style>
