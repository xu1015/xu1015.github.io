<template>
  <div class="hello">
    <div class="title">
      <strong @click="prev()">
        <i class="el-icon-arrow-left"></i>
      </strong>
      <span>{{cityContent.name}}</span>
      <router-link to="/">切换城市</router-link>
    </div>

    <form v-on:submit.prevent="getAreaInfos" class="search" >
      <div>
        <input required="required" type="text" placeholder="输入学校、商务楼、地址" v-model="inputInfo" >
      </div>
      <div>
        <input type="submit"  value="提交">
      </div>
    </form>

    <div class="content_Text">搜索历史</div>
    <div class="searchHistory">
      <ul class="searchHistory_top">
        <li v-for="(item,index) in areaInfo" :key="index" @click="elm(item)">
          <h4>{{item.name}}</h4>
          <p>{{item.address}}</p>
        </li>
      </ul>
      <div class="searchHistory_bot" @click="clear()">清空所有</div>
    </div>
  </div>
</template>

<script>
import App from "../App";
export default {
  name: "selectCity",
  data() {
    return {
      cityid: "",
      cityContent: {},
      inputInfo: "",
      clickIndex: "",
      areaInfo: this.$store.state.searchHis
    };
  },
  created() {
    console.log(this.areaInfo);
    this.cityid = this.$route.params.id;
    this.getCityInfo();
  },
  methods: {
    prev() {
      this.$router.go(-1);
    },
    // 测试方法
    test() {
      console.log(this.inputInfo);
    },
    // 清除state里面的searchHis的所有数据
    clear() {
      this.$store.state.searchHis = [];
      this.areaInfo = {};
      console.log(this.$store.state.searchHis);
    },
    //   跳转到外卖界面
    elm(item) {
      var geohash = item.geohash;
      // 存储搜索历史
      var obj = { name: item.name, address: item.address };
      this.$store.state.searchHis.unshift(obj);
      this.$store.state.searchHis = this.unique(this.$store.state.searchHis);
      // localStorage.setItem('searchHis',JSON.stringify(obj));
      console.log(this.$store.state.searchHis);
      localStorage.Comgeohash = geohash;
      this.$router.push({ name: "waimaiHome", params: { geohash } });
      // console.log(this.global.Comgeohash)
    },
    // 对state里面的搜索历史进行数组去重
    unique(arr) {
      const res = new Map();
      return arr.filter(arr => !res.has(arr.name) && res.set(arr.name, 1));
    },
    // 请求城市信息
    getCityInfo() {
      const url = "https://elm.cangdu.org/v1/cities/" + this.cityid;
      this.$http({
        method: "get",
        url: url
      }).then(respon => {
        this.cityContent = respon.data;

        // console.log(this.cityContent);
      });
    },
    // 请求当前城市中的地区信息
    getAreaInfos() {
      if (this.inputInfo!="") {
        const url =
          "https://elm.cangdu.org/v1/pois?city_id=" +
          this.cityid +
          "&keyword=" +
          this.inputInfo +
          "&type=search";
        console.log(url);
        this.$http({
          method: "get",
          url: url
        }).then(respon => {
          this.areaInfo = respon.data;
  
          console.log(this.areaInfo);
        });
        
      }
    }
  }
};
</script>

<style scoped>
/* 全局设置 */

/* 头部title */
.title {
  height: 1.95rem;
  background: #3190e8;
  line-height: 1.95rem;
  color: white;
  position: relative;
  text-align: center;
}
.title strong i {
  font-size: 1rem;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 0.4rem;
  margin-top: -0.5rem;
}
.title span {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 700;
  margin-top: 0.15rem;
}
.title a {
  display: inline-block;
  color: white;
  font-size: 0.6rem;
  position: absolute;
  right: 0.4rem;
}
/* 城市查找部分 */
.search {
  margin-top: 0.4rem;
  padding-top: 0.4rem;
  border-top: 1px solid #e4e4e4;
  border-bottom: 2px solid #e4e4e4;
  background: #ffffff;
}
.search div {
  margin: 0 auto;
  text-align: center;
}
.search div input {
  width: 90%;
  height: 1.4rem;
  text-indent: 0.3rem;
  border: 1px solid #e4e4e4;
  font-size: 0.65rem;
  margin-bottom: 0.4rem;
}
.search div:nth-of-type(2) input {
  width: 90%;
  height: 1.4rem;
  background: #3190e8;
  color: white;
  margin-bottom: 0.4rem;
  border:0;
}

/* 搜索历史文本标题 */
.content_Text {
  height: 0.78rem;
  line-height: 0.78rem;
  font-size: 0.475rem;
  text-indent: 0.5rem;
}

/* 搜索历史内容部分 */
.searchHistory {
  border-top: 2px solid #e4e4e4;
  background: #ffffff;
}
.searchHistory_top li {
  padding-top: 0.65rem;
  border-bottom: 1px solid #e4e4e4;
}
.searchHistory_top h4 {
  width: 90%;
  margin: 0 auto;
  font-weight: normal;
  font-size: 0.65rem;
  margin-bottom: 0.35rem;
}
.searchHistory_top p {
  width: 90%;
  margin: 0 auto;
  font-size: 0.45rem;
  color: #a69999;
  margin-bottom: 0.55rem;
}
.searchHistory_bot {
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  color: #666666;
}
</style>
