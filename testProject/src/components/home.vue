<template>
  <div class="home" ref="homeDiv">
    <div class="txtDiv">
      <p>
        <span class="linearTxt">1.แต่ละรอบ จะเป็นการแข่งขันวัดแต้มระหว่างผู้เล่นทุกคน</span>
      </p>
      <p style="text-indent:1rem;">
        <span class="linearTxt">หากใครได้แต้มมากกว่า จะเป็นฝ่ายชนะ</span>
      </p>
      <p>
        <span class="linearTxt">2.ผู้เล่นจะได้รับไพ่ 2 ใบ และมีเวลา 10 วินาที ลุ้นไพ่ใบที่ 2</span>
      </p>
      <p style="text-indent:1rem;">
        <span class="linearTxt">หากไม่ลุ้นไพ่ ระบบจะทำการเปิดไพ่ให้โดยอัตโนมัติ</span>
      </p>
      <p>
        <span class="linearTxt">3.ผู้เล่นที่ได้แต้มมากที่สุดอันดับ 1 จะเป็นผู้ชนะ</span>
      </p>
      <p style="text-indent:1rem;">
        <span class="linearTxt">และได้รับเงินเดิมพันจากผู้เล่นทุกคนที่ได้แต้มน้อยกว่า</span>
      </p>
      <p>
        <span class="linearTxt">4.ผู้เล่นที่ได้แต้มมากอันดับ 2</span>
      </p>
      <p style="text-indent:1rem;">
        <span class="linearTxt">จะเสียเงินเดิมพันให้กับผู้เล่นที่ได้แต้มมากที่สุดอันดับ 1</span>
      </p>
      <p style="text-indent:1rem;">
        <span class="linearTxt">และจะได้รับเงินเดิมพันจากผู้เล่นที่แต้มน้อยกว่า</span>
      </p>
      <p>
        <span class="linearTxt">5.ผู้เล่นที่ได้แต้มมากอันดับ 3</span>
      </p>
      <p style="text-indent:1rem;">
        <span class="linearTxt">จะเสียเงินเดิมพันให้กับผู้เล่นที่ได้แต้มมากอันดับ 1และ2</span>
      </p>
      <p style="text-indent:1rem;">
        <span class="linearTxt">และจะได้รับเงินเดิมพันจากผู้เล่นที่แต้มน้อยกว่า</span>
      </p>
      <p>
        <span class="linearTxt">6.จนกระทั่งถึง ผู้เล่นที่ได้แต้มน้อยที่สุด</span>
      </p>
      <p style="text-indent:1rem;">
        <span class="linearTxt">จะเสียเงินเดิมพันให้กับผู้เล่นทุกคนที่ได้แต้มมากกว่า</span>
      </p>
      <p>
        <span class="linearTxt">7.กรณีไพ่เหมือนกันหรือดอกเหมือนกัน</span>
      </p>
      <p style="text-indent:1rem;">
        <span class="linearTxt">จะได้รับเงินเดิมพันเป็น 2 เท่า</span>
      </p>
      <p>
        <span class="linearTxt">8.กรณีไพ่แต้มเท่ากัน ให้วัดที่ตัวคุม A>K>Q>...>2</span>
      </p>
      <p style="text-indent:1rem;">
        <span class="linearTxt">โพดำ > โพแดง > ข้าวหลามตัด > ดอกจิก</span>
      </p>
      <p>
        <span class="linearTxt">9.ไพ่บอด ถือเป็นแต้มน้อยสุด จะไม่มีการวัดตัวคุม</span>
      </p>
    </div>
    <p class="title">
      <span class="linearTxt">ลำดับในการชนะ จะเรียงดังต่อไปนี้:</span>
    </p>
    <div class="tableDiv">

      <div class="flexDiv bottomBorder" v-for="(item,index1) in contentArr" :key="index1">
        <div class="leftImg">
          <div :class="item.status==1?'img':item.status==2?'img1':'img2'">
            <img draggable="false" class="publicImg" :src="require('../assets/images/'+item.a)" alt />
            <div class="dayuhao" v-if="item.status==3">
              <span class="linearTxt">></span>
            </div>
            <img
              draggable="false"
              class="publicImg"
              :class="item.status==2?'publicImg2':item.status==3?'':''"
              :src="require('../assets/images/'+item.b)"
              alt
            />
          </div>
          <div v-if="item.status==2" class="img1">
            <img draggable="false" class="publicImg" :src="require('../assets/images/'+item.c)" alt />
            <img
              draggable="false"
              class="publicImg publicImg2"
              :src="require('../assets/images/'+item.d)"
              alt
            />
          </div>
        </div>
        <div class="rightInfo">
          <h3>
            <p>
              <span class="linearTxt">{{item.title}}</span>
            </p>
          </h3>
          <p class="info">{{item.content1}}</p>
          <p class="info" v-if="item.content2">{{item.content2}}</p>
          <p class="info" v-if="item.content3">{{item.content3}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      scrollTopNum: 0,
      //
      // 黑 黑桃 b
      // 黑 梅花 m
      // 红 方块 f
      // 红 红桃 h
      contentArr: [
        {
          a: "b1.png",
          b: "m1.png",
          status: 1,
          title: "ไพ่ A กับ A ",
          content1: "ไพ่ชนะทุกอย่างเรียงตามดอก เช่น โพดำ ชนะ หัวใจ"
        },
        {
          a: "b9.png",
          b: "b13.png",
          c: "h5.png",
          d: "m3.png",
          status: 2,
          title: "9 แต้ม 8 แต้ม",
          content1: "รองลงมาไพ่ 2 ใบบวกกันเท่ากับ 9 แต้มหรือ 8 แต้ม"
        },
        {
          a: "b13.png",
          b: "m11.png",
          c: "h10.png",
          d: "m10.png",
          status: 2,
          title: "ไพ่ 7.5 แต้ม",
          content1: "ไพ่ 2 ใบในมือเป็นกลุ่ม KQJ 10 2ใบ และ 5 2 ใบ",
          content2: "KK > KQ..>10/10>5/5"
        },
        {
          a: "b6.png",
          b: "m11.png",
          c: "b13.png",
          d: "h1.png",
          status: 2,
          title: "ไพ่ 7 ถึง 1 แต้ม",
          content1: "ไพ่ แต้ม ตั้งแต่ 1 แต้ม ถึง 7 แต้ม",
          content2: "เรียงตามค่าของ ตัวเลข เช่น 7 แต้ม",
          content3: "ชนะ 6 แต้ม"
        },
        {
          a: "b1.png",
          b: "m1.png",
          c: "f2.png",
          d: "h2.png",
          status: 2,
          title: "ไพ่เด้ง เงินคูณ 2",
          content1: "ไพ่ 2 ใบในมือเหมือนกัน",
          content2: "AA>KK …> 10/10>2/2"
        },
        {
          a: "b3.png",
          b: "b1.png",
          c: "h5.png",
          d: "h2.png",
          status: 2,
          title: "ไพ่เด้ง เงินคูณ",
          content1: "ไพ่ออกมาดอกเดียวกัน. และ สีเหมือนกัน"
        },
        {
          a: "b1.png",
          b: "m1.png",
          status: 3,
          title: "ตัวคุม",
          content1: "A เรียงลงมาถึง 2",
          content2: "โดย โพดำ ชนะหัวใจ",
          content3: "หัวใจ ชนะ ข้าวหลามตัด และข้าวหลามตัดชนะ ดอกจิก"
        }
      ],
      homeDiv:null,
    };
  },
  mounted() {
    let _this = this;
    this.homeDiv = this.$refs.homeDiv;
    this.homeDiv.onTouchMove = null;
    
 window.onscroll = function (e) {
        //htmlHeight 是网页的总高度
        var htmlHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
        //clientHeight是网页在浏览器中的可视高度，
        var clientHeight = document.body.clientHeight || document.documentElement.clientHeight;
        //scrollTop是浏览器滚动条的top位置，
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        //通过判断滚动条的top位置与可视网页之和与整个网页的高度来返回各项参数
        if (scrollTop + clientHeight == htmlHeight||scrollTop==0) {
            console.log("到顶了");
             try {
                e.stopPropagation(); //非IE浏览器
              } catch (e) {
                window.event.cancelBubble = true; //IE浏览器
              }
            if (e && e.preventDefault) {
              e.preventDefault(); //非IE浏览器
            } else {
              window.event.returnValue = false;//IE浏览器
            } 
        }else{
            console.log("离开顶端");
        }
}
this.homeDiv.addEventListener('mousewheel', function(e){
    //htmlHeight 是网页的总高度
        var htmlHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
        //clientHeight是网页在浏览器中的可视高度，
        var clientHeight = document.body.clientHeight || document.documentElement.clientHeight;
        //scrollTop是浏览器滚动条的top位置，
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        //通过判断滚动条的top位置与可视网页之和与整个网页的高度来返回各项参数
        if (scrollTop + clientHeight == htmlHeight||scrollTop==0) {
            console.log("到顶了");
             try {
                e.stopPropagation(); //非IE浏览器
              } catch (e) {
                window.event.cancelBubble = true; //IE浏览器
              }
            if (e && e.preventDefault) {
              e.preventDefault(); //非IE浏览器
            } else {
              window.event.returnValue = false;//IE浏览器
            } 
        }else{
            console.log("离开顶端");
        }
})
this.homeDiv.addEventListener('touchstart', function(e){
    //htmlHeight 是网页的总高度
        var htmlHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
        //clientHeight是网页在浏览器中的可视高度，
        var clientHeight = document.body.clientHeight || document.documentElement.clientHeight;
        //scrollTop是浏览器滚动条的top位置，
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        //通过判断滚动条的top位置与可视网页之和与整个网页的高度来返回各项参数
        if (scrollTop + clientHeight == htmlHeight||scrollTop==0) {
            console.log("到顶了");
             try {
                e.stopPropagation(); //非IE浏览器
              } catch (e) {
                window.event.cancelBubble = true; //IE浏览器
              }
            if (e && e.preventDefault) {
              e.preventDefault(); //非IE浏览器
            } else {
              window.event.returnValue = false;//IE浏览器
            } 
        }else{
            console.log("离开顶端");
        }
})
    // this.homeDiv.addEventListener("touchstart", function(e) {
      // e = window.event || e;
      // let t1 = document.documentElement.scrollTop || document.body.scrollTop;
      // _this.scrollTopNum =t1;

//       _this.homeDiv.addEventListener("touchmove", function(e) {
//         e = window.event || e;
        
// console.log("屏幕分辨率为："+screen.width+"*"+screen.height
// +"\n"+
// "屏幕可用大小："+screen.availWidth+"*"+screen.availHeight
// +"\n"+
// "网页可见区域宽："+document.body.clientWidth
// +"\n"+
// "网页可见区域高："+document.body.clientHeight
// +"\n"+
// "网页可见区域宽(包括边线的宽)："+document.body.offsetWidth 
// +"\n"+
// "网页可见区域高(包括边线的宽)："+document.body.offsetHeight 
// +"\n"+
// "屏幕分辨率的高："+window.screen.height
// +"\n"+
// "屏幕分辨率的宽："+window.screen.width
// +"\n"+
// "屏幕可用工作区高度："+window.screen.availHeight
// +"\n"+
// "屏幕可用工作区宽度："+window.screen.availWidth)
        // alert("b")
        // console.log("查看数值",e.target.scrollTop)
        // document.body.scrollTop = document.documentElement.scrollTop = e.target.scrollTop;
        // let t2 = document.documentElement.scrollTop || document.body.scrollTop;
        // _this.scrollTopNum =t2;
      // },false);
    // });
  },
  // methods: {
  //   move(e){
  //     e = window.event || e;
  //     // if (e && e.preventDefault) {
  //       e.preventDefault(); //非IE浏览器
  //     // } else {
  //       // window.event.returnValue = false;
  //     // } //IE浏览器
  //   }
  // },
  // watch: {
  //   scrollTopNum(n,o){
  //     if (n==0&&o==0&&n<=o) {
  //       this.move();
        
  //     }
  //   }
  // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("../assets/css/home.css");
</style>
