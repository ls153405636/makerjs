<template>
  <div class="right-handrail">
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>扶手参数</span>
        </div>
      </template>
      <right-args></right-args>
      <el-row>
        <!-- <el-button>隐藏扶手</el-button> -->
      </el-row>
    </el-card>
  </div>
</template>

<script>
import rightArgs from './Args.vue'
export default {
  name: 'rightHandrail',
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
