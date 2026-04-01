<template>
  <div class="menu-page">
    <TopBar />
    <img class="menu-bg" src="@/assets/images/bg_Menu.png" alt="Menu Background" />

    <div class="illustration-wrapper">
      <img class="menu-illustration" src="@/assets/images/插画一.png" alt="Illustration" />
      <div class="illustration-text">
<<<<<<< Updated upstream
        <router-link to="/garden-spring" class="menu-text">园筑春秋</router-link>
        <router-link to="/history" class="menu-text">随园典册</router-link>
        <router-link to="/garden-wander" class="menu-text">随园漫游</router-link>
        <router-link to="/test" class="menu-text">园筑小考</router-link>
        <router-link to="/liuhen" class="menu-text">随园留痕</router-link>
        <router-link to="/personal" class="menu-text">个人中心</router-link>
=======
        <div class="menu-text" @click="goToPage('/garden-spring')">园筑春秋</div>
        <div class="menu-text" @click="goToPage('/history')">随园典册</div>
        <div class="menu-text" @click="goToPage('/travel')">随园漫游</div>
        <div class="menu-text" @click="goToPage('/test')">园筑小考</div>
        <div class="menu-text" @click="goToPage('/liuhen')">随园留痕</div>
        <div class="menu-text" @click="goToPage('/personal')">个人中心</div>
>>>>>>> Stashed changes
      </div>
    </div>

    <!-- 视频过渡页面 -->
    <div v-if="showVideo" class="video-overlay" @click="handleVideoClick">
      <video
        ref="videoPlayer"
        :src="videoSrc"
        class="loading-video"
        autoplay
        muted
        @ended="onVideoEnded"
      ></video>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopBar from '@/components/TopBar.vue'

const router = useRouter()
const showVideo = ref(false)
const videoSrc = ref('')
const pendingPath = ref('')

const goToPage = (path) => {
  pendingPath.value = path
  videoSrc.value = '/src/assets/videos/loading.mp4'
  showVideo.value = true
}

const handleVideoClick = () => {
  // 点击视频可以跳过
  onVideoEnded()
}

const onVideoEnded = () => {
  showVideo.value = false
  router.push(pendingPath.value)
}
</script>

<style scoped>
.menu-page {
  width: 100%;
  min-height: calc(100vh - 60px);
  overflow: hidden;
}

.menu-bg {
  width: 100%;
  height: auto;
  display: block;
  margin-top: 60px;
}

.illustration-wrapper {
  position: relative;
  width: 100%;
}

.menu-illustration {
  width: 100%;
  height: auto;
  display: block;
}

.illustration-text {
  position: absolute;
  top: 105px;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 125px;
}

.menu-text {
  font-size: 24px;
  font-family: "SimSun", "宋体", serif;
  font-weight: bold;
  color: #000000;
  text-decoration: none;
  cursor: pointer;
  opacity: 0.9;
  transition: opacity 0.2s;
}

.menu-text:hover {
  opacity: 1;
}

/* 视频过渡样式 */
.video-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
