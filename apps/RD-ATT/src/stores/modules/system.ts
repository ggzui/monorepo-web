import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSystemStore = defineStore('system', () => {
  const tabList = ref([
    {
      path: '/pages/tabs/home',
      text: '首页',
      icon: 'home',
      activeIcon: 'home-fill'
    },
    {
      path: '/pages/tabs/clock-in',
      text: '打卡',
      icon: 'map',
      activeIcon: 'map-fill'
    },
    {
      path: '/pages/tabs/user-center',
      text: '我的',
      icon: 'account',
      activeIcon: 'account-fill'
    }
  ])

  const route = uni.$uv.page()
  const idx = tabList.value.findIndex((item) => item.path === route)
  const activeTabIdx = ref(idx < 0 ? 0 : idx)

  function changeActiveTabIdx(idx: number) {
    activeTabIdx.value = idx

    uni.$uv.route({
      type: 'switchTab',
      url: tabList.value[idx].path
    })
  }

  return { tabList, activeTabIdx, changeActiveTabIdx }
})
