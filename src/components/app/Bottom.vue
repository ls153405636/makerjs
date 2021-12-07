<template>
  <div class="component-bottom">
    <div class="D23">
      <div class="d2-d3">
        <!-- <span  @click="changleMode('2d')" :class="cur_mode == '2d' ? isCurrent: ''">2D</span> -->
        <span  @click="changleMode('2d')" :class="{current:this.$store.state.canvas.cur_mode == '2d'}">2D</span>
        <span  @click="changleMode('3d')" :class="{current:this.$store.state.canvas.cur_mode == '3d'}">3D</span>
      </div>
    </div>
    <div class="add-stair-btn" @click="addStair">添加楼梯</div>
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
import { Core } from '../../common/core'
import { Command } from '../../common/command'
import { mapState } from 'vuex'
import { CUR_DATA } from '../../common/common_config'
export default defineComponent({
  name: 'componentBottom',
  data() {
    const value = ref(100)
    let isCurrent = 'current'
    const formatTooltip = (val) => {
      return val + '%'
    }

    return {
      value,
      isCurrent,
      // curMode,
      formatTooltip,
    }
  },
  computed: {
    ...mapState('canvas', ['cur_mode']),

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
    changleMode(vMode) {
      console.log(this.$store.state.canvas.cur_mode)
      if(CUR_DATA.MODE !== vMode) {
        let core = new Core()
        core.execute(new Command(core.cmds.SwitchCmd, vMode))
      }
    }
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
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  font: normal 14px/34px Source Han Sans CN;
  color: #4478f4;
  text-align: center;
}
.component-bottom .d2-d3 span {
  float: left;
  width: 50%;
  height: 100%;
}
.component-bottom .d2-d3 .current {
  float: left;
  width: 50%;
  height: 100%;
  background-color: #4478f4;
  color: #fff;
}
.component-bottom .add-stair-btn {
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
