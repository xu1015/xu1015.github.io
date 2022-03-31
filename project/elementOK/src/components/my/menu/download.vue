<template>
  <div>
    <con-title title="下载"></con-title>
    <div class="container">
      <img src="../img/elem.jpg" alt>
      <p>下载饿了么APP</p>
      <div class="btn" @click="mesbox()">下载</div>
    <message-box :title="showHideInfo" :showHide="showHide" :change="shchange"></message-box>
    </div>
    
  </div>
</template>

<script>
import conTitle from "../conTitle";
// 弹框
import messageBox from "../../common/Component/messageBox";
export default {
  name: "download",
  components: {
    conTitle,
    messageBox
  },
  data() {
    return {
      // 弹框显示隐藏
      showHide: false,
      // 往弹框传的信息
      showHideInfo: "",
    }
  },
  methods: {
    mesbox(){
      this.showHide = true;
      this.showHideInfo= "IOS用户请前往AppStore下载";
    },
    // 框架双向绑定方法
    shchange(val) {
      this.showHide = val;
    },
  },
};
</script>


<style scoped>
.container {
    height: 26.5rem;
    background: #fff;
  text-align: center;
}
img {
  border-radius: 1rem;
  margin-top: 1rem;
}
p {
  margin-top: 0.33rem;
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 1rem;
}
.btn {
  background-color: #4cd964;
  font-size: 0.7rem;
  color: #fff;
  text-align: center;
  margin: 0 0.7rem;
  line-height: 1.8rem;
  border-radius: 0.2rem;
  margin-top: 0.5rem;
}
</style>
