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
    transition: all 0.8s;
    &.hide {
      opacity: 0;
      transform: scale(0.6) rotate(-80deg);
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
      position: relative;
    }
    .piece {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 2vh;
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
        font-weight: 100;
      }
      .number {
        font-size: 10vh;
        font-family: BebasNeue-Regular;
        font-weight: lighter;
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
    .tip-ct {
      height: 22px;
      margin-bottom: 20px;
      color: #ddd;
      font-size: 16px;
      font-weight: 100;
      .tip {
        transform: translateY(20px) scale(0.5);
        opacity: 0;
        &.show {
          transition: all 0.5s;
          transform: translateY(0) scale(1);
          opacity: 1;
        }
      }
    }
  }
}
</style>
<template>
  <div class="init-view" :style="{'padding-top':`${wxMenuPos.bottom}px`}">
    <!-- <div class="statusbar" :style="{height:`${wxMenuPos.bottom}px`}"></div>
    <div class="statusbar" :style="{height:`${wxMenuPos.top}px`}" style="background:#0f0"></div>-->
    <div
      class="wx-menu-button setting-btn"
      :style="{width:`${wxMenuPos.height}px`,height:`${wxMenuPos.height}px`,top:`${wxMenuPos.top}px`,left:`${wxMenuPos.marginSide}px`}"
      @click="showSetting"
      :class="{hide:!showSettingBtn}"
    >
      <i class="iconfont icon-cog"></i>
    </div>
    <div class="piece-box">
      <picker @change="countChange" :value="countIndex" :range="countRange">
        <div class="piece" hover-class="hover" :hover-start-time="0">
          <div class="title">回合</div>
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
      <div class="tip-ct">
        <div class="tip" :class="{show:restTimeSec&&workTimeSec}">
          共
          <span v-if="restTimeSec&&workTimeSec">{{totalSec | secToTimeStr}}</span>
        </div>
      </div>
      <div
        id="wx-report-start-run"
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
import { SCENE } from '../scene'
import { mapState, mapGetters } from 'vuex'
import { getSetting, setSetting, APP_SETTING } from '../../common/app-setting'

export default {
  data() {
    const genList = count =>
      [...Array(count)].map((_, i) => i.toString().padStart(2, 0))
    const timeRange = genList(60)
    const countRange = genList(100).slice(1)

    const [count, workTimeSec, restTimeSec] = getSetting(
      APP_SETTING.CountParams
    )

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
    ...mapGetters(['wxMenuPos']),
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
      setSetting(APP_SETTING.CountParams, [
        this.count,
        this.workTimeSec,
        this.restTimeSec
      ])
    }
  }
}
</script>
