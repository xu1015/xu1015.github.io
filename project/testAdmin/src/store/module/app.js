import {
  getHomeRoute,
  getBreadCrumbList,
  getMenuByRouter
} from '@/libs/util'
// import router from '@/router'
import routers from '@/router/routers'
import config from '@/config'
const { homeName } = config
const state = {
  BreadList: [],
  homeRoute: {},
  locale:'en-US',
}
const mutations = {
  setBreadList (state, route) {
    console.log("store里面mutations的setBreadList方法调用",route)
    state.BreadList = getBreadCrumbList(route, state.homeRoute)
  },
  setHomeRoute (state, routes) {
    state.homeRoute = getHomeRoute(routes, homeName)
  },
  setLocale(state,info){
    state.locale = info
    console.log("全局存储里面的locale",info)
  },
}
const actions = {
  getBreadList({ commit }, { info }) {
    var list = []
    info.forEach(item => {
      if (JSON.stringify(item.meta)!=="{}") {
        list.push(item.meta)
      }
    });
  },
}
const getters = {
  menuList: (state, getters,rootState) => getMenuByRouter(routers,rootState),
}

export default {
  state,
  getters,
  actions,
  mutations
}