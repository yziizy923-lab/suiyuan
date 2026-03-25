<template>
  <div class="liuhen-page">
    <TopBar />
    <img src="@/assets/images/bg_Liuhen.png" class="background-image" alt="留痕背景">
    <img src="@/assets/images/Title_liuhen.png" class="top-image" alt="顶部插画">

    <!-- 中间三个功能框区域 -->
    <div class="middle-section">
      <!-- 第一个框：文字滚动 -->
      <div class="function-box text-box">
        <div class="box-title">文字留痕</div>
        <div class="text-scroll-container">
          <div class="text-scroll-content" :style="{ animationDuration: scrollDuration + 's' }">
            <span class="scrolling-text">{{ scrollingText }}</span>
            <span class="scrolling-text">{{ scrollingText }}</span>
          </div>
        </div>
      </div>

      <!-- 第二个框：图片滑动 -->
      <div class="function-box image-box">
        <div class="box-title">图片留痕</div>
        <div class="image-slider-container" @mousedown="startDrag" @mousemove="onDrag" @mouseup="endDrag" @mouseleave="endDrag" @touchstart="startDrag" @touchmove="onDrag" @touchend="endDrag">
          <div class="image-track" :style="{ transform: 'translateX(' + imageOffset + 'px)' }">
            <img
              v-for="(img, index) in images"
              :key="index"
              :src="img"
              class="slider-image"
              alt="留痕图片"
            />
          </div>
        </div>
        <div class="image-indicators" v-if="images.length > 1">
          <span
            v-for="(_, index) in images"
            :key="index"
            class="indicator"
            :class="{ active: index === currentImageIndex }"
            @click="goToImage(index)"
          ></span>
        </div>
      </div>

      <!-- 第三个框：视频播放 -->
      <div class="function-box video-box">
        <div class="box-title">视频留痕</div>
        <div class="video-container">
          <video
            v-if="currentVideo"
            :src="currentVideo"
            controls
            autoplay
            muted
            loop
            class="video-player"
          ></video>
          <div v-else class="video-placeholder">
            <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <span>暂无视频</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部上传区域 -->
    <div class="upload-section">
      <!-- 上传按钮行 -->
      <div class="upload-buttons-row">
        <!-- 上传照片 -->
        <div class="upload-btn upload-photo" @click="handleUploadPhoto">
          <div class="upload-icon-circle">
            <svg viewBox="0 0 24 24" fill="white" width="32" height="32">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
          <span class="upload-label">上传照片</span>
          <input type="file" accept="image/*" ref="photoInput" style="display:none" @change="onPhotoChange" />
        </div>

        <!-- 上传视频 -->
        <div class="upload-btn upload-video" @click="handleUploadVideo">
          <div class="upload-icon-circle">
            <svg viewBox="0 0 24 24" fill="white" width="32" height="32">
              <rect x="2" y="5" width="15" height="11" rx="1" />
              <rect x="3" y="18" width="13" height="1.5" rx="0.5" />
              <rect x="7" y="20" width="5" height="1" rx="0.5" />
              <polygon points="17,9 22,6 22,15 17,12" />
            </svg>
          </div>
          <span class="upload-label">上传视频</span>
          <input type="file" accept="video/*" ref="videoInput" style="display:none" @change="onVideoChange" />
        </div>
      </div>

      <!-- 注册文字输入框 -->
      <div class="register-text-row">
        <div class="register-input-wrapper">
          <span class="register-label">注册文字：</span>
          <input
            type="text"
            class="register-input"
            v-model="registerText"
            placeholder=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TopBar from '@/components/TopBar.vue'

// 导入图片资源 - 将图片放在 src/assets/images/ 目录下
import slideImg1 from '@/assets/images/插画一.png'
import slideImg2 from '@/assets/images/bg_Menu.png'

const photoInput = ref(null)
const videoInput = ref(null)
const registerText = ref('')

// ========== 中间三个功能框的逻辑 ==========

// 文字滚动 - 预设固定文字
const scrollingText = ref('随园时光，岁月留痕')
const scrollDuration = ref(10)

// 图片滑动 - 预设固定图片
const images = ref([slideImg1, slideImg2])
const imageOffset = ref(0)
const currentImageIndex = ref(0)
const isDragging = ref(false)
const startX = ref(0)
const currentTranslate = ref(0)
const lastOffset = ref(0)

// 视频播放 - 预设固定视频
const currentVideo = ref('')

// 图片拖动滑动
function startDrag(e) {
  isDragging.value = true
  startX.value = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
  lastOffset.value = currentTranslate.value
}

function onDrag(e) {
  if (!isDragging.value || images.value.length <= 1) return
  const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
  const diff = currentX - startX.value
  currentTranslate.value = lastOffset.value + diff
}

function endDrag() {
  if (!isDragging.value || images.value.length <= 1) return
  isDragging.value = false
  const imageWidth = 220
  const gap = 20
  const step = imageWidth + gap
  currentImageIndex.value = Math.round(-currentTranslate.value / step)
  currentImageIndex.value = Math.max(0, Math.min(images.value.length - 1, currentImageIndex.value))
  currentTranslate.value = -currentImageIndex.value * step
  imageOffset.value = currentTranslate.value
}

function goToImage(index) {
  currentImageIndex.value = index
  const imageWidth = 220
  const gap = 20
  const step = imageWidth + gap
  currentTranslate.value = -index * step
  imageOffset.value = currentTranslate.value
}

// ========== 原有上传功能 ==========

function handleUploadPhoto() {
  photoInput.value?.click()
}

function handleUploadVideo() {
  videoInput.value?.click()
}

function onPhotoChange(e) {
  const file = e.target.files[0]
  if (file) {
    console.log('选择照片:', file.name)
  }
}

function onVideoChange(e) {
  const file = e.target.files[0]
  if (file) {
    console.log('选择视频:', file.name)
  }
}
</script>

<style scoped>
.liuhen-page {
  width: 100%;
  min-height: 100vh;
  position: relative;
}

.background-image {
  width: 100%;
  height: auto;
  display: block;
}

.top-image {
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  height: auto;
  max-width: 100%;
  z-index: 1;
}

/* ===== 上传区域 ===== */
.upload-section {
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  z-index: 2;
  width: 100%;
  padding: 24px 20px 32px;
  background: transparent;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
}

/* 两个上传按钮并排 */
.upload-buttons-row {
  display: flex;
  gap: 20%;
  justify-content: center;
}

.upload-btn {
  flex: 1;
  max-width: 30%;
  aspect-ratio: 5 / 3;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  cursor: pointer;
  position: relative;
  /* 内嵌边框装饰效果，模仿图片中的切角边框 */
  clip-path: polygon(
    8px 0%, calc(100% - 8px) 0%,
    100% 8px, 100% calc(100% - 8px),
    calc(100% - 8px) 100%, 8px 100%,
    0% calc(100% - 8px), 0% 8px
  );
  transition: filter 0.2s ease;
  user-select: none;
}

.upload-btn:active {
  filter: brightness(0.9);
}

/* 上传照片 — 棕色 */
.upload-photo {
  background-color: #9a5c1a;
}

/* 上传视频 — 深绿色 */
.upload-video {
  background-color: #2a4a2e;
}

/* 圆形图标背景 */
.upload-icon-circle {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-photo .upload-icon-circle {
  background-color: rgba(180, 120, 60, 0.7);
}

.upload-video .upload-icon-circle {
  background-color: rgba(80, 110, 85, 0.7);
}

.upload-label {
  color: #f0e6d0;
  font-size: 18px;
  font-family: 'STKaiti', 'KaiTi', '楷体', serif;
  letter-spacing: 2px;
}

/* ===== 注册文字输入框 ===== */
.register-text-row {
  width: 100%;
}

.register-input-wrapper {
  display: flex;
  align-items: center;
  background-color: #f5f0e6;
  border: 1.5px solid #c8b89a;
  border-radius: 6px;
  padding: 12px 16px;
  /* 同样的切角装饰 */
  clip-path: polygon(
    6px 0%, calc(100% - 6px) 0%,
    100% 6px, 100% calc(100% - 6px),
    calc(100% - 6px) 100%, 6px 100%,
    0% calc(100% - 6px), 0% 6px
  );
  min-height: 50px;
}

.register-label {
  font-size: 18px;
  font-family: 'STKaiti', 'KaiTi', '楷体', serif;
  color: #5a4020;
  white-space: nowrap;
  letter-spacing: 1px;
  flex-shrink: 0;
}

.register-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  font-family: 'STKaiti', 'KaiTi', '楷体', serif;
  color: #5a4020;
  padding: 0 4px;
}

.register-input::placeholder {
  color: #c0a880;
}

/* ===== 中间三个功能框 ===== */
.middle-section {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 80%;
  z-index: 10;
}

.function-box {
  background: linear-gradient(135deg, #f5f0e6 0%, #ede4d4 100%);
  border: 2px solid #c8b89a;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
}

.box-title {
  position: absolute;
  top: -12px;
  left: 20px;
  background: linear-gradient(135deg, #9a5c1a 0%, #7a4a15 100%);
  color: #f0e6d0;
  font-family: 'STKaiti', 'KaiTi', '楷体', serif;
  font-size: 14px;
  padding: 4px 16px;
  border-radius: 4px;
  letter-spacing: 2px;
}

/* 文字滚动框 */
.text-scroll-container {
  width: 100%;
  height: 80px;
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #d4c4a8;
  margin-top: 8px;
  position: relative;
}

.text-scroll-content {
  display: flex;
  white-space: nowrap;
  height: 100%;
  align-items: center;
  animation: scroll-left linear infinite;
}

.text-scroll-content:hover {
  animation-play-state: paused;
}

.scrolling-text {
  font-family: 'STKaiti', 'KaiTi', '楷体', serif;
  font-size: 24px;
  color: #5a4020;
  padding-right: 50px;
  letter-spacing: 4px;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* 图片滑动框 */
.image-slider-container {
  width: 100%;
  height: 120px;
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #d4c4a8;
  margin-top: 8px;
  cursor: grab;
  position: relative;
}

.image-slider-container:active {
  cursor: grabbing;
}

.image-track {
  display: flex;
  gap: 20px;
  height: 100%;
  transition: transform 0.3s ease-out;
  will-change: transform;
}

.slider-image {
  width: 200px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
  margin: 10px;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b0a080;
  font-family: 'STKaiti', 'KaiTi', '楷体', serif;
  font-size: 14px;
}

.image-indicators {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #d4c4a8;
  cursor: pointer;
  transition: all 0.2s;
}

.indicator.active {
  background: #9a5c1a;
  transform: scale(1.2);
}

/* 视频播放框 */
.video-container {
  width: 100%;
  height: 140px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #d4c4a8;
  margin-top: 8px;
  overflow: hidden;
  position: relative;
}

.video-player {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #b0a080;
  cursor: pointer;
  transition: all 0.2s;
}

.video-placeholder:hover {
  background: #f5f0e6;
  color: #9a5c1a;
}

.video-placeholder span {
  font-family: 'STKaiti', 'KaiTi', '楷体', serif;
  font-size: 14px;
}
</style>