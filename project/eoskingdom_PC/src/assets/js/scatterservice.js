import Eos from 'eosjs'
import EosTab from './EosTab'
import eosapi from 'eosjs-api'
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
    net_limit:null,
    eos:null
  }
  config=""
  options = {
    httpEndpoint: '',
    verbose: false,
    logger: { 
    },
    fetchConfiguration: {},
  }
  eosconfig() {
    return eosapi(this.options)
  }

  // 查询账户
  checkAccount(res){
    return new Promise((resolve, reject) => {
      var eos=eosapi(this.options)
      try {
        eos.getAccount(res).then(res => {
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
    var eos=eosapi(this.options)
    return eos.getCurrencyBalance(EosTab.EOSIOTOKEN, currentAccount, EosTab.SYMBOL)
  }

  async get_currency_balanceEkd(currentAccount) {
    var eos=eosapi(this.options)
    return eos.getCurrencyBalance(EosTab.ACCBALANCE, currentAccount, EosTab.TOKENNAME)
  }
 

  //获取数据表信息
  //参数：true：是否以json格式打印信息，scode：合约帐号，code:使用者帐号，table：数据表
  // async getTableRows(scode, code, table) {
  //   var readOnlyEos ={}
  //   if(this.config!=''){
  //     readOnlyEos = this.eosconfig();
  //   }else{
  //     var chainId="aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
  //     var Endpoint="https://mainnet.meet.one:443"
  //     readOnlyEos=Eos({
  //       chainId,
  //       Endpoint
  //     })
  //   }
  //   const result = readOnlyEos.getTableRows(
  //     {
  //       "json": true,
  //       "code": scode,
  //       "scope": code,
  //       "table": table,
  //       "limit": 1000
  //     });
  //   return result;
  // }


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
      })
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
        const accountinfo = JSON.parse(sessionStorage.getItem('accountmsg'))
        // console.log("调用转账")
        if (type == 0) {
          // console.log("进入EKD下注")
          //通过EKD购买
          let amount = this.keepTwoDecimalFull(num,6)+" EKD"
          var actions = []
          this.EosAcc.eos.transact({
            actions: [{
                account: EosTab.ACCBALANCE,
                name: 'transfer',
                authorization: [{
                  actor: accountinfo.currentAccount,
                  permission: accountinfo.currentPermission
                }],
                data:{
                     from: accountinfo.currentAccount,
                     to: EosTab.dice.DICE_ACCOUNT,
                     quantity: amount,
                     memo: remark
                }
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        }).then(res => {
            // console.log('sent: ', res);
            // console.log("EKD下注成功")
            resolve(res)
        }).catch(err => {
            // console.error('error: ', err);
            // console.log("EKD下注失败")
            reject(err)
        });
        } else if (type == 1) {
          //通过EOS购买
          let amount = this.keepTwoDecimalFull(num,4)+" EOS"
          var actions = []
              this.EosAcc.eos.transact({
                actions: [{
                    account: EosTab.EOSIOTOKEN,
                    name: 'transfer',
                    authorization: [{
                      actor: accountinfo.currentAccount,
                      permission: accountinfo.currentPermission
                    }],
                    data:{
                        from: accountinfo.currentAccount,
                        to: EosTab.dice.DICE_ACCOUNT,
                        quantity: amount,
                        memo: remark
                    }
                }]
            }, {
                blocksBehind: 3,
                expireSeconds: 30,
            }).then(res => {
                // console.log('sent: ', res);
                // console.log("EOS下注成功")
                resolve(res)
            }).catch(err => {
                // console.error('error: ', err);
                // console.log("EOS下注失败")
                reject(err)
            });
        }
      })
 
  }



  //操作合约相关action
  //参数：satter:scatter
  //contractmsg:([{合约部署者账号,合约相关action名称}])
  //authorization:({调用合约者的账号名称,许可})
  //parameter([{调用合约相关action所需要的参数}])
 transaction(contractmsg, parameter){
  //console.log('调用transaction'+JSON.stringifyparameter)
  return new Promise((resolve, reject) => {
    var currentacc=JSON.parse(sessionStorage.getItem('accountmsg'))
    this.EosAcc.eos.transact({
      actions: [{
          account: contractmsg.account,
          name: contractmsg.name,
          authorization: [{
              actor:currentacc.currentAccount,
              permission:currentacc.currentPermission,
          }],
          data: parameter
      }]
    },{
        blocksBehind: 3,
        expireSeconds: 30,
    }).then(res => {
        resolve('success')
    }).catch(err => {
        reject('fail')
    });
  })
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

  async getbalance(eos,currentAccount) {
    const rs =  eos.getCurrencyBalance(EosTab.ACCBALANCE, currentAccount, EosTab.TOKENNAME)
    rs.then(rr => {
      if (rr.length > 0) {
        this.EosAcc.EKDtotal = this.AccuracycalculationIn(rr[0].substr(0, rr[0].length - 4))
        this.EosAcc.Mortgable = this.EosAcc.EKDtotal - this.EosAcc.alreadypledged
      }
    })
  }


  //已经质押EKD
  async pledgerecord() {
    if (this.EosAcc.isfor) {
      this.EosAcc.isfor = false;
      var eos=eosapi(this.options)
      eos.getTableRows({
        json: true,
        code: EosTab.ABONUSACC,
        scope:  EosTab.ABONUSACC,
        table: EosTab.ABONUSSTAKE,
        limit: 1000,
      }).then(data => {
          const accountinfo = JSON.parse(sessionStorage.getItem('accountmsg'))
          this.getbalance(eos,accountinfo.currentAccount);
          const accname = JSON.parse(sessionStorage.getItem("accountmsg")).currentAccount;
          for (var i = 0; i < data.rows.length; i++) {
            if (accname == data.rows[i].player) {
              var temp = Math.floor(parseFloat(data.rows[i].balance).toFixed(7) * 1000000 + 0.00001);
              this.EosAcc.alreadypledged = this.AccuracycalculationIn(data.rows[i].balance.substr(0, data.rows[i].balance.length - 4))
              //已经赎回的记录
              eos.getTableRows(
                {
                  json: true,
                  code: EosTab.ABONUSACC,
                  scope:  EosTab.ABONUSACC,
                  table: EosTab.ABONUSUNSTAKE,
                  limit: 1000,
                }
              ).then(data => {
                for (var i = 0; i < data.rows.length; i++) {
                  if (JSON.parse(sessionStorage.getItem("accountmsg")).currentAccount == data.rows[i].player) {
                    this.EosAcc.Redemptionamount =(this.EosAcc.alreadypledged -this.AccuracycalculationIn(data.rows[i].amount.substr(0, data.rows[i].amount.length - 4)))
                    this.EosAcc.redeemable = this.AccuracycalculationIn(data.rows[i].amount.substr(0, data.rows[i].amount.length - 4))
                    this.getbalance(eos,accname)
                    const tm = (new Date().getTime() - new Date(data.rows[i].created_at.replace('T', ' ')).getTime()) / 1000
                    this.EosAcc.redeemabletime = new Date(data.rows[i].created_at.replace('T', ' '))
                    return;
                  }
                }
                this.EosAcc.Redemptionamount =
                  (this.EosAcc.alreadypledged - 0)
                this.getbalance(eos,accname)
              });
              return;
            } else {
              this.getbalance(eos,accname)
            }
          }
        }
      ).catch(err=>{
        // console.log('捕获gettable错误==='+JSON.stringify(err))
      });
      this.EosAcc.isfor = true
    }
  }


}
export default new Service()