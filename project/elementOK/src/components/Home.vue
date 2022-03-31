<template>
  <div class="hello">
    <div class="title">
      <span>ele.me</span>
      <span>
        <p v-if="$store.ComloginState!=200?true:false" @click="goLogin()">登录|注册</p>
        <img v-else @click="goMy()" src="../assets/common/user.png" alt>
      </span>
    </div>
    <div class="guessCitys">
      <p>
        <span>当前定位城市:</span>
        <span>定位不准时,请在城市列表中选择</span>
      </p>
      <div @click="pushCitys(guessId)">
        <span>{{guess.name}}</span>
        <strong><i class="el-icon-arrow-right"></i></strong>
      </div>
    </div>
    <div class="hotCitys">
      <p class="twoLines">热门城市</p>
      <div>
        <ul>
          <li @click="pushCitys(item.id)" v-for="item in hot" :key="item.id">{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div class="groupCitys">
      <ul class="oneUl">
        <li class="oneUl_oneli" v-for="(item,index) in group" :key="index">
          <p class="twoLines">
            {{index}}
            <span>(按字母排序)</span>
          </p>
          <ul class="twoUl">
            <li @click="pushCitys(itemContent.id)" v-for="itemContent in item" :key="itemContent.id">{{itemContent.name}}</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      // 热门城市
      hot: [],
      // 定位城市
      guess: [],
      // 定位城市id
      guessId:"",
      // 全部城市
      group: [],
      // 排序后的全部城市
      newgroup: [],
      // 登录状态
      // loginState:"0",
    };
  },
  created() {
    this.$store.dispatch('getUser');
    this.getHot();
    this.getGuess();
    this.getGroup();
  },
  methods: {
    // 获取热门城市
    getHot() {
      const url = "https://elm.cangdu.org/v1/cities?type=hot";
      this.$http({
        method: "get",
        url: url
      }).then(respon => {
        this.hot = respon.data;
      });
    },
     // 跳转到my界面
    goMy() {
      this.$router.push({ name: "my" });
    },
    // 跳转到login界面
    goLogin(){
      this.$router.push({ name: "login" });
    },
    // 获取定位城市
    getGuess() {
      const url = "https://elm.cangdu.org/v1/cities?type=guess";
      this.$http({
        method: "get",
        url: url
      }).then(respon => {
        this.guess = respon.data;
        this.guessId = respon.data.id;
      });
    },
    // 数组排序
    objKeySort(obj) {
      //【1】用Object内置类的keys方法获取要排序对象的属性名
      //【2】用Array原型上的sort方法对获取的属性名进行排序，返回一个新数组newkey
      var newkey = Object.keys(obj).sort();
      var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
      for (var i = 0; i < newkey.length; i++) {
        //遍历newkey数组
        newObj[newkey[i]] = obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对 ，
        //newObj[newkey[i].toLowerCase()] = obj[newkey[i]]; 并大写转换小写【做签名验证会用】
      }
      return newObj; //返回排好序的新对象
    },
    // 请求全部城市端口
    getGroup() {
      const url = "https://elm.cangdu.org/v1/cities?type=group";
      this.$http({
        method: "get",
        url: url
      }).then(respon => {
        this.group = this.objKeySort(respon.data);
      });
    },
    // 跳转到市区选择界面
    pushCitys(id){
      localStorage.cityId=id;
      this.$router.push({name:'selectCity',params:{id}})
    },
  }
};
</script>

<style scoped>
/* 全局样式 */
.hello {
  background: #f5f5f5;
}
/* 两条线的宽度 */
.twoLines {
  border-top: 2px solid #e4e4e4;
}

/* 头部部分 */
.title {
  height: 1.95rem;
  background: #3190e8;
  color: white;
  position: relative;
}
.title span:first-of-type {
  float: left;
  position: absolute;
  top: 50%;
  left: 0.4rem;
  font-size: .7rem;
  font-weight: 400;
  transform: translateY(-50%);
}
.title span:last-of-type {
  float: right;
  font-size: .65rem;
  position: absolute;
  top: 50%;
  right: .55rem;
transform: translateY(-50%);
}
.title span span {
  color: white;
}
/* 定位城市部分 */
.guessCitys {
  padding-top: .35rem;
  margin-bottom: .4rem;
  background: #ffffff;
}
.guessCitys p {
  height: 1.45rem;
  line-height: 1.45rem;
  border-bottom: 1px solid #e4e4e4;
}
.guessCitys p span {
  font-size: .55rem;
  
}
.guessCitys p span:first-of-type {
  float: left;
  padding-left: .45rem;
  color: #666666;
}
.guessCitys p span:last-of-type {
  float: right;
  font-size: .475rem;
  margin-right: .45rem;
  color: #9F9F9F;
  font-weight: 900;
}
.guessCitys div {
  width: 100%;
  height: 1.8rem;
  display: inline-block;
  line-height: 1.8rem;
  border-bottom: 2px solid #e4e4e4;
  position: relative;
  text-indent: .45rem;
  color: #3190E9;
  text-decoration: none;
  box-sizing: border-box;
}
.guessCitys div span{
  font-size: .75rem;
}
.guessCitys div strong i {
  position: absolute;
  top: 50%;
  right: .45rem;
  font-size: .75rem;
  display: inline-block;
  font-weight: 900;
  color: #aaaaaa;
  margin-top: -.3rem;
}
/* 热门城市 */
.hotCitys p {
  height: 1.4rem;
  line-height: 1.4rem;
  text-indent: .45rem;
  font-size: .55rem;
  background: #ffffff;
  color: #666666;
}
.hotCitys ul {
  border-bottom: 1px solid #e4e4e4;
}
.hotCitys li {
  width: 25%;
  height: 1.75rem;
  display: inline-block;
  text-align: center;
  line-height: 1.75rem;
  border-top: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  box-sizing: border-box;
  background: #ffffff;
  color: #3190e8;
  font-size: .6rem;
}
.hotCitys li:nth-of-type(4n) {
  border-right: 0;
}
.hotCitys li:nth-of-type(4n + 1) {
  border-left: 0;
}

/* 全部城市 */
.groupCitys .oneUl p {
  width: 100%;
  height: 1.75rem;
  line-height: 1.75rem;
  font-size: .475rem;
  padding-left: .45rem;
  color: #666666;
  background: #ffffff;
  overflow: hidden;
  border-bottom: 1px solid #e4e4e4;
}
.groupCitys .oneUl .oneUl_oneli {
  width: 100%;
  margin-top: .4rem;
  overflow: hidden;
  color: #FFFFFF;
}
.groupCitys .oneUl li {
  background: #FFFFFF;
}
.groupCitys .oneUl p span {
  color: #999999;
}
.groupCitys .twoUl{
  background: #FFFFFF;
  
}
.groupCitys .twoUl li {
  width: 25%;
  height: 1.75rem;
  display: inline-block;
  text-align: center;
  line-height: 1.75rem;
  border-bottom: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  box-sizing: border-box;
  background: #ffffff;
  font-size: .6rem;
  color: #666666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  float: left;
}
</style>
