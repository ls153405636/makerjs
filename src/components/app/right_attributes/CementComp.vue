<template>
  <div class="right-cement-comp">
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>梁柱参数</span>
        </div>
      </template>
      <right-args></right-args>
      <el-row>
        <el-button @click="removeComponent()">移除</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { Command } from '../../../common/command'
import { Core } from '../../../common/core'
import rightArgs from './Args.vue'
export default {
  name: 'rightCementComp',
  components: {
    rightArgs,
  },
  data() {
    return {}
  },
  methods: {
    removeComponent(vType) {
      let core = new Core()
      core.execute(new Command(core.cmds.EleDelCmd, { type: vType }))
    },
  },
  props: {
    args: Object,
  },
}
</script>
