<template>
    <div>
  <div class="rating_page" v-if="foodInfo">
    <div class="title">
      <strong @click="prev()">
        <i class="el-icon-arrow-left"></i>
      </strong>
      <span>{{foodInfo.name}}</span>
    </div>
    <section class="header_img">
      <img class="food_img" :src="'//elm.cangdu.org/img/'+foodInfo.image_path" alt>
    </section>
    <p class="description">{{foodInfo.description}}</p>
    <section class="detail_container">
      <p>{{foodInfo.name}}</p>
      <div class="rating_sale">
        <span>评分</span>
        <el-rate
          v-model="foodInfo.rating"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
        ></el-rate>
      </div>
      <p>
        <span>月售
          <span>{{foodInfo.month_sales}}</span>单
        </span>
        <span>售价 ¥
          <span>{{foodInfo.specfoods[0].price}}</span>
        </span>
        <span>起</span>
      </p>
      <p>
        <span>评论数
          <span>{{foodInfo.rating_count}}</span>
        </span>
        <span>好评率
          <span>{{foodInfo.satisfy_rate}}</span>%
        </span>
      </p>
    </section>
    <section class="commodity_buyCard">
      <section class="cart_icon_num">
        <div class="cart_icon_container" :class="number>0?'cart_icon_activity':''">
          <span class="cart_list_length" v-if="number>0">{{number}}</span>
          <img src="../../assets/common/shopCar.png" alt>
        </div>
        <div class="cart_num">
          <div>¥
            <span>{{price}}.00</span>
          </div>
          <div>配送费¥{{$route.params.delivery_fee}}</div>
        </div>
      </section>
      <section class="gotopay" :class="price>=20?'gotopay_acitvity':''">
        <span class="gotopay_button_style" v-if="price<20">
              还差¥
              <span>{{20-price}}</span>起送
            </span>
            <p v-else class="gotopay_button_style" @click="goconfireOrder()">去结算</p>
      </section>
    </section>
  </div>
    <message-box :title="titleText" :showHide="showHide" :change="shchange"></message-box>
  </div>
</template>

<script>
import messageBox from '../common/Component/messageBox'
export default {
  name: "twofoodInfo",
  components:{
    messageBox,
  },
  data() {
    return {
      foodInfo: this.$route.params.itemrighttwo,
      number:this.$route.params.num,
      price:this.$route.params.price,
      id:this.$route.params.id,
      shopcar:[],
      titleText:"",
      showHide:false,
      num:3,
    };
  },
    created() {
      console.log(this.$route.params.itemrighttwo);
      console.log(this.$route.params.num);
      console.log(this.$route.params.delivery_fee);
      // console.log("ceshiyong",this.shopcar);
      if (this.$route.params.itemrighttwo==undefined) {
        this.showHide=true;
        this.titleText="当前页面元素已提交,请返回到餐馆界面"
      }
    },
  methods: {
    // 框架双向绑定方法
    shchange(val) {
      this.showHide = val;
      if (this.$route.params.itemrighttwo==undefined&&val==false) {
        this.$router.push({name:"shop",query:{id:this.$store.state.resta_id}})
        console.log("111111111111111111111111111111111");
        
      }
    },
    prev() {
      this.$router.go(-1);
    },
    // 发送购物车数据同时跳转界面------------------------------
    goconfireOrder() {
      // console.log("跳转方法", this.userID);

      const url = "https://elm.cangdu.org/v1/carts/checkout";
      // console.log("用户ID" + this.$route.query.id, typeof this.$route.query.id);
      // console.log("经纬度", typeof localStorage.Comgeohash);
      var arratentity = [];
      arratentity.push(this.$store.state.entities);
      console.log("购物车信息", arratentity);
      this.$http({
        method: "POST",
        url: url,
        data: {
          restaurant_id: this.$route.params.id,
          geohash: localStorage.Comgeohash,
          entities: arratentity
        },
        withCredentials: true
      }).then(res => {
        if (res.data.status!=0) {
          this.shopcar = res.data;
          console.log("方法内", this.shopcar);
          this.$router.push({
            name: "confireOrder",
            params: { userID: this.userID, shopcar: this.shopcar }
          });
          this.$store.state.entities=[];
        }else{
          this.showHide=true;
          this.titleText=res.data.message;

        }
      });
    },
  },
};
</script>

<style scoped>
/* 全局设置 */
.rating_page {
  background: #fff;
}
/* 头部title */
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
.header_img {
  position: relative;
}
.food_img {
  width: 100%;
  display: block;
}
.description {
  font-size: 0.6rem;
  color: #666;
  margin-top: 0.5rem;
  line-height: 0.8rem;
  bottom: 0.2rem;
  padding: 0 0.4rem;
}
.detail_container {
  padding: 0.5rem;
}
.detail_container p:first-of-type {
  font-size: 0.7rem;
  color: #333;
  margin-bottom: 0.2rem;
}
.rating_sale {
  display: flex;
  align-items: center;
}
.el-rate {
  transform: scale(0.8);
  margin-left: -0.8rem;
}
.detail_container .rating_sale span:first-of-type {
  font-size: 0.6rem;
  color: #666;
  margin-right: 0.2rem;
}

.detail_container p:nth-of-type(2) {
  font-size: 0;
  margin-top: 0.3rem;
}
.detail_container p:nth-of-type(2) span:first-of-type {
  font-size: 0.6rem;
  color: #666;
  margin-right: 0.4rem;
}
.detail_container p:nth-of-type(2) span:nth-of-type(2),
.detail_container p:nth-of-type(2) span:nth-of-type(2) span {
  font-size: 0.6rem;
  color: #f60;
  margin-right: 0.2rem;
}
.detail_container p:nth-of-type(2) span:nth-of-type(3) {
  font-size: 0.6rem;
  color: #f60;
  margin-right: 0.2rem;
}
.detail_container p:nth-of-type(3) {
  line-height: 1.24rem;
}
.detail_container p:nth-of-type(3) span {
  font-size: 0.6rem;
  color: #666;
}
.cart_icon_activity {
  background-color: #3190e8;
}
.gotopay_acitvity {
  background-color: #4cd964!important;
}
/* 内容-评价部分-购买卡片部分 */
.commodity_buyCard {
  position: absolute;
  background-color: #3d3d3f;
  bottom: 0;
  left: 0;
  z-index: 13;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 2rem;
}
.cart_icon_num {
  flex: 1;
}
.cart_icon_container {
  display: flex;
  background-color: #3d3d3f;
  position: absolute;
  padding: 0.4rem;
  border: 0.18rem solid #444;
  border-radius: 50%;
  left: 0.5rem;
  top: -0.7rem;
}
.cart_list_length {
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  background-color: #ff461d;
  line-height: 0.7rem;
  text-align: center;
  border-radius: 50%;
  border: 0.025rem solid #ff461d;
  min-width: 0.7rem;
  height: 0.7rem;
  font-size: 0.5rem;
  color: #fff;
}
.cart_icon_container img {
  width: 1.2rem;
  height: 1.2rem;
}
.cart_num {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 3.5rem;
}
.cart_num div:first-of-type {
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
  color: #fff;
}
.cart_num div:first-of-type span {
  font-size: 0.8rem;
  font-weight: 700;
  color: #fff;
}
.cart_num div:nth-of-type(2) {
  font-size: 0.4rem;
  color: #fff;
}
.gotopay {
  position: absolute;
  right: 0;
  background-color: #535356;
  width: 5rem;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.gotopay_button_style {
  font-size: 0.7rem;
  color: #fff;
  font-weight: 700;
}
.gotopay_button_style span {
  font-size: 0.7rem;
  color: #fff;
  font-weight: 700;
}
</style>
