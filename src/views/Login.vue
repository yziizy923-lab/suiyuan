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
// 登录按钮点击事件
const handleLogin = () => {
  console.log('点击了登录按钮');
}

// 注册按钮点击事件
const handleRegister = () => {
  console.log('点击了注册按钮');
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
  width: 300px;
  height: 80px;
  background: transparent;
  border: 2px solid #8b7355; /* 国风棕色边框 */
  border-radius: 4px;
  font-size: 24px;
  color: #333;
  cursor: pointer;
  font-family: "SimSun", "宋体", serif;
  transition: all 0.3s ease;
  /* 如需按钮边框图，取消下面注释并替换路径 */
  background-image: url('@/assets/images/文本框2.jpgbutton-frame.png');
  background-size: 100% 100%;
}

.auth-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>