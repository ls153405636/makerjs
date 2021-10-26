<template>
  <div class="component-hole-init">
    <div class="add-stair-main">
      <span class="add-stair">选择需要新增的楼梯</span>
      <div class="type-select">
        <div class="type">
          <div class="stair-1">
            <img src="../../../public/images/stairs 1.png" alt="" />
          </div>
          <el-col :span="8">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link"
                >楼梯类型<i class="el-icon-arrow-down el-icon--right"></i
              ></span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>整体楼梯</el-dropdown-item>
                  <el-dropdown-item>水泥楼梯</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
        </div>
        <div class="type">
          <div class="stair-2">
            <img src="../../../public/images/stairs 1.png" alt="" />
          </div>
          <el-col :span="8">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link"
                >靠墙方式<i class="el-icon-arrow-down el-icon--right"></i
              ></span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>左靠墙</el-dropdown-item>
                  <el-dropdown-item>右靠墙</el-dropdown-item>
                  <el-dropdown-item>不靠墙</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
        </div>
        <div class="type">
          <div class="stair-3">
            <img src="../../../public/images/stairs 1.png" alt="" />
          </div>
          <el-col :span="8">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link"
                >楼梯形状<i class="el-icon-arrow-down el-icon--right"></i
              ></span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>直形</el-dropdown-item>
                  <el-dropdown-item>L形</el-dropdown-item>
                  <el-dropdown-item>小U形</el-dropdown-item>
                  <el-dropdown-item>大U形</el-dropdown-item>
                  <el-dropdown-item>弧形</el-dropdown-item>
                  <el-dropdown-item>回形</el-dropdown-item>
                  <el-dropdown-item>中心旋转形</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
        </div>
        <div class="type">
          <div class="stair-4">
            <img src="../../../public/images/stairs 1.png" alt="" />
          </div>
          <el-col :span="8">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link"
                >转向方式<i class="el-icon-arrow-down el-icon--right"></i
              ></span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>左转</el-dropdown-item>
                  <el-dropdown-item>右转</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
        </div>
      </div>
      <div class="btn-stair">确认创建</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'componentHoleInit',
  date() {
    return {}
  },
}
</script>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.component-hole-init {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
}
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
  height: 100px;
  background-color: aquamarine;
}
.add-stair-main .type-select {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 300px;
  padding: 0 50px;
  box-sizing: border-box;
  background-color: rgb(14, 133, 93);
}
.add-stair-main .type-select .type {
  width: 180px;
  height: 100%;
}
.add-stair-main .type-select .type img {
  width: 170px;
}
</style>
