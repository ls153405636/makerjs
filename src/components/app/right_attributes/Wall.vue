<template>
  <div class="right-wall">
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>墙体参数</span>
        </div>
      </template>
      <span class="add-parts">添加结构部件</span>
      <el-row>
        <el-button id="door" @click="addComponent(1)" size="medium"
          >门</el-button
        >
        <el-button id="window" @click="addComponent(2)" size="medium"
          >窗</el-button
        >
        <el-button id="door-hole" @click="addComponent(3)" size="medium"
          >门洞</el-button
        >
        <el-button
          id="beam"
          @click="addComponent(4)"
          size="medium"
          style="margin-left: 0"
          >梁</el-button
        >
        <el-button id="cloumn" @click="addComponent(5)" size="medium"
          >柱子</el-button
        >
      </el-row>
      <right-args></right-args>
    </el-card>
  </div>
</template>
<script>
import { Command } from '../../../common/command'
import { Core } from '../../../common/core'
import { D2Config } from '../../../d2/config'
import { StructConfig } from '../../../structure/config'
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
      let holeId
      for(let value of D2Config.WIDGETS.values()) {
        if (value.getWidgetType() === undefined) {
          holeId = value.uuid
        }
      }
      let holeInfo = StructConfig.INFOS.get(holeId)
      if (holeInfo.floorHeight === 0 || holeInfo.floorHeight === '') {
        this.$message.warning('请完善洞口数据！')
      }else {
        let core = new Core()
        core.execute(new Command(core.cmds.EleAddCmd, { type: vType }))
      }
      document.getElementById('door').blur()
      document.getElementById('window').blur()
      document.getElementById('door-hole').blur()
      document.getElementById('beam').blur()
      document.getElementById('cloumn').blur()
    },
  },
  props: {
    args: Object,
  },
}
</script>
<style scoped>
.add-parts {
  display: block;
  margin-bottom: 20px;
}
.el-row {
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 20px;
}
.el-row .el-button--default {
  width: 72px;
  margin-bottom: 10px;
}
</style>
