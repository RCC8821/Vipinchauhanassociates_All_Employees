import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,        // ये line changes को detect करने के लिए polling on करती है
    },
    host: true,                // optional: local network से भी access करने के लिए helpful
    strictPort: true,          // port conflict avoid करता है
    port: 5173,                // Vite का default port ही है (अगर तुम्हारा अलग है तो change कर लेना)
  },
})