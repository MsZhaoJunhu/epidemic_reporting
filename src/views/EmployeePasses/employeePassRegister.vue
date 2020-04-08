<template>
  <div class="employeePassRegister">
    <div class="come-to-visitTime">来访时间:{{ visitTime }}</div>
    <div class="main-container">
      <p class="resident resident-name">
        <span>姓名</span>
        <input type="text" placeholder="请输入姓名" v-model="name" />
      </p>
      <p class="resident resident-IDNum">
        <span>身份证</span>
        <input type="number" placeholder="请输入身份证号" v-model="IDNumber" />
      </p>
      <p class="resident resident-phone">
        <span>电话</span>
        <input
          type="number"
          placeholder="请输入联系方式"
          v-model="concactPhone"
        />
      </p>
	  <p class="resident resident-bodyTemperature" style="display: flex; flex-direction: row;">
	    <span>体温是否正常</span>
		<span style="text-align: right;">
			<label for="zhengchang">
				<input
				id="zhengchang"
				  type="radio"
				  value="true"
				  v-model="isTiwen"
				/>
				正常
			</label>
			<label for="buzhengchang">
				<input
				id="buzhengchang"
				  type="radio"
				  value="false"
				  v-model="isTiwen"
				/>
				异常
			</label>
		</span>
	  </p>
      <p class="resident resident-bodyTemperature" v-show="isTiwen == 'false'">
        <span>体温</span>
        <input
          type="text"
          placeholder="请输入体温值"
          v-model="bodyTemperature"
        />
      </p>
      <p class="resident resident-textarea">
        <span>事项说明</span>
      </p>
      <p class="resident-textarea-info">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="请输入出入的具体事项"
          v-model="textarea"
        >
        </textarea>
      </p>
    </div>
    <div class="resident-submit" @click="handleSubmit">
      <span>提交登记</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
		isTiwen:'true',
      name: this.$route.query.real_name || "", //姓名
      IDNumber: this.$route.query.IDCard || "", //身份证
      concactPhone: this.$route.query.mobile || "", //联系方式
      bodyTemperature: "37", //体温
      textarea: ""
    };
  },
  computed: {
    visitTime() {
      return this.formateTime("yyyy-MM-dd hh:mm:ss", new Date());
    }
  },
  mounted() {
    this.initData();
  },
  watch:{
	  isTiwen(){
		 if( this.isTiwen == 'true'){
			 this.bodyTemperature = 37
		 }else{
			 this.bodyTemperature = ''
		 }
	  }
  },
  methods: {
    formateTime(fmt, date) {
      var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    },
    handleSubmit() {
      let that = this;
      let enterprise_id = this.$route.query.enterprise_id; //测试
      let temperature = this.bodyTemperature;
      let action_explain = this.textarea;
      let address = this.$route.query.address;
      this.$api
        .postEmployeeCard(enterprise_id, temperature, action_explain, address)
        .then(function(res) {
          if (res.data.code == 200) {
            that.$toast.success("操作成功！");
            that.$router.push({
              name: "visitorRegisterSuccess"
            });
          } else if (res.data.code == 500) {
            that.$toast.fail("提交失败！");
          }
        });
    },
    initData() {}
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/skin/css/tijiao.scss";
@import "../../assets/skin/css/jquery-labelauty.scss";
@import "../../assets/skin/css/materialSolicitationRegister.scss";
input,
textarea {
  outline: none;
  border: none;
}
.employeePassRegister {
  height: 100%;
  background: rgb(241, 241, 241);
  // box-sizing: border-box;
  .come-to-visitTime {
    text-align: left;
    padding: 1rem;
    background: #e6ebf6;
  }
  .main-container {
    .resident {
      padding: 1rem;
      background: #fff;
      border: 1px solid #ececec;
      margin-top: -1px;
      span {
        // float:left;
        display: inline-block;
        width: 60%;
      }
      input {
        text-align: left;
        width: 35%;
      }
	  label{
		  margin-left: 10px;
	  }
	  label>input{
		  width: auto;
	  }
    }
    .resident-bodyTemperature {
      margin-top: 1rem;
    }
    .resident-textarea {
      margin-top: 1rem;
      .textarea {
        text-indent: 14px;
      }
    }
  }
  .resident-submit {
    width: 90%;
    height: 40px;
    margin: 1.5rem auto;
    display: flex;
    // background:rgb(39, 107, 235);
    background: linear-gradient(to right, #2971ff, #06baff);
    color: #fff;
    border-radius: 1rem;
    justify-content: center;
    align-items: center;
  }
  .resident-textarea-info {
    textarea {
      width: 100%;
      text-indent: 20px;
    }
  }
}
</style>
