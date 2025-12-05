<script setup lang="ts">
import { ref } from 'vue';
import {
  Moon,
  Sunny,
  Search,
  User,
  Close
} from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

const themeState = ref<'Sunny' | 'Moon'>('Sunny');

// 搜索相关
const searchDialogVisible = ref(false);
const searchQuery = ref('');
const searchResults = ref<any[]>([]);
const isSearching = ref(false);

// 登录相关
const loginDialogVisible = ref(false);
const loginForm = ref({
  username: '',
  password: '',
  remember: false
});
const isLogin = ref(true); // true: 登录, false: 注册
const registerForm = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

// 模拟文章数据
const mockArticles = [
  { id: 1, title: "深入理解 Vue 3 Composition API", category: "前端开发" },
  { id: 2, title: "TypeScript 类型体操实战指南", category: "编程语言" },
  { id: 3, title: "现代 CSS 布局技术全解析", category: "CSS" },
  { id: 4, title: "Nuxt 3 全栈开发实践", category: "全栈开发" },
  { id: 5, title: "前端性能优化完全指南", category: "性能优化" }
];

// 切换主题按钮图标
function changeTheme() {
  themeState.value = (themeState.value === 'Sunny' ? 'Moon' : 'Sunny');
}

// 导航功能
const navigateTo = (path: string) => {
  window.location.href = path;
};

// 打开搜索弹窗
const openSearchDialog = () => {
  searchDialogVisible.value = true;
  searchQuery.value = '';
  searchResults.value = [];
};

// 执行搜索
const performSearch = () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = [];
    return;
  }

  isSearching.value = true;
  
  // 模拟搜索延迟
  setTimeout(() => {
    searchResults.value = mockArticles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
    isSearching.value = false;
  }, 300);
};

// 跳转到文章
const goToArticle = (id: number) => {
  searchDialogVisible.value = false;
  navigateTo(`/passages/${id}`);
};

// 打开登录弹窗
const openLoginDialog = () => {
  loginDialogVisible.value = true;
  isLogin.value = true;
  resetForms();
};

// 重置表单
const resetForms = () => {
  loginForm.value = {
    username: '',
    password: '',
    remember: false
  };
  registerForm.value = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
};

// 切换登录/注册
const toggleLoginMode = () => {
  isLogin.value = !isLogin.value;
  resetForms();
};

// 处理登录
const handleLogin = () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    ElMessage.warning('请填写完整的登录信息');
    return;
  }

  // 模拟登录
  ElMessage.success('登录成功！');
  loginDialogVisible.value = false;
  resetForms();
};

// 处理注册
const handleRegister = () => {
  if (!registerForm.value.username || !registerForm.value.email || 
      !registerForm.value.password || !registerForm.value.confirmPassword) {
    ElMessage.warning('请填写完整的注册信息');
    return;
  }

  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    ElMessage.error('两次输入的密码不一致');
    return;
  }

  // 模拟注册
  ElMessage.success('注册成功！请登录');
  isLogin.value = true;
  resetForms();
};
</script>

<template>
<div :class="$style.containerTop">
  <div :class="$style.logo" @click="navigateTo('/')">
    <span>RyaoVen</span>
  </div>
  
  <div :class="$style.btns">
    <BasicComponentsBtn1 @click="navigateTo('/')" text="首页"/>
    <BasicComponentsBtn1 @click="navigateTo('/passages')" text="文章"/>
    <BasicComponentsBtn1 @click="navigateTo('/archive')" text="归档"/>
    <BasicComponentsBtn1 @click="navigateTo('/moments')" text="闲话"/>
    <BasicComponentsBtn1 @click="navigateTo('/guestbook')" text="留言"/>
    <BasicComponentsBtn1 @click="navigateTo('/myself')" text="关于"/>
  </div>
  
  <div :class="$style.btns1">
    <el-button :icon="Search" circle @click="openSearchDialog" />
    <el-button :icon="User" circle @click="openLoginDialog" />
    <el-button :icon="themeState === 'Sunny' ? Moon : Sunny" @click="changeTheme()" circle />
  </div>
</div>

<!-- 搜索弹窗 -->
<el-dialog
  v-model="searchDialogVisible"
  :class="$style.searchDialog"
  width="600px"
  :show-close="false"
  top="10vh"
>
  <template #header>
    <div :class="$style.dialogHeader">
      <h3 :class="$style.dialogTitle">搜索文章</h3>
      <el-button :icon="Close" circle size="small" @click="searchDialogVisible = false" />
    </div>
  </template>
  
  <div :class="$style.searchContent">
    <el-input
      v-model="searchQuery"
      placeholder="输入关键词搜索..."
      size="large"
      :prefix-icon="Search"
      @input="performSearch"
      clearable
      :class="$style.searchInput"
    />

    <div v-if="searchQuery && !isSearching" :class="$style.searchResults">
      <div v-if="searchResults.length > 0" :class="$style.resultsList">
        <div
          v-for="article in searchResults"
          :key="article.id"
          :class="$style.resultItem"
          @click="goToArticle(article.id)"
        >
          <span :class="$style.resultTitle">{{ article.title }}</span>
          <span :class="$style.resultCategory">{{ article.category }}</span>
        </div>
      </div>
      <div v-else :class="$style.noResults">
        <p>未找到相关文章</p>
      </div>
    </div>

    <div v-if="isSearching" :class="$style.searching">
      <el-icon :class="$style.loadingIcon"><Search /></el-icon>
      <p>搜索中...</p>
    </div>
  </div>
</el-dialog>

<!-- 登录/注册弹窗 -->
<el-dialog
  v-model="loginDialogVisible"
  :class="$style.loginDialog"
  width="420px"
  :show-close="false"
  top="15vh"
>
  <template #header>
    <div :class="$style.dialogHeader">
      <h3 :class="$style.dialogTitle">{{ isLogin ? '登录' : '注册' }}</h3>
      <el-button :icon="Close" circle size="small" @click="loginDialogVisible = false" />
    </div>
  </template>

  <div :class="$style.loginContent">
    <!-- 登录表单 -->
    <div v-if="isLogin" :class="$style.loginForm">
      <el-input
        v-model="loginForm.username"
        placeholder="用户名"
        size="large"
        :class="$style.formInput"
      />
      <el-input
        v-model="loginForm.password"
        type="password"
        placeholder="密码"
        size="large"
        show-password
        :class="$style.formInput"
      />
      <div :class="$style.formOptions">
        <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
        <a :class="$style.forgotLink">忘记密码？</a>
      </div>
      <el-button type="primary" size="large" @click="handleLogin" :class="$style.submitBtn">
        登录
      </el-button>
    </div>

    <!-- 注册表单 -->
    <div v-else :class="$style.registerForm">
      <el-input
        v-model="registerForm.username"
        placeholder="用户名"
        size="large"
        :class="$style.formInput"
      />
      <el-input
        v-model="registerForm.email"
        placeholder="邮箱"
        size="large"
        :class="$style.formInput"
      />
      <el-input
        v-model="registerForm.password"
        type="password"
        placeholder="密码"
        size="large"
        show-password
        :class="$style.formInput"
      />
      <el-input
        v-model="registerForm.confirmPassword"
        type="password"
        placeholder="确认密码"
        size="large"
        show-password
        :class="$style.formInput"
      />
      <el-button type="primary" size="large" @click="handleRegister" :class="$style.submitBtn">
        注册
      </el-button>
    </div>

    <!-- 切换登录/注册 -->
    <div :class="$style.toggleMode">
      <span>{{ isLogin ? '还没有账号？' : '已有账号？' }}</span>
      <a @click="toggleLoginMode" :class="$style.toggleLink">
        {{ isLogin ? '立即注册' : '立即登录' }}
      </a>
    </div>

    <!-- 第三方登录 -->
    <div :class="$style.socialLogin">
      <div :class="$style.divider">
        <span>或使用第三方登录</span>
      </div>
      <div :class="$style.socialButtons">
        <el-button circle><img src="/icon/github.png" :class="$style.socialIcon" /></el-button>
        <el-button circle><img src="/icon/weibo.png" :class="$style.socialIcon" /></el-button>
      </div>
    </div>
  </div>
</el-dialog>
</template>

<style module>
.containerTop{
  width: 100%;
  position: fixed;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  z-index: 1000;
}

.btns{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
  transition: all 0.3s ease;
}

.btns1{
  margin-left: auto;
  margin-right: 2vw;
  display: flex;
  gap: 8px;
}

.btns1 :global(.el-button) {
  transition: all 0.3s ease;
  border: none;
  background: transparent;
}

.btns1 :global(.el-button:hover) {
  background: rgba(52, 152, 219, 0.1);
  transform: scale(1.05);
}

.logo{
  margin-right: auto;
  margin-left: 2vw;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.logo span {
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(135deg, #3498db 0%, #2ecc71 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

.logo:hover {
  transform: scale(1.05);
}

/* 弹窗样式 */
.searchDialog :global(.el-dialog),
.loginDialog :global(.el-dialog) {
  border-radius: 20px;
  padding: 0;
}

.searchDialog :global(.el-dialog__header),
.loginDialog :global(.el-dialog__header) {
  padding: 24px 24px 0;
  margin: 0;
}

.searchDialog :global(.el-dialog__body),
.loginDialog :global(.el-dialog__body) {
  padding: 24px;
}

.dialogHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.dialogTitle {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

/* 搜索弹窗 */
.searchContent {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.searchInput :global(.el-input__wrapper) {
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 0 0 1px #e0e0e0 inset;
}

.searchInput :global(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #3498db inset;
}

.searchInput :global(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 2px #3498db inset;
}

.searchResults {
  max-height: 400px;
  overflow-y: auto;
}

.resultsList {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.resultItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.resultItem:hover {
  background: #fff;
  border-color: rgba(52, 152, 219, 0.2);
  transform: translateX(4px);
}

.resultTitle {
  font-size: 15px;
  font-weight: 500;
  color: #333;
  flex: 1;
}

.resultCategory {
  font-size: 13px;
  color: #3498db;
  padding: 4px 12px;
  background: rgba(52, 152, 219, 0.1);
  border-radius: 12px;
}

.noResults {
  text-align: center;
  padding: 40px;
  color: #999;
}

.searching {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 40px;
  color: #999;
}

.loadingIcon {
  font-size: 32px;
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 登录弹窗 */
.loginContent {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.loginForm,
.registerForm {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.formInput :global(.el-input__wrapper) {
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 0 0 1px #e0e0e0 inset;
}

.formInput :global(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #3498db inset;
}

.formInput :global(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 2px #3498db inset;
}

.formOptions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.forgotLink {
  color: #3498db;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
}

.forgotLink:hover {
  color: #2980b9;
  text-decoration: underline;
}

.submitBtn {
  width: 100%;
  border-radius: 12px;
  height: 44px;
  font-size: 16px;
  font-weight: 600;
}

.toggleMode {
  text-align: center;
  font-size: 14px;
  color: #666;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.toggleLink {
  color: #3498db;
  cursor: pointer;
  margin-left: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.toggleLink:hover {
  color: #2980b9;
  text-decoration: underline;
}

.socialLogin {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: #999;
  font-size: 13px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e0e0e0;
}

.divider span {
  padding: 0 16px;
}

.socialButtons {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.socialIcon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}
</style>