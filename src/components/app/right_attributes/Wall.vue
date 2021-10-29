<template>
  <div class="right-wall">
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>墙体参数</span>
        </div>
      </template>
      <right-args></right-args>
      <span class="add-parts">添加结构部件</span>
      <el-row>
        <el-button @click="addComponent(1)" size="medium">门</el-button>
        <el-button @click="addComponent(2)" size="medium">窗</el-button>
        <el-button @click="addComponent(3)" size="medium">门洞</el-button>
        <el-button @click="addComponent(4)" size="medium" style="margin-left: 0"
          >梁</el-button
        >
        <el-button @click="addComponent(5)" size="medium">柱子</el-button>
      </el-row>
    </el-card>
  </div>
</template>
o
<script>
import { Command } from '../../../common/command'
import { Core } from '../../../common/core'
import rightArgs from './Args.vue'
export default {
  name: 'rightWall',
  components: {
    rightArgs,
  },
  data() {
    return {}
  },
  methods: {
    addComponent(vType) {
      let core = new Core()
      core.execute(new Command(core.cmds.EleAddCmd, {type: vType}))
    },
  },
  props: {
    args: Object,
  },
}
</script>
<style>
.add-parts {
  display: block;
  line-height: 50px;
}
.el-row {
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  /* background-color: aqua; */
}
.el-row .el-button--default {
  width: 88px;
  margin-top: 10px;
}
</style>
