<template>
<div class="export-plan-img">
  <!-- 顶部 -->
  <div class="header-export" id="q123">
       <!-- <el-button type="primary" class="export" @click="adddownloadImg()">载入截图</el-button> -->
       <el-button type="primary" class="export" @click="downloadImg()">下载图片</el-button>
       <el-button type="primary" class="back-index" @click="backHome()">返回</el-button>
  </div>

  <!-- 内容 -->
  <div class="main-export">
    <!-- 内容-左侧 -->
    <div class="left-content">
      <!-- 内容-左侧-顶部 -->
      <div class="top-text">
        <!-- <p class="dear-user">尊敬的客户您好:</p> -->
        <div class="description-word">
          尊敬的客户您好:
          <p>(1)请您仔细审核楼梯的款式,形状,尺寸,步高,步宽与经销商协商认可。</p>
          <p>(2)请经销商认真审核图纸尺寸,如因图纸尺寸与房子实际尺寸不相符,由经销商承担责任,有特殊要求的请以文字说明,并填写好标题栏内的每一个项目,签字及预付款到账后厂家方可生产,交货期为30天。双梁弧形交货期为60天。</p>
          <!-- <p>(3)如厂方生产的产品与图纸不相符由厂家重做。</p> -->
        </div>
        <span class="dimension">
          <p>单位：毫米（mm）</p>
        </span>
      </div>
      <!-- 平面图展示区域 -->
      <div id="plan-pic">
        <!-- <div id="canvas"></div> -->
        <!-- <img src=""  class="show-img"> -->
      </div>
      <!-- 内容-左侧-底部 -->
      <div class="buttom-text">
       <span>客户姓名</span>
       <input type="text" class="user-name">
       <span>联系电话</span>
       <input type="text" class="user-phone">
       <span>客户地址</span>
       <input type="text" class="user-address">
      </div>
    </div>
    <!-- 内容-右侧 -->
    <div class="right-content">
      <div class="right-text">
        <!-- logo -->
        <span class="logo-img">
          <p class="logo">logo</p>
          <p class="vendor-name">经销商名称</p>
        </span>
        <div class="text-message">
          <div v-for="(item,index) in tableData" class="input-content">
            <span :key="index" class="description-text">{{item.name}}</span>
            <input type="input" :placeholder="item.data" class="input-text">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import html2canvas from 'html2canvas'
export default {
  name: 'exportPlanImg',
  data() {
    return {
      name: '编号',
      tableData: [
        {
          date: '',
          name: '经销商订单号',
        },
        {
          date: '',
          name: '楼梯款式',
        },
        {
          date: '',
          name: '层高',
        },
        {
          date: '2016-05-01',
          name: '出口梁厚',
        },
        {
          date: '2016-05-01',
          name: '入口梁厚',
        },
        {
          date: '2016-05-01',
          name: '步长',
        },
        {
          date: '2016-05-01',
          name: '步宽',
        },
        {
          date: '2016-05-01',
          name: '步高',
        },
        {
          date: '2016-05-01',
          name: '总步数',
        },
        {
          date: '2016-05-01',
          name: '梯架材质',
        },
        {
          date: '2016-05-01',
          name: '梯板材质',
        },
        {
          date: '2016-05-01',
          name: '顶方材质',
        },
        {
          date: '2016-05-01',
          name: '梯架颜色',
        },
        {
          date: '2016-05-01',
          name: '顶方颜色',
        },
        {
          date: '2016-05-01',
          name: '梯板厚度',
        },
        {
          date: '2016-05-01',
          name: '指接/直拼',
        },
        {
          date: '2016-05-01',
          name: '有/无立板',
        },
        {
          date: '2016-05-01',
          name: '顶方规格',
        },
        {
          date: '2016-05-01',
          name: '起步大柱型号规格',
        },
        {
          date: '2016-05-01',
          name: '大柱型号规格',
        },
        {
          date: '2016-05-01',
          name: '小柱型号规格',
        },
        {
          date: '2016-05-01',
          name: '踢脚线',
        },
        {
          date: '2016-05-01',
          name: '出图日期',
        },
        {
          date: '2016-05-01',
          name: '交货日期',
        },
        {
          date: '2016-05-01',
          name: '制图',
        },
        {
          date: '2016-05-01',
          name: '审图',
        },
        {
          date: '2016-05-01',
          name: '客户签字',
        },
        {
          date: '2016-05-01',
          name: '经销商签字',
        },
      ],
    }
  },
  methods:{
    backHome() {
      window.stage[0].visible = 1
      localStorage.clear()
      document.querySelector("#plan-pic").innerHTML = '' // 清除图片
      document.querySelector(".components").style.display = 'block'
      document.querySelector("#canvas").style.display = 'block'
      document.querySelector('.export-plan').style.display = 'none'
      document.querySelector('.shot-img').style.display = 'none'
      
    },
    async downloadImg(){
      let canvas = await html2canvas(document.querySelector(".main-export"),{
          dpi: window.devicePixelRatio,
          scale: 1, 
          allowTaint: true, 
          useCORS: true, 
      });
      
      // 下载功能
      var save_url=canvas.toDataURL("image/png");
      var a=document.createElement('a')
      document.body.appendChild(a)
      a.href=save_url
      a.download="平面图纸" + this.name
      a.click()
    },
  },
}
</script>

<style scoped>
/* 顶部 */
.header-export { 
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 62px;
  background-color: rgba(255, 255, 255, 0.1);
  line-height: 62px;
  box-shadow: 5px 0 5px #d3d3d3;
  margin-bottom: 20px;
}
.header-export .export {
  width: 100px;
  height: 40px;
}
.header-export .back-index {
  position: absolute;
  right: 20px;
  height: 40px;
}

/* 中心内容 */
.main-export {
  position: fixed;
  display: flex;
  justify-content: space-between;
  left: 50%;
  width: 1202px;
  height: 850px;
  margin-top: 75px;
  margin-left: -601px;
  border: 3px solid #000;
}
/* 中心-左侧 */
.main-export .left-content {
  position: relative;
  width: 80%;
  height: 100%;
}
/* 中心-左侧-顶部 */
.main-export .left-content .top-text {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 15%;
  padding: 10px;
  box-sizing: border-box;
}
.main-export .left-content .top-text .dear-user {
  display: block;
  width: 100%;
  margin-top: 0;
  font-size: 14px;
}
.main-export .left-content .top-text .description-word {
  /* display: block;
  width: 100%;
  height: 80px;
  margin: 0; */
  font-size: 14px;
}
.main-export .left-content .top-text .description-word p{
  /* display: block;
  width: 100%; */
  margin: 0;
  font-size: 14px;
}
.main-export .left-content .top-text .dimension{
  position: absolute;
  right: 50px;
  bottom: 20px;
  display: block;
  width: 18%;
  font-size: 14px;
}
.main-export .left-content .top-text .dimension p{
  display: block;
  margin: 0;
  font-size: 14px;
}
.main-export .left-content .top-text .dimension span{
  display: block;
  margin-top: 5px;
  width: 240px;
  font-size: 14px;
}
.main-export .left-content .top-text .dimension span input{
  width: 120px;
  font-size: 14px;
  border: 0;
  border-bottom: 1px solid #000;
}
/* 中心-左侧-中间内容 */
.main-export .left-content #plan-pic {
  display: block;
  width: 100%;
  height: 81%;
  padding: 6px;
  box-sizing: border-box;
  /* background-color: aqua; */
  overflow: hidden;
}
.main-export .left-content #plan-pic .show-img {
  display: block;
  width: 99%;
  height: 99%;
}
/* 中心-左侧-底部 */
.main-export .left-content .buttom-text {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 26.39px;
  /* background-color: #e76262; */
}
.main-export .left-content .buttom-text span {
  float: left;
  display: block;
  width: 80px;
  height: 26px;
  line-height: 26.39px;
  font-size: 14px;
  text-align: center;
  box-sizing: border-box;
  border: 0;
  border-top: 1px solid #000;
  border-right: 1px solid #000;
  background-color: #ffffff;
}
.main-export .left-content .buttom-text input {
  display: block;
  float: left;
  width: 120px;
  height: 100%;
  outline:none;  
  box-sizing: border-box;
  border: none;
  border-top: 1px solid #000;
  border-right: 1px solid #000;
  background-color: #ffffff;
}
.main-export .left-content .buttom-text input.user-address {
  width: 481px;
  border-right: none;
}
/* 中心-右侧 */
.main-export .right-content {
  width: 20%;
  height: 100%;
}
.main-export .right-content .right-text {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border-left: 1px solid #000;
}
.main-export .right-content .right-text .logo-img {
  display: block;
  width: 100%;
  height: 15%;
  border-bottom: 1px solid #000;
  border-right: 1px solid #000;
  box-sizing: border-box;
  /* background-color: #c09393; */
}
.main-export .right-content .right-text .logo-img .logo{
  display: block;
  height: 60%;
  margin: 0;
  font-size: 36px;
  padding-top: 10px;
  text-align: center;
  /* background-color: aquamarine; */
}
.main-export .right-content .right-text .logo-img .vendor-name {
  height: 25%;
  margin: 0;
  text-align: center;
}
.main-export .right-content .right-text .text-message {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;
}
.main-export .right-content .right-text .text-message .input-content {
  display: flex;
  justify-content: stretch;
  flex: 1;
  width: 100%;
  font-size: 14px;
}
.main-export .right-content .right-text .text-message .input-content .description-text {
  width: 50%;
  border-top: 1px solid #000;
  border-right: 1px solid #000;
}
.main-export .right-content .right-text .text-message .input-content .input-text {
  outline: none;
  border: none;
  width: 50%;
  border-top: 1px solid #000;
  border-right: 1px solid #000;
  box-sizing: border-box;
}


</style>