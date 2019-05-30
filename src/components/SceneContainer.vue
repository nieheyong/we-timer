<style lang="scss" scoped>
.scene-container {
  overflow: hidden;
  transition: all 0.4s;
}
</style>

<template>
  <div>
    <div
      class="scene-container"
      @transitionend="$emit('transitionend')"
      :style="{width:width+'vw',height:height+'vh',transform:translate}"
    >
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
    grid: {},
    active: {}
  },
  computed: {
    width() {
      return this.grid[0] * 100
    },
    height() {
      return this.grid[1] * 100
    },
    translate() {
      const [x, y] = this.active
      return `translate(-${x * 100}vw,-${y * 100}vh)`
    }
  }
}
</script>
