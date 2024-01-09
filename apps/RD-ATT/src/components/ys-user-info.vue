<template>
  <uni-card>
    <view class="flex-y-center gap-x-2">
      <view class="w-52px h-52px">
        <u-button
          :custom-style="{ padding: 0 }"
          hairline
          open-type="chooseAvatar"
          plain
          size="large"
          @chooseavatar="chooseAvatar"
        >
          <u-avatar :text="avatarText" random-bg-color shape="square" :size="52" />
        </u-button>
      </view>
      <view class="flex-1 flex-col justify-around">
        <u-text :text="employee" lines="1" size="14" />
        <u-text :text="companyName" lines="1" size="12" />
      </view>
      <view v-if="showUnbind">
        <u-button
          :custom-style="{ width: '64px', height: '28px' }"
          plain
          shape="circle"
          size="mini"
          text="解绑"
          @click="unbind"
        />
      </view>
    </view>
  </uni-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type UserInfo, useAuthStore } from '@/stores/modules/auth'

defineProps<{
  showUnbind: boolean
}>()

const authStore = useAuthStore()
const employee = computed(() => `${authStore.userInfo?.ename || '-'}（${authStore.userInfo?.enumber || '-'}）`)
const avatarText = computed(() => {
  if (authStore.avatarUrl) return ''

  const ename = authStore.userInfo?.ename || ''
  return ename.slice(0, 1)
})
const companyName = computed(() => authStore.userInfo?.companyName)
function chooseAvatar({ avatarUrl }) {
  authStore.avatarUrl = avatarUrl
}

function unbind() {
  uni.$uv.http.post('/unBind', authStore.userInfo).then(() => {
    const newValue = {
      login: false,
      openid: authStore.userInfo!.openid
    } as UserInfo
    authStore.setUserInfo(newValue)

    uni.showToast({
      title: '尚未绑定，即将跳转绑定页',
      icon: 'none'
    })

    setTimeout(() => {
      uni.$uv.route({
        type: 'reLaunch',
        url: '/pages/tabs/bind-user'
      })
    }, 2000)
  })
}
</script>
