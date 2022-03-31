import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/view/home')
    },
    {
      path: '/rotate',
      name: 'rotate',
      component: () => import('@/view/rotate')
    },

  ]
})
