<template>
    <div class="app-wrapper">
      <!-- 顶部导航栏 -->
      <TopBar />

      <!-- 左侧个人信息卡片 -->
      <aside class="profile-sidebar">
        <div class="profile-card">
          <!-- 背景装饰 -->
          <div class="card-bg-decoration"></div>
  
          <!-- 头像区域 -->
          <div class="avatar-section">
            <div class="avatar-ring">
              <img :src="userInfo.avatar" alt="avatar" class="avatar-img" />
              <div class="avatar-badge">{{ userInfo.level }}</div>
            </div>
            <h2 class="username">{{ userInfo.nickname }}</h2>
            <p class="signature">{{ userInfo.signature }}</p>
          </div>
  
          <!-- 分隔线 -->
          <div class="divider"></div>

          <!-- 操作按钮 -->
          <div class="action-buttons">
            <button class="btn-primary" @click="showChangePassword = true">修改密码</button>
            <button class="btn-danger" @click="handleLogout">退出登录</button>
          </div>
        </div>
      </aside>
  
      <!-- 右侧主内容区 -->
      <main class="main-content">
        <!-- 页面标题 -->
        <div class="welcome-header">
          <div class="welcome-text">
            <span class="welcome-emoji">🌿</span>
            <h1>欢迎来到随园</h1>
          </div>
          <p class="welcome-subtitle">在这里记录你的所思所感，留住每一个珍贵瞬间</p>
        </div>
  
        <!-- 笔记输入区 -->
        <div class="note-card">
          <div class="note-card-header">
            <span class="note-icon">📋</span>
            <h2 class="note-title">山居记事</h2>
          </div>
  
          <div class="note-toolbar">
            <div class="category-select-wrapper">
              <select v-model="noteCategory" class="category-select">
                <option value="日常">日常</option>
                <option value="心情">心情</option>
                <option value="灵感">灵感</option>
                <option value="随笔">随笔</option>
                <option value="其他">其他</option>
              </select>
              <span class="select-arrow">▾</span>
            </div>
            <button class="toolbar-btn export-btn" @click="exportNotes">导出所有笔记</button>
            <button class="toolbar-btn clear-btn" @click="clearAllNotes">清空笔记</button>
          </div>
  
          <textarea
            v-model="noteContent"
            class="note-textarea"
            placeholder="写下今日所思所感..."
          ></textarea>
  
          <div class="note-actions">
            <button class="save-btn" @click="saveNote">保存笔记</button>
            <button class="reset-btn" @click="clearInput">清空输入</button>
          </div>
        </div>
  
        <!-- 历史记录 -->
        <div class="history-card">
          <h2 class="history-title">历史记录</h2>
  
          <div class="history-filters">
            <div class="category-select-wrapper">
              <select v-model="filterCategory" class="category-select">
                <option value="全部分类">全部分类</option>
                <option value="日常">日常</option>
                <option value="心情">心情</option>
                <option value="灵感">灵感</option>
                <option value="随笔">随笔</option>
                <option value="其他">其他</option>
              </select>
              <span class="select-arrow">▾</span>
            </div>
            <input
              v-model="searchKeyword"
              type="text"
              class="search-input"
              placeholder="搜索笔记内容"
            />
          </div>
  
          <!-- 笔记列表 -->
          <div class="note-list">
            <div
              v-for="(note, index) in filteredNotes"
              :key="index"
              class="note-item"
            >
              <div class="note-item-header">
                <span class="note-item-time">{{ note.time }}</span>
                <span class="note-item-tag">{{ note.category }}</span>
              </div>
              <p class="note-item-content">{{ note.content }}</p>
            </div>
            <div v-if="filteredNotes.length === 0" class="empty-state">
              <span>📭</span>
              <p>暂无笔记记录</p>
            </div>
          </div>
        </div>
      </main>
  
      <!-- 修改密码弹窗 -->
      <div v-if="showChangePassword" class="modal-overlay" @click.self="showChangePassword = false">
        <div class="modal-card">
          <h3 class="modal-title">修改密码</h3>
          <div class="modal-form">
            <div class="form-group">
              <label>原密码</label>
              <input v-model="pwdForm.old" type="password" placeholder="请输入原密码" class="form-input" />
            </div>
            <div class="form-group">
              <label>新密码</label>
              <input v-model="pwdForm.new" type="password" placeholder="请输入新密码" class="form-input" />
            </div>
            <div class="form-group">
              <label>确认密码</label>
              <input v-model="pwdForm.confirm" type="password" placeholder="请确认新密码" class="form-input" />
            </div>
          </div>
          <div class="modal-actions">
            <button class="modal-cancel" @click="showChangePassword = false">取消</button>
            <button class="modal-confirm" @click="handleChangePassword">确认修改</button>
          </div>
        </div>
      </div>
  
      <!-- Toast 提示 -->
      <div v-if="toast.show" class="toast" :class="toast.type">{{ toast.message }}</div>
    </div>
  </template>
  
  <script>
  import TopBar from '@/components/TopBar.vue'

  export default {
    name: 'PersonalCenter',
    components: { TopBar },
    data() {
      return {
        userInfo: {
          avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=wttAndroid',
          nickname: 'wttAndroid',
          signature: '其实，我的趣',
          level: 'Lv.5',
          school: '山西传媒学院',
          city: '山西 晋城',
          grade: '23届毕业生',
        },
        noteContent: '',
        noteCategory: '日常',
        filterCategory: '全部分类',
        searchKeyword: '',
        notes: [
          { time: '2026/3/24 18:07:22', category: '日常', content: '今天天气不错，心情愉快，在随园里记录下这美好的一天。' },
          { time: '2026/3/23 09:15:00', category: '心情', content: 'Vue3 的 Composition API 真的好用，学习了响应式原理。' },
        ],
        showChangePassword: false,
        pwdForm: { old: '', new: '', confirm: '' },
        toast: { show: false, message: '', type: 'success' },
      }
    },
    computed: {
      filteredNotes() {
        return this.notes.filter(note => {
          const categoryMatch = this.filterCategory === '全部分类' || note.category === this.filterCategory
          const keywordMatch = !this.searchKeyword || note.content.includes(this.searchKeyword)
          return categoryMatch && keywordMatch
        })
      }
    },
    methods: {
      showToast(message, type = 'success') {
        this.toast = { show: true, message, type }
        setTimeout(() => { this.toast.show = false }, 2500)
      },
      saveNote() {
        if (!this.noteContent.trim()) {
          this.showToast('请输入笔记内容', 'error')
          return
        }
        const now = new Date()
        const timeStr = `${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`
        this.notes.unshift({ time: timeStr, category: this.noteCategory, content: this.noteContent })
        this.noteContent = ''
        this.showToast('笔记保存成功 🎉')
      },
      clearInput() {
        this.noteContent = ''
      },
      clearAllNotes() {
        if (confirm('确认清空所有笔记？此操作不可恢复！')) {
          this.notes = []
          this.showToast('笔记已清空')
        }
      },
      exportNotes() {
        const content = this.notes.map(n => `[${n.time}] [${n.category}]\n${n.content}`).join('\n\n---\n\n')
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url; a.download = '随园笔记.txt'; a.click()
        URL.revokeObjectURL(url)
        this.showToast('导出成功')
      },
      handleLogout() {
        if (confirm('确认退出登录？')) {
          this.showToast('已退出登录，再见')
        }
      },
      handleChangePassword() {
        if (!this.pwdForm.old || !this.pwdForm.new || !this.pwdForm.confirm) {
          this.showToast('请填写完整信息', 'error'); return
        }
        if (this.pwdForm.new !== this.pwdForm.confirm) {
          this.showToast('两次密码不一致', 'error'); return
        }
        this.showChangePassword = false
        this.pwdForm = { old: '', new: '', confirm: '' }
        this.showToast('密码修改成功 ✅')
      }
    }
  }
  </script>
  
  <style scoped>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  .app-wrapper {
    display: flex;
    min-height: 100vh;
    background: url('@/assets/images/bg.jpg') no-repeat center center;
    background-size: cover;
    font-family: 'STKaiti', 'KaiTi', '楷体', serif;
  }
  
  /* ======== 左侧侧边栏 ======== */
  .profile-sidebar {
    width: 280px;
    min-height: 100vh;
    padding: 84px 16px 24px;
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    align-self: flex-start;
  }

  .profile-card {
    background: linear-gradient(135deg, #f5f0e6 0%, #ede4d4 100%);
    border: 2px solid #c8b89a;
    border-radius: 12px;
    padding: 28px 20px 24px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .card-bg-decoration {
    display: none;
  }

  /* 头像 */
  .avatar-section { text-align: center; position: relative; z-index: 1; }

  .avatar-ring {
    display: inline-block;
    position: relative;
    margin-bottom: 14px;
  }

  .avatar-ring::before {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    background: linear-gradient(135deg, #9a5c1a, #7a4a15);
    z-index: -1;
  }

  .avatar-img {
    width: 80px; height: 80px;
    border-radius: 50%;
    display: block;
    border: 3px solid #f5f0e6;
    background: #d4c4a8;
  }

  .avatar-badge {
    position: absolute;
    bottom: 2px; right: -4px;
    background: linear-gradient(135deg, #9a5c1a, #7a4a15);
    color: #f0e6d0;
    font-size: 10px;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 4px;
    border: 2px solid #c8b89a;
    font-family: 'STKaiti', 'KaiTi', '楷体', serif;
  }

  .username {
    color: #5a4020;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 6px;
    letter-spacing: 1px;
    font-family: 'STKaiti', 'KaiTi', '楷体', serif;
  }

  .signature {
    color: #9a8070;
    font-size: 12px;
    line-height: 1.5;
    font-family: 'STKaiti', 'KaiTi', '楷体', serif;
  }

  /* 分隔线 */
  .divider {
    height: 1px;
    background: #d4c4a8;
    margin: 18px 0;
  }

  /* 操作按钮 */
  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .btn-primary, .btn-danger {
    width: 100%;
    padding: 11px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-family: 'STKaiti', 'KaiTi', '楷体', serif;
    font-weight: 600;
    letter-spacing: 1px;
    transition: all 0.2s;
    clip-path: polygon(
      6px 0%, calc(100% - 6px) 0%,
      100% 6px, 100% calc(100% - 6px),
      calc(100% - 6px) 100%, 6px 100%,
      0% calc(100% - 6px), 0% 6px
    );
  }

  .btn-primary {
    background: linear-gradient(135deg, #9a5c1a, #7a4a15);
    color: #f0e6d0;
    box-shadow: 0 4px 12px rgba(154, 92, 26, 0.3);
  }
  .btn-primary:hover { filter: brightness(1.1); }

  .btn-danger {
    background: #2a4a2e;
    color: #f0e6d0;
  }
  .btn-danger:hover { filter: brightness(1.1); }
  
  /* ======== 右侧主内容 ======== */
  .main-content {
    flex: 1;
    padding: 88px 32px 28px 16px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-width: 0;
  }

  /* 欢迎标题 */
  .welcome-header {
    padding: 20px 28px;
    background: linear-gradient(135deg, #f5f0e6 0%, #ede4d4 100%);
    border: 2px solid #c8b89a;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .welcome-text {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 6px;
  }

  .welcome-emoji { font-size: 28px; }

  .welcome-text h1 {
    font-family: 'STKaiti', 'KaiTi', '楷体', serif;
    font-size: 26px;
    color: #5a4020;
    letter-spacing: 3px;
  }

  .welcome-subtitle {
    color: #9a8070;
    font-size: 13px;
    letter-spacing: 1px;
    padding-left: 38px;
    font-family: 'STKaiti', 'KaiTi', '楷体', serif;
  }

  /* 笔记卡片 */
  .note-card, .history-card {
    background: linear-gradient(135deg, #f5f0e6 0%, #ede4d4 100%);
    border: 2px solid #c8b89a;
    border-radius: 12px;
    padding: 24px 28px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .note-card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }

  .note-icon { font-size: 22px; }

  .note-title {
    font-family: 'STKaiti', 'KaiTi', '楷体', serif;
    font-size: 20px;
    color: #5a4020;
    letter-spacing: 2px;
  }

  /* 工具栏 */
  .note-toolbar {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
    flex-wrap: wrap;
  }

  .category-select-wrapper {
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  .category-select {
    appearance: none;
    background: #f5f0e6;
    border: 1.5px solid #c8b89a;
    border-radius: 6px;
    padding: 8px 28px 8px 12px;
    font-size: 14px;
    color: #5a4020;
    cursor: pointer;
    font-family: 'STKaiti', 'KaiTi', '楷体', serif;
    outline: none;
    transition: border-color 0.2s;
  }
  .category-select:focus { border-color: #9a5c1a; }

  .select-arrow {
    position: absolute;
    right: 8px;
    color: #9a8070;
    pointer-events: none;
    font-size: 12px;
  }

  .toolbar-btn {
    padding: 8px 14px;
    border-radius: 6px;
    border: 1.5px solid #c8b89a;
    font-size: 14px;
    cursor: pointer;
    font-family: 'STKaiti', 'KaiTi', '楷体', serif;
    transition: all 0.2s;
  }

  .export-btn {
    background: #f5f0e6;
    color: #5a4020;
  }
  .export-btn:hover { background: #e8ddd0; }

  .clear-btn {
    background: #fdf0ee;
    color: #b07070;
    border-color: #e8c5c0;
  }
  .clear-btn:hover { background: #f5e0dc; }

  /* 文本域 */
  .note-textarea {
    width: 100%;
    min-height: 120px;
    padding: 14px 16px;
    border: 1.5px solid #c8b89a;
    border-radius: 8px;
    background: #fff;
    font-size: 14px;
    color: #5a4020;
    font-family: 'STKaiti', 'KaiTi', '楷体', serif;
    line-height: 1.8;
    resize: vertical;
    outline: none;
    transition: border-color 0.2s;
  }
  .note-textarea:focus {
    border-color: #9a5c1a;
  }
  .note-textarea::placeholder { color: #c0a880; }

  /* 保存按钮 */
  .note-actions {
    display: flex;
    gap: 12px;
    margin-top: 14px;
  }

  .save-btn, .reset-btn {
    padding: 10px 24px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-family: 'STKaiti', 'KaiTi', '楷体', serif;
    font-weight: 600;
    letter-spacing: 1px;
    transition: all 0.2s;
    clip-path: polygon(
      6px 0%, calc(100% - 6px) 0%,
      100% 6px, 100% calc(100% - 6px),
      calc(100% - 6px) 100%, 6px 100%,
      0% calc(100% - 6px), 0% 6px
    );
  }

  .save-btn {
    background: linear-gradient(135deg, #9a5c1a, #7a4a15);
    color: #f0e6d0;
    box-shadow: 0 4px 12px rgba(154, 92, 26, 0.3);
  }
  .save-btn:hover { filter: brightness(1.1); }

  .reset-btn {
    background: #f5f0e6;
    color: #5a4020;
    border: 1.5px solid #c8b89a;
  }
  .reset-btn:hover { background: #e8ddd0; }

  /* 历史记录 */
  .history-title {
    font-family: 'STKaiti', 'KaiTi', '楷体', serif;
    font-size: 20px;
    color: #5a4020;
    letter-spacing: 2px;
    margin-bottom: 16px;
  }

  .history-filters {
    display: flex;
    gap: 10px;
    margin-bottom: 18px;
    flex-wrap: wrap;
  }

  .search-input {
    flex: 1;
    min-width: 180px;
    padding: 8px 14px;
    border: 1.5px solid #c8b89a;
    border-radius: 6px;
    background: #fff;
    font-size: 14px;
    color: #5a4020;
    font-family: 'STKaiti', 'KaiTi', '楷体', serif;
    outline: none;
    transition: border-color 0.2s;
  }
  .search-input:focus { border-color: #9a5c1a; }
  .search-input::placeholder { color: #c0a880; }

  /* 笔记列表 */
  .note-list { display: flex; flex-direction: column; gap: 0; }

  .note-item {
    padding: 14px 0;
    border-bottom: 1px solid #d4c4a8;
    transition: background 0.15s;
  }
  .note-item:last-child { border-bottom: none; }

  .note-item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }

  .note-item-time {
    font-size: 12px;
    color: #9a8070;
  }

  .note-item-tag {
    font-size: 12px;
    background: #f5f0e6;
    color: #5a4020;
    padding: 2px 8px;
    border-radius: 4px;
    border: 1px solid #c8b89a;
    font-family: 'STKaiti', 'KaiTi', '楷体', serif;
  }

  .note-item-content {
    font-size: 14px;
    color: #5a4020;
    line-height: 1.7;
    font-family: 'STKaiti', 'KaiTi', '楷体', serif;
  }

  .empty-state {
    text-align: center;
    padding: 40px 0;
    color: #9a8070;
    font-size: 14px;
  }
  .empty-state span { font-size: 32px; display: block; margin-bottom: 10px; }
  
  /* ======== 弹窗 ======== */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
  }

  .modal-card {
    background: #f5f0e6;
    border: 2px solid #c8b89a;
    border-radius: 12px;
    padding: 32px 36px;
    width: 380px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    animation: modalIn 0.25s ease;
  }

  @keyframes modalIn {
    from { opacity: 0; transform: translateY(-20px) scale(0.96); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .modal-title {
    font-family: 'STKaiti', 'KaiTi', '楷体', serif;
    font-size: 20px;
    color: #5a4020;
    letter-spacing: 2px;
    margin-bottom: 24px;
  }

  .modal-form { display: flex; flex-direction: column; gap: 16px; }

  .form-group { display: flex; flex-direction: column; gap: 6px; }

  .form-group label {
    font-size: 14px;
    color: #5a4020;
    font-weight: 600;
    font-family: 'STKaiti', 'KaiTi', '楷体', serif;
  }

  .form-input {
    padding: 10px 14px;
    border: 1.5px solid #c8b89a;
    border-radius: 6px;
    background: #fff;
    font-size: 14px;
    color: #5a4020;
    font-family: 'STKaiti', 'KaiTi', '楷体', serif;
    outline: none;
    transition: border-color 0.2s;
  }
  .form-input:focus { border-color: #9a5c1a; }

  .modal-actions {
    display: flex;
    gap: 12px;
    margin-top: 24px;
  }

  .modal-cancel, .modal-confirm {
    flex: 1;
    padding: 11px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-family: 'STKaiti', 'KaiTi', '楷体', serif;
    font-weight: 600;
    letter-spacing: 1px;
    transition: all 0.2s;
  }

  .modal-cancel {
    background: #f5f0e6;
    color: #5a4020;
    border: 1.5px solid #c8b89a;
  }
  .modal-cancel:hover { background: #e8ddd0; }

  .modal-confirm {
    background: linear-gradient(135deg, #9a5c1a, #7a4a15);
    color: #f0e6d0;
    box-shadow: 0 4px 12px rgba(154, 92, 26, 0.3);
  }
  .modal-confirm:hover { filter: brightness(1.1); }

  /* ======== Toast ======== */
  .toast {
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 28px;
    border-radius: 6px;
    font-size: 14px;
    font-family: 'STKaiti', 'KaiTi', '楷体', serif;
    z-index: 2000;
    animation: toastIn 0.3s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  .toast.success { background: linear-gradient(135deg, #9a5c1a, #7a4a15); color: #f0e6d0; }
  .toast.error { background: #b06060; color: white; }

  @keyframes toastIn {
    from { opacity: 0; transform: translateX(-50%) translateY(10px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
  </style>