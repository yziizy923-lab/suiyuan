<template>
  <div class="travel-page">
    <TopBar />
    <div class="travel-bg" role="img" aria-label="随园地图背景" />
    <!-- 卷轴图标 - 点击后消失并显示五层内容 -->
    <Transition name="fade">
      <img 
        v-if="!showContent" 
        class="travel-corner-img" 
        src="@/assets/images/juanzhou1.png" 
        alt="卷轴1" 
        @click="openContent" 
      />
    </Transition>
    
    <!-- 五层内容 - 点击图标后显示 -->
    <Transition name="fade">
      <div v-if="showContent" class="modal-overlay" @click.self="closeContent">
        <div class="modal-content">
          <span class="modal-close" @click="closeContent">✕</span>
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
                <p
                  class="text-line"
                  :class="{ active: currentFloor === 5 }"
                  @click="currentFloor = 5"
                >第五层</p>
              </div>
              <div class="modal-image">
                <div class="map-container">
                  <img
                    class="modal-side-img"
                    :src="floorImages[currentFloor]"
                    :alt="'地图' + currentFloor"
                  />
                  <!-- 位置标识 -->
                  <template v-if="currentFloor === 1">
                    <div
                      v-for="spot in firstFloorSpots"
                      :key="spot.id"
                      class="location-tag"
                      :style="{ top: spot.top, left: spot.left }"
                      @click="goToLocation(spot.name)"
                    >
                      <span>{{ spot.name }}</span>
                    </div>
                  </template>
                  <template v-if="currentFloor === 2">
                    <div
                      v-for="spot in secondFloorSpots"
                      :key="spot.id"
                      class="location-tag"
                      :style="{ top: spot.top, left: spot.left }"
                      @click="goToLocation(spot.name)"
                    >
                      <span>{{ spot.name }}</span>
                    </div>
                  </template>
                  <template v-if="currentFloor === 3">
                    <div
                      v-for="spot in thirdFloorSpots"
                      :key="spot.id"
                      class="location-tag"
                      :style="{ top: spot.top, left: spot.left }"
                      @click="goToLocation(spot.name)"
                    >
                      <span>{{ spot.name }}</span>
                    </div>
                  </template>
                  <template v-if="currentFloor === 4">
                    <div
                      v-for="spot in forthFloorSpots"
                      :key="spot.id"
                      class="location-tag"
                      :style="{ top: spot.top, left: spot.left }"
                      @click="goToLocation(spot.name)"
                    >
                      <span>{{ spot.name }}</span>
                    </div>
                  </template>
                  <template v-if="currentFloor === 5">
                    <div
                      v-for="spot in fifthFloorSpots"
                      :key="spot.id"
                      class="location-tag"
                      :style="{ top: spot.top, left: spot.left }"
                      @click="goToLocation(spot.name)"
                    >
                      <span>{{ spot.name }}</span>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 南台对话 -->
    <Transition name="fade">
      <div v-if="showNantaiDialog" class="nantai-dialog-overlay">
        <div class="nantai-dialog-container">
          <div class="nantai-scroll">
            <img :src="juanzhou2Img" alt="卷轴" class="scroll-bg-img" />
            <img class="yuanmei-daiji-character" src="@/assets/images/待机动作.gif" alt="人物" />
            <img v-if="nantaiDialogStep === 1" src="@/assets/images/袁枚回答.png" alt="袁枚回答" class="yuanmei-answer-character" />
            <div class="nantai-text">
              <p v-if="nantaiDialogStep === 0">此番改造已费千金，南台、绿晓阁仍未完工，先生真要继续投入，彻底断了出仕之念？</p>
              <p v-else>此前尚有仕途牵绊，如今见这随园虽未竟，却已能凭台望南山、倚阁纳清风，便知归隐才是归宿。我已下定决心，此后不再踏足官场，专心营园 —— 这南台要筑得开阔，让夏日能纳凉、月夜能玩月；绿晓阁要四面开窗，尽收西山翠微。钱财耗尽尚可再赚，初心失则难寻。</p>
            </div>
            <img
              v-if="nantaiDialogStep === 0"
              src="@/assets/images/右箭头.jpg"
              alt="下一句"
              class="nantai-arrow"
              @click="nextNantaiDialog"
            />
            <img
              v-if="nantaiDialogStep === 1"
              src="@/assets/images/左箭头.jpg"
              alt="返回主页"
              class="nantai-back-arrow"
              @click="returnToMain"
            />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TopBar from '@/components/TopBar.vue'
import map1 from '@/assets/images/bg_suiyuan.jpg'
import map2 from '@/assets/images/bg_suiyuan.jpg'
import map3 from '@/assets/images/bg_suiyuan.jpg'
import map4 from '@/assets/images/bg_suiyuan.jpg'
import map5 from '@/assets/images/bg_suiyuan.jpg'
import juanzhou2Img from '@/assets/images/juanzhou2.png'

const router = useRouter()
const route = useRoute()
const showContent = ref(false)  // 控制是否显示五层内容
const showNantaiDialog = ref(false)  // 控制南台对话显示
const nantaiDialogStep = ref(0)  // 对话步骤：0-第一句，1-第二句
const showModal = ref(false)
const currentFloor = ref(1)

// 检查路由参数：如果有 open=true 参数，自动显示五层内容
if (route.query.open === 'true') {
  showContent.value = true
}

// 打开五层内容
const openContent = () => {
  showContent.value = true
}

// 关闭五层内容（返回到图标状态）
const closeContent = () => {
  showContent.value = false
  currentFloor.value = 1  // 重置到第一层
}

// 打开南台对话
const openNantaiDialog = () => {
  showNantaiDialog.value = true
}

// 关闭南台对话
const closeNantaiDialog = () => {
  showNantaiDialog.value = false
  nantaiDialogStep.value = 0  // 重置对话步骤
}

// 返回层选择界面
const returnToMain = () => {
  showNantaiDialog.value = false
  nantaiDialogStep.value = 0
  showContent.value = true  // 显示层选择界面
}

// 切换到下一句对话
const nextNantaiDialog = () => {
  nantaiDialogStep.value = 1
}

// 第一层的景点标识
const firstFloorSpots = [
  { id: 1, name: '悠然见南山', top: '18%', left: '54%' },
  { id: 2, name: '复道', top: '40%', left: '58%' },
  { id: 3, name: '书仓', top: '26%', left: '75%' },
  { id: 4, name: '琉璃世界', top: '15%', left: '79%' },
  { id: 5, name: '小眠斋', top: '12%', left: '83%' },
  { id: 6, name: '诗诚', top: '18%', left: '87%' },
  { id: 7, name: '香雪海', top: '10%', left: '93%' },
]

// 第二层的景点标识
const secondFloorSpots = [
  { id: 1, name: '柳谷', top: '39%', left: '22%' },
  { id: 2, name: '竹请客', top: '35%', left: '31%' },
  { id: 3, name: '小栖霞', top: '31%', left: '45%' },
  { id: 4, name: '儒雅阁', top: '29%', left: '54.5%' },
  { id: 5, name: '芙蓉屏', top: '17%', left: '71.5%' },
  { id: 6, name: '平桥', top: '13%', left: '75%' },
  { id: 7, name: '澄碧泉', top: '14%', left: '79%' },
]

// 第三层的景点标识
const thirdFloorSpots = [
  { id: 1, name: '因树为屋', top: '31%', left: '34%' },
  { id: 2, name: '南台', top: '35%', left: '42%' },
  { id: 3, name: '藤花廊', top: '31%', left: '56%' },
  { id: 4, name: '夏凉冬燠', top: '41%', left: '64%' },
  { id: 5, name: '嵰山红', top: '23%', left: '67%' },
  { id: 6, name: '小仓山房', top: '32%', left: '71%' },
  { id: 7, name: '绿净轩', top: '21%', left: '74.5%' },
  { id: 8, name: '蔚蓝天', top: '14%', left: '78%' },
  { id: 9, name: '古柏奇峰', top: '31%', left: '78%' },
  { id: 10, name: '金石藏', top: '24%', left: '81%' },
  { id: 11, name: '水精域', top: '15%', left: '84%' },
  { id: 12, name: '芍药谷', top: '24%', left: '88%' },
]

// 第四层的景点标识
const forthFloorSpots = [
  { id: 1, name: '判花轩', top: '28%', left: '54%' },
  { id: 2, name: '绿晓阁', top: '42%', left: '66%' },
  { id: 3, name: '捧月楼', top: '17%', left: '78%' },
]

// 第五层的景点标识
const fifthFloorSpots = [
  { id: 1, name: '门房', top: '58%', left: '13%' },
  { id: 2, name: '牡丹岩', top: '41%', left: '16%' },
  { id: 3, name: '菡萏池', top: '25%', left: '20%' },
  { id: 4, name: '入园径', top: '46%', left: '28%' },
  { id: 5, name: '双湖亭', top: '20%', left: '30%' },
  { id: 6, name: '鸳鸯亭', top: '8%', left: '34%' },
  { id: 7, name: '内室', top: '64%', left: '46%' },
  { id: 8, name: '渡鹤桥', top: '9%', left: '50%' },
  { id: 9, name: '北麓', top: '67%', left: '72%' },
  { id: 10, name: '水西亭', top: '5%', left: '75%' },
  { id: 11, name: '坟茔', top: '1%', left: '83%' },
]

// 图片路径映射 - 在这里修改你的图片路径
const floorImages = {
  1: map1,  // 第一层
  2: map2,  // 第二层
  3: map3,  // 第三层
  4: map4,  // 第四层
  5: map5,  // 第五层
}

// 需要使用卷轴背景的景点
const scrollSpots = [
  '小仓山房', '牡丹岩', '柳谷', '芙蓉屏', '诗诚', '琉璃世界', '判花轩', '夏凉冬燠', '双湖亭'
]

const goToLocation = (spotName) => {
  // 进入子页面时隐藏五层内容
  showContent.value = false
  
  // 南台显示对话
  if (spotName === '南台') {
    openNantaiDialog()
    return
  }
  
  if (scrollSpots.includes(spotName)) {
    router.push({ name: 'locationDetail', query: { name: spotName, type: 'scroll' } })
  } else {
    router.push({ name: 'locationDetail', query: { name: spotName } })
  }
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

.location-tag {
  position: absolute;
  width: auto;
  min-width: 18px;
  height: auto;
  min-height: 60px;
  background-color: #8e3d38;
  color: #ffffff;
  font-size: 12px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 8px 0;
  white-space: nowrap;
}

.location-tag span {
  writing-mode: vertical-rl;
  text-orientation: upright;
  letter-spacing: 0.2em;
  padding: 4px 0;
}

.location-tag:hover {
  background-color: #a84a44;
  transform: scale(1.1);
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

/* 南台对话样式 */
.nantai-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.9;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 10000;
}

.nantai-dialog-container {
  width: 100%;
}

.nantai-scroll {
  position: relative;
  width: 100%;
}

.scroll-bg-img {
  width: 100%;
  height: 30vh;
  display: block;
  position: relative;
  z-index: 1;
}

.yuanmei-daiji-character {
  position: absolute;
  bottom: 30vh;
  left: 3%;
  width: 100px;
  height: auto;
  z-index: 2;
}

.nantai-text {
  position: absolute;
  top: 50%;
  left: 12%;
  transform: translateY(-50%);
  width: 55%;
  font-size: 18px;
  line-height: 1.8;
  color: #4a3728;
  font-family: 'SimSun', serif;
  white-space: pre-line;
  z-index: 3;
}

.nantai-arrow {
  position: absolute;
  bottom: 8%;
  right: 5%;
  width: 50px;
  height: auto;
  cursor: pointer;
  z-index: 10;
}

.nantai-back-arrow {
  position: absolute;
  bottom: 8%;
  right: 5%;
  width: 50px;
  height: auto;
  cursor: pointer;
  z-index: 10;
}

.yuanmei-answer-character {
  position: absolute;
  bottom: 30vh;
  right: 3%;
  width: 150px;
  height: auto;
  z-index: 2;
}
</style>
