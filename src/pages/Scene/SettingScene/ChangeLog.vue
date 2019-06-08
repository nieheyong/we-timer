<style lang="scss" scoped>
.change-log-view {
  padding: 20px;
  margin: 0 20px;
  font-family: unset;
  .version-change-log {
    width: 100%;
    margin-bottom: 30px;
    .date {
      margin-bottom: 10px;
      text-align: center;
      // font-weight: bolder;
      font-size: 36rpx;
    }
    .log {
      color: #eee;
    }
  }
}
</style>

<template>
  <ul class="change-log-view">
    <li class="version-change-log">
      <div class="date">2019-06-08</div>
      <ul>
        <li class="log">1.计时页面新增静音功能🔇</li>
        <li class="log">2.新增摇一摇换主题，可手动关闭📱</li>
        <li class="log">3.新增启动时随机更换主题功能，需手动开启🌈</li>
        <li class="log">4.更新后首次打开显示更新记录📝</li>
        <li class="log">5.细节体验优化🚀</li>
      </ul>
    </li>
    <li class="version-change-log">
      <div class="date">2019-06-05</div>
      <ul>
        <li class="log">1.全新的设置界面⚙</li>
        <li class="log">2.加入了更新记录📝</li>
        <li class="log">3.一系列体验优化🚀</li>
      </ul>
    </li>
    <li class="version-change-log">
      <div class="date">2019-06-01</div>
      <ul>
        <li class="log">1.小程序发布🎉</li>
        <li class="log">2.儿童节快乐🎈</li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {}
</script>
