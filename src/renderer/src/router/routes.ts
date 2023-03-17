import { RouteRecordRaw } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'default',
    redirect: { name: 'home.cameraControl'}
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@renderer/layouts/home/HomeLayout.vue'),
    children: [
      {
        path: 'cameraControl',
        name: 'home.cameraControl',
        component: () => import('@renderer/views/CameraControl.vue'),
        meta: {
          menuItem: {
            title: '开启手势控制功能',
            icon: 'i-camera-one',
            props: { theme: 'outline', size: '32', fill: '#828585', 'stroke-width': 2 },
            sort: 1
          }
        }
      },
      {
        path: 'mySetting',
        name: 'home.mySetting',
        component: () => import('@renderer/views/Personal.vue'),
        meta: {
          menuItem: {
            title: '我的配置',
            icon: 'i-me',
            props: { theme: 'outline', size: '32', fill: '#828585', 'stroke-width': 2 },
            sort: 2
          }
        }
      },
      {
        path: 'upAndDownLoad',
        name: 'home.upAndDownLoad',
        component: () => import('@renderer/views/UpAndDownLoad.vue'),
        meta: {
          menuItem: {
            title: '上传与下载',
            icon: 'i-sort-three',
            props: { theme: 'outline', size: '32', fill: '#828585', 'stroke-width': 2 },
            sort: 3
          }
        }
      },
      {
        path: 'about',
        name: 'home.about',
        component: () => import('@renderer/views/About.vue'),
        meta: {
          menuItem: {
            title: '关于',
            icon: 'i-help',
            props: { theme: 'outline', size: '32', fill: '#828585', 'stroke-width': 2 },
            sort: 4
          }
        }
      }
    ]
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
