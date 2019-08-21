//引入vue
import Vue from "vue";
//引入i18n语言包
import VueI18n from "vue-i18n";
//引入定义好的中英文语言
import messages from "./langs";
import config from '@/config'
let { locale } = config
//在vue中使用i18n
Vue.use(VueI18n);
// 自动根据浏览器系统语言设置语言
const navLang = navigator.language
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang.slice(0,2) : false
let lang = localLang || localRead('local') || 'en'
// 面包屑多国语言全局存储
locale = lang
//初始化设置默认语言
const i18n = new VueI18n({
  locale: locale,
  messages,
  silentTranslationWarn: true
});

export default i18n;