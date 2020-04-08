<template>
  <section class="aui-flexView">
    <header class="aui-navBar aui-navBar-fixed">
      <a href="javascript:history.back(-1);" class="aui-navBar-item">
        <i class="icon icon-return"></i>
      </a>
      <div class="aui-center">
        <span class="aui-center-title">上报成功</span>
      </div>
      <a href="javascript:;" class="aui-navBar-item">
        <i class="icon icon-sys"></i>
      </a>
    </header>
    <section class="aui-scrollView">
      <div class="aui-view-box">
        <div class="staffHealthySuccess-par">
          <div class="staffHealthySuccess-img-par">
            <nut-icon type="tick" size="40px" color="#fff"> </nut-icon>
            <p>登记成功!</p>
          </div>
        </div>
        <p class="staffHealthySuccess-p">感谢您对防控工作的支持!</p>
        <div class="staffHealthySuccess-btn-par">
          <button @click="confirm">返回首页</button>
          <button @click="checkStaffSubmitList">
            查看我的物资需求发布记录
          </button>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: "materialSumbitSuccess",
  mounted() {},
  methods: {
    confirm() {
      this.$router.push("/");
    },
    checkStaffSubmitList() {
      this.$router.push({
        name: "materialSumbitRecord"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/skin/css/tijiao.scss";
@import "../../assets/skin/css/jquery-labelauty.scss";
@import "../../assets/skin/css/staffHealthySuccess.scss";
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
