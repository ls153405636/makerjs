<template>
  <div class="right-texture-edit" id="right-texture-edit">
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>材质选择</span>
          <el-button type="primary" @click="closeEdit()">关闭</el-button>
        </div>
      </template>
      <el-select v-model="value1" multiple placeholder="Select" filterable>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-card>
    <el-empty description="description"></el-empty>
    <el-form-item class="footer-btn">
      <el-button>取消</el-button>
      <el-button type="primary" @click="onSubmit">确认</el-button>
    </el-form-item>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'rightTextureEdit',
  data() {
    return {
      options: ref([
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
        {
          value: 'Option4',
          label: 'Option4',
        },
        {
          value: 'Option5',
          label: 'Option5',
        },
      ]),
      value1: ref([]),
    }
  },
  methods: {
    onSubmit() {},
    closeEdit() {
      const TextureEdit = document.getElementById('right-texture-edit')
      TextureEdit.style.display = 'none'
    },
    enterEdit() {
      console.log('进入编辑')
    },
  },
  props: {
    args: Object,
  },
})
</script>
<style>
.card-header {
  display: flex;
  justify-content: space-between;
}
.right-texture-edit {
  display: none;
  position: fixed;
  top: 10%;
  left: 50%;
  margin-left: -300px;
  width: 600px;
  height: 700px;
  background-color: rgb(255, 255, 255);
}
.footer-btn {
  position: absolute;
  right: 20px;
  bottom: 20px;
}
</style>
