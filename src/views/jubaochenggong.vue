<template>
  <div class="jubaochenggong">
    <header class="aui-navBar aui-navBar-fixed">
      <a href="javascript:;" class="aui-navBar-item">
        <i class="icon icon-return" @click="back"></i>
      </a>
      <div class="aui-center">
        <span class="aui-center-title">城银疫情防控治理平台</span>
      </div>
      <a href="javascript:;" class="aui-navBar-item">
        <i class="icon icon-sys"></i>
      </a>
    </header>
    <div class="cg">举报成功！</div>
    <div class="dibu">
      <p>请前往个人中心查看受理结果</p>
      <p>
        {{count}}秒后前往列表
        <span @click="go">…点击前往</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: ""
    };
  },
  created() {
    this.timeout();
  },
  methods: {
    timeout() {
      const TIME_COUNT = 5;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
            // 跳转到选人加分界面
            this.$router.push("/jubaojilu");
          }
        }, 1000);
      }
    },
    go() {
      this.$router.push("/jubaojilu");
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/skin/css/tijiao.scss";
@import "../assets/skin/css/jquery-labelauty.scss";
.dibu {
  text-align: center;
  margin-top: 20%;
  span {
    color: rgb(115, 115, 212);
  }
}
.jubaochenggong {
  width: 100%;
  height: 100%;
}
.cg {
  height: 220px;
  width: 220px;
  background-color: rgb(120, 172, 240);
  border-radius: 50%;
  margin: auto;
  margin-top: 30%;
  text-align: center;
  line-height: 220px;
  color: white;
  font-size: 22px;
  border: 1.5px solid rgb(29, 28, 28);
}
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
