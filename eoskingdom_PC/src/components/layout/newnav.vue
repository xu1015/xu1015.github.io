<template>
  <div class="newnav">
    <div class="layout">
      <Layout style="position: fixed; top: 0; width: 100% ;z-index: 9999">
        <Header
          :style="{ margin: '0 auto' , padding: '0' , width:'70%' , maxWidth:'1920px' , minWidth:'960px'}"
          style="background-color: transparent"
        >
          <Menu
            mode="horizontal"
            theme="dark"
            active-name="1"
            style="background-color: transparent;color: black"
          >
            <router-link to="/index">
              <div class="layout-logo2"></div>
            </router-link>
            <div class="layout-nav">
                                          <!-- target="_blank" -->
              <router-link :to="{path:'/share_out'}">
                <MenuItem
                  :name="2"
                  style="font-weight: bold;font-size: 1.2em;color: white"
                >{{$t('menu.share_out')}}</MenuItem>
              </router-link>
              <MenuItem :name="1" style="font-weight: bold;font-size: 1.2em;color: black">
                <a href="#" @click="shareWin()" style="color:white">{{$t('menu.share')}}</a>
              </MenuItem>
              <MenuItem :name="3" @click="changeNode" style="font-weight: bold;font-size: 1.2em;color: black;padding: 0;">
                <a href="#" @click="changeNode" style="color: white;height:100%;display:inline-block;padding: 0 20px;">{{$t("ekd.node")}}</a>
              </MenuItem>
              <MenuItem :name="4" style="font-weight: bold;font-size: 1.2em;color: black">
                <a href="#" @click="announcementShow" style="color: white">{{$t('menu.notice')}}</a>
              </MenuItem>
              <!-- <MenuItem :name="5" style="font-weight: bold;font-size: 1.2em;color: black" class="animated tada infinite">
                <a href="#" style="color: white" @click="clickqiandao" >{{$t('qiandao.meirijiangli')}}
                </a> 
              </MenuItem> -->
                 <!-- <qiandao   v-if="qiandaoisshow" @childqiandao="clickqiandao2"></qiandao> -->
              <!--<button class="login-button" @click="loginFN"></button>-->
              <div style="float:left;height:60px;" @mouseenter.stop="disshow" @mouseleave.stop="disshow2">
                <a class="loginBut" @click.stop="loginFN" @mouseover.stop="disshow">
                  <span
                    v-show="loginSatus"
                    style="width:206px;text-align:center;"
                  >{{this.currentAccount}}</span>
                  <dl class="showInfo" @mouseenter.stop="disshow" style="display:none;">
                    <dd>
                      <p
                        class="dlzt"
                        style="color:#606060;"
                        @mouseenter="bianlian"
                        @mouseleave="bianan"
                      >{{this.eos_balance}}</p>
                    </dd>
                    <dd>
                      <p
                        class="dlzt2"
                        style="color:#606060;"
                        @mouseenter="bianlian2"
                        @mouseleave="bianan2"
                      >{{this.eos_balanceekd}}</p>
                    </dd>
                    <dd @click="signOut" @click.stop>{{$t('ekd.Signout')}}</dd>
                  </dl>
                  <span v-show="!loginSatus">
                    <img v-if="type==='ko'" src="@/assets/images/nav/denglu02.png" alt>
                    <img v-if="type==='cn'" src="@/assets/images/nav/denglu03.png" alt>
                    <img v-if="type==='en'" src="@/assets/images/nav/denglu.png" alt>
                  </span>
                  <!--<img v-else-if="type==='cn'" src="@/assets/images/nav/Login.png" alt="">-->
                  <!--<img v-else-if="type==='en'" src="@/assets/images/nav/Login.png" alt="">-->
                </a>
              </div>
              <div class="checklanguage">
                <img
                  :src="language"
                  alt
                  @click="checkLanguage"
                  style="width: 40px;height: 40px;margin-top: 6px;"
                >
                <div
                  class="otherLanguage"
                  v-show="languageStatus"
                  @mouseleave="languageStatus = false"
                >
                  <img
                    :src="ICON_01KO"
                    alt
                    @click="tabKO"
                    style="width: 40px;height: 40px;margin-top: 6px;"
                  >
                  <img
                    :src="ICON_02CN"
                    alt
                    @click="tabCn"
                    style="width: 40px;height: 40px;margin-top: 6px;"
                  >
                  <img
                    :src="ICON_03EN"
                    alt
                    @click="tabEn"
                    style="width: 40px;height: 40px;margin-top: 6px;"
                  >
                </div>
              </div>
            </div>
          </Menu>
        </Header>
      </Layout>
      <BackTop></BackTop>
      <Modal :closable="false" :width="801" class-name="vertical-center-modal" v-model="share">
        <div class="referrer_window" id="referrer_window">
          <div class="referrer_window_con">
            <div class="tit">
              <span style="position: relative;top:-23px;">{{$t('ekd.Recommender')}}</span>
              <div class="btn" @click="cancelShare">
                <img src="@/assets/images/share_out/cancel.png">
              </div>
            </div>
            <div class="ipt">
              <input
                id="referrerUrl"
                readonly="readonly"
                type="text"
                :value="'https://eoskingdom.io/#/?ref='+this.currentAccount"
              >
              <div
                class="btn"
                :data-clipboard-text="'https://eoskingdom.io/#/?ref='+this.currentAccount"
                @click="copy"
                style="font-size:21px;"
              >{{$t('ekd.copy')}}</div>
            </div>

            <p>{{$t('ekd.Invitationstart')}}<label> 0.15% </label>{{$t('ekd.Invitationend')}}</p>
          </div>
        </div>
        <div slot="footer"></div>
      </Modal>
    </div>
    <div v-if="announcement" class="announcement">
      <div class="announcement_tab">
        <div class="announcement_top">
          <div class="btn">
            <img
              src="@/assets/images/share_out/return.png"
              style=" position: absolute;left: 6px;width: 60px;top: 7px;cursor: pointer;"
              v-if="tableShow === false"
              @click="returnList"
            >
            <span>NOTICE</span>
            <img
              src="@/assets/images/share_out/cancel.png"
              style=" position: absolute;right: 6px;width: 60px;top: 7px;cursor: pointer;"
              @click="announcementHide"
            >
          </div>
        </div>
        <div v-if="tableShow">
          <Table :columns="columns1" :data="data1" :show-header="false"></Table>
          <Page :total="10" size="small" style="padding-left:40%;width: 300px;width:100%;"/>
        </div>
        <div v-else>
          <h3 style="text-align: center;margin-top: 20px;">{{detailedTitle}}</h3>
          <div class="contentStyle" v-html="detailedContent">{{detailedContent}}</div>
        </div>
      </div>
    </div>
    <div class="nodeMask" v-show="nodeState==true" @click.stop="cancelChangeNode"  @mousewheel.prevent @touchmove.prevent>
      <div class="nodeDiv" @click.stop="changeNode1">
        <ul>
          <li v-for="(item,index) in nodelist" :key="index">
            <div class="shownode" @click.stop="changeNodeBtn(item)" :class="item.name==nowNode?'nodeChange':''">
              <div class="nodeLeft">
                <p>{{item.address}}</p>
                <p>https://{{item.name}}</p>
              </div>
              <div class="nodeRight" :class="item.time>800?'red':item.time>400?'yellow':'green'" >
                <p>{{item.time}}</p>
                <p>ms</p>
              </div>
            </div>
          </li>
            
        </ul>
      </div>
    </div>
    <son-tankuang :title="sonTitle" :content="sonContent" :showHide="sonShowHide" :makeSure="sonMakeSure" :change="sonchange"></son-tankuang>
  </div>
</template>

<script>
// 公共
import sonTankuang from '@/components/page/sonTankuang'

import animated from "@/assets/css/animated.css";
import {JsonRpc, Api} from 'eosjs';
import ScatterJS from '@scatterjs/core';
import ScatterEOS from '@scatterjs/eosjs2';
ScatterJS.plugins( new ScatterEOS() );
import Service from "@/assets/js/scatterservice.js";
import {confignode} from "@/assets/js/scatterconfig.js";
import bgconn from "@/assets/js/bgconn.js";
import EosTab from '@/assets/js/EosTab'
import Clipboard from "clipboard";
// import qiandao from '../qiandao'
export default {
  components: {sonTankuang},//qiandao
  data() {
    return {
      qiandaoisshow:false,
      // 控制弹框显示隐藏
      sonShowHide:false,
      // 控制弹框标题
      sonTitle:null,
      // 控制弹框内容
      sonContent:null,
      // 控制弹框按钮是否变成下载链接
      sonMakeSure:null,
      nodelist:null,
      nodeState:false,
      type: "ko",
      // language: false
      share: false,
      announcement: false, //公告
      currentAccount: null,
      currentPermission: null,
      scatter: null,
      readOnlyEos: null,
      eosClient: null,
      nowNode:Service.config.host,
      //检测用户登录状态
      loginSatus: false,
      _this:this,
      //邀请人链接
      Inviter: bgconn.INVITERLINK,
      eos_balance: 0,
      eos_balanceekd: 0,
      exitloginSatus: false,
      issignout: false,
      languageStatus: false,
      smallLanguageStatus: false,
      firstIntoType:1,
      language: "",
      show: false,
      detailedTitle: "", //公告详情标题
      detailedContent: "", //公告详情内容
      tableShow: true, //列表或详情
      config:null,
      eos:null,
      whitebook_href: "https://eoskingdom.io/EKD_WhitePaper_KR.pdf",
      ICON_01KO: require("@/assets/images/nav/ICON_01KO.png"),
      ICON_02CN: require("@/assets/images/nav/ICON_02CN.png"),
      ICON_03EN: require("@/assets/images/nav/ICON_03EN.png"),
      NOW: require("@/assets/images/nav/now.png"),
      columns1: [
        {
          title: "标题",
          key: "title",
          render: (h, { row, column, index }) => {
            if (row.state === 1) {
              return h(
                "div",
                {
                  attrs: {
                    style: "font-size: 1.3em;max-width:400px;position: relative;text-align:left;"
                  }
                },
                [
                  h(
                    "a",
                    {
                      style: "color:#000;margin-left:80px;display: inline-block;width:70%;overflow: hidden; text-overflow: ellipsis; white-space: nowrap;",
                      on: {
                        click: () => {
                          this.detailedTitle = row.title;
                          this.detailedContent = row.content;
                          this.tableShow = false;
                        }
                      }
                    },
                    row.title
                  ),
                  h("img", {
                    // props: {
                    //   type: "primary",
                    //   size: "small"
                    // },
                    attrs: {
                      src: this.NOW,
                      style:
                        "width: 30px;\n" +
                        "    height: 15px;\n" +
                        "    position: absolute;\n" +
                        "    border-radius: 2px;\n" +
                        "    top: 3px;\n" +
                        "    margin-left: 15px;"
                    }
                  })
                ]
              );
            } else {
              return h(
                "div",
                {
                  attrs: {
                    style: "font-size: 1.3em;position: relative;text-align:left;"
                  }
                },
                [
                  h(
                    "a",
                    {
                      style: "color:#A8A8A8;margin-left:80px;",
                      on: {
                        click: () => {
                          this.detailedTitle = row.title;
                          this.detailedContent = row.content;
                          this.tableShow = false;
                        }
                      }
                    },
                    row.title
                  )
                ]
              );
            }
          }
        },
        {
          title: "时间",
          key: "date",
          width: 300,
          align: "center"
        }
      ],
      data1: [
        {
          title: "",
          date: "",
          content: "",
          state: 1
        },
        {
         title: "",
          date: "",
          content: "",
          state: 0
        },
        {
         title: "",
          date: "",
          content: "",
          state: 0
        },
        {
         title: "",
          date: "",
          content: "",
          state: 0
        },
        {
         title: "",
          date: "",
          content: "",
          state: 0
        },
        {
         title: "",
          date: "",
          content: "",
          state: 0
        },
        {
         title: "",
          date: "",
          content: "",
          state: 0
        },
        {
         title: "",
          date: "",
          content: "",
          state: 0
        },
        {
        title: "",
          date: "",
          content: "",
          state:0
        },
        {
         title: "",
          date: "",
          content: "",
          state: 0
        }
      ]
    };
  },
  methods: {
    sonchange(val) {
      this.sonShowHide = val;
    },
    changeNodeBtn(info){
      Service.config={       
        blockchain: "eos",
        host: info.name,
        port: 443,
        protocol: "https",
        chainId: info.chainid
      }
      this.nowNode = Service.config.host;
      this.nodeState=false;
      
    },
    disshow() {
      if (this.loginSatus) {
        $(".showInfo").css("display", "block");
      }
    },
    disshow2() {
      if (this.loginSatus) {
        $(".showInfo").css("display", "none");
      }
    },
    isshow() {
      this.announcement = false;
      
    },
    // 切换语言
    checkLanguage() {
      this.languageStatus = true;
      // this.tabkore()
    },
    smallCheckLanguage() {
      this.smallLanguageStatus = true;
    },
    tabKO() {
      this.type = "ko";
      this.$i18n.locale = "korean";
      this.language = this.ICON_01KO;
      this.whitebook_href = "https://eoskingdom.io/EKD_WhitePaper_KR.pdf";
      this.$emit("localeMethods", "ko")
    },
    tabCn() {
      this.type = "cn";
      this.$i18n.locale = "zh";
      this.language = this.ICON_02CN;
      this.whitebook_href = "https://eoskingdom.io/EKD_WhitePaper_CN.pdf";
      this.$emit("localeMethods", "cn")
    },
    tabEn() {
      this.type = "en";
      this.$i18n.locale = "en";
      this.language = this.ICON_03EN;
      this.whitebook_href = "https://eoskingdom.io/EKD_WhitePaper_EN.pdf";
      this.$emit("localeMethods", "en")
    },
    bianlian() {
      $(".dlzt").css("color", "#3ecad6");
    },
    bianan() {
      $(".dlzt").css("color", "#606060");
    },
    bianlian2() {
      $(".dlzt2").css("color", "#3ecad6");
    },
    bianan2() {
      $(".dlzt2").css("color", "#606060");
    },
    shareWin() {
      this.share = true;
    },
    changeNode1() {
      this.nodeState = true;
    },
    changeNode() {
      this.nodeState = true;
      confignode().then(rs=>{
         this.nodelist =rs;
      })
    },
    cancelChangeNode() {
      this.nodeState = false;
    },
    cancelShare() {
      this.share = false;
    },
    announcementShow() {
      this.announcement = true;
      this.notice();
    },
    announcementHide() {
      this.announcement = false;
    },
    returnList() {
      this.tableShow = true;
    },
    copy() {
      var clipboard = new Clipboard(".btn");
      clipboard.on("success", e => {
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        // 释放内存
        clipboard.destroy();
      });
    },
    //邀请链接发送
    async Inviters() {
      //邀请人
      //window.location.href
      const url = window.location.href;
      const parma = url.substring(url.lastIndexOf("/") + 6);
      if (
        parma.length <= 12 &&
        parma != this.currentAccount &&
        2 <= parma.length
      ) {
        const rs = await Service.eosconfig()
          .getAccount(parma)
          .catch(error => {
            });
        if (rs != undefined) {
          if (rs.account_name == parma) {
            var res = await this.$http.get(bgconn.INVITER, {
              params: { invitatAcc: parma, account: this.currentAccount }
            });
            var { status, data } = res;
            if (res.data.msg == "绑定的账户已存在推荐人") {
            } else {
              if (status === 200) {
                this.fenhongList = data.page.list;
                this.priviceDay = data.page.list[0].dividendsTime;
              }
            }
          } else {
          }
        }
      } else {
      }
    },
    //添加用户访问记录
    uservisit(name) {
      this.$http
        .get(bgconn.USERVISIT, { params: { account: name } })
        .then(rs => {
          // console.log('status=='+rs.status)
        });
    },
    linkscatter() {
      const network = ScatterJS.Network.fromJson(this.config);
      const rpc = new JsonRpc(network.fullhost());
      ScatterJS.connect('Login', {network}).then(connected => {
      if(!connected) {
        this.sonShowHide=true;
        this.sonContent=this.$t("ekd.scatterNofind");
        this.sonMakeSure="download";
        return console.error('no scatter')
      };
      this.sonShowHide=false;
      const eos = ScatterJS.eos(network, Api, {rpc});
      this.eos=eos;
      Service.EosAcc.eos=eos;
      
      ScatterJS.login().then(id => {
          if(!id) return console.error('no identity');
          const account = ScatterJS.account('eos');
          // 发送访问记录到后台
          this.uservisit(account.name)
          this.loginSatus = true;
              let accountmsg = {
              currentAccount: account.name,
              currentPermission: account.authority
            };
            this.currentAccount = account.name;
            this.currentacc=account;
            sessionStorage.setItem("accountmsg", JSON.stringify(accountmsg));
            this.loginSatus = true;
            Service.pledgerecord();
            Service.get_currency_balance(this.currentAccount).then(rs => {
            if(rs.length>0){
              this.eos_balance = rs[0].substr(0, rs[0].length - 4);
            }
            });
            Service.get_currency_balanceEkd(this.currentAccount).then(rs => {
              if (rs != "") {
                this.eos_balanceekd =
                  Math.floor(rs[0].substr(0, rs[0].length - 4) * 100 + 0.0001) /
                  100;
              }
            });
            this.Inviters();
            this.$emit('childByValue', this.currentAccount)
            if(sessionStorage.getItem('isclose')==null){
              this.clickqiandao()
        }
      });
  }).catch(()=>{
    console.log("连接失败")
  });
    },
    //账号登录
    loginFN() { 
      this.linkscatter();
    },
    //退出
    signOut() {
       ScatterJS.logout().then(rs=>{
        sessionStorage.removeItem("accountmsg");
        //推出后按钮状态
        this.exitloginSatus = false;
        this.loginSatus = false;
        this.issignout = true;
        this.currentAccount = null;
        this.currentPermission = null;
        Service.EosAcc.Redemptionamount = 0;
        Service.EosAcc.alreadypledged = 0;
        Service.EosAcc.EKDtotal = 0;
        Service.EosAcc.Mortgable = 0;
        // Service.EosAcc.redeemabletime = 0;
        this.eos_balance = 0;
        this.eos_balanceekd = 0;
        $(".showInfo").css("display", "none");
        $(".zhiya").css("display", "none");
        $(".dibu").css("display", "none");
         this.$emit('childByValue', this.currentAccount)
      }).catch(error=>{
      });
    },
    //登录状态 点击该按钮
    enterCenter() {
      this.exitloginSatus = true;
    },
    leaveCenter() {
      this.exitloginSatus = false;
    },
    //公告列表信息获取
    async notice() {
      if (this.type == "cn") {
        const result = await this.$http.get(bgconn.NOTICE,  {params:{
        language: "CN",
        pageNum: 1
        }});
       this.noticemsg(result,'CN')
      } else if (this.type == "ko") {
      const result = await this.$http.get(bgconn.NOTICE, {params:{
        language: "KR",
        pageNum: 1
      }});
       this.noticemsg(result,'KR')
      } else {
      const result = await this.$http.get(bgconn.NOTICE,  {params:{
        language: "EN",
        pageNum: 1
      }});
      this.noticemsg(result,'EN')
      }
    },
    //添加用户访问记录
    uservisit(name) {
      this.$http
        .get(bgconn.USERVISIT, { params: { account: name } })
        .then(rs => {
        });
    },
    //遍历公告信息
    noticemsg(result,lang){
       var ct = 0;
    for (var i = 0; i < result.data.page.list.length; i++) {
          if (result.data.page.list[i].language == lang) {
            this.data1[ct].title = result.data.page.list[i].title;
            this.data1[ct].content = result.data.page.list[i].content;
            this.data1[ct].date = result.data.page.list[i].createTime.substr(
              0,
              10
            );
            if( result.data.page.list[i].isNew==1){
              this.data1[ct].state=1
            }else{
               this.data1[ct].state=0;
            }
            ct++;
          }else{
            this.data1[i].title ='';
            this.data1[i].content ='';
            this.data1[i].date = ''
            this.data1[i].state=0
          }
        }
    },
    languagejudge(){
      if (this.firstIntoType==1) {
        var language = (navigator.browserLanguage || navigator.language).toLowerCase();
        if (language.indexOf("zh") > -1) {
          this.tabCn();
        } else if (language.indexOf("en") > -1) {
          this.tabEn();
        } else if (language.indexOf("ko") > -1) {
          this.tabKO();
        } else {
          this.tabEn();
        }
        
      }
    },
    clickqiandao(){
      if(sessionStorage.getItem('accountmsg')!=null){
        this.qiandaoisshow=true;
      }else{
          this.sonShowHide=true;
          this.sonContent=this.$t("ekd.scatterlogin");
      }
    
    },
    clickqiandao2(val){
      this.qiandaoisshow=val;
    }
  },
  created() {
      this.nodelist =null;
      this.languagejudge()
    //用户登录后没有退出，只进行页面刷新操作与scatter建立链接
     confignode().then(rs=>{
       this.nodelist =rs;
      //  console.log("相关信息",this.nodelist)
      this.config={       
        blockchain: "eos",
        host: rs[0].name,
        port: 443,
        protocol: "https",
        chainId: rs[0].chainid
}
      Service.config=this.config
      this.nowNode = Service.config.host;
      Service.options.httpEndpoint=`https://${rs[0].name}`
      this.linkscatter()
      
    // if (sessionStorage.getItem("accountmsg") != null) { 
    //   this.currentAccount = JSON.parse(
    //     sessionStorage.getItem("accountmsg")
    //   ).currentAccount;
    //   this.loginSatus = true;
    //   Service.get_currency_balance(this.currentAccount).then(rs => {
    //     this.eos_balance = rs[0].substr(0, rs[0].length - 4);
    //   });
    //   Service.get_currency_balanceEkd(this.currentAccount).then(rs => {
    //     if (rs != "") {
    //       this.eos_balanceekd =
    //         Math.floor(rs[0].substr(0, rs[0].length - 4) * 100 + 0.0001) / 100;
    //     }
    //   });
    //   ScatterJS.scatter
    //     .connect("scatter-demo")
    //     .then(connected => {
    //       if (!connected) {
    //         return false;
    //       }
    //       Service.EosAcc.scatter = ScatterJS.scatter;
    //       window.scatter = null;
    //       window.ScatterJS = null;
    //       Service.EosAcc.eosClient = Service.EosAcc.scatter.eos(this.config, Eos);
    //       Service.pledgerecord();
    //       this.Inviters();
    //       this.$emit('childByValue', this.currentAccount)
    //     })
    //     .catch(error => {});
    // } else {
    //   this.Unlinkscatter();
    // }
     })
  },
  mounted() {
    if (this.$i18n.locale === "korean") {
      this.language = this.ICON_01KO;
    } else if (this.$i18n.locale === "zh") {
      this.language = this.ICON_02CN;
    } else if (this.$i18n.locale === "en") {
      this.language = this.ICON_03EN;
    }
    if (sessionStorage.getItem("accountmsg") != null) {
      // 用户登录状态
      this.loginSatus = true;
    }
  }
};
</script>

<style scope>
  .red{
    color: #BF1E23!important;
  }
  .yellow{
    color: #BBB614!important;
  }
  .green{
    color: #37BF21!important;
  }
  .newnav{
    font-family: fz;
  }
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
}
.layout-logo2 {
  width: 190px;
  height: 50px;
  margin-top: 7px;
  border-radius: 3px;
  float: left;
  background: url("../../assets/images/dice/LOGO1.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  top: 1px;
}
.layout-nav {
  font-family: fz;
  float: right;
  color: black;
  height: 60px;
  margin-top: 5px;
}
.layout-footer-center {
  text-align: center;
}
.MenuItem {
  font-weight: bold;
}
.checklanguage {
  width: 50px;
  height: 50px;
  float: right;
  margin-top: 5px;
}
.loginBut {
  position: relative;
  margin-left: 30px;
  margin-right: 10px;
  max-width: 206px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  height: 45px;
  margin-top: 7px;
  outline: none;
  cursor: pointer;
  display: inline-block;
  border: #b9b9b9 2px solid;
  border-radius: 10px;
  background: linear-gradient(#f5ab75, #e65e4e); /* 标准的语法 */
}
.loginBut span {
  display: block;
  height: 100%;
  background: url("../../assets/images/nav/touxiang.png") 4px center no-repeat;
  color: #fff;
  font-size: 20px;
  line-height: 41px;
  padding-left: 32px;
  max-width: 206px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  box-sizing: border-box;
  padding-right: 3px;
}
.showInfo {
  position: absolute;
  top: 30px;
  left: 0;
  padding-top: 20px;
  background: url("../../assets/images/nav/tm.png") repeat;
  width: -webkit-calc(100% + 4px);
  width: -moz-calc(100% + 4px);
  width: calc(100% + 4px);
  border: #cfcfcf 2px solid;
  box-sizing: border-box;
  border-radius: 10px;
  z-index: -1;
  margin-left: -2px;
}
.showInfo dd {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: #c5c4c2 1px solid;
  color: #606060;
  box-sizing: border-box;
  padding: 0 4px 16px;
}
.showInfo dd:last-child {
  border: 0;
  text-align: center;
  letter-spacing: 6px;
  font-size: 14px;
}
.showInfo dd:nth-child(2) {
  color: #3ecad6;
}
.showInfo dd p {
  padding-left: 37px;
  background: url("../../assets/images/nav/icon01.png") 0px center no-repeat;
  text-align: center;
}
.showInfo dd:nth-child(2) p {
  background: url("../../assets/images/nav/icon02.png") 0px center no-repeat;
}

.cooperation-logo {
  min-height: 100px;
  border-bottom: 1px;
}
.cooperation-logo img {
  width: 115px;
  height: 35px;
  margin: 10px;
}
.disclaimer {
  text-align: left;
}
.ivu-message {
  font-size: 14px;
  position: fixed;
  z-index: 1010;
  width: 100%;
  top: 70px !important;
  left: 0;
  pointer-events: none;
}
.announcement {
  position: fixed;
  z-index: 1099;
  width: 100%;
  height: 100%;
  overflow: scroll;
  background: rgba(0, 0, 0, 0.5);
}
.announcement_tab {
  width: 723px;
  height: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -370px;
  margin-top: -280px;
  border-radius: 12px;
  overflow: hidden;
  background-color: white;
}
.announcement::-webkit-scrollbar {
  display: none;
}
.announcement_top {
  background-color: #ed5473;
  height: 70px;
  position: relative;
  color: darkorange;
  font-size: 3em;
  font-weight: 600;
  text-shadow: 0px 1px 0px #c0c0c0, 0px 2px 0px #b0b0b0, 0px 3px 0px #a0a0a0,
    0px 4px 0px #909090, 0px 5px 10px rgba(0, 0, 0, 0.6);
  text-align: center;
  line-height: 70px;
}
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
.vertical-center-modal.ivu-modal {
  top: 0;
}
.contentStyle span{
  font-size: 16px!important;
}
.contentStyle {
  padding: 20px 60px;
  font-size: 16px!important;
  line-height: 26px;
  text-indent: 2em;
  overflow: auto;
  height: 505px;
}
.ivu-table-cell {
  text-align: center;
}
.newnav .nodeMask{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1009;
  background: rgba(0, 0, 0, .8)
}
.newnav .nodeDiv{
  width: 700px;
  height: 312px;
  background:#111723;
  border: 4px solid #6BE1FC;
  border-radius: 25px;
  position: relative;
  font-size: 0;
  font-family: "Microsoft YaHei";
  color: #91a7ac;
}
.newnav .nodeDiv ul{
  margin-top: 28px;
  margin-left: 30px;
}
.newnav .nodeDiv li{
    display: inline-block;
    margin-top: 18px;
    vertical-align: middle;
    border-radius: 3px;
}
.newnav .nodeDiv li:nth-of-type(1),.newnav .nodeDiv li:nth-of-type(2){
    margin-top: 0;
}
.newnav .nodeDiv li .shownode{
    width:300px;
    height: 50px;
    border-radius: 6px;
    display: inline-block;
    background: #070A0F;
    position: relative;
    vertical-align: middle;
    overflow: hidden;
}
.newnav .nodeDiv li .shownode:active{
  transform: scale(.98);
}
.newnav .nodeDiv li .shownode:hover{
  background:black;
  color: #D9F7FF;
  box-shadow: 3px -3px 5px #1C8CBA, -3px -3px 5px #1C8CBA, -3px 3px 5px #1C8CBA, 3px 3px 5px #1C8CBA;
}
.newnav .nodeChange{
  background:black;
  color: #D9F7FF;
  box-shadow: 3px -3px 5px #1C8CBA, -3px -3px 5px #1C8CBA, -3px 3px 5px #1C8CBA, 3px 3px 5px #1C8CBA;
}
.newnav .nodeDiv li .shownode:visited{
  transform: scale(1)
}
.newnav .nodeDiv li .nodeLeft{
    width: 77%;
    height: 100%;
    display: inline-block;
    /* background: red; */
    vertical-align: middle;
    margin-left: 24px;
    font-size: 18px;
    margin-top:5px;
}
.newnav .nodeDiv li .nodeLeft p:nth-of-type(2){
    text-decoration: underline;
    font-size: 14px;
}
.newnav .nodeDiv li .nodeRight{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    color: #25AF1C;
}
.newnav .nodeDiv li .nodeRight p:nth-of-type(1){
    margin-top:10px;
    font-size: 15px;
}
.newnav .nodeDiv li .nodeRight p:nth-of-type(2){
    font-size: 7px;
    margin-top: -3px;
    transform: scale(.9);
}
.newnav .nodeDiv li .shownode:nth-of-type(1){
    margin-right: 25px;
}
.newnav .nodeDiv .shutdown{
    width:58px;
    position: absolute;
    right: 3px;
    top: 3px;
}
</style>
