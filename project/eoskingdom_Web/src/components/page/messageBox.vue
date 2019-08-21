<template>
  <section v-if="showHideMB" class="tip_text_container">
    <p class="tip_text"><span>{{title}}</span></p>
    <p class="tip_text1">{{content}}</p>
    <div @click="change(false)" class="confrim">OK</div>
  </section>
</template>

<script>
export default {
  // title是要传的信息,showHid是显示和隐藏,change方法是用来双向绑定的
  props: ["title", "showHide", "change","content"],
  data() {
    return {
      //条件固定值
      showHideMB: this.showHide
    };
  },
  watch: {
    showHide(val) {
      this.showHideMB = val; //新增showHide的watch，监听变更并同步到showHideMB上
    }
  },
  methods: {
    //将下面的方法放入需要使用该组件的父组件
    // 框架双向绑定方法
    // shchange(val) {
    //   this.showHide = val;
    // },
  },
};
</script>

<style scoped>
@keyframes tipMove {
  0% {
    transform: scale(1);
  }
  35% {
    transform: scale(0.8);
  }
  70% {
    transform: scale(1.1);
  }
  to {
    transform: scale(1);
  }
}
/* 弹框样式 */
.tip_text_container {
  position: fixed;
  top: 50%;
  left: 50%;
  /* margin-top: -45%; */
  margin-left: -40%;
  width: 80%;
  animation: tipMove 0.4s;
  background-color: #fff;
  /* padding-top: 1rem; */
  border: 1px;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1111;
}
.tip_text {
  width: 100%;
  /* height: 8rem; */
  font-size: 1.4rem;
  color: #333;
  text-align: left;
  text-indent: 2.8rem;
  padding: 1rem 1rem 0;
  display: flex;
  align-items: center;
}
.tip_text1{
  width: 100%;
  font-size: 1.2rem;
  text-align: right;
  padding: 1rem
}
.tip_text span{
  width: 100%;
  display: block;
  margin: 0 auto;
}
.tip_text_container .confrim {
  font-size: 1.4rem;
  color: #fff;
  font-weight: 700;
  /* margin-top: 1rem; */
  background-color: #4cd964;
  width: 100%;
  height: 3rem;
  text-align: center;
  line-height: 3rem;
  border: 1px;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}
</style>
