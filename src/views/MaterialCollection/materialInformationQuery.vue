<template>
  <section class="aui-flexView">
    <header class="aui-navBar aui-navBar-fixed">
      <a href="javascript:;" class="aui-navBar-item">
        <i class="icon icon-return"></i>
      </a>
      <div class="aui-center">
        <span class="aui-center-title">物资信息查询</span>
      </div>
      <a href="javascript:;" class="aui-navBar-item">
        <i class="icon icon-sys"></i>
      </a>
    </header>
    <section class="aui-scrollView">
      <div class="aui-view-box">
        <h6>基本信息</h6>
        <table class="resumption-table">
          <tr>
            <td class="resumption-fir-td resumption-start">物资名称</td>
            <td class="resumption-sec-td">
              <input
                type="text"
                v-model="materialName"
                placeholder="请输入物资名称"
              />
            </td>
          </tr>
          <tr>
            <td class="resumption-fir-td resumption-start">规格</td>
            <td class="resumption-sec-td">
              <input
                type="text"
                v-model="materialSpecifications"
                placeholder="请输入物资名称"
              />
            </td>
          </tr>
          <tr>
            <td class="resumption-fir-td resumption-start">数量</td>
            <td class="resumption-sec-td">
              <input
                type="text"
                v-model="materialNumber"
                placeholder="请输入数量"
              />
            </td>
          </tr>
          <tr>
            <td class="resumption-fir-td resumption-start">单价</td>
            <td class="resumption-sec-td">
              <input
                type="text"
                v-model="materialPrice"
                placeholder="请输入单价"
              />
            </td>
          </tr>
          <tr>
            <button>查询</button>
            <button>发布需求</button>
          </tr>
        </table>

        <h6>物资信息</h6>
        <table class="resumption-table">
          <template v-for="item in material">
            <tr>
              <td class="resumption-fir-td resumption-start">物资名称</td>
              <td class="resumption-sec-td">
                <input
                  type="text"
                  v-model="item.materialName"
                  placeholder="请输入物资名称"
                />
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td resumption-start">规格</td>
              <td class="resumption-sec-td">
                <input
                  type="text"
                  v-model="item.materialSpecifications"
                  placeholder="请输入规格"
                />
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td resumption-start">单位</td>
              <td class="resumption-sec-td">
                <input
                  type="text"
                  v-model="item.materialUnit"
                  placeholder="请输入单位"
                />
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td resumption-start">数量</td>
              <td class="resumption-sec-td">
                <input
                  type="text"
                  v-model="item.materialNumber"
                  placeholder="请输入数量"
                />
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td resumption-start">征集方式</td>
              <td class="resumption-sec-td">
                <input
                  type="text"
                  v-model="item.materialType"
                  placeholder="请输入征集方式"
                />
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td resumption-start">单价</td>
              <td class="resumption-sec-td">
                <input
                  type="text"
                  v-model="item.materialPrice"
                  placeholder="请输入单价"
                />
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td resumption-start">总价</td>
              <td class="resumption-sec-td">
                <input
                  type="text"
                  v-model="item.materialAllprice"
                  placeholder="请输入总价"
                />
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td resumption-start">用途说明</td>
              <td class="resumption-sec-td">
                <input
                  type="text"
                  v-model="item.materialExplain"
                  placeholder="请输入用途说明"
                />
              </td>
            </tr>
          </template>
        </table>
        <div class="materialSolicitationRegister-btn-par">
          <button @click="clickToAddTable">新增</button>
        </div>
        <h6>发货信息</h6>
        <table class="resumption-table">
          <tr>
            <td class="resumption-fir-td resumption-start">发货地点</td>
            <td class="resumption-sec-td">
              <input
                type="text"
                v-model="companyName"
                placeholder="请输入发货地点"
              />
            </td>
          </tr>
          <tr>
            <td class="resumption-fir-td resumption-start">发货方式</td>
            <td class="resumption-sec-td">
              <input
                type="text"
                v-model="companyName"
                placeholder="请输入发货方式"
              />
            </td>
          </tr>
          <tr>
            <td class="resumption-fir-td resumption-start">最早发货时间</td>
            <td class="resumption-sec-td">
              <input
                type="text"
                v-model="companyAdress"
                placeholder="请输入最早发货时间"
              />
            </td>
          </tr>
        </table>

        <div class="materialSolicitationRegister-btn-par">
          <button @click="submit">提交登记</button>
        </div>
        <nut-popup :style="{ padding: '0.5rem' }" v-model="show">
          <div class="materialSolicitationRegister-popup-par">
            <div class="materialSolicitationRegister-popup-fir">
              <div>提交成功</div>
              <div @click="closePopup">
                <nut-icon type="cross" size="14px" color="#fff"></nut-icon>
              </div>
            </div>
            <div class="materialSolicitationRegister-popup-sec">
              <p>
                物资信息提交成功,信息审核通过后,将进入虚拟物资库,感谢您的支持和信任,我们一定会妥善安排物资发放,保证抗疫工作的顺利开展!
              </p>
              <button @click="routerToWhere">确定</button>
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
      materialName: "",
      materialSpecifications: "",
      materialNumber: "",
      materialPrice: "",
      material: [
        {
          materialName: "",
          materialSpecifications: "",
          materialUnit: "",
          materialNumber: "",
          materialType: "",
          materialPrice: "",
          materialAllprice: "",
          materialExplain: ""
        }
      ],
      show: false
    };
  },
  mounted() {},
  methods: {
    clickToAddTable() {
      this.material.push({
        materialName: "",
        materialSpecifications: "",
        materialUnit: "",
        materialNumber: "",
        materialType: "",
        materialPrice: "",
        materialAllprice: "",
        materialExplain: ""
      });
    },
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
@import "../../assets/skin/css/tijiao.scss";
@import "../../assets/skin/css/jquery-labelauty.scss";
@import "../../assets/skin/css/materialSolicitationRegister.scss";

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
