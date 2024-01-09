<script lang="ts" setup>
import { onLaunch } from '@dcloudio/uni-app'

onLaunch(() => {
  const updateManager = uni.getUpdateManager()
  updateManager.onUpdateReady(() => {
    uni.showModal({
      title: '更新提示',
      content: '新版本已经准备好，请重启应用',
      showCancel: false,
      success(res) {
        if (res.confirm) {
          updateManager.applyUpdate()
        }
      }
    })
  })
  updateManager.onUpdateFailed(() => {
    uni.showModal({
      title: '更新失败',
      content: '新版本下载失败，请您手动删除当前小程序，重新搜索打开',
      showCancel: false,
      success(res) {
        if (res.confirm) {
          // #ifdef MP-WEIXIN
          wx.exitMiniProgram()
          // #endif
        }
      }
    })
  })
})
</script>

<style lang="scss">
@import '@climblee/uv-ui/index.scss';
@import '@/static/iconfont.css';

page {
  --primary-color: #{$uv-primary};
}
</style>
