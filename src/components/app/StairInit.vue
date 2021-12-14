<template>
  <div class="component-stair-init" id="component-stair-init">
    <div class="add-stair-main">
      <span class="add-stair">选择需要新增的楼梯</span>
      <div class="type-select">
        <div class="type">
          <div class="stair-1">
            <img src="../../assets/stairs1.png" alt="" />
          </div>
          <p class="type-text">{{ stair_types.name }}</p>
          <el-select
            v-model="stair_types.value.value"
            :label="stair_types.value.label"
          >
            <el-option
              v-for="item in stair_types.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </div>
        <div class="type">
          <div class="stair-1">
            <img src="../../assets/home1.png" alt="" />
          </div>
          <p class="type-text">{{ stair_shape_options.name }}</p>
          <el-select
            v-model="stair_shape_options.value.value"
            :label="stair_shape_options.value.label"
          >
            <el-option
              v-for="item in stair_shape_options.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </div>
        <div class="type">
          <div class="stair-1">
            <img src="../../assets/shelves1.png" alt="" />
          </div>
          <p class="type-text">{{ stair_against_wall_options.name }}</p>
          <el-select
            v-model="stair_against_wall_options.value.value"
            :label="stair_against_wall_options.value.label"
          >
            <el-option
              v-for="item in stair_against_wall_options.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </div>
        <div class="type">
          <div class="stair-1">
            <img src="../../assets/pictures2.png" alt="" />
          </div>
          <p class="type-text">{{ stair_dir_options.name }}</p>
          <el-select
            v-model="stair_dir_options.value.value"
            :label="stair_dir_options.value.label"
           
          >
            <el-option
              v-for="item in stair_dir_options.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              
            >
            </el-option>
          </el-select>
        </div>
        <!-- <div class="type">
          <div class="stair-1">
            <img src="../../assets/stairs1.png" alt="" />
          </div>
          <div class="block">
          <p class="type-text">{{ stair_against_wall_options.name }}</p>
            <el-cascader
              
              :options="stair_against_wall_options.options"
              :props="{ expandTrigger: 'hover' }"
            ></el-cascader>
          </div>
        </div> -->
      </div>
      <div class="btn-stair" @click="clickCreate" id="btn-stair">确认创建</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { ref } from 'vue'
import { Core } from '../../common/core'
import { Command } from '../../common/command'
import { mapState } from 'vuex'

export default defineComponent({
  setup() {
    // const state = reactive({
    //   value: {
        
    //       value: '左靠墙',
    //       label: '左靠墙',
    //       children: [
    //         {
    //           value: '右转',
    //           label: '右转',
    //         },
    //       ],
    //   },
    //   options: [
    //     {
    //       value: '左靠墙',
    //       label: '左靠墙',
    //       children: [
    //         {
    //           value: '右转',
    //           label: '右转',
    //         },
    //       ],
    //     },
    //     {
    //       value: '右靠墙',
    //       label: '右靠墙',
    //       children: [
    //         {
    //           value: '左转',
    //           label: '左转',
    //         },
    //       ],
    //     },
    //     {
    //       value: '不靠墙',
    //       label: '不靠墙',
    //       children: [
    //         {
    //           value: '左转',
    //           label: '左转',
    //         },
    //         {
    //           value: '右转',
    //           label: '右转',
    //         },
    //       ],
    //     },
    //   ],
    // })
    // const handleChange = (value) => {
    //   console.log(value)
    // }
    // return {
    //   ...toRefs(state),
    //   handleChange,
    // }
  },
  methods: {
    // getMsg (value) {
    //   console.log(value)
    //   if (value === 3) {
    //     this.isDisabled = false
    //   } else {
    //     this.isDisabled = false
    //   }
    // },
    // getMsg1(value) {
    //   // console.log(value)
    //   // if (value === 2) {
    //   //   this.isDisabled = true
    //   // } else {
    //   //   this.isDisabled = false
    //   // }
    // },
    clickCreate() {
      this.$store.commit({
        type: 'show_img/needMask',
        mask: false
      })
      let stairInit = document.getElementById('component-stair-init')
      stairInit.style.display = 'none'
      let core = new Core()
      core.execute(
        new Command(core.cmds.StairInitCmd, {
          againstWall: this.stair_against_wall_options.value.value,
          type: this.stair_shape_options.value.value,
          floadSide: this.stair_dir_options.value.value,
        })
      )
      this.$message.success('楼梯创建成功！')
    },
  },
  computed: {
    ...mapState('init', [
      'stair_types',
      'stair_against_wall_options',
      'stair_against_wall_options1',
      'stair_shape_options',
      'stair_dir_options',
    ]),
  },
})

// export default defineComponent({
//   name: 'componentStairInit',
//   data() {
//     return {
//       isDisabled: false,
      
//     }
//   },
  
// })
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
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 99;
}
/* 主体区域 */
.add-stair-main {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -555px;
  margin-top: -290px;
  width: 1000px;
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
