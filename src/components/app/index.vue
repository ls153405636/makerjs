<template>
<div class="components">
  <component-hole-init></component-hole-init>
  <component-stair-init></component-stair-init>
  <component-top></component-top>
  <componen-left></componen-left>
  <componen-right></componen-right>
  <component-bottom></component-bottom>
  <right-texture-edit></right-texture-edit>
</div>
  <export-plan-img class="plan-img"></export-plan-img>
  <shot-img class="shot-img"></shot-img>
  <export-plan-img class="export-plan"></export-plan-img>
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
import ExportPlanImg from './ExportPlanImg.vue'
import ShotImg from './ShotImg.vue'

export default {
  components: {
    componentTop,
    componenLeft,
    componenRight,
    componentBottom,
    componentStairInit,
    componentHoleInit,
    rightTextureEdit,
    ExportPlanImg,
    ShotImg
  },
  data() {
    return {
      shotImgShow: false,
      exportImgShow: false
    }
  },
  methods: {
    
  },
  mounted() {
    new Core().execute(new Command(new Core().cmds.BootCmd))
  },
}
</script>
<style>
.components {
  display: block;
}
.shot-img {
  display: none;
}
.export-plan {
  display: none;
}
.plan-img {
  display: none;
}
</style>
