import Cookies from 'js-cookie'
// cookie保存的天数
import config from '@/config'
import { forEach, hasOneOf, objEqual } from '@/libs/tools'
const { title, cookieExpires, useI18n } = config

export const TOKEN_KEY = 'token'

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: cookieExpires || 1 })
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}
export const hasChild = (item) => {
  return item.children && item.children.length !== 0
}
/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = (routers, homeName = 'home') => {
  let i = -1
  let len = routers.length
  let homeRoute = {}
  while (++i < len) {
    let item = routers[i]
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children, homeName)
      if (res.name) return res
    } else {
      if (item.name === homeName) homeRoute = item
    }
  }
  // console.log("查看传递过来的路由",homeRoute)
  return homeRoute
}

/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list,rootState) => {
  let res = []
  console.log("查看路由列表以便得到菜单列表",list)
  console.log("有没有用有没有用有没有用",rootState)
  forEach(list, item => {
    console.log("查看路由列表以便得到菜单列表里面的单个菜单",item)
    if (item.meta || (item.meta && !item.meta.hideInMenu)) {
      let obj = {
        // icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta
      }     
      console.log("含有meta字段",obj)                                                //&& showThisMenuEle(item, access)
      if ((hasChild(item) || (item.meta && item.meta.showAlways)) ) {
        obj.children = getMenuByRouter(item.children)
      }
      // if (item.meta && item.meta.href) obj.href = item.meta.href
      // if (showThisMenuEle(item, access)) 
      res.push(obj)
    }
  })
  return res
}

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = (route, homeRoute) => {
  // console.log("查看数据1",route)
  let homeItem = { ...homeRoute, }
  // console.log("查看数据2",homeRoute)
  // console.log("查看数据2.1",homeItem)
  let routeMetched = route.matched
  // console.log("查看数据3",routeMetched)
  if (routeMetched.some(item => item.name === homeRoute.name)) return [homeItem]
  let res = routeMetched.filter(item => {
    return item.meta === undefined || !item.meta.hideInBread
  }).map(item => {
    let meta = { ...item.meta }
    if (meta.title && typeof meta.title === 'function') {
      meta.__titleIsFunction__ = true
      meta.title = meta.title(route)
    }
    let obj = {
      icon: (item.meta && item.meta.icon) || '',
      name: item.name,
      meta: meta
    }
    return obj
  })
  res = res.filter(item => {
    return !item.meta.hideInMenu
  })
  return [{ ...homeItem, to: homeRoute.path }, ...res]
}