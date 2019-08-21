export default{
    //邀请人
    INVITER:"http://118.24.183.189/api/app/invitationCode/bindingInvita",
    //邀请人链接
    INVITERLINK:'http://118.24.183.189/#/?ref=',
    // 分红平台数据
    ABONUS:"http://118.24.183.189/api/app/dividend/queryPlatformDividends",
    //查询分红池
    BONUSPOOL:"http://118.24.183.189/api/app/dividend/queryDividends",
    //腾讯
    TX:'http://118.24.183.189/dzgame/pkIndex.html?master=tx&timestamp=',
    //亚马逊
    YMX:'http://118.24.183.189/dzgame/pkIndex.html?master=ymx&timestamp=',
    //个人分红
    PERSONALBONUS:"http://118.24.183.189/api/app/dividend/queryAccountDividends",
    //领取分红:
    DIVIDENDSRECEIVED:"http://118.24.183.189/api/app/dividend/receiveDividendsAccount",
    //挖矿：
    MINING:"http://118.24.183.189/api/app/mined/queryMinedBL",
    //排行榜
    RANKLIST:'http://118.24.183.189/api/v2/tokens/magnate_rank?symbol=ekd&account=ekdtokenbank&size=100&amount_type=eosTotalBalance',
    //ico时间
    ICOTIME:"http://118.24.183.189/api/app/ico/getIcoTime",
    //EKD排行版
    EKDPAIHANG:"https://eoskingdom.io/api/app/ranking/queryEkdRanking",
    //公告
    NOTICE:"https://eoskingdom.io/api/app/notice/listPage",
   //用户访问记录
   USERVISIT:"http://118.24.183.189/api/app/uservisit/saveAccountVisit",
   DEZHOU:'http://118.24.183.189/webgame/pkIndex.html?master=tx&timestamp=',
   //交易所行情
   EXCHANGEQUOTATIONS:"https://eoskingdom.io/api/app/newdex/listPage?sort[createTime]=desc&pageSize=16",
    //切换语言图片
    KR:"http://118.24.183.189/EKD_KR.pdf",
    CN:"http://118.24.183.189/EKD_CN.pdf",
    EN:"http://118.24.183.189/EKD_EN.pdf",


    // DICE游戏
    //获取下注列表
    getresults:"http://118.24.183.189:5000/getresults",
    // 获取验证信息
    getbetdata:"http://118.24.183.189:5000/getbetdata",
    // 获取我的下注列表
    getMyBet:"http://118.24.183.189/api/app/dice/diceUserBet",
    // 获取排行榜信息
    get24Rank:"http://118.24.183.189/api/app/dice/diceBetRanking",
    // 跳转链接去验证
    toCheck:"https://www.eosx.io/tx/",
    // 获取总投注额
    getAllBet:"http://118.24.183.189/api/app/dice/diceBetTotal",
    // 获取幸运数字榜单
    getluckyPlayer:"http://118.24.183.189/api/app/dice/luckyDiceRanking",
    // 获取推荐人
    getreference:"http://118.24.183.189/api/app/invitationCode/queryReffer",
      
    //查询当天签到任务是否完成
    checkqiandao:"http://118.24.183.189/api/app/sign/signTask",
    //领取7日奖励
    lingquqiri:"http://118.24.183.189/api/app/sign/signReward",
    //累计签到奖励领取
    leijiqiandao:"http://118.24.183.189/api/app/sign/cumulativeSignReward",
    
}
