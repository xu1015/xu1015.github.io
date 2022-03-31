<template>
  <div>
    <div class="hello">
      <div class="title">
        <strong @click="prev()">
          <i class="el-icon-arrow-left"></i>
        </strong>
        <span>商家详情</span>
        <!-- <router-link to="/">切换城市</router-link> -->
      </div>
    </div>
    <section class="activities_container">
      <header>活动与属性</header>
      <ul class="actibities_ul">
        <li v-for="(itemAttr1,index) in shopInfo.activities" :key="index">
          <span :style="itemAttr1.id==1?'background-color: rgb(240, 115, 115);':'background-color: rgb(112, 188, 70);;'">{{itemAttr1.icon_name}}</span>
          <span>{{itemAttr1.description}}(App专享)</span>
        </li>
      </ul>
      <ul class="actibities_ul">
        <li v-for="(itemAttr,index) in shopInfo.supports" :key="index">
          <span>{{itemAttr.icon_name}}</span>
          <span>{{itemAttr.description}}(App专享)</span>
        </li>
      </ul>
    </section>
    <section class="shop_status_container">
      <div class="shop_status_header">
        <span class="shop_detail_title">食品监督安全公示</span>
        <div>
          <span class="identification_detail">企业认证详情</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <section class="shop_statu_detail">
        <div>
          <img src="../../assets/common/add.png" alt="">
        </div>
        <div class="check_date">
          <p>
            <span>监督检查结果：</span>
            <span class="shop_status_well">良好</span>
          </p>
          <p>
            <span>检查日期：</span>
            <span class="shop_status_well">...</span>
          </p>
        </div>
      </section>
    </section>
    <section class="shop_status_info">
      <header>商家信息</header>
      <p>{{shopInfo.name}}</p>
      <p>地址：{{shopInfo.address}}</p>
      <p>营业时间：{{shopInfo.opening_hours}}</p>
      <p> 
        <!-- @click="lookLicenceImg1()" -->
        <span>营业执照</span>
        <i class="el-icon-arrow-right description_arrow"></i>
      </p>
      <p>
         <!-- @click="lookLicenceImg2()" -->
        <span>餐饮许可证</span>
        <i class="el-icon-arrow-right description_arrow"></i>
      </p>
    </section>
    <section v-if="CateringPermit=='2'||BusinessLicense=='1'" class="license_container">
      <img :src="licenceImg" alt="">
    </section>
  </div>
</template>

<script>
export default {
  name: "shopAttribute",
  data() {
    return {
      shopInfo:[],
      BusinessLicense:"",
      CateringPermit:"",
      licenceImg:"",
    }
  },
  created() {
    console.log("shopAttribute", this.$route.params.id);
    this.getShopDetailInfo();
  },
  methods: {
    // 点击显示营业执照BusinessLicense
    // lookLicenceImg1(){
    //   this.BusinessLicense=='1';
    //   this.licenceImg=require(this.shopInfo.license.business_license_image.length>0?'http://elm.cangdu.org/img/'+this.shopInfo.license.business_license_image:"")
    // },
    // 点击显示餐饮许可证CateringPermit
    // lookLicenceImg2(){
    //   this.CateringPermit=='2';
    //   console.log("本地数据测试",this.shopInfo);
      
    //   this.licenceImg=require(this.shopInfo.license.catering_service_license_image.length>0?'http://elm.cangdu.org/img/'+this.shopInfo.license.catering_service_license_image:"")
    // },
    prev() {
      this.$router.go(-1);
    },
    //根据餐馆id获取餐馆详细信息
    getShopDetailInfo() {
      // console.log(this.geoHash)
      const url ="https://elm.cangdu.org/shopping/restaurant/" + this.$route.params.id;
      this.$http({
        method: "get",
        url: url,
        //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
        withCredentials: true // 默认false
      }).then(res => {
        this.shopInfo = res.data;
        console.log(this.shopInfo)
        // if (res.data.name != undefined) {
        //   localStorage.name = res.data.name;
        // }
      });
    },

  }
};
</script>

<style scoped>
/* 全局设置 */

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
/* 活动与属性界面 */
.activities_container{
    background-color: #fff;
    margin: .4rem 0;
    padding-bottom: .6rem;
}
.activities_container header{
    font-size: .75rem;
    color: #333;
    line-height: 1.8rem;
    padding-left: .6rem;
    border-bottom: 1px solid #f1f1f1;
    margin-bottom: .3rem;
}
.actibities_ul{
  padding:0 .6rem;
}
.actibities_ul li{
  margin-bottom: .2rem;
  line-height: 1.35rem;
}
.actibities_ul li span:first-of-type{
    font-size: .45rem;
    color: #fff;
    padding: .1rem;
    border: 1px;
    border-radius: .1rem;
    margin-right: .2rem;
    background-color: rgb(87, 169, 255);
}
.actibities_ul li span:nth-of-type(2){
    font-size: .55rem;
    color: #666;
}
.actibities_ul:nth-of-type(2) li:nth-of-type(2n+1) span:first-of-type{
    background-color: rgb(153, 153, 153);
}
.shop_status_container{
    flex-direction: column;
    background-color: #fff;
    margin-bottom: .4rem;
}
.shop_status_header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 1.8rem;
    padding: 0 .6rem;
    border-bottom: .025rem solid #f1f1f1;
}
.shop_detail_title{
    font-size: .75rem;
    color: #333;
}
.identification_detail{
    font-size: .7rem;
    color: #bbb;
    vertical-align: middle;
}
.shop_status_container .shop_status_header img{
    width: .6rem;
    height: .6rem;
    vertical-align: middle;
}

.shop_statu_detail{
    display: flex;
    padding: .6rem;
}
.shop_status_container .shop_statu_detail img{
    width: 2rem;
    height: 2rem;
    margin-right: .6rem;
}
.shop_statu_detail p{
  line-height: 1.45rem;
}
.shop_status_container .shop_statu_detail .check_date span{
    font-size: .55rem;
    color: #666;
}
.shop_status_info{
    background-color: #fff;
    margin-bottom: .4rem;
}
.shop_status_info header{
    line-height: 1.8rem;
    padding: 0 .6rem;
    font-size: .75rem;
    color: #333;
    border-bottom: .025rem solid #f1f1f1;
}
.shop_status_info p{
  line-height: .8rem;
    font-size: .6rem;
    color: #666;
    padding: .7rem .6rem .7rem 0;
    margin-left: .6rem;
    border-bottom: .025rem solid #f5f5f5;
}
.description_arrow{
    width: 14;
    height: 14;
}
.shop_status_info p:nth-of-type(4){
    display: flex;
    justify-content: space-between;
}
.shop_status_info p:nth-of-type(5){
    display: flex;
    justify-content: space-between;
}
.license_container{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.5);
    z-index: 101;
}
.license_container img{
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
</style>
