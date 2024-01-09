import uvUI from '@climblee/uv-ui'
import dayjs from 'dayjs'
import type { App, Plugin } from 'vue'
import { useAuthStoreWithout } from '@/stores/modules/auth'

let isRefreshing = false
let requests: AnyNormalFunction[] = []

export function setupUviewPlusConfig(app: App) {
  app.use(uvUI as unknown as Plugin)

  uni.$uv.setConfig({})

  // 初始化请求配置
  uni.$uv.http.setConfig((config) => {
    config.baseURL = import.meta.env.VITE_BASE_URL

    config.header = {
      'content-type': 'application/json;charset=UTF-8'
    }

    config.custom = {
      // 默认报错弹窗
      toast: true,
      // 默认成功不弹窗
      successToast: false,
      successMessage: '操作成功'
    }

    return config
  })

  // 请求拦截
  uni.$uv.http.interceptors.request.use(
    async (config) => {
      const route = uni.$uv.page()
      const authStore = useAuthStoreWithout()

      if (config.url !== '/loginApp' && config.url !== '/bindInfo' && !authStore.getLoginStatus) {
        if (isRefreshing) {
          return new Promise((resolve) => {
            requests.push(() => {
              resolve(uni.$uv.http.request(config))
            })
          })
        }

        isRefreshing = true
        try {
          const { code } = await uni.login()
          const data = await uni.$uv.http.get('/loginApp', { params: { code } })
          authStore.setUserInfo(data)

          if (!data.login) throw new Error()

          requests.forEach((cb) => cb())
          requests = []
        } catch {
          requests = []
          uni.showToast({
            title: '尚未绑定，即将跳转绑定页',
            icon: 'none'
          })

          setTimeout(() => {
            uni.$uv.route({
              type: 'reLaunch',
              url: '/pages/tabs/bind-user',
              params: { redirect: route }
            })
          }, 2000)
          return Promise.reject()
        } finally {
          isRefreshing = false
        }
      }

      if (authStore.getOpenId) config.header.openid = authStore.getOpenId

      if (config.data) {
        for (const key in config.data) {
          if (Object.hasOwnProperty.call(config.data, key)) {
            const element = config.data[key]

            if (dayjs.isDayjs(element)) config.data[key] = element.format('YYYY-MM-DD HH:mm:ss')
            else if (element === '' || element === null || element === undefined) delete config.data[key]
            else if (typeof element === 'string') config.data[key] = element.trim()
          }
        }
      }

      return config
    },
    (config) => {
      return Promise.reject(config)
    }
  )

  // 响应拦截
  uni.$uv.http.interceptors.response.use(
    (response) => {
      const data = response.data
      const custom = response.config?.custom

      if (data.errorCode === '1005') {
        const options: Recordable = {
          type: 'reLaunch',
          url: '/pages/bind-user/index'
        }
        const route = uni.$uv.page()
        if (route) options.params = { redirect: route }
        uni.$uv.route(options)

        return Promise.reject(data)
      }

      if (!data.success) {
        custom.toast &&
          uni.showToast({
            title: data.errorMessage || '请求失败，请联系管理员',
            icon: 'none'
          })

        return Promise.reject(data)
      }

      custom.successToast &&
        uni.showToast({
          title: custom.successMessage || '操作成功',
          icon: 'none'
        })

      return data.data === undefined ? {} : data.data
    },
    (response) => {
      return Promise.reject(response)
    }
  )
}
