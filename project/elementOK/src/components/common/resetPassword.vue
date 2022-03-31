<template>
  <div>
    <com-title title="重置密码"></com-title>
    <div class="resetform">
      <div class="input-container">
        <input type="text" placeholder="账号" v-model="username">
      </div>
      <div class="input-container">
        <input type="text" placeholder="旧密码" v-model="oldpassword">
      </div>
      <div class="input-container">
        <input type="text" placeholder="请输入新密码" v-model="newpassword">
      </div>
      <div class="input-container">
        <input type="text" placeholder="请确认密码" v-model="confirmnewpassword">
      </div>
      <div class="input-container">
        <input type="text" placeholder="验证码" v-model="codeNumer">
        <div class="code_img">
          <img :src="code&&code" alt>
          <div class="change_img">
            <p>看不清</p>
            <p @click="getCode()">换一张</p>
          </div>
        </div>
      </div>
    </div>
    <div class="btn" @click="setpass()">确认修改</div>
    <message-box :title="showHideInfo" :showHide="showHide" :change="shchange"></message-box>
  </div>
</template>
<script>
// title
import comTitle from "./Component/comTitle";
// 弹框部分
import messageBox from './Component/messageBox'
export default {
  name: "resetPassword",
  components: {
    comTitle,
    messageBox
  },
  data() {
    return {
      // 弹框状态
      showHide:false,
      // 往弹框传的值
      showHideInfo:"",
      // 验证码图片
      code: "",
      // 用户名
      username:"",
      // 旧密码
      oldpassword:"",
      // 新密码
      newpassword:"",
      // 再次输入的新密码
      confirmnewpassword:"",
      // 自己输入的验证码
      codeNumer: "",
    }
  },
  created() {
    this.getCode();
  },
  methods: {
    // 框架双向绑定方法
    shchange(val) {
      this.showHide = val;
    },
    // 修改密码方法
    setpass() {
      var userL = true,
        oldpassL = true,
        newpassL = true,
        connewpassL = true,
        codeL = true;
      if (this.username == "") {
        userL = false;

        this.showHide=true;
        this.showHideInfo="请输入正确的用户名";
      } else if(this.oldpassword == "") {
        oldpassL = false;

        this.showHide=true;
        this.showHideInfo="请输入旧密码";
      } else if (this.newpassword == "") {
        newpassL = false;

        this.showHide=true;
        this.showHideInfo="请输入新密码";
      } else if (this.confirmnewpassword == "") {
        connewpassL = false;

        this.showHide=true;
        this.showHideInfo="请输确认密码";
      } else if (this.codeNumer == "") {
        codeL = false;

        this.showHide=true;
        this.showHideInfo="请输入正确的验证码";
      } else{
        const url = "https://elm.cangdu.org/v2/changepassword";
        this.$http({
          method: "post",
          url: url,
          data: {
            username: this.username,
            oldpassWord: this.oldpassword,
            newpassword: this.newpassword,
            confirmpassword: this.confirmnewpassword,
            captcha_code: this.codeNumer,
          },
          //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
          withCredentials: true // 默认false
        }).then(res => {
          if (res.data.message != undefined) {
            this.showHide = true;
            this.showHideInfo = res.data.message;
          } else {
            this.showHide = true;
            this.showHideInfo = "密码修改成功";
            this.$store.ComloginState = "200";
            this.$router.push({
              name: "my"
            });
          }
        });
      }
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
  },
  
};
</script>
<style scoped>
.resetform {
  background-color: #fff;
  margin-top: 0.6rem;
}
.input-container {
  padding: 0.3rem 0.8rem;
  display: flex;
  justify-content: space-between;
  padding: 0.6rem 0.8rem;
  border-bottom: 1px solid #f1f1f1;
}
.input-container input {
  font-size: 0.7rem;
  color: #666;
}
.btn {
  margin: 1rem 0.5rem;
  font-size: 0.7rem;
  color: #fff;
  background-color: #4cd964;
  padding: 0.5rem 0;
  border: 1px;
  border-radius: 0.15rem;
  text-align: center;
  line-height: 19px;
}
.change_img p{
    font-size: .55rem;
    color: #666;
}
.change_img p:nth-child(2){
    color: #3b95e9;
    margin-top: .2rem;
}
.code_img{
    display: flex;
    align-items: center;
}

</style>


