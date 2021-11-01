<template>
  <div class="right-girder">
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>大梁参数</span>
        </div>
      </template>
      <right-args></right-args>
    </el-card>
  </div>
</template>

<script>
import rightArgs from './Args.vue'
export default {
  name: 'rightGirder',
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
