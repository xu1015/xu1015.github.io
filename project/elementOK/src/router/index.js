import Vue from 'vue'
import Router from 'vue-router'

// app导航部分
import Home from '@/components/Home'
import SelectCity from '@/components/selectCity'

// 登录部分
import Login from '@/components/login'

// 通用部分
import WaimaiHome from '@/components/common/index'
import Shop from '@/components/common/shopDetailInfo'
import ShopAttribute from '@/components/common/shopAttribute'
import resetPassword from '@/components/common/resetPassword'
// 通用部分二级界面
import twoFoodInfo from '@/components/common/twoFoodInfo.vue'

// 外卖部分
import Waimai from '@/components/waimai/index'
import Food from '@/components/waimai/children/food'



// 搜索部分
import Search from '@/components/search/index'



// 订单部分
import Order from '@/components/order/index'
import confireOrder from '@/components/order/confireOrder'
//订单详情
import orderDetail from '@/components/order/orderDetail'




// 我的部分
import My from '@/components/my/index'
import Balance from '@/components/my/infoData/balance'
import BalanceDetail from '@/components/my/infoData/balanceDetail'
import Benefit from '@/components/my/infoData/benefit'
import Coupon from '@/components/my/infoData/coupon'
import HbDes from '@/components/my/infoData/hbDes'
import Exchange from '@/components/my/infoData/exchange'
import Commend from '@/components/my/infoData/commend'
import Outdate from '@/components/my/infoData/outdate'
import Points from '@/components/my/infoData/points'
import PointsDetails from '@/components/my/infoData/pointsDetail'
import Try from '@/components/my/infoData/try'
import Vipcard from '@/components/my/menu/vipcard'
import Vipdes from '@/components/my/menu/vipDescription'
import UseCart from '@/components/my/menu/useCart'
import InvoiceRecord from '@/components/my/menu/invoiceRecord'
import Download from '@/components/my/menu/download'
//我的部分-购买会员界面
import buyVipCard from '@/components/my/menu/buyVipCard'
//服务中心
import serveCenter from '@/components/my/menu/serveCenter'


// 修改用户信息
import Account from '@/components/my/accountInfo/accountInfo'
import Rename from '@/components/my/accountInfo/rename'
import Address from '@/components/my/accountInfo/address'
import addAddress from '@/components/my/accountInfo/addAddress'




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/city/:id',
      name: 'selectCity',
      component: SelectCity
    },
    {
      path: '/elm',
      name: 'waimaiHome',
      component: WaimaiHome,
      redirect:{name:'waimai'},
      children:[
        // 外卖界面
        {
          path: '/elm/waimai',
          name: 'waimai',
          component: Waimai
        },
        // 搜索界面
        {
          path: '/elm/search',
          name: 'search',
          component: Search
        },
        // 订单界面
        {
          path: '/elm/order',
          name: 'order',
          component: Order
        },
        // 我的界面
        {
          path: '/elm/my',
          name: 'my',
          component: My
        },
        
      ]
    },
    // 登录界面
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // 通用部分--------------------------------------------------
    // 餐馆界面
    {
      path: '/shop',
      name: 'shop',
      component: Shop
    },
    // 餐馆界面二级界面
    {
      path: '/shop/shopAttribute',
      name: 'shopAttribute',
      component: ShopAttribute
    },
    {
      path:'/shop/foodInfo',
      name:'twofoodInfo',
      component:twoFoodInfo
    },
    // 外卖界面--------------------------------------------------
    // 外卖界面二级界面
    {
      path:'/waimai/food',
      name:'food',
      component:Food
    },
    //订单界面(二级)-----------------------------------------------------
    {
      path:'/confireOrder',
      name:'confireOrder',
      component:confireOrder
    },
    //订单详情
    {
      path:'/confireOrder/orderdetails',
      name:'orderDetail',
      component:orderDetail
    },
    // 我的界面--------------------------------------------------------
    // 我的界面二级界面
    // 我的余额
    {
      path: '/balance',
      name: 'balance',
      component: Balance,
    },
    // 我的余额详细信息
    {
      path: '/balance/balanceDetail',
      name: 'balanceDetail',
      component: BalanceDetail,
    },
    // 我的优惠
    {
      path: '/benefit',
      name: 'benefit',
      component: Benefit,
    },
    // 过期红包
    {
      path: '/benefit/outdate',
      name: 'outdate',
      component: Outdate,
    },
    // 兑换红包
    {
      path: '/benefit/exchange',
      name: 'exchange',
      component: Exchange,
    },
    // 推荐有奖
    {
      path: '/benefit/commend',
      name: 'commend',
      component: Commend,
    },
    // 代金券说明
    {
      path: '/benefit/coupon',
      name: 'coupon',
      component: Coupon,
    },
    // 红包说明
    {
      path: '/benefit/hbDes',
      name: 'hbDes',
      component: HbDes,
    },
    // 我的积分
    {
      path: '/points',
      name: 'points',
      component: Points,
    },
    //积分说明
    {
      path: '/points/details',
      name: 'pointsDetail',
      component: PointsDetails,
    },
    // 积分商城
    {
      path: '/try',
      name: 'try',
      component: Try,
    },
    // 会员卡
    {
      path: '/vipcard',
      name: 'vipcard',
      component: Vipcard,
    }, 
    // 会员卡子页面--会员说明
    {
      path: '/vipcard/vipDescription',
      name: 'vipDescription',
      component: Vipdes,
    },
    // 使用卡密--兑换会员
    {
      path: '/vipcard/useCart',
      name: 'useCart',
      component: UseCart,
    },
    // 开发票--购买记录
    {
      path: '/vipcard/invoiceRecord',
      name: 'invoiceRecord',
      component: InvoiceRecord,
    },
    // 会员卡子界面--购买会员
    {
      path: '/vipcard/buy',
      name: 'buyVipCard',
      component: buyVipCard,
    }, 
    // 服务中心
    {
      path:'/my/serveCenter',
      name:'serverCenter',
      component:serveCenter
    },
    // 下载APP
    {
      path:"/my/download",
      name:'download',
      component:Download
    },
    // 用户信息
    {
      path:"/accountInfo",
      name:'accountInfo',
      component:Account,
    },
    // 用户信息-重命名
    {
      path:"/accountInfo/rename",
      name:"rename",
      component:Rename
    },
    // 用户信息-地址
    {
      path:"/accountInfo/address",
      name:"address",
      component:Address
    },
    // 用户信息--添加地址
    {
      path:"/accountInfo/addAddress",
      name:"addAddress",
      component:addAddress
    },
    // 用户信息重置密码
    {
      path:"/reset",
      name:"resetPassword",
      component:resetPassword
    }
    
  ]
})
