import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
const port = process.env.PORT || 10000;

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  devServer: {
    host: '0.0.0.0',
    port: port,
    allowedHosts: 'all',
    // 禁用默认的 host 检查，这在云平台环境中有时是必要的
    disableHostCheck: true,
  },
})
