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
    <div :class="[`${status}-active`]" class="time-ct">
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
// 'Prepare 'Work Rest

const STATUS = {
  prepare: 'prepare',
  work: 'work',
  rest: 'rest'
}

export default {
  data() {
    return {
      status: STATUS.prepare,
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

  computed: {
    params() {
      return { PREP_SEC: 3, COUNT: 4, WORK_SEC: 20, REST_SEC: 10 }
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
  mounted() {
    this.runing = true
    this.startTime = Date.now()
    this.startCountDown()
  },
  beforeDestroy() {
    this.runing = false
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
        if (this.pauseTime || this.finish || !this.runing) return
        this.updateCountDown()
      }
    },
    updateCountDown() {
      const { PREP_SEC, COUNT, WORK_SEC, REST_SEC } = this.params
      const remain = this.remain
      const expireMs = Date.now() - this.startTime
      const extraMs = expireMs % 1000
      const expireSec = Math.floor(expireMs / 1000)
      if (expireSec < PREP_SEC) {
        const remainPrepareSec = PREP_SEC - expireSec
        this.percent =
          100 - ((remainPrepareSec * 1000 - extraMs) / (PREP_SEC * 1000)) * 100
        if ([3, 2, 1].includes(remainPrepareSec)) {
          this.warn('prepare', remainPrepareSec, 'ding.mp3')
        }
        remain.prepareSec = remainPrepareSec
        this.status = STATUS.prepare
      } else {
        remain.prepareSec = 0
        const startSec = expireSec - PREP_SEC
        const ONE_COUNT_SEC = WORK_SEC + REST_SEC
        this.currentCount = Math.floor(startSec / ONE_COUNT_SEC) + 1
        const tempSec = startSec % ONE_COUNT_SEC
        if (tempSec === 0) {
          this.warn('workStart', this.currentCount, 'dong.mp3')
        }

        if (tempSec < WORK_SEC) {
          remain.restSec = 0
          remain.workSec = WORK_SEC - tempSec
          this.percent =
            ((remain.workSec * 1000 - extraMs) / (WORK_SEC * 1000)) * 100
          this.status = STATUS.work
        } else {
          if (this.currentCount === COUNT) {
            remain.workSec = 0
            this.percent = 0
            this.finish = true
            this.playVoice('success.mp3')
            this.$emit('finish')
            return
          }
          this.warn('restStart', this.currentCount, 'rest.mp3')
          this.status = STATUS.rest
          remain.workSec = 0
          const remainRestSec = REST_SEC - (tempSec - WORK_SEC)
          this.percent =
            100 - ((remainRestSec * 1000 - extraMs) / (REST_SEC * 1000)) * 100
          if ([3, 2, 1].includes(remainRestSec)) {
            this.warn(this.currentCount, remainRestSec, 'ding.mp3')
          }
          remain.restSec = remainRestSec
        }
      }
    },
    comfirm() {
      this.$store.commit('slideToScene', SCENE.Start)
    },
    warn(prefix, id, fileName) {
      const key = `${prefix}-${id}`
      if (!this.warnMap) {
        this.warnMap = {}
      }
      if (!this.warnMap[key]) {
        this.warnMap[key] = true
        this.playVoice(fileName)
      }
    },
    playVoice(name) {
      const audio = uni.createInnerAudioContext()
      audio.src = '/static/audio/' + name
      audio.play()
      audio.onEnded(audio.destroy)
    }
  }
}
</script>
