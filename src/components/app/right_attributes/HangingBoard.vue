<template>
  <div class="right-hanging-board">
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>挂板参数</span>
        </div>
      </template>
      <right-args></right-args>
      <el-button @click="delHangingBoard()">移除挂板</el-button>
    </el-card>
  </div>
</template>

<script>
import { Command } from '../../../common/command'
import { COMP_TYPES } from '../../../common/common_config'
import { Core } from '../../../common/core'
import rightArgs from './Args.vue'
export default {
  name: 'rightHangingBoard',
  components: {
    rightArgs,
  },
  data() {
    return {
      // value: '移除挂板'
    }
  },
  computed: {},
  methods: {
    delHangingBoard() {
      let core = new Core()
      core.execute(new Command(core.cmds.EleDelCmd, {}))
    },
  },
  props: {
    args: Object,
  },
}
</script>
