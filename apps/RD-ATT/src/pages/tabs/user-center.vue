<template>
  <u-navbar bg-color="inherit" left-icon="" placeholder title="个人中心" />

  <ys-user-info show-unbind />

  <uni-card padding="0">
    <u-cell title="项目统计" is-link url="/pages/tabs/bind-user">
      <template #icon>
        <u-icon name="user-center-1" custom-prefix="custom" :size="24" />
      </template>
    </u-cell>
    <u-cell title="成果统计" is-link url="/pages/tabs/bind-user">
      <template #icon>
        <u-icon name="user-center-2" custom-prefix="custom" :size="24" />
      </template>
    </u-cell>
    <u-cell title="档案统计" is-link url="/pages/tabs/bind-user">
      <template #icon>
        <u-icon name="user-center-3" custom-prefix="custom" :size="24" />
      </template>
    </u-cell>
    <u-cell title="月报统计" is-link url="/pages/tabs/bind-user">
      <template #icon>
        <u-icon name="user-center-4" custom-prefix="custom" :size="24" />
      </template>
    </u-cell>
    <u-cell title="个人创新评分" is-link url="/pages/tabs/bind-user">
      <template #icon>
        <u-icon name="user-center-5" custom-prefix="custom" :size="24" />
      </template>
    </u-cell>
  </uni-card>

  <ys-tab-bar />
</template>

<script setup lang="ts"></script>

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
