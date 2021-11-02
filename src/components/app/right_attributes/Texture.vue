<template>
  <div class="right-flight">
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>楼梯段参数</span>
        </div>
      </template>
      <right-args></right-args>
    </el-card>
  </div>

  <!-- 图片上传 -->
  <el-form-item v-if="arg.type === 'replace'" :label="arg.name">
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      list-type="picture"
    >
      <el-button size="small" type="primary">上传材质</el-button>
    </el-upload>
  </el-form-item>
</template>

<script>
import rightArgs from './Args.vue'
export default {
  name: 'rightFlight',
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
