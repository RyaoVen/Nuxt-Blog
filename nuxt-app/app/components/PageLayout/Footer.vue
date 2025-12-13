<script lang="ts" setup>
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer :class="$style.footer">
    <div :class="$style.container">
      <div :class="$style.content">
        <!-- 左侧品牌区 -->
        <div :class="$style.brand">
          <h3 :class="$style.brandName">RyaoVen</h3>
          <p :class="$style.brandDesc">全栈开发者 · 终身学习者</p>
          <div :class="$style.social">
            <a href="#" :class="$style.socialLink"><img src="/icon/github.png" alt="GitHub" /></a>
            <a href="#" :class="$style.socialLink"><img src="/icon/gitee.png" alt="Gitee" /></a>
            <a href="#" :class="$style.socialLink"><img src="/icon/weibo.png" alt="Weibo" /></a>
            <a href="#" :class="$style.socialLink"><img src="/icon/bilibili.png" alt="Bilibili" /></a>
          </div>
        </div>

        <!-- 导航链接 -->
        <div :class="$style.linksGroup">
          <div :class="$style.linkColumn">
            <h4 :class="$style.columnTitle">导航</h4>
            <NuxtLink :class="$style.link" to="/">首页</NuxtLink>
            <NuxtLink :class="$style.link" to="/passages">文章</NuxtLink>
          </div>

          <div :class="$style.linkColumn">
            <h4 :class="$style.columnTitle">关于</h4>
            <NuxtLink :class="$style.link" to="/myself">关于我</NuxtLink>
            <NuxtLink :class="$style.link" to="/backGround">背景</NuxtLink>
            <NuxtLink :class="$style.link" to="/">留言板</NuxtLink>
          </div>

          <div :class="$style.linkColumn">
            <h4 :class="$style.columnTitle">联系</h4>
            <a :class="$style.link" href="mailto:contact@example.com">邮箱</a>
            <a :class="$style.link" href="#">Twitter</a>
            <a :class="$style.link" href="#">LinkedIn</a>
          </div>
        </div>
      </div>

      <!-- 底部版权 -->
      <div :class="$style.bottom">
        <p :class="$style.copyright">© {{ currentYear }} RyaoVen. All rights reserved.</p>
        <p :class="$style.tech">Built with Nuxt.js & Element Plus</p>
      </div>
    </div>
  </footer>
</template>

<style module>
.footer {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: #fff;
  margin-top: 80px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 40px 30px;
}

.content {
  display: flex;
  justify-content: space-between;
  gap: 60px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

/* 品牌区 */
.brand {
  flex: 1;
  min-width: 250px;
}

.brandName {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
  background: linear-gradient(135deg, #3498db 0%, #2ecc71 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brandDesc {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 20px 0;
  line-height: 1.6;
}

.social {
  display: flex;
  gap: 12px;
}

.socialLink {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.socialLink:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
  border-color: rgba(52, 152, 219, 0.5);
}

.socialLink img {
  width: 18px;
  height: 18px;
  object-fit: contain;
  opacity: 0.8;
}

.socialLink:hover img {
  opacity: 1;
}

/* 链接组 */
.linksGroup {
  display: flex;
  gap: 60px;
  flex: 2;
  justify-content: flex-end;
}

.linkColumn {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.columnTitle {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.link {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  width: fit-content;
}

.link:hover {
  color: #3498db;
  padding-left: 4px;
}

/* 底部版权 */
.bottom {
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.copyright,
.tech {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .content {
    flex-direction: column;
    gap: 40px;
  }

  .linksGroup {
    gap: 40px;
    justify-content: flex-start;
  }

  .bottom {
    flex-direction: column;
    text-align: center;
  }
}
</style>