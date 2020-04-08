<template>
  <section class="aui-flexView">
    <header class="aui-navBar aui-navBar-fixed">
      <a href @click="gotoIndex" class="aui-navBar-item">
        <i class="icon icon-return"></i>
      </a>
      <div class="aui-center">
        <span class="aui-center-title">上班打卡</span>
      </div>
      <a href="javascript:;" class="aui-navBar-item">
        <i class="icon icon-sys"></i>
      </a>
    </header>
    <section class="aui-scrollView">
      <div class="aui-view-box">
        <div class="disabledStaff-fir-div">
          <span v-show="type == 1">夏丽</span>
          <span v-show="type == 2">未登记人员</span>
          <span v-show="type == 3">未关联机构</span>
          <span>{{ time }}</span>
        </div>
        <div class="disabledStaff-sec-div">
          <img src="../assets/skin/images/clock-fail.png" alt="Stop图标" />
          <span>禁止入内</span>
          <p v-show="type == 1">原因可能是:暂未通过复工审批</p>
          <p v-show="type == 2">原因可能是:未进行注册登记?</p>
          <p v-show="type == 3">原因可能是:未关联相关机构</p>
        </div>
        <div class="disabledStaff-last-div">
          <button v-show="type == 1">
            <a :href="mobile" style="color:#fff">联系企业管理员</a>
          </button>
          <button v-show="type == 2" @click="goToType">立即注册</button>
          <button v-show="type == 3" @click="goToType">关联企业</button>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import $ from "jquery";
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      type: 1,
      mobile: ""
    };
  },
  mounted() {
    this.initData();
    // this.getLocation();
  },
  computed: {
    time() {
      return this.formateTime("yyyy-MM-dd hh:mm:ss", new Date());
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
    // getLocation() {
    //   $(function() {
    //     //--微信JS配置
    //     var str = window.location.href;

    //     if (wx != null && wx != undefined) {
    //       $.getJSON(
    //         "http://www.cy-coo.com/m/wxjs/api.php",
    //         {
    //           STRURL: str
    //         },
    //         function(data) {

    //           wx.config({
    //             debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //             appId: data.appId, // 必填，公众号的唯一标识
    //             timestamp: data.timestamp, // 必填，生成签名的时间戳
    //             nonceStr: data.nonceStr, // 必填，生成签名的随机串
    //             signature: data.signature, // 必填，签名，见附录1
    //             jsApiList: ["openLocation", "getLocation"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    //           });
    //         }
    //       );
    //       wx.ready(function() {
    //         wx.getLocation({
    //           type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    //           success: function(res) {
    //             var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
    //             var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
    //             var speed = res.speed; // 速度，以米/每秒计
    //             var accuracy = res.accuracy; // 位置精度
    //             var url =
    //               "https://apis.map.qq.com/ws/geocoder/v1/?location=" +
    //               latitude +
    //               "," +
    //               longitude +
    //               "&get_poi=1&key=U4RBZ-BFLWO-YDLW5-S4IC4-OCVI5-BXFSW";
    //             // $("#location").attr('href',url);
    //             axios.get(url).then(res => {
    //             }).catch(err=>{
    //                 console.error(err)
    //             })
    //             //alert(url);
    //           }
    //         });
    //       });
    //     }
    //   });
    // },
    gotoIndex() {
      this.$router.push({
        name: index
      });
    },
    goToType() {
      if (this.type == 3) {
        this.$router.push({
          name: "affiliatedEnterprises"
        });
      } else if (this.type == 2) {
        this.$router.push({
          name: "login"
        });
      }
    },
    initData() {
      this.type = this.$route.query.type;
      if (this.type == 1) {
        this.mobile = `tel:${this.$route.query.mobile}`;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/skin/css/tijiao.scss";
@import "../assets/skin/css/jquery-labelauty.scss";
@import "../assets/skin/css/disabled_staff.scss";
ul {
  list-style-type: none;
}
li {
  display: inline-block;
}
li {
  margin: 10px 0;
}
input.labelauty + label {
  font: 12px "Microsoft Yahei";
}
.cursor-blink {
  display: inline-block;
  width: 1px;
  height: 1rem;
  transform: translateY(2px);
  animation: blink 1s infinite steps(1, start);
}
/*这里设置动画blink*/
@keyframes blink {
  0%,
  100% {
    background-color: #000;
    color: #aaa;
  }
  50% {
    background-color: #bbb; /* not #aaa because it's seem there is Google Chrome bug */
    color: #000;
  }
}
.aui-scrollView {
  background: #f7f7f7;
}
</style>
