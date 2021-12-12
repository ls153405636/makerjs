<template>
  <div class="component-top">
    <div class="top-name"></div>
    <div class="center-icons">
      <div class="options"> 
        <span class="el-dropdown-link">
          <i class="iconfont icon-tool-new"></i>
          <span class="text-name">新建</span>
        </span>
      </div>
      <div class="options"> 
        <span class="el-dropdown-link">
          <i class="iconfont icon-tool-save"></i>
          <span class="text-name">保存</span>
        </span>
      </div>
      <i class="line"></i>
      <div class="options"> 
        <span class="el-dropdown-link">
          <i class="iconfont icon-tool-revocation"></i>
          <span class="text-name">撤销</span>
        </span>
      </div>
      <div class="options"> 
        <span class="el-dropdown-link">
          <i class="iconfont icon-tool-recover"></i>
          <span class="text-name">恢复</span>
        </span>
      </div>
      <el-dropdown class="options"> 
        <span class="el-dropdown-link">
          <i class="iconfont icon-tool-clear"></i>
          <span class="text-name">清空</span>
        </span>
      </el-dropdown>
      <i class="line"></i>
      <el-dropdown class="options"> 
        <span class="el-dropdown-link">
          <i class="iconfont icon-tool-download"></i>
          <span class="export-img text-name">导出</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="exportImg()">导出平面图</el-dropdown-item>
            <el-dropdown-item disabled>导出报价清单</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <div class="options"> 
        <span class="el-dropdown-link">
          <i class="iconfont icon-tool-picture"></i>
          <span class="text-name">上传</span>
        </span>
      </div>
      <div class="options"> 
        <span class="el-dropdown-link">
          <i class="iconfont icon-tool-picture"></i>
          <span class="text-name">去装修</span>
        </span>
      </div>
    </div>
    <div class="right-icons">
      <el-dropdown class="options">
        <span class="el-dropdown-link">
          <span class="right-user-name">SEEm</span>
          <i class="iconfont icon-extend-copy"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item disabled>个人中心</el-dropdown-item>
            <el-dropdown-item disabled>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown class="options">
        <span class="el-dropdown-link">
        <i class="iconfont icon-a-fi-br-interrogation1"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item disabled>快捷键</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { Core } from '../../common/core';
import { Command } from '../../common/command';
export default {
  name: 'componentTop',
  data() {
    return {
      imgUrl: '',
    }
  },
  methods: {
    exportImg() {
      console.log(localStorage)
      document.querySelector('.components').style.display = 'none'
      document.querySelector('.shot-img').style.display = 'flex'
      window.stage[0].visible = 0
      let core = new Core()
      core.execute(
        new Command(core.cmds.SelecteCmd, {
          uuid: null,
          type: null,
        })
      )
    },
  }
}
</script>

<style>
.component-top {
  position: fixed;
  display: flex;
  justify-content: space-between;
  -webkit-box-align: center;
  width: 100%;
  height: 60px;
  line-height: 60px;
  padding: 0 20px 0 20px;
  box-sizing: border-box;
}
.component-top .top-name {
  width: 154px;
  height: 36px;
  margin-top: 12px;
  font: normal bold 24px/36px Source Han Sans CN;
  color: #4478F4;
}
.component-top .center-icons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 512px;
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #2D3037;
  border-radius: 0 0 10px 10px;
}
.component-top .center-icons .options {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 6px 3px 6px;
  width: 50px;
  height: 60px;
  cursor: pointer;
}
.component-top .center-icons .line {
  display: block;
  width: 1px;
  height: 20px;
  background-color: #8D8F94;
}
.component-top .center-icons .options .el-dropdown-link {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.component-top .center-icons .options .iconfont {
  color: #fff;
  font-size: 20px;
  line-height: 30px;
}
.component-top .center-icons .options:hover .iconfont {
  color: #4478F4;
}
.component-top .center-icons .options .text-name {
  font: normal 500 12px Source Han Sans CN;
  margin-bottom: 4px;
  color: #fff;
}
.component-top .center-icons .options:hover .text-name {
  color: #4478F4;
}

.component-top .right-icons{
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 12px;
  width: 154px;
  height: 36px;
  cursor: pointer;
}
.component-top .right-icons .options .icon-a-fi-br-interrogation1{
  color: #2D3037;
  font-size: 20px;
  padding-left: 20px;
}
.component-top .right-icons .options .icon-extend-copy{
  color: #2D3037;
  font-size: 8px;
}
.component-top .right-icons .options .right-user-name{
  color: #2D3037;
  font: normal 500 14px/21px Source Han Sans CN;
}
.component-top .right-icons .options:hover .iconfont {
  color: #2D3037;

}
.component-top .right-icons .options:hover .iconfont{
  color: #4478F4;
}
.component-top .right-icons .options:hover .right-user-name{
  color: #4478F4;
}

</style>
