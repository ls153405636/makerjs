<template>
  <div id="canvas"></div>
</template>

<script>
import { Command } from '../../common/command'
import { Core } from '../../common/core'
import { initProj } from '../../init_temp'


export default {
  name: 'App',
  mounted() {
    new Core().execute(new Command(new Core().cmds.BootCmd))

    initProj()
  },
}
</script>
