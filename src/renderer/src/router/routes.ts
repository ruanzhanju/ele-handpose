import { RouteRecordRaw } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'default',
    redirect: { name: 'home'}
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@renderer/layouts/home/HomeLayout.vue')
  },
  {
    path: '/camera',
    name: 'camera',
    component: () => import('@renderer/layouts/camera/CameraLayout.vue')
  },
  {
    path: '/:notFound(.+)',
    component: () => import('@renderer/components/NotFound.vue')
  }
] as RouteRecordRaw[]

export default routes
