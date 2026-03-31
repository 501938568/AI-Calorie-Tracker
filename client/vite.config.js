import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 80,
  },
  optimizeDeps: {
    include: ['naive-ui', 'vue', 'vue-router', 'chart.js', 'vue-chartjs']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('naive-ui')) return 'naive-ui'
          if (id.includes('chart.js') || id.includes('vue-chartjs')) return 'chart'
        }
      }
    }
  }
})
