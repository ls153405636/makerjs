<template>
  <div class="component-bottom">
    <div class="D23">
      <div class="d2-d3">
        <span class="left">2D</span>
        <span class="right">3D</span>
      </div>
    </div>
    <div class="add-stair" @click="addStair">添加楼梯</div>
    <div class="zoom">
      <div class="vector">
        <i class="iconfont icon-view-angle" @click="defaultZoom"></i>
      </div>
      <div class="vector-two">
        <div class="vector-two-left">
          <i class="iconfont icon-down" @click="downZoom"></i>
        </div>
        <div class="slider-demo-block">
          <el-slider
            v-model="value"
            :min="50"
            :max="400"
            :step="10"
            :format-tooltip="formatTooltip"
            @input="sliderChange"
            @change="changezoom"
          ></el-slider>
        </div>
        <div class="vector-two-right">
          <i class="iconfont icon-up" @click="upZoom"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { stage_scale_context } from '../../d2/fsm/stage_scale'

import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'componentBottom',
  data() {
    const value = ref(100)
    const formatTooltip = (val) => {
      return val / 100
    }

    return {
      value,
      formatTooltip,
    }
  },
  methods: {
    // 恢复默认缩放
    defaultZoom() {
      stage_scale_context.set_scale(1, true)
    },
    // 放大
    upZoom() {
      let upZ = this.value / 100 + 0.1
      this.value += 10
      stage_scale_context.set_scale(upZ, true)
    },
    // 缩小
    downZoom() {
      let downZ = this.value / 100 - 0.1
      this.value -= 10
      stage_scale_context.set_scale(downZ, true)
    },
    // 拉动滑块
    sliderChange(value) {
      let zoom = value / 100
      stage_scale_context.set_scale(zoom, true)
    },
    addStair() {
      let stairInit = document.getElementById('component-stair-init')
      stairInit.style.display = 'block'
    },
  },
  computed: {
    // 缩放画布滑块同步
    changezoom() {
      this.value = Math.floor(this.$store.state.change_zoom.scale_number)
    },
  },
})
</script>

<style>
.component-bottom {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 50px;
  left: 50%;
  width: 60%;
  height: 50px;
  margin-left: -30%;
}
.component-bottom .D23 {
  width: 220px;
  height: 34px;
  padding: 0 20px;
  cursor: pointer;
}
.component-bottom .d2-d3 {
  width: 128px;
  height: 34px;
  background: #4478f4;
  border-radius: 8px;
  overflow: hidden;
  font: normal 14px/34px Source Han Sans CN;
  color: #fff;
  text-align: center;
}
.component-bottom .d2-d3 span {
  float: left;
  width: 50%;
  height: 100%;
}
.component-bottom .d2-d3 span:nth-child(2) {
  background-color: aliceblue;
  color: #4478f4;
}
.component-bottom .add-stair {
  width: 128px;
  height: 34px;
  font: normal 14px/34px Source Han Sans CN;
  color: #fff;
  background-color: #4478f4;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
}
.component-bottom .zoom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 220px;
  height: 34px;
  background: #ffffff;
  border-radius: 8px;
  padding: 0 20px;
  cursor: pointer;
}
.component-bottom .zoom .vector-two {
  width: 180px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.component-bottom .zoom .vector-two .slider-demo-block {
  height: 100%;
  line-height: 34px;
  width: 90px;
}
.icon-view-angle {
  color: #4478f4;
}
</style>
