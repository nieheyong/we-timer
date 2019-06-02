<style lang="scss" scoped>
.init-view {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
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
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: solid 1px rgba($color: #fff, $alpha: 0.1);
    background: rgba($color: #000000, $alpha: 0.1);
    color: #fff;
    .iconfont {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 18px;
      font-weight: lighter;
    }
  }
  .piece-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    picker {
      flex: 1;
      margin: 10px 20px;
      display: flex;
      flex-direction: column;
    }
    .piece {
      flex: 1;
      padding: 10px 60px;
      border-radius: 16px;
      background: rgba($color: #d4c5c5, $alpha: 0.15);
      color: #fff;
      font-weight: bolder;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s;
      &.hover {
        transform: scale(1.05);
        background: rgba($color: #d4c5c5, $alpha: 0.3);
      }
      .title {
        font-size: 16px;
        color: #eee;
        font-weight: lighter;
      }
      .number {
        font-size: 10vh;
        &.invalid {
          color: rgba($color: #fff, $alpha: 0.2);
        }
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
    padding-bottom: 20px;
    margin-top: 10px;
    .tip {
      margin-bottom: 20px;
      color: #ddd;
      font-size: 16px;
    }
  }
}
</style>
<template>
  <div class="init-view" :style="{'padding-top':`${titleBarBtnTop+32}px`}">
    <!-- <div class="statusbar" :style="{height:`${titleBarBtnTop}px`}"></div> -->
    <div
      class="setting-btn"
      :style="{top:`${titleBarBtnTop}px`}"
      @click="showSetting"
      v-if="showSettingBtn"
    >
      <i class="iconfont icon-cog"></i>
    </div>
    <div class="piece-box">
      <picker @change="countChange" :value="countIndex" :range="countRange">
        <div class="piece" hover-class="hover" :hover-start-time="0">
          <div class="title">次数</div>
          <div class="number">{{count | padStart(2,'0')}}</div>
        </div>
      </picker>
      <picker
        mode="multiSelector"
        @change="workTimeChange"
        :value="workTimeIndex"
        :range="timeRange"
      >
        <div class="piece" hover-class="hover" :hover-start-time="0">
          <div class="title">运动</div>
          <div class="number" :class="{'invalid':!workTimeSec}">{{workTimeSec | secToTimeStr}}</div>
        </div>
      </picker>

      <picker
        mode="multiSelector"
        @change="restTimeChange"
        :value="restTimeIndex"
        :range="timeRange"
      >
        <div class="piece" hover-class="hover" :hover-start-time="0">
          <div class="title">休息</div>
          <div class="number" :class="{'invalid':!restTimeSec}">{{restTimeSec | secToTimeStr}}</div>
        </div>
      </picker>
    </div>

    <div class="bottom-box" :class="{'pd-bt-40':isIphoneX}">
      <div class="tip">
        共
        <span v-if="restTimeSec&&workTimeSec">{{totalSec | secToTimeStr}}</span>
        <span v-else>xx:xx</span>
      </div>
      <div
        @click="startCountDown"
        hover-class="hover"
        :hover-start-time="0"
        :hover-delay-time="100"
        :class="{'error':!restTimeSec||!workTimeSec}"
        class="circle-button"
      >
        <i class="iconfont icon-play"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { SCENE } from '@/common/enums'
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    const genList = count =>
      [...Array(count)].map((_, i) => i.toString().padStart(2, 0))
    const timeRange = genList(60)
    const countRange = genList(100).slice(1)

    let count = 8
    let workTimeSec = 20
    let restTimeSec = 10
    const timeInfo = uni.getStorageSync('TimeInfo')
    if (timeInfo) {
      ;[count, workTimeSec, restTimeSec] = timeInfo
    } else {
      uni.setStorageSync('TimeInfo', [count, workTimeSec, restTimeSec])
    }

    return {
      SCENE,
      timeRange: [timeRange, timeRange],
      countRange,
      count,
      countIndex: count - 1,
      workTimeSec,
      workTimeIndex: [Math.floor(workTimeSec / 60), workTimeSec % 60],
      restTimeSec,
      restTimeIndex: [Math.floor(restTimeSec / 60), restTimeSec % 60]
    }
  },
  computed: {
    ...mapState(['activeScene', 'isSliding']),
    ...mapGetters(['titleBarBtnTop']),
    showSettingBtn() {
      return this.activeScene.name === SCENE.Start.name && !this.isSliding
    },
    totalSec() {
      return (
        this.count * (this.workTimeSec + this.restTimeSec) - this.restTimeSec
      )
    },
    isIphoneX() {
      return this.$store.state.sysInfo.isIphoneX
    }
  },
  methods: {
    showSetting() {
      this.slideTo(SCENE.Setting)
    },
    startCountDown() {
      if (!this.restTimeSec || !this.workTimeSec) return
      this.slideTo(SCENE.Run)
    },
    slideTo(scene) {
      this.$store.commit('slideToScene', scene)
    },
    countChange(e) {
      this.countIndex = e.detail.value
      this.count = Number.parseInt(this.countIndex) + 1
      this.saveTimeInfo()
    },
    workTimeChange(e) {
      this.workTimeIndex = e.detail.value
      const [min, sec] = this.workTimeIndex
      this.workTimeSec = min * 60 + sec
      this.saveTimeInfo()
    },
    restTimeChange(e) {
      this.restTimeIndex = e.detail.value
      const [min, sec] = this.restTimeIndex
      this.restTimeSec = min * 60 + sec
      this.saveTimeInfo()
    },
    saveTimeInfo() {
      uni.setStorageSync('TimeInfo', [
        this.count,
        this.workTimeSec,
        this.restTimeSec
      ])
    }
  }
}
</script>
