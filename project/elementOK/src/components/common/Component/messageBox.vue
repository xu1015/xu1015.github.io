<template>
  <section v-if="showHideMB" class="tip_text_container">
    <div class="tip_icon">
      <span></span>
      <span></span>
    </div>
    <p class="tip_text">{{title}}</p>
    <div @click="change(false)" class="confrim">确认</div>
  </section>
</template>

<script>
export default {
  props: ["title", "showHide", "change"],
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
    shchange(val) {
      this.showHide = val;
    },
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
  margin-top: -6rem;
  margin-left: -6rem;
  width: 12rem;
  animation: tipMove 0.4s;
  background-color: #fff;
  padding-top: 0.6rem;
  border: 1px;
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1111;
}
.tip_icon {
  width: 3rem;
  height: 3rem;
  border: 0.15rem solid #f8cb86;
  border-radius: 50%;
}
.tip_icon span:first-of-type {
  width: 0.12rem;
  height: 1.5rem;
  background-color: #f8cb86;
  z-index: 1000;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -3rem;
  margin-left: -0.06rem;
}
.tip_icon span:nth-of-type(2) {
  width: 0.2rem;
  height: 0.2rem;
  border: 1px;
  border-radius: 50%;
  margin-top: 0.2rem;
  background-color: #f8cb86;

  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -1rem;
  margin-left: -0.1rem;
}
.tip_text {
  font-size: 0.7rem;
  color: #333;
  line-height: 0.9rem;
  text-align: center;
  margin-top: 0.8rem;
  padding: 0 0.4rem;
}
.tip_text_container .confrim {
  font-size: 0.8rem;
  color: #fff;
  font-weight: 700;
  margin-top: 0.8rem;
  background-color: #4cd964;
  width: 100%;
  text-align: center;
  line-height: 1.8rem;
  border: 1px;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
</style>
