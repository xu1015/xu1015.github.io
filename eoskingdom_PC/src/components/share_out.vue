<template>
  <div class="share_out" >
    <Nav v-on:childByValue="childByValue"></Nav>
    <div class="content " :style="[content_height]">
      <div class="zoom_width zoom_content" :style="zoom_content">
          <div class="  bottomDistance" >
            <div class="count">
              <div class="title">
                <div class="sum title1_bg" @click="sum_titleF">{{$t('ekd.statistics')}}</div>
                <div class="sort" @click="sort_titleF">{{$t('ekd.rankinglist')}}</div>
              </div>
              <div v-if="sum_title">
                <ul class="clearfix">
                  <li>
                    <div style="float:left;text-align:center;width:100%;margin-top:12px;font-weight:1000;color:#ED5473;"></div>
                    <div class="row">
                      
                      <span class="span1">{{$t('ekd.circulation')}}</span>
                      <span class="press">
                      <!-- <div class="alreadypre"> -->
                        <div v-bind:style="{width:traffic + '%'}" class="alreadypre" ><span style="float:left;background:red;"></span></div>
                        <!-- {{data.dividendsEntity.ekdCirculating}} -->
                        <!-- </div> -->
                        <span style="float:right;font-weight:1000;position: relative;top:2px;left:-60px;">{{this.Formatdata(this.data.dividendsEntity.ekdCirculating)}}</span>
                    </span>
                      <span class="total">{{ Math.floor((Number(this.data.dividendsEntity.ekdCirculating)/10000000000)*10000)/100}}%</span>
                    </div>
                    <p style="font-size:13px;font-weight:1000;">Total: 10,&nbsp;000,&nbsp;000,&nbsp;000</p>
                  </li>
                  <li>
                     <div style="float:left;text-align:center;width:100%;margin-top:12px;font-weight:1000;color:#ED5473;"></div>
                    <div class="row">
                      <span class="span1">{{$t('ekd.cmountofpledge')}}</span>
                      <span class="press">
                      <div v-bind:style="{width: pledge + '%'}" class="alreadypre"></div>
                        <span style="float:right;font-weight:1000;position: relative;top:2px; left:-60px;">{{this.Formatdata(this.data.dividendsEntity.pledgeTotal)}}</span>
                    </span>
                      <span class="total" >{{ Math.floor((Number(this.data.dividendsEntity.pledgeTotal)/(this.data.dividendsEntity.ekdCirculating))*10000)/100}}%</span>
                    </div>
                    <p style="font-size:13px;font-weight:1000;">Total: {{ this.Formatdata((this.data.dividendsEntity.ekdCirculating))}}</p>
                  </li>
                  <li>
                     <div style="float:left;text-align:center;width:100%;margin-top:12px;color:#515a7c;font-weight:1000;color:#ED5473;"></div>
                    <div class="row">
                      <span class="span1">{{$t('ekd.mining')}}</span>
                      <span class="press">
                      <div v-bind:style="{width: dig + '%'}" class="alreadypre"></div>
                      <span  style="float:right;font-weight:1000;position: relative;top:2px;left:-60px;">{{this.Formatdata(this.data.dividendsEntity.minedTotal)}}</span>
                    </span>
                      <span class="total">{{ Math.floor((Number(this.data.dividendsEntity.minedTotal)/5000000000)*10000)/100}}%</span>
                    </div>
                    <p style="font-size:13px;font-weight:1000;">Total: 5,&nbsp;000,&nbsp;000,&nbsp;000</p>
                  </li>
                </ul>
                <div class="jieduan">{{$t('ekd.stageone')}} 1:{{data.dividendsEntity.minedScale}}</div>
              </div>
              <div v-if="sort_title">
                           <div ><div style="width:23%;float:left;padding-left:20px; font-weight:600;padding-top:2%;">{{$t('ekd.number')}}</div>
                <div style="width:27%;text-align:left;float:left;font-weight:600;padding-top:2%;">{{$t('ekd.account')}}</div><div style="width:33%;text-align:left;float:left;padding-left:30px;font-weight:600;padding-top:2%;">EKD{{$t('ekd.amount')}}</div></div>
          <div style="height:300px;padding-top:30px;">
        <vue-scroll :ops="ops" style="width:100%;height:290px;">
                    <ul class='your-content'>
                      <li v-for="(item,i) in list" :key="i" style="border-top:1px solid #d8d8d8;height:30px;">
                        <div style="width:23%;float:left;padding-top:2%;margin-left:5%;font-weight:1000;">{{item.ranking}}</div>
                          <div style="float:left;width:33%;float:left;padding-top:2%;margin-left:-14%;font-weight:1000;">{{item.holding_account}}</div>
                          <div style="width:30%;float:left;padding-top:2%;font-weight:1000;text-align:right;">{{parseFloat(item.amount).toFixed(2)}}&nbsp;</div>
                           <div style="width:10%;float:right;padding-top:2%;font-weight:1000;  position: relative;left:-17px;">{{ Math.floor((Number(item.amount)/10000000000)*10000)/100}}%</div>
                        </li>
                    </ul>
            </vue-scroll>
          </div>
              </div>
            </div>
          </div>
          <div class="bottomDistance">
            <div class="fenhong">
              <div class="title">
                <div class="title1 title1_bg"  @click="bonusPool">{{$t('ekd.bonus')}}</div>
                <div class="title2"  @click="platformclick">{{$t('ekd.Distributionrecord')}}</div>
              </div>
              <!-- 点击分红池 -->
              <div class="fhVContent"  v-if="bonusWin">
                <div class="con1">
                  <p>{{$t('ekd.BonusPoolAward')}}</p>
                  <div class="total">
                    <span class="span1">{{ data.dividendsEntity.dividendsTotal}}</span>
                  </div>
                  <div class="eos">
                   <img draggable="false" src="@/assets/images/share_out/eoslogo.png" alt>
                      <span style="position: absolute;top: 8px;margin-left: 5px">EOS</span>
                  </div>
                </div>
                <div class="con2">
                  <p>{{$t('ekd.pdekd')}}</p>
                  <h3>
                     {{this.data.dividendsEntity.profit}}
                    <span>EOS&nbsp;&nbsp;</span>
                    <span>
                      <img draggable="false" src="@/assets/images/share_out/ico.png" alt>
                    </span>
                  </h3>
                </div>
                <div class="con3">
                  <p>{{$t('ekd.peeth')}}</p>
                  <h3>
                    {{this.data.dividendsEntity.curretDividend}}
                    <span>EOS&nbsp;&nbsp;</span>
                    <span>
                      <img draggable="false" src="@/assets/images/share_out/ico.png" alt>
                    </span>
                  </h3>
                  
                  <div class="dibu" >
                    <span><img draggable="false" src="@/assets/images/share_out/eoslogo.png" alt style=" opacity:0.7;width:10%;heght:10%;float:left;padding-top: 2%;"></span>
                    <span class='con6_last' style="text-align:left;">{{this.notEosTotal}}&nbsp;<span style="color:#64a645;"></span></span>
                    <span class="rt"></span>
                    <div class="receive" @click="Dividendsreceived">
                      <img draggable="false" style="cursor:pointer;"   :src="$t('lingquko')">
                    </div>
                  </div>
                   
               <div class="help" style="position: absolute;top:74%;">
                  <img draggable="false" src="@/assets/images/share_out/ico2.png" @mouseenter="enter()" @mouseleave="leave()" style="cursor:help" >
                  <div class="help_introduce" v-if="helpIntroduce === true">

                   <img draggable="false"  style="cursor:pointer;"  :src="$t('fenhongguize')">
                  </div>
                </div>
                </div>
            
              </div>
              <!-- 点击分红记录 -->
              <div class="fhVContent latformBonus" v-if="platformWin">
                  <div class="platformBonus">
                    <div class="tit">

                    </div>
                    <div class="tit2 tit2_bg2">
                      <!-- {{eosTotal}} -->
                      <label style="color:white">{{this.eosTotal}}</label> EOS
                    </div>
                    <div class="tit3" style="font-weight:1000;">{{$t('ekd.dividendrecord')}}</div>
                    <div >
                      <div style="background:rgb(236, 236, 236);width:100%;position:relative;">
                        <div class="platformpage"  style="padding-top:13px;">
                        <img draggable="false" src="@/assets/images/share_out/left.png" style="float:left; cursor:pointer;"  @click="platBackoff">
                        <span style="float:left;margin: 4px 15px 0;font-weight:1000;">{{platformDay}}</span>
                        <img draggable="false" src="@/assets/images/share_out/right.png" style="cursor:pointer;" @click="platForward">
                        <span class="worldTime">UTC+08:00</span>
                      </div>
                      </div>
                      <ul class="platformList">
                        <li v-show="showAllList==true" v-for="(item,i) in platformList" :key="i" class="clearfix">
                          <span class="left">{{item.dividendsInterval}}</span>
                                                                  <!-- {{item.dividendsEosTotal}} -->
                          <span class="right" style="color:#ED5473;">{{item.dividendsEosTotal}}</span>
                        </li>
                        <div v-show="showAllList==false" style="text-align:center; padding:10px 0;" >{{$t('ekd.noData')}}</div>
                      </ul>
                    </div>
                  </div>
              </div>
                  
        
            </div>
          </div>
          <div class="  bottomDistance">
            <div class="echars">
              <div class="title">{{$t('ekd.quotations')}}</div>
              <div class="echars1">
               <a href="https://newdex.vip/trade/ekdtokenbank-ekd-eos" target="blank"><exchange v-on:ekdusdt="calekdusdt"></exchange></a>
              </div>
              <div class="bottom">
                <div class="eosvalue">
                  EKD/EOS
                  <span>{{this.EKDbili}}</span>
                </div>
                <div class="usdtvalue">
                  EKD/USDT
                  <span>{{this.EKDbili2}}</span>
                </div>
              </div>
            </div>
          </div>
        <!-- 质押/赎回 -->
        <div class="zhiya ">
          <div class="ekd ">
            <p class="kingdom">Staked</p>
            <p class="total">
              {{this.alreadypledged}}
              <span>EKD</span>
            </p>
            
          </div>

          <div class="jilu " @click="fenhongClick">
            <div class="sd_button button_jilu" >
              <img draggable="false" :src="$t('jiluko')">
            </div>
          </div>
          <!-- 个人分红记录 -->

          <div class="shu  " @click="shuhuiClick()">
            <div class="sd_button button_shu" style="margin: 0 auto;cursor:pointer;" >
              <img draggable="false" :src="$t('shuhuiko')">
            </div>
          </div>
          <Modal
            :closable='false'
            :width="700"
            class-name="vertical-center-modal"
            v-model="fenhong">
            <div class="participation_window_con">
              <div class="tit">
                <div class="tit2 bg2">
                  <!-- {{dividends_total}} -->
                  <label>{{this.dividends_total}}</label>EOS
                </div>
                <div class="btn" @click="fenhongCancel">
                  <img draggable="false" src="@/assets/images/share_out/cancel.png">
                </div>
              </div>


              <div class="tit3" style="font-weight:1000;color:#515a6e; color:rgba(81, 90, 110, 0.87);">  {{$t('ekd.cumulative')}}</div>

              <div class="lists">
                <div class="select_date">
                  <img draggable="false" src="@/assets/images/share_out/left.png"  style="cursor:pointer;" @click="Backoff">
                  <span style="font-weight:1000; color:#515a6ebd;">{{this.fenhongList1[0].createTime}}</span>
                  <img draggable="false" src="@/assets/images/share_out/right.png"  style="cursor:pointer;" @click="Forward">
                </div>
                <ul>
                  <li v-show="showOneList==true" v-for="(item,i) in fenhongList1" :key="i">
                    <span class="left">{{item.grantTime}}</span>
                                                              <!-- {{item.thisEosAmount}} -->
                    <span class="right" style="color:#ED5473;">{{item.thisEosAmount}}</span>
                  </li>
         
                  <li v-show="showOneList==false" style="text-align:center">{{$t('ekd.noData')}}</li>
                </ul>
              </div>
            </div>

            <div slot="footer">
            </div>
          </Modal>
          <!-- 赎回窗口 -->
          <Modal
            :closable='false'
            :width="801"
            class-name="vertical-center-modal"
            v-model="shuhui">
            <div class="pledge_and_redeem_con">
              <div class="tit">
                <span>
                  <label data-bind="text:myEkdStaking">{{this.Redemptionamount}}</label>
                   <span style="font-size: 20px;margin-left: 5px;">EKD</span>
                </span>
                <div class="btn" @click="shuhuiCancel">
                  <img draggable="false" src="@/assets/images/share_out/cancel.png">
                </div>
              </div>
              <div class="ipt">
                <div class="input_img">
                  <div class="logo" ><img draggable="false" src="@/assets/images/share_out/ekdlogo.png"></div>
                </div>
                <input type="number" v-model="EKDredeem"  @input="checkRedeem">
                <div class="btn" @click="RedeemAll">
                <img draggable="false" :src="$t('quanbuko')">
                </div>
              </div>
              <div class="opt">
                 <div class="sd_button button_shu" style="margin: 0 auto;cursor:pointer;" @click="redeem">
                   <img draggable="false" :src="$t('shuhuiko')">
            </div>
               
              </div>
              <div class="shan">
              
              <span style="margin-top:10px;float:left;padding-left:35%;">
                <time style="color: rgb(238, 79, 107);font-size: 1.2em;font-weight: bold;">{{this.redeemabletime}}</time>
                <span>{{this.redeemable}} EKD {{$t('ekd.Unstaking')}}</span>
                <img draggable="false" src="" alt="">
              </span>
             
                <span style="position: relative;top:-3px;left:-73px;"><img draggable="false" style="cursor:pointer;"  :src="$t('chongxinzhiya')" @click="repledge"></span>
        
            </div>
              <p class="shanP">{{$t('ekd.Unstakingmsg')}}</p>
              <div>
                </div>
            </div>
            <div slot="footer"></div>
          </Modal>
          <div class="zhi " @click="zhiyaClick()">
            <div class="sd_button button_zhi">
              <img draggable="false" :src="$t('zhiyako')">
            </div>
           
          </div>
          <!--EDK百分比-->
          <div class="baifen">{{Number(parseFloat((this.alreadypledged / this.data.dividendsEntity.pledgeTotal)*100).toFixed(4).slice(0,-2))}}%</div>
          <!-- 质押窗口 -->
          <Modal
            :closable='false'
            :width="801"
            class-name="vertical-center-modal"
            v-model="zhiyawin">
            <div class="pledge_and_redeem_window" id="window_pledge" >
              <div class="pledge_and_redeem_con">
                <div class="tit">
                <span class="title">
                  <label data-bind="text:myEkdBalance">{{this.Mortgable}} </label>
                  <span style="font-size: 20px;margin-left: 5px;">EKD</span>
                </span>
                  <div class="btn" @click="cancelzhiya">
                    <img draggable="false" src="@/assets/images/share_out/cancel.png">
                  </div>
                  
                </div>
                <div class="ipt">
                  <!-- ipt_pledge-->
                  <div class="input_img">
                   <div class="logo" ><img draggable="false" src="@/assets/images/share_out/ekdlogo.png"></div>
                  </div>
                  <input type="number" v-model="EKDamount" @input="checkPledge">
                  <div class="btn" @click="pledgeAll">
                      <img draggable="false" :src="$t('quanbuko')">
                  </div>
                </div>
                <div class="opt">
                 <div class="sd_button button_zhi" style="margin: 0 auto;cursor:pointer;" @click="mortgage">
                   <img draggable="false" :src="$t('zhiyako')">
                  </div>
                </div>
              </div>
              <div class="cxzy">
               <span style="float:left;padding-left:25%;padding-top:11px;"><span style="color:#ED5473;font-size:18px;">{{this.redeemabletime}}</span>  <span style="margin-left:15px;font-size:18px;text-align: left;"> {{this.redeemable}}&nbsp;EKD&nbsp;{{$t('ekd.Unstaking')}}</span></span><div class="Repledge2" @click="repledge">
                 <img draggable="false" style="cursor:pointer;" :src="$t('chongxinzhiya')">
               </div>
               </div>
            </div>
            <div slot="footer">
            </div>
          </Modal>
        </div>
      </div>
    </div>
    <foot></foot>
     <div class="hidebginfo">
     </div>
     <div class="tankuang" v-show="share_outMaskState==true&showtankuangImg==false" @click="changeshare_outMaskState">
      <div>
        <img draggable="false" :src="$t('share_outMask')" alt="">
        <img draggable="false" src="@/assets/images/share_out/cancel.png">
      </div>
     </div>
      <email></email>
  </div>
</template>
<script>
import Nav from "@/components/layout/nav";
import foot from "@/components/layout/foot";
import exchange from "@/components/exchange"
import email from '@/components/email'
import "@/assets/css/common.css";
import "@/assets/css/share_out.css";
import "@/assets/css/nav.css";
import "@/assets/css/foot.css";
import ScatterJS from '@scatterjs/core';
import ScatterEOS from '@scatterjs/eosjs2';
import {JsonRpc, Api} from 'eosjs';
import Service from "@/assets/js/scatterservice.js";
//import config from "@/assets/js/scatterconfig.js";
import EosTab from '@/assets/js/EosTab'
import bgconn from "@/assets/js/bgconn.js";
export default {
  components: { Nav, foot, exchange,email },
  name: "share_out",
  data() {
    return {
      zhiyawin: false,
      shuhui: false,
      fenhong: false,
      sum_title: true,
      sort_title: false,
      // 个人记录显示隐藏
      showOneList:true,
      // 平台记录显示隐藏
      showAllList:true,
      // 分红池弹框状态
      share_outMaskState:true,
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
      Redemptionamount:0,
      //账号EKD总量
      EKDtotal: '0 EOS',
      Ekd_total:0,
      currentAccount: null,
      Mortgable:0,
      surplusEKD:null,
      dividends_total:0,
      // 平台分红总量
      eosTotal:0,
      //平台分红记录
      platformList:[],
      platformDay: null,
      //个人分红记录
      priviceList:[],
      priviceDay: null,
      content_height: {'height':`820px`},
      traffic:'', //流量
      pledge:'', //质押
      dig:'', //挖矿
      scale:1,
      currenttime:null,
      plattime:null,
      plats_total:0,
      //未领取分红
      notEosTotal:0,
      //当前时间
      nowtime:null,
      //百分比
      Percentage:0,
      count:true,
      helpIntroduce:false, //帮助
       ops: {
                    vuescroll: {},
                    scrollPanel: {},
                    rail: {
                        keepShow:true
                    },
                    bar: {
                        hoverStyle: true,
                        onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
                       background: '#ED5473'
                    }
                },
      list:[
      ],
      redeemable:0,
      redeemabletime:"00:00:00",
      data: {
          'msg': '成功',
          'staking_balance_ekd': '',
          'balance_ekd': '',
          dividendsEntity: {
            'id': 0,
            'dividendsTotal': '',
            'pledgeTotal': '',
            'ekdIssuerTotal': '',
            'ekdCirculating': '',
            'profit': '',
            'curretDividend': '',
            'minedTotal': '',
            'minedCirculating': '',
            'minedStage': '',
            'minedScale': '',
            'updateTime': ''
          },
        },
        fenhongList: [{
        account:"",
        thisEosAmount:'',
        thisEkdAmount:"",
        grantTime:"",
        createTime:""}],
        fenhongList1: [{
        thisEosAmount:'',
        thisEkdAmount:"",
        grantTime:"",
        createTime:""}],
        childValue:null,
        showtankuangImg:false,
        EKDbili:0.0002,
        EKDbili2:0.00155
        
    }
  },
  created() {
  if(sessionStorage.getItem('accountmsg')!=null){
    var ix=0;    
    var dsq=setInterval(()=>{
      if(ix>20){
        clearInterval(dsq)
      }else{
        Service.pledgerecord();
        this.alreadypledged=Math.floor(Service.AccuracycalculationOut(Service.EosAcc.alreadypledged)*100+0.0000001)/100;
        this.Redemptionamount = Service.AccuracycalculationOut(Service.EosAcc.Redemptionamount)
        //可质押的EKD 数量
        this.Mortgable=Service.AccuracycalculationOut(Service.EosAcc.Mortgable)
        //重新质押的EKD数量
        this.redeemable=Service.AccuracycalculationOut(Service.EosAcc.redeemable)
        ix++;
      }
    },500)
    this.childByValue(JSON.parse(sessionStorage.getItem('accountmsg')).currentAccount)
  }
    this.init();
    setInterval(()  => {
     this.init();
    },60000);
//个人分红
this.showtankuangImg=true;
this.fenhongjulu()
//平台分红记录
this.platformdata()    
//可赎回的EKD数量
this.Redemptionamount = Service.AccuracycalculationOut(Service.EosAcc.Redemptionamount)
//可质押的EKD 数量
this.Mortgable=Service.AccuracycalculationOut(Service.EosAcc.Mortgable)
//重新质押的EKD数量
this.redeemable=Service.AccuracycalculationOut(Service.EosAcc.redeemable)
this.nowtime=new Date()
//this.Mortgable=Service.EosAcc.Mortgable
 this.currenttime=new Date(this.togetUTCtime());
 this.plattime=new Date(this.togetUTCtime());
 //ekd排行榜
 this.ranklist()
//  this.EKDprice()
  },
  watch:{
    childValue(accname){
      if(accname!=null){
         this.notEosTotal=0;
        $('.zhiya').css('display','block')
        $('.dibu').css('display','block')
        this.RedemptionCountdown()
        setTimeout(() => {
          this.alreadypledged=Math.floor(Service.AccuracycalculationOut(Service.EosAcc.alreadypledged)*100+0.0000001)/100
        }, 1000);
        this.fenhongjulu()
      }
    },
    bonusWin(bonusWin){
        if(bonusWin){
          $('.dibu').css('display','block')
        }
    }
  },
  methods: {
    childByValue(childValue){
        this.childValue=childValue;
    },
    changeshare_outMaskState(){
      this.share_outMaskState=false;
    },
      open(pd) {
      if(pd){
    this.$message({
              dangerouslyUseHTMLString: true,
              message: '<strong></strong>',
              duration:2000,
              iconClass:null
            });
      } else{
          this.$message({
              dangerouslyUseHTMLString: true,
              message: '<strong></strong>',
              duration:2000,
              customClass:"bgc2",
              iconClass:null
            });
      }
        $('.hidebg').css('display','block')
        $('.hidebg').css('height',`${document.body.clientHeight}px`)
        setTimeout(function(){ 
        $('.hidebg').css('display','none')
        }, 2300);
      },
    // 点击分红池
    bonusPool (){
      if(sessionStorage.getItem('accountmsg')!=null){
        setTimeout(() => {
        $('.dibu').css('display','block')
        }, 10);

      }
      this.bonusWin = true
      this.platformWin = false
       this.currenttime=new Date(this.togetUTCtime());
      $('.title2').removeClass('title1_bg')
      $('.title1').addClass('title1_bg')
    },
    platformclick (){
      this.platformWin = true
      this.bonusWin = false
      $('.title1').removeClass('title1_bg')
      $('.title2').addClass('title1_bg')
     this.platformdata()
    },
    //统计排行榜
    sum_titleF() {
      this.sum_title = true
      this.sort_title = false
      $('.sort').removeClass('title1_bg')
      $('.sum').addClass('title1_bg')
    },
    sort_titleF() {
      this.sort_title = true
      this.sum_title = false
      $('.sum').removeClass('title1_bg')
      $('.sort').addClass('title1_bg')
    },
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
          hour=hour+8-24
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
          hour=hour+8
      }
        if(day > testDay){
          month++;
          day = 1;
          if(month > 12){
            month = 1;
            year++;
          }
        }
        return year+"."+this.changeTime(month)+"."+this.changeTime(day)+" "+this.changeTime(hour)+":"+this.changeTime(minute)+":"+this.changeTime(second);
    },
    changeTime(val){
      if(val<10&&val>=0){
        return "0"+val;
      }else{
        return val;
      }
    },
    // 分红平台数据
    async platformdata (){
      var toTime =this.togetUTCtime().slice(0,10);
      var res = await this.$http.get(bgconn.ABONUS,{
        params:{dividendsTime:toTime}
      });
      var { status, data } = res;
      if (status === 200) {
        this.platformList = res.data.page.list;
        this.eosTotal=0;
         this.eosTotal=res.data.dividends_total.eosTotal
        this.platformDay = res.data.page.list[0].dividendsTime;  
      }
      this.Platformbonus(res)
    },
     //平台分红记录后退
    async platBackoff(){
      //const account= JSON.parse(sessionStorage.getItem('accountmsg')).currentAccount
      const time= this.Timecalculation(0).replace(/\-/g,"\.")
      
      var res = await this.$http.get(
        bgconn.ABONUS,{params:{dividendsTime:time}}
      );
      var { status, data } = res;
      if (status === 200) {
        this.platformList = res.data.page.list;
        this.platformDay = res.data.page.list[0].dividendsTime;
      }
      this.Platformbonus(res)
    },
    //平台分红记录前进
    async platForward(){
      const time= this.Timecalculation(1).replace(/\-/g,"\.")
      var res = await this.$http.get(
        bgconn.ABONUS,{params:{dividendsTime:time}}
      );
      var { status, data } = res;
      if (status === 200) {
        this.platformList = res.data.page.list;
        this.platformDay = res.data.page.list[0].dividendsTime;
      }
      this.Platformbonus(res)
    },
    //个人分红记录前进
    async Forward(){
      const account= JSON.parse(sessionStorage.getItem('accountmsg')).currentAccount

       const time= this.Timecalculation1(1).replace(/\-/g,"\.")
      var res = await this.$http.get(
        bgconn.PERSONALBONUS,{params:{account:account,createTime:time}}
      );
      var { status, data } = res;
     this.Accumulateddividends(res) 
      if(res.data.page.list.length>0){
          this.fenhongList1=[];
         this.fenhongList1=res.data.page.list;
          this.showOneList=true;
      }else{
        this.showOneList=false
      }
    },
     //个人分红记录后退
    async Backoff(){
      const account= JSON.parse(sessionStorage.getItem('accountmsg')).currentAccount
       const time=  this.Timecalculation1(0).replace(/\-/g,"\.")
      var res = await this.$http.get(
        bgconn.PERSONALBONUS,{params:{account:account,createTime:time}}
      );
      var { status, data } = res;
       if(res.data.page.list.length>0){
         this.fenhongList1=[];
         this.fenhongList1=res.data.page.list;
         this.showOneList=true;
      }else{
        this.showOneList=false;
      }
    },
    async fenhongjulu () {
      if(sessionStorage.getItem('accountmsg')!=null){
      const account= JSON.parse(sessionStorage.getItem('accountmsg')).currentAccount
      var res = await this.$http.get(
        bgconn.PERSONALBONUS,{params:{account:account,createTime:this.fenhongList1[0].createTime}}
      );
      if(res.data.dividendsUserEntity!=null){
      var { status, data } = res;
      this.dividends_total=res.data.dividendsUserEntity.dividendEosTotal
       //res.data.dividendsUserEntity.notEosTotal=0.0011999;
       if(res.data.dividendsUserEntity.notEosTotal>0){
        this.notEosTotal=Math.floor(res.data.dividendsUserEntity.notEosTotal*100000000+0.00001)/100000000;
       }
      this.Accumulateddividends(res)
      if(res.data.page.list.length>0){
        this.fenhongList1=[];
        this.fenhongList1=res.data.page.list
        this.fenhongList1 = data.page.list;
        this.priviceDay = data.page.list[0].dividendsTime;
         this.showOneList=true;
      }else{
            this.showOneList=false;
            this.notEosTotal=0;
          }
      }  
      }    
    },
        //点击赎回全部
    RedeemAll() {
       this.EKDredeem=this.Redemptionamount
    },
    checkPledge() {
      if (this.EKDamount < 0) {
        this.EKDamount = 0;
        // this.pledgeStatus = true;
      } else if (this.EKDamount > this.Mortgable) {
        this.EKDamount =  this.Mortgable
      }

    },
    checkRedeem(){
      if(this.EKDredeem < 0){
        this.EKDredeem  = 0
        // this.redeemStatus = true
      } else if ( this.EKDredeem > this.Redemptionamount){
        this.EKDredeem = this.Redemptionamount
      }
    },
    //点击质押全部
    pledgeAll() {
      this.EKDamount = this.Mortgable;
      // alert('all')
    },
    scattalert2(content) {
        this.$alert(`<strong>${content}</strong>`, '', {
          dangerouslyUseHTMLString: true,
          confirmButtonText:'OK',
         showClose:false
        });
      },
    zhiyaClick() {
      this.RedemptionCountdown()
        this.Mortgable = Service.AccuracycalculationOut(Service.EosAcc.Mortgable)
        this.redeemable = Service.AccuracycalculationOut(Service.EosAcc.redeemable)
        if(this.redeemable==0){
        $('.cxzy').css('display','none');
        }else{
        $('.cxzy').css('display','block');
        }
        this.EKDamount=0
        this.zhiyawin = true; 
    },
    cancelzhiya() {
      
      this.zhiyawin = false;
    },
    shuhuiClick() {
      this.RedemptionCountdown()
       this.Redemptionamount = Service.AccuracycalculationOut(Service.EosAcc.Redemptionamount)
       this.redeemable=Service.AccuracycalculationOut(Service.EosAcc.redeemable)
        if(this.redeemable==0){
         $('.shan').css('display','none');
        }else{
           $('.shan').css('display','block');
        }
        this.EKDredeem=0;
      this.shuhui = true;
    },
    shuhuiCancel() {
      this.shuhui = false;
    },
    enter(index){
      this.helpIntroduce = true;
    },
    leave() {   
      this.helpIntroduce = false;
    },
    fenhongClick() {
   this.fenhong = true;
      if (sessionStorage.getItem("accountmsg") == null) {
        this.scattalert2(this.$t('ekd.scatterlogin'));
      } else {
        Service.getTableRows(EosTab.ABONUSACC, EosTab.ABONUSACC, EosTab.ABONUSSTAKE).then(
          data => {
            this.personalbonus = data;
          }
        );
      this.fenhongjulu();
      }

    },
    fenhongCancel() {
      this.fenhong = false;
    },
    //查询分红池
    async init(){
      var res = await this.$http.get(
        bgconn.BONUSPOOL
      );
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
        this.pledge =(this.data.dividendsEntity.pledgeTotal /this.data.dividendsEntity.ekdCirculating)*100;
        this.dig = this.data.dividendsEntity.minedTotal / percentage*2;
      }
      },
     //计算百分比
    CalculatedPercentage(){
        this.Percentage=Number(parseFloat((this.alreadypledged / this.data.dividendsEntity.pledgeTotal)*100).toFixed(4).slice(0,-2))
    },
    //抵押
    mortgage() {
       var contractmsg = {
        account: EosTab.ABONUSACC,
        name: EosTab.ABONUSSTAKES
      };
      this.acc = JSON.parse(sessionStorage.getItem("accountmsg"));
      var parameter = {
        from: this.acc.currentAccount,
        staked: `${parseFloat(this.EKDamount).toFixed(6)} EKD`
      };
      Service.transaction(contractmsg, parameter)
        .then(rs => {
          let mort =
            Service.EosAcc.Mortgable -
            Service.AccuracycalculationIn(this.EKDamount);
          this.Mortgable = Service.AccuracycalculationOut(mort);
          let alrea =
            Service.AccuracycalculationIn(this.alreadypledged) +
            Service.AccuracycalculationIn(this.EKDamount);
          this.alreadypledged = Service.AccuracycalculationOut(alrea).toFixed(
            2
          );
          this.data.dividendsEntity.pledgeTotal = Math.floor(
            Number(this.data.dividendsEntity.pledgeTotal) +
              Number(this.EKDamount)
          );
          //this.data.dividendsEntity.ekdCirculating=Math.floor(Number(this.data.dividendsEntity.ekdCirculating)+Number(this.EKDamount))
          let alrea2 =
            Service.AccuracycalculationIn(this.Redemptionamount) +
            Service.AccuracycalculationIn(this.EKDamount);

          this.Redemptionamount = Service.AccuracycalculationOut(alrea2);
          Service.pledgerecord();
          this.EKDamount = 0;
            this.open(true);
        })
        .catch(err => {
          // console.log('----------------err'+JSON.stringify(err))
          this.open(false);
        });
     
    },
    //赎回
    redeem() {
      var contractmsg = {
        account: EosTab.ABONUSACC,
        name: EosTab.ABONUSUNSTAKES
      };
      this.acc = JSON.parse(sessionStorage.getItem("accountmsg"));
      var parameter = {
        from: this.acc.currentAccount,
        staked: `${parseFloat(this.EKDredeem).toFixed(6)} EKD`
      };
      Service.transaction(contractmsg, parameter)
        .then(rs => {
          let red =
            Service.AccuracycalculationIn(this.Redemptionamount) -
            Service.AccuracycalculationIn(this.EKDredeem);
          this.Redemptionamount = Service.AccuracycalculationOut(red);
          this.redeemable = Service.AccuracycalculationOut(
            Service.AccuracycalculationIn(this.redeemable) +
              Service.AccuracycalculationIn(this.EKDredeem)
          );
          this.data.dividendsEntity.pledgeTotal = Math.floor(
            Number(this.data.dividendsEntity.pledgeTotal) -
              Number(this.EKDredeem)
          );
          Service.pledgerecord();
          $(".cxzy").css("display", "block");
          $(".shan").css("display", "block");
          this.EKDredeem = 0;
          this.open(true);
        })
        .catch(err => {
          this.open(false);
        });
    
    },
     //获取账号余额
    // getCurrencyBalance () {
    //   if (sessionStorage.getItem("accountmsg") != null) {
    //     Service.getCurrencyBalance().then(rs => {
    //       setTimeout(() => {
    //         this.EKDtotal = Service.EosAcc.accInfo;
    //         this.Mortgable =
    //           parseFloat(this.EKDtotal) - parseFloat(this.alreadypledged);
    //       }, 1500);
    //     });
    //   }
    // },
     //时间计算
    Timecalculation(q){
      var date = new Date(this.currenttime);
       if(q==1){
      date=new Date(date.getTime()+24*60*60*1000)
      if(date>new Date(this.togetUTCtime())){
        date=new Date(this.togetUTCtime())
      }
       }else{
          date=new Date(date.getTime()-24*60*60*1000)
          if(date<(new Date('2019-05-23 00:00:00 UTC').getTime())){
            date=new Date(date.getTime()+24*60*60*1000)
          }
       }
      this.currenttime=date
      if((date.getMonth()+1)>9){
        if(date.getUTCDate()<10){
        this.fenhongList[0].createTime=date.getUTCFullYear()+'-'+(date.getMonth()+1)+'-0'+(date.getUTCDate())
        }else{
           this.fenhongList[0].createTime=date.getUTCFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getUTCDate())
        }
      }else{
         if(date.getUTCDate()<10){
        this.fenhongList[0].createTime=date.getUTCFullYear()+'-0'+(date.getMonth()+1)+'-0'+(date.getUTCDate())
        }else{
           this.fenhongList[0].createTime=date.getUTCFullYear()+'-0'+(date.getMonth()+1)+'-'+(date.getUTCDate())
        }
      }
      return this.fenhongList[0].createTime;
    },
    //时间计算
    Timecalculation1(q){
       var date = new Date(this.plattime);
       if(q==1){
      date=new Date(date.getTime()+24*60*60*1000)
      if(date>new Date(this.togetUTCtime())){
        date=new Date(this.togetUTCtime())
      }
       }else{
          date=new Date(date.getTime()-24*60*60*1000)
          if(date<(new Date('2019-05-23 00:00:00 UTC').getTime())){
            date=new Date(date.getTime()+24*60*60*1000)
          }
       }
      this.plattime=date
      if((date.getMonth()+1)>9){
        if(date.getUTCDate()<10){
        this.fenhongList1[0].createTime=date.getUTCFullYear()+'-'+(date.getMonth()+1)+'-0'+(date.getUTCDate())
        }else{
           this.fenhongList1[0].createTime=date.getUTCFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getUTCDate())
        }
      }else{
         if(date.getUTCDate()<10){
        this.fenhongList1[0].createTime=date.getUTCFullYear()+'-0'+(date.getMonth()+1)+'-0'+(date.getUTCDate())
        }else{
           this.fenhongList1[0].createTime=date.getUTCFullYear()+'-0'+(date.getMonth()+1)+'-'+(date.getUTCDate())
        }
      }
      return this.fenhongList1[0].createTime;
    },
     //个人累计分红
    Accumulateddividends(res){
      //this.dividends_total=res.data.dividendsUserEntity.dividendEosTotal
      this.dividends_total=0
      this.notEosTotal=Math.floor(res.data.dividendsUserEntity.notEosTotal*100000000+0.00001)/100000000;
  //     for(var i=0;i<res.data.page.list.length;i++){
  //       //  let eos=res.data.page.list[i].thisEosAmount.substr(0,res.data.page.list[i].thisEosAmount.length-4)
  //       //  let ekd=res.data.page.list[i].thisEkdAmount.substr(0,res.data.page.list[i].thisEkdAmount.length-4)
  //        this.dividends_total=Math.floor((this.dividends_total+Number(res.data.page.list[i].thisEosAmount.substr(0,res.data.page.list[i].thisEosAmount.length-4)))*100000000+0.0000001)/100000000
  //  }
  this.dividends_total= Math.floor(res.data.dividendsUserEntity.dividendEosTotal*100000000+res.data.dividendsUserEntity.notEosTotal*100000000+0.000001)/100000000
    },
    Platformbonus(res){
    this.plats_total=res.data.dividends_total.eosTotal
    // for(var i=0;i<res.data.page.list.length;i++){
    //      let eos=res.data.page.list[i].dividendsEosTotal.substr(0,res.data.page.list[i].dividendsEosTotal.length-4)
    //      let ekd=res.data.page.list[i].dividendsEkdTotal.substr(0,res.data.page.list[i].dividendsEkdTotal.length-4)
    //   }
    },
    //领取个人分红
    async Dividendsreceived(){
       var eostal = Math.floor(this.notEosTotal * 10000 + 0.0000001) / 10000;
      if (eostal >= 0.0001) {
        var contractmsg = {
          account: EosTab.ABONUSACC,
          name: EosTab.DIVIDENDS
        };
        this.acc = JSON.parse(sessionStorage.getItem("accountmsg"));
        var parameter = {
          from: this.acc.currentAccount
        };
        Service.transaction(contractmsg, parameter)
          .then(rs => {
            this.open(true);
            var res = this.$http.get(bgconn.DIVIDENDSRECEIVED, {
              params: { account: this.acc.currentAccount, eos_balance: eostal }
            });
            var { status, data } = res;
            this.notEosTotal =Math.floor(this.notEosTotal * 100000000 - eostal * 100000000 + 0.000001) / 100000000;
            if (status === 200) {
              this.fenhongjulu();
            }
            this.open(true);
          })
          .catch(err => {
            this.open(false);
          });
      } else {
        this.open(false);
      }
    
    },
    //排行榜
    async ranklist(){
        const result=await this.$http.get(bgconn.EKDPAIHANG)
        this.list=result.data.ekdRankingList;
    },
    repledge(){
      var contractmsg = {
        account: EosTab.ABONUSACC,
        name: EosTab.RESTAKE
      };
      this.acc = JSON.parse(sessionStorage.getItem("accountmsg"));
      var parameter = {
        from: this.acc.currentAccount
      };
      Service.transaction(contractmsg, parameter)
        .then(rs => {
          this.Redemptionamount = Service.AccuracycalculationOut(
            Service.EosAcc.alreadypledged
          );
          this.redeemable = 0;
          Service.EosAcc.redeemable = 0;
          Service.pledgerecord();
          this.open(true);
          $(".shan").css("display", "none");
          $(".cxzy").css("display", "none");
        })
        .catch(error => {
          this.open(false);
        });
      //   this.acc = JSON.parse(sessionStorage.getItem("accountmsg"));
      //  Service.transaction([{ account: EosTab.ABONUSACC, name: EosTab.RESTAKE }],
      //      [
      //        {
      //          from: this.acc.currentAccount
      //        }
      //      ]).then(rs=>{
      //        this.Redemptionamount=Service.AccuracycalculationOut(Service.EosAcc.alreadypledged)
      //        this.redeemable=0
      //        Service.EosAcc.redeemable=0;
      //        Service.pledgerecord();
      //        this.open(true)
      //        $('.shan').css('display','none');
      //        $('.cxzy').css('display','none');
      //      }).catch(error=>{
      //        this.open(false)
      //      })
    },
    async calekdusdt(num,num2){
      this.EKDbili=num
      this.EKDbili2=parseFloat (num2*num).toFixed(6)
 },
    helpisshow(){
    },
    Formatdata(number){
    var num = number.toString() 
    var numArr = num.split('.')
    var [num, dotNum] = numArr


    var operateNum = num.split('').reverse()
    var result = [], len = operateNum.length
    for(var i = 0; i< len; i++){
         result.push(operateNum[i])
         if(((i+1) % 3 === 0) && (i !== len-1)){
              result.push(', ')
        }
    }

    if(dotNum){
         result.reverse().push('.', ...dotNum)
         return result.join('')
    }else{
         return result.reverse().join('')
    }

},
//赎回倒计时
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
   },1000)
},
//计算EKD/EOS 
  async EKDprice(){
     this.$http.get(bgconn.EXCHANGEQUOTATIONS).then(rs=>{
    this.EKDbili=rs.data.data.last
    })
    setInterval(()=>{
    this.$http.get(bgconn.EXCHANGEQUOTATIONS).then(rs=>{
    this.EKDbili=rs.data.data.last
    })
    },900000)
 }
  },
  mounted() {
       window.onbeforeunload=function(){
  sessionStorage.removeItem('email')
}
    let this_ =this
    if (document.body.clientWidth  < '1200'){
      this_.scale = document.body.clientWidth / 1170
      var height = this_.scale * 1000
      //问题未解决
      this_.content_height = {'height':`${height}px`}
    }else {
      this_.scale = 1
      this_.content_height = {'height':`820px`}
    }
    window.onresize = function temp() {

      if (document.body.clientWidth  < '1200'){
        if(document.body.clientWidth  < 980){
          this_.scale = 0.8213
          return
        }
        this_.scale = document.body.clientWidth / 1170
        var height = this_.scale * 1000
        //问题未解决
        this_.content_height = {'height':`${height}px`}
      }else {
        this_.scale = 1
        this_.content_height = {'height':`820px`}
      }
    }
  },
  computed:{
    zoom_content:function () {
      var scale = this.scale;
      return `transform:scale(${scale})`
    }
  }
};
</script>

<style>
.share_out{
  position: relative;
}
  .ivu-modal-footer {
     border-top: 0 !important;
     padding: 0 !important;
     text-align: right;
  }
  .ivu-modal-content {
    border-radius: 50px !important;
  }
.nav .navbar-brand img {
  margin-top: 25px;
}
  .bottomDistance{
    margin-bottom: 50px;
    width: 33.3333%;
    float: left;
  }
  .zoom_content{
    -webkit-transform-origin: top left;
  }
  .zoom_width{
    width: 1170px;
    margin: 0 auto;
    overflow: hidden;
    margin-left: 21%;
  }
  .input_img{
    width: 35px;
    height: 35px;
    position: absolute;
    left: 22px;
    top: 6px;
    background-color: #ea6856;
  }
  .input_img img{
    width: 100%;
    height: 100%;
  }
  .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .vertical-center-modal.ivu-modal{
    top: 0;
  }
  .sd_button{
    width: 146px;
    height: 70px;
    color: white;
    text-align: center;
    line-height: 70px;
    font-size: 24px;
    font-weight: bold;
  }
  .button_zhi{

    background-size: 100% 100%;
  }
  .button_shu{
    background-size: 100% 100%;
  }
  .button_jilu{
    background:url('../../src/assets/images/share_out/lansejiluko.png')no-repeat;
    background-size: 100% 100%;
  }
  .Repledge{
    background-size: 100% 100%;
    width: 111px;
    height: 50px;
    margin-left:50%;
    position: relative;
    top: -20%;
  }
  
  .Repledge2{
    background-size: 100% 100%;
    width: 111px;
    height: 43px;
    margin-left:70%;

  }
   .help_introduce{
    width: 315px;
    height: auto;
    /* padding: 15px; */
    border-radius: 10px;
    position: absolute;
    left: 40px;
    bottom: -10px;
    color: #fff;

  }
  .receive{
    width:91px;
    height:50px;
    float: left;
    position: relative;
    top: -30px;
    left: 7px;

  }
  .logo{
      width:35px;
      height:35px;
      background-color: #fff;

  }
.share_out .tankuang{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(55, 55, 55, .5);
  display:flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.share_out .tankuang div{
  position: relative;
}
.share_out .tankuang img:nth-of-type(2){
  width: 7%;
  position: absolute;
  top: 5%;
  right: 2%;
}
</style>
