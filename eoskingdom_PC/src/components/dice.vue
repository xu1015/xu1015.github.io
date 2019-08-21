<template>
  <div class="dice">
    <newnav @localeMethods="localeMethods" @childByValue="childByValue"></newnav>
    <div class="content">
      <!-- 第一部分 -->
      <div class="contentLeft">
        <ul>
          <li class="oneLi">
            <!-- CPU耗费 -->
            <div class="circleOne">
              <p class="demo-circle-inner" style="font-size:0;margin-top:5px;color:black;">
                <span v-if="cpu_use!=0" style="font-size:0.2rem;">{{cpu_use}}%</span>
                <span v-if="cpu_use==0" style="font-size:0.2rem;">0%</span>
              </p>
              <p style="font-size:0.1rem;transform:scale(.8);color:black;">CPU</p>
            </div>
            <!-- NET耗费 -->
            <div class="circleTwo">
              <p class="demo-circle-inner" style="font-size:0;margin-top:5px;color:#E65545;">
                <span v-if="net_use!=0" style="font-size:0.2rem;">{{net_use}}%</span>
                <span v-if="net_use==0" style="font-size:0.2rem;">0%</span>
              </p>
              <p style="font-size:0.1rem;transform:scale(.8);color:#E65545;">NET</p>
            </div>
          </li>
          <!-- leftLiGame -->
          <li class="leftLiGame" style="border-bottom:2px solid #29414c">
            <a :href="this.dezhou+new Date().getTime()" target="_blank">
              <p class="gameDiv_p " :style="gameState==1?'background:black;':''">HOT</p>
              <p v-if="this.$i18n.locale=='zh'&&gameState!=1" style="margin:0.3rem 0 0 -0.3rem;"><img style="width:2.3rem;height:auto;" src="@/assets/images/dice/dezhoupuke1.png" alt=""></p>
              <p v-if="this.$i18n.locale=='zh'&&gameState==1" style="margin:0.3rem 0 0 -0.3rem;"><img style="width:2.5rem;" src="@/assets/images/dice/dezhoupuke2.png" alt=""></p>
              <p v-if="this.$i18n.locale!='zh'" style="margin:0.3rem 0 0 -0.3rem;">
                TEXAS
                <br>HOLD'EM
              </p>
            </a>
          </li>
          <li @click="gameState=2" class="leftLiGame borderStyle" :class="gameState==2?'playingGame':''">
            <p class="gameDiv_p" :style="gameState==2?'background:black;':''">NEW</p>
            <p  style="margin:0.3rem 0 0 -0.3rem;" :style="this.$i18n.locale=='zh'?'font-size:25px;':''">
              SLOT
              <br>100
            </p>
          </li>
          <!--  @click="gameState=3" -->
          <li class="leftLiGame">
            <p class="gameDiv_p" style="background:#E24133;">SOON</p>
            <p v-if="this.$i18n.locale=='zh'" style="margin:0.3rem 0 0 -0.3rem;"><img style="width:2.5rem;" src="@/assets/images/dice/dian211.png" alt=""></p>
            <p style="margin:0.3rem 0 0 -0.3rem;" v-if="this.$i18n.locale!='zh'">
              BLACK
            <br>JACK
            </p>
          </li>
          <!--  @click="gameState=4" -->
          <li class="leftLiGame borderStyle">
            <p class="gameDiv_p" style="background:#E24133;">SOON</p>
            <p v-if="this.$i18n.locale=='zh'" style="margin:0.3rem 0 0 -0.3rem;"><img style="width:3.2rem;" src="@/assets/images/dice/baijiale1.png" alt=""></p>
            <p style="margin:0.3rem 0 0 -0.3rem;" v-if="this.$i18n.locale!='zh'"> BACCARAT</p>
            </li>
            <!--  @click="gameState=5" -->
          <li class="leftLiGame">
            <p class="gameDiv_p" style="background:#E24133;">SOON</p>
            <p v-if="this.$i18n.locale=='zh'" style="margin:0.3rem 0 0 -0.3rem;"><img style="width:2.2rem;" src="@/assets/images/dice/lunpan1.png" alt=""></p>
            <p style="margin:0.3rem 0 0 -0.3rem;" v-if="this.$i18n.locale!='zh'">ROULETTE</p>
            </li>
          <!-- <li @click="changeYinxiao"> -->
            <img draggable="false"  style="width:50px;margin-top:15px;margin-left:20px;" @click="changeYinxiao" v-if="this.yinxiaoState==true" src="@/assets/images/dice/yinxiaoOpen.png" alt="">
            <img draggable="false"  style="width:50px;margin-top:15px;margin-left:20px;" @click="changeYinxiao" v-if="this.yinxiaoState==false" src="@/assets/images/dice/yinxiaoClose.png" alt="">
          <!-- </li> -->
        </ul>
      </div>
      <!-- 第二部分 -->
      <div class="contnetRight">
        <div class="rightTop">
          <!-- 老虎机 -->
          <div class="slots">
            <!--                  slotMaskC -->
            <div class="slotMask" :class="winState==true||loseState==true||autoWinState==true||autoLoseState==true||luckyState==true?'slotMaskC':''">
              <!-- 单次下注赢状态 -->
              <div class="MaskAnimate" style="opacity: 0;" :class="winState==true?'bounceIn1':''">
                <img draggable="false" src="@/assets/images/dice/win.png" class="slotsWin" alt>
                <div class="slotMaskNumWin1"><span>+{{winProitem1}}</span><span v-show="tokenType1==1" style="margin-left:40px;">+{{Math.floor(loseBetAmount1*minedScale*10000+0.00001)/10000}} EKD</span></div>
              </div>
              <!-- 单次下注输状态 -->
              <div class="MaskAnimate" style="opacity: 0;" :class="loseState==true?'bounceIn1':''">
                <img draggable="false" src="@/assets/images/dice/lose.png" class="slotsLose" alt>
                <div class="slotMaskNumLose"><span>-{{loseBetAmount}}</span><span v-show="tokenType1==1" style="margin-left:40px;color:#f1228e;">+{{Math.floor(loseBetAmount1*minedScale*10000+0.00001)/10000}} EKD</span></div>
              </div>
              <!-- 自动下注赢状态 -->
              <div class="MaskAnimate" style="opacity: 0;" :class="autoWinState==true?'bounceIn2':''">
                <img draggable="false" src="@/assets/images/dice/win.png" class="slotsWin" alt>
                <div class="slotMaskNumWin1"><span>+{{winProitem1}}</span><span v-show="tokenType1==1" style="margin-left:40px;">+{{Math.floor(loseBetAmount1*minedScale*10000+0.00001)/10000}} EKD</span></div>
              </div>
              <!-- 自动下注输状态 -->
              <div class="MaskAnimate" style="opacity: 0;" :class="autoLoseState==true?'bounceIn2':''">
                <img draggable="false"  src="@/assets/images/dice/lose.png" class="slotsLose" alt>
                <div class="slotMaskNumLose"><span>-{{loseBetAmount}}</span><span v-show="tokenType1==1" style="margin-left:40px;color:#f1228e;">+{{Math.floor(loseBetAmount1*minedScale*10000+0.00001)/10000}} EKD</span></div>
              </div>
              <!-- 加载状态 -->
              <div class="loadMask">
                <img draggable="false" src="@/assets/images/dice/loading.png" class="loading1" alt>
                <img draggable="false"  src="@/assets/images/dice/loadingBG.png" class="loading2" alt>
              </div>
              <!-- X100大奖状态 -->
              <div class="bigReward" style="opacity:0" :class="luckyState==true?'bounceIn3':''">
                <img draggable="false"  class="bigRewardImg1" src="@/assets/images/dice/X100EKD.png" alt="">
                <img draggable="false"  class="bigRewardImg2" src="@/assets/images/dice/JACKPOT.png" alt="">
                <img draggable="false" class="bigRewardImg3" src="@/assets/images/dice/jackAll1.png" alt="">
                <img draggable="false" class="bigRewardImg4" src="@/assets/images/dice/jackAll.png" alt="">
              </div>
            </div>
            <img draggable="false"  src="@/assets/images/dice/DICE_lunpan03.png" class="slotsBG" alt>
            <img draggable="false"   src="@/assets/images/dice/DICE_STYLE1.png" v-show="slotImgStyle==false" class="slotsBG11" alt>
            <img draggable="false"  src="@/assets/images/dice/DICE_style.png" v-show="slotImgStyle" class="slotsBG1" alt>
            <img draggable="false"  src="@/assets/images/dice/DICE_style.png" v-show="slotImgStyle" class="slotsBG1" alt>
            <!-- <img draggable="false"  draggable="false" src="@/assets/images/dice/slot100.png" class="slot100BG" alt> -->
            <div class="slotLeft">
              <div class="luckyTitleName "><span class="luckedNum">LUCKY</span></div>
              <div class="luckyTitleNum"><span class="luckedNum">{{luckyNum!=null?changeTime(luckyNum):"00"}}</span></div>
              <div class="luckyTitlePayout"><span class="luckedNum">x100 EKD</span></div>
              <div class="luckyTitleTime"><span class="luckedNum">{{oneHourTime2}}</span></div>
              <div class="luckyTitleImg">
                <img draggable="false"  src="@/assets/images/dice/xingyunjiangBG.png" alt="">
                <img draggable="false"  style="top:5px;left:18px;" :src="10-selfLuckyCount>=1?require('@/assets/images/dice/xingyunjiangOpen.png'):require('@/assets/images/dice/xingyunjiangClose.png')"  alt="">
                <img draggable="false"  style="top:5px;left:33px;" :src="10-selfLuckyCount>=2?require('@/assets/images/dice/xingyunjiangOpen.png'):require('@/assets/images/dice/xingyunjiangClose.png')"  alt="">
                <img draggable="false"  style="top:5px;left:48px;" :src="10-selfLuckyCount>=3?require('@/assets/images/dice/xingyunjiangOpen.png'):require('@/assets/images/dice/xingyunjiangClose.png')" alt="">
                <img draggable="false"  style="top:5px;left:63px;" :src="10-selfLuckyCount>=4?require('@/assets/images/dice/xingyunjiangOpen.png'):require('@/assets/images/dice/xingyunjiangClose.png')" alt="">
                <img draggable="false"  style="top:5px;left:78px;" :src="10-selfLuckyCount>=5?require('@/assets/images/dice/xingyunjiangOpen.png'):require('@/assets/images/dice/xingyunjiangClose.png')" alt="">
                <img draggable="false"  style="top:5px;left:93px;" :src="10-selfLuckyCount>=6?require('@/assets/images/dice/xingyunjiangOpen.png'):require('@/assets/images/dice/xingyunjiangClose.png')" alt="">
                <img draggable="false"  style="top:5px;left:108px;" :src="10-selfLuckyCount>=7?require('@/assets/images/dice/xingyunjiangOpen.png'):require('@/assets/images/dice/xingyunjiangClose.png')"  alt="">
                <img draggable="false"  style="top:5px;left:123px;" :src="10-selfLuckyCount>=8?require('@/assets/images/dice/xingyunjiangOpen.png'):require('@/assets/images/dice/xingyunjiangClose.png')"  alt="">
                <img draggable="false"  style="top:5px;left:138px;" :src="10-selfLuckyCount>=9?require('@/assets/images/dice/xingyunjiangOpen.png'):require('@/assets/images/dice/xingyunjiangClose.png')" alt="">
                <img draggable="false"  style="top:5px;left:153px;" :src="10-selfLuckyCount>=10?require('@/assets/images/dice/xingyunjiangOpen.png'):require('@/assets/images/dice/xingyunjiangClose.png')" alt="">
              </div>
            </div>
            <div class="slotRight">
              <div class="totalBetting">
                <div class="totalBettingOne" v-if="this.$i18n.locale=='zh'">
                   <img draggable="false"  src="@/assets/images/dice/zongtouzhue.png" alt="">
                </div>
                
                <div class="totalBettingOne" v-if="this.$i18n.locale!='zh'">{{$t("dice.allBet")}}</div>
                <div class="totalBettingTwo">
                  <img draggable="false" 
                    src="@/assets/images/dice/eosImg.png"
                    style="height:41px;vertical-align: middle;"
                    alt
                  >
                  <span v-if="allUserBetNum!=null&&allUserBetNum!=undefined">{{substrNum(allUserBetNum,2)}}</span>
                  <span v-else>0</span>
                </div>
              </div>
              <div class="minningEKD">
                <div class="minningEKDOne" v-if="this.$i18n.locale=='zh'">
                  <img draggable="false"  src="@/assets/images/dice/wakuang.png" alt=""><span :class="this.$i18n.locale=='zh'?'wakuangEKD':''"> EKD</span>
                </div>
                <div class="minningEKDOne" v-if="this.$i18n.locale!='zh'">{{$t("dice.wakuangEKD")}}</div>
                <div class="minningEKDTwo">
                  <img draggable="false" 
                    src="@/assets/images/dice/tuidonganniu.png"
                    style="height:38px;vertical-align: middle;"
                    alt
                  >
                  <span v-if="WKEkdNum!=null&&WKEkdNum!=undefined">{{500000000-parseInt(WKEkdNum)}}</span>
                  <span v-else>0</span>
                </div>
              </div>
              <div class="oneStage">
                <div class="minningEKDOne" v-if="this.$i18n.locale=='zh'">
                  <img draggable="false"  src="@/assets/images/dice/jieduan1.png" alt="">
                </div>
                <div class="minningEKDOne" v-if="this.$i18n.locale!='zh'">{{$t("dice.oneStage")}}</div>
                <div class="minningEKDTwo" v-if="minedScale!=null&&minedScale!=undefined">1:{{minedScale}}</div>
                <div class="minningEKDTwo" v-else>1:50</div>
              </div>
            </div>
            <!-- slotsStyle1 -->
            <div class="slotsDiv">
              <div class="mask"></div>
              <div class="slot_num">
                <img draggable="false"  src="@/assets/images/dice/shadow.png" class="imgShadowOne" alt>
                <div class="num numOne"></div>
                <img draggable="false"  src="@/assets/images/dice/shadow.png" class="imgShadowTwo" alt>
                <div class="num numTwo"></div>
                <img draggable="false" src="@/assets/images/dice/shadow.png" class="imgShadowThree" alt>
                <div class="num numThree"></div>
              </div>
            </div>
          </div>
          <div class="slotsbg"></div>
          <!-- 可拖拽进度条 -->
          <div class="progressDiv">
            <div class="slider" ref="progressDiv">
              <div class="progree color1" :style="{width}"></div>
              <div class="thunk zIndex1" ref="trunk" :style="{left}">
                <div class="block animatedOne"></div>
                <div class="tips">
                  <span>{{Math.floor(this.scale * 100 + 0.5)}}</span>
                  <!-- <i class="fas fa-caret-down"></i> -->
                </div>
              </div>
            </div>
          </div>
          <!-- 动态变化框 -->
          <div class="progressState" v-show="eventState1==true" :class="eventState1==false?'progressTrendsStyle':''">
            <div class="rollUnder proitem">
              <p v-if="this.$i18n.locale=='zh'">
                <img draggable="false"  src="@/assets/images/dice/xiaoyuhuosheng.png" alt="">
              </p>
              <p v-if="this.$i18n.locale!='zh'">{{$t("dice.rollUnder")}}</p>
              <p class="botP">{{this.rollUnder}}</p>
            </div>
            <div class="payOut proitem">
              <p v-if="this.$i18n.locale=='zh'">
                <img draggable="false"  src="@/assets/images/dice/peilv.png" alt="">
              </p>
              <p v-if="this.$i18n.locale!='zh'">{{$t("dice.payOut")}}</p>
              <p class="botP">
                {{this.payOut}}
                <span>X</span>
              </p>
            </div>
            <div class="winChance proitem">
              <p v-if="this.$i18n.locale=='zh'">
                <img draggable="false"  src="@/assets/images/dice/zhongjianggailv.png" alt="">
              </p>
              <p v-if="this.$i18n.locale!='zh'">{{$t("dice.winChance")}}</p>
              <p class="botP">
                {{this.winChance}}
                <span>%</span>
              </p>
            </div>
            <div class="win proitem">
              <p v-if="this.$i18n.locale=='zh'">
                <img draggable="false"  src="@/assets/images/dice/yingqujiangjin.png" alt="">
              </p>
              <p v-if="this.$i18n.locale!='zh'">{{$t("dice.win")}}</p>
              <p class="botP">
                {{this.winProitem}}
                <span>{{selected1}}</span>
              </p>
            </div>
          </div>
          <!-- 事件框 -->
          <div class="eventState" :class="eventState1==false?'eventStateTrendsStyle':''">
            <div class="eventLeft">
              <div class="eventLeftTop">
                <img draggable="false"  v-if="this.$i18n.locale=='zh'" style="margin-right:12px;font-size:30px;vertical-align: middle;" src="@/assets/images/dice/touzhujine.png" alt="">
                <span v-if="this.$i18n.locale!='zh'" style="color: #e2faff;margin-right:12px;font-size:30px;vertical-align: middle;">{{$t("dice.bet_amount")}}</span>
                <div class="inputEosEkd">
                  <input type="number" class="inputNum" v-model="inputNum">
                  <div class="selectDiv">
                    <div class="selected" @click="changeState">
                      <span class="selectFont" >{{selected1}}</span>
                      <img draggable="false"  src="@/assets/images/dice/bottom.png" v-show="selectState==false" alt>
                      <img draggable="false"  src="@/assets/images/dice/top.png" v-show="selectState==true" alt>
                    </div>
                    <div class="optionDiv"  @click="changeTo" v-show="selectState==true">{{selected2}}</div>
                  </div>
                </div>
              </div>
              <div class="eventLeftBottom">
                <span @click="changebtnState(1)" :class="btnState==1?'backgroundColor':''">MIN</span>
                <span @click="changebtnState(2)" :class="btnState==2?'backgroundColor':''">1/2</span>
                <span @click="changebtnState(3)" :class="btnState==3?'backgroundColor':''">x2</span>
                <span @click="changebtnState(4)" :class="btnState==4?'backgroundColor':''">MAX</span>
              </div>
            </div>
            <div class="eventCenter">
              <div class="leftGo" @click="toGoSlot" :class="oneOrauto==1?'redLeft':'blackLeft'">
                <span :class="oneOrauto==1?'span1':''" v-if="this.$i18n.locale=='zh'">
                  <img draggable="false"  :class="this.$i18n.locale=='zh'?'beginImg':''" src="@/assets/images/dice/kaishi.png" alt="">
                </span>
                <span :class="oneOrauto==1?'span1':''" v-if="this.$i18n.locale!='zh'">{{$t("dice.go")}}</span>
              </div>
              <div class="leftAuto" @click="toAutoSlot"  v-show="oneOrauto==1&this.$i18n.locale=='zh'" :class="oneOrauto==1?'blackRight':'redRight'">
                <span :class="oneOrauto==1?'span2':''">
                  <img draggable="false"  :class="this.$i18n.locale=='zh'?'autoImg':''" src="@/assets/images/dice/zidong.png" alt="">
                </span>
              </div>
              <div class="leftAuto" @click="toAutoSlot"  v-show="oneOrauto==1&this.$i18n.locale!='zh'" :class="oneOrauto==1?'blackRight':'redRight'">
                <span :class="oneOrauto==2?'span2':''">{{$t("dice.auto")}}</span>
              </div>
              <div class="leftAuto" @click="toStopSlot" v-show="oneOrauto==2&this.$i18n.locale=='zh'" :class="oneOrauto==2?'redRight':'blackRight'">
                <span :class="oneOrauto==2?'span2':''">
                  <img draggable="false"  :class="this.$i18n.locale=='zh'?'autoImg':''" src="@/assets/images/dice/tingzhi.png" alt="">
                </span>
              </div>
              <div class="leftAuto" @click="toStopSlot" v-show="oneOrauto==2&this.$i18n.locale!='zh'" :class="oneOrauto==2?'redRight':'blackRight'">
                <span :class="oneOrauto==2?'span2':''">{{$t("dice.stop")}}</span>
              </div>
            </div>
            <div class="eventRight">
              <div class="eosNum">
                <img draggable="false"  src="@/assets/images/dice/eosImg.png" alt>
                <span>{{this.eos_balance}}</span>
              </div>
              <div class="ekdNum">
                <img draggable="false"  src="@/assets/images/dice/ekdImg.png" alt>
                <!-- <span>{{this.eos_balanceekd}}</span> -->
                <span>{{this.eos_balanceekd}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="rightBottom">
          <div class="rightBottomHead" :class="this.$i18n.locale=='zh'?'imgCenter':''">
            <!-- 所有投注 -->
            <p class="allBet" clickMusic='true' @click="changerankingList(1)" v-if="this.$i18n.locale=='zh'&rankingList!=1" :class="rankingList==1?'rankingListState':''">
              <img draggable="false"  src="@/assets/images/dice/suoyoutouzhu01.png" alt="">
            </p>
            <p class="allBet" clickMusic='true' @click="changerankingList(1)" v-if="this.$i18n.locale=='zh'&rankingList==1" :class="rankingList==1?'rankingListState':''">
              <img draggable="false"  src="@/assets/images/dice/suoyoutouzhu.png" alt="">
            </p>
            <p class="allBet" clickMusic='true' @click="changerankingList(1)" v-if="this.$i18n.locale!='zh'" :class="rankingList==1?'rankingListState':''">{{$t("dice.all_bets")}}</p>
            <!-- 我的投注 -->
            <p class="myBet" clickMusic='true' @click="changerankingList(2)" v-if="this.$i18n.locale=='zh'&rankingList!=2" :class="rankingList==2?'rankingListState':''">
              <img draggable="false"  src="@/assets/images/dice/wodetouzhu01.png" alt="">
            </p>
            <p class="myBet" clickMusic='true' @click="changerankingList(2)" v-if="this.$i18n.locale=='zh'&rankingList==2" :class="rankingList==2?'rankingListState':''">
              <img draggable="false"  src="@/assets/images/dice/wodetouzhu.png" alt="">
            </p>
            <p class="myBet" clickMusic='true' @click="changerankingList(2)" v-if="this.$i18n.locale!='zh'" :class="rankingList==2?'rankingListState':''">{{$t("dice.my_bets")}}</p>
            <!-- 24小时排行榜 -->
            <p class="HR_p">
              <span clickMusic='true' @click="changerankingList(3)" v-if="this.$i18n.locale=='zh'&rankingList!=3" :class="rankingList==3?'rankingListState':''" class="rankingList">
                <img draggable="false"  src="@/assets/images/dice/paiming24.png" alt="">
              </span>
              <span clickMusic='true' @click="changerankingList(3)" v-if="this.$i18n.locale=='zh'&rankingList==3" :class="rankingList==3?'rankingListState':''" class="rankingList">
                <img draggable="false"  src="@/assets/images/dice/paiming2401.png" alt="">
              </span>
              <span clickMusic='true' @click="changerankingList(3)" v-if="this.$i18n.locale!='zh'" :class="rankingList==3?'rankingListState':''" class="rankingList">{{$t("dice.hr24_ranking")}}</span>
              <span class="rankingHR_24" v-if="daojishiTime!=null&&daojishiTime!=undefined">{{daojishiTime}}</span>
              <img draggable="false"  class="rankImg animated tada infinite" src="@/assets/images/dice/event.png" alt="">
            </p>
            <!-- 幸运数字榜单 -->
            <p clickMusic='true' @click="changerankingList(4)" :class="rankingList==4?'rankingListState':''">
              <span class="rankingList"><span class="rankingList1" :class="rankingList==4?'rankingListState':''">X100 EKD</span></span>
              <img draggable="false"  class="ekd100Img animated tada infinite" src="@/assets/images/dice/event.png" alt="">
              <img draggable="false"  src="@/assets/images/dice/wenhao.png" alt="" @click.stop="dicex100_Mask=true">
            </p>
          </div>
          <!-- 所有下注/我的下注榜单标题 -->
          <div class="rightBottomName" v-show="rankingList==1||rankingList==2">
            <!-- 时间 -->
            <span class="time" v-if="this.$i18n.locale=='zh'" :class="this.$i18n.locale=='zh'?'imgRankStyle':''">
              <img draggable="false"  src="@/assets/images/dice/shijian.png" alt="">
            </span>
            <span class="time" v-if="this.$i18n.locale!='zh'">{{$t("dice.time")}}</span>
            <!-- 玩家 -->
            <span class="player" v-if="this.$i18n.locale=='zh'" :class="this.$i18n.locale=='zh'?'imgRankStyle':''">
              <img draggable="false"  src="@/assets/images/dice/wanjia.png" alt="">
            </span>
            <span class="player" v-if="this.$i18n.locale!='zh'">{{$t("dice.player")}}</span>
            <!-- 投注金额 -->
            <span class="betting_amount" v-if="this.$i18n.locale=='zh'" :class="this.$i18n.locale=='zh'?'imgRankStyle':''">
              <img draggable="false"  src="@/assets/images/dice/touzhujine.png" alt="">
            </span>
            <span class="betting_amount" v-if="this.$i18n.locale!='zh'">{{$t("dice.betting_amount")}}</span>
            <!-- 赢取金额 -->
            <span class="win_price" v-if="this.$i18n.locale=='zh'" :class="this.$i18n.locale=='zh'?'imgRankStyle':''">
              <img draggable="false"  src="@/assets/images/dice/yingqujine.png" alt="">
            </span>
            <span class="win_price" v-if="this.$i18n.locale!='zh'">{{$t("dice.win_price")}}</span>
            <!-- 结果 -->
            <span class="result" v-if="this.$i18n.locale=='zh'" :class="this.$i18n.locale=='zh'?'imgRankStyle':''">
              <img draggable="false"  src="@/assets/images/dice/jieguo.png" alt="">
            </span>
            <span class="result" v-if="this.$i18n.locale!='zh'">{{$t("dice.result")}}</span>
            <!-- 验证 -->
            <span class="verification" v-if="this.$i18n.locale=='zh'" :class="this.$i18n.locale=='zh'?'imgRankStyle':''">
              <img draggable="false"  src="@/assets/images/dice/yanzheng.png" alt="">
            </span>
            <span class="verification" v-if="this.$i18n.locale!='zh'">{{$t("dice.verification")}}</span>
          </div>
          <!-- 24小时排行榜榜单标题 -->
          <div class="rightBottomTime" v-show="rankingList==3&&rank24AllInfo!=null">
            <img draggable="false"  src="@/assets/images/dice/toLastTime.png" alt="" @click="Timecalculation(0)">
            <span v-if="getnowTime!=null&&this.$i18n.locale=='zh'" ><img draggable="false" src="@/assets/images/dice/di.png" alt=""> {{parseInt(rankNum)}} <img draggable="false" src="@/assets/images/dice/qi.png" alt=""></span>
            <span v-if="getnowTime!=null&&this.$i18n.locale!='zh'">{{parseInt(rankNum)}}&nbsp;&nbsp;{{$t("dice.rankDate")}}</span>
            <img draggable="false" class="nextImg" src="@/assets/images/dice/toLastTime.png" alt="" @click="Timecalculation(1)">
          </div>
          <div class="rightBottomName" v-show="rankingList==3">
            <!-- 排名 -->
            <span class="ranking ranking_24HRSpan">
              <!-- <img draggable="false"  draggable="false" class="rankingLastImg" src="@/assets/images/dice/toLastTime.png" alt=""> -->
              <span v-if="this.$i18n.locale=='zh'" :class="this.$i18n.locale=='zh'?'imgRankStyle':''">
                <img draggable="false"  src="@/assets/images/dice/paiming.png" alt="">
              </span>
              <span v-if="this.$i18n.locale!='zh'">{{$t("dice.ranking")}}</span>
            </span>
            <!-- 玩家 -->
            <span class="player" v-if="this.$i18n.locale=='zh'" :class="this.$i18n.locale=='zh'?'imgRankStyle':''">
              <img draggable="false"  src="@/assets/images/dice/wanjia.png" alt="">
            </span>
            <span class="player" v-if="this.$i18n.locale!='zh'">{{$t("dice.player")}}</span>

            <!-- 投注总额 -->
            <span class="betting_amount" v-if="this.$i18n.locale=='zh'" :class="this.$i18n.locale=='zh'?'imgRankStyle':''">
              <img draggable="false"  src="@/assets/images/dice/touzhuzonge.png" alt="">
            </span>
            <span class="betting_amount" v-if="this.$i18n.locale!='zh'">{{$t("dice.betting_amount")}}</span>
            <!-- 排名奖励 -->
            <span class="ranking_reward" v-if="this.$i18n.locale=='zh'" >
              <img draggable="false"  src="@/assets/images/dice/paimingjiangli.png" alt="">
            </span>
            <span class="ranking_reward" v-if="this.$i18n.locale!='zh'">{{$t("dice.ranking_reward")}}</span>
          </div>
          <!-- 幸运数字榜单标题 -->
          <div class="rightBottomName" v-show="rankingList==4">
            <!-- 排名 -->
            <span class="ranking" v-if="this.$i18n.locale=='zh'">
              <img draggable="false"  src="@/assets/images/dice/shijian.png" alt="">
            </span>
            <span class="ranking" v-if="this.$i18n.locale!='zh'">{{$t("dice.time")}}</span>

            <!-- 玩家 -->
            <span class="player" v-if="this.$i18n.locale=='zh'" :class="this.$i18n.locale=='zh'?'imgRankStyle':''">
              <img draggable="false"  src="@/assets/images/dice/wanjia.png" alt="">
            </span>
            <span class="player" v-if="this.$i18n.locale!='zh'">{{$t("dice.player")}}</span>

            <!-- 投注金额 -->
            <span class="betting_amount" v-if="this.$i18n.locale=='zh'" :class="this.$i18n.locale=='zh'?'imgRankStyle':''">
              <img draggable="false"  src="@/assets/images/dice/touzhujine.png" alt="">
            </span>
            <span class="betting_amount" v-if="this.$i18n.locale!='zh'">{{$t("dice.betting_amount")}}</span>

            <!-- EKD奖励 -->
            <span class="ekd_reward" v-if="this.$i18n.locale=='zh'">
              <img draggable="false"  src="@/assets/images/dice/ekdjiangli.png" alt="">
            </span>
            <span class="ekd_reward" v-if="this.$i18n.locale!='zh'">{{$t("dice.ekd_reward")}}</span>

            <!-- 幸运数字 -->
            <span class="lucky" v-if="this.$i18n.locale=='zh'">
              <img draggable="false"  src="@/assets/images/dice/xingyunshuzi.png" alt="">
            </span>
            <span class="lucky" v-if="this.$i18n.locale!='zh'">{{$t("dice.lucky")}}</span>
          </div>
          <!-- 所有人下注记录 -->
          <div style="min-height:700px;" v-if="rankingList==1">
            <ul class="rightBottomInfo" v-if="rankingList==1&&rankingList!=null&&rankingList!=undefined&&rankingList!=[]">
              <li v-for="(item,index) in AllbetInfo" class="animated bounceInLeft" :key="index" :class="parseInt(item.rollBorder)<=parseInt(item.randnum)?'rankingListState1':''" v-show="liArr!=item.betId||liShowState==true">
                <img draggable="false"  v-show="item.userName==currentAccount" class="myImg" src="@/assets/images/dice/touxiang.png" alt>
                <span class="time">{{getInTime(item.betTime)}}</span>
                <span class="player">{{item.userName}}</span>
                <span class="betting_amount">
                  <span class="eosekdNum">{{parseFloat(item.betAmount)}}</span>
                  <span class="eosekdType">{{(item.betAmount).substr(item.betAmount.length-3)}}</span>
                </span>
                <span class="win_price">
                  <span class="eosekdNum">{{parseFloat(item.payout)&lt;=0?'0.0000':parseFloat(item.payout)}}</span>
                  <span class="eosekdType" v-if="item.payout!=null||item.payout!=undefined">{{(item.payout).substr(item.payout.length-3)}}</span>
                </span>
                <span class="result">{{item.randnum}}&lt;{{item.rollBorder}}</span>
                <span class="verification">
                  <img draggable="false"  @click="checkMethods(item)" src="@/assets/images/dice/check.png" alt>
                  <span @click="checkMethods(item)">CHECK</span>
                </span>
              </li>
            </ul>
          </div>
          <!-- 我的下注记录 -->
          <div style="min-height:700px;" v-if="rankingList==2">
            <ul class="rightBottomInfo" v-if="rankingList==2&&myBetInfo!=null&&myBetInfo!=undefined&&myBetInfo!=[]">
              <li v-for="(item,index) in myBetInfo" class="animated bounceInLeft" :key="index" :class="parseInt(item.rollBorder)&lt;=parseInt(item.randnum)?'rankingListState1':''" v-show="liArr!=item.betId||liShowState==true">
                <span class="time">{{getInTime(item.betTime)}}</span>
                <span class="player">{{item.userName}}</span>
                <span class="betting_amount">
                  <span class="eosekdNum">{{parseFloat(item.betAmount)}}</span>
                  <span class="eosekdType">{{item.assetId==1?"EOS":"EKD"}}</span>
                </span>
                <span class="win_price">
                  <span class="eosekdNum">{{parseFloat(item.payout)&lt;=0?'0.0000':parseFloat(item.payout)}}</span>
                  <span class="eosekdType">{{item.assetId==1?"EOS":"EKD"}}</span>
                </span>
                <span class="result">{{item.randnum}}&lt;{{item.rollBorder}}</span>
                <span class="verification">
                  <img draggable="false"  @click="checkMethods(item)" src="@/assets/images/dice/check.png" alt>
                  <span @click="checkMethods(item)">CHECK</span>
                </span>
              </li>
            </ul>
          </div>
          <!-- 24小时排行榜 -->
          <ul class="rightBottomInfo" style="min-height:700px;" v-show="rankingList==3">
            <li v-if="rank24MyInfo!=null&&rank24MyInfo!=undefined&&rank24MyInfo!=''" class="myRank" style="background:#E65545;">
              <img draggable="false"  src="@/assets/images/dice/touxiang.png" alt>
              <span class="ranking">{{rankInMyState&lt;=10?rankInMyState:'-'}}</span>
              <span class="player">{{rank24MyInfo.userName}}</span>
              <span class="betting_amount">{{rank24MyInfo.betAmount}} EOS</span>
              <span class="ranking_reward" v-if="parseInt(rankNum)<=6">{{rankInMyState==1?'200':rankInMyState==2?'100':rankInMyState==3?'60':rankInMyState==4?'45':rankInMyState==5?'35':rankInMyState==6?'25':rankInMyState==7?'15':rankInMyState==8?'10':rankInMyState==9?'6':rankInMyState==10?'4':'0'}} EOS</span>
              <span class="ranking_reward">{{rankInMyState==1?'50 EOS':rankInMyState==2?'25 EOS':rankInMyState==3?'15 EOS':rankInMyState==4?'8 EOS':rankInMyState==5?'2 EOS':'-'}}</span>
            </li>
            <li v-for="(item,i24) in 10" :key="i24">
              <span class="ranking">{{i24+1}}</span>
              <span class="player">{{rank24AllInfo[i24]!=null&&rank24AllInfo[i24]!=undefined&&rank24AllInfo[i24]!=''>0?rank24AllInfo[i24].userName:''}}</span>
              <span class="betting_amount">{{rank24AllInfo[i24]!=null&&rank24AllInfo[i24]!=undefined&&rank24AllInfo[i24]!=''>0?rank24AllInfo[i24].betAmount+" EOS":''}}</span>
              <span class="ranking_reward" v-if="parseInt(rankNum)<=6">{{i24+1==1?'200':i24+1==2?'100':i24+1==3?'60':i24+1==4?'45':i24+1==5?'35':i24+1==6?'25':i24+1==7?'15':i24+1==8?'10':i24+1==9?'6':i24+1==10?'4':'0'}} EOS</span>
              <span class="ranking_reward">{{i24+1==1?'50 EOS':i24+1==2?'25 EOS':i24+1==3?'15 EOS':i24+1==4?'8 EOS':i24+1==5?'2 EOS':'-'}}</span>
            </li>
          </ul>
          <!-- 幸运数字榜单 -->
          <div style="min-height:700px;" v-if="rankingList==4">
            <ul class="rightBottomInfo" v-if="rankingList==4&&luckyBetAllInfo!=null&&luckyBetAllInfo!=''">
              <li v-for="(item,i) in luckyBetAllInfo" :key="i">
                <img draggable="false" class="myImg" v-show="item.userName==currentAccount" src="@/assets/images/dice/touxiang.png" alt>
                <span class="time">{{getInTime1(item.createTime)}}</span>
                <span class="player">{{item!=null&&item!=undefined&&item!=''?item.userName:''}}</span>
                <span class="betting_amount">{{item!=null&&item!=undefined&&item!=''?item.betAmount+" EOS":''}}</span>
                <span class="ekd_reward">{{item!=null&&item!=undefined&&item!=''?item.rewardsEkd+" EKD":''}}</span>
                <span class="lucky">{{item!=null&&item!=undefined&&item!=''?item.luckyNum:luckyNum}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 第三部分 -->
      <email style="z-index:1003"></email>
    </div>
    <div class="footer">
      <div class="bottom_quanxian">copyright © 2019 EOSKINGDOM. All Rights Reserved.</div>
    </div>
    <!-- lucky100规则弹框 -->
    <div class="dicex100_Mask" v-show="dicex100_Mask" @click="dicex100_Mask=false">
      <div class="showContent">
        <img draggable="false"  class="showRule" :src="$t('diceluckyRule')" alt="">
        <img draggable="false"  @click="dicex100_Mask=false" class="showClose" src="@/assets/images/dice/guanbi01.png" alt="">
      </div>
    </div>
    <!-- 列表验证 -->
    <div class="toCheck" v-show="checkState==true" @click.stop="changeCheckState(false)" @mousewheel.prevent @touchmove.prevent>
      <div class="checkDiv" @click.stop="changeCheckState(true)">
          <img draggable="false"  class="outcheckDiv" style="z-index:100;" src="@/assets/images/dice/guanbi01.png" alt="" @click.stop="changeCheckState(false)">
        <ul>
          <li>
            <span>BET_ID&nbsp;:&nbsp;</span>
            <input class="first" type="text" v-model="checkBet_id">
          </li>
          <li>
            <span>User_Name&nbsp;:&nbsp;</span>
            <input class="first" type="text" v-model="checkUser_name">
          </li>
          <li class="setUserSeed">
            <nav>Custom Seed</nav>
            <footer>
              <aside>
                <input class="first userChangeHisSeed" onKeyUp="this.value=this.value.replace(/[^a-z0-9A-Z]/g,'');" maxlength="6" type="text">
                <span v-show="PlayerSeedIndice==''" @click="tochangeUserSeed1">OK</span>
                <span v-show="PlayerSeedIndice!=''" @click="tochangeUserSeed2">CANCLE</span>
                <!-- <p style="font-size:16px;margin-left:44px;margin-top:-5px;" v-show="PlayerSeedIndice!=null">种子已设置</p> -->
              </aside>
            </footer>
          </li>
          <li>
            <span>Bet_amount&nbsp;:&nbsp;</span>
            <input class="first" type="text" v-model="checkBet_amount">
          </li>
          <li>
            <span>Playerseed&nbsp;:&nbsp;</span>
            <input class="first" type="text" disabled style="background: transparent;border: 0;" v-model="checkPlayerseed">
          </li>
          <li class="halfli">
            <div class="rand_seed">
              <span>Rand_Seed&nbsp;:&nbsp;</span>
              <input class="first" type="text" v-model="checkRandsend">
            </div>
            <div class="Next_seed">
              <span>Next_seed&nbsp;:&nbsp;</span>
              <input type="text" style="background: transparent;border: 0;" disabled v-model="checkNextRandsend">
            </div>
          </li>
          <li class="pubkey">
            <span>Pubkey&nbsp;:&nbsp;</span>
              <input type="text" v-model="checkPubkey">
          </li>
          <li class="combine_seed">
            <span>Combine_seed&nbsp;:&nbsp;</span>
            <input type="text" style="background: transparent;border: 0;" disabled v-model="checkCombine_seed">
          </li>
          <li class="second Combine_seed_hash">
            <span>Combine_seed_hash&nbsp;:&nbsp;</span>
            <textarea style="resize:none;overflow:hidden;" disabled readonly v-model="checkCombine_seed_hash"></textarea>
            <img draggable="false"  src="@/assets/images/dice/kuang.png" alt="">
            <img draggable="false"  class="right" v-if="showCombine_seed_hashImg==1" src="@/assets/images/dice/right.png" alt="">
            <img draggable="false"  class="err" v-if="showCombine_seed_hashImg==2" src="@/assets/images/dice/err.png" alt="">
          </li>
          <li class="sign">
            <span>sign&nbsp;:&nbsp;</span>
            <textarea style="resize:none;overflow:hidden;" v-model="checkSign"></textarea>
            <img draggable="false"  src="@/assets/images/dice/kuang.png" alt="">
            <img draggable="false"  class="right" v-if="showsignImg==1" src="@/assets/images/dice/right.png" alt="">
            <img draggable="false"  class="err" v-if="showsignImg==2" src="@/assets/images/dice/err.png" alt="">
          </li>
          <li class="second sign_hash">
            <span>sign_hash&nbsp;:&nbsp;</span>
            <textarea style="resize:none;overflow:hidden;" disabled readonly v-model="checkSigh_hash"></textarea>
            <img draggable="false"  src="@/assets/images/dice/kuang.png" alt="">
            <img draggable="false"  class="right" v-if="showsign_hashImg==1" src="@/assets/images/dice/right.png" alt="">
            <img draggable="false"  class="err" v-if="showsign_hashImg==2" src="@/assets/images/dice/err.png" alt="">
          </li>
          <li class="second">
            <span>signhashpostfix&nbsp;:&nbsp;</span>
            <input class="first" style="background: transparent;border: 0;text-align: left;" disabled type="text" v-model="checkSignhashpostfix">
          </li>
          <li class="second random">
            <span>random&nbsp;:&nbsp;</span>
            <input class="first" style="background: transparent;border: 0;text-align: left;" disabled type="text" v-model="checkRandom">
            <img draggable="false"  src="@/assets/images/dice/kuang.png" alt="">
            <img draggable="false"  class="right" v-if="showrandomImg==1" src="@/assets/images/dice/right.png" alt="">
            <img draggable="false"  class="err" v-if="showrandomImg==2" src="@/assets/images/dice/err.png" alt="">
          </li>
          <a :href="this.checkUrl+this.firstchecktransaction_id" target="_blank" class="toCheckBtn">CHECK</a>
        </ul>
      </div>
    </div>
    <!-- 按钮音效 -->
    <audio src="@/assets/music/bet3.mp3" id="audioClick"></audio>
    <!-- 拖动音效 -->
    <!-- <audio src="@/assets/music/mouseBet.mp3" id="downMouse"></audio> -->
    <!-- 转动音效 -->
    <audio src="@/assets/music/dicezhuandoong.mp3" loop id="audioPlay"></audio>
    <!-- 胜利音效 -->
    <audio src="@/assets/music/shengli.mp3" id="audioWin"></audio>
    <!-- 失败音效 -->
    <audio src="@/assets/music/shibai.mp3" id="audioLose"></audio>
    <!-- 大奖音效 -->
    <audio src="@/assets/music/winmoney.mp3" id="winmoney"></audio>
    <son-tankuang :title="sonTitle" :content="sonContent" :showHide="sonShowHide" :makeSure="sonMakeSure" :change="sonchange"></son-tankuang>
  </div>
</template>
<script>
// 新头
import newnav from "@/components/layout/newnav";
import email from '@/components/email'
import sonTankuang from '@/components/page/sonTankuang'
// 旧头
import "@/assets/css/nav.css";
import "@/assets/css/dice.css";

import easing from "@/assets/js/easing.min.js";
import Eos from "eosjs";
import Eosecc from "eosjs-ecc";
import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs";
import Service from "@/assets/js/scatterservice.js";
import {confignode} from "@/assets/js/scatterconfig.js";
import EosTab from "@/assets/js/EosTab";
import bgconn from "@/assets/js/bgconn.js";
export default {
  components: {newnav,email,sonTankuang},
  name: "dice",
  data() {
    return {
      checkUrl:bgconn.toCheck,
      betState:false,
      nodelist:null,
      dezhou:bgconn.DEZHOU,
      yinxiaoState:true,
      rankInMyState:100,
      autoslotNum:0,//自动下注次数
      // 控制弹框显示隐藏
      sonShowHide:false,
      // 控制弹框标题
      sonTitle:null,
      // 控制弹框内容
      sonContent:null,
      // 控制弹框按钮是否变成下载链接
      sonMakeSure:null,
      PlayerSeedIndice:"",//用户种子
      userChangeHisSeed:null,//用户修改种子
      minedScale:50,//一阶段样式
      WKEkdNum:'',//挖矿数量
      reference:'',//挖矿数量
      luckyNum:null,
      autoGetInfo:null,//自动下注获取数据
      selfLuckyCount:0,
      luckyState:false,
      allUserBetNum:null,
      slider: null, //滚动条DOM元素
      thunk: null, //拖拽DOM元素
      per: 50, //当前值
      min: 0, //最小值
      max: 100, //最大值
      currentAccount:null,
      gameState: 2, //游戏初始状态
      selectState: false, //组件下拉框状态
      rankNum:1,
      selected1: "EOS",
      selected2: "EKD",
      rankingList: 1, //排行榜状态
      btnState: 0,
      chatState: false, //聊天框默认情况
      locale1: null, //动态语言切换
      childValue: null,
      eventState1: false, //事件框状态
      eventState1Animated: null, //事件框延时器状态
      slotImgStyle: false, //老虎机样式状态
      rankingState: false, //三榜单切换状态
      oneOrauto: 1, //自动手动下注状态
      inputNum: 0.1, //初始下注金额
      payOut: 2.01, //赔率，初始值2
      winChance: 50, //获胜机会
      rollUnder: 50,
      winProitem: 0.002, //获胜金额
      winProitem1: null, //实际获胜金额
      loseBetAmount:null,//输的金额(带单位)
      loseBetAmount1:null,//输的金额(不带单位)
      progressNum1: 50,
      tokenType: 1, //代币类型
      tokenType1: 1, //下注结果专用代币类型
      winState: false, //单次押注胜利状态
      loseState: false, //单次押注失败状态
      gobtnState:true,//单次下注go按钮的点击状态------------------
      autoWinState: false, //自动押注胜利状态
      autoLoseState: false, //自动押注失败状态
      allSetInter:null,//定时器获取信息状态
      AllbetInfo: [],//所有人下注排行榜数据
      myBetInfo:[],
      luckyBetAllInfo:[],
      luckyBetMyInfo:[],
      rank24MyInfo:[],
      rank24AllInfo:[],
      diceNum: null, //dice下注额
      next_start_index: 0,
      eos_balance:0,//eos数量
      eos_balanceekd:0,//ekd数量
      autobtnState:true,//自动下注单次开始结束按钮+状态
      cpu_use:0,
      net_use:0,
      dicex100_Mask:false,//幸运数字弹框状态
      liArr:null,//自动请求单次li数据
      liShowState:true,//自动请求单次显示状态
      longTimeAni:null,// 长时间动画
      allBetInter:null,//所有下注定时器
      userName:null,
      inputChange:true,//input框下面的四个按钮的状态      
      getBJStartTime:null,// 获取北京开始时间     
      getnowTime:null,//获取当前年月日时间 
      getBJendTime:null,// 获取北京下一天时间
      daojishiTime:null,//设置24小时倒计时时间
      startTime24:null,
      endTime24:null,
      oneHourTime:null,//设置1小时倒计时时间
      oneHourTime2:null,//设置1小时倒计时时间
      oneHourTimedaojihsi:null,//设置1小时倒计时时间
      inputState:false,
      checkState:false,//列表验证框
      // 验证框数据(动态)
      checkBet_id:null,
      checkUser_name:null,
      checkBet_amount:null,
      checkPlayerseed:null,
      checkRandsend:null,
      checkPubkey:null,
      checkCombine_seed:null,
      checkCombine_seed_hash:null,
      checkSign:null,
      checkSigh_hash:null,
      checkSignhashpostfix:null,
      checkRandom:null,
      checkNextRandsend:null,
      // 验证框数据(静态)
      firstcheckBet_id:null,
      firstcheckUser_name:null,
      firstcheckBet_amount:null,
      firstcheckPlayerseed:null,
      firstcheckRandsend:null,
      firstcheckPubkey:null,
      firstcheckCombine_seed:null,
      firstcheckCombine_seed_hash:null,
      firstcheckSign:null,
      firstcheckSigh_hash:null,
      firstcheckSignhashpostfix:null,
      firstcheckRandom:null,
      firstcheckNextRandsend:null,
      firstchecktransaction_id:null,

      // 验证框图片样式
      showCombine_seed_hashImg:1,
      showsignImg:1,
      showsign_hashImg:1,
      showrandomImg:1,



    };
  },
  created() {
    clearInterval(this.longTimeAni);
    this.longTimeAni=null;
    clearInterval(this.oneHourTimedaojihsi)
    this.oneHourTimedaojihsi=null;
    this.getLocalTime()
    if (this.allSetInter==null) {
      this.getRank();
    }
    this.get24Rank();
    this.getAllBet();
    this.getLuckyPlayer();
    this.locale1 = this.$i18n.locale;
   
      if (sessionStorage.getItem("accountmsg") != null) {
        confignode().then(rs=>{
       this.nodelist = JSON.stringify(rs);
      Service.config={       
        blockchain: "eos",
        host: rs[0].name,
        port: 443,
        protocol: "https",
        chainId: rs[0].chainid
    }
     Service.options.httpEndpoint=`https://${rs[0].name}`
      Service.checkAccount(JSON.parse(sessionStorage.getItem("accountmsg")).currentAccount)
      .then(res=>{
        this.cpu_use = this.substrNum((res.cpu_limit.used/res.cpu_limit.max)*100,0);
        this.net_use = this.substrNum((res.net_limit.used/res.net_limit.max)*100,0);
      })
      this.childByValue(JSON.parse(sessionStorage.getItem("accountmsg")).currentAccount);
      
      this.currentAccount = JSON.parse(
        sessionStorage.getItem("accountmsg")
      ).currentAccount;
      this.loginSatus = true;
      Service.get_currency_balance(this.currentAccount).then(rs => {
        if(rs.length>0){
            this.eos_balance = rs[0].substr(0, rs[0].length - 4);
          }
      });
      Service.get_currency_balanceEkd(this.currentAccount).then(rs => {
        if (rs != "") {
          this.eos_balanceekd =Math.floor(rs[0].substr(0, rs[0].length - 4) * 100 + 0.0001) /100;
        }
      });
            })
      this.getMyBet();
      this.getRefer();
    }
  },
  watch: {
    tokenType(){
      // 选择下注为EKD时候
      if (this.tokenType==0) {
        this.inputNum = 100;
       // 选择下注为EOS时候
      } else if(this.tokenType==1){
        this.inputNum = 0.1;
      }
    },
    inputNum(n, o) {
      // 小数点下标
      let nIndex = n.toString().indexOf(".");
      // 总长度
      let nLong = n.length - 1;

       this.eos_balance = parseFloat(this.eos_balance);
       n = parseFloat(n);
      // 选择下注为EKD时候
      if (this.tokenType==0) {
        if (n>=this.eos_balanceekd&this.eos_balanceekd<=200000) {
          this.inputNum = this.eos_balanceekd;
        }else if(n>=this.eos_balanceekd&this.eos_balanceekd>=200000){
          this.inputNum = 200000;
        }else if(n<=this.eos_balanceekd&n>=200000){
          this.inputNum = 200000;
        }
       // 选择下注为EOS时候
      } else if(this.tokenType==1){
        if (n < 0.1&&n!=0.&&n!=0.0&&n!=0.00) {
          this.inputNum = 0.1;
        }
        if (n>this.eos_balance&&this.eos_balance<200) {
          this.inputNum = this.eos_balance;
        }else if(n>this.eos_balance&&this.eos_balance>200){
          this.inputNum = 200;
        }else if(n<this.eos_balance&&n>200){
          this.inputNum = 200;
        }
      }

      this.inputNum = this.substrNum(this.inputNum, 2);
      if (nIndex + 2 < nLong && nIndex != -1) {
        n =n.substring(0, nIndex + 3);
        this.inputNum = parseFloat(n);
      }
      let progressNum = Math.floor(this.scale * 100 + 0.5);
      this.progressNum1 = Math.floor(this.scale * 100 + 0.5);
      // 赔率
      this.payOut = this.substrNum(98.5 / (progressNum - 1), 3);
      // 获胜金额
      this.winProitem = this.substrNum(this.inputNum * this.payOut, 3);
      // 获胜几率
      this.winChance = this.substrNum((progressNum / 100) * 100, 3) - 1;
      // 当前数值
      this.rollUnder = Math.floor(this.scale * 100 + 0.5);
    },
    winProitem(n,o){
      // 选择下注为EKD时候
      if (this.tokenType==0) {
        if (n >=1000000) {
          n=1000000;
          this.inputNum = parseInt(n/this.payOut);
        }
       // 选择下注为EOS时候
      } else if(this.tokenType==1){
        if (n >=210) {
          n=210;
          this.inputNum = parseInt(n/this.payOut);
        }
      }
    },
    scale(n, o) {
      let progressNum = Math.floor(this.scale * 100 + 0.5);
      this.progressNum1 = Math.floor(this.scale * 100 + 0.5);
      // 赔率
      this.payOut = this.substrNum(98.5 / (progressNum - 1), 3);
      // 获胜金额
      this.winProitem = this.substrNum(this.inputNum * this.payOut, 3);
      // 获胜几率
      this.winChance = Math.ceil(
        this.substrNum((progressNum / 100) * 100, 3) - 1
      );
      // 当前数值
      this.rollUnder = Math.floor(this.scale * 100 + 0.5);
    },
    locale1(n, o) {
      if (sessionStorage.getItem("accountmsg") != null) {
      this.currentAccount = JSON.parse(
        sessionStorage.getItem("accountmsg")
      ).currentAccount;
      this.loginSatus = true;
      
    }
    },
    childValue(accname) {
      if (accname != null) {
        this.currentAccount =accname;
        Service.checkAccount(accname)
        .then(res=>{
          this.cpu_use = this.substrNum((res.cpu_limit.used/res.cpu_limit.max)*100,0);
          this.net_use = this.substrNum((res.net_limit.used/res.net_limit.max)*100,0);
        })

        Service.get_currency_balance(this.currentAccount).then(rs => {          if(rs.length>0){
            this.eos_balance = rs[0].substr(0, rs[0].length - 4);
          }
        });
        Service.get_currency_balanceEkd(this.currentAccount).then(rs => {
          if (rs != "") {
            this.eos_balanceekd =Math.floor(rs[0].substr(0, rs[0].length - 4) * 100 + 0.0001) /100;
          }
        });
        if (this.allSetInter==null) {
          this.getRank();
        }
        this.getMyBet();
        this.getRefer();
        this.get24Rank();
        this.getAllBet();
      }else{
        this.currentAccount='';
        this.selfLuckyCount = 0;
        this.cpu_use = 0;
        this.net_use = 0;
        this.rank24MyInfo=[];
        this.rank24AllInfo=[];
        this.eos_balance=0;
        this.eos_balanceekd=0;
        this.myBetInfo=[];
      }
    },
    checkBet_id(n,o){
      this.checkCombine_seed=this.checkUser_name+":"+this.checkBet_amount+":"+this.checkPlayerseed+":"+parseInt(this.checkBet_id/233280)+":"+this.checkRandsend;
      this.checkCombine_seed_hash =Eosecc.sha256(this.checkCombine_seed);
    },
    checkUser_name(n,o){
      this.checkCombine_seed=this.checkUser_name+":"+this.checkBet_amount+":"+this.checkPlayerseed+":"+parseInt(this.checkBet_id/233280)+":"+this.checkRandsend;
      this.checkCombine_seed_hash =Eosecc.sha256(this.checkCombine_seed);
   },
    checkBet_amount(n,o){
      this.checkCombine_seed=this.checkUser_name+":"+this.checkBet_amount+":"+this.checkPlayerseed+":"+parseInt(this.checkBet_id/233280)+":"+this.checkRandsend;
      this.checkCombine_seed_hash =Eosecc.sha256(this.checkCombine_seed);
    },
    checkPlayerseed(n,o){
      this.checkCombine_seed=this.checkUser_name+":"+this.checkBet_amount+":"+this.checkPlayerseed+":"+parseInt(this.checkBet_id/233280)+":"+this.checkRandsend;
      this.checkCombine_seed_hash =Eosecc.sha256(this.checkCombine_seed);
    },
    checkRandsend(n,o){
      this.checkCombine_seed=this.checkUser_name+":"+this.checkBet_amount+":"+this.checkPlayerseed+":"+parseInt(this.checkBet_id/233280)+":"+this.checkRandsend;
      this.checkNextRandsend = (n*9301+49297)%233280;
      this.checkCombine_seed_hash =Eosecc.sha256(this.checkCombine_seed);
      // 私钥签名验证
    },
    checkCombine_seed(n,o){
      // 组合种子判断
      if (this.checkCombine_seed_hash!=this.firstcheckCombine_seed_hash) {
        this.showCombine_seed_hashImg=2;
      }else{
        this.showCombine_seed_hashImg=1;
      }
      try {
        let verified = Eosecc.verify(this.checkSign,this.checkCombine_seed,this.checkPubkey,'utf8',false);
        if (verified) {
          this.showsignImg=1;
          this.showsign_hashImg=1;
          this.showrandomImg=1;
        }else{
          this.showsignImg=2;
          this.showsign_hashImg=2;
          this.showrandomImg=2;
        }
        
      } catch (error) {
      }
    },
    checkPubkey(n,o){
      // 公钥判断
      if (this.checkSign==this.firstcheckSign&&this.checkPubkey==this.firstcheckPubkey&&this.checkCombine_seed_hash==this.firstcheckCombine_seed_hash) {
        this.showsignImg=1;
        this.showsign_hashImg=1;
        this.showrandomImg=1;
      }else{
        this.showsignImg=2;
        this.showsign_hashImg=2;
        this.showrandomImg=2;
      }
    },
    checkSign(n,o){
      this.checkSigh_hash =Eosecc.sha256(this.checkSign);
      this.checkSignhashpostfixM();
      this.checkRandom=parseInt(this.checkSignhashpostfix.substr(this.checkSignhashpostfix.length-3))+1;
      // 组合种子判断
      if (this.checkCombine_seed_hash!=this.firstcheckCombine_seed_hash) {
        this.showCombine_seed_hashImg=2;
      }else{
        this.showCombine_seed_hashImg=1;
      }
     // 私钥签名验证
      try {
        if (this.checkSign==this.firstcheckSign&&this.checkPubkey==this.firstcheckPubkey&&this.checkCombine_seed_hash==this.firstcheckCombine_seed_hash) {
          this.showsignImg=1;
        }else {
          this.showsignImg=2;
        }  
        if (this.checkSign!=this.firstcheckSign) {
          this.showsignImg=2;
        }
        if ( this.showsignImg==1) {
          this.showsign_hashImg=1;
          this.showrandomImg=1;
        } else {
          this.showsign_hashImg=2;
          this.showrandomImg=2;
        }
      } catch (error) {
      }
   },
  },
  mounted() {
    // 滑动条DOM节点
    this.slider = this.$refs.progressDiv;
    // 拖动图标DOM节点
    this.thunk = this.$refs.trunk;
    var _this = this;
      this.slider.onmousedown = function(e) {
        clearTimeout(_this.eventState1Animated);
      if (_this.inputChange==true) {
        e = window.event || e;
        if (e.stopPropagation) {
          e.stopPropagation(); //阻止事件 冒泡传播
        } else {
          e.cancelBubble = true; //ie兼容
        }
        _this.eventState1 = true;
        var width = parseInt(_this.width);
        var disX = e.offsetX;
        var scale = disX / _this.slider.offsetWidth;
        if (scale <= 0.04) {
          scale = 0.04;
        }
        if (scale >= 0.954) {
          scale = 0.954;
        }
        _this.per = Math.ceil((_this.max - _this.min) * scale + _this.min);
        _this.per = Math.max(_this.per, _this.min);
        _this.per = Math.min(_this.per, _this.max);
        document.onmouseup = function() {
          _this.eventState1Animated = setTimeout(() => {
            _this.eventState1 = false;
          }, 1000);
          document.onmousemove = document.onmouseup = null;
        };
        
      }
    };
      this.thunk.onmousedown = function(e) {
        clearTimeout(_this.eventState1Animated);
      if (_this.inputChange==true) {
        e = window.event || e;
        if (e.stopPropagation) {
          e.stopPropagation(); //阻止事件 冒泡传播
        } else {
          e.cancelBubble = true; //ie兼容
        }
        _this.eventState1 = true;
        var width = parseInt(_this.width);
        var disX = e.clientX;
        document.onmousemove = function(e) {
          // value, left, width
          // 当value变化的时候，会通过计算属性修改left，width
  
          // 拖拽的时候获取的新width
          var newWidth = e.clientX - disX + width;
          // 拖拽的时候得到新的百分比
          var scale = newWidth / _this.slider.offsetWidth;
          
          if (scale <= 0.04) {
            scale = 0.04;
          }
          if (scale >= 0.954) {
            scale = 0.954;
          }
          _this.per = Math.ceil((_this.max - _this.min) * scale + _this.min);
        };
        document.onmouseup = function() {
          _this.eventState1Animated = setTimeout(() => {
            _this.eventState1 = false;
          }, 1000);
          document.onmousemove = document.onmouseup = null;
        };
        return false;
      };
      
    }
    setTimeout(() => {
      $(".loadMask").css("display","none")
    }, 500);
    // 监视页面标签页是否处于激活状态
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        if (this.autoGetInfo==null) {
          console.log('前台')

        }
      } else if (document.visibilityState === 'hidden') {
          if (this.autoGetInfo==null) {
            console.log('后台')
          }
      }
    })
  },
  computed: {
    scale() {
      var a = (this.per - this.min) / (this.max - this.min);
      return (this.per - this.min) / (this.max - this.min);
    },
    width() {
      if (this.slider) {
        return this.slider.offsetWidth * this.scale + "px";
      } else {
        return 0 + "px";
      }
    },
    left() {
      if (this.slider) {
        return (
          this.slider.offsetWidth * this.scale -
          this.thunk.offsetWidth / 2 +
          "px"
        );
      } else {
        return 30 + "px";
      }
    },
  },
  methods: {
    sonchange(val) {
      this.sonShowHide = val;
      this.autoslotNum=0;
      this.oneOrauto=1;
      this.slotImgStyle = false;
    },
    changeYinxiao(){
      this.yinxiaoState=!this.yinxiaoState;
      if (this.yinxiaoState==true) {
        $('#audioClick')[0].volume=1;
        $('#audioPlay')[0].volume=1;
        $('#audioWin')[0].volume=1;
        $('#audioLose')[0].volume=1;
      }else{
        $('#audioClick')[0].volume=0;
        $('#audioPlay')[0].volume=0;
        $('#audioWin')[0].volume=0;
        $('#audioLose')[0].volume=0;
      }
    },
    getLuckyPlayer(){
      this.$http.get(bgconn.getluckyPlayer+"?account="+this.currentAccount+"&pageSize=30").then(info=>
      {
        this.luckyBetMyInfo = info.data.accountList;
        this.luckyBetAllInfo = info.data.listAll;
         var isTrue = true;
        this.luckyBetMyInfo.forEach((myItem,Myindex)=>{1
          this.luckyBetAllInfo.forEach((AllItem,Allindex)=>{
            if (myItem.id == AllItem.id&&isTrue==true) {
              this.luckyBetMyInfo[Myindex].luckyRankNum = Allindex+1;
              isTrue = false;
            }
            if (Allindex==this.luckyBetAllInfo.length-1) {
              isTrue = true;
            }
          })
        })

        
      }).catch(()=>
      {
      })
    },
    getLocalTime(){
      if (this.oneHourTime==null) {
        var time1 = new Date(new Date().getTime()+60*60*1000);
        var year =time1.getFullYear();
        var month = time1.getMonth()+1;
        var day = time1.getDate();
        var hour = time1.getHours();
        var endTime = new Date(year+"/"+this.changeTime(month)+"/"+this.changeTime(day)+" "+this.changeTime(hour)+":00:00");
        this.oneHourTime = endTime -new Date();
        var nowMinute,nowSecond;
      }
      // 分钟
      this.oneHourTimedaojihsi = setInterval(() => {
        if (this.oneHourTime<=0) {
          this.oneHourTime=60*60*1000;
        }
        nowMinute = parseInt((this.oneHourTime/1000)%3600/60);
        // 秒
        nowSecond =parseInt(this.oneHourTime/1000%60);
        this.oneHourTime-=1000;
        this.oneHourTime2 = this.changeTime(nowMinute)+":"+this.changeTime(nowSecond)
      }, 1000);

    },
    // 总投注额
    getAllBet(){   
      this.$http.get(bgconn.getAllBet).then(info=>
        {
          this.allUserBetNum = info.data.betTotal;
          if (this.minedScale!=info.data.mined_scale&&info.data.mined_scale!=null) {
            this.minedScale = info.data.mined_scale;
          }
        }).catch(()=>
        {
        })
      this.get24Rank();
      clearInterval(this.allBetInter)
      this.allBetInter=null;
      this.allBetInter = setInterval(() => {
        this.$http.get(bgconn.getAllBet).then(info=>
        {
          this.allUserBetNum = info.data.betTotal;
          if (this.minedScale!=info.data.mined_scale&&info.data.mined_scale!=null) {
            this.minedScale = info.data.mined_scale;
          }
        }).catch(()=>
        {
        })
        this.getLuckyPlayer();
        this.get24Rank()
      }, 10000);
    },
    // 获取推荐人
    getRefer(){
      this.$http.get(bgconn.getreference+"?account="+this.currentAccount).then(info=>
      {
        this.reference = info.data.reffer;
        console.log("推荐人",this.reference);
      })
    },
    // 挖矿EKD数量
    getWKEkd(){
      this.$http.get(bgconn.BONUSPOOL).then(info=>
      {
        console.log("查看挖矿数量",info)
        this.WKEkdNum = info.data.dividendsEntity.minedCirculating;
      }).catch(()=>{
        this.WKEkdNum=50000;
      })
    },
    tochangeUserSeed1(){
      this.userChangeHisSeed=$(".userChangeHisSeed").val()
      this.PlayerSeedIndice=this.userChangeHisSeed;
    },
    tochangeUserSeed2(){
      this.PlayerSeedIndice='';
      $(".userChangeHisSeed").val("")
    },
    changerankingList(num){
      $("#audioClick")[0].currentTime=0;
      $("#audioClick")[0].play();
      this.rankingList = num;
      if (num==2) {
      }else if(num==3){
        this.get24Rank();
      }
    },
    changeTime(val){
      if(val<10&&val>=0){
        return "0"+val;
      }else{
        return val;
      }
    },
    getInTime(time){
      time = time.replace(/\T/g,"\ ");
      time = time.replace(/\-/g,"\/");
      time = time.replace(/\.0/g,"\ ");
      time = time+" UTC+8";
      var time1 = new Date(time);
      var year =time1.getFullYear();
      var month = time1.getMonth()+1;
      var day = time1.getDate();
      var hour = time1.getHours();
      var minute = time1.getMinutes();
      var second = time1.getSeconds();
      let timeIn =this.changeTime(hour)+":"+this.changeTime(minute)+":"+this.changeTime(second);
      return timeIn;
    },
    getInTime1(time){
      time = time.replace(/\T/g,"\ ");
      time = time.replace(/\-/g,"\/");
      time = time.replace(/\.0/g,"\ ");
      time = time+" UTC+8";
      var time1 = new Date(time);
      var year =time1.getFullYear();
      var month = time1.getMonth()+1;
      var day = time1.getDate();
      var hour = time1.getHours();
      var minute = time1.getMinutes();
      var second = time1.getSeconds();
      let timeIn =this.changeTime(month)+"/"+this.changeTime(day)+" "+this.changeTime(hour)+":"+this.changeTime(minute)+":"+this.changeTime(second);
      return timeIn;
    },
    checkMethods(item) {
      if (item.assetId=="2") {
        item.assetId='0';
      }
      this.$http.get(bgconn.getbetdata+"?assetId="+item.assetId+"&betId="+item.betId)
      .then((info)=>{
        // 静态
        this.firstcheckBet_id=info.data.betId;
        this.firstcheckUser_name=info.data.userName;
        this.firstcheckBet_amount=info.data.betAmount;
        this.firstcheckPlayerseed=info.data.playerseed;
        this.firstcheckRandsend=info.data.rand_seed;
        this.checkNextRandsend =(this.checkRandsend*9301+49297)%233280;
        this.firstcheckPubkey=info.data.pubKey;
        this.firstcheckCombine_seed=info.data.combine_seed;
        this.firstcheckCombine_seed_hash=info.data.combine_seed_hash;
        
        this.firstcheckSign=info.data.sign;
        this.firstcheckSigh_hash=info.data.signhash;
        
        this.firstcheckRandom=info.data.random;
        this.firstchecktransaction_id = info.data.transaction_id
        this.firstcheckSignhashpostfixM();
        // 动态
        this.checkBet_id=info.data.betId;
        this.checkUser_name=info.data.userName;
        this.checkBet_amount=info.data.betAmount;
        this.checkPlayerseed=info.data.playerseed;
        this.checkRandsend=info.data.rand_seed;
        this.checkNextRandsend =(this.checkRandsend*9301+49297)%233280;
        this.checkPubkey=info.data.pubKey;
        this.checkCombine_seed=info.data.combine_seed;
        this.checkCombine_seed_hash=info.data.combine_seed_hash;
        this.checkSign=info.data.sign;
        this.checkSigh_hash=info.data.signhash;
        this.checkRandom=info.data.random;
        this.checkSignhashpostfixM();

        
      })
      this.checkState=true;
    },
    firstcheckSignhashpostfixM(){
      var index=0;
      var signhashpostfix2= 0;
      do {
        this.firstcheckSignhashpostfix=this.firstcheckSigh_hash.substr(index,5);
        signhashpostfix2 = parseInt(this.firstcheckSigh_hash.substr(index,5),16);
        this.firstcheckSignhashpostfix = this.firstcheckSignhashpostfix+"("+signhashpostfix2+")";
        index+=5;
        if (index>(this.firstcheckSigh_hash.length)-5) {
          break;
        }
      } while (signhashpostfix2>=1000000); 
    },
    checkSignhashpostfixM(){
      var index=0;
      var signhashpostfix2= 0;
      do {
        this.checkSignhashpostfix=this.checkSigh_hash.substr(index,5);
        signhashpostfix2 = parseInt(this.checkSigh_hash.substr(index,5),16);
        this.checkSignhashpostfix = this.checkSignhashpostfix+"("+signhashpostfix2+")";
        index+=5;
        if (index>(this.checkSigh_hash.length)-5) {
          break;
        }
      } while (signhashpostfix2>=1000000); 
    },
    // 自动动画
    autoAnimated(result,isluckyNum){
      if (isluckyNum==undefined) {
        isluckyNum=false;
      }
      // clearInterval(this.longTimeAni);
      // this.longTimeAni=null;
      this.winState = false;
      this.loseState = false;
      this.slotImgStyle = true;
      var _num_ = this;
        this.slotImgStyle = false;
        $("#audioPlay")[0].pause();
        $("#audioPlay")[0].currentTime=0;
        if (this.diceNum > result&isluckyNum==false) {
          $("#audioWin")[0].play();
          this.winState = true;
        } else if(this.diceNum <= result&isluckyNum==false){
          $("#audioLose")[0].play();
          this.loseState = true;
        }else if(isluckyNum==true){
          $("#winmoney")[0].play();
          this.luckyState = true;
        }
        setTimeout(() => {
          this.winState = false;
          this.loseState = false;
          this.liShowState = true;
          this.luckyState = false;
          $("#audioWin")[0].pause();
          $("#audioWin")[0].currentTime=0;
          $("#audioLose")[0].pause();
          $("#audioLose")[0].currentTime=0;
          $("#winmoney")[0].pause();
          $("#winmoney")[0].currentTime=0;
          if (this.isluckyNum==true) {
            this.getLuckyPlayer();
          }
          // 测试部分
          if (this.oneOrauto==2) {
              //单次下注状态开启
              this.autobtnState=true;
              // 自动下注停止go状态关闭
              this.gobtnState=false;
              console.log("动画执行结束，开始下一次转账====================")
              // 再次调用下注方法
              this.toAutoSlot();
          }
          if (this.oneOrauto==1) {
              // 自动下注停止go状态开启
              this.gobtnState=true;
                //单次下注状态开启
              this.autobtnState=true;
              console.log("自动下注结束====================")
              // 停止定时器
              clearInterval(this.longTimeAni);
              this.longTimeAni=null;
              this.autoslotNum=0;
              $(".numOne").css("backgroundPositionY", -360);
              $(".numTwo").css("backgroundPositionY", -150);
              $(".numThree").css("backgroundPositionY", -150);
              if (this.allSetInter==null) {
                console.log("自动下注结束，重新定时获取数据====================")
                this.getRank();
              }
            }
          Service.get_currency_balance(this.currentAccount).then(rs => {
          if(rs.length>0){
              this.eos_balance = rs[0].substr(0, rs[0].length - 4);
            }
          });
          Service.get_currency_balanceEkd(this.currentAccount).then(rs => {
            if (rs != "") {
              this.eos_balanceekd =Math.floor(rs[0].substr(0, rs[0].length - 4) * 100 + 0.0001) /100;
            }
        });
        }, 1000);
    },
    toStopSlot(){
      // 初始颜色切换状态
      this.oneOrauto=1;
      this.winState = false;
      this.loseState = false;
      this.autoslotNum=0;
    },
    toAutoSlot() {
      this.inputNum = parseFloat(this.inputNum);
      // 选择下注为EKD时候
      if (this.tokenType==0) {
        if (this.inputNum<100) {
          this.sonShowHide=true;
          this.sonContent=this.$t("dice.minEKDBet");
          this.sonMakeSure=null;
          this.inputState=false;
        }else{
          this.inputState=true;
        }
       // 选择下注为EOS时候
      } else if(this.tokenType==1){
        if (this.inputNum < 0.1) {
          this.sonShowHide=true;
          this.sonContent=this.$t("dice.minEOSBet");
          this.sonMakeSure=null;
          this.inputState=false;
        }else{
          this.inputState=true;
        }
      }
      // 自动下注开始
      if (this.inputState==true&&this.autobtnState==true&this.currentAccount!=null) {
        // 单次下注状态
        this.gobtnState=false;
        // 自动下注次数
        this.autoslotNum+=1;
        // 点击go的话自动下注停止
        this.autobtnState=false;
        if (this.oneOrauto==1) {
          $("#audioClick")[0].currentTime=0;
          $("#audioClick")[0].play();
          // clearInterval(this.longTimeAni);
          // this.longTimeAni=null;
        }
        console.log("进入自动下注")
        // 初始颜色切换状态
        this.oneOrauto=2;
        clearInterval(this.allSetInter);
        this.allSetInter=null;
        
        // 更新CPU和NET状态
        Service.checkAccount(this.currentAccount)
        .then(res=>{
          this.cpu_use = this.substrNum((res.cpu_limit.used/res.cpu_limit.max)*100,0);
          this.net_use = this.substrNum((res.net_limit.used/res.net_limit.max)*100,0);
        })
        // $(".inputNum").attr("readonly",true);
        let result=null;
        console.log("自动下注准备转账1")
        // 自动下注
        var remark = "under" + "-" + this.progressNum1 + "-" + 1 + "-" +this.PlayerSeedIndice+ "-"+this.reference;
        console.log("自动下注准备转账2")
         Service.diceTransfer(this.tokenType, this.inputNum, remark)
            .then(data => {
              console.log("自动下注转账成功1")
              $("#audioPlay")[0].play();
              // 转账成功，返回结果还未拿到
              this.slotImgStyle = true;
              console.log("自动下注转账成功2")
              // 数值变化
              Service.get_currency_balance(this.currentAccount).then(rs => {
                if(rs.length>0){
                    this.eos_balance = rs[0].substr(0, rs[0].length - 4);
                  }
              });
              Service.get_currency_balanceEkd(this.currentAccount).then(rs => {
                if (rs != "") {
                  this.eos_balanceekd =Math.floor(rs[0].substr(0, rs[0].length - 4) * 100 + 0.0001) /100;
                }
              });
              console.log("转账成功准备开始动画")
              if (this.longTimeAni==null) {
                this.longTimeAni = setInterval(() => {
                 var _this = this;
                 $(".num").stop(true,true).animate(
                   {
                     //  - (207.75 *num_arr[index])-360
                     backgroundPositionY: 207.75 * 30 - 360
                   },
                   {
                     duration: 1000,
                     easing: "linear",
                     complete: function() {
                       $(".numOne").css("backgroundPositionY", -360);
                       $(".numTwo").css("backgroundPositionY", -150);
                       $(".numThree").css("backgroundPositionY", -150);
   
                     }
                   }
                 );
               }, 1000);
              }
              var baskingAuto = false;
              console.log("转账成功准备开始请求数据",this.longTimeAni)
              if (this.autoGetInfo==null) {
                console.log("定时器为空时进入定时器");
                this.autoGetInfo = setInterval(() => {
                  console.log("转账成功进入定时器",this.autoGetInfo)
                  if (!baskingAuto) {
                    baskingAuto=true;
                    try{
                      baskingAuto=true;
                      console.log("转账成功开始请求",bgconn.getresults +"?start_index=" +this.next_start_index +"&count=30&account="+this.currentAccount)
                      this.$http.get(bgconn.getresults +"?start_index=" +this.next_start_index +"&count=30&account="+this.currentAccount)
                        .then(info => {
                          baskingAuto=true;
                          console.log("数据请求发送成功",info)
                          // 当获取到新数组的时候
                          if (info.data.betList.length>0) {
                            console.log("得到数据，开始查验",this.currentAccount)
                            this.luckyNum = info.data.curLuckyData.lucky_num;
                            this.selfLuckyCount = info.data.selfLuckyCount;
                            info.data.betList = info.data.betList.reverse();
                            info.data.betList.forEach((arr,index) => {
                              if (arr.userName == this.currentAccount) {
                                clearInterval(this.autoGetInfo);
                                console.log("得到当前账户下注信息")
                                this.autoGetInfo=null;
                                // 
                                if (arr.betId!=null&&arr.betId!="") {
                                  this.liArr = arr.betId;
                                }else{
                                  console.log("arr.betId数值为空")
                                }

                                this.liShowState = false;

                                // 随机数字
                                if (arr.rollBorder!=null&&arr.rollBorder!="") {
                                  this.diceNum = arr.rollBorder;
                                }else{
                                  console.log("arr.betId数值为空")
                                }

                                // this.tokenType1 = arr.assetId;
                                // 下注类型
                                if (arr.assetId!=null&&arr.assetId!="") {
                                  this.tokenType1 = arr.assetId;
                                }else{
                                  console.log("arr.assetId数值为空")
                                }
                                // 获胜金额
                                if (arr.payout!=null&&arr.payout!="") {
                                  this.winProitem1 = arr.payout;
                                }else{
                                  console.log("arr.payout数值为空")
                                }

                                // 输时候的金额
                                if (arr.betAmount!=null&&arr.betAmount!="") {
                                  this.loseBetAmount = arr.betAmount;
                                  this.loseBetAmount1 =this.substrNum(arr.betAmount,4);
                                }else{
                                  console.log("arr.betAmount数值为空")
                                }
                                this.myBetInfo.unshift(arr);
                                this.myBetInfo = this.myBetInfo.slice(0,30)
                                console.log("转账成功数据请求成功")
                                this.autoAnimated(arr.randnum,arr.isluckyNum);
                              }
                              if (arr.betId != this.AllbetInfo[0].betId) {
                                this.AllbetInfo.unshift(arr)
                                this.AllbetInfo =Array.from(new Set(this.AllbetInfo));
                                this.AllbetInfo=this.AllbetInfo.slice(0,30);
                              }
                            if (info.data.betList.length-1==index) {
                              baskingAuto = false;
                              this.next_start_index = info.data.next_start_index;
                            }
                            });    
                          }else{
                            baskingAuto=false;
                          }
                        }).catch(()=>{
                          baskingAuto = false;
                          console.log("请求信息失败,重新开始请求=================================")
                        });
                    }catch(err){
                      baskingAuto = false;
                    }
                  }
                }, 500);

              }
            })
            .catch(err => {
              clearInterval(this.longTimeAni);
              this.longTimeAni=null;
              // 报错后开启单次点击按钮
              this.gobtnState=true
              // 报错后开启auto点击
              this.autobtnState=true
              // 弹框状态
              this.sonShowHide=true;
              this.sonContent=this.$t("dice.betErr");
              this.sonMakeSure=null;
              this.oneOrauto=1;
              console.log("自动下注转账失败")
              if (this.autoslotNum>=1) {
                setTimeout(() => {
                  this.sonShowHide=false;
                  console.log("条件判断重新开始下注")
                  if (this.autoslotNum>=1) {
                    this.autoslotNum=0;
                    console.log("重新开始下注1")
                    this.toAutoSlot();
                    console.log("重新开始下注2")
                  }
                }, 3000);
              }
            });
        
      }else if (this.currentAccount==null) {
        clearInterval(this.longTimeAni);
        this.longTimeAni=null;
        this.sonShowHide=true;
        this.sonContent=this.$t("ekd.scatterlogin");
        this.sonMakeSure=null;
      }
    },
    toGoSlot() {
      this.inputNum = parseFloat(this.inputNum)
      // 选择下注为EKD时候
      if (this.tokenType==0) {
        if (this.inputNum<100) {
          this.sonShowHide=true;
          this.sonContent=this.$t("dice.minEKDBet");
          this.sonMakeSure=null;
          this.inputState=false;
        }else{
          this.inputState=true;
        }
       // 选择下注为EOS时候
      } else if(this.tokenType==1){
        if (this.inputNum < 0.1) {
          this.sonShowHide=true;
          this.sonContent=this.$t("dice.minEOSBet");
          this.sonMakeSure=null;
          this.inputState=false;
        }else{
          this.inputState=true;
        }
      }
      if (this.inputState==true&&this.gobtnState==true&this.currentAccount!=null) {
        // 单次下注状态
        this.gobtnState=false;
        // 点击go的话自动下注停止
        this.autobtnState=false;
        $("#audioClick")[0].currentTime=0;
        $("#audioClick")[0].play();
        clearInterval(this.allSetInter);
        this.allSetInter=null;
        // 更新CPU和NET状态
        Service.checkAccount(this.currentAccount)
        .then(res=>{
          this.cpu_use = this.substrNum((res.cpu_limit.used/res.cpu_limit.max)*100,0);
          this.net_use = this.substrNum((res.net_limit.used/res.net_limit.max)*100,0);
        })
        // 初始颜色切换状态
        this.oneOrauto=1
        var remark = "under" + "-" + this.progressNum1 + "-" + 1 + "-"+this.PlayerSeedIndice+ "-"+this.reference;
        // 查看发送数据
        Service.diceTransfer(this.tokenType, this.inputNum, remark)
          .then(data => {
            $("#audioPlay")[0].currentTime=0;
            $("#audioPlay")[0].play();
            // 转账成功，返回结果还未拿到
            this.slotImgStyle = true;
            // 数值变化
            Service.get_currency_balance(this.currentAccount).then(rs => {
              if(rs.length>0){
                  this.eos_balance = rs[0].substr(0, rs[0].length - 4);
                }
            });
            Service.get_currency_balanceEkd(this.currentAccount).then(rs => {
              if (rs != "") {
                this.eos_balanceekd =Math.floor(rs[0].substr(0, rs[0].length - 4) * 100 + 0.0001) /100;
              }
            });
            var aaa = setInterval(() =>{
              var _this = this;
               $(".num").stop(true,true).animate(
                {
                  //  - (207.75 *num_arr[index])-360
                  backgroundPositionY: 207.75 * 30 - 360
                },
                {
                  duration: 1000,
                  easing: "linear",
                  complete: function() {
                    $(".numOne").css("backgroundPositionY", -360);
                    $(".numTwo").css("backgroundPositionY", -150);
                    $(".numThree").css("backgroundPositionY", -150);

                  }
                }
              );
            }, 1000);




            // 获取最新下注信息
            var baskingGo = false
            var getInfo = setInterval(() => {
              if (!baskingGo) {
                baskingGo=true;
                try{
                  this.$http.get(bgconn.getresults + "?start_index=" + this.next_start_index + "&count=30&account="+this.currentAccount)
                    .then(info => {
                      this.luckyNum = info.data.curLuckyData.lucky_num;
                      this.selfLuckyCount = info.data.selfLuckyCount;
                      
                      // 当获取到新数组的时候
                      if (info.data.betList.length>0) {
                        info.data.betList = info.data.betList.reverse();
                        info.data.betList.forEach((arr,index) => {
                          if (arr.userName == this.currentAccount&&arr.betId!=this.myBetInfo[0].betId) {
                              this.liArr = arr.betId;
                              this.liShowState = false;
                              this.myBetInfo.unshift(arr);
                              this.myBetInfo = this.myBetInfo.slice(0,30)
                              this.diceNum = arr.rollBorder;
                              this.tokenType1 = arr.assetId;
                              this.winProitem1 = arr.payout;
                              this.loseBetAmount =arr.betAmount;
                              this.loseBetAmount1 =this.substrNum(arr.betAmount,4);
                              this.goSlot(arr.randnum,arr.isluckyNum);
                              clearInterval(aaa);
                              clearInterval(getInfo);
                            }
                            this.AllbetInfo.unshift(arr);
                            this.AllbetInfo =Array.from(new Set(this.AllbetInfo));
                            this.AllbetInfo=this.AllbetInfo.slice(0,30);
                          if (info.data.betList.length-1==index) {
                            baskingGo = false;
                            this.next_start_index = info.data.next_start_index;
                          }
                        });
                      }
                        baskingGo=false;
                    }).catch(()=>{
                      baskingGo=false;
                      clearInterval(aaa);
                      clearInterval(getInfo);
                    });

                }catch(err){
                  baskingGo=false;
                }
              }
            }, 500);
          })
          .catch(err => {
            // 报错后开启单次点击按钮
            this.gobtnState=true;
            // 报错后开启auto点击
            this.autobtnState=true;
            // 弹框状态
            if (Service.EosAcc.transInfo==null) {
              this.sonShowHide=true;
              this.sonContent=this.$t("ekd.scatterNofind");
              this.sonMakeSure="download";
            }
          });
        
      }else if (this.currentAccount==null) {
        this.sonShowHide=true;
        this.sonContent=this.$t("ekd.scatterlogin");
        this.sonMakeSure=null;
      }
    },
    getMyBet(){
      if (this.currentAccount!=null&&this.currentAccount!=undefined) {
        this.$http.get(bgconn.getMyBet+"?pageSize=30&userName="+this.currentAccount)
        .then(info=>{
          this.myBetInfo = info.data.list;
        })
        .catch(()=>{
        })
      }
    },
    Timecalculation(q){
      var nowTime11="";
      nowTime11 = this.getnowTime.replace(/\-/g,"\/");
      this.getBJStartTime = this.getBJStartTime.replace(/\-/g,"\/");
      var date = new Date(this.getnowTime.replace(/\-/g,"\/"));
      var date1 = new Date(this.getBJStartTime);
       if(q==1){
         if(new Date(date.getTime()+24*60*60*1000)<=new Date(this.getBJStartTime)){
           date=new Date(date.getTime()+24*60*60*1000)
           this.rankInMyState=100;
           this.rankNum+=1;
        }
       }else{
         if(new Date(date.getTime()-24*60*60*1000)>=new Date(date1.getTime()-24*60*60*1000*6)&&new Date(date.getTime()-24*60*60*1000)>new Date('2019/06/13 10:00:00 UTC').getTime()){
            date=new Date(date.getTime()-24*60*60*1000)
            this.rankInMyState=100;
            this.rankNum-=1;
          }
       }
      this.getnowTime=date;
      this.getnowTime=date.getFullYear()+'/'+this.changeTime((date.getMonth()+1))+'/'+this.changeTime(date.getDate())+" "+this.changeTime(date.getHours())+":"+this.changeTime(date.getMinutes())+":"+this.changeTime(date.getSeconds());
      if (this.nowtime11!=this.getBJStartTime) {
        this.get24Rank();   
      }
    },
    // 排行榜信息
    get24Rank(){
        let time = this.getnowTime;
        let time1 = 0;
        let time2 = 0;
        var timeStringYear1,timeStringMonth1,timeStringDay1;
        var timeStringYear2,timeStringMonth2,timeStringDay2;
        if (time!=null) {  
          // 当前时间
          timeStringYear1 =parseInt(this.getnowTime.slice(0,4))
          timeStringMonth1 = parseInt(this.getnowTime.slice(5,7))
          timeStringDay1 =parseInt(this.getnowTime.slice(8,10)) 
          // 开始时间
          timeStringYear2 =parseInt(this.getnowTime.slice(0,4))
          timeStringMonth2 = parseInt(this.getnowTime.slice(5,7))
          timeStringDay2 =parseInt(this.getnowTime.slice(8,10)) 
          
          if (parseInt(this.getnowTime.slice(11,13))<=17) {
            if (timeStringDay1-1==0) {
              if (timeStringMonth1-1==0) {
                timeStringMonth2=12;
                timeStringYear2-=1;
              }else{
                timeStringMonth2-=1;
              }
              switch(timeStringMonth2)
              {
              case 1:
              case 3:
              case 5:
              case 7:
              case 8:
              case 10:
              case 12:
                timeStringDay2 = 31;
                break;
              case 2:
                {
                  if(timeStringYear1%4 == 0){
                    timeStringDay2 = 29;
                    break;
                  }else{
                    timeStringDay2 = 28;
                    break;
                  }              
                }
              default:{
                timeStringDay2 = 30;
                break;
              }
              } 
            }else{
              timeStringDay2-=1;
            }
            if (timeStringMonth2==0) {
              timeStringYear2--;
              timeStringMonth2=12;
            }
            this.startTime24 =timeStringYear2+"/"+this.changeTime(timeStringMonth2)+"/"+this.changeTime(timeStringDay2)+" 18:00:00";
            this.endTime24 =timeStringYear1+"/"+this.changeTime(timeStringMonth1)+"/"+this.changeTime(timeStringDay1)+" 18:00:00";
         } else {
              switch(timeStringMonth1)
              {
              case 1:
              case 3:
              case 5:
              case 7:
              case 8:
              case 10:
              case 12:
                if (timeStringDay1 == 31) {
                  timeStringDay2 = 1;
                  timeStringMonth2+=1;
                  if (timeStringMonth2>12) {
                    timeStringMonth2=1;
                    timeStringYear2+=1;
                  }
                }else{
                  timeStringDay2 += 1;
                }
                break;
              case 2:
                {
                  if(timeStringYear1%4 == 0){
                    if (timeStringDay1 == 29) {
                      timeStringDay2 = 1;
                      timeStringMonth2+=1;
                      if (timeStringMonth2>12) {
                        timeStringMonth2=1;
                        timeStringYear2+=1;
                      }
                    }else{
                      timeStringDay2 += 1;
                    }
                    break;
                  }else{
                    if (timeStringDay1 == 28) {
                      timeStringDay2 = 1;
                      timeStringMonth2+=1;
                      if (timeStringMonth2>12) {
                        timeStringMonth2=1;
                        timeStringYear2+=1;
                      }
                    }else{
                      timeStringDay2 += 1;
                    }
                    break;
                  }              
                }
                default:{
                  if (timeStringDay1 == 30) {
                    timeStringDay2 = 1;
                    timeStringMonth2+=1;
                    if (timeStringMonth2>12) {
                      timeStringMonth2=1;
                      timeStringYear2+=1;
                    }
                  }else{
                    timeStringDay2 += 1;
                  }
                  break;
                }
              }
            this.startTime24 =timeStringYear1+"/"+this.changeTime(timeStringMonth1)+"/"+this.changeTime(timeStringDay1)+" 18:00:00";
            this.endTime24 =timeStringYear2+"/"+this.changeTime(timeStringMonth2)+"/"+this.changeTime(timeStringDay2)+" 18:00:00";          
          }
          time1 = this.startTime24;
          time2 = this.endTime24;
        }
        this.$http.get(bgconn.get24Rank+"?pageSize=10&assetId=1&userName="+this.currentAccount+"&startTime="+time1+"&endTime="+time2)
        .then(info=>{
          if (this.currentAccount!=null&&this.currentAccount!=undefined&&this.currentAccount!='') {
            this.rank24MyInfo = info.data.diceEntity;
          }
          this.rank24AllInfo = info.data.list;
          // this.getBJStartTime ="2019/01/01 17:59:50";
          this.getBJStartTime = info.data.time;
          this.rank24AllInfo.forEach((item,index) => {
          if (item.userName == this.currentAccount) {
            this.rankInMyState = parseInt(index);
            if (this.rankInMyState+1<=10) {
              this.rankInMyState=this.rankInMyState+1;
            }else{
              this.rankInMyState=100;
            }
          }
          });
          if (this.getnowTime==null) {
            this.getnowTime=info.data.time;
            // this.getnowTime ="2019/01/01 17:59:50";
            this.getnowTime=this.getnowTime.replace(/\-/g,"\/");
              this.daojishiTime1();
          }
          this.rankNum = Math.ceil((new Date(this.getnowTime).getTime()-new Date('2019/06/13 10:00:00 UTC'))/1000/60/60/24);
        })
        .catch(err=>{
        })
    },
    daojishiTime1(){
      var timeStringYear =parseInt(this.getBJStartTime.slice(0,4))
      var timeStringMonth = parseInt(this.getBJStartTime.slice(5,7))
      var timeStringDay =parseInt(this.getBJStartTime.slice(8,10)) 
      var timeStringHour =parseInt(this.getBJStartTime.slice(11,13))
      if (timeStringHour<=17) {
        var startTime = new Date(this.getBJStartTime.replace(/\-/g,"\/"));
        var endTime = new Date(timeStringYear+"/"+this.changeTime(timeStringMonth)+"/"+this.changeTime(timeStringDay)+" 18:00:00")
        var hour,minute,second;
        var Timeing = endTime - startTime;
      }else{
        timeStringDay = timeStringDay+1;
        var testDay = 30;
        switch(timeStringMonth)
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
            if (timeStringDay>testDay) {
              timeStringMonth++;
              timeStringDay = 1;
              if (timeStringMonth>12) {
                timeStringYear++;
                timeStringMonth=1;
              }
            }
          var startTime = new Date(this.getBJStartTime.replace(/\-/g,"\/"));
          var endTime = new Date(timeStringYear+"/"+this.changeTime(timeStringMonth)+"/"+this.changeTime(timeStringDay)+" 18:00:00")
          var hour,minute,second;
          var Timeing = endTime - startTime;
      }
         var intTime1 = setInterval(() => {
          if (Timeing <=0) {
            clearInterval(intTime1);
            intTime1=null;
            this.rankNum='';
            this.getnowTime=null;
            this.rank24MyInfo =[];
            this.rank24AllInfo =[];
            this.rankInMyState=100;
            this.get24Rank();
          }
          hour = parseInt(Timeing/1000/3600);
          // 分钟
          minute = parseInt((Timeing/1000)%3600/60);
          // 秒
          second = Timeing/1000%60;
          Timeing -=1000;
          this.daojishiTime = this.changeTime(hour)+":"+this.changeTime(minute)+":"+this.changeTime(second);
        }, 1000);
    },
    getRank() {
      clearInterval(this.allSetInter)
      this.allSetInter = null;
      var bAsking = false;
      this.allSetInter = setInterval(() => {
        if (!bAsking) {
          bAsking = true;
          this.$http.get(bgconn.getresults +"?start_index=" +this.next_start_index + "&count=30&account="+this.currentAccount)
            .then(info => { 
              this.luckyNum = info.data.curLuckyData.lucky_num;
              this.selfLuckyCount = info.data.selfLuckyCount;
              if (this.next_start_index==0&info.data.betList.length==0) {
                bAsking = false;
              }else if (this.next_start_index==0&info.data.betList.length>0) {
                this.AllbetInfo=info.data.betList
                this.next_start_index = info.data.next_start_index;
                bAsking = false;
              }else if (info.data.betList.length>0&this.next_start_index!=0) {
                info.data.betList = info.data.betList.reverse();
                info.data.betList.forEach((arr,index) => {
                    this.AllbetInfo.unshift(info.data.betList[index])
                    this.AllbetInfo =Array.from(new Set(this.AllbetInfo));
                    this.AllbetInfo=this.AllbetInfo.slice(0,30);
                    this.next_start_index = info.data.next_start_index;
                  if (info.data.betList.length-1==index) {
                    bAsking = false;
                  }
                });
              }else{
                bAsking = false;
              }
            })
            .catch(()=>{
              bAsking=false
            });  
          }
          this.getWKEkd() 
        }, 500);
        
    },
    // 单次下注动画
    goSlot(result,isluckyNum) {
      if (isluckyNum==undefined) {
        isluckyNum=false;
      }
      this.winState = false;
      this.loseState = false;
      this.slotImgStyle = true;
      var _num_ = this;
      var num_arr = (result + "").split("");
      if (num_arr.length == 2) {
        num_arr.unshift(0);
      } else if (num_arr.length == 1) {
        num_arr.unshift(0);
        num_arr.unshift(0);
      }
      $(".numOne").css("backgroundPositionY", -360);
      $(".numTwo").css("backgroundPositionY", -150);
      $(".numThree").css("backgroundPositionY", -150);
      $(".num").each(function(index) {
        var _num = $(this);
        if (num_arr[0] == 1) {
          // 初始值为1的情况
          setTimeout(function() {
            if (index == 0) {
              _num.animate(
                {
                  //  - (207.75 *num_arr[index])-360
                  backgroundPositionY: 207.75 * 60 - 360
                },
                {
                  duration: 100 + index * 300,
                  easing: "swing",
                }
              );
            } else {
              _num.animate(
                {
                  backgroundPositionY:
                    207.75 * 60 - 207.75 * num_arr[index] - 150
                },
                {
                  duration: 900 + index * 100,
                  easing: "swing",
                  complete: function() {
                    if (index == 2) {
                      $("#audioPlay")[0].pause();
                      $("#audioPlay")[0].currentTime=0;
                      _num_.slotImgStyle = false;
                      if (_num_.diceNum > result&isluckyNum==false) {
                        $("#audioWin")[0].play();
                        _num_.winState = true;
                      } else if(_num_.diceNum <= result&isluckyNum==false){
                        $("#audioLose")[0].play();
                        _num_.loseState = true;
                      }else if(isluckyNum==true){
                        $("#winmoney")[0].play();
                        _num_.luckyState = true;
                      }  
                      setTimeout(() => {
                        _num_.winState = false;
                        _num_.loseState = false;
                        _num_.liShowState = true;
                         _num_.luckyState = false;
                         $("#audioWin")[0].pause();
                         $("#audioWin")[0].currentTime=0;
                         $("#audioLose")[0].pause();
                         $("#audioLose")[0].currentTime=0;
                         $("#winmoney")[0].pause();
                         $("#winmoney")[0].currentTime=0;
                         if (_num_.isluckyNum==true) {
                           _num_.getLuckyPlayer();
                         }
                        // 开启单次点击按钮
                        _num_.gobtnState=true;
                        // go动画结束后开启auto点击
                        _num_.autobtnState=true;
                        if (_num_.allSetInter==null) {
                          _num_.getRank();
                        }
                        // $(".inputNum").attr("readonly",false)
                        
                        Service.get_currency_balance(_num_.currentAccount).then(rs => {
                        if(rs.length>0){
                            _num_.eos_balance = rs[0].substr(0, rs[0].length - 4);
                          }
                        });
                        Service.get_currency_balanceEkd(_num_.currentAccount).then(rs => {
                          if (rs != "") {
                            _num_.eos_balanceekd =Math.floor(rs[0].substr(0, rs[0].length - 4) * 100 + 0.0001) /100;
                          }
                      });
                      }, 2000);
                    }
                  }
                }
              );
            }
          }, index * 100);
        } else {
          // 初始值不为0的情况
          setTimeout(function() {
            if (index == 0) {
              _num.animate(
                {
                  //  - (207.75 *num_arr[index])-360
                  backgroundPositionY: 207.75 * 60 - 567.75 //(207.75+360)
                },
                {
                  duration: 100 + index * 300,
                  easing: "swing",
                }
              );
            } else {
              _num.animate(
                {
                  backgroundPositionY:
                    207.75 * 60 - 207.75 * num_arr[index] - 150
                },
                {
                  duration: 1000 + index * 500,
                  easing: "swing",
                  complete: function() {
                    if (index == 2) {
                      $("#audioPlay")[0].pause();
                      $("#audioPlay")[0].currentTime=0;
                      _num_.slotImgStyle = false;
                       if (_num_.diceNum > result&isluckyNum==false) {
                         $("#audioWin")[0].play();
                          _num_.winState = true;
                        } else if(_num_.diceNum <= result&isluckyNum==false){
                          $("#audioLose")[0].play();
                          _num_.loseState = true;
                        }else if(isluckyNum==true){
                          $("#winmoney")[0].play();
                          _num_.luckyState = true;
                        }
                      setTimeout(() => {
                        _num_.winState = false;
                        _num_.loseState = false;
                        _num_.liShowState = true;
                        _num_.luckyState = false;
                         $("#audioWin")[0].pause();
                         $("#audioLose")[0].pause();
                         $("#audioWin")[0].currentTime=0;
                         $("#audioLose")[0].currentTime=0;
                         $("#winmoney")[0].currentTime=0;
                         $("#winmoney")[0].currentTime=0;
                         if (_num_.isluckyNum==true) {
                           _num_.getLuckyPlayer();
                         }
                        // 开启单次点击按钮
                        _num_.gobtnState=true
                        // go动画结束后开启auto点击
                        _num_.autobtnState=true
                        if (_num_.allSetInter==null) {
                          _num_.getRank();
                        }
                        $(".inputNum").attr("readonly",false)
                        Service.get_currency_balance(_num_.currentAccount).then(rs => {
                        if(rs.length>0){
                            _num_.eos_balance = rs[0].substr(0, rs[0].length - 4);
                          }
                        });
                        Service.get_currency_balanceEkd(_num_.currentAccount).then(rs => {
                          if (rs != "") {
                            _num_.eos_balanceekd =Math.floor(rs[0].substr(0, rs[0].length - 4) * 100 + 0.0001) /100;
                          }
                      });

                      }, 2000);
                    }
                  }
                }
              );
            }
          }, index * 100);
        }
      });
    },
    // 暂用随机数函数
    numRand() {
      var x = 100; //上限100
      var y = 0; //下限0
      var rand = parseInt(Math.random() * (x - y + 1) + y);
      return rand;
    },
    localeMethods(info) {
      this.locale1 = info;
    },
    childByValue(childValue) {
      this.childValue = childValue;
    },
    substrNum(num, n) {
      let str = String(num);
      let longIndex = str.length;
      let index = str.indexOf(".");
      if (index != -1) {
        let str1 = str.substring(0, index + n + 1);
        str1 = parseFloat(str1);
        return str1;
      } else {
        let str2 = parseFloat(str);
        return str2;
      }
    },
    changebtnState(res) {
      $("#audioClick")[0].currentTime=0;
      $("#audioClick")[0].play();
      if (this.inputChange==true) {
        if (res == 1) {
          // 最小值情况
            // 选择下注为EKD时候
            if (this.tokenType==0) {
              this.inputNum = 100;
            // 选择下注为EOS时候
            } else if(this.tokenType==1){
              this.inputNum = 0.1;
            }
        } else if (res == 2) {
          this.inputNum = this.substrNum(this.inputNum / 2, 3);
          // EKD情况
          if (this.tokenType==0){
            if (this.inputNum <= 100) {
            this.inputNum = 100;
          }
          }else{
            // EOS情况
            if (this.inputNum<=0.1) {
              this.inputNum = 0.1;
            }
          }
        } else if (res == 3) {
          this.inputNum = this.substrNum(this.inputNum * 2, 3);
          // 货币情况判断
            // EKD情况
          if (this.tokenType==0) {
            if (this.inputNum>=this.eos_balanceekd&this.eos_balanceekd<=200000) {
              this.inputNum = this.eos_balanceekd;
              this.inputNum = this.substrNum(this.inputNum, 2);
            }else if(this.inputNum>=this.eos_balanceekd&this.eos_balanceekd>=200000){
              this.inputNum = 200000;
            }else if(this.inputNum<=this.eos_balanceekd&this.inputNum>=200000){
              this.inputNum = 200000;
            }
            // EOS情况
            } else if(this.tokenType==1){
              if (this.inputNum>=this.eos_balance&this.eos_balance<=200) {
                this.inputNum = this.eos_balance;
                this.inputNum = this.substrNum(this.inputNum, 2);
              }else if(this.inputNum>=this.eos_balance&this.eos_balance>=200){
                this.inputNum = 200;
              }else if(this.inputNum<=this.eos_balance&this.inputNum>=200){
                this.inputNum = 200;
              }
            }
        } else if (res == 4) {
          // 最大值情况
          this.eos_balanceekd = parseFloat(this.eos_balanceekd)
            // 选择下注为EKD时候
            if (this.tokenType==0) {
              if (this.eos_balanceekd>=200000&&parseInt(this.winProitem/this.payOut)<=1000000) {
                this.inputNum = 200000;
              }else if (this.eos_balanceekd>=200000&&parseInt(this.winProitem/this.payOut)>1000000) {
                this.inputNum = parseInt(this.winProitem/this.payOut);
              }else if (this.eos_balanceekd<200000&&parseInt(this.winProitem/this.payOut)>1000000) {
                this.inputNum = parseInt(this.winProitem/this.payOut);
              }else{
                this.inputNum = this.eos_balanceekd;
              }
            // 选择下注为EOS时候
            } else if(this.tokenType==1){
              if (this.eos_balance>=200&&parseInt(this.winProitem/this.payOut)<=210) {
                this.inputNum = 200;
              }else if (this.eos_balance>=200&&parseInt(this.winProitem/this.payOut)>210) {
                this.inputNum = parseInt(this.winProitem/this.payOut);
              }else if (this.eos_balance<200&&parseInt(this.winProitem/this.payOut)>210) {
                this.inputNum = parseInt(this.winProitem/this.payOut);
              }else{
                this.inputNum = this.eos_balance;
              }
            }
        }
  
        this.btnState = res;
        
      }
    },
    changeState() {
      if (this.inputChange==true) {
        this.selectState = !this.selectState;
      }
    },
    changeTo() {
      if (this.selected1 == "EOS") {
        this.selected1 = "EKD";
        this.tokenType = 0;
        this.selected2 = "EOS";
        this.selectState = false;
        this.btnState=-1;
      } else {
        this.selected1 = "EOS";
        this.tokenType = 1;
        this.selected2 = "EKD";
        this.selectState = false;
        this.btnState=-1;
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
    changeCheckState(info){
      if (info) {
        this.checkState=true;
      } else {
        this.checkBet_id=null;
        this.checkUser_name=null;
        this.checkBet_amount=null;
        this.checkPlayerseed=null;
        this.checkRandsend=null;
        this.checkNextRandsend =null;
        this.checkPubkey=null;
        this.checkCombine_seed=null;
        this.checkCombine_seed_hash=null;
        this.checkSign=null;
        this.checkSigh_hash=null;
        this.checkRandom=null;
        this.checkSignhashpostfix=null;
        this.checkState=false;
      }
    }
  }
};
</script>
<style scoped>
</style>
