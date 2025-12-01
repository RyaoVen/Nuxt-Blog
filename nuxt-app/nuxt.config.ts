// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['@/assets/css/reset.css'],
  modules: [
      '@pinia/nuxt',
      '@element-plus/nuxt',
  ],
  devtools: { enabled: true },
    nitro: {
        devProxy: {
            // 你的代理配置
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                // 其他 http-proxy 选项
            }
        }
    }
})
