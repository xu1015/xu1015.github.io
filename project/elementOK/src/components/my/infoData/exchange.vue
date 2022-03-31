<template>
  <div>
    <con-title title="兑换红包"></con-title>
    <div class="content">
      <input v-model="inp" type="text" placeholder="请输入兑换码" class="inp1">
      <section>
        <div class="code">
          <input v-model="cdnb" type="text" placeholder="  验证码">
          <div class="con">
            <div class="codeimg">
              <img :src="code&&code" alt>
            </div>
            <div class="change">
              <p>看不清</p>
              <p @click="getCode()" class="change_img">换一张</p>
            </div>
          </div>
        </div>
        <div class="btn" :id="first==true&&second==true?'green':''" @click="submit()">兑换</div>
        <message-box :title="showHideInfo" :showHide="showHide" :change="shchange"></message-box>
      </section>
    </div>
  </div>
</template>

<script>
import conTitle from "../conTitle";
import messageBox from "../../common/Component/messageBox";
export default {
  name: "exchange",
  components: {
    conTitle,
    messageBox
  },
  data() {
    return {
      code: "",
      inp: "",
      cdnb: "",
      first: false,
      second: false,
      // 弹框显示隐藏
      showHide: false,
      // 往弹框传的信息
      showHideInfo: ""
    };
  },
  created() {
    this.getCode();
  },
  methods: {
    // 获取验证码
    getCode() {
      const url = "https://elm.cangdu.org/v1/captchas";
      this.$http({
        method: "post",
        url: url,
        withCredentials: true // 默认false
      }).then(res => {
        this.code = res.data.code;
      });
    },
    submit() {
      this.showHide = true;
      this.showHideInfo = "无效的兑换码";
    },
    // 框架双向绑定方法
    shchange(val) {
      this.showHide = val;
    }
  },
  watch: {
    inp(New) {
      if (New.length >= 5) {
        this.first = true;
        console.log("first:", this.first);
      }else{
        this.first=false;
      }
    },
    cdnb(New) {
      if (New.length == 4) {
        this.second = true;
        console.log("second:", this.second);
      }else{
        this.second=false;
      }
    }
  }
};
</script>

<style scoped>
.content {
  width: 100%;
  margin-top: 0.7rem;
}
.inp1 {
  width: 88%;
  margin-left: 0.5rem;
  margin-bottom: 0.7rem;
  font-size: 0.7rem;
  color: #666;
  padding: 0.6rem 0.4rem;
  border-radius: 0.15rem;
  outline: none;
}
.code {
  display: flex;
  margin-left: 0.5rem;
}
.code input {
  width: 52%;
  font-size: 0.7rem;
  outline: none;
  margin-right: 0.5rem;
}
.con {
  display: flex;
  background: #fff;
  padding: 0.6rem 0.4rem;
  border-radius: 0.15rem;
}
.codeimg {
  width: 3.5rem;
  height: 0.8rem;
}
.change {
  display: flex;
  flex-direction: "column";
  flex-wrap: wrap;
  width: 2rem;
  justify-content: center;
  font-size: 0.55rem;
  color: rgb(109, 108, 108);
}
.change p {
  margin-right: 0.2rem;
}
.change_img {
  margin-top: 0.2rem;
  margin-right: 0.2rem;
  color: #3b95e9;
}
.btn {
  background-color: #ccc;
  font-size: 0.7rem;
  color: #fff;
  text-align: center;
  margin: 0 0.7rem;
  line-height: 1.8rem;
  border-radius: 0.2rem;
  margin-top: 0.7rem;
}
#green {
  background-color: #4cd964;
}
</style>
