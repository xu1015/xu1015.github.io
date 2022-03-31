<template>
  <div>
    <con-title title="兑换会员"></con-title>
    <div class="content">
      <div class="top">
        成功兑换后将关联到当前账号:
        <span v-if="$store.ComloginState==200?true:false">niciee</span>
      </div>
      <form>
        <input
          v-model="inp"
          type="number"
          oninput="if(value.length > 10)value = value.slice(0, 10)"
          placeholder="请输入10位卡号"
        >
        <input
          v-model="inp2"
          type="number"
          oninput="if(value.length > 6)value = value.slice(0, 6)"
          placeholder="请输入6位卡密"
        >
      </form>
      <div :class="one==true&&two==true?'green':''" @click="submit()" class="btn">兑换</div>
      <message-box :title="showHideInfo" :showHide="showHide" :change="shchange"></message-box>
      <div class="foot">
        <h3>——温馨提示——</h3>
        <p>新兑换的会员服务，权益以「会员说明」为准。</p>
        <p>月卡：30次减免配送费。</p>
        <p>季卡：90次减免配送费。</p>
        <p>年卡：360次减免配送费。</p>
        <p>＊仅限蜂鸟专送订单，每日最多减免3单，每单最高减免4元（一个月按31天计算）</p>
      </div>
    </div>
  </div>
</template>

<script>
import conTitle from "../conTitle";
import messageBox from "../../common/Component/messageBox";
export default {
  name: "useCart",
  components: {
    conTitle,
    messageBox
  },
  data() {
    return {
      inp: "",
      inp2: "",
      one: false,
      two: false,
      // 弹框显示隐藏
      showHide: false,
      // 往弹框传的信息
      showHideInfo: ""
    };
  },
  methods: {
    submit() {
        this.showHide = true;
      this.showHideInfo= "无效的卡号";
    },
    // 框架双向绑定方法
    shchange(val) {
      this.showHide = val;
    },
  },
  watch: {
    inp() {
      if (this.inp.length == 10) {
        this.one = true;
      }
    },
    inp2() {
      if (this.inp2.length == 6) {
        this.two = true;
      }
    }
  }
};
</script>

<style scoped>
.top {
  padding: 0.5rem;
  font-size: 0.6rem;
  color: #666;
  margin-bottom: 0.1rem;
}
.top span {
  font-weight: 700;
  color: #333;
}
input {
  width: 14.8rem;
  padding: 0.6rem;
  line-height: 0.8rem;
  font-size: 0.65rem;
  margin-bottom: 0.07rem;
  outline: none;
}
.btn {
  width: 78%;
  padding: 0.5rem 1rem;
  text-align: center;
  margin-top: 0.8rem;
  margin-left: 0.75rem;
  border-radius: 0.2rem;
  color: white;
  font-weight: 700;
  background-color: #ccc;
}
.foot {
  margin-top: 1rem;
  font-size: 0.5rem;
  color: rgb(167, 166, 166);
}
h3 {
  font-size: 0.7rem;
  text-align: center;
  margin-bottom: 0.8rem;
}
p {
  margin-left: 2rem;
  line-height: 0.8rem;
}
.green {
  background-color: #4cd964;
}
</style>
