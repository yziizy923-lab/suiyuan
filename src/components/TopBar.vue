<template>
  <div class="top-bar">
    <!-- 左上角：遇见随园 -->
    <div class="top-bar__logo">遇见随园</div>

    <!-- 右上角：导航 + 喇叭 -->
    <div class="top-bar__right">
      <router-link to="/menu" class="top-bar__link">首页</router-link>
      <router-link to="/about-us" class="top-bar__link">关于我们</router-link>

      <!-- 喇叭：点击切换音乐 -->
      <div class="top-bar__sound-wrapper" @click="toggleMusic" title="点击切换背景音乐">
        <!-- 播放中：喇叭带波浪 -->
        <svg v-if="isPlaying" class="top-bar__sound-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <!-- 暂停中：喇叭带 X -->
        <svg v-else class="top-bar__sound-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="rgba(255,255,255,0.5)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M23 9l-6 6M17 9l6 6" stroke="rgba(255,255,255,0.5)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>

    <!-- 背景音乐（不显示） -->
    <audio ref="audioRef" loop>
      <source src="@/assets/audio/bg-music.mp3" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const audioRef = ref(null)
const isPlaying = ref(false)

function toggleMusic() {
  if (!audioRef.value) return
  if (isPlaying.value) {
    audioRef.value.pause()
    isPlaying.value = false
  } else {
    audioRef.value.play().then(() => {
      isPlaying.value = true
    }).catch(() => {
      // 自动播放被阻止，忽略
    })
  }
}

onMounted(() => {
  if (audioRef.value) {
    audioRef.value.volume = 0.3 // 音量 30%
  }
})
</script>

<style scoped>
.top-bar {
  height: 60px;
  width: 100%;
  background-color: #365641;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  flex-shrink: 0;
}

.top-bar__logo {
  font-size: 45px;
  font-family: "隶书", serif;
  color: #fef9df;
  letter-spacing: 2px;
  user-select: none;
  align-self: center;
}

.top-bar__right {
  display: flex;
  align-items: stretch;
  gap: 0;
}

.top-bar__link {
  font-size: 20px;
  font-family: "SimSun", "宋体", serif;
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
  padding: 0 24px;
  position: relative;
  display: flex;
  align-items: center;
}

.top-bar__link:hover {
  color: rgba(255, 255, 255, 0.7);
}

.top-bar__link.router-link-active {
  background-color: transparent;
}

.top-bar__link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 5px;
  background-color: #e2b472;
}

.top-bar__sound-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.top-bar__sound-wrapper:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.top-bar__sound-icon {
  width: 22px;
  height: 22px;
}
</style>
