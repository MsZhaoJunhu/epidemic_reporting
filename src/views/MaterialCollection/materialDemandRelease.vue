<template>
  <section class="aui-flexView">
    <header class="aui-navBar aui-navBar-fixed">
      <a href="javascript:history.back(-1);" class="aui-navBar-item">
        <i class="icon icon-return"></i>
      </a>
      <div class="aui-center">
        <span class="aui-center-title">物资需求发布表</span>
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
                v-model="enterprise_name"
                placeholder="请输入公司/单位名称"
                :disabled ="enterprise_name != ''"
              />
            </td>
          </tr>
          <!-- <tr>
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
          </tr> -->
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
            <td class="resumption-sec-td" style='position:relative'>
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
              <div class='virtual-input' v-show='item.goods_name == 11'>
                <input type="text"
                v-model='item.another_goods_name'
                placeholder="请输入物资名称">
              </div>
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
            <td class="resumption-fir-td resumption-start">是否有偿购买</td>
            <td class="resumption-sec-td">
              <select
                v-model="item.is_donation"
                @change="changeMethods($event, item)"
              >
                <option value="1">是</option>
                <option value="0">否</option>
              </select>
            </td>
          </tr>
          <!-- <tr>
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
          </tr> -->
          <!-- <tr>
            <td class="resumption-fir-td resumption-start">用途说明</td>
            <td class="resumption-sec-td">
              <input
                type="text"
                v-model="item.explain"
                placeholder="请输入用途说明"
              />
            </td>
          </tr> -->
        </table>

        <div class="materialSolicitationRegister-btn-par">
          <button @click="clickToAddTable">新增</button>
        </div>
        <h6>收货信息</h6>
        <table class="resumption-table">
          <tr>
            <td class="resumption-fir-td resumption-start">收货地点</td>
            <td class="resumption-sec-td">
              <input
                type="text"
                v-model="address"
                placeholder="请输入收货地点"
              />
            </td>
          </tr>
          <!-- <tr>
            <td class="resumption-fir-td resumption-start">收货方式</td>
            <td class="resumption-sec-td">
              <select v-model="send_way">
                <option value="1">自提</option>
                <option value="2">物流</option>
                <option value="3">免费送货</option>
              </select>
            </td>
          </tr> 
          <tr>
            <td class="resumption-fir-td resumption-start">收货时间</td>
            <td class="resumption-sec-td">
              <input
                type="text"
                v-model="end_date"
                placeholder="请输入收货时间"
                @focus="isActived1"
              />
              <nut-datepicker
                :is-visible="isVisible1"
                type="date"
                title="请选择日期"
                :is-show-chinese="false"
                @close="switchPicker1"
                @choose="setChooseValue1"
              >
              </nut-datepicker>
            </td>
          </tr>
          <tr>
            <td class="resumption-fir-td resumption-start">开始时限</td>
            <td class="resumption-sec-td">
              <input
                type="text"
                v-model="begin_date"
                placeholder="开始时限"
                @focus="isActived2"
              />
              <nut-datepicker
                :is-visible="isVisible2"
                type="date"
                title="请选择日期"
                :is-show-chinese="false"
                @close="switchPicker2"
                @choose="setChooseValue2"
              >
              </nut-datepicker>
            </td>
          </tr>-->
          <tr>
            <td class="resumption-fir-td resumption-start">截止时限</td>
            <td class="resumption-sec-td">
              <input
                type="text"
                v-model="deadline"
                placeholder="截止时限"
                @focus="isActived3"
              />
              <nut-datepicker
                :is-visible="isVisible3"
                type="date"
                title="请选择日期"
                :is-show-chinese="false"
                :defaultValue="StartDate"
                @close="switchPicker3"
                @choose="setChooseValue3"
              >
              </nut-datepicker>
            </td>
          </tr>
        </table>

        <div class="materialSolicitationRegister-btn-par">
          <button @click="submit">提交发布</button>
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
                物资需求信息提交成功,信息审核通过后,将在需求列表显示。
              </p>
              <p v-else-if="StartDate!=''">
                物资信息提交失败，{{ submitErrorMsg }}
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
export default {
  name: "disinfections",
  data() {
    return {
      isVisible1: false,
      isVisible2: false,
      isVisible3: false,
      enterprise_name: "",
      enterprise_address: "", //单位地址
      enterprise_type: "", //单位性质
      send_way: "",
      address: "",
      contactName: "",
      contactPhone: "",
      disabled: false,
      submitResult: false,
      submitErrorMsg: "",
      begin_date: "",
      end_date: "",
      deadline: "",
      patternWay: {
        "1": "无偿捐赠",
        "2": "平价销售",
        "3": "物资调拨"
      },
      material: [
        {
          goods_name: "",
          goods_ext: "",
          another_goods_name:'', //选择其它物资的名称
          goods_specifications: "",
          unit: "",
          number: "",
          price: "",
          explain: "",
          is_donation: ""
        }
      ],
      show: false,
      StartDate:""
    };
  },
  created(){
    this.Get_Date()
    this.Get_CompenyInfo()
  },
  mounted() {},
  computed: {
    // submitErrorMsg() {
    //   return "";
    // }
  },
  methods: {
    Get_Date(){
      var date=new Date();
      var month = date.getMonth() + 1;
      this.deadline= date.getFullYear()+"-"+month+"-"+date.getDate()
      this.StartDate=date.getFullYear()+"-"+month+"-"+date.getDate()
      
    },
    Get_CompenyInfo(){
      if(localStorage.getItem("CompenyInfo")){
        var list=localStorage.getItem("CompenyInfo")
        list=JSON.parse(list)
        this.enterprise_name=list.name
      }
    },
    clickToAddTable() {
      this.material.push({
        goods_name: "",
        goods_specifications: "",
        another_goods_name:'',
        unit: "",
        number: "",
        is_donation:''
        // price: "",
        // totalMoney: "",
        // materialAllprice: "",
        // explain: "",
        // pattern: ""
      });
    },
    switchPicker1() {
      this.isVisible1 = false;
    },
    switchPicker2() {
      this.isVisible2 = false;
    },
    switchPicker3() {
      this.isVisible3 = false;
    },
    isActived1() {
      this.isVisible1 = true;
    },
    isActived2() {
      this.isVisible2 = true;
    },
    isActived3() {
      this.isVisible3 = true;
    },
    setChooseValue1(e) {
      let year = e[0];
      let month = e[1];
      let day = e[2];
      this.end_date = this.formatTime(year, month, day);
    },
    setChooseValue2(e) {
      let year = e[0];
      let month = e[1];
      let day = e[2];
      this.begin_date = this.formatTime(year, month, day);
    },
    setChooseValue3(e) {
      let year = e[0];
      let month = e[1];
      let day = e[2];
      this.deadline = this.formatTime(year, month, day);
    },
    formatTime(year, month, day, str = "y-M-d ") {
      year = year + "";
      month = month + "";
      day = day + "";
      month.length < 2 ? (month = "0" + month) : month;
      day.length < 2 ? (day = "0" + day) : day;
      return `${year}-${month}-${day}`;
    },
    submit() {
      if(localStorage.getItem("CompenyInfo")){     
        let allowSubmit = false; //判断是否可以上报的标志
        let address = this.address; //发货地址
        let send_way = this.send_way; //发货方式
        let begin_date = this.begin_date; //发货时间
        let enterprise_type = this.enterprise_type; //公司类型
        let contact = this.contactName;
        let contact_mobile = this.contactPhone;
        let enterprise_address = this.enterprise_address; //公司地址
        let goods_list = [];
        let deadline = this.deadline; //截止时间
        this.material.forEach((item, index) => {
        let obj = {
          goods_name: this.getGoodsName(item.goods_name,item.another_goods_name),
          goods_specifications: item.goods_specifications,
          unit: item.unit,
          number: item.number,
          is_donation: item.is_donation,
        };
        Object.keys(obj).forEach(item => {
          //如果物资信息有空，则不允许被成功上报
          if (!obj[item]) {
            allowSubmit = true;
          }
        });
        goods_list.push(obj);
      });
      if (!allowSubmit) {
          this.$api.EGdemand(
              enterprise_type,
              enterprise_address,
              contact,
              contact_mobile,
              send_way,
              address,
              deadline,
              goods_list
            )
            .then(res => {
              switch (res.data.code) {
                case 200:
                  this.show = true;
                  this.submitResult = true;
                  break;
                case 500:
                  this.show = true;
                  this.submitErrorMsg = res.data.msg;
              }
            })
            .catch(err => {
              this.show = true;
              this.submitErrorMsg = "发布错误！";
            });
      } else {
        this.show = true;
        this.submitErrorMsg = "请填写关于物资的基本信息！";
        return;
        }
      }else{
        this.show = true;
        this.submitErrorMsg = '个人无法进行需求发布！'
        return
      }
    },
    getGoodsName(value,another_goods_name) {
      let result = [
        {
          value: 1,
          name: "医疗设备"
        },
        {
          value: 2,
          name: "口罩"
        },
        {
          value: 3,
          name: "医用防护服"
        },
        {
          value: 4,
          name: "医用手套"
        },
        {
          value: 5,
          name: "防护面罩"
        },
        {
          value: 6,
          name: "鞋套"
        },
        {
          value: 7,
          name: "护目镜"
        },
        {
          value: 8,
          name: "红外线体温计"
        },
        {
          value: 9,
          name: "消毒用品"
        },
        {
          value: 10,
          name: "药品"
        },
        {
          value: 11,
          name: another_goods_name
        }
      ].find(item => item.value == value);
      return result ? result.name : "";
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
.aui-navBar {
  background: rgb(47, 152, 223);
  .aui-center-title {
    color: #fff;
  }
}
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
.virtual-input{
  width:99%;
  position: absolute;
  top:.4rem;
  left:1px;
  input{
    border:none;
  }
  

}
</style>
