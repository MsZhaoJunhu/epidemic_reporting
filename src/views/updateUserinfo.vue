<template>
	<section class="aui-flexView">
		<header class="aui-navBar aui-navBar-fixed">
			<a href="javascript:history.back(-1);" class="aui-navBar-item">
				<i class="icon icon-return"></i>
			</a>
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
                        <input type="text" v-model="real_name">
                    </label>
                    <label>
                        <span>身份证号：</span>
                        <input type="number" v-model="id_card">
                    </label>
                    <label>
                        <span>性别：</span>
                        <select v-model="sex">
                            <option value="1" :selected="sex=='1'">男</option>
                            <option value="2" :selected="sex=='2'">女</option>
                        </select>
                    </label>
                    <label>
                        <span>现居住地址：</span>
                        <input type="text" v-model="detail_address">
                    </label>
                </div>
                <div class="update-button-content">
                    <button @click="preservation">保存</button>
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
                real_name:"",
                id_card:"",
                sex:"",
                detail_address:"",
            }
        },
		mounted(){
			const that = this;
            that.loading = that.$toast.loading();
            that.$api.getUserInfo().then(function(res) {
                if(res.data.code===200){
                    that.loading.hide();
                    that.real_name=res.data.info.real_name;
                    that.id_card=res.data.info.id_card;
                    that.sex=res.data.info.sex;
                    that.detail_address=res.data.info.detail_address;

                }else{
                    that.loading.hide();
                    that.$toast.text(res.data.msg);
                }
            });
        },
        methods: {
            preservation(){
                const that = this;
                console.log(that.id_card)
                if(that.real_name==''||that.id_card==''||that.sex==''||that.detail_address==''){
                    that.$toast.text('您尚有未填写的内容哦!');
                    return ;
                }else{
                    that.loading = that.$toast.loading();
                    that.$api.updateUserinfo(that.real_name,that.sex,that.id_card,that.detail_address).then(function(res) {
                        if(res.data.code===200){
                            that.loading.hide();
                            if(res.data.status=='1'){
                                that.$toast.text('修改成功!');
                                that.$router.push('checkUserinfo')
                            }else{
                                that.$toast.text(res.data.msg);
                            }
                        }else{
                            that.loading.hide();
                            that.$toast.text(res.data.msg);
                        }
                    });
                }
            }
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

    .user-info-content label input,.user-info-content label select{
        border: 0;
        text-align: right;
    }

    .user-info-content label select{
        width: 3rem;
    }

    .user-info-content label+label{
        border-top: 1px solid #f2f2f2;
    }

    .update-button-content{
        background: none;
        align-items: center;
        padding: 1rem 0;
    }

    .update-button-content button{
        width: 8rem;
        height: 2rem;
        text-align: center;
        line-height: 2rem;
        white-space: nowrap;
        background: linear-gradient(to right, #0881fc, #06baff);
        color: #fff;
        border-radius: 0.25rem;
        font-size: 10px;
        border: 0;
    }

</style>
