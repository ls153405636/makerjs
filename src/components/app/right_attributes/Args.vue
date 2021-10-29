<template>
  <div class="right-args">
    <el-form v-for="(arg, index) in cur_args" :key="index">
      <!-- 输入 -->
      <el-form-item v-if="arg.type === 'input'" :label="arg.name">
        <el-input
          v-model="arg.value"
          @blur="updateArgs(arg.value, index)"
        ></el-input>
      </el-form-item>

      <!-- 选择 -->
      <el-form-item v-if="arg.type === 'select'" :label="arg.name">
        <el-select
          v-model="arg.value.value"
          :label="arg.value.label"
          @blur="updateArgs(arg.value, index)"
        >
          <el-option
            v-for="item in arg.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 展开 -->
      <div v-if="arg.type === 'group'" class="demo-collapse">
        <el-collapse>
          <el-collapse-item :title="arg.name">
            <el-form v-for="(item1, index) in arg.value" :key="index">
              <!-- 展开-输入 -->
              <el-form-item v-if="item1.type === 'input'" :label="item1.name">
                <el-input v-model="item1.value"></el-input>
              </el-form-item>

              <!-- 展开-选择 -->
              <el-form-item v-if="item1.type === 'select'" :label="item1.name">
                <el-select
                  v-model="item1.value.value"
                  :label="item1.value.label"
                  @blur="updateArgs(item1.value, index)"
                >
                  <el-option
                    v-for="item in item1.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>

              <!-- 开关 -->
              <el-form-item v-if="item1.type === 'switch'" :label="item1.name">
                <el-switch v-model="item1.value"></el-switch>
              </el-form-item>

              <!-- 图片上传 -->
              <el-form-item v-if="item1.type === 'replace'" :label="item1.name">
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
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-form>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
import { mapState } from 'vuex'
export default defineComponent({
  name: 'args',
  setup() {},
  data() {
    return {
      value: ref(''),

      fileList: [
        {
          name: '材质1.jpeg',
          url:
            'https://stair-dev-next-1305224273.cos.ap-shanghai.myqcloud.com/default/dls.jpg',
        },
      ],
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },

    updateArgs(value, key, secondKey) {
      console.log('key, value:', key, value)
    },
  },
  computed: {
    ...mapState('right_attribute', ['cur_args']),
  },
  props: {
    args: Object,
  },
  watch: {
    // cur_args: {
    //   deep: true,
    //   handler(value, oldValue) {
    //     console.log(value)
    //   }
    // }
  },
})
</script>
<style></style>
