<template>
  <div v-if="showHideMB" class="sonMask" @click.stop="change(false)">
    <section class="tip_text_container" @click.stop="change(false)" style="max-width:95%" :style="makeSure==null?'':'border-color:'+blue">
      <!-- <div class="closeMask" v-if="makeSure!=null"><img @click="change(false)" v-if="makeSure!=null" src="@/assets/images/dice/guanbi01.png" class="closeMaskImg" alt=""></div> -->
      <p class="tip_text" v-if="title!=null||title!=undefined&&title!=''"><span>{{title}}</span></p>
      <p class="tip_text1" v-if="content!=null||content!=undefined&&content!=''">{{content}}</p>
      <span @click="change(false)" class="confrim" v-if="makeSure==null">OK</span>
      <div class="walletDiv" v-if="makeSure!=null">
        <div style="display:inline-block;width:47.5%;">
          <p>麦子钱包</p><span @click="change(false)" class="confrim" ><a href="http://mathwallet.org" target="_blank" rel="noopener noreferrer">mathwallet.org</a></span>
        </div>
        <div style="display:inline-block;width:47.5%;margin-left:5%;">
          <p>TP钱包</p><span @click="change(false)" class="confrim" ><a href="https://www.tokenpocket.pro/" target="_blank" rel="noopener noreferrer">tokenpocket.pro</a></span>
        </div>
      </div>
      <div class="walletDiv"></div>
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
  /* width: 20%; */
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
  border: 1.5px solid #E65545;
  position: relative;
}
.sonMask .closeMask{
  height: 1.2rem;
}
.sonMask .closeMaskImg{
  width: 2.5rem;
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
}
.sonMask .tip_text {
  width: 100%;
  font-size: 1.4rem;
  text-align: center;
  font-weight: 700;
  color: #E2FAFF;
  padding: 1rem 0 1rem;
}
.sonMask .tip_text1{
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
  font-weight: 700;
  color: #E2FAFF;
  padding: 1rem 0 0.5rem;
}
.sonMask .tip_text span{
  width: 100%;
  display: block;
  text-align: center;
}
.sonMask .tip_text_container .confrim {
  width: 4.5rem;
  height: 2rem;
  line-height: 1.75rem;
  font-weight: 700;
  background: url("../../assets/images/dice/check.png")no-repeat;
  background-size: contain;
  color: #fff;
  font-size: 1rem;
  text-align: center;
  text-align: center;
  border: 1px;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}
.sonMask .bigConfire{
  width: 5rem!important;
  margin: 5px 0;
}
.sonMask .tip_text_container .confrim a{
  width: 4.5rem;
  height: 2rem;
  display: inline-block;
  border-radius: 1rem;
  color: #E2FAFF;
  margin-top: -1px;
}
.sonMask .walletDiv{
  width: 120%;
  font-size: 0;
  font-weight: 700;
  margin: 0.4rem 0 0 0;
  color: #E2FAFF;
  text-align: center;
  vertical-align: middle;
}
.sonMask .walletDiv p:first-child{
  text-align: center;
  font-size: 1rem;
  vertical-align: middle;
  
}
.sonMask .walletDiv span{
  vertical-align: middle;
}
.sonMask .walletDiv .confrim{
  width: 4.5rem;
  display: inline-block;
  margin-left: 0.5rem;
  font-size: 0.8rem;
  color-adjust: #B2B2B2!important;
  background: transparent;
}
.sonMask .walletDiv .confrim a{
  width: 4.5rem;
  display: inline-block;
  font-size: 0.8rem;
  text-decoration: underline;
  color: #B2B2B2!important;
  background: transparent;
}
</style>
