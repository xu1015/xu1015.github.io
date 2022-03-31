<template>
  <div>
    <con-title title="我的积分"></con-title>
    <div class="content">
      <div class="wrap">
        <div class="header">
          <span>当前积分</span>
          <img src="../img/问号.png" alt>
          <span class="ba" @click="gopointsDetails()">积分说明</span>
        </div>
        <p class="cont">
          <span>0</span>
          <span>分</span>
        </p>
        <div class="btn">积分兑换商品</div>
      </div>
    </div>
    <p class="detail">最近30天积分纪录</p>
    <div class="log">
      <img src="../img/person.png" alt srcset>
      <p>最近30天无积分纪录</p>
    </div>
    <p class="small">快去下单赚取大量积分吧</p>
  </div>
</template>

<script>
import conTitle from '../conTitle'
export default {
  name: "balance",
  methods: {
    prev() {
      this.$router.go(-1);
    },
    gopointsDetails(){
      this.$router.push({ name: "pointsDetail" });
    },
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
  background-color: #fe6d47;
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
.small {
  text-align: center;
  margin-top: 0.5rem;
  font-size: 0.5rem;
  color: #999;
}
</style>