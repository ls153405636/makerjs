<template>
  <div class="right-hole">
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>洞口参数</span>
        </div>
      </template>
      <right-args></right-args>
    </el-card>
  </div>
</template>

<script>
import rightArgs from './Args.vue'
export default {
  name: 'rightHole',
  components: {
    rightArgs,
  },
  data() {
    return {}
  },
  computed: {
    // ...mapState('hole', ['rect_args'])
  },
  methods: {},
}
</script>
<style></style>
