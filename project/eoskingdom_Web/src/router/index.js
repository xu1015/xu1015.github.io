import Vue from 'vue'
import Router from 'vue-router'
//手机端
import phoneIndex from '@/components/phone/phoneIndex.vue'
// 分红池界面
import share_out from '@/components/page/share_out.vue'
// dice页面
import dice from '@/components/page/dice.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dice',
      component: resolve=>require(["@/components/page/dice"],resolve),
      // component: dice
    },
    //手机端
    {
      path: '/m_index',
      name: 'phoneIndex',
      component: resolve=>require(["@/components/phone/phoneIndex"],resolve),
      // component: phoneIndex
    },
    {
      path: '/share_out',
      name: 'share_out',
      component: resolve=>require(["@/components/page/share_out"],resolve),
      // component: share_out
    },
    {
      path: '/slot',
      name: 'dice',
      component: resolve=>require(["@/components/page/dice"],resolve),
      // component: dice
    },
  ]
})
