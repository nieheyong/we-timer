<style lang="scss" scoped>
.run-view {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<template>
  <div class="run-view" @click="comfirm">run view</div>
</template>

<script>
import { SCENE } from '../../../common/enums'
export default {
  methods: {
    comfirm() {
      this.$store.commit('slideToScene', SCENE.Start)
    }
  }
}
</script>
