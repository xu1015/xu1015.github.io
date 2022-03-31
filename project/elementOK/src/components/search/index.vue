<template>
  <div>
    <div class="title">
      <strong @click="prev()">
        <i class="el-icon-arrow-left"></i>
      </strong>
      <h1>搜索</h1>
    </div>

    <form>
      <input type="search" class="search" placeholder="请输入商家或美食名称" v-model="inp">
      <input type="submit" class="submit" @click.prevent="getCafe()">
    </form>
    <!-- 商铺展示列表 -->
    <section v-if="inp!=0&&restaurants.length>0" >
      <h4>商家</h4>
      <ul class="list_container">
        <li class="list_li" v-for="(item,index) in restaurants" :key="index" @click="goshopDetailInfo(item.id)">
          <section class="left">
            <img :src="'//elm.cangdu.org/img/'+item.image_path" alt>
          </section>
          <section class="right">
            <p class="cafe">
              {{item.name}}
              <img src="./imgs/pay.png" alt>
            </p>
            <p>月售 {{item.recent_order_num}} 单</p>
            <p>{{item.float_minimum_order_amount}} 元起送 / 距离{{item.distance}}公里</p>
          </section>
        </li>
      </ul>
    </section>

    <!-- 搜索历史 -->
    <section class="history" v-if="inp.length==0&&arr.length!=0">
      <h4 v-if="arr.length">搜索历史</h4>
      <ul>
        <li class="history_li" v-for="(item,index) in arr" :key="index">
          <span @click="research()">{{item}}</span>
          <img src="./imgs/close.png" alt @click="remove(index)">
        </li>
      </ul>
      <div v-if="arr.length" class="clear" @click="clear()">清空搜索历史</div>
    </section>
    <!-- 无搜索结果 -->
    <section class="none" v-if="none">很抱歉！无搜索结果</section>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      inp: "",
      restaurants: [],
      arr: [],
      // searchHistory:true,
      none: false
    };
  },
  watch: {
    //msg状态修改,回调这个方法
    inp(newValue, oldValue) {
      // console.log(newValue + "钱变了!!!!!" + oldValue);
      if (this.inp == "") {
        this.restaurants = [];
        this.none=false;
      }
    }
  },
  methods: {
    prev() {
      this.$router.go(-1);
    },
    // 获取商铺信息
    getCafe() {
      this.none = false;
      // 清空上一次请求数据
      console.log("输入的内容",typeof(this.inp));
      console.log("经纬度",localStorage.Comgeohash);
      
      this.restaurants = [];
      if (this.inp!="") {
        // 把搜索框的值存入arr中
        this.arr.unshift(this.inp);
        const url =
          "https://elm.cangdu.org/v4/restaurants?geohash=" +
          localStorage.Comgeohash +
          "&keyword=" +
          this.inp;
        this.$http({
          method: "get",
          url: url
        }).then(respon => {
          this.restaurants = respon.data;
          console.log(respon);
          if (respon.data.length == 0||respon.data.status==0) {
            this.none = true;
          }
        });
        
      }else{
        alert("请输入内容")
      }
    },
    // 跳转到餐馆详细信息
    goshopDetailInfo(id){
      this.$router.push({name:"shop",query:{id,}})
    },
    // 删除单项搜索历史
    remove(index) {
      this.arr.splice(index, 1);
    },
    clear() {
      this.arr = [];
      this.searchHistory = false;
    },
    research() {
      console.log("+++");
    }
  }
};
</script>

<style scoped>

input {
  outline: none;
}
.title {
  height: 1.95rem;
  background: #3190e8;
  line-height: 1.95rem;
  color: white;
  position: relative;
  text-align: center;
}
.title strong i {
  font-size: 22px;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 5px;
  margin-top: -11px;
}
h1 {
  font-weight: 700;
  font-size: 0.8rem;
}
form {
  background-color: #fff;
  padding: 0.5rem;
  display: flex;
}
.search {
  flex: 4;
  height: 1.5rem;
  border: 0.025rem solid #e4e4e4;
  font-size: 0.65rem;
  color: #333;
  border-radius: 0.125rem;
  background-color: #f2f2f2;
  font-weight: 700;
  padding: 0 0.25rem;
}
.submit {
  flex: 1;
  border: 0.025rem solid #3190e8;
  margin-left: 0.2rem;
  font-size: 0.65rem;
  color: #fff;
  border-radius: 0.125rem;
  background-color: #3190e8;
  font-weight: 700;
  padding: 0 0.25rem;
}
h4 {
  font-size: 0.6rem;
  line-height: 2rem;
  text-indent: 0.5rem;
  font-weight: 700;
  color: #666;
}
.list_li {
  display: flex;
  justify-content: "center";
  padding: 0.5rem;
  font-size: 0.6rem;
  color: #333;
  line-height: 0.9rem;
  background: white;
  border-bottom: 0.025rem solid #e4e4e4;
}
.left {
  width: 1.7rem;
  height: 1.7rem;
  margin-right: 0.25rem;
  background: pink;
}
.left img {
  width: 1.7rem;
  height: 1.7rem;
}
.right {
  width: 13rem;
  padding-bottom: 0.25rem;
  border-bottom: 0.025rem solid #e4e4e4;
}
.right img {
  width: 18px;
  vertical-align: middle;
}
.history_li {
  background: white;
  height: 2rem;
  border-bottom: 0.025rem solid #e4e4e4;
  font-size: 0.7rem;
  padding: 0 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.history_li span {
  display: inline-block;
  width: 80%;
}
.clear {
  background-color: #fff;
  height: 2rem;
  color: #3190e8;
  font: 0.7rem/2rem Microsoft YaHei;
  font-weight: 700;
  text-align: center;
}
.none {
  margin: 0 auto;
  font: 0.65rem/1.75rem Microsoft YaHei;
  color: #333;
  background-color: #fff;
  text-align: center;
  margin-top: 0.125rem;
}
</style>
