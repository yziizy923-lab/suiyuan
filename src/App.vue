<template>
  <router-view />
</template>

<script setup>
// 无任何代码
</script>

<style>
/* 全局样式重置 - 关键：清空所有默认边距和宽度限制 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  margin: 0 !important; 
  padding: 0 !important;
}

/* 根容器 #app 必须占满全屏，无任何边距 */
#app {
  width: 100%; 
  height: 100%;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden;
}
</style>