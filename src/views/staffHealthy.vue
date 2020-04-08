<template>
  <section class="aui-flexView">
    <header class="aui-navBar aui-navBar-fixed">
      <a href="javascript:history.back(-1);" class="aui-navBar-item">
        <i class="icon icon-return"></i>
      </a>
      <div class="aui-center">
        <span class="aui-center-title">员工健康状况上报</span>
      </div>
      <a href="javascript:;" class="aui-navBar-item">
        <i class="icon icon-sys"></i>
      </a>
    </header>
    <section class="aui-scrollView">
      <div class="aui-view-box">
        <div class="staffHealthy-fir-div">
          <p>企业员工健康状况上报</p>
          <span
            >为了做好新型冠状病毒感染肺炎的防控，请各企业相关负责人每日下班前如实提交企业员工身体健康情况，谢谢配合。</span
          >
        </div>
        <div class="staffHealthy-table">
          <div>
            <div class="staffHealthy-fir-td staffHealthy-start">复工人数</div>
            <div class="staffHealthy-sec-td">
              {{ resumptionNumber || "" }}
              <span class="cursor-blink" style="display:none;">&nbsp;</span>
              <span class="colorHuiSe" v-show="!resumptionNumber"
                >请输入今日复工人数</span
              >
            </div>
            <input
              type="number"
              v-model="resumptionNumber"
              @focus="clickShowCursor($event)"
              @blur="clickNotShowCursor($event)"
            />
          </div>
          <div>
            <div class="staffHealthy-fir-td staffHealthy-start">异常人数</div>
            <div class="staffHealthy-sec-td">
              {{ resumptionUnNumber || "" }}
              <span class="cursor-blink" style="display:none;">&nbsp;</span>
              <span class="colorHuiSe" v-show="!resumptionUnNumber"
                >请输入今日身体异常人数</span
              >
            </div>
            <input
              type="number"
              v-model="resumptionUnNumber"
              @focus="clickShowCursor($event)"
              @blur="clickNotShowCursor($event)"
            />
          </div>
          <div>
            <div class="staffHealthy-fir-td staffHealthy-start">异常名单</div>
            <div class="staffHealthy-sec-td">
              {{ resumptionUnPer || "" }}
              <span class="cursor-blink" style="display:none;">&nbsp;</span>
              <span class="colorHuiSe" v-show="!resumptionUnPer"
                >请输入异常人员名单</span
              >
            </div>
            <input
              type="text"
              v-model="resumptionUnPer"
              @focus="clickShowCursor($event)"
              @blur="clickNotShowCursor($event)"
            />
          </div>
          <div>
            <div class="staffHealthy-fir-td staffHealthy-start">异常描述</div>
            <div class="staffHealthy-sec-td">
              {{ anomaly || "" }}
              <span class="cursor-blink" style="display:none;">&nbsp;</span>
              <span class="colorHuiSe" v-show="!anomaly">请输入异常描述</span>
            </div>
            <input
              type="text"
              v-model="anomaly"
              @focus="clickShowCursor($event)"
              @blur="clickNotShowCursor($event)"
            />
          </div>
          <div>
            <div class="staffHealthy-fir-td staffHealthy-start">密切接触</div>
            <div class="staffHealthy-sec-td">
              {{ resumptionUnPerNumber || "" }}
              <span class="cursor-blink" style="display:none;">&nbsp;</span>
              <span class="colorHuiSe" v-show="!resumptionUnPerNumber"
                >请输入密切接触人数</span
              >
            </div>
            <input
              type="number"
              v-model="resumptionUnPerNumber"
              @focus="clickShowCursor($event)"
              @blur="clickNotShowCursor($event)"
            />
          </div>
          <div>
            <div class="staffHealthy-fir-td staffHealthy-start">接触名单</div>
            <div class="staffHealthy-sec-td">
              {{ contact || "" }}
              <span class="cursor-blink" style="display:none;">&nbsp;</span>
              <span class="colorHuiSe" v-show="!contact"
                >请输入密切接触名单</span
              >
            </div>
            <input
              type="text"
              v-model="contact"
              @focus="clickShowCursor($event)"
              @blur="clickNotShowCursor($event)"
            />
          </div>
          <div>
            <div class="staffHealthy-fir-td staffHealthy-start">接触描述</div>
            <div class="staffHealthy-sec-td">
              {{ contact_describe || "" }}
              <span class="cursor-blink" style="display:none;">&nbsp;</span>
              <span class="colorHuiSe" v-show="!contact_describe"
                >请输入接触描述</span
              >
            </div>
            <input
              type="text"
              v-model="contact_describe"
              @focus="clickShowCursor($event)"
              @blur="clickNotShowCursor($event)"
            />
          </div>
          <div>
            <div class="staffHealthy-fir-td staffHealthy-start">统计人员</div>
            <div class="staffHealthy-sec-td">
              {{ statisticsName || "" }}
              <span class="cursor-blink" style="display:none;">&nbsp;</span>
              <span class="colorHuiSe" v-show="!statisticsName"
                >请输入统计上报人员姓名</span
              >
            </div>
            <input
              type="text"
              v-model="statisticsName"
              @focus="clickShowCursor($event)"
              @blur="clickNotShowCursor($event)"
            />
          </div>
          <div>
            <div class="staffHealthy-fir-td staffHealthy-start">联系手机</div>
            <div class="staffHealthy-sec-td">
              {{ statisticsPhone || "" }}
              <span class="cursor-blink" style="display:none;">&nbsp;</span>
              <span class="colorHuiSe" v-show="!statisticsPhone"
                >请输入统计人员联系手机</span
              >
            </div>
            <input
              type="text"
              v-model="statisticsPhone"
              @focus="clickShowCursor($event)"
              @blur="clickNotShowCursor($event)"
            />
          </div>
          <div>
            <div class="staffHealthy-fir-td staffHealthy-start">审核领导</div>
            <div class="staffHealthy-sec-td">
              {{ statisticsLeader || "" }}
              <span class="cursor-blink" style="display:none;">&nbsp;</span>
              <span class="colorHuiSe" v-show="!statisticsLeader"
                >请输入统计审核领导</span
              >
            </div>
            <input
              type="text"
              v-model="statisticsLeader"
              @focus="clickShowCursor($event)"
              @blur="clickNotShowCursor($event)"
            />
          </div>
        </div>
        <div
          class="staffHealthy-tr staffHealthy-special-marginTop staffHealthy-special-submitPar"
        >
          <span class="staffHealthy-fir-span">
            <span>上传排查详情表</span>
            <div class="staffHealthy-tr">
              <a :href="a" style="color:rgb(40, 116, 255);">下载排查表模板</a>
            </div>
          </span>
          <div class="staffHealthy-sec-div">
            <nut-imagepicker
              @imgMsg="imgMsg1"
              :width="120"
              :height="120"
              :margin="10"
              :imgList.sync="imgList1"
            ></nut-imagepicker>
          </div>
        </div>
        <div class="staffHealthy-table">
          <div>
            <div class="staffHealthy-fir-td">更多备注</div>
            <div class="staffHealthy-sec-td">
              {{ more_remark || "" }}
              <span class="cursor-blink" style="display:none;">&nbsp;</span>
              <span class="colorHuiSe" v-show="!more_remark"
                >如有特殊情况请在这里填写</span
              >
            </div>
            <input
              type="text"
              v-model="more_remark"
              @focus="clickShowCursor($event)"
              @blur="clickNotShowCursor($event)"
            />
          </div>
        </div>
        <div class="staffHealthy-btn-par">
          <button @click="staffHealthySubmit">上报健康状况</button>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: "staffHealthys",
  data() {
    return {
      // 复工人数
      resumptionNumber: "",
      // 异常人数
      resumptionUnNumber: "",
      // 异常名单
      resumptionUnPer: "",
      // 密切接触
      resumptionUnPerNumber: "",
      // 接触名单
      contact: "",
      // 统计人员
      statisticsName: "",
      // 联系手机
      statisticsPhone: "",
      // 审核领导
      statisticsLeader: "",
      // 异常描述
      anomaly: "",
      // 接触描述
      contact_describe: "",
      // 更多备注
      more_remark: "",
      // 图片相关
      imgList1: [],
      imgList11: [],
      imgListValue: [],
      a: "http://fgfcapi.cy-coo.com/down/paicha.docx"
    };
  },
  mounted() {
    // this.$api.getAdress().then(function(value) {
    //         switch (value.data.code){
    //             case 200:
    //                 this.a=value.data.data
    //                 break;
    //             case 500:
    //                 that.$toast.text(value.data.msg)
    //                 break;
    //             default:
    //                 that.$toast.text(value.data.msg)
    //                 break;
    //         }
    //     }
    // )
  },
  methods: {
    imgMsg1(data) {
      const that = this;
      if (data.code == 1) {
        alert("upload");
      }
      this.imgList11 = [];
      for (let i in that.imgList1) {
        that.imgList11.push(that.imgList1[i].src);
      }
    },
    uploadImage1() {
      const that = this;
      this.$api.uploadImage(that.imgList11).then(function(value) {
        that.imgListValue = value.data.url;
        console.log(that.imgListValue);
      });
    },
    staffHealthySubmit() {
      const that = this;
      this.uploadImage1();
      setTimeout(() => {
        // if(
        //     this.resumptionNumber==""||
        //     this.resumptionUnNumber==""||
        //     this.resumptionUnPer==""||
        //     this.resumptionUnPerNumber==""||
        //     this.contact==""||
        //     this.statisticsName==""||
        //     this.statisticsPhone==""||
        //     this.statisticsLeader==""||
        //     this.imgListValue==""||
        //     this.anomaly==""||
        //     this.contact_describe==""||
        //     this.more_remark==""||this.resumptionNumber<this.resumptionUnNumber
        // ){
        //     that.$toast.text("您有重要信息尚未填写或您的数据填写错误")
        //     return ;
        // }
        // 调接口
        that.loading = that.$toast.loading();
        this.$api
          .health_report_enterprise(
            // 参数列表
            this.resumptionNumber,
            this.resumptionUnNumber,
            this.resumptionUnPer,
            this.resumptionUnPerNumber,
            this.contact,
            this.statisticsName,
            this.statisticsPhone,
            this.statisticsLeader,
            this.imgListValue,
            "",
            this.anomaly,
            this.contact_describe,
            this.more_remark
          )
          .then(function(value) {
            switch (value.data.code) {
              case 200:
                // 成功跳转
                that.loading.hide();
                that.$router.push("staffHealthySuccess");
                break;
              case 500:
                that.$toast.text(value.data.msg);
                that.loading.hide();
                break;
              default:
                that.$toast.text(value.data.msg);
                that.loading.hide();
                break;
            }
          });
      }, 2000);
    },
    clickShowCursor(e) {
      e.target.previousElementSibling.firstElementChild.style.display =
        "inline-block";
    },
    clickNotShowCursor(e) {
      e.target.previousElementSibling.firstElementChild.style.display = "none";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/skin/css/tijiao.scss";
@import "../assets/skin/css/jquery-labelauty.scss";
@import "../assets/skin/css/staffHealthy.scss";
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
</style>
<style>
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
</style>
