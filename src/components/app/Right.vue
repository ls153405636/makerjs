<template>
  <div class="component-right" id="component-right">
    <el-scrollbar height="800px">
      <right-wall v-if="cur_type === cts.WALL"></right-wall>
      <right-flight v-if="cur_type === cts.FLIGHT"></right-flight>
      <right-hole v-if="cur_type === cts.HOLE"></right-hole>
      <right-stair v-if="cur_type === cts.STAIR"></right-stair>
      <right-handrail v-if="cur_type === cts.HANDRAIL"></right-handrail>
      <right-girder v-if="cur_type === cts.GIRDER"></right-girder>
      <right-big-column v-if="cur_type === cts.BIG_COLUMN"></right-big-column>
      <right-small-column
        v-if="cur_type === cts.SMALL_COLUMN"
      ></right-small-column>
      <right-inlay v-if="cur_type === cts.INLAY"></right-inlay>
      <right-cement-comp
        v-if="cur_type === cts.CEMENT_COMP"
      ></right-cement-comp>
      <right-tread v-if="cur_type === cts.TREAD"></right-tread>
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
import rightHandrail from './right_attributes/Handrail.vue'
import rightGirder from './right_attributes/Girder.vue'
import rightBigColumn from './right_attributes/BigColumn.vue'
import rightSmallColumn from './right_attributes/SmallColumn.vue'
import rightInlay from './right_attributes/Inlay.vue'
import rightCementComp from './right_attributes/CementComp.vue'
import rightTread from './right_attributes/Tread.vue'

export default {
  name: 'componentRight',
  components: {
    rightHole,
    rightFlight,
    rightStair,
    rightWall,
    rightHandrail,
    rightGirder,
    rightBigColumn,
    rightSmallColumn,
    rightInlay,
    rightCementComp,
    rightTread,
  },
  props: {
    rightFlight,
    rightHole,
    rightStair,
    rightWall,
    rightHandrail,
    rightGirder,
    rightBigColumn,
    rightSmallColumn,
    rightInlay,
    rightCementComp,
    rightTread,
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
