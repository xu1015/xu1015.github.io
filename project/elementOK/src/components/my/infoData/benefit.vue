<template>
  <div>
      <con-title title="我的优惠"></con-title>
      <div v-if="$store.ComloginState!=200?false:true" class="container">
        <div class="nav">
          <span :class="isclick==true?'blue':''" @click="isclick=true">红包</span>
          <span :class="isclick==false?'blue':''" @click="isclick=false">商家代金券</span>
        </div>
        <!-- 红包界面 -->
        <div class="down" v-if="isclick==true">
          <div class="wrap">
            <div class="hongbao">
              <div class="left">
                有
                <span>3</span>
                个红包即将到期
              </div>
              <div class="right" @click="goHbDes()">
                <img src="../img/问号.png" alt>
                红包说明
              </div>
            </div>
            <ul>
              <li class="hblist" v-for="(h,index) in mes" :key="index">
                <section class="li_item">
                  <div class="li_item_left">
                    <span>¥</span>
                    <span>{{h.amount}}</span>
                    <!-- <span>.</span>
                    <span>{{h.status}}</span>-->
                    <p>满 {{h.sum_condition}} 元可用</p>
                  </div>
                  <div class="li_item_mid">
                    <h4>{{h.name}}</h4>
                    <p>{{h.end_date}}到期</p>
                    <p>限收货手机号为 {{h.phone}}</p>
                  </div>
                  <div class="li_item_right">剩3日</div>
                </section>
              </li>

              <li class="li_footer">
                <p>限品类：快餐便当、特色菜系、小吃夜宵、甜品饮品、异国料理</p>
              </li>
            </ul>
            <div class="history" @click="goOutdate(out)">
              <span>查看历史红包</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
          <div class="footer">
            <div class="footer_left" @click="goExchange()">兑换红包</div>
            <div class="footer_right" @click="goCommend()">推荐有奖</div>
          </div>
        </div>

        <!-- 商家代金券界面 -->
        <div class="card" v-else>
          <div class="cardhead">
            <img src="../img/问号.png" alt srcset>
            <span @click="goCoupon()">商家代金券说明</span>
          </div>
          <div class="cardbot">
            <img src="../img/ep.png" alt srcset>
            <p class="big">无法使用代金券</p>
            <p class="small">非客户端或客户端版本过低</p>
            <div class="download" @click="goDown()">下载或更新客户端</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import conTitle from "../conTitle";
export default {
  name: "benefit",
  components: {
    conTitle
  },
  data() {
    return {
      mes: [],
      out: [],
      isclick: true,
    };
  },
  created() {
    this.getHongbao();
    this.getOutdate();
  },
  methods: {
    // 请求可用红包信息
    getHongbao() {
      console.log("用户id:", this.$route.query.id);
      const url =
        "https://elm.cangdu.org/promotion/v2/users/" +
        this.$route.query.id +
        "/hongbaos?limit=3";
      this.$http({
        method: "get",
        url: url,
        withCredentials: true
      }).then(res => {
        if (res.data != undefined) {
          this.mes = res.data;
          console.log("红包", this.mes);
        }
      });
    },
    // 请求历史红包
    getOutdate() {
      const url =
        "https://elm.cangdu.org/promotion/v2/users/" +
        this.$route.query.id +
        "/expired_hongbaos?limit=4&offset=0";
      this.$http({
        method: "get",
        url: url,
        withCredentials: true
      }).then(res => {
        if (res.data != undefined) {
          this.out = res.data;
          console.log("过期", this.out);
        }
      });
    },
    // 跳转到查看历史红包
    goOutdate(out) {
      this.$router.push({ name: "outdate", query: { out } });
    },
    // 跳转到下载
    goDown(){
      this.$router.push({ name: "download"});
    },
    // 跳转到兑换红包
    goExchange(id){
      this.$router.push({ name: "exchange",query:{id}});
    },
    // 跳转到推荐有奖
    goCommend(){
      this.$router.push({ name: "commend"});
    },
    // 跳转到红包说明
    goHbDes(){
      this.$router.push({ name: "hbDes"});
    },
    // 跳转到代金券说明
    goCoupon(){
      this.$router.push({ name: "coupon"});
    }
  }
};
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 2rem;
  color: #333;
  background-color: #fff;
}
.nav span {
  text-align: center;
  font-size: 0.65rem;
  padding-bottom: 0.2rem;
}
.wrap {
  padding: 0 0.7rem;
}
.hongbao {
  display: flex;
  justify-content: space-between;
  font-size: 0.5rem;
  line-height: 2rem;
}
.hongbao img {
  width: 0.6rem;
  height: 0.6rem;
  vertical-align: middle;
}
.left {
  color: #666;
}
.left span {
  color: red;
}
.right {
  color: #3190e8;
}
p {
  line-height: 0.7rem;
  font-size: 0.4rem;
  color: #999;
}
.hblist {
  background: #fff url("../img/bgli.png") repeat-x;
  background-size: 0.5rem 0.2rem;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
}
.li_item {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0.5rem 0.8rem;
}
.li_item_left {
  font-size: 0;
  flex: 1.5;
  border-right: 0.025rem dotted #ccc;
}
.li_item_left span {
  color: #ff5340;
  font-weight: 500;
}
.li_item_left span:nth-child(1) {
  font-size: 0.75rem;
  font-weight: 700;
}
.li_item_left span:nth-child(2) {
  font-size: 1.5rem;
}
.li_item_left span:nth-child(3) {
  font-size: 0.8rem;
  font-weight: 700;
}
.li_item_left span:nth-child(4) {
  font-size: 0.8rem;
  font-weight: 700;
}
.li_item_mid {
  flex: 3;
  margin-left: 0.5rem;
}
.li_item_mid h4 {
  color: #666;
}
.li_item_right {
  flex: 1;
  font-size: 0.75rem;
  color: #ff5340;
}
.hblist li:last-child {
  margin-bottom: 0.1rem;
}
.li_footer {
  background: #f9f9f9;
  margin-top: -0.5rem;
  padding: 0.5rem 0.8rem;
}
.history {
  text-align: center;
  font-size: 0.5rem;
  padding-top: 1rem;
  color: #999;
  margin-right: 0.2rem;
}
.footer_left {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 50%;
  background: #fff;
  line-height: 2rem;
  text-align: center;
  font-size: 0.7rem;
  color: #555;
}
.footer_right {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 50%;
  background: #fff;
  line-height: 2rem;
  text-align: center;
  font-size: 0.7rem;
  color: #555;
}
.blue {
  border-bottom: 0.1rem solid #3190e8;
  color: #3190e8;
}
/* 商家代金券 */
.cardhead {
  text-align: right;
  font-size: 0.5rem;
  color: #3190e8;
  line-height: 2rem;
  margin-right: 0.5rem;
}
.cardhead img {
  width: 0.6rem;
  vertical-align: middle;
}
.cardbot {
  margin-top: 4rem;
  text-align: center;
}
.cardbot img {
  width: 6rem;
}
.big {
  margin-top: 0.5rem;
  font-size: 0.7rem;
  color: #666;
}
.small {
  margin: 0.4rem;
  font-size: 0.5rem;
}
.download {
  margin: 0 auto;
  width: 5.5rem;
  background-color: #56d176;
  font-size: 0.65rem;
  color: #fff;
  padding: 0.3rem;
  border-radius: 0.15rem;
}
</style>
