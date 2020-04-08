<template>
  <div class="materialSubmitRecord" v-if="showDetail === false" ref="materialSubmitRecord">
    <header class="aui-navBar aui-navBar-fixed">
      <a href="" class="aui-navBar-item">
        <i class="icon icon-return"></i>
      </a>
      <div class="aui-center">
        <span class="aui-center-title">物资需求列表</span>
      </div>
      <!-- <a href="javascript:;" class="aui-navBar-item">
        <i class="icon icon-sys"></i>
      </a>-->
      <div class="fbxq" v-show="fbxq_show">
        <button @click="fbxq">发布需求</button>
      </div>
    </header>
    <div class="slide-scroll" id="slide-scroll" ref="slideScroll">
      <div class="item-search">
        <div class="item-category">
          <!-- <select v-model="goods_category" @change='handleSelected' > -->
            <select @change ='handleSelected' >
            <option value="0" selected>全部</option>
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
        </div>
        <div class="item-input">
          <input type="text" placeholder="请填写具体规格" v-model="goods_specifications" />
        </div>
        <div class="onsearch" @click="onSearch">
          <nut-icon type="search" size="14px" color="#333"></nut-icon>
        </div>
      </div>
      <div class="materialSubmit-items" v-for="(materialItems, i) in material_goods" :key="i">
        <div class="target-address">
          <span>{{ materialItems.enterprise_name }}</span>
        </div>
        <div v-for="(item, index) in materialItems.goods_list" :key="index" class="material-item">
          <div v-if="index < 3" class="item">
            <span>{{ item.goods_name }}</span>
            <span>{{ item.goods_specifications }}</span>
            <span style="color:#828282">{{ `${item.number}${item.unit}` }}</span>
          </div>
        </div>
        <div class="hideDetail">
          <div class="another-material-item">
            <span
              style="color:#828282"
              v-if="materialItems.goods_list.length >= 3"
            >另有{{ materialItems.goods_list.length - 3 }}项其它物资</span>
            <span style="color:#828282" v-else>另有0项其它物资</span>
            <span class="dead-line">{{ materialItems.deadline }}日前截止</span>
          </div>
          <div class="showDetail">
            <nut-button
              class="blue"
              shape="circle"
              block
              small
              color="rgb(255,255,255)"
              @click.native="handleDetail(materialItems.id)"
            >查看详情</nut-button>
          </div>
        </div>
      </div>
      <div class="scroll-loading">
        <!-- <nut-icon type='more' size='20px'></nut-icon> -->
        <span v-if="showloading === true">加载中</span>
        <span v-else>已经到底了</span>
      </div>
      <tabbar active="2"></tabbar>
    </div>
  </div>
  <div v-else>
    <div>
      <check-detail @hideShowDetail="hideShowDetail" :itemDetailList="itemDetailList"></check-detail>
    </div>
    <tabbar active="2"></tabbar>
  </div>
</template>

<script>
import tabbar from "@/components/tabbar.vue";
import checkDetail from "@/views/MaterialCollection/children/check-detail.vue";
export default {
  data() {
    return {
      showloading: false,
      showDetail: false,
      allowFefresh: false,
      search_goods:false, //标识用户是否正在搜索
      page: 1, //加载页面
      goods_specifications: "",
      showItemId: 1,
      address: "测试地址",
      itemDetailList: null,
      material_goods: [],
      goods_category: "全部",
      copyMaterial_goods: [],
       fbxq_show: true, //发布需求按钮隐藏
      options:[
        {
          value:'0',
          name:'全部'
        },
        {
          value:'1',
          name:'医疗设备'
        },
        {
           value:'2',
           name:'口罩',  
        },
        {
          value:'3',
          name:'医用防护服',
        },
        {
          value:'4',
          name:'医用手套'
        },
         {
          value:'5',
          name:'防护面罩'
        },
         {
          value:'6',
          name:'鞋套'
        },
         {
          value:'7',
          name:'护目镜'
        },
         {
          value:'8',
          name:'红外线体温计'
        },
         {
          value:'9',
          name:'消毒用品'
        },
         {
          value:'10',
          name:'药品'
        },
        {
          value:'11',
          name:'其它'
        }
      ]
    };
  },
  created() {
    this.goods_category = '全部'
    this.Load();


  },
  computed: {},
  filters: {
    formate(value) {}
  },
  components: {
    checkDetail,
    tabbar
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    this.getSendList();
  },
  beforeDestroy() {
    this.page = 1;
  },
  methods: {
    Load() {
      if (localStorage.getItem("UserInfo")) {
        this.fbxq_show = false;
      }
    },
    handleSelected(e){
      // console.log('v');
      // console.log(e.target.value);
      this.goods_category=this.getGoodsName(e.target.value)
      console.log(this.goods_category);
    },
    fbxq() {
      if (localStorage.getItem("CompenyInfo")) {
        this.$router.push({ name: "materialDemandRelease" });
      } else if (localStorage.getItem("UserInfo")) {
        this.fbxq_show = false;
      } else {
        this.$router.push({ name: "login" });
      }
    },
    handleDetail(id) {
      //筛选符合条件的列表
      this.itemDetailList = JSON.parse(
        JSON.stringify(this.material_goods)
      ).filter(item => {
        return id === item.id;
      });
      this.showDetail = true;
    },
    async handleScroll() {
      let sumTop = this.getScrollTop() + this.getClientHeight();
      //如果滑动到底部而且当前列表是10的整数倍(因为1次增加10条，如果不满10条，则不再调用接口)
      // 新增判断用户是否在搜索（如果搜索结果刚好是10条，底部则会出现'加载中'的bug）
      // 应该显示为'到底了'
      if (
        sumTop === this.getScrollHeight() &&
        this.material_goods.length % 10 === 0 && !this.search_goods
      ) {
        this.showloading = true;
        this.allowFefresh = true;
      } else {
        this.allowFefresh = false;
      }
      //如果允许加载（allowFefresh）,能显示加载按钮(showloading),没有点击搜索按钮
      //则可以进行调用接口的操作
      if (this.allowFefresh && this.showloading && !this.search_goods) {
        this.page += 1;
        await this.$api.G_demand(this.page).then(res => {
          if (res.data.code === 200) {
            if (res.data.list.length !== 0) {
              // this.material_goods = this.material_goods.concat(
              //   JSON.parse(JSON.stringify(res.data.list))
              // );
              this.material_goods = [...this.material_goods, ...res.data.list];
              // this.copyMaterial_goods = this.copyMaterial_goods.concat(
              //   JSON.parse(JSON.stringify(res.data.list))
              // );
              console.log(this.material_goods.length);
              this.copyMaterial_goods = [
                ...this.copyMaterial_goods,
                ...res.data.list
              ];
              this.showloading = false;
            } else if (res.data.list.length < 10) {
              this.allowFefresh = false;
              this.showloading = false;
            }
          }
        });
      }
    },
    getScrollHeight() {
      var scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
      }
      scrollHeight =
        bodyScrollHeight - documentScrollHeight > 0
          ? bodyScrollHeight
          : documentScrollHeight;
      return scrollHeight;
    },
    getScrollTop() {
      let scrollTop = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollTop = document.body.scrollTop;
      }
      return scrollTop;
    },
    getClientHeight() {
      let clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(
          document.body.clientHeight,
          document.documentElement.clientHeight
        );
      } else {
        clientHeight = Math.max(
          document.body.clientHeight,
          document.documentElement.clientHeight
        );
      }
      return clientHeight;
    },
    getSendList() {
      let self = this;
      this.$api
        .G_demand(this.page)
        .then(res => {
          switch (res.data.code) {
            case 200:
              let material_goods = JSON.parse(JSON.stringify(res.data.list));
              this.allowFefresh = res.data.list.length < 10 ? false : true; //如果数量小于10 则无法下拉刷新
              this.copyMaterial_goods = material_goods;
              this.material_goods = material_goods;
              break;
            case 500:
              this.$dialog({
                id: "failed",
                title: "加载失败",
                noCancelBtn: true,
                onOkBtn() {
                  this.close();
                  self.$router.back(-1);
                }
              });
          }
        })
        .catch(err => {});
    },
    getGoodsName(value) {
      let result = [
        {
          value: 0,
          name: "全部"
        },
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
          name: "其它"
        }
      ].find(item => item.value == value);
      return result ? result.name : '';
    },
    renderPage(itemDetailList) {
      itemDetailList.forEach(item => {});
    },
    hideShowDetail() {
      this.showDetail = false;
    },
    onSearch() {
      // 不可以继续加载数据
      this.search_goods = true; //表示正在使用搜索功能
      this.showloading = false;//点击搜索不用显示“加载中”
      let goods_specifications = this.goods_specifications || "";
      // let goods_category = this.getGoodsName(this.goods_category);
      let goods_category = this.goods_category;
      //用户选择"未选择" 则清空信息
      if (goods_category === "全部" && goods_specifications == '') {
        this.goods_specifications = "";
        this.material_goods = JSON.parse(
          JSON.stringify(this.copyMaterial_goods)
        );
        //可以继续进行加载数据
        this.search_goods = false;
        this.showloading = true;
        return;
      }
      let arr = [];
      //如果规格的值为空，则只根据产品名称进行筛选
      this.copyMaterial_goods.forEach(item => {
        item.goods_list.forEach(item2 => {
          let flag =
          (goods_category == '全部' || goods_category == '未选择' || goods_category == '' ?
             true :  item2.goods_name == goods_category) &&
            (goods_specifications
              ? item2.goods_specifications == goods_specifications
              : true);
              console.log(flag);
          if (flag) {
            arr.push(item);
          }
        });
      });
      console.log(arr);
      let result = [];
      let obj = {};
      //去掉数组中重复添加的需求列表信息
      for (let i = 0; i < arr.length; i++) {
        if (!obj[arr[i].id]) {
          result.push(arr[i]);
          obj[arr[i].id] = true;
        }
      }
      this.material_goods = result;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/skin/css/tijiao.scss";
@import "../../assets/skin/css/jquery-labelauty.scss";
@import "../../assets/skin/css/staffHealthySuccess.scss";
.materialSubmitRecord {
  padding-bottom: 50px;
  .aui-navBar {
    // background:rgb(47, 152, 223);
    background: rgb(245, 245, 245);
    .aui-center-title {
      color: #333;
    }
  }
  .item-search {
    padding: 0.5rem 0;
    width: 90%;
    margin: 1rem auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    // background:#f5f5f5;
    .item-category {
      height: 30px;
      box-sizing: border-box;
      padding-left: 1rem;
      border: 1px solid #999;
      overflow: hidden;
      border-top-left-radius: 1rem;
      border-bottom-left-radius: 1rem;
      border-right: 0px;
      background: rgb(245, 245, 245);
      select {
        // border:none;
        // outline: none;
        border: 0px;
        height: 30px;
        background: rgb(245, 245, 245);
        border-right: 0px;
        box-sizing: border-box;
        font-size: 13px;
      }
    }
    .item-input {
      height: 30px;
      box-sizing: border-box;
      border-top: 1px solid #999;
      border-bottom: 1px solid #999;
      background: rgb(245, 245, 245);
      overflow: hidden;
      input {
        border: 0;
        font-size: 13px;
        text-indent: 1em;
        height: 30px;
        background: rgb(245, 245, 245);
      }
    }
    .onsearch {
      height: 30px;
      width: 5rem;
      padding: 10px;
      // background:cornflowerblue;
      background: rgb(245, 245, 245);
      border-top: 1px solid #999;
      border-bottom: 1px solid #999;
      border-right: 1px solid #999;
      // color:#fff;
      display: flex;
      justify-content: center;
      align-items: center;
      // border-radius: .5rem;
      border-top-right-radius: 1rem;
      border-bottom-right-radius: 1rem;
    }
  }
  .materialSubmit-items {
    width: 90%;
    margin: 0 auto;
    // border: 1px solid #e8e8e8;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
    margin-bottom: 1rem;
    .target-address {
      font-size: 1rem;
      color: rgb(9, 128, 252);
      padding: 0.5rem;
      border: 1px solid #f5f5f5;
    }
    .material-item {
      .item {
        border: 1px solid #f5f5f5;
        margin-top: -1px;
        padding: 0.5rem;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .hideDetail {
      .another-material-item {
        border: 1px solid #f5f5f5;
        height: 40px;
        padding: 0 0.5rem;
        line-height: 21px;
        margin-top: -1px;
        color: #828282;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 14px;
        }
      }
      .showDetail {
        padding: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        .blue {
          background: rgb(9, 129, 252);
        }
      }
    }
    .scroll-loading {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .s-detail {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .scroll-loading {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .fbxq {
    position: absolute;
    right: 10px;
    font-size: 14px;
    top: 7px;

    button {
      width: 67px;
      height: 32px;
      background-color: #007aff;
      color: #f5f5f5;
      border: none;
      border-radius: 5px;
    }
  }
}
</style>
