<template>
  <div class="component-top">
    <div class="top-name">楼梯设计工具</div>
    <div class="center-icons">
      <div class="options">
        <i class="iconfont icon-tool-revocation"></i>
        <span>撤销</span>
      </div>
      <div class="options">
        <i class="iconfont icon-tool-recover"></i>
        <span>恢复</span>
      </div>
      <div class="options"> 
        <i class="iconfont icon-tool-new"></i>
        <span>新建</span>
      </div>
      <div class="options">
        <i class="iconfont icon-tool-save"></i>
        <span>保存</span>
      </div>
      <div class="options">
        <i class="iconfont icon-tool-clear"></i>
        <span>清空</span>
      </div>
      <div class="options">
        <span class="line"></span>
      </div>
        <el-dropdown class="options"> 
          <span class="el-dropdown-link">
            <i class="iconfont icon-tool-download"></i>
            <span class="export-img">导出</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="onSubmit()">导出平面图</el-dropdown-item>
              <el-dropdown-item disabled>导出报价清单</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      <div class="options">
        <i class="iconfont icon-tool-picture"></i>
        <span>上传</span>
      </div>
      <div class="options">
        <i class="iconfont icon-tool-apply"></i>
        <span>去装修</span>
      </div>
    </div>
    <div class="right-icons">
      <div class="options">
        <i class="iconfont icon-tool-revocation"></i>
        <span>方案</span>
      </div>
      <div class="options">
        <i class="iconfont icon-tool-revocation"></i>
        <span>帮助</span>
      </div>
      <div class="options">
        <i class="iconfont icon-tool-revocation"></i>
        <span>帮助</span>
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
import { stage_scale_context } from '../../d2/fsm/stage_scale';
export default {
  name: 'componentTop',
  data() {
    return {
      imgUrl: ''
    }
  },
  methods: {
    onSubmit() {
      // stage_scale_context.set_scale(1, true)
      let el = document.querySelector("#canvas");
      html2canvas(el, {
        scale: window.devicePixelRatio,
        width: 950,
        height: 710,
        x: 500,
        y: 120,
        allowTaint: true,
      })
      .then((canvas) => {
        this.imgUrl = canvas.toDataURL();
        this.$store.commit({
          type: 'show_img/getImgUrl',
          url: this.imgUrl
        })
        localStorage.setItem('img_url',this.imgUrl)
        this.$router.push({
          name: 'export',
        })
        setTimeout(() => {
          window.location.reload()
        },10)
        
      })
    }
  }
}
</script>

<style>
.iconfont {
  color: #c4c4c4;
  font-size: 24px;
  line-height: 30px;
}
.iconfont:hover {
  color: #4478f4;
}
.component-top {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  justify-content: space-between;
  align-items: flex-end;
  -webkit-box-align: center;
  width: 100%;
  height: 62px;
  background-color: #fff;
  line-height: 62px;
  box-shadow: 5px 0 5px #d3d3d3;
}
.component-top .top-name {
  width: 150px;
  font-size: 20px;
  padding-left: 10px;
}
.component-top .right-icons {
  width: 150px;
  padding-right: 10px;
}
.component-top .center-icons .options {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 6px 3px 6px;
  width: 50px;
  height: 62px;
  margin-right: 0 2px;
  float: left;
  cursor: pointer;
}
.component-top .right-icons .options {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 6px;
  width: 50px;
  height: 62px;
  margin-right: 0 2px;
  float: left;
  cursor: pointer;
}
.component-top .center-icons div span {
  font: normal 500 14px/21px Source Han Sans CN;
}
.component-top .right-icons div span {
  font: normal 500 14px/21px Source Han Sans CN;
}
.component-top .center-icons div:nth-child(6) {
  padding: 0;
  margin-top: 15px;
  width: 1px;
  height: 22px;
  border-right: 1px solid #dbdbdb;
}
.export-img {
  margin: 0;
}
.el-dropdown-link {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
