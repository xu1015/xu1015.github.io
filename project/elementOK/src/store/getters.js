// 类似于计算属性
export default {
    //  筛选vip用户 state状态接收到
    vipTodos (state){
      //  return state.todos.filter(function(todo){
      //   return todo.vip;
      //  });
      //或者箭头函数
      return state.todos.filter(
        todo=>todo.vip
       );
    }
  }