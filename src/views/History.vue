<template>
  <div class="history-page">
    <TopBar />
    <div class="history-container">
      <!-- 左侧绿色侧边栏 -->
      <div class="sidebar">
        <div class="sidebar-title">随园典册</div>
        <div class="sidebar-menu">
          <router-link to="/history/life" class="menu-item" :class="{ active: currentView === 'life' }">
            <span class="menu-text">袁枚生平</span>
          </router-link>
          <router-link to="/history/food" class="menu-item" :class="{ active: currentView === 'food' }">
            <span class="menu-text">随园食单</span>
          </router-link>
          <router-link to="/history/poetry" class="menu-item" :class="{ active: currentView === 'poetry' }">
            <span class="menu-text">随园诗话</span>
          </router-link>
        </div>
      </div>

      <!-- 右侧内容区域 -->
      <div class="content-area">
        <div class="content-card">
          <!-- 袁枚生平 -->
          <div v-if="currentView === 'life'" class="content-section">
            <h2 class="section-title">袁枚生平</h2>
            <div class="section-content">
              <p>袁枚（1716年3月25日—1798年1月3日），字子才，号简斋，晚号随园老人，浙江钱塘（今浙江省杭州市）人，清朝诗人、散文家、文学评论家。</p>
              <p>袁枚是清代乾嘉时期代表诗人之一，与赵翼、蒋士铨合称"乾隆三大家"。他主张抒写性情，反对复古，追求创新，是性灵派诗歌的倡导者和代表人物。</p>
              <h3>主要成就</h3>
              <p>袁枚著有《小仓山房集》《随园诗话》《随园食单》等作品。其中《随园食单》是中国古代重要的烹饪文献，记录了327种菜点，总结了清代以前江南地区的烹饪技艺，对后世影响深远。</p>
              <h3>随园岁月</h3>
              <p>袁枚购得江宁织造隋赫德之园，改名"随园"，在此生活了五十年。他广交文友，诗酒唱和，使随园成为当时江南著名的文化沙龙。随园之名取自"随遇而安"之意，体现了袁枚豁达的人生态度。</p>
            </div>
          </div>

          <!-- 随园食单 -->
          <div v-if="currentView === 'food'" class="content-section">
            <h2 class="section-title">随园食单</h2>
            <div class="section-content">
              <p>《随园食单》是袁枚所著的烹饪著作，成书于1791年（乾隆五十六年），是中国古代烹饪艺术的集大成之作。</p>
              <h3>内容概述</h3>
              <p>全书分为须知单、戒单、海鲜单、江鲜单、特牲单、杂牲单、羽族单、水族有鳞单、水族无鳞单、杂素单、点心单、饭粥单、茶酒单等十四个部分，系统地总结了烹饪理论和实践经验。</p>
              <h3>烹饪理念</h3>
              <p>袁枚强调"色、香、味、形、器"五美兼具，主张烹饪要因材施艺、火候得当、调味适中。他对食材的选择、烹调的方法、菜肴的搭配都有独到见解。</p>
              <h3>历史价值</h3>
              <p>《随园食单》不仅记录了大量珍贵的食谱，还反映了清代江南地区的生活方式和饮食文化，是研究中国古代饮食史的重要文献。</p>
            </div>
          </div>

          <!-- 随园诗话 -->
          <div v-if="currentView === 'poetry'" class="content-section">
            <h2 class="section-title">随园诗话</h2>
            <div class="section-content">
              <p>《随园诗话》是袁枚的文学批评著作，成书于乾隆五十五年（1790年），是中国古代重要的诗话作品之一。</p>
              <h3>核心思想</h3>
              <p>袁枚主张"性灵说"，认为诗歌的本质是抒写性情、表达真实情感。他强调诗人要有赤子之心，反对模拟复古，追求艺术的独创性。</p>
              <h3>主要内容</h3>
              <p>《随园诗话》共十六卷，采录了自唐代至清代诗人的作品和诗论，兼及考辨与评论。书中保存了大量珍贵的诗歌史料，展现了袁枚独特的审美眼光和批评风格。</p>
              <h3>文学影响</h3>
              <p>《随园诗话》对后世文学批评产生了深远影响，其"性灵说"成为清代诗坛的重要流派之一，与沈德潜的"格调说"、翁方纲的"肌理说"形成鼎足之势。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import TopBar from '@/components/TopBar.vue'

const route = useRoute()

// 根据路由确定当前显示的内容
const currentView = computed(() => {
  const path = route.path
  if (path.includes('/food')) return 'food'
  if (path.includes('/poetry')) return 'poetry'
  return 'life'
})
</script>

<style scoped>
.history-page {
  width: 100%;
  min-height: 100vh;
  background-image: url('@/assets/images/bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.history-container {
  display: flex;
  min-height: calc(100vh - 60px);
  padding-top: 60px;
}

/* 左侧绿色侧边栏 */
.sidebar {
  width: 280px;
  min-height: calc(100vh - 60px);
  background-color: #519e6cd0;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.2);
}

.sidebar-title {
  font-size: 28px;
  font-family: "SimSun", "宋体", serif;
  font-weight: bold;
  color: #fff;
  text-align: center;
  margin-bottom: 50px;
  letter-spacing: 8px;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 18px 25px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  color: #fff;
  background-color: transparent;
  border: 2px solid transparent;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateX(10px);
}

.menu-item.active {
  background-color: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
}

.menu-icon {
  font-size: 24px;
}

.menu-text {
  font-size: 18px;
  font-family: "SimSun", "宋体", serif;
}

/* 右侧内容区域 */
.content-area {
  flex: 1;
  padding: 40px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.content-card {
  background-color: rgba(255, 255, 255, 0.92);
  border-radius: 15px;
  padding: 50px;
  max-width: 900px;
  width: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

.content-section {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-title {
  font-size: 36px;
  font-family: "SimSun", "宋体", serif;
  color: #2e7d32;
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 15px;
  border-bottom: 3px solid #4caf50;
}

.section-content {
  font-family: "SimSun", "宋体", serif;
  font-size: 18px;
  line-height: 2;
  color: #333;
}

.section-content p {
  margin-bottom: 20px;
  text-indent: 2em;
}

.section-content h3 {
  font-size: 24px;
  color: #388e3c;
  margin: 30px 0 15px 0;
  padding-left: 15px;
  border-left: 4px solid #4caf50;
}
</style>
