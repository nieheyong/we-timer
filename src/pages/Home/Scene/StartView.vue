<style lang="scss" scoped>
.init-view {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  // justify-content: center;
  text-align: center;
  .statusbar {
    height: 44;
    width: 100%;
    position: absolute;
    top: 0;
    background: #f00;
  }
  .setting-btn {
    position: absolute;
    left: 7pt;
    bottom: 24pt;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: solid 1px rgba($color: #fff, $alpha: 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba($color: #000000, $alpha: 0.1);
    color: #fff;
    .iconfont {
      font-size: 18px;
      font-weight: lighter;
    }
  }
  .piece-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    .piece {
      flex: 1;
      margin: 10px 20px;;
      padding: 10px 60px;
      border-radius: 16px;
      background: #d4c5c522;
      color: #fff;
      font-weight: bolder;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .title {
        font-size: 16px;
        color: #eee;
        font-weight: lighter;
      }
      .number {
        font-size: 10vh;
        @media (min-height: 600px) {
          & {
            font-size: 12vh;
          }
        }
        @media (min-height: 700px) {
          & {
            font-size: 13vh;
          }
        }
      }
    }
  }
  .bottom-box {
    padding-bottom: 30px;
    margin-top: 10px;
    .tip {
      margin-bottom: 20px;
      color: #ddd;
    }
    .start-btn {
      margin: 0 auto;
      // margin-top: 20px;
      display: inline-block;
      width: 20vw;
      height: 20vw;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #d4c5c566;
      color: #eee;
      .iconfont {
        font-size: 80rpx;
        font-weight: lighter;
      }
    }
  }
}
</style>
<template>
  <div class="init-view" :style="{'padding-top':`${titleBarBtnTop+40}px`}">
    <!-- <div class="statusbar" :style="{height:`${titleBarBtnTop}px`}">222</div> -->
    <div
      class="setting-btn"
      :style="{top:`${titleBarBtnTop}px`}"
      @click="slideTo(SCENE.Setting)"
      v-if="activeScene.toString()=== SCENE.Start.toString()&&!isSliding"
    >
      <i class="iconfont icon-setting"></i>
    </div>
    <div class="piece-box">
      <div class="piece">
        <span class="title">次数</span>
        <span class="number">08</span>
      </div>
      <div class="piece">
        <span class="title">每次</span>
        <span class="number">00:20</span>
      </div>
      <div class="piece">
        <span class="title">休息</span>
        <span class="number">00:10</span>
      </div>
    </div>

    <div class="bottom-box">
      <div class="tip">共 03:50 分钟</div>
      <div class="start-btn" @click="slideTo(SCENE.Run)">
        <i class="iconfont icon-go-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { SCENE } from '../../../common/enums'
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    return {
      SCENE
    }
  },
  methods: {
    slideTo(scene) {
      this.$store.commit('slideToScene', scene)
    }
  },
  computed: {
    ...mapState(['activeScene', 'isSliding']),
    ...mapGetters(['titleBarBtnTop'])
  }
}
</script>
