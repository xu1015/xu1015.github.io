import Vue from 'vue'

import axios from 'axios'
// 异步方法
export default {
    asyReduce({commit},n){
      //在异步当中做异步请求，模拟下请求数据需要一秒
     setTimeout(() => {
       //触发mutations函数中的方法
    //  context.commit('reduce',n);
    commit('reduce',n);
     }, 1000);
   },
   // 测试用户是否在线
   getUser(context) {
    //  console.log("aaa")
    const url = "https://elm.cangdu.org/v1/user";
    axios({
      method: "get",
      url: url,
      //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
      withCredentials: true // 默认false
    }).then(res => {
      console.log("tap", res);
      // console.log("tap", context.state.ComloginState);
      if (res.data.username!=undefined) { 
      }
    });
  },
   // 用户退出方法
   outUser(context) {
    const url = "https://elm.cangdu.org/v2/signout";
    axios({
      method: "get",
      url: url,
      //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
      withCredentials: true // 默认false
    }).then(res => {
      console.log("tap", res);
      console.log(res.data.status)
      if (res.data.status==1) { 
        context.state.ComloginState = "0"
      }
    });
  },
  
}