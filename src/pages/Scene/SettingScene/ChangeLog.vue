<style lang="scss" scoped>
.change-log-view {
  padding: 20px;
  margin: 0 20px;
  font-family: unset;
  .version-change-log {
    width: 100%;
    .data {
      margin: 10px 0;
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
      <div class="data">2019 06.04</div>
      <ul>
        <li class="log">1.更新了设置界面</li>
        <li class="log">2.优化进入设置界面的动画性能</li>
        <li class="log">3.加入了更新历史</li>
      </ul>
    </li>
    <li class="version-change-log">
      <div class="data">2019 06.01</div>
      <ul>
        <li class="log">1.儿童节快乐</li>
        <li class="log">2.小程序发布</li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {}
</script>
