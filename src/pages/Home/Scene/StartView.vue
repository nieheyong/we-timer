<style lang="scss" scoped>
.init-view {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  .title {
    font-size: 16px;
    color: #eee;
    font-weight: lighter;
  }
  .piece {
    padding: 10px 60px;
    border-radius: 16px;
    background: #ffffff22;
    color: #fff;
    margin: 10px 20px;
    font-weight: bolder;
    display: flex;
    flex-direction: column;
    align-items: center;

    .number {
      font-size: 60px;
      @media (min-height: 800px) {
        & {
          font-size: 100px;
        }
      }
    }
  }
}
</style>
<template>
  <div class="init-view">
    <div @click="slideTo(SCENE.Setting)" class="piece">
      <span class="title">次数</span>
      <span class="number">08</span>
    </div>
    <div class="piece">
      <span class="title">每次</span>
      <span class="number">00:20</span>
    </div>
    <div @click="slideTo(SCENE.Finish)" class="piece">
      <span class="title">休息</span>
      <span class="number">00:10</span>
    </div>
    <div class="title">总共用时</div>
    <div>03:50 分钟</div>
    <!-- <div>
      <button>开始</button>
    </div>-->
  </div>
</template>

<script>
import { SCENE } from '../enums'
export default {
  data() {
    return {
      SCENE
    }
  },
  methods: {
    slideTo(scene) {
      this.$emit('slideTo', scene)
    }
  }
}
</script>
