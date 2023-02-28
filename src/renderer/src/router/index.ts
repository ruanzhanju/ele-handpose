import { App } from "vue"
import { createRouter, createWebHistory } from 'vue-router'
import routes from "@renderer/router/routes"
const router = createRouter({
  history: createWebHistory(),
  routes: [...routes]
})

export async function setupRouter(app: App) {
  app.use(router)
  await router.isReady()
}

export default router
