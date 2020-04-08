<template>
  <section class="aui-scrollView">
    <div class="aui-flex" style="padding-top:0">
      <div class="aui-shop-user">
        <img src="../assets/skin/images/user-logo-004.png" alt="" />
      </div>
      <div class="aui-flex-box">
        <h2 v-if="link == 'mycenter'">{{ info.real_name }}</h2>
        <h2 v-else>{{ info.name }}</h2>
        <div class="aui-vip-box">
          <em style="font-style:normal;">
            {{ link == "mycenter" ? "个人用户" : "企业用户" }}
          </em>
          <i v-if="link == 'mycompany'">{{ info.mobile }}</i>
          <i v-else>{{ info.mobile }}</i>
        </div>
      </div>
    </div>
    <!-- <div class="aui-flex aui-flex-mar">
      <router-link to="" tag="div" class="aui-flex-box aui-flex-box-one">
        <h3><i class="icon icon-order"></i>物资列表</h3>
      </router-link>
      <router-link
        to="/materialDemandList"
        tag="div"
        class="aui-flex-box aui-flex-box-two"
      >
        <h3><i class="icon icon-full"></i>发布物资</h3>
      </router-link>
    </div> -->
    <div class="aui-flex aui-flex-mar">
      <router-link
        to="/materialSumbitRecord"
        tag="div"
        class="aui-flex-box aui-flex-box-three"
      >
        <h3><i class="icon icon-order2"></i>需求列表</h3>
      </router-link>
      <router-link
        to="/materialDemandRelease"
        tag="div"
        class="aui-flex-box aui-flex-box-four"
      >
        <h3><i class="icon icon-full2"></i>发布需求</h3>
      </router-link>
    </div>
    <div class="divHeight b-line"></div>
    <div class="aui-course-list">
      <a href="javascript:;" class="aui-flex b-line">
        <div class="aui-flex-box">
          <h4>我的征集记录</h4>
        </div>
        <div class="aui-arrow">
          <p>3</p>
        </div>
      </a>
      <a href="javascript:;" class="aui-flex b-line">
        <div class="aui-flex-box">
          <h4>我的需求记录</h4>
        </div>
        <div class="aui-arrow">
          <p>5</p>
        </div>
      </a>
      <a href="javascript:;" class="aui-flex b-line">
        <div class="aui-flex-box">
          <h4>物资申请记录</h4>
        </div>
        <div class="aui-arrow">
          <p></p>
        </div>
      </a>
    </div>
    <tabbar active="2"></tabbar>
  </section>
</template>
<script>
import tabbar from "@/components/tabbar.vue";
export default {
  data() {
    return {
      link: localStorage.getItem("link"),
      info: JSON.parse(
        localStorage.getItem("UserInfo") || localStorage.getItem("CompenyInfo")
      )
    };
  },
  components: {
    tabbar
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/skin/css/wuzi.scss";
</style>
