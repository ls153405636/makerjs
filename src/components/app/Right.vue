<template>
  <div>
    <hole v-if="cur_type === cts.HOLE"></hole>
    <args v-if="cur_type === cts.Args"></args>
    <flight v-if="cur_type === cts.Flight"></flight>
    <stair v-if="cur_type === cts.Stair"></stair>
    <wall v-if="cur_type === cts.Wall"></wall>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import common_config from '../../common/common_config'
import Hole from './right_attributes/Hole.vue'
import Args from './right_attributes/Args.vue'
import Flight from './right_attributes/Flight.vue'
import Stair from './right_attributes/Stair.vue'
import Wall from './right_attributes/Wall.vue'

export default {
  name: 'right',
  components: { Hole, Args, Flight, Stair, Wall },
  props: {
    Hole,
    Args,
    Flight,
    Stair,
    Wall,
  },
  data() {
    return {
      cts: common_config.COMP_TYPES,
    }
  },
  computed: {
    ...mapState('right_attribute', ['cur_type']),
  },
}
</script>
