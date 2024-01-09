<template>
  <u-loading-page v-if="pageLoading" :loading="true" loading-text="加载中..." font-size="24rpx" />

  <template v-else>
    <u-navbar placeholder left-icon="" bg-color="inherit" title="绑定用户" />

    <u-text size="24" align="center" text="欢迎登录RD研发管理系统" />

    <u-gap height="16" />

    <u-form ref="formRef" class="px-6" error-type="border-bottom" :label-width="80" :model="model" :rules="rules">
      <u-form-item border-bottom label="公司名称" prop="companyName">
        <u-input v-model="model.companyName" border="none" placeholder="请输入公司名称" />
      </u-form-item>
      <u-form-item border-bottom label="工号" prop="enumber">
        <u-input v-model="model.enumber" border="none" placeholder="请输入工号" />
      </u-form-item>
      <u-form-item border-bottom label="姓名" prop="ename">
        <u-input v-model="model.ename" border="none" placeholder="请输入姓名" />
      </u-form-item>

      <u-gap height="16" />

      <u-button type="primary" text="提交" :loading="formLoadingRef" @click="submit" />
    </u-form>
  </template>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useAuthStore } from '@/stores/modules/auth'

const pageLoading = ref(true)

const authStore = useAuthStore()
onLoad((payload) => {
  if (authStore.getLoginStatus) {
    uni.$uv.route({
      type: 'reLaunch',
      url: payload?.redirect ? payload.redirect : '/pages/tabs/home'
    })
    return
  }

  if (authStore.getOpenId) {
    pageLoading.value = false
    return
  }

  uni.login().then(({ code }) => {
    uni.$uv.http
      .get('/loginApp', { params: { code } })
      .then((data) => {
        authStore.setUserInfo(data)

        if (data.login) {
          uni.$uv.route({
            type: 'reLaunch',
            url: payload?.redirect ? payload.redirect : '/pages/tabs/home'
          })
        }
      })
      .finally(() => {
        pageLoading.value = false
      })
  })
})

const formRef = ref()
const formLoadingRef = ref(false)
const model = reactive({
  companyName: '',
  enumber: '',
  ename: ''
})
const rules = reactive({
  companyName: [{ required: true, message: '请输入公司名称' }],
  enumber: [{ required: true, message: '请输入工号' }],
  ename: [{ required: true, message: '请输入姓名' }]
})

const props = defineProps<{
  redirect?: string
}>()
function submit() {
  formRef.value.validate().then(() => {
    formLoadingRef.value = true
    uni.$uv.http
      .post('/bindInfo', model)
      .then((data) => {
        authStore.setUserInfo(data)

        uni.$uv.route({
          type: 'reLaunch',
          url: props.redirect ? props.redirect : '/pages/tabs/home'
        })
      })
      .finally(() => {
        formLoadingRef.value = false
      })
  })
}
</script>

<style lang="scss">
page {
  background: linear-gradient(
    180deg,
    rgba($uv-primary-light, 1) 0%,
    rgba($uv-primary-light, 0.6) 10%,
    rgba($uv-bg-color, 0.8) 20%,
    #fff 100%
  );
}
</style>
