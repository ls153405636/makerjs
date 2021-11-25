<template>
  <div class="right-flight">
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>{{cur_args.name}}</span>
        </div>
      </template>
      <right-args></right-args>
    </el-card>
  </div>
</template>

<script>
import rightArgs from './Args.vue'
import { mapState } from 'vuex'
export default {
  name: 'rightFlight',
  components: {
    rightArgs,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('right_attribute', ['cur_args']),
  },
  methods: {},
  props: {
    args: Object,
  },
}
</script>
