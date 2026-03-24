<template>
  <div class="login-page">
    <!-- 背景容器 -->
    <div class="background-container">
      <!-- 按钮区域（匹配参考图位置） -->
      <div class="button-section">
        <!-- 登录按钮 -->
        <button class="auth-button login-btn" @click="handleLogin">
          登录
        </button>
        <!-- 注册按钮 -->
        <button class="auth-button register-btn" @click="handleRegister">
          注册
        </button>
      </div>
    </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 登录按钮点击事件
const handleLogin = () => {
  router.push('/login-form')
}

// 注册按钮点击事件
const handleRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
/* 登录页容器 - 强制全屏 */
.login-page {
  width: 100%;   /* 视口宽度100% */
  height: 100%;  /* 视口高度100% */
}

/* 背景容器 - 铺满全屏 */
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* 替换为你的背景图路径 */
  background: url('@/assets/images/bg1.jpg') no-repeat center center;
  background-size: cover; /* 关键：背景图拉伸铺满 */

  display: flex;
  justify-content: flex-end; 
  align-items: center;      /* 垂直居中 */
  padding-right: 200px;    /* 调整按钮和右侧的距离 */
}

/* 按钮区域 */
.button-section {
  display: flex;
  flex-direction: column;
  gap: 30px; /* 按钮间距 */
}

/* 按钮样式（匹配国风边框） */
.auth-button {
  width: 320px;
  height: 110px;  

  border: none;
  outline: none;

  background: url('/src/assets/images/文本框2.jpg') no-repeat center;
  background-size: 100% 100%;

  /* 文字居中 */
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