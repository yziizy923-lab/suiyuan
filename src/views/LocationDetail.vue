<template>
  <div class="location-detail-page">
    <TopBar />
  </div>
</template>

<script setup>
import TopBar from '@/components/TopBar.vue'
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.location-detail-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/images/bg_land_nature.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>

