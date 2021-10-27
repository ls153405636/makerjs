<template>
  <div class="args">
    <div class="right-menu"></div>
  </div>
</template>

<script>
import rightHole from '../right_attributes/Hole.vue'
export default {
  name: 'args',
  components: {
    rightHole,
  },
  data() {
    return {
      rect_args: {
        length: { name: '长', value: 4000, type: 'input' },
        height: { name: '宽', value: 3000, type: 'input' },
      },
    }
  },
  props: {
    args: Object,
  },
}
</script>
<style>
.right-menu {
  position: absolute;
  right: 0;
  top: 80px;
  width: 330px;
  height: 800px;
  background-color: #fff;
  box-shadow: 0px 4px 20px rgba(45, 48, 55, 0.1);
  border-radius: 8px;
}
</style>
