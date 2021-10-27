<template>
  <component-hole-init></component-hole-init>
  <component-top></component-top>
  <componen-left></componen-left>
  <component-bottom></component-bottom>
  <div id="canvas"></div>
</template>
<script>
import { Command } from '../../common/command'
import { Core } from '../../common/core'
import { initProj } from '../../init_temp'
import { Structure } from '../../structure/structure'

// 引入组件
import componentTop from '../../components/app/Top.vue'
import componenLeft from '../../components/app/Left.vue'
import componenRight from '../../components/app/Right.vue'
import componentBottom from '../../components/app/Bottom.vue'
import componentHoleInit from '../../components/app/HoleInit.vue'
import componentStairInit from '../../components/app/StairInit.vue'

export default {
  name: 'App',
  components: {
    componentTop,
    componenLeft,
    componenRight,
    componentBottom,
    componentHoleInit,
    componentStairInit,
  },
  mounted() {
    new Core().execute(new Command(new Core().cmds.BootCmd))

    //initProj()
    new Structure().initHole('rect').initStair('stright')
  },
}
</script>
<style></style>
