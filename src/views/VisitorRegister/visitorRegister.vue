<template>
  <div class="visitorRegister">
    <div class="come-to-visitTime">来访时间:{{visitTime}}</div>
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
        <input type="number" placeholder="请输入联系方式" v-model="concactPhone" />
      </p>
      <p class="resident resident-bodyTemperature">
        <span>体温</span>
        <input type="text" placeholder="请输入体温值" v-model="bodyTemperature" />
      </p>
      <p class="resident resident-textarea">
        <span>事项说明</span>
      </p>
      <p class="resident-textarea-info">
        <textarea name id cols="30" rows="10" placeholder="请输入出入的具体事项" v-model="textarea"></textarea>
      </p>
    </div>
    <div class="resident-submit" @click="handleSubmit">
      <span>提交登记</span>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import axios from "axios";
export default {
  data() {
    return {
      // visitTime:'',
      name: "", //姓名
      IDNumber: " ", //身份证
      concactPhone: "", //联系方式
      bodyTemperature: "", //体温
      textarea: "",
      locationAddress: "", //来访登记人员的地址
      latitude:"",
      longitude:"",
    };
  },
  computed: {
    visitTime() {
      return this.formateTime("yyyy-MM-dd hh:mm:ss", new Date());
    }
  },
  mounted() {
    this.getLocation()
    // this.initDate();
    // this.getLocation();
  },
  methods: {
    initDate() {
      if(localStorage.getItem("UserInfo")){ //如果来访人员已经登记 则在输入体温登记的时候自动获取字段信息
          let personInfo = JSON.parse(localStorage.getItem('UserInfo'))
          this.name = personInfo.real_name||''
          this.IDNumber = personInfo.id_card || ''
          this.concactPhone = personInfo.mobile || ''
      }
    },
    getLocation(){
      let that = this;
    that.loading = that.$toast.loading();
    navigator.geolocation.getCurrentPosition(function(position){
      let longitude = position.coords.longitude;
      let latitude = position.coords.latitude
        that.$jsonp("https://apis.map.qq.com/ws/geocoder/v1/", {
                    location: `${latitude},${longitude}`,
                    get_poi: "1",
                    key: "U4RBZ-BFLWO-YDLW5-S4IC4-OCVI5-BXFSW",
                    output: "jsonp"
                  })
                  .then(
                    response => {
                      that.loading.hide()
                      that.locationAddress = response.result.address;
                      that.initDate();
                    },
                    function(err) {}
                  ).catch(err=>{
                    that.loading.hide()
                    that.locationAddress='暂无'
                    that.initDate()
                    
                  });
    },function(err){ 
      that.loading.hide()
       that.locationAddress = '暂无'
       that.initDate()
    });
    },
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
      let address = this.locationAddress;
      let enterprise_id = this.$route.query.companyId;
      let temperature = this.bodyTemperature;
      let actions_explain = this.textarea;
    if(enterprise_id){  
      this.$api
        .postEmployeeCard(enterprise_id, temperature, actions_explain, address)
        .then(res => {
          if (res.data.code == 200) {
            that.$router.push({
              name: "visitorRegisterSuccess"
            });
          } else if (res.data.code == 500) {
            that.$toast.fail("操作失败！");
          }
        })
        .catch(err => {});
    }else{
      that.$toast.fail('请登录！')
      setTimeout(()=>{
        that.$router.push({
          name:'reg'
        })
      },500)
    }
    }
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
.visitorRegister {
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