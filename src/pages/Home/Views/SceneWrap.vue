<style lang="scss" scoped>
.scene-wrap {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: absolute;
}
</style>

<template>
  <div class="scene-wrap" :style="{top:`${pos.top}vh`,left:`${pos.left}vw`}">
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    position: {}
  },
  computed: {
    pos() {
      return {
        left: 100 * this.position[0],
        top: 100 * this.position[1]
      }
    }
  }
}
</script>


