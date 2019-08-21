<template>
<!-- <div class="sliderBor"> -->
  <div class="slider" ref="slider">
    <div class="process color1" :style="{width}"></div>
    <div class="thunk zIndex1" ref="trunk" :style="{left}" >
      <div class="block"></div>
      <div class="tips">
        <span>{{Math.floor(scale*100+0.5) }}</span>
        <i class="fas fa-caret-down"></i>
      </div>
    </div>


    <div class="process " :style="{width:processWidth1}"></div>
    <div class="thunk zIndex1" ref="trunk" :style="{left:thunkLeft}">
      <div class="block"></div>
      <div class="tips">
        <span>{{Math.floor(progressScale*100+0.5) }}</span>
        <i class="fas fa-caret-down"></i>
      </div>
    </div>
</div>
</template>
<script>
/*
 * min 进度条最小值
 * max 进度条最大值
 * v-model 对当前值进行双向绑定实时显示拖拽进度
 * */
export default {
  props: ["min", "max", "value"],
  data() {
    return {
      slider: null, //滚动条DOM元素
      thunk: null, //拖拽DOM元素
      per: this.value, //当前值
      // 中间状态
      processWidth1:0+"px",
      progressScale:0,
      thunkLeft:-10+"px"
    };
  },
  //渲染到页面的时候
  mounted() {
    // 滑动条DOM节点
    this.slider = this.$refs.slider;
    console.log("this.slider",this.slider)
    // 拖动图标DOM节点
    this.thunk = this.$refs.trunk;
    var _this = this;
    this.thunk.onmousedown = function(e) {
      var width = parseInt(_this.width);
      var disX = e.clientX;
      document.onmousemove = function(e) {
        // value, left, width
        // 当value变化的时候，会通过计算属性修改left，width

        // 拖拽的时候获取的新width
        var newWidth = e.clientX - disX + width;
        // 拖拽的时候得到新的百分比
        var scale = newWidth / _this.slider.offsetWidth;
        if (scale<0) {
          console.log("小于0了");
          scale=0
        }
        this.progressScale = scale
        console.log("scale1",scale);
        _this.per = Math.ceil((_this.max - _this.min) * scale + _this.min);
        _this.per = Math.max(_this.per, _this.min);
        _this.per = Math.min(_this.per, _this.max);
      };
      document.onmouseup = function() {
        console.log("offsetWidth",_this.slider.offsetWidth);
        console.log("progressScale",this.progressScale);
        _this.processWidth1 = _this.slider.offsetWidth * this.progressScale + "px";
        _this.thunkLeft = _this.slider.offsetWidth * this.progressScale -_this.thunk.offsetWidth / 2 +"px"
        console.log("scale2",this.progressScale);
        console.log("processWidth1",_this.processWidth1);
        console.log("thunkLeft",_this.thunkLeft);
        document.onmousemove = document.onmouseup = null;
      };
      return false;
    };
    // this.thunk.onmouseup = function(e) {
    //   // 拖拽的时候获取的新width
    //     var newWidth = e.clientX - disX + width;
    //     // 拖拽的时候得到新的百分比
    //     var scale = newWidth / _this.slider.offsetWidth;
      
    //     this.processWidth1 = this.slider.offsetWidth * this.scale + "px";
    //     document.onmousemove = document.onmouseup = null;
    // };
  },
  watch: {
    processWidth1(o,n){
      console.log("新",o)
      console.log("旧",n)
    }
  },
  computed: {
    // 设置一个百分比，提供计算slider进度宽度和trunk的left值
    // 对应公式为  当前值-最小值/最大值-最小值 = slider进度width / slider总width
    // trunk left =  slider进度width + trunk宽度/2
    scale() {
      var a=(this.per - this.min) / (this.max - this.min)
      // console.log("aaaaa",a);
      
      return ((this.per - this.min) / (this.max - this.min));
    },
    width() {
      if (this.slider) {
        // console.log("有slider");
        return this.slider.offsetWidth * this.scale + "px";
      } else {
        // console.log("无slider");
        return 0 + "px";
      }
    },
    // width1() {
    //   if (this.slider.offsetWidth * this.scale>0) {
    //     console.log("有slider");
    //     return this.slider.offsetWidth * this.scale + "px";
    //   } else {
    //     console.log("无slider");
    //     return 0 + "px";
    //   }
    // },
    left() {
      if (this.slider) {
        return (
          this.slider.offsetWidth * this.scale -
          this.thunk.offsetWidth / 2 +
          "px"
        );
      } else {
        return 0 + "px";
      }
    }
  }
};
</script>
<style>
.box {
  margin: 100px auto 0;
  width: 80%;
}
.clear:after {
  content: "";
  display: block;
  clear: both;
}

.slider {
  position: relative;
  margin: 20px 0;
  width: 400px;
  height: 30px;
  /* background: url('../../assets/images/test01/progress_bg1.png')repeat-x; */
  background: red;
  /* background-size: 90%; */
  border-top: 2px solid #666;
  border-bottom: 2px solid #666;
  cursor: pointer;
  box-sizing: border-box;
}
.slider .process {
  position: absolute;
  left: 0;
  top: 5px;
  width: 112px;
  height: 16px;
  /* padding: 5px 0; */
  /* border-radius: 5px; */
  background: #409eff;
}
.slider .color1 {
  background: #8bbdf0;  
}
.slider .zIndex1 {
  z-index: 100; 
}
.slider .zIndex2 {
  z-index: 500; 
}
.slider .zIndex3 {
  z-index: 800; 
}
.slider .zIndex4 {
  z-index: 1000; 
}
.slider .thunk {
  position: absolute;
  left: 100px;
  top: 3px;
  width: 20px;
  height: 20px;
}
.slider .block {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #409eff;
  background: rgba(255, 255, 255, 1);
  transition: 0.2s all;
}
.slider .tips {
  position: absolute;
  left: -7px;
  bottom: 30px;
  min-width: 15px;
  text-align: center;
  padding: 4px 8px;
  background: #000;
  border-radius: 5px;
  height: 24px;
  color: #fff;
}
.slider .tips i {
  position: absolute;
  margin-left: -5px;
  left: 50%;
  bottom: -9px;
  font-size: 16px;
  color: #000;
}
.slider .block:hover {
  transform: scale(1.1);
  opacity: 0.6;
}
</style>