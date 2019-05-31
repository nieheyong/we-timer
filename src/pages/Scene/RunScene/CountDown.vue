<style lang="scss" scoped>
.count-down {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  .progress-bar {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition-timing-function: linear;
  }
  .time-ct {
    transition: all 0.5s;
    .work-time,
    .rest-time,
    .prepare-time {
      transform: scale(0.3);
      transition: inherit;
      opacity: 0;
      z-index: 1;
      text-align: center;
      line-height: 0.75;
      font-size: 300rpx;
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

  .bottom-box {
    display: flex;
    position: absolute;
    bottom: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
    padding-bottom: 30px;
    width: 100%;
    .tip {
      padding: 20px;
      font-size: 20px;
    }
    .btn-stop {
      transition: all 0.3s;
      visibility: hidden;
      opacity: 0;
      transform: translateX(-50%) scale(0.2);
      &.show {
        visibility: initial;
        opacity: 1;
        transform: translateX(-50%) scale(1);
      }
    }
    .btn-pause {
      transition: all 0.3s;
      transform: translateX(-50%);
      &.pause {
        transform: translateX(50%) rotate(120deg);
      }
    }
  }
}
</style>

<template>
  <div class="count-down">
    <div
      class="progress-bar"
      :style="{background:`linear-gradient(to bottom, rgba(0, 0, 0, 0) ${percent}%, rgba(255, 255, 255, 0.1) ${percent}%)`}"
    ></div>
    <div :class="[`${status}-active`]" class="time-ct">
      <div class="prepare-time">{{prepareTimeStr}}</div>
      <div class="work-time">{{workTimeStr}}</div>
      <div class="rest-time">{{restTimeStr}}</div>
    </div>

    <div class="bottom-box">
      <div class="tip">{{currentCount}}/{{params.COUNT}}</div>
      <div>
        <div @click.stop="cancle" :class="{show:pauseTime}" class="circle-button btn-stop">
          <i class="iconfont icon-stop"></i>
        </div>
        <div @click.stop="togglePause" :class="{pause:pauseTime}" class="circle-button btn-pause">
          <i class="iconfont" :class="{'icon-pause':!pauseTime,'icon-play':pauseTime}"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SCENE } from '@/common/enums'
import { secToTimeStr, delay, playAudio } from '@/common/utils'

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
      currentCount: 1,
      pauseTime: null
    }
  },

  computed: {
    params() {
      return this.$store.state.countDownParams
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
    this.keepScreenOn()
  },
  beforeDestroy() {
    this.runing = false
    this.keepScreenOn(false)
  },
  methods: {
    togglePause() {
      if (!this.pauseTime) {
        this.keepScreenOn(false)
        this.pauseTime = Date.now()
      } else {
        this.delayMs = Date.now() - this.pauseTime
        this.startTime = this.startTime + this.delayMs
        this.pauseTime = null
        this.startCountDown()
        this.keepScreenOn()
      }
    },
    async startCountDown() {
      while (true) {
        await delay(15)
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
          if (this.currentCount >= COUNT) {
            remain.workSec = 0
            this.percent = 0
            this.finish = true
            playAudio('success.mp3')
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
    cancle() {
      this.$store.commit('slideToScene', SCENE.Start)
    },
    warn(prefix, id, fileName) {
      const key = `${prefix}-${id}`
      if (!this.warnMap) {
        this.warnMap = {}
      }
      if (!this.warnMap[key]) {
        this.warnMap[key] = true
        playAudio(fileName)
      }
    },
    keepScreenOn(sta = true) {
      wx.setKeepScreenOn({
        keepScreenOn: sta
      })
    }
  }
}
</script>
