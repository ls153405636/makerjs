<template>
  <div class="right-stair">
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>楼梯参数</span>
        </div>
      </template>
      <el-button
        v-if="cur_args.hangingBoard != undefined"
        @click="addHangingBoard()"
      >
        {{ cur_args.hangingBoard.name }}
      </el-button>
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
    addHangingBoard() {
      let core = new Core()
      if (this.cur_args.hangingBoard.name === '添加挂板') {
        core.execute(new Command(core.cmds.EleAddCmd, { type: '挂板' }))
      } else {
        core.execute(new Command(core.cmds.EleDelCmd, { type: '挂板' }))
      }
    },
  },
  props: {
    args: Object,
  },
}
</script>
<style scoped>
.el-button {
  margin-bottom: 20px;
}
</style>
