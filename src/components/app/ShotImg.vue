<template>
  <div class="shot-img" >
       <el-button type="primary" class="export" @mousedown="shotImg()">截图</el-button>
       <el-button type="primary" class="back-index" @click="back()">返回</el-button>
  <div class="shot">
    <i></i>
    <i></i>
    <i></i>
    <i></i>
  </div>
  </div>
  <div id="canvas"></div>
</template>

<script>
import html2canvas from 'html2canvas'
export default {
  data() {
    return {

    }
  },
  name: 'shotImg',
  methods: {

    back() {
        window.stage[0].visible = 1
        document.querySelector(".components").style.display = 'block'
        document.querySelector("#canvas").style.display = 'block'
        // document.querySelector('.export-plan').style.display = 'none'
        // document.querySelector('.plan-img').style.display = 'none'
        document.querySelector('.shot-img').style.display = 'none'
    },
    async shotImg() {
      document.querySelector('.export-plan').style.display = 'block'
      document.querySelector('.plan-img').style.display = 'block'
      document.querySelector('.shot-img').style.display = 'none'
      let el = document.querySelector("#canvas");
      let canvas = await html2canvas(el, {
        scale: window.devicePixelRatio,
        width: 950,
        height: 680,
        x: 485,
        y: 113.5,
        allowTaint: true,
      })
      this.imgUrl = canvas.toDataURL();
      this.$store.commit({
        type: 'show_img/getImgUrl',
        url: this.imgUrl,
      })
      // localStorage.setItem('img_url',this.imgUrl)
      
      setTimeout(() => {
        document.querySelector('#canvas').style.display = 'none'
      },1)
    }
  }
}
</script>

<style>
#canvas {
  display: block;
}
.shot-img { 
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 62px;
  background-color: rgba(255, 255, 255, 0.1);
  line-height: 62px;
  background-color: #fff;
  box-shadow: 5px 0 5px #d3d3d3;
  margin-bottom: 20px;
  
}
.shot-img .export {
  width: 100px;
  height: 40px;
}
.shot-img .back-index {
  position: absolute;
  right: 20px;
  height: 40px;
}
.shot {
  position: fixed;
  top: 120px;
  left: 500px;
  display: block;
  width: 950px;
  height: 710px;
  pointer-events: none;
}
.shot i:nth-child(1) {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 50px;
  height: 50px;
  border-top: 5px solid #409eff;
  border-left: 5px solid #409eff;
  box-sizing: border-box;
  
}
.shot i:nth-child(2) {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  width: 50px;
  height: 50px;
  border-top: 5px solid #409eff;
  border-right: 5px solid #409eff;
  box-sizing: border-box;
  
}
.shot i:nth-child(3) {
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  display: block;
  width: 50px;
  height: 50px;
  border-bottom: 5px solid #409eff;
  border-left: 5px solid #409eff;
  box-sizing: border-box;
  
}
.shot i:nth-child(4) {
  display: block;
  position: absolute;
  bottom: 0;
  right: 0;
  display: block;
  width: 50px;
  height: 50px;
  border-bottom: 5px solid #409eff;
  border-right: 5px solid #409eff;
  box-sizing: border-box;
  
}
</style>