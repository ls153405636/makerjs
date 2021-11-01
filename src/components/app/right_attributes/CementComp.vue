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
        <el-button @click="removeComponent(1)">移除</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
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
    removeComponent(type) {
      console.log(type)
    },
  },
  props: {
    args: Object,
  },
}
</script>
