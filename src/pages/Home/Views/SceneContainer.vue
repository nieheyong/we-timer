<style lang="scss" scoped>
.scene-container {
  width: 200vw;
  height: 200vh;
  overflow: hidden;
}
</style>
<template>
  <div>
    <div class="scene-container" :animation="animationData" @transitionend="$emit('transitionend')">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    animationData: {}
  }
}
</script>

