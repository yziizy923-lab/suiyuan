<template>
  <div class="travel-page">
    <TopBar />
    <div class="travel-bg" role="img" aria-label="随园地图背景" />
    <img class="travel-corner-img" src="@/assets/images/juanzhou1.png" alt="卷轴1" @click="showModal = true" />
    <!-- 中央弹出的图片 -->
    <Transition name="fade">
      <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
        <div class="modal-content">
          <span class="modal-close" @click="showModal = false">✕</span>
          <div class="modal-bg">
            <div class="modal-body">
              <div class="modal-text">
                <p
                  class="text-line"
                  :class="{ active: currentFloor === 1 }"
                  @click="currentFloor = 1"
                >第一层</p>
                <p
                  class="text-line"
                  :class="{ active: currentFloor === 2 }"
                  @click="currentFloor = 2"
                >第二层</p>
                <p
                  class="text-line"
                  :class="{ active: currentFloor === 3 }"
                  @click="currentFloor = 3"
                >第三层</p>
                <p
                  class="text-line"
                  :class="{ active: currentFloor === 4 }"
                  @click="currentFloor = 4"
                >第四层</p>
              </div>
              <div class="modal-image">
                <div class="map-container">
                  <img
                    class="modal-side-img"
                    :src="floorImages[currentFloor]"
                    :alt="'地图' + currentFloor"
                  />
                  <div v-if="currentFloor === 1" class="corner-tag" @click="goToLocation">
                    <span>小栖霞</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopBar from '@/components/TopBar.vue'
import map1 from '@/assets/images/map1.jpg'
import map2 from '@/assets/images/map2.jpg'
import map3 from '@/assets/images/map3.jpg'
import map4 from '@/assets/images/map4.jpg'

const router = useRouter()
const showModal = ref(false)
const currentFloor = ref(1)

// 图片路径映射 - 在这里修改你的图片路径
const floorImages = {
  1: map1,  // 第一层
  2: map2,  // 第二层
  3: map3,  // 第三层
  4: map4,  // 第四层
}

const goToLocation = () => {
  router.push({ name: 'locationDetail', params: { id: 1 } })
}
</script>

<style scoped>
.travel-page {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.travel-bg {
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  height: calc(100vh - 60px);
  background-image: url('@/assets/images/bg_suiyuan.jpg');
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  background-color: #c9b896;
}

.travel-corner-img {
  position: fixed;
  right: 20px;
  bottom: 20px;
  /* 请根据实际图片尺寸调整宽高 */
  width: 120px;
  height: auto;
  cursor: pointer;
}

/* 弹窗遮罩（已移除） */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.modal-content {
  position: relative;
  width: 98vw;
  max-width: 1600px;
  min-height: 80vh;
}

.modal-bg {
  position: relative;
  width: 100%;
  min-height: 80vh;
  background-image: url('@/assets/images/juanzhou2.png');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 120px;
  padding: 50px;
  box-sizing: border-box;
}

.modal-body {
  position: center;
  width: 80%;
  height: auto;
  min-height: calc(70vh - 80px);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  padding: 10px;
  box-sizing: border-box;
}

.modal-text {
  /* 文字区域：可调节宽度 */
  width: 300px;
  min-width: 200px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  padding: 30px 25px;
  border-radius: 16px;
}

.text-line {
  font-size: 22px;
  line-height: 1.5;
  color: #365641;
  margin: 0;
  padding: 8px 0;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.text-line:hover {
  background-color: rgba(54, 86, 65, 0.1);
  padding-left: 12px;
}

.text-line.active {
  color: #8B4513;
  font-weight: bold;
  background-color: rgba(139, 69, 19, 0.15);
  padding-left: 16px;
  border-left: 3px solid #8B4513;
}

.modal-image {
  /* 图片区域：可调节宽度 */
  flex: 1;
  min-width: 300px;
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 16px;
  position: relative;
}

.map-container {
  position: relative;
  width: 100%;
}

.corner-tag {
  position: absolute;
  top: 30%;
  left: 45%;
  width: 3%;
  height: 20%;
  background-color: #cc0000;
  color: #ffffff;
  font-size: 1vw;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.corner-tag span {
  writing-mode: vertical-rl;
  text-orientation: upright;
  letter-spacing: 0.2em;
}

.modal-img,
.modal-side-img {
  width: 100%;
  height: auto;
  max-height: 60vh;
  object-fit: contain;
  display: block;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

/* 右上角关闭按钮 */
.modal-close {
  position: absolute;
  top: -16px;
  right: -16px;
  width: 32px;
  height: 32px;
  background-color: rgba(54, 86, 65, 0.9);
  color: #fef9df;
  border-radius: 50%;
  font-size: 16px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s;
}

.modal-close:hover {
  background-color: rgba(54, 86, 65, 1);
}

/* 图片切换动画 */
.img-fade-enter-active,
.img-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.img-fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.img-fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

/* 淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
