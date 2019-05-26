<style lang="scss" scoped>
.mask-view {
  height: 100vh;
  width: 100vw;
  // background: #f00;
  transform: translate();
  background-image: linear-gradient(to bottom, #535562, #343641);

  &.to-right {
    transform: translateX(100%);
    &.enter {
      transition: all 0.5s;
      transform: translateX(0%);
    }
    &.leave {
      transform: translateX(-100%);
    }
  }
}
</style>
<template>
  <div
    class="mask-view"
    :class="[`to-${direction}`,{enter:active,leave:leave},]"
    @transitionend="transitionend"
  ></div>
</template>

<script>
const Direction = {
  Left: 'left',
  Top: 'top',
  Right: 'right',
  Bottom: 'bottom'
}

export default {
  props: {
    direction: {}
  },
  data() {
    return {
      active: false,
      leave: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.active = true
    }, 0)
  },
  methods: {
    transitionend() {
      if (this.leave) {
        console.log('transitionend leave')
        this.$emit('leave')
      } else {
          console.log('transitionend enter')
        this.$emit('enter')
      }
      this.leave = true
    }
  }
}
</script>

