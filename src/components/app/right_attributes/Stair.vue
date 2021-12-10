<template>
  <div class="right-stair">
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>楼梯参数</span>
        </div>
      </template>
      <div class="two-button">
        <el-button
          size="medium"
          v-if="cur_args.hangingBoard != undefined"
          @click="addEle('hangingBoard', cur_args.hangingBoard.state)"
        >
          {{ cur_args.hangingBoard.name }}
        </el-button>
        <el-button
          width="80"
          size="medium"
          v-if="cur_args.startFlight != undefined"
          @click="addEle('startFlight', cur_args.startFlight.state)"
        >
          {{ cur_args.startFlight.name }}
        </el-button>
      </div>
      <right-args></right-args>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Command } from '../../../common/command'
import { Core } from '../../../common/core'
import rightArgs from './Args.vue'
export default {
  name: 'rightStair',
  components: {
    rightArgs,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('right_attribute', ['cur_args']),
  },
  methods: {
    addEle(vType, vState) {
      let core = new Core()
      if (vState === 'add') {
        core.execute(new Command(core.cmds.EleAddCmd, { type: vType }))
      } else {
        core.execute(new Command(core.cmds.EleDelCmd, { type: vType }))
      }
    },
  },
  props: {
    args: Object,
  },
}
</script>
<style scoped>
.two-button {
  display: flex;
  justify-content: space-between;
}
.el-button {
  display: block;
  margin: 0;
  width: 114px;
  margin-bottom: 20px;
}
</style>
