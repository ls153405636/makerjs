<template>
  <div class="right-inlay">
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>门窗洞参数</span>
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
  name: 'rightInlay',
  components: {
    rightArgs,
  },
  data() {
    return {}
  },
  methods: {
    removeComponent() {
      console.log(1)
    },
  },
  props: {
    args: Object,
  },
}
</script>
