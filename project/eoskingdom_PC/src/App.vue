<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  // 引入音频文件
export default {
  name: 'App'
}


</script>

<style>
  @font-face{
    font-family: 'fz';
    src: url('./assets/font/方正锐正圆字体.TTF');
  }
  @font-face{
    font-family: 'hw';
    src: url('./assets/font/NanumBarunGothic.ttf');
  }
  @font-face {
    font-family: 'xx';   /*字体名称*/
    src:url('./assets/font/SDSWAGGERTTF.TTF')     /*字体源文件*/
  }
 #app {
   min-width: 960px;
   width: 100%;
   font-family: fz;
 }
 div{
  -moz-user-select:none;/*火狐*/
  -webkit-user-select:none;/*webkit浏览器*/
  -ms-user-select:none;/*IE10*/
  -khtml-user-select:none;/*早期浏览器*/
    user-select:none;
}
.ivu-modal{
  top: unset;
}
</style>
