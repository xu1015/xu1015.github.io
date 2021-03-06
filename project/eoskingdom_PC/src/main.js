// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import '../src/assets/css/common.css'
import Chinese from '../src/assets/js/Chinese.js'
import English from '../src/assets/js/english.js'
import Korean from '../src/assets/js/Korean.js'
import axios from 'axios'
import {Alert,Message,MessageBox} from 'element-ui'
import {Table,Page,Modal,Layout,Menu,MenuItem,BackTop,Row,Col} from 'iview'
// import iview from 'iview'
import 'iview/dist/styles/iview.css'
import VueI18n from 'vue-i18n'
import vuescroll from 'vuescroll'
import 'vuescroll/dist/vuescroll.css'
// import VueResource from 'vue-resource'
// Vue.use(VueResource);
Vue.use(vuescroll)

Vue.prototype.$ajax = axios;
// iview按需导入
Vue.component('Table', Table);
Vue.component('Page', Page);
Vue.component('Modal', Modal);
Vue.component('Layout', Layout);
Vue.component('Menu', Menu);
Vue.component('MenuItem', MenuItem);
Vue.component('BackTop', BackTop);
Vue.component('i-Row', Row);
Vue.component('Row', Row);
Vue.component('i-Col', Col);
Vue.component('Col', Col);

// elementUI按需导入
Vue.use(Alert);
Vue.prototype.$alert = MessageBox.alert;
Vue.component(Message)
Vue.prototype.$message = Message;
// 国际化
Vue.use(VueI18n)
const i18n = new VueI18n({
 locale: 'zh', // 默认语言
 messages: {
  'zh': Chinese,
  'en': English,
  'korean': Korean
 }
})
// Vue.config.silent = true;
// Vue.config.devtools = false;
// console.log("Vue的配置",Vue.config)
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
