<template>
  <section class="aui-flexView">
    <header class="aui-navBar aui-navBar-fixed">
      <a href="javascript:;" class="aui-navBar-item">
        <i class="icon icon-return"></i>
      </a>
      <div class="aui-center">
        <span class="aui-center-title">我的物资-进程-申请中</span>
      </div>
      <a href="javascript:;" class="aui-navBar-item">
        <i class="icon icon-sys"></i>
      </a>
    </header>
    <section class="aui-scrollView">
      <div class="aui-view-box">
        <div v-if="status == '已审批' || status == '申请'">
          <h6>基本信息</h6>
          <table class="resumption-table">
            <tr>
              <td class="resumption-fir-td ">公司/单位名称</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info"></span>
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td ">公司类型</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info"></span>
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td ">公司地址</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info"></span>
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td ">联系人</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info"></span>
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td ">联系电话</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info"></span>
              </td>
            </tr>
          </table>
        </div>
        <div v-else>
          <h6>收货方</h6>
          <table class="resumption-table">
            <tr>
              <td class="resumption-fir-td ">公司/单位名称</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info"></span>
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td ">公司类型</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info"></span>
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td ">联系人</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info"></span>
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td ">联系电话</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info"></span>
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td ">收货地点</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info"></span>
              </td>
            </tr>
          </table>
        </div>
        <div style="padding:1rem" v-if="status == '已审批' || status == '申请'">
          <h6>需求信息</h6>
          <table class="resumption-table">
            <tr>
              <td class="resumption-fir-td ">物质名称</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info"></span>
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td ">规格</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info"></span>
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td ">单位</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info"></span>
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td ">数量</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info"></span>
              </td>
            </tr>

            <tr>
              <td class="resumption-fir-td ">申请理由</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info"></span>
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td ">用途说明</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info"></span>
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td ">进程</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info status">申请中</span>
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td ">{{ status }}时间</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info">2020-2-2 10:03</span>
              </td>
            </tr>
          </table>
        </div>
        <div style="padding:1rem" v-else>
          <h6>发货方</h6>
          <table class="resumption-table">
            <tr>
              <td class="resumption-fir-td ">公司/单位名称</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info"></span>
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td ">公司类型</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info"></span>
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td ">联系人</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info"></span>
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td ">联系电话</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info"></span>
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td ">物质名称</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info"></span>
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td ">规格</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info"></span>
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td ">单位</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info"></span>
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td ">数量</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info"></span>
              </td>
            </tr>

            <tr>
              <td class="resumption-fir-td ">申请理由</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info"></span>
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td ">用途说明</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info"></span>
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td ">进程</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info status">申请中</span>
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td ">申请时间</td>
              <td class="resumption-sec-td">
                <span class="resumption-text-info">2020-2-2 10:03</span>
              </td>
            </tr>
          </table>
        </div>

        <!-- <div class="materialSolicitationRegister-btn-par">
          <button @click="submit">发货提交</button>
        </div> -->
        <nut-popup :style="{ padding: '0.5rem' }" v-model="show">
          <div class="materialSolicitationRegister-popup-par">
            <div class="materialSolicitationRegister-popup-fir">
              <div>需求发布</div>
              <div @click="closePopup">
                <nut-icon type="cross" size="14px" color="#fff"></nut-icon>
              </div>
            </div>
            <div class="materialSolicitationRegister-popup-sec">
              <p>
                请您先对虚拟库存中的物资进行查询,如没有您需要的物资,再发布物资需求!
              </p>
              <div class="materialGrant-div">
                <button @click="routerToWhere">需求发布</button>
                <button @click="closePopup">返回</button>
              </div>
            </div>
          </div>
        </nut-popup>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: "disinfections",
  data() {
    return {
      status: [
        {
          title: "申请",
          time: "2020-2-1 10:34"
        },
        {
          title: "已审批",
          time: "2020-2-2 10:24"
        },
        {
          title: "已发送",
          time: "2020-2-5 10:24"
        },
        {
          title: "已收货",
          time: "2020-2-10 12:56"
        }
      ],
      show: false
    };
  },
  mounted() {},
  methods: {
    submit() {
      this.show = true;
    },
    closePopup() {
      this.show = false;
    },
    routerToWhere() {}
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/skin/css/tijiao.scss";
@import "../../../assets/skin/css/jquery-labelauty.scss";
@import "../../../assets/skin/css/materialSolicitationRegister.scss";

ul {
  list-style-type: none;
}

li {
  display: inline-block;
}

li {
  margin: 10px 0;
}
.status {
  color: red;
}

input.labelauty + label {
  font: 12px "Microsoft Yahei";
}
</style>
