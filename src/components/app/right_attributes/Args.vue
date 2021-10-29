<template>
  <div class="right-args">
    <el-form label-width="80px" v-for="(arg, index) in cur_args" :key="index">
      <el-form-item v-if="arg.type === 'input'" :label="arg.name">
        <el-input v-model="arg.value"></el-input>
      </el-form-item>

      <el-form-item v-if="arg.type === 'select'" :label="arg.name">
        <el-select v-model="arg.value.value" label="arg.value.label">
          <el-option
            v-for="item in arg.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
import { mapState } from 'vuex'
export default defineComponent({
  name: 'args',
  data() {
    return {
      value: ref(''),
    }
  },
  methods: {},
  computed: {
    ...mapState('right_attribute', ['cur_args']),
  },
  props: {
    args: Object,
  },
})
</script>
<style></style>
