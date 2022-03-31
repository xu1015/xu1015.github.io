<template>
    <div>
        <div class="title">
            <i class="el-icon-arrow-left titleImg" @click="goback()"></i>
            <span class="ellipsis">订单详情</span>
            <span></span>
      </div>
      <section class="order_context">
        <section class="order_titel">
            <img :src="'//elm.cangdu.org/img/'+$route.params.item.restaurant_image_url" alt="">
            <p>{{$route.params.item.status_bar.title}}</p>
            <p></p>
            <section class="order_again" @click="goshop($route.params.item.restaurant_id)">再来一单</section>
        </section>
        <!-- 食品展示部分 -->
        <section class="food_list">
            <section class="food_list_header">
                <div class="shop_name" @click="goshop($route.params.item.restaurant_id)">
                    <img :src="'//elm.cangdu.org/img/'+$route.params.item.restaurant_image_url" alt="">
                    <span>{{$route.params.item.restaurant_name}}</span>
                </div>
                <i class="el-icon-arrow-right arrow_right"></i>
            </section>
            <ul class="food_list_ul">
                <li v-for="(item,index) in $route.params.item.basket.group[0]" :key="index">
                    <p class="food_name ellipsis">{{item.name}}</p>
                    <div class="quantity_price">
                        <span>×{{item.quantity}}</span>
                        <span>¥{{item.price}}</span>
                    </div>
                </li>
            </ul>
            <div class="deliver_fee">
                <span>{{$route.params.item.basket.deliver_fee.name}}</span>
                <span>{{$route.params.item.basket.deliver_fee.price}}</span>
            </div>
            <div class="deliver_fee">
                <span>{{$route.params.item.basket.packing_fee.name}}</span>
                <span>{{$route.params.item.basket.packing_fee.price}}</span>
            </div>
            <div class="pay_ment">实付{{$route.params.item.total_amount}}</div>
        </section>
        <section class="order_detail_style">
            <header>配送信息</header>
            <section class="item_style">
                <p>送达时间：</p>
                <div class="item_right"></div>
            </section>
            <section class="item_style">
                <p>送货地址：</p>
                <div class="item_right"></div>
            </section>
            <section class="item_style">
                <p>配送方式：</p>
                <div class="item_right">
                    <p>蜂鸟快送</p>
                </div>
            </section>
        </section>
        <section class="order_detail_style">
            <header>订单信息</header>
            <section class="item_style">
                <p>订单号：</p>
                <div class="item_right">
                    <p>{{$route.params.item.id}}</p>
                </div>
            </section>
            <section class="item_style">
                <p>支付方式：</p>
                <div class="item_right">
                    <p>在线支付</p>
                </div>
            </section>
            <section class="item_style">
                <p>下单时间：</p>
                <div class="item_right">
                    <p>{{this.$route.params.item.formatted_created_at}}</p>
                </div>
            </section>
        </section>

      </section>
    </div>
</template>

<script>
export default {
    name:"orderDetail",
    created() {
        console.log("传过来的消息",this.$route.params.item)
    },
    methods: {
        goback(){
            this.$router.go(-1)
        },
        //跳转到商家界面
        goshop(id){
            this.$router.push({name:"shop",query:{id}})
        },
    },
}
</script>

<style scoped>
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
.order_context{
    margin-top: 1.95rem;
}

/* 订单内容 */
.order_titel{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: .7rem;
    background-color: #fff;
    margin-bottom: .5rem;
}
.order_titel img{
    border: .05rem solid #3190e8;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
}
.order_titel p:first-of-type {
    font-size: .9rem;
    color: #333;
    font-weight: 700;
    margin-top: .4rem;
}
.order_titel p:nth-of-type(2) {
    font-size: .55rem;
    color: #999;
    width: 10rem;
    margin-top: .3rem;
    text-align: center;
}
.order_titel .order_again{
    font-size: .6rem;
    color: #3190e8;
    margin-top: .5rem;
    border: .025rem solid #3190e8;
    padding: .15rem .4rem;
    border-radius: .1rem;
    box-sizing: border-box;
    line-height: .8rem;
}
/* 食品展示部分 */
.food_list{
    background-color: #fff;
}
.food_list .food_list_header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .2rem .5rem;
    border-bottom: 1px solid #f5f5f5;
}
.food_list .food_list_header i{
    width: .6rem;
    height: .6rem;
    color: #666;
    font-weight: 700;
}
.food_list .food_list_header .shop_name img{
    width: 1.2rem;
    height: 1.2rem;
    vertical-align: middle;
    margin-right: .2rem;
}
.food_list .food_list_header .shop_name span{
    font-size: .75rem;
    color: #333;
    font-weight: 700;
}
.food_list_ul li{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .5rem;
    line-height: 2rem;
}
.food_list_ul li .food_name{
    font-size: .6rem;
    color: #666;
    -ms-flex: 4;
    flex: 4;
}
.ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.food_list_ul li .quantity_price{
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.food_list_ul li .quantity_price span:first-of-type {
    font-size: .6rem;
    color: #ccc;
}
.food_list_ul li .quantity_price span:nth-of-type(2) {
    font-size: .6rem;
    color: #666;
}
.deliver_fee{
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-align: center;
    align-items: center;
    padding: 0 .5rem;
    line-height: 2rem;
    border-top: 1px solid #f5f5f5;
}
.deliver_fee span{
    font-size: .6rem;
    color: #666;
}
.pay_ment{
    font-size: .6rem;
    color: #fb6b23;
    border-top: 1px solid #f5f5f5;
    font-weight: 700;
    line-height: 2rem;
    text-align: right;
    padding-right: .5rem;
}

/* 配送信息 */
.order_detail_style{
    background-color: #fff;
    margin-top: .5rem;
}
.order_detail_style header{
    font-size: .75rem;
    color: #333;
    padding: .5rem;
    border-bottom: 1px solid #f5f5f5;
}
.order_detail_style .item_style{
    display: flex;
    padding: .5rem;
}
.order_detail_style .item_style p{
    font-size: .65rem;
    color: #666;
    line-height: 1rem;
}
.order_detail_style .item_style p{
    font-size: .65rem;
    color: #666;
    line-height: 1rem;
}
</style>
