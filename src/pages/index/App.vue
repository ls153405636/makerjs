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
import componentTop from '../../components/app/Top.vue'
import componenLeft from '../../components/app/LEFT.vue'
import componenRight from '../../components/app/Right.vue'
import componentBottom from '../../components/app/Bottom.vue'
import componentStairInit from '../../components/app/StairInit.vue'
import componentHoleInit from '../../components/app/HoleInit.vue'
import rightTextureEdit from '../../components/app/TextureEdit.vue'

export default {
  name: 'App',
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
  },
}
</script>
<style></style>
