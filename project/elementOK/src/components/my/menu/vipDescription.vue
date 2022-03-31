<template>
  <div>
    <div class="content">
    <con-title title="我的优惠"></con-title>
      <div class="wrap">
        <p>
          尊敬的用户，随着会员体系逐渐完善，自2016年10月10日起，饿了么会员权益将做如下优化：
              购卡后31天内，累积享有30单减免配送费服务（每日最多3单，每单最高减免4元）。
              注：已购买的会员服务不受影响，当前会员服务失效前无法购买新卡。
        </p>
      </div>
      <div class="question">
        <h3>Q1: 特权介绍</h3>
        <ul>
          <li>身份标识：饿了么会员服务有效期内，享有专属皇冠标识。</li>
          <li>减免配送费： 饿了么会员卡自绑定账户之日起31天内，在「蜂鸟专送」标识商家下单，享有30次减免配送费特权，每日最多减免3单，每单最高可减4元。</li>
          <li>更多特权，敬请期待！</li>
        </ul>
        <h3>Q2: 咨费介绍</h3>
        <ul>
            <li>饿了么会员卡：20元</li>
        </ul>
        <h3>Q3: 特权介绍</h3>
        <p>当用户满足以下任一条件，会员服务自动失效：</p>
        <ol>
          <li>自绑定之日起超过31天；</li>
          <li>在31天内累计使用减免配送费的蜂鸟订单数量达到30单；</li>
        </ol>

        <h3>Q4: 购卡说明</h3>
        <ul>
            <li>在线购买：饿了么App>我的>饿了么会员卡</li>
        </ul>
        
        <h3>Q5: 温馨提示</h3>
        <ul>
            <li>用户在当前会员服务失效前，无法购买新卡。</li>
            <li>请认准饿了么官方渠道，任何从其他第三方途径获得的会员卡，饿了么不保证其可用性。</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import conTitle from "../conTitle"
export default {
  name: "vipDescription",
  components:{
        conTitle
    }
};
</script>

<style scoped>
.content {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 202;
    padding-top: 1.95rem;
    overflow-y: auto;
    color: #999;
    font-size: .6rem;
    padding: 2rem .7rem 0;
}
.wrap {
  background: #fff;
  padding: 0 2.4rem 0rem 2.4rem;
}
.wrap p     {
  font-size: 0.6rem;
  line-height: 0.85rem;
  color: #333;
}
.question {
  background: #fff;
  padding-left: 0.7rem;
}
.question h3 {
  margin-top: 0.67rem;
  margin-bottom: 0.2rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: #333;
}
.question li {
  font-size: 0.6rem;
  line-height: 0.9rem;
  color: #666;
  margin-bottom: .2rem;
}
.question ol{
  padding-left: 40px;
  margin-top: .5rem;
}
.content::-webkit-scrollbar {
  width: 0px;
}
</style>
