<template>
  <div class="right-flight">
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>休息平台</span>
        </div>
      </template>
      <right-args></right-args>
    </el-card>
  </div>
</template>

<script>
import rightArgs from './Args.vue'
export default {
  name: 'rightLanding',
  components: {
    rightArgs,
  },
  data() {
    return {}
  },
  methods: {},
  props: {
    args: Object,
  },
}
</script>
