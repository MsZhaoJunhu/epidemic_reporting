<template>
  <div class="materialDemandList">
    <header class="aui-navBar aui-navBar-fixed">
      <a href="javascript:;" class="aui-navBar-item" @click="backTo">
        <i class="icon icon-return"></i>
      </a>
      <div class="aui-center">
        <span class="aui-center-title">物资需求列表</span>
      </div>
    </header>
    <main>
      <div class="form-box">
        <div class="item">
          <span class="item-title">公司/单位</span
          ><input class="item-input" type="text" placeholder="填写公司或单位" />
        </div>
        <div class="item">
          <span class="item-title">联系人</span
          ><input class="item-input" type="text" placeholder="填写联系人" />
        </div>
        <div class="item">
          <span class="item-title">发布日期</span
          ><input class="item-input" type="text" placeholder="填写发布日期" />
        </div>
        <div class="item">
          <span class="item-title">物资名称</span
          ><input class="item-input" type="text" placeholder="填写物资名称" />
        </div>
        <div class="item">
          <span class="item-title">规格</span
          ><input class="item-input" type="text" placeholder="填写规格" />
        </div>
        <div class="item">
          <span class="item-title">数量</span
          ><input class="item-input" type="text" placeholder="填写规格" />
        </div>
        <div class="item">
          <span class="item-title">单价</span
          ><input class="item-input" type="text" placeholder="填写规格" />
        </div>
        <div class="item item-button">
          <button class="button">查询</button>
          <button class="button">发布需求</button>
        </div>
      </div>
      <div class="item item-button-change">
        <button
          v-for="(button, index) in buttons"
          :key="index"
          @click="changeFormTable(index)"
          :class="{ isAcitived: turnRed === index }"
        >
          {{ button.title }}
        </button>
      </div>
      <div class="form-box">
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
            <td>
              <span
                class="resumption-sec-td opeartion"
                v-for="(opeartion, i) in item.opeartion"
                :key="i"
              >
                {{ opeartion.title }}
              </span>
            </td>
          </tr>
        </table>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "materialDemandList",
  data() {
    return {
      buttons: [
        {
          title: "虚拟库存"
        },
        {
          title: "我的物资"
        },
        {
          title: "我的需求"
        }
      ],
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
            },
            {
              title: "发货"
            },
            {
              title: "进程"
            }
          ]
        }
      ]
    };
  },
  computed: {
    turnRed() {
      return 0;
    }
  },
  mounted() {
    this.initTableData();
  },
  methods: {
    backTo() {
      // this.$router.push({ path: '/' })
    },
    changeFormTable(index) {
      this.turnRed == index;
    },
    showDetail() {},
    initTableData() {}
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/skin/css/index.scss";
@import "../../assets/skin/css/tijiao.scss";
@import "../../assets/skin/css/jquery-labelauty.scss";
@import "../../assets/skin/css/materialSolicitationRegister.scss";

.materialDemandList {
  .aui-navBar {
    background: #4472c4;
    .aui-center-title {
      color: #fff;
    }
  }
  .item-button-change {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    button {
      margin-right: 20px;
      padding: 5px 10px;
      color: #fff;
      border-radius: 5px;
      border: none;
    }
    .isAcitived {
      background: red;
      color: #fff;
    }
  }
  .form-box {
    padding: 10px 30px 20px 30px;
    .resumption-table {
      // display: flex;
      // justify-content: center;
      tr {
        text-align: center;
        td {
          width: 50%;
        }
        .opeartion {
          color: rgb(238, 41, 41);
          text-decoration: underline;
        }
      }
    }
    .item {
      margin-top: 20px;
      display: flex;
      .item-title {
        float: left;
        min-width: 120px;
      }
      .item-input {
        flex: 1;
        margin-right: 30px;
        background: #fff;
      }
      &:nth-last-of-type(1) {
        .item-opeartion {
          flex: 1;
          color: rgb(238, 41, 41);
          text-decoration: underline;
        }
      }
    }
    .item-button {
      display: flex;
      justify-content: center;
      button {
        margin-right: 20px;
        padding: 5px 10px;
        color: #fff;
        border-radius: 5px;
        border: none;
      }
      .button:first-child {
        background: #4472c4;
      }
      .button:last-child {
        background: #c00000;
      }
    }
  }
}
</style>
