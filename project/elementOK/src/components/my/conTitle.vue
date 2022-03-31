<template>
  <div class="hello">
    <div class="title">
      <strong>
        <i @click="prev()" class="el-icon-arrow-left"></i>
      </strong>
      <span>{{title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    prev() {
      this.$router.go(-1);
    },
   
  }, 
  props:['title']
};
</script>

<style scoped>
/* 全局设置 */

/* 头部title */
.title {
  height: 1.95rem;
  background: #3190e8;
  line-height: 1.95rem;
  color: white;
  position: relative;
  text-align: center;
}
.title strong i {
  font-size: 1rem;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: .4rem;
  margin-top: -.5rem;
}
.title span {
  display: inline-block;
  font-size: .8rem;
  font-weight: 700;
  margin-top: .15rem;
}
.title a {
  display: inline-block;
  color: white;
  font-size: .6rem;
  position: absolute;
  right: .4rem;
}
</style>
