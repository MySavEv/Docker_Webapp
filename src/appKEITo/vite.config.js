import { defineConfig ,loadEnv  } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/

export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    plugins: [vue()],
  resolve: {
    alias: {
      '@src': fileURLToPath(new URL('./src', import.meta.url)),
      '@util': fileURLToPath(new URL('./src/util', import.meta.url)),
      '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
    }
  },
  build: {
    // ระบุโฟลเดอร์สำหรับเก็บไฟล์ build
    outDir: '../web'
  }
  });
}
