import baseInfo from './baseInfo';
export default{
  // 请求验证码
  uuidUrl:baseInfo.baseUrl+'/captcha.jpg/',
  // 登陆
  loginUrl:baseInfo.baseUrl+'/sys/login',
  // 请求月账单
  monthBillUrl:baseInfo.baseUrl+'/agent/profit/day/dailyBills',
  // 代理人信息
  agentUserUrl:baseInfo.baseUrl+'/agent/user/agentInfo',
  // 提现记录
  withdrawListUrl:baseInfo.baseUrl+'/agent/withdraw/listPage',
  // 代理人年度账单
  yearsBillUrl:baseInfo.baseUrl+'/agent/profit/day/annualBills',
  // 添加银行卡绑定
  bindingBankUrl:baseInfo.baseUrl+'/agent/user/bindingBank',
  // 申请提现
  applyWithdarwUrl:baseInfo.baseUrl+'/agent/withdraw/applyWithdarw',
  // 获取会员信息
  agentMemberUrl:baseInfo.baseUrl+'/agent/account/agentMember',
  // 修改密码
  changePassUrl:baseInfo.baseUrl+'/agent/user/agentUpdatePassword',
}