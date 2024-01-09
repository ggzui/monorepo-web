<template>
  <view class="page">
    <u-navbar bg-color="inherit" left-icon="" left-text="首页" placeholder :fixed="false" />

    <uni-card is-shadow>
      <view class="h-80px flex-y-center">
        <uni-section title="RD研发管理系统" title-font-size="24px" />
      </view>
    </uni-card>

    <template v-for="wrap in authStore.permissions" :key="wrap.title">
      <uni-card is-shadow>
        <uni-section :title="wrap.title" title-font-size="16px" type="line" />

        <uni-grid :column="4" :highlight="true" :show-border="false">
          <uni-grid-item v-for="(item, index) in wrap.children" :key="item.path" :index="index">
            <view class="flex-1 flex-col flex-center gap-y-1">
              <text :class="item.icon" class="text-32px" />
              <text>{{ item.title }}</text>
            </view>
          </uni-grid-item>
        </uni-grid>
      </uni-card>
    </template>
  </view>

  <ys-tab-bar />
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/modules/auth'

const authStore = useAuthStore()
</script>

<style lang="scss">
.page {
  background: linear-gradient(
    180deg,
    rgba($uv-primary-light, 1) 0%,
    rgba($uv-primary-light, 0.6) 10%,
    rgba($uv-bg-color, 0.8) 20%,
    #fff 100%
  );
}
</style>
