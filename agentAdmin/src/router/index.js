import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import login from '@/components/index'
import {setToken,getToken,getAgentInfo} from "@/assets/js/baseMethods";
// import { setToken, getToken, canTurnTo, setTitle } from '@/libs/util'


Vue.use(Router)
const router = new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/components/index')
    },
    {
      path: '/home',
      name: 'home',
      redirect:'/home/myagent',
      component: () => import('@/components/home'),
      children:[
        {
          path: '/home/myagent',
          name: 'myAgent',
          redirect:'/home/myagent/monthBill',
          component: () => import('@/components/page/myagent'),
          children:[
            {
              path: '/home/myagent/monthBill',
              name: 'monthBill',
              component: () => import('@/components/page/monthBill'),
            },
            {
              path: '/home/myagent/yearBill',
              name: 'yearBill',
              component: () => import('@/components/page/yearBill'),
            }
          ]
        },
        {
          path: '/home/cashOutRecord',
          name: 'cashOutRecord',
          component: () => import('@/components/page/cashoutrecord')
        },
        {
          path: '/home/myMemvership',
          name: 'myMemvership',
          component: () => import('@/components/page/mymembership')
        },
      ]
    }
  ]
})

const LOGIN_PAGE_NAME = 'login'
const homeName = 'home'

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  const loginState = sessionStorage.getItem("agentName")==null||sessionStorage.getItem("agentName")=='';
  if (token==false &&loginState==true&& to.name !== LOGIN_PAGE_NAME) {
    //未登录且没有登录状态且要跳转的页面不是登录页
    next({name: LOGIN_PAGE_NAME})// 跳转到
  } else if (token==false &&!loginState==false&& to.name !== LOGIN_PAGE_NAME) {
    //未登陆且有登录状态且要跳转的页面不是登录页
    next({name: LOGIN_PAGE_NAME}) // 跳转到登录页
  } else if (token &&loginState==true&& to.name !== LOGIN_PAGE_NAME) {
    //已登录且没有登录状态且要跳转的页面不是登录页
    next({name: LOGIN_PAGE_NAME})// 跳转到LOGIN_PAGE_NAME页
  } else if (token &&loginState==false&& to.name === LOGIN_PAGE_NAME) {
    //已登录且有登录状态且要跳转的页面是登录页
    next({name: homeName})// 跳转到LOGIN_PAGE_NAME页
  } else if (token &&!loginState&& to.name !== LOGIN_PAGE_NAME) {
    //已登录且有登录状态且要跳转的页面不是登录页
    next()
  }else{
    // 未登录
    next() // 跳转
  }
})

router.afterEach(to => {
  iView.LoadingBar.finish()
})

export default router
