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
    sceneInfo: {}
  },
  computed: {
    pos() {
      const { position } = this.sceneInfo
      return {
        left: 100 * position[0],
        top: 100 * position[1]
      }
    }
  }
}
</script>


