<template>
  <div id="home-components">
    <component-hole-init></component-hole-init>
    <component-stair-init></component-stair-init>
    <component-top></component-top>
    <componen-left></componen-left>
    <componen-right></componen-right>
    <component-bottom></component-bottom>
    <right-texture-edit></right-texture-edit>
  </div>
  <div class="shot-header" >
       <el-button type="primary" class="export" @click="app()">截图</el-button>
       <el-button type="primary" class="back-index" @click="back()">返回</el-button>
  </div>

  <div class="shot">
    <i></i>
    <i></i>
    <i></i>
    <i></i>
  </div>
  <div id="canvas"></div>
</template>
<script>
import { Command } from '../../common/command'
import { Core } from '../../common/core'

// 引入组件
import componentTop from './Top.vue'
import componenLeft from './LEFT.vue'
import componenRight from './Right.vue'
import componentBottom from './Bottom.vue'
import componentStairInit from './StairInit.vue'
import componentHoleInit from './HoleInit.vue'
import rightTextureEdit from './TextureEdit.vue'
import html2canvas from 'html2canvas'

export default {
  components: {
    componentTop,
    componenLeft,
    componenRight,
    componentBottom,
    componentStairInit,
    componentHoleInit,
    rightTextureEdit,
  },
  methods: {
    back() {
      document.querySelector("#home-components").style.display = "block"
      document.querySelector(".shot-header").style.display = "none"
      document.querySelector(".shot").style.display = 'none'
      window.stage[0].visible = 1
    },
    app() {
      let el = document.querySelector("#canvas");
      html2canvas(el, {
        scale: window.devicePixelRatio,
        width: 950,
        height: 680,
        x: 485,
        y: 113.5,
        allowTaint: true,
      })
      .then((canvas) => {
        this.imgUrl = canvas.toDataURL();
        this.$store.commit({
          type: 'show_img/getImgUrl',
          url: this.imgUrl
        })
        localStorage.setItem('img_url',this.imgUrl)
        this.$router.push({
          name: 'export',
        })
        setTimeout(() => {
          window.location.reload()
        },100)
        
      })
    }
  },
  mounted() {
    new Core().execute(new Command(new Core().cmds.BootCmd))
  },
}
</script>
<style>
.shot-header { 
  position: fixed;
  display: none;
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
.shot-header .export {
  width: 100px;
  height: 40px;
}
.shot-header .back-index {
  position: absolute;
  right: 20px;
  height: 40px;
}
#home-components {
  display: block;
}
.shot {
  position: fixed;
  top: 120px;
  left: 500px;
  display: none;
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
