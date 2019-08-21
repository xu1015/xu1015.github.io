<template>
  <div class="qiandao_announcements">
    <div class="qiandao">
      <div class="qiandao_top">
        <span></span>
        <span @click="closeqiandao"></span>
      </div>
      <div class="qiandao_contents">
        <div class="qiandao_contents_top">
          <div class="qiandao_contents_top_parent">
            <div class="qiandao_contents_top_child">
              <div class="biankuan"></div>
              <div class="tupian">
                <img draggable="false" :src="imglist[0]" />
              </div>
              <div class="tuipian2"></div>
              <div class="time">
                <span class="time_tupian"></span>
                <span class="time_time">{{qiandaodaojishi}}</span>
              </div>
              <div class="mb"></div>
              <div class="mb2" @click="linqujianli($event)" :id="1">
                <div class="mb2_linqu">{{$t('qiandao.lingqu')}}</div>
                <div class="mb2_day">{{$t(`qiandao.day1`)}}</div>
              </div>
              <div class="yilinqu">{{$t('qiandao.yilinqu')}}</div>
            </div>

            <div class="qiandao_contents_top_child">
              <div class="tupian">
                <img draggable="false" :src="imglist[1]" />
              </div>
              <div class="tuipian2"></div>
              <div class="time">
                <span class="time_tupian"></span>
                <span class="time_time">{{qiandaodaojishi}}</span>
              </div>
              <div class="mb"></div>
              <div class="mb2" :id="2" @click="linqujianli($event)">
                <div class="mb2_linqu">{{$t('qiandao.lingqu')}}</div>
                <div class="mb2_day">{{$t(`qiandao.day2`)}}</div>
              </div>
              <div class="yilinqu">{{$t('qiandao.yilinqu')}}</div>
            </div>

            <div class="qiandao_contents_top_child">
              <div class="tupian">
                <img draggable="false" :src="imglist[2]" />
              </div>
              <div class="tuipian2"></div>
              <div class="time">
                <span class="time_tupian"></span>
                <span class="time_time">{{qiandaodaojishi}}</span>
              </div>
              <div class="mb"></div>
              <div class="mb2" :id="3" @click="linqujianli($event)">
                <div class="mb2_linqu">{{$t('qiandao.lingqu')}}</div>
                <div class="mb2_day">{{$t(`qiandao.day3`)}}</div>
              </div>
              <div class="yilinqu">{{$t('qiandao.yilinqu')}}</div>
            </div>

            <div class="qiandao_contents_top_child">
              <div class="tupian">
                <img draggable="false" :src="imglist[3]" />
              </div>
              <div class="tuipian2"></div>
              <div class="time">
                <span class="time_tupian"></span>
                <span class="time_time">{{qiandaodaojishi}}</span>
              </div>
              <div class="mb"></div>
              <div class="mb2" :id="4" @click="linqujianli($event)">
                <div class="mb2_linqu">{{$t('qiandao.lingqu')}}</div>
                <div class="mb2_day">{{$t(`qiandao.day4`)}}</div>
              </div>
              <div class="yilinqu">{{$t('qiandao.yilinqu')}}</div>
            </div>

            <div class="qiandao_contents_top_child">
              <div class="tupian">
                <img draggable="false" :src="imglist[4]" />
              </div>
              <div class="tuipian2"></div>
              <div class="time">
                <span class="time_tupian"></span>
                <span class="time_time">{{qiandaodaojishi}}</span>
              </div>
              <div class="mb"></div>
              <div class="mb2" :id="5" @click="linqujianli($event)">
                <div class="mb2_linqu">{{$t('qiandao.lingqu')}}</div>
                <div class="mb2_day">{{$t(`qiandao.day5`)}}</div>
              </div>
              <div class="yilinqu">{{$t('qiandao.yilinqu')}}</div>
            </div>

            <div class="qiandao_contents_top_child">
              <div class="tupian">
                <img draggable="false" :src="imglist[5]" />
              </div>
              <div class="tuipian2"></div>
              <div class="time">
                <span class="time_tupian"></span>
                <span class="time_time">{{qiandaodaojishi}}</span>
              </div>
              <div class="mb"></div>
              <div class="mb2" :id="6" @click="linqujianli($event)">
                <div class="mb2_linqu">{{$t('qiandao.lingqu')}}</div>
                <div class="mb2_day">{{$t(`qiandao.day6`)}}</div>
              </div>
              <div class="yilinqu">{{$t('qiandao.yilinqu')}}</div>
            </div>

            <div class="qiandao_contents_top_child">
              <div class="tupian">
                <img draggable="false" :src="imglist[6]" />
              </div>
              <div class="tuipian2"></div>
              <div class="time">
                <span class="time_tupian"></span>
                <span class="time_time">{{qiandaodaojishi}}</span>
              </div>
              <div class="mb"></div>
              <div class="mb2" :id="7" @click="linqujianli($event)">
                <div class="mb2_linqu">{{$t('qiandao.lingqu')}}</div>
                <div class="mb2_day">{{$t(`qiandao.day7`)}}</div>
              </div>
              <div class="yilinqu">{{$t('qiandao.yilinqu')}}</div>
            </div>
          </div>
          <div class="beizhu">{{$t('qiandao.beizhu')}}:&nbsp;&nbsp;{{$t('qiandao.Completegame')}}</div>
        </div>
      </div>
      <div class="qiandao_leiji"></div>
      <div class="qiandao_bottom">
        <div class="qiandao_bottom_top">
          <div>
            <span class="linquekds0" :id="7" @click="zhixingdonghua1($event)">{{$t('qiandao.day7')}}</span>
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
          <input type="radio" id="qiandaotanchu" @click="istanchu" name="qiandaotanchu2" />
          <label class="tanchu" for="qiandaotanchu"></label>
          <span class="tcmsg">{{$t('qiandao.buzaitanchu')}}</span>
          <span @mouseenter="jinru" @mouseleave="likai">
            <!-- @mouseleave="likai"    -->
            <div class="guize" style="font-size:1rem;line-height:2rem;">
              <p style="font-size:15px">{{$t('qiandao.guize')}}</p>
              <span
                style="float:left;width:100%;background:none;text-align:left;position: relative;left:1rem;height:200px;display: block;top:1rem;"
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
import img from "@/assets/images/qiandao/duihao.png";
import img001 from "@/assets/images/qiandao/qiandaojiangli.png";
import img002 from "@/assets/images/qiandao/qiandao002.png";
import img003 from "@/assets/images/qiandao/qiandao003.png";
import img1 from "@/assets/images/qiandao/1tian.png";
import img2 from "@/assets/images/qiandao/2tian.png";
import img3 from "@/assets/images/qiandao/3tian.png";
import img4 from "@/assets/images/qiandao/4tian.png";
import img5 from "@/assets/images/qiandao/5tian.png";
import img6 from "@/assets/images/qiandao/6tian.png";
import img7 from "@/assets/images/qiandao/7tian.png";
import img10 from "@/assets/images/qiandao/yilingqu1.png";
import img11 from "@/assets/images/qiandao/yilingqu2.png";
import img12 from "@/assets/images/qiandao/yilingqu3.png";
import img13 from "@/assets/images/qiandao/yilingqu4.png";
import img14 from "@/assets/images/qiandao/yilingqu5.png";
import img15 from "@/assets/images/qiandao/yilingqu6.png";
import img16 from "@/assets/images/qiandao/yilingqu7.png";

import bgconn from "@/assets/js/bgconnTest.js";
export default {
  name: "qiandao",
  data() {
    return {
      currentaccount: null,
      istuichu: false,
      yiwancheng: 0, //累计签到的天数
      qiandaodaojishi: "00:00:00", //倒计时显示
      imglist: [img1, img2, img3, img4, img5, img6, img7],
      imglist3: [img10, img11, img12, img13, img14, img15, img16],
      xqj: 2, //倒计时显示在第几天
      xqjz: 0, //累计签到天数
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
      qitianjiangli: 0, //7天连续签到次数
      time: "2019/06/20 16:00:00 UTC", //服务器当前时间
      leijiqiandao: 0, //累计签到天数
      leijiweilingqu: [], //累计奖励未领取
      leijieyilingqu: [], //累计奖励已领取
      wanchenrenwu: 0, //是否完成签到任务
      jianglilingqu: 0, //当天是否完成签到
      signTotalEntity: null, //累计签到奖励领取信息
      alertqitian: 0, //七天中已经领取奖励的天数
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
    this.lang("cn");
     if(sessionStorage.getItem('isclose')!=null){
       this.istanchu()
    }
  },
  watch: {
    istuichu() {
      if (this.istuichu) {
        sessionStorage.setItem("isclose", true);
      } else {
        sessionStorage.removeItem("isclose");
      }
    }
  },
  methods: {
    lang(yuyan) {
      if (yuyan == "cn") {
        $(".qiandao_top span:first-Child").css({
          background: `url(${img001}) no-repeat`,
          "background-size": "100% 100%",
          width: "20%",
          position: "relative"
        });
      } else if (yuyan == "en") {
        $(".qiandao_top span:first-Child").css({
          background: `url(${img002}) no-repeat`,
          "background-size": "100% 100%",
          width: "10rem",
          height: "1.6rem",
          position: "relative"
        });
      } else {
        $(".qiandao_top span:first-Child").css({
          background: `url(${img003}) no-repeat`,
          "background-size": "100% 100%",
          width: "18%",
          position: "relative"
        });
      }
    },
    //倒计时
    countdown() {
      setInterval(() => {
        var te = new Date(this.time).getTime() - new Date().getTime();
        if (
          new Date(te).getUTCHours() == 0 &&
          new Date(te).getUTCMinutes() == 0 &&
          new Date(te).getUTCSeconds() == 0
        ) {
          this.xqj++;
          this.accountmsg();
        }
        this.qiandaodaojishi = ` ${this.changeTime(
          new Date(te).getUTCHours()
        )}:${this.changeTime(new Date(te).getUTCMinutes())}:${this.changeTime(
          new Date(te).getUTCSeconds()
        )}`;
        sessionStorage.setItem("djs", this.djs);
      }, 1000);
    },
    changeTime(val) {
      if (val < 10 && val >= 0) {
        return "0" + val;
      } else {
        return val;
      }
    },
    accountmsg() {
      if (this.currentaccount != null) {
        this.$http.get(bgconn.checkqiandao, {params: { account: this.currentaccount }})
          .then(res => {
            this.qitianjiangli = res.data.sign_count;
            this.signTotalEntity = res.data.signTotalEntity;
            this.wanchenrenwu = res.data.complete;
            this.jianglilingqu = res.data.isSign;
            //判断累计签到的状态
            this.leijiezhuangtai(res);
            // if(this.qitianjiangli==0){
            this.xqj = this.qitianjiangli + 1;
            if (res.data.complete == 1) {
              if (res.data.isSign == 1) {
                if (this.qitianjiangli == 7) {
                  if (sessionStorage.getItem("isflash") == null) {
                    this.xqj = 1;
                    this.alertqitian = 0;
                    $(".ylqdiv").css("display", "none");
                  }
                } else {
                  this.alread(this.qitianjiangli);
                  this.alertqitian = this.qitianjiangli;
                }
                $(".time")
                  .eq(this.xqj - 1)
                  .css("display", "block");
              } else {
                $(".tuipian2")
                  .eq(this.qitianjiangli - 1)
                  .css({
                    boxShadow: "#10ADC4 0px 0px 15px 8px",
                    cursor: "pointer"
                  });
                $(".mb")
                  .eq(this.qitianjiangli - 1)
                  .css("display", "none");
                this.clickday = this.qitianjiangli;
                this.alread(this.qitianjiangli - 1);
                this.alertqitian = this.qitianjiangli - 1;
              }
            } else {
              this.alread(this.qitianjiangli - 1);
              this.alertqitian = this.qitianjiangli - 1;
            }
          });
      }
    },
    linqujianli(event) {
      var tg = event.currentTarget;
      var id = parseInt($(tg).attr("id"));
      if (this.clickday != 0 && id == this.clickday) {
        $(".tuipian2").css("box-shadow", "none");
        this.alertqitian = this.alertqitian + 1;
        this.imglist[id - 1] = this.imglist3[id - 1];
        $(".mb")
          .eq(id - 1)
          .css("display", "none");
        $(".mb2_linqu")
          .eq(id - 1)
          .css("color", "#696869");
        $(".mb2_day")
          .eq(id - 1)
          .css({ top: "0.5rem", color: "#6a6a6a" });
        this.$http
          .get(bgconn.lingquqiri, {
            params: { account: this.currentaccount, day: this.qitianjiangli }
          })
          .then(rs => {
            if (rs.data.code == 200) {
              $(".time")
                .eq(id)
                .css({ display: "block" });
              this.accountmsg();
              this.clickday = 0;
              sessionStorage.setItem("isflash", "flash");
            } else {
              $(".tuipian2")
                .eq(id - 1)
                .css({ boxShadow: "#10ADC4 0px 0px 15px 8px" });
              this.imglist3[id - 1] = this.imglist[id - 1];
              $(".mb")
                .eq(id - 1)
                .css("display", "block");
              $(".mb2_linqu")
                .eq(id - 1)
                .css("color", "white");
              $(".mb2_day")
                .eq(id - 1)
                .css({ top: "0.1rem", color: "#951728" });
            }
          });
      } else {
        // console.log("阻止点击");
      }
    },
    closeqiandao() {
      this.$emit("childqiandao", false);
      sessionStorage.removeItem("isflash");
    },
    istanchu() {
      // console.log("方法执行")
      this.istuichu = !this.istuichu;
      $("#qiandaotanchu").prop("checked", this.istuichu);
    },
    jinru() {
      $(".guize").css("display", "block");
    },
    likai() {
      $(".guize").css("display", "none");
    },
    async leijiezhuangtai(res) {
      if (res.data.signTotalEntity == null) {
        // console.log("无签到记录");
      } else {
        this.leijiqiandao = res.data.signTotalEntity.count;
        if (this.leijiqiandao >= 7) {
          // console.log("7");
          //计算进度条
          if (
            this.leijiqiandao != 14 &&
            this.leijiqiandao != 21 &&
            this.leijiqiandao != 7
          ) {
            $(".jindutiao div").css("display", "block");
          }
          $(".jindutiao_content").css(
            "width",
            `${((this.leijiqiandao - 7) / 21) * 21.5}rem`
          );
          $(".jindutiao div").css({
            left: `${((this.leijiqiandao - 7) / 21) * 100 - 1.3}%`
          });
          if (res.data.signTotalEntity.day7 == null) {
            //未领取奖励
            this.leijiweilingqu.push(0);
          } else {
            //已领取奖励
            this.leijieyilingqu.push(0);
          }
          if (this.leijiqiandao >= 14) {
            // console.log("14");
            if (res.data.signTotalEntity.day14 == null) {
              //未领取奖励
              this.leijiweilingqu.push(1);
            } else {
              //已领取奖励
              this.leijieyilingqu.push(1);
            }
            if (this.leijiqiandao >= 21) {
              // console.log("21");
              if (res.data.signTotalEntity.day21 == null) {
                //未领取奖励
                this.leijiweilingqu.push(2);
              } else {
                //已领取奖励
                this.leijieyilingqu.push(2);
              }

              if (this.leijiqiandao >= 28) {
                $(".jindutiao div").css("display", "none");
                $(".jindutiao_content").css("width", `100%`);
                $(".jindutiao div").css({
                  left: `100%`
                });
                // console.log("28");
                if (res.data.signTotalEntity.day28 == null) {
                  //未领取奖励
                  this.leijiweilingqu.push(3);
                } else {
                  //已领取奖励
                  this.leijieyilingqu.push(3);
                }
              }
            }
          }
        }
        //累计奖励未领取
        this.leijipanduan(this.leijiweilingqu);
        //累计奖励已领取
        this.leijiislq(this.leijieyilingqu);
        // console.log("累计奖励已领取===" + this.leijieyilingqu);
      }
    },
    alread(list) {
      for (var i = 0; i < list; i++) {
        $(".tuipian2")
          .eq(i)
          .css({ "box-shadow": "none" });
        this.imglist[i] = this.imglist3[i];
        $(".mb")
          .eq(i)
          .css("display", "none");
        $(".mb2_linqu")
          .eq(i)
          .css("color", "#696869");
        $(".mb2_day")
          .eq(i)
          .css({ top: "0.6rem", color: "#6a6a6a", left: "2.5rem" });
        $(".yilinqu")
          .eq(i)
          .css({ display: "block", width: "92%", top: "1.3rem" });
      }
    },
    zhixingdonghua1(event) {
      //累计奖励点击领取
      var tg = event.currentTarget;
      var classname = $(tg).attr("class");
      var parentname = null;
      switch (classname) {
        case "linquekds0":
          if (this.signTotalEntity.day7 == null && this.leijiqiandao >= 7) {
            this.$http
              .get(bgconn.leijiqiandao, {
                params: { account: this.currentaccount, type: 1 }
              })
              .then(rs => {
                if (rs.data.code == 200) {
                  //执行领取成功动画
                  parentname = ".qiandao_bottom_top div:nth-child(1)";
                  this.setparentcss(tg, classname, parentname);
                  $(tg).html("+500EKD");
                  $(tg).attr("class", "linquekd");
                  this.signTotalEntity.day7 = "day7";
                  setTimeout(() => {
                    $(tg).attr("class", classname);
                    $(tg).html("");
                  }, 3000);
                } else {
                  // alert("领取奖励失败")
                }
              });
          } else {
            // console.log("不符合条件7");
          }
          break;
        case "linquekds1":
          if (this.signTotalEntity.day14 == null && this.leijiqiandao >= 14) {
            this.$http
              .get(bgconn.leijiqiandao, {
                params: { account: this.currentaccount, type: 2 }
              })
              .then(rs => {
                if (rs.data.code == 200) {
                  //执行领取成功动画
                  parentname = ".qiandao_bottom_top div:nth-child(2)";
                  this.setparentcss(tg, classname, parentname);
                  $(tg).html("+1000EKD");
                  $(tg).attr("class", "linquekd");
                  this.signTotalEntity.day14 = "day14";
                  setTimeout(() => {
                    $(tg).attr("class", classname);
                    $(tg).html("");
                  }, 3000);
                } else {
                  // alert("领取奖励失败")
                }
              })
              .catch(err => {
                console.log("领取失败===" + JSON.stringify(err));
              });
          } else {
            // console.log("不符合条件14");
          }

          break;
        case "linquekds2":
          if (this.signTotalEntity.day21 == null && this.leijiqiandao >= 21) {
            this.$http
              .get(bgconn.leijiqiandao, {
                params: { account: this.currentaccount, type: 3 }
              })
              .then(rs => {
                if (rs.data.code == 200) {
                  //执行领取成功动画
                  parentname = ".qiandao_bottom_top div:nth-child(3)";
                  this.setparentcss(tg, classname, parentname);
                  $(tg).html("+1500EKD");
                  $(tg).attr("class", "linquekd");
                  this.signTotalEntity.day21 = "day21";
                  setTimeout(() => {
                    $(tg).attr("class", classname);
                    $(tg).html("");
                  }, 3000);
                } else {
                  // alert("领取奖励失败")
                }
              });
          } else {
            // console.log("不符合条件21");
          }

          break;
        case "linquekds3":
          if (this.signTotalEntity.day28 == null && this.leijiqiandao >= 28) {
            this.$http
              .get(bgconn.leijiqiandao, {
                params: { account: this.currentaccount, type: 4 }
              })
              .then(rs => {
                if (rs.data.code == 200) {
                  //执行领取成功动画
                  parentname = ".qiandao_bottom_top div:nth-child(4)";
                  this.setparentcss(tg, classname, parentname);
                  $(tg).html("+2000EKD");
                  $(tg).attr("class", "linquekd");
                  this.signTotalEntity.day28 = "day28";
                  setTimeout(() => {
                    $(tg).attr("class", classname);
                    $(tg).html("");
                  }, 3000);
                } else {
                }
              });
          } else {
            // console.log("不符合条件28");
          }
          break;
      }
    },
    setparentcss(tg, classname, parentname) {
      // setTimeout(() => {
      // console.log("改变领取css");
      $(tg).attr("class", classname);
      $(tg).html("");
      $(parentname).css({
        background: `url(${img}) no-repeat`,
        "background-size": "70% 70%",
        "background-position-x": "0.55rem",
        "background-position-y": "0.55rem",
        "background-color": "#121722",
        "box-shadow": "none"
      });
      // }, 3000);
    },
    linqujiangli(event) {
      var tg = event.currentTarget;
      $(tg).html("已领取");
    },
    leijipanduan(count) {
      for (var i = 0; i < count.length; i++) {
        $(`.qiandao_bottom_top div:nth-child(${count[i] + 1})`).css({
          background: "radial-gradient(circle,#22C7EE,#0E98B9)",
          "box-shadow": "rgb(113, 241, 224) 0px 0px 10px 2px ",
          color: "white",
          cursor: "pointer"
        });
        $(`.linquekds${count[i]}`).css("font-size", "1.2rem");
        $(`.linquekds${count[i]}`).html(`${this.$t("qiandao.lingqu")}`);
      }
    },
    leijiislq(day) {
      //累计签到任务达成且奖励已经领取
      for (var i = 0; i < day.length; i++) {
        $(`.linquekds${day[i]}`).html("");
        $(`.qiandao_bottom_top div:nth-child(${day[i] + 1})`).css({
          background: `url(${img}) no-repeat`,
          "background-size": "70% 70%",
          "background-position-x": "0.55rem",
          "background-position-y": "0.55rem",
          "background-color": "#121722",
          "box-shadow": "none"
        });
      }
    }
  }
};
</script>

<style  scoped>
.qiandao_contents_top {
  width: 100%;
  height: 18rem;
  position: relative;
  font-family: "微软雅黑";
  background-color: #313b4a;
  width: 90%;
  margin: 0 auto;
  border-radius: 1rem;
  top: 0rem;
}
.qiandao_contents_top_child {
  width: 19%;
  height: 8rem;
  float: left;
  position: relative;
}
.tupian {
  position: absolute;
  left: -1rem;
  top: -1.2rem;
  width: 100%;
  height: 2rem;
}
.tuipian2 {
  width: 95%;
  height: 5.33rem;
  border-radius: 0.4rem;
  position: relative;
  top: 0.13rem;
  z-index: 0;
}
.time {
  width: 100%;
  height: 2rem;
  position: absolute;
  bottom: 0.2rem;
  display: none;
}
.mb {
  position: absolute;
  width: 106%;
  height: 5.8rem;
  background: url("../../assets/images/qiandao/heisemengbang.png") no-repeat;
  background-size: 100% 100%;
  background-position-y: -0.2rem;
  background-position-x: -0.2rem;
  z-index: 100;
  opacity: 0.5;
  left: 0;
  top: 0;
}
.mb2 {
  position: absolute;
  width: 100%;
  height: 5.5rem;
  opacity: 0.5;
  z-index: 101;
  left: 0;
  top: 0;
}
.mb2_linqu {
  opacity: 1;
  width: 100%;
  height: 1.4rem;
  position: absolute;
  bottom: 0.2rem;
  color: white;
  font-size: 1rem;
  text-align: center;
  font-weight: 1000;
}
.mb2_day {
  width: 70%;
  height: 1.5rem;
  position: absolute;
  top: 0.1rem;
  transform: rotate(50deg);
  left: 2.75rem;
  text-align: center;
  font-size: 1rem;
  color: #951728;
  font-weight: 1000;
}

.qiandao_contents_top_child:nth-child(1),
.qiandao_contents_top_child:nth-child(2),
.qiandao_contents_top_child:nth-child(3) {
  margin-top: 1rem;
  margin-left: 3.2rem;
}

.qiandao_contents_top_child:nth-child(4),
.qiandao_contents_top_child:nth-child(5),
.qiandao_contents_top_child:nth-child(6),
.qiandao_contents_top_child:nth-child(7) {
  margin-top: 1rem;
  margin-left: 1.5rem;
  margin-top: -0.5rem;
}

.beizhu {
  position: absolute;
  bottom: 0.1rem;
  width: 100%;
  height: 1.5rem;
  color: white;
  font-size: 1rem;
  text-align: center;
}
.time_tupian {
  width: 1.2rem;
  height: 1.1rem;
  background: url("../../assets/images/qiandao/miaobiao.png");
  background-size: 100% 100%;
  display: inline-block;
}
.time_time {
  width: 73%;
  height: 2rem;
  display: inline-block;
  color: #ecfdfd;
  font-size: 1rem;
  text-align: center;
  position: absolute;
  top: 0;
  right: 0;
  font-weight: 1000;
}
.yilinqu {
  animation: BigToSma 0.3s ease-out forwards;
  color: #951728;
  height: 2.4rem;
  position: absolute;
  width: 100%;
  border: 3px solid #aa1616;
  top: 1rem;
  left: 0.2rem;
  background-color: #fff;
  transform: rotate(-30deg);
  opacity: 0.6;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  text-align: center;
  font-weight: 1000;
  font-family: "微软雅黑";
  line-height: 2rem;
  display: none;
  z-index: 105;
}

@keyframes BigToSma {
  from {
    transform: scale(2) rotate(-30deg);
  }
  to {
    transform: scale(1) rotate(-30deg);
  }
}

.linquekd {
  width: 40px;
  position: relative;
  -webkit-animation: dh 3s infinite;
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
  width: 3.7rem;
  left: -1rem;
  top: 0px;
  color: #e9a504;
  z-index: 2000 !important;
  font-size: 1rem;
}

ul li {
  width: 25% !important;
}
ul li:nth-child(1),
ul li:nth-child(2),
ul li:nth-child(3) {
  margin-left: 2.5rem;
  position: relative;
  vertical-align: middle;
}

.qiandao_announcements {
  position: fixed;
  z-index: 10000;
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
  width: 34rem;
  height: 33.5rem;
  top: 22%;
  left: 1rem;
  font-family: "fz";
  border-radius: 2rem;
  border: 4px solid rgb(4, 220, 248);
  z-index: 5000 !important;
}
.qiandao_top {
  text-align: center;
  height: 9%;
  border-radius: 15px;
  margin-top: 1rem;
}
.qiandao_top span {
  position: relative;
  left: 26px;
  height: 2rem;
  width: 40%;
  display: inline-block;
  top: 0rem;
}

.qiandao_top span:nth-child(2),
.qiandao_bottom_bottom span:last-child {
  display: block;
  float: right;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  background: url("../../../src/assets/images/qiandao/wenhao.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  left: -1rem;
}
.qiandao_bottom_bottom span:last-child {
  margin-top: -0.1rem;
  left: -0.5rem;
}
.qiandao_top span:last-child {
  position: relative;
  top: -0.1rem;
  left: -0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  background: url("../../../src/assets/images/qiandao/guanbi.png") no-repeat;
  background-size: 100% 100%;
  z-index: 3000 !important;
}
.qiandao ul {
  background-color: #313b4a;
  display: block;
  border-radius: 20px;
  width: 32rem;
  height: 19rem;
  margin-left: 2%;
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
  font-size: 10px;
  position: relative;
  top: 1rem;
}
.qiandao_bottom_top div:first-child,
.qiandao_bottom_top div:nth-child(2),
.qiandao_bottom_top div:nth-child(3),
.qiandao_bottom_top div:nth-child(4) {
  align-content: center;
  float: left;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  text-align: center;
  z-index: 11;
  background: #121722;
  position: relative;
  border: 0.3rem solid #6be1fc;
}
.qiandao_bottom_top div:first-child {
  left: -6rem;
}
.qiandao_bottom_top div:nth-child(2) {
  left: -6%;
}
.qiandao_bottom_top div:nth-child(3) {
  left: 6%;
}
.qiandao_bottom_top div:nth-child(4) {
  left: 19%;
}

.qiandao_bottom_top div:nth-child(2) p {
  color: #e9a504;
  text-shadow: none;
  position: absolute;
  top: 1.5rem;
  left: -1.7rem;
  transform: scale(0.8);
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
  height: 3rem;
  top: 3rem;
  position: relative;
}
.qiandao_bottom_bottom span {
  text-align: center;
  position: relative;
  left: 1.5rem;
  top: 0.6rem;
}
.jindutiao {
  width: 21rem;
  height: 0.8rem;
  position: relative;
  top: -2.5rem;
  z-index: 10;
  border: 0.1rem solid rgb(0, 247, 255);
}

.jindutiao_content {
  display: block;
  height: 0.6rem;
  background-color: #0099be;
  z-index: 20;
  width: 0px;
  max-width: 100%;
}

.jindutiao div:last-child {
  border-radius: 0;
  width: 0.5rem;
  height: 0.5rem;
  border-width: 0px 10px 14px 8px;
  border-style: solid;
  border-color: transparent transparent #edcd79 transparent;
  position: relative;
  top: 0.5rem;
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
  width: 1.5rem;
  height: 1.5rem;
  display: inline-block;
  background-color: rgb(20, 20, 20);
  border: 2px solid rgb(186, 252, 252);
  position: relative;
  left: 1rem;
  border-radius: 5px;
  top: 1rem;
}
input[type="radio"]:checked + .tanchu {
  background: url("../../../src/assets/images/qiandao/duigou2.png") no-repeat;
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
  position: relative;
  top: 20px;
}
.guize {
  color: rgb(207, 253, 253);
  width: 30rem;
  height: 30rem;
  background: #121722;
  z-index: 10000;
  border-radius: 2rem;
  display: none;
  position: relative;
  left: -30rem;
  top: -29rem;
  border: 2px solid rgb(4, 220, 248);
  font-family: "微软雅黑";
  font-weight: 1000;
}
.guize p,
.guize span {
  color: rgb(207, 253, 253);
}
.linquekds0,
.linquekds2,
.linquekds3,
.linquekds1 {
  font-size: 1rem;
  font-weight: 800;
  text-shadow: 2px 2px 3px rgb(87, 86, 86);
  color: #ecfdfd;
  text-align: center;
  left: 0rem;
  position: relative;
  top: 1.2rem;
}
.qiandao_bottom_top div span:last-child {
  display: inline-block;
  position: absolute;
  text-align: center;
  text-shadow: none;
  transform: scale(0.9);
  left: -0.4rem;
  color: rgb(225, 252, 252);
  top: 4rem;
  font-size: 1rem;
}
.tcmsg {
  color: rgb(225, 252, 252);
  font-size: 1rem;
}
.leijiday {
  display: inline-block;
  color: rgb(207, 253, 253);
  position: absolute;
  left: 3px;
  top: 50px;
  white-space: nowrap;
}
.jindutiao div {
  display: none;
  left: 0px;
}
</style>
