<template>
  <div>
    <!-- 整体部分 -->
    <section class="shop_container" ref="shop" v-if="canvasImg=true">
      <!-- 头部的跳转按钮 -->
      <nav class="goback" @click="goback()">
        <i class="el-icon-arrow-left"></i>
      </nav>
      <!-- 头部 -->
      <header class="header">
        <img :src="'//elm.cangdu.org/img/'+shopInfo.image_path" alt class="blurImg">
        <section class="description_header">
          <section class="header_a">
            <section class="title_left">
              <img :src="'//elm.cangdu.org/img/'+shopInfo.image_path" alt>
            </section>
            <section class="title_right" @click="goshopAttribute(shopInfo.id)">
              <h4 class="ellipsis">{{shopInfo.name}}</h4>
              <p>商家配送 / 分钟送达 / 配送费¥{{shopInfo.float_delivery_fee}}</p>
              <p class="ellipsis">公告 : {{shopInfo.promotion_info}}</p>
            </section>
            <i class="el-icon-arrow-right"></i>
          </section>
          <footer
            class="description_footer"
            v-if="activityInfoStatus!=0"
            @click="activityStatus=true"
          >
            <p class="ellipsis">
              <span
                :style="'background-color:#'+shopInfo.activities[0].icon_color+'; border-color:#'+ shopInfo.activities[0].icon_color+';'"
                class="tip_icon"
              >{{shopInfo.activities[0].icon_name}}</span>
              <span>{{shopInfo.activities[0].description}} (APP专享)</span>
            </p>
            <p>{{shopInfo.activities.length}}个活动</p>
            <i class="el-icon-arrow-right footer_arrow"></i>
          </footer>
        </section>
      </header>

      <!-- 优惠信息界面 -->
      <section v-if="activityStatus==true" class="activities_details">
        <h2 class="activities_shoptitle">{{shopInfo.name}}</h2>
        <h3 class="activities_ratingstar"></h3>
        <section class="activities_list">
          <header class="activities_title_style">
            <span>优惠信息</span>
          </header>
          <ul>
            <li v-for="(activiInfoitem,index) in shopInfo.activities" :key="index">
              <span
                :style="'background-color:#'+activiInfoitem.icon_color+'; border-color:#'+ activiInfoitem.icon_color+';'"
              >{{activiInfoitem.icon_name}}</span>
              <span>{{activiInfoitem.description}}(APP专享)</span>
            </li>
          </ul>
        </section>
        <section class="activities_shopinfo">
          <header class="activities_title_style">
            <span>商家公告</span>
          </header>
          <p>{{shopInfo.promotion_info}}</p>
        </section>
        <img src="../../assets/common/goback.png" alt @click="activityStatus=false">
      </section>

      <!-- 内容标题部分 -->
      <section class="conTitle">
        <div @click="Interface=true">
          <span :class="Interface==true?'router-link-active':''">商品</span>
        </div>
        <div @click="Interface=false">
          <span :class="Interface==false?'router-link-active':''">评价</span>
        </div>
      </section>
      <!-- 商品部分 -->
      <section class="content_commodity" v-if="Interface==true">
        <section class="commodity_menu">
          <section class="menu_left">
            <ul v-if="foodInfo.length > 0 ">
              <li
                v-for="(itemleft,index) in foodInfo"
                :key="index"
                :class="setClass==index&&'activity_menu'"
                class="menu_leftli"
                @click="menu_leftli(index)"
              >
                <span>{{itemleft.name}}</span>
                <!-- <span class="category_num"></span> -->
              </li>
            </ul>
          </section>
          <section class="menu_right">
            <ul>
              <!-- 第一层循环 -->
              <li v-for="(itemrightone,index1) in foodInfo" :key="index1" class="menu_right_liOne">
                <header class="menu_right_header">
                  <section class="menu_right_header_left">
                    <strong class="menu_right_title">{{itemrightone.name}}</strong>
                    <span class="menu_right_description">{{itemrightone.description}}</span>
                  </section>
                  <span class="menu_right_header_right">···</span>
                </header>
                <!-- 第二层循环 -->
                <section
                  class="menu_detail_list"
                  v-for="(itemrighttwo,index2) in itemrightone.foods"
                  :key="index2"
                >
                  <div class="menu_detail_link" @click="gofoodInfo(itemrighttwo,cart_listNum,cart_listprice,$route.query.id,shopInfo.float_delivery_fee)">
                    <section class="menu_food_img">
                      <img :src="'//elm.cangdu.org/img/'+itemrighttwo.image_path" alt>
                    </section>
                    <section class="menu_food_description">
                      <h3 class="food_description_head">
                        <strong class="description_foodname">{{itemrighttwo.name}}</strong>
                        <ul class="attributes_ul" v-if="itemrighttwo.attributes.length>0">
                          <li class="attribute_new" :style="'color:#' +itemrighttwo.attributes[0].icon_color+'; border-color:#' +itemrighttwo.attributes[0].icon_color+';'">
                            <p style="">{{itemrighttwo.attributes[0].icon_name}}品</p>
                          </li>
                        </ul>
                      </h3>
                      <p class="food_description_content">{{itemrighttwo.description}}</p>
                      <p class="food_description_sale_rating">
                        <span>月售{{itemrighttwo.month_sales}}份</span>
                        <span>好评率{{itemrighttwo.satisfy_rate}}%</span>
                      </p>
                      <p class="food_activity">
                        <span v-if="itemrighttwo.activity">{{itemrighttwo.activity.image_text}}</span>
                        <span v-else></span>
                      </p>
                    </section>
                  </div>
                  <footer class="menu_detail_footer">
                    <section class="food_price">
                      <span>¥</span>
                      <span>{{itemrighttwo.specfoods[0].price}}</span>
                      <span v-if="itemrighttwo.specifications.length>0">起</span>
                    </section>
                    <section class="cart_module">
                      <img
                        class="specs_reduce_icon"
                        src="../../assets/common/reduce.png"
                        style="width:0;"
                        alt
                        @click="shopCarreduce(itemrighttwo,index1,index2)"
                      >
                      <span class="buy_num" style="opacity:0">0</span>
                      <span
                        v-if="itemrighttwo.specifications.length>0"
                        class="show_chooselist"
                        @click="itemSpeci(itemrighttwo.specfoods,index1,index2)"
                      >选规格</span>
                      <img
                      class="specs_reduce_icon_add"
                        v-else
                        src="../../assets/common/add.png"
                        alt
                        @click="shopCarAdd($event,itemrighttwo,index1,index2)"
                      >
                    </section>
                  </footer>
                </section>
              </li>
            </ul>
            <section v-if="foodspecification">
              <div class="specs_cover"></div>
              <div class="specs_list">
                <header class="specs_list_header">
                  <h4 class="ellipsis">aaa</h4>
                  <img
                    src="../../assets/common/error.png"
                    alt
                    class="specs_cancel"
                    @click="foodspecification=false"
                  >
                </header>
                <section class="specs_details">
                  <h5 class="specs_details_title">规格</h5>
                  <ul>
                    <li
                      v-for="(itemfoodspecificationInfo,index) in foodspecificationInfo"
                      :key="index"
                      :class="foodspecificationInfoIndex==index?'specs_activity':''"
                      @click="clickspecification(itemfoodspecificationInfo.price,index)"
                    >{{itemfoodspecificationInfo.specs_name}}</li>
                  </ul>
                </section>
                <footer class="specs_footer">
                  <div class="specs_price">
                    <span>¥</span>
                    <span>{{foodspecificationInfoprice}}</span>
                  </div>
                  <div
                    class="specs_addto_cart"
                    @click="foodspecInshopcar(foodspecificationInfo,foodspecificationInfoIndex)"
                  >加入购物车</div>
                </footer>
              </div>
            </section>
          </section>
        </section>
        <section class="commodity_buyCard">
          <section class="cart_icon_num" @click="shopcarShowHide=!shopcarShowHide">
            <div class="cart_icon_container" :class="cart_listNum>0?'cart_icon_activity':''">
              <span class="cart_list_length" v-if="cart_listNum>0">{{cart_listNum}}</span>
              <img src="../../assets/common/shopCar.png" alt>
            </div>
            <div class="cart_num">
              <div>
                ¥
                <span>{{cart_listprice}}.00</span>
              </div>
              <div>配送费¥{{shopInfo.float_delivery_fee}}</div>
            </div>
          </section>
          <section class="gotopay" :class="cart_listprice>=20?'gotopay_acitvity':''">
            <span class="gotopay_button_style" v-if="cart_listprice<20">
              还差¥
              <span>{{20-cart_listprice}}</span>起送
            </span>
            <p v-else class="gotopay_button_style" @click="goconfireOrder()">去结算</p>
          </section>
        </section>
        <!-- 实际显示 -->
        <section
          class="cart_food_list"
          v-if="shopcarShowHide"
          :class="shopcarShowHide==true?'animated fadeInUp':''"
        >
          <header>
            <h4>购物车</h4>
            <div>
              <img src="../../assets/common/garbage.png" alt>
              <span class="clear_cart" @click="lookInfo()">清空</span>
            </div>
          </header>
          <section class="cart_food_details">
            <ul>
              <li
                class="cart_food_li"
                v-for="(itemEntities,index) in $store.state.entities"
                :key="index"
              >
                <div class="cart_list_num">
                  <p class="ellipsis">{{itemEntities.name}}</p>
                  <p
                    class="ellipsis"
                    v-if="itemEntities.specs.length>0"
                  >{{itemEntities.specs[0].value}}</p>
                </div>
                <div class="cart_list_price">
                  <span>¥</span>
                  <span>{{itemEntities.price}}</span>
                </div>
                <section class="cart_list_control">
                  <img
                    src="../../assets/common/reduce.png"
                    alt
                    @click="shopcarreduceNum($store.state.entities,index)"
                  >
                  <span class="cartlist_num">{{itemEntities.quantity}}</span>
                  <img
                    src="../../assets/common/add.png"
                    alt
                    class="cart_add"
                    @click="shopcaraddNum($store.state.entities,index)"
                  >
                </section>
              </li>
            </ul>
          </section>
        </section>
      </section>
      <!-- 评价部分 -->
      <section class="content_evaluation" v-if="Interface==false">
        <section class="content_evaluationOne">
          <section class="content_evaluationTwo">
            <header class="rating_header">
              <section class="rating_header_left">
                <p>{{shopRating.overall_score.toFixed(1)}}</p>
                <p>综合评价</p>
                <p>高于周边商家{{toPercent(shopRating.compare_rating)}}</p>
              </section>
              <section class="rating_header_right">
                <p>
                  <span>服务态度</span>
                  <el-rate
                    v-model="service_score"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                  ></el-rate>
                </p>

                <p>
                  <span>菜品评价</span>
                  <el-rate
                    v-model="food_score"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                  ></el-rate>
                </p>

                <p>
                  <span>送达时间</span>
                  <span class="delivery_time">分钟</span>
                </p>
              </section>
            </header>
            <!-- 评价部分-评价分类信息 -->
            <!-- 第一部分 -->
            <ul class="tag_list_ul">
              <li
                v-for="(itemRatingType,index) in foodRatingType"
                :key="index"
                :class="itemRatingType.name===foodRatingTypeState?'tagActivity':(itemRatingType.name==='不满意'?'unsatisfied':'')"
                @click="goFoodRatingType(itemRatingType.name)"
              >{{itemRatingType.name}}({{itemRatingType.count}})</li>
            </ul>
            <ul class="rating_list_ul">
              <li
                class="rating_list_li"
                v-for="(itemRatingInfo,index) in shopRatingInfo"
                :key="index"
              >
                <img
                  :src="itemRatingInfo.avatar.length>2?'https://fuss10.elemecdn.com/'+itemRatingInfo.avatar+'.jpeg':'//elm.cangdu.org/img/default.jpg'"
                  alt
                  class="user_avatar"
                >
                <section class="rating_list_details">
                  <header>
                    <section class="username_star">
                      <p class="username">{{itemRatingInfo.username}}</p>
                      <p class="star_desc">
                        <el-rate v-model="food_score" disabled></el-rate>
                        <span class="time_spent_desc">{{itemRatingInfo.time_spent_desc}}</span>
                      </p>
                    </section>
                    <span class="rated_at">{{itemRatingInfo.rated_at}}</span>
                  </header>
                  <ul class="food_img_ul">
                    <li
                      v-for="(itemRatingInfoTwo1,index) in itemRatingInfo.item_ratings"
                      :key="index"
                    >
                      <img
                        v-if="itemRatingInfoTwo1.image_hash.length>2"
                        :src="'https://fuss10.elemecdn.com/'+itemRatingInfoTwo1.image_hash+'.jpeg'"
                        alt
                      >
                    </li>
                  </ul>
                  <ul class="food_name_ul">
                    <li
                      v-for="(itemRatingInfoTwo2,index) in itemRatingInfo.item_ratings"
                      :key="index"
                      class="ellipsis"
                    >{{itemRatingInfoTwo2.food_name}}</li>
                  </ul>
                </section>
              </li>
            </ul>
          </section>
        </section>
      </section>
    </section>
    <message-box :title="titleText" :showHide="titleShowHide" :change="shchange"></message-box>
  </div>
</template>

<script>
import messageBox from '../common/Component/messageBox'
export default {
  name: "shop",
  components:{
    messageBox,
  },
  data() {
    return {
      shopInfo: [],
      //弹框文本
      titleText:"",
      foodInfo: [],
      //弹框状态
      titleShowHide:false,
      setClass: 0,
      Interface: true,
      // 头部信息隐藏界面状态
      activityInfoStatus: 0,
      geohash: "",
      //优惠信息界面
      activityStatus: false,
      // 购物车信息
      shopcar: [],
      // 购物车内食品数量
      cart_listNum: 0,
      // 购物车食品总价格
      cart_listprice: 0,
      //食品规格的状态
      foodspecification: false,
      // 食品卡片详细信息
      foodspecificationInfo: [],
      // 食品卡片内样式转换
      foodspecificationInfoIndex: 0,
      // 食品卡片内不同样式的价格
      foodspecificationInfoprice: 0,
      // 每个餐馆各自的订单
      shopcarOrder: this.$store.state.entities,
      // 购物车详情显示隐藏
      shopcarShowHide: false,
      // 餐馆评价分数
      shopRating: [],
      service_score: "0",
      food_score: "0",
      //餐馆评价分类信息
      foodRatingType: [],
      //餐馆评价信息
      shopRatingInfo: [],
      //餐馆评价分类信息的状态
      foodRatingTypeState: "全部",
      //用户id
      userID: 0,
      //当前点击的li下标
      liIndex: 0,
      //当前点击的span下标
      spanIndex: 0,
      showMounted: false,
      canvasImg:false,
    };
  },
  mounted() {
    this.canvasImg=true;
  },
  created() {
    // console.log("餐馆详情", this.$route.query.id);
    //根据餐馆id获取餐馆详细信息
    this.getShopDetailInfo();
    //根据餐馆id获取餐馆食品详细信息
    this.getShopFoodDetailInfo();
    //根据餐馆id获取餐馆评价分数
    this.getShopRating();
    //根据餐馆id获取餐馆评价分类
    this.getShopRatingType();
    //根据餐馆id获取餐馆评价信息
    this.getshopRatingInfo();

    //获取用户id
    this.getUser();
    console.log("获取用户id", this.userID);
  },
  methods: {
    lookInfo() {
      console.log("entities的数据", this.$store.state.entities);
      // console.log("entities的数据",this.$store.state.entities)
    },
    // 框架双向绑定方法
    shchange(val) {
      this.titleShowHide = val;
    },
    // 测试用户是否在线
    getUser() {
      const url = "https://elm.cangdu.org/v1/user";
      this.$http({
        method: "get",
        url: url,
        withCredentials: true
      }).then(res => {
        // console.log("tap", res);
        // console.log("获取用户id", res.data);
        if (res.data.username != undefined) {
          this.userID = res.data.user_id;
        }
        console.log("方法内", this.userID);
      });
    },
    // 购物车提交方法
    shopCarAdd(event,itemrighttwo, index1, index2) {
      var e=event ||window.event;

      // 获取对应的li组件,span组件和img组件
      let lis = document.querySelectorAll(".menu_right_liOne");
      console.log(lis[index1]);

      let spans = lis[index1].querySelectorAll(".buy_num");
      let imgss = lis[index1].querySelectorAll(".specs_reduce_icon");

      let aniImg = lis[index1].querySelectorAll(".specs_reduce_icon_add");
      console.log("事件对象",e);
      console.log("整体",this.$refs.shop.clientHeight);
      console.log("小球",aniImg[index2]);
      // aniImg[index2].style.transition="all 2s cubic-bezier(.17, .86, .73, .14)"
      //添加小球
      let ball = aniImg[index2].cloneNode(true);
      console.log("新加的小球",ball);  
      ball.style.zIndex=100;
      ball.style.position="fixed";
      ball.style.left=e.clientX-10+"px"
      ball.style.bottom=this.$refs.shop.clientHeight-e.clientY-10+"px"
      ball.style.transition="left .5s cubic-bezier(1,1,1,1), bottom .5s cubic-bezier(.33,.84,.78,.18)"
      console.log("qqqq",e);
      
      e.target.parentNode.appendChild(ball);
      ball.style.display="block";
      setInterval(() => {
        ball.style.left="50px"
        ball.style.bottom="50px"
      }, 10);
      console.log("vv");
      ball.addEventListener("transitionend",()=>{
        ball.remove();
      },
      false
      )




      this.cart_listprice += itemrighttwo.specfoods[0].price;
      this.cart_listNum += 1;

      // 将信息添加到数组里面
      console.log("数组长度", this.$store.state.entities.length);

      if (this.$store.state.entities.length == 0) {
        this.$store.state.entities.push({
          attr: [],
          extra: {},
          id: itemrighttwo.specfoods[0].food_id,
          name: itemrighttwo.specfoods[0].name,
          packing_fee: itemrighttwo.specfoods[0].packing_fee,
          price: itemrighttwo.specfoods[0].price,
          quantity: 1,
          sku_id: itemrighttwo.specfoods[0].sku_id,
          specs: itemrighttwo.specfoods[0].specs,
          stock: itemrighttwo.specfoods[0].stock,
          lisIndex: index1,
          spImIndex: index2
        });
        // this.$store.state.clickIndex.push({lisIndex:index1,spImIndex:index2})
        spans[index2].innerText = parseInt(
          this.$store.state.entities[0].quantity
        );
        if (spans[index2].innerText > 0) {
          spans[index2].style.opacity = 1;
          // imgss[index2].style.opacity = 1;
          imgss[index2].style.width = ".9rem";
        }
        console.log("双向绑定", spans[index2].innerText);

        // this.cart_listNum=this.$store.state.entities[0].quantity;
      } else {
        for (var i = 0; i < this.$store.state.entities.length; i++) {
          if (
            this.$store.state.entities[i].id ==
            itemrighttwo.specfoods[0].food_id
          ) {
            this.$store.state.entities[i].quantity += 1;
            this.$store.state.clickIndex.push({
              lisIndex: index1,
              spImIndex: index2
            });
            console.log(
              "数组循环内if语句中",
              this.$store.state.entities.quantity
            );
            spans[index2].innerText = parseInt(
              this.$store.state.entities[i].quantity
            );
            if (spans[index2].innerText > 0) {
              spans[index2].style.opacity = 1;
              imgss[index2].style.width = ".9rem";
            }
            break;
          } else if (this.$store.state.entities.length == i + 1) {
            this.$store.state.entities.push({
              attr: [],
              extra: {},
              id: itemrighttwo.specfoods[0].food_id,
              name: itemrighttwo.specfoods[0].name,
              packing_fee: itemrighttwo.specfoods[0].packing_fee,
              price: itemrighttwo.specfoods[0].price,
              quantity: 1,
              sku_id: itemrighttwo.specfoods[0].sku_id,
              specs: itemrighttwo.specfoods[0].specs,
              stock: itemrighttwo.specfoods[0].stock,
              lisIndex: index1,
              spImIndex: index2
            });
            // this.$store.state.clickIndex.push({lisIndex:index1,spImIndex:index2})
            spans[index2].innerText = parseInt(
              this.$store.state.entities[i + 1].quantity
            );
            if (spans[index2].innerText > 0) {
              spans[index2].style.opacity = 1;
              imgss[index2].style.width = ".9rem";
            }
            break;
          }
          console.log("数组循环内,循环之尾", this.$store.state.entities);
        }
      }
      // console.log("数组本身",this.$store.state.entities);

      console.log(this.$store.state.entities);

      console.log("食品id", itemrighttwo.specfoods[0].food_id, index2);
    },
    //购物车卡片界面物品增加
    shopcaraddNum(item, index) {
      console.log("物品", item);

      // 获取对应的li组件,span组件和img组件
      var lisIndex = this.$store.state.entities[index].lisIndex;
      var spImIndex = this.$store.state.entities[index].spImIndex;
      let lis = document.querySelectorAll(".menu_right_liOne");

      let spans = lis[lisIndex].querySelectorAll(".buy_num");
      let imgss = lis[lisIndex].querySelectorAll(".specs_reduce_icon");

      // console.log(this.$store.state.entities[index].id,item[0].id);

      if (this.$store.state.entities[index].id == item[index].id) {
        console.log("购物车添加");

        this.$store.state.entities[index].quantity += 1;
        spans[spImIndex].innerText = parseInt(
          this.$store.state.entities[index].quantity
        );
        console.log("数组循环内if语句中", this.$store.state.entities.quantity);
      }
      this.cart_listprice += item[0].price;
      this.cart_listNum += 1;
    },
    // 发送购物车数据同时跳转界面------------------------------
    goconfireOrder() {
      // console.log("跳转方法", this.userID);

      const url = "https://elm.cangdu.org/v1/carts/checkout";
      console.log("用户ID" + this.$route.query.id, typeof this.$route.query.id);
      console.log("经纬度", typeof localStorage.Comgeohash);
      var arratentity = [];
      arratentity.push(this.$store.state.entities);
      console.log("购物车信息", arratentity);
      this.$http({
        method: "POST",
        url: url,
        data: {
          restaurant_id: this.$route.query.id,
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
          
        }else{
          this.titleShowHide=true;
          this.titleText=res.data.message;

        }
      });
    },
    shopCarreduce(itemrighttwo, index1, index2) {
      // 获取对应的li组件,span组件和img组件
      let lis = document.querySelectorAll(".menu_right_liOne");
      // console.log(lis[index1]);
      let spans = lis[index1].querySelectorAll(".buy_num");
      let imgss = lis[index1].querySelectorAll(".specs_reduce_icon");
      // spans.style.opacity=0;
      // spans[index2].innerText = parseInt(spans[index2].innerText) - 1;
      this.cart_listprice -= itemrighttwo.specfoods[0].price;
      this.cart_listNum -= 1;
      if (spans[index2].innerText == 0) {
        spans[index2].style.opacity = 0;
        imgss[index2].style.width = "0";
      }

      for (var i = 0; i < this.$store.state.entities.length; i++) {
        if (
          this.$store.state.entities[i].id == itemrighttwo.specfoods[0].food_id
        ) {
          if (this.$store.state.entities[i].quantity > 1) {
            this.$store.state.entities[i].quantity -= 1;
            spans[index2].innerText = parseInt(
              this.$store.state.entities[i].quantity
            );
            break;
          } else {
            this.$store.state.entities.splice(i, 1);
            spans[index2].innerText = 0;
            if (spans[index2].innerText == 0) {
              spans[index2].style.opacity = 0;
              imgss[index2].style.width = "0";
              console.log("删除中", this.$store.state.entities);
            }
            break;
          }
        }
        console.log("删除中", this.$store.state.entities);
      }
    },

    //购物车卡片界面物品减少
    shopcarreduceNum(item, index) {
      console.log("购物车下标", index);

      // 获取对应的li组件,span组件和img组件
      var lisIndex = this.$store.state.entities[index].lisIndex;
      var spImIndex = this.$store.state.entities[index].spImIndex;
      let lis = document.querySelectorAll(".menu_right_liOne");
      console.log("lis的组件下标", lisIndex);
      console.log("lis的组件", lis[lisIndex]);

      let spans = lis[lisIndex].querySelectorAll(".buy_num");
      let imgss = lis[lisIndex].querySelectorAll(".specs_reduce_icon");

      this.cart_listprice -= item[index].price;
      this.cart_listNum -= 1;
      if (this.$store.state.entities[index].id == item[index].id) {
        console.log("数组长度", this.$store.state.entities.length);

        if (this.$store.state.entities[index].quantity > 1) {
          this.$store.state.entities[index].quantity -= 1;
          spans[spImIndex].innerText = parseInt(
            this.$store.state.entities[index].quantity
          );
          console.log("删除中", this.$store.state.entities);
          this.shopcarShowHide = true;
        } else {
          if (this.$store.state.entities.length == 1) {
            this.$store.state.entities.splice(index, 1);
            spans[spImIndex].innerText = 0;
            if (spans[spImIndex].innerText == 0) {
              spans[spImIndex].style.opacity = 0;
              imgss[spImIndex].style.width = "0";
              this.shopcarShowHide = false;
            }
          } else {
            this.$store.state.entities.splice(index, 1);
            spans[spImIndex].innerText = 0;
            if (spans[spImIndex].innerText == 0) {
              spans[spImIndex].style.opacity = 0;
              imgss[spImIndex].style.width = "0";
              this.shopcarShowHide = true;
            }
          }
        }

        console.log("删除中", this.$store.state.entities);
      }
    },
    //选择规格
    itemSpeci(specifications, index1, index2) {
      console.log("li的下标", index1);
      console.log("span的下标", index2);

      this.liIndex = index1;
      this.spanIndex = index2;
      this.foodspecification = true;
      this.foodspecificationInfo = specifications;
      this.foodspecificationInfoprice = specifications[0].price;
      console.log("当前食品参数", this.foodspecificationInfo);

      console.log("规格参数是否改变");

      this.foodspecificationInfoIndex = 0;
    },
    // 规格之间的选择
    clickspecification(price, index) {
      this.foodspecificationInfoIndex = index;
      this.foodspecificationInfoprice = price;
    },
    foodspecInshopcar(info, id) {
      //加入购物车的价格foodspecificationInfoprice

      // 获取对应的li组件,span组件和img组件
      let lis = document.querySelectorAll(".menu_right_liOne");
      console.log(lis[this.liIndex]);

      let spans = lis[this.liIndex].querySelectorAll(".buy_num");
      let imgss = lis[this.liIndex].querySelectorAll(".specs_reduce_icon");

      // this.spanIndex

      console.log("当前界面信息", info[id]);
      this.foodspecification = false;
      this.cart_listNum += 1;
      this.cart_listprice += info[id].price;

      if (this.$store.state.entities.length == 0) {
        this.$store.state.entities.push({
          attr: [],
          extra: {},
          id: info[id].food_id,
          name: info[id].name,
          packing_fee: info[id].packing_fee,
          price: info[id].price,
          quantity: 1,
          sku_id: info[id].sku_id,
          specs: info[id].specs,
          stock: info[id].stock,
          lisIndex: this.liIndex,
          spImIndex: this.spanIndex
        });
        spans[this.spanIndex].innerText = parseInt(
          this.$store.state.entities[0].quantity
        );
        if (spans[this.spanIndex].innerText > 0) {
          spans[this.spanIndex].style.opacity = 1;
          // imgss[index2].style.opacity = 1;
          imgss[this.spanIndex].style.width = ".9rem";
        }
      } else {
        for (var i = 0; i < this.$store.state.entities.length; i++) {
          if (this.$store.state.entities[i].id == info[id].food_id) {
            this.$store.state.entities[i].quantity += 1;
            console.log(
              "数组循环内if语句中",
              this.$store.state.entities.quantity
            );
            spans[this.spanIndex].innerText = parseInt(
              this.$store.state.entities[i].quantity
            );
            if (spans[this.spanIndex].innerText > 0) {
              spans[this.spanIndex].style.opacity = 1;
              // imgss[index2].style.opacity = 1;
              imgss[this.spanIndex].style.width = ".9rem";
            }
            break;
          } else if (this.$store.state.entities.length == i + 1) {
            this.$store.state.entities.push({
              attr: [],
              extra: {},
              id: info[id].food_id,
              name: info[id].name,
              packing_fee: info[id].packing_fee,
              price: info[id].price,
              quantity: 1,
              sku_id: info[id].sku_id,
              specs: info[id].specs,
              stock: info[id].stock,
              lisIndex: this.liIndex,
              spImIndex: this.spanIndex
            });
            spans[this.spanIndex].innerText = parseInt(
              this.$store.state.entities[i + 1].quantity
            );
            if (spans[this.spanIndex].innerText > 0) {
              spans[this.spanIndex].style.opacity = 1;
              // imgss[index2].style.opacity = 1;
              imgss[this.spanIndex].style.width = ".9rem";
            }
            break;
          }
          console.log("数组循环内,循环之尾", this.$store.state.entities);
        }
      }
    },
    //点击进行滚动条跳转
    menu_leftli(index) {
      let offsetright = document.querySelectorAll(".menu_right_header")[index]
        .offsetTop;
      document.querySelectorAll(".menu_right")[0].scrollTop = offsetright;

      // 点击进行滚动条样式切换classList.remove("mystyle");
      this.setClass = index;
      // console.log(document.querySelectorAll('.menu_leftli')[index].setClass);
    },
    //返回上一步
    goback() {
      this.$router.go(-1);
    },
    // 跳转到食品信息界面
    gofoodInfo(itemrighttwo,num,price,id,delivery_fee) {
      // console.log("数量",num);
      // console.log("金额",price);
      console.log("id",id);
      
      this.$router.push({ name: "twofoodInfo", params: { itemrighttwo,num,price,id,delivery_fee, } });
    },
    // 跳转到餐馆属性界面
    goshopAttribute(id) {
      // console.log("还未跳转",id)
      this.$router.push({ name: "shopAttribute", params: { id } });
    },
    //根据餐馆id获取餐馆详细信息
    getShopDetailInfo() {
      // console.log(this.geoHash)
      const url =
        "https://elm.cangdu.org/shopping/restaurant/" + this.$route.query.id;
      this.$http({
        method: "get",
        url: url,
        //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
        withCredentials: true // 默认false
      }).then(res => {
        this.shopInfo = res.data;
        this.activityInfoStatus = this.shopInfo.activities;
        this.geohash = this.shopInfo.location.reverse().join(",");
        console.log("餐馆详细信息shopInfo", this.shopInfo);
        console.log("餐馆活动信息个数", this.activityInfoStatus);
        // if (res.data.name != undefined) {
        //   localStorage.name = res.data.name;
        // }
      });
    },
    //根据餐馆id获取餐馆评价分数
    getShopRating() {
      // console.log(this.geoHash)
      const url =
        "https://elm.cangdu.org/ugc/v2/restaurants/" +
        this.$route.query.id +
        "/ratings/scores";
      this.$http({
        method: "get",
        url: url,
        //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
        withCredentials: true // 默认false
      }).then(res => {
        this.shopRating = res.data;
        this.service_score = parseFloat(
          this.shopRating.service_score.toFixed(1)
        );
        this.food_score = parseFloat(this.shopRating.food_score.toFixed(1));
        // console.log("餐馆评价分数", typeof(this.food_score));
        // console.log("餐馆评价分数service_score", this.service_score);
        // if (res.data.name != undefined) {
        //   localStorage.name = res.data.name;
        // }
      });
    },
    //根据餐馆id获取餐馆食品详细信息
    getShopFoodDetailInfo() {
      // console.log(this.geoHash)
      const url =
        "https://elm.cangdu.org/shopping/v2/menu?restaurant_id=" +
        this.$route.query.id;
      this.$http({
        method: "get",
        url: url,
        //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
        withCredentials: true // 默认false
      }).then(res => {
        this.foodInfo = res.data;
        this.$nextTick(() => {
          //总价
          var totle=0,totleNum=0;
          for (let i = 0; i < this.$store.state.entities.length; i++) {
            console.log("界面一出来", this.$store.state.entities[i]);
            // 获取对应的li组件,span组件和img组件
            var lisIndex = this.$store.state.entities[i].lisIndex;
            var spImIndex = this.$store.state.entities[i].spImIndex;

            //获取初始情况下的配送费
            var price=this.$store.state.entities[i].quantity*this.$store.state.entities[i].price
            console.log("价格",price);
            //获取初始情况的购物车数量
            var entitiesNum=this.$store.state.entities[i].quantity
            
            let lis = document.querySelectorAll(".menu_right_liOne");

            let spans = lis[lisIndex].querySelectorAll(".buy_num");
            let imgss = lis[lisIndex].querySelectorAll(".specs_reduce_icon");
            spans[spImIndex].innerText = parseInt(
              this.$store.state.entities[i].quantity
            );
            if (spans[spImIndex].innerText > 0) {
              spans[spImIndex].style.opacity = 1;
              imgss[spImIndex].style.width = ".9rem";
            }
            totleNum+=entitiesNum;
            totle+=price;
          }
          this.cart_listprice=totle;
          this.cart_listNum=totleNum;
        });
      });
    },
    //根据餐馆id获取餐馆评价分类
    getShopRatingType() {
      // console.log(this.geoHash)
      const url =
        "https://elm.cangdu.org/ugc/v2/restaurants/" +
        this.$route.query.id +
        "/ratings/tags";
      this.$http({
        method: "get",
        url: url,
        //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
        withCredentials: true // 默认false
      }).then(res => {
        this.foodRatingType = res.data;
        // console.log("餐馆评价分类信息foodRatingType", this.foodRatingType);
        // if (res.data.name != undefined) {
        //   localStorage.name = res.data.name;
        // }
      });
    },
    //根据传下的餐馆评价类型信息修改状态
    goFoodRatingType(typeInfo) {
      this.foodRatingTypeState = typeInfo;
      // console.log("根据传下的餐馆评价类型信息修改状态foodRatingTypeState",this.foodRatingTypeState);
    },
    //获取餐馆评价信息
    getshopRatingInfo() {
      const url =
        "https://elm.cangdu.org/ugc/v2/restaurants/" +
        this.$route.query.id +
        "/ratings";
      this.$http({
        method: "get",
        url: url,
        //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
        withCredentials: true // 默认false
      }).then(res => {
        this.shopRatingInfo = res.data;
        // console.log("餐馆评价信息shopRatingInfo", this.shopRatingInfo);
        // if (res.data.name != undefined) {
        //   localStorage.name = res.data.name;
        // }
      });
    },
    // 小数点转百分比
    toPercent(point) {
      var str = Number(point * 100).toFixed(1);
      str += "%";
      return str;
    }
  }
};
</script>

<style scoped>
/* 整体 */
.shop_container {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  left: 0;
  height: 100%;
}

/* 头部跳转样式 */
.goback {
  position: fixed;
  top: -0.1rem;
  left: -0.1rem;
  width: 100%;
  height: 2rem;
  z-index: 11;
  padding-top: 0.2rem;
  padding-left: 0.2rem;
}
.goback i {
  font-size: 1rem;
  font-weight: 900;
  color: white;
}
/* 头部 */
.header {
  z-index: 10;
  overflow: hidden;
  position: relative;
}
.blurImg {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  /* z-index: 9; */
  -webkit-filter: blur(10px);
  filter: blur(10px);
}
.description_header {
  position: relative;
  z-index: 10;
  background-color: rgba(119, 103, 137, 0.43);
  padding: 0.4rem 0 0.5rem 0.4rem;
  width: 100%;
  overflow: hidden;
}
.header_a {
  display: flex;
  z-index: 10;
}
.title_left {
  margin-right: 0.3rem;
}
.header_a img {
  width: 2.9rem;
  height: 2.9rem;
  display: block;
  border-radius: 0.15rem;
}
.title_right {
  padding-top: 0.1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  padding-top: 0.1rem;
}
.title_right h4 {
  font-size: 0.8rem;
  color: #fff;
  font-weight: 700;
  width: 100%;
  margin-bottom: 0.3rem;
}
.title_right p:first-of-type {
  font-size: 0.5rem;
  color: #fff;
  margin-bottom: 0.3rem;
}
.title_right p:last-of-type {
  font-size: 0.5rem;
  color: #fff;
  width: 11.5rem;
}
.header_a i {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0.7rem;
  z-index: 11;
  font-size: 0.9rem;
  color: white;
}
.description_footer {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  padding-right: 1.5rem;
  box-sizing: border-box;
}
.description_footer p {
  display: inline-block;
  font-size: 0.5rem;
  color: #fff;
}
.description_footer .ellipsis {
  width: 84%;
}
.tip_icon {
  padding: 0 0.04rem;
  border: 0.025rem solid #fff;
  border-radius: 0.1rem;
  font-size: 0.4rem;
  display: inline-block;
  box-sizing: border-box;
}
.description_footer .footer_arrow {
  width: 0.45rem;
  height: 0.45rem;
  position: absolute;
  right: 1rem;
  color: #fff;
}

/* 优惠信息界面 */
.activities_details {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #262626;
  z-index: 200;
  padding: 1.25rem;
  box-sizing: border-box;
}
.activities_shoptitle {
  text-align: center;
  font-size: 0.8rem;
  color: #fff;
}
.activities_ratingstar {
  display: flex;
  justify-content: center;
  transform: scale(2.2);
  margin-top: 0.7rem;
}
.activities_list {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-size: 0.5rem;
  color: #fff;
}
.activities_title_style {
  text-align: center;
  margin-bottom: 1rem;
  padding: 0.2rem 0.4rem;
  box-sizing: border-box;
}
.activities_title_style span {
  font-size: 0.5rem;
  color: #fff;
  border: 0.025rem solid #555;
  padding: 0.2rem 0.4rem;
  border-radius: 0.5rem;
  box-sizing: border-box;
}
.activities_shopinfo p {
  line-height: 0.7rem;
  font-size: 0.5rem;
  color: #fff;
}
.activities_details img {
  bottom: 1rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

/* 内容头部 */
.conTitle {
  display: flex;
  background-color: #fff;
  padding: 0.3rem 0 0.3rem;
  border-bottom: 1px solid #ebebeb;
}
.conTitle div {
  flex: 1;
  text-align: center;
}
.conTitle div .router-link-active {
  color: #3190e8;
  border-color: #3190e8;
}
.conTitle div span {
  font-size: 0.65rem;
  color: #666;
  padding: 0.6rem 0.1rem 0.2rem;
  border-bottom: 0.12rem solid #fff;
  display: inline-block;
}
/* 内容-商品部分 */
.content_commodity {
  display: flex;
  flex: 1;
  padding-bottom: 2rem;
}
/* 内容-商品部分-菜单部分 */
.commodity_menu {
  display: flex;
  flex: 1;
  overflow-y: hidden;
  position: relative;
}
.menu_left {
  width: 3.8rem;
  overflow: auto;
  position: relative;
}
.menu_left::-webkit-scrollbar {
  width: 0px;
}
.menu_leftli {
  padding: 0.7rem 0.3rem;
  border-bottom: 0.025rem solid #ededed;
  box-sizing: border-box;
  border-left: 0.15rem solid #f8f8f8;
  position: relative;
  font-size: 0.6rem;
  color: #666;
  overflow: hidden;
}
.activity_menu {
  border-left: 0.15rem solid #3190e8;
  background-color: #fff;
  font-weight: 700;
}
.menu_leftli span {
  width: 3rem;
  line-height: 1.3rem;
  display: inline-block;
}
/* 显示点餐部分 */
.category_num {
  position: absolute;
  top: 0.1rem;
  right: 0.1rem;
  background-color: #ff461d;
  line-height: 0.6rem;
  text-align: center;
  border-radius: 50%;
  border: 0.025rem solid #ff461d;
  min-width: 0.6rem;
  height: 0.6rem;
  font-size: 0.5rem;
  color: #fff;
}
.menu_right {
  flex: 4;
  overflow-y: auto;
  position: relative;
}
.menu_right::-webkit-scrollbar {
  width: 0px;
}
.menu_right_header {
  width: 100%;
  padding: 0.8rem 0.4rem 0.4rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}
.menu_right_header_left {
  width: 10rem;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
}
.menu_right_title {
  font-size: 0.7rem;
  color: #666;
  font-weight: 700;
}
.menu_right_description {
  font-size: 0.5rem;
  color: #999;
  width: 30%;
  overflow: hidden;
}
.menu_right_header_right {
  width: 0.5rem;
  height: 1rem;
  display: block;
  color: #afafaf;
}

.menu_detail_list {
  background-color: #fff;
  padding: 0.6rem 0.4rem;
  border-bottom: 1px solid #f8f8f8;
  position: relative;
  overflow: hidden;
}
.menu_detail_link {
  display: flex;
}
.menu_food_img {
  margin-right: 0.4rem;
}
.menu_food_img img {
  width: 2rem;
  height: 2rem;
  display: block;
}
.menu_food_description {
  width: 100%;
}
.food_description_head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.2rem;
}
.description_foodname {
  font-size: 0.7rem;
  color: #333;
  font-weight: bold;
}
.attributes_ul{
  display: flex;
}
.attributes_ul .attribute_new{
    position: absolute;
    top: 0;
    left: 0;
    background-color: #4cd964;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: flex-end;
    transform: rotate(-45deg) translate(-.1rem,-1.5rem);
    border: none;
    border-radius: 0;
}
.attributes_ul .attribute_new p{
    font-size: .4rem;
    color: #fff;
    text-align: center;
    flex: 1;
    transform: scale(.8) translate(.1rem,-.1rem);
    white-space: nowrap;
}
.food_description_content {
  font-size: 0.5rem;
  color: #999;
  line-height: 0.6rem;
  margin: 0.1rem 0 0.2rem;
}
.food_description_sale_rating {
  line-height: 0.8rem;
}
.food_description_sale_rating span {
  font-size: 0.5rem;
  color: #333;
}
.food_activity {
  line-height: 0.4rem;
}
.food_activity span {
  font-size: 0.3rem;
  border: 1px solid currentColor;
  border-radius: 0.3rem;
  padding: 0.08rem;
  display: inline-block;
  transform: scale(0.8);
  margin-left: -0.35rem;
  color: rgb(241, 136, 79);
  border-color: rgb(240, 115, 115);
}

.menu_detail_footer {
  margin-left: 2.4rem;
  font-size: 0;
  margin-top: 0.3rem;
  display: flex;
  justify-content: space-between;
}
.food_price span:nth-of-type(1) {
  font-size: 0.5rem;
  color: #f60;
  margin-right: 0.05rem;
}
.food_price span:nth-of-type(2) {
  font-size: 0.7rem;
  color: #f60;
  font-weight: 700;
  margin-right: 0.3rem;
}
.food_price span:nth-of-type(3) {
  font-size: 0.5rem;
  color: #666;
}

.cart_module {
  display: flex;
  align-items: center;
}
.specs_reduce_icon {
  fill: #999;
}
.cart_module img {
  width: 0.9rem;
  height: 0.9rem;
  fill: #3190e8;
}
.buy_num {
  font-size: 0.65rem;
  color: #666;
  min-width: 1rem;
  text-align: center;
}
.show_chooselist {
  display: block;
  font-size: 0.55rem;
  color: #fff;
  padding: 0.2rem 0.3rem;
  background-color: #3190e8;
  border-radius: 0.2rem;
  border: 1px solid #3190e8;
}
/* 规格卡片的样式参数 */
.specs_cover {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 17;
}
.specs_list {
  position: fixed;
  top: 35%;
  left: 15%;
  width: 70%;
  background-color: #fff;
  z-index: 18;
  border: 1px;
  border-radius: 0.2rem;
}
.specs_list_header h4 {
  font-size: 0.7rem;
  color: #222;
  font-weight: 400;
  text-align: center;
  padding: 0.5rem;
}
.specs_cancel {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
}
.specs_details {
  padding: 0.5rem;
  box-sizing: border-box;
}
.specs_details .specs_details_title {
  font-size: 0.6rem;
  color: #666;
}
.specs_list .specs_details ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0.4rem 0;
}
.specs_list .specs_details ul li {
  font-size: 0.6rem;
  padding: 0.3rem 0.5rem;
  border: 0.025rem solid #ddd;
  border-radius: 0.2rem;
  margin-right: 0.5rem;
  margin-bottom: 0.2rem;
}

.specs_activity {
  border-color: #3199e8 !important;
  color: #3199e8;
}
.specs_footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  padding: 0.5rem;
  border: 1px;
}
.specs_footer .specs_price span:first-of-type {
  color: #ff6000;
  font-size: 0.5rem;
}
.specs_footer .specs_price span:nth-of-type(2) {
  color: #ff6000;
  font-size: 0.8rem;
  font-weight: 700;
}
.specs_addto_cart {
  width: 4rem;
  height: 1.3rem;
  background-color: #3199e8;
  border: 1px;
  border-radius: 0.15rem;
  font-size: 0.6rem;
  color: #fff;
  text-align: center;
  line-height: 1.3rem;
}
/* 内容-商品部分-购物车详情部分 */
.cart_food_list {
  position: fixed;
  width: 100%;
  padding-bottom: 2rem;
  z-index: 12;
  bottom: 0;
  left: 0;
  background-color: #fff;
}
.cart_food_list header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0.6rem;
  background-color: #eceff1;
}
.cart_food_list header h4 {
  font-size: 0.7rem;
  color: #666;
}
.cart_food_list header img {
  width: 0.6rem;
  height: 0.6rem;
  vertical-align: middle;
}
.cart_food_list header .clear_cart {
  font-size: 0.6rem;
  color: #666;
}
.cart_food_details {
  background-color: #fff;
  max-height: 20rem;
  overflow-y: auto;
}
.cart_food_li {
  display: flex;
  justify-content: space-between;
  padding: 0.6rem 0.5rem;
}
.cart_list_num {
  width: 55%;
  display: inline-block;
}
.cart_list_price {
  font-size: 0;
  display: inline-block;
}
.cart_food_li .cart_list_num p:first-of-type {
  font-size: 0.7rem;
  color: #666;
  font-weight: 700;
  margin-bottom: 0.1rem;
}
.cart_food_li .cart_list_num p:nth-of-type(2) {
  font-size: 0.4rem;
  color: #666;
}
.cart_food_li .cart_list_price span:first-of-type {
  font-size: 0.6rem;
  color: #f60;
  font-family: Helvetica Neue, Tahoma;
}
.cart_food_li .cart_list_price span:nth-of-type(2) {
  font-size: 0.7rem;
  color: #f60;
  font-family: Helvetica Neue, Tahoma;
  font-weight: 700;
}
.cart_list_control {
  display: flex;
  align-items: center;
}
.cart_food_li .cart_list_control span {
  display: flex;
  align-items: center;
  justify-content: center;
}
.cart_food_li .cart_list_control img {
  width: 0.9rem;
  height: 0.9rem;
  fill: #3190e8;
}
.cart_food_li .cart_list_control .cartlist_num {
  font-size: 0.65rem;
  color: #666;
  min-width: 1rem;
  text-align: center;
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
.cart_icon_activity {
  background-color: #3190e8;
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
.gotopay_acitvity {
  background-color: #4cd964;
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

.content_evaluation {
  flex: 1;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
}
.content_evaluationOne {
  overflow-y: scroll;
}
.content_evaluationOne::-webkit-scrollbar {
  width: 0px;
}
.rating_header {
  display: flex;
  background-color: #fff;
  padding: 0.8rem 0.5rem;
  margin-bottom: 0.5rem;
}
.rating_header_left {
  flex: 3;
  text-align: center;
}
.rating_header_right {
  flex: 4;
}
.rating_header_left p:first-of-type {
  line-height: 1.5rem;
  font-size: 1.2rem;
  color: #f60;
}
.rating_header_left p:nth-of-type(2) {
  line-height: 0.9rem;
  font-size: 0.65rem;
  color: #666;
  margin-bottom: 0.1rem;
}
.rating_header_left p:nth-of-type(3) {
  line-height: 0.7rem;
  font-size: 0.4rem;
  color: #999;
}
.rating_header_right p {
  font-size: 0.65rem;
  line-height: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.rating_header_right p span:first-of-type {
  width: 2.9rem;
  color: #666;
  margin-right: 0.2rem;
}
.delivery_time {
  font-size: 0.4rem;
  color: #999;
}
.rating_header_right p .el-rate {
  transform: scale(0.7);
  display: inline-block;
  margin-left: -1rem;
}

.tag_list_ul {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 0.5rem;
}
.tag_list_ul li {
  line-height: 0.84rem;
  font-size: 0.6rem;
  color: #6d7885;
  padding: 0.3rem;
  background-color: #ebf5ff;
  border-radius: 0.2rem;
  border: 1px;
  margin: 0 0.4rem 0.2rem 0;
}
.tag_list_ul .unsatisfied {
  background-color: #f5f5f5;
  color: #aaa;
}
.tag_list_ul .tagActivity {
  background-color: #3190e8;
  color: #fff;
}

.rating_list_ul {
  background-color: #fff;
  padding: 0 0.5rem;
}
.rating_list_li {
  display: flex;
  padding: 0.6rem 0;
  border-top: 1px solid #f1f1f1;
}
.user_avatar {
  width: 1.5rem;
  height: 1.5rem;
  border: 0.025rem;
  border-radius: 50%;
  margin-right: 0.8rem;
}
.rating_list_details {
  flex: 1;
}
.rating_list_details header {
  display: flex;
  flex: 1;
  justify-content: space-between;
  margin-bottom: 0.3rem;
}
.username_star {
  color: #666;
  margin-bottom: 0.2rem;
  display: flex;
  flex-direction: column;
}
.star_desc {
  display: flex;
  align-items: center;
}
.rating_list_details header .el-rate {
  width: 6rem;
  transform: scale(0.6);
  margin-left: -1.3rem;
}
.time_spent_desc {
  font-size: 0.55rem;
  color: #666;
  margin-left: -1.8rem;
}
.rated_at {
  font-size: 0.4rem;
  color: #999;
}
.food_img_ul {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.4rem;
}
.food_img_ul li img {
  width: 3rem;
  height: 3rem;
  margin-right: 0.4rem;
  display: block;
}
.food_name_ul {
  display: flex;
  flex-wrap: wrap;
}
.food_name_ul li {
  font-size: 0.55rem;
  color: #999;
  width: 2.2rem;
  padding: 0.2rem;
  border: 0.025rem solid #ebebeb;
  border-radius: 0.15rem;
  margin-right: 0.3rem;
  margin-bottom: 4px;
}
/* 不可点击属性 */
/* disable{} */
/* 内容-评价部分-食品卡片部分 */
</style>
