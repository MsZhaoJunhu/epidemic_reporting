<template>
  <section class="aui-flexView">
    <header class="aui-navBar aui-navBar-fixed">
      <a href="javascript:;" class="aui-navBar-item">
        <i class="icon icon-return"></i>
      </a>
      <div class="aui-center">
        <span class="aui-center-title">我的物资-发货-发货提交</span>
      </div>
      <a href="javascript:;" class="aui-navBar-item">
        <i class="icon icon-sys"></i>
      </a>
    </header>
    <section class="aui-scrollView">
      <div class="aui-view-box">
        <h6>收货方</h6>
        <table class="resumption-table">
          <tr>
            <td class="resumption-fir-td resumption-start">公司/单位名称</td>
            <td class="resumption-sec-td">
              <input
                type="text"
                v-model="companyName"
                placeholder="请输入公司/单位名称"
              />
            </td>
          </tr>
          <tr>
            <td class="resumption-fir-td resumption-start">公司类型</td>
            <td class="resumption-sec-td">
              <select v-model="companyType">
                <option value="合资企业">合资企业</option>
                <option value="外商独资">外商独资</option>
                <option value="国有企业">国有企业</option>
                <option value="私营企业">私营企业</option>
                <option value="个体工商户">个体工商户</option>
              </select>
            </td>
          </tr>
          <tr>
            <td class="resumption-fir-td resumption-start">联系人</td>
            <td class="resumption-sec-td">
              <input
                type="number"
                v-model="contactName"
                placeholder="请输入联系人姓名"
              />
            </td>
          </tr>
          <tr>
            <td class="resumption-fir-td resumption-start">联系电话</td>
            <td class="resumption-sec-td">
              <input
                type="number"
                v-model="contactPhone"
                placeholder="请输入联系人电话"
              />
            </td>
          </tr>
          <tr>
            <td class="resumption-fir-td resumption-start">收货地点</td>
            <td class="resumption-sec-td">
              <input
                type="number"
                v-model="contactPhone"
                placeholder="请输入收货地点"
              />
            </td>
          </tr>
        </table>

        <h6>发货方</h6>
        <table class="resumption-table">
          <template v-for="item in material">
            <tr>
              <td class="resumption-fir-td resumption-start">公司/单位名称</td>
              <td class="resumption-sec-td">
                <input
                  type="text"
                  v-model="item.materialName"
                  placeholder="公司/单位名称"
                />
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td resumption-start">公司类型</td>
              <td class="resumption-sec-td">
                <select v-model="companyType">
                  <option value="合资企业">合资企业</option>
                  <option value="外商独资">外商独资</option>
                  <option value="国有企业">国有企业</option>
                  <option value="私营企业">私营企业</option>
                  <option value="个体工商户">个体工商户</option>
                </select>
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td resumption-start">联系人</td>
              <td class="resumption-sec-td">
                <input
                  type="number"
                  v-model="contactName"
                  placeholder="请输入联系人姓名"
                />
              </td>
            </tr>
            <tr>
              <td class="resumption-fir-td resumption-start">联系电话</td>
              <td class="resumption-sec-td">
                <input
                  type="number"
                  v-model="contactPhone"
                  placeholder="请输入联系人电话"
                />
              </td>
            </tr>
          </template>
        </table>
        <h6>物资信息</h6>
        <table class="resumption-table">
          <tr>
            <td class="resumption-fir-td resumption-start">物资名称</td>
            <td class="resumption-sec-td">
              <input
                type="text"
                v-model="companyName"
                placeholder="请输入物资名称"
              />
            </td>
          </tr>
          <tr>
            <td class="resumption-fir-td resumption-start">规格</td>
            <td class="resumption-sec-td">
              <input
                type="text"
                v-model="companyName"
                placeholder="请输入规格"
              />
            </td>
          </tr>
          <tr>
            <td class="resumption-fir-td resumption-start">单位</td>
            <td class="resumption-sec-td">
              <input
                type="text"
                v-model="companyAdress"
                placeholder="请输入单位"
              />
            </td>
          </tr>
          <tr>
            <td class="resumption-fir-td resumption-start">数量</td>
            <td class="resumption-sec-td">
              <input
                type="text"
                v-model="applyReason"
                placeholder="请输入数量"
              />
            </td>
          </tr>
          <tr>
            <td class="resumption-fir-td resumption-start">发货方式</td>
            <td class="resumption-sec-td">
              <input
                type="text"
                v-model="purpose"
                placeholder="请输入发货方式"
              />
            </td>
          </tr>
          <tr>
            <td class="resumption-fir-td resumption-start">发货时间</td>
            <td class="resumption-sec-td">
              <input
                type="text"
                v-model="purpose"
                placeholder="请输入发货时间"
              />
            </td>
          </tr>
          <tr>
            <td class="resumption-fir-td resumption-start">收货时间</td>
            <td class="resumption-sec-td">
              <input
                type="text"
                v-model="purpose"
                placeholder="请输入收货时间"
              />
            </td>
          </tr>
        </table>

        <div class="materialSolicitationRegister-btn-par">
          <button @click="submit">发货提交</button>
        </div>
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
      companyName: "",
      companyType: "",
      companyAdress: "",
      contactName: "",
      contactPhone: "",
      material: [
        {
          materialName: "",
          materialSpecifications: "",
          materialUnit: "",
          materialNumber: ""
        }
      ],
      applyReason: "",
      purpose: "",
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
        materialNumber: ""
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

input.labelauty + label {
  font: 12px "Microsoft Yahei";
}
</style>
