<template>
  <div>
    <con-title title="我的余额"></con-title>
    <div class="content">
      <div class="wrap">
        <div class="header">
          <span>当前余额</span>
          <img src="../img/问号.png" alt>
          <span class="ba" @click="goDetail()">余额说明</span>
        </div>
        <p class="cont">
          <span>0.00</span>
          <span>元</span>
        </p>
        <div class="btn">提现</div>
      </div>
    </div>
    <p class="detail">交易明细</p>
    <div class="log">
      <img src="../img/person.png" alt srcset>
      <p>暂无明细记录</p>
    </div>
  </div>
</template>

<script>
import conTitle from '../conTitle'
export default {
  name: "points",
  methods: {
    prev() {
      this.$router.go(-1);
    },
    goDetail(){
      this.$router.push({name:"balanceDetail"});
    }
  },
  components:{
    conTitle,
  },
};
</script>

<style scoped>
.content {
  height: 6.8rem;
  padding: 0.3rem;
  background: #3190e8;
}
.wrap {
  height: 6rem;
  padding: 0.4rem;
  background-color: #fff;
  border-radius: 0.15rem;
}
.header {
  font-size: 0.55rem;
  color: #666;
}
.ba {
  color: #3190e8;
}
.header img {
  width: 0.6rem;
  margin-left: 9.1rem;
}
.cont {
  margin-top: 0.2rem;
  height: 2rem;
  line-height: 2rem;
}
.cont span:nth-child(1) {
  font-size: 1.8rem;
  color: #333;
}
.btn {
  height: 2rem;
  font-size: 0.8rem;
  color: #fff;
  border-radius: 0.15rem;
  line-height: 2rem;
  margin-top: 1rem;
  text-align: center;
  background-color: #ccc;
}
.detail {
  font-size: 0.6rem;
  color: #999;
  line-height: 2rem;
  padding-left: 0.5rem;
}
.log {
  text-align: center;
  margin-top: 1rem;
}
.log img {
  width: 8.5rem;
}
.log p {
  margin-top: 0.5rem;
  font-size: 0.7rem;
  color: #666;
}
</style>