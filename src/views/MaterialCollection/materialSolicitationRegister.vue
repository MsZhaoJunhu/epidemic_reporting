<template>
  <section class="aui-flexView">
    <header class="aui-navBar aui-navBar-fixed">
      <a href="javascript:history.back(-1);" class="aui-navBar-item">
        <i class="icon icon-return"></i>
      </a>
      <div class="aui-center">
        <span class="aui-center-title">物资征集登记表</span>
      </div>
      <a href="javascript:;" class="aui-navBar-item">
        <i class="icon icon-sys"></i>
      </a>
    </header>
    <section class="aui-scrollView pad20">
      <div class="aui-view-box">
        <h6>基本信息</h6>
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
              <select v-model="enterprise_type">
                <option value="1">合资企业</option>
                <option value="2">外商独资</option>
                <option value="3">国有企业</option>
                <option value="4">私营企业</option>
                <option value="5">个体工商户</option>
              </select>
            </td>
          </tr>
          <tr>
            <td class="resumption-fir-td resumption-start">公司地址</td>
            <td class="resumption-sec-td">
              <input
                type="text"
                v-model="enterprise_address"
                placeholder="请输入公司地址"
              />
            </td>
          </tr>
          <tr>
            <td class="resumption-fir-td resumption-start">联系人</td>
            <td class="resumption-sec-td">
              <input
                type="text"
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
        </table>

        <h6>物资信息</h6>
        <table
          class="resumption-table material-submit-detail"
          v-for="item in material"
        >
          <tr>
            <td class="resumption-fir-td resumption-start">物资名称</td>
            <td class="resumption-sec-td">
              <select v-model="item.goods_name" @change="getGoodNames">
                <option value="1">医疗设备</option>
                <option value="2">口罩</option>
                <option value="3">医用防护服</option>
                <option value="4">医用手套</option>
                <option value="5">防护面罩</option>
                <option value="6">鞋套</option>
                <option value="7">护目镜</option>
                <option value="8">红外线体温计</option>
                <option value="9">消毒用品</option>
                <option value="10">药品</option>
                <option value="11">其它</option>
              </select>
            </td>
          </tr>
          <tr>
            <td class="resumption-fir-td resumption-start">规格</td>
            <td class="resumption-sec-td">
              <input
                type="text"
                v-model="item.goods_specifications"
                placeholder="请输入规格"
              />
            </td>
          </tr>
          <tr>
            <td class="resumption-fir-td resumption-start">单位</td>
            <td class="resumption-sec-td">
              <input type="text" v-model="item.unit" placeholder="请输入单位" />
            </td>
          </tr>
          <tr>
            <td class="resumption-fir-td resumption-start">数量</td>
            <td class="resumption-sec-td">
              <input
                type="text"
                v-model="item.number"
                placeholder="请输入数量"
              />
            </td>
          </tr>
          <tr>
            <td class="resumption-fir-td resumption-start">征集方式</td>
            <td class="resumption-sec-td">
              <select
                v-model="item.pattern"
                @change="changeMethods($event, item)"
              >
                <option value="1">无偿捐赠</option>
                <option value="2">平价销售</option>
                <option value="3">物资调拨</option>
              </select>
            </td>
          </tr>
          <tr>
            <td class="resumption-fir-td resumption-start">单价</td>
            <td class="resumption-sec-td">
              <input
                type="text"
                v-model="item.price"
                placeholder="请输入单价"
                :disabled="disabled"
              />
            </td>
          </tr>
          <tr>
            <td class="resumption-fir-td resumption-start">总价</td>
            <td class="resumption-sec-td">
              <input
                type="text"
                v-model="item.totalMoney"
                placeholder="请输入总价"
                :disabled="disabled"
              />
            </td>
          </tr>
          <tr>
            <td class="resumption-fir-td resumption-start">用途说明</td>
            <td class="resumption-sec-td">
              <input
                type="text"
                v-model="item.explain"
                placeholder="请输入用途说明"
              />
            </td>
          </tr>
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
                v-model="address"
                placeholder="请输入发货地点"
              />
            </td>
          </tr>
          <tr>
            <td class="resumption-fir-td resumption-start">发货方式</td>
            <td class="resumption-sec-td">
              <select v-model="send_way">
                <option value="1">自提</option>
                <option value="2">物流</option>
                <option value="3">免费送货</option>
              </select>
            </td>
          </tr>
          <tr>
            <td class="resumption-fir-td resumption-start">最早发货时间</td>
            <td class="resumption-sec-td">
              <input
                type="text"
                v-model="begin_date"
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
              <p v-if="submitResult === true">
                物资信息提交成功,信息审核通过后,将进入虚拟物资库,感谢您的支持和信任,我们一定会妥善安排物资发放,保证抗疫工作的顺利开展!
              </p>
              <p v-else>物资信息提交失败，{{ submitErrorMsg }}</p>
              <button @click="routerToSuccess" v-if="submitResult === true">
                确定
              </button>
            </div>
          </div>
        </nut-popup>
      </div>
    </section>
  </section>
</template>

<script>
import needInfo from "@/views/MaterialCollection/needInfo.js";
export default {
  name: "disinfections",
  data() {
    return {
      companyName: "",
      enterprise_address: "", //单位地址
      enterprise_type: "",
      send_way: "",
      address: "",
      contactName: "",
      contactPhone: "",
      disabled: false,
      submitResult: false,
      submitErrorMsg: "",
      begin_date: "",
      patternWay: {
        "1": "无偿捐赠",
        "2": "平价销售",
        "3": "物资调拨"
      },
      material: [
        {
          goods_name: "",
          goods_ext: "",
          goods_specifications: "",
          unit: "",
          number: "",
          price: "",
          explain: "",
          pattern: ""
        }
      ],
      show: false
    };
  },
  mounted() {},
  computed: {
    // submitErrorMsg() {
    //   return "";
    // }
  },
  methods: {
    clickToAddTable() {
      this.material.push({
        goods_name: "",
        goods_specifications: "",
        unit: "",
        number: "",
        price: "",
        totalMoney: "",
        materialAllprice: "",
        explain: "",
        pattern: ""
      });
    },
    submit() {
      Promise.all(
        this.material.map(item => {
          return new Promise((resolve, reject) => {
            let needInfoArr = [];
            let goods_name = item.goods_name; //物资名称
            let goods_ext = ""; //其他信息
            let goods_specifications = item.goods_specifications; //物资规格
            let unit = item.unit; //物资单位
            let number = item.number; //物资数量
            let pattern = item.pattern; //发送形式
            let explain = item.explain; //用途说明
            let address = this.address; //发货地址
            let send_way = this.send_way; //发货方式
            let begin_date = this.begin_date; //发货时间
            let enterprise_type = this.enterprise_type; //公司类型
            //物资单价
            let price =
              item.pattern == 1 ? "" : parseFloat(item.price).toFixed(2);
            let totalMoney =
              item.pattern == 1 ? "" : parseFloat(price * number).toFixed(2);
            let contactPhone = this.contactPhone; //联系电话
            let contactName = this.contactName; //联系人
            let enterprise_address = this.enterprise_address; //单位地址
            let needInfoObj = {
              goods_name,
              goods_specifications,
              unit,
              number,
              pattern,
              explain,
              address,
              send_way,
              begin_date,
              contactPhone,
              contactName,
              enterprise_address,
              enterprise_type
            };
            let needInfoFlag = Object.keys(needInfoObj).every((item, index) => {
              let result = !!needInfoObj[item];
              if (!result) {
                needInfoArr.push({
                  item,
                  index
                });
              }
              return result;
            });
            if (!needInfoFlag) {
              this.show = true;
              this.submitErrorMsg = `请填写${needInfo[needInfoArr[0].item]}.`;
              return;
            }
            this.$api
              .UGsolicitation(
                goods_name,
                goods_ext,
                goods_specifications,
                unit,
                number,
                pattern,
                price,
                explain,
                address,
                send_way,
                begin_date
              )
              .then(res => {
                console.log(res);
                if (res.data.code === 200) {
                  console.log(1);
                  resolve(res);
                } else {
                  console.log(2);
                  this.submitErrorMsg = res.msg;
                  reject(res);
                }
              })
              .catch(err => {
                console.log("3");
                reject(err);
              });
          });
        })
      )
        .then(() => {
          this.submitResult = true;
          this.show = true;
        })
        .catch(err => {
          console.log(err);
          this.submitResult = false;
          this.submitErrorMsg = "登记失败！";
          this.show = true;
        });
    },
    getGoodNames(e) {
      // if (e.target.value == "11") {
      // }
    },
    closePopup() {
      this.show = false;
    },
    changeMethods(e, item) {
      let value = e.target.value;
      console.log(e);
      console.log(item);
      this.disabled = value == "1" ? true : false;
      if (this.disabled) {
        item.price = "";
        item.totalMoney = "";
      }
    },
    routerToSuccess() {
      this.show = false;
      setTimeout(() => {
        this.$router.push({
          name: "materialSumbitSuccess"
        });
      }, 100);
    }
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
.pad20 {
  padding: 20px;
}

input.labelauty + label {
  font: 12px "Microsoft Yahei";
}
.material-submit-detail {
  padding-top: 1.5rem;
}
</style>
