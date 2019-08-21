import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import routes from './routers'
import store from '@/store'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})
const LOGIN_PAGE_NAME = 'login'
// next({name: LOGIN_PAGE_NAME})
// next() // 跳转
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  let username = sessionStorage.getItem('userName')
  if(username==''&&to.name!=LOGIN_PAGE_NAME) {
    // 账户未登录 跳转页面不是登录页面
    next({name:LOGIN_PAGE_NAME})
  }else if(username==null&&to.name!=LOGIN_PAGE_NAME) {
    // 账户未登录 跳转页面不是登录页面
    next({name:LOGIN_PAGE_NAME})
  }else if(username!=null&&username!=''&&to.name==LOGIN_PAGE_NAME) {
    // 账户已经登陆 跳转页面是登录页面
    next({name:"home"})
  }else{
    // 账户已经登陆 跳转页面不是登录页面
    next()
  }
  // console.log("准备重定向",to)
  // next()
  // const token = getToken()
})

router.afterEach(to => {
  iView.LoadingBar.finish()
  // 面包屑根路径防刷新
  store.commit('setHomeRoute',routes)
  // console.log("重定向结束",to)
})
export default router