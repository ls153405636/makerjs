<template>
  <div class="right-small-column">
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>小柱参数</span>
        </div>
      </template>
      <right-args></right-args>
    </el-card>
  </div>
</template>

<script>
import rightArgs from './Args.vue'
export default {
  name: 'rightSmallColumn',
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
