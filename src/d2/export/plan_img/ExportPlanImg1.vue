<template>
  <!-- 顶部 -->
  <div class="header-export" id="q123">
       <el-button type="primary" class="export" @click="onSubmit()">确认导出</el-button>
       <el-button type="primary" class="back-index">返回</el-button>
  </div>

  <!-- 内容 -->
  <div class="main-export">
    <!-- 内容-左侧 -->
    <div class="left-content">
      <!-- 内容-左侧-顶部 -->
      <div class="top-text">
        <p class="dear-user">尊敬的客户您好:</p>
        <div class="description-word">
          <p>(1)请您仔细审核楼梯的款式,形状,尺寸,步高,步宽与经销商协商认可。</p>
          <p>(2)请经销商认真审核图纸尺寸,如因图纸尺寸与房子实际尺寸不相符,由经销商承担责任,有特殊要求的请以文字说明,并填写好标题栏内的每一个项目,签字及预付款到账后厂家方可生产,交货期为30天。双梁弧形交货期为60天。</p>
          <p>(3)如厂方生产的产品与图纸不相符由厂家重做。</p>
        </div>
        <span class="dimension">
          <p>单位：毫米（mm）</p>
          <span>图纸编号:<input type="text"></span>
        </span>
      </div>
      <!-- 平面图展示区域 -->
      <div id="plan-pic">
        <img src="@/assets/logo.png" alt="" class="show-img">
      </div>
      <!-- 内容-左侧-底部 -->
      <div class="buttom-text">
       <span>客户姓名：</span>
       <input type="text" class="user-name">
       <span>联系电话：</span>
       <input type="text" class="user-phone">
       <span>客户地址：</span>
       <input type="text" class="user-address">
      </div>
    </div>
    <!-- 内容-右侧 -->
    <div class="right-content">
      <div class="right-text">
        <!-- logo -->
        <span><img src="" alt=""></span>
        <div v-for="(item,index) in tableData" class="input-content">
          <span :key="index" class="description-text">{{item.name}}</span>
          <input type="input" :placeholder="item.data" class="input-text">
        </div>
        <span class="user-confirm">客户确认</span>
        <input type="text" class="user-text">
        <span class="description-text">制图</span>
        <input type="text" class="input-text">
        <span class="description-text">出图日期</span>
        <input type="text" class="input-text">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'exportPlanImg',
  data() {
    return {
      tableData: [
        {
          date: '2016-05-03',
          name: '订单号',
        },
        {
          date: '2016-05-02',
          name: '销售地址',
        },
        {
          date: '2016-05-04',
          name: '品名',
        },
        {
          date: '2016-05-01',
          name: '层高',
        },
        {
          date: '2016-05-01',
          name: '出口梁厚',
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
          name: '扶手材质',
        },
        {
          date: '2016-05-01',
          name: '梯架颜色',
        },
        {
          date: '2016-05-01',
          name: '扶手颜色',
        },
        {
          date: '2016-05-01',
          name: '梯板厚度',
        },
        {
          date: '2016-05-01',
          name: '有·无立板',
        },
        {
          date: '2016-05-01',
          name: '顶方形状',
        },
        {
          date: '2016-05-01',
          name: '大小柱形状',
        },
        {
          date: '2016-05-01',
          name: '结构件',
        },
        {
          date: '2016-05-01',
          name: '交货日期',
        },
      ],
    }
  },
  methods: {
    onSubmit() {
      // document.querySelector('.show-img').src = this.$store.state.show_img.showImgUrl
      console.log(this.$store.state.show_img.showImgUrl)
    }
    // async onSubmit() {
    //   let el = document.querySelector("#q123");
    //   await html2canvas(el, {
    //     scale: window.devicePixelRatio,
    //     width: 1500,
    //     height: 1500,
    //     // useCORS: true,
    //     // allowTaint: true,
    //   })
    //   .then(async (canvas) => {
    //     document.querySelector('.show-img').src = this.$store.state.show_img.showImgUrl
    //   })
    // }
  }
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
  border: 2px solid #000;
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
  width: 20%;
  height: 80px;
  margin-top: 0;
  font-size: 24px;
}
.main-export .left-content .top-text .description-word {
  display: block;
  width: 80%;
  height: 80px;
  margin: 0;
  font-size: 14px;
}
.main-export .left-content .top-text .description-word p{
  display: block;
  width: 100%;
  margin: 0;
  font-size: 14px;
}
.main-export .left-content .top-text .dimension{
  position: absolute;
  right: 30px;
  bottom: 0;
  display: block;
  width: 18%;
  font-size: 14px;
}
.main-export .left-content .top-text .dimension p{
  display: block;
  margin: 0;
  font-size: 16px;
}
.main-export .left-content .top-text .dimension span{
  display: block;
  margin-top: 5px;
  width: 240px;
  font-size: 16px;
}
.main-export .left-content .top-text .dimension span input{
  width: 120px;
  font-size: 16px;
  border: 0;
  border-bottom: 1px solid #000;
}
/* 中心-左侧-中间内容 */
.main-export .left-content #plan-pic {
  display: block;
  width: 100%;
  height: 85%;
  padding: 6px;
  box-sizing: border-box;
}
/* 中心-左侧-底部 */
.main-export .left-content .buttom-text {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  /* background-color: #e76262; */
}
.main-export .left-content .buttom-text span {
  float: left;
  display: block;
  width: 80px;
  height: 30px;
  line-height: 30px;
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
  width: 100%;
  height: 100%;
  border-left: 1px solid #000;
}
.main-export .right-content .right-text .input-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30px;
}
.main-export .right-content .right-text .input-content .description-text {
  display: block;
  width: 35%;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  text-align: center;
  box-sizing: border-box;
  border: 0;
  border-bottom: 1px solid #000;
  background-color: #ffffff;
}
.main-export .right-content .right-text .input-content .input-text {
  display: inline-block;
  height: 100%;
  outline:none;  
  margin: 0;
  box-sizing: border-box;
  border: 0;
  border-bottom: 1px solid #000;
  border-left: 1px solid #000;
  background-color: #ffffff;
}
.main-export .right-content .right-text .description-text {
  display: block;
  float: left;
  width: 35%;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  text-align: center;
  box-sizing: border-box;
  border: 0;
  border-bottom: 1px solid #000;
  background-color: #ffffff;
}
.main-export .right-content .right-text .input-text {
  display: block;
  float: left;
  width: 65%;
  height: 30px;
  outline:none;  
  margin: 0;
  box-sizing: border-box;
  border: 0;
  border-bottom: 1px solid #000;
  border-left: 1px solid #000;
  background-color: #ffffff;
}
.main-export .right-content .right-text .user-confirm {
  display: block;
  float: left;
  width: 10%;
  height: 100px;
  line-height: 20px;
  font-size: 14px;
  text-align: center;
  box-sizing: border-box;
  border: 0;
  padding-top: 5px;
  border-bottom: 1px solid #000;
  background-color: #ffffff;
}
.main-export .right-content .right-text .user-text {
  display: block;
  float: left;
  width: 90%;
  height: 100px;
  outline:none;  
  margin: 0;
  box-sizing: border-box;
  border: 0;
  border-bottom: 1px solid #000;
  border-left: 1px solid #000;
  background-color: #ffffff;
}
.main-export .right-content .right-text span {
  display: block;
  width: 100%;
  height: 121px;
  border-bottom: 1px solid #000;
  box-sizing: border-box;
  /* background-color: #e76262; */
}
</style>