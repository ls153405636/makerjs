<template>
  <div class="component-left">
    <div class="recommend">
      <div class="recommend-title">
        <span>推荐方案</span>
      </div>
      <div class="recommend-demo">
        <div>
          <img src="../../assets/logo.png" alt="" />
          <span>L型中式楼梯</span>
        </div>
        <div>
          <img src="../../assets/logo.png" alt="" />
          <span>L型中式楼梯</span>
        </div>
        <div>
          <img src="../../assets/logo.png" alt="" />
          <span>L型中式楼梯</span>
        </div>
        <div>
          <img src="../../assets/logo.png" alt="" />
          <span>L型中式楼梯</span>
        </div>
        <div>
          <img src="../../assets/logo.png" alt="" />
          <span>L型中式楼梯</span>
        </div>
        <div>
          <img src="../../assets/logo.png" alt="" />
          <span>L型中式楼梯</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'componentLeft',
  date() {
    return {}
  },
}
</script>

<style>
.recommend {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 80px;
  left: 10px;
  width: 205px;
  height: 800;
  background-color: #fff;
  box-shadow: 0px 4px 20px rgba(45, 48, 55, 0.1);
  border-radius: 8px;
}
.recommend .recommend-title span {
  display: block;
  width: 190px;
  height: 50px;
  font: bold 18px/50px arial;
  line-height: 50px;
  margin-bottom: 5px;
  border-bottom: 1px solid rgb(8, 8, 8);
}
.recommend .recommend-demo {
  width: 190px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.recommend .recommend-demo div {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  cursor: pointer;
}
.recommend .recommend-demo img {
  display: block;
  width: 116px;
  height: 66px;
}
.recommend .recommend-demo span {
  font-family: Source Han Sans CN;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
}
</style>
