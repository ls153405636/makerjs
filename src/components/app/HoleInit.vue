<template>
  <div class="component-hole-init" id="component-hole-init">
    <div class="add-hole-main">
      <div class="hole-main-left">
        <div class="update-log">
          <div class="update-log-box">
            <span>更新日志</span>
            <p class="update-time"></p>
          </div>
          <div v-for="(text, index) in updateText" :key="index">
            <p>{{ text.describe }}</p>
          </div>
        </div>
        <div class="novice-tutorial"></div>
      </div>
      <div class="hole-main-right">
        <span class="hello-user">HELLO, User</span>
        <div class="hole-types">
          <div v-for="(hole, index) in hole_types" :key="index">
            <div
              class="hole-type"
              :class="hole.value == 'rect' ? 'activeClass' : ' '"
              @click="clickStyle"
            >
              <div class="draw-hole">
                <img :src="hole.imgPath" alt="" />
              </div>
              <p class="hole-type-name">{{ hole.name }}</p>
            </div>
          </div>
        </div>
        <span class="create-stair-programme" @click="createStair"
          >开始创建一个新的楼梯方案</span
        >
        <div class="programme">
          <div class="programme-two">
            <span class="my-programme">我的方案：</span>
            <span class="more-programme">更多方案>></span>
          </div>
          <div>
            <div class="demo-show">
              <div class="demo-programme" v-for="demo in demoP" :key="demo.id">
                <div class="programme-pic">
                  <img :src="demo.picSrc" alt="" />
                </div>
                <p class="demo-name">{{ demo.describe }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Command } from '../../common/command'
import { Core } from '../../common/core'
import { mapState } from 'vuex'
export default {
  name: 'componentHoleInit',
  data() {
    return {
      updateText: [
        {
          describe: '优化楼梯模梯模梯模模型',
        },
        {
          describe: '优化楼梯模梯模梯模模型',
        },
        {
          describe: '优化楼梯模梯模梯模模型',
        },
        {
          describe: '优化楼梯模梯模梯模模型',
        },
      ],
      demoP: [
        {
          describe: '壹号别墅L形',
          id: 1,
          picSrc: '../../../public/images/Rectangle 93.png',
        },
        {
          describe: '壹号别墅梯形',
          id: 2,
          picSrc: '../../../public/images/Rectangle 94.png',
        },
        {
          describe: '壹号别墅圆形',
          id: 3,
          picSrc: '../../../public/images/Rectangle 95.png',
        },
        {
          describe: '壹号别墅矩形形',
          id: 4,
          picSrc: '../../../public/images/Rectangle 93.png',
        },
      ],
    }
  },
  methods: {
    clickStyle() {
      document.getElementsByClassName('pic')
    },
    createStair() {
      let holeInit = document.getElementById('component-hole-init')
      holeInit.style.display = 'none'
      let core = new Core()
      core.execute(new Command(core.cmds.HoleInitCmd, { type: 'rect' }))
    },
  },
  computed: {
    ...mapState('init', ['hole_types']),
  },
}
</script>

<style>
.component-hole-init {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
}
.add-hole-main {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -700px;
  margin-top: -350px;
  width: 1400px;
  height: 700px;
  background-color: rgb(184, 184, 184);
  z-index: 100;
}
/* 左侧 */
.add-hole-main .hole-main-left {
  float: left;
  width: 340px;
  height: 700px;
  background-color: aquamarine;
}
/* 右侧 */
.add-hole-main .hole-main-right {
  float: right;
  width: 1060px;
  height: 700px;
  padding: 0 50px;
  box-sizing: border-box;
  background-color: #fff;
}
/* hello */
.add-hole-main .hole-main-right .hello-user {
  display: block;
  width: 100%;
  height: 120px;
  font: normal bold 48px/140px Source Han Sans CN;
}
/* 洞口类型 */
.add-hole-main .hole-main-right .hole-types {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 240px;
}
.add-hole-main .hole-main-right .hole-types .hole-type {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
  height: 200px;
  padding: 20px 10px 10px;
  margin-right: 5px;
  border-radius: 8px;
  border: 1px solid rgba(68, 120, 244, 0);
  font: normal bold 18px/30px Source Han Sans CN;
  cursor: pointer;
}
/* .add-hole-main .hole-main-right .hole-types .hole-type:hover {
  border: 1px solid rgba(26, 87, 230, 1);
} */
.add-hole-main .hole-main-right .hole-types .activeClass {
  border: 1px solid rgba(26, 87, 230, 1);
}
/* 确认创建 */
.add-hole-main .hole-main-right .create-stair-programme {
  display: block;
  width: 100%;
  height: 64px;
  font: normal bold 18px/64px Source Han Sans CN;
  text-align: center;
  color: #fff;
  border-radius: 4px;
  margin-top: 10px;
  background-color: #4478f4;
  cursor: pointer;
}
/* 案例 */
.add-hole-main .hole-main-right .programme {
  margin-top: 20px;
  width: 100%;
  height: 250px;
}
.add-hole-main .hole-main-right .programme .programme-two {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  cursor: pointer;
}
.add-hole-main .hole-main-right .programme .programme-two .my-programme {
  font: normal bold 18px/40px Source Han Sans CN;
}
.add-hole-main .hole-main-right .programme .programme-two .more-programme {
  color: #8d8d8d;
  font: normal bold 12px/40px Source Han Sans CN;
}
.add-hole-main .hole-main-right .programme .demo-show {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 180px;
  margin-top: 10px;
  cursor: pointer;
}
.add-hole-main .hole-main-right .programme .demo-show .demo-programme {
  width: 200px;
  height: 100%;
  overflow: hidden;
  text-align: center;
}
.add-hole-main
  .hole-main-right
  .programme
  .demo-show
  .demo-programme
  .programme-pic
  img {
  width: 100%;
}
</style>
