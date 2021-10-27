<template>
  <div class="component-right">
    <!-- <right-hole></right-hole> -->
    <right-flight></right-flight>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import common_config from '../../common/common_config'
import rightHole from './right_attributes/Hole.vue'
// import rightArgs from './right_attributes/Args.vue'
import rightFlight from './right_attributes/Flight.vue'
import rightStair from './right_attributes/Stair.vue'
import rightWall from './right_attributes/Wall.vue'

export default {
  name: 'componentRight',
  components: { rightHole, rightFlight, rightStair, rightWall },
  props: {
    rightHole,
    rightFlight,
    rightStair,
    rightWall,
  },
  data() {
    return {
      // cts: common_config.COMP_TYPES,
    }
  },
  computed: {
    // ...mapState('right_attribute', ['cur_type']),
  },
}
</script>
<style>
.component-right {
  position: absolute;
  right: 10px;
  top: 80px;
  width: 500px;
  height: 800px;
  background-color: #fff;
  box-shadow: 0px 4px 20px rgba(45, 48, 55, 0.1);
  border-radius: 8px;
}
</style>
