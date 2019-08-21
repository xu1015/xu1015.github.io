<template>
  <div class="one">
    <!-- 头部 -->
    <Nav></Nav>
    <div id="phone">
      <div class="swiper-container swiper-container1">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <router-link to="/slot">
              <img src="@/assets/images/firstpage/EVENT_SLOT.png" style="width: 100%;">
            </router-link>
          </div>
          <div class="swiper-slide">
            <a target="_self" :href="'https://eoskingdom.io/webgame/pkIndex.html?master=base&timestamp='+ Date.parse(new Date())">
              <img src="@/assets/images/firstpage/banner1.png" style="width: 100%;">
            </a>
          </div>
          <div class="swiper-slide">
            <div>
              <img  src="@/assets/images/firstpage/banner2.png" style="width: 100%;">
            </div>
          </div>
          <div class="swiper-slide">
            <a :href="'https://eoskingdom.io/webgame/pkIndex.html?master=base&timestamp='+ Date.parse(new Date())">
              <img src="@/assets/images/firstpage/banner3.png" style="width: 100%;">
            </a>
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
        <div class="shadow">
          <img src="@/assets/images/phone/lunbo_img.png" alt>
        </div>
      </div>

      <div class="content">
        <ul>
          <li>
            <a
              target="_self"
              :href="'https://eoskingdom.io/webgame/pkIndex.html?master=base&timestamp='+ Date.parse(new Date())"
            >
              <img src="@/assets/images/firstpage/C01-ICON_01_TH.png" alt>
            </a>
            <div class="font-style toRed">{{$t('ekd.NowPlaying')}}</div>
          </li>
          <li>
            <router-link to="/slot">
              <img src="@/assets/images/firstpage/C01-ICON_02_BJ.png" alt>
            
            </router-link>
            <div class="font-style toRed">{{$t('ekd.NowPlaying')}}</div>
          </li>
          <li>
            <a href="#">
              <img src="@/assets/images/firstpage/C01-ICON_03_BC.png" alt>
            </a>
            <div class="font-style">{{$t('ekd.ComingSoon')}}</div>
          </li>
          <li>
            <a href="#">
              <img src="@/assets/images/firstpage/C01-ICON_04_RL.png" alt>
            </a>
            <div class="font-style">{{$t('ekd.ComingSoon')}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="xianzhi"></div>
    <!-- 第三页-server服务- -->
    <server></server>
    <!-- 第四页-收益- -->
    <shouyi></shouyi>
    <!-- 第五页-路线图- -->
    <way></way>
    <!-- 第六页-合作- -->
    <team></team>
     <message-box :title="showHideInfo" :content="showHideInfo1" :showHide="showHide" :change="shchange"></message-box>
  </div>
</template>

<script>
// 插件样式引入
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import "@/assets/css/phoneIndex.css";
// 组件引入
import Nav from '../layout/Nav'
import server from '../page/server'
import shouyi from '../page/shouyi'
import way from '../page/way'
import team from '../page/team'
import messageBox from '../page/messageBox'
// import VConsole from 'vconsole'
// const vConsole = new VConsole()
export default {
  inject:['reload'],
  components:{Nav,server,shouyi,way,team,messageBox},
  name: "phoneIndex",
  data() {
    return {
      // 弹框显示隐藏
      showHide: false,
      // 往弹框传的信息
      showHideInfo: "",
      showHideInfo1: "",
      
      day: 0+"0",
      hou: 0+"0" ,
      min: 0+"0" ,
      sec: 0+"0" ,
      //剩余的EKD
      surplusEKD: null,
      //eos->ekd 兑换比例
      scale: null,
      
      //进度条赋值
      progressValue: "40%", //  进度条上方文字显示
      progressWidth: { width: `40%` }, //进度条
      countDownList: "00:00:00:00",
      actStartTime: "2019-5-5 18:00:00", //开始时间
      actchangeTime:'2019-5-19 18:00:00',//变化时间
      actEndTime: "2019-5-23 00:00:00", //结束时间
      EKOval: 5000,
      readOnlyEos: null,
      acc: null,
      Eosamount: 1,
      NOW: require("@/assets/images/nav/now.png"),
      
      
    };
  },
 
  methods: {
    // 框架双向绑定方法
    shchange(val) {
      this.showHide = val;
    },
    // 锚点跳转
    jump() {
      let jump = document.getElementById('info');
      // 获取需要滚动的距离
      let total = jump.offsetTop;
      // Chrome
      document.body.scrollTop = total;
      // Firefox
      document.documentElement.scrollTop = total;
      // Safari
      window.pageYOffset = total;
    },
    
    

    timeFormat(param) {
      return param < 10 ? "0" + param : param;
    },
    transaction() {
         this.showHide=true;
         this.showHideInfo=this.$t('ekd.bugOver')
         this.showHideInfo1=this.$t('ekd.bugName')   
    },
    //计算EKD数量
    CalculationEKD() {
      if (this.Eosamount < 0) {
        this.Eosamount = 0;
      } else {
        this.EKOval = this.Eosamount * this.scale;
        // console.log("换算比例",this.scale)
      }
    },
    CalculationEOS() {
      if (this.EKOval < 0) {
        this.EKOval = 0;
      } else {
        this.Eosamount = this.EKOval / this.scale;
      }
    },
    
  },
  mounted() {
    document.getElementsByClassName("phone_fixed")[0].style.width =
      window.screen.width + "px";
    // 主页轮播
    var swiper1 = new Swiper(".swiper-container1", {
      effect: 'slide',
      loop: true,
      observer: true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents: true,//修改swiper的父元素时，自动初始化swiper
      autoplay: {
        delay: 2000,
        disableOnInteraction: false
      },
      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination"
      }
    });
    
  }
};
</script>

<style>
</style>

