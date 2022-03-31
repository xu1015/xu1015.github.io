<template>
  <div class="food_container">
    <div class="head_top">
      <section class="head_goback">
        <strong @click="prev()">
          <i class="el-icon-arrow-left"></i>
        </strong>
        <div class="text">
          <span>{{$route.query.title}}</span>
        </div>
      </section>
    </div>
    <!-- 导航部分 -->
    <div class="nav">
      <div v-if="!showCate1" @click="changeStatus()" class="com">
        {{$route.query.title}}
        <i class="el-icon-caret-bottom"></i>
      </div>

      <div v-else @click="changeStatus()" class="cate_title com">
        分类
        <i class="el-icon-caret-top"></i>
      </div>

      <div @click="changeSort()" class="sort com" :class="showCate2==true?'cate_title com':''">
        排序
        <i v-if="!showCate2" class="el-icon-caret-bottom"></i>
        <i v-else class="el-icon-caret-top"></i>
      </div>

      <div @click="changeFilter()" class="filter" :class="showCate3==true?'cate_title com':''">
        筛选
        <i v-if="!showCate3" class="el-icon-caret-bottom"></i>
        <i v-else class="el-icon-caret-top"></i>
      </div>
    </div>
    <!-- 食品分类部分 -->
    <transition name="cate_list">
      <!-- 第一套动画 -->
      <div v-if="showCate1" class="cate_con">
        <!-- 左边循环 -->
        <div class="left">
          <ul>
            <li
              class="lii"
              v-for="(l1,index) in typeList"
              :key="index"
              @click="configLeft(index,l1.name)"
              :class="l1.name==l1nameStatus?'category_active':''"
            >
              <img :src="handleOpen(l1.image_url)" alt>
              <span>{{l1.name}}</span>
              <div class="count">{{l1.count}}</div>
              <i class="el-icon-arrow-right icon-l"></i>
            </li>
          </ul>
        </div>
        <!-- 右边循环 -->
        <div class="right">
          <ul class="rightUl">
            <div v-if="lnameShow">
              <li
                v-for="(l,index) in categories"
                :key="index"
                @click="setCategories1(l)"
                :class="l.name==lnameStatus?'cate_title':''"
                
              >
                <span>{{l.name}}</span>
                <span>{{l.count}}</span>
              </li>

            </div>
          </ul>
        </div>
      </div>

      <!-- 第二套动画 -->
      <div v-if="showCate2" class="cate_con">
        <ul class="sort_list_container">
          <li
            v-for="(sortItem,index) in sortData"
            :key="index"
            class="sort_list_li"
            @click="setCategories2(sortItem.id)"
          >
            <img :src="sortItem.url" alt>
            <p>
              <span :class="sortItem.id==sortItemStatus?'cate_title':''">{{sortItem.name}}</span>
              <img v-if="sortItem.id==sortItemStatus" src="../img/right.png" alt>
            </p>
          </li>
        </ul>
      </div>

      <!-- 第三套动画 -->
      <div v-if="showCate3" class="cate_con">
        <section class="filter_container">
          <section style="width: 100%;">
            <header class="filter_header_style">配送方式</header>
            <ul class="filter_ul">
              <li class="filter_li" @click="setfilterStatus(!filterFeeBirdStatus,1)">
                <img v-if="filterFeeBirdStatus" src="../img/right.png" alt>
                <img v-else src="../img/feeBird.png" alt>
                <span :class="filterFeeBirdStatus==true?'cate_title':''">蜂鸟快送</span>
              </li>
            </ul>
          </section>
          <section style="width: 100%;">
            <header class="filter_header_style">商家属性(可以多选)</header>
            <ul class="filter_ul" style="padding-bottom: 0.5rem;">
              <li class="filter_li" @click="setfilterStatus(!filterShopAttrPINStatus,8)">
                <img
                  v-if="filterShopAttrPINStatus==true"
                  src="../img/right.png"
                  alt
                  class="activity_svg"
                >
                <span
                  v-else
                  class="filter_icon"
                  style="color: rgb(63, 189, 230); border-color: rgb(63, 189, 230);"
                >品</span>
                <span :class="filterShopAttrPINStatus==true?'cate_title':''">品牌商家</span>
              </li>

              <li class="filter_li" @click="setfilterStatus(!filterShopAttrBAOStatus,7)">
                <img
                  v-if="filterShopAttrBAOStatus==true"
                  src="../img/right.png"
                  alt
                  class="activity_svg"
                >
                <span
                  v-else
                  class="filter_icon"
                  style="color: rgb(153, 153, 153); border-color: rgb(153, 153, 153);"
                >保</span>
                <span :class="filterShopAttrBAOStatus==true?'cate_title':''">外卖保</span>
              </li>

              <li class="filter_li" @click="setfilterStatus(!filterShopAttrZHUNStatus,9)">
                <img
                  v-if="filterShopAttrZHUNStatus==true"
                  src="../img/right.png"
                  alt
                  class="activity_svg"
                >
                <span
                  v-else
                  class="filter_icon"
                  style="color: rgb(87, 169, 255); border-color: rgb(87, 169, 255);"
                >准</span>
                <span :class="filterShopAttrZHUNStatus==true?'cate_title':''">准时达</span>
              </li>

              <li class="filter_li" @click="setfilterStatus(!filterShopAttrXINStatus,5)">
                <img
                  v-if="filterShopAttrXINStatus==true"
                  src="../img/right.png"
                  alt
                  class="activity_svg"
                >
                <span
                  v-else
                  class="filter_icon"
                  style="color: rgb(232, 132, 45); border-color: rgb(232, 132, 45);"
                >新</span>
                <span :class="filterShopAttrXINStatus==true?'cate_title':''">新店</span>
              </li>

              <li class="filter_li" @click="setfilterStatus(!filterShopAttrFUStatus,3)">
                <img
                  v-if="filterShopAttrFUStatus==true"
                  src="../img/right.png"
                  alt
                  class="activity_svg"
                >
                <span
                  v-else
                  class="filter_icon"
                  style="color: rgb(255, 78, 0); border-color: rgb(255, 78, 0);"
                >付</span>
                <span :class="filterShopAttrFUStatus==true?'cate_title':''">在线支付</span>
              </li>

              <li class="filter_li" @click="setfilterStatus(!filterShopAttrPIAOStatus,4)">
                <img
                  v-if="filterShopAttrPIAOStatus==true"
                  src="../img/right.png"
                  alt
                  class="activity_svg"
                >
                <span
                  v-else
                  class="filter_icon"
                  style="color: rgb(153, 153, 153); border-color: rgb(153, 153, 153);"
                >票</span>
                <span :class="filterShopAttrPIAOStatus==true?'cate_title':''">开发票</span>
              </li>
            </ul>
          </section>
          <footer class="confirm_filter">
            <div class="clear_all filter_button_style" @click="clearsetfilterStatus()">清空</div>
            <div class="confirm_select filter_button_style" @click="setCategories3()">
              确定
              <span v-if="filterShopAttrNum!=0">({{filterShopAttrNum}})</span>
            </div>
          </footer>
        </section>
      </div>
    </transition>

    <div class="shoplist">
      <ul>
        <li
          @click="goShopDetailInfo(item.id)"
          v-for="(item,index) in shops"
          :key="index"
          class="shop_li"
        >
          <section>
            <img :src="'//elm.cangdu.org/img/'+item.image_path" alt>
          </section>
          <div class="shop_right">
            <header class="shop_detail_header">
              <h4 class="shop_detail_headerH4 ellipsis">{{item.name}}</h4>
              <ul>
                <li v-for="(itemtwo,index) in item.supports" :key="index">{{itemtwo.icon_name}}</li>
              </ul>
            </header>
            <h5 class="rating_order_num">
              <section class="rating_order_num_left">
                <section class="rating_section">
                  <el-rate
                    class="rate"
                    v-model="item.rating"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                  ></el-rate>
                </section>
                <section class="order_section">月售{{item.recent_order_num}}单</section>
              </section>
              <section class="rating_order_num_right">
                <span class="delivery_left">蜂鸟专送</span>
                <span class="delivery_right">准时达</span>
              </section>
            </h5>
            <h5 class="fee_distance">
              <p class="fee">
                ¥
                <span>{{item.float_minimum_order_amount}}</span>起送/配送费约¥
                <span>{{item.float_delivery_fee}}</span>
              </p>
              <p class="distance_time">
                <span>{{item.distance}}</span>
                <span>/</span>
                <span>{{item.order_lead_time}}</span>
              </p>
            </h5>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "food",
  data() {
    return {
      typeList: [],
      showCate1: false,
      showCate2: false,
      showCate3: false,
      categories: [],
      //商家数据
      shops: [],
      //获取食品类型的数据
      foodType1: [],
      foodType2: [],
      //经纬度转换数组
      geoHashList: localStorage.Comgeohash.split(","),

      //第一套动画左边样式的状态
      l1nameStatus: this.$route.query.title,
      // 第一套动画右边样式状态
      lnameStatus: "",
      // 第一套动画右边显隐状态
      lnameShow: false,

      // 第二套动画样式状态
      sortItemStatus: 0,

      // 第三套动画配送方式样式状态
      filterFeeBirdStatus: false,
      // 第三套动画商家属性 品 状态
      filterShopAttrPINStatus: false,
      // 第三套动画商家属性 保 状态
      filterShopAttrBAOStatus: false,
      // 第三套动画商家属性 准 状态
      filterShopAttrZHUNStatus: false,
      // 第三套动画商家属性 新 状态
      filterShopAttrXINStatus: false,
      // 第三套动画商家属性 付 状态
      filterShopAttrFUStatus: false,
      // 第三套动画商家属性 票 状态
      filterShopAttrPIAOStatus: false,

      // 第三套动画商家属性状态总数
      filterShopAttrNum: 0,

      // 第三套动画准备提交的商家配送方式
      filterShopdelivery_mode: [],
      // 第三套动画准备提交的商家支持特权的id
      filterShopsupport_ids: [],
      //排序数据
      sortData: [
        { name: "智能排序", url: require("../img/sort.png"), id: 4 },
        { name: "距离最近", url: require("../img/location.png"), id: 5 },
        { name: "销量最高", url: require("../img/fire.png"), id: 6 },
        { name: "起送价最低", url: require("../img/price.png"), id: 1 },
        { name: "配送速度最快", url: require("../img/time.png"), id: 2 },
        { name: "评分最高", url: require("../img/star.png"), id: 3 }
      ]
    };
  },
  created() {
    console.log(this.$route.query.title);

    // 获取商铺列表
    this.getshopList();
    // 获取分类商铺列表
    this.gettypeList();
  },
  methods: {
    goShopDetailInfo(id){
      this.$router.push({name:"shop",query:{id}})
    },
    //第一套动画动画有条件的请求商家信息
    setCategories1(l) {
      //修改第一套动画修改请求总状态条件
      this.showCate1 = !this.showCate1;

      this.lnameStatus = l.name;
      console.log("传回来的参数", l);
      let arrId = [l.id];
      this.$http({
        method: "get",
        url: "https://elm.cangdu.org/shopping/restaurants",
        params: {
          latitude: this.geoHashList[0],
          longitude: this.geoHashList[1],
          restaurant_category_ids: arrId
        },
        //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
        withCredentials: true // 默认false
      }).then(res => {
        console.log("根据条件获取得商铺列表", res.data);
        if (res.data != undefined) {
          this.shops = res.data;
        }
      });
    },
    //第二套动画动画有条件的请求商家信息
    setCategories2(index) {
      // 修改第二套动画显隐状态
      this.showCate2 = !this.showCate2;
      console.log("第二套动画修改状态条件name", index);
      this.sortItemStatus = index;
      this.$http({
        method: "get",
        url: "https://elm.cangdu.org/shopping/restaurants",
        params: {
          latitude: this.geoHashList[0],
          longitude: this.geoHashList[1],
          order_by: index
        },
        //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
        withCredentials: true // 默认false
      }).then(res => {
        console.log("根据条件获取得商铺列表", res.data);
        this.shops = res.data;
      });
    },
    //清空第三套动画修改状态条件以及状态总数
    clearsetfilterStatus() {
      // 第三套动画配送方式样式状态
      this.filterFeeBirdStatus = false;
      // 第三套动画商家属性 品 状态
      this.filterShopAttrPINStatus = false;
      // 第三套动画商家属性 保 状态
      this.filterShopAttrBAOStatus = false;
      // 第三套动画商家属性 准 状态
      this.filterShopAttrZHUNStatus = false;
      // 第三套动画商家属性 新 状态
      this.filterShopAttrXINStatus = false;
      // 第三套动画商家属性 付 状态
      this.filterShopAttrFUStatus = false;
      // 第三套动画商家属性 票 状态
      this.filterShopAttrPIAOStatus = false;
      // 第三套动画商家属性状态总数
      this.filterShopAttrNum = 0;
    },
    //第三套动画修改状态条件以及状态总数
    setfilterStatus(index, id) {
      // this.filterShopAttrNum=0;
      if (id == 1) {
        this.filterFeeBirdStatus = index;
        if (this.filterFeeBirdStatus == true) {
          this.filterShopAttrNum += 1;
          this.filterShopdelivery_mode.push(id);
          console.log(this.filterShopdelivery_mode);
        } else {
          this.filterShopAttrNum -= 1;
          this.filterShopdelivery_mode.pop(id);
          console.log(this.filterShopdelivery_mode);
        }
      }
      // 第三套动画商家属性 付 状态
      if (id == 3) {
        this.filterShopAttrFUStatus = index;
        if (this.filterShopAttrFUStatus == true) {
          this.filterShopAttrNum += 1;
          this.filterShopsupport_ids.push(id);
        } else {
          this.filterShopAttrNum -= 1;
          this.filterShopsupport_ids.pop(id);
        }
      }
      // 第三套动画商家属性 票 状态
      if (id == 4) {
        this.filterShopAttrPIAOStatus = index;
        if (this.filterShopAttrPIAOStatus == true) {
          this.filterShopAttrNum += 1;
          this.filterShopsupport_ids.push(id);
        } else {
          this.filterShopAttrNum -= 1;
          this.filterShopsupport_ids.pop(id);
        }
      }
      // 第三套动画商家属性 新 状态
      if (id == 5) {
        this.filterShopAttrXINStatus = index;
        if (this.filterShopAttrXINStatus == true) {
          this.filterShopAttrNum += 1;
          this.filterShopsupport_ids.push(id);
        } else {
          this.filterShopAttrNum -= 1;
          this.filterShopsupport_ids.pop(id);
        }
      }
      // 第三套动画商家属性 保 状态
      if (id == 7) {
        this.filterShopAttrBAOStatus = index;
        if (this.filterShopAttrBAOStatus == true) {
          this.filterShopAttrNum += 1;
          this.filterShopsupport_ids.push(id);
        } else {
          this.filterShopAttrNum -= 1;
          this.filterShopsupport_ids.pop(id);
        }
      }
      // 第三套动画商家属性 品 状态
      if (id == 8) {
        this.filterShopAttrPINStatus = index;
        if (this.filterShopAttrPINStatus == true) {
          this.filterShopAttrNum += 1;
          this.filterShopsupport_ids.push(id);
        } else {
          this.filterShopAttrNum -= 1;
          this.filterShopsupport_ids.pop(id);
        }
      }
      // 第三套动画商家属性 准 状态
      if (id == 9) {
        this.filterShopAttrZHUNStatus = index;
        if (this.filterShopAttrZHUNStatus == true) {
          this.filterShopAttrNum += 1;
          this.filterShopsupport_ids.push(id);
        } else {
          this.filterShopAttrNum -= 1;
          this.filterShopsupport_ids.pop(id);
        }
      }
      console.log("第三套动画修改后的单状态", index);
    },
    //第三套动画有条件的请求商家信息
    setCategories3() {
      // 修改第三套动画显隐状态
      this.showCate3 = !this.showCate3;
      console.log(
        "第三套动画准备提交的商家配送方式",
        this.filterShopdelivery_mode
      );
      console.log(
        "第三套动画准备提交的商家支持特权的id",
        this.filterShopsupport_ids
      );
      this.$http({
        method: "get",
        url: "https://elm.cangdu.org/shopping/restaurants",
        params: {
          latitude: this.geoHashList[0],
          longitude: this.geoHashList[1],
          delivery_mode: this.filterShopdelivery_mode,
          support_ids: this.filterShopsupport_ids
        },
        //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
        withCredentials: true // 默认false
      }).then(res => {
        console.log("根据条件获取得商铺列表", res.data);
        // if (res.data != undefined) {
        this.shops = res.data;
        // console.log("商铺列表",this.shops);
        // }
      });
    },
    // 获取商铺列表
    getshopList() {
      const url =
        "https://elm.cangdu.org/shopping/restaurants?latitude=" +
        this.geoHashList[0] +
        "&longitude=" +
        this.geoHashList[1];
      this.$http({
        method: "get",
        url: url,
        //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。不使用缓存数据
        withCredentials: true // 默认false
      }).then(res => {
        // console.log("商铺列表",res.data);
        if (res.data != undefined) {
          this.shops = res.data;
          // console.log("商铺列表",this.shops);
        }
      });
    },
    configLeft(index, name1) {
      console.log("configLeft方法", index);
      this.categories = this.typeList[index].sub_categories.slice(1);
      this.l1nameStatus = name1;
      this.lnameShow = true;
    },
    prev() {
      this.$router.go(-1);
    },
    cate() {},
    // 获取分类商铺列表
    gettypeList() {
      const url = "https://elm.cangdu.org/shopping/v2/restaurant/category";
      this.$http({
        method: "get",
        url: url,
        withCredentials: true
      }).then(res => {
        // console.log("分类列表", res.data);
        this.typeList = res.data;
        this.categories = this.typeList[0].sub_categories.slice(1);
      });
    },
    handleOpen(urlText) {
      if (urlText) {
        // console.log(urlText);
        let url = "https://fuss10.elemecdn.com/";
        if (urlText.slice(-3) == "png") {
          urlText += ".png";
        } else {
          urlText += ".jpeg";
        }
        urlText = url + urlText;
      } else {
        urlText = "//elm.cangdu.org/img/default.jpg";
        // console.log("ccc");
      }
      return urlText;
    },

    changeStatus() {
      this.showCate1 = !this.showCate1;
      this.showCate2 = false;
      this.showCate3 = false;
    },
    changeSort() {
      this.showCate1 = false;
      this.showCate2 = !this.showCate2;
      this.showCate3 = false;
    },
    changeFilter() {
      this.showCate1 = false;
      this.showCate2 = false;
      this.showCate3 = !this.showCate3;
    }
  }
};
</script>

<style scoped>
.food_container {
  padding-top: 3.6rem;
}
.head_top {
  background-color: #3190e8;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 1.95rem;
}
.head_goback {
  left: 0.4rem;
  width: 0.6rem;
  height: 1rem;
  line-height: 2.2rem;
  margin-left: 0.4rem;
}
.head_top strong i {
  font-size: 1rem;
  margin-top: 0.5rem;
  color: #fff;
}
.text {
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.8rem;
  color: #fff;
  text-align: center;
}
.text span {
  font-weight: 700;
}
.nav {
  width: 100%;
  position: fixed;
  top: 1.95rem;
  height: 1.6rem;
  background: #fff;
  display: flex;
  z-index: 13;
  align-items: center;
  box-sizing: border-box;
}
.com {
  width: 33.3%;
  text-align: center;
  height: 1rem;
  font-size: 0.6rem;
  line-height: 1rem;
  border-right: 0.025rem solid #e4e4e4;
  color: rgb(107, 106, 106);
}
.filter {
  width: 33.3%;
  text-align: center;
  height: 1rem;
  color: rgb(107, 106, 106);
  font-size: 0.6rem;
  line-height: 1rem;
}
.active {
  color: pink;
}
/* 分类商铺列表 */
.cate_con {
  width: 100%;
  position: fixed;
  z-index: 10;
  top: 3.5rem;
}
.left {
  width: 50%;
  flex: 1;
  background-color: #f1f1f1;
  height: 16rem;
  overflow-y: auto;
}
.left li {
  display: flex;
  padding: 0.39rem;
}
.left img {
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.2rem;
}
.left span {
  font-size: 0.5rem;
  line-height: 1rem;
  color: #666;
}
.count {
  background-color: #ccc;
  font-size: 0.4rem;
  color: #fff;
  padding: 0.1rem;
  border: 0.025rem solid #ccc;
  border-radius: 0.8rem;
  vertical-align: middle;
  position: absolute;
  right: 55%;
}
.icon-l{
  position: absolute;
  right: 51%;
}
.left i {
  margin-top: 0.2rem;
  margin-left: 0.2rem;
  color: #ccc;
}

.left .category_active {
  background-color: #fff;
}
.right {
  width: 50%;
  flex: 1;
  background-color: #fff;
  height: 16rem;
  overflow-y: auto;
}
.right li {
  padding-left: 0.5rem;
  background: #fff;
}
.right li {
  display: flex;
  justify-content: space-between;
  height: 1.8rem;
  line-height: 1.8rem;
  padding-right: 0.5rem;
  border-bottom: 0.025rem solid #e4e4e4;
  font-size: 0.6rem;
  color: #666;
}
.right::-webkit-scrollbar {
  width: 0px;
}

/* cate_list显隐动画 */
cate_list {
  background: rgba(71, 69, 69, 0.2);
  height: 100rem;
}
.cate_list-enter {
  /* 定义动画初始值:瞬间删除 */
  opacity: 0;
  height: 0px;
  transform: translateY(-200px);
}
.cate_list-enter-active {
  transition: all 0.3s;
}
/* 离开 */
.cate_list-leave-active {
  transition: all 0.3s;
}
.cate_list-leave-to {
  /* 最终的值 */
  height: 0;
  transform: translateY(-200px);
  opacity: 0;
}
.sort_list_container {
  width: 100%;
  background: #fff;
}
.sort_list_li {
  height: 2.5rem;
  display: flex;
  align-items: center;
}
.sort_list_li img {
  width: 0.7rem;
  height: 0.7rem;
  margin: 0 0.3rem 0 0.8rem;
}
.sort_list_li p {
  line-height: 2.5rem;
  flex: auto;
  text-align: left;
  text-indent: 0.25rem;
  border-bottom: 0.025rem solid #e4e4e4;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sort_list_li p span {
  color: #666;
  font-size: 0.55rem;
}
.filter_container {
  flex-direction: column;
  align-items: flex-start;
  min-height: 10.6rem;
  background-color: #f1f1f1;
}
.filter_header_style {
  font-size: 0.4rem;
  color: #333;
  line-height: 1.5rem;
  height: 1.5rem;
  text-align: left;
  padding-left: 0.5rem;
  background-color: #fff;
}
.filter_ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0 0.5rem;
  background-color: #fff;
}
.filter_li {
  display: flex;
  align-items: center;
  border: 0.025rem solid #eee;
  width: 4.7rem;
  height: 1.4rem;
  margin-right: 0.25rem;
  border-radius: 0.125rem;
  padding: 0 0.25rem;
  margin-bottom: 0.25rem;
}
.filter_li img {
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.125rem;
}
.filter_li span {
  font-size: 0.4rem;
  color: #333;
}
.filter_header_style {
  font-size: 0.4rem;
  color: #333;
  line-height: 1.5rem;
  height: 1.5rem;
  text-align: left;
  padding-left: 0.5rem;
  background-color: #fff;
}
.filter_ul {
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding: 0 0.5rem;
  background-color: #fff;
}
.filter_li {
  display: flex;
  align-items: center;
  border: 0.025rem solid #eee;
  width: 4.7rem;
  height: 1.4rem;
  margin-right: 0.25rem;
  border-radius: 0.125rem;
  padding: 0 0.25rem;
  margin-bottom: 0.25rem;
  box-sizing: border-box;
}
.filter_li span {
  font-size: 0.4rem;
  color: #333;
}
.filter_icon {
  width: 0.8rem;
  height: 0.8rem;
  font-size: 0.5rem;
  border: 0.025rem solid #e4e4e4;
  border-radius: 0.15rem;
  margin-right: 0.25rem;
  line-height: 0.8rem;
  text-align: center;
}
.confirm_filter {
  display: flex;
  background-color: #f1f1f1;
  width: 100%;
  padding: 0.3rem 0.2rem;
  box-sizing: border-box;
}
.clear_all {
  background-color: #fff;
  margin-right: 0.5rem;
  border: 0.025rem solid #fff;
}
.filter_button_style {
  width: 50%;
  height: 1.8rem;
  font-size: 0.8rem;
  line-height: 1.8rem;
  border-radius: 0.2rem;
  text-align: center;
}
.confirm_select {
  background-color: #56d176;
  color: #fff;
  border: 0.025rem solid #56d176;
}
.confirm_filter .confirm_select span {
  color: #fff;
}
.cate_title {
  color: #3190e8 !important;
}
.activity_svg {
  margin-right: 0.3rem !important;
}

/* 所有店家的样式 */
.shoplist {
  margin-bottom: 1.95rem;
}
.shop_header_title {
  height: 1.6rem;
  line-height: 1.6rem;
  display: inline-block;
  font-size: 0.55rem;
  color: #999;
}
.shop_header_title img {
  width: 0.6rem;
  vertical-align: middle;
  margin-left: 0.6rem;
  margin-right: 0.3rem;
}
/* 商家整体信息 */
.shop_li {
  padding: 0.7rem 0.4rem;
  display: flex;
  border-bottom: 0.025rem solid #f1f1f1;
}
/* 商家整体信息左边 */
.shop_li section img {
  width: 2.7rem;
  margin-right: 0.4rem;
}
/* 商家整体信息右边 */
.shop_right {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
}
/* 商家整体信息右边头部 */
.shop_detail_headerH4:before {
  content: "品牌";
  display: inline-block;
  font-size: 0.5rem;
  line-height: 0.6rem;
  color: #333;
  background-color: #ffd930;
  padding: 0 0.1rem;
  border-radius: 0.1rem;
  margin-right: 0.2rem;
}
.shop_detail_header li {
  font-size: 0.5rem;
  color: #999;
  border: 0.025rem solid #f1f1f1;
  padding: 0 0.04rem;
  border-radius: 0.08rem;
  margin-left: 0.05rem;
}
.shop_detail_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.shop_detail_headerH4 {
  width: 8.5rem;
  color: #333;
  padding-top: 0.01rem;
  font-weight: 700;
  font-size: 0.65rem;
}
.shop_detail_header ul {
  display: flex;
  transform: scale(0.8);
  margin-right: -0.3rem;
}
.shop_detail_header ul li {
  font-size: 0.5rem;
  color: #999;
}
/* 商家整体信息右边中部 */
.rating_order_num {
  display: flex;
  justify-content: space-between;
  height: 0.6rem;
  margin-top: 0.52rem;
}
.rating_order_num_left {
  display: flex;
  justify-content: flex-start;
}
.rating_section {
  display: inline-block;
  margin-left: -0.9rem;
  transform: scale(0.7);
  vertical-align: top;
}
.order_section {
  font-size: 0.4rem;
  margin-left: -0.9rem;
  transform: scale(0.8);
  color: #666;
  display: flex;
}
.rate {
  height: 0.6rem;
  line-height: 0.6rem;
}
.rating_order_num_right {
  display: flex;
  align-items: center;
  transform: scale(0.7);
  min-width: 5rem;
  justify-content: flex-end;
  margin-right: -0.8rem;
}
.delivery_left {
  color: #fff;
  background-color: #3190e8;
  border: 0.025rem solid #3190e8;
  font-size: 0.4rem;
  padding: 0.04rem 0.08rem 0;
  border-radius: 0.08rem;
  margin-left: 0.08rem;
}
.delivery_right {
  color: #3190e8;
  border: 0.025rem solid #3190e8;
}
/* 商家整体信息右边尾部 */
.fee_distance {
  margin-top: 0.52rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.5rem;
  color: #333;
}
.fee {
  transform: scale(0.9);
  font-size: 0.5rem;
  color: #666;
}
.distance_time {
  transform: scale(0.9);
}
.distance_time span:nth-of-type(1) {
  color: #999;
}
.distance_time span:nth-of-type(2) {
  color: #ccc;
}
.distance_time span:nth-of-type(3) {
  color: #3190e8;
}
</style>
