<template>
  <div id="canvas"></div>
</template>

<script>
import { Command } from '../../common/command'
import { Core } from '../../common/core'
import { initProj } from '../../init_temp'
import { Structure } from '../../structure/structure'


export default {
  name: 'App',
  mounted() {
    new Core().execute(new Command(new Core().cmds.BootCmd))

    //initProj()
    new Structure().initHole('rect').initStair('stright')
  },
}
</script>
