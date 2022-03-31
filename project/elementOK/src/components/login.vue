<template>
  <div>
    <div class="a">
      <com-title title="密码登录"></com-title>
      <div class="content">
        <div class="user common">
          <input v-model="username" type="text" placeholder="账号">
        </div>
        <div class="passwd common">
          <input v-model="password" :type="passText" placeholder="密码">
          <span @click="passchange()">
            <el-switch v-model="value1" active-color="#13ce66" inactive-color="gray"></el-switch>
          </span>
        </div>
        <div class="code common">
          <input v-model="codeNumer" type="text" placeholder="验证码">
          <div class="codeimg">
            <img :src="code&&code" alt>
          </div>
          <div class="change">
            <p>看不清</p>
            <p @click="getCode()" class="change_img">换一张</p>
          </div>
        </div>
      </div>
      <p class="tips">温馨提示：未注册过的账号，登录时将自动注册</p>
      <p class="tips">注册过的用户可凭账号密码登录</p>
      <div @click="login()" class="login ">登录</div>
      <p class="reset" @click="goresetPassword()">重置密码？</p>
    </div>
    <message-box :title="showHideInfo" :showHide="showHide" :change="shchange"></message-box>
  </div>
</template>

<script>
// 头部文件
import comTitle from "./common/Component/comTitle";
// 弹框
import messageBox from "./common/Component/messageBox";
export default {
  name: "login",
  components: {
    comTitle,
    messageBox
  },
  data() {
    return {
      // 弹框显示隐藏
      showHide: false,
      // 往弹框传的信息
      showHideInfo: "",
      // 验证码图片
      code: "",
      // 用户名
      username: "",
      // 密码
      password: "",
      // 自己输入的验证码
      codeNumer: "",
      // input输入框
      passText: "password",
      // 开关
      value1: false,
      // 返回回来的用户信息
      user: {},
      //全局登录状态
      userL: false,
      passL: false,
      codeL: false
    };
  },
  created() {
    this.getCode();
  },
  methods: {
    // 框架双向绑定方法
    shchange(val) {
      this.showHide = val;
    },
    // 跳转到重置密码界面
    goresetPassword() {
      this.$router.push({ name: "resetPassword" });
    },
    // 返回上一页
    prev() {
      this.$router.go(-1);
    },
    passchange() {
      if (this.value1 == false) {
        this.passText = "password";
      } else {
        this.passText = "text";
      }
      console.log("aaaa");
    },
    // 获取验证码
    getCode() {
      const url = "https://elm.cangdu.org/v1/captchas";
      this.$http({
        method: "post",
        url: url,
        //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
        withCredentials: true // 默认false
      }).then(res => {
        // console.log("tap", res);
        if (res.data.status == 200) {
        }
        this.code = res.data.code;
      });
    },
    login() {
      var userL = true,
        passL = true,
        codeL = true;
      if (this.username == "") {
        this.showHide = true;
        this.showHideInfo = "请输入用户名";
        console.log("请输入用户名");
        userL = false;
      } else if (this.password == "") {
        this.showHide = true;
        this.showHideInfo = "请输入密码";
        console.log("请输入密码");

        passL = false;
      } else if (this.codeNumer == "") {
        this.showHide = true;
        this.showHideInfo = "请输入验证码";
        codeL = false;
      } else if (userL == true && passL == true && codeL == true) {
        console.log("aaaaa");
        const api = "https://elm.cangdu.org/v2/login";
        this.$http({
          method: "post",
          url: api,
          withCredentials: true, // 默认的
          data: {
            username: this.username,
            password: this.password,
            captcha_code: this.codeNumer
          }
        }).then(res => {
          console.log("++++", res.data);
          if (res.data.message != undefined) {
            this.showHide = true;
            this.showHideInfo = res.data.message;
          } else {
            this.showHide = true;
            this.showHideInfo = "登陆成功";
            this.$store.ComloginState = "200";
            localStorage.ComloginState = "200";
            localStorage.Comloginid = res.data.user_id;
            this.$router.push({
              name: "my",
              // query: res.data,
              params: { pID: res.data }
            });
          }
          //给vuex保存用户信息  编程式路由跳转，跳转页面时,传值
          this.user = res.data;
        });
      }
    }
  }
};
</script>

<style scoped>
input {
  outline: none;
}
.content {
  background-color: #fff;
  margin-top: 0.6rem;
}
.common {
  display: flex;
  justify-content: space-between;
  padding: 0.6rem 0.8rem;
  border-bottom: 1px solid #f1f1f1;
  font-size: 0.7rem;
}
.codeimg {
  width: 3.5rem;
  height: 1.5rem;
  margin-right: 0.2rem;
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
.change_img {
  margin-top: 0.2rem;
  color: #3b95e9;
}
.tips {
  font-size: 0.5rem;
  color: red;
  padding: 0.4rem 0.6rem;
  line-height: 0.5rem;
}
.login {
  margin: 0 0.5rem 1rem;
  font-size: 0.7rem;
  color: #fff;
  background-color: #4cd964;
  padding: 0.5rem 0;
  border: 1px;
  border-radius: 0.15rem;
  text-align: center;
}
.reset {
  float: right;
  font-size: 0.6rem;
  color: #3b95e9;
  margin-right: 0.3rem;
}
</style>
