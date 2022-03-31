//更改store中state状态
export default {
    // 通过 store.commit('方法名',附加参数)，
    // 触发increment，会把state状态接收到
    increment (state,a) {
      // 变更状态 state 参数 接收state状态值
      // state.count++
      //或者
      // this.state.count += a
      //对象
      this.state.count += a.age
    },
    clear(){
      this.state.searchHis=[];
    },
    // 不传参数a，则默认值为1
    reduce (state,a=1){
      // 模拟数据请求，假设数据返回需要时间1秒
      //  state.count--;
      //  setTimeout(() => {
         //文档意思：不能同步刷新了
         //测试结果：可以同步刷新
        this.state.count -= a;
      //  }, 1000);
    }
  }