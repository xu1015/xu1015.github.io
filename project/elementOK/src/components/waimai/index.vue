<template>
  <div>
    <div class="title">
      <img @click="goSearch()" src="./img/search.png" class="titleImg" />
      <span @click="goCity()" class="ellipsis">{{addr.name!=undefined?addr.name:addrName}}</span>
      <span>
        <p v-if="$store.ComloginState!=200?true:false" @click="goLogin()">登录|注册</p>
        <img v-else @click="goMy()" src="../../assets/common/user.png" alt="">
      </span>
    </div>
    <div class="food_type">
      <!--swiper组件-->
      <div class="swiper-container" ref="mySwiper">
        <div class="swiper-wrapper" >
          <div  class="swiper-slide">
              <ul class="swiper_ul">
                  <li @click="goFood(geoHash,itemOne.title)" v-for="(itemOne,index) in foodType1" :key="index">
                      <div>
                          <img :src="'//fuss10.elemecdn.com'+itemOne.image_url" alt="">
                          <span>{{itemOne.title}}</span>
                      </div>
                  </li>
              </ul>
          </div>
          <div class="swiper-slide">
              <ul class="swiper_ul">
                  <li @click="goFood(geoHash,itemOne.title)" v-for="(itemOne,index) in foodType2" :key="index">
                      <div>
                          <img :src="'//fuss10.elemecdn.com'+itemOne.image_url" alt="">
                          <span>{{itemOne.title}}</span>
                      </div>
                      
                  </li>
              </ul>
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
        <!-- 如果需要滚动条 -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <!-- 商家部分 -->
    <div class="shop">
        <p class="shop_header_title"><img src="./img/shop.png" alt="">附近商家</p>
        <div class="shoplist">
            <ul>
                <li @click="goShopDetailInfo(item.id)" v-for="(item,index) in shops" :key="index" class="shop_li">
                    <section>
                        <img :src="'//elm.cangdu.org/img/'+item.image_path" alt="">
                    </section>
                    <div class="shop_right">
                        <header class="shop_detail_header">
                            <h4 class="shop_detail_headerH4 ellipsis">{{item.name}}</h4>
                            <ul>
                                <li v-for="(itemtwo,index) in item.supports" :key="index">{{itemtwo.icon_name}}</li>
                            </ul>
                        </header>
                        <h5 class="rating_order_num">
                            <section class="rating_order_num_left">
                                <section class="rating_section">
                                    <el-rate class="rate"
                                    v-model="item.rating"
                                    disabled
                                    show-score
                                    text-color="#ff9900"
                                    score-template="{value}">
                                    </el-rate>
                                </section>
                                <section class="order_section">月售{{item.recent_order_num}}单</section>
                            </section>
                            <section class="rating_order_num_right">
                                <span class="delivery_left">蜂鸟专送</span>
                                <span class="delivery_right">准时达</span>
                            </section>
                        </h5>
                        <h5 class="fee_distance">
                            <p class="fee">¥<span>{{item.float_minimum_order_amount}}</span>起送/配送费约¥<span>{{item.float_delivery_fee}}</span></p>
                            <p class="distance_time"><span>{{item.distance}}</span><span>/</span><span>{{item.order_lead_time}}</span></p>
                        </h5>
                    </div>
                </li>
            </ul>
        </div>
    </div>

  </div>
</template>

<script>
// Swiper轮播图组件
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
  name: "waimai",
  data() {
    return {
      // 传递过来的经纬度
      geoHash: this.$route.params.geohash,
      //根据经纬度获取的地区地址
      addr: {},
      //获取存放在localStorage内的名字
      addrName: localStorage.name,
      //获取食品类型的数据
      foodType1:[],
      foodType2:[],
      //经纬度转换数组
      geoHashList:localStorage.Comgeohash.split(","),
      //商家数据
      shops:[],
    };
  },
  // components: {
    // comTitle
  // },
  created() {
    console.log("登录状态",this.$store.ComloginState);
    
    // 请求食品类型
    this.getfoodType();
    // 获取当前经纬度的详细信息
    this.getDetailInfo();
    // 获取附近经纬度的商家信息
    this.getshopList()

  },
  //   轮播需求
  mounted() {
    var mySwiper = new Swiper(".swiper-container", {
      direction: "horizontal",
      loop: true,
      pagination: {
        el: ".swiper-pagination"
      }
    });
  },
  methods: {
    // 请求食品分类
    getfoodType() {
      const url = "https://elm.cangdu.org/v2/index_entry";
      this.$http({
        method: "get",
        url: url,
        //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
        withCredentials: true // 默认false
      }).then(res => {
        // console.log(res.data);
        if (res.data != undefined) {
            this.foodType1 = res.data.slice(0,8);
            this.foodType2 = res.data.slice(8);
        }
      });
    },
    // 获取商铺列表
    getshopList() {
      const url = "https://elm.cangdu.org/shopping/restaurants?latitude="+this.geoHashList[0]+"&longitude="+this.geoHashList[1];
      this.$http({
        method: "get",
        url: url,
        //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
        withCredentials: true // 默认false
      }).then(res => {
        if (res.data != undefined) {
            this.shops = res.data;
        }
      });
    },

    // 根据经纬度进行详细定位
    getDetailInfo() {
      // console.log(this.geoHash)
      const url = "https://elm.cangdu.org/v2/pois/" + this.geoHash;
      this.$http({
        method: "get",
        url: url,
        //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
        withCredentials: true // 默认false
      }).then(res => {
        this.addr = res.data;
        if (res.data.name != undefined) {
          localStorage.name = res.data.name;
        }
      });
    },
    // 跳转到商店详情信息界面
    goShopDetailInfo(id){
      this.$store.state.resta_id=id
      console.log(this.$store.state.resta_id);
      this.$router.push({name:"shop",query:{id,}})
    },
    // 跳转到选择城市界面
    goCity() {
      this.$router.push({ name: "Home" });
    },
    // 跳转到搜索界面
    goSearch() {
      console.log(this);
      this.$router.push({ name: "search" });
    },
    // 跳转到登录界面
    goLogin() {
      console.log(this);
      this.$router.push({ name: "login" });
    },
    // 跳转到my界面
    goMy() {
      console.log(this);
      this.$router.push({ name: "my" });
    },
    // 跳转到food界面
    goFood(geohash, title) {
      this.$router.push({ name: "food", query: { geohash, title } });
    },
  }
};
</script>

<style scoped>
/* 头部title */
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
.titleImg{
  width: .9rem;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: .8rem;
  margin-top: -0.3rem;
}
.title span:first-of-type {
  width: 50%;
  display: inline-block;
  font-size: 0.8rem;
  margin-top: 0.15rem;
  vertical-align: top;
}
.title span:last-of-type {
  display: inline-block;
  font-size: .65rem;
  color: white;
  position: absolute;
  top: 50%;
  right: 0.55rem;
  transform: translateY(-50%);
}
.title span:last-of-type img{
  width: .8rem;
  font-weight: 700;
  margin-top: 1rem;
}
/* .foodType食品类型 */
.food_type{
    height: 8.5rem;
    padding-top: 2.1rem;
    background: #ffffff;
    position: relative;
    border-bottom: .025rem solid #e4e4e4;
}
/* swiper轮播图 */
.swiper-container{
    padding-bottom: .6rem;
}
.swiper_ul{
    width: 100%;
    height: 100%;
    display: flex;
        flex-wrap: wrap;
        transition-property: transform;
    box-sizing: content-box;
}
.swiper_ul li{
    width: 25%;   
    padding: .3rem 0;
    text-align: center;
    display: flex;
    flex-direction: column;
}
.swiper_ul li img{
    padding-bottom: .6rem;
    width: 1.8rem;
    height: 1.8rem;
    /* margin: 0 auto; */
}
.swiper_ul li span{
    display: block;
    font-size: .55rem;
    color: #666;
}
/* 轮播图标 */
.swiper-pagination{
    position: absolute;
    bottom: .2rem;
}

/* 商家部分 */
/* 商家整体 */
.shop{
    margin-top: .4rem;
    border-top: .025rem solid #e4e4e4;
    background: #fff;
}
.shoplist{
    margin-bottom: 1.95rem;
}
.shop_header_title{
    height: 1.6rem;
    line-height: 1.6rem;
    display: inline-block;
    font-size: .55rem;
    color: #999;
}
.shop_header_title img{
    width: .6rem;
    vertical-align: middle;
    margin-left: .6rem;
    margin-right: .3rem;
}
/* 商家整体信息 */
.shop_li{
    padding: .7rem .4rem;
    display: flex;
    border-bottom: .025rem solid #f1f1f1;
}
/* 商家整体信息左边 */
.shop_li section img{
    width: 2.7rem;
    margin-right: .4rem;
}
/* 商家整体信息右边 */
.shop_right{
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
}
/* 商家整体信息右边头部 */
.shop_detail_headerH4:before{
    content: "品牌";
    display: inline-block;
    font-size: .5rem;
    line-height: .6rem;
    color: #333;
    background-color: #ffd930;
    padding: 0 .1rem;
    border-radius: .1rem;
    margin-right: .2rem;
}
.shop_detail_header li{
    font-size: .5rem;
    color: #999;
    border: .025rem solid #f1f1f1;
    padding: 0 .04rem;
    border-radius: .08rem;
    margin-left: .05rem;
}
.shop_detail_header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.shop_detail_headerH4{
    width: 8.5rem;
    color: #333;
    padding-top: .01rem;
    font-weight: 700;
    font-size: .65rem;  
}
.shop_detail_header ul{
    display: flex;
    transform: scale(.8);
    margin-right: -.3rem
}
;
.shop_detail_header ul li{
    font-size: .5rem;
    color: #999;
}
/* 商家整体信息右边中部 */
.rating_order_num{
    display: flex;
    justify-content: space-between;
    height: .6rem;
    margin-top: .52rem;
}
.rating_order_num_left{
    display: flex;
    justify-content: flex-start;
}
.rating_section{
  display: inline-block;
  margin-left: -.9rem;
  transform: scale(.7);
  vertical-align: top;
}
.order_section{
    font-size: .4rem;
    margin-left: -.9rem;
    transform: scale(.8);
    color: #666;
    display: flex;
}
.rate{
    height: .6rem;
    line-height: .6rem;
}
.rating_order_num_right{
    display: flex;
    align-items: center;
    transform: scale(.7);
    min-width: 5rem;
    justify-content: flex-end;
    margin-right: -.8rem;
}
.delivery_left{
    color: #fff;
    background-color: #3190e8;
    border: .025rem solid #3190e8;
    font-size: .4rem;
    padding: .04rem .08rem 0;
    border-radius: .08rem;
    margin-left: .08rem;
}
.delivery_right{
    color: #3190e8;
    border: .025rem solid #3190e8;
}
/* 商家整体信息右边尾部 */
.fee_distance{
    margin-top: .52rem;
    display: flex;
    justify-content: space-between;
    font-size: .5rem;
    color: #333;
}
.fee{
    transform: scale(.9);
    font-size: .5rem;
    color: #666;
}
.distance_time{
    transform: scale(.9);
}
.distance_time span:nth-of-type(1){
    color: #999;
}
.distance_time span:nth-of-type(2){
    color: #ccc;
}
.distance_time span:nth-of-type(3){
    color: #3190e8;
}
</style>
