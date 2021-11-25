<template>
  <div id="app">
    <!-- 根路由出口 -->
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>

export default {
  name: 'App',
  activated: function() {
    this.getCase()
  }
}
</script>
<style></style>
