import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import type { UserConfig } from 'vite'

export const commonConfig: UserConfig = {
  server: {
    host: true
  },
  build: {
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1024
  },
  plugins: [vueJsx(), UnoCSS()]
}
