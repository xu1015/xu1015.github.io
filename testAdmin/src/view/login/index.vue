<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" :title="$t('welcome')" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit" :isyzmTrue="isyzmTrue"></login-form>
          <p class="login-tip" style="font-size: 10px;text-align: center;color: #c3c3c3;">Game Platform</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from './login-form'
export default {
  // 登陆
  name:'login',
  components: {
    LoginForm
  },
  data () {
    return {
      isyzmTrue:false,
    }
  },
  methods: {
    // {username,password,captcha,uuid}
    handleSubmit ({username,password,captcha,uuid}) {
      // let url = Url.loginUrl+`?username=${username}&password=${password}&captcha=${captcha}&uuid=${uuid}`
      // this.axios.post(url).then(res => {
      //   if (res.data.code==600) {
      //     setToken(res.data.token)
          sessionStorage.setItem("userName",username)

            this.$router.push({
              name: "home"
            })

      //   }else{
      //     this.isyzmTrue=!this.isyzmTrue
      //     if (res.data.code==1002) {
      //       // 验证码错误
      //       this.$Message.error("Verification code error");
      //     }else if (res.data.code==1004){
      //       // 账号不存在或密码错误
      //       this.$Message.error("No account or password error");
      //     }else if (res.data.code==1005){
      //       // 账号状态异常
      //       this.$Message.error("Account status abnormal");
      //     }
      //   }
      // }).catch((err)=>{
      //   this.$Message.error("request fail");
      // })
    },
    //用于生成uuid
    S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    },
  },
}
</script>
<style lang="less" scoped>
  @import '../../assets/css/index.less';
</style>
