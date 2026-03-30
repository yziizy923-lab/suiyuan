<template>
  <div class="app-wrapper">
    <TopBar />

    <main class="main-content">
      <div class="test-container">
        <!-- 整个题目区域 -->
        <div class="quiz-box">
          <div class="question-header">
            <span class="question-number">{{ currentIndex + 1 }} / {{ questions.length }}</span>
          </div>
          <div class="question-text">{{ currentQuestion.question }}</div>

          <!-- 选项区域 -->
          <div class="options-box">
            <div
              v-for="(option, index) in currentQuestion.options"
              :key="index"
              class="option-item"
              :class="{ selected: selectedAnswer === option }"
              @click="selectAnswer(option)"
            >
              <span class="option-label">{{ optionLabels[index] }}</span>
              <span class="option-text">{{ option }}</span>
            </div>
          </div>
        </div>

        <!-- 切换按钮 -->
        <div class="arrow-text-box">
          <div class="arrow-btn" @click="prevText">
            <span class="arrow-icon">&#9664;</span>
          </div>
          <div class="arrow-btn" @click="nextText">
            <span class="arrow-icon">&#9654;</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import TopBar from '@/components/TopBar.vue'
import { ref, computed } from 'vue'

const questions = ref([
  {
    question: '随园诗派的创始人是哪位？',
    options: ['袁枚', '曹雪芹', '郑燮', '黄遵宪'],
    answer: '袁枚'
  },
  {
    question: '《随园诗话》的作者是谁？',
    options: ['王士祯', '袁枚', '沈德潜', '龚自珍'],
    answer: '袁枚'
  },
  {
    question: '随园位于现在的哪座城市？',
    options: ['北京', '苏州', '南京', '杭州'],
    answer: '南京'
  }
])

const optionLabels = ['A', 'B', 'C', 'D']
const currentIndex = ref(0)
const selectedAnswer = ref(null)

const currentQuestion = computed(() => questions.value[currentIndex.value])

const prevText = () => {
  currentIndex.value = (currentIndex.value - 1 + questions.value.length) % questions.value.length
  selectedAnswer.value = null
}

const nextText = () => {
  currentIndex.value = (currentIndex.value + 1) % questions.value.length
  selectedAnswer.value = null
}

const selectAnswer = (option) => {
  selectedAnswer.value = option
}
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  background: url('@/assets/images/bg.jpg') no-repeat center center;
  background-size: cover;
}

.main-content {
  padding-top: 60px;
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.test-container {
  text-align: center;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

/* 整体题目文本框样式 */
.quiz-box {
  background: linear-gradient(135deg, #f5f0e6 0%, #ede4d4 100%);
  border: 2px solid #c8b89a;
  border-radius: 8px;
  padding: 36px 50px;
  max-width: 900px;
  width: 100%;
  text-align: center;
}

.question-header {
  margin-bottom: 20px;
}

.question-number {
  font-size: 16px;
  font-family: 'STKaiti', 'KaiTi', '楷体', serif;
  color: #9a5c1a;
}

.question-text {
  font-size: 24px;
  font-family: 'STKaiti', 'KaiTi', '楷体', serif;
  color: #5a4020;
  letter-spacing: 2px;
  margin-bottom: 28px;
}

/* 选项样式 */
.options-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.option-item {
  background: transparent;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 6px;
}

.option-item:hover {
  background: rgba(154, 92, 26, 0.1);
}

.option-item.selected {
  background: rgba(154, 92, 26, 0.15);
}

.option-label {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #c8b89a;
  color: #5a4020;
  font-family: 'STKaiti', 'KaiTi', '楷体', serif;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.option-item.selected .option-label {
  background: #9a5c1a;
  color: #f0e6d0;
}

.option-text {
  font-size: 18px;
  font-family: 'STKaiti', 'KaiTi', '楷体', serif;
  color: #5a4020;
  letter-spacing: 1px;
}

.option-item.selected .option-text {
  color: #7a4a15;
  font-weight: bold;
}

/* 切换按钮样式 */
.arrow-text-box {
  display: flex;
  gap: 40px;
  margin-top: 10px;
}

.arrow-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #9a5c1a 0%, #7a4a15 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 8px rgba(154, 92, 26, 0.3);
}

.arrow-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(154, 92, 26, 0.5);
}

.arrow-btn:active {
  filter: brightness(0.9);
  transform: scale(0.95);
}

.arrow-icon {
  color: #f0e6d0;
  font-size: 20px;
  font-weight: bold;
}
</style>
