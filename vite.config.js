import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    minify   : false,
    sourcemap: true,
  }
  // resolve: {
  //   alias: [
  //     { find: '@', replacement: resolve(__dirname, 'src') }
  //   ]
  // }
})
