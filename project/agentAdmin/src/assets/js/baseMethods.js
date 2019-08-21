import Cookies from 'js-cookie'
import baseInfo from './baseInfo'
import Url from './configUrl'
import axios from 'axios'
import { Header } from 'iview';
// import {setToken,getToken} from "@/assets/js/baseMethods";

const { cookieExpires } = baseInfo
export const TOKEN_KEY = 'token'
export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: cookieExpires || 1 })
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}
// 请求代理人信息
export const getAgentInfo = (name) => {
    const token = Cookies.get(TOKEN_KEY)
    console.log("查看行吗11",name)
    axios({
        method:'post',
        url:Url.agentUserUrl,
        headers: {'token':token},
        params: {
          agentUser: name
        }
      }).then((res)=>{
        console.log("查看代理人信息",res)
        return res;
        // return ;
      })
}