<template>
  <div class="right-args">
    <el-form
      v-for="(arg, index) in cur_args"
      :key="index"
      @submit.native.prevent
    >
      <!-- 输入 -->
      <el-form-item v-if="arg.type === 'input'" :label="arg.name" :class="arg.class">
        <el-input
          :class="arg.class"
          :autofocus="arg.autofocus"
          size="medium"
          :disabled="arg.disabled"
          v-model.lazy="arg.value"
          @blur="updateArgs(arg.value, index, arg.type)"
          @keydown.enter.prevent="enterBlur($event)"
        >
          <template #append>mm</template>
        </el-input>
      </el-form-item>

      <!-- 选择 -->
      <el-form-item v-if="arg.type === 'select'" :label="arg.name">
        <el-select
          size="medium"
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

      <!-- 开关 -->
      <el-form-item v-if="arg.type === 'switch'" :label="arg.name">
        <el-switch
          size="medium"
          v-model="arg.value"
          @change="updateArgs(arg.value, index, arg.type, key)"
        ></el-switch>
      </el-form-item>

      <!-- 图片上传 -->
      <el-form-item v-if="arg.type === 'replace'" :label="arg.name">
        <div class="show_img" @click="openEdit()">
          <img class="show_img_small" :src="url" />
          <img class="show_img_big" :src="url" alt="" />
        </div>
      </el-form-item>

      <!-- 展开 -->
      <div v-if="arg.type === 'group'" class="demo-collapse">
        <el-collapse>
          <el-collapse-item :title="arg.name">
            <el-form v-for="(item1, key) in arg.value" :key="key">
              <!-- 展开-输入 -->
              <el-form-item v-if="item1.type === 'input'" :label="item1.name">
                <el-input
                  size="medium"
                  :disabled="item1.disabled"
                  v-model="item1.value"
                  @blur="updateArgs(item1.value, index, item1.type, key)"
                  @keydown.enter.prevent="enterBlur($event)"
                >
                  <template #append>mm</template>
                </el-input>
              </el-form-item>

              <!-- 展开-选择 -->
              <el-form-item v-if="item1.type === 'select'" :label="item1.name">
                <el-select
                  size="medium"
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
                <div class="show_img" @click="openEdit()">
                  <img class="show_img_small" :src="url" />
                  <img class="show_img_big" :src="url" alt="" />
                </div>
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
  data() {
    const url = ref(
      'https://stair-dev-next-1305224273.cos.ap-shanghai.myqcloud.com/default/dls.jpg'
    )
    return {
      url,
    }
  },
  computed: {
    ...mapState('right_attribute', ['cur_args']),
  },
  methods: {
    openEdit() {
      const TextureEdit = document.getElementById('right-texture-edit')
      TextureEdit.style.display = 'block'
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },

    updateArgs(value, key, type, secondKey) {
      if (value === 0 || value === '') {
        this.$store.commit({
        type: 'getArgs/getFocus',
        focus: true
        })
      }else {
        this.$store.commit({
        type: 'getArgs/getFocus',
        focus: false
        })

      }
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
    enterBlur(event) {
      event.target.blur()
    },
  },

  directives: {},
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
<style scoped>
.el-card__body {
  width: 100%;
  height: 300px;
  overflow: auto;
}
.show_img {
  width: 100px;
  margin-left: 148px;
  height: 100px;
  cursor: pointer;
}
.show_img .show_img_small {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
}
.show_img .show_img_big {
  display: none;
  position: absolute;
  top: -25px;
  left: 25px;
  width: 150px;
  height: 150px;
  z-index: 99;
  border: 3px solid #fff;
  border-radius: 6px;
}
.show_img:hover .show_img_big {
  display: block;
}
</style>
