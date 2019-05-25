<style scoped>
.main-page {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(253, 29, 29);
  background: linear-gradient(60deg, #fa5539, #f93251);
  overflow-y: auto;
}
.main {
  width: 100%;
}
.piece {
  padding: 20px 60px;
  border-radius: 16px;
  background: #ffffff22;
  color: #fff;
  font-size: 60px;
  margin: 10px 20px;
  font-weight: bolder;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  font-size: 12px;
}
</style>

<template>
  <div class="container main-page">
    <div class="main">
      <div class="piece">
        <span class="title">每轮</span>
        <span class="number">00:20</span>
      </div>
      <div class="piece">
        <span class="title">总计</span>
        <span class="number">08</span>
      </div>
      <div @click="view" class="piece">
        <span class="title">休息</span>
        <span class="number">00:10</span>
      </div>
    </div>
    <Success v-if="success" @close="success=false"/>
  </div>
</template>

<script>
import Success from '../../components/Success'
export default {
  components: {
    Success
  },
  data() {
    return {
      success: false
    }
  },
  methods: {
    view() {
      this.success = true

      const audio = uni.createInnerAudioContext()
      audio.src = '/static/audio/success.mp3'
      audio.play()
      audio.onEnded(audio.destroy)
    }
  }
}
</script>
