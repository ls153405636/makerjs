<template>
  <div id="canvas"></div>
</template>

<script>
import { Command } from '../../common/command'
import { Core } from '../../common/core'
import { experiment } from '../../_experiment/start'

export default {
  name: 'App',
  mounted() {
    new Core().execute(new Command(new Core().cmds.BootCmd))

    experiment()
  },
}
</script>
