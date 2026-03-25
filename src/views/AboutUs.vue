<template>
  <div class="about-us">
    <TopBar />
    <div class="about-image-wrapper">
      <img class="about-bg" src="@/assets/images/bg_AboutUs.png" alt="About Us Background" />
      <div class="about-text">
        项目理念：随园者，金陵之名园，百年之文脉也。肇始于清，盛于一时，历经沧桑，风骨犹存。今有「遇见随园」，以数字为舟，以文化为帆，拾掇园中山水之胜，辑录文人轶事之珍，让尘封的亭台楼阁、诗酒风流，于当代焕新生。我们以技术为笔，以情怀为墨，让每一位访客，都能跨越时空，亲见随园之雅韵，触摸金陵之温度，让百年文脉，永续流传。
      </div>
    </div>
  </div>
</template>

<script setup>
import TopBar from '@/components/TopBar.vue'
</script>

<style scoped>
.about-us {
  width: 100%;
}

.about-image-wrapper {
  position: relative;
  margin-top: 60px;
}

.about-bg {
  width: 100%;
  height: auto;
  display: block;
}

.about-text {
  position: absolute;
  top: 70px;
  left: 250px;
  width: 550px;
  text-indent: 2em;
  font-family: "SimSun", "宋体", serif;
  font-size: 20px;
  color: #333;
  line-height: 2;
  padding: 40px;
}
</style>
