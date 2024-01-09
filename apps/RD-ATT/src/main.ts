import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import App from './App.vue'
import { setupStore } from '@/stores'
import { setupUviewPlusConfig } from '@/utils/uv.config'

import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)

  setupStore(app)

  setupUviewPlusConfig(app)

  return {
    app,
    Pinia
  }
}
