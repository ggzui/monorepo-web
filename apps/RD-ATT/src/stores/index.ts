import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import type { App } from 'vue'

export const store = createPinia()

export function setupStore(app: App) {
  store.use(
    createPersistedState({
      key: (id) => `__RD_ATT__${id.toUpperCase()}`,
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
        getItem(key) {
          return uni.getStorageSync(key)
        }
      }
    })
  )

  app.use(store)
}
