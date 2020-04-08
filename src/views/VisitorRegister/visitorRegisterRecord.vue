<template>
  <div class="residentClockinRecord" v-if="showDetail == false">
    <div class="main-container">
      <!-- <div class="onSearch">
        <span><img src="../../assets/skin/images/onSearch.png" alt=""/></span>
        <input
          type="text"
          v-model="time"
          placeholder="默认当天"
          @focus="isActived"
          @change="handleChange"
        />
      </div> -->
      <nut-datepicker
        :is-visible="isVisible"
        type="date"
        title="请选择日期"
        :is-show-chinese="false"
        :defaultValue="StartDate"
        @close="switchPicker"
        @choose="setChooseValue"
      >
      </nut-datepicker>
      <div class="clokin-record">
        <div v-for="(item, index) in records" :key="index" class="record-item">
          <div style="padding:1rem">
            <div class="part">
              <p>{{ item.real_name }}</p>
              <p class="time">{{ item.create_time }}</p>
              <p>{{ item.action_explain }}</p>
              <!-- <p>到公司视察情况</p> -->
            </div>
          </div>
          <div class="arrow-right" @click="getDetail(index)">
            <img src="../../assets/skin/images/arrows-right.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="check-detail" v-else="showDetail == true && detailInfo">
    <h3>个人信息</h3>
    <div style="padding:1rem" class="part">
      <p>姓名：{{ detailInfo.real_name }}</p>
      <p>身份证号：{{ detailInfo.id_card }}</p>
      <p>联系方式：{{ detailInfo.mobile }}</p>
      <p>
        体温：<span style="color:red">{{ detailInfo.temperature }}</span>
      </p>
    </div>
    <h3>出入信息</h3>
    <div style="padding:1rem" class="part">
      <p>来访时间：{{ detailInfo.create_time }}</p>
      <!-- <p>来访事项：到公司观察</p> -->
      <p>来访事项：{{ detailInfo.action_explain }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
      showDetail: false,
      time: "",
      records: [],
      detailInfo: null
    };
  },
  created() {
    this.Get_Date();
    this.getData();
  },
  methods: {
    Get_Date() {
      var date = new Date();
      var month = date.getMonth() + 1;
      this.StartDate = date.getFullYear() + "-" + month + "-" + date.getDate();
    },
    getData() {
      this.$api.getEmployeePassRecord().then(res => {
        if (res.data.code == 200) {
          this.records = JSON.parse(JSON.stringify(res.data.list));
          this.records.forEach(item => {
            item.address = item.address ? item.address : "暂无";
          });
        }
      });
    },
    getDetail(i) {
      this.showDetail = true;
      this.detailInfo = this.records.find((item, index) => index == i);
    },
    isActived() {
      this.isVisible = true;
    },
    switchPicker() {
      this.isVisible = false;
    },
    handleChange(e) {},
    setChooseValue(e) {
      let year = e[0];
      let month = e[1];
      let day = e[2];
      this.time = this.formatTime(year, month, day);
      this.$api.getFilterPassRecord(this.time).then(res => {
        this.records = JSON.parse(JSON.stringify(res.data.list));
        this.records.forEach(item => {
          item.address = item.address ? item.address : "暂无";
        });
      });
    },
    formatTime(year, month, day, str = "y-M-d ") {
      year = year + "";
      month = month + "";
      day = day + "";
      month.length < 2 ? (month = "0" + month) : month;
      day.length < 2 ? (day = "0" + day) : day;
      return `${year}-${month}-${day}`;
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 15px;
  height: 15px;
}
input {
  outline: none;
  border: none;
}
.residentClockinRecord {
  height: 100%;
  .main-container {
    padding: 1.5rem;
     background: #f7f7f7;
    .onSearch {
      padding-left: 0.5rem;
      border-radius: 1rem;
      background: #fff;
      height: 40px;
      line-height: 40px;
      span {
        position: relative;
        top: 0.1rem;
      }
      input {
        padding-left: 0.5rem;
      }
    }
    .clokin-record {
      .record-item {
        background: #fff;
        border-radius: 0.5rem;
        box-shadow: 3px 3px 6px #ccc;
        // padding: 1rem;
        position: relative;
        margin: 1rem 0;
        .part {
          p {
            color: rgb(87, 85, 85);
            margin: 0;
          }
          .time {
            color: #ccc;
            font-size: 15px;
            padding-top: 0.2rem;
            padding-bottom: 0.3rem;
          }
        }
        .arrow-right {
          position: absolute;
          top: 50%;
          left: 90%;
        }
      }
    }
  }
}
.check-detail {
  padding: 1rem;
  background: #f5f5f5;
  height: 100%;
  .part {
    color: rgb(88, 88, 88);
    background: #fff;
    border-radius: 0.5rem;
    box-shadow: 0px 2px 3px rgb(223, 222, 222);
  }
}
</style>
