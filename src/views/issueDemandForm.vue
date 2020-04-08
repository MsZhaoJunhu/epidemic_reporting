<template>
  <div class="issueDemandForm">
    <header class="aui-navBar aui-navBar-fixed">
      <a href="javascript:;"
         class="aui-navBar-item"
         @click="backTo">
        <i class="icon icon-return"></i>
      </a>
      <div class="aui-center">
        <span class="aui-center-title">发布需求登记表</span>
      </div>
    </header>
    <main>
      <div class="form-box">
        <p class="form-title">基本信息</p>
        <div class="item">
          <span class="item-title">公司/单位名称</span><input class="item-input"
                 type="text"
                 placeholder="填写公司或单位名称">
        </div>
        <div class="item">
          <span class="item-title">公司类型</span><input class="item-input"
                 type="text"
                 placeholder="填写公司类型">
        </div>
        <div class="item">
          <span class="item-title">公司地址</span><input class="item-input"
                 type="text"
                 placeholder="填写公司地址">
        </div>
        <div class="item">
          <span class="item-title">联系人</span><input class="item-input"
                 type="text"
                 placeholder="填写联系人">
        </div>
        <div class="item">
          <span class="item-title">联系电话</span><input class="item-input"
                 type="text"
                 placeholder="填写联系电话">
        </div>
      </div>
      <div class="form-box">
        <p class="form-title">物资需求</p>
        <div class="item">
          <span class="item-title">物品名称</span><input class="item-input"
                 type="text"
                 placeholder="填写物品名称">
        </div>
        <div class="item">
          <span class="item-title">规格</span><input class="item-input"
                 type="text"
                 placeholder="填写规格">
        </div>
        <div class="item">
          <span class="item-title">单位</span><input class="item-input"
                 type="text"
                 placeholder="填写单位">
        </div>
        <div class="item">
          <span class="item-title">数量</span><input class="item-input"
                 type="text"
                 placeholder="填写数量">
        </div>
        <div class="item">
          <span class="item-title">是否有偿购买</span><input class="item-input"
                 type="text"
                 placeholder="是否有偿购买">
        </div>
        <div class="item">
          <span class="item-title">单价</span><input class="item-input"
                 type="text"
                 placeholder="填写单价">
        </div>
        <div class="item">
          <span class="item-title">总价</span><input class="item-input"
                 type="text"
                 placeholder="填写总价">
        </div>
        <div class="item">
          <span class="item-title">用途说明</span><input class="item-input"
                 type="text"
                 placeholder="填写用途说明">
        </div>
        <div class="item">
          <div class="item-button">+ 新增</div>
        </div>
      </div>
      <div class="form-box">
        <p class="form-title">收货信息</p>
        <div class="item">
          <span class="item-title">收货地址</span><input class="item-input"
                 type="text"
                 placeholder="填写收货地址">
        </div>
        <div class="item">
          <span class="item-title">收货方式</span>
          <select>
            <option value="">自提</option>
            <option value="">物流</option>
            <option value="">免费送货</option>
          </select>
        </div>
        <div class="item">
          <span class="item-title">收货时间</span><input class="item-input"
                 type="text"
                 placeholder="填写收货时间">
        </div>
        <div class="border"></div>
        <div class="item">
          <span class="item-title">需求时限</span><input class="item-small"
                 type="text">-<input class="item-small"
                 type="text">
        </div>
        <p>(有效期：从发布之日起，最长不超过15天)</p>
      </div>
      <div class="submit-button">
        <button>发布需求</button>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'issueDemandForm',
  data () {
    return {

    }
  },
  methods: {
    backTo () {
      // this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/skin/css/index.scss";
.issueDemandForm {
  .aui-navBar {
    background: #4472c4;
    .aui-center-title {
      color: #fff;
    }
  }
  .form-box {
    padding: 10px;
    .form-title {
      font-weight: 800;
    }
    .item {
      margin-top: 20px;
      display: flex;
      .item-title {
        float: left;
        min-width: 130px;
      }
    }
    .item-input,
    select {
      flex: 1;
      margin-right: 30px;
      background: #fff;
    }
    .item-small {
      width: 100px;
    }
    .item-button {
      width: 100%;
      border: 1px solid #6e6e6e;
      padding: 5px 0;
      text-align: center;
      margin: 0 auto;
    }
    .border {
      width: 100%;
      height: 1px;
      background: #939393;
      overflow: hidden;
      margin: 10px 0;
    }
  }
  .submit-button {
    text-align: center;
    margin-bottom: 10px;
    button {
      padding: 5px 20px;
      background: #4472c4;
      border-radius: 5px;
      color: #fff;
    }
  }
}
</style>