<template>
  <u-tabbar
    :icon-size="24"
    :value="systemStore.activeTabIdx"
    active-color="var(--primary-color)"
    fixed
    placeholder
    safe-area-inset-bottom
    @change="systemStore.changeActiveTabIdx"
  >
    <u-tabbar-item
      v-for="(tab, index) in systemStore.tabList"
      :key="tab.path"
      :icon="index === systemStore.activeTabIdx ? tab.activeIcon : tab.icon"
      :text="tab.text"
    />
  </u-tabbar>
</template>

<script lang="ts" setup>
import { useSystemStore } from '@/stores/modules/system'

const systemStore = useSystemStore()
</script>
