<template>
  <div>
    <com-title title="订单列表"></com-title>
    <ul class="order_ul">
      <li class="order_list_li" v-for="(itemorderlist,index) in orderlist" :key="index" @click="goorderdetail(itemorderlist)">
        <img :src="'//elm.cangdu.org/img/'+itemorderlist.restaurant_image_url" alt="" class="li_img">
        <section class="order_item_right">
          <section>
            <header class="order_item_right_header">
              <section>
                <h4>
                  <span class="ellipsis">{{itemorderlist.restaurant_name}}</span>
                  <i class="el-icon-arrow-right arrow_right"></i>
                </h4>
                <p class="order_time">{{itemorderlist.formatted_created_at}}</p>
              </section>
              <p class="order_status">{{itemorderlist.status_bar.title}}</p>
            </header>
            <section class="order_basket">
              <p class="order_name ellipsis"></p>
              <p class="order_amount">¥{{itemorderlist.total_amount}}</p></section>
          </section>
          <div class="order_again">
            <span class="buy_again">再来一单</span>
          </div>
        </section>
      </li>
    </ul>
  </div>
</template>

<script>
import comTitle from "../common/Component/comTitle";
export default {
  name: "order",
  data() {
    return {
      orderlist:[],
    }
  },
  created() {
    console.log("order", this.$route);
    this.getOrderlist();
  },
  components: {
    comTitle
  },
  methods: {
      //跳转到订单详情
    goorderdetail(item){
      this.$router.push({ name: "orderDetail",params:{item}});
    },
      getOrderlist(){
        console.log("状态码",this.$store.ComloginState);
        if (this.$store.ComloginState==200) {
          const url = "https://elm.cangdu.org/bos/v2/users/"+localStorage.Comloginid+"/orders?limit=10&offset=0";
        this.$http({
          method: "get",
          url: url,
          //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
          withCredentials: true // 默认false
        }).then(res => {
          this.orderlist=res.data;
          console.log("订单列表",this.orderlist);
        });
        }
      },
    // // 测试用户是否在线
    // getUser() {
    //    console.log("状态码",this.$store.ComloginState)
    //   const url = "https://elm.cangdu.org/v1/user";
    //   this.$http({
    //     method: "get",
    //     url: url,
    //     //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
    //     withCredentials: true // 默认false
    //   }).then(res => {
    //     // console.log("tap", res);
    //     console.log("tap", res.data);
    //     if (res.data.username != undefined) {
    //       // this.loginState = "200";
    //     }
    //   });
    // },
    // // 用户退出方法
    // outUser() {
    //   const url = "https://elm.cangdu.org/v2/signout";
    //   this.$http({
    //     method: "get",
    //     url: url,
    //     //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
    //     withCredentials: true // 默认false
    //   }).then(res => {
    //     console.log("退出登录", res.data);
    //     // console.log(res.data.status);
    //     if (res.data.status == 1) {
    //       this.$store.ComloginState = "0";
    //     }
    //     console.log("状态码",this.$store.ComloginState)
    //     // console.log(this.$store.ComloginState)

    //   });
    // },
  }
};
</script>

<style scoped>
.order_ul{
    padding-bottom: 1.95rem;
}
.order_list_li{
    background-color: #fff;
    display: flex;
    margin-bottom: .5rem;
    padding: .6rem .6rem 0;
}
.li_img{
  width: 2rem;
  height: 2rem;
  margin-right: .4rem;
}
.order_item_right{
  flex: 5;
}
.order_item_right_header{
    border-bottom: .025rem solid #f5f5f5;
    padding-bottom: .3rem;
    display: flex;
    justify-content: space-between;
}
.order_status{
    font-size: .6rem;
    color: #333;
}
.arrow_right{
    width: .4rem;
    height: .4rem;
    color: #ccc;
    margin-right: .2rem;
}
.order_time{
    font-size: .55rem;
    color: #999;
    line-height: .8rem;
}
.order_basket{
    display: flex;
    justify-content: space-between;
    line-height: 2rem;
    border-bottom: .025rem solid #f5f5f5;
}
.order_name{
    font-size: .6rem;
    color: #666;
    width: 8rem;
}
.order_amount{
    font-size: .6rem;
    color: #f60;
    font-weight: 700;
}
.order_again{
    text-align: right;
    line-height: 1.6rem;
}
.buy_again{
    font-size: .55rem;
    color: #3190e8;
    border: .025rem solid #3190e8;
    padding: .1rem .2rem;
    border-radius: .15rem;
}
</style>
