<template>
  <div>
    <con-title title="修改用户名"></con-title>
    <div class="setname">
      <input
        type="text"
        placeholder="输入用户名"
        :class="info.length>=5&&info.length<=24?'inp':'inp1'"
        v-model="info"
      >
      <p class="mention" v-if="info.length>=5&&info.length<=24">用户名只能修改一次(5-24字符之间)</p>
      <p class="mention1" v-else>用户名长度在5到24之间</p>
      <button :class="info.length>=5&&info.length<=24?'btn1':'btn'">确认修改</button>
    </div>
  </div>
</template>
<script>
//  var Name = document.getElementsByTagName("input").value;
var Note = document.getElementsByClassName("mention");
var Btn = document.getElementsByTagName("button");

import conTitle from "../conTitle";
export default {
  name: "rename",
  components: {
    conTitle
  },
  data() {
    return {
      info: "",
      note: false
    };
  }
};
</script>
<style scoped>
.setname {
  width: 15.2rem;
  margin: 0 auto;
  padding-top: 0.4rem;
}
.inp {
  background: none;
  width: 15.2rem;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0.2rem 0.1rem;
  line-height: 1.2rem;
  font-size: 0.7rem;
  display: block;
  box-sizing: border-box;
}
.inp1 {
  background: none;
  width: 15.2rem;
  border: 1px solid #ea3106;
  border-radius: 2px;
  padding: 0.2rem 0.1rem;
  line-height: 1.2rem;
  font-size: 0.7rem;
  display: block;
  box-sizing: border-box;
}
.mention {
  width: 100%;
  font-size: 0.4rem;
  color: #666;
  padding: 0.4rem 0 1rem;
}
.mention1 {
  width: 100%;
  font-size: 0.58rem;
  color: #ea3106;
  padding-top: 0.1rem;
  padding-bottom: 1rem;
}

.btn {
  display: block;
  width: 100%;
  line-height: 2rem;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.6);
  background: #3199e8;
  border: 0;
  /* transition: all 1s; */
}
.btn1 {
  display: block;
  width: 100%;
  line-height: 2rem;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 1);
  /* opacity: .6; */
  background: #3199e8;
  border: 0;
  /* transition: all 1s; */
}
input {
  outline: none;
  -webkit-appearance: none;
  border-radius: 0;
}
</style>

