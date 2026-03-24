<template>
  <div class="login-page">
    <!-- 背景容器 -->
    <div class="background-container">
      <!-- 登录表单区域 -->
      <div class="login-form-section">
        <!-- 用户名输入框 -->
        <div class="input-wrapper">
          <input
            type="text"
            class="form-input"
            placeholder="请输入用户名"
            v-model="username"
          />
        </div>

        <!-- 密码输入框 -->
        <div class="input-wrapper">
          <input
            type="password"
            class="form-input"
            placeholder="请输入密码"
            v-model="password"
          />
        </div>

        <!-- 确认密码输入框 -->
        <div class="input-wrapper">
          <input
            type="password"
            class="form-input"
            placeholder="请确认密码"
            v-model="confirmPassword"
          />
        </div>

        <!-- 按钮区域 -->
        <div class="button-area">
          <button class="auth-button confirm-btn" @click="handleConfirm">
            确认
          </button>
          <button class="auth-button back-btn" @click="handleBack">
            返回
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleConfirm = () => {
  if (password.value !== confirmPassword.value) {
    alert('两次输入的密码不一致')
    return
  }
  console.log('点击了确认按钮', { username: username.value, password: password.value })
}

const handleBack = () => {
  router.push('/')
}
</script>

<style scoped>
/* 登录页容器 - 强制全屏 */
.login-page {
  width: 100%;
  height: 100%;
}

/* 背景容器 - 铺满全屏 */
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/images/bg1.jpg') no-repeat center center;
  background-size: cover;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 200px;
}

/* 登录表单区域 */
.login-form-section {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* 输入框容器 */
.input-wrapper {
  width: 500px;
  height: 110px;

  background: url('/src/assets/images/文本框2.jpg') no-repeat center;
  background-size: 100% 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
}

/* 输入框样式 */
.form-input {
  width: 100%;
  height: 80px;
  border: none;
  outline: none;
  background: transparent;

  font-size: 24px;
  color: #333;
  font-family: "SimSun", "宋体", serif;
  text-align: center;
}

.form-input::placeholder {
  color: #666;
  font-size: 24px;
}

/* 按钮区域 */
.button-area {
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: center;
  justify-content: center;
}

/* 按钮样式（匹配国风边框） */
.auth-button {
  width: 235px;
  height: 100px;

  border: none;
  outline: none;

  background: url('/src/assets/images/文本框2.jpg') no-repeat center;
  background-size: 100% 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 26px;
  color: #333;
  font-family: "SimSun", "宋体", serif;

  cursor: pointer;
  transition: all 0.3s ease;
}

.auth-button:hover {
  transform: scale(1.05);
  filter: brightness(1.05);
}
</style>
