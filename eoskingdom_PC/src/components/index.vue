<template>
  <div>
    <div class="container-fluid ">
      <Nav></Nav>
      <firstPage></firstPage>
      <div class="gamelist" style="margin-top: 20px;position:relative;left:40px;">
        <i-Row  class="break-b">
          <i-Col span="6" >
            <a :href="this.dezhou+new Date().getTime()" target="_blank"  ><img src="@/assets/images/firstpage/C01-ICON_01_TH.png" alt=""></a>
            <div class="font-style redColor">{{$t('ekd.NowPlaying')}}</div>
          </i-Col>
          <i-Col span="6">
            <router-link to="/slot"><img src="@/assets/images/firstpage/C01-ICON_02_BJ.png" alt="" ></router-link>
            <div class="font-style redColor">{{$t('ekd.NowPlaying')}}</div>
          </i-Col>
          <i-Col span="6">
            <a href="#"><img src="@/assets/images/firstpage/C01-ICON_03_BC.png" alt=""  ></a>
            <div class="font-style"  >{{$t('ekd.ComingSoon')}}</div>
          </i-Col>
          <i-Col span="6">
            <a href="#"><img src="@/assets/images/firstpage/C01-ICON_04_RL.png" alt=""  ></a>
            <div class="font-style" >{{$t('ekd.ComingSoon')}}</div>
          </i-Col>
        </i-Row>
      </div>
      <server></server>
       <shouyi></shouyi>
      <way></way>
       <team></team>
       <foot></foot>
    </div>
    <!-- <div class="Mask">
      <div class="showTitle">aaaaaaaaa</div>
    </div> -->
    <email></email>
  </div>
</template>

<script>
import Nav from '@/components/layout/nav'
import firstPage from '@/components/page/firstPage'
import email from '@/components/email'
import server from '@/components/page/server'
import shouyi from '@/components/page/shouyi'
import way from '@/components/page/way'
import team from '@/components/page/team'
import foot from '@/components/layout/foot'
import '@/assets/css/index.css'
import '@/assets/css/nav.css'
import '@/assets/css/foot.css'
import '@/assets/css/common.css'
import '@/assets/css/font.css'
import bgconn from "@/assets/js/bgconn.js";
export default {
    //导出引入组件
    components:{Nav, firstPage,server,shouyi,way,team,foot,email},
    name: 'index',
    data(){
        return{
          screenWidth: document.body.clientWidth,
          showDetails: true,
          dezhou:bgconn.DEZHOU,
          lianxi:null
        }
    },
    methods:{
      gamefontshow(a){
        var game=$('.ivu-col-span-6')
        $(game[a]).css('color','#D82156')
      },
      gamefontshow2(a){
        var game=$('.ivu-col-span-6')
        $(game[a]).css('color','#515a6e')
      },
          EKDmsglink (){
          this.lianxi=this.$notify({
          title: '邮箱',
          dangerouslyUseHTMLString: true,
          customClass:'ekdemail',
          message: 
          `
          <div class="msglink">
          <div class='msgtop'>
          <div>
          <a class="tb" href="https://t.me/EosKingDom_global" title="https://t.me/EosKingDom_global"  target="blank" style='width:215px;height:35px;display:block;'></a></div>
          </div>`,
          duration:0,
          position:'bottom-right'
        }); 
        
        
          this.lianxi=this.$notify({
          title: '邮箱',
          dangerouslyUseHTMLString: true,
          customClass:'ekdemail2',
          message: 
           `
          <div class="msglink">
          <div  class='ekdemail2_top' onmouseleave='(function(){
            console.log("---------")
            document.getElementsByClassName("ekdemail2")[0].style.width="61px";
            document.getElementsByClassName("ekdemail2_top")[0].style.display="none";
             document.getElementsByClassName("em")[0].style.display="block";
             
          })()'>contact@eoskingdom.io</div>
          <div class='msgtop'>
          <div onmouseenter='(function(){
            document.getElementsByClassName("ekdemail2_top")[0].style.display="block";
            document.getElementsByClassName("ekdemail2")[0].style.width="230px";
            document.getElementsByClassName("em")[0].style.display="none";

            })()'>
          <a class="em" href="#" style='width:215px;height:35px;display:block;'></a></div>
          </div>`,
          duration:0,
          position:'bottom-right'
        }); 


             
          this.lianxi=this.$notify({
          title: '邮箱',
          dangerouslyUseHTMLString: true,
          customClass:'ekdemail3',
          message: 
          `
          <div class="msglink">
          <div class='msgtop'>
          <div>
          <a  class="tt" href="https://twitter.com/eoskingdom"  title="https://twitter.com/eoskingdom" target="blank" style='width:215px;height:35px;display:block;'></a></div>
          </div>`,
          duration:0,
          position:'bottom-right'
        }); 

             
          this.lianxi=this.$notify({
          title: '邮箱',
          dangerouslyUseHTMLString: true,
          customClass:'ekdemail4',
          message: 
          `
          <div class="msglink">
          <div class="ekdemail4_top" onmouseleave='(function(){
            console.log("---------")
            document.getElementsByClassName("ekdemail4")[0].style.width="61px";
            document.getElementsByClassName("ekdemail4")[0].style.height="61px";
            document.getElementsByClassName("ekdemail4_top")[0].style.display="none";
             document.getElementsByClassName("wc")[0].style.display="block";
             
          })()'>

          </div>
          <div class='msgtop'>
          <div  onmouseenter='(function(){
         
            document.getElementsByClassName("ekdemail4")[0].style.width="200px";
              document.getElementsByClassName("ekdemail4")[0].style.height="200px";
                 document.getElementsByClassName("ekdemail4_top")[0].style.display="block";
                  document.getElementsByClassName("ekdemail4_top")[0].style.height="200px";
  document.getElementsByClassName("wc")[0].style.display="none";
            })()'>
          <a class="wc" href="#" style='width:215px;height:35px;display:block;'></a></div>
          </div>`,
          duration:0,
          position:'bottom-right'
        }); 
      },
      rolling() {
        var kai = true,i=0;
        var oUl = document.getElementsByTagName("ul")[0];
        document.addEventListener('mousewheel', function(ev) {
          var ev = window.event || ev;
          if (kai) {
            kai = false;
            oUl.style.transition=" 0.5s ease";
            if (ev.wheelDelta < 0&&i<5) {
              i++;
            }
            if (ev.wheelDelta > 0&&i>0) {
              i--;
            }
            setTimeout(function() {
              oUl.style.top = -i*100 + 'vh';
            }, 0);
            // console.log(i)
            setTimeout(function() {
              kai = true;
            }, 1000);
          }
        });
        onresize
        window.onresize=function(){
          oUl.style.transition="none";
        }
      },
      DetermineTheScroll(){
        let oneself = this
        if (this.screenWidth  > '1850'){
          oneself.showDetails = true
        }else {
          oneself.showDetails = false
        }
        window.onresize = function temp() {
          this.screenWidth = document.body.clientWidth
          window.onresize = function temp() {
            this.screenWidth = document.body.clientWidth
            if (this.screenWidth  > '1850'){
              ///  这里有问题
              oneself.$router.replace({
                path: '/supplierAllBack',
              })
            }else {
              oneself.showDetails = false
            }
          }
        }
      }
    },
    mounted() {
     /* this.rolling()
      this.DetermineTheScroll()*/
        window.onbeforeunload=function(){
  sessionStorage.removeItem('email')

}
    }
}
</script>

<style>
  .layout{
    border: 0 !important;
    /* background-color: white !important; */
  }
  .ivu-layout{
    /* background-color: white !important; */
  }
.indexfull{
    padding-top: 50px;
}
.container-fluid{
    height: 60px;
}
.box {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.ul {
  position: relative;
}

.ul > li {
  width: 100%;
  height: 100vh;
  padding-top: 4%;
  position: relative;
  justify-content: center;
  text-align: center;
}
.font-style{
  height: 50px;
  font-weight: bold;
  /*font-weight: bold;*/
  font-size: 1.2em;
  line-height: 40px;
}
  .ivu-modal-footer {
    border-top: 0 !important;
    padding: 0 !important;
    text-align: right;
  }
  .ivu-modal {
    width: auto;
    margin: 0 auto;
    position: relative;
    outline: 0;
    top: 0 !important;
  }
  .container-fluid .redColor{
 color:#D82156;
  }
    .ekdemail{
    height: 61px;
    width:61px;
    top: 303px;
  }
    .ekdemail2{
    height: 61px;
    width:61px;
    top: 220px;
  }
   .ekdemail3{
    height: 61px;
    width:61px;
    top: 383px;
  }
    .ekdemail4{
    height: 61px;
    width:61px;
    top: 463px;
  }     
  .el-notification__title{
    font-size: 12px;
    position: relative;
    top:-10px;
    display: none;

  }
  .el-icon-close:before{
    display: none;
  }
  .el-notification__group{
    margin-left: 6px;
  }
  .msglink{
    position: relative;
    left: -15px;
    top: -10px;
  }
  .msglink .msgtop{
    width: 16%;
    margin-left: 10px;
  }
  .msglink .msgbottom{
    width:52%;
    display: -webkit-flex; /* Safari */
    -webkit-align-items: center; /* Safari 7.0+ */
    display: flex;
    align-items: flex-end;
    margin-top: 10px;
    margin-left: 37px;
  }

 .msglink div{
   height: 40px;
   -webkit-flex: 1; /* Safari 6.1+ */
   flex: 1;
   margin-top: 5px;
   margin-left: -5px; 
 }
 .ekdemail2 .msgtop div:first-child{ 
   background-image: url('../assets/images/team/01MAIL.png');
   background-size: 100% 100%;
 }
 .ekdemail .msgtop div:first-child{
  background-image: url('../assets/images/team/02TELEGRAM.png');
   background-size: 100% 100%;
 }
 .ekdemail3 .msgtop div:first-child{
  background-image: url('../assets/images/team/03TWITTER.png');
   background-size: 100% 100%;
 }
  .ekdemail4 .msgtop div:first-child{
  background-image: url('../assets/images/team/04WECHAT.png');
   background-size: 100% 100%;
   cursor:pointer;
 }
 .ekdemail2_top{
   display: none;
   width: 210px;
   height:61px;
   float: right;
   text-align: right;
   font-weight: 1000;
   color:'#515A6E';
   font-size: 12px;
 }
 .ekdemail4_top{

   width:200px;
   background-image: url('../assets/images/team/wechatscan.jpg');
  background-size: 100% 100%;
  display: none;
  position: relative;
  top: -10px;

 } 
</style>
