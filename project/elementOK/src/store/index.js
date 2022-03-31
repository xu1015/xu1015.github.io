import Vue from 'vue'
//导入vuex模块
import Vuex from 'vuex'
//导入状态state.js模块
// import router from './router'

import state from './state' 
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)
//配置vuex  store 存储器用于存储组件之间共享的数据
const store = new Vuex.Store({
    // 共享的状态：提供属性值 类似于组件中的data
    state,
    // getters类似于组件中的computed计算属性，依赖于
    // state，只有当它的依赖值发生了改变才会被重新计算。
    getters,
    // 修改状态的方法，类似于组件中的methods
    // mutations只能做同步操作  actions：可以做异步操作
    mutations,
  // Action 类似于 mutation，不同在于：
  // Action 提交的是 mutation，而不是直接变更状态。
  // Action 可以包含任意异步操作。
    actions
  })


  //导出存储对象store，给main.js使用
  export default store;