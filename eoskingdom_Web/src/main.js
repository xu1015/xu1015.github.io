// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import '../src/assets/css/common.css'
import Chinese from '../src/assets/js/Chinese'
import English from '../src/assets/js/english'
import Korean from '../src/assets/js/Korean'
import VueI18n from 'vue-i18n'
import axios from 'axios'
import {Alert,Message,MessageBox} from 'element-ui'
import {Table,Page} from 'iview';
import 'iview/dist/styles/iview.css';
import Clipboard from 'clipboard';

Vue.use(VueI18n);
// iview按需导入
Vue.component('Table', Table);
Vue.component('Page', Page);
// elementUI按需导入
Vue.use(Alert);
Vue.component(Message)
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;

const i18n = new VueI18n({
 locale: 'zh', // 默认语言
 messages: {
  'zh': Chinese,
  'en': English,
  'korean': Korean
 }
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
