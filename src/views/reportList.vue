<template>
  <div class="reportRecord">
    <header class="aui-navBar aui-navBar-fixed">
      <a href="javascript:;" class="aui-navBar-item" @click="backHome">
        <i class="icon icon-return"></i>
      </a>
      <div class="aui-center">
        <span class="aui-center-title" v-if="recordType == 'health'"
          >企业健康状况上报记录</span
        >
        <span class="aui-center-title" v-else>企业行为轨迹上报记录</span>
      </div>
      <a class="xiazai" @click="xiazai1()" v-if="recordType == 'health'">
        <svg
          class="icon"
          style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4047"
        >
          <path
            d="M886.4 128H608v64h233.6l104.64 288H672v32a160 160 0 0 1-320 0v-32H77.76L182.4 192H416V128H137.6L0 506.24V1024h1024V506.24zM64 960V544h226.24a224 224 0 0 0 443.52 0H960v416z"
            fill="#54C3F1"
            p-id="4048"
          ></path>
          <path
            d="M393.28 438.72l118.72 118.4 118.72-118.4-45.44-45.44-41.28 41.6V0h-64v434.88l-41.28-41.6-45.44 45.44z"
            fill="#54C3F1"
            p-id="4049"
          ></path></svg
        >导出
      </a>
      <a class="xiazai" @click="xiazai2()" v-else>
        <svg
          class="icon"
          style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4047"
        >
          <path
            d="M886.4 128H608v64h233.6l104.64 288H672v32a160 160 0 0 1-320 0v-32H77.76L182.4 192H416V128H137.6L0 506.24V1024h1024V506.24zM64 960V544h226.24a224 224 0 0 0 443.52 0H960v416z"
            fill="#54C3F1"
            p-id="4048"
          ></path>
          <path
            d="M393.28 438.72l118.72 118.4 118.72-118.4-45.44-45.44-41.28 41.6V0h-64v434.88l-41.28-41.6-45.44 45.44z"
            fill="#54C3F1"
            p-id="4049"
          ></path></svg
        >导出
      </a>
    </header>
    <main>
      <div class="timeSelect">
        <div class="timeSelect-fir-td">
          <svg
            class="icon"
            style="width: 1.5em; height: 1.5em;vertical-align: middle;fill: currentColor;overflow: hidden;"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2021"
          >
            <path
              d="M774.66 954H249.34C166.44 954 99 886.59 99 803.69v-481c0-82.89 67.44-150.33 150.33-150.33h525.33c82.89 0 150.33 67.44 150.33 150.33v481C925 886.59 857.56 954 774.66 954zM249.34 197.39A125.74 125.74 0 0 0 124 322.72v481A125.74 125.74 0 0 0 249.34 929h525.32A125.74 125.74 0 0 0 900 803.69v-481a125.74 125.74 0 0 0-125.34-125.3z"
              fill="#3D9FF9"
              p-id="2022"
            ></path>
            <path
              d="M658.65 82.47l127.91 0 0 232.66-127.91 0 0-232.66Z"
              fill="#C5E3FF"
              p-id="2023"
            ></path>
            <path
              d="M740 327.63h-34.76a59.16 59.16 0 0 1-59.09-59.09V129.07A59.16 59.16 0 0 1 705.24 70H740a59.16 59.16 0 0 1 59.09 59.09v139.45A59.16 59.16 0 0 1 740 327.63zM705.24 95a34.13 34.13 0 0 0-34.09 34.09v139.45a34.13 34.13 0 0 0 34.09 34.09H740a34.13 34.13 0 0 0 34.09-34.09V129.07A34.13 34.13 0 0 0 740 95z"
              fill="#3D9FF9"
              p-id="2024"
            ></path>
            <path
              d="M237.44 82.47l127.91 0 0 232.66-127.91 0 0-232.66Z"
              fill="#C5E3FF"
              p-id="2025"
            ></path>
            <path
              d="M318.76 327.63H284a59.16 59.16 0 0 1-59.09-59.09V129.07A59.16 59.16 0 0 1 284 70h34.73a59.16 59.16 0 0 1 59.09 59.09v139.45a59.16 59.16 0 0 1-59.06 59.09zM284 95a34.13 34.13 0 0 0-34.09 34.09v139.45A34.13 34.13 0 0 0 284 302.63h34.73a34.13 34.13 0 0 0 34.09-34.09V129.07A34.13 34.13 0 0 0 318.76 95zM512 581.7a76.46 76.46 0 1 1 76.46-76.46A76.54 76.54 0 0 1 512 581.7z m0-127.91a51.46 51.46 0 1 0 51.46 51.46A51.51 51.51 0 0 0 512 453.79zM301.39 581.7a76.46 76.46 0 1 1 76.46-76.46 76.54 76.54 0 0 1-76.46 76.46z m0-127.91a51.46 51.46 0 1 0 51.46 51.46 51.51 51.51 0 0 0-51.46-51.46zM722.61 581.7a76.46 76.46 0 1 1 76.46-76.46 76.54 76.54 0 0 1-76.46 76.46z m0-127.91a51.46 51.46 0 1 0 51.46 51.46 51.51 51.51 0 0 0-51.46-51.46zM512 774.58a76.46 76.46 0 1 1 76.46-76.46A76.54 76.54 0 0 1 512 774.58z m0-127.91a51.46 51.46 0 1 0 51.46 51.46A51.51 51.51 0 0 0 512 646.66zM301.39 774.58a76.46 76.46 0 1 1 76.46-76.46 76.54 76.54 0 0 1-76.46 76.46z m0-127.91a51.46 51.46 0 1 0 51.46 51.46 51.51 51.51 0 0 0-51.46-51.47zM722.61 774.58a76.46 76.46 0 1 1 76.46-76.46 76.54 76.54 0 0 1-76.46 76.46z m0-127.91a51.46 51.46 0 1 0 51.46 51.46 51.51 51.51 0 0 0-51.46-51.47z"
              fill="#3D9FF9"
              p-id="2026"
            ></path></svg
          >选择日期:
        </div>
        <div class="timeSelect-sec-td" @click="clickToChooseTime($event)">
          {{ resumptionTime || "" }}
          <span class="colorHuiSe" v-show="!resumptionTime"
            >请选择复工日期</span
          >
        </div>
      </div>
      <nut-datepicker
        :is-visible="isVisible"
        type="date"
        :defaultValue="resumptionTime"
        title="请选择日期"
        :is-show-chinese="false"
        @close="isVisible = false"
        @choose="setChooseValue"
      >
      </nut-datepicker>
      <template v-if="recordType == 'health'">
        <div
          class="item item-error"
          @click="toDetalis(item.user_id, item.create_time)"
          v-for="(item, index) of reportList"
          :key="index"
        >
          <span class="data">{{ item.create_time.split(" ")[0] }}</span>
          <span class="temperature temperature-error"
            >体温:{{ item.temperature }}℃</span
          >
          <div class="situation">
            <span>{{ item.isiting_process || "未填写" }}</span
            ><span v-if="item.contact_explain.length">、</span
            ><span>{{ item.contact_explain }}</span
            ><span v-if="item.contact_crowd">、</span
            ><span>{{ item.contact_crowd }}</span>
          </div>
          <p class="address">姓名：{{ item.reporter_name }}</p>
        </div>
      </template>
      <template v-else>
        <div
          class="item item-error"
          @click="toDetalis(item.user_id, item.create_time)"
          v-for="(item, index) of reportList"
          :key="index"
        >
          <span class="data">{{ item.create_time.split(" ")[0] }}</span>
          <div class="situation">
            <span v-if="item.outside.length"
              >{{ item.outside }},有外出记录</span
            >
            <span v-else>无外出记录</span>
          </div>
          <p class="address">现居住地：{{ item.reporter_address }}</p>
        </div>
      </template>
    </main>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      recordType: this.$route.query.recordType,
      // recordType: "health",
      reportList: [],
      isVisible: false,
      resumptionTime: ""
    };
  },
  mounted() {
    this.resumptionTime = this.getCurrentDate();
    this.getReportList(this.resumptionTime);
  },
  methods: {
    // 获取时间
    getCurrentDate() {
      var timeStr = "-";
      var curDate = new Date();
      var curYear = curDate.getFullYear(); //获取完整的年份(4位,1970-????)
      var curMonth = curDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
      var curDay = curDate.getDate(); //获取当前日(1-31)
      var curWeekDay = curDate.getDay(); //获取当前星期X(0-6,0代表星期天)
      var curHour = curDate.getHours(); //获取当前小时数(0-23)
      var curMinute = curDate.getMinutes(); // 获取当前分钟数(0-59)
      var curSec = curDate.getSeconds(); //获取当前秒数(0-59)
      if (curMonth < 10) {
        if (curDay < 10) {
          var Current =
            curYear + timeStr + "0" + curMonth + timeStr + "0" + curDay;
        } else {
          var Current = curYear + timeStr + "0" + curMonth + timeStr + curDay;
        }
      } else if (curDay < 10) {
        var Current = curYear + timeStr + curMonth + timeStr + "0" + curDay;
      } else {
        var Current = curYear + timeStr + curMonth + timeStr + curDay;
      }
      // var Current= curYear+timeStr+curMonth+timeStr+curDay+' '+curHour+':'+curMinute+':'+curSec;
      // this.datetime=Current;
      return Current;
    },
    setChooseValue(value) {
      this.resumptionTime = value[3];
      this.isVisible = false;
      this.getReportList(this.resumptionTime);
    },
    clickToChooseTime(e) {
      e.stopPropagation();
      this.isVisible = true;
    },
    getReportList(time) {
      const that = this;
      if (this.recordType == "health") {
        this.$api.health_report_list(time).then(function(value) {
          that.reportList = value.data.data;
        });
      } else {
        this.$api.action_track_list(time).then(function(value) {
          that.reportList = value.data.data;
        });
      }
    },
    backHome() {
      history.go(-1);
    },
    toDetalis(id, time) {
      this.$router.push({
        path: "/reportDetails",
        query: {
          recordType: this.recordType,
          id: id,
          time: time
        }
      });
    },
    xiazai1() {
      location.href =
        "http://fgfcapi.cy-coo.com/enterprise/export/health/report?token=" +
        localStorage.getItem("token") +
        "&data=" +
        this.resumptionTime;
    },
    xiazai2() {
      location.href =
        "http://fgfcapi.cy-coo.com/enterprise/export/trajectory/report?token=" +
        localStorage.getItem("token") +
        "&data=" +
        this.resumptionTime;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/skin/css/index.scss";

.reportRecord {
  main {
    background: #fafafa;
    padding: 10px 0;

    .item > * {
      padding-left: 25px;
    }

    .item {
      background: #fff;
      margin: 0 10px 20px 10px;
      padding: 5px 10px;
      font-size: 13px;
      border-radius: 5px;

      .data {
        display: flex;
        align-items: center;
        // background: #4a75c2;
        // padding: 0 10px;
        // color: #fff;
        border-radius: 5px;
        padding: 0;
        color: #007aff;
        font-size: 15px;
      }

      .data:before {
        content: "";
        display: block;
        height: 16px;
        width: 16px;
        background: #1177dd;
        margin-right: 10px;
        border-radius: 50%;
      }

      .temperature {
        float: right;
        color: #70ad47;
      }

      .temperature-error {
        color: #bf0a0a;
      }

      .situation {
        margin: 10px 0;
      }

      .address {
        color: #808080;
        font-size: 12px;
      }
    }

    .item-error {
      background: rgb(245, 245, 245);
    }
  }
}
</style>
<style>
.timeSelect {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem !important;
  margin-bottom: 1rem !important;
}

.xiazai {
  position: absolute;
  right: 15px;
  top: 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
}
</style>
