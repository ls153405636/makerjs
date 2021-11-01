<template>
  <div class="right-args">
    <el-form
      v-for="(arg, index) in cur_args"
      :key="index"
      @submit.native.prevent
    >
      <!-- 输入 -->
      <el-form-item v-if="arg.type === 'input'" :label="arg.name">
        <el-input
          v-model.lazy="arg.value"
          @blur="updateArgs(arg.value, index, arg.type)"
        ></el-input>
      </el-form-item>

      <!-- 选择 -->
      <el-form-item v-if="arg.type === 'select'" :label="arg.name">
        <el-select
          v-model="arg.value.value"
          :label="arg.value.label"
          @change="updateArgs(arg.value.value, index, arg.type)"
        >
          <el-option
            v-for="item in arg.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

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

      <!-- 展开 -->
      <div v-if="arg.type === 'group'" class="demo-collapse">
        <el-collapse>
          <el-collapse-item :title="arg.name">
            <el-form v-for="(item1, key) in arg.value" :key="key">
              <!-- 展开-输入 -->
              <el-form-item v-if="item1.type === 'input'" :label="item1.name">
                <el-input
                  v-model="item1.value"
                  @blur="updateArgs(item1.value, index, item1.type, key)"
                ></el-input>
              </el-form-item>

              <!-- 展开-选择 -->
              <el-form-item v-if="item1.type === 'select'" :label="item1.name">
                <el-select
                  v-model="item1.value.value"
                  :label="item1.value.label"
                  @change="
                    updateArgs(item1.value.value, index, item1.type, key)
                  "
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
                <el-switch
                  v-model="item1.value"
                  @change="updateArgs(item1.value, index, item1.type, key)"
                ></el-switch>
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
import { Command } from '../../../common/command'
import { Core } from '../../../common/core'
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

    updateArgs(value, key, type, secondKey) {
      if (type === 'input') {
        value = Number(value)
      }
      let argItems = new Map()
      if (secondKey) {
        let item = new Map()
        item.set(secondKey, value)
        argItems.set(key, item)
      } else {
        argItems.set(key, value)
      }
      let core = new Core()
      core.execute(new Command(core.cmds.EleUpdateCmd, argItems))
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
  directives: {
    focus: {
      // 指令的定义
      mounted(el) {
        el.focus()
      },
    },
  },
})
</script>
<style></style>
