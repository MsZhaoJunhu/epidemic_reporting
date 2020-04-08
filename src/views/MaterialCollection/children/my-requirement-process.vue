<template>
  <div class="sendOut-goods-process">
    <header class="aui-navBar aui-navBar-fixed">
      <a href="javascript:;" class="aui-navBar-item" @click="backTo">
        <i class="icon icon-return"></i>
      </a>
      <div class="aui-center">
        <span class="aui-center-title">我的需求-进程</span>
      </div>
    </header>
    <div class="choose-status">
      <nut-radio label="1" v-model="radioVal1">全部</nut-radio>
      <nut-radio label="2" v-model="radioVal1">申请中</nut-radio>
      <nut-radio label="3" v-model="radioVal1">已审批</nut-radio>
      <nut-radio label="4" v-model="radioVal1">已发货</nut-radio>
      <nut-radio label="5" v-model="radioVal1">已收货</nut-radio>
      <nut-radio label="6" v-model="radioVal1">已终止</nut-radio>
    </div>
    <table
      class="resumption-table"
      v-for="(item, index) in myInventory"
      :key="index"
    >
      <tr>
        <td class="resumption-fir-td ">序号</td>
        <td class="resumption-sec-td">{{ item.id }}</td>
      </tr>
      <tr>
        <td class="resumption-fir-td ">公司单位名称</td>
        <td class="resumption-sec-td">{{ item.companyName }}</td>
      </tr>
      <tr>
        <td class="resumption-fir-td ">联系人</td>
        <td class="resumption-sec-td">{{ item.link }}</td>
      </tr>
      <tr>
        <td class="resumption-fir-td ">联系电话</td>
        <td class="resumption-sec-td">{{ item.linkPhone }}</td>
      </tr>
      <tr>
        <td class="resumption-fir-td ">物资名称</td>
        <td class="resumption-sec-td">{{ item.materialName }}</td>
      </tr>
      <tr>
        <td class="resumption-fir-td ">规格</td>
        <td class="resumption-sec-td">{{ item.specification }}</td>
      </tr>
      <tr>
        <td class="resumption-fir-td ">单位</td>
        <td class="resumption-sec-td">{{ item.unit }}</td>
      </tr>
      <tr>
        <td class="resumption-fir-td ">数量</td>
        <td class="resumption-sec-td">{{ item.number }}</td>
      </tr>
      <tr>
        <td class="resumption-fir-td ">申请理由</td>
        <td class="resumption-sec-td">{{ item.reason }}</td>
      </tr>
      <tr>
        <td class="resumption-fir-td ">用途说明</td>
        <td class="resumption-sec-td">{{ item.useDescription }}</td>
      </tr>
      <tr>
        <td class="resumption-fir-td ">进程</td>
        <td class="resumption-sec-td">{{ item.process }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radioVal1: "1",
      myInventory: [
        {
          id: "1",
          companyName: "测试公司",
          link: "张三",
          linkPhone: "123456789",
          materialName: "应急用品",
          specification: "不详", //规格
          unit: "个",
          collectWay: "无偿捐赠",
          unitePrice: "100",
          totalMoney: "1000",
          number: "10",
          reason: "测试理由",
          useDescription: "测试测试测试",
          registrationTime: "2020-02-11",
          status: "已入库",
          process: "申请中"
        }
      ]
    };
  },
  methods: {
    backTo() {}
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/skin/css/tijiao.scss";
@import "../../../assets/skin/css/jquery-labelauty.scss";
@import "../../../assets/skin/css/materialSolicitationRegister.scss";
.sendOut-goods-process {
  .choose-status {
    margin: 20px 0;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    flex-wrap: wrap;
    label {
      width: 25%;
    }
  }
  .resumption-table {
    tr {
      text-align: center;
      &:nth-last-of-type(1) {
        td:nth-last-of-type(1) {
          color: rgb(238, 41, 41);
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
