<template>
  <div class="phone_fixed">
      <div class="title">
        <img @click="clickShareState1" src="@/assets/images/nav/LOGO.png" class="titleImg" alt>
        <div class="titleName">
          <img src="@/assets/images/phone/denglu02.png">
          <span v-if="loginSatus==false" @click="loginFN" class="loginSpan1">{{$t('menu.login')}}</span>
          <span
            v-else
            class="loginSpan2"
            @click="loginShow"
          >{{this.currentAccount}}</span>
          <span v-show="loginDown" class="loginDwondl">
            <dl>
              <dd class="loginDwondlTop" @click="loginShow1">
                <img src="@/assets/images/phone/denglu02.png">
                {{this.currentAccount}}</dd>
              <dd class="loginDwondlOne">
                <p style="color: rgb(62, 202, 214);">
                  <span>{{this.eos_balance}}</span>
                </p>
              </dd>
              <dd class="loginDwondlTwo">
                <p style="color: rgb(62, 202, 214);">
                  <span>{{this.eos_balanceekd}}</span>
                </p>
              </dd>
              <dd class="loginDwondlThree">
                <p @click="signOut">{{$t('ekd.Signout')}}</p>
              </dd>
            </dl>
          </span>
        </div>
        <div class="titleDiv_language">
          <img :src="language" @click="checkLanguage" class="titleDiv_languageImg">
          <div class="otherLanguage" v-show="languageStatus" @mouseleave="languageStatus = false">
            <img :src="ICON_01KO" alt @click="tabKO">
            <img :src="ICON_02CN" alt @click="tabCn">
            <img :src="ICON_03EN" alt @click="tabEn">
          </div>
        </div>
      </div>
      <div class="navTitle">
        <ul>
          <li @click="clickShareState">{{$t('menu.share_out')}}</li>
          <li>
            <a href="#" @click="shareWin()">{{$t('menu.share')}}</a>
          </li>
          <li>
            <a :href="whitebook_href" target="_self">{{$t('menu.whitebook')}}</a>
          </li>
          <li @click="changenoticeStatus1">{{$t('menu.notice')}}</li>
        </ul>
      </div>

      <!-- 推荐人蒙版 -->
    <div v-show="share" class="ivu-modal-mask shareDiv" @click="cancelShare" @mousewheel.prevent @touchmove.prevent>
      <div class="ivu-modal" style="width:100%;">
        <div class="ivu-modal-content">
          <div class="ivu-modal-body">
            <div class="referrer_window" id="referrer_window">
              <div class="referrer_window_con">
                <div class="tit">
                  <span>{{$t('menu.share')}}</span>
                  <div class="btn" @click="cancelShare">
                    <img src="@/assets/images/share_out/cancel.png" style="width:3rem;">
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
                    class="btn1"
                    :data-clipboard-text="'https://eoskingdom.io/#/?ref='+this.currentAccount"
                    @click="copy"
                  >{{$t('ekd.copy')}}</div>
                </div>

                <p>
                  {{$t('ekd.Invitationstart')}}
                  <label>0.15%</label>
                  {{$t('ekd.Invitationend')}}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


      <!-- 公告部分 -->
    <div class="Mask" v-show="noticeStatus" @touchmove.prevent @touchmove.stop @touchstart="changenoticeStatus2"></div>
    <div v-show="noticeStatus" class="noticeDiv" @touchmove.prevent @touchmove.stop>
      <div class="noticeShow">
        <img
              class="left"
              src="@/assets/images/share_out/return.png"
              v-if="tableShow === false"
              @touchstart="returnList"
            >
        <img class="titleNameImg" src="@/assets/images/phone/noticeTitleImg.png" alt="">
        <img class="right" src="@/assets/images/phone/close.png" @touchstart="changenoticeStatus2" alt="">
      </div>
      <div  v-if="tableShow">
        <Table :show-header="false" :columns="columns1" :data="historyData"></Table>
        <Page :total="dataCount" size="small" :page-size="pageSize" class="paging" @on-change="changepage"></Page> 
      </div>
      <div v-else @touchmove.prevent @touchmove.stop @click.stop @click.prevent style="position:relative;overflow: hidden">
        <h3 class="noticetitle">{{detailedTitle}}</h3>
        <div class="contentStyle" @touchmove.stop v-html="detailedContent">{{detailedContent}}</div>
      </div>
    </div>
    <son-tankuang :title="sonTitle" :content="sonContent" :showHide="sonShowHide" :makeSure="sonMakeSure" :change="sonchange"></son-tankuang>
    </div>
</template>
<script>
// 公共
import sonTankuang from '@/components/page/sonTankuang'

import "@/assets/css/nav.css";
// 复制组件必须
import Clipboard from "clipboard";
import Eos from "eosjs";
import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs";
ScatterJS.plugins(new ScatterEOS());
import Service from "@/assets/js/scatterservice.js";
import {confignode} from "@/assets/js/scatterconfig.js";
import bgconn from "@/assets/js/bgconn.js";
import EosTab from "@/assets/js/EosTab";
export default {
  inject:['reload'],
  components: {sonTankuang},
  props:["qiandaolimian"],
  data() {
    return {
      // 控制弹框显示隐藏
      sonShowHide:false,
      // 控制弹框标题
      sonTitle:null,
      // 控制弹框内容
      sonContent:null,
      // 控制弹框按钮是否变成下载链接
      sonMakeSure:null,
      tableShow: true, //列表或详情
      detailedTitle: "", //公告详情标题
      detailedContent: "", //公告详情内容
      // 每页显示多少条
      pageSize:10,
      // share_out定时器状态
      shareout_Int:false,
      // 公告弹框状态
      noticeStatus:false,
      //检测用户登录状态
      loginSatus: false,
      // 登录框登陆后下拉框状态
      loginDown: false,
      // 获取当前语言状态
      yuyanState:false,
      // 推荐人状态
      share: false,
      //邀请人链接
      Inviter: bgconn.INVITERLINK,
      // 初始化信息总条数
      dataCount:0,
      historyData:[],
      ajaxHistoryData:[],
      NOW:require("@/assets/images/nav/now.png"),
      eos_balance:0,
      eos_balanceekd:0,
      exitloginSatus: false,
      issignout: false,
      languageStatus: false,
      ICON_01KO: require("@/assets/images/nav/ICON_01KO.png"),
      ICON_02CN: require("@/assets/images/nav/ICON_02CN.png"),
      ICON_03EN: require("@/assets/images/nav/ICON_03EN.png"),
      currentAccount: null,
      currentPermission: null,
      scatter: null,
      eosClient: null,
      type: "ko",
      config:null,
      language: require("@/assets/images/nav/ICON_01KO.png"),
      whitebook_href: "https://eoskingdom.io/EKD_WhitePaper_KR.pdf",
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
                    style: "font-size: 1.3rem;position: relative;text-align:left;"
                  }
                },
                [
                  h(
                    "a",
                    {
                      style: "display:inline-block;width:70%;text-overflow: ellipsis;white-space: nowrap;overflow:hidden;color:#000;fontSize:1rem;margin-left:1rem;",
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
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    attrs: {
                      src: this.NOW,
                      style:
                        "width: 2rem;\n" +
                        "position: absolute;\n" +
                        "border-radius: 2px;\n" +
                        "bottom: 40%;\n" +
                        "vertical-align: middle"
                    }
                  })
                ]
              );
            } else {
              return h(
                "div",
                {
                  attrs: {
                    style: "font-size: 1.3rem;position: relative;text-align:left;"
                  }
                },
                [
                  h(
                    "a",
                    {
                      style: "display:inline-block;width:70%;text-overflow: ellipsis;white-space: nowrap;overflow:hidden;color:#000;fontSize:1rem;margin-left:1rem;",
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
          width: 100,
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
      ],
    }
  },
  created() {
    //用户登录后没有退出，只进行页面刷新操作与scatter建立链接
     confignode().then(rs=>{
       this.config={       
         blockchain: "eos",
        host: rs[0].name,
        port: 443,
        protocol: "https",
        chainId: rs[0].chainid
}
      Service.config=this.config
    if (sessionStorage.getItem("accountmsg") != null) {
      this.currentAccount = JSON.parse(sessionStorage.getItem("accountmsg")).currentAccount;
      Service.get_currency_balance(this.currentAccount).then(rs => {
        this.eos_balance = rs[0].substr(0, rs[0].length - 4);
      });
      Service.get_currency_balanceEkd(this.currentAccount).then(rs => {
        if (rs != "") {
          this.eos_balanceekd =
            Math.floor(rs[0].substr(0, rs[0].length - 4) * 100 + 0.0001) / 100;
        }
      });
      ScatterJS.scatter
        .connect("scatter-demo")
        .then(connected => {
          if (!connected) {
            return false;
          }
          Service.EosAcc.scatter = ScatterJS.scatter;
          window.scatter = null;
          window.ScatterJS = null;
          Service.EosAcc.eosClient = Service.EosAcc.scatter.eos(this.config, Eos);
          Service.pledgerecord();
          this.Inviters();
          this.$emit('childByValue', this.currentAccount)
        })
        .catch(error => {
          // console.log("第一次连接失败")
        });
    } else {
      this.Unlinkscatter();  
    }
     }).catch((err)=>{
      //  console.log("初始化失败")
     })
  },
  mounted() {
    this.language1();
    if (this.$i18n.locale === "korean") {
      this.language = this.ICON_01KO;
    } else if (this.$i18n.locale === "zh") {
      this.language = this.ICON_02CN;
    } else if (this.$i18n.locale === "en") {
      this.language = this.ICON_03EN;
    }
    if (sessionStorage.getItem("accountmsg") != null) {
      this.loginSatus = true;
    }
  },
  methods: {
    sonchange(val) {
      this.sonShowHide = val;
    },
    // 切换语言
    checkLanguage() {
      this.languageStatus = !this.languageStatus;
    },
    // 推荐人
    shareWin() {
      this.share = true;
    },
    cancelShare() {
      this.share = false;
    },
    // 公告栏状态切换
    changenoticeStatus1(){
      this.noticeStatus = true;
      this.notice();
      
    },
    changenoticeStatus2(){
      this.noticeStatus = false;
      this.tableShow = true;
    },
    // 登陆后下拉框状态
    loginShow() {
      this.loginDown = true;
    },
    loginShow1() {
      this.loginDown = false;
    },
    // 分红池状态切换
    clickShareState(){
      this.$router.push({name:"share_out"})
    },
    clickShareState1(){
      this.$router.push({name:"phoneIndex"})
    },
    changepage(index){
        var _start = ( index - 1 ) * this.pageSize;
        var _end = index * this.pageSize;
        this.historyData = this.ajaxHistoryData.slice(_start,_end);
    },
    // 复制粘贴
    copy() {
      var clipboard = new Clipboard(".btn1");
      clipboard.on("success", e => {
        console.log("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        console.log("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
      });
    },
    icoInfo() {
      Service.getTableRows(EosTab.ICOACC, EosTab.ICOACC, EosTab.GLOBAL).then(
        data => {
          this.surplusEKD = data.rows[0].total;
          this.progressValue = `${(
            ((2000000000 - parseFloat(this.surplusEKD)) / 2000000000) *
            100
          ).toFixed(2)}%`;
          this.progressWidth = { width: `${this.progressValue}` };
        }
      ).catch((e)=>{});
      Service.getTableRows(
        EosTab.ICOACC,
        EosTab.ICOACC,
        EosTab.ICOCONTENT
      ).then(data => {
        this.surplusEKD = data.rows[0].total;
        this.scale = data.rows[0].scale;
      }).catch((e)=>{});
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
        this.handleListApproveHistory()
    },
    // // 获取历史记录信息
    handleListApproveHistory(){
      // 保存取到的所有数据
      this.ajaxHistoryData = this.data1
      this.dataCount = this.data1.length;
      // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
      if(this.data1.length < this.pageSize){
          this.historyData = this.ajaxHistoryData;
      }else{
          this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
      }
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
    language1() {
        var language = (
          navigator.browserLanguage || navigator.language
        ).toLowerCase();
        if (language.indexOf("zh") > -1) {
          this.tabCn();
        } else if (language.indexOf("en") > -1) {
          this.tabEn();
        } else if (language.indexOf("ko") > -1) {
          this.tabKO();
        } else {
          this.tabEn();
        } 
        this.yuyanState=true;
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
              console.log("邀请成功！");
            }
          }
        } else {
          // console.log("非法账号" + parma);
        }
      } else {
        // console.log("邀请失败：" + window.location.href);
      }
    },
    linkscatter() {
      Service.getIdentity(Service.EosAcc.scatter).then(() => {
        const account = Service.EosAcc.scatter.identity.accounts.find(
          x => x.blockchain === "eos"
        );
        if (account != null) {
          let accountmsg = {
            currentAccount: account.name,
            currentPermission: account.authority
          };
          this.currentAccount = account.name;
          this.uservisit(account.name);
          sessionStorage.setItem("accountmsg", JSON.stringify(accountmsg));
          Service.EosAcc.eosClient = Service.EosAcc.scatter.eos(this.config, Eos);
          this.loginSatus = true;
          //$('.loginBut span').css("display","none");
          Service.pledgerecord();
          Service.get_currency_balance(this.currentAccount).then(rs => {
            this.eos_balance=rs[0].substr(0,rs[0].length-4)
          }).catch((e)=>{});

          
          Service.get_currency_balanceEkd(this.currentAccount).then(rs => {
            if (rs != "") {
              this.eos_balanceekd =
                Math.floor(rs[0].substr(0, rs[0].length - 4) * 100 + 0.0001) /
                100;
            }
          }).catch((e)=>{});
          this.loginSatus = true;
          this.Inviters();
          this.$emit('childByValue', this.currentAccount);
          // 配合签到
          // if(sessionStorage.getItem('isclose')==null){
          //   this.qiandaolimian(true)
          // }
        } else {
          this.showHide=true;
          this.showHideInfo=this.$t('ekd.loginFail')
        }
      }).catch(()=>{
        if (Service.EosAcc.scatter==null) {
          this.sonShowHide=true;
          this.sonTitle=this.$t("ekd.scatter_Nofind");
          this.sonMakeSure="下载";
        }
      })
    },
    Unlinkscatter() {
      ScatterJS.scatter.connect("scatter-demo").then(connected => {
        if (!connected) {
          this.sonShowHide=true;
          this.sonTitle=this.$t("ekd.scatter_Nofind");
          this.sonMakeSure="下载";
          return false;
        }
        Service.EosAcc.scatter = ScatterJS.scatter;
        window.scatter = null;
        window.ScatterJS = null;
        Service.getIdentity(Service.EosAcc.scatter)
          .then(() => {
            const account = Service.EosAcc.scatter.identity.accounts.find(
              x => x.blockchain === "eos"
            );
            if (account != null) {
              let accountmsg = {
                currentAccount: account.name,
                currentPermission: account.authority
              };
              this.currentAccount = account.name;
              this.uservisit(account.name);
              sessionStorage.setItem("accountmsg", JSON.stringify(accountmsg));
              Service.EosAcc.eosClient = Service.EosAcc.scatter.eos(
               this.config,
                Eos
              );
              this.loginSatus = true;
              Service.pledgerecord();
              Service.get_currency_balance(this.currentAccount).then(rs => {
                this.eos_balance=rs[0].substr(0,rs[0].length-4)
              }).catch((e)=>{});
              Service.get_currency_balanceEkd(this.currentAccount).then(rs => {
                if (rs != "") {
                  this.eos_balanceekd =
                    Math.floor(
                      rs[0].substr(0, rs[0].length - 4) * 100 + 0.0001
                    ) / 100;
                }
              }).catch((e)=>{});
              this.Inviters();
              this.$emit('childByValue', this.currentAccount);
              // 配合签到
              // if(sessionStorage.getItem('isclose')==null){
              //   this.qiandaolimian(true)
              // }
            } else {
              this.showHide=true;
              this.showHideInfo=this.$t('ekd.loginFail')
            }
          })
          .catch(error => {
            Service.EosAcc.issignout = true;
            // console.log("钱包解锁失败");
          });
      }).catch(err=>{
        // console.log("unlinked连接失败"+JSON.stringify(err))
      });
    },
    //账号登录
    loginFN() {
      this.linkscatter();
    },
    tabKO() {
      this.type = "ko";
      this.$i18n.locale = "korean";
      this.language = this.ICON_01KO;
      this.languageStatus = false;
      this.whitebook_href = "https://eoskingdom.io/EKD_WhitePaper_KR.pdf";
      this.$emit("localeMethods", "ko")
    },
    tabCn() {
      this.type = "cn";
      this.$i18n.locale = "zh";
      this.language = this.ICON_02CN;
      this.languageStatus = false;
      this.whitebook_href = "https://eoskingdom.io/EKD_WhitePaper_CN.pdf";
      this.$emit("localeMethods", "cn")
    },
    tabEn() {
      this.type = "en";
      this.$i18n.locale = "en";
      this.language = this.ICON_03EN;
      this.languageStatus = false;
      this.whitebook_href = "https://eoskingdom.io/EKD_WhitePaper_EN.pdf";
      this.$emit("localeMethods", "en")
    },
    // 公告列表详情状态切换
    returnList() {
      this.tableShow = true;
    },
    //添加用户访问记录
    uservisit(name) {
      this.$http
        .get(bgconn.USERVISIT, { params: { account: name } })
        .then(rs => {
        }).catch((e)=>{});
    },
    //退出
    signOut() {
      Service.forgetIdentity().then(rs => {
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
        Service.EosAcc.redeemabletime = 0;
        this.loginDown = false;
        $(".share_out .bottomOne").css("display", "none");
        $(".share_out .dibu").css("display", "none");
        this.$emit('childByValue', this.currentAccount)
      }).catch((e)=>{});
    },
    
  },
}
</script>

<style scoped>

</style>
