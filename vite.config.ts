import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  server:{
    port:3002
  },
  plugins: [vue(), Components()]
})