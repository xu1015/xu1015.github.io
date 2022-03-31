<template>
  <div class="hello">
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="food_guide">
      <router-link to="/elm/waimai" >
        <img :src="$route.name=='waimai'?require('../../assets/common/foodGuide/elemeC.png'):require('../../assets/common/foodGuide/eleme.png')" alt>
        <!-- <img v-else src="../../assets/common/foodGuide/elemeC.png" alt> -->
        <span>外卖</span>
      </router-link>
      <router-link to="/elm/search" >
        <img :src="$route.name=='search'?require('../../assets/common/foodGuide/searchC.png'):require('../../assets/common/foodGuide/search.png')" alt>
        <span>搜索</span>
      </router-link>
      <router-link to="/elm/order" >
        <img :src="$route.name=='order'?require('../../assets/common/foodGuide/orderC.png'):require('../../assets/common/foodGuide/order.png')" alt>
        <span>订单</span>
      </router-link>
      <router-link to="/elm/my" >
        <img :src="$route.name=='my'?require('../../assets/common/foodGuide/myC.png'):require('../../assets/common/foodGuide/my.png')" alt>
        <span>我的</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "waimaiHome",
  data() {
    return {
      
    };
  },
  methods: {
    // prev() {
    //   this.$router.go(-1);
    // },
    created() {
        console.log("aaa")
        // this.imgC();
    },
    // imgC() {   
    //     var name=this.$route.name;
    //     // console.log(name);
    //     if (name=="waimai") {
    //         this.global.setdoif1();
    //     }else if(name=="search") {
    //         this.global.setdoif2();
    //     }else if(name=="order") {
    //         this.global.setdoif3();
    //     }else if(name=="my") {
    //         this.global.setdoif4();
    //     }
        
    // }
  }
};
</script>

<style scoped>
/* 通用部分 */
.hello {
  width: 100%;
  height: 100%;
  position: relative;
}
/* food_guide食品向导部分 */
.food_guide {
  width: 100%;
  height: 1.95rem;
  /* line-height: 45.7px; */
  position: fixed;
  bottom: 0;
  border-top: 1px solid #f0f0f0;
  background: #ffffff;
  display: flex;
}
.food_guide a {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-self: center;
  text-align: center;
  color: #666666;
  text-decoration: none;
}
.food_guide a img {
  width: 0.8rem;
  height: 0.8rem;
  margin: 0 auto;
  vertical-align: top;
}
.food_guide span {
  font-size: 0.45rem;
  display: inline-block;
}
</style>
