<template>
  <component-hole-init></component-hole-init>
  <component-stair-init></component-stair-init>
  <component-top></component-top>
  <componen-left></componen-left>
  <componen-right></componen-right>
  <component-bottom></component-bottom>
  <right-texture-edit></right-texture-edit>

  <div id="canvas"></div>
</template>
<script>
import { Command } from '../../common/command'
import { Core } from '../../common/core'
import { initProj } from '../../init_temp'
import { Structure } from '../../structure/structure'

// 引入组件
import componentTop from './Top.vue'
import componenLeft from './LEFT.vue'
import componenRight from './Right.vue'
import componentBottom from './Bottom.vue'
import componentStairInit from './StairInit.vue'
import componentHoleInit from './HoleInit.vue'
import rightTextureEdit from './TextureEdit.vue'

export default {
  name: 'Index',
  components: {
    componentTop,
    componenLeft,
    componenRight,
    componentBottom,
    componentStairInit,
    componentHoleInit,
    rightTextureEdit,
  },
  mounted() {
    new Core().execute(new Command(new Core().cmds.BootCmd))

    //initProj()
    // new Structure().initHole('rect').initStair('stright')
  },
}
</script>
<style></style>
