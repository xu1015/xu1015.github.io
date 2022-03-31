<template>
  <div class="confirmOrderContainer">
    <section class="showHide">
      <div class="title">
        <i class="el-icon-arrow-left titleImg" @click="goback()"></i>
        <span class="ellipsis">确认订单</span>
        <span>
          <p v-if="$store.ComloginState!=200?true:false" @click="goLogin()">登录|注册</p>
          <img v-else @click="goMy()" src="../../assets/common/user.png" alt>
        </span>
      </div>
      <div class="address_container" @click="goselectAddress()">
        <section v-if="confireOrderaddressSH">
          <img src="../../assets/common/location.png" alt>
          <span>请添加一个收货地址</span>
        </section>
        <div v-else class="address_empty_left">
          <img src="../../assets/common/location.png" alt class="location_icon">
          <div class="address_detail_container">
            <header>
              <span>{{getAddressInfo[confireOrderaddressSHIndex].name}}</span>
              <span v-if="getAddressInfo[confireOrderaddressSHIndex].sex==1">先生</span>
              <span v-else>女士</span>
              <span>{{getAddressInfo[confireOrderaddressSHIndex].phone}}</span>
            </header>
            <div class="address_detail">
              <span>{{getAddressInfo[confireOrderaddressSHIndex].tag}}</span>
              <p>{{getAddressInfo[confireOrderaddressSHIndex].address_detail}}</p>
            </div>
          </div>
        </div>
        <i class="el-icon-arrow-right"></i>
      </div>
      <section class="delivery_model container_style">
        <p class="deliver_text">送达时间</p>
        <section class="deliver_time">
          <p>尽快送达 | 预计 {{date}}</p>
          <p>蜂鸟专送</p>
        </section>
      </section>
      <section class="pay_way container_style">
        <header class="header_style">
          <span>支付方式</span>
          <div class="more_type">
            <span @click="onlinePay=true">在线支付</span>
            <i class="el-icon-arrow-right address_empty_right"></i>
          </div>
        </header>
        <section class="hongbo">
          <span>红包</span>
          <span>暂时只在饿了么 APP 中支持</span>
        </section>
      </section>
      <section class="food_list">
        <header>
          <img :src="shopcar!=undefined?'//elm.cangdu.org/img/'+shopcar.cart.restaurant_info.image_path:require('../../assets/common/add.png')" alt>
          <span>效果演示</span>
        </header>
        <ul class="food_list_ul">
          <li class="food_item_style" v-for="(itemshopcar,index) in shopcar.cart.groups[0]" :key="index">
            <p class="food_name ellipsis">{{itemshopcar.name}}</p>
            <div class="num_price">
              <span>x {{itemshopcar.quantity}}</span>
              <span>¥{{itemshopcar.quantity*itemshopcar.price}}</span>
            </div>
          </li>
        </ul>
        <div class="food_item_style">
          <p class="food_name ellipsis">{{shopcar.cart.extra[0].name}}</p>
          <div class="num_price">
            <span></span>
            <span>¥ {{shopcar.cart.extra[0].price}}</span>
          </div>
        </div>
        <div class="food_item_style">
          <p class="food_name ellipsis">配送费</p>
          <div class="num_price">
            <span></span>
            <span>¥ {{shopcar.cart.restaurant_info.float_delivery_fee}}</span>
          </div>
        </div>
        <div class="food_item_style total_price">
          <p class="food_name ellipsis">订单 ¥{{shopcar.cart.original_total+shopcar.cart.is_online_paid}}</p>
          <div class="num_price">
            <span>待支付 ¥{{shopcar.cart.total}}</span>
          </div>
        </div>
      </section>
      <section class="pay_way container_style">
        <section class="header_style" @click="orderRemarksstatus=true">
          <span>订单备注</span>
          <section class="more_type">
            <span class="ellipsis" >{{orderStringInfo}}</span>
            <i class="el-icon-arrow-right"></i>
          </section>
        </section>
        <section class="hongbo support_is_available" @click="orderInvoicestatus=true">
          <span>发票抬头</span>
          <span class="more_type">
            不需要开发票
            <i class="el-icon-arrow-right"></i>
          </span>
        </section>
      </section>
      <section class="confrim_order">
        <p>待支付 ¥{{shopcar.cart.total}}</p>
        <p @click="getOrder()">确认下单</p>
      </section>
    </section>
    <!-- 选择地址 -->
    <section class="rating_page" v-if="selectaddressStatus==true" :class="selectaddressStatus==true?'animated bounceInRight':''">
      <div class="title">
        <i class="el-icon-arrow-left titleImg" @click="selectaddressStatus=false"></i>
        <span class="ellipsis">选择地址</span>
        <span></span>
      </div>
      <p class="add_icon_footer" @click="goaddAddress()">
        <img src="../../assets/common/add.png" alt>
        <span>新增收货地址</span>
      </p>
      <section id="scroll_section" class="scroll_container">
        <section class="list_cotainer">
          <ul class="deliverable_address">
            <li
              v-for="(itemgetAddressInfo,index) in getAddressInfo"
              :key="index"
              @click="addaddressMethods(index,itemgetAddressInfo.id)"
            >
              <img src="../../assets/common/select.png" alt class="choosed_address default_address">
              <div>
                <header>
                  <span>{{itemgetAddressInfo.name}}</span>
                  <span v-if="itemgetAddressInfo.sex==1">先生</span>
                  <span v-else>女士</span>
                  <span>{{itemgetAddressInfo.phone}}</span>
                </header>
                <div class="address_detail ellipsis">
                  <span>{{itemgetAddressInfo.tag}}</span>
                  <p>{{itemgetAddressInfo.address_detail}}</p>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </section>
    </section>
    <!-- 在线支付界面 -->
    <div class="cover" v-if="onlinePay==true" @click="onlinePay=false"></div>
    <div class="choose_type_Container" v-if="onlinePay==true" :class="onlinePay==true?'animated bounceInUp':''">
      <header>支付方式</header>
      <ul >
        <li  class="">
          <span >货到付款（商家不支持货到付款）</span>
            <img src="../../assets/common/noselect.png" alt="">
           
        </li>
        <li  class="choose">
          <span >在线支付<!----></span> 
           <img src="../../assets/common/select.png" alt="">
        </li>
      </ul>
    </div>
    <!-- 添加地址 -->
    <section class="rating_page" v-if="addAddressStatus==true" :class="addAddressStatus==true?'animated bounceInRight':''">
      <div class="title">
        <i class="el-icon-arrow-left titleImg" @click="addAddressStatus=false"></i>
        <span class="ellipsis">添加地址</span>
        <span></span>
      </div>
      <section class="page_text_container">
        <section class="section_list">
          <span class="section_left">联系人</span>
          <section class="section_right">
            <input
              type="text"
              name="name"
              placeholder="你的名字"
              class="input_style"
              v-model="username"
            >
            <div class="choose_sex">
              <span class="choose_option" @click="sirOrMiss=1">
                <img
                  v-if="sirOrMiss==1"
                  src="../../assets/common/select.png"
                  alt
                  class="address_empty_right"
                >
                <img v-else src="../../assets/common/noselect.png" alt class="address_empty_right">
                <span>先生</span>
              </span>
              <span class="choose_option" @click="sirOrMiss=2">
                <img
                  v-if="sirOrMiss==2"
                  src="../../assets/common/select.png"
                  alt
                  class="address_empty_right"
                >
                <img v-else src="../../assets/common/noselect.png" alt class="address_empty_right">
                <span>女士</span>
              </span>
            </div>
          </section>
        </section>
        <section class="section_list">
          <span class="section_left">联系电话</span>
          <section class="section_right">
            <div class="phone_add">
              <input
                type="text"
                name="phone"
                placeholder="你的手机号"
                class="input_style"
                v-model="orderphone"
              >
              <img src="../../assets/common/add.png" alt @click="anntherPhoneNumber=true">
            </div>
            <input
              v-if="anntherPhoneNumber==true"
              type="text"
              name="anntherPhoneNumber"
              placeholder="备选电话"
              class="input_style phone_bk"
              v-model="anntherphone"
            >
          </section>
        </section>
        <section class="section_list">
          <span class="section_left">送餐地址</span>
          <section class="section_right">
            <div
              class="choose_address"
              @click="gosearchAddress()"
              v-if="orderaddressName==''"
            >小区/写字楼/学校等</div>
            <div v-else class="choose_address" @click="gosearchAddress()">{{orderaddressName}}</div>
            <input
              type="text"
              name="address_detail"
              placeholder="详细地址（如门牌号等）"
              class="input_style"
              v-model="orderdetailaddressName"
            >
          </section>
        </section>
        <section class="section_list">
          <span class="section_left">标签</span>
          <section class="section_right">
            <input
              type="text"
              name="tag"
              placeholder="无/家/学校/公司"
              class="input_style"
              v-model="tagtypeName"
            >
          </section>
        </section>
      </section>
      <div class="determine" @click="submitAddress()">确定</div>
    </section>
    <!-- 搜索地址 -->
    <section class="rating_page" v-if="searchaddressStatus==true" :class="searchaddressStatus==true?'animated bounceInRight':''">
      <div class="title">
        <i class="el-icon-arrow-left titleImg" @click="searchaddressStatus=false"></i>
        <span class="ellipsis">搜索</span>
        <span></span>
      </div>
      <form v-on:submit.prevent="getAreaInfos" class="search_form">
        <input required="required" type="text" placeholder="请输入小区/写字楼/学校等" v-model="inputInfo">
        <input type="submit" value="提交">
      </form>
      <ul class="address_list">
        <li
          v-for="(itemOrderAddress,index) in areaInfo"
          :key="index"
          @click="getAddress(itemOrderAddress.name)"
        >
          <h4>{{itemOrderAddress.name}}</h4>
          <p>{{itemOrderAddress.address}}</p>
        </li>
      </ul>
      <div class="empty_tips" v-if="tipsSH">
        <p>找不到地址？</p>
        <p>尝试输入小区、写字楼或学校名</p>
        <p>详细地址（如门牌号等）可稍后输入哦</p>
      </div>
    </section>
    <!-- 订单备注信息 -->
    <section class="rating_page" v-if="orderRemarksstatus==true" :class="orderRemarksstatus==true?'animated bounceInRight':''">
      <div class="title">
        <i class="el-icon-arrow-left titleImg" @click="orderRemarksstatus=false"></i>
        <span class="ellipsis">订单备注</span>
        <span></span>
      </div>
      <section class="quick_remark">
        <header class="header_style">快速备注</header>
        <ul class="remark_arr_list_ul">
          <li class="remark_arr_list_li">
            <span
              v-for="(itemorderremarks,index1) in getorderRemarksInfo[0]"
              class="remark_arr_listli_span"
              :key="index1"
              :class="index1==suduremarks1&&suduremarksSH1==true?'choosed':''"
              @click="returnorderInfoOnly(1,index1)"
            >{{itemorderremarks}}</span>
          </li>
          <li class="remark_arr_list_li">
            <span
              :class="suduremarksSH2==true?'choosed':''"
              @click="returnorderInfoOnly(2,0)"
            >{{getorderRemarksInfo[1][0]}}</span>
          </li>
          <li class="remark_arr_list_li">
            <span
            :class="suduremarksSH3==true?'choosed':''"
            @click="returnorderInfoOnly(3,0)"
            >{{getorderRemarksInfo[2][0]}}</span>
          </li>
          <li class="remark_arr_list_li">
            <span
            :class="suduremarksSH4==true?'choosed':''"
            @click="returnorderInfoOnly(4,0)"
            >{{getorderRemarksInfo[3][0]}}</span>
          </li>
          <li class="remark_arr_list_li">
            <span
            :class="suduremarksSH5==true?'choosed':''"
            @click="returnorderInfoOnly(5,0)"
            >{{getorderRemarksInfo[4][0]}}</span>
          </li>
          <li class="remark_arr_list_li">
            <span
              v-for="(itemorderremarks1,index2) in getorderRemarksInfo[5]"
              class="remark_arr_listli_span"
              :key="index2"
              :class="index2==suduremarks2&&suduremarksSH6==true?'choosed':''"
              @click="returnorderInfoOnly(6,index2)"
            >{{itemorderremarks1}}</span>
          </li>
        </ul>
      </section>
      <section class="input_remark quick_remark">
        <header class="header_style">其他备注</header>
        <textarea placeholder="请输入备注内容(可不填)" class="input_text" v-model="otherremarkInfo"></textarea>
      </section>
      <div class="determine" @click="returnorderInfoAll()">确定</div>
    </section>
    <!-- 发票抬头 -->
    <section  class="rating_page"  v-if="orderInvoicestatus==true" :class="orderInvoicestatus==true?'animated bounceInRight':''">
      <div class="title">
        <i class="el-icon-arrow-left titleImg" @click="orderInvoicestatus=false"></i>
        <span class="ellipsis">选择发票抬头</span>
        <span></span>
      </div>
      <header class="choose_invoice" @click="selectInvoicestatus=!selectInvoicestatus">
        <span>{{selectInvoiceInfo}}</span>
        <img v-if="selectInvoicestatus==false" src="../../assets/common/noselect.png" alt="">
        <img v-else src="../../assets/common/select.png" alt="" >
      </header>
       <div class="determine" @click="orderInvoicestatus=false">确定</div>
    </section>
    <!-- 在线支付 -->
    <section class="rating_page" v-if="paystatus==true" :class="paystatus==true?'animated bounceInRight':''">
      <div class="title">
        <i class="el-icon-arrow-left titleImg" @click="paystatus=false"></i>
        <span class="ellipsis">在线支付</span>
        <span></span>
      </div>
      <section class="show_time_amount">
        <header class="time_last">支付剩余时间</header>
        <p class="time">00 : {{payMinute}} : {{paySecond}}</p>
      </section>
      <div class="pay_way">选择支付方式</div>
      <section class="pay_way_list">
        <section class="pay_items">
          <div class="pay_icon_contaienr">
            <div class="zhifubao"></div>
            <span>支付宝</span>
          </div>
          <img @click="pay_ZW=true" v-if="pay_ZW==true" src="../../assets/common/select.png" alt="" class="choose_icon">
          <img v-else @click="pay_ZW=true" src="../../assets/common/noselect.png" alt="" class="choose_icon">
        </section>
        <section class="pay_items">
           <div class="pay_icon_contaienr">
            <div class="weixin"></div>
            <span>微信</span>
          </div>
          <img @click="pay_ZW=false" v-if="pay_ZW==true" src="../../assets/common/noselect.png" alt="" class="choose_icon">
          <img @click="pay_ZW=false" v-else src="../../assets/common/select.png" alt="" class="choose_icon">
        </section>
      </section>
      <p class="determine" @click="payfor()">确认支付</p>
    </section>
    <!-- 消息弹框 -->
    <message-box :title="titleText" :showHide="showHide" :change="shchange"></message-box>
  </div>
</template>


<script>
import messageBox from "../common/Component/messageBox";
import { setTimeout } from 'timers';
export default {
  name: "confireOrder",
  components: {
    messageBox
  },
  data() {
    return {
      //选择地址的状态
      selectaddressStatus: false,
      addAddressStatus: false,
      searchaddressStatus: false,
      //搜索的值
      inputInfo: "",
      cityid: localStorage.cityId,
      areaInfo: [],
      //提示部分显示隐藏
      tipsSH: true,
      //当前时间
      date:this.gettime(),
      //收货人姓名
      username: "",
      //电话号码
      orderphone: "",
      //标签类型
      tagtype: 2,
      //标签类型名
      tagtypeName: "",
      //先生女士的选择状态
      sirOrMiss: 1,
      //在线支付的界面状态
      onlinePay:false,
      //备注电话
      anntherphone: "",
      //送餐地址
      orderaddressName: "",
      //详细地址
      orderdetailaddressName: "",
      //备用手机的状态
      anntherPhoneNumber: false,
      //用户id
      user_id: this.$route.params.userID,
      //经纬度
      geohash: localStorage.Comgeohash,
      //消息弹框的内容
      titleText: "",
      //地址返回信息
      addressInfo: "",
      showHide: false,
      //收货地址信息
      getAddressInfo: [],
      //确认订单界面收货地址显示隐藏
      confireOrderaddressSH: true,
      //选择地址界面选择地址下标传给确认订单界面
      confireOrderaddressSHIndex: 0,
      //订单备注双向绑定内容
      orderStringInfo:"口味偏好等",
      //订单备注状态
      orderRemarksstatus: false,
      //返回的订单备注信息
      getorderRemarksInfo: [],
      //选择的订单备注信息
      orderRemarkInfo: [],
      //快速备注的动态状态
      suduremarksSH1: false,
      suduremarksSH2: false,
      suduremarksSH3: false,
      suduremarksSH4: false,
      suduremarksSH5: false,
      suduremarksSH6: false,
      suduremarks1: 100,
      suduremarks2: 100,
      //其他备注双向绑定
      otherremarkInfo:"",
      //发票界面状态
      orderInvoicestatus:false,
      //发票选择状态
      selectInvoicestatus:false,
      //发票选择状态数据双向绑定
      selectInvoiceInfo:"不需要开发票",
      //购物车信息
      shopcar:this.$route.params.shopcar,
      //在线支付界面状态
      paystatus:false,
      //支付宝微信状态切换
      pay_ZW:true,
      //倒计时minutes
      payMinutes:15,
      //倒计时second
      paySeconds:0,
      //收货地址ID
      address_id:0,
      //下单返回数据
      getorderInfo:[],
    };
  },
  created() {
    this.$store.state.entities=[];
    this.getUser();
    this.getaddressInfoMethod();
      console.log("用户ID",this.$route.params.userID);
      console.log("购物车信息",this.$route.params.shopcar);
    // 获取订单快捷备注信息
    this.getorderremarkmethods();
  },
    watch: {
      paySecond: {
        handler (newVal) {
          // this.num(newVal)
          if (newVal<10) {
            return newVal < 10 ? '0' + newVal : '' + newVal
          }
        }
      },
      payMinute: {
        handler (newVal) {
          if (newVal<10) {
            return newVal < 10 ? '0' + newVal : '' + newVal
          }
        }
      }
    },
    computed: {
      paySecond() {
        return this.num(this.paySeconds)
      },
      payMinute(){
        return this.num(this.payMinutes)
      }
    },
    
  methods: {
    //时间方法
    num(n) {
        return n < 10 ? '0' + n : '' + n
      },
      add(){
        var _this = this
        var time = window.setInterval(function () {
          if (_this.paySeconds === 0 && _this.payMinutes !== 0) {
            _this.paySeconds = 59
            _this.payMinutes -= 1
          } else if (_this.payMinutes === 0 && _this.paySeconds === 0) {
            _this.paySeconds = 0
            window.clearInterval(time)
          } else {
            _this.paySeconds -= 1
          }
        }, 1000)
      },
    //下单
    getOrder(){
      console.log("用户id",this.user_id);
      console.log("cardID",this.shopcar.cart.id);
      console.log("收货地址ID",this.address_id);
      console.log("餐馆id",this.shopcar.cart.restaurant_id);
      console.log("购物车信息",this.shopcar);
      console.log("状态码",this.$store.ComloginState);
      var arrayentities1=[];
      var arrayentities2=[];
      arrayentities1.push(this.shopcar);
      arrayentities2.push(arrayentities1);
      if (this.address_id==0) {
        this.titleText="请选择收货地址";
        this.showHide=true;
      }else if(this.$store.ComloginState!=200){
         this.titleText="请登录";
          this.showHide=true;
      }
      else{
        this.add();
        const url="https://elm.cangdu.org/v1/users/"+this.user_id+"/carts/"+this.shopcar.cart.id+"/orders";
        this.$http({
          method: "post",
          url: url,
          data:{
            address_id:this.address_id,
            restaurant_id :this.shopcar.cart.restaurant_id,
            entities:arrayentities2
          },
          withCredentials: true // 默认false
        }).then(res => {
          console.log("tap", res);
          console.log("tap", res.data);
          this.getorderInfo = res.data;
          console.log("下单后返回数据", this.getorderInfo);
        });
        this.paystatus=true;
        this.titleText="暂不开放支付功能";
        this.showHide=true;

      }

    },
    //提交
    payfor(){
      if (this.payMinutes==0&&this.paySeconds==0) {
        this.titleText="支付超时";
        this.showHide=true;
      }else{
        this.titleText="当前环境无法支付,请打开官方APP进行付款";
        this.showHide=true;
      }
      var _this=this;
      setTimeout(function(){
        _this.$router.push({name:"order",params:{id:this.user_id,}})
      },1000)

    },
    // 获取当前时间
    gettime(){
      var time = new Date();
      var h=time.getHours();
      var m=time.getMinutes();
      m=m+30;
      if (m>=60) {
        m=m-60;
        h+=1;
        if (m<10) {
          m="0"+m;
        }
      }
      return(h+":"+m);     
    },
    // 将选择好的信息返回
    returnorderInfoAll(){
      this.orderRemarksstatus=false;
      this.orderStringInfo=this.orderRemarkInfo;
      this.orderStringInfo.push(this.otherremarkInfo);
      this.orderStringInfo=this.orderStringInfo.join(",");
    },
    //选择信息
    returnorderInfoOnly(id, index) {
      console.log("确认订单添加样式");
      if (id == 1) {
        
        var id1_1=this.orderRemarkInfo.indexOf(this.getorderRemarksInfo[0][0]);
        var id1_2=this.orderRemarkInfo.indexOf(this.getorderRemarksInfo[0][1]);
        var id1_3=this.orderRemarkInfo.indexOf(this.getorderRemarksInfo[0][2]);

        console.log("本地数据"+this.suduremarks1,"传来的下标"+index);
        
        if(this.orderRemarkInfo.length==0){
          // console.log("数组条件第一个",this.orderRemarkInfo)
          this.orderRemarkInfo.push(this.getorderRemarksInfo[0][index])
        }else if (id1_1==-1&&id1_2==-1&&id1_3==-1) {
          console.log("数组条件第一个",this.orderRemarkInfo.indexOf(this.getorderRemarksInfo[0][0]))
          console.log("数组条件第二个",this.orderRemarkInfo.indexOf(this.getorderRemarksInfo[0][1]))
          console.log("数组条件第二个",this.orderRemarkInfo.indexOf(this.getorderRemarksInfo[0][2]))
          this.orderRemarkInfo.push(this.getorderRemarksInfo[0][index])
        }else if(this.suduremarks1!=index){
          // console.log("数组条件第三个",this.orderRemarkInfo)
          var indexID1=this.orderRemarkInfo.indexOf(this.getorderRemarksInfo[0][index])
          this.orderRemarkInfo.splice(indexID1,1)
          this.orderRemarkInfo.push(this.getorderRemarksInfo[0][index])
        }else{
          var indexID11=this.orderRemarkInfo.indexOf(this.getorderRemarksInfo[0][index])
          this.orderRemarkInfo.splice(indexID11,1)

        }
        console.log("备注状态",this.orderRemarkInfo);
        
        if (this.suduremarksSH1==false) {
          this.suduremarks1 = index;
          this.suduremarksSH1 = true;
        }else if(this.suduremarks1!=index){
          this.suduremarks1 = index;
          this.suduremarksSH1 = true;
        }else{
          this.suduremarksSH1 = false;
        }
      }
      if (id == 2) {
        this.suduremarksSH2 = !this.suduremarksSH2;


        if(this.orderRemarkInfo.length==0){
          this.orderRemarkInfo.push(this.getorderRemarksInfo[1][index])
        }else if (this.orderRemarkInfo.indexOf(this.getorderRemarksInfo[1][0])==-1) {
          this.orderRemarkInfo.push(this.getorderRemarksInfo[1][index])
        }else{
          var indexID2=this.orderRemarkInfo.indexOf(this.getorderRemarksInfo[1][index])
          this.orderRemarkInfo.splice(indexID2,1)
        }
          console.log("备注状态",this.orderRemarkInfo);
      }
      if (id == 3) {
        this.suduremarksSH3 = !this.suduremarksSH3;

        if(this.orderRemarkInfo.length==0){
          this.orderRemarkInfo.push(this.getorderRemarksInfo[2][index])
        }else if (this.orderRemarkInfo.indexOf(this.getorderRemarksInfo[2][0])==-1) {
          this.orderRemarkInfo.push(this.getorderRemarksInfo[2][index])
        }else{
          var indexID3=this.orderRemarkInfo.indexOf(this.getorderRemarksInfo[2][index])
          this.orderRemarkInfo.splice(indexID3,1)
        }
          console.log("备注状态",this.orderRemarkInfo);
      }
      if (id == 4) {
        this.suduremarksSH4 = !this.suduremarksSH4;

        if(this.orderRemarkInfo.length==0){
          this.orderRemarkInfo.push(this.getorderRemarksInfo[3][index])
        }else if (this.orderRemarkInfo.indexOf(this.getorderRemarksInfo[3][index])==-1) {
          this.orderRemarkInfo.push(this.getorderRemarksInfo[3][index])
        }else{
          var indexID4=this.orderRemarkInfo.indexOf(this.getorderRemarksInfo[3][index])
          this.orderRemarkInfo.splice(indexID4,1)
        }
          console.log("备注状态",this.orderRemarkInfo);
      }
      if (id == 5) {
        this.suduremarksSH5 = !this.suduremarksSH5;

        if(this.orderRemarkInfo.length==0){
          this.orderRemarkInfo.push(this.getorderRemarksInfo[4][index])
        }else if (this.orderRemarkInfo.indexOf(this.getorderRemarksInfo[4][0])==-1) {
          this.orderRemarkInfo.push(this.getorderRemarksInfo[4][index])
        }else{
          var indexID5=this.orderRemarkInfo.indexOf(this.getorderRemarksInfo[4][index])
          this.orderRemarkInfo.splice(indexID5,1)
        }
          console.log("备注状态",this.orderRemarkInfo);
      }
      if (id == 6) {
        
        
        var id6_1=this.orderRemarkInfo.indexOf(this.getorderRemarksInfo[5][0]);
        var id6_2=this.orderRemarkInfo.indexOf(this.getorderRemarksInfo[5][1]);
        if(this.orderRemarkInfo.length==0){
          this.orderRemarkInfo.push(this.getorderRemarksInfo[5][index])
        }else if (id6_1==-1&&id6_2==-1) {
          this.orderRemarkInfo.push(this.getorderRemarksInfo[5][index])
        }else if(this.suduremarks2!=index){
          // console.log("数组条件第三个",this.orderRemarkInfo)
          var indexID6=this.orderRemarkInfo.indexOf(this.getorderRemarksInfo[5][index])
          this.orderRemarkInfo.splice(indexID6,1)
          this.orderRemarkInfo.push(this.getorderRemarksInfo[5][index])
        }else{
          var indexID61=this.orderRemarkInfo.indexOf(this.getorderRemarksInfo[5][index])
          this.orderRemarkInfo.splice(indexID61,1)
        }
        console.log("备注状态",this.orderRemarkInfo);


      if (this.suduremarksSH6==false) {
        this.suduremarks2 = index;
        this.suduremarksSH6 = true;
      }else if(this.suduremarks2!=index){
        this.suduremarks2 = index;
        this.suduremarksSH6 = true;
      }else{
        this.suduremarksSH6 = false;
      }


      }
    },
    //选择地址界面选择地址传给确认订单界面
    addaddressMethods(index,id) {
      this.selectaddressStatus = false;
      this.confireOrderaddressSH = false;
      this.confireOrderaddressSHIndex = index;
      this.address_id=id;
      console.log("收货地址id",this.address_id);
      
    },
    //消息弹框的信息双向绑定
    shchange(val) {
      this.showHide = val;
    },
    //获取收货地址列表
    getaddressInfoMethod() {
      var idnum = this.user_id;
      //    console.log("状态码",this.$store.ComloginState)
      if (this.$store.ComloginState==200) {
        const url2 = "https://elm.cangdu.org/v1/users/" + idnum + "/addresses";
        this.$http({
          method: "get",
          url: url2,
          //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
          withCredentials: true // 默认false
        }).then(res => {
          // console.log("tap", res);
          console.log("tap", res.data);
          this.getAddressInfo = res.data;
          console.log("收货地址", this.getAddressInfo);
        });
        
      }
    },
    //向接口上传地址
    submitAddress() {
      console.log("上传地址回来的信息", this.addressInfo);
      if (this.$store.ComloginState != 200) {
        this.showHide = true;
        this.titleText = "请先登录";
        console.log("未登录状态上传地址回来的信息", this.addressInfo);
      } else {
        console.log("登录状态上传地址回来的信息", this.addressInfo);
        const url =
          "https://elm.cangdu.org/v1/users/" + this.user_id + "/addresses";
        // console.log(url);
        this.$http({
          method: "post",
          url: url,
          data: {
            user_id: this.user_id,
            address: this.orderaddressName,
            address_detail: this.orderdetailaddressName,
            geohash: this.geohash,
            name: this.username,
            phone: this.orderphone,
            tag: this.tagtypeName,
            sex: this.sirOrMiss,
            phone_bk: this.anntherphone,
            tag_type: this.tagtype
          },
          withCredentials: true // 默认false
        }).then(respon => {
          this.addressInfo = respon.data;
          if (respon.data.message != undefined) {
            this.titleText = respon.data.message;
            this.showHide = true;
          } else {
            this.titleText = "添加地址成功";
            this.showHide = true;
            this.addAddressStatus = false;
          }
        });
      }
      // console.log("状态码",this.$store.ComloginState);
    },
    // 测试用户是否在线
    getUser() {
      //    console.log("状态码",this.$store.ComloginState)
    },
    //选择新地址
    goselectAddress() {
      this.selectaddressStatus = true;
      console.log("测试");
    },
    //添加新地址
    goaddAddress() {
      this.addAddressStatus = true;
      console.log("测试");
    },
    //搜索新地址
    gosearchAddress() {
      this.searchaddressStatus = true;
      console.log("测试");
    },
    //返回上一步
    goback() {
      this.$router.go(-1);
    },
    // 跳转到my界面
    goMy() {
      // console.log(this);
      this.$router.push({ name: "my" });
    },
    // 跳转到登录界面
    goLogin() {
      // console.log(this);
      this.$router.push({ name: "login" });
    },
    getAddress(name) {
      console.log("传回来的地址", name);
      this.inputInfo = "";
      this.searchaddressStatus = false;
      this.orderaddressName = name;
    },
    // 请求当前城市中的地区信息
    getAreaInfos() {
      this.tipsSH = false;
      if (this.inputInfo != "") {
        const url =
          "https://elm.cangdu.org/v1/pois?city_id=" +
          this.cityid +
          "&keyword=" +
          this.inputInfo +
          "&type=search";
        console.log(url);
        this.$http({
          method: "get",
          url: url
        }).then(respon => {
          this.areaInfo = respon.data;

          console.log("回来的信息", this.areaInfo);
        });
      }
    },
    //从接口获取订单备注信息
    getorderremarkmethods() {
      const url = "https://elm.cangdu.org/v1/carts/1/remarks";
      this.$http({
        method: "get",
        url: url
      }).then(respon => {
        this.getorderRemarksInfo = respon.data.remarks;

        console.log("订单备注信息", this.getorderRemarksInfo);
      });
    }
  }
};
</script>


<style scoped>
.confirmOrderContainer {
  padding-top: 1.95rem;
  padding-bottom: 3rem;
}
/* 头部样式 */
.title {
  width: 100%;
  height: 1.95rem;
  background: #3190e8;
  line-height: 1.95rem;
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
  z-index: 100;
}
.titleImg {
  width: 0.6rem;
  height: 1rem;
  font-size: 1rem;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 0.2rem;
  margin-top: -0.5rem;
}
.title span:first-of-type {
  width: 50%;
  display: inline-block;
  font-size: 0.8rem;
  /* font-weight: 700; */
  margin-top: 0.15rem;
  vertical-align: top;
}
.title span:last-of-type {
  display: inline-block;
  font-size: 0.65rem;
  color: white;
  position: absolute;
  top: 50%;
  right: 0.55rem;
  transform: translateY(-50%);
}
.title span:last-of-type img {
  width: 0.8rem;
  font-weight: 700;
  margin-top: 1rem;
}

/*添加收货地址 */
.address_container {
  display: flex;
  align-items: center;
  background-color: #fff;
  background-size: auto 0.12rem;
  min-height: 3.5rem;
  justify-content: space-between;
  padding: 0 0.6rem;
}
.address_empty_left {
  display: flex;
  align-items: center;
}
.address_container .address_empty_left .location_icon {
  width: 0.8rem;
  height: 0.8rem;
  fill: #3190e8;
  margin-right: 0.2rem;
}
.address_container .address_empty_left .address_detail_container {
  margin-left: 0.2rem;
}
.address_container .address_empty_left .address_detail_container header {
  font-size: 0.65rem;
  color: #333;
}
.address_container
  .address_empty_left
  .address_detail_container
  header
  span:first-of-type {
  font-size: 0.8rem;
  font-weight: 700;
}
.address_container
  .address_empty_left
  .address_detail_container
  .address_detail {
  width: 100%;
  display: flex;
  align-items: center;
}
.address_container
  .address_empty_left
  .address_detail_container
  .address_detail
  span {
  font-size: 0.5rem;
  color: #fff;
  border-radius: 0.15rem;
  background-color: #ff5722;
  height: 0.6rem;
  line-height: 0.6rem;
  padding: 0 0.2rem;
  margin-right: 0.3rem;
}
.address_container
  .address_empty_left
  .address_detail_container
  .address_detail
  p {
  font-size: 0.55rem;
  color: #777;
}
/* 送达时间部分 */
.delivery_model {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 0.2rem solid #3190e8;
  min-height: 4rem;
}
.container_style {
  background-color: #fff;
  margin-top: 0.4rem;
  padding: 0 0.7rem;
}
.delivery_model .deliver_text {
  font-size: 0.8rem;
  color: #333;
  font-weight: 700;
  padding-left: 0.3rem;
}
.deliver_time {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.deliver_time p:first-of-type {
  font-size: 0.7rem;
  color: #3190e8;
}
.deliver_time p:nth-of-type(2) {
  font-size: 0.5rem;
  color: #fff;
  background-color: #3190e8;
  width: 2.4rem;
  margin-top: 0.5rem;
  text-align: center;
  border-radius: 0.12rem;
  padding: 0.1rem;
}

/* 支付方式 */
.container_style {
  background-color: #fff;
  margin-top: 0.4rem;
  padding: 0 0.7rem;
}
.header_style {
  display: flex;
  justify-content: space-between;
  line-height: 2rem;
}
.header_style span:first-of-type {
  font-size: 0.7rem;
  color: #666;
}
.more_type span:first-of-type {
  font-size: 0.6rem;
  color: #aaa;
  width: 10rem;
  display: inline-block;
  text-align: right;
  vertical-align: middle;
}

.address_empty_right {
  width: 0.5rem;
  height: 0.5rem;
  color: #ccc;
}
.hongbo {
  display: flex;
  justify-content: space-between;
  border-top: 0.025rem solid #f5f5f5;
}
.pay_way .hongbo span {
  font-size: 0.6rem;
  color: #aaa;
  line-height: 2rem;
}
.pay_way .hongbo span:nth-of-type(2) {
  color: #aaa;
}

/* 效果演示 */
.food_list {
  background-color: #fff;
  margin-top: 0.4rem;
}
.food_list header {
  padding: 0.7rem;
  border-bottom: 0.025rem solid #f5f5f5;
}
.food_list header img {
  width: 1.2rem;
  height: 1.2rem;
  vertical-align: middle;
}
.food_list header span {
  font-size: 0.8rem;
  color: #333;
}
.food_list_ul {
  padding-top: 0.5rem;
}
.food_item_style {
  display: flex;
  justify-content: space-between;
  line-height: 1.8rem;
  padding: 0 0.7rem;
}
.food_name {
  width: 11rem;
  font-size: 0.65rem;
  color: #666;
}
.num_price {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.food_item_style span {
  font-size: 0.65rem;
  color: #666;
}
.food_item_style .num_price span:first-of-type {
  color: #f60;
  font-size: 0.65rem;
}
.food_item_style {
  display: flex;
  justify-content: space-between;
  line-height: 1.8rem;
  padding: 0 0.7rem;
}
.food_name {
  width: 11rem;
  font-size: 0.65rem;
  color: #666;
}
.num_price {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
}
.num_price span {
  color: #666;
  font-size: 0.65rem;
}
.num_price span:first-of-type {
  color: #f60;
  font-size: 0.65rem;
}
.food_list .total_price {
  border-top: 0.025rem solid #f5f5f5;
}

/* 订单备注,发票抬头 */
.container_style {
  background-color: #fff;
  margin-top: 0.4rem;
  padding: 0 0.7rem;
}
.header_style {
  display: flex;
  justify-content: space-between;
  line-height: 2rem;
}
.pay_way .header_style span:first-of-type {
  font-size: 0.7rem;
  color: #666;
}
.header_style .more_type span:first-of-type {
  font-size: 0.6rem;
  color: #aaa;
  width: 10rem;
  display: inline-block;
  text-align: right;
  vertical-align: middle;
}
.header_style .more_type i {
  width: 0.5rem;
  height: 0.5rem;
  color: #ccc;
}
.pay_way .hongbo {
  display: flex;
  justify-content: space-between;
  border-top: 0.025rem solid #f5f5f5;
}
.pay_way .support_is_available span {
  color: #666;
}
.hongbao span {
  color: #aaa;
  font-size: 0.6rem;
  line-height: 2rem;
}
.pay_way .hongbo span:nth-of-type(2) {
  color: #aaa;
}

/* 待支付部分 */
.confrim_order {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 2rem;
}
.confrim_order p {
  line-height: 2rem;
  font-size: 0.75rem;
  color: #fff;
}
.confrim_order p:first-of-type {
  background-color: #3c3c3c;
  flex: 5;
  padding-left: 0.7rem;
}
.confrim_order p:nth-of-type(2) {
  flex: 2;
  background-color: #56d176;
  text-align: center;
}

/* 选择地址界面信息 */
.rating_page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 202;
  padding-top: 1.95rem;
}
.add_icon_footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2.5rem;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 204;
}
.add_icon_footer img {
  width: 1rem;
  height: 1rem;
}
.add_icon_footer span {
  font-size: 0.7rem;
  color: #3190e8;
  margin-left: 0.3rem;
}
.scroll_container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 1.95rem;
  overflow-y: auto;
}
.list_cotainer {
  padding-bottom: 5rem;
}
.deliverable_address {
  background-color: #fff;
}
.deliverable_address li {
  display: flex;
  align-items: center;
  border-bottom: 0.025rem solid #f5f5f5;
  padding: 0.7rem;
  line-height: 1rem;
}
.deliverable_address li .choosed_address {
  width: 0.8rem;
  height: 0.8rem;
  fill: #4cd964;
  margin-right: 0.4rem;
  opacity: 0;
}
.deliverable_address li .default_address {
  opacity: 1;
}
.deliverable_address li header {
  font-size: 0.7rem;
  color: #333;
}
.deliverable_address li .address_detail {
  width: 100%;
  display: flex;
  align-items: center;
}
.deliverable_address li .address_detail span {
  font-size: 0.5rem;
  color: #fff;
  border-radius: 0.15rem;
  background-color: #ff5722;
  height: 0.6rem;
  line-height: 0.6rem;
  padding: 0 0.2rem;
  margin-right: 0.3rem;
}
.deliverable_address li .address_detail p {
  font-size: 0.6rem;
  color: #777;
}
/* 在线支付界面 */
.cover{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,.3);
    z-index: 203;
}
.choose_type_Container{
    min-height: 10rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 204;
}
.choose_type_Container header{
    background-color: #fafafa;
    font-size: .7rem;
    color: #333;
    text-align: center;
    line-height: 2rem;
}
.choose_type_Container ul li{
    display: flex;
    justify-content: space-between;
    padding: 0 .7rem;
    line-height: 2.5rem;
    align-items: center;
}
.choose_type_Container ul li span{
    font-size: .7rem;
    color: #ccc;
}
.choose_type_Container ul li img{
    width: .8rem;
    height: .8rem;
    color: #eee;
}
.choose_type_Container ul .choose span{
    color: #333;
}
/* 添加地址界面信息 */
.page_text_container {
  background-color: #fff;
  padding: 0 0.7rem;
}
.section_list {
  display: flex;
  border-bottom: 0.025rem solid #f5f5f5;
}
.section_list .section_left {
  font-size: 0.7rem;
  color: #333;
  flex: 2;
  line-height: 2.5rem;
}
.section_right {
  flex: 5;
}
input{
  outline: none;
  appearance: none;
  border-radius: 0;
}
.section_list .section_right .input_style {
  width: 100%;
  height: 2.5rem;
  font-size: 0.7rem;
  color: #999;
  box-sizing: border-box;  
}
.phone_bk {
  border-top: 0.025rem solid #f5f5f5;
}
.choose_sex {
  display: flex;
  line-height: 2.5rem;
  border-top: 0.025rem solid #f5f5f5;
}
.choose_option {
  font-size: 0.7rem;
  color: #333;
  display: flex;
  align-items: center;
  margin-right: 0.8rem;
}
.section_list .section_right .choose_sex .choose_option img {
  margin-right: 0.3rem;
  width: 0.8rem;
  height: 0.8rem;
  fill: #ccc;
}
.phone_add {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.phone_add img {
  width: 0.9rem;
  height: 0.9rem;
}
.section_list .section_right .choose_address {
  font-size: 0.7rem;
  color: #999;
  line-height: 2.5rem;
  border-bottom: 0.025rem solid #f5f5f5;
}
.determine {
  background-color: #4cd964;
  font-size: 0.7rem;
  color: #fff;
  text-align: center;
  margin: 0 0.7rem;
  line-height: 1.8rem;
  border-radius: 0.2rem;
  margin-top: 0.6rem;
}
/* 搜索部分 */
.search_form {
  display: flex;
  padding: 0.7rem;
}
.search_form input:first-of-type {
  font-size: 0.65rem;
  color: #999;
  flex: 4;
  background-color: #f1f1f1;
  margin-right: 0.6rem;
  height: 1.5rem;
  border-radius: 0.15rem;
  padding: 0 0.4rem;
}
.search_form input:nth-of-type(2) {
  flex: 1;
  font-size: 0.65rem;
  color: #fff;
  background-color: #3190e8;
  border-radius: 0.15rem;
  border: 0;
}
.empty_tips {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}
.empty_tips p {
  font-size: 0.5rem;
  color: #aaa;
  line-height: 0.7rem;
  text-align: center;
}
.address_list {
  padding: 0.7rem;
}
.address_list li {
  padding: 0.7rem 0;
  border-bottom: 0.025rem solid #f5f5f5;
  line-height: 1rem;
}
.address_list li h4 {
  font-size: 0.75rem;
  color: #555;
}
.address_list li p {
  font-size: 0.65rem;
  color: #999;
}
/* 订单备注信息 */
.quick_remark {
  background-color: #fff;
  margin-top: 0.4rem;
  padding: 0 0.6rem 1rem;
}
.input_remark {
  background-color: #fff;
}
.header_style {
  font-size: 0.65rem;
  color: #333;
  line-height: 2rem;
}
.input_remark .input_text {
  width: 100%;
  background-color: #f9f9f9;
  border: 0.025rem solid #eee;
  resize: none;
  min-height: 4.5rem;
  border-radius: 0.2rem;
  font-size: 0.6rem;
  color: #666;
  padding: 0.5rem;
}
.quick_remark ul {
  display: flex;
  flex-wrap: wrap;
}
.quick_remark ul li {
  margin-right: 0.6rem;
  margin-bottom: 0.6rem;
  line-height: 1.26rem;
}
.quick_remark ul li span {
  font-size: 0.6rem;
  color: #333;
  padding: 0.3rem 0.6rem;
  border: 0.025rem solid #3190e8;
  border-left: 0;
}
.quick_remark ul li span {
  font-size: 0.6rem;
  color: #333;
  padding: 0.3rem 0.6rem;
  border: 0.025rem solid #3190e8;
  border-left: 0;
}
.quick_remark ul li span:first-of-type {
  border-left: 0.025rem solid #3190e8;
  border-top-left-radius: 0.2rem;
  border-bottom-left-radius: 0.2rem;
}
.quick_remark ul li span:last-of-type {
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;
}
.quick_remark ul li .choosed {
  color: #fff !important;
  background-color: #3190e8 !important;
}

/* 发票抬头部分 */
.choose_invoice{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    line-height: 2.5rem;
    margin-top: .5rem;
    padding: 0 .7rem;
}
.choose_invoice span{
    font-size: .75rem;
    color: #333;
}
.choose_invoice img{
    width: .8rem;
    height: .8rem;
    color: #999;
}

/* 在线支付 */
.show_time_amount{
  text-align: center;
  background-color: #fff;
  padding: .7rem;
}
.time_last{
    font-size: .6rem;
    color: #666;
    margin-top: 1rem;
}
.show_time_amount .time{
    font-size: 1.5rem;
    color: #333;
    margin: .3rem 0 1rem;
}
.pay_way{
    background-color: #fff;
    padding: 0 .7rem;
    font-size: .7rem;
    color: #666;
    line-height: 1.8rem;
}
.pay_way_list{
  background-color: #fff;
}
.pay_way_list .pay_items{
    display: flex;
    justify-content: space-between;
    align-items: center;
        padding: .4rem .7rem;
    line-height: 2.6rem;
    border-bottom: .025rem solid #f5f5f5;
}
.pay_icon_contaienr{
    display: flex;
    -ms-flex-align: center;
    align-items: center;
}
 .zhifubao{
    width: 2rem;
    height: 2rem;
    background: url("../../assets/common/pay.png") no-repeat;
    background-size: 100% 100%;
    margin-right: .2rem;
    display: inline-block;
}
.pay_way_list .pay_items .pay_icon_contaienr span{
    font-size: .7rem;
    color: #666;
}
.choose_icon{
    width: 1rem;
    height: 1rem;
}
.weixin{
    width: 2rem;
    height: 2rem;
    background: url("../../assets/common/pay_wx.png") no-repeat;
    background-size: 100% 100%;
    margin-right: .2rem;
    display: inline-block;
}
</style>
