<template>
  <div>
    <con-title title="账户信息"></con-title>
    <message-box title="请在手机APP中设置" :showHide="isHide" :change="shchange"></message-box>
    <div class="first">
      <input type="file" class="fileOpen" @change="findImgUrl(this)" accept="image/png, image/jpeg, image/gif, image/jpg">
      <h2>头像</h2>
      <div class="right">
        <img :src="'//elm.cangdu.org/img/'+userInfo.avatar" class="">
        <strong>
          <i class="el-icon-arrow-right"></i>
        </strong>
      </div>
    </div>
    <div class="con1" @click="goRename()">
      <h2>用户名</h2>
      <div class="right">
        <span class="rightInfo">{{userInfo.username}}</span>
        <strong>
          <i class="el-icon-arrow-right"></i>
        </strong>
      </div>
    </div>
    <div class="con1" @click="goAddress()">
      <h2>收货地址</h2>
      <div class="right">
        <strong>
          <i class="el-icon-arrow-right"></i>
        </strong>
      </div>
    </div>
    <div class="con2">账号绑定</div>
    <div class="con1" @click="goAlert()">
      <h2><img src="../img/shoujifangwen.png" alt="" class="phoneImg">手机</h2>
      <div class="right">
        <span class="rightInfo">{{userInfo.mobile}}</span>
        <strong>
          <i class="el-icon-arrow-right"></i>
        </strong>
      </div>
    </div>
    <div class="con2">安全设置</div>
    <div class="con1" @click="goPassWord()">
      <h2>登录密码</h2>
      <div class="right">
          <span class="rightInfo">修改</span>
        <strong>
          <i class="el-icon-arrow-right"></i>
        </strong>
      </div>
    </div>
    <button @click="outUser()">退出登录</button>
  </div>
</template>
<script>
import conTitle from "../conTitle";
import messageBox from "../../common/Component/messageBox";
export default {
  name: "accountInfo",
  components: {
    conTitle,
    messageBox
  },
  data() {
    return {
      userInfo: [],
      isHide:false,
      imgUrl:"",
    };
  },
  created() {
    // 请求登录信息
    this.getUser();
  },
  methods: {
    //获取上传的图片信息
    findImgUrl(evn){
      // console.log("查看方法");
       var img = event.target.files[0];
      // reader.onload = function(evt){
        // console.log("图片路径",name)
      // reader.readAsDataURL(file.files[0]);
    // }
    },
    getUser() {
      console.log("状态码", this.$store.ComloginState);
      const url = "https://elm.cangdu.org/v1/user";
      this.$http({
        methods: "get",
        url: url,
        //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
        withCredentials: true // 默认false
      }).then(res => {
          console.log("222",res.data.username);
          
          if (res.data.username!=undefined) {
          console.log("111", res.data);
          this.userInfo = res.data;
        } 
      });
    },
    goRename(){
        this.$router.push({name:"rename"});
    },
    goAddress(){
      this.$router.push({name:"address"});
    },
    goPassWord(){
      this.$router.push({name:"resetPassword"});
    },
    goAlert(){
      this.isHide=true;
      console.log("000");
      
      // this.$router.push({name:"alert"})
    },
    shchange(val) {
      this.isHide = val;
    },
    // 用户退出方法
    outUser() {
      const url = "https://elm.cangdu.org/v2/signout";
      this.$http({
        method: "get",
        url: url,
        //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
        withCredentials: true // 默认false
      }).then(res => {
        console.log("退出登录", res.data);
        // console.log(res.data.status);
        if (res.data.status == 1) {
          this.$store.ComloginState = "0";
        }
        console.log("状态码",this.$store.ComloginState)
        // console.log(this.$store.ComloginState)

      });
    },
    
  }
};
</script>
<style scoped>
.first{
  position: relative;
}
.first .fileOpen{
    display: block;
    position: absolute;
    opacity: 0;
    left: 0;
    width: 100%;
    height: 3.1rem;
}
.first,.con1{
    margin-top: .4rem;
    padding: .5rem .4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #ddd;
    background: #fff;
}
.first .right img{
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    vertical-align: middle;
}
h2 {
    font-size: .6rem;
    color: #333;
    font-weight: 500;
    display: flex;
    align-items: center;
}
.right{
    font-size: .7rem;
    color: #999;
    font-weight: 100;
    font-family: Arial;
    vertical-align: middle; 
    line-height: 1.39rem;
}
.con1{
    margin-top: 0;
    padding: .3rem .4rem;
    height: 1.4rem;
}
.con2{
    padding: .4rem;
    font-size: .5rem;
    color: #666;
}
.phoneImg{
    margin-right: 0.4rem;
    height:1.1rem;
}
button{
    width: 96%;
    margin: 1.3rem auto 0;
    line-height: 1.5rem;
    border-radius: 5px;
    text-align: center;
    background: #d8584a;
    font-size: .6rem;
    color: #fff;
    display: block;
    border: 0;
}
</style>

