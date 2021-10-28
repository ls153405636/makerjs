<template>
  <div class="right-wall">
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>墙体参数</span>
        </div>
      </template>
      <right-args></right-args>
    </el-card>
  </div>
</template>

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
  props: {
    args: Object,
  },
}
</script>
