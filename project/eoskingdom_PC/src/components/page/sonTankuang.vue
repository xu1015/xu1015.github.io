<template>
  <div v-if="showHideMB" class="sonMask">
    <section class="tip_text_container" :style="makeSure==null||makeSure==undefined||makeSure==''?'':'border-color:'+blue">
      <div class="closeMask" v-if="makeSure!=null"><img @click="change(false)" v-if="makeSure!=null||makeSure!=undefined||makeSure!=''" src="@/assets/images/dice/guanbi01.png" class="closeMaskImg" alt=""></div>
      <p class="tip_text" v-if="title!=null||title!=undefined&&title!=''"><span>{{title}}</span></p>
      <p class="tip_text1" v-if="content!=null||content!=undefined&&content!=''">{{content}}</p>
      <span @click="change(false)" class="confrim" v-if="makeSure==null||makeSure==undefined||makeSure==''">OK</span>
      <span @click="change(false)" class="confrim bigConfire" v-else><a href="https://get-scatter.com/download" target="_blank" rel="noopener noreferrer">{{makeSure}}</a></span>
    </section>
  </div>
</template>

<script>
export default {
  // title是要传的信息,showHid是显示和隐藏,change方法是用来双向绑定的
  props: ["title", "showHide", "change","content","makeSure"],
  data() {
    return {
      //条件固定值
      showHideMB: this.showHide,
      blue:'#00ffff',
    };
  },
  watch: {
    showHide(val) {
      this.showHideMB = val; //新增showHide的watch，监听变更并同步到showHideMB上
    },
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
.sonMask{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom:0;
  background: rgba(0,0,0,.8);
  z-index: 10010!important;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Microsoft YaHei";
}
.sonMask .tip_text_container {
  animation: tipMove 0.4s;
  background-color: #1A2229;
  padding: 0 6rem;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  /* text-align: center; */
  flex-direction: column;
  z-index: 1111;
  border: 3px solid #E65545;
  position: relative;
}
.sonMask .closeMask{
  height: 20px;
}
.sonMask .closeMaskImg{
  width: 40px;
  position: absolute;
  top: 2px;
  right: 1px;
}
.sonMask .tip_text {
  width: 100%;
  line-height: 2rem;
  font-size: 1.4rem;
  color: #E2FAFF;
  text-align: left;
  display: flex;
  align-items: center;
}
.sonMask .tip_text1{
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
  font-weight: 700;
  color: #E2FAFF;
  padding: 1rem 1rem 0.5rem;
}
.sonMask .tip_text span{
  width: 100%;
  display: block;
  text-align: center;
}
.sonMask .tip_text_container .confrim {
  width: 4.5rem;
  height: 45px;
  padding-top: 7px;
  font-weight: 700;
  background: url("../../assets/images/dice/check.png")no-repeat;
  background-size: contain;
  background-position-y: 5px;
  color: #E2FAFF;
  font-size: 1rem;
  text-align: center;
  text-align: center;
  line-height: 1.7rem;
  border: 1px;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  overflow: hidden;
}
.sonMask .bigConfire{
  width: 6rem!important;
  padding-top: 9px!important;
  margin: 5px 0;
}
.sonMask .tip_text_container .confrim a{
  display: inline-block;
  border-radius: 1rem;
  color: #E2FAFF;
}
</style>
