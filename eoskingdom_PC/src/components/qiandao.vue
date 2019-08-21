<template>
  <div class="qiandao_announcements">
    <div class="qiandao">
      <div class="qiandao_top">
        <span></span>
        <span @click="closeqiandao"></span>
      </div>

      <div class="qiandao_contents">
        <ul>
          <li v-for="i in 7" :key="i">
      
            <div
              class="ekdimg"
              :id="i"
              @click="linqujianli($event)"
              :jianlivalue="qirijiangli[i-1]"
              :style="alertqitian+1<=i?'':'box-shadow:none'"
            >
             <span > <img draggable="false" :src="alertqitian+1<=i ?imglist[i-1]:imglist3[i-1]" :style="alertqitian+1<=i?'':'top:-14px;left:-13px'" ></span>
              <div v-if="i==xqj" class="daojishitime" :style="jianglilingqu==1?'display:block':'display:none'">
                <img
                  src="../../src/assets/images/qiandao/miaobiao.png"
                  style="position:relative;top:6px;"
                >
                {{qiandaodaojishi}}<span style="position:relative;top:-42px; display:block;font-size:8px;left:40px; display:none">更新签到</span>
              </div>
               <div class="mongban2" style="color:white;" :style="alertqitian+1<=i?'':'color:#5A5A5A'"><span >{{$t('qiandao.lingqu')}}</span>
               <span  :style="alertqitian+1<=i?'':'color:#6A6A6A'" >{{$t(`qiandao.day${i}`)}}</span>
               </div>

              <div class="mongban" :style="alertqitian+1<=i?'':'display:none'"></div>
              <div class="ylqdiv" :style="alertqitian+1<=i?'':'top:-148px;'">{{$t('qiandao.yilinqu')}}</div>
            </div>
          </li>
           <span style=" position: absolute;bottom:150px;color:white;left:242px;font-size:10px; text-align:center;  display: inline-block;">{{$t('qiandao.beizhu')}}:&nbsp;&nbsp;{{$t('qiandao.Completegame')}}</span>
        </ul>
       
      </div>
      <div class="qiandao_leiji"></div>
      <div class="qiandao_bottom">
        <div class="qiandao_bottom_top">
          <div>
            <span
              class="linquekds0"
              :id="7"
              @click="zhixingdonghua1($event)"

            >{{$t('qiandao.day7')}}</span>
            <span class="leijiday">500 EKD</span>
          </div>
          <div>
            <span
              class="linquekds1"
              :id="14"
              @click="zhixingdonghua1($event)"

            >{{$t('qiandao.day14')}}</span>
            <span class="leijiday">1000 EKD</span>
          </div>
          <div>
            <span
              class="linquekds2"
              :id="21"
              @click="zhixingdonghua1($event)"
     
            >{{$t('qiandao.day21')}}</span>
            <span class="leijiday">1500 EKD</span>
          </div>
          <div>
            <span
              class="linquekds3"
              :id="28"
              @click="zhixingdonghua1($event)"
         
            >{{$t('qiandao.day28')}}</span>
            <span class="leijiday">2000 EKD</span>
          </div>
          <div class="jindutiao">
            <span class="jindutiao_content"></span>
          
            <div style="z-index:30;">
              <p class="yiwanchen">{{leijiqiandao}}{{$t('qiandao.day')}}</p>
              
            </div>
           
          </div>
        </div>
        <div class="qiandao_bottom_bottom">
          <input type="radio" id="qiandaotanchu" @click="istanchu" name="qiandaotanchu2">
          <label class="tanchu" for="qiandaotanchu"></label>
          <span class="tcmsg">{{$t('qiandao.buzaitanchu')}}</span>
          <span @mouseenter="jinru" @mouseleave="likai">
            <!-- @mouseleave="likai"    -->
            <div class="guize" style="font-size:5px;line-height:25px;">
              <p style="font-size:15px">{{$t('qiandao.guize')}}</p>
              <span
                style="float:left;width:100%;background:none;text-align:left;position: relative;left:10px;height:200px;display: block;"
              >
                一、 {{$t('qiandao.qiriqiandao')}}
                <p style=" text-indent:2em;">1.{{$t('qiandao.everyday')}}</p>
                <p style=" text-indent:2em ">2.{{$t('qiandao.Completegame')}}</p>
                <p style=" text-indent:2em ">3.{{$t('qiandao.lianxuqiandao')}}</p>
                二、{{$t('qiandao.leijiqiandao')}}
                <p style=" text-indent:2em ">1.{{$t('qiandao.leijiqiandao1')}}</p>
                <p style=" text-indent:2em ">2.{{$t('qiandao.leijiqiandao2')}}</p>
                <p style=" text-indent:2em ">3.{{$t('qiandao.leijiqiandao3')}}</p>
              </span>
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import img from "../assets/images/qiandao/duihao.png";
import img001 from "../assets/images/qiandao/qiandaojiangli.png";
import img002 from "../assets/images/qiandao/qiandao002.png";
import img003 from "../assets/images/qiandao/qiandao003.png";
import img1 from "../../src/assets/images/qiandao/1tian.png";
import img2 from "../../src/assets/images/qiandao/2tian.png";
import img3 from "../../src/assets/images/qiandao/3tian.png";
import img4 from "../../src/assets/images/qiandao/4tian.png";
import img5 from "../../src/assets/images/qiandao/5tian.png";
import img6 from "../../src/assets/images/qiandao/6tian.png";
import img7 from "../../src/assets/images/qiandao/7tian.png";
import img10 from "../../src/assets/images/qiandao/yilingqu1.png";
import img11 from "../../src/assets/images/qiandao/yilingqu2.png";
import img12 from "../../src/assets/images/qiandao/yilingqu3.png";
import img13 from "../../src/assets/images/qiandao/yilingqu4.png";
import img14 from "../../src/assets/images/qiandao/yilingqu5.png";
import img15 from "../../src/assets/images/qiandao/yilingqu6.png";
import img16 from "../../src/assets/images/qiandao/yilingqu7.png";

import bgconn from "@/assets/js/bgconnTest.js";
export default {
  name: "qiandao",
  prop:["nextShow"],
  data() {
    return {
      currentaccount: null,
      //  isshowqiandao:true,
      istuichu: false,
      nextShowTo:this.nextShow,
      yiwancheng: 0, //累计签到的天数
      qiandaodaojishi: "00:00:00", //倒计时显示
      imglist: [img1, img2, img3, img4, img5, img6, img7],
      // imglist2:[true,true,true,true,true,true,true],
      imglist3:[img10, img11, img12, img13, img14, img15, img16],
      xqj: 2, //倒计时显示在第几天
      xqjz:0,//累计签到天数
      qirijiangli: [
        "100 EKD",
        "200 EKD",
        "0.10 EOS",
        "600 EKD",
        "700 EKD",
        "800 EKD",
        "0.5 EOS"
      ], //1~7天每天的奖励
      clickday: 0, //七天签到中第几天可以触发点击,
      qitianday: [],
      qitianjiangli:0, //7天连续签到次数
      time:"2019/06/20 16:00:00 UTC", //服务器当前时间
      leijiqiandao:0,//累计签到天数
      leijiweilingqu:[],//累计奖励未领取
      leijieyilingqu:[],//累计奖励已领取
      wanchenrenwu:0,//是否完成签到任务
      jianglilingqu:0,//当天是否完成签到
      signTotalEntity:null,//累计签到奖励领取信息
      alertqitian:0,//七天中已经领取奖励的天数
      
    };
  },
  created() {
    this.currentaccount = JSON.parse(
      sessionStorage.getItem("accountmsg")
    ).currentAccount;
   
  },
  mounted() {
    //七日签到已经领取奖励
    this.accountmsg(); 
    this.countdown();
     if(sessionStorage.getItem('isclose')!=null){
      this.istanchu()
    }
     if(this.$i18n.locale=='zh'){
     
      $('.qiandao_top span:first-Child').css({
      background: `url(${img001}) no-repeat`,
      "background-size": "100% 100%",
      'width':'20%'
      })
    }else if(this.$i18n.locale=='en'){

  $('.qiandao_top span:first-Child').css({
      background: `url(${img002}) no-repeat`,
      "background-size": "100% 100%",
      'width':'35%'
      })
    }else{

       $('.qiandao_top span:first-Child').css({
      background: `url(${img003}) no-repeat`,
      "background-size": "100% 100%",
      'width':'18%'
      })

    }
  },
  watch: {
    istuichu() {
      if(this.istuichu){
        sessionStorage.setItem('isclose',true)
      }else{
        sessionStorage.removeItem('isclose')
      }
    },
    yiwancheng(val) {
    }
  },
  methods: {
    //倒计时
    countdown(){
      setInterval(() => {
        var te = new Date(this.time).getTime()-(new Date().getTime());
        if (
          new Date(te).getUTCHours() == 0 &&
          new Date(te).getUTCMinutes() == 0 &&
          new Date(te).getUTCSeconds() == 0
        ) {
          this.xqj++;
          this.accountmsg()
        }
        this.qiandaodaojishi = ` ${this.changeTime(new Date(te).getUTCHours())}:${this.changeTime(new Date(
        te
        ).getUTCMinutes())}:${this.changeTime(new Date(te).getUTCSeconds())}`;
      sessionStorage.setItem('djs',this.djs)
      }, 1000);
    },
    changeTime(val){
      if(val<10&&val>=0){
        return "0"+val;
      }else{
        return val;
      }
    },
    accountmsg(){
      if (this.currentaccount != null) {
        this.$http
          .get(
            bgconn.checkqiandao,{params:{account:this.currentaccount}}
          )
          .then(res => {
            this.qitianjiangli=res.data.sign_count;
            this.signTotalEntity=res.data.signTotalEntity
            this.wanchenrenwu=res.data.complete
            this.jianglilingqu=res.data.isSign
            //判断累计签到的状态
            this.leijiezhuangtai(res)
            // if(this.qitianjiangli==0){
              this.xqj=this.qitianjiangli+1
              if(res.data.complete==1){
                if(res.data.isSign==1){
                  if(this.qitianjiangli==7){
                    if(sessionStorage.getItem('isflash')==null){
                      this.xqj=1
                      this.alertqitian=0
                      $('.ylqdiv').css('display','none')
                    }  
                  }else{
                    this.alread(this.qitianjiangli)  
                    this.alertqitian=this.qitianjiangli        
                  }
                }else{
                $(".ekdimg")
                .eq(this.qitianjiangli-1)
                .css({ boxShadow: "#10ADC4 0px 0px 15px 8px",cursor: "pointer" });
                $(".ekdimg .mongban")
                .eq(this.qitianjiangli-1)
                .css("display", "none"); 
                this.clickday=this.qitianjiangli
                this.alread(this.qitianjiangli-1)
                this.alertqitian=this.qitianjiangli-1    
                }
                }else{
                  this.alread(this.qitianjiangli-1)
                  this.alertqitian=this.qitianjiangli-1     
                }
          })
      }else{
        this.qitianjiangli=0;
        this.signTotalEntity=null;
        this.wanchenrenwu=0;
        this.jianglilingqu=0;
        this.leijiqiandao=0;
      }
    },
    linqujianli(event) {
      var tg = event.currentTarget;
      var id = parseInt($(tg).attr("id"));
      if (this.clickday!=0 && id==this.clickday) {
        $(tg).css({ "box-shadow": "none" });
        this.alertqitian=this.alertqitian+1
        this.$http.get(
         bgconn.lingquqiri,{params:{account:this.currentaccount,day:this.qitianjiangli}}
        ).then(rs=>{
          console.log("rs===="+JSON.stringify(rs))
          if(rs.data.code==200){
            $(tg.lastChild).css({ display: "block" });
            this.accountmsg() 
            this.clickday=0
            sessionStorage.setItem('isflash','flash')
            }else{
              $(".ekdimg")
                .eq(id-1)
                .css({ boxShadow: "#10ADC4 0px 0px 15px 8px" });
                this.alertqitian=this.alertqitian-1
            }
        });
        }else{
        console.log("阻止点击")
      }
    },
    closeqiandao() {
      this.$emit("childqiandao", false);
      sessionStorage.removeItem('isflash')
    },
    istanchu() {
      this.istuichu = !this.istuichu;
      $("#qiandaotanchu").prop("checked", this.istuichu);
    },
    jinru() {
      $(".guize").css("display", "block");
    },
    likai() {
      $(".guize").css("display", "none");
    },
    async leijiezhuangtai(res){
     if(res.data.signTotalEntity==null){
              console.log('无签到记录')
          }else{
                this.leijiqiandao=res.data.signTotalEntity.count;
                if(this.leijiqiandao>=7 ){
                  //计算进度条
                  if(this.leijiqiandao!=14 && this.leijiqiandao!=21 && this.leijiqiandao!=7){
                    $(".jindutiao div").css("display", "block");
                    }

                     $(".jindutiao_content").css(
                        "width",
                        `${((this.leijiqiandao - 7) / 21) * 100}%`
                      );
                      $(".jindutiao div").css({
                        left: `${((this.leijiqiandao - 7) / 21) * 100 - 1.3}%`
                      });
                    if(res.data.signTotalEntity.day7==null){
                      //未领取奖励
                      this.leijiweilingqu.push(0)
                    }else{
                      //已领取奖励
                      this.leijieyilingqu.push(0)
                    }


                    if(this.leijiqiandao>=14){
                  console.log('14')
                    if(res.data.signTotalEntity.day14==null){
                      //未领取奖励
                       this.leijiweilingqu.push(1)
                    }else{
                      //已领取奖励
                        this.leijieyilingqu.push(1)
                    }


                 if(this.leijiqiandao>=21){
                   console.log('21')
                     if(res.data.signTotalEntity.day21==null){
                      //未领取奖励
                       this.leijiweilingqu.push(2)
                    }else{
                      //已领取奖励
                        this.leijieyilingqu.push(2)
                    }
                if(this.leijiqiandao>=28){
                  $('.jindutiao div').css('display','none')
                  //  $(".jindutiao div").css("display", "block");
                 $(".jindutiao_content").css(
                    "width",
                    `100%`
                  );
                  $(".jindutiao div").css({
                    left: `100%`
                  });
                   console.log('28')
                     if(res.data.signTotalEntity.day28==null){ 
                      //未领取奖励
                       this.leijiweilingqu.push(3)
                    }else{
                      //已领取奖励
                        this.leijieyilingqu.push(3)
                    }
                }
                }
                }
                }
                //累计奖励未领取
                this.leijipanduan(this.leijiweilingqu)
                //累计奖励已领取
                this.leijiislq(this.leijieyilingqu)
          }
    },
    alread(list) {
    console.log('alread==='+list)
      for (var i = 0; i < list; i++) {
           $(".ekdimg")
          .eq(i)
          .css({ "box-shadow": "none" });
        $(".ylqdiv")
          .eq(i)
          .css("display", "block");
      }
    },
    zhixingdonghua1(event) {
      //累计奖励点击领取
      var tg = event.currentTarget;
      var classname = $(tg).attr("class");
      var parentname = null;
      switch (classname) {
        case "linquekds0":  
          if (this.signTotalEntity.day7 ==null && this.leijiqiandao>=7) {
            console.log('开始时间'+new Date().getTime())
            this.$http.get(bgconn.leijiqiandao,{params:{account:this.currentaccount,type:1}}).then(rs=>{
              if(rs.data.code==200){
                console.log('结束时间==='+new Date().getTime())
                //执行领取成功动画
                parentname = ".qiandao_bottom_top div:nth-child(1)";
                this.setparentcss(tg, classname, parentname);
                $(tg).html("+500EKD");
                $(tg).attr("class", "linquekd");
                this.signTotalEntity.day7 ='day7'
                 setTimeout(() => {
                    $(tg).attr("class", classname);
                      $(tg).html("");
                  }, 3000);
              }else{
              }
            })
          }else{
            console.log("不符合条件7")
          }
          break;
        case "linquekds1":
          if (this.signTotalEntity.day14 ==null&& this.leijiqiandao>=14) {
            this.$http.get(bgconn.leijiqiandao,{params:{account:this.currentaccount,type:2}}).then(rs=>{
                console.log('累计奖励领取2==='+JSON.stringify(rs))
              if(rs.data.code==200){
                //执行领取成功动画
                parentname = ".qiandao_bottom_top div:nth-child(2)";
                this.setparentcss(tg, classname, parentname);
                 $(tg).html("+1000EKD");
                $(tg).attr("class", "linquekd");
                this.signTotalEntity.day14='day14'
                setTimeout(() => {
                    $(tg).attr("class", classname);
                      $(tg).html("");
                  }, 3000);
              }else{
              }
            }).catch(err=>{
              console.log("领取失败==="+JSON.stringify(err))
            })
          }else{
            console.log("不符合条件14")
          }

          break;
        case "linquekds2":
          if (this.signTotalEntity.day21 ==null && this.leijiqiandao>=21) {
            this.$http.get(bgconn.leijiqiandao,{params:{account:this.currentaccount,type:3}}).then(rs=>{
                console.log('累计奖励领取3==='+JSON.stringify(rs))
              if(rs.data.code==200){
                //执行领取成功动画
                parentname = ".qiandao_bottom_top div:nth-child(3)";
                this.setparentcss(tg, classname, parentname);
                  $(tg).html("+1500EKD");
                  $(tg).attr("class", "linquekd");
                  this.signTotalEntity.day21='day21'
                  setTimeout(() => {
                    $(tg).attr("class", classname);
                      $(tg).html("");
                  }, 3000);
              }else{
              }
            })
           }else{
            console.log("不符合条件21")
          }

          break;
        case "linquekds3":
          if (this.signTotalEntity.day28 ==null && this.leijiqiandao>=28) {
            this.$http.get(bgconn.leijiqiandao,{params:{account:this.currentaccount,type:4}}).then(rs=>{
             console.log('累计奖励领取4==='+JSON.stringify(rs))
              if(rs.data.code==200){
                //执行领取成功动画
                  parentname = ".qiandao_bottom_top div:nth-child(4)";
                  this.setparentcss(tg, classname, parentname);
                 $(tg).html("+2000EKD");
                 $(tg).attr("class", "linquekd");
                  this.signTotalEntity.day28='day28'
                  setTimeout(() => {
                    $(tg).attr("class", classname);
                      $(tg).html("");
                  }, 3000);
                 
              }else{
              }
            })
         }else{
            console.log("不符合条件28")
          }
       break;
      }
    },
    setparentcss(tg, classname, parentname) {
        $(tg).attr("class", classname);
        $(tg).html("");
        $(parentname).css({
          background: `url(${img}) no-repeat`,
          "background-size": "70% 70%",
          "background-position-x": "7px",
          "background-position-y": "7px",
          "background-color": "#121722",
          "box-shadow": "none"
        });
    },
    linqujiangli(event){
      var tg = event.currentTarget;
      $(tg).html("已领取");
    },
    leijipanduan(count) {
      for(var i=0;i<count.length;i++){   
         $(`.qiandao_bottom_top div:nth-child(${count[i]+1})`).css({
        background: "radial-gradient(circle,#22C7EE,#0E98B9)",
        "box-shadow": "rgb(113, 241, 224) 0px 0px 10px 2px ",
        color: "white",
        cursor: "pointer"
      });
      $(`.linquekds${count[i]}`).css("font-size", "20px");
      $(`.linquekds${count[i]}`).html(`${this.$t("qiandao.lingqu")}`);
      }
    },
    leijiislq(day) {
      //累计签到任务达成且奖励已经领取
      for(var i=0;i<day.length;i++){
          $(`.linquekds${day[i]}`).html("");
          $(`.qiandao_bottom_top div:nth-child(${day[i]+1})`).css({
            background: `url(${img}) no-repeat`,
            "background-size": "70% 70%",
            "background-position-x": "7px",
            "background-position-y": "7px",
            "background-color": "#121722",
            "box-shadow": "none"
          });
      }
    },
    liangxuqiandao(day) {
      for (var i = 0; i < day; i++) {
        $(".ekdimg")
          .eq(i)
          .css({ boxShadow: "#10ADC4 0px 0px 15px 8px" });
        $(".ekdimg .mongban")
          .eq(i)
          .css("display", "none");
      }
    }
  }
};
</script>

<style  scoped>
.linquekd {
  width: 40px;
  position: relative;
  -webkit-animation: dh 3s infinite;
}
@keyframes BigToSma{
  from{
    transform: scale(2) rotate(-30deg);

    }
  to{
    transform: scale(1) rotate(-30deg);
  
    }
}
.ylqdiv{
  animation: BigToSma 0.3s ease-out forwards;
}
@keyframes dh {
  from {
    top: -3px;
    color: rgb(220, 255, 19);
    opacity: 1;
    font-weight: 1000;
  }
  to {
    top: -60px;
    text-shadow: none;
    display: none;
    opacity: 0;
  }
}
.yiwanchen {
  width: 37px;
  left: -15px;
  top: 0px;
  color: #e9a504;
  z-index: 2000 !important;
}

.ekdimg {
  width: 120px;
  height: 119px;
  background-size: cover;
  border-radius: 10px;
  background-color: #313b4a;
  position: relative;
  margin-left: 50px;
  margin-top: 20px;
}
.ekdimg:first-child {
  margin-left: 90px;
}
.ekdimg img {
  position: relative;
  top: -6px;
  left: -6px;

}
.qiandao_contents ul li:nth-child(4) .ekdimg,
.qiandao_contents ul li:nth-child(5) .ekdimg,
.qiandao_contents ul li:nth-child(6) .ekdimg,
.qiandao_contents ul li:nth-child(7) .ekdimg {
  margin-left: 47px;
  margin-top: 43px;
  position: relative;
}

.daojishitime {
  position: relative;
  top: -50px;
  left: 7px;
  color: #ecfdfd;
  font-size: 20px;
  font-family: unset;
  font-weight: 1000;
}

/* #313B4A */
.mongban {
  position: absolute;
  /* content: ""; */
  /* background: #313b4a; */
  opacity: 0.5;
  z-index: 1;
  width: 107%;
  height: 104%;
  border-radius: 10px;
  left: -6px;
  top: -6px;
  background: url('../../src/assets/images/qiandao/heisemengbang.png')
}


.mongban2{
   position: absolute;
  /* content: ""; */
  z-index: 1;
  width: 107%;
  height: 104%;
  border-radius: 10px;
  left: -6px;
  top: -6px;
  
}
.mongban2 span:first-child{
 margin-left: 0 auto;
width: 100%;
position:relative;
top:80px;
float: left;
font-size: 20px;
line-height: 52px;
text-align: center;
font-family: "微软雅黑";
font-weight: 1000;
}
.mongban2 span:last-child{
  transform: rotate(50deg);
  float:right;
  position:relative;
  width: 30px;
  font-size:18px;
display: block;
left: -3px;
top:-60px;
color: #951728;
font-weight: 1000;
font-family: "微软雅黑";
}
.ylqdiv {
  color: #951728;
  position: relative;
  top: -137px;
  z-index: 2000;
  border: 3px solid #aa1616;
  border-radius: 10px;
  background-color: #fff;
  transform: rotate(-30deg);
  opacity: 0.6;
  height: 55px;
  font-size: 25px;
  text-align: center;
  font-family: "微软雅黑";
  font-weight: 1000;
  width: 122px;
  line-height: 50px;
  display: none;
  left: 0px;
}

.qiandao_announcements {
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  font-family: "fz";
  left: 0px;
  top: 0px;
}

.qiandao {
  background-color: #121722;
  position: fixed;
  width: 760px;
  height: 587px;
  top: 20%;
  left: 30%;
  font-family: "fz";
  border-radius: 30px;
  /* display: -webkit-box;
  -webkit-box-orient: vertical; */
  border: 4px solid rgb(4, 220, 248);
}
.qiandao_top {
  text-align: center;
  line-height: 60px;
  height: 12%;
  border-radius: 15px;
  font-weight: 800;
  font-size: 25px;
}
.qiandao_top span {
  position: relative;
  left: 26px;
  /* background: url("../../src/assets/images/qiandao/qiandao003.png")
    no-repeat;
  background-size: 100% 100%; */
  height: 43px;
  width: 40%;
  display: inline-block;
  top: 10px;
}

.qiandao_top span:nth-child(2),
.qiandao_bottom_bottom span:last-child {
  display: block;
  float: right;
  width: 35px;
  height: 35px;
  cursor: pointer;
  background: url("../../src/assets/images/qiandao/wenhao.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  top: -1px;
  left: -11px;
  
}
.qiandao_top span:last-child {
  top: 10px;
  width: 50px;
  height: 50px;

  background: url("../../src/assets/images/qiandao/guanbi.png") no-repeat;
  background-size: 100% 100%;
}
.qiandao ul {
  background-color: #313b4a;
  display: block;
  border-radius: 20px;
  width: 95%;
  height: 355px;
  margin-left: 17px;
}

.qiandao_bottom {
  height: 140px;
}
.qiandao_bottom_top {
  align-content: center;
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 110px;
  font-size: 10px;
  position: relative;
}
.qiandao_bottom_top div:first-child,
.qiandao_bottom_top div:nth-child(2),
.qiandao_bottom_top div:nth-child(3),
.qiandao_bottom_top div:nth-child(4) {
  align-content: center;
  float: left;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  text-align: center;
  z-index: 11;
  background: #121722;
  position: relative;
  border: 4px solid #6be1fc;
}
.qiandao_bottom_top div:first-child {
  left: -190px;
}
.qiandao_bottom_top div:nth-child(2) {
  left: -58px;
}
.qiandao_bottom_top div:nth-child(3) {
  left: 60px;
}
.qiandao_bottom_top div:nth-child(4) {
  left: 190px;
}

.qiandao_bottom_top div:nth-child(2) p {
  color: #e9a504;
  text-shadow: none;
  position: absolute;
  top: 0px;
  left: -17px;
  
}
.qiandao_bottom_top div:nth-child(3) p {
  color: black;
  text-shadow: none;
  position: absolute;
  top: 53px;
  left: 18px;
}
.qiandao_bottom_top div:nth-child(4) p {
  color: black;
  text-shadow: none;
  position: absolute;
  top: 47px;
  left: 22px;
}
.qiandao_bottom_bottom {
  height: 38px;
}
.qiandao_bottom_bottom span {
  text-align: center;
  position: relative;
  left: 20px;
  top: -5px;
}
.jindutiao {
  width: 70%;
  height: 12px;
  position: relative;
  top: -33px;
  z-index: 10;
  border: 2px solid rgb(0, 247, 255);
}

.jindutiao_content {
  display: block;
  height: 8px;
  background-color: #0099be;
  /* position: relative; */
  z-index: 20;
  width: 0px;
  max-width: 100%;

}

.jindutiao div:last-child {
  border-radius: 0;
  width: 15px;
  height: 15px;
  border-width: 0px 10px 14px 8px;
  border-style: solid;
  /* border-image: -webkit-linear-gradient(#ddd,#000) 30 30; */
  border-color: transparent transparent #edcd79 transparent;
  position: relative;
  top: 9px;
  box-shadow: none !important;

}
.jindutiao div span {
  position: absolute;
  width: 35px;
  left: -13px;
  text-align: left;
  color: rgb(247, 172, 10);
  
}

.qiandao_bottom_bottom input {
  display: inline-block;
}
.tanchu {
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: inline-block;
  background-color: rgb(20, 20, 20);
  border: 2px solid rgb(186, 252, 252);
  position: relative;
  left: 15px;
  border-radius: 5px;
}
input[type="radio"]:checked + .tanchu {
  background: url("../../src/assets/images/qiandao/duigou2.png") no-repeat;
  background-size: 100% 100%;
}
input[name="qiandaotanchu2"] {
  display: none;
}
.qiandao_leiji span {
  color: rgb(92, 91, 91);
  font-size: 18px;
  text-shadow: 0px 0px 5px rgb(243, 148, 6);
  font-weight: 800;
  position: relative;
  left: 33px;
  top: 7px;
}
.qiandao_leiji {
  /* height: 55px; */
  position: relative;
  top: 20px;
}
.guize {
  color: rgb(207, 253, 253);
  width: 330px;
  height: 305px;
  background: #121722;
  z-index: 10000;
  border-radius: 25px;
  display: none;
  position: relative;
  left: 27px;
  top: -297px;
  border: 2px solid rgb(4, 220, 248);
}
.guize p,
.guize span {
  color: rgb(207, 253, 253);
}
/* .linquekds1 {
 
  font-size: 5px;
  font-weight: 800;
} */
.linquekds0,
.linquekds2,
.linquekds3,
.linquekds1 {
  font-size: 13px;
  font-weight: 800;
  text-shadow: 2px 2px 3px rgb(87, 86, 86);
  /* background: radial-gradient(to left, red, blue);
  -webkit-background-clip: text; */
  color: #ecfdfd;
  /* transform: scale(.8);
    display: inline-block; */
    text-align: center;
    left: -1px;
     position: relative;
    }
.qiandao_bottom_top div span:last-child {
  display: inline-block;
  position: absolute;
  text-align: center;
  text-shadow: none;
  font-size: 12px;
  left: 2px;
  line-height: 35px;
  color: rgb(225, 252, 252);
}
.tcmsg {
  color: rgb(225, 252, 252);
}
.leijiday {
  display: inline-block;
  color: rgb(207, 253, 253);
  position: absolute;
  left: 3px;
  top: 50px;
  white-space: nowrap;
}
.jindutiao div{
  display: none;
  left: 0px;
}
/* .jlamount{
  display: inline-block;
  text-align: center;
} */
</style>
