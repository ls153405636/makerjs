<template>
  <div class="right-hanging-board">
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>挂板参数</span>
        </div>
      </template>
      <right-args></right-args>
    </el-card>
  </div>
</template>

<script>
import rightArgs from './Args.vue'
export default {
  name: 'rightHangingBoard',
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
