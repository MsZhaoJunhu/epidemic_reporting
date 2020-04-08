<template>
  <div class="material-sendOut-goods">
    <header class="aui-navBar aui-navBar-fixed">
      <a href="javascript:;" class="aui-navBar-item" @click="backTo">
        <i class="icon icon-return"></i>
      </a>
      <div class="aui-center">
        <span class="aui-center-title">物资发货</span>
      </div>
    </header>
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
        <td class="resumption-fir-td ">征集方式</td>
        <td class="resumption-sec-td">{{ item.collectWay }}</td>
      </tr>
      <tr>
        <td class="resumption-fir-td ">单价</td>
        <td class="resumption-sec-td">{{ item.unitePrice }}</td>
      </tr>
      <tr>
        <td class="resumption-fir-td ">总价</td>
        <td class="resumption-sec-td">{{ item.totalMoney }}</td>
      </tr>
      <tr>
        <td class="resumption-fir-td ">用途说明</td>
        <td class="resumption-sec-td">{{ item.useDescription }}</td>
      </tr>
      <tr>
        <td class="resumption-fir-td ">登记日期</td>
        <td class="resumption-sec-td">{{ item.registrationTime }}</td>
      </tr>
      <tr>
        <td class="resumption-fir-td ">状态</td>
        <td class="resumption-sec-td">{{ item.status }}</td>
      </tr>
      <tr>
        <td class="resumption-fir-td ">操作</td>
        <td
          class="resumption-sec-td opeartion"
          v-for="(opeartion, i) in item.opeartion"
          :key="i"
        >
          {{ opeartion.title }}
        </td>
      </tr>
    </table>

    <div class="sendOut-button">
      <span class="button">发货</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
          useDescription: "测试测试测试",
          registrationTime: "2020-02-11",
          status: "已入库",
          opeartion: [
            {
              title: "查看"
            }
          ]
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
@import "../../assets/skin/css/tijiao.scss";
@import "../../assets/skin/css/jquery-labelauty.scss";
@import "../../assets/skin/css/materialSolicitationRegister.scss";
.material-sendOut-goods {
  height: auto;
  .resumption-table {
    tr {
      text-align: center;
      .opeartion {
        color: rgb(238, 41, 41);
        text-decoration: underline;
      }
    }
  }
  .sendOut-button {
    padding: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .button {
      text-align: center;
      width: 80%;
      height: 40px;
      line-height: 40px;
      border-radius: 0.5rem;
      background-color: #4472c4;
      color: #fff;
    }
  }
}
</style>
