<template>
  <div class="component-left">
    <el-card class="box-card-left">
      <template #header>
        <div class="card-header">
          <span>推荐方案</span>
          <div>
            <i class="iconfont icon-find-zoom"></i>
            <i class="iconfont icon-screening"></i>
          </div>
        </div>
      </template>
      <el-col class="demo-show" v-for="(stair, index) in stairD" :key="index">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img :src="stair.picSrc" class="image" />
          <div class="caption">
            <span class="topic-name">{{ stair.topicName }}</span>
            <span class="describe-text">{{ stair.describeText }}</span>
          </div>
        </el-card>
      </el-col>
      <el-pagination small background layout="prev, pager, next" :total="60"> </el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'componentLeft',
  data() {
    return {
      stairD: [
        {
          topicName: '壹号别墅L形',
          describeText: '方案描述方案描述方案描述方述方案描...',
          id: 1,
          picSrc: '../../../images/Rectangle93.png',
        },
        {
          topicName: '壹号别墅梯形',
          describeText: '方案描述方案描述方案描述方述方案描...',
          id: 2,
          picSrc: '../../../images/Rectangle94.png',
        },
        {
          topicName: '壹号别墅圆形',
          describeText: '方案描述方案描述方案描述方述方案描...',
          id: 3,
          picSrc: '../../../images/Rectangle95.png',
        },
        // {
        //   topicName: '壹号别墅矩形形',
        //   describeText: '方案描述方案描述方案描述方述方案描...',
        //   id: 4,
        //   picSrc: '../../../images/Rectangle93.png',
        // },
        // {
        //   topicName: '壹号别墅矩形形',
        //   describeText: '方案描述方案描述方案描述方述方案描...',
        //   id: 5,
        //   picSrc: '../../../images/Rectangle93.png',
        // },
      ],
    }
  },
}
</script>

<style scoped>
.box-card-left {
  position: fixed;
  top: 60px;
  left: 20px;
  width: 280px;
  height: 840px;
  border-radius: 8px;
}
.box-card-left .card-header span {
  font: normal 700 18px/27px Source Han Sans CN;
}
.box-card-left .el-card__body {
  height: 100%;
  padding: 10px 20px 0;
}
.box-card-left .card-header .iconfont {
  color: #2D3037;
  cursor: pointer;
}
.box-card-left .card-header .icon-screening {
  margin-left: 10px;
}
.box-card-left .card-header .iconfont:hover {
  color: #4478F4;
}
.box-card-left .demo-show {
  width: 240px;
  height: 210px;
  background-color: #fff;
  cursor: pointer;
  margin: 0 0 20px;
  border: none;
  box-shadow: 0px 4px 10px 0px #2D30370D;

}
.box-card-left .demo-show .image {
  display: block;
  width: 100%;
  height: 135px;
  background-color: #fff;
  cursor: pointer;
}
.box-card-left .demo-show .caption {
  height: 75px;
  display: block;
  padding: 10px;
  box-sizing: border-box;
}
.box-card-left .demo-show .caption .topic-name {
  display: block;
  color: #2D3037;
  font: normal 00 14px/21px Source Han Sans CN;
}
.box-card-left .demo-show .caption .describe-text {
  display: block;
  color: #A5A7AB;
  margin-top: 4px;
  font: normal 500 12px/18px Source Han Sans CN;
}
.box-card-left .el-pagination {
  position: absolute;
  bottom: 30px;
}
</style>
