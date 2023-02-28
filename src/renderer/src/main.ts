import { createApp } from 'vue'
import App from './App.vue'
// 配置的tailwindcss 参考：https://tailwindcss.com/docs/guides/vite#vue
import '@renderer/assets/css/tailwind.css'
// 这里引入element-ui的css,部分组件可能用到
import 'element-plus/dist/index.css'
import { setupRouter } from '@renderer/router'

async function bootstrap() {
  const app = createApp(App)
  await setupRouter(app)
  app.mount('#app')
}
bootstrap()
