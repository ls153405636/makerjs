<template>
  <div class="right-big-column">
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
  name: 'rightBigColumn',
  components: {
    rightArgs,
  },
  computed: {
    ...mapState('right_attribute', ['cur_args']),
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
