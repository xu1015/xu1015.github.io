<template>
  <div class="myAgent">
    <Card class="card1" :title="$t('myInfo')">
      <div class="rightContent">
        <!-- 会员总数 -->
        <div class="infoCard">
          <div class="cardLeft">
            <img src="../../assets/img/userOnline.png" style="width:60%;" alt draggable="false"/>
          </div>
          <div class="cardRight">
            <p class="cardTitle">{{$t("mymemberTotal")}}</p>
            <p class="cardContent" style="color:#1296db;">{{setNum(vipNum)}}</p>
          </div>
        </div>
        <!-- 本月新增会员 -->
        <div class="infoCard">
          <div class="cardLeft">
            <img src="../../assets/img/addVip.png" style="width:60%;" alt draggable="false"/>
          </div>
          <div class="cardRight">
            <p class="cardTitle">{{$t("mymemberMonthAdd")}}</p>
            <p class="cardContent" style="color:#D707FA;">{{setNum(addVipNum)}}</p>
          </div>
        </div>
        <!-- 本月收入 -->
        <div class="infoCard">
          <div class="cardLeft">
            <img src="../../assets/img/monthIncome.png" style="width:65%;" alt draggable="false"/>
          </div>
          <div class="cardRight">
            <p class="cardTitle">{{$t("income_month")}}</p>
            <p class="cardContent" style="color:#78C446;">{{setNum(monthIncome)}}</p>
          </div>
        </div>
        <!-- 累计收入 -->
        <div class="infoCard">
          <div class="cardLeft">
            <img src="../../assets/img/allIncome.png" style="width:60%;" alt draggable="false"/>
          </div>
          <div class="cardRight">
            <p class="cardTitle">{{$t("incomeTotal")}}</p>
            <p class="cardContent" style="color:#5ED8A9;">{{setNum(allIncome)}}</p>
          </div>
        </div>
        <!-- 可提现金额 -->
        <div class="infoCard">
          <div class="cardLeft">
            <img src="../../assets/img/shouru.png" style="width:60%;" alt draggable="false"/>
          </div>
          <div class="cardRight">
            <p class="cardTitle">{{$t("withdrawCanmoney")}}</p>
            <p class="cardContent" style="color:#F44E4E">{{setNum(available)}}</p>
          </div>
        </div>
        <!-- 申请提现金额 -->
        <div class="infoCard">
          <div class="cardLeft">
            <img src="../../assets/img/applyMoney.png" style="width:60%;" alt draggable="false"/>
          </div>
          <div class="cardRight">
            <p class="cardTitle">{{$t("withdrawApplymoney")}}</p>
            <p class="cardContent" style="color:#6C6FBF;">{{setNum(frozen)}}</p>
          </div>
        </div>
        <!-- 已提现金额 -->
        <div class="infoCard">
          <div class="cardLeft">
            <img src="../../assets/img/withdrawMoney.png" style="width:60%;" alt draggable="false"/>
          </div>
          <div class="cardRight">
            <p class="cardTitle">{{$t("withdrawAlreadymoney")}}</p>
            <p class="cardContent" style="color:#f19d25;">{{setNum(withdrawCash)}}</p>
          </div>
        </div>
        <!-- 分成比例 -->
        <div class="infoCard">
          <div class="cardLeft">
            <img src="../../assets/img/scaleImg.png" style="width:60%;" alt draggable="false"/>
          </div>
          <div class="cardRight">
            <p class="cardTitle">{{$t("divide_scale")}}</p>
            <p class="cardContent" style="color:#073efa;">{{divide_into}}%</p>
          </div>
        </div>
      </div>
    </Card>

    <Card class="card1" :title="$t('myOperation')">
      <div class="rightContent">
        <!-- 第一个 -->
        <div class="operationCard">
          <p class="cardTopP1">
            {{$t("withdrawCanmoney")}}：
            <span>{{setNum(available)}}</span>
          </p>
          <p class="cardTopP2" @click="showwithDraw">{{$t("withdraw")}}</p>
        </div>
        <!-- 第二个 -->
        <div class="operationCard">
          <p class="cardTopP1" style="height:auto;line-height:normal;font-size:21px;">
            {{$t("bankCardNum")}}：
            <span style="font-size:26px;">{{this.bankCardNum1}}******{{this.bankCardNum2}}</span>
          </p>
          <p class="cardTopP2" @click="showchangebank">{{$t("revisebankCard")}}</p>
        </div>
      </div>
    </Card>
    <!-- 账单展示 -->
    <div class="billTitle">
      <router-link to="/home/myagent/monthBill">
        <span class="titleCenter">{{$t("billMonth")}}</span>
      </router-link>|
      <router-link to="/home/myagent/yearBill">
        <span class="titleCenter">{{$t("billHistory")}}</span>
      </router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
import Url from "@/assets/js/configUrl";
import { getToken,setToken } from "@/assets/js/baseMethods";
import Cookies from "js-cookie";
import iView from 'iview'
export default {
  name: "myAgent",
  data() {
    return {
      vipNum: 0,
      monthIncome: 0,
      allIncome: 0,
      available: 0,
      frozen: 0,
      withdrawCash: 0,
      divide_into: 0,
      coming: "monthBill",
      // 申请提现金额
      applyWithdrawMoney: 0,
      // 申请修改银行卡
      applybankCardNum: "",
      // 银行卡号
      bankCardNum: 0,
      bankCardNum1: 0,
      bankCardNum2: 0,
      // 银行卡开户名
      bankUserName: "",
      // 银行存储手机号
      bankCardPhone: "",
      // 开户银行
      bankName: "",
      // 本月新增会员
      addVipNum: 0
    };
  },
  mounted() {
    const agentName = sessionStorage.getItem("agentName");
    this.getAgentInfo(agentName);
  },
  methods: {
    setNum(num) {
      let num1 = parseFloat(num);
      if (num1 < 1000000) {
        return parseInt(num1);
      } else if (num1 >= 1000000 && num1 < 1000000) {
        return (num1 / 1000000).toFixed(2) + "M+";
      } else if (num1 >= 100000000) {
        return num1 / 100000000 + "B+";
      }
    },
    getAgentInfo(name) {
      const token = getToken();
      iView.LoadingBar.start()
      this.axios({
        method: "post",
        url: Url.agentUserUrl,
        headers: { token: token },
        params: {
          agentUser: name
        }
      }).then(res => {
        iView.LoadingBar.finish()
        if (res.data.code==601) {
          setToken("")
          this.$router.push({ name: "login" });
        }else if(res.data.code==200){
          console.log("查看返回信息",res)
          console.log("res.data.newMember",res.data.agentAccountBean.newMember)
          this.vipNum = res.data.agentAccountBean.peopleCount;
          this.monthIncome = res.data.agentAccountBean.monthProfit;
          this.allIncome = res.data.agentAccountBean.incomeTotal;
          this.available = res.data.agentAccountBean.available;
          this.frozen = res.data.agentAccountBean.frozen;
          this.withdrawCash = res.data.agentAccountBean.withdrawCash;
          this.divide_into = res.data.agentAccountBean.scale * 100;
          this.addVipNum = res.data.agentAccountBean.newMember;
          this.bankCardNum =this.errHandle(res.data.agentAccountBean.bankCard,this.bankCardNum);
          this.bankUserName =this.errHandle(res.data.agentAccountBean.bankAccount,this.bankUserName);
          this.bankCardPhone =this.errHandle(res.data.agentAccountBean.mobile,this.bankCardPhone);
          this.bankName =this.errHandle(res.data.agentAccountBean.bankName,this.bankName);
  
          this.bankCardNum1 = res.data.agentAccountBean.bankCard.slice(0, 4);
          this.bankCardNum2 = res.data.agentAccountBean.bankCard.slice(res.data.agentAccountBean.bankCard.length - 4);
          this.applyWithdrawMoney = res.data.agentAccountBean.available;
          this.applybankCardNum =this.errHandle(res.data.agentAccountBean.bankCard,this.applybankCardNum);
        }else{
          this.$Message.error({
            content:_this.$t('request fail'),
            duration:3
          });
        }
      }).catch((e)=>{
        iView.LoadingBar.finish()
      });
    },
    errHandle(val,info){
      if (val == null) {
        if(typeof(info)==="number"){
          return 0
        }else if(typeof(info)==="string"){
          return ''
        }
      }else{
        if(typeof(info)==="number"){
          return val
        }else if(typeof(info)==="string"){
          return val
        }
      }
    },
    // 申请修改银行卡
    showchangebank() {
      // 重新更新获取信息
      let agentName = sessionStorage.getItem("agentName");
      this.getAgentInfo(agentName);
      let _this = this;
      this.$Modal.confirm({
        okText: _this.$t('revisebankCard'),
        cancelText: _this.$t('cancel'),
        loading: true,
        render: h => {
          return h("div", [
            h("h3", _this.$t("accountInfoRevise")),
            // 银行户名div
            h("div", { style: { marginTop: "10px" } }, [
              h(
                "span",
                { style: { width: "20%!important" } },
                _this.$t("bankAccount") + "："
              ),
              h("Input", {
                props: {
                  type: "text",
                  value: `${this.bankUserName}`
                },
                on: {
                  input: val => {
                    this.bankUserName = val;
                  }
                }
              })
            ]),
            // 银行卡号div
            h("div", { style: { marginTop: "10px" } }, [
              h(
                "span",
                { style: { width: "20%!important" } },
                _this.$t("bankCardNum") + "："
              ),
              h("Input", {
                props: {
                  type: "text",
                  value: `${this.applybankCardNum}`
                },
                on: {
                  input: val => {
                    this.applybankCardNum = val;
                  }
                }
              })
            ]),
            // 开户行
            h("div", { style: { marginTop: "10px" } }, [
              h(
                "span",
                { style: { width: "20%!important" } },
                _this.$t("bank") + "："
              ),
              h("Input", {
                props: {
                  type: "text",
                  value: `${this.bankName}`
                },
                on: {
                  input: val => {
                    this.bankName = val;
                  }
                }
              })
            ]),
            // 手机号码
            h("div", { style: { marginTop: "10px" } }, [
              h(
                "span",
                { style: { width: "20%!important" } },
                _this.$t("mobileNum") + "："
              ),
              h("Input", {
                props: {
                  type: "text",
                  value: `${this.bankCardPhone}`
                },
                on: {
                  input: val => {
                    this.bankCardPhone = val;
                  }
                }
              })
            ])
          ]);
        },
        onOk: function() {
          const token = getToken();
          var paatern=/[^0-9]/g
          this.buttonLoading = false;
          if (_this.bankUserName == "" ||_this.applybankCardNum == "" ||_this.bankName == "" ||_this.bankCardPhone == "") {
            this.$Message.error({
              content:_this.$t('notNull'),
              duration:3
            });
          }else if(_this.applybankCardNum.length<15||_this.applybankCardNum.length>19||paatern.test(_this.applybankCardNum)==true){
            this.$Message.error({
              content:_this.$t('bankCard need 15-19 digit Numbers'),
              duration:3
            });
          }else if(_this.bankCardPhone.length<7||_this.bankCardPhone.length>12||paatern.test(_this.bankCardPhone)==true){
            this.$Message.error({
              content:_this.$t('mobile need 7-12 digit Numbers'),
              duration:3
            });
          }else{
            this.buttonLoading = true;
            _this
              .axios({
                method: "post",
                url: Url.bindingBankUrl,
                headers: { token: token },
                params: {
                  userName: agentName,
                  bankAccount: _this.bankUserName,
                  bankCard: _this.applybankCardNum,
                  bankName: _this.bankName,
                  mobile: _this.bankCardPhone
                }
              })
              .then(res => {
                // console.log("修改银行卡",res)
                if ((res.data.code == 200)) {
                  this.buttonLoading = false;
                  this.$Message.success("success");
                  _this.getAgentInfo(agentName);
                  this.$Modal.remove();
                }else{
                  this.buttonLoading = false;
                  this.$Message.error({
                    content:"request fail",
                    duration:3
                  });
                  _this.getAgentInfo(agentName);
                }
              })
              .catch(err => {
                this.$Message.error({
                  content:"request fail",
                  duration:3
                });
              });
          }
        }
      });
    },
    // 申请提现金额弹框
    showwithDraw() {
      let agentName = sessionStorage.getItem("agentName");
      this.getAgentInfo(agentName);
      let _this = this;
      this.$Modal.confirm({
        okText: _this.$t('applyMoney'),
        cancelText: _this.$t('cancel'),
        loading: true,
        render: (h,params) => {
          let self = this;
          return h("div", [
            h("h3", _this.$t("applyWithdraw")),
            // 银行户名div
            h("div", { style: { marginTop: "10px" } }, [
              h(
                "span",
                { style: { width: "25%!important" } },
                _this.$t("bankAccount") + "："
              ),
              h("Input", {
                props: {
                  type: "text",
                  disabled:true,
                  value: `${this.bankUserName}`
                },
                on: {
                  input: val => {
                    this.bankUserName = val;
                  }
                }
              })
            ]),
            // 银行卡号div
            h("div", { style: { marginTop: "10px" } }, [
              h(
                "span",
                { style: { width: "25%!important" } },
                _this.$t("bankCardNum") + "："
              ),
              h("Input", {
                props: {
                  type: "number",
                  disabled:true,
                  value: `${this.bankCardNum}`
                },
                on: {
                  input: val => {
                    this.bankCardNum = val;
                  }
                }
              })
            ]),
            // 开户行
            h("div", { style: { marginTop: "10px" } }, [
              h(
                "span",
                { style: { width: "25%!important" } },
                _this.$t("bank") + "："
              ),
              h("Input", {
                props: {
                  type: "text",
                  disabled:true,
                  value: `${this.bankName}`
                },
                on: {
                  input: val => {
                    this.bankName = val;
                  }
                }
              })
            ]),
            // 手机号码
            h("div", { style: { marginTop: "10px" } }, [
              h(
                "span",
                { style: { width: "25%!important" } },
                _this.$t("mobileNum") + "："
              ),
              h("Input", {
                props: {
                  type: "number",
                  disabled:true,
                  value: `${this.bankCardPhone}`
                },
                on: {
                  input: val => {
                    this.bankCardPhone = val;
                  }
                }
              })
            ]),
            // 可提现金额
            h("div", { style: { marginTop: "10px" } }, [
              h(
                "span",
                { style: { width: "25%!important" } },
                _this.$t("withdrawCanmoney") + "："
              ),
              h("Input", {
                props: {
                  type: "text",
                  disabled: true,
                  value: `${this.available}`
                }
              })
            ]),
            // 申请金额
            h("div", { style: { marginTop: "10px" } }, [
              h(
                "span",
                { style: { width: "25%!important" } },
                _this.$t("applyMoney") + "："
              ),
              h("Input", {
                props: {
                  type: "text",
                  value: `${_this.applyWithdrawMoney}`,
                  autofocus: true,
                  placeholder:
                    _this.$t("maxApplyMoney") + ":" + `${this.available}`
                },
                on: {
                  input:function(val) {
                    _this.$nextTick(()=>{
                      if (parseFloat(val) >= parseFloat(_this.available)) {
                        _this.$Message.error({
                          content:_this.$t('lessThan'),
                          duration:3
                        });
                      }
                      _this.applyWithdrawMoney=parseFloat(val)
                    })
                  }
                }
              })
            ])
          ]);
        },
        onOk: function() {
          const token = getToken();
          this.buttonLoading = false;
          let isTrue1 = parseFloat(_this.applyWithdrawMoney) <= parseFloat(_this.available);
          let isTrue2 = parseFloat(_this.applyWithdrawMoney) >= 100;
          let idTrue3 = _this.bankCardNum==''||_this.bankCardNum==null||_this.bankCardNum==0;
          // console.log("this.bankCardNum",typeof(_this.bankCardNum))
          if (isTrue1==true&&isTrue2==true&&idTrue3==false) {
            // 提现数量小于可提现数量 大于100 银行卡不等于空
            this.buttonLoading = true;
            _this
              .axios({
                method: "post",
                url: Url.applyWithdarwUrl,
                headers: { token: token },
                params: {
                  userName: agentName,
                  amount: _this.applyWithdrawMoney
                }
              })
              .then(res => {
                // console.log("提现",res)
                if (res.data.code == 200) {
                  this.buttonLoading = false;
                  this.$Message.success("success");
                  _this.getAgentInfo(agentName);
                  this.$Modal.remove();
                }else{
                  this.buttonLoading = false;
                  this.$Message.error({
                    content:res.data.msg,
                    duration:3
                  });
                  _this.getAgentInfo(agentName);
                  // this.$Modal.remove();
                }
              })
              .catch(err => {
                this.$Message.error({
                          content:err.data.msg,
                          duration:3
                        });
              });
          } else if(isTrue1==true&&isTrue2==false&&idTrue3==false){
            // 提现数量小于可提现数量 小于100 银行卡不等于空
            this.buttonLoading = false;
            this.$Message.error({
              content:_this.$t('maxWithdraw'),
              duration:3
            });
          }else if(isTrue1==true&&isTrue2==true&&idTrue3==true){
            // 提现数量小于可提现数量 大于100 银行卡等于空
            this.buttonLoading = false;
            this.$Message.error({
              content:_this.$t('bankNumnotNull'),
              duration:3
            });
          }else{
            // 提现数量小于可提现数量 大于100 银行卡不等于空
            this.buttonLoading = false;
            this.$Message.error({
              content:_this.$t('lessThan'),
              duration:3
            });
          }
        }
      });
    }
  }
};
</script>
<style lang="less" scope>
.ivu-card-head p {
  font-size: 22px;
  height: 25px;
  line-height: 25px;
}
h3 {
  text-align: center !important;
}
/* 标题 */
.myAgent .billTitle {
  height: 75px;
  line-height: 75px;
  background: #394652;
  position: relative;
  text-align: center;
  font-size: 40px;
}
.myAgent .billTitle a {
  color: #b5b5b5;
}
.myAgent .billTitle .router-link-exact-active {
  color: white;
}
.myAgent .card1 {
  margin: 1rem 0;
  position: relative;
  background: #e8e8e8;
  // box-shadow: -4px 4px 5px 2px rgba(0, 0, 0, 0.2);
}
.myAgent .leftTitle {
  width: 75px;
  writing-mode: vertical-rl;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: #0f2c46;
  color: #f4f4f4;
  line-height: 75px;
  text-align: center;
  font-size: 25px;
}
.myAgent .rightContent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  line-height: normal !important;
  .infoCard .cardTitle {
    width: 100%;
    height: 45px;
    line-height: 45px;
    font-size: 23px;
    text-align: center;
    // background: #323d46;
  }
  .infoCard {
    width: 270px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: 3px solid #e6e6e8;
    border-radius: 10px;
    overflow: hidden;
    background: white;
    margin: 0.5rem 0;
    text-align: center;
    .cardLeft {
      width: 40%;
      display: table;
      vertical-align: middle;
    }
    .cardRight {
      width: 60%;
      display: table;
      vertical-align: middle;
    }
    .cardContent {
      font-size: 36px;
      color: #272727;
    }
  }
}
.myAgent .operationCard {
  width: 332px;
  height: 198px;
  background: white;
  border-radius: 10px;
  margin: 20px 0;
  // box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.2) inset;
  .cardTopP1 {
    height: 40px;
    line-height: 40px;
    font-size: 27px;
    text-align: center;
    margin-top: 35px;
    color: #2c2877;
    span {
      font-size: 37px;
      color: #272727;
    }
  }
  .cardTopP2 {
    width: 175px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: url("../../assets/img/button.png") no-repeat;
    background-size: contain;
    margin: 35px auto 0;
    font-size: 32px;
    color: #2c2877;
    cursor: pointer;
  }
}
.ivu-modal .ivu-modal-confirm-body span {
  display: inline-block;
  // width: 20%!important;
}
.ivu-modal .ivu-input-wrapper,
.ivu-modal .ivu-input-wrapper,
.ivu-modal .ivu-select {
  width: 70% !important;
}
</style>
