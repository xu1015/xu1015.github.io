<template>
  <div>
    <!-- 头部 -->
    <div class="title">
      <strong>
        <i @click="prev()" class="el-icon-arrow-left"></i>
      </strong>
      <span>编辑地址</span>
      <span v-if="redeleStatus==false" @click="redeleStatus=!redeleStatus">编辑</span>
      <span v-else @click="redeleStatus=!redeleStatus">完成</span>
    </div>
    <!-- 内容部分 -->
    <div class="allAddress">
      <ul class="addresslist">
        <li v-for="(itemaddresslist,index) in addresslist" :key="index">
          <div>
            <p>{{itemaddresslist.address}}</p>
            <p>{{itemaddresslist.phone}}</p>
          </div>
          <img v-if="redeleStatus==true" src="../../../assets/common/error.png" alt="" @click="deleteAddress(itemaddresslist.id,index)">
        </li>
      </ul>
      <div class="new-address" @click="addAddress()">
        <span>新增地址</span>
        <strong>
          <i class="el-icon-arrow-right"></i>
        </strong>
      </div>
    </div>
    <message-box :title="titleText" :showHide="showHide" :change="shchange"></message-box>
  </div>
</template>
<script>
import messageBox from '../../common/Component/messageBox'
export default {
  name: "address",
  components:{
    messageBox,
  },
  data() {
    return {
      //用户id
      user_id: localStorage.Comloginid,
      // 地址列表
      addresslist:[],
      //删除切换按钮状态
      redeleStatus:false,
      //向弹框传的值
      titleText:"",
      //弹框显示隐藏
      showHide:false,
    };
  },
  created() {
    this.getaddress();
  },
  methods: {
    // 框架双向绑定方法
    shchange(val) {
      this.showHide = val;
    },
    //返回上一步
    prev() {
      this.$router.go(-1);
    },
    //获取地址
    getaddress() {
      const url="https://elm.cangdu.org/v1/users/"+this.user_id+"/addresses";
      this.$http({
        method:"get",
        url:url,
      }).then(res=>{
        this.addresslist=res.data;
        console.log("获取地址参数",res.data);
      })
    },
    //删除地址
    deleteAddress(id,index){
      console.log("点击返回的id",id);
      const url="https://elm.cangdu.org/v1/users/"+this.user_id+"/addresses/"+id
      this.$http({
        method:"DELETE",
        url:url
      }).then(res=>{
        console.log(res.data)
        this.titleText=res.data.success;
        this.showHide=true;
        this.addresslist.splice(index,1);
      })
    },
    addAddress() {
      this.$router.push({ name: "addAddress" });
    }
  }
};
</script>
<style scoped>
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
.title span:first-of-type {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 700;
  margin-top: 0.15rem;
}
.title span:nth-of-type(2) {
  display: inline-block;
  color: white;
  font-size: 0.7rem;
  position: absolute;
  right: 0.4rem;
}
/* 新增地址 */
.allAddress {
  width: 100%;
  margin-top: 0.4rem;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
}
.addresslist {
  background-color: #fff;
}
.addresslist li {
  border-bottom: 1px solid #d9d9d9;
  padding: 0.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  line-height: 1.7rem;
}
.addresslist li img{
    width:.4rem;
    height: .4rem;
    margin-right: .2rem;
}
.addresslist li:first-of-type {
  background: #fff8c3;
}
.addresslist li p{
    line-height: .9rem;
    font-size: .6rem;
    color: #333;
}
.new-address {
  background: #fff;
  margin-top: 0.4rem;
  padding: 0.2rem 0.4rem;
  border-top: 1px solid #d9d9d9;
  display: flex;
  justify-content: space-between;
}
.new-address span {
  display: block;
  font-size: 0.7rem;
  color: #333;
  line-height: 1.4rem;
}
.el-icon-arrow-right {
  font-size: 0.7rem;
  color: rgb(216, 216, 216);
  line-height: 1.4rem;
}
</style>

