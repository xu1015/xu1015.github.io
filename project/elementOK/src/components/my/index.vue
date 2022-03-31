<template>
  <div>
    <div class="title"></div>
    <!-- 用户头 -->
    <div class="myTitle">
      <con-title title="会员中心"></con-title>
      <router-link :to="$store.ComloginState!=200?'/login':'/accountInfo'">
        <div class="user">
          <img v-if="$store.ComloginState!=200?true:false" src="./img/头像.png" class="head-img">
          <img v-else :src="'//elm.cangdu.org/img/'+userInfo.avatar" class="head-img">
          <div class="user-info">
            <p v-if="$store.ComloginState!=200?true:false" class="userName">登录/注册</p>
            <p v-else class="userName">{{userInfo.username}}</p>

            <p class="userPhone">
              <span class="phone-icon">
                <img src="./img/手机.png" alt>
              </span>
              <span style="line-height: .75rem;">暂无绑定手机号</span>
            </p>
          </div>
          <strong>
            <i class="el-icon-arrow-right"></i>
          </strong>
        </div>
      </router-link>
    </div>
    <!-- infoData -->
    <div class="info-data">
      <div class="info-data-link">
        <div @click="goBalance()">
          <p class="info-data-top">
            <b>0.00</b>元
          </p>
          <p class="info-data-bottom">我的余额</p>
        </div>
      </div>
      <div class="info-data-link" @click="goBenefit(userInfo.user_id)">
        <p class="info-data-top">
          <b v-if="$store.ComloginState!=200?true:false">0</b>
          <b v-else>3</b>个
        </p>
        <p class="info-data-bottom">我的优惠</p>
      </div>
      <div class="info-data-link">
        <div @click="goPoints()">
          <p class="info-data-top">
            <b>0</b>分
          </p>
          <p class="info-data-bottom">我的积分</p>
        </div>
      </div>
    </div>
    <!-- menu -->
    <div class="menu">
      <div class="menu1">
        <a class="menu1-link" @click="goOrder()">
          <span>
            <img src="../my/img/订单.png" alt>
          </span>
          <div class="menu1-link-right">
            <span>我的订单</span>
            <span>
              <i class="el-icon-arrow-right"></i>
            </span>
          </div>
        </a>
        <a class="menu1-link" @click="goTry()">
          <span>
            <img src="../my/img/商城 pro.png" alt>
          </span>
          <div class="menu1-link-right">
            <span>积分商城</span>
            <span>
              <i class="el-icon-arrow-right"></i>
            </span>
          </div>
        </a>
        <div @click="govipcard(userInfo.username)" class="menu1-link">
          <span>
            <img src="../my/img/会员.png" alt>
          </span>
          <div class="menu1-link-right">
            <span>饿了么会员卡</span>
            <span>
              <i class="el-icon-arrow-right"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="menu1">
        <div class="menu1-link" @click="goServer()">
          <span>
            <img src="../my/img/方块.png" alt>
          </span>
          <div class="menu1-link-right">
            <span>服务中心</span>
            <span>
              <i class="el-icon-arrow-right"></i>
            </span>
          </div>
        </div>
        <div class="menu1-link"  @click="goDownload()">
          <span>
            <img src="../my/img/饿了么.png" alt>
          </span>
          <div class="menu1-link-right">
            <span>下载饿了么app</span>
            <span>
              <i class="el-icon-arrow-right"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import conTitle from "./conTitle";
export default {
  name: "my",
  components: {
    conTitle
  },
  data() {
    return {
      userInfo: []
      // userImg:''
    };
  },
  created() {
    // 请求登录信息
    this.getUser();
  },
  methods: {
    prev() {
      this.$router.go(-1);
    },
    // 测试用户是否在线
    getUser() {
      console.log("状态码", this.$store.ComloginState);
      const url = "https://elm.cangdu.org/v1/user";
      this.$http({
        method: "get",
        url: url,
        //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
        withCredentials: true // 默认false
      }).then(res => {
        // console.log("tap", res);
        console.log("tap", res.data);
        if (res.data.username != undefined) {
          this.userInfo = res.data;
          
        } 
      });
    }, 
    // infoData部分
    // 跳转到余额页面
    goBalance() {
      this.$router.push({ name: "balance" });
    },
    // 跳转到优惠页面
    goBenefit(id) {
      this.$router.push({ name: "benefit",query:{id}});
    },
    // 跳转到积分页面
    goPoints() {
      this.$router.push({ name: "points" });
    },
    // 跳转到服务中心
    goServer(){
      this.$router.push({name:"serverCenter"});
    },
    // 跳转到积分商城
    goTry() {
      this.$router.push({ name: "try" });
    },
    // menu部分
    // 跳转到订单页面
    goOrder() {
      this.$router.push({ name: "order" });
    },
    // 跳转到会员中心
    govipcard(username) {
      this.$router.push({ name: "vipcard" ,query:{username}});
    },
    // 跳转到下载APP页面
    goDownload(){
      this.$router.push({ name: "download" });
    }
  }
};
</script>

<style scoped>
.info-data {
  display: flex;
}
.info-one {
  /* width: 1rem; */
}
/* -----------用户头----------- */
.user {
  display: flex;
  background: #3190e8;
  padding: 0.666667rem 0.6rem;
  align-items: center;
  text-decoration: none;
  color: white;
  /* justify-content:space-between; */
}
.head-img {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
}
.user-info {
  margin-left: 0.48rem;
  flex-grow: 1;
}
.userName {
  font-weight: 700;
  font-size: 0.8rem;
}
.userPhone {
  font-size: 0.57333rem;
  line-height: 0.75rem;
  padding-top: 0.3rem;
}
.phone-icon img {
  height: 0.75rem;
  vertical-align: top;
}
/* ----------info-data------------ */
.info-data {
  display: flex;
  background-color: white;
}
.info-data-top {
  padding: 0.853333rem 0 0.453333rem;
}
.info-data-top b {
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1rem;
  color: #f90;
}
.info-data-link:nth-of-type(2) .info-data-top b {
  color: #ff5f3e;
}
.info-data-link:nth-of-type(3) .info-data-top b {
  color: #6ac20b;
}
.info-data-link {
  /* float: left; */
  width: 33.33%;
  text-align: center;
  font-size: 0.55rem;
  color: #333;
  border-right: 1px solid #f1f1f1;
}
.info-data-bottom {
  font-size: 0.57333rem;
  color: #666;
  font-weight: 400;
  padding-bottom: 0.453333rem;
}
/* ---------menu--------- */
.menu1 {
  margin-top: 0.4rem;
  background: white;
  font-weight: 400;
}
.menu1-link {
  padding-left: 1.6rem;
  display: flex;
  align-items: center;
  line-height: 1rem;
}
.menu1-link-right {
  display: flex;
  width: 100%;
  border-bottom: 1px solid #f1f1f1;
  padding: 0.433333rem 0.266667rem 0.433333rem 0;
  font-size: 0.7rem;
  font-weight: 400;
  color: #333;
  justify-content: space-between;
}
.menu1-link span img {
  width: 0.7rem;
  margin-left: -0.866667rem;
  margin-right: 0.266667rem;
}
</style>
