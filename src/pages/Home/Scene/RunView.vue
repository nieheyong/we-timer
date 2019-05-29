<style lang="scss" scoped>
.run-view {
  height: 100vh;
  width: 100vw;
}
</style>

<template>
  <div class="run-view">
    <FinishView v-if="finish"/>
    <CountDown @finish="finish=true" v-else/>
  </div>
</template>

<script>
import FinishView from './FinishView'
import CountDown from './CountDown'
export default {
  components: {
    FinishView,
    CountDown
  },
  data() {
    return {
      finish: false
    }
  }
}
</script>
