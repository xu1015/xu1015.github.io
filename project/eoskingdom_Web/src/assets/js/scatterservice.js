import Eos from 'eosjs'
import ScatterJS from 'scatterjs-core'
import EosTab from './EosTab'
import bgconn from './bgconn'

class Service {
  //EOS初始化网络连接配置
  EosAcc = {
    scatter: null,
    eosClient: null,
    transInfo: null,
    accInfo: null,
    //是否退出过
    issignout: false,
    Redemptionamount: 0,
    EKDtotal: 0,
    Mortgable: 0,
    alreadypledged: 0,
    //赎回中
    redeemable: 0,
    redeemabletime: 0,
    isfor: true,
    cpu_limit:null,
    net_limit:null
  }
  config=""
  eosconfig() {
    const network = this.config
    let chainId = network.chainId;
    let httpEndpoint = network.protocol + "://" + network.host + ":" + network.port;
    return Eos({
      chainId,
      httpEndpoint
    });
  }

  // 查询账户
  checkAccount(res){
    return new Promise((resolve, reject) => {
      try {
        this.eosconfig().getAccount({account_name:res}).then(res => {
          this.EosAcc.cpu_limit = res.cpu_limit;
          this.EosAcc.net_limit = res.net_limit;
          const info = {
            cpu_limit:res.cpu_limit,
            net_limit:res.net_limit,
          }
            resolve(info)
          }).catch(err => {
              reject(`${JSON.stringify(err)}`)
          });
      } catch (error) {
          reject(`${JSON.stringify(error)}`)
      }
    })
}

  async get_currency_balance(currentAccount) {
    return this.eosconfig().getCurrencyBalance(EosTab.EOSIOTOKEN, currentAccount, EosTab.SYMBOL)
  }

  async get_currency_balanceEkd(currentAccount) {
    return this.eosconfig().getCurrencyBalance(EosTab.ACCBALANCE, currentAccount, EosTab.TOKENNAME)
  }
  //与钱包建立连接授权
  //参数：satter:scatter
  async getIdentity(scatter) {
    const requiredFields = { accounts: [this.config] };
    if (scatter != null) {
      const result = scatter.getIdentity(requiredFields)
      return result;
    }
    return null;
  }

  //退出钱包连接
  //参数：satter:scatter
  forgetIdentity() {
    const result = this.EosAcc.scatter.forgetIdentity();
    sessionStorage.removeItem('accountmsg')
    return result;
  }

  //获取数据表信息
  //参数：true：是否以json格式打印信息，scode：合约帐号，code:使用者帐号，table：数据表
  async getTableRows(scode, code, table) {
    var readOnlyEos ={}
    if(this.config!=''){
      readOnlyEos = this.eosconfig();
    }else{
      var chainId="aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
      var Endpoint="https://mainnet.meet.one:443"
      readOnlyEos=Eos({
        chainId,
        Endpoint
      })
    }
    const result = readOnlyEos.getTableRows(
      {
        "json": true,
        "code": scode,
        "scope": code,
        "table": table,
        "limit": 1000
      });
    return result;
  }


  //转账
  //参数：eosClient:eosClient,from:转账者，to:接收者，amount:代币数量，remarks：交易备注
  async transfer(amount) {
    return new Promise((resolve, reject) => {
      this.getIdentity(this.EosAcc.scatter).then(result => {
        const account = this.EosAcc.scatter.identity.accounts.find(
          x => x.blockchain === "eos"
        );
        this.EosAcc.eosClient = this.EosAcc.scatter.eos(this.config, Eos);
        const accountinfo = JSON.parse(sessionStorage.getItem('accountmsg'))
        this.EosAcc.eosClient.transfer(account.name, EosTab.ICOACC, amount, EosTab.MEMO).then(rs => {
          this.pledgerecord();
          resolve("success")
        }).catch(error => {
          reject("fail")
        })
      }).catch((e)=>{})
    })
  }
  // 四舍五入自己设置精度
   keepTwoDecimalFull(num, decimal) {
    var numTemp = 1;
    for(var i = 0; i < decimal; ++i){
        numTemp *= 10;
    }
    var result = Math.round(num * numTemp) / numTemp;
    var s_x = result.toString(); //将数字转换为字符串
    var pos_decimal = s_x.indexOf('.'); //小数点的索引值
    // 当整数时，pos_decimal=-1 自动补0  
    if (pos_decimal < 0) {  
        pos_decimal = s_x.length;  
        s_x += '.';  
    }
    // 当数字的长度< 小数点索引+2时，补0  
    while (s_x.length <= pos_decimal + decimal) {  
        s_x += '0';  
    }  
    
    return s_x;  
}
  //DICE转账
  //参数：eosClient:eosClient,from:转账者，to:接收者，amount:代币数量，remarks：交易备注
  // remark格式： 筛子类型(under、over)-数字-随机次数-用户种子-推荐人
  async diceTransfer(type, num, remark) {
    return new Promise((resolve, reject) => {
      this.getIdentity(this.EosAcc.scatter).then(result => {
        const account = this.EosAcc.scatter.identity.accounts.find(
          x => x.blockchain === "eos"
        );
        this.EosAcc.eosClient = this.EosAcc.scatter.eos(this.config, Eos);
        const accountinfo = JSON.parse(sessionStorage.getItem('accountmsg'))

        if (type == 0) {
          //通过EKD购买
          let amount = this.keepTwoDecimalFull(num,6)+" EKD"
          
          var actions = []
          let transation = {
            account: EosTab.ACCBALANCE,
            name: 'transfer',
            authorization: [
              {
                actor: accountinfo.currentAccount,
                permission: accountinfo.currentPermission
              }
            ],
            data:
            {
              from: accountinfo.currentAccount,
              to: EosTab.dice.DICE_ACCOUNT,
              quantity: amount,
              memo: remark

            }
          }
          actions.push(transation)
          this.EosAcc.transInfo = this.EosAcc.eosClient.transaction({ actions }).then(rs => {
            resolve(rs)
          }).catch(error => {
            reject(error)
          });
        } else if (type == 1) {
          //通过EOS购买
          let amount = this.keepTwoDecimalFull(num,4)+" EOS"
          var actions = []
          let transation = {
            account: EosTab.EOSIOTOKEN,
            name: 'transfer',
            authorization: [
              {
                actor: accountinfo.currentAccount,
                permission: accountinfo.currentPermission
              }
            ],
            data:
            {
              from: accountinfo.currentAccount,
              to: EosTab.dice.DICE_ACCOUNT,
              quantity: amount,
              memo: remark

            }
          }
          actions.push(transation)
          this.EosAcc.transInfo = this.EosAcc.eosClient.transaction({ actions }).then(rs => {
            resolve(rs)
          }).catch(error => {
            reject(error)
          });

        }
      }).catch((e)=>{})
    })
  }



  //操作合约相关action
  //参数：satter:scatter ,contractmsg:([{合约部署者账号,合约相关action名称}]),authorization:({调用合约者的账号名称,许可})，parameter([{调用合约相关action所需要的参数}])
  async transaction(contractmsg, parameter) {
    return new Promise((resolve, reject) => {
      this.getIdentity(this.EosAcc.scatter).then(result => {
        const account = this.EosAcc.scatter.identity.accounts.find(
          x => x.blockchain === "eos"
        );
        this.EosAcc.eosClient = this.EosAcc.scatter.eos(this.config, Eos);
        const accountinfo = JSON.parse(sessionStorage.getItem('accountmsg'))
        var actions = []
        for (var i = 0; i < contractmsg.length; i++) {
          let transation = {
            account: contractmsg[i].account,
            name: contractmsg[i].name,
            authorization: [
              {
                actor: accountinfo.currentAccount,
                permission: accountinfo.currentPermission
              }
            ],
            data: parameter[i]
          }
          actions.push(transation)
        }
        this.EosAcc.transInfo = this.EosAcc.eosClient.transaction({ actions }).then(rs => {
          resolve(rs)
        }).catch(error => {
          reject(error)
        });
      }).catch((e)=>{})
    })
  }

  // 获取账号余额
  // 参数：eosClient:eosClient,currentAccount：当前账号名称,token:代币名称
  async getCurrencyBalance() {
    ScatterJS.scatter.connect("scatter-demo").then(connected => {
      if (!connected) return false;
      this.EosAcc.scatter = ScatterJS.scatter;
      window.scatter = null;
      window.ScatterJS = null;
      this.getIdentity(this.EosAcc.scatter).then(() => {
        const account = this.EosAcc.scatter.identity.accounts.find(
          x => x.blockchain === "eos"
        );
        this.EosAcc.eosClient = this.EosAcc.scatter.eos(this.config, Eos);
        this.EosAcc.eosClient.getCurrencyBalance(EosTab.ACCBALANCE, account.name, EosTab.TOKENNAME).then(rs => {
          this.EosAcc.accInfo = rs
        }).catch((e)=>{})
      }).catch((e)=>{})
    }).catch((e)=>{})
  }
  //精度计算
  AccuracycalculationIn(number) {
    let num = Number(number.valueOf())
    return Math.floor(num * 1000000 + 0.0001)
  }

  AccuracycalculationOut(number) {
    let num = Number(number.valueOf())
    return Math.floor(num + 0.0001) / 1000000
  }

  async getbalance(currentAccount) {
    const rs = this.EosAcc.eosClient.getCurrencyBalance(EosTab.ACCBALANCE, currentAccount, EosTab.TOKENNAME)
    rs.then(rr => {
      if (rr.length > 0) {
        this.EosAcc.EKDtotal = this.AccuracycalculationIn(rr[0].substr(0, rr[0].length - 4))
        this.EosAcc.Mortgable = this.EosAcc.EKDtotal - this.EosAcc.alreadypledged
      }
    }).catch((e)=>{})
  }


  //已经质押EKD
  async pledgerecord() {
    if (this.EosAcc.isfor) {
      this.EosAcc.isfor = false;
      this.getTableRows(EosTab.ABONUSACC, EosTab.ABONUSACC, EosTab.ABONUSSTAKE).then(
        data => {

          const accountinfo = JSON.parse(sessionStorage.getItem('accountmsg'))
          this.getbalance(accountinfo.currentAccount);
          for (var i = 0; i < data.rows.length; i++) {
            const accname = JSON.parse(sessionStorage.getItem("accountmsg")).currentAccount
            if (
              accname ==
              data.rows[i].player
            ) {
              var temp = Math.floor(parseFloat(data.rows[i].balance).toFixed(7) * 1000000 + 0.00001);
              this.EosAcc.alreadypledged = this.AccuracycalculationIn(data.rows[i].balance.substr(0, data.rows[i].balance.length - 4))
              //已经赎回的记录
              this.getTableRows(
                EosTab.ABONUSACC,
                EosTab.ABONUSACC,
                EosTab.ABONUSUNSTAKE
              ).then(data => {
                for (var i = 0; i < data.rows.length; i++) {
                  if (
                    JSON.parse(sessionStorage.getItem("accountmsg"))
                      .currentAccount == data.rows[i].player
                  ) {
                    this.EosAcc.Redemptionamount =
                      (this.EosAcc.alreadypledged -
                        this.AccuracycalculationIn(data.rows[i].amount.substr(0, data.rows[i].amount.length - 4)))
                    this.EosAcc.redeemable = this.AccuracycalculationIn(data.rows[i].amount.substr(0, data.rows[i].amount.length - 4))
                    this.getbalance(accname)
                    const tm = (new Date().getTime() - new Date(data.rows[i].created_at.replace('T', ' ')).getTime()) / 1000
                    this.EosAcc.redeemabletime = new Date(data.rows[i].created_at.replace('T', ' '))
                    return;
                  }
                }
                this.EosAcc.Redemptionamount =
                  (this.EosAcc.alreadypledged - 0)
                this.getbalance(accname)
              }).catch((e)=>{});
              return;
            } else {
              this.getbalance(accname)
            }
          }


        }
      ).catch((e)=>{});
      this.EosAcc.isfor = true
    }
  }

}
export default new Service()