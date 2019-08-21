import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index.vue'
import whitebook from '@/components/whitebook.vue'
import supplierAllBack from '@/components/supplierAllBack.vue'
// 分红池界面
import share_out from '@/components/share_out.vue'
import exchange from '@/components/exchange.vue'
// dice界面
import dice from '@/components/dice.vue'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'dice',
      component:() => import('@/components/dice')
    },
    {
      path: '/index',
      name: 'index',
      component:() => import('@/components/index')
    },
    {
      path: '/share_out',
      name: 'share_out',
      component:() => import('@/components/share_out')
    },
    {
      path: '/whitebook',
      name: 'whitebook',
      component: whitebook
    },
    {
      path: '/supplierAllBack',
      name: 'supplierAllBack',
      component:() => import('@/components/supplierAllBack')
    },
    {
      path: '/slot',
      name: 'dice',
      component:() => import('@/components/dice')
    },
    {
      path: '/exchange',
      name: 'exchange',
      component:() => import('@/components/exchange')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log('即将进入--', to.name)
  // console.log("to.name",to.name)
  if (to.name=='share_out') {
    // console.log("满足条件");
    next()
  } else {
    // console.log("不满足条件");
    next()
  }
})


export default router
