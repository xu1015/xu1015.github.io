// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// element-ui模块
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'


//store文件夹下的index.js
import store from './store'
// 引入Swiper轮播
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';

// 请求模块
import axios from 'axios'
import VueAxios from 'vue-axios'

// 公用方法/全局变量
import global from './components/common/Method/index'
Vue.prototype.global = global
// 


Vue.use(ElementUI);
Vue.use(VueAxios, axios)
Vue.use(Vuex)



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router,
  components: { App },
  template: '<App/>'
})
