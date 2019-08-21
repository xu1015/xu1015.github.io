<template>
  <Form ref="loginForm" :model="sysLogin" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="username">
      <i-Input v-model="sysLogin.username" :placeholder="$t('inputUser')">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </i-Input>
    </FormItem>
    <FormItem prop="password">
      <i-Input type="password" v-model="sysLogin.password" :placeholder="$t('inputPassword')">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </i-Input>
    </FormItem>
    <FormItem prop="captcha">
      <i-Input style="width: 60%;float: left" v-model="sysLogin.captcha" :placeholder="$t('inputCaptcha')">
      <span slot="prepend">
        <Icon :size="14" type="ios-key"></Icon>
      </span>
      </i-Input>
      <img style="width:90px;height:32px;margin-left: 10px;" class="login-captcha" :src="yzm_message" v-on:click="change_yzm_message">
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long style="">{{$t('login')}}</Button>
    </FormItem>
  </Form>
</template>
<script>
import baseInfo from "@/assets/js/baseInfo";
import Url from "@/assets/js/configUrl";
export default {
  name: 'LoginForm',
  props:{
    isyzmTrue:{
      type:Boolean,
      default:false
    }
  },
  data () {
    const validateusername = (rule, value, callback) => {
      let _this=this
        if (value === '') {
            callback(new Error(_this.$t('inputUserErr')));
        }else{
          callback()
        }
    };
    const validatepass = (rule, value, callback) => {
      let _this=this
        if (value === '') {
            callback(new Error(_this.$t('inputPasswordErr')));
        }else{
          callback()
        }
    };
    const validatecaptcha = (rule, value, callback) => {
      let _this=this
        if (value === '') {
            callback(new Error(_this.$t('inputCaptchaErr')));
        }else{
          callback()
        }
    };
    return {
      sysLogin: { username: '', password: '', captcha: '', uuid: '' },
      yzm_message: '',
      rules:{
        username:[
          { validator: validateusername, trigger: 'blur' }
        ],
        password:[
          { validator: validatepass, trigger: 'blur' }
        ],
        captcha:[
          { validator: validatecaptcha, trigger: 'blur' }
        ]

      }
    }
  },
  watch: {
    isyzmTrue(n,o){
      this.change_yzm_message();
      this.sysLogin.captcha='';
    }
  },
  created() {
    this.change_yzm_message();
  },
  methods: {
    //用于生成uuid
    S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    },
    guid() {
        return (this.S4()+this.S4()+this.S4()+this.S4()+this.S4()+this.S4()+this.S4()+this.S4());
    },
    change_yzm_message () {
      this.sysLogin.uuid = this.guid();
      this.yzm_message = Url.uuidUrl+ this.sysLogin.uuid;
      this.axios.get(this.yzm_message).then((res)=>{  
      }).catch((e)=>{})
    },
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', this.sysLogin)
        }
      })
    }
  }
}
</script>
<style scoped>
.ivu-card-body{
  padding: 20px 10px!important;
}
.login-con .form-con{
  padding: 10px 0 0!important;
}
</style>
