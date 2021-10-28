<template>
  <div class="component-left">
    <el-card class="box-card-left">
      <template #header>
        <div class="card-header">
          <span>推荐方案</span>
        </div>
      </template>
      <el-col class="demo-show" v-for="(stair, index) in stairD" :key="index">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img :src="stair.picSrc" class="image" />
          <span class="dec-text">{{ stair.describe }}</span>
        </el-card>
      </el-col>
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
        {
          describe: '壹号别墅矩形形',
          id: 5,
          picSrc: '../../../public/images/Rectangle 93.png',
        },
      ],
    }
  },
}
</script>

<style>
.box-card-left {
  position: fixed;
  top: 80px;
  left: 10px;
  width: 205px;
  height: 800px;
}
.box-card-left .demo-show {
  cursor: pointer;
  margin: 6px 0;
}
.box-card-left .demo-show .dec-text {
  height: 30px;
  display: block;
  font-size: 12px;
  line-height: 30px;
  text-align: center;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}
</style>
