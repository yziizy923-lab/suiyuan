<template>
  <div class="video-intro">
    <video
      ref="videoRef"
      class="fullscreen-video"
      :src="videoSrc"
      autoplay
      muted
      playsinline
      @ended="onVideoEnded"
      @canplay="tryPlay"
    ></video>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const videoRef = ref(null)
const videoSrc = '/src/assets/vedios/网页封面.mp4'

const tryPlay = () => {
  if (videoRef.value) {
    videoRef.value.play().catch(() => {})
  }
}

const onVideoEnded = () => {
  router.push('/login')
}

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.play().catch(() => {})
  }
})
</script>

<style scoped>
.video-intro {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 9999;
}

.fullscreen-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
