<style lang="scss" scoped>
.container {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.main-content {
  width: 100%;
}
.ring-container {
  width: 100%;
  padding-top: 80%;
  position: relative;
  &.animate-init {
    transform: translateY(-300px);
    opacity: 0.3;
  }
  &.animate {
    transition: all 1s;
    transform: translateY(0);
    opacity: 1;
  }
  .ring {
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .ring1 {
    width: 80%;
    padding-top: 80%;
    background: rgba($color: #000, $alpha: 0.05);
    box-shadow: 0 0 5px rgba($color: #000, $alpha: 0.2) inset;
  }
  .ring2 {
    width: 60%;
    padding-top: 60%;
    background: rgba($color: #000, $alpha: 0.05);
    box-shadow: 0 0 2px rgba($color: #000, $alpha: 0.3) inset;
  }
  .ring3 {
    width: 40%;
    padding-top: 40%;
    background: rgba($color: #000, $alpha: 0.05);
    box-shadow: 0 0 5px rgba($color: #000, $alpha: 0.4) inset;
  }
  .right-icon {
    width: 14%;
    padding-top: 7%;
    border-left: solid 1px #eee;
    border-bottom: solid 1px #eee;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%) rotate(-45deg);
  }
}
.bottom-container {
  .text {
    margin: 40px 0;
    text-align: center;
    font-size: 30px;
    font-weight: 100;
    &.animate-init {
      transform: translateY(100px);
    }
    &.animate {
      transition: all 1s;
      transform: translateY(0);
    }
  }
  .confirm-btn {
    margin: 0 auto;
    width: 20%;
    border-radius: 30px;
    background: #fff;
    padding: 15px 40px;
    font-size: 20px;
    text-align: center;
    color: #333;
    &.animate-init {
      transform: translateY(70px);
    }
    &.animate {
      transition: all 1s 0.2s;
      transform: translateY(0);
    }
  }
}
</style>

<template>
  <div class="container">
    <div class="main-content">
      <div class="ring-container animate-init" :class="{animate:startAnimate}">
        <div class="ring ring1"/>
        <div class="ring ring2"/>
        <div class="ring ring3"/>
        <div class="right-icon"/>
      </div>
      <div class="bottom-container" :class="{animate:startAnimate}">
        <div class="text animate-init" :class="{animate:startAnimate}">完成</div>
        <div class="confirm-btn animate-init" :class="{animate:startAnimate}" @click="comfirm">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import { SCENE } from '../../scene'
export default {
  data() {
    return {
      startAnimate: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.startAnimate = true
    }, 0)
  },
  methods: {
    comfirm() {
      this.$store.commit('slideToScene', SCENE.Start)
      this.startAnimate = false
    }
  }
}
</script>
