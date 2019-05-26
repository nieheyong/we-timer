<style lang="scss" scoped>
.setting-view {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
</style>
<template>
  <div class="setting-view">
    <div @click="$emit('changeTheme')" class="piece">修改主题</div>
    <div @click="slideTo(SCENE.Start)" class="piece">返回</div>
  </div>
</template>

<script>
import { SCENE } from '../enums'
export default {
  data() {
    return {
      SCENE
    }
  },
  methods: {
    slideTo(scene) {
      this.$emit('slideTo', scene)
    }
  }
}
</script>
