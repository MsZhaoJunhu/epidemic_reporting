<template>
  <div>
    <header class="aui-navBar aui-navBar-fixed">
      <a @click="hideShowDetail" class="aui-navBar-item">
        <i class="icon icon-return"></i>
      </a>
      <div class="aui-center">
        <span class="aui-center-title">需求列表详情</span>
      </div>
      <div href="javascript:;" class="aui-navBar-item" @click="hideShowDetail">
        <nut-icon type="cross"></nut-icon>
      </div>
    </header>
    <div class="xx" v-for="item in itemDetailList">
      <div class="gs">
        <span>{{ item.enterprise_name }}</span>
      </div>
      <div>
        <div class="lxr">
          <span>联系人</span>
          <span style="padding-left:45px;">{{ item.contacts }}</span>
        </div>
        <div class="lxdh">
          <span>联系电话</span>
          <span style="padding-left:32px;">{{ item.contact_mobile }}</span>
        </div>
        <div class="shdz">
          <span>收货地址</span>
          <span style="padding-left:32px;">{{ item.address }}</span>
        </div>
      </div>
    </div>
    <div class="gg">
      <div class="wzxx">
        <div class="wzxx-fir"><span>物资名称</span></div>
        <div class="wzxx-sec"><span>规格</span></div>
        <div class="wzxx-last"><span>数量</span></div>
      </div>
      <div>
        <div class="kz" v-for="item in itemDetailList[0].goods_list">
          <div>
            <span>{{ item.goods_name }}</span>
          </div>
          <div class="a">
            <span>{{ item.goods_specifications }}</span>
          </div>
          <div>
            <span>{{ item.number }}</span>
          </div>
        </div>
        <!-- <div class="fhf">
          <div><span>防护服</span></div>
          <div class="a"><span>GB 19082-2003</span></div>
          <div><span>50套</span></div>
        </div>
        <div class="twq">
          <div><span>体温枪</span></div>
          <div class="a"><span></span></div>
          <div><span>100把</span></div>
        </div>
        <div class="yyst">
          <div><span>医用手套</span></div>
          <div class="a"><span>灭菌,GB 10213-2006</span></div>
          <div><span>500双</span></div>
        </div>
        <div class="xdyp">
          <div><span>消毒用品</span></div>
          <div class="a"><span>75%酒精</span></div>
          <div><span>800瓶</span></div>
        </div> -->
        <div class="jzsj" v-for="item in itemDetailList">
          <span>{{item.deadline}}截止</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemDetailList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      enterprise_name: this.itemDetailList[0].enterprise_name,
      contacts: this.itemDetailList[0].contacts,
      contact_mobile: this.itemDetailList[0].contact_mobile,
      address: this.itemDetailList[0].address
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    hideShowDetail() {
      this.$emit("hideShowDetail");
    },
    load() {
      for (var i = 0; i < this.itemDetailList[0].goods_list.length; i++) {
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/skin/css/tijiao.scss";
@import "@/assets/skin/css/jquery-labelauty.scss";
@import "@/assets/skin/css/materialSolicitationRegister.scss";
.aui-navBar {
  background: rgb(245, 245, 245);
  .aui-center-title {
    color: #333;
  }
}
.xx {
  // width: 390px;
  height: 150px;
  background: linear-gradient(
    to bottom,
    rgb(9, 128, 252) 0%,
    rgb(6, 186, 255) 100%
  );
  margin: 10px 10px;
  border-radius: 5px;
  color: #fff;
  .gs {
    border-bottom: 0.1px solid silver;
    padding: 10px 15px;
    span {
      font-size: 1.2rem;
    }
  }
  .lxr,
  .lxdh,
  .shdz {
    padding: 5px 15px;
    span {
      font-size: 14px;
    }
  }
}
.gg {
  // width: 390px;
  border: 1px solid silver;
  border-radius: 10px;
  margin: 10px 10px;
  overflow: hidden;
  .wzxx {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding: 10px 10px;
    background-color: rgb(214, 230, 245);
    border-bottom: 1px solid #f5f5f5;
    .wzxx-fir {
      width: 26%;
      white-space: nowrap;
    }
    .wzxx-sec {
      width: 54%;
    }
    .wzxx-last {
      width: 20%;
    }
    .wzxx-last span {
      display: block;
      text-align: right;
    }
    span {
      font-size: 14px;
    }
  }
  .kz {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    border: 1px solid #f5f5f5;
    margin-top: -1px;
    .a {
      width: 185px;
    }
    span {
      font-size: 14px;
    }
  }
  .jzsj {
    padding: 10px 0;
    padding-right: 10px;
    text-align: right;
    span {
      white-space: nowrap;
    }
  }
}
</style>
