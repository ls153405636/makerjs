<template>
  <div class="right-hole">
    <span class="args-title">楼梯参数</span>
    <el-scrollbar class="args-menu">
      <template class="args-list" v-for="arg in rect_args" :key="arg.id">
        <p class="args-name">
          {{ arg.name
          }}<input class="args-data" :type="arg.type" :value="arg.value" />
        </p>
      </template>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'rightHole',
  data() {
    return {
      rect_args: {
        1: { id: 1, name: '长', value: 4000, type: 'input' },
        2: { id: 2, name: '宽', value: 3000, type: 'input' },
        3: { id: 3, name: '宽', value: 3000, type: 'input' },
        4: { id: 4, name: '宽', value: 3000, type: 'input' },
        5: { id: 5, name: '宽', value: 3000, type: 'input' },
        6: { id: 6, name: '宽', value: 3000, type: 'input' },
        7: { id: 7, name: '宽', value: 3000, type: 'input' },
        8: { id: 8, name: '宽', value: 3000, type: 'input' },
        9: { id: 9, name: '宽', value: 3000, type: 'input' },
        10: { id: 10, name: '宽', value: 3000, type: 'input' },
        11: { id: 11, name: '宽', value: 3000, type: 'input' },
        12: { id: 12, name: '宽', value: 3000, type: 'input' },
        13: { id: 13, name: '宽', value: 3000, type: 'input' },
        14: { id: 14, name: '宽', value: 3000, type: 'input' },
        15: { id: 15, name: '宽', value: 3000, type: 'input' },
        16: { id: 16, name: '宽', value: 3000, type: 'input' },
        17: { id: 17, name: '宽', value: 3000, type: 'input' },
        18: { id: 18, name: '宽', value: 3000, type: 'input' },
        19: { id: 19, name: '宽', value: 3000, type: 'input' },
        20: { id: 20, name: '宽', value: 3000, type: 'input' },
      },
    }
  },
  computed: {
    // ...mapState('hole', ['rect_args'])
  },
  methods: {},
}
</script>
<style>
.right-hole {
  width: 330px;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.args-title {
  display: block;
  width: 315px;
  height: 50px;
  font: bold 18px/50px arial;
  line-height: 50px;
  margin-bottom: 5px;
  border-bottom: 1px solid rgb(8, 8, 8);
}
.right-hole .args-menu {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}
</style>
