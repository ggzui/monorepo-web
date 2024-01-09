import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { store } from '../index'

// @unocss-include
const permissionList = [
  {
    title: '项目管理',
    children: [
      {
        title: '立项提案',
        icon: 'i-local-project-1',
        path: '/pages/project/home1'
      },
      {
        title: '项目信息',
        icon: 'i-local-project-2',
        path: '/pages/project/home2'
      },
      {
        title: '指标统计',
        icon: 'i-local-project-3',
        path: '/pages/project/home3'
      },
      {
        title: '月报',
        icon: 'i-local-project-4',
        path: '/pages/project/home4'
      },
      {
        title: '专利申报',
        icon: 'i-local-project-5',
        path: '/pages/project/home5'
      },
      {
        title: '研发流程',
        icon: 'i-local-project-6',
        path: '/pages/project/home6'
      },
      {
        title: '留存备查',
        icon: 'i-local-project-7',
        path: '/pages/project/home7'
      }
    ]
  },
  {
    title: '研发工时及费用统计',
    children: [
      {
        title: '概览',
        icon: 'i-local-fina-1',
        path: '/pages/fina/home1'
      },
      {
        title: '工时统计',
        icon: 'i-local-project-2',
        path: '/pages/fina/home2'
      },
      {
        title: '费用统计',
        icon: 'i-local-project-3',
        path: '/pages/fina/home3'
      },
      {
        title: '制度说明',
        icon: 'i-local-project-4',
        path: '/pages/fina/home4'
      }
    ]
  },
  {
    title: '创新评分统计',
    children: [
      {
        title: '创新评分',
        icon: 'i-local-manage-1',
        path: '/pages/manage/home1'
      }
    ]
  }
]

export interface UserInfo {
  id: number
  companyName: string
  companyId: number
  enumber: string
  ename: string
  openid: string
  login: boolean
  roleType: number
}

export const useAuthStore = defineStore(
  'auth',
  () => {
    const avatarUrl = ref()

    const userInfo = ref<UserInfo>()
    const getOpenId = computed(() => {
      return userInfo.value?.openid
    })
    const getLoginStatus = computed(() => {
      return userInfo.value?.login
    })
    function setUserInfo(info: UserInfo) {
      userInfo.value = info
    }

    const permissions = computed(() => {
      return permissionList
    })

    return {
      avatarUrl,
      userInfo,
      getOpenId,
      getLoginStatus,
      setUserInfo,
      permissions
    }
  },
  {
    persist: {
      paths: ['avatarUrl']
    }
  }
)

export function useAuthStoreWithout() {
  return useAuthStore(store)
}
