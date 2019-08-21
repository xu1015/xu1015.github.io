<template>
  <div id="app" ref="app" @mousewheel.stop @touchmove.stop >
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      appDiv:null
    }
  },
  mounted() {
    var app = document.getElementById("app")
    console.log("asda",app.style.height)
    // app.style.height = document.body.clientHeight+"px"
    // app.style.overflow = document.body.clientHeight+"px"
    console.log("asda",app.style.height)
    // document.body.clientHeight
    let _this = this;
    this.appDiv = this.$refs.app;
    this.appDiv.addEventListener("touchstart", function() {
    //   // e = window.event || e;
      _this.appDiv.addEventListener("touchmove", function(e) {
        e = window.event || e;
    //     try {
    //       e.stopPropagation(); //非IE浏览器
    //     } catch (e) {
    //       window.event.cancelBubble = true; //IE浏览器
    //     }
        // _this.appDiv.onTouchMove = null;
        // if (e && e.preventDefault) {
        //   e.preventDefault(); //非IE浏览器
        // } else {
        //   window.event.returnValue = false;//IE浏览器
        // } 
      },false);
    },false);
  },
}
</script>

<style>
html,body,#app{
  width: 100%;
  height: 100%;
}
*::-webkit-scrollbar { display: none; }
*{
  margin: 0;
  padding: 0;
}
</style>
