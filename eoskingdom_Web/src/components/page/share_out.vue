<template>
  <div class="share_out">
    <Nav @childByValue="childByValue"></Nav>
    <div class="shareTop">
      <div class="swiper-container swiper-container2">
        <div class="swiper-wrapper">
          <!-- 第一轮播------------------------------- -->
          <div class="swiper-slide slide1">
            <nav class="slide1Top">
              <div
                :class="shareSlide1==false?'shareTop_Input':'shareTop_Uninput'"
                @click="changeShareSlide1Two"
              >{{$t('ekd.statistics')}}</div>
              <div
                :class="shareSlide1==true?'shareTop_Input':'shareTop_Uninput'"
                @click="changeShareSlide1One"
              >{{$t('ekd.rankinglist')}}</div>
            </nav>
            <!-- 统计部分 -->
            <div v-show="shareSlide1==false" class="slide1Content1">
              <div class="slide1Content1Top">
                <ul class="clearfix">
                  <li>
                    <div class="row">
                      <span class="span1">{{$t('ekd.circulation')}}</span>
                      <div class="press">
                        <div :style="{width:traffic + '%'}" class="alreadypre"></div>
                        <span>{{this.Formatdata(this.data.dividendsEntity.ekdCirculating)}}</span>
                      </div>
                      <span
                        class="total"
                      >{{ Math.floor((Number(this.data.dividendsEntity.ekdCirculating)/10000000000)*10000)/100}}%</span>
                    </div>
                    <p>Total: 10,&nbsp;000,&nbsp;000,&nbsp;000</p>
                  </li>
                  <li>
                    <div class="row">
                      <span class="span1">{{$t('ekd.cmountofpledge')}}</span>
                      <span class="press">
                        <div v-bind:style="{width: pledge + '%'}" class="alreadypre"></div>
                        <span>{{this.Formatdata(this.data.dividendsEntity.pledgeTotal)}}</span>
                      </span>
                      <span
                        class="total"
                      >{{ Math.floor((Number(this.data.dividendsEntity.pledgeTotal)/(this.data.dividendsEntity.ekdCirculating))*10000)/100}}%</span>
                    </div>
                    <p>Total: {{ this.Formatdata((this.data.dividendsEntity.ekdCirculating))}}</p>
                  </li>
                  <li>
                    <div class="row">
                      <span class="span1">{{$t('ekd.mining')}}</span>
                      <span class="press">
                        <div v-bind:style="{width: dig + '%'}" class="alreadypre"></div>
                        <span>{{this.Formatdata(this.data.dividendsEntity.minedTotal)}}</span>
                      </span>
                      <span
                        class="total"
                      >{{ Math.floor((Number(this.data.dividendsEntity.minedTotal)/5000000000)*10000)/100}}%</span>
                    </div>
                    <p>Total: 5,&nbsp;000,&nbsp;000,&nbsp;000</p>
                  </li>
                </ul>
              </div>
              <div
                class="slide1Content1Bottom"
              >{{$t('ekd.stageone')}} 1:{{data.dividendsEntity.minedScale}}</div>
            </div>
            <!-- 排行榜部分 -->
            <div v-show="shareSlide1" class="slide1Content2">
              <div class="Listhead">
                <span class="left">{{$t('ekd.number')}}</span>
                <span class="center">{{$t('ekd.account')}}</span>
                <span class="right">{{$t('ekd.amount')}}</span>
              </div>
              <ul class="platformList">
                <li v-for="(item,i) in list" :key="i" class="platformListli">
                  <span class="left">{{item.ranking}}</span>
                  <span class="center">{{item.holding_account}}</span>
                  <span class="right" style="color:#ED5473;">{{parseFloat(item.amount).toFixed(2)}}</span>
                </li>
                <div
                  v-if="platformList.length === 0"
                  style="text-align:center; padding:10px 0;"
                >{{$t('ekd.noData')}}</div>
              </ul>
            </div>
            <div class="swiperMask"></div>
          </div>
          <!-- 第二轮播------------------------------- -->
          <div class="swiper-slide slide2">
            <nav class="slide2Top">
              <div
                :class="shareSlide2==false?'shareTop_Input':'shareTop_Uninput'"
                @click="changeShareSlide2Two"
              >{{$t('ekd.bonus')}}</div>
              <div
                :class="shareSlide2==true?'shareTop_Input':'shareTop_Uninput'"
                @click="changeShareSlide2One"
              >{{$t('ekd.Distributionrecord')}}</div>
            </nav>
            <!-- 分红池 -->
            <div v-show="shareSlide2==false" class="slide2Content1">
              <div class="slide2Content1Top">
                <p>{{$t('ekd.BonusPoolAward')}}</p>
                <p>{{data.dividendsEntity.dividendsTotal}}</p>
                <p>EOS</p>
              </div>
              <div class="slide2Content1Center">
                <p>{{$t('ekd.pdekd')}}</p>
                <p>
                  {{this.data.dividendsEntity.profit}}
                  <span>EOS</span>
                  <img draggable="false" src="../../assets/images/share_out/ico.png" alt>
                </p>
              </div>
              <div class="slide2Content1Bottom">
                <p>{{$t('ekd.peeth')}}</p>
                <p>
                  {{this.data.dividendsEntity.curretDividend}}
                  <span>EOS</span>
                  <img draggable="false" src="../../assets/images/share_out/ico.png" alt>
                </p>
                <img draggable="false"
                  @click="changeShareRule1"
                  class="slide2Content1BottomImg"
                  src="../../assets/images/share_out/ico2.png"
                  alt
                >
              <div class="dibu" style="display:none">
                <img draggable="false" src="@/assets/images/share_out/eoslogo.png" alt>
                <span class='con6_last'>{{this.notEosTotal}}&nbsp;</span>
                <div class="receive" >
                  <img draggable="false" @click="Dividendsreceived" style="cursor:pointer;" :src="$t('lingqu')">
                </div>
              </div>
              </div>
            </div>
            <!-- 分红记录 -->
            <div v-show="shareSlide2" class="slide2Content2">
              <div class="slide2Content2Top">
                <div style="font-size:1.4rem">
                  {{eosTotal}}
                  <span>EOS</span>
                </div>
                <p>{{$t('ekd.dividendrecord')}} </p>
              </div>
              <div class="slide2Content2Center">
                <img draggable="false" @click="platBackoff" src="../../assets/images/share_out/left.png" alt>
                <span>{{platformDay}}</span>
                <img draggable="false" @click="platForward" src="../../assets/images/share_out/right.png" alt>
                <span class="worldTime">UTC+08:00</span>
              </div>
              <div class="slide2Content2Bottom">
                <ul class="platformList">
                  <li v-show="showAllList==true" v-for="(item,i) in platformList" :key="i" class="platformListli">
                    <span class="left">{{item.dividendsInterval}}</span>
                    <span class="right" style="color:#ED5473;">{{item.dividendsEosTotal}}</span>
                  </li>
                  <div
                     v-show="showAllList==false"
                    style="text-align:center; padding:10px 0;"
                  >{{$t('ekd.noData')}}</div>
                </ul>
              </div>
            </div>
            <div class="swiperMask"></div>
          </div>
          <!-- 第三轮播------------------------------- -->
          <div class="swiper-slide slide3">
            <nav class="slide3Top">
              <div>{{$t('ekd.quotations')}}</div>
            </nav>
            <div class="slide3Content3">
              <div class="slide3Content3Top">
                <a href="https://newdex.vip/trade/ekdtokenbank-ekd-eos" target="blank"><exchange v-on:ekdusdt="calekdusdt"></exchange></a>
              </div>
              <div class="slide3Content3Bottom">
                <div class="bottom3div1">
                  EKD/EOS
                  <span>{{EKDbili}}</span>
                </div>
                <div class="bottom3div2">
                  EKD/USDT
                  <span>{{EKDbili2}}</span>
                </div>
              </div>
            </div>
            <div class="swiperMask"></div>
          </div>
        </div>
      </div>
      <div @click="changeShareRule" v-show="share_rule" class="share_rule"></div>
      <img draggable="false"
        @click="changeShareRule"
        v-show="share_rule"
        class="share_ruleImg"
        :src="$t('shareRule')"
        alt
      >
    </div>
    <div class="shareCenter">
      <div class="shareCenterPadd">
        <div class="jilu centerImg">
          <img draggable="false" @click="changejiluState1" :src="$t('jiluImg')" alt>
        </div>
        <div class="shuhui centerImg">
          <img draggable="false" @click="changeshuhuiState1" :src="$t('shuhuiImg')" alt>
        </div>
        <div class="zhiyaImg centerImg">
          <img draggable="false" @click="changezhiyaState1" :src="$t('zhiyaImg')" alt>
        </div>
        <div
          class="baifen"
        >{{Number(parseFloat((this.alreadypledged / this.data.dividendsEntity.pledgeTotal)*100).toFixed(4).slice(0,-2))}}%</div>
        <div class="zhiya">
          <p>
            <span>{{$t('ekd.Staked')}}</span>
          </p>
          <p>
            {{this.alreadypledged}}
            <span>EKD</span>
          </p>
        </div>
      </div>
    </div>
    <footer class="shareBot">
      <p>copyright © 2019 EOSKINGDOM. All Rights Reserved</p>
    </footer>
    <!-- 质押弹框状态 -->
    <div
      class="showzhiya mask"
      v-show="zhiyaState==true"
      @click="changezhiyaState2"
      @mousewheel.prevent
      @touchmove.prevent
    ></div>
    <div class="showzhiyaContent" v-show="zhiyaState==true">
      <nav class="top">
        <span>
          {{this.Mortgable}}&nbsp;
          <span>EKD</span>
        </span>
        <img draggable="false"
          class="showzhiyaContentTopCancle"
          @click="changezhiyaState2"
          src="../../assets/images/share_out/cancel.png"
          alt
        >
      </nav>
      <div class="centerinput">
        <div class="centerInputDiv">
          <div class="inputOne">
            <img draggable="false" src="../../assets/images/share_out/ekdlogo.png" alt>
          </div>
          <input type="number" class="inputTwo" v-model="EKDamount" @input="checkPledge">
          <div class="inputThree" @click="pledgeAll">
            <img draggable="false" :src="$t('share_outAll')" alt>
          </div>
        </div>
      </div>
      <div class="centerbtn">
        <img draggable="false" :src="$t('zhiyaImg')" alt @click="mortgage">
      </div>
      <footer class="bottom">
        <div class="bottomOne">
          <span class="spanAll">
            <span>{{this.redeemabletime}}</span>
            <span>{{this.redeemable}} EKD {{$t('ekd.Unstaking')}}</span>
          </span>
          <div class="bottomImg" @click="repledge">
            <img draggable="false" :src="$t('rezhiya')">
          </div>
        </div>
      </footer>
    </div>
    <!-- 赎回弹框状态 -->
    <div
      class="showshuhui mask"
      v-show="shuhuiState==true"
      @click="changeshuhuiState2"
      @mousewheel.prevent
      @touchmove.prevent
    ></div>
    <div class="showshuhuiContent" v-show="shuhuiState==true">
      <nav class="top">
        <span>
          {{this.Redemptionamount}}&nbsp;
          <span>EKD</span>
        </span>
        <img draggable="false"
          class="showshuhuiContentTopCancle"
          @click="changeshuhuiState2"
          src="../../assets/images/share_out/cancel.png"
          alt
        >
      </nav>
      <div class="centerinput">
        <div class="centerInputDiv">
          <div class="inputOne">
            <img draggable="false" src="../../assets/images/share_out/ekdlogo.png" alt>
          </div>
          <input type="number" v-model="EKDredeem" @input="checkRedeem" class="inputTwo">
          <div class="inputThree" @click="RedeemAll">
            <img draggable="false" :src="$t('share_outAll')" alt>
          </div>
        </div>
      </div>
      <div class="centerbtn">
        <img draggable="false" :src="$t('shuhuiImg')" alt @click="redeem">
      </div>
      <footer class="bottom">
        <div class="bottomOne" style="display:none">
          <span class="spanAll">
            <span>{{this.redeemabletime}}</span>
            <span>{{this.redeemable}} EKD {{$t('ekd.Unstaking')}}</span>
          </span>
          <div class="bottomImg">
            <img draggable="false" :src="$t('rezhiya')" @click="repledge">
          </div>
        </div>
        <p>{{$t('ekd.Unstakingmsg')}}</p>
      </footer>
    </div>
    <!-- 记录弹框状态 -->
    <div
      class="showjilu mask"
      v-show="jiluState==true"
      @click="changejiluState2"
      @mousewheel.prevent
      @touchmove.prevent
    ></div>
    <div class="showjiluContent" v-show="jiluState==true">
      <div class="showjiluContentTop">
        <div>
          {{this.dividends_total}}
          <span>EOS</span>
        </div>
        <p>{{$t('ekd.cumulative')}}</p>
        <img draggable="false"
          class="showjiluContentTopCancle"
          @click="changejiluState2"
          src="../../assets/images/share_out/cancel.png"
          alt
        >
      </div>
      <div class="showjiluContentCenter">
        <img draggable="false" @click="Backoff" src="../../assets/images/share_out/left.png" alt>
        <span>{{this.fenhongList1[0].createTime.replace(/\./g, "-")}}</span>
        <img draggable="false" @click="Forward" src="../../assets/images/share_out/right.png" alt>
      </div>
      <div class="showjiluContentBottom">
        <ul class="platformList">
          <li v-show="showOneList==true" v-for="(item,i) in fenhongList1" :key="i" class="platformListli">
            <span class="left">{{item.grantTime}}</span>
            <span class="right" style="color:#ED5473;">{{item.thisEosAmount}}</span>
          </li>
          <div v-show="showOneList==false" style="text-align:center; padding:10px 0;">{{$t('ekd.noData')}}</div>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from '../layout/Nav'

import "@/assets/css/share_out.css";

import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import Eos from "eosjs";
import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs";
import Service from "@/assets/js/scatterservice.js";
// import config from "@/assets/js/scatterconfig.js";
import EosTab from "@/assets/js/EosTab";
import bgconn from "@/assets/js/bgconn.js";
import exchange from "@/components/page/exchange"
export default {
  components:{Nav,exchange},
  props: ["title"],
  inject: ["reload"],
  data() {
    return {
      actStartTime1: "2019-5-5 10:00:00 UTC", //开始时间
      actchangeTime1:'2019-5-22 15:53:00 UTC',//变化时间
      actEndTime1: "2019-5-22 16:00:00 UTC", //结束时间
       // 分红状态
      showChangeFenhong:false,
      // 分红池轮播内状态1
      shareSlide1: false,
      // 分红池轮播内状态2
      shareSlide2: false,
      // 分红池轮播内状态3
      shareSlide3: false,
      // 质押弹框状态
      zhiyaState: false,
      _this_:this,
      // 赎回弹框状态
      shuhuiState: false,
      // 记录弹框状态
      jiluState: false,
      // 分红池轮播变量
      share_state: window.screen.width / 5,
      // 分红池规则显示状态
      share_rule: false,
      // 个人记录显示隐藏
      showOneList:true,
      // 平台记录显示隐藏
      showAllList:true,
      // 分红池登录状态
      loginStyle:false,
      // 真实数据
      zhiyawin: false,
      shuhui: false,
      fenhong: false,
      sum_title: true,
      sort_title: false,
      // 分红池窗口
      bonusWin: true,
      platformWin: false,
      personalbonus: [],
      day: null,
      //EKD质押量
      EKDamount: 0,
      //EKD赎回量
      EKDredeem: 0,
      //已经质押的量
      alreadypledged: 0,
      //可赎回量
      Redemptionamount: 0,
      //账号EKD总量
      EKDtotal: "0 EOS",
      Ekd_total: 0,
      currentAccount: null,
      Mortgable: 0,
      surplusEKD: null,
      dividends_total: 0,
      //平台分红记录
      platformList: [],
      platformDay: null,
      //个人分红记录
      priviceList: [],
      priviceDay: null,
      content_height: { height: `820px` },
      traffic: "", //流量
      pledge: "", //质押
      dig: "", //挖矿
      scale: 1,
      currenttime: null,
      plattime: null,
      plats_total: 0,
      // 平台分红总量
      eosTotal:0,
      //未领取分红
      notEosTotal: 0,
      //当前时间
      nowtime: null,
      //百分比
      Percentage: 0,
      count: true,
      helpIntroduce: false, //帮助
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          keepShow: true
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
          background: "#ED5473"
        }
      },
      list: [],
      redeemable: 0,
      redeemabletime: "00:00:00",
      data: {
        msg: "成功",
        staking_balance_ekd: "",
        balance_ekd: "",
        dividendsEntity: {
          id: 0,
          dividendsTotal: "", //分红池EOS总量
          pledgeTotal: "", //质押量
          ekdIssuerTotal: "", //
          ekdCirculating: "", //每万份收益
          profit: "", //收益(不清楚)
          curretDividend: "", //三小时收益
          minedTotal: "", //
          minedCirculating: "", //挖矿量
          minedStage: "", //挖矿阶段
          minedScale: "", //挖矿比例
          updateTime: "" //更新时间
        }
      },
      childValue:null,
      fenhongList: [{
          account: "",
          thisEosAmount: "",
          thisEkdAmount: "",
          grantTime: "",
          createTime:""}],
      fenhongList1: [{
          account: "",
          thisEosAmount: "",
          thisEkdAmount: "",
          grantTime: "",
          createTime:""}],
          EKDbili:'0.000200',
          EKDbili2:'0.000159'
    };
  },
  watch: {
    childValue(accname){
      if(accname!=null){
        this.RedemptionCountdown()
        this.fenhongjulu();
        setTimeout(() => {
        this.alreadypledged=Math.floor(Service.AccuracycalculationOut(Service.EosAcc.alreadypledged)*100+0.0000001)/100
        }, 1000);
        $(".share_out .dibu").css("display", "block"); 
      }else{
        this.alreadypledged=Math.floor(Service.AccuracycalculationOut(Service.EosAcc.alreadypledged)*100+0.0000001)/100
      }
    },
  },
  methods: {
    // 获取登录状态
    childByValue(childValue){
      this.childValue=childValue;
    },
    // 分红池内部状态切换
    changeShareSlide1One() {
      this.shareSlide1 = true;
    },
    changeShareSlide1Two() {
      this.shareSlide1 = false;
    },
    changeShareSlide2One() {
      this.shareSlide2 = true;
    },
    changeShareSlide2Two() {
      this.shareSlide2 = false;
    },
    changeShareSlide3One() {
      this.shareSlide3 = true;
    },
    changeShareSlide3Two() {
      this.shareSlide3 = false;
    },
    // 质押状态变化
    changezhiyaState1() {
      this.RedemptionCountdown();
      this.Mortgable = Service.AccuracycalculationOut(Service.EosAcc.Mortgable);
      this.redeemable = Service.AccuracycalculationOut(
        Service.EosAcc.redeemable
      );
      if (sessionStorage.getItem("accountmsg") == null) {
          this.redeemable=0;
          $(".share_out .bottomOne").css("display", "none");  
        }
      if (this.redeemable == 0) {
        $(".share_out .bottomOne").css("display", "none");
      } else {
        $(".share_out .bottomOne").css("display", "block");
      }
      this.zhiyaState = true;
      this.EKDamount = 0;
    },
    changezhiyaState2() {
      this.Mortgable = Service.AccuracycalculationOut(Service.EosAcc.Mortgable);
      this.zhiyaState = false;
    },
    // 赎回状态变化
    changeshuhuiState1() {
      this.RedemptionCountdown();
      // if (sessionStorage.getItem("accountmsg") == null) {
      //   this.redeemable=0;
      //   $(".share_out .bottomOne").css("display", "none");
      // }else{
        this.Redemptionamount = Service.AccuracycalculationOut(
          Service.EosAcc.Redemptionamount
        );
        this.redeemable = Service.AccuracycalculationOut(
          Service.EosAcc.redeemable
        );
        if (sessionStorage.getItem("accountmsg") == null) {
          this.redeemable=0;
          $(".share_out .bottomOne").css("display", "none");  
        }
        if (this.redeemable == 0) {
          $(".share_out .bottomOne").css("display", "none");
        } else {
          $(".share_out .bottomOne").css("display", "block");
        }
        this.shuhuiState = true;
        this.EKDredeem = 0;
      // }
    },
    changeshuhuiState2() {
      this.shuhuiState = false;
    },
    // 记录状态变化
    changejiluState1() {
      this.jiluState = true;
      if (sessionStorage.getItem("accountmsg") == null) {
        this.dividends_total = 0;
        this.showOneList=false;
      } else {
        Service.getTableRows(EosTab.ABONUSACC, EosTab.ABONUSACC, EosTab.ABONUSSTAKE).then(
          data => {
            this.personalbonus = data;
          }
        );
     this.fenhongjulu();
      }
    },
    changejiluState2() {
      this.jiluState = false;
    },
    // 分红池规则相互切换显示
    changeShareRule() {
      this.share_rule = !this.share_rule;
    },
    // 分红池规则切换显示
    changeShareRule1() {
      this.share_rule = true;
    },

    // 数据获取方法
    //查询分红池
    async init() {
      var res = await this.$http.get(bgconn.BONUSPOOL,);
      var { status, data } = res;
      if (status === 200) {
        this.data = data;
        // 此处应为100亿，为了效果暂定一千万
        this.data.dividendsEntity.ekdCirculating = parseInt(
          (data.dividendsEntity.ekdCirculating / 10) * 10
        );
        this.data.dividendsEntity.pledgeTotal = parseInt(
          (data.dividendsEntity.pledgeTotal / 10) * 10
        );
        this.data.dividendsEntity.minedTotal = parseInt(
          (data.dividendsEntity.minedCirculating / 10) * 10
        );
        //计算流量通 长度
        var num = 10000000000; //总数
        var percentage = num / 100;
        this.traffic = this.data.dividendsEntity.ekdCirculating / percentage;
        this.pledge =
          (this.data.dividendsEntity.pledgeTotal /
            this.data.dividendsEntity.ekdCirculating) *
          100;
        this.dig = (this.data.dividendsEntity.minedTotal / percentage) * 2;
      }
    },
    // 截取可领取分红
    substrFenhong(num,n){
      let str = String(num);
      let index = str.indexOf(".");
      let str1 = str.substring(0,index+n+1);
      str1 = Number(str1);
      return str1;
    },
    async fenhongjulu() {
      if (sessionStorage.getItem("accountmsg") != null) {
        const account = JSON.parse(sessionStorage.getItem("accountmsg"))
          .currentAccount;
        var res = await this.$http.get(bgconn.PERSONALBONUS, {
          params: { account: account,createTime:this.fenhongList1[0].createTime }
        });
        if (res.data.dividendsUserEntity != null) {
          var { status, data } = res;
          this.dividends_total = res.data.dividendsUserEntity.dividendEosTotal;
          this.notEosTotal=Math.floor(res.data.dividendsUserEntity.notEosTotal*100000000+0.00001)/100000000;
          
          this.Accumulateddividends(res);
          
          if (res.data.page.list.length > 0) {
            this.fenhongList1 = [];
            this.fenhongList1 = res.data.page.list;
            this.fenhongList1 = data.page.list;
            this.priviceDay = data.page.list[0].dividendsTime;
            this.showOneList=true;
          }else{
            this.showOneList=false;
          }
        }
      }
    },
    changeTime(val){
      if(val<10&&val>=0){
        return "0"+val;
      }else{
        return val;
      }
    },
    // 时间国际化
    togetUTCtime(){
      var time = new Date();
      var year =time.getUTCFullYear();
      var month = time.getUTCMonth()+1;
      var day = time.getUTCDate();
      var hour = time.getUTCHours();
      var minute = time.getUTCMinutes();
      var second = time.getUTCSeconds();
        if(hour+8 >= 24){
          day = day+1;
          hour = hour+8-24;
          var testDay = 30;
          switch(month)
          {
          case 1:
          case 3:
          case 5:
          case 7:
          case 8:
          case 10:
          case 12:
            testDay = 31;
            break;
          case 2:
            {
              if(year%4 == 0){
                testDay = 29;
                break;
              }else{
                testDay = 28;
                break;
              }              
            }
            default:{
              testDay = 30;
              break;
            }
          }
        }else{
          hour = hour+8;
        }
        if(day > testDay){
          month++;
          day = 1;
          if(month > 12){
            month = 1;
            year++;
          }
        }
        return year+"/"+this.changeTime(month)+"/"+this.changeTime(day)+" "+this.changeTime(hour)+":"+this.changeTime(minute)+":"+this.changeTime(second);

    },
    // 分红平台数据
    async platformdata() {
        var toTime =this.togetUTCtime().slice(0,10);
      var res = await this.$http.get(bgconn.ABONUS,{
        params:{dividendsTime:toTime}
      });
      var { status, data } = res;
      if (status === 200) {
        this.eosTotal = 0;
        this.platformList = res.data.page.list;
        this.platformDay = res.data.page.list[0].dividendsTime;
        this.eosTotal=Math.floor(res.data.dividends_total.eosTotal*10000+0.00001)/10000
      }
      this.Platformbonus(res);
    },
    //平台分红记录后退
    async platBackoff() {
      const time = this.Timecalculation(0).replace(/\-/g, "/");
      var res = await this.$http.get(bgconn.ABONUS, {
        params: { dividendsTime: time }
      });
      var { status, data } = res;
      if (status === 200) {
        this.platformList = res.data.page.list;
        this.platformDay = res.data.page.list[0].dividendsTime;
      }
      this.Platformbonus(res);
    },
    //平台分红记录前进
    async platForward() {
      const time = this.Timecalculation(1).replace(/\-/g, "/");
      var res = await this.$http.get(bgconn.ABONUS, {
        params: { dividendsTime: time }
      });
      var { status, data } = res;
      if (status === 200) {
        this.platformList = res.data.page.list;
        this.platformDay = res.data.page.list[0].dividendsTime;
      }
      this.Platformbonus(res);
    },
    //个人分红记录前进
    async Forward() {
      const account = JSON.parse(sessionStorage.getItem("accountmsg"))
        .currentAccount;
      const time = this.Timecalculation1(1).replace(/\-/g, "/");
      var res = await this.$http.get(bgconn.PERSONALBONUS, {
        params: { account: account, createTime: time }
      });
      var { status, data } = res;
      this.Accumulateddividends(res)
      if (res.data.page.list.length > 0) {
        this.fenhongList1 = [];
        this.fenhongList1 = res.data.page.list;
        this.showOneList=true
      }else{
        this.showOneList=false
      }
    },
    //个人分红记录后退
    async Backoff() {
      const account = JSON.parse(sessionStorage.getItem("accountmsg"))
        .currentAccount;
      const time = this.Timecalculation1(0).replace(/\-/g, "/");
      var res = await this.$http.get(bgconn.PERSONALBONUS, {
        params: { account: account, createTime: time }
      });
      var { status, data } = res;
      if (res.data.page.list.length > 0) {
        this.fenhongList1 = [];
        this.fenhongList1 = res.data.page.list;
        this.showOneList=true
      }else{
        this.showOneList=false
      }
    },
    //点击赎回全部
    RedeemAll() {
      this.EKDredeem = this.Redemptionamount;
    },
    //排行榜
    async ranklist() {
      const result = await this.$http.get(bgconn.EKDPAIHANG);
      this.list = result.data.ekdRankingList;
    },
    // 质押量
    Formatdata(number) {
      var num = number.toString();
      var numArr = num.split(".");
      var [num, dotNum] = numArr;

      var operateNum = num.split("").reverse();
      var result = [],
        len = operateNum.length;
      for (var i = 0; i < len; i++) {
        result.push(operateNum[i]);
        if ((i + 1) % 3 === 0 && i !== len - 1) {
          result.push(", ");
        }
      }

      if (dotNum) {
        result.reverse().push(".", ...dotNum);
        return result.join("");
      } else {
        return result.reverse().join("");
      }
    },
    //个人累计分红
    Accumulateddividends(res) {
       this.dividends_total=0;
      this.notEosTotal=Math.floor(res.data.dividendsUserEntity.notEosTotal*100000000+0.00001)/100000000
      
      this.dividends_total= Math.floor(res.data.dividendsUserEntity.dividendEosTotal*100000000+res.data.dividendsUserEntity.notEosTotal*100000000+0.000001)/100000000
    },
    //平台累计分红
    Platformbonus(res) {
      this.plats_total = res.data.dividends_total.eosTotal;
    },
    //领取个人分红
    async Dividendsreceived() {
       var eostal= Math.floor(this.notEosTotal*10000+0.0000001)/10000
      this.acc = JSON.parse(sessionStorage.getItem("accountmsg"));
      Service.transaction(
        [{ account: EosTab.ABONUSACC, name: EosTab.DIVIDENDS }],
        [
          {
            from: this.acc.currentAccount
          }
        ]
      )
        .then(rs => {
          Service.EosAcc.transInfo
            .then(r => {
              var res = this.$http.get(bgconn.DIVIDENDSRECEIVED, {
                params: { account: account, eos_balance: eostal }
              });
              var { status, data } = res;
              this.notEosTotal =Math.floor(this.notEosTotal*100000000-eostal*100000000+0.000001)/100000000;
              if (status === 200) {
                this.fenhongjulu();
              }
              this.open(true);
            })
            .catch(error => {
              this.open(false);
            });
        })
        .catch(error => {
          this.open(false);
        });
      const account = JSON.parse(sessionStorage.getItem("accountmsg"))
        .currentAccount;
    },
    //时间计算
    Timecalculation(q) {
      var date = new Date(this.currenttime);
       if(q==1){
      date=new Date(date.getTime()+24*60*60*1000)
      if(date>new Date(this.togetUTCtime())){
        date=new Date(this.togetUTCtime())
      }
       }else{
         date=new Date(date.getTime()-24*60*60*1000)
          if(date<=(new Date('2019-05-22 16:00:00 UTC'.replace(/\-/g, "/")).getTime())){
            date=new Date('2019-05-22 16:00:00 UTC'.replace(/\-/g, "/"))
          }
       }
      
      this.currenttime=date;
      return date.getFullYear()+"/"+this.changeTime(date.getMonth()+1)+"/"+this.changeTime(date.getDate());
      
    },
    //时间计算
    Timecalculation1(q) {
      var date = new Date(this.plattime);
       if(q==1){
      date=new Date(date.getTime()+24*60*60*1000)
      if(date>new Date(this.togetUTCtime())){
        date=new Date(this.togetUTCtime())
      }
       }else{
          date=new Date(date.getTime()-24*60*60*1000)
          if(date<=(new Date('2019-05-22 16:00:00 UTC'.replace(/\-/g, "/")).getTime())){
            date=new Date('2019-05-22 16:00:00 UTC'.replace(/\-/g, "/"))
          }
       }
      this.plattime=date
      // if((date.getMonth()+1)>9){
      //   if(date.getUTCDate()<10){
      //   this.fenhongList1[0].createTime=date.getUTCFullYear()+'-'+(date.getMonth()+1)+'-0'+(date.getUTCDate())
      //   }else{
      //      this.fenhongList1[0].createTime=date.getUTCFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getUTCDate())
      //   }
      // }else{
      //    if(date.getUTCDate()<10){
      //   this.fenhongList1[0].createTime=date.getUTCFullYear()+'-0'+(date.getMonth()+1)+'-0'+(date.getUTCDate())
      //   }else{
      //      this.fenhongList1[0].createTime=date.getUTCFullYear()+'-0'+(date.getMonth()+1)+'-'+(date.getUTCDate())
      //   }
      // }
      this.fenhongList1[0].createTime=date.getFullYear()+"-"+this.changeTime(date.getMonth()+1)+"-"+this.changeTime(date.getDate())
      return this.fenhongList1[0].createTime;
    },
    // input框限制
    checkPledge() {
      if (this.EKDamount < 0) {
        this.EKDamount = 0;
        // this.pledgeStatus = true;
      } else if (this.EKDamount > this.Mortgable) {
        this.EKDamount = this.Mortgable;
      }
    },
    checkRedeem() {
      if (this.EKDredeem < 0) {
        this.EKDredeem = 0;
        // this.redeemStatus = true
      } else if (this.EKDredeem > this.Redemptionamount) {
        this.EKDredeem = this.Redemptionamount;
      }
    },
    //点击质押全部
    pledgeAll() {
      this.EKDamount = this.Mortgable;
      // alert('all')
    },
    scattalert2(content) {
      this.$alert(`<strong>${content}</strong>`, "", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "OK",
        showClose: false
      });
    },
    //抵押
    mortgage() {
      if (sessionStorage.getItem("accountmsg") == null) {
        //已经质押的量
        this.alreadypledged = 0;
        this.scattalert2(this.$t("ekd.scatter_login"));
      } else {
        this.acc = JSON.parse(sessionStorage.getItem("accountmsg"));
        Service.transaction(
          [{ account: EosTab.ABONUSACC, name: EosTab.ABONUSSTAKES }],
          [
            {
              from: this.acc.currentAccount,
              staked: `${parseFloat(this.EKDamount).toFixed(6)} EKD`
            }
          ]
        )
          .then(rs => {
            Service.EosAcc.transInfo
              .then(r => {
                let mort =
                  Service.EosAcc.Mortgable -
                  Service.AccuracycalculationIn(this.EKDamount);
                this.Mortgable = Service.AccuracycalculationOut(mort);
                let alrea =
                  Service.AccuracycalculationIn(this.alreadypledged) +
                  Service.AccuracycalculationIn(this.EKDamount);
                this.alreadypledged = Service.AccuracycalculationOut(
                  alrea
                ).toFixed(2);
                this.data.dividendsEntity.pledgeTotal = Math.floor(
                  Number(this.data.dividendsEntity.pledgeTotal) +
                    Number(this.EKDamount)
                );
                this.data.dividendsEntity.ekdCirculating = Math.floor(
                  Number(this.data.dividendsEntity.ekdCirculating) +
                    Number(this.EKDamount)
                );
                let alrea2 =
                  Service.AccuracycalculationIn(this.Redemptionamount) +
                  Service.AccuracycalculationIn(this.EKDamount);

                this.Redemptionamount = Service.AccuracycalculationOut(alrea2);
                Service.pledgerecord();
                this.EKDamount = 0;
                this.open(true);
              })
              .catch(error => {
                this.open(false);
              });
          })
          .catch(error => {
            this.open(false);
          });
      }
    },
    //赎回
    redeem() {
      if (sessionStorage.getItem("accountmsg") == null) {
        this.scattalert2(this.$t("ekd.scatter_login"));
      } else {
        this.acc = JSON.parse(sessionStorage.getItem("accountmsg"));
        Service.transaction(
          [{ account: EosTab.ABONUSACC, name: EosTab.ABONUSUNSTAKES }],
          [
            {
              from: this.acc.currentAccount,
              staked: `${parseFloat(this.EKDredeem).toFixed(6)} EKD`
            }
          ]
        )
          .then(rs => {
            Service.EosAcc.transInfo
              .then(r => {
                let red =
                  Service.AccuracycalculationIn(this.Redemptionamount) -
                  Service.AccuracycalculationIn(this.EKDredeem);
                this.Redemptionamount = Service.AccuracycalculationOut(red);
                this.redeemable = Service.AccuracycalculationOut(
                  Service.AccuracycalculationIn(this.redeemable) +
                    Service.AccuracycalculationIn(this.EKDredeem)
                );
                Service.pledgerecord();
                this.open(true);
                $(".share_out .bottomOne").css("display", "block");
                this.EKDredeem = 0;
              })
              .catch(error => {
                this.open(false);
                $(".share_out .bottomOne").css("display", "none");
              });
          })
          .catch(error => {
            this.open(false);
            $(".share_out .bottomOne").css("display", "none");
          });
      }
    },
    //获取账号余额
    getCurrencyBalance() {
      if (sessionStorage.getItem("accountmsg") != null) {
        Service.getCurrencyBalance().then(rs => {
          setTimeout(() => {
            this.EKDtotal = Service.EosAcc.accInfo;
            this.Mortgable =parseFloat(this.EKDtotal) - parseFloat(this.alreadypledged);
          }, 1500);
        });
      }
    },
    repledge() {
      this.acc = JSON.parse(sessionStorage.getItem("accountmsg"));
      Service.transaction(
        [{ account: EosTab.ABONUSACC, name: EosTab.RESTAKE }],
        [
          {
            from: this.acc.currentAccount
          }
        ]
      )
        .then(rs => {
          this.Redemptionamount =
            Math.floor(
              Service.AccuracycalculationOut(Service.EosAcc.alreadypledged) *
                100 +
                0.0000001
            ) / 100;
          this.redeemable = 0;
          Service.EosAcc.redeemable = 0;
          this.open(true);
          $(".share_out .bottomOne").css("display", "none");
        })
        .catch(error => {
          this.open(false);
          $(".share_out .bottomOne").css("display", "block");
        });
    },
    open(pd) {
      if (pd) {
        this.$message({
          dangerouslyUseHTMLString: true,
          message: "<strong></strong>",
          duration: 2000,
          customClass: "bgc1",
          iconClass: null
        });
      } else {
        this.$message({
          dangerouslyUseHTMLString: true,
          message: "<strong></strong>",
          duration: 2000,
          customClass: "bgc2",
          iconClass: null
        });
      }
      $(".hidebg").css("display", "block");
      $(".hidebg").css("height", `${document.body.clientHeight}px`);
      setTimeout(function() {
        $(".hidebg").css("display", "none");
      }, 2300);
    },
     async RedemptionCountdown(){
    setInterval(()=>{
        this.redeemabletime=((24*60*60)- parseInt((new Date().getTime()+new Date().getTimezoneOffset()*60000+8*3600*1000-new Date(Service.EosAcc.redeemabletime).getTime())/1000))
        if(this.redeemabletime<=60 && this.redeemabletime>=0){
            this.redeemabletime=`00:00:${parseInt(this.redeemabletime)}`
        }else if(this.redeemabletime>60 && this.redeemabletime<3600){
            this.redeemabletime=`00:${parseInt(this.redeemabletime/60)}:${parseInt(this.redeemabletime%60)}`
        }else if(this.redeemabletime>=3600){
          this.redeemabletime= `${parseInt(this.redeemabletime/3600)}:${parseInt(this.redeemabletime%3600/60)}:${parseInt(this.redeemabletime%60)}`
        }else{
          this.redeemabletime="00:00:00"
        }
        if (this.title==true) {
        clearInterval(timeId)
      }
   },1000)
   
},
countDown() {
      var interval = setInterval(() => {
        // 获取当前时间，同时得到活动结束时间数组
        let newTime = new Date(this.togetUTCtime()).getTime();
        // 设置变化时间
        let changeTime = new Date(this.actchangeTime1.replace(/-/g,'/')).getTime();
        // 对结束时间进行处理渲染到页面
        let endTime = new Date(this.actEndTime1.replace(/-/g,'/')).getTime();

        // 如果活动未结束，对时间进行处理
        if (endTime - newTime <= 0) {
          this.showChangeFenhong=true;
          this.fenhongjulu();
          clearInterval(interval);
        }
      }, 1000);
    },
    async calekdusdt(num,num2){
      this.EKDbili=num
      this.EKDbili2=parseFloat (num2*num).toFixed(6)
 }
  },

  // created样式之外
  created() {
      if (sessionStorage.getItem("accountmsg") == null) {
        this.alreadypledged = 0;
        this.notEosTotal = 0;
      } else {
        this.childByValue(JSON.parse(sessionStorage.getItem('accountmsg')).currentAccount)
        this.alreadypledged =Math.floor( Service.AccuracycalculationOut(Service.EosAcc.alreadypledged) *100 +0.0000001) / 100;
        Service.pledgerecord();
        this.fenhongjulu();
        $(".share_out .dibu").css("display", "block"); 
      }
    this.init();
    setInterval(()  => {
     this.init();
    },60000);

    //个人分红
    this.fenhongjulu()
    //平台分红记录
    this.platformdata()
    //可赎回的EKD数量
    this.Redemptionamount = Service.AccuracycalculationOut(Service.EosAcc.Redemptionamount);
    //可质押的EKD 数量
    this.Mortgable = Service.AccuracycalculationOut(Service.EosAcc.Mortgable);
    //重新质押的EKD数量
    this.redeemable = Service.AccuracycalculationOut(Service.EosAcc.redeemable);
    this.nowtime = new Date();
    this.currenttime = new Date(this.togetUTCtime());
    this.plattime = new Date(this.togetUTCtime());
    this.ranklist();
    this.countDown()
  },

  mounted() {

    // 分红池轮播
    var swiper = new Swiper(".swiper-container2", {
      effect: "coverflow",
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      initialSlide: 1,
      coverflowEffect: {
        rotate: 0,
        stretch: this.share_state,
        depth: 100,
        modifier: 2,
        slideShadows: false
      },
      on: {
        sliderMove: function() {
          $(".swiper-slide .swiperMask").removeClass("UnswiperMask");
          $(".swiper-slide-active .swiperMask").addClass("UnswiperMask");
        },
        transitionEnd: function() {
          $(".swiper-slide .swiperMask").removeClass("UnswiperMask");
          $(".swiper-slide-active .swiperMask").addClass("UnswiperMask");
        },
        slideChangeTransitionStart: function() {
          $(".swiper-slide .swiperMask").removeClass("UnswiperMask");
          $(".swiper-slide-active .swiperMask").addClass("UnswiperMask");
        }
      }
    });
  }
};
</script>
<style>
</style>
