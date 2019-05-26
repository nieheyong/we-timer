<style lang="scss" scoped>
.input-view {
  height: 100vh;
  width: 100vw;
  .panel-box {
    width: 1240px;
    transform: translateX(-50%) translateY(-50%);
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    justify-content: space-between;
  }
  .panel {
    display: inline-block;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: rgba($color: #fff, $alpha: 0.2);
    box-shadow: 0 0 30px rgba($color: #000000, $alpha: 0.2);
    // // position: absolute;
    // // top: 50%;
    &.panel-left {
      // left: 0;
      transform: rotate(100deg);
    }
    // &.panel-right {
    //   right: 0;
    //   transform: translateX(50%) translateY(-50%);
    // }
  }
}
</style>

<template>
  <div class="input-view">
    <div class="panel-box">
      <div class="panel panel-left">1,2,3,4</div>
      <div class="panel panel-right">1,2,3,4</div>
    </div>
  </div>
</template>

<script>
</script>
