<template>
  <div class="jubaojilu">
    <header class="aui-navBar aui-navBar-fixed">
      <a href="javascript:;" class="aui-navBar-item">
        <i class="icon icon-return" @click="back"></i>
      </a>
      <div class="aui-center">
        <span class="aui-center-title">我的举报记录</span>
      </div>
      <a href="javascript:;" class="aui-navBar-item">
        <i class="icon icon-sys"></i>
      </a>
    </header>
    <div class="content">
      <div v-for="(item,index) of list " class="content1" @click="go(item.id)" :key="index">
        <div class="toubu">
          <span>{{item.create_time.split(' ')[0]}}</span>
          <span v-show="item.status==1">待受理</span>
          <span v-show="item.status==2">受理中</span>
          <span v-show="item.status==3">已受理</span>
		  <span v-show="item.status==4">受理失败</span>
        </div>
        <div class="zhongbu">
          <a v-show="item.report_type==1">人群聚集</a>
          <a v-show="item.report_type==2">传谣/造谣</a>
          <a v-show="item.report_type==3">贩卖/宰杀野生动物</a>
          <a v-show="item.report_type==4">恶意哄抬医用物资/物价</a>
          <a v-show="item.report_type==5">诈骗募捐</a>
          <a v-show="item.report_type==6">其他</a>
        </div>
        <div class="dibu">
          <p>{{item.detail_address}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: "",
      create_time: "",
      list: []
    };
  },
  created() {
    const that = this;
    this.$api.myinform().then(function(value) {
      that.list = value.data.data;

      console.log(that.list);
      switch (value.data.code) {
        case 200:
          break;
          that.$toast.text(value.data.msg);

        case 500:
          that.$toast.text(value.data.msg);
          break;
        default:
          break;
      }
    });
  },
  methods: {
    go(id) {
      this.$router.push({
        path: "/jubaoxiangqing",
        query: { id: id }
      });
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/skin/css/tijiao.scss";
@import "../assets/skin/css/jquery-labelauty.scss";
.dibu {
  font-size: 12px;
  color: rgba(151, 146, 146, 0.952);
  padding: 5px 10px;
}
.zhongbu {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.jubaojilu {
  background-color: rgba(240, 240, 240, 0.952);
}
.content {
}
.toubu {
	padding-right: 10px;
	padding-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content1 {
	box-shadow: 0 0 10px rgba(0,0,0,.1);
  a {
    font-size: 14px;
  }
  background-color: white;
  height: 16%;
  margin: 5% 5% 0 5%;
  border-radius: 8px;
  .toubu {
    span:nth-child(1) {
      margin: 4px 0 0 5px;
      font-size: 12px;
      height: 22%;
      padding-top: 1%;
      width: 30%;
	  display: flex;
	  align-items: center;
    }
	span:nth-child(1):before{
		content: '';
		margin-right: 10px;
		display: block;
		height: 12px;
		width: 12px;
		background: #007AFF;
		border-radius: 50%;
	}
    span:nth-child(2) {
      color: green;
      font-size: 14px;
      margin: 4px 10px 0 0;
    }
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
input.labelauty + label {
  font: 12px "Microsoft Yahei";
}
</style>
