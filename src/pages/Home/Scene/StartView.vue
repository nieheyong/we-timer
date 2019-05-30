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
      background: rgba($color: #d4c5c5, $alpha: 0.5);
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
  <div class="init-view" :style="{'padding-top':`${titleBarBtnTop+32}px`}">
    <!-- <div class="statusbar" :style="{height:`${titleBarBtnTop}px`}"></div> -->
    <div
      class="setting-btn"
      :style="{top:`${titleBarBtnTop}px`}"
      @click="showSetting"
      v-if="showSettingBtn"
    >
      <i class="iconfont icon-setting"></i>
    </div>
    <div class="piece-box">
      <picker @change="countChange" :value="countIndex" :range="countRange">
        <div class="piece" hover-class="hover" :hover-start-time="0">
          <div class="title">次数</div>
          <div class="number">{{countStr}}</div>
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
          <div class="number" :class="{'invalid-color':workTimeInvalid}">{{workTimeStr}}</div>
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
          <div class="number" :class="{'invalid-color':restTimeInvalid}">{{restTimeStr}}</div>
        </div>
      </picker>
    </div>

    <div class="bottom-box">
      <div class="tip">共 03:50 分钟</div>
      <div
        @click="startCountDown"
        :class="{'invalid-color':restTimeInvalid||workTimeInvalid}"
        class="start-btn"
      >
        <i class="iconfont icon-go-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { SCENE } from '../../../common/enums'
import { mapState, mapGetters } from 'vuex'
import { toTimeStr, toMinSec, timeStrToSec } from '../../../common/utils'
export default {
  data() {
    const genList = count =>
      [...Array(count)].map((_, i) => i.toString().padStart(2, 0))
    const timeRange = genList(60)
    const countRange = genList(100).slice(1)

    let countStr = '08'
    let workTimeStr = '00:20'
    let restTimeStr = '00:10'
    const timeInfo = wx.getStorageSync('TimeInfo')
    if (timeInfo) {
      ;[countStr, workTimeStr, restTimeStr] = timeInfo
    } else {
      wx.setStorageSync('TimeInfo', [countStr, workTimeStr, restTimeStr])
    }

    return {
      SCENE,
      timeRange: [timeRange, timeRange],
      countRange,
      countStr,
      countIndex: Number.parseInt(countStr) - 1,
      workTimeStr,
      workTimeIndex: toMinSec(workTimeStr),
      restTimeStr,
      restTimeIndex: toMinSec(restTimeStr)
    }
  },
  computed: {
    ...mapState(['activeScene', 'isSliding']),
    ...mapGetters(['titleBarBtnTop']),
    workTimeInvalid() {
      return this.workTimeStr === '00:00'
    },
    restTimeInvalid() {
      return this.restTimeStr === '00:00'
    },
    showSettingBtn() {
      return this.activeScene.name === SCENE.Start.name && !this.isSliding
    }
  },
  methods: {
    showSetting() {
      this.slideTo(SCENE.Setting)
    },
    startCountDown() {
      this.$store.commit('setCountDownParams', {
        PREP_SEC: 3,
        COUNT: Number.parseInt(this.countStr),
        WORK_SEC: timeStrToSec(this.workTimeStr),
        REST_SEC: timeStrToSec(this.restTimeStr)
      })
      this.slideTo(SCENE.Run)
    },
    slideTo(scene) {
      this.$store.commit('slideToScene', scene)
    },
    countChange(e) {
      this.countIndex = e.detail.value
      this.countStr = this.countRange[this.countIndex]
      this.saveTimeInfo()
    },
    workTimeChange(e) {
      this.workTimeIndex = e.detail.value
      const [min, sec] = this.workTimeIndex
      this.workTimeStr = toTimeStr(min, sec)
      this.saveTimeInfo()
    },
    restTimeChange(e) {
      this.restTimeIndex = e.detail.value
      const [min, sec] = this.restTimeIndex
      this.restTimeStr = toTimeStr(min, sec)
      this.saveTimeInfo()
    },
    saveTimeInfo() {
      wx.setStorageSync('TimeInfo', [
        this.countStr,
        this.workTimeStr,
        this.restTimeStr
      ])
    }
  }
}
</script>
