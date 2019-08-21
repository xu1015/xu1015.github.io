// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n'
import zhCnLocale from './assets/js/zh-CN'
import enUsLocale from './assets/js/en-US'
// import zhTwLocale from 'iview/src/locale/lang/zh-TW'
Vue.use(iView);
Vue.prototype.axios = axios
Vue.config.productionTip = false

// 自动根据浏览器系统语言设置语言
const navLang = navigator.language
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false
// let lang = localLang || localRead('local') || 'zh-CN'
let lang ='en-US'
Vue.use(VueI18n)
const i18n = new VueI18n({
 locale: lang, // 默认语言
 messages: {
  'zh-CN': zhCnLocale,   // 中文语言包
  'en-US': enUsLocale   // 英文语言包
 }
})

export default i18n


new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
