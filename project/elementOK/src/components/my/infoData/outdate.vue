<template>
    <div>
    <con-title title="过期红包"></con-title>
    <ul class="content">
        <li class="hblist" v-for="(o,index) in this.$route.query.out" :key="index">
            <section class="li_item">
              <div class="li_item_left">
                <span>¥</span>
                <span>{{o.amount}}</span>
                <span>.</span>
                  <span>{{o.status}}</span>
                <p>满 {{o.sum_condition}} 元可用</p>
              </div>
              <div class="li_item_mid">
                <h4>{{o.name}}</h4>
                <p>{{o.end_date}}到期</p>
                <p>限收货手机号为{{o.phone}}</p>
              </div>
              <div class="li_item_right">
                  <img src="../img/outdate.png" alt="" srcset="">
              </div>
            </section>
            <p v-if="o.limit_map" class="li_footer">{{o.limit_map.restaurant_flavor_ids}}</p>
          </li>
    </ul> 
    </div>
</template>

<script>
import conTitle from "../conTitle";
export default {
    name:"outdate",
    components:{
        conTitle,
    },
    created() {
        console.log("传过来的过期红包",this.$route.query.out);
        
    },
}
</script>

<style scoped>
.content{
    padding: 1rem 0.7rem;
}
.hblist {
  background: #fff url("../img/graybg.png") repeat-x;
  background-size: 0.5rem 0.2rem;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
}
.li_item {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0.5rem 0.8rem;
}
.li_item_left {
  font-size: 0;
  flex: 1.5;
  border-right: 0.025rem dotted #ccc;
}
.li_item_left p{
    margin-top: .3rem;
    color: rgb(161, 160, 160);
    font-size: 13px;
}
.li_item_left span {
  color: #ccc;
  font-weight: 500;
}
.li_item_left span:nth-child(1) {
  font-size: .75rem;
  font-weight: 700;
}
.li_item_left span:nth-child(2) {
  font-size: 2rem;
}
.li_item_left span:nth-child(3) {
  font-size: 1rem;
  font-weight: 700;
}
.li_item_left span:nth-child(4) {
  font-size: 1rem;
  font-weight: 700;
}
.li_item_mid {
  margin-left: 0.5rem;
}
.li_item_mid p{
    font-size: .4rem;
    margin-top: .1rem;
    line-height: .6rem;
    color: rgb(173, 172, 172);
}
.li_item_mid h4 {
  color: #666;
}
.li_item_right {
  flex: 1;
}
.li_item_right img{
    width: 70px;
}
.hblist li:last-child {
  margin-bottom: 0.1rem;
}
.li_footer {
  background: #f9f9f9;
  margin-top: -0.5rem;
  padding: 0.5rem 0.8rem;
  font-size: .4rem;
  color: rgb(155, 155, 155);
}
</style>
