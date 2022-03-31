<template>
  <section class="rating_page">
    <div class="title">
      <i class="el-icon-arrow-left titleImg" @click="prev()"></i>
      <span class="ellipsis">在线支付</span>
      <span></span>
    </div>
    <section class="show_time_amount">
      <header class="time_last">支付剩余时间</header>
      <p class="time">00 :
        <!-- <span v-if="payMinutes<10">0</span> -->
        {{payMinute}} :
        <!-- <span v-if="paySeconds<10">0</span> -->
        {{paySecond}}
      </p>
    </section>
    <div class="pay_way">选择支付方式</div>
    <section class="pay_way_list">
      <section class="pay_items">
        <div class="pay_icon_contaienr">
          <div class="zhifubao"></div>
          <span>支付宝</span>
        </div>
        <img
          @click="pay_ZW=true"
          v-if="pay_ZW==true"
          src="../../../assets/common/select.png"
          alt
          class="choose_icon"
        >
        <img
          v-else
          @click="pay_ZW=true"
          src="../../../assets/common/noselect.png"
          alt
          class="choose_icon"
        >
      </section>
      <section class="pay_items">
        <div class="pay_icon_contaienr">
          <div class="weixin"></div>
          <span>微信</span>
        </div>
        <img
          @click="pay_ZW=false"
          v-if="pay_ZW==true"
          src="../../../assets/common/noselect.png"
          alt
          class="choose_icon"
        >
        <img
          @click="pay_ZW=false"
          v-else
          src="../../../assets/common/select.png"
          alt
          class="choose_icon"
        >
      </section>
    </section>
    <p class="determine" @click="payfor()">确认支付</p>
    <!-- 消息弹框 -->
    <message-box :title="titleText" :showHide="showHide" :change="shchange"></message-box>
  </section>
</template>

<script>
//导入弹框
import messageBox from '../../common/Component/messageBox'
export default {
  name: "buyVipCard",
  components:{
      messageBox,
  },
  data() {
    return {
      //支付宝微信状态切换
      pay_ZW: true,
      //倒计时minutes
      payMinutes: 15,
      //倒计时second
      paySeconds: 0,
      //消息弹框的内容
      titleText: "",
      showHide: false,
    };
  },
  mounted () {
      this.add()
    },
  watch: {
    paySecond: {
      handler(newVal) {
        // this.num(newVal)
        if (newVal < 10) {
          return newVal < 10 ? "0" + newVal : "" + newVal;
        }
      }
    },
    payMinutes: {
      handler(newVal) {
        if (newVal < 10) {
          return newVal < 10 ? "0" + newVal : "" + newVal;
        }
      }
    }
  },
  computed: {
    paySecond() {
      return this.num(this.paySeconds);
    },
    payMinute() {
      return this.num(this.payMinutes);
    }
  },
  methods: {
      // 框架双向绑定方法
    shchange(val) {
      this.showHide = val;
    },
    prev(){
        this.$router.go(-1);
    },
      //提交
    payfor(){
      if (this.payMinutes==0&&this.paySeconds==0) {
        this.titleText="支付超时";
        this.showHide=true;
      }else{
        this.titleText="当前环境无法支付,请打开官方APP进行付款";
        this.showHide=true;
      }

    },
    //时间方法
    num(n) {
      return n < 10 ? "0" + n : "" + n;
    },
    add() {
      var _this = this;
      var time = window.setInterval(function() {
        if (_this.paySeconds === 0 && _this.payMinutes !== 0) {
          _this.paySeconds = 59;
          _this.payMinutes -= 1;
        } else if (_this.payMinutes === 0 && _this.paySeconds === 0) {
          _this.paySeconds = 0;
          window.clearInterval(time);
        } else {
          _this.paySeconds -= 1;
        }
      }, 1000);
    }
  }
};
</script>

<style scoped>
.rating_page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 202;
  padding-top: 1.95rem;
}
/* 头部样式 */
.title {
  width: 100%;
  height: 1.95rem;
  background: #3190e8;
  line-height: 1.95rem;
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
  z-index: 100;
}
.titleImg {
  width: 0.6rem;
  height: 1rem;
  font-size: 1rem;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 0.2rem;
  margin-top: -0.5rem;
}
.title span:first-of-type {
  width: 50%;
  display: inline-block;
  font-size: 0.8rem;
  /* font-weight: 700; */
  margin-top: 0.15rem;
  vertical-align: top;
}
.title span:last-of-type {
  display: inline-block;
  font-size: 0.65rem;
  color: white;
  position: absolute;
  top: 50%;
  right: 0.55rem;
  transform: translateY(-50%);
}
.title span:last-of-type img {
  width: 0.8rem;
  font-weight: 700;
  margin-top: 1rem;
}
/* 在线支付 */
.show_time_amount {
  text-align: center;
  background-color: #fff;
  padding: 0.7rem;
}
.time_last {
  font-size: 0.6rem;
  color: #666;
  margin-top: 1rem;
}
.show_time_amount .time {
  font-size: 1.5rem;
  color: #333;
  margin: 0.3rem 0 1rem;
}
.pay_way {
  background-color: #f1f1f1;
  padding: 0 0.7rem;
  font-size: 0.7rem;
  color: #666;
  line-height: 1.8rem;
}
.pay_way_list {
  background-color: #fff;
}
.pay_way_list .pay_items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0.7rem;
  line-height: 2.6rem;
  border-bottom: 0.025rem solid #f5f5f5;
}
.pay_icon_contaienr {
  display: flex;
  -ms-flex-align: center;
  align-items: center;
}
.zhifubao {
  width: 2rem;
  height: 2rem;
  background: url("../../../assets/common/pay.png") no-repeat;
  background-size: 100% 100%;
  margin-right: 0.2rem;
  display: inline-block;
}
.pay_way_list .pay_items .pay_icon_contaienr span {
  font-size: 0.7rem;
  color: #666;
}
.choose_icon {
  width: 1rem;
  height: 1rem;
}
.weixin {
  width: 2rem;
  height: 2rem;
  background: url("../../../assets/common/pay_wx.png") no-repeat;
  background-size: 100% 100%;
  margin-right: 0.2rem;
  display: inline-block;
}
.determine {
  background-color: #4cd964;
  font-size: 0.7rem;
  color: #fff;
  text-align: center;
  margin: 0 0.7rem;
  line-height: 1.8rem;
  border-radius: 0.2rem;
  margin-top: 0.6rem;
}
</style>
