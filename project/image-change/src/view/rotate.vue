<template>
  <div class="homeDiv" id="homeDiv">
    <div class="uploadDiv">
      <div class="topInput">初始下标: <input type="text" v-model.number="beginIndex" :disabled="isControl" oninput="value=value.replace(/[^\d]/g,'')" placeholder="需要小一位"></div>
      <div class="topInput">文件长度: <input type="text" v-model.number="imgLength" :disabled="isControl" oninput="value=value.replace(/[^\d]/g,'')" placeholder="需要小一位"></div>
      <div class="upload">
        <p>修改的文件</p>
        <input class="file" type="file" ref="file" @change="getFileData" multiple="multiple">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "home",
  data() {
    return {
      // 遍历的下标
      imgNum:0,
      // 选中的文件个数
      filesLength:0,
      // 选中文件个数是几位数
      imgLength:4,
      // 文件开始下标
      beginIndex:0,
      // 控制是否可输入
      isControl:false,
    }
  },
  watch:{
    imgNum(n,o){
      let isBianli = n==0&&o==this.filesLength;
      console.log("查看是否符合条件",isBianli)
      if (this.filesLength>n&&!isBianli) {
        this.getFileData()
      }else{
        // debugger;
        this.imgNum=0;
        this.filesLength=0;
        this.beginIndex=0;
        this.isControl=false;
      }
    },
  },
  methods: {
    getFileData() {
      this.isControl=true;
      console.log("查看信息", this.$refs.file.files)
      // 获取文件列表
      let files = this.$refs.file.files;
      // 获取文件列表长度
      this.filesLength = files.length;

      if (this.filesLength>this.imgNum) {
        var type = files[this.imgNum].type.split('/')[0]
        if (type === 'image') {
          var reader = new FileReader();
          reader.readAsDataURL(files[this.imgNum])
          console.log("第"+this.imgNum+"次",reader)
          var that = this;
          reader.onloadend = function () {
            var dataURL = reader.result;
            const img = new Image()
            img.src = dataURL;
            img.onload=function() {
              const imgW = img.width ;
              const imgH = img.height;
              var canvas = document.createElement("canvas");
              canvas.width = imgH ;
              canvas.height = imgW;
              var ctx = canvas.getContext('2d');
              ctx.rotate(-90*Math.PI/180);
              ctx.translate(-imgW,0);
              ctx.drawImage(img,0,0)
              // var home = document.getElementById("homeDiv");
              // home.append(canvas)
              let dataURL1 = canvas.toDataURL("image/jpeg")

              that.downloadImg(dataURL1,that.imgNum+that.beginIndex + 1, that.imgLength)
            }
          }
        }
      }
    },
    // base64转blob格式
    convertBase64UrlToBlob(base64) {
      var parts = base64.split(";base64,");
      var contentType = parts[0].split(":")[1];
      var raw = window.atob(parts[1]);
      var rawLength = raw.length;
      var uInt8Array = new Uint8Array(rawLength);
      for (var i = 0; i < rawLength; i++) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
    },
    // 判断浏览器类型

    myBrowser() {
      var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
      if (userAgent.indexOf("OPR") > -1) {
        return "Opera";
      } //判断是否Opera浏览器 OPR/43.0.2442.991
      if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
      } //判断是否Firefox浏览器  Firefox/51.0
      if (userAgent.indexOf("Trident") > -1) {
        return "IE";
      } //判断是否IE浏览器  Trident/7.0; rv:11.0
      if (userAgent.indexOf("Edge") > -1) {
        return "Edge";
      } //判断是否Edge浏览器  Edge/14.14393
      if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
      } // Chrome/56.0.2924.87
      if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
      } //判断是否Safari浏览器 AppleWebKit/534.57.2 Version/5.1.7 Safari/534.57.2
    },
    //图片格式和PDF
    downloadImg(base64,name,length) {
      console.log('查看下载地址', base64)
      console.log('查看传递名称', name)
      console.log('查看传递长度', length)
      let imageName = name;
      name = name + '';
      let imagelength = length - name.length;
      if (imagelength > 0) {
        for (let o = 0; o < imagelength; o++) {
          imageName = '0' + imageName;
        }
      }
      console.log("查看处理后的名称",imageName)
      // 图片转为base64
      var blob = this.convertBase64UrlToBlob(base64); // 转为blob对象
      // 下载
      if (this.myBrowser() == "IE") {
        console.log("IE")
        window.navigator.msSaveBlob(blob, imageName + ".jpg");
      } else if (this.myBrowser() == "FF") {
        console.log("FF")
        window.location.href = base64;
      } else {
        console.log("a标签")
        var a = document.createElement("a");
        a.download = imageName;
        a.href = URL.createObjectURL(blob);
        a.click();
      }
      this.imgNum+=1;
    },
  }
};
</script>
<style lang="scss" scoped>
.homeDiv {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .uploadDiv {

    border-radius: 0.5rem;
    box-shadow: 0 0 10px -5px rgb(10, 22, 185);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    box-sizing: border-box;
    padding: 0.5rem;
    .topInput{
      padding-bottom: 1rem;
      input{
        width: 9rem;
        height: 2rem;
        border-radius: 0.5rem;
        border: 1px solid red;
        box-sizing: border-box;
        padding-left: 0.3rem;
        outline: none;
      }
    }
    .upload{
      width: 10rem;
      height: 4rem;
      border: 1px solid red;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    p {
      font-size: 0.6rem;
    }
    .file {
      opacity: 0;
      position: absolute;
      inset: 0;
    }
  }
}
</style>
