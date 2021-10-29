<template>
  <div class="component-stair-init" id="component-stair-init">
    <div class="add-stair-main">
      <span class="add-stair">选择需要新增的楼梯</span>
      <div class="type-select">
        <div class="type">
          <div class="stair-1">
            <img src="../../../public/images/stairs 1.png" alt="" />
          </div>
          <p class="type-text">楼梯类型</p>
          <el-select v-model="value1" placeholder="整体楼梯">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </div>
        <div class="type">
          <div class="stair-2">
            <img src="../../../public/images/shelves 1.png" alt="" />
          </div>
          <p class="type-text">靠墙方式</p>
          <el-select v-model="value2" placeholder="左靠墙">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </div>
        <div class="type">
          <div class="stair-3">
            <img src="../../../public/images/home 1.png" alt="" />
          </div>
          <p class="type-text">楼梯形状</p>
          <el-select v-model="value3" placeholder="直形">
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </div>
        <div class="type">
          <div class="stair-4">
            <img src="../../../public/images/pictures 2.png" alt="" />
          </div>
          <p class="type-text">转向方式</p>
          <el-select v-model="value4" placeholder="左转">
            <el-option
              v-for="item in options4"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="btn-stair" @click="clickCreate" id="btn-stair">确认创建</div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
import { Core } from '../../common/core'
import { Command } from '../../common/command'

export default defineComponent({
  name: 'componentStairInit',
  data() {
    return {
      options1: ref([
        {
          value: '整体楼梯',
          label: '整体楼梯',
        },
        {
          value: '水泥楼梯',
          label: '水泥楼梯',
        },
      ]),
      value1: ref(''),
      options2: ref([
        {
          value: '左靠墙',
          label: '左靠墙',
        },
        {
          value: '右靠墙',
          label: '右靠墙',
        },
        {
          value: '不靠墙',
          label: '不靠墙',
        },
      ]),
      value2: ref(''),
      options3: ref([
        {
          value: '直形',
          label: '直形',
        },
        {
          value: 'L形',
          label: 'L形',
        },
        {
          value: '小U形',
          label: '小U形',
        },
        {
          value: '大U形',
          label: '大U形',
        },
        {
          value: '弧形',
          label: '弧形',
        },
        {
          value: '回形',
          label: '回形',
        },
        {
          value: '中心旋转形',
          label: '中心旋转形',
        },
      ]),
      value3: ref(''),
      options4: ref([
        {
          value: '左转',
          label: '左转',
        },
        {
          value: '右转',
          label: '右转',
        },
      ]),
      value4: ref(''),
    }
  },
  methods: {
    clickCreate() {
      let stairInit = document.getElementById('component-stair-init')
      stairInit.style.display = 'none'
      let core = new Core()
      core.execute(new Command(core.cmds.StairInitCmd, { type, againstWall }))
    },
  },
})
</script>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
/* 背景蒙版 */
.component-stair-init {
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
}
/* 主体区域 */
.add-stair-main {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -555px;
  margin-top: -290px;
  width: 1110px;
  height: 580px;
  z-index: 100;
  background-color: #ffffff;
}
.add-stair-main .add-stair {
  display: block;
  width: 100%;
  height: 150px;
  font: normal bold 32px/150px Source Han Sans CN;
  padding-left: 50px;
  box-sizing: border-box;
}
.add-stair-main .type-select {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 300px;
  padding: 30px 100px;
  box-sizing: border-box;
}
.add-stair-main .type-select .type {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
  height: 100%;
}
.add-stair-main .type-select .type .type-text {
  width: 100px;
  height: 20px;
  margin: 10px;
  font: normal bold 18px/20px Source Han Sans CN;
  text-align: center;
}
.add-stair-main .type-select .el-input__inner {
  display: block;
  width: 120px;
  padding: 0 4px 0 10px;
  color: #245ada;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  box-sizing: border-box;
  line-height: 30px;
}
.add-stair-main .type-select .el-icon--right {
  margin-left: 30px;
}
.add-stair-main .btn-stair {
  position: absolute;
  left: 50%;
  width: 230px;
  height: 70px;
  margin-left: -115px;
  font: normal bold 23px/70px Source Han Sans CN;
  text-align: center;
  color: #ffffff;
  background-color: #4478f4;
  border-radius: 4px;
  cursor: pointer;
}
</style>
