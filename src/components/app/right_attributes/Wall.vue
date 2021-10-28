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
        <el-button @click="addComponent" size="medium">门</el-button>
        <el-button @click="addComponent" size="medium">窗</el-button>
        <el-button @click="addComponent" size="medium">门洞</el-button>
        <el-button @click="addComponent" size="medium" style="margin-left: 0"
          >梁</el-button
        >
        <el-button @click="addComponent" size="medium">柱子</el-button>
      </el-row>
    </el-card>
  </div>
</template>
o
<script>
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
    addComponent() {},
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
