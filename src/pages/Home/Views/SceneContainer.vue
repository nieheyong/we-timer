<style lang="scss" scoped>
.scene-container {
  width: 200vw;
  height: 200vh;
  overflow: hidden;
  transition: all 0.5s;
  //  transition:unset;
  // transform: translateX(-50vw);
  transform: translateY(-50vw);
}
</style>

<template>
  <div>
    <div class="scene-container">
      <slot/>
    </div>
  </div>
</template>

<script>
const SlideTo = {
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left'
}

export default {
  props: {
    from: {},
    to: {},
    slideTo: {}
  },
  computed: {
    position() {
      const FromPositionMap = {
        [SlideTo.top]: { left: 0, top: 100 },
        [SlideTo.right]: { left: 0, top: 0 },
        [SlideTo.bottom]: { left: 0, top: 0 },
        [SlideTo.left]: { left: 100, top: 0 }
      }
      const ToPositionMap = {
        [SlideTo.top]: { left: 0, top: 0 },
        [SlideTo.right]: { left: 100, top: 0 },
        [SlideTo.bottom]: { left: 0, top: 100 },
        [SlideTo.left]: { left: 0, top: 0 }
      }

      let res = { left: 0, top: -99999 }
      if (this.from) {
        res = FromPositionMap[this.slideTo]
      } else if (this.to) {
        res = ToPositionMap[this.slideTo]
      }

      return res
    }
  }
}
</script>
