<template>
  <div class="right-stair">
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>楼梯参数</span>
        </div>
      </template>
      <right-args></right-args>
    </el-card>
    <right-args></right-args>
  </div>
</template>

<script>
import rightArgs from './Args.vue'
export default {
  name: 'rightStair',
  components: {
    rightArgs,
  },
  data() {
    return {}
  },
  props: {
    args: Object,
  },
}
</script>
