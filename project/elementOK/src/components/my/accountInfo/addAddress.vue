<template>
  <div>
    <div class="title">
        <i class="el-icon-arrow-left titleImg" @click="prev()"></i>
        <span class="ellipsis">新增地址</span>
        <span></span>
      </div>
    <div class="addDetail">
      <div class="new-info">
        <div class="input-new">
          <input type="text" placeholder="请填写你的姓名" v-model="username" :class="usernameInput==true?'verifies':''">
          <p v-if="usernameInput==true">请填写你的名字</p>
        </div>
        <div class="input-new">
          <p class="input_p" @click="searchAddressStatus=true">{{Address}}</p>
        </div>
        <div class="input-new">
          <input type="text" placeholder="请填写详细送餐地址" v-model="addressdetailInfo" :class="detailAddressInput==true||detailAddressInput2==true?'verifies':''">
          <p v-if="detailAddressInput==true">请详细填写送餐地址</p>
          <p v-if="detailAddressInput2==true">送餐地址太短了,不能识别</p>
        </div>
        <div class="input-new">
           <input type="text" placeholder="请填写能够联系到您的手机号" v-model="phone" :class="phoneInput==true?'verifies':''">
           <p v-if="phoneInput==true">手机号不能为空</p>
        </div>
        <div class="input-new">
          <input type="text" placeholder="备用联系电话(选填)" :class="phone_bkInput==true?'verifies':''">
          <p v-if="phone_bkInput==true">手机号不能为空</p>
        </div>        
        
        
       
        
      </div>
      <button @click="submitAddress()">新增地址</button>
    </div>
    <section class="rating_page" v-if="searchAddressStatus==true">
      <div class="title">
        <i class="el-icon-arrow-left titleImg" @click="searchAddressStatus=false"></i>
        <span class="ellipsis">订单备注</span>
        <span></span>
      </div>
      <form v-on:submit.prevent="getAddress" class="search_form">
        <input required="required" type="text" placeholder="请输入小区/写字楼/学校等" v-model="inp">
        <input type="submit" value="提交">
      </form>
      <section v-if="inp!=0&&address.length!=0">
        <ul class="address_list">
          <li v-for="(item,index) in address" :key="index" @click="getAddressName(item)">
            <h4>{{item.name}}</h4>
            <p>{{item.address}}</p>
          </li>
        </ul>
      </section>
      <section v-else>
        <div class="reminder">为了满足商家的送餐要求，建议您从列表中选择地址</div>
        <div class="point">
          <p>找不到地址？</p>
          <p>请尝试输入小区、写字楼或学校名</p>
          <p>详细地址（如门牌号）可稍后输入哦。</p>
        </div>
      </section>
    </section>
    <message-box :title="titleText" :showHide="showHide" :change="shchange"></message-box>
  </div>
</template>
<script>
import messageBox from "../../common/Component/messageBox";
export default {
  name: "addAddress",
  components: {
    messageBox
  },
  data() {
    return {
      //弹框显示信息
      titleText: "",
      //弹框显示隐藏
      showHide: false,
      Address: "请输入小区/写字楼/学校等",
      inp: "",
      address: [],
      //搜索地址的状态
      searchAddressStatus: false,
      //搜索获取到的地址
      //   searchInAddress:"",
      //搜索获取到的经纬度
      geohash: "",
      //用户id
      user_id:localStorage.Comloginid,
      //详细送餐信息
      addressdetailInfo:"",
      //用户名
      username:"",
      //手机号
      phone:"",
      //标签
      tags:"无",
      //性别
      sex:1,
      //备用电话
      phone_bk:0,
      //标签类型
      tag_type:2,
      //用户名输入框状态
      usernameInput:false,
      //详细送餐地址输入框状态
      detailAddressInput:false,
      detailAddressInput2:false,
      //手机号输入框状态
      phoneInput:false,
      phoneInput2:false,
      //备用手机输入框状态
      phone_bkInput:false,
      phone_bkInput2:false,

    };
  },
  watch: {
    //用户名输入框状态
    username(New,Old){
      if (New=="") {
        this.usernameInput=true;
      }
    },
    //详细送餐地址输入框状态
    addressdetailInfo(New,Old){
      if (New=="") {
        this.detailAddressInput=true;
        this.detailAddressInput2=false;
      }
      if(New.length<3&&New.length>0){
        this.detailAddressInput2=true;
        this.detailAddressInput=false;
      }
      console.log();
    },
    //手机号输入框状态
    phone(New,Old){
      if (New=="") {
        this.phoneInput=true;
      }
    },
    //备用手机输入框状态
    phone_bkInput(New,Old){
      if (New=="") {
        this.phone_bkInput=true;
      }
      
    },
  },
  created() {
    console.log("4444" + this.$route.query.name);
  },
  methods: {
    prev() {
      this.$router.go(-1);
    },
    //向接口上传地址
    submitAddress() {


        console.log("用户user_id-int",this.user_id);
        console.log("地址address-string",this.Address);
        console.log("详细地址address_detail-string",this.addressdetailInfo);
        console.log("经纬度geohash-string",this.geohash);
        console.log("收货人姓名name-string",this.username);
        console.log("电话号码phone-string",this.phone);
        console.log("标签tag-string",this.tags);
        console.log("性别sex-int",this.sex);
        console.log("备用电话phone_bk-string",this.phone_bk);
        console.log("标签类型tag_type-int",this.tag_type);
        
      if (this.$store.ComloginState != 200) {
        this.showHide = true;
        this.titleText = "请先登录";
      } else {
        const url =
          "https://elm.cangdu.org/v1/users/" + this.user_id + "/addresses";
        // console.log(url);
        this.$http({
          method: "post",
          url: url,
          data: {
            user_id: this.user_id,
            address: this.Address,
            address_detail: this.addressdetailInfo,
            geohash: this.geohash,
            name: this.username,
            phone: this.phone,
            tag: this.tags,
            sex: this.sex,
            phone_bk: this.phone_bk,
            tag_type: this.tag_type
          },
          withCredentials: true // 默认false
        }).then(respon => {
          this.addressInfo = respon.data;
          if (respon.data.message != undefined) {
            this.titleText = respon.data.message;
            this.showHide = true;
          } else {
            this.titleText = "添加地址成功";
            this.showHide = true;
            this.$router.push({name:"address",params:{itemAddress:respon.data}})
          }
        });
      }
      // console.log("状态码",this.$store.ComloginState);
    },
    //将下面的方法放入需要使用该组件的父组件
    //框架双向绑定方法
    shchange(val) {
      this.showHide = val;
    },
    // 获取地址
    getAddress() {
      // 获取城市id
      // localStorage.cityId=id;
      // 清空上一次请求数据
      this.address = [];
      if (this.inp != "") {
        // 把搜索框的值存入arr中
        const url =
          "https://elm.cangdu.org/v1/pois?city_id=" +
          localStorage.cityId +
          "&keyword=" +
          this.inp;
        this.$http({
          method: "get",
          url: url
        }).then(res => {
          console.log(res.data);

          this.address = res.data;
          if (res.data.length == 0) {
          }
        });
      }
    },
    getAddressName(item) {
      console.log("获取数据", item);
      this.searchAddressStatus = false;
      (this.Address = item.name), (this.geohash = item.geohash);
    }
  }
};
</script>
<style scoped>
.rating_page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 202;
  padding-top: 1.95rem;
}

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
  /* font-weight: 700; */
  margin-top: 0.15rem;
  vertical-align: top;
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

/* 搜索部分 */
.search_form {
  display: flex;
  padding: 0.7rem;
}
.search_form input:first-of-type {
  font-size: 0.65rem;
  color: #999;
  flex: 4;
  background-color: #f1f1f1;
  margin-right: 0.6rem;
  height: 1.5rem;
  border-radius: 0.15rem;
  padding: 0 0.4rem;
}
.search_form input:nth-of-type(2) {
  flex: 1;
  font-size: 0.65rem;
  color: #fff;
  background-color: #3190e8;
  border-radius: 0.15rem;
  border: 0;
}
.input-new{
    padding-bottom: .4rem;
}
.input-new p{
    font-size: .4rem;
    color: #ea3106;
    padding-left: .5rem;
    margin-top: .2rem;
}
.addDetail {
  margin-top: 0.4rem;
}
.new-info {
  background: #fff;
  padding-top: 1.95rem;
}
.new-info input {
  display: block;
  width: 15rem;
  font-size: 0.6rem;
  margin: 0 auto;
  padding: 0.3rem;
  background: #f2f2f2;
  border: 1px solid #ddd;
  border-radius: 3px;
  box-sizing: border-box;
  outline: none;
  -webkit-appearance: none;
  border-radius: 0;
}
.input-new .input_p {
  display: block;
  width: 15rem;
  font-size: 0.6rem;
  margin: 0 auto;
  padding: 0.3rem;
  background: #f2f2f2;
  border: 1px solid #ddd;
  border-radius: 3px;
  box-sizing: border-box;
  outline: none;
  -webkit-appearance: none;
  border-radius: 0;
  color: #757575;
}
.verifies{
    border-color: #ea3106!important;
}
button {
  display: block;
  margin: 0.6rem auto;
  width: 15rem;
  border-radius: 3px;
  font-size: 0.6rem;
  color: #fff;
  line-height: 1.6rem;
  background: #4cd964;
  font-weight: 700;
  border: 0;
  /* opacity: .6; */
  outline: none;
  -webkit-appearance: none;
  border-radius: 0;
}

/* 搜索地址界面 */
.input-address {
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 0.5rem;
  padding-bottom: 0;
}
.input-address input {
  display: block;
  width: 11.8rem;
  padding: 0.4rem;
  background: #f2f2f2;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.6rem;
  box-sizing: border-box;
  height: 2rem;
  vertical-align: middle;
}
.input-address button {
  display: block;
  width: 3rem;
  background: #3199e8;
  font-size: 0.7rem;
  color: #fff;
  border-radius: 5px;
  border: 0;
  margin-top: 0;
}
.reminder {
  background: #fff6e4;
  font-size: 0.62rem;
  color: #ff883f;
  text-align: center;
  padding: 0.2rem 0;
}
.point {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}
.point p {
  width: 100%;
  text-align: center;
  font-size: 0.7rem;
  color: #969696;
  margin-bottom: 0.4rem;
  line-height: 19px;
}
input,
button {
  outline: none;
  -webkit-appearance: none;
  border-radius: 0;
}
.address_list {
  padding: 0.7rem;
}
.address_list li {
  padding: 0.7rem 0;
  border-bottom: 0.025rem solid #f5f5f5;
  line-height: 1rem;
}
.address_list li h4 {
  font-size: 0.75rem;
  color: #555;
}
.address_list li p {
  font-size: 0.65rem;
  color: #999;
}
</style>

