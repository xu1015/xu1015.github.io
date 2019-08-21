<template>
  <div class="email">
    <div style="z-index:2000; width:50px;height:50px;position: fixed;top:320px;right:16px;" class="dianbao"
      @mouseleave="diaobaoover"
      @mouseenter="diaobaoenter">
      <a
        class="tb"
        :href="$t('ekd.dianbao')"
        :title="$t('ekd.dianbao')"
        target="blank"
        style="width:50px;height:50px;display:block;"
      ></a>
    </div>

    <div class="dianbao2" style="z-index:2000;">
      <div class="dianbao2_top" @mouseleave="dianbao2lever" style="display: none;">
        <span>contact@eoskingdom.io</span>
      </div>
      <div class="dianbao2_bottom" @mouseenter="dianbao2enter">
        <a class="em" href="#" style="width:50px;height:50px;display:block;"></a>
      </div>
    </div>
    <div class="dianbao3" style="z-index:2000;" @mouseenter="dianbao3enter" @mouseleave="dianbao3lever">
      <a
        href="https://twitter.com/eoskingdom"
        title="https://twitter.com/eoskingdom"
        target="blank"
        style="width:50px;height:50px;display:block;"
      ></a>
    </div>
    <div class="dianbao4" style="z-index:2000;">
      <div class="dianbao4_top" @mouseleave="dianbao4lever"></div>
      <div class="msgtop">
        <div @mouseenter="dianbao4enter">
          <a class="wc" href="#" style="width:50px;height:50px;display:block;"></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "email",
  data() {
    return {
      lianxi: [],
      hrf: this.$t("ekd.dianbao")
    };
  },
  mounted() {
    // this.lianxi[3].close()
    if (sessionStorage.getItem("email") == null) {
      this.EKDmsglink();
      sessionStorage.setItem("email", "EKDemail");
    }
  },
  methods: {
    diaobaoenter() {
      document.getElementsByClassName("dianbao")[0].style.opacity = "1";
    },
    diaobaoover() {
      document.getElementsByClassName("dianbao")[0].style.opacity = "0.5";
    },
    dianbao2enter() {
        document.getElementsByClassName("dianbao2_top")[0].style.display ="block";
        document.getElementsByClassName("dianbao2")[0].style.width = "280px";
        document.getElementsByClassName("em")[0].style.display = "none";
        document.getElementsByClassName("dianbao2")[0].style.opacity = "1";
    },
    dianbao2lever() {
      document.getElementsByClassName("dianbao2")[0].style.width = "50px";
      document.getElementsByClassName("dianbao2_top")[0].style.display = "none";
      document.getElementsByClassName("em")[0].style.display = "block";
      document.getElementsByClassName("dianbao2")[0].style.opacity = "0.5";
    },
    dianbao3enter() {
      document.getElementsByClassName("dianbao3")[0].style.opacity = "1";
    },
    dianbao3lever() {
      document.getElementsByClassName("dianbao3")[0].style.opacity = "0.5";
    },
    dianbao4enter() {
      document.getElementsByClassName("dianbao4")[0].style.opacity = "1";
      document.getElementsByClassName("dianbao4")[0].style.width = "200px";
      document.getElementsByClassName("dianbao4")[0].style.height = "200px";
      document.getElementsByClassName("dianbao4_top")[0].style.display =
        "block";
      document.getElementsByClassName("dianbao4_top")[0].style.height = "200px";
      document.getElementsByClassName("wc")[0].style.display = "none";
    },
    dianbao4lever() {
      document.getElementsByClassName("dianbao4")[0].style.width = "50px";
      document.getElementsByClassName("dianbao4")[0].style.height = "50px";
      document.getElementsByClassName("dianbao4_top")[0].style.display = "none";
      document.getElementsByClassName("wc")[0].style.display = "block";
      document.getElementsByClassName("dianbao4")[0].style.opacity = "0.5";
    },

    EKDmsglink() {}
  }
};
</script>
<style>
.email {
  font-family: "Microsoft YaHei" !important;
}

.dianbao {
  background-color: #0db1dc;
  background-image: url("../assets/images/team/02TELEGRAM.png");
  background-size: 100% 100%;
  opacity: 0.5;
  box-shadow: -2px 2px 5px #252524;
  border-radius: 16px;
  border: 1px solid #0db1dc;
  transition: all 0.3s;
}

.dianbao2_bottom {
  width: 50px;
  height: 50px;
  background-image: url("../assets/images/team/01MAIL.png");
  background-size: 100% 100%;
}
.dianbao2 {
  width: 50px;
  height: 50px;
  background-color: white;
  position: fixed;
  top: 260px;
  right: 16px;
  opacity: 0.5;
  box-shadow: -2px 2px 5px #252524;
  border-radius: 16px;
  transition: all 0.3s;
}

.dianbao2_top {
  width: 280px;
  height: 50px;
  float: right;
  text-align: right;
  font-weight: 1000;
  color: #515A6E;
  font-size: 12px;
  display: none;
  position: relative;
  /* top: -6px; */
  transition: all 0.3s;
}

.dianbao2_top span {
  margin-right: 35px;
  position: relative;
  display: inline-block;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  transition: all 0.3s;
}

.dianbao3 {
  width: 50px;
  height: 50px;
  position: fixed;
  right: 16px;
  top: 380px;
  background-color: #03b4ff;
  background-image: url("../assets/images/team/03TWITTER.png");
  background-size: 100% 100%;
  opacity: 0.5;
  box-shadow: -2px 2px 5px #252524;
  border-radius: 16px;
  transition: all 0.3s;
}
.dianbao4 {
  width: 50px;
  height: 50px;
  position: fixed;
  right: 16px;
  top: 440px;
  background-size: 100% 100%;
  opacity: 0.5;
  box-shadow: -2px 2px 5px #252524;
  border-radius: 16px;
  background-image: url("../assets/images/team/04WECHAT.png");
  transition: all 0.3s;
}

.dianbao4_top {
  background-image: url("../assets/images/team/wechatscan.jpg");
  background-size: 100% 100%;
  width: 200px;
  display: none;
  position: relative;
  border-radius: 16px;
  border: 1px solid #76a64e;
  transition: all 0.3s;
}
</style>
