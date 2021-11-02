<template>
  <div class="right-tread">
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>踏步参数</span>
        </div>
      </template>
      <el-row>
        <el-button @click="enterEdit()" type="primary"
          >进入可视化编辑</el-button
        >
      </el-row>
    </el-card>
  </div>
</template>

<script>
import rightArgs from './Args.vue'
export default {
  name: 'rightTread',
  components: {
    rightArgs,
  },
  data() {
    return {}
  },
  methods: {
    enterEdit() {
      console.log('进入编辑')
    },
  },
  props: {
    args: Object,
  },
}
</script>
