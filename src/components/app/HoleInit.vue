<template>
  <div class="component-hole-init" id="component-hole-init">
    <div class="add-hole-main">
      <div class="hole-main-left">
        <div class="update-log">
          <div class="update-log-box">
            <div class="titel-line">
              <span>更新日志</span>
              <span class="update-time">2021/12/10</span>
            </div>
            <div v-for="(text, index) in updateText" :key="index">
              <p class="desc-text">{{ text.describe }}</p>
            </div>
          </div>
        </div>
        <div class="novice-tutorial">
          <div class="titel-line">
              <span>新手教程</span>
              <p class="look-more">查看更多<i class="iconfont icon-extend-copy"></i></p>
          </div>
          <p class="update-time"></p>
          <div v-for="(text, index) in updateText" :key="index">
            <p class="desc-text">{{ text.describe }}</p>
          </div>
        </div>
      </div>
      <div class="hole-main-right">
        <span class="hello-user">HELLO, User</span>
        <div class="hole-types">
          <div v-for="(hole, index) in hole_types" :key="index">
            <div
              class="hole-type"
              :value="hole.value"
              :class="{ activeClass: index == current }"
              @click="clickStyle(index, hole.value)"
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
      current: 0,
      updateText: [
        {
          describe: '2021/09/21  优化楼梯模梯模梯模模型......',
        },
        {
          describe: '2021/09/21  优化楼梯模梯模梯模模型......',
        },
        {
          describe: '2021/09/21  优化楼梯模梯模梯模模型......',
        },
        {
          describe: '2021/09/21  优化楼梯模梯模梯模模型......',
        },
      ],
      demoP: [
        {
          describe: '壹号别墅L形',
          id: 1,
          picSrc: '../../../images/Rectangle93.png',
        },
        {
          describe: '壹号别墅梯形',
          id: 2,
          picSrc: '../../../images/Rectangle94.png',
        },
        {
          describe: '壹号别墅圆形',
          id: 3,
          picSrc: '../../../images/Rectangle95.png',
        },
        {
          describe: '壹号别墅矩形形',
          id: 4,
          picSrc: '../../../images/Rectangle93.png',
        },
      ],
    }
  },
  methods: {
    clickStyle(index, value) {
      this.current = index
      this.cur_hole_type = value
    },
    createStair() {
      this.$store.commit({
        type: 'show_img/needMask',
        mask: false
      })
      if ([1,2,3].includes(this.current)) {
        alert('尚未开发完成')
      } else {
        let holeInit = document.getElementById('component-hole-init')
        holeInit.style.display = 'none'
        let core = new Core()
        if (this.current == 0) {
          core.execute(new Command(core.cmds.HoleInitCmd, { type: 'rect' }))
        }
        if (this.current == 1) {
          core.execute(new Command(core.cmds.HoleInitCmd, { type: 'L' }))
        }
        if (this.current == 2) {
          core.execute(new Command(core.cmds.HoleInitCmd, { type: 'trape' }))
        }
        if (this.current == 3) {
          core.execute(new Command(core.cmds.HoleInitCmd, { type: 'circle' }))
        }
      }
    },
  },
  computed: {
    ...mapState('init', ['hole_types', 'cur_hole_type']),
  },
}
</script>

<style>
.component-hole-init {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 99;
}
.add-hole-main {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -500px;
  margin-top: -290px;
  width: 1000px;
  height: 580px;
  z-index: 100;
}
/* 左侧 */
.add-hole-main .hole-main-left {
  float: left;
  width: 260px;
  height: 580px;
}
.add-hole-main .hole-main-left .update-log {
  width: 100%;
  height: 50%;
}
.add-hole-main .hole-main-left .update-log .titel-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24%;
  margin-bottom: 23px;
  font: normal 700 18px/27px Source Han Sans CN;
}
.add-hole-main .hole-main-left .update-log .titel-line .update-time {
  font: normal 400 12px/18px Source Han Sans CN;
  color: #8D8F94;
}
.add-hole-main .hole-main-left .update-log .desc-text {
  font: normal 400 14px/21px Source Han Sans CN;
  color: #2D3037;
}
.add-hole-main .hole-main-left .novice-tutorial .titel-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24%;
  margin-bottom: 23px;
  font: normal 700 18px/27px Source Han Sans CN;
}
.add-hole-main .hole-main-left .novice-tutorial .titel-line .look-more {
  position: relative;
  margin-right: 20px;
  font: normal 400 12px/18px Source Han Sans CN;
  color: #4478F4;
}
.add-hole-main .hole-main-left .novice-tutorial .titel-line .look-more .icon-extend-copy {
  position: absolute;
  top: 0;
  right: -20px;
  bottom: 5px;
  display: block;
  transform: scale(0.6);
}
.add-hole-main .hole-main-left .novice-tutorial .desc-text {
  font: normal 400 14px/21px Source Han Sans CN;
  color: #2D3037;
}
/* 右侧 */
.add-hole-main .hole-main-right {
  float: right;
  width: 740px;
  height: 580px;
  padding: 0 30px;
  box-sizing: border-box;
}
/* hello */
.add-hole-main .hole-main-right .hello-user {
  display: block;
  width: 100%;
  font: normal bold 48px/72px Source Han Sans CN;
  margin-bottom: 30px;
}
/* 洞口类型 */
.add-hole-main .hole-main-right .hole-types {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 160px;
  margin-bottom: 10px;
}
.add-hole-main .hole-main-right .hole-types .hole-type {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px;
  margin-right: 5px;
  border-radius: 8px;
  border: 1px solid rgba(68, 120, 244, 0);
  font: normal bold 18px/21px Source Han Sans CN;
  cursor: pointer;
}
.add-hole-main .hole-main-right .hole-types .hole-type-name {
  margin: 10px 0;
  font: normal bold 18px/21px Source Han Sans CN;
  cursor: pointer;
}
.add-hole-main .hole-main-right .hole-types .hole-type:hover {
  border: 1px solid rgba(26, 87, 230, 1);
}
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
  margin-top: 40px;
  background-color: #4478f4;
  cursor: pointer;
}
/* 案例 */
.add-hole-main .hole-main-right .programme {
  margin-top: 10px;
  width: 100%;
  height: 190px;
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
  height: 150px;
  margin-top: 10px;
  cursor: pointer;
}
.add-hole-main .hole-main-right .programme .demo-show .demo-programme {
  width: 24%;
  height: 100%;
  overflow: hidden;
  text-align: center;
}
.add-hole-main .hole-main-right .programme .demo-show .demo-programme .demo-name
 {
  font: normal 00 14px/21px Source Han Sans CN;
}
/* .add-hole-main
  .hole-main-right
  .programme
  .demo-show
  .demo-programme
  .programme-pic
  img {
  width: 100%;
} */
</style>
