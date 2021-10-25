<template>
  <div>
    <hole v-if="cur_type === cts.HOLE"></hole>
  </div>
</template>

<script>
 import { mapState } from 'vuex'
  import common_config from '../../common/common_config'
  import Hole from './right_attributes/Hole'
  export default{
  components: { hole },
    name: 'right',
    props: {
      Hole
    },
    data () {
      return {
        cts: common_config.COMP_TYPES
      }
    },
    computed: {
      ...mapState('right_attribute', ['cur_type'])
    }
  }
</script>