<template>
  <div class="right-flight">
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>{{cur_args.name}}</span>
        </div>
      </template>
      <right-args></right-args>
      <!-- <el-button
        width="80"
        size="medium"
        @click="addEle()"
      >
      移除起步踏
      </el-button> -->
    </el-card>
  </div>
</template>

<script>
import rightArgs from './Args.vue'
import { mapState } from 'vuex'
import { Core } from '../../../common/core'
import { Command } from '../../../common/command'
export default {
  name: 'rightFlight',
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
    addEle(vType) {
      let core = new Core()
      core.execute(new Command(core.cmds.EleDelCmd, { type: vType }))
      core.execute(
        new Command(core.cmds.SelecteCmd, {
          uuid: null,
          type: null,
        })
      )
    },
  },
  props: {
    args: Object,
  },
}
</script>
