<style lang="scss" scoped>
.run-view {
  height: 100%;
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
    transition: all 0.13s;
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
}
</style>

<template>
  <div class="run-view" @click="comfirm">
    <div class="progress-bar" :style="{transform:`translateY(${percent}%)`}"></div>
    <div
      @click.stop="rest=!rest"
      :class="{'prepare-active':isPrepare,'work-active':isWork,'rest-active':isRest,}"
      class="time-ct"
    >
      <div class="prepare-time">{{prepareTimeStr}}</div>
      <div class="work-time">{{workTimeStr}}</div>
      <div class="rest-time">{{restTimeStr}}</div>
    </div>
  </div>
</template>

<script>
import { SCENE } from '../../../common/enums'
import { secToTimeStr, delay } from '../../../common/utils'
const prepare = 3
export default {
  data() {
    return {
      isPrepare: true,
      isWork: false,
      isRest: false,
      pause: false,
      remain: {
        prepareSec: 3,

        workSec: 30,
        restSec: 10
      },
      percent: 0,
      currentCount: 1
    }
  },
  mounted() {
    this.countDown()
  },
  computed: {
    params() {
      return { prepareSec: 3, count: 8, workSec: 10, restSec: 10 }
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
    async countDown() {
      this.startTime = Date.now()
      while (true) {
        await delay(130)
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
        this.remain.prepareSec = prepareSec - expireSec
        this.percent =
          100 -
          ((this.remain.prepareSec * 1000 - extraMs) / (prepareSec * 1000)) *
            100
      } else {
        const startSec = expireSec - prepareSec
        this.isPrepare = false
        const ONE_COUNT_SEC = workSec + restSec
        this.currentCount = Math.floor(startSec / ONE_COUNT_SEC)
        if (this.currentCount > count) {
          return
        }
        const temp1 = startSec % ONE_COUNT_SEC
        if (temp1 < workSec) {
          this.remain.restSec = 0
          this.remain.workSec = workSec - temp1
          this.percent =
            ((this.remain.workSec * 1000 - extraMs) / (workSec * 1000)) * 100
          this.isRest = false
          this.isWork = true
        } else {
          this.remain.workSec = 0
          this.remain.restSec = restSec - (temp1 - workSec)
          this.percent =
            100 -
            ((this.remain.restSec * 1000 - extraMs) / (restSec * 1000)) * 100
          this.isRest = true
          this.isWork = false
        }
      }
    },
    comfirm() {
      this.$store.commit('slideToScene', SCENE.Start)
    }
  }
}
</script>
