<template>
  <div class="location-detail-page">
    <TopBar />
    <div v-if="isScroll" class="scroll-wrapper">
      <!-- 卷轴背景 -->
      <img :src="scrollImage" alt="卷轴背景" class="scroll-img" />
      <!-- 景点图片 -->
      <img
        :src="spotImage"
        :alt="spotName"
        class="spot-image"
        :style="spotImageStyle"
      />
      <!-- 景点文字 -->
      <div class="spot-text" :style="spotTextStyle" v-html="spotContent"></div>
      <!-- 返回按钮 -->
      <button class="back-button" @click="goBack">
        <span class="back-icon">←</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TopBar from '@/components/TopBar.vue'
import scrollImg from '@/assets/images/juanzhou2.png'

// 景点图片导入
import xiaoCangShanFang from '@/assets/images/小仓山房.png'
import muDanYan from '@/assets/images/牡丹岩.png'
import liuGu from '@/assets/images/柳谷.png'
import fuRongPing from '@/assets/images/芙蓉屏.png'
import shiCheng from '@/assets/images/诗诚.png'
import liuLiShiJie from '@/assets/images/琉璃世界.png'
import panHuaXuan from '@/assets/images/判花轩.png'
import xiaLiangDongYu from '@/assets/images/夏凉冬燠.png'
import shuangHuTing from '@/assets/images/双湖亭.png'

const route = useRoute()
const router = useRouter()
const scrollImage = scrollImg

const isScroll = computed(() => {
  return route.query.type === 'scroll'
})

const spotName = computed(() => {
  return route.query.name || ''
})

// 景点图片映射
const spotImages = {
  '小仓山房': xiaoCangShanFang,
  '牡丹岩': muDanYan,
  '柳谷': liuGu,
  '芙蓉屏': fuRongPing,
  '诗诚': shiCheng,
  '琉璃世界': liuLiShiJie,
  '判花轩': panHuaXuan,
  '夏凉冬燠': xiaLiangDongYu,
  '双湖亭': shuangHuTing
}

const spotImage = computed(() => {
  return spotImages[spotName.value] || ''
})

// 景点内容映射
const spotContents = {
  '小仓山房': `一室安排夏复冬，不劳炉扇自温凉。<br>山光四面围窗入，我在中央坐道场。<br><span class="source">出处：《随园二十四咏·夏凉冬燠所》《仓山夜坐》</span><br><br>夜久山空月满庭，松风入户冷泠泠。<br>一灯自照书千卷，万籁无声人独醒。<br><span class="source">出处：《小仓山房诗集》卷五</span>`,

  '牡丹岩': `岩下牡丹，开时烂漫如锦；<br>牡丹开处十分春，岩下风光更可人。<br>蜂蝶纷纷来又去，只缘香色醉游人`,

  '柳谷': `万柳阴中，深藏水榭，极称轩爽；<br>柳丝垂绿水生波，谷里风光似画图。<br>小艇撑来明镜里，何人不唱采莲歌<br><span class="source">——《小仓山房诗集》</span>`,

  '芙蓉屏': `满山花放如锦屏风；<br>芙蓉开尽菊花黄，秋色平分一半香。<br>莫怪游人频驻足，好花难得好风光。<br><span class="source">——《随园琐记》</span>`,

  '诗诚': `<span class="concept">文脉沉淀 + 开放展示：</span><br>以"十丈长廊"糊贴士人投赠诗文，将建筑转化为文化交流的载体；<br>"度置如山"的藏书式设计与"珠玉三千首"的展示功能结合，<br>让建筑成为随园文人圈的"精神地标"，<br>体现"文化公共空间"的转型思维。`,

  '琉璃世界': `出轩北至曲室，窗嵌西洋五色玻璃，光怪陆离，目迷心醉，是谓琉璃世界。<br>毗连东轩，曰山红雪，皆紫玻璃。<br>廊外西府海棠二株，花时如天孙云锦，挂向窗前。<br><span class="source">——《金陵园墅志》</span>`,

  '判花轩': `日暖南寅，芦帘深护，为冬日藏花所；<br>判花轩里花开尽，借得邻家竹作屏；<br>花里轩窗面面开，东风吹得好香来。<br>黄莺也爱春光好，飞过栏杆入画来。<br><span class="source">——《金陵园墅志》</span>`,

  '夏凉冬燠': `避暑如避客，一室阴悄悄。<br>高梧拒日多，曲涧引风早。<br>热中人偶来，也觉此间好。<br><span class="source">——《小仓山房诗集》《随园二十四咏・其十五・凉室》</span><br><br>造园理念体现袁枚"随其势而取景，顺其性而宜居"的思想，不刻意雕琢。`,

  '双湖亭': `我取西子湖，移在金陵看。<br>时将双镜白，写出群花寒。<br>前湖饶荷叶，后湖多钓竿。<br><span class="source">——《小仓山房诗集》</span><br><br><br>将"西湖"这一公共名湖的意境，浓缩为私家园林的双湖小景，是江南文人"以小见大"的典型；前湖的"花"与后湖的"钓"，一动一静，暗合袁枚辞官后"亦雅亦闲"的心境。`
}

const spotContent = computed(() => {
  return spotContents[spotName.value] || ''
})

// 图片位置和大小（相对于卷轴，可微调）
const spotImageStyle = computed(() => {
  const styles = {
    '小仓山房': { top: '27%', left: '19%', width: '17%' },
    '牡丹岩': { top: '10%', left: '8%', width: '26%' },
    '柳谷': { top: '30%', left: '20%', width: '26%' },
    '芙蓉屏': { top: '24%', left: '20%', width: '11%' },
    '诗诚': { top: '27%', left: '50%', width: '28%' },
    '琉璃世界': { top: '30%', left: '20%', width: '26%' },
    '判花轩': { top: '30%', left: '20%', width: '30%' },
    '夏凉冬燠': { top: '31%', left: '50%', width: '30%' },
    '双湖亭': { top: '10%', left: '8%', width: '26%' }
  }
  return styles[spotName.value] || { top: '10%', left: '8%', width: '26%' }
})

// 文字位置和宽度（相对于卷轴，可微调）
const spotTextStyle = computed(() => {
  const styles = {
    '小仓山房': { top: '35%', left: '45%', maxWidth: '42%' },
    '牡丹岩': { top: '10%', left: '42%', maxWidth: '42%' },
    '柳谷': { top: '40%', left: '52%', maxWidth: '42%' },
    '芙蓉屏': { top: '40%', left: '42%', maxWidth: '42%' },
    '诗诚': { top: '32%', left: '19%', maxWidth: '30%' },
    '琉璃世界': { top: '37%', left: '48%', maxWidth: '35%' },
    '判花轩': { top: '38%', left: '55%', maxWidth: '42%' },
    '夏凉冬燠': { top: '30%', left: '20%', maxWidth: '30%' },
    '双湖亭': { top: '10%', left: '42%', maxWidth: '42%' }
  }
  return styles[spotName.value] || { top: '10%', left: '42%', maxWidth: '42%' }
})

const goBack = () => {
  router.push({ name: 'travel', query: { open: 'true' } })
}
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
  background-color: #c9b896;
  background-image: url('@/assets/images/bg_land_nature.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* 卷轴容器 - 相对定位作为参考基准 */
.scroll-wrapper {
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* 景点图片 - 相对于卷轴定位，按比例缩放 */
.spot-image {
  position: absolute;
  max-width: 100%;
  object-fit: contain;
}

/* 景点文字 - 相对于卷轴定位 */
.spot-text {
  position: absolute;
  font-size: 18px;
  line-height: 1.8;
  color: #4a3728;
  font-family: 'SimSun', serif;
  white-space: pre-line;
  text-align: left;
}

.spot-text :deep(.source) {
  font-style: italic;
  color: #6b5344;
  font-size: 16px;
}

.spot-text :deep(.concept) {
  font-weight: bold;
  color: #8b4513;
}

/* 返回按钮 - 相对于卷轴右下角 */
.back-button {
  position: absolute;
  bottom: 23%;
  right: 18%;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(139, 69, 19, 0.8);
  border: 2px solid #5d3a1a;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.back-button:hover {
  background-color: rgba(160, 82, 45, 0.9);
  transform: scale(1.1);
}

.back-icon {
  color: #f5e6d3;
  font-size: 24px;
  font-weight: bold;
}
</style>
