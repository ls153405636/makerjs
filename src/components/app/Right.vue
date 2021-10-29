<template>
  <div class="component-right" id="component-right">
    <el-scrollbar height="800px">
      <right-wall v-if="cur_type === cts.WALL"></right-wall>
      <!-- <right-flight></right-flight> -->
      <right-hole v-if="cur_type === cts.HOLE"></right-hole>
      <right-stair v-if="cur_type === cts.STAIR"></right-stair>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import common_config from '../../common/common_config'
import rightHole from './right_attributes/Hole.vue'
import rightFlight from './right_attributes/Flight.vue'
import rightStair from './right_attributes/Stair.vue'
import rightWall from './right_attributes/Wall.vue'

export default {
  name: 'componentRight',
  components: { rightHole, rightFlight, rightStair, rightWall },
  props: {
    rightFlight,
    rightHole,
    rightStair,
    rightWall,
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
<style>
.component-right {
  display: block;
  position: absolute;
  right: 10px;
  top: 80px;
  width: 330px;
  height: 800px;
  background-color: #fff;
  box-shadow: 0px 4px 20px rgba(45, 48, 55, 0.1);
  border-radius: 8px;
  overflow: hidden;
}
</style>
