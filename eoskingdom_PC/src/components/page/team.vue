<template>
    <div class="team ">
        <div class="unified_limit_width">
            <div style="margin-left:120px;">
                <img :src="$t('hezuo')" alt="" style="margin: 50px 0;width: 100%;">
              <Row  class="break-b teamtitle">
                <Col span="6">
                  <a href="#"><img src="@/assets/images/team/PARTNER01.png" alt=""></a>
                </Col>
                <Col span="6">
                  <a href="#"><img src="@/assets/images/team/PARTNER02.png" alt=""></a>
                </Col>
                <Col span="6">
                  <a href="#"><img src="@/assets/images/team/PARTNER03.png" alt=""></a>
                </Col>
                <Col span="6">
                  <a href="#"><img src="@/assets/images/team/PARTNER04.png" alt=""></a>
                </Col>
                <Col span="6">
                  <a href="#"><img src="@/assets/images/team/PARTNER05.png" alt=""></a>
                </Col>
                <Col span="6">
                  <a href="#"><img src="@/assets/images/team/PARTNER06.png" alt=""></a>
                </Col>
                <Col span="6">
                  <a href="#"><img src="@/assets/images/team/PARTNER07.png" alt=""></a>
                </Col>
                <Col span="6">
                  <a href="#"><img src="@/assets/images/team/PARTNER08.png" alt=""></a>
                </Col>
                <Col span="6">
                  <a href="#"><img src="@/assets/images/team/PARTNER09.png" alt=""></a>
                </Col>
                <Col span="6">
                  <a href="#"><img src="@/assets/images/team/PARTNER10.png" alt=""></a>
                </Col>
                <Col span="6">
                  <a href="#"><img src="@/assets/images/team/PARTNER11.png" alt=""></a>
                </Col>
                <Col span="6">
                  <a href="#"><img src="@/assets/images/team/PARTNER12.png" alt=""></a>
                </Col>
                <Col span="6">
                  <a href="#"><img src="@/assets/images/team/PARTNER13.png" alt=""></a>
                </Col>
                <Col span="6">
                  <a href="#"><img src="@/assets/images/team/PARTNER14.png" alt=""></a>
                </Col>
              </Row>
            </div>
        </div>
      <!-- <Row class="break-b teamtitle_" style="margin-top:40px;">
        <Col span="2" offset="5">
          <img src="@/assets/images/team/01MAIL.png" alt="" @mouseover="showemail = true" @mouseleave="showemail = false" style="cursor:pointer">
          <div class="email" v-show="showemail" >
            <p>邮箱: contact@eoskingdom.io</p>
          </div>
        </Col>
        <Col span="2">
          <a href="https://t.me/EosKingDom_global"><img src="@/assets/images/team/02TELEGRAM.png" alt=""></a>
        </Col>
        <Col span="2">
          <a href="https://twitter.com/eoskingdom"><img src="@/assets/images/team/03TWITTER.png" alt=""></a>
        </Col>
        <Col span="2">
          <img src="@/assets/images/team/04WECHAT.png" style="cursor:pointer" alt="" @mouseover="showweixin = true" @mouseleave="showweixin = false">
          <div class="weixin" v-show="showweixin" >
            <p>微信二维码</p>
            <img src="@/assets/images/team/wechatscan.jpg">
          </div>
        </Col>
        <Col span="2">
          <a href="#"><img src="@/assets/images/team/05FACEBOOK.png" alt=""></a>
        </Col>
        <Col span="2">
          <a href="#"><img src="@/assets/images/team/06STEEMIT.png" alt=""></a>
        </Col>
        <Col span="2">
          <a href="#"><img src="@/assets/images/team/07MEDIUM.png" alt=""></a>
        </Col> 
      </Row> -->
    </div>
</template>

<script>
export default {
  data(){
    return{
      showemail:false,
      showweixin:false,

    }
  },
}
</script>

<style>
  .teamtitle{
    text-align: center;
  }
  .teamtitle img{
    margin: 15px 0;
    margin-left: 3%;
    width: 91%;
    margin-top: 2%;
  }
  .teamtitle_{
    text-align: center;
  }
  .teamtitle_ img{
    width: 40%;
    margin: 5px 0;
  }
  .ivu-col-span-2{
width: 7.333333%;
  }
  .teamtitle_ .email{
    width: 200%;
    position: absolute;
    top: -55px;
    background: white;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .teamtitle_ .email p{
    height: 50px;
    line-height: 50px;
    font-size: 0.9rem;
  }
   .teamtitle_ .weixin{
    width: 200px;
    position: absolute;
    top: -245px;
    background: white;
    /* border-top-left-radius: 1rem; */
    /* border-top-right-radius: 1rem; */
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .teamtitle_ .weixin p{
    font-size: 0.9rem;
    margin-top: 1rem;
  }
  .teamtitle_ .weixin img{
    width: 200px;
    padding-top: -10rem;
  }
</style>
