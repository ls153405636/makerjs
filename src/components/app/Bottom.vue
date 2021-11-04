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
        <i class="iconfont icon-view-angle"></i>
      </div>
      <div class="vector-two">
        <div class="vector-two-left">
          <i class="iconfont icon-down"></i>
        </div>
        <div class="slider-demo-block">
          <el-slider v-model="value"></el-slider>
        </div>
        <div class="vector-two-right">
          <i class="iconfont icon-up"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'componentBottom',
  data() {
    const value = ref(0)

    const formatTooltip = (val) => {
      return val / 100
    }

    return {
      value,
      formatTooltip,
    }
  },
  methods: {
    addStair() {
      let stairInit = document.getElementById('component-stair-init')
      stairInit.style.display = 'block'
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
