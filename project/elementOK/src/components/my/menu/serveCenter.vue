<template>
  <div>
    <div class="title">
      <i class="el-icon-arrow-left titleImg" @click="prev()"></i>
      <span class="ellipsis">订单详情</span>
      <span></span>
    </div>
    <section class="connect">
      <div class="connect_left">
        <img src="../img/在线客服.png" alt>
        <span>在线客服</span>
      </div>
      <div class="connect_right">
        <img src="../img/电话.png" alt>
        <span>在线客服</span>
      </div>
    </section>
    <section class="hot_questions">
      <h4 class="qustion_header">热门问题</h4>
    </section>
    <ul>
      <li class="question_title" v-for="(itemServe,index) in arr.length/2" :key="index" @click="goSon(index)">
        <!-- <span>111</span> -->
        <span>{{arrayser[arr[index*2+1]]}}</span>
        <i class="el-icon-arrow-right"></i>
      </li>
    </ul>
    <div class="detail_page" v-if="sonshowHide==true">
      <header>
        <div class="title">
          <i class="el-icon-arrow-left titleImg" @click="sonshowHide=false"></i>
          <span class="ellipsis">{{sonTitle}}</span>
          <span></span>
        </div>
      </header>
      <section class="detail_content">
        <section>
          <h2>{{sonContent}}</h2>
        </section>
      </section>
    </div>
  </div>
</template>
<script>
import conTitle from "../conTitle";
export default {
  name: "serverCenter",
  data() {
    return {
      //数组的key值
      arr: [],
      // 数组
      arrayser: [],
      titleArr: [],
      conArr: [],
      arrlength: 0,
      //子页面标题
      sonTitle:"",
      // 子界面内容
      sonContent:"",
      // 子界面显示隐藏
      sonshowHide:false,
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    //到子界面
    goSon(index){
      this.sonshowHide=true;
      this.sonTitle=this.arrayser[this.arr[index*2+1]];
      this.sonContent=this.arrayser[this.arr[index*2]];
    },
    prev() {
      this.$router.go(-1);
    },
    getInfo() {
      const url = "https://elm.cangdu.org/v3/profile/explain";
      this.$http({
        method: "get",
        url: url
      }).then(res => {
        console.log("测试测试", res);
        delete res.data["index"];
        this.arrayser = res.data;
        this.arr = Object.keys(res.data);
        console.log("111", this.arr);
      });
    }
  },
  components: {
    conTitle
  }
};
</script>
<style scoped>
/* 头部样式 */
.title {
  width: 100%;
  height: 1.95rem;
  background: #3190e8;
  line-height: 1.95rem;
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
  z-index: 100;
}
.titleImg {
  width: 0.6rem;
  height: 1rem;
  font-size: 1rem;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 0.2rem;
  margin-top: -0.5rem;
}
.title span:first-of-type {
  width: 50%;
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 700;
  margin-top: 0.15rem;
  vertical-align: top;
  color: white;
}
.title span:last-of-type {
  display: inline-block;
  font-size: 0.65rem;
  color: white;
  position: absolute;
  top: 50%;
  right: 0.55rem;
  transform: translateY(-50%);
}
.title span:last-of-type img {
  width: 0.8rem;
  font-weight: 700;
  margin-top: 1rem;
}

.connect {
  display: flex;
  justify-content: space-between;
  background: white;
  margin-top: 1.95rem;
}
.connect div {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 4rem;
  border-bottom: 1px solid #f5f5f5;
}
.connect_left {
  border-right: 1px solid #f5f5f5;
}
img {
  width: 1rem;
  /* height: 1rem; */
}
span {
  margin-top: 0.4rem;
  font-size: 0.6rem;
  color: #666;
}
.hot_questions h4 {
  font-size: 0.75rem;
  color: #333;
  line-height: 3rem;
  border-bottom: 1px solid #f5f5f5;
  padding-left: 0.7rem;
  background-color: #fff;
}
.question_title {
  padding: 0 0.7rem;
  height: 2rem;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
}
.question_title span {
  font-size: 0.6rem;
  color: #666;
}
.question_title i {
  width: 0.6rem;
  height: 0.6rem;
}

/* 子界面 */
.detail_page{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 202;
    padding-top: 1.95rem;
}
.detail_content{
  height: 100%;
  overflow: hidden;
}
.detail_content section{
  height: 100%;
  overflow: auto;
}
.detail_content section::-webkit-scrollbar {
  width: 0px;
}
</style>

