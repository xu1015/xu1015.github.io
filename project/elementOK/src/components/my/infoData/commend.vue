<template>
  <div>
    <con-title title="推荐有奖"></con-title>
    <div class="top">
      <img src="../img/friend.png" alt srcset>
    </div>
    <section>
      <div class="con" @click="commend()">
        <img src="../img/vx.png" alt>
        <p>邀请微信好友</p>
      </div>
      <div class="con" @click="commend()">
        <img src="../img/qq.png" alt>
        <p>邀请QQ好友</p>
      </div>
      <div class="con" @click="commend()">
        <img src="../img/ew.png" alt>
        <p>邀请面对面好友</p>
      </div>
    </section>
    <message-box :title="showHideInfo" :showHide="showHide" :change="shchange"></message-box>
    <div class="wrap">
      <div class="left">
        <p>累计收益</p>
        <p>
          <span>0</span>元
        </p>
      </div>
      <div class="right">
        <p>成功邀请</p>
        <p>
          <span>0</span>人
        </p>
      </div>
    </div>
    <div class="bot">
      <p>-收益明细-</p>
      <img src="../img/mx.png" alt>
      <p class="last">还不赶紧去邀请好友</p>
    </div>
  </div>
</template>

<script>
import conTitle from "../conTitle";
import messageBox from "../../common/Component/messageBox";
export default {
  name: "exchange",
  components: {
    conTitle,
    messageBox
  },
  data() {
    return {
      // 弹框显示隐藏
      showHide: false,
      // 往弹框传的信息
      showHideInfo: ""
    }
  },
  methods: {
    commend() {
        this.showHide = true;
      this.showHideInfo= "请在饿了么APP中打开";
    },
    // 框架双向绑定方法
    shchange(val) {
      this.showHide = val;
    },
  },
};
</script>

<style scoped>
.top {
  height: 9.74rem;
}
.top img{
  width: 100%;
}
section {
  margin-top: 0.3rem;
  display: flex;
  font-size: 0.5rem;
  padding: 1rem 0;
  background-color: #fff;
}
.con {
  flex: 1;
  text-align: center;
  color: 0.5rem;
  color: #333;
}
.con p {
  margin-top: 0.3rem;
}
section img {
  width: 2.5rem;
}
.wrap {
  width: 100%;
  display: flex;
  text-align: center;
  font-size: 0.5rem;
  margin-top: 1rem;
  color: #666;
  line-height: 1rem;
}
.left {
  width: 50%;
  height: 2rem;
  border-right: 1px solid #ccc;
}
.right {
  width: 50%;
  height: 2rem;
}
.left span {
  font-size: 0.8rem;
  color: #ff5633;
  font-weight: 700;
}
.right span {
  font-size: 0.8rem;
  color: #666;
  font-weight: 700;
}
.bot {
  margin-top: 1rem;
  font-size: 0.5rem;
  text-align: center;
}
.bot img {
  width: 1.3rem;
}
.bot p:nth-child(1) {
  color: #333;
  margin-bottom: 1rem;
}
.last {
  color: rgb(175, 175, 175);
  margin-top: 0.3rem;
}
</style>
