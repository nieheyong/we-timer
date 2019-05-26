<style lang="scss" scoped>
.scene-wrap {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  // visibility: hidden;
}
</style>

<template>
  <div class="scene-wrap">
    <slot/>
  </div>
</template>

<script>
// const status = {
//   will,active,deActive
// }
export default {
  props: {
    stauts: {}
  }
}
</script>

