<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      loginInfo:false,
    }
  },
  methods: {
    prev() {
      this.$router.go(-1);
  }
  },
    
};
</script>

<style>
html,body,#app{
  width: 100%;
  background: #F5F5F5;
}
.ellipsis{
      overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
