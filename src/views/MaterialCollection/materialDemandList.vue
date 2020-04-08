<template>
  <div class="materialDemandList">
    <header class="aui-navBar aui-navBar-fixed">
      <a href="javascript:;"
         class="aui-navBar-item"
         @click="backTo">
        <i class="icon icon-return"></i>
      </a>
      <div class="aui-center">
        <span class="aui-center-title">物资需求列表</span>
      </div>
    </header>
    <main>
      <div class="form-box">
        <div class="item">
          <span class="item-title">公司/单位</span><input class="item-input"
                 type="text"
                 placeholder="填写公司或单位" />
        </div>
        <div class="item">
          <span class="item-title">联系人</span><input class="item-input"
                 type="text"
                 placeholder="填写联系人" />
        </div>
        <div class="item">
          <span class="item-title">发布日期</span><input class="item-input"
                 type="text"
                 placeholder="填写发布日期" />
        </div>
        <div class="item">
          <span class="item-title">物资名称</span><input class="item-input"
                 type="text"
                 placeholder="填写物资名称" />
        </div>
        <div class="item">
          <span class="item-title">规格</span><input class="item-input"
                 type="text"
                 placeholder="填写规格" />
        </div>
        <div class="item">
          <span class="item-title">数量</span><input class="item-input"
                 type="text"
                 placeholder="填写规格" />
        </div>
        <div class="item">
          <span class="item-title">单价</span><input class="item-input"
                 type="text"
                 placeholder="填写规格" />
        </div>
        <div class="item item-button">
          <button class="button">查询</button>
          <button class="button">发布需求</button>
        </div>
      </div>
      <div class="form-box">
        <div class="item">
          <span class="item-title">序</span><input class="item-input"
                 type="text"
                 placeholder="填写规格" />
        </div>
        <div class="item">
          <span class="item-title">公司/单位名称</span><input class="item-input"
                 type="text"
                 placeholder="公司/单位名称" />
        </div>
        <div class="item">
          <span class="item-title">联系人</span><input class="item-input"
                 type="text"
                 placeholder="联系人" />
        </div>
        <div class="item">
          <span class="item-title">联系电话</span><input class="item-input"
                 type="text"
                 placeholder="联系电话" />
        </div>
        <div class="item">
          <span class="item-title">物资名称</span><input class="item-input"
                 type="text"
                 placeholder="物资名称" />
        </div>
        <div class="item">
          <span class="item-title">规格</span><input class="item-input"
                 type="text"
                 placeholder="规格" />
        </div>
        <div class="item">
          <span class="item-title">单位</span><input class="item-input"
                 type="text"
                 placeholder="单位" />
        </div>
        <div class="item">
          <span class="item-title">数量</span><input class="item-input"
                 type="text"
                 placeholder="数量" />
        </div>
        <div class="item">
          <span class="item-title">单价</span><input class="item-input"
                 type="text"
                 placeholder="单价" />
        </div>
        <div class="item">
          <span class="item-title">总价</span><input class="item-input"
                 type="text"
                 placeholder="总价" />
        </div>
        <div class="item">
          <span class="item-title">用途说明</span><input class="item-input"
                 type="text"
                 placeholder="用途说明" />
        </div>
        <div class="item">
          <span class="item-title">收货时间</span><input class="item-input"
                 type="text"
                 placeholder="收货时间" />
        </div>
        <div class="item">
          <span class="item-title">发布日期</span><input class="item-input"
                 type="text"
                 placeholder="发布日期" />
        </div>
        <div class="item">
          <span class="item-title">截止时间</span><input class="item-input"
                 type="text"
                 placeholder="截止时间" />
        </div>
        <div class="item">
          <span class="item-title">操作</span><input class="item-input"
                 type="text"
                 placeholder="操作" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "materialDemandList",
  data () {
    return {};
  },
  methods: {
    backTo () {
      // this.$router.push({ path: '/' })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/skin/css/index.scss";
.materialDemandList {
  .aui-navBar {
    background: #4472c4;
    .aui-center-title {
      color: #fff;
    }
  }
  .form-box {
    padding: 10px;
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
