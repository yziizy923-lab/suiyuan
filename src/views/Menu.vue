<template>
  <div class="menu-page">
    <TopBar />
    <img class="menu-bg" src="@/assets/images/bg_Menu.png" alt="Menu Background" />

    <div class="illustration-wrapper">
      <img class="menu-illustration" src="@/assets/images/插画一.png" alt="Illustration" />
      <div class="illustration-text">
        <router-link to="/garden-spring" class="menu-text">园筑春秋</router-link>
        <router-link to="/garden-records" class="menu-text">随园典册</router-link>
        <router-link to="/garden-wander" class="menu-text">随园漫游</router-link>
        <router-link to="/garden-study" class="menu-text">园筑小考</router-link>
        <router-link to="/garden-trace" class="menu-text">随园留痕</router-link>
        <router-link to="/user-center" class="menu-text">个人中心</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import TopBar from '@/components/TopBar.vue'
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
</style>
