<template>
  <div>
    <div class="content">
      <h3>请重新进入</h3>
      <p>请返回后重新进入积分商城~</p>
      <img src="../img/retrylogin.png" alt>
    </div>
  </div>
</template>
<script>
export default {
  name: "try"
};
</script>

<style scoped>
.content {
  text-align: center;
  overflow: hidden;
  position: absolute;
  top: 9rem;
  left: 4rem;
}
h3 {
  font-weight: bold;
  font-size: 26px;
  color: #0d7fd5;
  margin-bottom: 15px;
}
p {
  font-size: 14px;
  color: #666;
  margin-bottom: 19px;
}
.content img {
  width: 7.7rem;
}
</style>
