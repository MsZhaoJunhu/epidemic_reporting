<template>
  <div class="residentClockin">
    <!-- <section class='aui-flexView'>
            <div class='er'></div>
        </section>  -->
    <TopHeader title="来院登记二维码" isShow="true" class="header">
      <template v-slot:rightBtn>
        <div class="operation">
          <span class="save" @click="toImage()">保存为图片</span>
        </div>
      </template>
    </TopHeader>
    <div class="saveImg" v-show="fenxiang != ''">
      <span
        @click="
          () => {
            fenxiang = '';
          }
        "
        >×</span
      >
      <div>
        <img :src="fenxiang" width="100%" />
      </div>
      <p>长按图片进行保存，之后就可以分享了哦</p>
    </div>
    <div class="erweima-container" ref="imageWrapper">
      <p style="text-align: center;font-size: 20px;">
        {{ companyInfo.name }}<br /><font size="4" color="#AAAAAA"
          >（来访登记二维码）</font
        >
      </p>
      <div class="erweima-preInfo">
        <p style="padding:1rem 2rem;margin:0 auto">
          <img
            src="../assets/skin/images/clockin-title.png"
            alt="clockin-title.png"
          />
        </p>
        <p
          style="display:flex;flex-direction:column;text-align: center;margin-top:0"
        >
          <span style="color:#ccc">提升防疫意识，确保自己和家人的健康</span>
          <span style="color:#ccc"
            >扫码二维码查进行个人信息登记，和我一起“集体防疫”</span
          >
        </p>
      </div>
      <div class="erweima-info">
        <div
          id="qrCode"
          ref="qrCodeDiv"
          @touchstart="handleTouchStart"
          @touchend="handleTouchEnd"
        ></div>
        <div class="erweima-save-share">
          长按此处保存图片，可打印或分享朋友圈
        </div>
      </div>
    </div>
    <div
      style="display: flex;justify-content: center;align-items: center;flex-direction: column;"
    >
      <span style="margin-bottom: 10px;">推广链接</span
      ><textarea
        type="text"
        :value="link"
        readonly="readonly"
        class="fenxiangLink"
      ></textarea>
    </div>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
import html2canvas from "html2canvas";
import TopHeader from "../components/TopHeader.vue";
export default {
  name: "residentClockin",
  data() {
    return {
      companyName: "重庆市城银科技股份有限公司",
      companyInfo: JSON.parse(localStorage.getItem("CompenyInfo")),
      imageUrl: null,
      timer: null,
      //    companyInfo:''   ,
      fenxiang: "",
      link: ""
    };
  },
  components: {
    TopHeader
  },
  created() {
    this.link =
      "http://fgfcwx.cy-coo.com/#/regHospital?id=" + this.companyInfo.id;
  },
  mounted() {
    this.bindQRCode();
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  methods: {
    toImage() {
      const that = this;
      html2canvas(this.$refs.imageWrapper).then(canvas => {
        let dataURL = canvas.toDataURL("image/png");
        this.imgUrl = dataURL;
        that.fenxiang = this.imgUrl;
        if (this.imgUrl !== "") {
          this.dialogTableVisible = true;
        }
      });
    },
    bindQRCode() {
      const that = this;
      new QRCode(this.$refs.qrCodeDiv, {
        text: that.link, //测试
        width: 200,
        height: 200,
        colorDark: "#333333", //二维码颜色
        colorLight: "#ffffff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
      });
    },
    handleTouchStart(e) {
      this.timer = setTimeout(() => {
        this.saveQRCode();
      }, 500);
    },
    handleTouchEnd(e) {
      this.endTime = +new Date();
      clearTimeout(timer);
    },
    saveQRCode() {
      html2canvas(this.$refs.imageWrapper).then(canvas => {
        let dataURL = canvas.toDataURL("image/png");
        // this.imgUrl = dataURL
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.fenxiangLink {
  text-align: center;
  padding: 5px 10px;
  border: none;
  width: 250px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: rgba(0, 0, 0, 0.6);
  outline: none;
  resize: none;
}
.saveImg {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 999999;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  span {
    font-size: 40px;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 30px;
  }

  div {
    width: 70%;
    height: 50%;
    display: flex;
    align-items: center;
    overflow: hidden;
    border-radius: 5px;
  }

  p {
    padding-top: 20px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
  }
}
.operation {
  color: #007aff;
}

.header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

.residentClockin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  height: 100%;
  background: rgb(236, 235, 235);
  padding: 1rem;

  .character {
    width: 100%;
    height: 60px;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .character-image {
      flex-shrink: 0;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: coral;
    }

    .character-info {
      margin-left: 10px;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }

  .erweima-container {
    margin: 0.5rem;
    margin-bottom: 2rem;
    background: #fff;
    border-radius: 0.5rem;

    .erweima-preInfo {
      p {
        span {
          font-size: 10px;
        }
      }
    }

    .erweima-info {
      display: flex;
      flex-direction: column;
      align-items: center;

      #qrCode {
      }

      .erweima-save-share {
        padding: 2rem 0;
      }
    }
  }

  .residentClockin-record {
    width: 90%;
    height: 40px;
    margin: 0 auto;
    border-radius: 1rem;
    background: rgb(39, 107, 235);
    box-shadow: 0px 3px 6px rgb(111, 159, 247);
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      color: #fff;
    }
  }

  .residentClockin-comeToVisit {
    width: 90%;
    height: 40px;
    margin: 1rem auto;
    border-radius: 1rem;
    background: #fff;
    border: 1px solid #f8f8f8;
    box-shadow: 0px 3px 6px rgb(180, 180, 180);
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      color: #000;
    }
  }
}
</style>
