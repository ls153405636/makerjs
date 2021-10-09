<template>
  <div id="canvas"></div>
</template>

<script>
//import movie from "/src/d2/movie";

import init_temp from "../../init_temp";
import d2_action from "/src/d2/d2_action";


export default {
  name: "App",
  components: {
  },
  mounted() {
    d2_action.initD2()  
    init_temp.initProj()
  },
};
</script>