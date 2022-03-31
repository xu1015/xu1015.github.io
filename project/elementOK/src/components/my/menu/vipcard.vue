<template>
  <div>
    <con-title title="会员中心"></con-title>
    <!-- <con-title title="会员中心"></con-title> -->
    <p class="buy">
      为账户
      <span v-if="$store.ComloginState!=200?false:true" class="name">{{$route.query.username}}</span>
      购买会员
    </p>
    <div class="pri">
      <div class="pri_head">
        <span>会员特权</span>
        <div class="pri_right" @click="goDes()">
          <span>会员说明</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="detail">
        <div class="detail_left">
          <img src="../img/省.jpg" alt>
        </div>
        <div class="detail_right">
          <h4>减免配送费</h4>
          <p>每月减免30单，每日可减免3单，每单最高减4元</p>
          <p>蜂鸟专送专享</p>
        </div>
      </div>
      <div class="detail">
        <div class="detail_left">
          <img src="../img/购.jpg" alt>
        </div>
        <div class="detail_right">
          <h4>减免配送费</h4>
          <p>每月减免30单，每日可减免3单，每单最高减4元</p>
          <p>蜂鸟专送专享</p>
        </div>
      </div>
    </div>
    <div class="apply">
      <div class="apply_head">开通会员</div>
      <div class="vipbuy">
        <div class="buy_left">
          <span>一个月</span>
          <span>¥20</span>
        </div>
        <div class="buy_right" @click="gobuyVip()">购买</div>
      </div>
    </div>
    <div class="pri_head bg" @click="goUsecart()">
      <span>兑换会员</span>
      <div class="pri_right">
        <span>使用卡号卡密</span>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div class="pri_head bg" @click="goInvoice()">
      <span>购买记录</span>
      <div class="pri_right">
        <span>开发票</span>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
import conTitle from "../conTitle";
export default {
  name: "vipcard",
  components: {
    conTitle
  },
  created() {
    console.log(this.$route.query.username);
    console.log("zhuangtai",this.$store.ComloginState);
    
  },
  methods: {
    prev() {
      this.$router.go(-1);
    },
    goDes() {
      this.$router.push({ name: "vipDescription" });
    },
    //购买会员
    gobuyVip(){
      this.$router.push({ name: "buyVipCard" });
    },
    // 兑换会员
    goUsecart(){
      this.$router.push({ name: "useCart" });
    },
    // 开发票
    goInvoice(){
      this.$router.push({ name: "invoiceRecord" });
    }
  }
};
</script>

<style scoped>
.title {
  height: 1.95rem;
  background: #3190e8;
  line-height: 1.95rem;
  color: white;
  position: relative;
  text-align: center;
}
.title strong i {
  font-size: 1rem;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 0.4rem;
  margin-top: -0.5rem;
}
.title span {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 700;
  margin-top: 0.15rem;
}
.title a {
  display: inline-block;
  color: white;
  font-size: 0.6rem;
  position: absolute;
  right: 0.4rem;
}
.buy {
  font-size: 0.6rem;
  color: #666;
  line-height: 2rem;
  padding-left: 0.7rem;
}
.name{
  color: #333;
  font-weight: 600;
}
.pri {
  background-color: #fff;
  padding-left: 0.7rem;
  margin-bottom: 0.5rem;
}
.pri_head {
  display: flex;
  justify-content: space-between;
  line-height: 2rem;
  border-bottom: 1px solid #f5f5f5;
  padding-right: 0.7rem;
  font-size: 0.7rem;
  color: #333;
}
.pri_right {
  display: flex;
  align-items: center;
}
.pri_right span {
  font-size: 0.6rem;
  color: #999;
  margin-right: 0.2rem;
}
.pri_right i {
  color: #999;
}
.detail {
  display: flex;
  border-bottom: 1px solid #f5f5f5;
  padding: 0.8rem 0;
}
.detail_right {
  margin-left: 0.55rem;
}
.detail_left img {
  width: 1.6rem;
  height: 1.8rem;
}
h4 {
  margin-top: 0.1rem;
  font-size: 0.7rem;
  color: #333;
  font-weight: 400;
}
.detail p {
  margin-top: 0.2rem;
  font-size: 0.5rem;
  color: #999;
}
.apply {
  margin-top: 0.5rem;
  padding-left: 0.7rem;
  background-color: #fff;
  margin-bottom: 0.5rem;
}
.apply_head {
  line-height: 2rem;
  border-bottom: 1px solid #f5f5f5;
  font-size: 0.7rem;
  color: #333;
}
.vipbuy {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Helvetica Neue, Tahoma, Arial;
  padding-right: 0.7rem;
  font-size: 0.65rem;
  line-height: 2.5rem;
}
.buy_left span:nth-child(2) {
  font-weight: 700;
  color: #f60;
}
.buy_right {
  border: 0.025rem solid #f60;
  border-radius: 0.2rem;
  line-height: 1.2rem;
  height: 1.2rem;
  width: 2.6rem;
  text-align: center;
  font-size: 0.6rem;
  color: #f60;
}
.bg {
  background: #fff;
  padding-right: 0.7rem;
  padding-left: 0.7rem;
  margin-bottom: 0.5rem;
}
</style>
