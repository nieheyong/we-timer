<style lang="scss" scoped>
.count-down {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  .progress-bar {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: #fff, $alpha: 0.1);
    transition: all 0.1s;
    transition-timing-function: linear;
  }
  .time-ct {
    transition: all 0.5s;
    .work-time,
    .rest-time,
    .prepare-time {
      text-align: center;
      font-size: 300rpx;
      z-index: 1;
      transition: inherit;
      opacity: 0;
      transform: scale(0.3);
      line-height: 0.75;
    }
    &.prepare-active {
      transform: translateY(33%);
      .prepare-time {
        transform: scale(1);
        opacity: 1;
      }
    }
    &.work-active {
      transform: translateY(0%);
      .work-time {
        transform: scale(1);
        opacity: 1;
      }
    }
    &.rest-active {
      transform: translateY(-33%);
      .rest-time {
        transform: scale(1);
        opacity: 1;
      }
    }
  }
  .pause-btn {
    padding: 20px;
    background: rgba($color: #fff, $alpha: 0.5);
    z-index: 1;
  }
}
</style>

<template>
  <div class="count-down" @click="comfirm">
    <div class="progress-bar" :style="{transform:`translateY(${percent}%)`}"></div>
    <div
      :class="{'prepare-active':isPrepare,'work-active':isWork,'rest-active':isRest,}"
      class="time-ct"
    >
      <div class="prepare-time">{{prepareTimeStr}}</div>
      <div class="work-time">{{workTimeStr}}</div>
      <div class="rest-time">{{restTimeStr}}</div>
    </div>
    <div class="pause-btn" @click.stop="togglePause">暂停</div>
  </div>
</template>

<script>
import { SCENE } from '../../../common/enums'
import { secToTimeStr, delay } from '../../../common/utils'

export default {
  data() {
    return {
      isPrepare: true,
      isWork: false,
      isRest: false,
      remain: {
        prepareSec: 3,
        workSec: 30,
        restSec: 10
      },
      finish: false,
      percent: 0,
      currentCount: 1
    }
  },
  mounted() {
    this.startTime = Date.now()
    this.startCountDown()
    this.runing = true
  },
  beforeDestroy() {
    this.runing = false
  },
  computed: {
    params() {
      return { prepareSec: 3, count: 4, workSec: 20, restSec: 10 }
    },
    prepareTimeStr() {
      return this.remain.prepareSec.toString().padStart(2, 0)
    },
    workTimeStr() {
      return secToTimeStr(this.remain.workSec)
    },
    restTimeStr() {
      return secToTimeStr(this.remain.restSec)
    }
  },
  methods: {
    togglePause() {
      if (!this.pauseTime) {
        this.pauseTime = Date.now()
      } else {
        this.delayMs = Date.now() - this.pauseTime
        this.startTime = this.startTime + this.delayMs
        this.pauseTime = null
        this.startCountDown()
      }
    },
    async startCountDown() {
      while (true) {
        await delay(100)
        if (this.pauseTime || this.finish || !this.runing) {
          return
        }
        this.updateUi()
      }
    },
    updateUi() {
      const { prepareSec, count, workSec, restSec } = this.params
      const expireMs = Date.now() - this.startTime
      const extraMs = expireMs % 1000
      const expireSec = Math.floor(expireMs / 1000)
      if (expireSec < prepareSec) {
        this.isPrepare = true
        const remainPrepareSec = prepareSec - expireSec
        this.percent =
          100 -
          ((remainPrepareSec * 1000 - extraMs) / (prepareSec * 1000)) * 100
        if ([3, 2, 1].includes(remainPrepareSec)) {
          this.warn('prepare', remainPrepareSec, 'ding.mp3')
        }
        this.remain.prepareSec = remainPrepareSec
      } else {
        this.remain.prepareSec = 0
        const startSec = expireSec - prepareSec
        this.isPrepare = false
        const ONE_COUNT_SEC = workSec + restSec
        this.currentCount = Math.floor(startSec / ONE_COUNT_SEC) + 1

        const temp1 = startSec % ONE_COUNT_SEC
        if (temp1 === 0) {
          this.warn('start', this.currentCount, 'dong.mp3')
        }
        if (temp1 < workSec) {
          this.remain.restSec = 0
          this.remain.workSec = workSec - temp1
          this.percent =
            ((this.remain.workSec * 1000 - extraMs) / (workSec * 1000)) * 100
          this.isRest = false
          this.isWork = true
        } else {
          if (this.currentCount === count) {
            this.remain.workSec = 0
            this.percent = 0
            this.finish = true
            this.playVoice('success.mp3')
            this.$emit('finish')
            return
          }
          this.remain.workSec = 0
          this.warn('rest', this.currentCount, 'rest.mp3')
          const remainRestSec = restSec - (temp1 - workSec)
          this.percent =
            100 - ((remainRestSec * 1000 - extraMs) / (restSec * 1000)) * 100
          this.isRest = true
          this.isWork = false
          if ([3, 2, 1].includes(remainRestSec)) {
            this.warn(this.currentCount, remainRestSec, 'ding.mp3')
          }
          this.remain.restSec = remainRestSec
        }
      }
    },
    comfirm() {
      this.$store.commit('slideToScene', SCENE.Start)
    },
    playVoice(name) {
      const audio = uni.createInnerAudioContext()
      audio.src = '/static/audio/' + name
      audio.play()
      audio.onEnded(audio.destroy)
    },
    warn(prefix, id, fileName) {
      const key = `${prefix}-${id}`
      if (!this.vibrateMap) {
        this.vibrateMap = {}
      }
      if (!this.vibrateMap[key]) {
        this.vibrateMap[key] = true
        this.playVoice(fileName)
      }
    }
  }
}
</script>
