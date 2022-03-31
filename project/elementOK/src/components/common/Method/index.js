import Vue from 'vue'
import Vuex from 'vuex'
// 请求模块
import axios from 'axios'
import VueAxios from 'vue-axios'
  export default {
    doif1:false,
    doif2:true,
    doif3:true,
    doif4:true,
    Comgeohash:"",
    nowCity:"",
    // 外卖界面

    // 食品分类
    foodType:[],


    setdoif1(){
      this.doif1 = false;
      this.doif2 = true;
      this.doif3 = true;
      this.doif4 = true;
      console.log("doif1",this.doif1);
    },
    setdoif2(){
      this.doif1 = true;
      this.doif2 = false;
      this.doif3 = true;
      this.doif4 = true;
      console.log("doif2",this.doif2);
    },
    setdoif3(){
      this.doif1 = true;
      this.doif2 = true;
      this.doif3 = false;
      this.doif4 = true;
      console.log("doif3",this.doif3);
    },
    setdoif4(){
      this.doif1 = true;
      this.doif2 = true;
      this.doif3 = true;
      this.doif4 = false;
      console.log("doif4",this.doif4);
    },
    
    todo1(){
      console.log("todo",this);
    }
  }