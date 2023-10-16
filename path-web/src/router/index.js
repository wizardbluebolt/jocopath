// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Main.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/News.vue'),
      },
      {
        path: '/about',
        name: 'About PATH',
        component: () => import('@/views/About.vue')
      },
      {
        path: '/contact',
        name: 'Contact Us',
        component: () => import('@/views/Contact.vue')
      },
      {
        path: '/homeless',
        name: 'Homeless',
        component: () => import('@/views/Homeless.vue')
      },
      {
        path: '/news',
        name: 'News', 
        component: () => import('@/views/News.vue')
      },
      {
        path: '/services',
        name: 'Services',
        component: () => import('@/views/Services.vue')
      },
      {
        path: '/success', 
        name: 'Success',
        component: () => import('@/views/Success.vue')
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
